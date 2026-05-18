# replit.md

## Overview

CloudVerse is a marketing website for a cloud financial management SaaS platform. The site targets enterprise Finance, Engineering, and IT teams, showcasing features like multi-cloud cost visibility, allocation/chargeback, anomaly detection, and automated optimization. Built with a React frontend and Express backend, the site follows Apple Developer-style aesthetics (minimal, calm, product-led) with dark mode as the default theme.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Current state: Mid-migration to Next.js 15 (Brief v3.0)
The site is being migrated from Vite/React/Wouter/Express to Next.js 15 App Router per Brief v3.0. Phase 1 complete (homepage live on new stack). See `.local/session_plan.md` for phase plan. Old `client/`, `server/`, `vite.config.ts` retained until Phase 4 ports the few preserved pages (`/contact`, `/sign-up`, `/efficiency-snapshot`).

### Frontend Architecture (new — Next.js 15)
- **Framework**: Next.js 15 App Router, React 19, TypeScript
- **Routing**: File-based App Router (`app/` directory)
- **Styling**: Tailwind CSS v3 with custom design tokens (dark-default theme preserved)
- **Fonts**: Syne (display) + DM Sans (body) via `next/font/google` — zero CLS
- **Module accents**: blue #1664C0 (FinOps), purple #6954D4 (AIX), teal #0E9E7A (DevX), amber #D97706 (DataX)

### Frontend Architecture (legacy — being phased out)
- **Framework**: React 19 with TypeScript, built using Vite
- **Routing**: Wouter (lightweight client-side routing)
- **Styling**: Tailwind CSS v4 with custom design tokens for CloudVerse branding
- **Components**: Shadcn/ui components (Radix primitives) with custom CloudVerse components
- **State Management**: TanStack React Query for server state; local React state for UI
- **Theme**: next-themes for dark/light mode toggle (dark mode default)

### Design System
- **Typography tokens**: `cv-h1`, `cv-h2`, `cv-h3`, `cv-body`, `cv-cap` defined in CSS
- **Spacing tokens**: `cv-sec-xl` (88px), `cv-sec-lg` (64px), `cv-sec-md` (44px)
- **Color tokens**: `cv-ink`, `cv-muted`, `cv-line`, `cv-surface`, `cv-surface2`
- **Container utilities**: Unified `max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8` pattern across all pages

### Backend Architecture
- **Runtime**: Node.js with Express
- **API Pattern**: RESTful routes prefixed with `/api`
- **Static Serving**: Express serves the Vite-built frontend from `dist/public`
- **Database**: PostgreSQL via Drizzle ORM (schema in `shared/schema.ts`)
- **Storage Layer**: Abstracted via `IStorage` interface with in-memory fallback

### Build System
- **Client**: Vite builds to `dist/public`
- **Server**: esbuild bundles server to `dist/index.cjs`
- **Scripts**: `npm run dev` for development, `npm run build` for production

### Key Pages
- Home (hero, outcomes panel, customer logos)
- Platform, Solutions, Integrations, Pricing, Security, Company
- Resources (with nested routes for guides/docs)
- Contact, Partners (new), Help (new)
- Redirects: `/about-us` → `/company`, `/blog` → `/resources`
- External redirects: `/signin` → CloudVerse ID, `/demo` → HubSpot meetings

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connected via `DATABASE_URL` environment variable
- **Drizzle ORM**: Schema management and queries
- **drizzle-kit**: Database migrations (`npm run db:push`)

### Third-Party Services
- **Authentication**: External auth at https://id.cloudverse.ai
- **Demo Booking**: HubSpot at https://meetings.hubspot.com
- **Tracking**: Vendor-agnostic abstraction in `lib/track.ts` (ready for GTM/GA/PostHog integration)
- **Fonts**: `@fontsource/inter` for Inter typeface

### UI Libraries
- **Radix UI**: Full suite of accessible primitives (dialog, dropdown, tabs, etc.)
- **Lucide React**: Icon library
- **cmdk**: Command palette component
- **date-fns**: Date formatting utilities

