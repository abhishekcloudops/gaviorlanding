# SEO Structure Audit — Per-Page

**Date:** 2026-08-05 | **Method:** live HTTP fetch of every URL, parsed from raw server HTML. **Every page audited — no sampling.**

## Grading rule
A page is `PARTIAL` if *any* required element is missing or wrong. Nothing is rounded up.

| State | Count | Meaning |
|---|---|---|
| 🔴 `MISSING` | 46 | Duplicate title AND duplicate description AND no canonical |
| 🟠 `PARTIAL` | 13 | Unique title + description, but no canonical, no robots meta, no OG image, no page schema |
| ✅ `COMPLETE` | **0** | No page on this site currently meets the bar |
| ⚠️ `NOINDEX_INTENDED` | 2 | `/coming-soon`, `/search` — **neither is actually marked noindex today** |

## Sitewide constants (verified on all 61 URLs)

| Signal | Result |
|---|---|
| HTTP status | 200 on all 61 ✅ |
| Main content in raw server HTML | Yes on all 61 ✅ |
| `<h1>` count | Exactly 1 on all 61 ✅ |
| `rel="canonical"` | **0 of 61** 🔴 |
| `<meta name="robots">` | **0 of 61** 🔴 |
| `og:image` / `twitter:image` | **0 of 61** 🔴 |
| JSON-LD | 1 block (`Organization`) inherited from layout on all 61; **0 page-specific** ⚠️ |
| Unique titles | 14 / 61 (23%) 🔴 |
| Unique descriptions | 14 / 61 (23%) 🔴 |
| Broken internal links | 0 ✅ |

---

## Full per-page table

