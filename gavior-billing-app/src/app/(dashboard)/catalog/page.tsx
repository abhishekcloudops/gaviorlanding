import {
  cleanupDuplicateCatalogAction,
  createCatalogItemAction,
  deleteCatalogItemAction,
  seedDefaultCatalogAction,
} from "@/app/actions/catalog";
import { ConfirmButton } from "@/components/ui/buttons";
import { Notice } from "@/components/ui/notice";
import { formatMoney } from "@/lib/money";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const supabase = await createSupabaseServerClient();
  const params = await searchParams;

  const { data: items } = await supabase
    .from("ops_catalog_items")
    .select("*")
    .order("category")
    .order("name");

  const allItems = items || [];

  return (
    <div>
      <header className="ops-page-header">
        <div>
          <p className="ops-eyebrow">Reusable Pricing Master</p>
          <h1 className="ops-title">Services & Plans Catalog</h1>
          <p className="ops-muted">
            Configure standard packages, SAC codes, and baseline pricing for 1-click quotation and billing selection.
          </p>
        </div>
        <div className="ops-actions">
          <form action={cleanupDuplicateCatalogAction}>
            <button
              className="ops-btn ops-btn-secondary"
              type="submit"
              title="Purge duplicate catalog entries keeping the newest records"
            >
              🧹 Remove Duplicates
            </button>
          </form>
          <form action={seedDefaultCatalogAction}>
            <button
              className="ops-btn"
              type="submit"
              title="Sync all 30 standard Gavior packages"
            >
              ✦ Sync All 30 Gavior Plans ({allItems.length})
            </button>
          </form>
        </div>
      </header>

      <Notice {...params} />

      {/* ── Add Custom Catalog Item Form ── */}
      <section className="ops-panel">
        <h2 className="text-base font-bold text-gray-900 mb-4">
          Add Custom Service or Plan
        </h2>
        <form action={createCatalogItemAction} className="ops-form-grid">
          <label className="ops-field">
            Plan / Service Name
            <input
              name="name"
              required
              maxLength={180}
              placeholder="e.g. Dedicated React Native Engineer (Monthly)"
            />
          </label>

          <label className="ops-field">
            Category
            <select name="category" defaultValue="Custom Services">
              <option value="Websites">Websites</option>
              <option value="Branding">Branding</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="Social Media">Social Media</option>
              <option value="SEO & Marketing">SEO & Marketing</option>
              <option value="AI & Automation">AI & Automation</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Mobile Apps">Mobile Apps</option>
              <option value="SaaS Development">SaaS Development</option>
              <option value="Video Editing">Video Editing</option>
              <option value="Cloud & DevOps">Cloud & DevOps</option>
              <option value="Custom Services">Custom Services</option>
            </select>
          </label>

          <label className="ops-field ops-field-full">
            Scope & Deliverable Description
            <textarea
              name="description"
              rows={2}
              maxLength={1200}
              placeholder="Detailed inclusions, deliverable limits, and revision boundaries."
            />
          </label>

          <label className="ops-field">
            Billing Unit
            <input
              name="unit"
              defaultValue="project"
              required
              placeholder="project / month / video / pack / hour"
            />
          </label>

          <label className="ops-field">
            SAC / HSN Code
            <input name="sac_hsn" defaultValue="998314" placeholder="998314" />
          </label>

          <label className="ops-field">
            Unit Price (₹)
            <input
              name="unit_price"
              type="number"
              step="0.01"
              min="0"
              defaultValue="0.00"
              required
            />
          </label>

          <label className="ops-field">
            GST Rate (%)
            <input
              name="tax_rate"
              type="number"
              min="0"
              max="100"
              step="0.01"
              defaultValue="18"
              required
            />
          </label>

          <div className="ops-field-full">
            <button className="ops-btn" type="submit">
              Save Service to Master Catalog
            </button>
          </div>
        </form>
      </section>

      {/* ── Catalog Table ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-gray-900">
            Available Service Plans ({allItems.length})
          </h2>
        </div>

        <div className="ops-table-wrap">
          <table className="ops-table">
            <thead>
              <tr>
                <th>Service Name & Category</th>
                <th>Unit</th>
                <th>SAC/HSN</th>
                <th>Base Price</th>
                <th>GST Rate</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="font-bold text-[#121c17]">{item.name}</div>
                    <span className="ops-badge text-[10px] py-0.5 px-2 mb-1 inline-block">
                      {item.category}
                    </span>
                    {item.description && (
                      <p className="text-xs text-gray-500 max-w-lg leading-relaxed mt-0.5 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </td>
                  <td>{item.unit}</td>
                  <td>
                    <span className="font-mono text-xs text-gray-600">
                      {item.sac_hsn || "—"}
                    </span>
                  </td>
                  <td className="font-bold text-[#1e6a47]">
                    {formatMoney(item.unit_price_paise)}
                  </td>
                  <td>{item.tax_rate_bps / 100}%</td>
                  <td>
                    <form action={deleteCatalogItemAction}>
                      <input type="hidden" name="id" value={item.id} />
                      <ConfirmButton
                        className="ops-btn ops-btn-secondary text-red-600 border-red-200 hover:bg-red-50 text-xs px-2.5 py-1"
                        message={`Delete "${item.name}" from catalog?`}
                      >
                        Delete
                      </ConfirmButton>
                    </form>
                  </td>
                </tr>
              ))}
              {allItems.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">
                    <p>No plans in catalog.</p>
                    <form action={seedDefaultCatalogAction} className="mt-3">
                      <button className="ops-btn" type="submit">
                        ✦ Seed All 30 Standard Gavior Plans Now
                      </button>
                    </form>
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
