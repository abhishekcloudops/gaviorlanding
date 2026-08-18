"use client";

import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { createQuotationAction } from "@/app/admin/actions";

type Client = { id: string; company_name: string };
type CatalogItem = { id: string; name: string; description: string | null; unit: string; sac_hsn: string | null; unit_price_paise: number | string; tax_rate_bps: number };
type DraftItem = { catalog_item_id: string | null; description: string; quantity: string; unit: string; sac_hsn: string; unit_price: string; tax_rate: number };
const blank = (): DraftItem => ({ catalog_item_id: null, description: "", quantity: "1", unit: "project", sac_hsn: "", unit_price: "0.00", tax_rate: 18 });

export function QuotationForm({ clients, catalog, defaultTaxRate }: { clients: Client[]; catalog: CatalogItem[]; defaultTaxRate: number }) {
  const [items, setItems] = useState<DraftItem[]>([{ ...blank(), tax_rate: defaultTaxRate }]);
  const total = useMemo(() => items.reduce((sum, item) => {
    const subtotal = Number(item.quantity || 0) * Number(item.unit_price || 0);
    return sum + subtotal + subtotal * Number(item.tax_rate || 0) / 100;
  }, 0), [items]);
  const update = (index: number, patch: Partial<DraftItem>) => setItems((current) => current.map((item, i) => i === index ? { ...item, ...patch } : item));
  const chooseCatalog = (index: number, id: string) => {
    const selected = catalog.find((item) => item.id === id);
    if (!selected) return update(index, { catalog_item_id: null });
    update(index, { catalog_item_id: selected.id, description: selected.description || selected.name, unit: selected.unit,
      sac_hsn: selected.sac_hsn || "", unit_price: (Number(selected.unit_price_paise) / 100).toFixed(2), tax_rate: Number(selected.tax_rate_bps) / 100 });
  };
  return <form action={createQuotationAction} className="admin-form-stack">
    <div className="admin-form-grid">
      <label className="admin-field">Client<select name="client_id" required defaultValue=""><option value="" disabled>Select client</option>{clients.map((client) => <option key={client.id} value={client.id}>{client.company_name}</option>)}</select></label>
      <label className="admin-field">Quotation title<input name="title" required maxLength={180} placeholder="Website design and development" /></label>
      <label className="admin-field admin-field-full">Short project summary<textarea name="short_summary" required minLength={10} maxLength={4000} placeholder="What the client needs, the business goal, and the important boundaries." /></label>
      <label className="admin-field">Timeline<input name="timeline" maxLength={500} placeholder="6–8 weeks" /></label>
      <label className="admin-field">Valid until<input name="valid_until" type="date" /></label>
    </div>
    <input type="hidden" name="items_json" value={JSON.stringify(items)} />
    <div className="admin-section-title"><h2>Line items</h2><button type="button" className="admin-button admin-button-secondary" onClick={() => setItems((current) => [...current, { ...blank(), tax_rate: defaultTaxRate }])}><Plus size={15} /> Add item</button></div>
    {items.map((item, index) => <section className="admin-panel" key={index}>
      <div className="admin-form-grid">
        <label className="admin-field">From catalog<select value={item.catalog_item_id || ""} onChange={(event) => chooseCatalog(index, event.target.value)}><option value="">Custom item</option>{catalog.map((entry) => <option key={entry.id} value={entry.id}>{entry.name}</option>)}</select></label>
        <label className="admin-field">Description<input value={item.description} onChange={(event) => update(index, { description: event.target.value })} maxLength={500} required /></label>
        <label className="admin-field">Quantity<input type="number" inputMode="decimal" min="0.001" step="0.001" value={item.quantity} onChange={(event) => update(index, { quantity: event.target.value })} required /></label>
        <label className="admin-field">Unit<input value={item.unit} onChange={(event) => update(index, { unit: event.target.value })} maxLength={30} required /></label>
        <label className="admin-field">SAC / HSN<input value={item.sac_hsn} onChange={(event) => update(index, { sac_hsn: event.target.value })} maxLength={20} /></label>
        <label className="admin-field">Unit price (₹)<input type="number" inputMode="decimal" min="0" step="0.01" value={item.unit_price} onChange={(event) => update(index, { unit_price: event.target.value })} required /></label>
        <label className="admin-field">GST (%)<input type="number" min="0" max="100" step="0.01" value={item.tax_rate} onChange={(event) => update(index, { tax_rate: Number(event.target.value) })} required /></label>
      </div>
      {items.length > 1 && <div className="admin-actions"><button type="button" className="admin-button admin-button-danger" onClick={() => setItems((current) => current.filter((_, i) => i !== index))}><Trash2 size={15} /> Remove</button></div>}
    </section>)}
    <div className="admin-total-row"><strong>Estimated total including tax</strong><strong>{new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(total)}</strong></div>
    <div><button className="admin-button" type="submit">Create secure draft</button></div>
  </form>;
}
