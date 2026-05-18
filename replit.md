# replit.md

## Overview

CloudVerse is the marketing website for the Compute Economics Platform for the AI Era — multi-cloud, AI, infrastructure, and warehouse spend on one control plane. Targets enterprise FinOps, AI engineering, platform engineering, data teams, and the office of the CIO. Built on Next.js 15 App Router with React 19, TypeScript, and Tailwind CSS v3. Dark-default theme preserved from the original brand.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Stack
- **Framework**: Next.js 15 App Router (server mode — keeps the OpenAI invoice analyzer working)
- **Runtime**: React 19, TypeScript, Node.js
- **Styling**: Tailwind CSS v3 with `cv-*` design tokens
- **Fonts**: Syne (display) + DM Sans (body) via `next/font/google` — zero CLS
- **AI**: OpenAI `gpt-4o-mini` for invoice analysis via the `OPENAI_API_KEY` secret

### Design system
- **Module accents**: FinOps `#1664C0`, AIX `#6954D4`, DevX `#0E9E7A`, DataX `#D97706`
- **Tokens**: `cv-navy`, `cv-blue`, `cv-blue-light`, `cv-amber`, `cv-teal`, `cv-surface`, `cv-surface2`, `cv-ink`, `cv-muted`, `cv-line`
- **Layout primitives**: `cv-container` (max-w-cv, padded), `cv-section` (vertical rhythm), `cv-hero-bg`
- **Buttons**: `cv-btn-primary`, `cv-btn-ghost`
- **Typography classes**: `cv-h1`, `cv-h2`, `cv-h3`, `cv-body-lg`, `cv-label`

### Directory layout
```
app/                          App Router routes
  layout.tsx                  Root layout, fonts, Organization JSON-LD, GTM placeholder
  page.tsx                    Homepage (9 sections per Brief §6)
  platform/{finops,aix,devx,datax}/page.tsx
  solutions/page.tsx          Solutions index
  solutions/{finops-teams,ai-engineering,platform-eng,data-teams,enterprise}/page.tsx
  integrations/page.tsx
  events/page.tsx
  resources/page.tsx
  resources/[slug]/page.tsx   Article detail (static params)
  about/page.tsx
  connect/page.tsx            Demo booking
  contact/page.tsx            Contact channels
  sign-up/page.tsx
  efficiency-snapshot/page.tsx  Client invoice upload UI
  legal/page.tsx
  api/parse-invoice/route.ts    OpenAI gpt-4o-mini invoice analyzer
  sitemap.ts, robots.ts, llms.txt
components/                   Reusable UI
  Nav.tsx, Footer.tsx, CTABand.tsx, FaqBlock.tsx, ArchitectureFlow.tsx
  product/                    Product-page sections (Hero, FeatureShowcase, Capabilities, etc.)
  solution/                   Solution-page sections (Hero, Outcomes, ModulesUsed)
lib/
  links.ts                    Centralized routes (DEMO_URL, SIGNIN_URL, NAV)
  modules.ts                  Module metadata (color, name, href, tagline)
  resources.ts                Article corpus + getResource()
```

### Pages (20 total)
- Homepage, Solutions index
- 4 product pages: `/platform/finops|aix|devx|datax`
- 5 solutions pages: `/solutions/finops-teams|ai-engineering|platform-eng|data-teams|enterprise`
- `/integrations`, `/events`, `/resources` + `/resources/[slug]`
- `/about`, `/connect`, `/contact`, `/sign-up`, `/efficiency-snapshot`, `/legal`

### Redirects
- `/about-us` → `/about` (308)
- `/blog` → `/resources` (308)
- `/platform` → `/platform/finops` (308)
- `/signin` → `https://id.cloudverse.ai` (307)
- `/demo` → `/connect` (307)

### SEO
- Per-page `generateMetadata` with canonical URLs
- `Organization` JSON-LD in root layout
- `SoftwareApplication` + `FAQPage` JSON-LD on every product page
- `Article` JSON-LD on every resource detail page
- `sitemap.xml` (25 URLs — static + dynamic resources)
- `robots.ts`, `llms.txt`

### Invoice analyzer
- Route: `POST /api/parse-invoice` (multipart form, field `file`)
- Model: `gpt-4o-mini` (override with `OPENAI_MODEL`)
- Returns normalized `InvoiceAnalysisResult` (score, top services/regions/line items, savings opportunities, insights)
- Client UI: `/efficiency-snapshot` (client component, drag-drop CSV/TXT)
- Same response shape as the legacy Gemini parser — ported to OpenAI

### External destinations
- Sign-in: `https://id.cloudverse.ai`
- Demo booking: handled in-app at `/connect` (was previously HubSpot)

### Build & dev
- Dev: `npm run dev` → `next dev -H 0.0.0.0 -p 5000`
- Build: `npm run build`
- Start: `npm run start` → `next start -H 0.0.0.0 -p 5000`

### Required env
- `OPENAI_API_KEY` — invoice analyzer
- `NEXT_PUBLIC_SITE_URL` — canonical/OG base (defaults to `https://cloudverse.ai`)
- `NEXT_PUBLIC_GTM_ID` — optional GTM injection

## Migration history

The site was migrated from a Vite/React/Wouter + Express stack to Next.js 15 App Router per Brief v3.0 (May 2026). The legacy `client/`, `server/`, `shared/`, and Vite config were removed once all routes were ported. The dark-default theme and `cv-*` token system were preserved verbatim. The OpenAI fallback path that was already commented into the legacy Gemini parser became the new primary implementation.
