import { notFound } from "next/navigation";
import Image from "next/image";
import {
  convertQuotationToInvoiceAction,
  generateQuotationAiContentAction,
  saveQuotationContentAction,
  setQuotationStatusAction,
} from "@/app/actions/quotations";
import { sendQuotationToClientAction } from "@/app/actions/dispatch";
import { ConfirmButton, GeminiGenerateButton, PrintButton } from "@/components/ui/buttons";
import { Notice } from "@/components/ui/notice";
import { SendDocumentModal } from "@/components/ui/send-modal";
import { formatMoney } from "@/lib/money";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { QuotationContent } from "@/lib/types";

export const dynamic = "force-dynamic";

const sectionLabels: Record<keyof QuotationContent, string> = {
  executiveSummary: "Executive Summary",
  understanding: "Understanding of Requirements",
  proposedSolution: "Proposed Solution Architecture",
  scope: "Detailed Scope & Deliverables",
  timelineNarrative: "Timeline & Milestones",
  assumptions: "Key Assumptions",
  exclusions: "Out of Scope / Exclusions",
  clientResponsibilities: "Client Responsibilities",
  support: "Support, Maintenance & Warranty",
  closing: "Closing Note & Next Steps",
};

export default async function QuotationDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const supabase = await createSupabaseServerClient();

  const [{ data: quotation }, { data: company }] = await Promise.all([
    supabase
      .from("ops_quotations")
      .select("*, clients(*), ops_quotation_items(*)")
      .eq("id", id)
      .maybeSingle(),
    supabase.from("ops_company_settings").select("*").eq("id", "default").single(),
  ]);

  if (!quotation) notFound();

  const client = quotation.clients;
  const items = (quotation.ops_quotation_items || []).sort(
    (a: { position: number }, b: { position: number }) => a.position - b.position,
  );
  const content = (quotation.content || {}) as Partial<QuotationContent>;
  const hasContent = Object.keys(content).length > 0;
  const isEditable = !["accepted", "rejected", "expired"].includes(quotation.status);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";
  const portalUrl = `${appUrl}/portal/quote/${quotation.portal_token}`;

  return (
    <div>
      {/* ── Admin Toolbar (No Print) ── */}
      <header className="ops-page-header no-print">
        <div>
          <p className="ops-eyebrow">{quotation.quotation_number}</p>
          <h1 className="ops-title">{quotation.title}</h1>
          <p className="ops-muted">
            Status: <span className="ops-badge">{quotation.status}</span> • Created:{" "}
            {new Date(quotation.created_at).toLocaleDateString("en-IN")}
          </p>
        </div>
        <div className="ops-actions">
          <PrintButton />
          
          <SendDocumentModal
            documentType="quotation"
            documentId={quotation.id}
            documentNumber={quotation.quotation_number}
            title={quotation.title}
            clientEmail={client?.email}
            clientPhone={client?.phone}
            clientName={client?.company_name || client?.contact_name || "Valued Client"}
            totalFormatted={formatMoney(quotation.total_paise)}
            portalUrl={portalUrl}
            sendEmailAction={sendQuotationToClientAction}
          />

          {isEditable && (
            <GeminiGenerateButton
              id={id}
              hasContent={hasContent}
              generateAction={generateQuotationAiContentAction}
            />
          )}
        </div>
      </header>

      <Notice {...query} />

      {/* ── Workflow Controls Panel (No Print) ── */}
      <section className="ops-panel no-print">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-800">Workflow & Approvals</h2>
          <span className="ops-badge">
            {quotation.status === "accepted" ? "Ready for Invoicing" : "Draft Pipeline"}
          </span>
        </div>
        <div className="flex flex-wrap gap-3">
          {quotation.status === "reviewed" && (
            <form action={setQuotationStatusAction}>
              <input type="hidden" name="id" value={id} />
              <input type="hidden" name="status" value="sent" />
              <button className="ops-btn ops-btn-secondary" type="submit">
                Mark as Sent
              </button>
            </form>
          )}

          {["reviewed", "sent", "viewed"].includes(quotation.status) && (
            <form action={setQuotationStatusAction}>
              <input type="hidden" name="id" value={id} />
              <input type="hidden" name="status" value="accepted" />
              <ConfirmButton message="Mark this quotation as accepted by the client?">
                Mark Accepted
              </ConfirmButton>
            </form>
          )}

          {quotation.status === "accepted" && (
            <form action={convertQuotationToInvoiceAction}>
              <input type="hidden" name="id" value={id} />
              <button className="ops-btn" type="submit">
                ✦ Convert into Formal Tax Invoice
              </button>
            </form>
          )}

          {isEditable && quotation.status !== "rejected" && (
            <form action={setQuotationStatusAction}>
              <input type="hidden" name="id" value={id} />
              <input type="hidden" name="status" value="rejected" />
              <ConfirmButton
                className="ops-btn ops-btn-secondary text-red-600 border-red-200 hover:bg-red-50"
                message="Mark this proposal as declined/rejected?"
              >
                Mark Declined
              </ConfirmButton>
            </form>
          )}
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════
          CORPORATE PROPOSAL DOCUMENT (A4 & Print Preview)
      ═════════════════════════════════════════════════════════ */}
      <article className="corp-document">
        {/* ── Document Header with Logo ── */}
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
            <div className="corp-doc-type">COMMERCIAL PROPOSAL</div>
            <table className="corp-meta-table">
              <tbody>
                <tr>
                  <td>Quotation No:</td>
                  <td><strong>{quotation.quotation_number}</strong></td>
                </tr>
                <tr>
                  <td>Issue Date:</td>
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

        {/* ── Address & Project Details ── */}
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

        {/* ── Project Objectives ── */}
        {!hasContent && (
          <section className="corp-section">
            <h2 className="corp-section-title">Project Summary & Objectives</h2>
            <p className="corp-body">{quotation.short_summary}</p>
          </section>
        )}

        {/* ── Gemini AI Narrative Sections ── */}
        {hasContent &&
          (Object.keys(sectionLabels) as Array<keyof QuotationContent>).map((key) =>
            content[key] ? (
              <section className="corp-section" key={key}>
                <h2 className="corp-section-title">{sectionLabels[key]}</h2>
                <p className="corp-body">{content[key]}</p>
              </section>
            ) : null,
          )}

        {/* ── Commercial Investment Table ── */}
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

        {/* ── Standard Terms ── */}
        {company?.default_terms && (
          <section className="corp-section">
            <h2 className="corp-section-title">Commercial & Legal Terms</h2>
            <p className="corp-body">{company.default_terms}</p>
          </section>
        )}

        {/* ── Footer ── */}
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

      {/* ── AI Narrative Section Editor (No Print) ── */}
      {hasContent && isEditable && (
        <section className="ops-panel no-print">
          <h2 className="text-base font-bold text-gray-900 mb-2">
            Review & Edit AI Proposal Narrative
          </h2>
          <p className="text-xs text-gray-500 mb-6">
            Review Gemini AI generated sections. Make any custom edits before final dispatch.
          </p>

          <form action={saveQuotationContentAction} className="space-y-4">
            <input type="hidden" name="id" value={id} />
            {(Object.keys(sectionLabels) as Array<keyof QuotationContent>).map((key) => (
              <label className="ops-field" key={key}>
                {sectionLabels[key]}
                <textarea
                  name={key}
                  required
                  rows={key === "scope" ? 6 : 4}
                  defaultValue={content[key] || ""}
                />
              </label>
            ))}
            <button className="ops-btn" type="submit">
              Save Edited Proposal Version
            </button>
          </form>
        </section>
      )}
    </div>
  );
}
