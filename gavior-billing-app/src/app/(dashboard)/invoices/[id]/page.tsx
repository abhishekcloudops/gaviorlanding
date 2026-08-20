import { notFound } from "next/navigation";
import Image from "next/image";
import { recordPaymentAction } from "@/app/actions/invoices";
import { sendInvoiceToClientAction } from "@/app/actions/dispatch";
import { PrintButton } from "@/components/ui/buttons";
import { Notice } from "@/components/ui/notice";
import { SendDocumentModal } from "@/components/ui/send-modal";
import { formatMoney, paiseToRupees } from "@/lib/money";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { generateUpiLink, generateUpiQrDataUrl } from "@/lib/upi";

export const dynamic = "force-dynamic";

export default async function InvoiceDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const supabase = await createSupabaseServerClient();

  const [
    { data: invoice },
    { data: company },
    { data: payments },
  ] = await Promise.all([
    supabase
      .from("ops_invoices")
      .select("*, clients(*), ops_invoice_items(*)")
      .eq("id", id)
      .maybeSingle(),
    supabase.from("ops_company_settings").select("*").eq("id", "default").single(),
    supabase
      .from("ops_payments")
      .select("*")
      .eq("invoice_id", id)
      .order("paid_at", { ascending: false }),
  ]);

  if (!invoice) notFound();

  const client = invoice.clients;
  const items = (invoice.ops_invoice_items || []).sort(
    (a: { position: number }, b: { position: number }) => a.position - b.position,
  );
  const balanceDue = Number(invoice.balance_due_paise || 0);
  const isPayable = balanceDue > 0 && invoice.status !== "cancelled";

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";
  const portalUrl = `${appUrl}/portal/invoice/${invoice.portal_token}`;

  // Generate UPI QR
  const upiString = company?.upi_id
    ? generateUpiLink({
        upiId: company.upi_id,
        payeeName: company.account_name || company.trading_name || "Gavior",
        amountPaise: balanceDue > 0 ? balanceDue : invoice.total_paise,
        invoiceNumber: invoice.invoice_number,
        transactionNote: `Payment for ${invoice.invoice_number}`,
      })
    : "";

  const upiQrDataUrl = upiString ? await generateUpiQrDataUrl(upiString) : "";

  return (
    <div>
      {/* ── Admin Toolbar (No Print) ── */}
      <header className="ops-page-header no-print">
        <div>
          <p className="ops-eyebrow">{invoice.invoice_number}</p>
          <h1 className="ops-title">{invoice.title}</h1>
          <p className="ops-muted">
            Status: <span className="ops-badge">{invoice.status}</span> • Issue Date:{" "}
            {new Date(invoice.issue_date).toLocaleDateString("en-IN")}
          </p>
        </div>
        <div className="ops-actions">
          <PrintButton />

          <SendDocumentModal
            documentType="invoice"
            documentId={invoice.id}
            documentNumber={invoice.invoice_number}
            title={invoice.title}
            clientEmail={client?.email}
            clientPhone={client?.phone}
            clientName={client?.company_name || client?.contact_name || "Valued Client"}
            totalFormatted={formatMoney(invoice.total_paise)}
            portalUrl={portalUrl}
            sendEmailAction={sendInvoiceToClientAction}
          />
        </div>
      </header>

      <Notice {...query} />

      {/* ═════════════════════════════════════════════════════════
          CORPORATE TAX INVOICE DOCUMENT (A4 & Print Preview)
      ═════════════════════════════════════════════════════════ */}
      <article className="corp-document">
        {/* ── Document Header with Logo ── */}
        <header className="corp-doc-header">
          <div className="corp-doc-brand">
            <Image
              src="/brand/gavior-logo-header.avif"
              alt="Gavior"
              width={120}
              height={36}
              className="corp-logo"
              priority
            />
            <div className="corp-doc-brand-meta">
              <p><strong>{company?.legal_name}</strong></p>
              <p>{company?.address}</p>
              {company?.gstin && <p>GSTIN: {company.gstin}</p>}
              {company?.pan && <p>PAN: {company.pan}</p>}
            </div>
          </div>

          <div className="corp-doc-title-block">
            <div className="corp-doc-type corp-doc-type--invoice">
              {company?.gstin ? "TAX INVOICE" : "INVOICE"}
            </div>
            <table className="corp-meta-table">
              <tbody>
                <tr>
                  <td>Invoice Number:</td>
                  <td><strong>{invoice.invoice_number}</strong></td>
                </tr>
                <tr>
                  <td>Issue Date:</td>
                  <td>
                    {new Date(invoice.issue_date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                </tr>
                {invoice.due_date && (
                  <tr>
                    <td>Payment Due:</td>
                    <td>
                      <strong>
                        {new Date(invoice.due_date).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </strong>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </header>

        {/* ── Address & Supply Details ── */}
        <div className="corp-address-bar">
          <div className="corp-address-block">
            <p className="corp-address-label">Billed To (Client)</p>
            <p className="corp-address-name">{client?.company_name}</p>
            {client?.contact_name && <p>{client.contact_name}</p>}
            <p className="corp-address-detail">{client?.billing_address}</p>
            {client?.gstin && <p className="corp-address-detail">GSTIN: {client.gstin}</p>}
          </div>

          <div className="corp-address-block">
            <p className="corp-address-label">Supply & Settlement Details</p>
            <p className="corp-address-detail">
              Place of Supply: {invoice.place_of_supply || client?.state || "Karnataka"}
            </p>
            <p className="corp-address-detail">Reverse Charge Applicable: No</p>
            <p className="corp-address-detail">Currency: INR (₹)</p>
            {invoice.billing_period_start && invoice.billing_period_end && (
              <p className="corp-address-detail font-bold text-[#1e6a47] mt-1">
                Billing Period: {invoice.billing_period_start} to {invoice.billing_period_end}
              </p>
            )}
          </div>
        </div>

        {/* ── Itemized Billed Services ── */}
        <section className="corp-section">
          <h2 className="corp-section-title">Billed Services & Deliverables</h2>
          <table className="corp-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Qty</th>
                <th>Rate (₹)</th>
                <th>GST</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item: { id: string; description: string; sac_hsn: string | null; quantity: number; unit: string; unit_price_paise: number; tax_rate_bps: number; line_total_paise: number }) => (
                <tr key={String(item.id)}>
                  <td>
                    <strong>{item.description}</strong>
                    {item.sac_hsn ? (
                      <span className="corp-small">SAC/HSN: {item.sac_hsn}</span>
                    ) : null}
                  </td>
                  <td>
                    {item.quantity} {item.unit}
                  </td>
                  <td>{formatMoney(item.unit_price_paise)}</td>
                  <td>{Number(item.tax_rate_bps) / 100}%</td>
                  <td>
                    <strong>{formatMoney(item.line_total_paise)}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals & GST Split */}
          <div className="corp-totals">
            <div className="corp-total-row">
              <span>Taxable Value</span>
              <span>{formatMoney(invoice.subtotal_paise)}</span>
            </div>

            {Number(invoice.cgst_paise) > 0 ? (
              <>
                <div className="corp-total-row">
                  <span>CGST (9%)</span>
                  <span>{formatMoney(invoice.cgst_paise)}</span>
                </div>
                <div className="corp-total-row">
                  <span>SGST (9%)</span>
                  <span>{formatMoney(invoice.sgst_paise)}</span>
                </div>
              </>
            ) : (
              <div className="corp-total-row">
                <span>IGST (18%)</span>
                <span>{formatMoney(invoice.igst_paise || invoice.tax_paise)}</span>
              </div>
            )}

            <div className="corp-total-row corp-total-grand">
              <span>Invoice Total</span>
              <span>{formatMoney(invoice.total_paise)}</span>
            </div>

            {Number(invoice.amount_paid_paise) > 0 && (
              <div className="corp-total-row">
                <span className="text-[#1e6a47] font-bold">Amount Paid</span>
                <span className="text-[#1e6a47] font-bold">
                  − {formatMoney(invoice.amount_paid_paise)}
                </span>
              </div>
            )}

            <div
              className={`corp-total-row ${
                balanceDue > 0 ? "corp-total-balance" : "bg-green-50 text-green-800"
              }`}
            >
              <span>{balanceDue > 0 ? "Balance Outstanding" : "Invoice Fully Settled"}</span>
              <span>{formatMoney(balanceDue)}</span>
            </div>
          </div>
        </section>

        {/* ── Payment Details with Dynamic UPI QR ── */}
        <div className="corp-address-bar">
          <div className="corp-address-block">
            <p className="corp-address-label">Direct Bank Settlement</p>
            {company?.bank_name && (
              <p className="corp-address-detail">Bank: {company.bank_name}</p>
            )}
            {company?.account_name && (
              <p className="corp-address-detail">A/C Name: {company.account_name}</p>
            )}
            {company?.account_number && (
              <p className="corp-address-detail font-mono">
                A/C No: <strong>{company.account_number}</strong>
              </p>
            )}
            {company?.ifsc && (
              <p className="corp-address-detail font-mono">
                IFSC: <strong>{company.ifsc}</strong>
              </p>
            )}
            {company?.upi_id && (
              <p className="corp-address-detail font-bold text-[#1e6a47] mt-1">
                UPI ID: {company.upi_id}
              </p>
            )}
          </div>

          <div className="corp-address-block flex items-center justify-between">
            <div>
              <p className="corp-address-label">Scan UPI QR to Pay</p>
              <p className="text-xs text-gray-500 max-w-[160px] leading-relaxed">
                Scan with Google Pay, PhonePe, Paytm or BHIM app.
              </p>
              {balanceDue > 0 && (
                <p className="text-xs font-bold text-[#b45309] mt-1">
                  Amount: {formatMoney(balanceDue)}
                </p>
              )}
            </div>
            {upiQrDataUrl && (
              <div className="p-2 bg-white rounded-lg border border-gray-200 shadow-sm shrink-0">
                <Image
                  src={upiQrDataUrl}
                  alt="UPI Payment QR Code"
                  width={100}
                  height={100}
                  className="rounded"
                />
              </div>
            )}
          </div>
        </div>

        {/* ── Terms ── */}
        {invoice.notes && (
          <section className="corp-section">
            <h2 className="corp-section-title">Settlement Notes</h2>
            <p className="corp-body">{invoice.notes}</p>
          </section>
        )}

        {/* ── Footer ── */}
        <footer className="corp-doc-footer">
          <Image
            src="/brand/gavior-logo-header.avif"
            alt="Gavior"
            width={80}
            height={24}
            className="corp-footer-logo"
          />
          <p>Thank you for partnering with Gavior Technologies Private Limited.</p>
        </footer>
      </article>

      {/* ── Record Payment Panel (No Print) ── */}
      {isPayable && (
        <section className="ops-panel no-print">
          <h2 className="text-base font-bold text-gray-900 mb-1">
            Record Client Payment / Bank Settlement
          </h2>
          <p className="text-xs text-gray-500 mb-4">
            Record partial or full payment received via UPI, NEFT/RTGS, or payment gateway.
          </p>

          <form action={recordPaymentAction} className="ops-form-grid">
            <input type="hidden" name="id" value={id} />

            <label className="ops-field">
              Amount Received (₹)
              <input
                name="amount"
                type="number"
                step="0.01"
                min="0.01"
                max={paiseToRupees(balanceDue).toFixed(2)}
                defaultValue={paiseToRupees(balanceDue).toFixed(2)}
                required
              />
            </label>

            <label className="ops-field">
              Settlement Date
              <input
                name="paid_at"
                type="date"
                defaultValue={new Date().toISOString().slice(0, 10)}
                required
              />
            </label>

            <label className="ops-field">
              Payment Method
              <select name="method" defaultValue="UPI">
                <option value="UPI">UPI / QR Scan</option>
                <option value="NEFT/RTGS">NEFT / RTGS / IMPS</option>
                <option value="Stripe">Stripe / Credit Card</option>
                <option value="Cheque">Cheque</option>
                <option value="Cash">Cash</option>
              </select>
            </label>

            <label className="ops-field">
              Transaction Reference / UTR Number
              <input
                name="reference"
                placeholder="e.g. UTR-428910398410 or UPI Ref ID"
              />
            </label>

            <div className="ops-field-full">
              <button className="ops-btn" type="submit">
                Record Payment & Update Ledger
              </button>
            </div>
          </form>
        </section>
      )}

      {/* ── Payment Transactions History (No Print) ── */}
      <section className="ops-panel no-print">
        <h2 className="text-base font-bold text-gray-900 mb-4">
          Payment Transactions Log
        </h2>
        <div className="ops-table-wrap">
          <table className="ops-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Method</th>
                <th>UTR / Reference</th>
                <th>Recorded At</th>
              </tr>
            </thead>
            <tbody>
              {(payments || []).map((p) => (
                <tr key={p.id}>
                  <td>{p.paid_at}</td>
                  <td className="font-bold text-[#1e6a47]">
                    {formatMoney(p.amount_paise)}
                  </td>
                  <td>
                    <span className="ops-badge">{p.payment_method || "UPI"}</span>
                  </td>
                  <td className="font-mono text-xs text-gray-600">
                    {p.reference || "—"}
                  </td>
                  <td className="text-xs text-gray-400">
                    {new Date(p.created_at).toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
              {(!payments || payments.length === 0) && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-400">
                    No payment settlements recorded for this invoice yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
