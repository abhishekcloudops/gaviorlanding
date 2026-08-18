-- Supabase can grant Data API roles access to newly created public functions.
-- Make anonymous access explicit and keep trigger-only functions off the RPC API.
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.is_admin() from public, anon;
revoke execute on function public.next_document_number(text, text) from public, anon;
revoke execute on function public.consume_ai_generation_quota() from public, anon;
revoke execute on function public.record_invoice_payment(uuid, bigint, date, text, text)
  from public, anon;

revoke execute on function public.set_updated_at() from public, anon, authenticated;
revoke execute on function public.protect_quotation_state() from public, anon, authenticated;
revoke execute on function public.prevent_final_document_delete() from public, anon, authenticated;
revoke execute on function public.protect_quotation_items() from public, anon, authenticated;
revoke execute on function public.protect_issued_invoice() from public, anon, authenticated;
revoke execute on function public.protect_invoice_items() from public, anon, authenticated;

alter function public.set_updated_at() set search_path = '';
alter function public.protect_quotation_state() set search_path = '';
alter function public.prevent_final_document_delete() set search_path = '';
alter function public.protect_quotation_items() set search_path = '';
alter function public.protect_issued_invoice() set search_path = '';
alter function public.protect_invoice_items() set search_path = '';

alter policy admin_quotation_versions_insert on public.quotation_versions
  with check (public.is_admin() and created_by = (select auth.uid()));

alter policy admin_audit_logs_insert on public.audit_logs
  with check (public.is_admin() and actor_id = (select auth.uid()));
