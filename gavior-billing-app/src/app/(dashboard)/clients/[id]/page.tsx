import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Receipt,
  FileText,
  ArrowLeft,
} from "lucide-react";
import { formatMoney } from "@/lib/money";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  const [
    { data: client },
    { data: invoices },
    { data: quotations },
  ] = await Promise.all([
    supabase.from("ops_clients").select("*").eq("id", id).maybeSingle(),
    supabase
      .from("ops_invoices")
      .select("*")
      .eq("client_id", id)
      .order("created_at", { ascending: false }),
    supabase
      .from("ops_quotations")
      .select("*")
      .eq("client_id", id)
      .order("created_at", { ascending: false }),
  ]);

  if (!client) notFound();

  const allInvoices = invoices || [];
  const allQuotations = quotations || [];

  const totalBilled = allInvoices.reduce(
    (acc, inv) => acc + Number(inv.total_paise || 0),
    0,
  );
  const totalPaid = allInvoices.reduce(
    (acc, inv) => acc + Number(inv.amount_paid_paise || 0),
    0,
  );
  const balanceOutstanding = allInvoices.reduce(
    (acc, inv) => acc + Number(inv.balance_due_paise || 0),
    0,
  );

  return (
    <div>
      <div className="mb-4">
        <Link
          href="/clients"
          className="text-xs font-bold text-gray-500 hover:text-[#1e6a47] flex items-center gap-1"
        >
          <ArrowLeft size={14} /> Back to Client Directory
        </Link>
      </div>

      <header className="ops-page-header">
        <div>
          <p className="ops-eyebrow">Client Statement of Account</p>
          <h1 className="ops-title">{client.company_name}</h1>
          <p className="ops-muted">
            {client.contact_name ? `Contact: ${client.contact_name} • ` : ""}
            GSTIN: {client.gstin || "Unregistered"} • State: {client.state} ({client.state_code})
          </p>
        </div>
      </header>

      {/* ── Client Ledger Summary ── */}
      <section className="ops-stat-grid">
        <div className="ops-stat-card">
          <div className="ops-stat-label">Lifetime Billed (Gross)</div>
          <div className="ops-stat-value">{formatMoney(totalBilled)}</div>
        </div>
        <div className="ops-stat-card">
          <div className="ops-stat-label">Total Payments Realized</div>
          <div className="ops-stat-value text-[#1e6a47]">{formatMoney(totalPaid)}</div>
        </div>
        <div className="ops-stat-card">
          <div className="ops-stat-label">Outstanding Balance Due</div>
          <div className="ops-stat-value text-[#b45309]">
            {formatMoney(balanceOutstanding)}
          </div>
        </div>
      </section>

      {/* ── Client Invoices Table ── */}
      <section className="ops-panel">
        <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Receipt size={18} className="text-[#1a3d5c]" /> Invoices History
        </h2>
        <div className="ops-table-wrap border-0">
          <table className="ops-table">
            <thead>
              <tr>
                <th>Invoice No</th>
                <th>Title</th>
                <th>Issue Date</th>
                <th>Total Amount</th>
                <th>Balance Due</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {allInvoices.map((inv) => (
                <tr key={inv.id}>
                  <td>
                    <Link href={`/invoices/${inv.id}`}>{inv.invoice_number}</Link>
                  </td>
                  <td>{inv.title}</td>
                  <td>{inv.issue_date}</td>
                  <td className="font-bold">{formatMoney(inv.total_paise)}</td>
                  <td className="font-bold text-[#b45309]">
                    {formatMoney(inv.balance_due_paise)}
                  </td>
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
                  <td colSpan={6} className="text-center py-6 text-gray-400">
                    No invoices issued for this client yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Client Quotations Table ── */}
      <section className="ops-panel">
        <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FileText size={18} className="text-[#1e6a47]" /> Quotations & Proposals
        </h2>
        <div className="ops-table-wrap border-0">
          <table className="ops-table">
            <thead>
              <tr>
                <th>Quotation No</th>
                <th>Title</th>
                <th>Value</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {allQuotations.map((q) => (
                <tr key={q.id}>
                  <td>
                    <Link href={`/quotations/${q.id}`}>{q.quotation_number}</Link>
                  </td>
                  <td>{q.title}</td>
                  <td className="font-bold">{formatMoney(q.total_paise)}</td>
                  <td>
                    <span className="ops-badge">{q.status}</span>
                  </td>
                  <td>{new Date(q.created_at).toLocaleDateString("en-IN")}</td>
                </tr>
              ))}
              {allQuotations.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-400">
                    No quotations generated for this client yet.
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
