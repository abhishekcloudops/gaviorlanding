import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { formatMoney } from "@/lib/admin/money";

export default async function AdminDashboard() {
  const { supabase, profile } = await requireAdmin();
  const [clients, quotations, invoices, outstanding] = await Promise.all([
    supabase.from("clients").select("id", { count: "exact", head: true }),
    supabase.from("quotations").select("id", { count: "exact", head: true }),
    supabase.from("invoices").select("id", { count: "exact", head: true }),
    supabase.from("invoices").select("total_paise,amount_paid_paise").in("status", ["issued", "sent", "partially_paid", "overdue"]),
  ]);
  const due = (outstanding.data || []).reduce((sum, item) => sum + Number(item.total_paise) - Number(item.amount_paid_paise), 0);
  return (
    <main>
      <header className="admin-page-header"><div><p className="admin-eyebrow">Operations overview</p><h1>Welcome{profile.full_name ? `, ${profile.full_name}` : ""}</h1><p className="admin-muted">Create accurate proposals and keep billing records controlled.</p></div><Link className="admin-button" href="/admin/quotations/new">New quotation</Link></header>
      <section className="admin-stat-grid">
        <article><span>Clients</span><strong>{clients.count || 0}</strong></article>
        <article><span>Quotations</span><strong>{quotations.count || 0}</strong></article>
        <article><span>Invoices</span><strong>{invoices.count || 0}</strong></article>
        <article><span>Outstanding</span><strong>{formatMoney(due)}</strong></article>
      </section>
      <section className="admin-panel"><h2>Secure workflow</h2><div className="admin-step-grid"><p><b>1. Add client</b><br />Store billing and GST details once.</p><p><b>2. Draft quotation</b><br />Enter facts, scope summary and pricing.</p><p><b>3. Generate and review</b><br />Gemini writes prose; you approve it.</p><p><b>4. Invoice</b><br />Accept, convert, issue and record payments.</p></div></section>
    </main>
  );
}
