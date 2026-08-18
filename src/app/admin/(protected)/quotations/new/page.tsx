import { AdminNotice } from "@/components/admin/notice";
import { QuotationForm } from "@/components/admin/quotation-form";
import { requireAdmin } from "@/lib/admin/auth";

export default async function NewQuotationPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { supabase } = await requireAdmin(); const params = await searchParams;
  const [{ data: clients }, { data: catalog }, { data: settings }] = await Promise.all([
    supabase.from("clients").select("id,company_name").order("company_name"),
    supabase.from("catalog_items").select("id,name,description,unit,sac_hsn,unit_price_paise,tax_rate_bps").eq("active", true).order("name"),
    supabase.from("company_settings").select("default_tax_rate_bps").eq("id", "default").single(),
  ]);
  return <main><header className="admin-page-header"><div><p className="admin-eyebrow">New document</p><h1>Create quotation</h1><p className="admin-muted">Enter factual details first. Gemini can elaborate the narrative after the draft is saved.</p></div></header><AdminNotice error={params.error} />
    {!clients?.length ? <div className="admin-alert admin-alert-error">Create at least one client before creating a quotation.</div> : <QuotationForm clients={clients} catalog={catalog || []} defaultTaxRate={Number(settings?.default_tax_rate_bps || 1800) / 100} />}
  </main>;
}
