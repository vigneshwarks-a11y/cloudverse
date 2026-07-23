"use client";

/* Home hero — on-load entrance stagger: eyebrow → headline → subhead → CTAs,
   each fading up into place. Pure load animation (no ScrollTrigger). Elements
   start hidden via the `.hero-anim` class in CSS so there is no flash of
   final-position content before GSAP runs; reduced-motion just reveals them. */

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { HeroEyebrow } from "@/components/PageHero";
import { SplitHeading } from "@/components/SplitHeading";
import { DEMO_URL } from "@/lib/links";

export function HomeHero() {
  const scope = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const targets = gsap.utils.toArray<HTMLElement>(".hero-anim");
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduce) {
        gsap.set(targets, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.to(targets, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.1,
      });
    },
    { scope },
  );

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
        <div className="hero-anim mt-10 flex flex-col items-center gap-3 sm:mt-12 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
          <Link href={DEMO_URL} className="cv-btn-primary" data-testid="link-hero-demo">
            Book a demo
          </Link>
          <Link href="/contact" className="cv-btn-ghost" data-testid="link-hero-audit">
            Request a free AI cost &amp; risk audit
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
