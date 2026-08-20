import Link from "next/link";
import { InvoiceForm } from "@/components/invoices/invoice-form";
import { Notice } from "@/components/ui/notice";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function NewInvoicePage({
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
          <p className="ops-eyebrow">Direct Billing</p>
          <h1 className="ops-title">Create Direct Tax Invoice</h1>
          <p className="ops-muted">
            Issue immediate GST tax invoices, recurring monthly retainers, or proforma billing without a prior quotation.
          </p>
        </div>
      </header>

      <Notice error={params.error} />

      {allClients.length === 0 ? (
        <div className="ops-panel text-center py-12">
          <p className="text-gray-600 font-bold mb-3">
            Please add at least one client before generating an invoice.
          </p>
          <Link href="/clients" className="ops-btn">
            Go to Client Directory
          </Link>
        </div>
      ) : (
        <InvoiceForm
          clients={allClients}
          catalog={allCatalog}
          defaultTaxRate={defaultTaxRate}
        />
      )}
    </div>
  );
}
