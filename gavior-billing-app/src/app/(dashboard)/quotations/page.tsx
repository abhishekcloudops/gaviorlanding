import Link from "next/link";
import { Plus, FileText } from "lucide-react";
import { Notice } from "@/components/ui/notice";
import { formatMoney } from "@/lib/money";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function QuotationsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const supabase = await createSupabaseServerClient();
  const query = await searchParams;

  const { data: quotations } = await supabase
    .from("ops_quotations")
    .select("*, clients(company_name, contact_name)")
    .order("created_at", { ascending: false });

  const allQuotes = quotations || [];

  return (
    <div>
      <header className="ops-page-header">
        <div>
          <p className="ops-eyebrow">Proposals & Estimates</p>
          <h1 className="ops-title">Quotations Pipeline</h1>
          <p className="ops-muted">
            Track commercial proposals, AI narratives, and client approval milestones.
          </p>
        </div>
        <div className="ops-actions">
          <Link href="/quotations/new" className="ops-btn">
            <Plus size={16} /> Create Custom Quotation
          </Link>
        </div>
      </header>

      <Notice {...query} />

      <div className="ops-table-wrap">
        <table className="ops-table">
          <thead>
            <tr>
              <th>Quotation Number</th>
              <th>Client Name</th>
              <th>Project Title</th>
              <th>Total Amount</th>
              <th>Valid Until</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {allQuotes.map((q) => (
              <tr key={q.id}>
                <td>
                  <Link href={`/quotations/${q.id}`} className="font-bold text-[#1e6a47]">
                    {q.quotation_number}
                  </Link>
                </td>
                <td>
                  <strong>{q.clients?.company_name || "—"}</strong>
                  {q.clients?.contact_name && (
                    <span className="block text-xs text-gray-500">
                      Attn: {q.clients.contact_name}
                    </span>
                  )}
                </td>
                <td className="max-w-[200px] truncate">{q.title}</td>
                <td>
                  <strong>{formatMoney(q.total_paise)}</strong>
                </td>
                <td>{q.valid_until || "As agreed"}</td>
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
                <td>{new Date(q.created_at).toLocaleDateString("en-IN")}</td>
              </tr>
            ))}
            {allQuotes.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-12 text-gray-400">
                  <FileText size={32} className="mx-auto mb-2 opacity-40" />
                  <p>No quotations created yet.</p>
                  <Link href="/quotations/new" className="ops-btn mt-3">
                    Create your first quotation
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
