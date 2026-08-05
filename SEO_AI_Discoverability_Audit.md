# AI Discoverability Audit — gavior.in

**Date:** 2026-08-05 | **Policy chosen in Stage 1:** *Allow everything, including training.* **Robots owner:** *the app — Cloudflare managed robots to be disabled.*
**Status:** ⚠️ **The chosen policy is NOT what is live.** See §1.

---

## 1. 🔴 Crawler access — app and infrastructure disagree

`src/app/robots.ts` emits three lines. `https://gavior.in/robots.txt` serves something quite different, because **Cloudflare prepends a managed block**:

| Token | Category | Live policy | Chosen policy | Match? |
|---|---|---|---|---|
| `Googlebot` | General search | Allowed (via `*`) | Allow | ✅ |
| `Bingbot` | General search | Allowed (via `*`) | Allow | ✅ |
| `OAI-SearchBot` | AI search / citation | Allowed | Allow | ✅ |
| `Claude-SearchBot` | AI search / citation | Allowed | Allow | ✅ |
| `PerplexityBot` | AI search / citation | Allowed | Allow | ✅ |
| `ChatGPT-User` | User-triggered | Allowed (ignores robots anyway) | Allow | ✅ |
| `Claude-User` | User-triggered | Allowed | Allow | ✅ |
| `Perplexity-User` | User-triggered | Allowed (ignores robots anyway) | Allow | ✅ |
| `GPTBot` | Training | 🔴 **Disallow: /** | Allow | ❌ **conflict** |
| `ClaudeBot` | Training | 🔴 **Disallow: /** | Allow | ❌ **conflict** |
| `Google-Extended` | Training (Gemini) | 🔴 **Disallow: /** | Allow | ❌ **conflict** |
| `CCBot` | Training corpus | 🔴 **Disallow: /** | Allow | ❌ **conflict** |
| `Amazonbot` | Training/other | 🔴 **Disallow: /** | Allow | ❌ **conflict** |
| `Applebot-Extended` | Training | 🔴 **Disallow: /** | Allow | ❌ **conflict** |
| `Bytespider` | Training | 🔴 **Disallow: /** | Allow | ❌ **conflict** |
| `meta-externalagent` | Training | 🔴 **Disallow: /** | Allow | ❌ **conflict** |
| `CloudflareBrowserRenderingCrawler` | Infrastructure | 🔴 **Disallow: /** | Allow | ❌ conflict |

Plus a `Content-Signal: search=yes,ai-train=no,use=reference` directive under `User-agent: *`, declared as an express reservation of rights under Article 4 of EU Directive 2019/790.

### What must happen
**Editing `src/app/robots.ts` will not change any of the above.** The managed block is injected by Cloudflare above the app's output. To implement the chosen policy someone must, in the Cloudflare dashboard for `gavior.in`:

1. Disable **Managed robots.txt** (a.k.a. AI crawler / Content Signals management), and
2. Verify no separate **AI Scrapers & Crawlers block**, **Bot Fight Mode**, or **Super Bot Fight Mode** rule is active.

I cannot do this from the repository, and no code change can substitute for it.

### ⚠️ A note on the decision, recorded once
Removing `ai-train=no` withdraws a standing copyright reservation under EU law. That is a content-licensing choice with legal dimensions, not purely an SEO setting. It was made deliberately in Stage 1 and is implemented as instructed; it is recorded here so it is traceable rather than accidental, and so it can be revisited without archaeology.

### 🟡 Also note: the live robots.txt has two `User-agent: *` blocks
Cloudflare's block and the app's block both declare `User-agent: *`. Per the robots exclusion standard, crawlers merge or take the first matching group — behaviour varies by implementation. Whatever the policy, **this ambiguity should not persist.** One owner, one block.

---

## 2. 🔴 WAF / CDN — the unknown that matters most

Robots.txt is a request to well-behaved crawlers. Cloudflare's bot-management layer is enforcement, and it operates **independently of robots.txt**.

| Question | Status |
|---|---|
| Is "Block AI Scrapers and Crawlers" enabled? | ⚠️ **UNKNOWN — cannot be determined from outside** |
| Is Bot Fight Mode / Super Bot Fight Mode on? | ⚠️ **UNKNOWN** |
| Are `OAI-SearchBot` / `Claude-SearchBot` / `PerplexityBot` actually reaching origin? | ⚠️ **UNVERIFIED** |
| Do Cloudflare firewall logs show AI-crawler 403s? | ⚠️ **NOT CHECKED — no dashboard access** |

**Why this matters more than any metadata fix:** if Cloudflare is silently 403-ing AI search crawlers at the edge, then allowing them in robots.txt achieves exactly nothing, and Gavior will remain absent from ChatGPT, Claude and Perplexity answers regardless of how good the content becomes. The evidence that some managed AI product is active — the injected robots block — makes this a live possibility, not a hypothetical.

**Required human action:** open Cloudflare → Security → Bots, and Security → Events filtered by AI crawler user-agents, and report what is enabled. All three providers publish IP ranges for verification (`perplexity.com/perplexitybot.json`; OpenAI and Anthropic publish theirs in the docs cited in `SEO_Evidence_Log.md`).

---

## 3. Entity consistency — weak

AI answer systems rely on consistent, corroborated entity facts. Gavior currently supplies very few.

| Signal | Status |
|---|---|
| `Organization` schema | ⚠️ Present but minimal — `name`, `url`, `email`, `description` only |
| `logo` in schema | ❌ Missing (asset exists at `public/brand/gavior-logo.png`) |
| `sameAs` (social profiles) | ❌ **Missing entirely** — no LinkedIn, X, GitHub, Behance, Instagram |
| `address` / `telephone` | ❌ Missing |
| `legalName`, `foundingDate` | ❌ Missing |
| `/about` page depth | 🔴 1,341 chars — no founder, no founding year, no HQ, no team, no legal name |
| `/contact` page NAP | 🔴 1,032 chars — no verifiable postal address or phone found |
| Consistent naming across footer / about / schema | ⚠️ Only the string "Gavior" is consistent, because almost nothing else is asserted |

A known outbound signal does exist and is unused: `showcase/page.tsx` links to `behance.net/gopadutta`, and images are credited to *Gopa Dutta*. That is a real person attached to real work — exactly the kind of corroborated entity link `sameAs` and `Person` schema are for, and it is currently invisible to machines.

**Assessment:** there is not enough factual substance on this site for an AI system to describe Gavior confidently, let alone cite it. This is the primary AI-visibility blocker after the crawler question — and unlike the crawler issue, **no code can fix it.** It requires real facts from the business.

---

## 4. Citation-worthy content — largely absent

AI answer engines cite passages that stand alone and assert something checkable.

| Property | Status |
|---|---|
| Self-contained answer blocks | ⚠️ Weak — copy is abstract ("Clarity is a competitive advantage") |
| Concrete facts, statistics, dates | 🔴 Almost none |
| Tables of pricing / specs / comparisons | 🔴 None. `/pricing` is 1,217 chars and states no prices |
| Original data or research | 🔴 None |
| Named authors / editorial attribution | 🔴 None — blog posts have no byline |
| Real case-study outcomes | ⚠️ `site-data.ts` has results like *"38% more completed bookings"* for Nimbus Health |
| Source links / citations | 🔴 None |
| Defined acronyms and product names | ⚠️ Partial |

### 🔴 Unsupported and likely fabricated claims — must be resolved
The three portfolio projects (**Nimbus Health**, **Vanta Commerce**, **Northstar Logistics**) carry specific outcome metrics such as *"38% more completed bookings."* These names read as invented placeholders, and the surrounding copy is generic template text.

**If these clients and figures are not real, they must be removed or clearly relabelled as illustrative before any structured data is added.** Wrapping fabricated case studies in `Article` or `Review` schema would convert a marketing exaggeration into a machine-readable false claim — the exact failure mode your operating rules prohibit. **I will not add schema to these pages until their factual status is confirmed.**

Similarly, no `AggregateRating`, `Review`, or `Product` price schema should be added anywhere on this site, because there is no real underlying data for any of it.

---

## 5. Content accessibility to AI crawlers — excellent

| Check | Result |
|---|---|
| Content in raw server HTML | ✅ All 61 URLs |
| Requires JavaScript to read | ✅ No |
| Behind login / paywall | ✅ No |
| Behind tabs, accordions, infinite scroll | ✅ No |
| WebSocket or client-fetch dependent | ✅ No |
| Exactly one `<h1>` per page | ✅ All 61 |

Any crawler that is *allowed* through will read this site perfectly. The technical retrieval layer is sound; the problems are policy, entity substance, and duplication.

---

## 6. `llms.txt`

**Absent, and recommended to stay absent.** Google's official position (verified 2026-08-05): *"You don't need to create new machine readable files, AI text files, or markup to appear in these features."* No provider verified in `AI_Crawler_Registry.md` documents `llms.txt` support. Adding one would create a second source of truth to maintain with no verified benefit. Revisit only if a target provider publishes official support.

---

## 7. YMYL / compliance

| Factor | Assessment |
|---|---|
| YMYL category | 🟢 No — B2B digital services, not health/finance/legal advice |
| Regulated claims | 🟢 None found |
| Geo restrictions | ⚪ Unknown — target markets not yet stated |
| Legal pages present | ✅ privacy, terms, cookie, refund all exist (though absent from sitemap) |
| Cookie consent mechanism | ⚪ Not assessed — no analytics installed yet, so nothing to consent to today. **Will become required the moment GA4 is added**, particularly for EU visitors. |
| Business claims verifiable | 🔴 **No** — see §4 |

---

## Priority actions

| # | Action | Owner | Blocker? |
|---|---|---|---|
| 1 | Audit Cloudflare bot-management settings and firewall logs for AI-crawler blocks | **Human (Cloudflare dashboard)** | 🔴 Yes — nothing else in this file matters if crawlers are edge-blocked |
| 2 | Disable Cloudflare managed robots.txt so the app owns policy | **Human (Cloudflare dashboard)** | 🔴 Yes |
| 3 | Confirm whether the three portfolio case studies are real | **Human (business)** | 🔴 Yes — blocks all portfolio schema |
| 4 | Bound `blog/[slug]` and `industries/[slug]` — no more infinite AI-readable templated pages | Code | 🔴 Yes |
| 5 | Supply real entity facts: legal name, founding year, HQ, phone, social profiles | **Human (business)** | 🟠 Blocks meaningful schema |
| 6 | Extend `Organization` schema with `logo`, `sameAs`, `address`, `telephone` | Code (needs #5) | — |
| 7 | Rewrite `/about`, `/pricing`, `/contact` with checkable facts and tables | **Human + code** | — |
| 8 | Replace 24 templated service pages with real content or consolidate them | **Human (content)** | — |

---

## Honest limits

- No robots configuration, schema, or content change can **guarantee** a citation in any AI answer engine. Providers vary by query, account, region, personalisation, model version and time.
- Blocking or unblocking training crawlers today does not affect content already absorbed into existing corpora, licensed datasets, or third-party indexes.
- Two of the fetchers documented in `AI_Crawler_Registry.md` openly ignore robots.txt. Robots is guidance; only the WAF enforces.
- Robots.txt is **never** a security control. Nothing sensitive on this domain should ever depend on it.
- Everything in §1 is a snapshot of 2026-08-05. Cloudflare can change managed-rule defaults without notice; re-verify the live `/robots.txt` on every run.
