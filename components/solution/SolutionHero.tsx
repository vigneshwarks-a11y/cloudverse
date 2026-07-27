import Link from "next/link";
import { ArrowRight } from "@/lib/solar-icons";
import { DEMO_URL } from "@/lib/links";
import { PageHero, type HeroAccent } from "@/components/PageHero";

/* Shared Solutions-page hero — now the site-wide centered hero: eyebrow pill,
   big headline, subhead, and centered CTAs over the ambient dotted-grid field.
   Kept deliberately plain (no icon graphic, no badge row) so every vertical
   reads as the same page family. */
export function SolutionHero({
  eyebrow,
  h1,
  sub,
  platformHref,
  accent = "blue",
  platformLabel = "Explore the platform",
  primaryLabel = "Book a demo",
  primaryHref = DEMO_URL,
}: {
  eyebrow: string;
  h1: React.ReactNode;
  sub: string;
  platformHref: string;
  accent?: HeroAccent;
  platformLabel?: string;
  primaryLabel?: string;
  primaryHref?: string;
}) {
  return (
    <PageHero
      centered
      eyebrow={eyebrow}
      accent={accent}
      title={h1}
      subtitle={sub}
      sectionPadding="pt-44 pb-28 sm:pt-56 sm:pb-32 lg:pt-72 lg:pb-40"
      titleClassName="text-[length:clamp(34px,4.8vw,72px)]"
      subtitleClassName="text-[length:clamp(17px,1.4vw,20px)]"
      actions={
        <>
          <Link href={primaryHref} className="cv-btn-primary px-5 py-3 sm:px-7 sm:py-4">
            <span>{primaryLabel}</span>
            <ArrowRight weight="Linear" size={16} />
          </Link>
          <Link href={platformHref} className="cv-btn-ghost px-5 py-3 sm:px-7 sm:py-4">
            {platformLabel}
          </Link>
        </>
      }
    />
  );
}
