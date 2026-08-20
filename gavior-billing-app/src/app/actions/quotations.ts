"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { generateQuotationWithGemini } from "@/lib/gemini";
import { calculateGstSplit, calculateLine, rupeesToPaise } from "@/lib/money";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { QuotationContent } from "@/lib/types";

const quotationHeaderSchema = z.object({
  client_id: z.string().uuid("Invalid client ID"),
  title: z.string().trim().min(1, "Title is required").max(180),
  short_summary: z.string().trim().min(10, "Summary must be at least 10 characters").max(4000),
  timeline: z.string().trim().max(500).optional().or(z.literal("")),
  valid_until: z.string().optional().or(z.literal("")),
});

const quotationItemInputSchema = z.array(
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

export async function createQuotationAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const raw = Object.fromEntries(formData);
  const headerParsed = quotationHeaderSchema.safeParse(raw);

  if (!headerParsed.success) {
    console.error(headerParsed.error);
    redirect("/quotations/new?error=invalid_quotation");
  }

  let itemsInput;
  try {
    itemsInput = quotationItemInputSchema.parse(JSON.parse(String(raw.items_json || "[]")));
  } catch (err) {
    console.error("Invalid items JSON:", err);
    redirect("/quotations/new?error=invalid_items");
  }

  // Get company settings for prefix
  const { data: settings } = await supabase.from("ops_company_settings").select("*").eq("id", "default").single();
  const prefix = settings?.quotation_prefix || "GAV-Q";

  // Generate sequential number
  const { data: nextNum } = await supabase.rpc("ops_next_document_number", {
    p_document_type: "quotation",
    p_prefix: prefix,
  });

  const quotationNumber = nextNum || `${prefix}-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  // Calculate totals
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
      catalog_item_id: item.catalog_item_id || null,
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

  // Insert quotation
  const { data: quote, error: quoteError } = await supabase
    .from("ops_quotations")
    .insert({
      quotation_number: quotationNumber,
      client_id: headerParsed.data.client_id,
      title: headerParsed.data.title,
      short_summary: headerParsed.data.short_summary,
      timeline: headerParsed.data.timeline || null,
      valid_until: headerParsed.data.valid_until || null,
      status: "draft",
      subtotal_paise: subtotalPaise,
      discount_paise: 0,
      tax_paise: taxPaise,
      total_paise: totalPaise,
      content: {},
      milestones: [],
    })
    .select("id")
    .single();

  if (quoteError || !quote) {
    console.error("Quotation create failed:", quoteError);
    redirect("/quotations/new?error=save_failed");
  }

  // Insert line items
  const itemsToInsert = calculatedItems.map((item) => ({
    ...item,
    quotation_id: quote.id,
  }));

  const { error: itemsError } = await supabase.from("ops_quotation_items").insert(itemsToInsert);

  if (itemsError) {
    console.error("Items insert error:", itemsError);
  }

  revalidatePath("/quotations");
  redirect(`/quotations/${quote.id}?saved=created`);
}

export async function generateQuotationAiContentAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const id = String(formData.get("id") || "").trim();

  if (!id) redirect("/quotations?error=invalid_id");

  const [{ data: quote }, { data: settings }] = await Promise.all([
    supabase.from("ops_quotations").select("*, clients(*), ops_quotation_items(*)").eq("id", id).single(),
    supabase.from("ops_company_settings").select("*").eq("id", "default").single(),
  ]);

  if (!quote) redirect("/quotations?error=not_found");

  const apiKey = process.env.GOOGLE_DRIVE_API_KEY || process.env.GEMINI_API_KEY || "";
  if (!apiKey) {
    redirect(`/quotations/${id}?error=gemini_not_configured`);
  }

  const clientName = quote.clients?.company_name || "Valued Client";
  const items = (quote.ops_quotation_items || []).map((it: { description: string; quantity: number; unit: string; unit_price_paise: number }) => ({
    description: it.description,
    quantity: it.quantity,
    unit: it.unit,
    unitPrice: it.unit_price_paise / 100,
  }));

  try {
    const content = await generateQuotationWithGemini({
      apiKey,
      title: quote.title,
      shortSummary: quote.short_summary,
      clientName,
      items,
      model: settings?.ai_model || "gemini-3.6-flash",
    });

    await supabase
      .from("ops_quotations")
      .update({
        content,
        status: quote.status === "draft" ? "reviewed" : quote.status,
      })
      .eq("id", id);

    revalidatePath(`/quotations/${id}`);
    redirect(`/quotations/${id}?saved=ai_generated`);
  } catch (error) {
    console.error("AI Generation failed:", error);
    redirect(`/quotations/${id}?error=ai_failed`);
  }
}

export async function saveQuotationContentAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const id = String(formData.get("id") || "").trim();

  if (!id) redirect("/quotations?error=invalid_id");

  const content: QuotationContent = {
    executiveSummary: String(formData.get("executiveSummary") || ""),
    understanding: String(formData.get("understanding") || ""),
    proposedSolution: String(formData.get("proposedSolution") || ""),
    scope: String(formData.get("scope") || ""),
    timelineNarrative: String(formData.get("timelineNarrative") || ""),
    assumptions: String(formData.get("assumptions") || ""),
    exclusions: String(formData.get("exclusions") || ""),
    clientResponsibilities: String(formData.get("clientResponsibilities") || ""),
    support: String(formData.get("support") || ""),
    closing: String(formData.get("closing") || ""),
  };

  const { error } = await supabase
    .from("ops_quotations")
    .update({
      content,
      status: "reviewed",
    })
    .eq("id", id);

  if (error) {
    redirect(`/quotations/${id}?error=content_save_failed`);
  }

  revalidatePath(`/quotations/${id}`);
  redirect(`/quotations/${id}?saved=content_saved`);
}

export async function setQuotationStatusAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const id = String(formData.get("id") || "").trim();
  const status = String(formData.get("status") || "").trim();

  if (!id || !status) redirect("/quotations?error=invalid_params");

  const updatePayload: Record<string, unknown> = { status };
  if (status === "accepted") {
    updatePayload.accepted_at = new Date().toISOString();
  }

  const { error } = await supabase.from("ops_quotations").update(updatePayload).eq("id", id);

  if (error) {
    redirect(`/quotations/${id}?error=status_failed`);
  }

  revalidatePath(`/quotations/${id}`);
  revalidatePath("/quotations");
  redirect(`/quotations/${id}?saved=status_updated`);
}

export async function convertQuotationToInvoiceAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const quotationId = String(formData.get("id") || "").trim();

  if (!quotationId) redirect("/quotations?error=invalid_id");

  const [{ data: quote }, { data: settings }] = await Promise.all([
    supabase
      .from("ops_quotations")
      .select("*, clients(*), ops_quotation_items(*)")
      .eq("id", quotationId)
      .single(),
    supabase.from("ops_company_settings").select("*").eq("id", "default").single(),
  ]);

  if (!quote) redirect("/quotations?error=not_found");

  const prefix = settings?.invoice_prefix || "GAV-INV";
  const { data: nextNum } = await supabase.rpc("ops_next_document_number", {
    p_document_type: "invoice",
    p_prefix: prefix,
  });

  const invoiceNumber = nextNum || `${prefix}-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const supplierStateCode = settings?.state_code || "29";
  const clientStateCode = quote.clients?.state_code || "29";
  const gstSplit = calculateGstSplit(supplierStateCode, clientStateCode, quote.tax_paise);

  // Create invoice
  const { data: invoice, error: invoiceError } = await supabase
    .from("ops_invoices")
    .insert({
      invoice_number: invoiceNumber,
      quotation_id: quote.id,
      client_id: quote.client_id,
      title: quote.title,
      invoice_type: "tax_invoice",
      issue_date: new Date().toISOString().slice(0, 10),
      due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      place_of_supply: quote.clients?.state || "Karnataka",
      status: "issued",
      subtotal_paise: quote.subtotal_paise,
      discount_paise: quote.discount_paise,
      tax_paise: quote.tax_paise,
      cgst_paise: gstSplit.cgstPaise,
      sgst_paise: gstSplit.sgstPaise,
      igst_paise: gstSplit.igstPaise,
      total_paise: quote.total_paise,
      amount_paid_paise: 0,
      balance_due_paise: quote.total_paise,
      notes: settings?.default_terms || "Thank you for your business.",
      issued_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (invoiceError || !invoice) {
    console.error("Failed to convert quotation to invoice:", invoiceError);
    redirect(`/quotations/${quotationId}?error=convert_failed`);
  }

  // Copy line items
  const quoteItems = quote.ops_quotation_items || [];
  const invoiceItemsToInsert = quoteItems.map((item: { position: number; description: string; quantity: number; unit: string; sac_hsn: string | null; unit_price_paise: number; tax_rate_bps: number; line_subtotal_paise: number; line_tax_paise: number; line_total_paise: number }) => ({
    invoice_id: invoice.id,
    position: item.position,
    description: item.description,
    quantity: item.quantity,
    unit: item.unit,
    sac_hsn: item.sac_hsn,
    unit_price_paise: item.unit_price_paise,
    tax_rate_bps: item.tax_rate_bps,
    line_subtotal_paise: item.line_subtotal_paise,
    line_tax_paise: item.line_tax_paise,
    line_total_paise: item.line_total_paise,
  }));

  if (invoiceItemsToInsert.length > 0) {
    await supabase.from("ops_invoice_items").insert(invoiceItemsToInsert);
  }

  revalidatePath("/invoices");
  revalidatePath(`/quotations/${quotationId}`);
  redirect(`/invoices/${invoice.id}?saved=converted_from_quote`);
}
