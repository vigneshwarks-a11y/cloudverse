# Visual Style Guide — page & section patterns

This is the **applied** companion to [DESIGN.md](../DESIGN.md). DESIGN.md defines the
raw system (colors, type ramp, tokens); this doc captures the concrete, reusable
**page patterns** the home and FinOps pages established, so every page's visuals
stay consistent. When this doc and a one-off mockup disagree, this doc wins until
updated.

Rule zero, from [CLAUDE.md](../CLAUDE.md): new sections use `cv-*` tokens and are
**dark/light theme-aware** — never hardcode black/white backgrounds, and never
hardcode ink/line/surface colors. Reach for a token or a `cv-*` utility first.

---

## 1. Module hues

Every surface is keyed to one module color. Use it for the eyebrow pill, accent
rules, chart series, and hover blooms — sparingly, as an accent, never as a fill.

| Module | Hex | Use for |
|---|---|---|
| Signal blue | `#1664C0` (light) / `#7CB8F8` (dark) | Home, FinOps, general/content pages, Torb |
| Agentry purple | `#6954D4` | `/platform/agentry` |
| DataX amber | `#D97706` | `/platform/datax` |
| FinOps teal | `#0E9E7A` | success/healthy states, savings, "good" deltas |
| Danger red | `#E5484D` | anomalies, spend-up deltas, high severity |

These live as `C` in [components/product/finops/kit.tsx](../components/product/finops/kit.tsx)
and as `PILL` accents in [components/PageHero.tsx](../components/PageHero.tsx).

---

## 2. The hero — one component, every page

The canonical hero (home, FinOps, About, Solutions, Platform, Integrations…) is
**[components/PageHero.tsx](../components/PageHero.tsx)**. Do not hand-roll heroes.

**Anatomy (top → bottom, centered):**
1. `HeroSquares` — ambient blinking-squares dotted grid on a **solid surface**
   (`hsl(var(--cv-surface))`), fading top→bottom into the base. Squares are
   `#33469E` (a toned-down blue that reads on both themes).
2. `HeroEyebrow` — rounded, module-tinted pill (uppercase, `tracking-widest`).
3. `<h1 className="cv-h1">` — big balanced headline; highlight a clause with
   `text-cv-blue dark:text-cv-blue-light` (or the module accent).
4. Subhead — `cv-body`, `max-w-[60ch]`, `text-cv-ink/70`.
5. CTAs — centered row: one `cv-btn-primary` + one `cv-btn-ghost`.

**Usage:**
```tsx
<PageHero
  eyebrow="CloudVerse Technology Spend"
  accent="blue"            // "blue" | "purple" | "amber" | "teal"
  title={<>Govern every AI execution. <span className="text-cv-blue dark:text-cv-blue-light">Prove the economics.</span></>}
  subtitle="One system of record for every agent, model route, and dollar of AI spend."
  actions={<>
    <Link href={DEMO_URL} className="cv-btn-primary">Book a demo</Link>
    <Link href="/contact" className="cv-btn-ghost">Request an assessment</Link>
  </>}
>
  {/* optional: full-width content below the centered stack (mockup, links) */}
</PageHero>
```

**Rules**
- Padding rhythm is fixed by the component: `pt-36 pb-16 sm:pt-48 lg:pt-56 lg:pb-24`. Don't override per page.
- The hero background is **solid surface + grid** — not the legacy `cv-hero-bg`
  blue-gradient wash. Any custom hero (forms, two-column) must set
  `style={{ background: "hsl(var(--cv-surface))" }}` and drop in `<HeroSquares />`.
- Match the eyebrow **accent** to the page's module (Platform pages tint; content
  pages use `blue`).
- A product **mockup** (e.g. `PlatformHeroMockup`) renders as the next sibling
  **after** `PageHero`, not inside it — see [app/platform/agentry/page.tsx](../app/platform/agentry/page.tsx).

For special heroes that can't be fully centered (form pages, two-column), import
the pieces directly: `import { HeroSquares, HeroEyebrow } from "@/components/PageHero"`
— see [app/connect/page.tsx](../app/connect/page.tsx).

---

## 3. Section rhythm & headings

