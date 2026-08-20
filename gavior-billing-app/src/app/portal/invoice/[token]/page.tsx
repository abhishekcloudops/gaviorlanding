import { notFound } from "next/navigation";
import Image from "next/image";
import { CheckCircle2, Printer, QrCode, ShieldCheck } from "lucide-react";
import { formatMoney } from "@/lib/money";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { generateUpiLink, generateUpiQrDataUrl } from "@/lib/upi";

export const dynamic = "force-dynamic";

export default async function PublicInvoicePortalPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const supabase = await createSupabaseServerClient();

  const [
    { data: invoice },
    { data: company },
  ] = await Promise.all([
    supabase
      .from("ops_invoices")
      .select("*, clients(*), ops_invoice_items(*)")
      .eq("portal_token", token)
      .maybeSingle(),
    supabase.from("ops_company_settings").select("*").eq("id", "default").single(),
  ]);

  if (!invoice) notFound();

  // If status is sent, mark as viewed
  if (invoice.status === "sent") {
    await supabase.from("ops_invoices").update({ status: "viewed" }).eq("id", invoice.id);
  }

  const client = invoice.clients;
  const items = (invoice.ops_invoice_items || []).sort(
    (a: { position: number }, b: { position: number }) => a.position - b.position,
  );
  const balanceDue = Number(invoice.balance_due_paise || 0);
  const isPaid = invoice.status === "paid" || balanceDue === 0;

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
    <div className="min-h-screen bg-[#f4f7f5] py-8 px-4 sm:px-6">
      {/* Top Banner */}
      <div className="max-w-[860px] mx-auto mb-6 flex items-center justify-between no-print">
        <div className="flex items-center gap-2 text-xs font-bold text-[#1a3d5c]">
          <ShieldCheck size={16} /> Secure Client Billing Portal
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="ops-btn ops-btn-secondary text-xs"
            onClick={() => window.print()}
          >
            <Printer size={14} /> Print / Save Tax PDF
          </button>
        </div>
      </div>

      {/* Payment Settlement Alert Card */}
      {isPaid ? (
        <div className="max-w-[860px] mx-auto mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-900 flex items-center gap-3 no-print">
          <CheckCircle2 size={20} className="text-green-600 shrink-0" />
          <div>
            <p className="font-bold text-sm">Invoice Fully Paid & Settled</p>
            <p className="text-xs text-green-700">
              Payment confirmed. Thank you for your business!
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-[860px] mx-auto mb-6 p-5 rounded-xl bg-white border border-[#dde5e0] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
          <div>
            <p className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
              <QrCode size={16} className="text-[#1e6a47]" /> Instant Mobile Payment via UPI QR
            </p>
            <p className="text-xs text-gray-500">
              Scan with Google Pay, PhonePe, Paytm, or BHIM app to settle this invoice directly.
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-500 block">Balance Outstanding:</span>
            <span className="text-lg font-extrabold text-[#b45309]">
              {formatMoney(balanceDue)}
            </span>
          </div>
        </div>
      )}

      {/* Corporate Tax Invoice Document */}
      <article className="corp-document">
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
          </div>
        </div>

        {/* Itemized Table */}
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

          {/* Totals Box */}
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

        {/* Payment Details with Dynamic UPI QR */}
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

        {invoice.notes && (
          <section className="corp-section">
            <h2 className="corp-section-title">Settlement Notes</h2>
            <p className="corp-body">{invoice.notes}</p>
          </section>
        )}

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
    </div>
  );
}
