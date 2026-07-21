---
name: CloudVerse
description: The control plane for enterprise AI — a flat, instrument-precise marketing system in Inter, keyed by module color.
colors:
  signal-blue: "#1664C0"
  blue-bright: "#2278E0"
  blue-light: "#7CB8F8"
  blue-fill: "#E8F3FF"
  navy: "#050F1C"
  aix-purple: "#6954D4"
  finops-teal: "#0E9E7A"
  datax-amber: "#D97706"
  ink-light: "#1D1D1F"
  ink-dark: "#F5F5F7"
  muted-light: "#86868B"
  muted-dark: "#A1A1A6"
  line-light: "#E5E5E5"
  line-dark: "#38383A"
  surface-light: "#FFFFFF"
  surface-dark: "#000000"
  surface2-light: "#FBFBFD"
  card-light: "#F7F7F9"
  card-dark: "#070710"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(28px, 3.8vw, 56px)"
    fontWeight: 700
    lineHeight: 1.07
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(28px, 3.5vw, 40px)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(22px, 2vw, 28px)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: "-0.02em"
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.25em"
rounded:
  sm: "6px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  pill: "9999px"
spacing:
  section-y: "clamp(64px, 8vw, 112px)"
  container: "1240px"
  content: "1120px"
components:
  button-primary:
    backgroundColor: "{colors.signal-blue}"
    textColor: "{colors.surface-light}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.blue-bright}"
    textColor: "{colors.surface-light}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-light}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  button-inverse:
    backgroundColor: "{colors.ink-light}"
    textColor: "{colors.surface-light}"
    rounded: "{rounded.sm}"
    padding: "6px 16px"
  card:
    backgroundColor: "{colors.surface2-light}"
    textColor: "{colors.ink-light}"
    rounded: "{rounded.lg}"
    padding: "24px"
  eyebrow:
    textColor: "{colors.signal-blue}"
    typography: "{typography.label}"
---

# Design System: CloudVerse

## 1. Overview

**Creative North Star: "The Control Room"**

CloudVerse is the control plane for enterprise AI, and the site should feel like standing in one: calm command over real complexity. The canvas is quiet — pure white or pure black — and the signal comes from precise, glowing instruments laid on top of it: cost meters, allocation bars, anomaly charts, ring gauges, run ledgers. Nothing decorates; every element on screen is an instrument reading something real. Boldness comes from clarity and live data, not from loud color fields or ornament.

Color is how the room stays legible. Each domain owns a channel — AIX purple, DevX blue, FinOps teal, DataX amber — so a glance tells you which system you're looking at. Type is a single voice, Inter, worked hard across weight and size rather than paired with a second family. Depth is deliberately suppressed: surfaces sit flat, and the eye is drawn by contrast and color, not by shadow.

This system explicitly rejects the look of legacy FinOps and IT-cost tooling — Apptio, Flexera, CloudHealth, Finout — which lean on dense gray dashboards and enterprise-beige chrome. It equally rejects the two interchangeable AI-SaaS reflexes: the cream/sand editorial-restraint page and the navy-and-gold fintech page. CloudVerse is neither soft nor safe; it's instrument-precise and confident.

**Key Characteristics:**
- Pure light/dark canvas; color reserved for meaning, never for background wash.
- One family (Inter) across the whole scale; hierarchy from weight and size.
- Flat surfaces; depth from tonal layering and hairline borders.
- Module hues (purple / blue / teal / amber) as a consistent domain-coding system.
- Product visuals are real instruments (charts, meters, ledgers), not stock art.

## 2. Colors

A near-monochrome ink-on-canvas base, charged by one signal blue and four module accents used strictly for domain coding.

