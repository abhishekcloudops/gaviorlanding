"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Trash2, Layers } from "lucide-react";
import { createDirectInvoiceAction } from "@/app/actions/invoices";
import { CatalogItem, Client } from "@/lib/types";

type DraftItem = {
  catalog_item_id: string | null;
  description: string;
  quantity: string;
  unit: string;
  sac_hsn: string;
  unit_price: string;
  tax_rate: number;
};

const blankItem = (): DraftItem => ({
  catalog_item_id: null,
  description: "",
  quantity: "1",
  unit: "project",
  sac_hsn: "998314",
  unit_price: "0.00",
  tax_rate: 18,
});

export function InvoiceForm({
  clients,
  catalog,
  defaultTaxRate = 18,
}: {
  clients: Client[];
  catalog: CatalogItem[];
  defaultTaxRate?: number;
}) {
  const [items, setItems] = useState<DraftItem[]>([
    { ...blankItem(), tax_rate: defaultTaxRate },
  ]);
  const [invoiceType, setInvoiceType] = useState<"tax_invoice" | "retainer" | "proforma">("tax_invoice");

  const { subtotal, tax, total } = useMemo(() => {
    let sub = 0;
    let tx = 0;
    items.forEach((it) => {
      const q = parseFloat(it.quantity || "0") || 0;
      const p = parseFloat(it.unit_price || "0") || 0;
      const lineSub = q * p;
      const lineTax = (lineSub * (it.tax_rate || 0)) / 100;
      sub += lineSub;
      tx += lineTax;
    });
    return { subtotal: sub, tax: tx, total: sub + tx };
  }, [items]);

  const updateItem = (index: number, patch: Partial<DraftItem>) => {
    setItems((curr) =>
      curr.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    );
  };

  const handleSelectCatalog = (index: number, catalogId: string) => {
    const selected = catalog.find((c) => c.id === catalogId);
    if (!selected) {
      return updateItem(index, { catalog_item_id: null });
    }

    updateItem(index, {
      catalog_item_id: selected.id,
      description: selected.description || selected.name,
      unit: selected.unit || "project",
      sac_hsn: selected.sac_hsn || "998314",
      unit_price: (selected.unit_price_paise / 100).toFixed(2),
      tax_rate: selected.tax_rate_bps / 100,
    });
  };

  return (
    <form action={createDirectInvoiceAction} className="space-y-6">
      {/* ── Invoice Setup Details ── */}
      <section className="ops-panel">
        <h2 className="text-base font-bold text-gray-900 mb-4">
          Invoice & Billing Configuration
        </h2>
        <div className="ops-form-grid">
          <label className="ops-field">
            Client / Debtor
            <select name="client_id" required defaultValue="">
              <option value="" disabled>
                Select client from CRM
              </option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.company_name} {c.gstin ? `[GSTIN: ${c.gstin}]` : ""}
                </option>
              ))}
            </select>
          </label>

          <label className="ops-field">
            Invoice Title / Project Reference
            <input
              name="title"
              required
              maxLength={180}
              placeholder="e.g. Monthly Social Media Management & Ads (August 2026)"
            />
          </label>

          <label className="ops-field">
            Invoice Type
            <select
              name="invoice_type"
              value={invoiceType}
              onChange={(e) => setInvoiceType(e.target.value as "tax_invoice" | "retainer" | "proforma")}
            >
              <option value="tax_invoice">Standard Tax Invoice (GST)</option>
              <option value="retainer">Monthly Retainer / Recurring</option>
              <option value="proforma">Proforma Invoice</option>
            </select>
          </label>

          <label className="ops-field">
            Issue Date
            <input
              name="issue_date"
              type="date"
              required
            />
          </label>

          <label className="ops-field">
            Due Date
            <input
              name="due_date"
              type="date"
            />
          </label>

          <label className="ops-field">
            Place of Supply (State)
            <input
              name="place_of_supply"
              placeholder="e.g. Karnataka / Maharashtra"
            />
          </label>

          {invoiceType === "retainer" && (
            <>
              <label className="ops-field">
                Billing Period Start
                <input name="billing_period_start" type="date" />
              </label>
              <label className="ops-field">
                Billing Period End
                <input name="billing_period_end" type="date" />
              </label>
            </>
          )}

          <label className="ops-field ops-field-full">
            Invoice Notes & Instructions
            <textarea
              name="notes"
              rows={2}
              placeholder="Special instructions, PO number, or bank settlement note."
            />
          </label>
        </div>
      </section>

      {/* ── Billable Line Items ── */}
      <section className="ops-panel">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-gray-900">Billed Services & Items</h2>
            <p className="text-xs text-gray-500">
              Select predefined catalog packages or specify custom billables.
            </p>
          </div>
          <button
            type="button"
            className="ops-btn ops-btn-secondary"
            onClick={() =>
              setItems((curr) => [...curr, { ...blankItem(), tax_rate: defaultTaxRate }])
            }
          >
            <Plus size={15} /> Add Line Item
          </button>
        </div>

        <input type="hidden" name="items_json" value={JSON.stringify(items)} />

        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border border-[#dde5e0] bg-[#fafbfb] relative"
            >
              <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-2">
                <label className="ops-field md:col-span-3">
                  <span className="flex items-center gap-1">
                    <Layers size={13} className="text-[#1a3d5c]" /> From Catalog
                  </span>
                  <select
                    value={item.catalog_item_id || ""}
                    onChange={(e) => handleSelectCatalog(index, e.target.value)}
                  >
                    <option value="">Custom Billable Item</option>
                    {catalog.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} — ₹{(c.unit_price_paise / 100).toLocaleString("en-IN")} ({c.unit})
                      </option>
                    ))}
                  </select>
                </label>

                <label className="ops-field md:col-span-1">
                  Quantity
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, { quantity: e.target.value })}
                    required
                  />
                </label>

                <label className="ops-field md:col-span-1">
                  Unit
                  <input
                    value={item.unit}
                    onChange={(e) => updateItem(index, { unit: e.target.value })}
                    required
                  />
                </label>

                <label className="ops-field md:col-span-1">
                  SAC / HSN
                  <input
                    value={item.sac_hsn}
                    onChange={(e) => updateItem(index, { sac_hsn: e.target.value })}
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
                <label className="ops-field md:col-span-4">
                  Description
                  <input
                    value={item.description}
                    onChange={(e) => updateItem(index, { description: e.target.value })}
                    required
                  />
                </label>

                <label className="ops-field md:col-span-1">
                  Rate (₹)
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={item.unit_price}
                    onChange={(e) => updateItem(index, { unit_price: e.target.value })}
                    required
                  />
                </label>

                <label className="ops-field md:col-span-1">
                  GST (%)
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    value={item.tax_rate}
                    onChange={(e) =>
                      updateItem(index, { tax_rate: parseFloat(e.target.value) || 0 })
                    }
                    required
                  />
                </label>
              </div>

              {items.length > 1 && (
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    className="text-xs text-red-600 font-bold hover:underline flex items-center gap-1"
                    onClick={() => setItems((curr) => curr.filter((_, i) => i !== index))}
                  >
                    <Trash2 size={13} /> Remove Item
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Real-time Summary */}
        <div className="mt-6 p-4 rounded-xl bg-white border border-[#dde5e0] max-w-sm ml-auto space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Taxable Amount:</span>
            <span>{new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Total GST:</span>
            <span>{new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(tax)}</span>
          </div>
          <div className="flex justify-between text-base font-extrabold text-[#1a3d5c] pt-2 border-t border-gray-200">
            <span>Invoice Total:</span>
            <span>{new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(total)}</span>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-between pt-2">
        <Link href="/invoices" className="ops-btn ops-btn-secondary">
          Cancel
        </Link>
        <button type="submit" className="ops-btn">
          Issue Tax Invoice
        </button>
      </div>
    </form>
  );
}
