/* Shared subsection header — the site-wide "lead-in" rhythm. The eyebrow pill
   sits on top; below it, the heading and the supporting intro paragraph are
   grouped together in one row (heading LEFT, intro RIGHT, top-aligned),
   collapsing to a stacked left-aligned column below lg. When no intro is
   passed it renders a single left-aligned heading block (no empty column).
   cv-* tokens, theme-aware. Server component. */

import type { ReactNode } from "react";

/* Eyebrow pill tint per surface — static full class strings so Tailwind's JIT
   keeps them. Matches the inline eyebrows used across the site. */
const PILL: Record<"blue" | "purple" | "amber" | "teal", string> = {
  blue: "bg-[#1664C0]/15 text-[#1664C0] dark:bg-[#7CB8F8]/15 dark:text-[#7CB8F8]",
  purple: "bg-[#6954D4]/15 text-[#6954D4] dark:bg-[#A99CF0]/15 dark:text-[#A99CF0]",
  amber: "bg-[#D97706]/15 text-[#D97706] dark:bg-[#F0B366]/15 dark:text-[#F0B366]",
  teal: "bg-[#0E9E7A]/15 text-[#0E9E7A] dark:bg-[#5FD3B4]/15 dark:text-[#5FD3B4]",
};

export type SectionAccent = keyof typeof PILL;

export function SectionHeading({
  eyebrow,
  accent = "blue",
  title,
  children,
  lead = false,
  className = "",
}: {
  eyebrow?: string;
  accent?: SectionAccent;
  title: ReactNode;
  /** Supporting intro paragraph — rendered as the right column. */
  children?: ReactNode;
  /** Use the larger cv-body-lg size for the intro (platform pages). */
  lead?: boolean;
  className?: string;
}) {
  return (
    <div className={"text-left " + className}>
      {eyebrow && (
        <span
          className={
            "mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest " +
            PILL[accent]
          }
        >
          {eyebrow}
        </span>
      )}
      {children ? (
        // Header + intro grouped in one row: heading left, intro right,
        // top-aligned; stacks to a single column below lg.
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-16">
          <h2 className="cv-h2 text-balance text-cv-ink lg:flex-1">{title}</h2>
          <div className={(lead ? "cv-body-lg" : "cv-body") + " text-pretty text-cv-ink/70 lg:w-full lg:max-w-xl lg:shrink-0 lg:pt-1"}>
            {children}
          </div>
        </div>
      ) : (
        <h2 className="cv-h2 max-w-3xl text-balance text-cv-ink">{title}</h2>
      )}
    </div>
  );
}

export default SectionHeading;