### Primary
- **Signal Blue** (#1664C0): The CloudVerse brand accent and DevX's module color. Carries the primary button, section eyebrows (light mode), links, focus, and the connective glows/wires that tie sections together. In dark mode the accent lightens to **Sky Signal** (#7CB8F8) for contrast; hover deepens to **Bright Signal** (#2278E0). **Blue Fill** (#E8F3FF) is the faint tint behind selected/active blue states.

### Secondary
- **AIX Purple** (#6954D4): The AI module. Leads because AIX is the headline; used for AI-domain charts, tags, and accents.
- **FinOps Teal** (#0E9E7A): The FinOps module and the site's "good outcome / reconciled / savings" color (spend down, healthy, on-policy).
- **DataX Amber** (#D97706): The Data module and the site's "attention / anomaly / spike" color.

### Tertiary
- **Deep Navy** (#050F1C): A near-black structural tone for occasional deep panels; not a body background.

### Data-viz sequential ramps
When a single-hue breakdown needs more than one shade (e.g. a cost-by-service donut), step **lighter tints of the domain hue** rather than reaching for unrelated colors. The sanctioned Cloud ramp is **#2278E0 → #4E93E8 → #84B6F0 → #B7D6F7** (darkest = largest slice). Each domain composes its own ramp from its base hue on the same lightness cadence; these tints are for chart fills only, never for text or chrome.

### Neutral
- **Ink** (#1D1D1F light / #F5F5F7 dark): Primary text and high-emphasis marks. Body copy uses opacity steps of Ink (65–80%) rather than a separate gray, to hold contrast.
- **Muted** (#86868B light / #A1A1A6 dark): Small labels and metadata only. Not for reading-length body text on light backgrounds — its contrast on white is ~3.6:1.
- **Line** (#E5E5E5 light / #38383A dark): Hairline borders and dividers, usually at 60–70% opacity.
- **Surface** (#FFFFFF light / #000000 dark): The page canvas. Dark mode is pure black.
- **Surface-2** (#FBFBFD light / #000000 dark): Alternating section background; in dark mode it collapses to pure black, so section rhythm in dark comes from borders, not fills.
- **Card** (#F7F7F9 light / #070710 dark): Tile/panel surface.

### Named Rules
**The Canvas-Is-Quiet Rule.** The page background is pure white or pure black — never a tinted wash, never cream. All color enters as an instrument reading or a domain code, never as decoration.

**The Domain-Code Rule.** Purple means AI, blue means cloud/DevX, teal means FinOps and good outcomes, amber means data and anomalies. A hue never means two things on the same screen; color always pairs with a label or icon so it is never the sole carrier of meaning.

**The Muted-Is-For-Labels Rule.** Muted gray is for 10–12px labels and metadata only. Reading-length text uses Ink at 65–80% opacity, never `muted` on a light surface.

## 3. Typography

**Display Font:** Inter (with system-ui, sans-serif)
**Body Font:** Inter (same family)
**Label/Mono Font:** Inter, with tabular figures (`tnum`) for numeric readouts

**Character:** One family, worked hard. Inter is self-hosted with alternate letterforms switched on site-wide — single-story `a` (`cv11`), open 6/9 (`cv03`/`cv04`), and tabular numerals — which gives it a cleaner, more mechanical read than default Inter without introducing a second typeface. Hierarchy comes entirely from weight, size, and tight tracking. Headings carry a −0.02em tracking and `text-wrap: balance`.

### Hierarchy
- **Display** (700, clamp 28→56px, 1.07): Hero and page H1s only. One per page.
- **Headline** (600, clamp 28→40px, 1.15): Section H2s.
- **Title** (600, clamp 22→28px, 1.2): Card and subsection H3s.
- **Body** (500, 16px, 1.6): Default copy. `body-lg` bumps to clamp 16→18px for section leads. Body weight is 500, not 400 — the site runs slightly heavier for presence. Cap reading measure at 65–75ch.
- **Label** (600, 12px, +0.25em, uppercase): Eyebrows and micro-labels. Signal Blue in light, Sky Signal in dark.

### Named Rules
**The One-Family Rule.** Inter carries everything. Do not introduce a second font to signal "display" or "technical" — weight and size do that work. A mono look, when needed, is Inter with `tnum`, not a mono family.

**The Heavy-Body Rule.** Body text is weight 500. Reserve 400 for nothing; reserve 700 for Display and inline emphasis inside body copy.

## 4. Elevation

Flat by default. Surfaces sit on the canvas with no resting shadow; depth is read from tonal layering (surface → surface-2 → card) in light mode and from hairline borders in dark mode, where every surface is pure black. The energy that would come from shadow instead comes from color: domain-tinted top hairlines on tiles and soft radial glows behind key instruments.

### Shadow Vocabulary
The single sanctioned exception is the floating **product mockup** (the glass instrument cards in the FinOps kit), which may carry one soft ambient shadow to lift it off the page — `0 18px 44px -24px rgba(16,24,40,0.28)` in light, `0 30px 70px -28px rgba(0,0,0,0.75)` in dark — and a domain-tinted glow on hover. This is a contained, deliberate effect for "here is the real product," not a general card treatment.

### Named Rules
**The Flat-By-Default Rule.** Cards, sections, and panels are flat at rest. If you reach for a `box-shadow` to separate a normal card from the page, use a border or a surface-tone step instead. Shadow is reserved for floating product instruments and appears nowhere else.

**The Glow-Not-Drop Rule.** Emphasis and life come from color glow (radial blue/module bloom) and domain-tinted hairlines, not from drop shadows.

## 5. Components

### Buttons
- **Shape:** Full pill (`9999px`) for marketing CTAs; small 6px radius for compact nav/utility buttons.
- **Primary:** Signal Blue (#1664C0) background, white text, pill, `10px 20px`. The one high-emphasis action ("Book a demo").
- **Hover / Focus:** Background deepens to Bright Signal (#2278E0) via a color transition only (no lift, no scale). Focus shows a visible ring.
- **Ghost:** Transparent with a hairline `line` border, ink text, pill. Fills to `line/50%` on hover. Used for "Sign in" and secondary actions.
- **Inverse / Outline:** Ink-background (or hairline-outline) compact buttons at 6px radius for in-app-style nav chrome; adapt to theme via tokens.

### Chips / Tags / Pills
- **Style:** Rounded tag with a color-tinted background at ~10–14% of the domain hue and matching colored text (e.g. `color: teal; background: teal/10%`). Status pills add a leading dot.
- **State:** Semantic by color — teal for healthy/reconciled, amber for anomaly/attention, purple/blue for domain tags. Never gray text on the tint.

### Cards / Containers
- **Corner Style:** 16px (`rounded-2xl`) for section tiles; 12px for inner panels.
- **Background:** surface-2 / card in light, pure black (#070710 card) in dark.
- **Shadow Strategy:** None at rest (see Elevation). A domain-tinted top hairline and an optional hover corner-glow provide emphasis. Hover may translate the card up by 1px.
- **Border:** Hairline `line` at 60% (light) or white at 8–10% (dark).
- **Internal Padding:** 24px (`p-6`), 28px (`lg:p-7`) on larger tiles.

### Inputs / Fields
- **Style:** Hairline `line` border, surface background, rounded to match panels.
- **Focus:** Border shifts to Signal Blue with a soft blue ring; never remove the focus indicator.

### Navigation
- **Style:** Transparent top bar over the hero, ink text, Inter medium. AIX is featured first (purple tile). Primary CTA "Book a demo" as the blue pill; "Sign in" as ghost. Active/hover links shift toward Signal Blue.

### Signature Component — Product Instruments (FinOps kit)
The glass instrument cards (`components/product/finops/kit.tsx`) — cost meters, allocation bars, area/bar/ring charts, KPI tiles, status pills, run-ledger rows — are the site's signature pattern. They are cropped slices of real product UI, theme-aware, colored by domain hue, and the one place ambient shadow + glow is allowed. Treat them as the proof layer: when a claim needs backing, show an instrument, not an adjective.

## 6. Do's and Don'ts

### Do:
- **Do** keep the page canvas pure white or pure black; let color enter only as an instrument reading or a domain code.
- **Do** code domains by hue consistently: purple = AI, blue = cloud/DevX, teal = FinOps/good, amber = data/anomaly — always paired with a label or icon.
- **Do** carry all type in Inter, using weight and size for hierarchy; keep headings at −0.02em with `text-wrap: balance`.
- **Do** set reading-length body text in Ink at 65–80% opacity, weight 500, capped at 65–75ch.
- **Do** convey depth with tonal steps (surface → surface-2 → card) and hairline borders; reserve shadow for floating product instruments.
- **Do** honor `prefers-reduced-motion` on every animation with a crossfade or instant fallback.

### Don't:
- **Don't** look like legacy FinOps tooling — Apptio, Flexera, CloudHealth, Finout — with dense gray dashboards and enterprise-beige chrome.
- **Don't** fall into either AI-SaaS reflex: no cream/sand editorial-restraint background, no interchangeable navy-and-gold fintech palette.
- **Don't** use `muted` gray for reading-length body text on a light surface (≈3.6:1; fails AA). Labels only.
- **Don't** use gradient text (`background-clip: text`) on headings or metrics; use a single solid color, emphasis via weight and size.
- **Don't** add resting drop shadows to normal cards; if a card needs separation, use a border or a surface-tone step.
- **Don't** introduce a second font family, and don't tint the page background to signal "warmth" — warmth lives in accent and copy, not the canvas.
- **Don't** write copy with the banned tells from spec §3 ("not just X but Y", rule-of-three adjectives, power words like leverage/seamless/robust, em-dash overuse).