- Wrap every section body in `.cv-container` (or `.cv-container-tight`).
- Vertical spacing is `.cv-section` (`py-16 sm:py-20 lg:py-28`). Don't invent ad-hoc paddings.
- Alternate section backgrounds for depth: `bg-cv-surface` ↔ `bg-cv-surface2 dark:bg-black`.
- **Centered section intro** (the standard for a section that isn't the hero):
  ```tsx
  <div className="mx-auto max-w-5xl text-center">
    <p className="cv-label mb-4">Eyebrow</p>
    <h2 className="cv-h2 mx-auto max-w-3xl text-cv-ink">Headline.</h2>
    <p className="mt-5 cv-body-lg text-cv-ink/70">One or two supporting sentences.</p>
  </div>
  ```

**Type ramp** (from [app/globals.css](../app/globals.css) — use the utility, not a literal size):

| Utility | Size | Role |
|---|---|---|
| `cv-h1` | `clamp(28px, 3.8vw, 56px)`, 700 | hero headline only |
| `cv-h2` | `clamp(28px, 3.5vw, 40px)`, 600 | section headline |
| `cv-h3` | `clamp(22px, 2vw, 28px)`, 600 | sub-section |
| `cv-body-lg` | `clamp(16px, 1.3vw, 18px)` | section intro / lead |
| `cv-body` | `16px` | body copy |
| `cv-label` / `cv-eyebrow` | `12px` uppercase, module color | eyebrows |

Body text uses opacity on ink, not a separate gray: `text-cv-ink/70` for supporting
copy, `text-cv-ink/60` for the quietest. Muted labels use `text-cv-muted`.

---

## 4. Buttons

- **Primary CTA:** `cv-btn-primary` (blue fill, arrow optional). One per group.
- **Secondary:** `cv-btn-ghost` (bordered, ink text). Use the bare class — the old
  `!text-cv-ink !border-…` overrides are no longer needed on the solid hero.
- Both are rounded-full, `px-5 py-2.5`, `text-sm font-medium`.

---

## 5. Floating card grid (feature / proof sections)

The reference pattern is **[components/product/ProofInProduction.tsx](../components/product/ProofInProduction.tsx)**:
a headline block + a responsive grid of floating cards, each with a **distinct
product-UI mockup** on top, a bold title, and a 2-line description.

- **Grid:** `grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6` (1 → 2 → 3 columns).
- **Card chrome:** rounded-2xl, one step lighter than the page
  (`bg-cv-surface dark:bg-[#101014]`), soft depth shadow, **no harsh border**
  (`border-cv-line/60 dark:border-white/[0.07]`), subtle `hover:-translate-y-1` lift
  (respect `motion-reduce`).
- **Mockup stage:** fixed height, `overflow-hidden`, content dissolves into the
  card surface at the bottom via a theme-aware fade
  (`from-cv-surface dark:from-[#101014]`).
- **Card title:** `text-lg font-semibold text-cv-ink`. **Description:**
  `text-[15px] leading-relaxed text-cv-ink/60`, two lines.
- **Vary the mockup per card** (chart, list, meters, status pills, badge grid) so a
  grid never feels repetitive.

### Product-visual well (`cv-visual-well`)

The house treatment for a **product-visual / mockup container**: a **pure-black
surface in dark mode** (`dark:bg-black`) with a **bright top-left light edge** —
a 135° gradient stroke masked to a 1.5px border, brightest at the upper-left
corner and fading out by mid-card. Add the `cv-visual-well` utility class
alongside `dark:bg-black`; light mode keeps its normal `border`. Reserve it for
substantial visual/mockup wells (the kit `GlassCard`, the domain/proof cards,
the before/after comparison panels) — **not** small stat tiles or plain text
cards, where the lit edge reads as busy. Mirrors the home "mock-well" chrome
(`components/home/cardChrome.tsx`).

---

## 6. Product-UI mockups — the kit

Every "screenshot-like" visual is composed from the presentational primitives in
**[components/product/finops/kit.tsx](../components/product/finops/kit.tsx)** — never a
stock icon or a real screenshot. Read
[the charts-lib memory / notes](../components/product/finops/kit.tsx) before using them.

| Primitive | What it is |
|---|---|
| `GlassCard` | frosted floating card w/ optional glow + tilt |
| `CardHead` | window header: colored dot + mono title + right slot |
| `StatusPill` | tinted status chip (`Healthy`, `Live`, severity…) |
| `Tag` | mono micro-tag |
| `Kpi` / `Meter` | KPI tile / labelled progress bar |
| `AreaChart` / `Bars` | inline SVG smoothed area chart / bar chart w/ flag |
| `Avatar` / `MiniBtn` | initials avatar / pill button |

**Mockup micro-type convention:** inside mockups, use the small mono sizes
(`text-[10px]/[11px]/[12px]`, `font-mono`) and `text-[15px]` for card body copy.
These sit intentionally **off** the main type ramp — they represent a "slice of
product UI," and the design linter should treat them as accepted here (they match
`kit.tsx` and `DomainDepth.tsx`). Do not use these micro sizes in ordinary page copy.

