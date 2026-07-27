"use client";

/* Shared page hero — the site-wide hero treatment: a plain cv-hero-bg gradient
   wrapper (no dotted-grid overlay). Two-column, left-aligned split: eyebrow →
   big headline → CTAs on the left, subhead on the right (vertically centered),
   collapsing to a single stacked column below lg. Used across content,
   solution, and platform pages so every hero shares one look. cv-* tokens,
   theme-aware.

   Entrance: eyebrow, subtitle, and actions fade up on load via the shared
   `.hero-anim` treatment (see useHeroReveal / HomeHero) — the headline itself
   gets its own word-reveal from SplitHeading. */

import type { ReactNode } from "react";
import { ScrambleText } from "@/components/ScrambleText";
import { SplitHeading } from "@/components/SplitHeading";
import { useHeroReveal } from "@/lib/useHeroReveal";

/* Module accents — pill tint per surface. Static full class strings (not
   composed at runtime) so Tailwind's JIT keeps them. Base hue drives light
   mode; a lighter variant carries dark mode so contrast holds on black. */
const PILL: Record<"blue" | "purple" | "amber" | "teal", string> = {
  blue: "border-[#1664C0]/25 bg-[#1664C0]/[0.08] text-[#1664C0] dark:border-[#7CB8F8]/25 dark:bg-[#7CB8F8]/[0.08] dark:text-[#7CB8F8]",
  purple: "border-[#6954D4]/25 bg-[#6954D4]/[0.08] text-[#6954D4] dark:border-[#A99CF0]/25 dark:bg-[#A99CF0]/[0.08] dark:text-[#A99CF0]",
  amber: "border-[#D97706]/25 bg-[#D97706]/[0.08] text-[#D97706] dark:border-[#F0B366]/25 dark:bg-[#F0B366]/[0.08] dark:text-[#F0B366]",
  teal: "border-[#0E9E7A]/25 bg-[#0E9E7A]/[0.08] text-[#0E9E7A] dark:border-[#5FD3B4]/25 dark:bg-[#5FD3B4]/[0.08] dark:text-[#5FD3B4]",
};

export type HeroAccent = keyof typeof PILL;

/* Eyebrow pill — rounded, module-tinted, matches the reference hero chip. */
export function HeroEyebrow({ children, accent = "blue" }: { children: ReactNode; accent?: HeroAccent }) {
  const className =
    "inline-flex items-center rounded-lg border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm " +
    PILL[accent];
  // Scramble-in when the badge text is a plain string (the site-wide case);
  // fall back to a plain span for any rich ReactNode eyebrow.
  return typeof children === "string" ? (
    <ScrambleText text={children} className={className} />
  ) : (
    <span className={className}>{children}</span>
  );
}

export function PageHero({
  eyebrow,
  accent = "blue",
  title,
  subtitle,
  actions,
  children,
  fullHeight = false,
  centered = false,
  className = "",
  titleClassName = "",
  subtitleClassName = "",
  sectionPadding,
}: {
  eyebrow?: ReactNode;
  accent?: HeroAccent;
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  /** Optional content rendered full-width below the split (mockups, etc.). */
  children?: ReactNode;
  /** Fill the viewport (min-height 100dvh) with content vertically centered. */
  fullHeight?: boolean;
  /** Centered, vertically-stacked layout (eyebrow → headline → subhead → CTAs,
   *  all centered) — the home-hero treatment — instead of the default
   *  two-column split (headline left, subhead right). */
  centered?: boolean;
  className?: string;
  /** Extra classes appended after the default cv-h1 headline classes — for a
   *  page-specific size override without touching every PageHero caller. */
  titleClassName?: string;
  /** Extra classes appended after the default cv-body subtitle classes. */
  subtitleClassName?: string;
  /** Override the section's default vertical padding — pass the home hero's
   *  taller values (pt-44 pb-28 sm:pt-56 sm:pb-32 lg:pt-72 lg:pb-40) to make
   *  the shared cv-hero-bg gradient stretch over the same height as the home
   *  hero, so it reads as the same ambient wash instead of a compressed band. */
  sectionPadding?: string;
}) {
  const scope = useHeroReveal<HTMLDivElement>();
  const padding = sectionPadding || "pt-36 pb-16 sm:pt-48 lg:pt-56 lg:pb-24";
  if (centered) {
    return (
      <div ref={scope} className={"cv-hero-bg " + (fullHeight ? "cv-hero-full " : "") + className}>
        <section className={"relative " + padding}>
          <div className="max-w-cv relative z-10 mx-auto flex flex-col items-center px-5 text-center sm:px-6 lg:px-8">
            {eyebrow && <div className="hero-anim"><HeroEyebrow accent={accent}>{eyebrow}</HeroEyebrow></div>}
            <SplitHeading className={"cv-h1 mt-6 text-balance leading-[1.08] text-cv-ink " + titleClassName}>{title}</SplitHeading>
            {subtitle && (
              <p className={"hero-anim cv-body mt-6 max-w-[60ch] text-pretty text-cv-ink/70 " + subtitleClassName}>{subtitle}</p>
            )}
            {/* items-stretch fills each action full-width on mobile instead
                of hugging its own text; sm:items-center reverts to the
                hug-content inline row from sm up. w-full is explicit because
                the parent stack above is itself `items-center` (for the
                centered eyebrow/heading/subtitle) — without it, this row
                would just shrink-wrap to its widest child instead of
                stretching to the page edge. */}
            {actions && (
              <div className="hero-anim mt-10 w-full flex flex-col items-stretch gap-3 sm:mt-12 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
                {actions}
              </div>
            )}
            {children}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div ref={scope} className={"cv-hero-bg " + (fullHeight ? "cv-hero-full " : "") + className}>
      <section className={"relative " + padding}>
        <div className="max-w-cv relative z-10 mx-auto px-5 sm:px-6 lg:px-8">
          {/* Eyebrow on top */}
          {eyebrow && <div className="hero-anim"><HeroEyebrow accent={accent}>{eyebrow}</HeroEyebrow></div>}
          {/* Headline + subhead grouped in one row (headline left, subhead
              right, top-aligned; stacks below lg) */}
          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
            <SplitHeading className={"cv-h1 text-balance leading-[1.08] text-cv-ink lg:flex-1 " + titleClassName}>{title}</SplitHeading>
            {subtitle && (
              <p className={"hero-anim cv-body max-w-[60ch] text-pretty text-cv-ink/70 lg:w-96 lg:shrink-0 lg:pt-2 " + subtitleClassName}>{subtitle}</p>
            )}
          </div>
          {/* items-stretch fills each action full-width on mobile instead
              of hugging its own text; sm:items-center reverts to the
              hug-content inline row from sm up. */}
          {actions && (
            <div className="hero-anim mt-10 flex flex-col items-stretch gap-3 sm:mt-12 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              {actions}
            </div>
          )}
          {children}
        </div>
      </section>
    </div>
  );
}

export default PageHero;
