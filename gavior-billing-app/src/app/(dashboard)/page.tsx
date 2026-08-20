import Link from "next/link";
import {
  FileText,
  Receipt,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Plus,
  ArrowRight,
} from "lucide-react";
import { formatMoney } from "@/lib/money";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();

  const [
    { data: invoices },
    { data: quotations },
    { data: payments },
  ] = await Promise.all([
    supabase
      .from("ops_invoices")
      .select("*, clients(company_name)")
      .order("created_at", { ascending: false }),
    supabase
      .from("ops_quotations")
      .select("*, clients(company_name)")
      .order("created_at", { ascending: false }),
    supabase
      .from("ops_payments")
      .select("*, ops_invoices(invoice_number, title)")
      .order("paid_at", { ascending: false })
      .limit(5),
  ]);

  const allInvoices = invoices || [];
  const allQuotations = quotations || [];

  // Metrics
  const totalBilledPaise = allInvoices.reduce(
    (acc, inv) => acc + Number(inv.total_paise || 0),
    0,
  );
  const totalCollectedPaise = allInvoices.reduce(
    (acc, inv) => acc + Number(inv.amount_paid_paise || 0),
    0,
  );
  const totalOutstandingPaise = allInvoices.reduce(
    (acc, inv) => acc + Number(inv.balance_due_paise || 0),
    0,
  );
  const pipelineQuotesPaise = allQuotations
    .filter((q) => ["draft", "reviewed", "sent", "viewed"].includes(q.status))
    .reduce((acc, q) => acc + Number(q.total_paise || 0), 0);

  return (
    <div>
      <header className="ops-page-header">
        <div>
          <p className="ops-eyebrow">Executive Overview</p>
          <h1 className="ops-title">Operations & Revenue</h1>
          <p className="ops-muted">
            Live metrics, pipeline conversion, and GST billing ledger for Gavior.
          </p>
        </div>
        <div className="ops-actions">
          <Link href="/quotations/new" className="ops-btn">
            <Plus size={16} /> New Quotation
          </Link>
          <Link href="/invoices/new" className="ops-btn ops-btn-secondary">
            <Plus size={16} /> New Tax Invoice
          </Link>
        </div>
      </header>

      {/* KPI Stats Grid */}
      <section className="ops-stat-grid">
        <div className="ops-stat-card">
          <div className="ops-stat-label">Total Invoiced (Gross)</div>
          <div className="ops-stat-value text-[#121c17]">
            {formatMoney(totalBilledPaise)}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-gray-500">
            <Receipt size={14} className="text-[#1e6a47]" /> {allInvoices.length} Invoices issued
          </div>
        </div>

        <div className="ops-stat-card">
          <div className="ops-stat-label">Total Collections Realized</div>
          <div className="ops-stat-value text-[#1e6a47]">
            {formatMoney(totalCollectedPaise)}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-green-700">
            <CheckCircle size={14} /> Reconciled in Bank / UPI
          </div>
        </div>

        <div className="ops-stat-card">
          <div className="ops-stat-label">Outstanding Balance Due</div>
          <div className="ops-stat-value text-[#b45309]">
            {formatMoney(totalOutstandingPaise)}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-amber-700">
            <AlertCircle size={14} /> Pending client settlements
          </div>
        </div>

        <div className="ops-stat-card">
          <div className="ops-stat-label">Active Proposal Pipeline</div>
          <div className="ops-stat-value text-[#1a3d5c]">
            {formatMoney(pipelineQuotesPaise)}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-blue-800">
            <TrendingUp size={14} /> {allQuotations.length} Proposals in pipeline
          </div>
        </div>
      </section>

      {/* Dual Table Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Invoices */}
        <section className="ops-panel mb-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Receipt size={18} className="text-[#1e6a47]" /> Recent Invoices
            </h2>
            <Link
              href="/invoices"
              className="text-xs font-bold text-[#1e6a47] hover:underline flex items-center gap-1"
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>

          <div className="ops-table-wrap border-0">
            <table className="ops-table">
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Client</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {allInvoices.slice(0, 5).map((inv) => (
                  <tr key={inv.id}>
                    <td>
                      <Link href={`/invoices/${inv.id}`}>{inv.invoice_number}</Link>
                    </td>
                    <td className="max-w-[140px] truncate">
                      {inv.clients?.company_name || "—"}
                    </td>
                    <td className="font-bold">{formatMoney(inv.total_paise)}</td>
                    <td>
                      <span
                        className={`ops-badge ${
                          inv.status === "paid"
                            ? "ops-badge-paid"
                            : inv.status === "partially_paid"
                              ? "ops-badge-partial"
                              : "ops-badge-draft"
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {allInvoices.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-gray-400">
                      No invoices created yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Recent Quotations */}
        <section className="ops-panel mb-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <FileText size={18} className="text-[#1a3d5c]" /> Quotations Pipeline
            </h2>
            <Link
              href="/quotations"
              className="text-xs font-bold text-[#1e6a47] hover:underline flex items-center gap-1"
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>

          <div className="ops-table-wrap border-0">
            <table className="ops-table">
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Client</th>
                  <th>Value</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {allQuotations.slice(0, 5).map((q) => (
                  <tr key={q.id}>
                    <td>
                      <Link href={`/quotations/${q.id}`}>{q.quotation_number}</Link>
                    </td>
                    <td className="max-w-[140px] truncate">
                      {q.clients?.company_name || "—"}
                    </td>
                    <td className="font-bold">{formatMoney(q.total_paise)}</td>
                    <td>
                      <span
                        className={`ops-badge ${
                          q.status === "accepted"
                            ? "ops-badge-paid"
                            : q.status === "sent"
                              ? "ops-badge-partial"
                              : "ops-badge-draft"
                        }`}
                      >
                        {q.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {allQuotations.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-gray-400">
                      No quotations in pipeline yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Recent Payments Received */}
      <section className="ops-panel">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <CheckCircle size={18} className="text-green-600" /> Recent Payment Settlements
          </h2>
        </div>
        <div className="ops-table-wrap">
          <table className="ops-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Invoice</th>
                <th>Method</th>
                <th>Reference / UTR</th>
                <th>Amount Received</th>
              </tr>
            </thead>
            <tbody>
              {(payments || []).map((p) => (
                <tr key={p.id}>
                  <td>{p.paid_at}</td>
                  <td>
                    <Link href={`/invoices/${p.invoice_id}`}>
                      {p.ops_invoices?.invoice_number || p.invoice_id}
                    </Link>
                  </td>
                  <td>
                    <span className="ops-badge">{p.payment_method || "UPI"}</span>
                  </td>
                  <td className="font-mono text-xs text-gray-600">
                    {p.reference || "—"}
                  </td>
                  <td className="font-bold text-[#1e6a47]">
                    + {formatMoney(p.amount_paise)}
                  </td>
                </tr>
              ))}
              {(!payments || payments.length === 0) && (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-400">
                    No payment transactions recorded yet.
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
