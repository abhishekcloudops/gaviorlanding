# Gavior admin setup

The admin application is built into `/admin`. It is disabled until Supabase and the server encryption key are configured.

## 1. Create the Supabase project

Create a Supabase project and run `supabase/migrations/202608180001_admin_quotation_invoice.sql` in its SQL editor.

In Supabase Authentication:

1. Disable public user sign-ups.
2. Create the first administrator manually with a strong, unique password.
3. Enable CAPTCHA and MFA before inviting additional administrators.
4. Run this one-time bootstrap statement in the SQL editor, replacing the email:

```sql
update public.profiles
set role = 'admin'
where email = 'admin@example.com';
```

New users are always created with the `pending` role. They receive no business-table access until explicitly promoted.

## 2. Configure secrets

Add these GitHub Actions repository/environment secrets:

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: Supabase publishable key. Do not use the service-role key.
- `ADMIN_ENCRYPTION_KEY`: a random base64-encoded 32-byte key.
- `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY`: a different random base64-encoded 32-byte key, kept stable across deployments.

Generate each encryption key separately on a trusted machine:

```bash
openssl rand -base64 32
```

Store the output directly as the GitHub secret. Do not commit it or place it in chat, logs, screenshots, or client-side code. Losing this key makes saved Gemini credentials unrecoverable. Rotating it requires decrypting and re-encrypting stored secrets first.

For local development, add the same variable names to `.env.local`. Environment files are git-ignored.

## 3. Gemini configuration

Sign in at `/admin/login`, open Settings, choose an allowed model, and enter the Gemini key. The server validates the key before encrypting it with AES-256-GCM. Only the last four characters are displayed afterward.

Restrict the key to the Gemini API in Google AI Studio. Set billing alerts and use an authorization key instead of a legacy unrestricted standard key.

The application minimizes AI data transfer: it sends only the client company/contact name, quotation brief, timeline, and non-financial item descriptions. It excludes client email, phone, billing address, GSTIN and internal notes. For confidential client work, use a Gemini paid project with the appropriate data terms instead of the free tier.

## 4. Operational controls

- Review every Gemini-generated section before marking a quotation reviewed.
- Issued invoices and finalized quotations are protected by database triggers.
- Payment recording is an atomic database operation.
- Export the database and finalized documents regularly. The Supabase free tier does not include automatic backups.
- Have an accountant validate GST, SAC/HSN, place-of-supply and invoice wording before real issuance.
- Never expose the Supabase service-role key to this application unless a separately reviewed server-only operation later requires it.

## 5. Release checks

Run:

```bash
npm audit --omit=dev
npm run lint
npx tsc --noEmit
npm run build
git diff --check
```

After deployment, verify unauthenticated `/admin` access, admin sign-in, RLS rejection for pending accounts, Gemini key masking, quotation versioning, invoice locking and payment reconciliation.
