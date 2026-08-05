# SEO Technical Audit — gavior.in

**Date:** 2026-08-05 | **Next.js:** 15.5.12 (App Router, `src/`, React 19.1.0) | **Host:** EC2 + nginx + PM2 behind Cloudflare
**Method:** source inspection + live HTTP verification. No code was modified.

---

## 1. Analytics & tag management

| Item | Status | Path | Notes |
|---|---|---|---|
| GA4 | ❌ **MISSING** | — | No `gtag`, no `G-XXXXXXX` anywhere in `src/` or `public/` |
| Google Tag Manager | ❌ **MISSING** | — | No `GTM-` container |
| `@next/third-parties` | ❌ **MISSING** | `package.json` | Not a dependency |
| Any other analytics (Plausible, PostHog, Clarity, Hotjar) | ❌ **MISSING** | — | Grep hits were prose on service pages, not implementations |
| Conversion tracking on 4 form endpoints | ❌ **MISSING** | `src/app/api/*` | No server-side event tracking |

> **There is currently no way to measure whether any SEO work succeeds.** Every recommendation in this audit will be unmeasurable until analytics and Search Console exist. This is the single biggest non-code gap.

## 2. Environment variables (names only — no values read or printed)

| Var | Where | SEO relevance |
|---|---|---|
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM_EMAIL`, `SMTP_FROM_NAME` | `.env.local`, `src/lib/email-service.ts` | none |
| `CONTACT_FORM_RECIPIENTS`, `SUPPORT_EMAIL`, `INFO_EMAIL` | `.env.local`, API routes | none |
| `RESEND_API_KEY` | `.env.local` | none |
| `NEXT_PUBLIC_WEBSITE_URL` | `.env.local` | ⚠️ **Defined but never read.** Zero `process.env.NEXT_PUBLIC_WEBSITE_URL` references in `src/`. The production URL is hardcoded three times instead. |
| `NEXT_PUBLIC_SITE_URL` | — | ❌ Does not exist |

**Hardcoded `https://gavior.in` occurrences:** `layout.tsx:8` (`metadataBase`), `layout.tsx:37` (Organization schema), `robots.ts:5` (sitemap), `sitemap.ts:3` (base). Four hardcodes, one unused env var.

### Security
✅ `.gitignore` covers `.env*`. `git ls-files` confirms **no env file is tracked**. No secret is committed. No rotation needed.
⚠️ `src/.env.local` exists, is **empty**, and is **dead** — Next.js loads env only from the project root. Recommend deleting to avoid future confusion.

## 3. Site verification tags

| Item | Status |
|---|---|
| `google-site-verification` | ❌ **MISSING** |
| `msvalidate.01` (Bing) | ❌ **MISSING** |
| Any other webmaster verification | ❌ **MISSING** |
| Next.js `metadata.verification` | ❌ Not used |

## 4. SEO files

