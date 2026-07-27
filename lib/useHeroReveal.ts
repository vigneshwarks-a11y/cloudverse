"use client";

/* Shared hero entrance: fades + slides up every `.hero-anim` descendant of the
   returned scope, staggered, on mount. Elements start hidden via the
   `.hero-anim` CSS class (see globals.css) so there's no flash of
   final-position content before GSAP runs; reduced-motion just reveals them
   immediately. Used by every hero across the site (see HomeHero, PageHero). */

import { useRef, type RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function useHeroReveal<T extends HTMLElement = HTMLElement>(): RefObject<T | null> {
  const scope = useRef<T | null>(null);

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

  return scope;
}
