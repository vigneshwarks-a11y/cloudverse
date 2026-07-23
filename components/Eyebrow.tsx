/* Canonical section-eyebrow pill — the single source of truth for the badge
   used above in-page section headings (as opposed to HeroEyebrow in
   PageHero.tsx, which is the bordered/backdrop-blur variant reserved for
   full-bleed hero sections). SectionHeading, SectionEyebrow (solutions
   pages), and every hand-rolled section badge on the site should render
   through this component so the pill shape/padding and the GSAP
   ScrambleText scramble-in animation never drift between sections. */

import { ScrambleText } from "@/components/ScrambleText";

/* Module hues — pill tint per surface. Static full class strings (not
   composed at runtime) so Tailwind's JIT keeps them. */
export const EYEBROW_PILL: Record<"blue" | "purple" | "amber" | "teal", string> = {
  blue: "bg-[#1664C0]/15 text-[#1664C0] dark:bg-[#7CB8F8]/15 dark:text-[#7CB8F8]",
  purple: "bg-[#6954D4]/15 text-[#6954D4] dark:bg-[#A99CF0]/15 dark:text-[#A99CF0]",
  amber: "bg-[#D97706]/15 text-[#D97706] dark:bg-[#F0B366]/15 dark:text-[#F0B366]",
  teal: "bg-[#0E9E7A]/15 text-[#0E9E7A] dark:bg-[#5FD3B4]/15 dark:text-[#5FD3B4]",
};

export type EyebrowAccent = keyof typeof EYEBROW_PILL;

export function Eyebrow({
  children,
  accent = "blue",
  className = "",
}: {
  children: string;
  accent?: EyebrowAccent;
  className?: string;
}) {
  return (
    <ScrambleText
      text={children}
      className={
        "mb-4 inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest " +
        EYEBROW_PILL[accent] +
        " " +
        className
      }
    />
  );
}

export default Eyebrow;
