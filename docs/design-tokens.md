# CloudVerse Design Tokens

Single source of truth for all design decisions. Update this file first — then propagate to `globals.css` and `tailwind.config.ts`.

---

## 1. Color Tokens

### 1.1 Semantic Tokens

Semantic tokens map to light/dark mode values. Use these in code, never raw hex.

| Token | Tailwind Class | Light Value | Dark Value | Usage |
|-------|---------------|-------------|------------|-------|
| `bg-primary` | `bg-cv-surface` | `#ffffff` | `#000000` | Page background |
| `bg-secondary` | `bg-cv-surface2` | `#fbfbfd` | `#1c1c1e` | Alternate section bg |
| `bg-card` | `bg-cv-card` | `#f7f7f9` | `#070710` | Card / panel bg |
| `text-primary` | `text-cv-ink` | `#1d1d1f` | `#f5f5f7` | Body & heading text |
| `text-muted` | `text-cv-muted` | `#86868b` | `#a1a1a6` | Secondary / helper text |
| `border-default` | `border-cv-line` | `#e5e5e5` | `#38383a` | Dividers, card borders |
| `accent` | `text-cv-blue` | `#1664C0` | `#1664C0` | Primary CTA, links |
| `accent-bright` | `text-cv-blue-bright` | `#2278E0` | `#2278E0` | Hover states |
| `accent-light` | `text-cv-blue-light` | `#1664C0` *(light)* | `#7CB8F8` | Accent text on dark bg |
| `accent-fill` | `bg-cv-blue-fill` | `#E8F3FF` | `#0d1e3a` | Tinted accent bg |
| `success` | — | `#0E9E7A` | `#0E9E7A` | Positive states |
| `warning` | — | `#D97706` | `#D97706` | Warning states |
| `danger` | — | `#DC2626` | `#EF4444` | Error / destructive |
| `purple` | `text-cv-purple` | `#6954D4` | `#6954D4` | Agentry module accent |

> **Contrast rule:** For light mode use `#1664C0` for blue text (passes WCAG AA). For dark mode use `#7CB8F8`. Never use `#7CB8F8` on a white/light background.

---

### 1.2 Brand Blue Scale (`#2278E0` base)

Full 50–900 scale derived from the primary brand blue.

| Token | Hex | Usage |
|-------|-----|-------|
| `blue-50` | `#EBF4FF` | Tinted background fills |
| `blue-100` | `#D6E9FF` | Light chip/badge bg |
| `blue-200` | `#ADD3FF` | Hover fills |
| `blue-300` | `#7CB8F8` | Accent text on dark bg |
| `blue-400` | `#4D9AEF` | Interactive states |
| `blue-500` | `#2278E0` | **Primary brand blue** |
| `blue-600` | `#1664C0` | CTA buttons, links |
| `blue-700` | `#1255A8` | Pressed / active state |
| `blue-800` | `#0D3E7A` | Deep accent |
| `blue-900` | `#071F3D` | Near-black navy tint |

---

## 2. Typography Tokens

**Font families:**
- **Heading + Body:** `Inter` → `var(--font-inter)`, fallback `system-ui, sans-serif`
- Loaded via `next/font/google` (preloaded, zero render-blocking)
- Headings: weight 600–700 | Body: 400–500

### Type Scale

| Token | Class | Font Size | Line Height | Font Weight | Usage |
|-------|-------|-----------|-------------|-------------|-------|
| `display` | `.cv-h1` | `clamp(1.75rem, 3.8vw, 3.5rem)` | `1.07` | `600` | Hero headline |
| `h1` | `.cv-h1` | `clamp(1.75rem, 3.8vw, 3.5rem)` | `1.07` | `600` | Page title |
| `h2` | `.cv-h2` | `clamp(1.5rem, 2.8vw, 2.5rem)` | `1.15` | `600` | Section heading |
| `h3` | `.cv-h3` | `1.25rem` (20px) | `1.3` | `600` | Card title |
| `h4` | — | `1rem` (16px) | `1.4` | `600` | Sub-heading |
| `body-lg` | `.cv-body-lg` | `1.125rem` (18px) | `1.7` | `400` | Hero description |
| `body` | — | `1rem` (16px) | `1.6` | `400` | Default body copy |
| `body-sm` | — | `0.9375rem` (15px) | `1.6` | `400` | Card body text |
| `caption` | — | `0.75rem` (12px) | `1.5` | `500` | Labels, captions |
| `label` | `.cv-label` | `0.6875rem` (11px) | `1` | `600` | Eyebrow / overline |

**Letter spacing:**
| Token | Value | Usage |
|-------|-------|-------|
| `tracking-h1` | `-0.02em` | H1 / display |
| `tracking-h2` | `-0.015em` | H2 |
| `tracking-body` | `-0.02em` | Global body (set on `<body>`) |
| `tracking-label` | `+0.25em` | Uppercase labels / eyebrows |

---

## 3. Spacing Tokens

Base unit: `4px` (0.25rem). All spacing uses multiples of this base.

| Token | Name | rem | px | Tailwind |
|-------|------|-----|-----|---------|
| `space-0` | None | `0` | `0px` | `p-0` |
| `space-1` | XXS | `0.25rem` | `4px` | `p-1` |
| `space-2` | XS | `0.5rem` | `8px` | `p-2` |
| `space-3` | SM | `0.75rem` | `12px` | `p-3` |
| `space-4` | MD | `1rem` | `16px` | `p-4` |
| `space-5` | LG | `1.25rem` | `20px` | `p-5` |
| `space-6` | XL | `1.5rem` | `24px` | `p-6` |
| `space-8` | 2XL | `2rem` | `32px` | `p-8` |
| `space-10` | 3XL | `2.5rem` | `40px` | `p-10` |
| `space-12` | 4XL | `3rem` | `48px` | `p-12` |
| `space-16` | 5XL | `4rem` | `64px` | `p-16` |
| `space-20` | 6XL | `5rem` | `80px` | `p-20` |
| `space-24` | 7XL | `6rem` | `96px` | `p-24` |
| `space-32` | 8XL | `8rem` | `128px` | `p-32` |

