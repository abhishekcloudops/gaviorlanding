"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sendInvoiceEmail, sendQuotationEmail } from "@/lib/mailer";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function sendQuotationToClientAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const id = String(formData.get("id") || "").trim();
  const recipientEmail = String(formData.get("email") || "").trim();
  const customMessage = String(formData.get("custom_message") || "").trim();

  if (!id || !recipientEmail) {
    redirect(`/quotations/${id}?error=invalid_recipient`);
  }

  const { data: quote } = await supabase
    .from("ops_quotations")
    .select("*, clients(*)")
    .eq("id", id)
    .single();

  if (!quote) redirect("/quotations?error=not_found");

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";
  const portalUrl = `${appUrl}/portal/quote/${quote.portal_token}`;

  try {
    await sendQuotationEmail({
      to: recipientEmail,
      clientName: quote.clients?.company_name || quote.clients?.contact_name || "Valued Client",
      quotationNumber: quote.quotation_number,
      title: quote.title,
      totalPaise: quote.total_paise,
      validUntil: quote.valid_until,
      portalUrl,
      customMessage,
    });

    // Update status to sent
    await supabase.from("ops_quotations").update({ status: "sent" }).eq("id", id);

    // Log dispatch
    await supabase.from("ops_dispatch_logs").insert({
      entity_type: "quotation",
      entity_id: quote.id,
      channel: "email",
      recipient: recipientEmail,
      subject: `Quotation: ${quote.title} (${quote.quotation_number})`,
      status: "sent",
      metadata: { portalUrl },
    });

    revalidatePath(`/quotations/${id}`);
    redirect(`/quotations/${id}?saved=email_sent`);
  } catch (error) {
    console.error("Failed to send quotation email:", error);
    redirect(`/quotations/${id}?error=email_failed`);
  }
}

export async function sendInvoiceToClientAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const id = String(formData.get("id") || "").trim();
  const recipientEmail = String(formData.get("email") || "").trim();
  const customMessage = String(formData.get("custom_message") || "").trim();

  if (!id || !recipientEmail) {
    redirect(`/invoices/${id}?error=invalid_recipient`);
  }

  const { data: invoice } = await supabase
    .from("ops_invoices")
    .select("*, clients(*)")
    .eq("id", id)
    .single();

  if (!invoice) redirect("/invoices?error=not_found");

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";
  const portalUrl = `${appUrl}/portal/invoice/${invoice.portal_token}`;

  try {
    await sendInvoiceEmail({
      to: recipientEmail,
      clientName: invoice.clients?.company_name || invoice.clients?.contact_name || "Valued Client",
      invoiceNumber: invoice.invoice_number,
      title: invoice.title,
      totalPaise: invoice.total_paise,
      balanceDuePaise: invoice.balance_due_paise,
      dueDate: invoice.due_date,
      portalUrl,
      customMessage,
    });

    // Update status to sent if draft/issued
    if (invoice.status === "issued" || invoice.status === "draft") {
      await supabase.from("ops_invoices").update({ status: "sent" }).eq("id", id);
    }

    // Log dispatch
    await supabase.from("ops_dispatch_logs").insert({
      entity_type: "invoice",
      entity_id: invoice.id,
      channel: "email",
      recipient: recipientEmail,
      subject: `Tax Invoice: ${invoice.invoice_number}`,
      status: "sent",
      metadata: { portalUrl },
    });

    revalidatePath(`/invoices/${id}`);
    redirect(`/invoices/${id}?saved=email_sent`);
  } catch (error) {
    console.error("Failed to send invoice email:", error);
    redirect(`/invoices/${id}?error=email_failed`);
  }
}
