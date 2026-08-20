"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getTransporter } from "@/lib/mailer";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const companySettingsSchema = z.object({
  legal_name: z.string().trim().min(1).max(180),
  trading_name: z.string().trim().min(1).max(180),
  email: z.string().trim().email().max(254).optional().or(z.literal("")),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  address: z.string().trim().max(1500).optional().or(z.literal("")),
  state: z.string().trim().max(100).default("Karnataka"),
  state_code: z.string().trim().max(4).default("29"),
  gstin: z.string().trim().max(20).optional().or(z.literal("")),
  pan: z.string().trim().max(20).optional().or(z.literal("")),
  bank_name: z.string().trim().max(120).optional().or(z.literal("")),
  account_name: z.string().trim().max(180).optional().or(z.literal("")),
  account_number: z.string().trim().max(40).optional().or(z.literal("")),
  ifsc: z.string().trim().max(20).optional().or(z.literal("")),
  upi_id: z.string().trim().max(120).optional().or(z.literal("")),
  default_terms: z.string().trim().max(8000).optional().or(z.literal("")),
  quotation_prefix: z.string().trim().min(1).max(16).default("GAV-Q"),
  invoice_prefix: z.string().trim().min(1).max(16).default("GAV-INV"),
  default_tax_rate: z.coerce.number().min(0).max(100).default(18),
  ai_model: z.string().default("gemini-3.6-flash"),
});

export async function saveCompanySettingsAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const raw = Object.fromEntries(formData);
  const parsed = companySettingsSchema.safeParse(raw);

  if (!parsed.success) {
    redirect("/settings?error=invalid_settings");
  }

  const { default_tax_rate, ...values } = parsed.data;
  const default_tax_rate_bps = Math.round(default_tax_rate * 100);

  const { error } = await supabase.from("ops_company_settings").upsert({
    id: "default",
    ...values,
    default_tax_rate_bps,
  });

  if (error) {
    console.error("Failed to save company settings:", error);
    redirect("/settings?error=save_failed");
  }

  revalidatePath("/settings");
  redirect("/settings?saved=settings_saved");
}

export async function testSmtpConnectionAction(formData: FormData) {
  const testRecipient = String(formData.get("test_email") || "").trim();

  if (!testRecipient) {
    redirect("/settings?error=invalid_test_email");
  }

  try {
    const transporter = getTransporter();
    await transporter.verify();

    await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME || "Gavior Billing"}" <${process.env.SMTP_FROM_EMAIL || "hello@gavior.in"}>`,
      to: testRecipient,
      subject: "Test Email: Hostinger SMTP Verification - Gavior Invoicing",
      html: `<div style="font-family: sans-serif; padding: 20px; color: #1e6a47;">
        <h2>✓ SMTP Handshake Verified Successfully</h2>
        <p>Hostinger SMTP credentials and delivery pipelines are active and ready to send quotations and invoices to your clients.</p>
        <p style="color: #666; font-size: 12px;">Timestamp: ${new Date().toISOString()}</p>
      </div>`,
    });

    redirect("/settings?saved=smtp_verified");
  } catch (error) {
    console.error("SMTP verification failed:", error);
    redirect("/settings?error=smtp_test_failed");
  }
}
