import Link from "next/link";
import { ArrowRight } from "@/lib/solar-icons";
import { DEMO_URL } from "@/lib/links";
import { PageHero } from "@/components/PageHero";

/* Shared Solutions-page hero — now the site-wide centered hero: eyebrow pill,
   big headline, subhead, and centered CTAs over the ambient dotted-grid field.
   Kept deliberately plain (no icon graphic, no badge row) so every vertical
   reads as the same page family. */
export function SolutionHero({
  eyebrow,
  h1,
  sub,
  platformHref,
  platformLabel = "Explore the platform",
  primaryLabel = "Book a demo",
  primaryHref = DEMO_URL,
}: {
  eyebrow: string;
  h1: React.ReactNode;
  sub: string;
  platformHref: string;
  platformLabel?: string;
  primaryLabel?: string;
  primaryHref?: string;
}) {
  return (
    <PageHero
      eyebrow={eyebrow}
      accent="blue"
      title={h1}
      subtitle={sub}
      actions={
        <>
          <Link href={primaryHref} className="cv-btn-primary">
            <span>{primaryLabel}</span>
            <ArrowRight weight="Linear" size={16} />
          </Link>
          <Link href={platformHref} className="cv-btn-ghost">
            {platformLabel}
          </Link>
        </>
      }
    />
  );
}
