# SEO Implementation Plan — gavior.in

**Date:** 2026-08-05 | **Status:** 🟡 **AWAITING APPROVAL — no code changed**
**Policy inputs (Stage 1):** canonical host = `https://gavior.in` (apex) · AI policy = allow all incl. training · robots owned by the app

---

## Phase ordering — read this first

The instinct is to start with metadata. That would be wrong here. Two live defects make metadata work premature:

- **The crawl trap** means you would be adding canonical tags to an infinite URL space.
- **The duplicate host** means every signal you add is immediately split across two domains.

So: **Phase 1 fixes what is broken. Phase 2 adds what is missing. Phase 3 is content, which is yours, not mine.**

Three items are **human-only** and cannot be done from this repository. They are listed in Phase 0 because two of them gate everything else.

---

## Phase 0 — Human actions (I cannot do these)

| # | Action | Where | Gates |
|---|---|---|---|
| 0.1 | 301 redirect `www.gavior.in` → `https://gavior.in` | Cloudflare Redirect Rule (or DNS/nginx) | All canonicalisation |
| 0.2 | Disable **Managed robots.txt** / Content Signals | Cloudflare → Settings | All robots work |
| 0.3 | Audit **Security → Bots** and firewall events for AI-crawler 403s | Cloudflare dashboard | All AI discoverability |
| 0.4 | Confirm: are Nimbus Health / Vanta Commerce / Northstar Logistics **real clients** with real metrics? | Business | All portfolio schema |
| 0.5 | Provide entity facts: legal name, founding year, HQ address, phone, social profile URLs | Business | Organization schema, `/about` |
| 0.6 | Create Google Search Console property (domain-level preferred) | GSC | All verification |
| 0.7 | Decide on GA4 vs. privacy-preserving analytics; supply the ID | Business | Measurement |
| 0.8 | Authorize the SE Ranking connector if real keyword data is wanted | claude.ai settings | Stage 6 quality |

> **0.1, 0.2 and 0.3 are hard blockers.** Without them, parts of Phase 1 and 2 are cosmetic.

---

## Phase 1 — Fix what is broken

| # | Path | Action | Reason | Risk | Status |
|---|---|---|---|---|---|
| 1.1 | `src/app/blog/[slug]/page.tsx` | Add a real post index to `site-data.ts`; add `generateStaticParams()`; call `notFound()` for unknown slugs | Closes infinite crawl space and the H1-injection vector | **Low code risk / high value.** Any currently-linked URL not in the index will start 404-ing — that is the intent, but confirm no real post is dropped | ⏸️ Pending approval |
| 1.2 | `src/app/industries/[slug]/page.tsx` | Same: bound to the `industries` array already in `site-data.ts`; `notFound()` otherwise | Same | Low — `industries` data already exists | ⏸️ |
| 1.3 | `src/app/sitemap.ts` | Add the 7 missing hardcoded service pages + 4 legal pages; drop `/coming-soon` and `/search`; enumerate only bounded routes | 7 of your best pages are invisible to search engines | Very low | ⏸️ |
| 1.4 | `src/app/sitemap.ts` | Replace `lastModified: new Date()` with a per-route date, or omit `lastModified` entirely | Every URL currently claims "modified now" — an inaccurate `lastmod` is discounted by Google | Very low. **Omitting is better than lying** | ⏸️ |
| 1.5 | `src/app/sitemap.ts`, `robots.ts`, `layout.tsx` | Read the base URL from `NEXT_PUBLIC_SITE_URL` with a `https://gavior.in` fallback; stop hardcoding in 4 places | The var `NEXT_PUBLIC_WEBSITE_URL` already exists and is unused | Very low. Guard against a staging value leaking into canonicals | ⏸️ |
| 1.6 | `src/app/robots.ts` | Rewrite for the agreed allow-all policy, using only tokens verified in `AI_Crawler_Registry.md`; keep `/api` disallowed | Implements the chosen policy in version control | **Inert until 0.2 is done.** Do not ship 1.6 before 0.2 or robots.txt becomes self-contradictory | ⏸️ |
| 1.7 | `src/.env.local` | Delete | Empty, dead, never loaded by Next.js — pure confusion | None | ⏸️ |

## Phase 2 — Add what is missing