### Replit-Specific
- `@replit/vite-plugin-runtime-error-modal`: Error overlay in development
- `@replit/vite-plugin-cartographer` and `@replit/vite-plugin-dev-banner`: Development helpers
- Custom `vite-plugin-meta-images`: Updates OpenGraph meta tags with Replit deployment URLs

## Recent Updates (Latest)

### Navigation (SiteNav.tsx)
- Unified container: `max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8`
- Consistent height: `h-16 lg:h-[72px]`
- Smart scroll detection: transparent by default, solid with backdrop blur when scrolled
- Improved text contrast: `text-white/80` default, `text-white` on hover
- External CTAs: Sign in (https://id.cloudverse.ai), Book a demo (https://meetings.hubspot.com)
- Mobile drawer: Full nav + CTAs in sheet at bottom

### Hero Section (Home.tsx)
- Improved spacing: `pt-16 sm:pt-20 lg:pt-24` and `pb-10 sm:pb-14 lg:pb-16`
- Layout: `grid grid-cols-1 lg:grid-cols-12` with 6-3-3 column distribution (copy, outcomes, logos)
- Copy locked as specified
- Outcomes panel: Crossfading between two sets every 6 seconds (opacity only)
- Platform icons + AI/GPU providers in right panel
- CTAs wired: Book demo → external HubSpot, Watch tour → anchor to #tour

### Customer Logos
- Responsive sizing: `h-7 md:h-8`
- Flex layout with wrapping: `flex flex-wrap gap-x-10 gap-y-6`
- Hover opacity: `opacity-80 hover:opacity-100`
- Better spacing on mobile/tablet

### Links Helper (lib/links.ts)
- Centralized URL configuration
- Constants: `SIGNIN_URL`, `DEMO_URL`, `ROUTES` object
- Used throughout app for consistency

### New Pages
- **Partners** (/partners): Partner interest form
- **Help** (/help): FAQ accordion with support link

### All Pages (Responsive Pass)
- Unified container pattern across all pages
- Consistent spacing: `py-12 md:py-16 lg:py-20` for sections
- Theme-aware colors: using `bg-cv-surface2`, `border-cv-line` instead of hardcoded grays
- Mobile-first responsive design (375px, 768px, 1280px+ verified)
- No horizontal overflow at any breakpoint

### Comprehensive Theme Fix (Latest)
- Replaced all hardcoded dark-theme colors with theme-aware tokens
- `text-white` → `text-cv-ink` (adapts to light/dark)
- `text-white/70`, `text-white/80` → `text-cv-muted` or `text-cv-ink/80`
- `border-white/10` → `border-cv-line`
- `bg-white/5`, `bg-white/[0.04]` → `bg-cv-surface2/50 dark:bg-white/5`
- All pages and components now work correctly in both light and dark modes
- Blue CTA buttons intentionally keep white text for accessibility

### Invoice Efficiency Section
- AI-powered invoice parsing with gpt-4o-mini (Replit AI) or gpt-3.5-turbo fallback
- Premium modal design showing score, snapshot, top spend chips, line items, and AI insights
- Savings range display: "Estimated savings potential: X% – Y%"
- Section spacing reduced by ~30-40% for tighter homepage layout

### Homepage Two-Column Layout (Latest)
- Category positioning: "Compute Economics Platform for the AI Era"
- Two-column grid below hero: `lg:grid-cols-[1fr_340px]`
- Left column: all content sections scroll normally
- Right column: sticky `DemoFormSidebar` component (`position: sticky; top: 96px`)
- Mobile/tablet: single column, demo form shown above content sections
- DemoFormSidebar: compact form with name, email, date/time fields + CheckCircle trust signals
- Highlights with blue border glow after 600px scroll depth
- Inner section containers simplified (removed redundant `max-w-[1240px]` wrappers inside grid)
- Components updated: `InvoiceEfficiencySection`, `HowItWorks`, `DeploymentOptions` containers simplified
