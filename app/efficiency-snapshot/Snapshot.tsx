"use client";

import { InvoiceEfficiency } from "@/components/home/InvoiceEfficiency";
import { CTABand } from "@/components/CTABand";
import { HeroEyebrow } from "@/components/PageHero";
import { SplitHeading } from "@/components/SplitHeading";
import { useHeroReveal } from "@/lib/useHeroReveal";

export default function Snapshot() {
  const scope = useHeroReveal<HTMLElement>();

  return (
    <>
      <section ref={scope} className="cv-hero-bg pt-[120px] sm:pt-[160px] pb-12 lg:pt-[240px] lg:pb-14 relative">
        <div className="cv-container relative z-10">
          <div className="max-w-3xl text-left">
            <div className="hero-anim mb-4"><HeroEyebrow accent="blue">Efficiency snapshot</HeroEyebrow></div>
            <SplitHeading className="cv-h1 text-cv-ink">
              Upload a cloud invoice. Get an <span className="text-cv-blue dark:text-cv-blue-light">actionable savings report</span> in 30 seconds.
            </SplitHeading>
            <p className="hero-anim cv-body-lg mt-6 text-cv-ink/75 max-w-2xl mx-auto">
              Drop in any AWS, Azure, GCP, Snowflake, or Databricks invoice (CSV or TXT). We surface your top savings opportunities. not just a chart of what you spent.
            </p>
          </div>
        </div>
      </section>

      <InvoiceEfficiency />

      <CTABand heading="Want this same analysis on live cloud data?" sub="Connect your account read-only. we'll surface the full picture in under 30 minutes." />
    </>
  );
}
