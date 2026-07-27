"use client";

/* Home hero — on-load entrance stagger: eyebrow → headline → subhead → CTAs,
   each fading up into place. Pure load animation (no ScrollTrigger). Elements
   start hidden via the `.hero-anim` class in CSS so there is no flash of
   final-position content before GSAP runs; reduced-motion just reveals them. */

import Link from "next/link";
import { HeroEyebrow } from "@/components/PageHero";
import { SplitHeading } from "@/components/SplitHeading";
import { useHeroReveal } from "@/lib/useHeroReveal";
import { DEMO_URL } from "@/lib/links";

export function HomeHero() {
  const scope = useHeroReveal<HTMLElement>();

  return (
    <section ref={scope} className="relative pt-44 pb-28 sm:pt-56 sm:pb-32 lg:pt-72 lg:pb-40">
      <div className="max-w-cv relative z-10 mx-auto flex flex-col items-center px-5 text-center sm:px-6 lg:px-8">
        <div className="hero-anim">
          <HeroEyebrow accent="blue">The Enterprise AI Control Plane</HeroEyebrow>
        </div>
        <SplitHeading className="cv-h1 mt-6 text-balance leading-[1.08] text-cv-ink text-[length:clamp(34px,4.8vw,72px)]">
          Govern every AI execution.{" "}
          <span className="text-cv-blue dark:text-cv-blue-light">Prove the economics behind it.</span>
        </SplitHeading>
        <p className="hero-anim cv-body mt-6 max-w-[60ch] text-pretty text-cv-ink/70 text-[length:clamp(17px,1.4vw,20px)]">
          One system of record for every agent, model route, prompt, and dollar of AI spend, with governance enforced in the execution path, not a report after the fact.
        </p>
        {/* Full-width stacked pills on mobile (filled, not hugging their own
            text) via items-stretch; reverts to the hug-content/inline row
            from sm up via sm:items-center. Padding trimmed on mobile only —
            the shared cv-btn-primary/cv-btn-ghost classes (used site-wide)
            keep their default px-7 py-4 at sm+. w-full is explicit here
            because the parent stack above is itself `items-center` (for the
            centered eyebrow/heading/paragraph) — without it, this row would
            just shrink-wrap to its widest child instead of the page edge. */}
        <div className="hero-anim mt-10 w-full flex flex-col items-stretch gap-3 sm:mt-12 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
          <Link
            href={DEMO_URL}
            className="cv-btn-primary px-5 py-3 sm:px-7 sm:py-4"
            data-testid="link-hero-demo"
          >
            Book a demo
          </Link>
          <Link
            href="/contact"
            className="cv-btn-ghost px-5 py-3 sm:px-7 sm:py-4"
            data-testid="link-hero-audit"
          >
            Request a free AI cost &amp; risk audit
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
