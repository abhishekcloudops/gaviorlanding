import { notFound } from "next/navigation";
import { issueInvoiceAction, recordPaymentAction } from "@/app/admin/actions";
import { AdminNotice } from "@/components/admin/notice";
import { ConfirmButton, PrintButton } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { formatMoney } from "@/lib/admin/money";

export default async function InvoiceDetailPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string; error?: string }> }) {
  const { id } = await params; const query = await searchParams; const { supabase } = await requireAdmin();
  const [{ data: invoice }, { data: currentCompany }, { data: payments }] = await Promise.all([
    supabase.from("invoices").select("*,clients(*),invoice_items(*)").eq("id", id).maybeSingle(),
    supabase.from("company_settings").select("*").eq("id", "default").single(),
    supabase.from("payments").select("*").eq("invoice_id", id).order("paid_at", { ascending: false }),
  ]);
  if (!invoice) notFound();
  const snapshot = invoice.immutable_snapshot as { company?: Record<string, string>; invoice?: Record<string, unknown> } | null;
  const company = snapshot?.company || currentCompany;
  const client = invoice.clients as Record<string, string | null>;
  const items = (invoice.invoice_items || []).sort((a: { position: number }, b: { position: number }) => a.position - b.position);
  const sameState = Boolean(company?.state_code && client?.state_code && company.state_code === client.state_code);
  const balance = Number(invoice.total_paise) - Number(invoice.amount_paid_paise);
  const payable = ["issued", "sent", "partially_paid", "overdue"].includes(invoice.status) && balance > 0;
  return <main><header className="admin-page-header no-print"><div><p className="admin-eyebrow">{invoice.invoice_number}</p><h1>{invoice.title}</h1><p className="admin-muted">Status: <span className="admin-badge">{invoice.status}</span></p></div><div className="admin-actions"><PrintButton />{invoice.status === "draft" && <form action={issueInvoiceAction}><input type="hidden" name="id" value={id} /><ConfirmButton message="Issue and permanently snapshot this invoice? Financial fields will be locked.">Issue invoice</ConfirmButton></form>}</div></header><AdminNotice {...query} />
    <article className="admin-document"><header className="admin-document-head"><div><div className="admin-brand">GAVIOR</div><p><b>{company?.legal_name}</b><br />{company?.address}<br />{company?.gstin ? `GSTIN: ${company.gstin}` : ""}<br />{company?.pan ? `PAN: ${company.pan}` : ""}</p></div><div className="admin-document-meta"><h2>{company?.gstin ? "TAX INVOICE" : "INVOICE"}</h2><p><b>{invoice.invoice_number}</b><br />Issue date: {new Date(invoice.issue_date).toLocaleDateString("en-IN")}<br />Due date: {invoice.due_date ? new Date(invoice.due_date).toLocaleDateString("en-IN") : "—"}</p></div></header>
      <section className="admin-detail-grid"><div><h2>Bill to</h2><p><b>{client?.company_name}</b><br />{client?.contact_name}<br />{client?.billing_address}<br />{client?.gstin ? `GSTIN: ${client.gstin}` : ""}</p></div><div><h2>Supply details</h2><p>Place of supply: {invoice.place_of_supply || client?.state || "—"}<br />Reverse charge: No<br />Currency: INR</p></div></section>
      <section><h2>Items</h2><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Description</th><th>Qty</th><th>Rate</th><th>Tax</th><th>Amount</th></tr></thead><tbody>{items.map((item: Record<string, string | number>) => <tr key={String(item.id)}><td>{item.description}<br /><small>{item.sac_hsn ? `SAC/HSN: ${item.sac_hsn}` : ""}</small></td><td>{item.quantity} {item.unit}</td><td>{formatMoney(item.unit_price_paise)}</td><td>{Number(item.tax_rate_bps) / 100}%</td><td>{formatMoney(item.line_total_paise)}</td></tr>)}</tbody></table></div>
        <div className="admin-total-box"><div className="admin-total-row"><span>Taxable value</span><b>{formatMoney(invoice.subtotal_paise)}</b></div>{sameState ? <><div className="admin-total-row"><span>CGST</span><b>{formatMoney(Math.round(Number(invoice.tax_paise) / 2))}</b></div><div className="admin-total-row"><span>SGST</span><b>{formatMoney(Number(invoice.tax_paise) - Math.round(Number(invoice.tax_paise) / 2))}</b></div></> : <div className="admin-total-row"><span>IGST</span><b>{formatMoney(invoice.tax_paise)}</b></div>}<div className="admin-total-row"><span>Invoice total</span><b>{formatMoney(invoice.total_paise)}</b></div><div className="admin-total-row"><span>Balance due</span><b>{formatMoney(balance)}</b></div></div>
      </section>
      <section className="admin-detail-grid"><div><h2>Payment details</h2><p>{company?.bank_name}<br />A/C name: {company?.account_name}<br />A/C no: {company?.account_number}<br />IFSC: {company?.ifsc}<br />UPI: {company?.upi_id}</p></div><div><h2>Notes</h2><p>{invoice.notes || company?.default_terms || "Thank you for your business."}</p></div></section>
    </article>
    {payable && <section className="admin-panel no-print"><h2>Record payment</h2><form action={recordPaymentAction} className="admin-inline-form"><input type="hidden" name="id" value={id} /><label className="admin-field">Amount (₹)<input name="amount" type="number" min="0.01" step="0.01" max={(balance / 100).toFixed(2)} required /></label><label className="admin-field">Paid on<input name="paid_at" type="date" defaultValue={new Date().toISOString().slice(0, 10)} required /></label><label className="admin-field">Method<input name="method" maxLength={80} placeholder="UPI / Bank transfer" /></label><label className="admin-field">Reference<input name="reference" maxLength={160} /></label><button className="admin-button" type="submit">Record payment</button></form></section>}
    <section className="admin-panel no-print"><h2>Payment history</h2>{payments?.length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Date</th><th>Amount</th><th>Method</th><th>Reference</th></tr></thead><tbody>{payments.map((payment) => <tr key={payment.id}><td>{payment.paid_at}</td><td>{formatMoney(payment.amount_paise)}</td><td>{payment.method || "—"}</td><td>{payment.reference || "—"}</td></tr>)}</tbody></table></div> : <p className="admin-muted">No payments recorded.</p>}</section>
  </main>;
}
