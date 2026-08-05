# SEO Media & Link Audit — gavior.in

**Date:** 2026-08-05 | **Method:** parsed 61 live pages' raw HTML + source inspection.

---

## Summary

| Check | Result |
|---|---|
| Pages containing `<img>` | 60 / 61 |
| Total `<img>` tags rendered | 127 |
| **Missing `alt` attribute** | **0** ✅ |
| Empty `alt=""` (decorative) | 0 |
| Raw `<img>` in source (bypassing `next/image`) | **0** ✅ |
| `next/image` imports | 3 components |
| Broken internal links (28 unique, all checked) | **0** ✅ |
| External links missing `rel` | 0 |

**This is the strongest area of the site.** Image handling and link integrity are genuinely well done, which is unusual.

---

## Findings

### 🟢 Images — correct implementation
All images route through `next/image`. Every rendered `<img>` carries an `alt` attribute. No raw `<img>` tags anywhere in `src/`.

An automated `width`/`height` check reports 127 missing — this is a **false positive**. All images use `fill` layout (`data-nimg="fill"`), which correctly positions via CSS (`position:absolute;height:100%;width:100%`) instead of intrinsic attributes. Layout shift is prevented by the sized parent container, not by the attributes. No action needed.

### 🟡 Repeated alt text on the logo
The Gavior logo renders on every page with `alt="Gavior — Design. Develop. Deliver."`, and appears twice on the homepage (header + footer variants). For a logo this is acceptable, though `alt="Gavior"` on the secondary instance would be marginally cleaner. Very low priority.

### 🟡 Oversized fallback `src` on small images
The header logo declares `sizes="160px"` but its fallback `src` resolves to `w=3840`. Modern browsers use `srcSet` and will pick the 160px candidate, so real-world impact is minimal — but the fallback is a 3840px image for a 160px slot. Worth tidying when touching the header.

### 🔴 No Open Graph or Twitter images — sitewide
**0 of 61 pages emit `og:image` or `twitter:image`.** `twitter:card` falls back to `summary` (small card) rather than `summary_large_image`.

Consequence: every share of every Gavior URL — LinkedIn, Slack, WhatsApp, X, iMessage — renders as a bare text link. For an agency selling design and branding, this is a visible credibility cost on exactly the channels where the work should be most persuasive.

Assets already exist to fix this: `public/brand/gavior-sky-hero.png`, `gavior-logo.png`, `gavior-logo-light.png`. Next.js also supports generated OG images via `opengraph-image.tsx`, which would let each service page get its own card.

### 🟢 External links are safe
Two external links found, both in `src/app/showcase/page.tsx` (lines 66–70 and 79–83), pointing to Behance. Both carry `target="_blank"` **and** `rel="noreferrer"`.

`noreferrer` alone implies `noopener` behaviour in all current browsers, so there is no security gap. Adding explicit `noopener` is belt-and-braces only. Note these are uncontrolled outbound links to a third-party profile — if Behance link equity ever becomes a concern, `rel="noreferrer nofollow"` would be the change, but there is no reason to make it today.

### 🟢 No orphan pages among linked routes
All 28 unique internal links found on the homepage/footer resolve to HTTP 200.

However, **15 live pages are absent from `sitemap.xml`**, including 7 of the site's best service pages (`branding`, `cloud-solutions`, `devops`, `motion-graphics`, `seo-services`, `video-editing`, `website-development`). Whether these are reachable via in-page navigation from `/services` should be confirmed — if not, they are orphans in practice: excluded from the sitemap *and* uncrawlable by link graph.

### 🟢 No PDFs or downloadable documents
`public/` contains only brand assets, showcase images, and unused Next.js template SVGs (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`). The five template SVGs are dead weight and can be deleted — no SEO impact either way.

### ⚠️ LCP candidate not confirmed
The homepage hero image is not lazy-loaded (no `loading="lazy"`), implying `priority` is set — which is correct if it is the LCP element. This audit measured raw HTML only, **not** field or lab performance. Core Web Vitals were not tested and cannot be assessed from HTML alone. A Lighthouse/PageSpeed run is required and is listed as a skipped check.

---

## Recommended actions, by value

| # | Action | Effort | Value |
|---|---|---|---|
| 1 | Add `og:image` + `twitter:card: summary_large_image` sitewide via root layout | Low | **High** |
| 2 | Add the 7 missing service pages to `sitemap.ts` | Trivial | **High** |
| 3 | Per-page `opengraph-image.tsx` for service pages | Medium | Medium |
| 4 | Confirm `/services` links to all 13 hardcoded pages | Trivial | Medium |
| 5 | Run Lighthouse/PageSpeed for real CWV data | Low | Medium |
| 6 | Delete unused template SVGs from `public/` | Trivial | None (housekeeping) |
| 7 | Fix oversized logo fallback `src` | Low | Low |
