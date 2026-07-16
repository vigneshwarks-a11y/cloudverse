import Link from "next/link";
import { ArrowRight } from "@/lib/solar-icons";
import { DEMO_URL } from "@/lib/links";

/* Shared Solutions-page hero — the FinOps Teams layout is the source of
   truth: eyebrow + headline + CTAs on the left, a short subhead on the
   right. No icon graphic, no badge row — kept deliberately plain so every
   vertical reads as the same page family. */
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
    <div className="cv-hero-bg">
      <section className="pt-[140px] sm:pt-[180px] pb-16 lg:pt-[260px] lg:pb-24 relative">
        <div className="cv-container relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-20">
            <div className="flex-1 min-w-0 lg:max-w-3xl xl:max-w-4xl">
              <p className="cv-label mb-5">{eyebrow}</p>
              <h1 className="cv-h1 text-cv-ink">{h1}</h1>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={primaryHref} className="cv-btn-primary">
                  <span>{primaryLabel}</span>
                  <ArrowRight weight="Linear" size={16} />
                </Link>
                <Link
                  href={platformHref}
                  className="cv-btn-ghost !text-cv-ink !border-cv-ink/30 hover:!border-cv-ink/60 hover:!bg-cv-ink/10 dark:!text-white dark:!border-white/40 dark:hover:!border-white/70 dark:hover:!bg-white/10"
                >
                  {platformLabel}
                </Link>
              </div>
            </div>

            <div className="mt-10 lg:mt-0 lg:max-w-xs xl:max-w-sm shrink-0">
              <p className="cv-body text-cv-ink/70">{sub}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
