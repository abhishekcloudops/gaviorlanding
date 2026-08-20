import { notFound } from "next/navigation";
import Image from "next/image";
import { CheckCircle, Printer, ShieldCheck } from "lucide-react";
import { formatMoney } from "@/lib/money";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { QuotationContent } from "@/lib/types";

export const dynamic = "force-dynamic";

const sectionLabels: Record<keyof QuotationContent, string> = {
  executiveSummary: "Executive Summary",
  understanding: "Understanding of Requirements",
  proposedSolution: "Proposed Solution Architecture",
  scope: "Detailed Scope & Deliverables",
  timelineNarrative: "Timeline & Delivery Cadence",
  assumptions: "Key Assumptions",
  exclusions: "Exclusions",
  clientResponsibilities: "Client Responsibilities",
  support: "Support, Maintenance & SLA",
  closing: "Closing Remarks",
};

export default async function PublicQuotePortalPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const supabase = await createSupabaseServerClient();

  const [{ data: quotation }, { data: company }] = await Promise.all([
    supabase
      .from("ops_quotations")
      .select("*, clients(*), ops_quotation_items(*)")
      .eq("portal_token", token)
      .maybeSingle(),
    supabase.from("ops_company_settings").select("*").eq("id", "default").single(),
  ]);

  if (!quotation) notFound();

  // If status is sent, mark as viewed
  if (quotation.status === "sent") {
    await supabase.from("ops_quotations").update({ status: "viewed" }).eq("id", quotation.id);
  }

  const client = quotation.clients;
  const items = (quotation.ops_quotation_items || []).sort(
    (a: { position: number }, b: { position: number }) => a.position - b.position,
  );
  const content = (quotation.content || {}) as Partial<QuotationContent>;
  const hasContent = Object.keys(content).length > 0;
  const isAccepted = quotation.status === "accepted";

  async function acceptQuoteAction() {
    "use server";
    const serverSupabase = await createSupabaseServerClient();
    await serverSupabase
      .from("ops_quotations")
      .update({
        status: "accepted",
        accepted_at: new Date().toISOString(),
      })
      .eq("portal_token", token);
  }

  return (
    <div className="min-h-screen bg-[#f4f7f5] py-8 px-4 sm:px-6">
      {/* Top Banner */}
      <div className="max-w-[860px] mx-auto mb-6 flex items-center justify-between no-print">
        <div className="flex items-center gap-2 text-xs font-bold text-[#1e6a47]">
          <ShieldCheck size={16} /> Secure Client Proposal Portal
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="ops-btn ops-btn-secondary text-xs"
            onClick={() => window.print()}
          >
            <Printer size={14} /> Print / Save PDF
          </button>
        </div>
      </div>

      {/* Acceptance Status Card */}
      {isAccepted ? (
        <div className="max-w-[860px] mx-auto mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-900 flex items-center gap-3 no-print">
          <CheckCircle size={20} className="text-green-600 shrink-0" />
          <div>
            <p className="font-bold text-sm">Proposal Accepted by Client</p>
            <p className="text-xs text-green-700">
              Accepted on {quotation.accepted_at ? new Date(quotation.accepted_at).toLocaleString("en-IN") : "Record verified"}. Thank you for your partnership!
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-[860px] mx-auto mb-6 p-5 rounded-xl bg-white border border-[#dde5e0] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
          <div>
            <p className="font-bold text-sm text-gray-900">Review & Approve Proposal</p>
            <p className="text-xs text-gray-500">
              Click below to formally accept the commercial terms and initiate project kickoff.
            </p>
          </div>
          <form action={acceptQuoteAction}>
            <button type="submit" className="ops-btn w-full sm:w-auto">
              <CheckCircle size={16} /> Accept & Sign Proposal
            </button>
          </form>
        </div>
      )}

      {/* Corporate Proposal Document */}
      <article className="corp-document">
        <header className="corp-doc-header">
          <div className="corp-doc-brand">
            <Image
              src="/brand/gavior-logo-header.avif"
              alt="Gavior"
              width={120}
              height={36}
              className="corp-logo"
              priority
            />
            <div className="corp-doc-brand-meta">
              <p><strong>{company?.legal_name}</strong></p>
              <p>{company?.address}</p>
              {company?.gstin && <p>GSTIN: {company.gstin}</p>}
            </div>
          </div>

          <div className="corp-doc-title-block">
            <div className="corp-doc-type">PROPOSAL & ESTIMATE</div>
            <table className="corp-meta-table">
              <tbody>
                <tr>
                  <td>Quotation No:</td>
                  <td><strong>{quotation.quotation_number}</strong></td>
                </tr>
                <tr>
                  <td>Date:</td>
                  <td>
                    {new Date(quotation.created_at).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                </tr>
                <tr>
                  <td>Valid Until:</td>
                  <td>{quotation.valid_until || "30 Days from issue"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </header>

        <div className="corp-address-bar">
          <div className="corp-address-block">
            <p className="corp-address-label">Prepared for</p>
            <p className="corp-address-name">{client?.company_name}</p>
            {client?.contact_name && <p>{client.contact_name}</p>}
            <p className="corp-address-detail">{client?.billing_address}</p>
            {client?.gstin && <p className="corp-address-detail">GSTIN: {client.gstin}</p>}
          </div>

          <div className="corp-address-block">
            <p className="corp-address-label">Project Details</p>
            <p className="corp-address-name">{quotation.title}</p>
            <p className="corp-address-detail">
              Timeline: {quotation.timeline || "Timeline to be agreed upon kickoff"}
            </p>
            <p className="corp-address-detail">Currency: INR (₹)</p>
          </div>
        </div>

        {/* Project Objectives */}
        {!hasContent && (
          <section className="corp-section">
            <h2 className="corp-section-title">Project Summary & Objectives</h2>
            <p className="corp-body">{quotation.short_summary}</p>
          </section>
        )}

        {/* AI Narrative */}
        {hasContent &&
          (Object.keys(sectionLabels) as Array<keyof QuotationContent>).map((key) =>
            content[key] ? (
              <section className="corp-section" key={key}>
                <h2 className="corp-section-title">{sectionLabels[key]}</h2>
                <p className="corp-body">{content[key]}</p>
              </section>
            ) : null,
          )}

        {/* Commercials */}
        <section className="corp-section">
          <h2 className="corp-section-title">Commercial Investment & Deliverables</h2>
          <table className="corp-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Qty</th>
                <th>Rate (₹)</th>
                <th>GST</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item: { id: string; description: string; sac_hsn: string | null; quantity: number; unit: string; unit_price_paise: number; tax_rate_bps: number; line_total_paise: number }) => (
                <tr key={String(item.id)}>
                  <td>
                    <strong>{item.description}</strong>
                    {item.sac_hsn ? (
                      <span className="corp-small">SAC/HSN: {item.sac_hsn}</span>
                    ) : null}
                  </td>
                  <td>
                    {item.quantity} {item.unit}
                  </td>
                  <td>{formatMoney(item.unit_price_paise)}</td>
                  <td>{Number(item.tax_rate_bps) / 100}%</td>
                  <td>
                    <strong>{formatMoney(item.line_total_paise)}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="corp-totals">
            <div className="corp-total-row">
              <span>Taxable Subtotal</span>
              <span>{formatMoney(quotation.subtotal_paise)}</span>
            </div>
            <div className="corp-total-row">
              <span>GST (Standard 18%)</span>
              <span>{formatMoney(quotation.tax_paise)}</span>
            </div>
            <div className="corp-total-row corp-total-grand">
              <span>Grand Total</span>
              <span>{formatMoney(quotation.total_paise)}</span>
            </div>
          </div>
        </section>

        {company?.default_terms && (
          <section className="corp-section">
            <h2 className="corp-section-title">Commercial & Legal Terms</h2>
            <p className="corp-body">{company.default_terms}</p>
          </section>
        )}

        <footer className="corp-doc-footer">
          <Image
            src="/brand/gavior-logo-header.avif"
            alt="Gavior"
            width={80}
            height={24}
            className="corp-footer-logo"
          />
          <p>Confidential proposal prepared exclusively by Gavior Technologies.</p>
        </footer>
      </article>
    </div>
  );
}
