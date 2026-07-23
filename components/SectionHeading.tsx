/* Shared subsection header — the site-wide "lead-in" rhythm. The eyebrow pill
   sits on top; below it, the heading and the supporting intro paragraph are
   grouped together in one row (heading LEFT, intro RIGHT, top-aligned),
   collapsing to a stacked left-aligned column below lg. When no intro is
   passed it renders a single left-aligned heading block (no empty column).
   cv-* tokens, theme-aware. Server component. */

import type { ReactNode } from "react";
import { Eyebrow, type EyebrowAccent } from "@/components/Eyebrow";

export type SectionAccent = EyebrowAccent;

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
      {eyebrow && <Eyebrow accent={accent}>{eyebrow}</Eyebrow>}
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