| File | Status | Notes |
|---|---|---|
| `src/app/robots.ts` | ⚠️ **PRESENT but OVERRIDDEN** | Emits `User-Agent: * / Allow: / / Sitemap:`. Cloudflare prepends a managed block. See `SEO_AI_Discoverability_Audit.md`. |
| `src/app/sitemap.ts` | ⚠️ **PARTIAL** | 46 URLs; 15 live 200 pages missing (7 of them premium content). `lastModified: new Date()` — see below. |
| `src/app/manifest.ts` | ❌ MISSING | Low priority; icons exist in `public/brand/` if wanted |
| `public/robots.txt` | ❌ absent | Correct — would conflict with `robots.ts` |
| `public/sitemap.xml` | ❌ absent | Correct |
| IndexNow key file | ❌ MISSING | No key configured |
| `llms.txt` / `ai.txt` | ❌ absent | **Recommend leaving absent** — Google states no AI text files are needed (`SEO_Evidence_Log.md` #1) |

### 🔴 `lastModified` is fabricated
`sitemap.ts:20,24,28` set `lastModified: new Date()` — evaluated at generation time, so **all 46 URLs always claim they were modified right now.** Live sitemap confirms every entry shares `2026-08-05T10:57:05.913Z`. Google ignores `lastmod` values it judges inaccurate; a sitemap where everything is always fresh is exactly that signal. This actively degrades the sitemap's usefulness rather than helping.

## 5. Metadata

| Item | Status | Notes |
|---|---|---|
| `metadataBase` | ✅ PRESENT | `layout.tsx:8` — `https://gavior.in`, correct apex |
| Title template | ✅ PRESENT | `"%s \| Gavior"` with a sensible default |
| Default description | ✅ PRESENT | `layout.tsx:13` |
| Icons | ✅ PRESENT | `layout.tsx:15-19` |
| Default OpenGraph | ⚠️ PARTIAL | type/siteName/title/description only — **no `images`** |
| Twitter card | ⚠️ PARTIAL | Falls back to `summary`; no explicit block, no image |
| **`alternates.canonical`** | 🔴 **MISSING SITEWIDE** | Verified: 0 of 61 live pages emit a canonical tag |
| `robots` defaults | ❌ MISSING | No `metadata.robots`; 0 of 61 pages emit a robots meta tag |
| Per-route metadata | 🔴 **13 of 36 pages only** | Only the hardcoded service pages export `metadata` |
| `generateMetadata` on dynamic routes | 🔴 **MISSING on all 4** | `services/[slug]`, `portfolio/[slug]`, `industries/[slug]`, `blog/[slug]` all inherit the layout default |
| `metadata` + `generateMetadata` in same segment | ✅ No conflicts found | |

**Live measurement: 48 of 61 pages share the identical title AND identical meta description.** Unique titles: 14/61 (23%).

## 6. Structured data

| Item | Status | Notes |
|---|---|---|
| JSON-LD present | ⚠️ PARTIAL | Exactly one block, `Organization`, injected sitewide from `layout.tsx:33-41` |
| Organization completeness | ⚠️ THIN | Has `name`, `url`, `email`, `description`. **Missing:** `logo`, `sameAs`, `address`, `telephone`, `foundingDate`, `legalName` |
| Schema matches visible content | ✅ Yes for what it claims | Nothing fabricated — good |
| `WebSite` | ❌ MISSING | A `/search` page exists but no `SearchAction` |
| `BreadcrumbList` | ❌ MISSING | No breadcrumbs anywhere despite 3 levels of nesting |
| `Service` / `Product` | ❌ MISSING | On 37 service pages |
| `Article` / `BlogPosting` | ❌ MISSING | On blog routes |
| `FAQPage` | ❌ absent | **Correct to leave absent** — not in Google's current rich-results gallery (`SEO_Evidence_Log.md` #7) |
| Fabricated schema | ✅ **NONE** | No fake reviews, ratings, prices or authors. Clean. |
| Escaping | ⚠️ `dangerouslySetInnerHTML` with raw `JSON.stringify` | No user input reaches it today, so not currently exploitable, but a `</script>` in future data would break out. Standard fix is escaping `<` as `<`. |

## 7. Rendering (acid test — decisive)

| Check | Result |
|---|---|
| `"use client"` in any `page.tsx` | **0 of 36** ✅ |
| Response headers | `x-nextjs-prerender: 1`, `x-nextjs-cache: HIT`, `s-maxage=31536000` |
| Main content in raw server HTML | ✅ **YES on all 61 URLs** |
| Homepage text in raw HTML | 4,229 chars after tag-stripping |
| `<h1>` in raw HTML | ✅ Exactly 1 on every one of 61 pages |
| Metadata in initial HTML | ✅ Yes |
| Content behind auth / tabs / infinite scroll / WebSocket / canvas | None found |

**Verdict: rendering is NOT a blocker.** This is a fully prerendered static site. Every SEO fix proposed here will land in server HTML. Confidence: **high** — verified against production, not inferred.

## 8. Risks

| Risk | Severity | Detail |
|---|---|---|
| Unbounded `blog/[slug]` + `industries/[slug]` | 🔴 **CRITICAL** | Infinite 200 URL space + arbitrary H1 injection from URL. See `SEO_Route_Inventory.md`. |
| `www` and apex both 200, identical, no redirect, no canonical | 🔴 **CRITICAL** | Duplicate content across 2 hosts; every ranking signal split |
| Cloudflare robots.txt overriding the repo | 🔴 **HIGH** | Two conflicting sources of truth |
| 48/61 pages duplicate title + description | 🟠 HIGH | |
| 24 near-identical templated service pages (~2.6k chars) | 🟠 HIGH | Thin/doorway risk |
| 7 best service pages excluded from sitemap | 🟠 HIGH | |
| Fabricated `lastmod` | 🟡 MEDIUM | |
| No analytics / GSC / Bing | 🟠 HIGH | Nothing is measurable |
| No `og:image` sitewide | 🟡 MEDIUM | |
| Exposed secrets | ✅ **NONE** | |
| Staging/local canonical leakage | ✅ **NONE** | |
| Accidental `Disallow: /` or global `noindex` | ✅ **NONE** | |

---

# FEASIBILITY VERDICT

```
Total routes inventoried:     61 finite URLs (+ 2 unbounded route families)
                              36 page.tsx files, 4 API handlers
Indexable-intended routes:    59  (excluding /coming-soon, /search)
MISSING:                      44  (no canonical, no unique title/description, no page schema)
PARTIAL:                      13  (hardcoded service pages: own metadata, still no canonical/schema/OG image)
COMPLETE:                     0
NOINDEX_INTENDED:             2   (/coming-soon, /search) — neither is actually marked noindex today

Rendering:                    SSG (fully prerendered) — confidence HIGH (verified on production)
Content in raw/server HTML:   YES — all 61 URLs, all with exactly one H1

SEO implementable as-is?              YES
AI discoverability implementable?     PARTIAL — robots layer is owned by Cloudflare, not this repo

BLOCKING ISSUES (must be resolved before or alongside metadata work):
  1. blog/[slug] and industries/[slug] return 200 for ANY slug and inject the
     URL string into the H1. Infinite crawl space + live content-injection
     vector on your own domain. Metadata work on an infinite URL space is
     wasted effort until this is bounded.
  2. www.gavior.in serves byte-identical HTML at 200 with no redirect and no
     canonical anywhere. Requires a Cloudflare/DNS-level 301 — I cannot make
     this change from the repo.
  3. Cloudflare's managed robots.txt overrides src/app/robots.ts. The agreed
     "allow everything incl. training" policy CANNOT be implemented in code
     alone; it requires disabling the managed block in the Cloudflare dashboard.

EXISTING ASSETS TO REUSE:
  - metadataBase + title template already correct (layout.tsx)
  - Clean, truthful Organization schema to extend rather than replace
  - 13 genuinely good long-form service pages with real metadata
  - All 36 pages are Server Components — no rendering refactor needed
  - next/image used throughout with alt text on all 127 images
  - Zero broken internal links
  - NEXT_PUBLIC_WEBSITE_URL already defined (just unused)

SECRETS / SECURITY RISKS:
  - None. .env* gitignored, nothing tracked, no secrets in source.
  - Housekeeping: delete the empty, non-functional src/.env.local

WRONG / OUTDATED / UNREALISTIC ASSUMPTIONS FLAGGED:
  - Google Indexing API: unusable here (JobPosting / BroadcastEvent only)
  - Sitemap ping endpoint: deprecated since June 2023 — do not build it
  - FAQPage/HowTo: absent from Google's rich-results gallery — do not add
    to /faq expecting rich results
  - llms.txt: Google explicitly says no AI text files are required
  - Next.js `other` robots field requires v16.3.0; this repo is on 15.5.12
  - No typecheck/test script exists; only dev/build/start/lint
```

**Bottom line:** the codebase is in better shape than the search presence. Rendering, image handling, link integrity and schema honesty are all sound. What is missing is canonicalisation, per-page metadata, and measurement — plus two live defects (the crawl trap and the duplicate host) that must be fixed before the metadata work is worth doing.
