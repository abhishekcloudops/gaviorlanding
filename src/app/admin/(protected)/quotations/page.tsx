import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { formatMoney } from "@/lib/admin/money";

export default async function QuotationsPage() {
  const { supabase } = await requireAdmin();
  const { data: quotes } = await supabase.from("quotations").select("id,quotation_number,title,status,total_paise,valid_until,created_at,clients(company_name)").order("created_at", { ascending: false });
  return <main><header className="admin-page-header"><div><p className="admin-eyebrow">Sales documents</p><h1>Quotations</h1><p className="admin-muted">Draft, generate, review and approve before invoicing.</p></div><Link href="/admin/quotations/new" className="admin-button">New quotation</Link></header>
    <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Number</th><th>Client</th><th>Title</th><th>Status</th><th>Total</th><th>Valid until</th></tr></thead><tbody>{quotes?.map((quote) => <tr key={quote.id}><td><Link href={`/admin/quotations/${quote.id}`}>{quote.quotation_number}</Link></td><td>{(quote.clients as unknown as { company_name: string } | null)?.company_name || "—"}</td><td>{quote.title}</td><td><span className="admin-badge">{quote.status}</span></td><td>{formatMoney(quote.total_paise)}</td><td>{quote.valid_until || "—"}</td></tr>)}</tbody></table>{!quotes?.length && <p className="admin-empty">No quotations yet.</p>}</div>
  </main>;
}