**Section padding:** `py-14 sm:py-16 lg:py-20` (via `.cv-section`)
**Container max-width:** `1240px` (via `.cv-container`)
**Container padding:** `1.25rem` mobile → `1.5rem` sm → `5rem` lg

---

## 4. Radius Tokens

| Token | Value (rem) | Value (px) | Tailwind | Usage |
|-------|-------------|------------|----------|-------|
| `radius-none` | `0` | `0px` | `rounded-none` | Sharp edges, governance grid cells |
| `radius-sm` | `0.25rem` | `4px` | `rounded` | Inline chips, small badges |
| `radius-md` | `0.5rem` | `8px` | `rounded-lg` | Input fields, small cards |
| `radius-lg` | `0.75rem` | `12px` | `rounded-xl` | Nav dropdowns, filter pills |
| `radius-xl` | `1rem` | `16px` | `rounded-2xl` | Cards, panels, stat boxes |
| `radius-2xl` | `1.25rem` | `20px` | `rounded-[20px]` | `.cv` custom radius, large panels |
| `radius-3xl` | `1.5rem` | `24px` | `rounded-3xl` | Hero wrapper bottom corners |
| `radius-full` | `9999px` | `—` | `rounded-full` | Buttons (pill), avatars, dots |

---

## 5. Ready-to-Use Code

### CSS Custom Properties (`globals.css`)

```css
:root {
  /* Backgrounds */
  --cv-surface:   0 0% 100%;       /* #ffffff */
  --cv-surface2:  240 4% 98%;      /* #fbfbfd */
  --cv-card:      240 4% 97%;      /* #f7f7f9 */

  /* Text */
  --cv-ink:       240 3% 12%;      /* #1d1d1f */
  --cv-muted:     240 2% 46%;      /* #86868b */

  /* Border */
  --cv-line:      240 5% 90%;      /* #e5e5e5 */
}

.dark {
  --cv-surface:   0 0% 0%;         /* #000000 */
  --cv-surface2:  240 4% 11%;      /* #1c1c1e */
  --cv-card:      240 40% 4%;      /* #070710 */
  --cv-ink:       0 0% 98%;        /* #f5f5f7 */
  --cv-muted:     240 2% 63%;      /* #a1a1a6 */
  --cv-line:      240 5% 26%;      /* #38383a */
}

/* Brand blue scale */
:root {
  --blue-50:  #EBF4FF;
  --blue-100: #D6E9FF;
  --blue-200: #ADD3FF;
  --blue-300: #7CB8F8;
  --blue-400: #4D9AEF;
  --blue-500: #2278E0;   /* primary */
  --blue-600: #1664C0;   /* CTA / links */
  --blue-700: #1255A8;
  --blue-800: #0D3E7A;
  --blue-900: #071F3D;
}

/* Status colors */
:root {
  --color-success: #0E9E7A;
  --color-warning: #D97706;
  --color-danger:  #DC2626;
  --color-purple:  #6954D4;
}
```

### Tailwind Config Extension (`tailwind.config.ts`)

```ts
extend: {
  colors: {
    cv: {
      ink:      "hsl(var(--cv-ink))",
      muted:    "hsl(var(--cv-muted))",
      line:     "hsl(var(--cv-line))",
      surface:  "hsl(var(--cv-surface))",
      surface2: "hsl(var(--cv-surface2))",
      card:     "hsl(var(--cv-card))",
      blue: {
        DEFAULT: "#1664C0",
        50:  "#EBF4FF",
        100: "#D6E9FF",
        200: "#ADD3FF",
        300: "#7CB8F8",
        400: "#4D9AEF",
        500: "#2278E0",
        600: "#1664C0",
        700: "#1255A8",
        800: "#0D3E7A",
        900: "#071F3D",
      },
      teal:    "#0E9E7A",
      purple:  "#6954D4",
      amber:   "#D97706",
      danger:  "#DC2626",
    },
  },
  fontSize: {
    "cv-display": ["clamp(1.75rem, 3.8vw, 3.5rem)", { lineHeight: "1.07", fontWeight: "600" }],
    "cv-h2":      ["clamp(1.5rem, 2.8vw, 2.5rem)",  { lineHeight: "1.15", fontWeight: "600" }],
    "cv-h3":      ["1.25rem",                         { lineHeight: "1.3",  fontWeight: "600" }],
    "cv-body-lg": ["1.125rem",                        { lineHeight: "1.7",  fontWeight: "400" }],
    "cv-body-sm": ["0.9375rem",                       { lineHeight: "1.6",  fontWeight: "400" }],
    "cv-caption": ["0.75rem",                         { lineHeight: "1.5",  fontWeight: "500" }],
    "cv-label":   ["0.6875rem",                       { lineHeight: "1",    fontWeight: "600" }],
  },
  borderRadius: {
    cv:    "1.25rem",   /* 20px — default card radius */
    "cv-lg": "1.5rem",  /* 24px — hero/section wrapper */
  },
  letterSpacing: {
    "cv-h1":    "-0.02em",
    "cv-h2":    "-0.015em",
    "cv-label": "0.25em",
  },
}
```

---

> **Rule:** When adding a new component, pick tokens from this file. If a value is not here, add it here first before using it in code.
