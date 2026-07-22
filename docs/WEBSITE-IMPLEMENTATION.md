# CloudVerse — Website Content & Implementation Specification

**Version 2.0 · Agentry-led rebuild · For design, content, and engineering**

> The single source of truth for the CloudVerse rebuild. It covers strategy, information
> architecture, page-by-page copy (written to ship), the media/asset system (videos,
> screenshots, mockups, diagrams), and the SEO/AEO/GEO build. Designers design around this.
> Engineers build to it. When this doc and a Figma file disagree, this doc wins until it's
> updated here.
>
> **What changed in v2:** every page now carries explicit media direction (what video,
> screenshot, mockup, or diagram goes where, and whether it already exists or needs to be
> produced). All copy has been rewritten to read like a person wrote it, not a model.
>
> **v2.1:** every quoted on-page string was run through the humanizer audit in §3.6. Removed
> the doubled question-lists, em-dashes sitting inside ship copy, and decorative
> rule-of-three patterns. Functional lists (real capabilities, the four modules, the cloud
> domains) were kept on purpose — see §3.6 for where the line is.

---

## Table of contents

1. [How to use this document](#1-how-to-use-this-document)
2. [Strategic foundation](#2-strategic-foundation)
3. [Voice & humanized-copy standard](#3-voice--humanized-copy-standard)
4. [Proof, customers & stats](#4-proof-customers--stats)
5. [Architecture & tech recommendation](#5-architecture--tech-recommendation)
6. [SEO / AEO / GEO build](#6-seo--aeo--geo-build)
7. [Design system reference](#7-design-system-reference)
8. [Media & asset system](#8-media--asset-system)
9. [Global components](#9-global-components)
10. [Sitemap & information architecture](#10-sitemap--information-architecture)
11. [Page specs — copy + media](#11-page-specs--copy--media)
12. [FAQ bank](#12-faq-bank)
13. [Phase 2 — programmatic pages](#13-phase-2--programmatic-pages)
14. [Open decisions](#14-open-decisions)

---

## 1. How to use this document

Today there are two sites telling two stories. `CloudVerse-Website 2` (Next.js) sells a
broad, equal-weight four-module platform. `cloudverse-agentry-changes` (Vite SPA) sells Agentry as a
"system of record for AI execution." We're picking one story and one codebase.

**The story:** lead with AI. Agentry is the headline. FinOps, Torb, and DataX are the proof that
we've done this before and the reason a buyer trusts us with their AI.

**The codebase:** build on the Next.js App Router site. It's the only one of the two that's
architecturally right for the SEO/AEO/GEO goals (§5). We move the best of the Vite SPA into
it — the customer logos, the integrations explorer, the run-ledger card, the
before/during/after framing.

Who reads what:

| Role | Start here |
|---|---|
| Designers | §2, §3, §7, §8 (media), §9, §11 |
| Content / copy | §3, §4, §11, §12 |
| Engineers | §5, §6, §8, §9, §10, §11 |
| Leadership | §2, §4, §10 |

Conventions:

- **H1 / H2 / Eyebrow / Body / CTA** = literal copy to ship.
- *Intent* = why the section exists.
- *Media* = the asset for that section, tagged with one of:
  - `[VIDEO]` screen capture of the product. **(have)** or **(record)**.
  - `[SCREENSHOT]` static product UI, shipped light + dark. **(have)** or **(capture)**.
  - `[MOCKUP]` built in React, no image asset. **(build)**.
  - `[DIAGRAM]` a designed illustration or SVG. **(design)**.
  - `[LOGO]` brand mark we already hold. **(have)**.
- Copy in _[brackets]_ is a placeholder to confirm before launch.

---

## 2. Strategic foundation

### 2.1 The position, in one line

> **CloudVerse is the control plane for enterprise AI. The FinOps platform underneath is how we prove it pays for itself.**

Lead with Agentry everywhere a prospect first meets us. FinOps, Torb, and DataX hold up the
foundation. They don't open the conversation.

### 2.2 The core idea — an operating system for the AI you're already running

Companies have quietly hired a second workforce. Research agents. Customer-facing agents.
Copilots. Internal assistants. RAG pipelines. Fine-tuned models. A drawer full of LLM
subscriptions nobody renews on purpose. None of it shows up on an org chart, and no single
person can tell you what it costs, who's using it, or whether it's earning its keep.

Agentry is the system that runs that workforce. The way an HRMS holds the record for every
employee, Agentry holds the record for every model and agent:

- **Onboarded** — every model call, agent run, RAG workflow, GPU job, and inference API gets
  discovered and put on the books.
- **Given a job** — routing and policy decide which model does which work, under which rules.
- **Paid and budgeted** — spend caps, allocation, and unit economics by team, product, and use case.
- **Reviewed** — evals, quality and latency scoring, KPIs, and the ROI to back them up.
- **Audited** — every decision logged, explainable, and ready for a compliance review.

Use the HRMS line where it earns its place (the hero support copy, the Agentry page, a sales
deck). It makes an abstract category land in one sentence for a CFO, a CIO, or a Head of AI.

### 2.3 Before, during, and after execution

This is the diagram everything hangs off. Each competitor owns one of these windows. We own
all three.

| Window | What's happening | What Agentry does |
|---|---|---|
| **Before** | A request, agent run, or job is about to fire | Apply the owner, budget, policy, allowed providers, residency, and quality floor before a token leaves |
| **During** | The request routes and runs | Score every route live on cost, latency, quality, and compliance. Pick the best fit, hold a fallback, enforce the cap in real time |
| **After** | The run finishes | Attribute cost per request, feature, and tenant. Write the run to the ledger with its outcome, eval, and audit trail |

- AI gateways (Portkey, Kong, LiteLLM, TrueFoundry) live in **during**.
- LLM observability (Langfuse, Helicone, Maxim) lives in **after**.
- FinOps tools (Apptio, Flexera, CloudHealth, Finout) live in **after**, cloud only.
- CloudVerse is the only one in all three, across AI, cloud, data, and engineering.

### 2.4 The five things Agentry does

Every Agentry section maps back to one of these.

1. **Routing** — send each workload to the right model for its cost, latency, quality, and compliance needs, automatically.
2. **Visibility** — one view across models, tokens, teams, projects, agents, subscriptions, and APIs.
3. **Optimization** — surface oversized models, wasteful prompts, duplicate subscriptions, and right-size them with the savings attached.
4. **Governance & evals** — policy, access control, residency, vendor oversight, and quality monitoring, on by default.
5. **Productivity** — measure engineering velocity and what AI actually changed about output.

### 2.5 Who we're for

A visitor should recognize themselves in the first five seconds. Trigger language:

> **For teams running 25+ AI tools, more than one model provider, internal agents or
> workflows, and an AI bill that's climbing faster than anyone can explain.**

| Persona | Titles | What they're on the hook for | Leads with |
|---|---|---|---|
| **Head of AI / CAIO** (primary) | Head of AI, Chief AI Officer, VP/Dir MLOps, Head of ML Eng | Making AI spend defensible and scalable without slowing teams down | **Agentry** |
| CIO / CTO | CIO, CTO, VP Eng, Head of Cloud/Infra | Governing one estate — cloud, AI, data, engineering — from one place | Agentry + FinOps + Torb |
| CFO / Finance | CFO, VP Finance, FP&A, Tech Finance | Explaining, allocating, and forecasting spend, AI included, and defending it | FinOps + Agentry |
| Platform Eng | Platform/Torb leads, SRE leadership | Putting cost in the workflow before changes ship | Torb + Agentry |
| Data | Head of Data, Data Platform leads | Making shared warehouse and pipeline spend allocable | DataX + FinOps |

### 2.6 The outcomes we sell

- Cut AI spend (40–90% on production workloads)
- Get engineering hours back
- Kill AI tool sprawl
- Tighten prompts and workflows
- Scale AI adoption without losing control of it
- Run AI on a strategy you can measure, not a hunch

### 2.7 How we talk about competitors

On the main pages, never name names. Frame by what a category *can't* do and let the
before/during/after diagram carry it. (Named comparisons are Phase 2, §13.)

| They are | They give you | What they can't give you |
|---|---|---|
| AI gateways | Routing and a proxy | Ownership, budgets, policy, cost attribution, ROI, outcome evidence |
| LLM observability | Traces and dashboards | Control before the request, real economics, governance, allocation |
| FinOps tools | Cloud cost reports, after the fact | AI-native economics, routing, before-execution control, the engineering workflow |
| **CloudVerse** | **One record of what ran, who owned it, what it cost, and what it returned. Before, during, and after.** | — |

---

## 3. Voice & humanized-copy standard

The brief was explicit: the writing must not read like a model produced it. Here's the bar we
held, and the bar to hold for anything added later.

### 3.1 How CloudVerse sounds

We sound like an operator who's seen the bill. Direct, specific, a little blunt. We state the
mechanism and the number, then stop. We trust the reader to be smart.

- **Specific beats sweeping.** "70% of those requests run fine on a model that costs a third
  as much" lands. "Optimize your AI spend" doesn't.
- **Short and long sentences together.** A four-word line after a long one is what makes
  writing sound human. If every sentence is the same length, it reads like a machine.
- **Name real things.** Snowflake, Claude, a pull request, a GPU cluster, month-end. Concrete
  nouns do the persuading.
- **One idea per sentence.** When a sentence needs an em-dash to bolt on a second clause, it
  usually wanted to be two sentences.
- **Contractions are fine.** "Doesn't," "you're," "here's." People use them. So do we.

### 3.2 The tells we removed (and keep out)

These are the fingerprints of AI copy. None of them ship.

- **The "not just X, but Y" frame.** Banned. ("It's not just a gateway, it's a control plane.")
- **Rule-of-three adjectives.** "Fast, reliable, and scalable." Pick the one that's true and earn it.
- **Empty power words:** leverage, seamless, robust, cutting-edge, revolutionize, unlock,
  elevate, supercharge, harness, empower, navigate the complexities, in today's landscape.
- **Em-dash overuse.** They're a brand habit here. Used everywhere, they become a tell. Default
  to a period or a comma. Keep an em-dash only when it's genuinely the best punctuation, and
  not more than one per paragraph.
- **"From X to Y" parallelism** as a crutch for every transition.
- **Hedging verbs:** "helps you," "designed to," "aims to," "can enable." Say what it does.
- **Throat-clearing openers:** "In the world of," "As organizations increasingly," "Moreover,"
  "Furthermore."
- **Symmetry for its own sake.** Real writing is a little lopsided. Vary how sentences open.

### 3.3 Before / after (the standard, shown)

> **Before (model-ish):** "CloudVerse seamlessly empowers enterprises to leverage cutting-edge
> AI governance — unlocking unprecedented visibility, control, and savings across their
> entire AI landscape."
>
> **After (ships):** "Most companies can't tell you what their AI costs, who's running it, or
> whether it works. CloudVerse can. Every model and agent goes on one record: what ran, who
> owns it, what it cost, what it returned."

### 3.4 Naming, locked

- Company / platform: **CloudVerse**
- Flagship: **Agentry** (one spelling, brand-wide — lock it per §14)
- Modules: **Agentry**, **FinOps Platform**, **Torb**, **DataX**
- Agentry tagline: **"Optimizing the future of enterprise AI consumption."**
- Category line: **"the control plane for enterprise AI."**
- Phrases that recur: **before, during, and after execution** · **the run ledger** ·
  **read-only by default** · **no black boxes** · **decision-time.**

### 3.5 The four values (About + footer)

1. **Engineering-led FinOps.** Cost belongs in the workflow, not in a month-end spreadsheet.
2. **Decision-time visibility.** Context shows up where the decision gets made, not after the bill.
3. **Trust by default.** Read-only to start. Automation is opt-in. Everything's logged.
4. **Automation over toil.** Recommend, validate, then automate.

### 3.6 The humanizer audit (run this on any new copy)

Every on-page string in this doc went through the audit below. Anyone adding copy later runs
the same pass.

1. Draft the line.
2. Ask: "what makes this read as AI?" Check it against the tells in §3.2.
3. Rewrite, then read it out loud. If it sounds like a deck or a press release, it fails.

**Where the line sits on rule-of-three.** The audit kills *decorative* triads, padding that
exists for rhythm ("fast, reliable, and scalable"). It keeps *functional* lists, where each
item is a real, distinct thing: the four modules, the providers Agentry routes across, the cost
signals it scores on. "Route, govern, and meter" stays because Agentry does three separate things.
"Visibility, control, and savings" goes, because it's three words for one vague promise.

**Em-dash policy for ship copy.** Inside a quoted on-page string, default to a period or a
comma. An em-dash is allowed only when it's clearly the best punctuation, and never more than
one per paragraph. Em-dashes in headings, `<title>` tags, and this doc's own spec prose don't
count — they're not website body.

**Repetition is allowed; synonym-cycling isn't.** Saying "the run ledger" four times reads
human. Calling it "the ledger," then "the record," then "the log," then "the system of
register" to avoid repeating yourself is the AI tell. Pick the term and keep it.

---

## 4. Proof, customers & stats

> Every number on the site comes from here, so the story stays consistent and defensible.
> Anything marked _[verify]_ gets confirmed before launch. Benchmarked numbers say so.

### 4.1 The numbers

| Stat | What it means | Use on |
|---|---|---|
| **40–90%** | AI cost cut on production workloads | Home, Agentry, Solutions (Head of AI) |
| **96.8%** | Lower inference cost vs a hardcoded Claude Sonnet setup (benchmarked) | Agentry |
| **28.5%** | Faster than that same hardcoded baseline (benchmarked) | Agentry |
| **<15ms** | Routing overhead Agentry adds | Agentry |
| **10–100x** | Cost gap between the right model and the wrong one for a job | Home, Agentry |
| **$738,983** | Annualized cloud savings realized at Berkshire Hathaway HomeServices | Home, FinOps, About |
| **$101,736 / $61,582** | Annual recovery / single-month recovery, same account | Home case study, FinOps |
| **$2,400** | Spend caught in one pre-production review, before it shipped | Torb |
| **2–4 weeks** | No-fee proof-of-value | CTAs, demo page |
| **30 minutes** | To connect your first account | Home, Agentry |

### 4.2 Customers / logos

Use for the marquee and case studies. **Berkshire Hathaway HomeServices, Tencent Cloud,
Dr. Reddy's, Axis Max Life Insurance, Shaw,** Infogain, SISL Infotech, Ginesys, Ken42,
PiChain, Optimile, Aura ML, Autoflow, Climaty AI, Doqfy, Skylark.

Logo files already in the repo: `public/logos/` (dr-reddys, axis-max-life-insurance, shaw,
infogain, sisl, ginesys, ken42, pichain, optimile, aura-ml, autoflow, climaty-ai, doqfy,
skylark, tencent), plus cloud/model/data marks. _[verify]_ usage rights and exact legal names
per logo before launch, Berkshire Hathaway especially.

### 4.3 Case studies

- **Berkshire Hathaway HomeServices** — found $101,736/yr and a $61,582 single-month
  recovery, $738,983 realized in total. The flagship finance proof. Already written into the
  home page.
- **XL Smart** — screenshots in `XL Smart Case Study/`. Build into a full case study.
- **SEA case study** — `Brand Context/CloudVerse SEA Case Study Final.pdf`.

### 4.4 Coverage

- **Cloud:** AWS (Bedrock, EC2, SageMaker, CloudWatch), Azure (ML, subscriptions), GCP (AI
  Platform), Oracle, Alibaba, Huawei, Tencent
- **Models:** OpenAI, Anthropic, Google Gemini, Cohere, Mistral, Llama/Ollama, Together AI,
  Groq, DeepSeek, HuggingFace
- **GPU / NeoCloud:** RunPod, Lambda Labs, CoreWeave, plus private vLLM/TGI and on-prem
- **Data:** Snowflake, Databricks, BigQuery, Azure Synapse, Microsoft Fabric
- **Dev / CI:** GitHub, GitLab, Azure DevOps, Terraform, Pulumi, Kubernetes
- **Identity / ops / payments:** OAuth (GitHub/Google/Microsoft), Stripe, HubSpot, ClickHouse,
  Prometheus, Slack, Teams, Jira, ServiceNow

---

## 5. Architecture & tech recommendation

### 5.1 Build on Next.js. Retire the SPA as the base.

You were right to start in Next.js. Making it official, and why the Vite SPA shouldn't be the
foundation:

| Need | Next.js App Router | Vite + React SPA |
|---|---|---|
| Full HTML on first byte, for crawlers and AI answer engines | Yes (SSG/SSR/ISR) | No — content is assembled in the browser |
| Per-route metadata, OG, canonical | Native `metadata` API | Manual, bolted on |
| Structured data, streaming, server components | First-class | Possible, all by hand |
| Core Web Vitals out of the box | Image/font/script handling built in | Roll your own |
| Static generation for blog, glossary, comparisons | ISR | Hard |

The point worth repeating: for AEO and GEO, the page has to arrive as complete HTML. When
ChatGPT, Perplexity, Google's AI Overviews, or Claude read your page, they should see your
stats, definitions, and answers without running your JavaScript. A client-rendered SPA hides
exactly the text you most want quoted. That's the reason to standardize on Next.js, full stop.

Don't waste the SPA, though. Port its assets: the customer logo set, the outcomes imagery, the
integrations explorer UX, the AI run-ledger card, and the before/during/after framing.

### 5.2 Rendering per route

| Routes | Strategy | Why |
|---|---|---|
| Home, Platform, Agentry, FinOps, Torb, DataX, Solutions, About, Integrations, Pricing | SSG | Rarely changes, needs to be fast and crawlable |
| Resources, blog, glossary, case studies, comparisons (P2) | ISR (revalidate ~1h) | Updates without a redeploy |
| Efficiency Snapshot, demo/connect forms, the app | SSR / client | Dynamic, user-specific |

### 5.3 Stack

Keep what's there, add what's missing. Next.js 15 App Router, React 19, TypeScript, Tailwind
plus the `--cv-*` CSS variables, Radix, Lucide, Framer Motion (used with restraint), React
Hook Form + Zod. Analytics: Mixpanel plus GA4 or PostHog for the funnel _[confirm]_. For the
blog and resources, start with MDX in the repo (fast, ISR-friendly); move to a headless CMS in
Phase 2 if non-engineers need to publish often.

---

## 6. SEO / AEO / GEO build

A build checklist. SEO is classic search. AEO is answer engines (snippets, "People also ask,"
voice). GEO is getting cited by generative engines. The tactics overlap.

### 6.1 Every page

- One `<h1>`, then a clean `h2`/`h3` outline.
- A `metadata` export: unique `title` (≤60 chars), `description` (≤155), `openGraph`,
  `twitter`, `alternates.canonical`.
- Real semantic HTML. Comparison tables are `<table>` elements, not styled divs, so engines
  can parse and quote them.
- Lowercase, hyphenated URLs (already good: `/platform/agentry`).
- `sitemap.ts` and `robots.ts`.
- `alt` text on every meaningful image; `next/image` everywhere.
- Deliberate internal links: each page points to its parent module, its sibling modules, the
  matching solution, and a related resource.

### 6.2 Structured data (JSON-LD), day one

A small `<JsonLd>` component injects these:

| Schema | Where |
|---|---|
| `Organization` (+ logo, `sameAs`) | Root layout |
| `WebSite` (+ `SearchAction`) | Root layout |
| `SoftwareApplication` / `Product`, one per module | Agentry, FinOps, Torb, DataX |
| `BreadcrumbList` | Every nested page |
| `FAQPage` | Any page with a FAQ block — high AEO value |
| `Article` / `BlogPosting` | Blog and guides |

### 6.3 AEO

- **Answer first.** Each major section opens with one or two sentences that directly answer the
  implied question, then expands. ("An AI control plane is the system that governs, routes, and
  meters every AI request across providers. CloudVerse runs that in all three windows of
  execution.")
- **FAQ blocks** on home, Agentry, FinOps, pricing, and solutions, marked up as `FAQPage`. Source
  them from §12 and from the real questions in the persona call-prep scripts.
- **Question-shaped H2s** where they fit: "How does Agentry cut AI costs?" "What does Agentry cost?"
- **Tight definitions** for every category term (AI control plane, LLM routing, AI FinOps, unit
  economics, run ledger). Those sentences are what gets quoted.

### 6.4 GEO

- **Be the source of the number.** Put stats in plain text next to the claim, not locked inside
  an image or a chart. Generative engines quote text.
- **Entity clarity.** Name CloudVerse, Agentry, and the category the same way everywhere. A strong,
  factual About page is what knowledge graphs read.
- **`/llms.txt`** at the domain root: a plain-text map of the site and the key facts, for AI
  crawlers.
- **Real HTML tables** for the before/during/after and capability comparisons.
- **Freshness:** datestamp guides and posts, keep `lastmod` honest in the sitemap.
- **Server-render everything** (§5.1).

### 6.5 Core Web Vitals

LCP < 2.5s, INP < 200ms, CLS < 0.1. `next/font` (Inter is already self-hosted), `next/image`,
route-level code splitting, defer non-critical JS, keep hero text in the first HTML payload.
Lighthouse ≥ 95 on home, Agentry, and FinOps before launch. Note: the home and product heroes
autoplay video — see §8.4 for keeping that off the critical path.

### 6.6 Keyword / intent map (starter)

| Page | Intent cluster |
|---|---|
| Home | enterprise AI control plane, manage AI costs, AI governance platform |
| Agentry | LLM routing, AI gateway alternative, AI cost optimization, LLM FinOps |
| FinOps | FinOps platform, cloud cost management, multi-cloud cost allocation |
| Torb | cost in pull request, engineering cost visibility, infracost alternative |
| DataX | Snowflake cost allocation, warehouse chargeback, data platform cost |
| Solutions/AI | AI spend governance, AI unit economics, Chief AI Officer tools |

---

## 7. Design system reference

Pull exact tokens from `app/globals.css` and the Tailwind config. This captures intent so
design and build stay aligned.

### 7.1 Color

| Token | Value | Use |
|---|---|---|
| Primary blue | `#1664C0` | CTAs, links, FinOps identity |
| Blue light | `#7CB8F8` / `#7C9BFF` | Highlights, hero accent text |
| Routing blue | `#007CFF` / `#0066CC` | Agentry "live/active" states |
| Navy bg | `#050F1C` / `#0A0C14` / `#0B0B0F` | Dark heroes and sections |
| Agentry purple | `#6954D4` | Agentry module identity |
| FinOps teal | `#0E9E7A` / `--cv-teal` | FinOps, positive checks |
| DataX amber | `#D97706` | DataX identity |
| Torb | `#1664C0` (blue) | Torb identity |
| Ink / muted / line / surface | theme vars | Text, captions, borders, panels |

Module color-coding is wayfinding — keep it consistent: Agentry purple, FinOps teal, Torb blue,
DataX amber.

### 7.2 Type

Inter, self-hosted via `next/font`. `cv-h1` clamps large (the FinOps hero runs
`clamp(52px, 5.4vw, 86px)`); `cv-h2` ~32–40px; `cv-h3` ~22–26px; `cv-body-lg` ~18–20px; body
16px; eyebrow/label 11–13px uppercase, tracked. Semibold display headings, regular body, line
height ~1.6 on body.

### 7.3 Light + dark

Theme-aware via CSS vars and `next-themes`. Heroes and "mechanism" sections usually go dark
navy; content sections alternate surface tones. Every diagram, screenshot, and logo ships in
both light and dark (the SPA already pairs light/dark previews — keep that).

### 7.4 Layout, spacing, motion

`cv-container` for the centered column, `cv-section` for vertical rhythm. Cards at
`rounded-2xl`/`rounded-3xl`, hairline borders, soft glow only on the "active/premium" card.
Motion is purposeful: fade-up on scroll, count-up on stats, the logo marquee, a pulse on live
indicators, a lift on card hover, and the video frame that rises into view on the home page.
Honor `prefers-reduced-motion` (the codebase already disables the video-rise animation under
it).

---

## 8. Media & asset system

This is the part v1 was missing. The real site leans hard on motion and product imagery, and
the rebuild should too. Here's the system, what we already have, and what has to be produced.

### 8.1 The four media types

1. **Video** — a short, silent, looping screen capture of the actual product, sat in a glowing
   frame. The home page and the FinOps hero both do this. No audio, autoplay, loop, muted,
   `playsInline`, `preload="auto"`. 16:9. This is the highest-impact, highest-effort asset.
2. **Screenshot** — a static product UI image, shipped in light and dark. The platform
   switcher on the home page cycles these. Cheaper than video, still needs real product UI.
3. **Coded mockup** — a UI built in React, no image file. `BrowserFrame`, the Torb PR diff,
   and the DataX `WarehouseIntel` chart are all coded. These never go stale and theme
   automatically. Prefer these for anything schematic.
4. **Diagram** — a designed illustration: the control-plane map, the before/during/after flow,
   the run-ledger card, the routing-decision flow. Ships as SVG, light + dark.

### 8.2 What already exists in the repo

| Asset | Path | Notes |
|---|---|---|
| Main product video | `public/product-video.mp4` | Generic platform video on the home page |
| FinOps videos (4) | `public/finops/anomalies.mp4`, `recommendations.mp4`, `allocation.mp4`, `platform-ai.mp4` | Power the tabbed FinOps hero |
| Platform dashboard screenshots | `public/legacy/platform/dash-main.svg`, `dash-vis.svg`, `dash-opti.svg`, `Dashboard.svg`, `visdash.svg`, `optidash.svg` | Used by the home platform switcher |
| Lifecycle icons | `public/legacy/icons/stage-inform.svg`, `stage-optimize.svg`, `stage-operate.svg` | |
| Integration logos | `public/legacy/integration/*.svg`, `public/logos/**` | Cloud, model, data, identity marks, most in light + dark |
| Customer logos | `public/logos/` (dr-reddys, axis-max-life, shaw, infogain, sisl, ginesys, ken42, pichain, optimile, aura-ml, autoflow, climaty-ai, doqfy, skylark, tencent) | |
| Team headshots | `public/team/chaand-deshwal.png`, `public/legacy/aboutUs/*.png` | For About |
| Cert badges | `public/legacy/aboutUs/iso.png`, `aicpa.png` | AICPA = SOC 2. Confirms certifications exist — see §14 |
| Logos / favicons / OG | `public/cv-logo.png`, `public/logo.png`, `public/legacy/logo/*`, `public/og/default.png` | |

### 8.3 What has to be produced (the gap)

The flagship has no footage. Agentry is now the headline and it has no video and no screenshots of
its own. This is the top art-production priority.

**Must produce:**

| Asset | Type | For | Priority |
|---|---|---|---|
| Agentry hero video | `[VIDEO]` | Agentry hero, and likely the new home hero | P0 |
| Routing decision UI (a request scored across providers, best-fit + fallback chosen) | `[SCREENSHOT]` or `[VIDEO]` | Agentry "during execution," home | P0 |
| Run-ledger card (owner · workload · model · cost · outcome · policy) | `[MOCKUP]` then `[SCREENSHOT]` | Agentry, home | P0 |
| Governance / policy dashboard | `[SCREENSHOT]` | Agentry governance | P1 |
| Cost-per-feature / per-tenant allocation view | `[SCREENSHOT]` | Agentry FinOps section, FinOps page | P1 |
| Before/during/after execution flow | `[DIAGRAM]` | Home, Agentry, Platform | P0 |
| Control-plane map (app → Agentry → providers/GPUs) | `[DIAGRAM]` | Home hero bg, Platform | P0 |
| Observer / Planner / Executor agent loop | `[DIAGRAM]` | Agentry autonomous agents | P1 |
| Torb PR cost comment | `[MOCKUP]` (exists as `TorbPrExample`) | Torb | have/extend |
| DataX warehouse attribution | `[MOCKUP]` (exists as `WarehouseIntel`) | DataX | have/extend |
| Agentry dashboard screenshot for the home platform switcher | `[SCREENSHOT]` | Home (replaces the reused `dash-*.svg`) | P1 |
| Real testimonial assets (quotes + names + logos/headshots) | content + `[LOGO]` | Home testimonials (currently placeholder slots) | P0 |

**Video production notes (for whoever records):** capture at 2x/retina, hide PII and use
realistic-but-fake account data, keep each clip 8–15s and loopable (start and end on the same
frame), no cursor jitter, dark UI theme to match the frames. Export `.mp4` (H.264) and a
`.webm` fallback, target < 3 MB per clip, and supply a `poster` still for first paint.

### 8.4 Performance rules for media

- Videos: `preload="auto"` is fine for the hero (it's the LCP candidate); lazy-load
  below-the-fold videos with an IntersectionObserver (the home `ProductVideo` already does
  this). Always set a `poster` so first paint isn't blank. Provide `.webm` + `.mp4`.
- Screenshots: `next/image`, correct `width`/`height` to reserve space (protects CLS), light +
  dark variants swapped by theme.
- Diagrams: inline SVG where it animates, `next/image` where static.
- Everything below the fold is lazy by default.

---

## 9. Global components

### 9.1 Top navigation (Agentry-led)

Sticky, transparent over the hero, solid on scroll. Desktop is a mega-menu; mobile is a
full-screen drawer with grouped accordions. Extends `components/Nav.tsx`.

- **Platform** ▾ — Agentry first, as a larger featured tile (purple accent, the line "Optimizing
  the future of enterprise AI consumption"). Then FinOps Platform, Torb, DataX. Footer link:
  "See the whole platform →" `/platform`.
- **Solutions** ▾ — Head of AI / AI Engineering · CIO / CTO · Finance / FinOps · Platform
  Engineering · Data Teams · Enterprise.
- **Why CloudVerse** → `/platform` (Phase 2: the comparison hub).
- **Resources** ▾ — Blog · Guides · Docs · Case Studies · Events (Glossary in P2).
- **Company** ▾ — About · Contact.
- **Pricing** → `/pricing` _[confirm, §14]_.
- Right side: `Sign in` (ghost), **`Book a Demo`** (primary, `DEMO_URL`).

That featured Agentry tile is how we "lead with AI" structurally, not just on the home page.
*Media:* `[LOGO]` module icons; Agentry tile gets the purple treatment.

### 9.2 Footer

Five columns plus a utility row. Platform · Solutions · Resources · Company · Legal. Utility
row: logo, copyright, social links (these are the `sameAs` for schema), SOC 2 / ISO badges
(`iso.png`, `aicpa.png`), theme toggle. Extends `components/Footer.tsx`.

### 9.3 Reusable blocks

| Component | Job | Status |
|---|---|---|
| `ProductVideo` | Glowing hero video frame, rises on scroll | have |
| `FinOpsHero` | Tabbed video player | have |
| `PlatformSurfaces` | Module switcher with cycling screenshots | have (reorder Agentry first) |
| `Testimonials` | Expanding quote cards | have (needs real quotes — §8.3) |
| `CTABand` | Closing CTA with orbit visual | have |
| `CountUpStat` | Animated stat | have |
| `CustomerLogos` | Logo marquee | have |
| `FaqBlock` | Accordion FAQ | have (add `FAQPage` JSON-LD) |
| `Lifecycle` | Before/during/after | have (re-point to execution framing) |
| `SplitMockup` / `FeatureShowcase` / `BrowserFrame` | Copy + coded UI mockups | have |
| `GovernanceBento` / `UseCaseBento` / `NoBlackBoxes` / `AgentryRoiSplit` | Agentry blocks | have |
| `TorbPrExample` / `WarehouseIntel` | Torb / DataX mockups | have |
| `RunLedgerCard` | Owner · cost · outcome record card | build (port `AIRecordCard`) |
| `ControlPlaneDiagram` | App → Agentry → providers | build |
| `JsonLd` | Structured-data injector | build |
| `AnswerBlock` | Answer-first lead paragraph (AEO) | build |

---

## 10. Sitemap & information architecture

Following the Next.js structure (the Portkey-derived north star), reordered so Agentry leads.
✅ exists · ➕ new or renamed.

```
/                              ✅ Home (Agentry-led rebuild)
/platform                      ➕ Platform overview (Agentry first)
/platform/agentry                  ✅ Agentry — flagship (major rewrite)
/platform/finops               ✅ FinOps Platform
/platform/torb                 ✅ Torb
/platform/datax                ✅ DataX
/solutions                     ✅ Solutions index
/solutions/ai-engineering      ✅ Head of AI / AI Engineering (lead persona)
/solutions/enterprise          ✅ CIO / CTO / Enterprise
/solutions/finops-teams        ✅ Finance / FinOps
/solutions/platform-eng        ✅ Platform Engineering
/solutions/data-teams          ✅ Data teams
/integrations                  ✅ Integrations (explorer + filter)
/about                         ✅ About
/resources                     ✅ Resources hub
/resources/[slug]              ✅ Article / guide template
/resources/case-studies        ➕ Case studies index
/pricing                       ➕ Pricing (confirm, §14)
/events                        ✅ Events
/contact                       ✅ Contact / sales
/connect                       ✅ Demo signup
/sign-up                       ✅ Sign up
/efficiency-snapshot           ✅ Invoice / efficiency tool
/security                      ➕ Security & trust
/legal                         ✅ → /legal/privacy, /legal/terms, /legal/security

Phase 2 (§13): /compare, /compare/[competitor], /glossary, /glossary/[term], /use-cases/[case]
```

Linking: Home points to every module and the lead solutions. Platform overview points to the
four modules. Each module links to the other three ("Part of the CloudVerse platform") and to
its matching solution and a resource. Every page has a path to Book a Demo.

---

## 11. Page specs — copy + media

> Per page: **Route · Goal · `metadata` · sections (copy + media + component).** Quoted copy
> ships. Tune length to layout, hold the message and the order.

---

### 11.1 Home (Agentry-led)

**Route:** `/` · **Goal:** in one scroll, a Head of AI, CIO, or CFO understands that CloudVerse
runs enterprise AI, believes the proof, and books a demo. **Rendering:** SSG.
**JSON-LD:** `Organization`, `WebSite`, `SoftwareApplication`, `FAQPage`.

**Metadata:**
- title: "CloudVerse — The Control Plane for Enterprise AI"
- description: "Put every AI model, agent, and dollar on one record. Route, govern, and meter your AI, and prove the ROI. Built on the FinOps platform enterprises already trust."
- OG: `public/og/default.png` (refresh with the control-plane diagram).

**Section 1 — Hero.** *Component:* `product/Hero` over `cv-hero-bg`.
- **Eyebrow:** "THE CONTROL PLANE FOR ENTERPRISE AI"
- **H1:** "Run your AI like you run the business."
- **Subhead:** "Most companies can't tell you what their AI costs, who's running it, or whether it's any good. CloudVerse can. Agentry puts every model and agent on one record: what ran, who owned it, what it cost, what it came back with. It runs on the same platform we already use for cloud, data, and engineering spend at companies like Berkshire Hathaway."
- **Primary CTA:** "Book a Demo" → `DEMO_URL`
- **Secondary CTA:** "See how Agentry works" → `/platform/agentry`
- **Under CTAs:** "Connect your first account in under 30 minutes. No-fee proof of value in two to four weeks."
- *Media:* `[DIAGRAM]` `ControlPlaneDiagram` as the hero backdrop — an app on the left, Agentry in
  the middle, a fan of model and GPU providers on the right, one request animating through.
  **(design, P0.)**

**Section 2 — Hero video.** *Component:* `ProductVideo`.
- *Media:* `[VIDEO]` the Agentry hero video, in the rising glow frame. **(record, P0.)** Until it
  exists, fall back to `product-video.mp4` with a `poster` still.

**Section 3 — Logo bar.** *Component:* `CustomerLogos`.
- **Label:** "The teams trusting us with their cloud and AI spend"
- *Media:* `[LOGO]` Berkshire Hathaway, Tencent Cloud, Dr. Reddy's, Axis Max Life, Shaw, and the
  rest (§4.2). **(have.)**

**Section 4 — The problem.** No video, just a strong statement (the current home does this well).
- **Body (large):** "AI got into everything before anyone set up the controls. Research agents,
  copilots, a dozen model subscriptions, GPU jobs nobody tracks. The bill shows up on time
  every month. The answer to what it was, who ran it, and whether it earned its money never
  does."
- **Kicker (large, emphasis):** "CloudVerse is where that answer lives."

**Section 5 — The idea (before/during/after).** *Component:* `Lifecycle`, re-pointed to execution.
- **H2:** "One place to decide, run, and account for every AI request."
- **AnswerBlock lead:** "An AI control plane is the system that governs, routes, and meters
  every AI request across your models and providers. CloudVerse is the only one that works in
  all three windows: before a request runs, while it runs, and after."
- Three columns:
  - **Before it runs:** "The owner, the budget, the allowed providers, the residency rule, and the quality floor are set before a single token leaves."
  - **While it runs:** "Every route is scored live on cost, latency, quality, and compliance. The best fit wins, a fallback waits, and the budget holds in real time."
  - **After it runs:** "Cost lands against the request, the feature, and the tenant. The run goes on the ledger with its outcome and an audit trail."
- *Media:* `[DIAGRAM]` the before/during/after flow. **(design, P0.)**

**Section 6 — What Agentry does.** *Component:* 5-card grid (or bento), purple accent.
- **H2:** "Agentry is the operating system for your AI."
- **Support line:** "An HRMS holds the record for every employee. Agentry holds it for every model
  and agent. Onboard it, route it, budget it, review it, audit it."
- Five cards:
  1. **Routing** — "Every workload goes to the model that fits its cost, latency, and quality needs. Automatically. No code change when prices move."
  2. **Visibility** — "One view of all of it: models, tokens, teams, projects, agents, subscriptions, APIs."
  3. **Optimization** — "Find the oversized model, the wasteful prompt, the subscription you're paying for twice. See the saving before you commit."
  4. **Governance & evals** — "Policy, access control, residency, vendor oversight, and quality checks. On by default, not bolted on."
  5. **Productivity** — "Measure what AI changed about engineering output, in hours and in dollars."
- **CTA:** "Go deeper on Agentry →" `/platform/agentry`
- *Media:* `[SCREENSHOT]` the routing decision UI behind or beside the grid. **(capture, P0.)**

**Section 7 — Proof band.** *Component:* `CountUpStat` row.
- Stats: **40–90%** less AI spend · **96.8%** cheaper inference than a hardcoded setup (benchmarked) · **$738,983** recovered by one customer · **10–100x** the cost when the wrong model runs the job.

**Section 8 — The platform (Agentry leads).** *Component:* `PlatformSurfaces` (reorder Agentry first).
- **Eyebrow:** "Platform overview"
- **H2:** "Agentry runs on the platform that already handles everything else."
- **Body:** "AI doesn't run in a vacuum. It sits on cloud infrastructure, pulls from your data
  platforms, and ships out of engineering. CloudVerse covers all of it from one place."
- Module panels (Agentry first, then FinOps, Torb, DataX), each with the existing one-liner and a
  "Learn more →" link.
- *Media:* `[SCREENSHOT]` the cycling dashboard per module. **Agentry needs its own** (currently
  reuses `dash-vis.svg`) — **(capture, P1.)** Others have `dash-*.svg`.

**Section 9 — Case study.** Keep the current Berkshire Hathaway block; it's strong and on-brand.
- **Eyebrow:** "Case study — Berkshire Hathaway HomeServices"
- **H2:** "How Berkshire Hathaway HomeServices recovered $738,983"
- Stat grid: **$101,736** annual recovery · **$61,582** single-month recovery · **$738,984** total.
- **Body:** "A growing AWS environment, fragmented tagging, no team-level attribution.
  CloudVerse tied spend to teams, surfaced the anomalies that mattered most, and gave finance a
  model that held up under review."
- **Pull quote:** "The waste was always there. It just had no address."
- *Media:* optional `[SCREENSHOT]` of the allocation view; the coded stat grid carries it today.

**Section 10 — Testimonials.** *Component:* `Testimonials`.
- *Media:* real quotes are missing — the component ships three placeholder slots. **Get three
  on the record** (a FinOps leader, an engineering leader, a data leader) with name, title, and
  logo. **(content + `[LOGO]`, P0.)** Until then the section stays out or runs a single named
  quote rather than three empty cards.

**Section 11 — Lifecycle / how it works.** Keep the three-stage block (Inform, Optimize,
Operate) or fold it into Section 5 to avoid repeating the lifecycle idea twice. *Recommendation:*
keep Section 5's execution framing as the conceptual diagram and reuse this block as a concrete
"how you'd run it" (Connect → Govern → Route → Measure). *Media:* `[LOGO]` stage icons (have).

**Section 12 — Integrations.** Keep the current logo-card grid.
- **H2:** "Connects to the stack your teams already run."
- **Trust pill:** "Read-only by default. Automation is opt-in, scoped, and logged."
- **CTA:** "View all integrations →" `/integrations`
- *Media:* `[LOGO]` integration marks (have).

**Section 13 — Efficiency Snapshot.** *Component:* `InvoiceEfficiency compact`.
- Top-of-funnel: upload a bill, get a read. (Full page at §11.13.)

**Section 14 — FAQ.** *Component:* `FaqBlock` + `FAQPage` schema. Five from §12 (home set).

**Section 15 — Final CTA.** *Component:* `CTABand` (orbit visual, have).
- **H2:** "Connect your first account in under 30 minutes."
- **Body:** "Most teams find something they didn't expect the same day. No-fee proof of value, two to four weeks."
- **CTAs:** "Book a Demo" · "Talk to Sales" → `/contact`

---

### 11.2 Platform overview

**Route:** `/platform` ➕ · **Goal:** show the whole platform, Agentry leading, route people to the
right module. **Rendering:** SSG. **JSON-LD:** `BreadcrumbList`, `SoftwareApplication`.

**Metadata:** title "The CloudVerse Platform — AI, Cloud, Data & Engineering" · description "One
control plane across AI (Agentry), cloud (FinOps), engineering (Torb), and data (DataX). Decide,
run, and account for every dollar of compute."

- **Hero H1:** "One platform for the economics of everything you compute."
- **Subhead:** "Agentry leads. It's the control plane for your AI. FinOps, Torb, and DataX run the same playbook across cloud, engineering, and data."
- *Media:* `[DIAGRAM]` `ControlPlaneDiagram` / platform map. **(design, P0 — shared with home.)**
- **Four modules:** a large card each, Agentry first, with the one-liner, three capability bullets,
  and "Explore →." *Media:* `[SCREENSHOT]` per module where available.
- **How they fit:** "Cost decided in one place lands in another. We connect the decision to the
  dollar, across all four." *Media:* the platform map again, annotated.
- **Why one platform beats four tools:** the before/during/after recap, "one view, one owner of
  the total." Proof band. FAQ. `CTABand`.

---

### 11.3 Agentry — the flagship

**Route:** `/platform/agentry` · **Goal:** convince a Head of AI or CIO that Agentry is *the* control
plane for enterprise AI. Deepest, most technical, most proof on the site. **Rendering:** SSG.
**JSON-LD:** `SoftwareApplication` (Agentry), `BreadcrumbList`, `FAQPage`.

**Metadata:**
- title: "CloudVerse Agentry — The Control Plane for Enterprise AI | CloudVerse"
- description: "Route, govern, and meter every AI request across models, clouds, GPUs, and private endpoints. Cut AI cost 40–90%. The decision happens before the request, not after the bill."

> The existing `app/platform/agentry/page.tsx` structure is strong. Keep the skeleton, sharpen the
> copy, and add the media it's missing. Reuse `GovernanceBento`, `NoBlackBoxes`, `UseCaseBento`,
> `AgentryRoiSplit`. Add `RunLedgerCard` and `ControlPlaneDiagram`.

**Hero.**
- **Eyebrow:** "Agentry — AI CONTROL PLANE"
- **H1:** "The control plane for enterprise AI."
- **Subhead:** "Route, govern, and meter every AI request across your models, clouds, GPUs, and private endpoints. The cost decision gets made before the request goes out, not in a spreadsheet after the bill lands."
- **Tagline strip:** "Optimizing the future of enterprise AI consumption."
- **CTAs:** "Book a Demo" · "See the platform" → `/platform`
- *Media:* `[VIDEO]` Agentry hero video. **(record, P0.)** `poster` still required.

**Stats band.** **40–90%** cost cut · **<15ms** routing overhead · **96.8%** cheaper than a
hardcoded Sonnet setup (benchmarked) · **28.5%** faster than that baseline.

**The problem.**
- **H2:** "AI compute is too expensive to hardcode and forget."
- **Body:** "Most teams pick a model once, wire it into the app, and move on. Six months later a
  cheaper model handles 70% of those requests just as well, and nobody notices. The hardcoded
  choice doesn't update when prices drop. It doesn't reroute when a provider slows down. That
  gap is where the budget quietly goes."
- *Media:* `[MOCKUP]` the existing before/after panel ("Before Agentry — hardcoded" vs "After Agentry
  — dynamic"). Keep it.

**How Agentry controls every request.**
- **H2:** "Every request, decided before it runs."
- **Body:** "Agentry sits between your application and every provider you use. On each request it
  scores the available routes against the rules your team set, then returns the best one with a
  fallback and a full decision log."
- **Contrast line:** "A gateway runs the rule you wrote. Agentry works out whether that rule is still right."
- *Component:* the six-step grid — **Connect · Govern · Score · Route · Measure · Audit** (keep
  the copy; it maps cleanly onto before/during/after). *Media:* `[SCREENSHOT]` or short
  `[VIDEO]` of the routing decision at the "Route" step. **(capture, P0.)**

**What Agentry isn't.**
- **H2:** "A gateway runs your rule. Agentry decides what the rule should be."
- *Component:* the HTML comparison `<table>` (Gateway · LLM Gateway · Observability · **Agentry**).
  Keep the rows. It needs to stay a real `<table>` for AEO (§6.3).
- **Close:** "Observability tells you what a request cost after it ran. Agentry settles that before it does."

**The five layers.**
- **H2:** "Five layers, one platform."
- *Component:* expandable cards — Routing, Visibility, Optimization, Governance & evals,
  Productivity (§2.4) — each with three or four concrete sub-capabilities from the feature
  directory (routing: cost/latency/compliance scoring, failover, fallback; governance: policy
  engine, RBAC, audit trail, provider-trust governance, residency, model governance).
- *Media:* `[SCREENSHOT]` per layer where it helps, or `[MOCKUP]` via `FeatureShowcase` tabs.

**The run ledger** (new).
- **H2:** "Every run, on the record."
- **Body:** "Agentry keeps a ledger of every model call, agent run, and GPU job: who owned it, what
  it used, what it cost, and what it returned. That's the record finance, security, and the
  board can all read the same way."
- *Media:* `[MOCKUP]` `RunLedgerCard` (port the SPA's `AIRecordCard`), then a real
  `[SCREENSHOT]` once UI exists. **(build → capture, P0.)**

**Autonomous agents.**
- **H2:** "Optimization that runs itself, with the approvals you set."
- **Body:** "Agentry watches usage, ranks the optimizations worth making, and carries out the ones
  you've approved. You decide what runs on its own and what waits for a person."
- *Media:* `[DIAGRAM]` Observer → Planner → Executor loop, with an approval-gate callout.
  **(design, P1.)**

**ROI.**
- **H2:** "The cost of not routing."
- *Component:* `AgentryRoiSplit` (keep the table). Three mechanisms: cost arbitrage, latency wins,
  waste elimination.

**For finance.**
- **H2:** "From cloud cost reports to real AI economics."
- Bullets (keep): per-request/feature/tenant allocation, automatic; budget caps enforced before
  spend; scenario modeling before a change ships; anomaly detection; spend attribution.
- *Media:* `[SCREENSHOT]` the cost-per-feature allocation view. **(capture, P1.)**

**Governance.** *Component:* `GovernanceBento`. **No black boxes.** *Component:* `NoBlackBoxes`
(the trace JSON). **Use cases.** *Component:* `UseCaseBento` (the four: cost arbitrage,
compliance-bound routing, GPU cost control for agents, multi-model product infra).

**Integrations.**
- **H2:** "Connect once. Route everywhere."
- Providers table (OpenAI, Anthropic, Gemini, Cohere, Mistral, Llama/Ollama, Together, Groq,
  DeepSeek, HuggingFace) plus the private/GPU panel (vLLM/TGI, CoreWeave/Lambda/RunPod, on-prem).
- *Media:* `[LOGO]` provider marks (have).

**Who it's for.** Keep the qualifier list; add the trigger (25+ tools, multiple providers,
internal agents, climbing bill). **FAQ** (`FaqBlock`, Agentry set §12). **Final CTA** (`CTABand`):
"See Agentry route your workloads end to end."

---

### 11.4 FinOps Platform

**Route:** `/platform/finops` · **Goal:** establish FinOps as the proven foundation and win the
finance buyer. **Rendering:** SSG. **JSON-LD:** `SoftwareApplication`, `FAQPage`.

**Metadata:** title "FinOps Platform — Cloud, Data & AI Spend You Can Explain | CloudVerse" ·
description "Trace every variance to a driver and an owner. Allocation that holds up, forecasts finance can defend, AI spend turned into unit economics."

**Hero.** *Component:* `FinOpsHero` (the tabbed video player). Keep it.
- **Eyebrow:** "FinOps Platform" (teal)
- **H1:** "Multi-cloud cost intelligence for every team."
- **Subhead:** "See every dollar by team, product, and provider. One model that reconciles to finance and explains itself to engineering."
- *Media:* `[VIDEO]` four tabs, all assets exist:
  - **Anomalies** → `/finops/anomalies.mp4` — "Find the team and the charge behind the spike within hours."
  - **Recommendations** → `/finops/recommendations.mp4` — "Ranked by impact. Specific enough to act on."
  - **Allocation** → `/finops/allocation.mp4` — "One model across all three clouds. Reconciles to finance."
  - **Platform AI** → `/finops/platform-ai.mp4` — "Ask about spend, trends, and savings in plain English."

**Sections** (use `SplitMockup` alternating left/right, teal accent; *Media:* `[MOCKUP]` browser
frames, or `[SCREENSHOT]` where real UI exists):
- **Explainability** — "Variance traced to a driver in hours, not days."
- **Allocation** — "Shared spend mapped to teams, services, and products on its own. Chargeback that survives scrutiny."
- **Forecasting** — "Forecasts finance can stand behind, AI spend included."
- **Anomalies** — "Spikes flagged before they compound."
- **Commitments** — "RIs, Savings Plans, and CUDs, with the realized payback tracked, not assumed."
- **AI bridge** — "AI and GPU spend turned into unit economics by team, model, and use case." → link to Agentry.

**Differentiation** (frame, don't name): decision-first over reporting-first; built for
engineers to actually use; AI-native; a real path from recommendation to automation.
**Case study** (Berkshire). **Who it's for** (`WhoUsesItCards`). **FAQ.** `CTABand`.

---

### 11.5 Torb

**Route:** `/platform/torb` · **Goal:** win platform and engineering — cost in the workflow,
before ship. **Rendering:** SSG.

**Metadata:** title "CloudVerse Torb — Cost Context in the Pull Request | CloudVerse" · description "Every
deployment commits cloud and AI spend. Torb flags the expensive change in the PR, before it ships."

- **Eyebrow:** "Torb" (blue)
- **H1:** "Every deploy commits spend. Torb shows it before you ship."
- **Subhead:** "Cost context lands in the pull request, for infrastructure, application code, and AI calls. Velocity stays high. Governance finally keeps up."
- **Stat:** "$2,400 of monthly spend caught in a single pre-production review, before the change shipped."
- *Media:* `[MOCKUP]` `TorbPrExample` — the PR cost comment with a diff (have, feed it real
  `DIFF` data).
- **Sections:** PR-level cost visibility · high-impact changes flagged pre-merge · the safer
  option offered in the same review · prevented spend tracked over time · AI-aware (catches the
  new model call or chatty agent loop an AI-assisted commit just introduced).
- **Who it's for** (`WhoTorbFor`). *Component:* `CostGates`. **FAQ.** `CTABand`.

---

### 11.6 DataX

**Route:** `/platform/datax` · **Goal:** win data teams — make shared data spend allocable.
**Rendering:** SSG.

**Metadata:** title "DataX — Warehouse & Pipeline Cost, Traced to Source | CloudVerse" ·
description "Trace Snowflake and Databricks spend to the query, pipeline, and team that ran it. Make shared data cost allocable."

- **Eyebrow:** "DataX" (amber)
- **H1:** "Shared data spend, traced back to who caused it."
- **Subhead:** "Warehouse and pipeline costs scale with how people use them, and rarely map back to a team or product. DataX traces them to the query, the pipeline, and the owner, so the spend is finally allocable."
- *Media:* `[MOCKUP]` `WarehouseIntel` (have, extend with real query attribution data).
- **Sections:** query and pipeline attribution · the AI-to-data crossover ("a RAG agent fires
  warehouse queries; a model pipeline pulls from Snowflake at scale, on someone else's budget")
  · allocation and chargeback · Snowflake / Databricks / BigQuery integration.
- **FAQ.** `CTABand`.

---

### 11.7 Solutions — by persona

**Index:** `/solutions` · **Goal:** let each buyer self-select and see their own world.
**Rendering:** SSG. Shared template:

1. **Hero** (`SolutionHero`) — persona H1 + subhead.
2. **The problem in their words** — pull from the matching brand stream (Finance / CIO / Head of AI).
3. **What they get** (`Outcomes`) — four to six outcomes.
4. **Modules used** (`ModulesUsed`) — lead module first.
5. **Proof** — the relevant stat plus a quote or case study.
6. **FAQ** + `CTABand`.

*Media per page:* `[SCREENSHOT]` the dashboard view that matches the persona (the SPA already
has light/dark "outcomes" previews for finance, engineering, business, IT, and AI/data — port
them). `[LOGO]` module marks on the "modules used" block.

**`/solutions/ai-engineering` — Head of AI / AI Engineering (lead persona):**
- **H1:** "Your AI spend outran your governance. Take it back."
- **Subhead:** "Attribute every dollar to a team, a feature, a use case. Route every workload to the right model. Walk into the budget conversation with numbers you can defend."
- Outcomes: clean attribution; routing that kills 10–100x waste; AI-native unit economics (cost
  per request, per feature, per user); governance (policy, access, residency, vendor oversight);
  visibility into the AI cost shipping out of engineering (Copilot, Cursor, agents); a number you
  can stand behind in front of finance and the board. Modules: **Agentry** lead, then Torb, DataX,
  FinOps. Stats: 40–90%, 96.8%.

**`/solutions/enterprise` — CIO / CTO / Enterprise:**
- **H1:** "Cloud, AI, data, and engineering are one estate. Govern it from one place."
- **Subhead:** "One operational view instead of four tools, with chargeback and showback that hold up across business units."
- Outcomes: one view; cost context at decision time; AI folded into the operating picture, not
  run as a side process; cross-team spend connected; forecasts and capacity planning that hold;
  one owner of the total. Modules: all four. Stat: $738,983.

**`/solutions/finops-teams` — Finance / FinOps:**
- **H1:** "The invoice is on time. The explanation isn't. We fix that."
- **Subhead:** "Explainability, allocation, and forecasts finance can defend, across cloud, AI, and data, with AI turned into unit economics."
- Outcomes: variance to drivers in hours; automatic allocation; defensible forecasts and
  chargeback; AI and GPU unit economics; upstream visibility; one view. Modules: FinOps lead,
  then Agentry. Stat: $738,983 / $100K+ a month.

**`/solutions/platform-eng` — Platform Engineering:**
- **H1:** "Put cost in the workflow, before the change ships."
- **Subhead:** "Infrastructure, code, and AI changes flagged in the pull request. Velocity stays. Governance catches up." Modules: Torb lead, then Agentry, FinOps. Stat: $2,400 a review.

**`/solutions/data-teams` — Data Teams:**
- **H1:** "Make shared data spend allocable."
- **Subhead:** "Trace warehouse and pipeline cost to the query, pipeline, and team, including the data spend your AI workloads now drive." Modules: DataX lead, then FinOps, Agentry.

---

### 11.8 Integrations

**Route:** `/integrations` · **Goal:** prove breadth and the read-only trust model; let people
filter to their stack. **Rendering:** SSG, client-side filter.

**Metadata:** title "Integrations — Cloud, Models, GPUs & Data | CloudVerse" · description
"Read-only by default, automation opt-in. Connect AWS, Azure, GCP, OpenAI, Anthropic, Snowflake, GPUs, and more."

- **H1:** "Connect once. Govern everywhere."
- **Security subhead:** "Read-only by default. Automation is opt-in."
- *Component:* `IntegrationsExplorer` — port the SPA's filter (by module, category, status:
  available / beta / coming soon). *Media:* `[LOGO]` the full mark set, light + dark (have).
- Categories: Cloud · Models · GPU / NeoCloud · Data · Kubernetes / Infra · Code & CI ·
  APM / telemetry · Identity · Ticketing / Collaboration. AI providers table with supported
  models (§4.4). **FAQ.** `CTABand`.

---

### 11.9 About

**Route:** `/about` · **Goal:** define the company (for GEO and knowledge graphs), tell the
story, show the people. **Rendering:** SSG. **JSON-LD:** `Organization` (rich), `AboutPage`.

**Metadata:** title "About CloudVerse — The Control Plane for Enterprise AI" · description "Why
we built CloudVerse: to make cloud, AI, and data spend something you can explain, predict, and defend, at the moment decisions get made."

- **H1:** "We make enterprise compute something you can explain."
- **Story:** cloud spend was already opaque. Then AI broke the way finance governed it
  altogether. We built CloudVerse as the engineering-led control plane that puts the cost
  decision where the work happens, across cloud, AI, data, and engineering.
- **Mission paragraph** — one tight, factual paragraph: what CloudVerse is, who it's for, what
  it does. This is the entity definition GEO reads, so keep it plain and quotable.
- **The four values** (§3.5), a line each.
- **The products** — Agentry, FinOps, Torb, DataX, short, link out.
- **The team** — *Media:* `[LOGO]`/headshots (`public/team/chaand-deshwal.png`,
  `public/legacy/aboutUs/*.png`, have). _[confirm which leaders to feature.]_
- **Trust** — *Media:* cert badges (`iso.png`, `aicpa.png`, have). Link to `/security`.
- **Vision:** "An AI-native economic decision layer for every enterprise." `CTABand`.

---

### 11.10 Resources

**Route:** `/resources`, `/resources/[slug]` · **Goal:** the SEO/AEO engine and nurture.
**Rendering:** ISR. **JSON-LD:** `Article`/`BlogPosting`, `BreadcrumbList`, `FAQPage`.

- **Hub H1:** "The playbook for AI and cloud economics."
- Sections: featured guides · case studies (Berkshire, XL Smart, SEA) · blog · docs · FAQ
  (glossary in P2). Category color-coding. *Media:* `[SCREENSHOT]`/illustration per card
  (`public/legacy/blogs/*` has a large existing image set — reuse and refresh).
- **Article template:** title, dateline (freshness signal), author, table of contents, MDX
  body, a "key takeaways" box (AEO), related links, CTA. Emits `Article` + `FAQPage` where
  there's Q&A.

---

### 11.11 Pricing

**Route:** `/pricing` ➕ · **Goal:** qualify and convert. **Rendering:** SSG. **JSON-LD:**
`FAQPage` (+ `Offer` if public).

> Decision in §14: publish pricing or stay contact-sales? Recommendation: publish a pricing
> *page* even without hard dollars — people search "CloudVerse pricing" and the page captures
> it. Explain the model and the tiers, lead the CTA with the no-fee proof of value.

- **H1:** "Priced on what you save, not what you spend."
- **Subhead:** "We don't take a cut of your spend growth. Pricing is value-based, and a no-fee proof of value runs first, so you see the return before you commit."
- Tiers _[confirm]_: Starter / Growth / Enterprise, with the feature deltas (modules, SSO/RBAC,
  residency, support, deployment). FAQ + `CTABand`. *Media:* `[MOCKUP]` pricing cards.

---

### 11.12 Book a demo / Connect

**Routes:** `/connect`, `/contact`, `/sign-up` · **Goal:** convert. **Rendering:** SSR/client.

- **H1:** "See where your AI and cloud spend actually goes."
- **Subhead:** "Book a demo or start a no-fee proof of value. Connect your first account in under 30 minutes, read-only to begin with."
- Form: name, work email, company, role (a persona dropdown that routes the follow-up),
  estimated monthly cloud + AI spend _[optional]_, what they want to fix.
- **Trust microcopy:** "Read-only by default. We never write to your accounts without an explicit opt-in."
- Contact splits sales from support; note coverage (US plus India, SEA, Australia).

---

### 11.13 Efficiency Snapshot tool

**Route:** `/efficiency-snapshot` · **Goal:** top-of-funnel magnet — upload a bill, get a read.
**Rendering:** SSR + `/api/parse-invoice` (the Claude-vision invoice analyzer).

- **H1:** "Upload a bill. Get a free read on what's recoverable."
- **Subhead:** "The analyzer reads your cloud or AI invoice and shows where the money's going and what you can get back. Minutes, no account to connect."
- Flow: upload → parse → a summary of categories, anomalies, and estimated recoverable spend →
  CTA into the full proof of value. Note how the file is handled. *Media:* `[MOCKUP]` the upload
  and result UI.

---

### 11.14 Legal & Security

**Routes:** `/legal` → `/legal/privacy`, `/legal/terms`, `/legal/security`; `/security` (trust page).

- **Security page H1:** "Trust by default."
- Content: how data's handled (read-only to start), encryption at rest, RBAC and SSO, audit
  logging, residency, provider-trust governance, certifications (SOC 2 / ISO — *Media:*
  `[LOGO]` `iso.png`, `aicpa.png`, have), subprocessors, the responsible-AI stance. High value
  for enterprise buyers and clean, quotable text for GEO. Linked from the footer and the home
  trust pill.

---

## 12. FAQ bank

Use across pages with `FAQPage` JSON-LD. Each answer opens with a direct sentence (AEO). Pull
more from the persona call-prep questions in the brand streams.

**Home / category:**
- *What is an AI control plane?* — "An AI control plane is the system that governs, routes, and
  meters every AI request across your models and providers. It sets policy and budget before a
  request runs, scores routes while it runs, and records cost and outcome after."
- *How is this different from an AI gateway?* — "A gateway runs the routing rule you wrote. Agentry
  works out what the rule should be, scoring every route live on cost, latency, quality, and
  compliance, and records the cost and outcome of each one."
- *How is it different from LLM observability?* — "Observability tells you what a request cost
  after it ran. Agentry settles that before it does, and enforces budget and policy in real time."
- *Does CloudVerse only do AI, or cloud cost too?* — "Both. Agentry runs the AI. FinOps, Torb, and
  DataX run cloud, engineering, and data on the same platform."
- *How fast is this live?* — "First account connected in under 30 minutes. Most teams find
  something they didn't expect the same day, inside a no-fee, two-to-four-week proof of value."

**Agentry:**
- *How much can Agentry cut AI costs?* — "40–90% on production workloads, and up to 96.8% cheaper
  inference than a hardcoded model in benchmark testing, once routing is in place."
- *Does Agentry add latency?* — "Routing overhead is under 15ms. The routed model is often faster
  than the hardcoded one, 28.5% faster in our benchmark."
- *Which providers does it support?* — "OpenAI, Anthropic, Google Gemini, Cohere, Mistral,
  Llama/Ollama, Together AI, Groq, DeepSeek, HuggingFace, plus private GPU and on-prem."
- *Do we change our application code?* — "No. Agentry sits between your app and your providers.
  Routing and policy change at the rule layer, not in code."
- *Can we automate safely?* — "Yes. Read-only to start, automation opt-in, with an approval
  step and a full audit trail on every action."

**FinOps / Pricing / Security:** build from §11.4, §11.11, §11.14.

---

## 13. Phase 2 — programmatic pages

Deferred, but the IA is built to take them. The biggest growth lever for an AI-category site,
worth starting soon after launch:

- **Comparisons** `/compare/[competitor]` — vs Portkey, Kong, TrueFoundry, LiteLLM, Langfuse,
  Helicone, Maxim, Tyk (Agentry), and Flexera, CloudHealth, Apptio, Finout (FinOps). Honest table,
  "when each one wins," a migration note. Source material is already here: the competitor
  keyword CSVs and `Brand Context/Category Battlecard.docx`.
- **Alternatives** `/[competitor]-alternative` — high-intent capture.
- **Glossary** `/glossary/[term]` — AI control plane, LLM routing, AI FinOps, unit economics,
  the run ledger, GPU optimization, model governance. Pure AEO/GEO.
- **Use cases** `/use-cases/[case]` — the four Agentry use cases, each as a full page.
- All ISR, `Article` + `FAQPage` schema, linked into the hub-and-spoke.

---

## 14. Open decisions

Confirm these early:

1. **Spelling:** flagship module is spelled **Agentry** (one spelling, capitalized as a proper noun). Lock it brand-wide.
2. **Pricing page:** publish conceptual pricing, or contact-sales only? (Recommend publishing — §11.11.)
3. **CMS vs MDX** for blog/resources. (Recommend MDX at launch — §5.3.)
4. **Certifications:** `iso.png` and `aicpa.png` are in the repo, so SOC 2 / ISO appear to
   exist. Confirm current status and exact wording before the badges go up.
5. **Logo rights and legal names** for every named customer, Berkshire Hathaway first.
6. **Benchmark provenance:** keep the methodology for 96.8% / 28.5% / 40–90% documented, for
   when a prospect (or an AI engine) asks "according to what?"
7. **Testimonials:** three real quotes are needed to fill the home component (§8.3, §11.1).
8. **Agentry media:** the flagship needs a hero video and product screenshots produced (§8.3). This
   is the top art dependency for launch.
9. **About:** which leaders and what company facts are public.
10. **Analytics** beyond Mixpanel (GA4 / PostHog), and **i18n** (English-only at launch?).

---

*End of specification v2.0. Keep this file as the source of truth. Bump the version and note
material changes at the top.*