| Route | Source | Rend. | Raw HTML | HTTP | Title | Meta desc | Canon | Robots meta | OG/TW | H1 | JSON-LD | In sitemap | SEO state |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `/` | app/page.tsx | SSG | ✅ 4229ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/about` | app/about/page.tsx | SSG | ✅ 1341ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/blog` | app/blog/page.tsx | SSG | ✅ 1498ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/blog/the-work-that-moves-a-business` | blog/[slug]/page.tsx | SSG | ✅ 1518ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ❌ | 🔴 MISSING |
| `/book-consultation` | app/book-consultation/page.tsx | SSG | ✅ 1214ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/careers` | app/careers/page.tsx | SSG | ✅ 1369ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/case-studies` | app/case-studies/page.tsx | SSG | ✅ 1339ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/coming-soon` | app/coming-soon/page.tsx | SSG | ✅ 256ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ❌ | ⚠️ NOINDEX_INTENDED (not marked) |
| `/contact` | app/contact/page.tsx | SSG | ✅ 1032ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/cookie-policy` | app/cookie-policy/page.tsx | SSG | ✅ 1261ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ❌ | 🔴 MISSING |
| `/faq` | app/faq/page.tsx | SSG | ✅ 1626ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/industries` | app/industries/page.tsx | SSG | ✅ 1220ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/industries/healthcare` | industries/[slug]/page.tsx | SSG | ✅ 1302ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ❌ | 🔴 MISSING |
| `/portfolio` | app/portfolio/page.tsx | SSG | ✅ 1332ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/portfolio/nimbus-health` | portfolio/[slug]/page.tsx | SSG | ✅ 1394ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/portfolio/northstar-logistics` | portfolio/[slug]/page.tsx | SSG | ✅ 1388ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/portfolio/vanta-commerce` | portfolio/[slug]/page.tsx | SSG | ✅ 1399ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/pricing` | app/pricing/page.tsx | SSG | ✅ 1217ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/privacy-policy` | app/privacy-policy/page.tsx | SSG | ✅ 1274ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ❌ | 🔴 MISSING |
| `/refund-policy` | app/refund-policy/page.tsx | SSG | ✅ 1323ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ❌ | 🔴 MISSING |
| `/search` | app/search/page.tsx | SSG | ✅ 937ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ❌ | ⚠️ NOINDEX_INTENDED (not marked) |
| `/services` | app/services/page.tsx | SSG | ✅ 2512ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/services/ai-agents` | services/[slug]/page.tsx | SSG | ✅ 2588ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/services/ai-automation` | services/ai-automation/page.tsx | SSG | ✅ 2903ch | 200 | ✅ unique | ✅ unique | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🟠 PARTIAL |
| `/services/ai-chatbots` | services/[slug]/page.tsx | SSG | ✅ 2590ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/services/api-development` | services/[slug]/page.tsx | SSG | ✅ 2594ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/services/aws-solutions` | services/[slug]/page.tsx | SSG | ✅ 2592ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/services/azure-solutions` | services/[slug]/page.tsx | SSG | ✅ 2594ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/services/brand-identity-design` | services/[slug]/page.tsx | SSG | ✅ 2600ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/services/branding` | services/branding/page.tsx | SSG | ✅ 4137ch | 200 | ✅ unique | ✅ unique | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ❌ | 🟠 PARTIAL |
| `/services/ci-cd-automation` | services/[slug]/page.tsx | SSG | ✅ 2595ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/services/cloud-solutions` | services/cloud-solutions/page.tsx | SSG | ✅ 4349ch | 200 | ✅ unique | ✅ unique | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ❌ | 🟠 PARTIAL |
| `/services/content-marketing` | services/[slug]/page.tsx | SSG | ✅ 2596ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/services/crm-development` | services/[slug]/page.tsx | SSG | ✅ 2594ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/services/custom-software-development` | services/[slug]/page.tsx | SSG | ✅ 2606ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/services/custom-websites` | services/[slug]/page.tsx | SSG | ✅ 2592ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/services/devops` | services/devops/page.tsx | SSG | ✅ 4271ch | 200 | ✅ unique | ✅ unique | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ❌ | 🟠 PARTIAL |
| `/services/devops-engineering` | services/[slug]/page.tsx | SSG | ✅ 2597ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/services/digital-marketing` | services/digital-marketing/page.tsx | SSG | ✅ 4611ch | 200 | ✅ unique | ✅ unique | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🟠 PARTIAL |
| `/services/docker-kubernetes` | services/[slug]/page.tsx | SSG | ✅ 2602ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/services/e-commerce-development` | services/[slug]/page.tsx | SSG | ✅ 2601ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/services/enterprise-applications` | services/[slug]/page.tsx | SSG | ✅ 2589ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/services/erp-development` | services/[slug]/page.tsx | SSG | ✅ 2594ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/services/google-cloud` | services/[slug]/page.tsx | SSG | ✅ 2591ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/services/graphic-design` | services/graphic-design/page.tsx | SSG | ✅ 3968ch | 200 | ✅ unique | ✅ unique | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🟠 PARTIAL |
| `/services/growth-marketing` | services/[slug]/page.tsx | SSG | ✅ 2600ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/services/linux-administration` | services/[slug]/page.tsx | SSG | ✅ 2599ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/services/mobile-app-development` | services/mobile-app-development/page.tsx | SSG | ✅ 4194ch | 200 | ✅ unique | ✅ unique | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🟠 PARTIAL |
| `/services/motion-graphics` | services/motion-graphics/page.tsx | SSG | ✅ 3905ch | 200 | ✅ unique | ✅ unique | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ❌ | 🟠 PARTIAL |
| `/services/saas-development` | services/saas-development/page.tsx | SSG | ✅ 3772ch | 200 | ✅ unique | ✅ unique | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🟠 PARTIAL |
| `/services/search-engine-optimization` | services/[slug]/page.tsx | SSG | ✅ 2605ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/services/seo-services` | services/seo-services/page.tsx | SSG | ✅ 4030ch | 200 | ✅ unique | ✅ unique | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ❌ | 🟠 PARTIAL |
| `/services/social-media-management` | services/[slug]/page.tsx | SSG | ✅ 2602ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/services/technical-consulting` | services/[slug]/page.tsx | SSG | ✅ 2599ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/services/ui-ux-design` | services/ui-ux-design/page.tsx | SSG | ✅ 4136ch | 200 | ✅ unique | ✅ unique | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🟠 PARTIAL |
| `/services/video-editing` | services/video-editing/page.tsx | SSG | ✅ 4151ch | 200 | ✅ unique | ✅ unique | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ❌ | 🟠 PARTIAL |
| `/services/video-editing-motion-graphics` | services/[slug]/page.tsx | SSG | ✅ 2614ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/services/vps-dedicated-servers` | services/[slug]/page.tsx | SSG | ✅ 2606ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/services/website-development` | services/website-development/page.tsx | SSG | ✅ 4381ch | 200 | ✅ unique | ✅ unique | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ❌ | 🟠 PARTIAL |
| `/showcase` | app/showcase/page.tsx | SSG | ✅ 1305ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ✅ | 🔴 MISSING |
| `/terms` | app/terms/page.tsx | SSG | ✅ 1277ch | 200 | 🔴 dup(48x) | 🔴 dup(48x) | 🔴 none | 🔴 none | ⚠️ no img | ✅ 1 | ⚠️ Org only | ❌ | 🔴 MISSING |

---

## Content-depth findings

### Thin pages (raw text after tag-stripping)
| Route | Chars | Note |
|---|---|---|
| `/coming-soon` | 256 | Should be `noindex` |
| `/search` | 937 | Should be `noindex` |
| `/contact` | 1,032 | Conversion page — thin but acceptable; needs NAP + LocalBusiness/ContactPoint |
| `/book-consultation` | 1,214 | Conversion page |
| `/pricing` | 1,217 | 🔴 **Commercial-intent page with almost no content.** High-value keyword target currently unable to rank. |
| `/industries` | 1,220 | Hub page linking to unbounded children |
| `/about` | 1,341 | 🔴 Entity source-of-truth page with no entity facts |

### 🟠 Near-duplicate cluster — 24 templated service pages
All fall in a 2,588–2,614 char band. They share identical body copy; only the H1, eyebrow tag and background colour vary. Sample of the shared boilerplate:

> *"Too often, digital work starts with outputs. We begin with the choices that create value…"*
> *"We map the important decisions, prototype quickly and build a focused solution that your people can own."*

24 URLs, one piece of writing. Combined with duplicate titles and descriptions, these are functionally doorway pages. They are unlikely to rank, and at this volume they carry scaled-content-abuse risk. **Recommendation: either write real content for the ones that map to genuine offerings, or consolidate the rest into `/services` and remove them from the sitemap.** This is a content decision, not a code decision.

### 🔴 Templated infinite pages
`/blog/<any-slug>` and `/industries/<any-slug>` return 200 with the URL string title-cased into the H1. Verified live: `/blog/buy-cheap-viagra-online` renders `<h1>Buy Cheap Viagra Online</h1>`. Every one of these pages also carries the sitewide duplicate title and description. See `SEO_Route_Inventory.md` for the full severity assessment.

### ✅ Best pages on the site
The 13 hardcoded service pages (3,905–4,611 chars) have real, specific, differentiated content and their own metadata — e.g. `/services/website-development` ("Custom website development with Next.js…"), `/services/digital-marketing` (4,611 chars, the longest page on the site). **7 of these 13 are missing from the sitemap.** Fixing that is one of the cheapest high-value actions available.
