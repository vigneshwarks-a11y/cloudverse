"use client";

/* Home hero — on-load entrance stagger: eyebrow → headline → subhead → CTAs,
   each fading up into place. Pure load animation (no ScrollTrigger). Elements
   start hidden via the `.hero-anim` class in CSS so there is no flash of
   final-position content before GSAP runs; reduced-motion just reveals them. */

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { HeroEyebrow } from "@/components/PageHero";
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
    <section ref={scope} className="relative pt-36 pb-16 sm:pt-48 lg:pt-56 lg:pb-24">
      <div className="max-w-cv relative z-10 mx-auto px-5 sm:px-6 lg:px-8">
        <div className="hero-anim">
          <HeroEyebrow accent="blue">The Enterprise AI Control Plane</HeroEyebrow>
        </div>
        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <h1 className="hero-anim cv-h1 text-balance leading-[1.08] text-cv-ink lg:flex-1">
            Govern every AI execution.{" "}
            <span className="text-cv-blue dark:text-cv-blue-light">Prove the economics behind it.</span>
          </h1>
          <p className="hero-anim cv-body max-w-[60ch] text-pretty text-cv-ink/70 lg:w-80 lg:shrink-0 lg:pt-2">
            One system of record for every agent, model route, prompt, and dollar of AI spend, with governance enforced in the execution path, not a report after the fact.
          </p>
        </div>
        <div className="hero-anim mt-10 flex flex-col items-start gap-3 sm:mt-12 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
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
