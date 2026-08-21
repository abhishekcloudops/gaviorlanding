-- Grant explicit table and sequence privileges for ops_* tables to anon and authenticated roles
grant usage on schema public to anon, authenticated, service_role;

grant all on table public.ops_company_settings to anon, authenticated, service_role;
grant all on table public.ops_clients to anon, authenticated, service_role;
grant all on table public.ops_catalog_items to anon, authenticated, service_role;
grant all on table public.ops_quotations to anon, authenticated, service_role;
grant all on table public.ops_quotation_items to anon, authenticated, service_role;
grant all on table public.ops_invoices to anon, authenticated, service_role;
grant all on table public.ops_invoice_items to anon, authenticated, service_role;
grant all on table public.ops_payments to anon, authenticated, service_role;
grant all on table public.ops_dispatch_logs to anon, authenticated, service_role;

grant execute on function public.ops_next_document_number(text, text) to anon, authenticated, service_role;

-- Drop and recreate policies with explicit role targeting
drop policy if exists "ops_company_settings_all" on public.ops_company_settings;
drop policy if exists "ops_clients_all" on public.ops_clients;
drop policy if exists "ops_catalog_items_all" on public.ops_catalog_items;
drop policy if exists "ops_quotations_all" on public.ops_quotations;
drop policy if exists "ops_quotation_items_all" on public.ops_quotation_items;
drop policy if exists "ops_invoices_all" on public.ops_invoices;
drop policy if exists "ops_invoice_items_all" on public.ops_invoice_items;
drop policy if exists "ops_payments_all" on public.ops_payments;
drop policy if exists "ops_dispatch_logs_all" on public.ops_dispatch_logs;

create policy "ops_company_settings_open" on public.ops_company_settings for all to public using (true) with check (true);
create policy "ops_clients_open" on public.ops_clients for all to public using (true) with check (true);
create policy "ops_catalog_items_open" on public.ops_catalog_items for all to public using (true) with check (true);
create policy "ops_quotations_open" on public.ops_quotations for all to public using (true) with check (true);
create policy "ops_quotation_items_open" on public.ops_quotation_items for all to public using (true) with check (true);
create policy "ops_invoices_open" on public.ops_invoices for all to public using (true) with check (true);
create policy "ops_invoice_items_open" on public.ops_invoice_items for all to public using (true) with check (true);
create policy "ops_payments_open" on public.ops_payments for all to public using (true) with check (true);
create policy "ops_dispatch_logs_open" on public.ops_dispatch_logs for all to public using (true) with check (true);
