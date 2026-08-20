import Link from "next/link";
import { Plus, Receipt } from "lucide-react";
import { Notice } from "@/components/ui/notice";
import { formatMoney } from "@/lib/money";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function InvoicesPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const supabase = await createSupabaseServerClient();
  const query = await searchParams;

  const { data: invoices } = await supabase
    .from("ops_invoices")
    .select("*, clients(company_name, contact_name)")
    .order("created_at", { ascending: false });

  const allInvoices = invoices || [];

  return (
    <div>
      <header className="ops-page-header">
        <div>
          <p className="ops-eyebrow">GST Billing & Retainers</p>
          <h1 className="ops-title">Tax Invoices & Billing</h1>
          <p className="ops-muted">
            Manage corporate GST billing, monthly retainer subscriptions, and live payment settlements.
          </p>
        </div>
        <div className="ops-actions">
          <Link href="/invoices/new" className="ops-btn">
            <Plus size={16} /> Create Direct Invoice
          </Link>
        </div>
      </header>

      <Notice {...query} />

      <div className="ops-table-wrap">
        <table className="ops-table">
          <thead>
            <tr>
              <th>Invoice Number</th>
              <th>Client</th>
              <th>Type</th>
              <th>Total (GST inc.)</th>
              <th>Amount Paid</th>
              <th>Balance Due</th>
              <th>Status</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {allInvoices.map((inv) => {
              const balance = Number(inv.balance_due_paise || 0);
              return (
                <tr key={inv.id}>
                  <td>
                    <Link href={`/invoices/${inv.id}`} className="font-bold text-[#1a3d5c]">
                      {inv.invoice_number}
                    </Link>
                  </td>
                  <td>
                    <strong>{inv.clients?.company_name || "—"}</strong>
                    {inv.clients?.contact_name && (
                      <span className="block text-xs text-gray-500">
                        {inv.clients.contact_name}
                      </span>
                    )}
                  </td>
                  <td>
                    <span className="ops-badge text-xs" style={{ textTransform: "capitalize" }}>
                      {inv.invoice_type.replace("_", " ")}
                    </span>
                  </td>
                  <td>
                    <strong>{formatMoney(inv.total_paise)}</strong>
                  </td>
                  <td className="text-[#1e6a47] font-bold">
                    {formatMoney(inv.amount_paid_paise)}
                  </td>
                  <td className={`font-bold ${balance > 0 ? "text-[#b45309]" : "text-gray-500"}`}>
                    {formatMoney(balance)}
                  </td>
                  <td>
                    <span
                      className={`ops-badge ${
                        inv.status === "paid"
                          ? "ops-badge-paid"
                          : inv.status === "partially_paid"
                            ? "ops-badge-partial"
                            : inv.status === "overdue"
                              ? "ops-badge-overdue"
                              : "ops-badge-draft"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td>{inv.due_date || "—"}</td>
                </tr>
              );
            })}
            {allInvoices.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-12 text-gray-400">
                  <Receipt size={32} className="mx-auto mb-2 opacity-40" />
                  <p>No invoices generated yet.</p>
                  <Link href="/invoices/new" className="ops-btn mt-3">
                    Create direct tax invoice
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