---

## 7. Dark / light & accessibility

- Design **both themes** every time. Backgrounds via tokens
  (`bg-cv-surface`, `bg-cv-surface2 dark:bg-black`); text via `text-cv-ink` + opacity.
- Accents carry a lighter dark-mode variant so contrast holds on black (e.g. blue
  `#1664C0` → `#7CB8F8`) — the `PILL` map in PageHero is the pattern to copy.
- All motion (`hover:-translate-y-1`, blinking squares, blooms) must degrade under
  `motion-reduce:` / `prefers-reduced-motion`.
- Wide content (tables, charts, code) scrolls inside its own `overflow-x` container;
  the page body never scrolls sideways.

---

## 8. Do / Don't

**Do**
- Use `PageHero` for every hero; match the eyebrow accent to the module.
- Keep sections on `.cv-section` + `.cv-container`; center the intro block.
- Compose visuals from the mockup kit; vary them across a grid.
- Use `cv-*` type utilities and ink-opacity for hierarchy.

**Don't**
- Hardcode `#000`/`#fff`/gray hex for backgrounds or text.
- Re-introduce the blue-gradient `cv-hero-bg` wash on new heroes.
- Put a literal font-size on ordinary page copy (mockup micro-type is the only exception).
- Nest cards inside cards inside cards, or fill a card with a solid module color.

---

## 9. Tables (comparison / data matrices)

The reference pattern is **[components/home/NotAGateway.tsx](../components/home/NotAGateway.tsx)**
("How Agentry compares") and **[components/product/NamedCustomers.tsx](../components/product/NamedCustomers.tsx)**.
A real `<table>` down to `sm` (640px), a stacked card per row below it — never a
table squeezed to illegibility, and never a bespoke card shell reinvented per page.

- **Tablet+ (`sm` and up): keep the table.** Wrap it in its own
  `overflow-x-auto overflow-y-hidden` container (never let the page body scroll
  sideways — same rule as §7). The first column (row header) is `sticky left-0
  z-10` with an opaque background (`bg-cv-surface2 dark:bg-[#0D0D0D]` for the
  header cell, `bg-cv-surface dark:bg-black` / `bg-cv-surface2 dark:bg-white/[0.02]`
  for zebra'd row cells) so it doesn't go transparent under the scrolling body.
- **Row striping:** alternate rows via `bg-cv-surface2 dark:bg-white/[0.02]` (sticky
  column) and a faint `bg-cv-ink/[0.012] dark:bg-white/[0.015]` wash on the other
  cells — never a hardcoded gray.
- **Mobile (`<sm`): convert to stacked cards**, one per row, same chrome as the
  floating card grid (§5): `rounded-2xl border border-cv-line/60 bg-cv-surface
  p-5 dark:border-white/[0.07] dark:bg-[#101014]`. Do **not** reach for the
  mockup kit's `GlassCard` here — that primitive carries `cv-visual-well`, which
  §5 reserves for substantial visual/mockup wells, not plain data rows.
  - Row/entity name as the card title: `text-lg font-semibold text-cv-ink`.
  - Each remaining column as a `dt`/`dd` label:value line, label in
    `text-cv-ink/60`, value using the same cell content/formatting as the table
    (reuse the table's own cell-rendering helper, e.g. `CompCell` — don't
    re-derive the "not covered" mark or tag chips separately).
  - If one column is the "featured" / own-product answer (e.g. the Agentry
    column), highlight its row with the page's module accent color
    (`text-[#1664C0] dark:text-[#7CB8F8]` for Torb/Agentry-blue, or the current
    module hue) on a faint tinted background — the same accent treatment the
    table's own featured column already uses, not a new color.
  - Toggle table vs. cards with `hidden sm:block` / `sm:hidden` on the two
    containers — don't conditionally render based on JS viewport checks.
- **Numeric-only tables** (e.g. the ROI "at scale" savings tables in
  `CostOfNotRouting.tsx` / `AgentryRoiSplit.tsx`) are exempt from the
  stacked-card conversion: they're narrow (`min-w-[440px]`), already scroll
  inside their own container per §7, and stacking 3–4 numbers per row into a
  card reduces scanability rather than improving it. Reserve the card
  conversion for tables with substantial per-cell text (capability names,
  descriptions, tags).
- Table micro-type (`text-[11px]`/`text-[13px]`/`text-[14px]` for headers/cells)
  sits off the main type ramp, same accepted exception as the mockup kit's
  micro-type (§6) — don't flag it, don't use it outside tables.
