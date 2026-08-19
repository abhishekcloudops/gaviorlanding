import { notFound } from "next/navigation";
import Image from "next/image";
import {
  convertToInvoiceAction,
  generateQuotationAction,
  saveQuotationContentAction,
  setQuotationStatusAction,
} from "@/app/admin/actions";
import { AdminNotice } from "@/components/admin/notice";
import { ConfirmButton, GeminiGenerateButton, PrintButton } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { formatMoney } from "@/lib/admin/money";
import type { QuotationContent } from "@/lib/admin/validation";

const sectionLabels: Record<keyof QuotationContent, string> = {
  executiveSummary: "Executive Summary",
  understanding: "Understanding of Requirements",
  proposedSolution: "Proposed Solution",
  scope: "Scope & Deliverables",
  timelineNarrative: "Timeline",
  assumptions: "Assumptions",
  exclusions: "Exclusions",
  clientResponsibilities: "Client Responsibilities",
  support: "Support & Warranty",
  closing: "Closing Note",
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
  const { supabase } = await requireAdmin();

  const [{ data: quotation }, { data: company }] = await Promise.all([
    supabase.from("quotations").select("*,clients(*),quotation_items(*)").eq("id", id).maybeSingle(),
    supabase.from("company_settings").select("*").eq("id", "default").single(),
  ]);

  if (!quotation) notFound();

  const finalSnapshot = quotation.immutable_snapshot as {
    quotation?: typeof quotation;
    company?: typeof company;
  } | null;
  const documentQuote = finalSnapshot?.quotation || quotation;
  const documentCompany = finalSnapshot?.company || company;
  const client = documentQuote.clients as Record<string, string | null>;
  const items = (documentQuote.quotation_items || []).sort(
    (a: { position: number }, b: { position: number }) => a.position - b.position,
  );
  const content = (documentQuote.content || {}) as Partial<QuotationContent>;
  const hasContent = Object.keys(content).length > 0;
  const editable = !["sent", "accepted", "rejected", "expired"].includes(quotation.status);

  return (
    <main>
      {/* ── Admin toolbar (no-print) ── */}
      <header className="admin-page-header no-print">
        <div>
          <p className="admin-eyebrow">{quotation.quotation_number}</p>
          <h1>{quotation.title}</h1>
          <p className="admin-muted">
            Status: <span className="admin-badge">{quotation.status}</span>
          </p>
        </div>
        <div className="admin-actions">
          <PrintButton />
          {editable && (
            <GeminiGenerateButton
              id={id}
              hasContent={hasContent}
              generateAction={generateQuotationAction}
            />
          )}
        </div>
      </header>

      <AdminNotice {...query} />

      {/* ── Controls panel ── */}
      <section className="admin-panel no-print">
        <div className="admin-section-title">
          <h2>Controls</h2>
          <span className="admin-badge">Human approval required</span>
        </div>
        <div className="admin-actions">
          {quotation.status === "reviewed" && (
            <form action={setQuotationStatusAction}>
              <input type="hidden" name="id" value={id} />
              <input type="hidden" name="status" value="sent" />
              <button className="admin-button" type="submit">Mark sent</button>
            </form>
          )}
          {["reviewed", "sent"].includes(quotation.status) && (
            <form action={setQuotationStatusAction}>
              <input type="hidden" name="id" value={id} />
              <input type="hidden" name="status" value="accepted" />
              <ConfirmButton message="Accept and lock this quotation for invoicing?">Mark accepted</ConfirmButton>
            </form>
          )}
          {quotation.status === "accepted" && (
            <form action={convertToInvoiceAction}>
              <input type="hidden" name="id" value={id} />
              <button className="admin-button" type="submit">Convert to invoice</button>
            </form>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          QUOTATION DOCUMENT — corporate design
      ══════════════════════════════════════════════ */}
      <article className="corp-document">

        {/* ── Document header with logo ── */}
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
              <p>{documentCompany?.legal_name}</p>
              <p>{documentCompany?.address}</p>
              {documentCompany?.gstin && <p>GSTIN: {documentCompany.gstin}</p>}
            </div>
          </div>

          <div className="corp-doc-title-block">
            <div className="corp-doc-type">QUOTATION</div>
            <table className="corp-meta-table">
              <tbody>
                <tr>
                  <td>Number</td>
                  <td><strong>{documentQuote.quotation_number}</strong></td>
                </tr>
                <tr>
                  <td>Date</td>
                  <td>{new Date(documentQuote.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</td>
                </tr>
                <tr>
                  <td>Valid until</td>
                  <td>{documentQuote.valid_until || "As agreed"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </header>

        {/* ── Address bar ── */}
        <div className="corp-address-bar">
          <div className="corp-address-block">
            <p className="corp-address-label">Prepared for</p>
            <p className="corp-address-name">{client?.company_name}</p>
            <p>{client?.contact_name}</p>
            <p className="corp-address-detail">{client?.billing_address}</p>
            {client?.gstin && <p className="corp-address-detail">GSTIN: {client.gstin}</p>}
          </div>
          <div className="corp-address-block">
            <p className="corp-address-label">Project</p>
            <p className="corp-address-name">{documentQuote.title}</p>
            <p className="corp-address-detail">{documentQuote.timeline || "Timeline to be agreed"}</p>
          </div>
        </div>

        {/* ── Narrative sections ── */}
        {!hasContent && (
          <section className="corp-section">
            <h2 className="corp-section-title">Project Summary</h2>
            <p className="corp-body">{documentQuote.short_summary}</p>
          </section>
        )}
        {hasContent &&
          (Object.keys(sectionLabels) as Array<keyof QuotationContent>).map((key) =>
            content[key] ? (
              <section className="corp-section" key={key}>
                <h2 className="corp-section-title">{sectionLabels[key]}</h2>
                <p className="corp-body">{content[key]}</p>
              </section>
            ) : null,
          )}

        {/* ── Commercials ── */}
        <section className="corp-section">
          <h2 className="corp-section-title">Commercials</h2>
          <table className="corp-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>GST</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item: Record<string, string | number>) => (
                <tr key={String(item.id)}>
                  <td>
                    <strong>{item.description}</strong>
                    {item.sac_hsn ? <><br /><span className="corp-small">SAC/HSN: {item.sac_hsn}</span></> : null}
                  </td>
                  <td>{item.quantity} {item.unit}</td>
                  <td>{formatMoney(item.unit_price_paise)}</td>
                  <td>{Number(item.tax_rate_bps) / 100}%</td>
                  <td><strong>{formatMoney(item.line_total_paise)}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="corp-totals">
            <div className="corp-total-row">
              <span>Subtotal</span>
              <span>{formatMoney(quotation.subtotal_paise)}</span>
            </div>
            <div className="corp-total-row">
              <span>Tax (GST)</span>
              <span>{formatMoney(quotation.tax_paise)}</span>
            </div>
            <div className="corp-total-row corp-total-grand">
              <span>Grand Total</span>
              <span>{formatMoney(quotation.total_paise)}</span>
            </div>
          </div>
        </section>

        {/* ── Terms ── */}
        {documentCompany?.default_terms && (
          <section className="corp-section">
            <h2 className="corp-section-title">Commercial Terms</h2>
            <p className="corp-body">{documentCompany.default_terms}</p>
          </section>
        )}

        {/* ── Footer with logo ── */}
        <footer className="corp-doc-footer">
          <Image
            src="/brand/gavior-logo-header.avif"
            alt="Gavior"
            width={80}
            height={24}
            className="corp-footer-logo"
          />
          <p>This document is confidential and prepared exclusively for the named recipient.</p>
        </footer>
      </article>

      {/* ── AI content editor ── */}
      {hasContent && editable && (
        <section className="admin-panel no-print">
          <h2>Review and edit AI content</h2>
          <p className="admin-help">
            AI output is a draft. Verify scope, timeline, assumptions and legal wording.
            Saving creates a version before marking the document reviewed.
          </p>
          <form action={saveQuotationContentAction} className="admin-content-editor">
            <input type="hidden" name="id" value={id} />
            {(Object.keys(sectionLabels) as Array<keyof QuotationContent>).map((key) => (
              <label className="admin-field" key={key}>
                {sectionLabels[key]}
                <textarea
                  name={key}
                  required
                  maxLength={key === "scope" ? 8000 : 5000}
                  defaultValue={content[key] || ""}
                />
              </label>
            ))}
            <button className="admin-button" type="submit">Save reviewed version</button>
          </form>
        </section>
      )}
    </main>
  );
}
