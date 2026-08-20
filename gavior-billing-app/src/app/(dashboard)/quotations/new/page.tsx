import Link from "next/link";
import { QuotationForm } from "@/components/quotations/quotation-form";
import { Notice } from "@/components/ui/notice";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function NewQuotationPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const supabase = await createSupabaseServerClient();
  const params = await searchParams;

  const [{ data: clients }, { data: catalog }, { data: settings }] =
    await Promise.all([
      supabase.from("ops_clients").select("*").order("company_name"),
      supabase
        .from("ops_catalog_items")
        .select("*")
        .eq("active", true)
        .order("category")
        .order("name"),
      supabase
        .from("ops_company_settings")
        .select("default_tax_rate_bps")
        .eq("id", "default")
        .single(),
    ]);

  const allClients = clients || [];
  const allCatalog = catalog || [];
  const defaultTaxRate = (settings?.default_tax_rate_bps || 1800) / 100;

  return (
    <div>
      <header className="ops-page-header">
        <div>
          <p className="ops-eyebrow">New Proposal</p>
          <h1 className="ops-title">Create Custom Quotation</h1>
          <p className="ops-muted">
            Configure line items from catalog or custom scope. Gemini AI can draft the full corporate proposal after saving.
          </p>
        </div>
      </header>

      <Notice error={params.error} />

      {allClients.length === 0 ? (
        <div className="ops-panel text-center py-12">
          <p className="text-gray-600 font-bold mb-3">
            You need to create at least one client before generating a quotation.
          </p>
          <Link href="/clients" className="ops-btn">
            Go to Client Directory
          </Link>
        </div>
      ) : (
        <QuotationForm
          clients={allClients}
          catalog={allCatalog}
          defaultTaxRate={defaultTaxRate}
        />
      )}
    </div>
  );
}
