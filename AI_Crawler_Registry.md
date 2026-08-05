# AI Crawler Registry — gavior.in

**Verified:** 2026-08-05, by live fetch of official provider documentation.
**Policy status:** ⚠️ **NOT YET SET BY A HUMAN.** The "Recommended policy" column below is a proposal for a public marketing site. Nothing is implemented from this file until Stage 1 policy answers are given.

> Only tokens with a live official source are listed. Tokens I could not verify this run are in the UNVERIFIED table at the bottom and **must not** be written into `robots.ts`.

---

## Category legend

| Category | Meaning |
|---|---|
| `GENERAL_SEARCH_CRAWLER` | Builds a classic search index |
| `AI_SEARCH_OR_CITATION_CRAWLER` | Feeds AI answer surfaces that link/cite sources |
| `TRAINING_OR_MODEL_DEVELOPMENT` | Collects content for model training |
| `USER_TRIGGERED_FETCHER` | Fetches only when a human asks; robots handling varies by provider |
| `AD_PREVIEW_OR_VALIDATION` | Ad landing-page checks |
| `UNKNOWN_OR_UNVERIFIED` | No official doc confirmed this run |

---

## Verified registry

| Provider | Surface | Category | Token | Respects robots? | Recommended policy | Source | Verified | Conf. |
|---|---|---|---|---|---|---|---|---|
| Google | Google Search, Discover, Images, Video, **AI Overviews & AI Mode** | `GENERAL_SEARCH_CRAWLER` | `Googlebot` | Yes | **ALLOW** — non-negotiable | [common-crawlers](https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers) | 2026-08-05 | High |
| Google | Google Images | `GENERAL_SEARCH_CRAWLER` | `Googlebot-Image` | Yes | **ALLOW** | same | 2026-08-05 | High |
| Google | Gemini model training | `TRAINING_OR_MODEL_DEVELOPMENT` | `Google-Extended` | Yes | **BUSINESS DECISION** — currently blocked by Cloudflare (see §Infrastructure). Blocking costs nothing in Search: docs state it "does not impact a site's inclusion in Google Search nor is it used as a ranking signal." | same | 2026-08-05 | High |
| Google | Misc product fetching | `UNKNOWN_OR_UNVERIFIED`→documented as generic | `GoogleOther` | Yes | ALLOW (default). Does not affect Search. | same | 2026-08-05 | High |
| Google | Vertex AI Agents built *by the site owner* | `TRAINING_OR_MODEL_DEVELOPMENT` | `Google-CloudVertexBot` | Yes | Irrelevant unless Gavior builds a Vertex agent on its own site | same | 2026-08-05 | High |
| Google | Rich Results Test / URL Inspection | `AD_PREVIEW_OR_VALIDATION` | `Google-InspectionTool` | Yes | **ALLOW** — blocking it breaks your own testing | same | 2026-08-05 | High |
| OpenAI | ChatGPT search results | `AI_SEARCH_OR_CITATION_CRAWLER` | `OAI-SearchBot` | Yes | **ALLOW** — this is the ChatGPT citation path | [openai bots](https://developers.openai.com/api/docs/bots) | 2026-08-05 | High |
| OpenAI | Foundation-model training | `TRAINING_OR_MODEL_DEVELOPMENT` | `GPTBot` | Yes | **BUSINESS DECISION** — currently blocked by Cloudflare | same | 2026-08-05 | High |
| OpenAI | Ad landing-page validation | `AD_PREVIEW_OR_VALIDATION` | `OAI-AdsBot` | Yes | ALLOW if you ever run OpenAI ads; otherwise neutral | same | 2026-08-05 | High |
| OpenAI | User asked ChatGPT to open a page | `USER_TRIGGERED_FETCHER` | `ChatGPT-User` | **No** — "robots.txt rules may not apply" | ALLOW. Cannot be reliably blocked via robots; would need WAF | same | 2026-08-05 | High |
| Anthropic | Claude model training | `TRAINING_OR_MODEL_DEVELOPMENT` | `ClaudeBot` | Yes | **BUSINESS DECISION** — currently blocked by Cloudflare | [claude web access](https://support.claude.com/en/articles/8896518-how-does-anthropic-access-web-content) | 2026-08-05 | High |
| Anthropic | Claude search indexing | `AI_SEARCH_OR_CITATION_CRAWLER` | `Claude-SearchBot` | Yes | **ALLOW** — this is the Claude citation path | same | 2026-08-05 | High |
| Anthropic | User asked Claude to fetch a page | `USER_TRIGGERED_FETCHER` | `Claude-User` | Yes (takes robots directives) | **ALLOW** | same | 2026-08-05 | High |
| Perplexity | Perplexity search results | `AI_SEARCH_OR_CITATION_CRAWLER` | `PerplexityBot` | Yes | **ALLOW** — docs explicitly state it is "not used to crawl content for AI foundation models" | [perplexity bots](https://docs.perplexity.ai/guides/bots) | 2026-08-05 | High |
| Perplexity | User-initiated answer fetch | `USER_TRIGGERED_FETCHER` | `Perplexity-User` | **No** — "generally ignores robots.txt rules" | ALLOW. WAF-only if you needed to block | same | 2026-08-05 | High |

### Critical separation to preserve

Training ≠ citation. Blocking `GPTBot` does **not** block `OAI-SearchBot`; blocking `ClaudeBot` does **not** block `Claude-SearchBot`. A policy that blocks training while allowing AI-search crawlers is coherent and supported by all three providers' docs. Conflating them silently removes Gavior from AI answers with no compensating benefit.

---

## ⚠️ §Infrastructure — Cloudflare is currently overriding this repo

`https://gavior.in/robots.txt` **does not serve what `src/app/robots.ts` produces.** Cloudflare injects a managed block *above* the app's output. Live content as of 2026-08-05:

```
# BEGIN Cloudflare Managed content
User-agent: *
Content-Signal: search=yes,ai-train=no,use=reference
Allow: /

User-agent: Amazonbot                      Disallow: /
User-agent: Applebot-Extended              Disallow: /
User-agent: Bytespider                     Disallow: /
User-agent: CCBot                          Disallow: /
User-agent: ClaudeBot                      Disallow: /
User-agent: CloudflareBrowserRenderingCrawler  Disallow: /
User-agent: Google-Extended                Disallow: /
User-agent: GPTBot                         Disallow: /
User-agent: meta-externalagent             Disallow: /
# END Cloudflare Managed Content

User-Agent: *          <-- this part is from src/app/robots.ts
Allow: /
Sitemap: https://gavior.in/sitemap.xml
```

**What this means:**

1. A **training-restricted** AI policy is already live, and nobody in this repo chose it — it is a Cloudflare product default. It may or may not match Gavior's intent.
2. `Content-Signal: ai-train=no` is an express reservation of rights under Article 4 of EU Directive 2019/790. That is a **legal/content-rights posture**, not just an SEO setting. It should be a deliberate choice.
3. The good news: `OAI-SearchBot`, `Claude-SearchBot`, and `PerplexityBot` are **not** blocked in robots.txt. The AI-citation path is open at the robots layer.
4. **Unverified and higher-risk:** Cloudflare's separate *WAF / bot-management* layer ("Block AI Scrapers", "Bot Fight Mode", "Super Bot Fight Mode") can drop requests at the edge regardless of robots.txt. If any of those are on, allowed AI-search crawlers may be silently 403'd. **Robots.txt cannot tell us this — only Cloudflare's dashboard and firewall logs can.**
5. Editing `src/app/robots.ts` **will not remove** the Cloudflare block. Two sources of truth are currently in conflict, and writing app-level `Allow:` rules for a bot Cloudflare disallows produces a contradictory robots.txt.

**Required action before any robots work:** decide where robots policy lives — Cloudflare managed, or the app. Not both.

---

## Not verified this run — do NOT write rules for these

| Provider / token | Why absent |
|---|---|
| `Bingbot`, Bing URL Submission API | Bing not confirmed as a target surface; docs not fetched |
| `Applebot`, `Applebot-Extended` | Blocked live by Cloudflare, but Apple's docs were not fetched this run |
| `Amazonbot`, `Bytespider`, `meta-externalagent`, `CCBot` | Blocked live by Cloudflare; no official doc verified this run |
| `CloudflareBrowserRenderingCrawler` | Cloudflare-internal; product docs not fetched |
| Brave Search AI, You.com, xAI/Grok, Mistral, DeepSeek | NO OFFICIAL PUBLIC CRAWLER DOC FETCHED THIS RUN |
| Any future provider | Add only after live verification |

---

## Honest limits of this file

- Robots.txt is **guidance, not enforcement**. Two of the fetchers above openly ignore it. Non-compliant scrapers ignore all of it.
- Robots.txt is **not security**. Nothing private should ever rely on it.
- Blocking training crawlers today does not remove content already in existing corpora, licensed datasets, or third-party indexes.
- No robots configuration can guarantee an AI system cites you, and none can guarantee a future system honors these tokens.
