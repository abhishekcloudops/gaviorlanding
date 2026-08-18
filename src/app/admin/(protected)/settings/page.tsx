import { deleteGeminiKeyAction, saveCompanySettingsAction, saveGeminiKeyAction } from "@/app/admin/actions";
import { AdminNotice } from "@/components/admin/notice";
import { ConfirmButton } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";

export default async function SettingsPage({ searchParams }: { searchParams: Promise<{ saved?: string; error?: string }> }) {
  const { supabase } = await requireAdmin(); const params = await searchParams;
  const [{ data: company }, { data: secret }] = await Promise.all([
    supabase.from("company_settings").select("*").eq("id", "default").single(),
    supabase.from("encrypted_secrets").select("last_four,updated_at").eq("key_name", "gemini_api_key").maybeSingle(),
  ]);
  return <main><header className="admin-page-header"><div><p className="admin-eyebrow">Configuration</p><h1>Settings</h1><p className="admin-muted">Company identity, numbering, tax and protected AI credentials.</p></div></header><AdminNotice {...params} />
    <section className="admin-panel"><h2>Company and billing</h2><form action={saveCompanySettingsAction} className="admin-form-grid">
      <label className="admin-field">Legal name<input name="legal_name" defaultValue={company?.legal_name || "Gavior"} required /></label>
      <label className="admin-field">Trading name<input name="trading_name" defaultValue={company?.trading_name || "Gavior"} required /></label>
      <label className="admin-field">Email<input name="email" type="email" defaultValue={company?.email || ""} /></label>
      <label className="admin-field">Phone<input name="phone" defaultValue={company?.phone || ""} /></label>
      <label className="admin-field admin-field-full">Business address<textarea name="address" defaultValue={company?.address || ""} /></label>
      <label className="admin-field">State<input name="state" defaultValue={company?.state || ""} /></label>
      <label className="admin-field">State code<input name="state_code" defaultValue={company?.state_code || ""} /></label>
      <label className="admin-field">GSTIN<input name="gstin" defaultValue={company?.gstin || ""} /></label>
      <label className="admin-field">PAN<input name="pan" defaultValue={company?.pan || ""} /></label>
      <label className="admin-field">Bank name<input name="bank_name" defaultValue={company?.bank_name || ""} /></label>
      <label className="admin-field">Account name<input name="account_name" defaultValue={company?.account_name || ""} /></label>
      <label className="admin-field">Account number<input name="account_number" defaultValue={company?.account_number || ""} /></label>
      <label className="admin-field">IFSC<input name="ifsc" defaultValue={company?.ifsc || ""} /></label>
      <label className="admin-field">UPI ID<input name="upi_id" defaultValue={company?.upi_id || ""} /></label>
      <label className="admin-field">Default GST rate (%)<input name="default_tax_rate" type="number" min="0" max="100" step="0.01" defaultValue={Number(company?.default_tax_rate_bps || 1800) / 100} /></label>
      <label className="admin-field">Quotation prefix<input name="quotation_prefix" defaultValue={company?.quotation_prefix || "GAV-Q"} /></label>
      <label className="admin-field">Invoice prefix<input name="invoice_prefix" defaultValue={company?.invoice_prefix || "GAV-I"} /></label>
      <label className="admin-field">Gemini model<select name="ai_model" defaultValue={company?.ai_model || "gemini-2.5-flash"}><option value="gemini-2.5-flash">Gemini 2.5 Flash</option><option value="gemini-3-flash-preview">Gemini 3 Flash Preview</option><option value="gemini-3.5-flash">Gemini 3.5 Flash</option></select></label>
      <label className="admin-field admin-field-full">Default commercial terms<textarea name="default_terms" maxLength={8000} defaultValue={company?.default_terms || ""} /></label>
      <div className="admin-field-full"><button className="admin-button" type="submit">Save company settings</button></div>
    </form></section>
    <section className="admin-panel"><h2>Gemini API key</h2><p className="admin-help">The key is tested server-side, encrypted with AES-256-GCM and never returned to the browser. The separate encryption master key must remain in the EC2 environment. Only the client company/contact name and quotation scope are sent to Gemini; billing addresses, GSTIN, email, phone and internal notes are excluded.</p>
      {secret && <p className="admin-muted">Configured key ending in <b>••••{secret.last_four}</b>. Last replaced {new Date(secret.updated_at).toLocaleString("en-IN")}.</p>}
      <form action={saveGeminiKeyAction} className="admin-inline-form"><label className="admin-field">New Gemini key<input name="api_key" type="password" autoComplete="new-password" required minLength={20} maxLength={500} /></label><button className="admin-button" type="submit">Test and encrypt key</button></form>
      {secret && <form action={deleteGeminiKeyAction} className="admin-actions"><ConfirmButton message="Delete the stored Gemini key? Quotation generation will stop working.">Delete key</ConfirmButton></form>}
    </section>
  </main>;
}
