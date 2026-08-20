"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { calculateGstSplit, calculateLine, rupeesToPaise } from "@/lib/money";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const invoiceHeaderSchema = z.object({
  client_id: z.string().uuid("Invalid client ID"),
  title: z.string().trim().min(1, "Title is required").max(180),
  invoice_type: z.enum(["tax_invoice", "retainer", "proforma"]).default("tax_invoice"),
  issue_date: z.string().default(() => new Date().toISOString().slice(0, 10)),
  due_date: z.string().optional().or(z.literal("")),
  place_of_supply: z.string().optional().or(z.literal("")),
  billing_period_start: z.string().optional().or(z.literal("")),
  billing_period_end: z.string().optional().or(z.literal("")),
  notes: z.string().max(4000).optional().or(z.literal("")),
});

const invoiceItemInputSchema = z.array(
  z.object({
    catalog_item_id: z.string().uuid().nullable().optional(),
    description: z.string().trim().min(1).max(500),
    quantity: z.string().regex(/^\d+(\.\d{1,3})?$/),
    unit: z.string().trim().min(1).max(30),
    sac_hsn: z.string().trim().max(20).optional().or(z.literal("")),
    unit_price: z.string().regex(/^\d+(\.\d{1,2})?$/),
    tax_rate: z.number().min(0).max(100),
  }),
).min(1, "At least one line item is required").max(50);

export async function createDirectInvoiceAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const raw = Object.fromEntries(formData);
  const headerParsed = invoiceHeaderSchema.safeParse(raw);

  if (!headerParsed.success) {
    console.error(headerParsed.error);
    redirect("/invoices/new?error=invalid_invoice");
  }

  let itemsInput;
  try {
    itemsInput = invoiceItemInputSchema.parse(JSON.parse(String(raw.items_json || "[]")));
  } catch (err) {
    console.error("Invalid items JSON:", err);
    redirect("/invoices/new?error=invalid_items");
  }

  const [{ data: client }, { data: settings }] = await Promise.all([
    supabase.from("ops_clients").select("*").eq("id", headerParsed.data.client_id).single(),
    supabase.from("ops_company_settings").select("*").eq("id", "default").single(),
  ]);

  if (!client) redirect("/invoices/new?error=invalid_client");

  const prefix = settings?.invoice_prefix || "GAV-INV";
  const { data: nextNum } = await supabase.rpc("ops_next_document_number", {
    p_document_type: "invoice",
    p_prefix: prefix,
  });

  const invoiceNumber = nextNum || `${prefix}-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  // Calculate line items
  let subtotalPaise = 0;
  let taxPaise = 0;

  const calculatedItems = itemsInput.map((item, idx) => {
    const unitPricePaise = rupeesToPaise(item.unit_price);
    const taxRateBps = Math.round(item.tax_rate * 100);
    const line = calculateLine(item.quantity, unitPricePaise, taxRateBps);

    subtotalPaise += line.subtotalPaise;
    taxPaise += line.taxPaise;

    return {
      position: idx + 1,
      description: item.description,
      quantity: Number(item.quantity),
      unit: item.unit,
      sac_hsn: item.sac_hsn || null,
      unit_price_paise: unitPricePaise,
      tax_rate_bps: taxRateBps,
      line_subtotal_paise: line.subtotalPaise,
      line_tax_paise: line.taxPaise,
      line_total_paise: line.totalPaise,
    };
  });

  const totalPaise = subtotalPaise + taxPaise;
  const supplierStateCode = settings?.state_code || "29";
  const clientStateCode = client.state_code || "29";
  const gstSplit = calculateGstSplit(supplierStateCode, clientStateCode, taxPaise);

  // Insert invoice
  const { data: invoice, error: invoiceError } = await supabase
    .from("ops_invoices")
    .insert({
      invoice_number: invoiceNumber,
      client_id: client.id,
      title: headerParsed.data.title,
      invoice_type: headerParsed.data.invoice_type,
      issue_date: headerParsed.data.issue_date,
      due_date: headerParsed.data.due_date || null,
      place_of_supply: headerParsed.data.place_of_supply || client.state || "Karnataka",
      billing_period_start: headerParsed.data.billing_period_start || null,
      billing_period_end: headerParsed.data.billing_period_end || null,
      status: "issued",
      subtotal_paise: subtotalPaise,
      discount_paise: 0,
      tax_paise: taxPaise,
      cgst_paise: gstSplit.cgstPaise,
      sgst_paise: gstSplit.sgstPaise,
      igst_paise: gstSplit.igstPaise,
      total_paise: totalPaise,
      amount_paid_paise: 0,
      balance_due_paise: totalPaise,
      notes: headerParsed.data.notes || settings?.default_terms || "Thank you for your business.",
      issued_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (invoiceError || !invoice) {
    console.error("Invoice creation failed:", invoiceError);
    redirect("/invoices/new?error=save_failed");
  }

  // Insert items
  const itemsToInsert = calculatedItems.map((item) => ({
    ...item,
    invoice_id: invoice.id,
  }));

  await supabase.from("ops_invoice_items").insert(itemsToInsert);

  revalidatePath("/invoices");
  redirect(`/invoices/${invoice.id}?saved=created`);
}

export async function recordPaymentAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const invoiceId = String(formData.get("id") || "").trim();
  const amountStr = String(formData.get("amount") || "").trim();
  const paidAt = String(formData.get("paid_at") || "").trim();
  const method = String(formData.get("method") || "UPI").trim();
  const reference = String(formData.get("reference") || "").trim();
  const notes = String(formData.get("notes") || "").trim();

  if (!invoiceId || !amountStr) {
    redirect(`/invoices/${invoiceId}?error=invalid_payment_amount`);
  }

  const paymentPaise = rupeesToPaise(amountStr);
  if (paymentPaise <= 0) {
    redirect(`/invoices/${invoiceId}?error=invalid_amount`);
  }

  const { data: invoice } = await supabase.from("ops_invoices").select("*").eq("id", invoiceId).single();
  if (!invoice) redirect("/invoices?error=not_found");

  const currentPaid = Number(invoice.amount_paid_paise || 0);
  const total = Number(invoice.total_paise || 0);
  const newPaid = currentPaid + paymentPaise;
  const newBalance = Math.max(0, total - newPaid);

  let newStatus = invoice.status;
  if (newBalance === 0) {
    newStatus = "paid";
  } else if (newPaid > 0) {
    newStatus = "partially_paid";
  }

  // Record payment row
  await supabase.from("ops_payments").insert({
    invoice_id: invoiceId,
    paid_at: paidAt || new Date().toISOString().slice(0, 10),
    amount_paise: paymentPaise,
    payment_method: method,
    reference: reference || null,
    notes: notes || null,
  });

  // Update invoice balance and status
  await supabase
    .from("ops_invoices")
    .update({
      amount_paid_paise: newPaid,
      balance_due_paise: newBalance,
      status: newStatus,
      paid_at: newBalance === 0 ? new Date().toISOString() : null,
    })
    .eq("id", invoiceId);

  revalidatePath(`/invoices/${invoiceId}`);
  revalidatePath("/invoices");
  redirect(`/invoices/${invoiceId}?saved=payment_recorded`);
}
