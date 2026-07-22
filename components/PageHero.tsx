/* Shared page hero — the site-wide hero treatment: a plain cv-hero-bg
   gradient wrapper (no dotted-grid overlay) with a left-aligned eyebrow
   pill → big headline → subhead → left-aligned CTAs. Used across content,
   solution, and platform pages so every hero shares one look. cv-* tokens,
   theme-aware. */

import type { ReactNode } from "react";

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
  return (
    <span
      className={
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm " +
        PILL[accent]
      }
    >
      {children}
    </span>
  );
}

export function PageHero({
  eyebrow,
  accent = "blue",
  title,
  subtitle,
  actions,
  children,
  className = "",
}: {
  eyebrow?: ReactNode;
  accent?: HeroAccent;
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  /** Optional content rendered full-width below the centered stack (mockups, etc.). */
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={"cv-hero-bg " + className} style={{ background: "hsl(var(--cv-surface))" }}>
      <section className="relative pt-36 pb-16 sm:pt-48 lg:pt-56 lg:pb-24">
        <div className="max-w-cv relative z-10 mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {eyebrow && <HeroEyebrow accent={accent}>{eyebrow}</HeroEyebrow>}
            <h1 className="cv-h1 mt-4 text-balance leading-[1.08] text-cv-ink">{title}</h1>
            {subtitle && (
              <p className="cv-body mt-6 max-w-[60ch] text-pretty text-cv-ink/70 sm:mt-7">{subtitle}</p>
            )}
            {actions && (
              <div className="mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:gap-4">
                {actions}
              </div>
            )}
          </div>
          {children}
        </div>
      </section>
    </div>
  );
}

export default PageHero;
