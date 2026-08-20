import { saveCompanySettingsAction, testSmtpConnectionAction } from "@/app/actions/settings";
import { Notice } from "@/components/ui/notice";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const supabase = await createSupabaseServerClient();
  const params = await searchParams;

  const { data: settings } = await supabase
    .from("ops_company_settings")
    .select("*")
    .eq("id", "default")
    .single();

  const current = settings || {
    legal_name: "Gavior Technologies Private Limited",
    trading_name: "Gavior",
    email: "hello@gavior.in",
    phone: "+91 99999 99999",
    address: "Bengaluru, Karnataka, India",
    state: "Karnataka",
    state_code: "29",
    gstin: "",
    pan: "",
    bank_name: "HDFC Bank",
    account_name: "Gavior Technologies Private Limited",
    account_number: "",
    ifsc: "",
    upi_id: "hello@gavior.in",
    quotation_prefix: "GAV-Q",
    invoice_prefix: "GAV-INV",
    default_tax_rate_bps: 1800,
    default_terms:
      "1. Payment due within 7 days of invoice issue date.\n2. Commercial rights transfer upon full realization of all payments.\n3. Delay in milestone sign-offs may adjust the delivery schedule.",
    ai_model: "gemini-3.6-flash",
  };

  return (
    <div className="max-w-4xl">
      <header className="ops-page-header">
        <div>
          <p className="ops-eyebrow">System & Entity Parameters</p>
          <h1 className="ops-title">Company & Billing Settings</h1>
          <p className="ops-muted">
            Configure legal identity, bank accounts, UPI QR credentials, Hostinger SMTP, and Gemini AI models.
          </p>
        </div>
      </header>

      <Notice {...params} />

      {/* ── Main Settings Form ── */}
      <form action={saveCompanySettingsAction} className="space-y-6">
        {/* Company Identity */}
        <section className="ops-panel">
          <h2 className="text-base font-bold text-gray-900 mb-4">
            Legal Entity & Tax Registration
          </h2>
          <div className="ops-form-grid">
            <label className="ops-field">
              Legal Registered Name
              <input
                name="legal_name"
                defaultValue={current.legal_name}
                required
              />
            </label>

            <label className="ops-field">
              Trading / Brand Name
              <input
                name="trading_name"
                defaultValue={current.trading_name}
                required
              />
            </label>

            <label className="ops-field">
              Official Billing Email
              <input
                name="email"
                type="email"
                defaultValue={current.email || ""}
              />
            </label>

            <label className="ops-field">
              Support Phone / WhatsApp
              <input
                name="phone"
                defaultValue={current.phone || ""}
              />
            </label>

            <label className="ops-field">
              GSTIN (Supplier)
              <input
                name="gstin"
                defaultValue={current.gstin || ""}
                placeholder="29ABCDE1234F1Z5"
              />
            </label>

            <label className="ops-field">
              Company PAN
              <input
                name="pan"
                defaultValue={current.pan || ""}
                placeholder="ABCDE1234F"
              />
            </label>

            <label className="ops-field">
              State & State Code
              <div className="grid grid-cols-3 gap-2">
                <input
                  name="state"
                  defaultValue={current.state || "Karnataka"}
                  className="col-span-2"
                />
                <input
                  name="state_code"
                  defaultValue={current.state_code || "29"}
                  className="col-span-1"
                />
              </div>
            </label>

            <label className="ops-field">
              Default GST Rate (%)
              <input
                name="default_tax_rate"
                type="number"
                min="0"
                max="100"
                step="0.01"
                defaultValue={(current.default_tax_rate_bps || 1800) / 100}
                required
              />
            </label>

            <label className="ops-field ops-field-full">
              Registered Office Address
              <textarea
                name="address"
                rows={2}
                defaultValue={current.address || ""}
              />
            </label>
          </div>
        </section>

        {/* Bank & UPI QR Settings */}
        <section className="ops-panel">
          <h2 className="text-base font-bold text-gray-900 mb-4">
            Bank Settlement & Dynamic UPI QR
          </h2>
          <div className="ops-form-grid">
            <label className="ops-field">
              Bank Name
              <input
                name="bank_name"
                defaultValue={current.bank_name || ""}
                placeholder="HDFC Bank / ICICI Bank"
              />
            </label>

            <label className="ops-field">
              Beneficiary Account Name
              <input
                name="account_name"
                defaultValue={current.account_name || ""}
                placeholder="Gavior Technologies Pvt Ltd"
              />
            </label>

            <label className="ops-field">
              Account Number
              <input
                name="account_number"
                defaultValue={current.account_number || ""}
                placeholder="50200012345678"
              />
            </label>

            <label className="ops-field">
              IFSC Code
              <input
                name="ifsc"
                defaultValue={current.ifsc || ""}
                placeholder="HDFC0001234"
              />
            </label>

            <label className="ops-field ops-field-full">
              UPI ID (for Dynamic QR Code generation on Invoices)
              <input
                name="upi_id"
                defaultValue={current.upi_id || ""}
                placeholder="gavior@hdfcbank or phone@upi"
              />
            </label>
          </div>
        </section>

        {/* Document Sequences & Terms */}
        <section className="ops-panel">
          <h2 className="text-base font-bold text-gray-900 mb-4">
            Document Numbering & Standard Terms
          </h2>
          <div className="ops-form-grid">
            <label className="ops-field">
              Quotation Prefix
              <input
                name="quotation_prefix"
                defaultValue={current.quotation_prefix || "GAV-Q"}
                required
              />
            </label>

            <label className="ops-field">
              Invoice Prefix
              <input
                name="invoice_prefix"
                defaultValue={current.invoice_prefix || "GAV-INV"}
                required
              />
            </label>

            <label className="ops-field">
              Gemini AI Proposal Model
              <select name="ai_model" defaultValue={current.ai_model || "gemini-3.6-flash"}>
                <option value="gemini-3.6-flash">Gemini 3.6 Flash (Fast & Structured)</option>
              </select>
            </label>

            <label className="ops-field ops-field-full">
              Default Commercial Terms & Legal Conditions
              <textarea
                name="default_terms"
                rows={4}
                defaultValue={current.default_terms || ""}
              />
            </label>
          </div>
        </section>

        <div className="flex justify-end">
          <button className="ops-btn" type="submit">
            Save All Settings
          </button>
        </div>
      </form>

      {/* ── SMTP Diagnostic Test Panel ── */}
      <section className="ops-panel mt-8">
        <h2 className="text-base font-bold text-gray-900 mb-2">
          Hostinger SMTP Diagnostic Test
        </h2>
        <p className="text-xs text-gray-500 mb-4">
          Send a live test verification email to confirm the connection with <code>smtp.hostinger.com:587</code>.
        </p>

        <form action={testSmtpConnectionAction} className="flex gap-3">
          <input
            name="test_email"
            type="email"
            required
            placeholder="Enter your email to receive verification"
            className="flex-1"
          />
          <button className="ops-btn ops-btn-secondary" type="submit">
            Send SMTP Test Email
          </button>
        </form>
      </section>
    </div>
  );
}
