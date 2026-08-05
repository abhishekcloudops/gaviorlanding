# SEO Evidence Log

**Run date:** 2026-08-05
**Verified by:** Live fetch of official documentation. No claim below is from model memory.
**Scope:** Provider-agnostic. Google, Bing/IndexNow, OpenAI, Anthropic, Perplexity, Next.js.

> Re-verify before every implementation run. Everything here is a snapshot, not permanent truth.

---

## Verified claims

| # | Claim checked | Source URL | Source type | Checked | Status | Confidence | Notes |
|---|---|---|---|---|---|---|---|
| 1 | Google AI features (AI Overviews, AI Mode) require no AI-specific file, markup, or schema | https://developers.google.com/search/docs/appearance/ai-features | Official (Google Search Central) | 2026-08-05 | **CONFIRMED** | High | Exact wording: "There are no additional requirements to appear in AI Overviews or AI Mode, nor other special optimizations necessary." And: "You don't need to create new machine readable files, AI text files, or markup to appear in these features." |
| 2 | Eligibility for Google AI features = indexed + snippet-eligible + standard technical SEO | https://developers.google.com/search/docs/appearance/ai-features | Official | 2026-08-05 | **CONFIRMED** | High | Directly invalidates any "optimize for AI Overviews" tactic that is separate from normal Search hygiene. |
| 3 | `Google-Extended` does **not** affect Google Search inclusion or ranking | https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers | Official | 2026-08-05 | **CONFIRMED** | High | Exact wording: "does not impact a site's inclusion in Google Search nor is it used as a ranking signal." It controls use of content "for training future generations of Gemini models." |
| 4 | `GoogleOther`, `Google-CloudVertexBot`, `Google-InspectionTool` do not affect Search | https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers | Official | 2026-08-05 | **CONFIRMED** | High | GoogleOther = generic product-team fetcher. CloudVertexBot = site-owner-initiated Vertex AI agents. InspectionTool = Rich Results Test / URL Inspection. |
| 5 | Google Indexing API is limited to `JobPosting` and `BroadcastEvent` in `VideoObject` | https://developers.google.com/search/apis/indexing-api/v3/quickstart | Official | 2026-08-05 | **CONFIRMED** | High | Exact wording: "The Indexing API can only be used to crawl pages with either JobPosting or BroadcastEvent embedded in a VideoObject." **Not usable for this site's marketing/service pages.** A `/careers` page could qualify only if it carried real `JobPosting` markup for real openings. |
| 6 | Google sitemap ping endpoint is deprecated | https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping | Official (Search Central Blog) | 2026-08-05 | **CONFIRMED** | Medium-High | Announced June 2023 ("Sitemaps ping endpoint is going away"). Use the `Sitemap:` reference in robots.txt + Search Console submission. Do not build a ping integration. |
| 7 | `FAQPage` and `HowTo` no longer appear in Google's rich results gallery | https://developers.google.com/search/docs/appearance/structured-data/search-gallery | Official | 2026-08-05 | **CONFIRMED (by absence)** | Medium | Current gallery lists: Article, Breadcrumb, Carousel, Course list, Dataset, Discussion forum, Education Q&A, Employer aggregate rating, Event, Image metadata, Job posting, Local business, Math solver, Movie, Organization, Product, Profile page, Q&A, Recipe, Review snippet, Software app, Speakable, Subscription/paywalled content, Vacation rental, Video. FAQPage and HowTo are **absent**. Confidence is Medium because this is inference from absence, not an explicit deprecation statement on this page. **Implication: do not add FAQPage to `/faq` expecting rich results.** |
| 8 | IndexNow: 200/202 = received, **not** indexed | https://www.indexnow.org/documentation | Official (protocol) | 2026-08-05 | **CONFIRMED** | High | Exact wording: "an HTTP 200 response code only indicates that the search engine has received your URL". Key file = 8–128 hex chars at domain root as `{key}.txt`. Batch POST up to 10,000 URLs. 403 = invalid key, 422 = host/key mismatch, 429 = rate limited. |
| 9 | OpenAI operates four documented bots with distinct purposes | https://developers.openai.com/api/docs/bots (301 from platform.openai.com/docs/bots) | Official | 2026-08-05 | **CONFIRMED** | High | `OAI-SearchBot` = ChatGPT search surfacing (respects robots). `GPTBot` = foundation-model training (respects robots). `OAI-AdsBot` = ad landing-page validation (respects robots). `ChatGPT-User` = user-triggered fetch — "Because these actions are initiated by a user, robots.txt rules may not apply." |
| 10 | Anthropic operates three documented bots with distinct purposes | https://support.claude.com/en/articles/8896518-how-does-anthropic-access-web-content (301 from support.anthropic.com) | Official | 2026-08-05 | **CONFIRMED** | High | `ClaudeBot` = model training/development. `Claude-SearchBot` = search indexing/quality. `Claude-User` = user-initiated retrieval. All three take robots.txt directives; all support `Crawl-delay`. Docs note rules must be applied per-subdomain. |
| 11 | Perplexity operates two documented bots; one ignores robots | https://docs.perplexity.ai/guides/bots | Official | 2026-08-05 | **CONFIRMED** | High | `PerplexityBot` = search/citation surfacing, respects robots, explicitly "not used to crawl content for AI foundation models". `Perplexity-User` = user-initiated, "generally ignores robots.txt rules". Published IP ranges at perplexity.com/perplexitybot.json and /perplexity-user.json. |
| 12 | Next.js `robots.ts` supports an array of per-user-agent rules | https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots | Official (Next.js, docs version 16.3.0, lastUpdated 2026-05-01) | 2026-08-05 | **CONFIRMED** | High | `rules` accepts an object or array. Fields: `userAgent` (string or string[]), `allow`, `disallow`, `crawlDelay`, `other`, plus top-level `sitemap`, `host`. |
| 13 | The `other` field for non-standard robots directives requires Next.js **v16.3.0+** | https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots | Official (Version History table) | 2026-08-05 | **CONFIRMED** | High | **This repo is on Next.js 15.5.12.** `other` is unavailable here. `robots` itself has existed since v13.3.0. Any `Content-Signal:` or `Crawl-delay:` line we want must come from a static `public/robots.txt` or a route handler, not from `other`. |

