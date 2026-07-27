"use client";

import Link from "next/link";
import { DEMO_URL } from "@/lib/links";
import { HeroEyebrow } from "@/components/PageHero";
import { SplitHeading } from "@/components/SplitHeading";
import { useHeroReveal } from "@/lib/useHeroReveal";

export function NotFoundHero() {
  const scope = useHeroReveal<HTMLElement>();

  return (
    <section ref={scope} className="cv-hero-bg min-h-[70vh] flex items-center pt-[120px] sm:pt-[160px] lg:pt-[240px] pb-20">
      <div className="cv-container relative z-10 text-center max-w-2xl mx-auto">
        <div className="hero-anim mb-3"><HeroEyebrow accent="blue">Error 404</HeroEyebrow></div>
        <SplitHeading className="cv-h1 text-cv-ink">This page is being rebuilt.</SplitHeading>
        <p className="hero-anim cv-body-lg mt-5 text-cv-ink/70">
          The site is in the middle of a migration to the new compute economics platform. Most pages are rolling out shortly.
        </p>
        <div className="hero-anim mt-8 flex flex-col items-stretch gap-3 justify-center sm:flex-row sm:flex-wrap sm:items-center">
          <Link href="/" className="cv-btn-primary px-5 py-3 sm:px-7 sm:py-4">Back to home</Link>
          <Link href={DEMO_URL} className="cv-btn-ghost px-5 py-3 sm:px-7 sm:py-4">Get a Demo</Link>
        </div>
      </div>
    </section>
  );
}

export default NotFoundHero;
