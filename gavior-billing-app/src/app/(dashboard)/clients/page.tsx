import Link from "next/link";
import { Users, Building, Trash2 } from "lucide-react";
import { createClientAction, deleteClientAction } from "@/app/actions/clients";
import { ConfirmButton } from "@/components/ui/buttons";
import { Notice } from "@/components/ui/notice";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const supabase = await createSupabaseServerClient();
  const query = await searchParams;

  const { data: clients } = await supabase
    .from("ops_clients")
    .select("*")
    .order("created_at", { ascending: false });

  const allClients = clients || [];

  return (
    <div>
      <header className="ops-page-header">
        <div>
          <p className="ops-eyebrow">Client Relationship Management</p>
          <h1 className="ops-title">Client Directory</h1>
          <p className="ops-muted">
            Manage company billing profiles, GSTIN registrations, and customer accounts.
          </p>
        </div>
      </header>

      <Notice {...query} />

      {/* ── Add Client Panel ── */}
      <section className="ops-panel">
        <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Building size={18} className="text-[#1e6a47]" /> Add New Client Account
        </h2>

        <form action={createClientAction} className="ops-form-grid">
          <label className="ops-field">
            Company / Business Name
            <input
              name="company_name"
              required
              maxLength={180}
              placeholder="e.g. Acme Innovations LLP"
            />
          </label>

          <label className="ops-field">
            Primary Contact Person
            <input
              name="contact_name"
              maxLength={120}
              placeholder="e.g. Rahul Sharma (CTO / Founder)"
            />
          </label>

          <label className="ops-field">
            Email Address (for Invoices & Quotes)
            <input
              name="email"
              type="email"
              placeholder="billing@acme.com"
            />
          </label>

          <label className="ops-field">
            Phone / WhatsApp Number
            <input
              name="phone"
              placeholder="+91 98765 43210"
            />
          </label>

          <label className="ops-field">
            Client GSTIN
            <input
              name="gstin"
              placeholder="e.g. 29ABCDE1234F1Z5"
            />
          </label>

          <label className="ops-field">
            State & State Code
            <div className="grid grid-cols-3 gap-2">
              <input
                name="state"
                defaultValue="Karnataka"
                className="col-span-2"
                placeholder="State"
              />
              <input
                name="state_code"
                defaultValue="29"
                className="col-span-1"
                placeholder="Code"
              />
            </div>
          </label>

          <label className="ops-field ops-field-full">
            Registered Billing Address
            <textarea
              name="billing_address"
              rows={2}
              placeholder="Full office address for GST tax invoice header."
            />
          </label>

          <div className="ops-field-full">
            <button className="ops-btn" type="submit">
              Save Client to Directory
            </button>
          </div>
        </form>
      </section>

      {/* ── Client List ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-gray-900">
            Registered Accounts ({allClients.length})
          </h2>
        </div>

        <div className="ops-table-wrap">
          <table className="ops-table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Phone</th>
                <th>GSTIN</th>
                <th>State</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allClients.map((client) => (
                <tr key={client.id}>
                  <td>
                    <Link
                      href={`/clients/${client.id}`}
                      className="font-bold text-[#1e6a47]"
                    >
                      {client.company_name}
                    </Link>
                  </td>
                  <td>{client.contact_name || "—"}</td>
                  <td>
                    {client.email ? (
                      <a href={`mailto:${client.email}`} className="text-gray-600">
                        {client.email}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>{client.phone || "—"}</td>
                  <td>
                    {client.gstin ? (
                      <span className="font-mono text-xs font-bold">{client.gstin}</span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>
                    {client.state} ({client.state_code})
                  </td>
                  <td>
                    <form action={deleteClientAction}>
                      <input type="hidden" name="id" value={client.id} />
                      <ConfirmButton
                        className="ops-btn ops-btn-secondary text-red-600 border-red-200 hover:bg-red-50 text-xs px-2.5 py-1"
                        message={`Delete client account "${client.company_name}"?`}
                      >
                        <Trash2 size={12} />
                      </ConfirmButton>
                    </form>
                  </td>
                </tr>
              ))}
              {allClients.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400">
                    <Users size={32} className="mx-auto mb-2 opacity-40" />
                    <p>No clients registered yet.</p>
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