---

## Claims marked UNVERIFIED this run

| Claim | Reason | Impact |
|---|---|---|
| Current Bingbot / Bing Webmaster Tools URL Submission API behavior | Not fetched this run — Bing was not confirmed as a target surface in Stage 1 | Do not build Bing-specific integrations until verified |
| Current IndexNow participating-engine list (Bing, Yandex, Seznam, Naver, others) | The protocol docs were verified; the live participant roster was not re-checked | Do not promise which engines receive submissions |
| Applebot / Applebot-Extended, Meta, xAI/Grok, Brave, You.com official crawler docs | Not fetched — not confirmed as target surfaces | Do not write robots rules for these from memory |
| Cloudflare "AI Scrapers and Crawlers" / managed robots.txt product behavior | Observed live on this domain but the product documentation was not fetched | See `AI_Crawler_Registry.md` §Infrastructure — this is the single most important open item |
| Common Crawl (`CCBot`) current policy | Not fetched | Blocking one corpus does not block all downstream models |

---

## Live observations of gavior.in (2026-08-05)

These are measurements, not doc claims. Full detail goes in the Stage 2 audits.

| Observation | Value | Method |
|---|---|---|
| `https://gavior.in/` | HTTP 200 | curl |
| `https://www.gavior.in/` | HTTP 200, **byte-identical HTML, no redirect** | curl + `cmp` |
| Server | `cloudflare`; `x-nextjs-prerender: 1`, `x-nextjs-cache: HIT` | response headers |
| Homepage main content in raw HTML | **Yes** — ~18,400 chars of text after tag-stripping | curl + strip |
| `<h1>` count on homepage | 1 | raw HTML |
| Canonical tag | **Absent** | raw HTML |
| `og:image` / `twitter:image` | **Absent** (`twitter:card` is `summary`) | raw HTML |
| JSON-LD on homepage | 1 block: `Organization` (name, url, email, description only) | raw HTML |
| `/robots.txt` | 200 — **Cloudflare-managed block prepended above the app's own rules** | curl |
| `/sitemap.xml` | 200 | curl |

---

## Tooling availability

| Tool | Status | Note |
|---|---|---|
| SE Ranking (claude.ai connector) | **Requires OAuth authorization** | Session is non-interactive; authorize in claude.ai connector settings. Would supply real keyword/SERP data for Stage 6 instead of derived-only clusters. |
| Google Search Console | Unknown — pending Stage 1 answer | Without it, no crawl/index verification is possible |
| Bing Webmaster Tools | Unknown — pending Stage 1 answer | |
| Hostinger MCP (domains/DNS/hosting) | Connected | DNS is the likely lever for the www/apex duplicate-host fix if DNS is managed at Hostinger; but the site fronts through Cloudflare, so the redirect may need to be set there instead |
