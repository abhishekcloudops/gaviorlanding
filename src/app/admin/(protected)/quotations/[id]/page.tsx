import { notFound } from "next/navigation";
import { convertToInvoiceAction, generateQuotationAction, saveQuotationContentAction, setQuotationStatusAction } from "@/app/admin/actions";
import { AdminNotice } from "@/components/admin/notice";
import { ConfirmButton, PrintButton } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { formatMoney } from "@/lib/admin/money";
import type { QuotationContent } from "@/lib/admin/validation";

const sectionLabels: Record<keyof QuotationContent, string> = {
  executiveSummary: "Executive summary", understanding: "Understanding of requirements",
  proposedSolution: "Proposed solution", scope: "Scope and deliverables", timelineNarrative: "Timeline",
  assumptions: "Assumptions", exclusions: "Exclusions", clientResponsibilities: "Client responsibilities",
  support: "Support and warranty", closing: "Closing note",
};

export default async function QuotationDetailPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string; error?: string }> }) {
  const { id } = await params; const query = await searchParams; const { supabase } = await requireAdmin();
  const [{ data: quotation }, { data: company }] = await Promise.all([
    supabase.from("quotations").select("*,clients(*),quotation_items(*)").eq("id", id).maybeSingle(),
    supabase.from("company_settings").select("*").eq("id", "default").single(),
  ]);
  if (!quotation) notFound();
  const finalSnapshot = quotation.immutable_snapshot as { quotation?: typeof quotation; company?: typeof company } | null;
  const documentQuote = finalSnapshot?.quotation || quotation;
  const documentCompany = finalSnapshot?.company || company;
  const client = documentQuote.clients as Record<string, string | null>;
  const items = (documentQuote.quotation_items || []).sort((a: { position: number }, b: { position: number }) => a.position - b.position);
  const content = (documentQuote.content || {}) as Partial<QuotationContent>;
  const hasContent = Object.keys(content).length > 0;
  const editable = !["sent", "accepted", "rejected", "expired"].includes(quotation.status);
  return <main><header className="admin-page-header no-print"><div><p className="admin-eyebrow">{quotation.quotation_number}</p><h1>{quotation.title}</h1><p className="admin-muted">Status: <span className="admin-badge">{quotation.status}</span></p></div><div className="admin-actions"><PrintButton />{editable && <form action={generateQuotationAction}><input type="hidden" name="id" value={id} /><ConfirmButton message={hasContent ? "Regenerate all AI sections? The current version will be preserved." : "Generate quotation content with Gemini?"}>{hasContent ? "Regenerate with Gemini" : "Generate with Gemini"}</ConfirmButton></form>}</div></header>
    <AdminNotice {...query} />
    <section className="admin-panel no-print"><div className="admin-section-title"><h2>Controls</h2><span className="admin-badge">Human approval required</span></div><div className="admin-actions">
      {quotation.status === "reviewed" && <form action={setQuotationStatusAction}><input type="hidden" name="id" value={id} /><input type="hidden" name="status" value="sent" /><button className="admin-button" type="submit">Mark sent</button></form>}
      {["reviewed", "sent"].includes(quotation.status) && <form action={setQuotationStatusAction}><input type="hidden" name="id" value={id} /><input type="hidden" name="status" value="accepted" /><ConfirmButton message="Accept and lock this quotation for invoicing?">Mark accepted</ConfirmButton></form>}
      {quotation.status === "accepted" && <form action={convertToInvoiceAction}><input type="hidden" name="id" value={id} /><button className="admin-button" type="submit">Convert to invoice</button></form>}
    </div></section>
    <article className="admin-document">
      <header className="admin-document-head"><div><div className="admin-brand">GAVIOR</div><p>{documentCompany?.legal_name}<br />{documentCompany?.address}<br />{documentCompany?.gstin ? `GSTIN: ${documentCompany.gstin}` : ""}</p></div><div className="admin-document-meta"><h2>QUOTATION</h2><p><b>{documentQuote.quotation_number}</b><br />Created: {new Date(documentQuote.created_at).toLocaleDateString("en-IN")}<br />Valid until: {documentQuote.valid_until || "As agreed"}</p></div></header>
      <section className="admin-detail-grid"><div><h2>Prepared for</h2><p><b>{client?.company_name}</b><br />{client?.contact_name}<br />{client?.billing_address}<br />{client?.gstin ? `GSTIN: ${client.gstin}` : ""}</p></div><div><h2>Project</h2><p><b>{documentQuote.title}</b><br />{documentQuote.timeline || "Timeline to be agreed"}</p></div></section>
      {!hasContent && <section><h2>Project summary</h2><p>{documentQuote.short_summary}</p></section>}
      {hasContent && (Object.keys(sectionLabels) as Array<keyof QuotationContent>).map((key) => content[key] ? <section key={key}><h2>{sectionLabels[key]}</h2><p>{content[key]}</p></section> : null)}
      <section><h2>Commercials</h2><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Description</th><th>Qty</th><th>Unit price</th><th>GST</th><th>Total</th></tr></thead><tbody>{items.map((item: Record<string, string | number>) => <tr key={String(item.id)}><td>{item.description}<br /><small>{item.sac_hsn ? `SAC/HSN: ${item.sac_hsn}` : ""}</small></td><td>{item.quantity} {item.unit}</td><td>{formatMoney(item.unit_price_paise)}</td><td>{Number(item.tax_rate_bps) / 100}%</td><td>{formatMoney(item.line_total_paise)}</td></tr>)}</tbody></table></div><div className="admin-total-box"><div className="admin-total-row"><span>Subtotal</span><b>{formatMoney(quotation.subtotal_paise)}</b></div><div className="admin-total-row"><span>Tax</span><b>{formatMoney(quotation.tax_paise)}</b></div><div className="admin-total-row"><span>Total</span><b>{formatMoney(quotation.total_paise)}</b></div></div></section>
      {documentCompany?.default_terms && <section><h2>Commercial terms</h2><p>{documentCompany.default_terms}</p></section>}
    </article>
    {hasContent && editable && <section className="admin-panel no-print"><h2>Review and edit AI content</h2><p className="admin-help">AI output is a draft. Verify scope, timeline, assumptions and legal wording. Saving creates a version before marking the document reviewed.</p><form action={saveQuotationContentAction} className="admin-content-editor"><input type="hidden" name="id" value={id} />{(Object.keys(sectionLabels) as Array<keyof QuotationContent>).map((key) => <label className="admin-field" key={key}>{sectionLabels[key]}<textarea name={key} required maxLength={key === "scope" ? 8000 : 5000} defaultValue={content[key] || ""} /></label>)}<button className="admin-button" type="submit">Save reviewed version</button></form></section>}
  </main>;
}