| # | Path | Action | Reason | Risk | Status |
|---|---|---|---|---|---|
| 2.1 | `src/app/layout.tsx` | Add `alternates: { canonical: "/" }` + `metadata.robots` defaults + `twitter: { card: "summary_large_image" }` + default `openGraph.images` | 0 of 61 pages have a canonical today | Low. `metadataBase` makes relative canonicals resolve correctly | ⏸️ |
| 2.2 | 22 static pages without metadata | Add `export const metadata` with a unique title, description and canonical to each | 48 of 61 pages share one title and one description | Low, but **volume**: 22 files. Descriptions must be written, not templated, or the duplication just moves | ⏸️ |
| 2.3 | `services/[slug]`, `portfolio/[slug]`, `industries/[slug]`, `blog/[slug]` | Add `generateMetadata()` deriving title/description/canonical from route data | 4 route families currently inherit the sitewide default | Low. Must not co-exist with a static `metadata` export in the same segment | ⏸️ |
| 2.4 | 13 hardcoded service pages | Add `alternates.canonical` to existing metadata blocks | They have titles and descriptions but no canonical | Very low | ⏸️ |
| 2.5 | `src/components/JsonLd.tsx` *(new)* | Typed Server Component for JSON-LD with `<` escaping | Replaces the raw `dangerouslySetInnerHTML` pattern | Low | ⏸️ |
| 2.6 | `src/app/layout.tsx` | Extend `Organization` with `logo`, `sameAs`, `address`, `telephone`, `legalName`, `foundingDate` | Entity thinness is a primary AI-visibility blocker | **Blocked on 0.5.** I will not invent any of these values | ⏸️ |
| 2.7 | Service pages | Add `Service` schema matching visible content | Supported type, truthful, matches page copy | Low | ⏸️ |
| 2.8 | Nested routes | Add visible breadcrumbs + `BreadcrumbList` schema | Currently no breadcrumbs across 3 levels of nesting. Schema must match visible UI | Medium — requires a UI component, not just markup | ⏸️ |
| 2.9 | `src/app/opengraph-image.tsx` *(new)* | Default OG image; per-section variants later | 0 of 61 pages have `og:image`; every share is a bare link | Low | ⏸️ |
| 2.10 | `/coming-soon`, `/search` | `robots: { index: false, follow: true }` | Thin (256 and 937 chars); intended non-indexable but not marked | Very low | ⏸️ |
| 2.11 | `layout.tsx` | Add `verification.google` / `.other.msvalidate` | — | **Blocked on 0.6.** Real codes only — no placeholders | ⏸️ |
| 2.12 | `scripts/seo-verify.mjs` + `npm run seo:verify` | Rerunnable validator: 200s, one H1, unique titles/descriptions, canonical present, JSON-LD parses, sitemap/robots sanity, image alt | Makes every check above repeatable and CI-able | Low. Degrades gracefully with no credentials | ⏸️ |

## Phase 3 — Content (yours, not mine)

| # | Item | Why | Owner |
|---|---|---|---|
| 3.1 | Decide the fate of the 24 templated service pages | 24 URLs share one piece of writing; scaled-content-abuse risk | Business |
| 3.2 | Rewrite `/pricing` (1,217 chars, states no prices) | Highest commercial-intent page on the site, currently unrankable | Business |
| 3.3 | Rewrite `/about` (1,341 chars, no entity facts) | Entity source of truth for AI systems | Business |
| 3.4 | Add real NAP to `/contact` (1,032 chars) | Local/entity signals | Business |
| 3.5 | Resolve the portfolio case studies | Fabricated metrics must not be given schema | Business |
| 3.6 | Real blog posts with bylines, or remove `/blog` | Currently one templated post reachable at infinite URLs | Business |
| 3.7 | Credit Gopa Dutta properly (`Person` schema, `sameAs` → Behance) | A real, corroborated entity link that is currently invisible to machines | Business |

---

## Explicitly NOT doing, and why

| Rejected | Reason (verified 2026-08-05) |
|---|---|
| `llms.txt` | Google: *"You don't need to create new machine readable files, AI text files, or markup."* No verified provider documents support. Second source of truth, no benefit. |
| `FAQPage` schema on `/faq` | Absent from Google's current rich-results gallery. No rich result to win. |
| `HowTo` schema | Same. |
| Google Indexing API | Eligible only for `JobPosting` / `BroadcastEvent`. Unusable for these pages. |
| Sitemap ping endpoint | Deprecated June 2023. |
| IndexNow | Deferred — Bing was never confirmed as a target surface, and no key exists. Cheap to add later if wanted. |
| `AggregateRating` / `Review` / `Product` price schema | No real underlying data. Adding it would be fabrication. |
| `robots.ts` `other` field for `Content-Signal` | Requires Next.js ≥16.3.0; this repo is 15.5.12. |
| Keyword-density or entity-stuffing tactics | Manipulative, and contrary to the verified guidance. |

---

## Realistic expectations

What Phase 1–2 delivers is **eligibility**, not ranking. Specifically:

- ✅ Verifiable immediately: canonicals present, titles unique, sitemap accurate, robots correct, schema parses, crawl trap closed, OG images render.
- ⏳ Weeks to months, not guaranteed: Google recrawl and re-index; consolidation of duplicate-host signals; any ranking movement.
- ❓ Never guaranteed: appearing in AI Overviews, ChatGPT, Claude or Perplexity answers. Providers vary by query, region, account, personalisation, model version and time. There is no lever that forces a citation.
- 🔴 Hard ceiling: **content is the binding constraint on this site, not code.** 24 near-identical service pages, a pricing page with no prices, and an about page with no facts will not rank or be cited no matter how clean the metadata is. Phase 3 determines the outcome; Phases 1–2 only remove the obstacles.

---

## Recommended approval order

1. **Approve Phase 1 now** — these are fixes to live defects, low risk, high value.
2. **Do Phase 0.1–0.3 in Cloudflare in parallel** — they gate everything and only you can do them.
3. **Approve Phase 2 after Phase 1 lands**, supplying the 0.4–0.7 facts so schema and verification can be real rather than placeholder.
4. **Phase 3 is a business decision** and the one that actually determines results.
