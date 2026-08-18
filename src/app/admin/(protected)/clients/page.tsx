import { createClientAction } from "@/app/admin/actions";
import { AdminNotice } from "@/components/admin/notice";
import { requireAdmin } from "@/lib/admin/auth";

export default async function ClientsPage({ searchParams }: { searchParams: Promise<{ saved?: string; error?: string }> }) {
  const { supabase } = await requireAdmin();
  const params = await searchParams;
  const { data: clients } = await supabase.from("clients").select("*").order("created_at", { ascending: false });
  return <main><header className="admin-page-header"><div><p className="admin-eyebrow">CRM</p><h1>Clients</h1><p className="admin-muted">Billing and contact details used in documents.</p></div></header><AdminNotice {...params} />
    <section className="admin-panel"><h2>Add client</h2><form action={createClientAction} className="admin-form-grid">
      <label className="admin-field">Company name<input name="company_name" required maxLength={160} /></label>
      <label className="admin-field">Contact person<input name="contact_name" maxLength={120} /></label>
      <label className="admin-field">Email<input name="email" type="email" maxLength={254} /></label>
      <label className="admin-field">Phone<input name="phone" maxLength={30} /></label>
      <label className="admin-field admin-field-full">Billing address<textarea name="billing_address" maxLength={1000} /></label>
      <label className="admin-field">State<input name="state" maxLength={100} /></label>
      <label className="admin-field">State code<input name="state_code" maxLength={4} /></label>
      <label className="admin-field">GSTIN<input name="gstin" maxLength={20} /></label>
      <label className="admin-field admin-field-full">Internal notes<textarea name="notes" maxLength={2000} /></label>
      <div className="admin-field-full"><button className="admin-button" type="submit">Save client</button></div>
    </form></section>
    <section><div className="admin-section-title"><h2>Saved clients</h2><span className="admin-badge">{clients?.length || 0} records</span></div><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Company</th><th>Contact</th><th>Email</th><th>GSTIN</th><th>State</th></tr></thead><tbody>{clients?.map((client) => <tr key={client.id}><td>{client.company_name}</td><td>{client.contact_name || "—"}</td><td>{client.email || "—"}</td><td>{client.gstin || "—"}</td><td>{client.state || "—"}</td></tr>)}</tbody></table>{!clients?.length && <p className="admin-empty">No clients yet.</p>}</div></section>
  </main>;
}
