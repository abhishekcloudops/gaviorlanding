# Gavior Operations Suite (Quotations & GST Invoicing)

A modern, standalone enterprise dashboard for **Quotations, Proposals, Client CRM, and GST Tax Billing** for **Gavior Technologies**.

---

## 🌟 Key Features

1. **Custom Quotations & Proposals**:
   - Multi-line item builder with instant search across all 30 standard Gavior service packages.
   - 1-Click **Google Gemini AI Proposal Generator** for comprehensive executive summaries, scope of work, deliverables, milestone schedules, assumptions, exclusions, and warranty clauses.
   - Live real-time GST tax calculations and print-ready A4 corporate stylesheets.

2. **Direct Customer Dispatch**:
   - **Hostinger SMTP Email Pipeline**: Sends branded, high-converting HTML emails with direct action links to the client portal.
   - **1-Click WhatsApp Direct Share**: Pre-formatted quote and bill messages with direct review links.

3. **Public Tokenized Client Portal**:
   - `/portal/quote/[token]`: Secure public portal where clients review proposals and digitally approve with 1 click.
   - `/portal/invoice/[token]`: Secure public portal where clients view their tax invoice, download PDF, or scan a **dynamic UPI QR code** (GPay, PhonePe, Paytm) to pay immediately.

4. **Advanced GST Billing & Retainers**:
   - Automatic Intra-State (CGST 9% + SGST 9%) vs Inter-State (IGST 18%) calculation.
   - Monthly Retainer & Recurring Billing support.
   - Milestone and partial payment recording with transaction UTR tracking and automatic balance reconciliation.

5. **Client CRM & Master Catalog**:
   - Full client directory with GSTIN, PAN, and lifetime ledger statement.
   - 30 preloaded standard Gavior service plans across Websites, Branding, Social Media, SEO, AI Automation, UI/UX, Mobile Apps, SaaS, Video Editing, and Cloud/DevOps.

---

## 🚀 Quick Setup & Local Development

### 1. Install Dependencies
```bash
cd gavior-billing-app
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3001](http://localhost:3001) in your browser.

---

## 🗄️ Database Setup (Supabase)

Execute the migrations located in `supabase/migrations/` in your Supabase SQL Editor:
1. `202608210001_billing_suite_schema.sql` (Tables, RLS, functions)
2. `202608210002_seed_gavior_catalog.sql` (Master catalog seed)

---

## 📦 Pushing to a Separate Dedicated GitHub Repository

When you are ready to publish this standalone codebase to its own GitHub repository:

```bash
cd gavior-billing-app
git init
git add .
git commit -m "feat: initial commit of Gavior billing and quotation suite"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/gavior-billing.git
git push -u origin main
```
