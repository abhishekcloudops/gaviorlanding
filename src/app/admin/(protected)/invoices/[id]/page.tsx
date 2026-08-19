import { notFound } from "next/navigation";
import Image from "next/image";
import { issueInvoiceAction, recordPaymentAction } from "@/app/admin/actions";
import { AdminNotice } from "@/components/admin/notice";
import { ConfirmButton, PrintButton } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { formatMoney } from "@/lib/admin/money";

export default async function InvoiceDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const { supabase } = await requireAdmin();

  const [{ data: invoice }, { data: currentCompany }, { data: payments }] = await Promise.all([
    supabase.from("invoices").select("*,clients(*),invoice_items(*)").eq("id", id).maybeSingle(),
    supabase.from("company_settings").select("*").eq("id", "default").single(),
    supabase.from("payments").select("*").eq("invoice_id", id).order("paid_at", { ascending: false }),
  ]);

  if (!invoice) notFound();

  const snapshot = invoice.immutable_snapshot as {
    company?: Record<string, string>;
    invoice?: Record<string, unknown>;
  } | null;
  const company = snapshot?.company || currentCompany;
  const client = invoice.clients as Record<string, string | null>;
  const items = (invoice.invoice_items || []).sort(
    (a: { position: number }, b: { position: number }) => a.position - b.position,
  );
  const sameState = Boolean(
    company?.state_code && client?.state_code && company.state_code === client.state_code,
  );
  const balance = Number(invoice.total_paise) - Number(invoice.amount_paid_paise);
  const payable =
    ["issued", "sent", "partially_paid", "overdue"].includes(invoice.status) && balance > 0;
  const isTaxInvoice = Boolean(company?.gstin);

  return (
    <main>
      {/* ── Admin toolbar (no-print) ── */}
      <header className="admin-page-header no-print">
        <div>
          <p className="admin-eyebrow">{invoice.invoice_number}</p>
          <h1>{invoice.title}</h1>
          <p className="admin-muted">
            Status: <span className="admin-badge">{invoice.status}</span>
          </p>
        </div>
        <div className="admin-actions">
          <PrintButton />
          {invoice.status === "draft" && (
            <form action={issueInvoiceAction}>
              <input type="hidden" name="id" value={id} />
              <ConfirmButton message="Issue and permanently snapshot this invoice? Financial fields will be locked.">
                Issue invoice
              </ConfirmButton>
            </form>
          )}
        </div>
      </header>

      <AdminNotice {...query} />

      {/* ══════════════════════════════════════════════
          INVOICE DOCUMENT — corporate design
      ══════════════════════════════════════════════ */}
      <article className="corp-document">

        {/* ── Document header with logo ── */}
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
              {isTaxInvoice ? "TAX INVOICE" : "INVOICE"}
            </div>
            <table className="corp-meta-table">
              <tbody>
                <tr>
                  <td>Invoice No.</td>
                  <td><strong>{invoice.invoice_number}</strong></td>
                </tr>
                <tr>
                  <td>Issue Date</td>
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
                    <td>Due Date</td>
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

        {/* ── Address bar ── */}
        <div className="corp-address-bar">
          <div className="corp-address-block">
            <p className="corp-address-label">Bill to</p>
            <p className="corp-address-name">{client?.company_name}</p>
            <p>{client?.contact_name}</p>
            <p className="corp-address-detail">{client?.billing_address}</p>
            {client?.gstin && <p className="corp-address-detail">GSTIN: {client.gstin}</p>}
          </div>
          <div className="corp-address-block">
            <p className="corp-address-label">Supply Details</p>
            <p className="corp-address-detail">Place of supply: {invoice.place_of_supply || client?.state || "—"}</p>
            <p className="corp-address-detail">Reverse charge: No</p>
            <p className="corp-address-detail">Currency: INR</p>
          </div>
        </div>

        {/* ── Line items ── */}
        <section className="corp-section">
          <h2 className="corp-section-title">Items</h2>
          <table className="corp-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Tax</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item: Record<string, string | number>) => (
                <tr key={String(item.id)}>
                  <td>
                    <strong>{item.description}</strong>
                    {item.sac_hsn ? (
                      <>
                        <br />
                        <span className="corp-small">SAC/HSN: {item.sac_hsn}</span>
                      </>
                    ) : null}
                  </td>
                  <td>{item.quantity} {item.unit}</td>
                  <td>{formatMoney(item.unit_price_paise)}</td>
                  <td>{Number(item.tax_rate_bps) / 100}%</td>
                  <td><strong>{formatMoney(item.line_total_paise)}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="corp-totals">
            <div className="corp-total-row">
              <span>Taxable Value</span>
              <span>{formatMoney(invoice.subtotal_paise)}</span>
            </div>
            {sameState ? (
              <>
                <div className="corp-total-row">
                  <span>CGST</span>
                  <span>{formatMoney(Math.round(Number(invoice.tax_paise) / 2))}</span>
                </div>
                <div className="corp-total-row">
                  <span>SGST</span>
                  <span>{formatMoney(Number(invoice.tax_paise) - Math.round(Number(invoice.tax_paise) / 2))}</span>
                </div>
              </>
            ) : (
              <div className="corp-total-row">
                <span>IGST</span>
                <span>{formatMoney(invoice.tax_paise)}</span>
              </div>
            )}
            <div className="corp-total-row corp-total-grand">
              <span>Invoice Total</span>
              <span>{formatMoney(invoice.total_paise)}</span>
            </div>
            {Number(invoice.amount_paid_paise) > 0 && (
              <div className="corp-total-row">
                <span>Amount Paid</span>
                <span>− {formatMoney(invoice.amount_paid_paise)}</span>
              </div>
            )}
            {balance > 0 && (
              <div className="corp-total-row corp-total-balance">
                <span>Balance Due</span>
                <span>{formatMoney(balance)}</span>
              </div>
            )}
          </div>
        </section>

        {/* ── Payment & Terms ── */}
        <div className="corp-address-bar corp-address-bar--bottom">
          <div className="corp-address-block">
            <p className="corp-address-label">Payment Details</p>
            {company?.bank_name && <p className="corp-address-detail">{company.bank_name}</p>}
            {company?.account_name && <p className="corp-address-detail">A/C Name: {company.account_name}</p>}
            {company?.account_number && <p className="corp-address-detail">A/C No: {company.account_number}</p>}
            {company?.ifsc && <p className="corp-address-detail">IFSC: {company.ifsc}</p>}
            {company?.upi_id && <p className="corp-address-detail">UPI: {company.upi_id}</p>}
          </div>
          <div className="corp-address-block">
            <p className="corp-address-label">Notes</p>
            <p className="corp-body">{invoice.notes || company?.default_terms || "Thank you for your business."}</p>
          </div>
        </div>

        {/* ── Footer with logo ── */}
        <footer className="corp-doc-footer">
          <Image
            src="/brand/gavior-logo-header.avif"
            alt="Gavior"
            width={80}
            height={24}
            className="corp-footer-logo"
          />
          <p>This document is confidential and prepared exclusively for the named recipient.</p>
        </footer>
      </article>

      {/* ── Record payment panel ── */}
      {payable && (
        <section className="admin-panel no-print">
          <h2>Record payment</h2>
          <form action={recordPaymentAction} className="admin-inline-form">
            <input type="hidden" name="id" value={id} />
            <label className="admin-field">
              Amount (₹)
              <input
                name="amount"
                type="number"
                min="0.01"
                step="0.01"
                max={(balance / 100).toFixed(2)}
                required
              />
            </label>
            <label className="admin-field">
              Paid on
              <input
                name="paid_at"
                type="date"
                defaultValue={new Date().toISOString().slice(0, 10)}
                required
              />
            </label>
            <label className="admin-field">
              Method
              <input name="method" maxLength={80} placeholder="UPI / Bank transfer" />
            </label>
            <label className="admin-field">
              Reference
              <input name="reference" maxLength={160} />
            </label>
            <button className="admin-button" type="submit">Record payment</button>
          </form>
        </section>
      )}

      {/* ── Payment history ── */}
      <section className="admin-panel no-print">
        <h2>Payment history</h2>
        {payments?.length ? (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Reference</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.paid_at}</td>
                    <td>{formatMoney(payment.amount_paise)}</td>
                    <td>{payment.method || "—"}</td>
                    <td>{payment.reference || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="admin-muted">No payments recorded.</p>
        )}
      </section>
    </main>
  );
}
