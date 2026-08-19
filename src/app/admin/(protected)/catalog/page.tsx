import { createCatalogItemAction, seedDefaultCatalogAction } from "@/app/admin/actions";
import { AdminNotice } from "@/components/admin/notice";
import { requireAdmin } from "@/lib/admin/auth";
import { formatMoney } from "@/lib/admin/money";

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { supabase } = await requireAdmin();
  const params = await searchParams;
  const { data: items } = await supabase
    .from("catalog_items")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main>
      <header className="admin-page-header">
        <div>
          <p className="admin-eyebrow">Reusable pricing & plans</p>
          <h1>Products & services catalog</h1>
          <p className="admin-muted">
            All plans configured here are instantly available when preparing quotations and invoices.
          </p>
        </div>
        <div className="admin-actions">
          <form action={seedDefaultCatalogAction}>
            <button
              className="admin-button admin-button-secondary"
              type="submit"
              title="Loads all 30 standard Gavior plans (Websites, Branding, Social Media, SEO, AI, Apps, etc.)"
            >
              ✦ Sync all Gavior plans ({items?.length || 0} in catalog)
            </button>
          </form>
        </div>
      </header>

      <AdminNotice {...params} />

      <section className="admin-panel">
        <h2>Add custom catalog item</h2>
        <form action={createCatalogItemAction} className="admin-form-grid">
          <label className="admin-field">
            Name
            <input name="name" required maxLength={180} placeholder="e.g. Dedicated Full-Stack Developer (Monthly)" />
          </label>
          <label className="admin-field">
            Type
            <select name="item_type" defaultValue="service">
              <option value="service">Service</option>
              <option value="product">Product</option>
            </select>
          </label>
          <label className="admin-field admin-field-full">
            Description
            <textarea name="description" maxLength={1200} placeholder="Scope, inclusions, deliverables, and service boundaries." />
          </label>
          <label className="admin-field">
            Unit
            <input name="unit" defaultValue="project" required maxLength={30} placeholder="project / month / video / pack" />
          </label>
          <label className="admin-field">
            SAC / HSN
            <input name="sac_hsn" maxLength={20} placeholder="e.g. 998314" />
          </label>
          <label className="admin-field">
            Unit price (₹)
            <input name="unit_price" type="text" inputMode="decimal" defaultValue="0.00" required />
          </label>
          <label className="admin-field">
            GST rate (%)
            <input name="tax_rate" type="number" min="0" max="100" step="0.01" defaultValue="18" required />
          </label>
          <div className="admin-field-full">
            <button className="admin-button" type="submit">Save catalog item</button>
          </div>
        </form>
      </section>

      <section>
        <div className="admin-section-title">
          <h2>Catalog items</h2>
          <span className="admin-badge">{items?.length || 0} items available</span>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Item / Plan Name</th>
                <th>Type</th>
                <th>Unit</th>
                <th>SAC/HSN</th>
                <th>Unit Price</th>
                <th>GST</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.name}</strong>
                    {item.description && (
                      <small style={{ display: "block", color: "#6c7972", maxWidth: 450, whiteSpace: "normal" }}>
                        {item.description}
                      </small>
                    )}
                  </td>
                  <td><span className="admin-badge" style={{ textTransform: "capitalize" }}>{item.item_type}</span></td>
                  <td>{item.unit}</td>
                  <td>{item.sac_hsn || "—"}</td>
                  <td><strong>{formatMoney(item.unit_price_paise)}</strong></td>
                  <td>{Number(item.tax_rate_bps) / 100}%</td>
                  <td>
                    <span className={item.active ? "admin-badge" : "admin-badge admin-badge-danger"}>
                      {item.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!items?.length && (
            <div className="admin-empty">
              <p>No catalog items yet.</p>
              <form action={seedDefaultCatalogAction} style={{ marginTop: 12 }}>
                <button className="admin-button" type="submit">
                  Load all standard Gavior plans now
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
