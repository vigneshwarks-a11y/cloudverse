# CloudVerse Font Style — Portable Recipe

The exact typography setup used on the CloudVerse site. Copy this into any new
project (Next.js App Router assumed; notes below for plain CSS / other stacks).

## What it is
- **Typeface:** Inter — the **official rsms.me build** (variable), **NOT** Google
  Fonts. This matters: the Google Fonts / `next/font/google` / `@fontsource`
  builds of Inter **strip the `cvXX`/`ssXX` OpenType character-variant features**.
  Only the official build contains them.
- **Alternate letterforms applied site-wide** via `font-feature-settings`:
  - `cv11` → single-story **a** (no top hook) ← the signature look
  - `cv03` → open **6**, `cv04` → open **9**, `cv09` → flat-top **3**
  - `blwf` → harmless no-op for Latin (complex-script feature; kept for parity)
  - `tnum` → tabular figures (equal-width digits; keeps number columns/counters
    from jittering)
- **Letter-spacing:** `-0.02em` on body + headings (tight, modern).
- Weights used: 400 / 500 / 600 / 700 / 800 (the variable file covers 100–900).

## Step 1 — Get the font files (official build)
Download the variable woff2 files and put them in `app/fonts/`:

```bash
mkdir -p app/fonts
curl -sL "https://rsms.me/inter/font-files/InterVariable.woff2?v=4.1"        -o app/fonts/InterVariable.woff2
curl -sL "https://rsms.me/inter/font-files/InterVariable-Italic.woff2?v=4.1" -o app/fonts/InterVariable-Italic.woff2
```

> Verify they contain the features (optional): a full build reports ~39 GSUB
> features incl. `cv03 cv04 cv09 cv11`. The Google build reports only
> `calt ccmp dnom frac locl numr pnum tnum` — if you see that, it's the wrong file.

## Step 2 — Load via next/font/local (`app/layout.tsx`)
```tsx
import localFont from "next/font/local";

const inter = localFont({
  src: [
    { path: "./fonts/InterVariable.woff2",        weight: "100 900", style: "normal" },
    { path: "./fonts/InterVariable-Italic.woff2", weight: "100 900", style: "italic" },
  ],
  variable: "--font-inter",
  display: "swap",
});

// on <html>:  <html className={inter.variable}>
```

## Step 3 — Global CSS (`app/globals.css`, inside `@layer base`)
```css
html, body {
  font-feature-settings: 'cv03' on, 'cv04' on, 'cv09' on, 'cv11' on, 'blwf' on, 'tnum' on;
}
body {
  font-family: var(--font-inter), system-ui, sans-serif;
  letter-spacing: -0.02em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```
`font-feature-settings` is an inherited property, so setting it on `html, body`
cascades to every element automatically.

## Step 4 — Tailwind mapping (`tailwind.config.ts`) — optional
```ts
theme: { extend: { fontFamily: {
  sans:    ["var(--font-inter)", "system-ui", "sans-serif"],
  display: ["var(--font-inter)", "system-ui", "sans-serif"],
  mono:    ["var(--font-inter)", "system-ui", "sans-serif"],
} } }
```

## Non-Next / plain HTML variant
Skip Steps 2 & 4. Self-host the two woff2 files and declare them:
```css
@font-face {
  font-family: "Inter";
  src: url("/fonts/InterVariable.woff2") format("woff2");
  font-weight: 100 900; font-style: normal; font-display: swap;
}
@font-face {
  font-family: "Inter";
  src: url("/fonts/InterVariable-Italic.woff2") format("woff2");
  font-weight: 100 900; font-style: italic; font-display: swap;
}
html, body {
  font-family: "Inter", system-ui, sans-serif;
  font-feature-settings: 'cv03' on, 'cv04' on, 'cv09' on, 'cv11' on, 'blwf' on, 'tnum' on;
  letter-spacing: -0.02em;
}
```

## One-line ask for a future project / another AI
> "Use the official rsms.me **Inter Variable** build (self-hosted, not Google
> Fonts — the Google build strips the features), loaded via `next/font/local`
> as `--font-inter`, and add globally on `html, body`:
> `font-feature-settings: 'cv03' on, 'cv04' on, 'cv09' on, 'cv11' on, 'blwf' on, 'tnum' on;`
> plus `letter-spacing: -0.02em`. The `cv11` gives the single-story 'a'."
