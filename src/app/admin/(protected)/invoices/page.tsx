import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { formatMoney } from "@/lib/admin/money";

export default async function InvoicesPage() {
  const { supabase } = await requireAdmin();
  const { data: invoices } = await supabase.from("invoices").select("id,invoice_number,title,status,total_paise,amount_paid_paise,due_date,created_at,clients(company_name)").order("created_at", { ascending: false });
  return <main><header className="admin-page-header"><div><p className="admin-eyebrow">Billing</p><h1>Invoices</h1><p className="admin-muted">Issued records are snapshotted and financial fields are locked.</p></div></header>
    <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Number</th><th>Client</th><th>Title</th><th>Status</th><th>Total</th><th>Balance</th><th>Due</th></tr></thead><tbody>{invoices?.map((invoice) => <tr key={invoice.id}><td><Link href={`/admin/invoices/${invoice.id}`}>{invoice.invoice_number}</Link></td><td>{(invoice.clients as unknown as { company_name: string } | null)?.company_name || "—"}</td><td>{invoice.title}</td><td><span className="admin-badge">{invoice.status}</span></td><td>{formatMoney(invoice.total_paise)}</td><td>{formatMoney(Number(invoice.total_paise) - Number(invoice.amount_paid_paise))}</td><td>{invoice.due_date || "—"}</td></tr>)}</tbody></table>{!invoices?.length && <p className="admin-empty">No invoices yet. Accept a quotation to create one.</p>}</div>
  </main>;
}
