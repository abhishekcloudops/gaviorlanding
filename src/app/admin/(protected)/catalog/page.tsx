import { createCatalogItemAction } from "@/app/admin/actions";
import { AdminNotice } from "@/components/admin/notice";
import { requireAdmin } from "@/lib/admin/auth";
import { formatMoney } from "@/lib/admin/money";

export default async function CatalogPage({ searchParams }: { searchParams: Promise<{ saved?: string; error?: string }> }) {
  const { supabase } = await requireAdmin(); const params = await searchParams;
  const { data: items } = await supabase.from("catalog_items").select("*").order("created_at", { ascending: false });
  return <main><header className="admin-page-header"><div><p className="admin-eyebrow">Reusable pricing</p><h1>Products & services</h1><p className="admin-muted">Keep standard descriptions, SAC/HSN and prices ready.</p></div></header><AdminNotice {...params} />
    <section className="admin-panel"><h2>Add catalog item</h2><form action={createCatalogItemAction} className="admin-form-grid">
      <label className="admin-field">Name<input name="name" required maxLength={180} /></label>
      <label className="admin-field">Type<select name="item_type" defaultValue="service"><option value="service">Service</option><option value="product">Product</option></select></label>
      <label className="admin-field admin-field-full">Description<textarea name="description" maxLength={1200} /></label>
      <label className="admin-field">Unit<input name="unit" defaultValue="project" required maxLength={30} /></label>
      <label className="admin-field">SAC / HSN<input name="sac_hsn" maxLength={20} /></label>
      <label className="admin-field">Unit price (₹)<input name="unit_price" type="text" inputMode="decimal" defaultValue="0.00" required /></label>
      <label className="admin-field">GST rate (%)<input name="tax_rate" type="number" min="0" max="100" step="0.01" defaultValue="18" required /></label>
      <div className="admin-field-full"><button className="admin-button" type="submit">Save catalog item</button></div>
    </form></section>
    <section><div className="admin-section-title"><h2>Catalog</h2><span className="admin-badge">{items?.length || 0} items</span></div><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Name</th><th>Type</th><th>SAC/HSN</th><th>Price</th><th>Tax</th></tr></thead><tbody>{items?.map((item) => <tr key={item.id}><td>{item.name}</td><td>{item.item_type}</td><td>{item.sac_hsn || "—"}</td><td>{formatMoney(item.unit_price_paise)}</td><td>{Number(item.tax_rate_bps) / 100}%</td></tr>)}</tbody></table>{!items?.length && <p className="admin-empty">No catalog items yet.</p>}</div></section>
  </main>;
}
