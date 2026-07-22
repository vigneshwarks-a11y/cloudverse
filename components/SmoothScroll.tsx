"use client";

/* Site-wide smooth scrolling via GSAP ScrollSmoother. Wraps the scrollable
   page content in the required #smooth-wrapper > #smooth-content structure.
   The fixed <Nav> stays OUTSIDE this wrapper (ScrollSmoother transforms the
   content, which would break position:fixed/sticky).

   Guards:
   - prefers-reduced-motion → skip smoothing entirely (native scroll).
   - touch devices → native scroll (smoothTouch: 0).
   - in-page #anchor links are routed through smoother.scrollTo so hash jumps
     land correctly under the transformed content. */

import { useRef } from "react";
// Plugins are registered once in @/lib/gsap — import from there, never from
// "gsap/ScrollTrigger" et al. directly, to avoid duplicate registration.
import { ScrollTrigger, ScrollSmoother, useGSAP } from "@/lib/gsap";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      const smoother = ScrollSmoother.create({
        wrapper: wrapper.current!,
        content: content.current!,
        smooth: 1.2,
        effects: true,
        smoothTouch: 0,
      });

      // Keep triggers honest once the self-hosted font settles.
      if (typeof document !== "undefined" && "fonts" in document) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      }

      // Route same-page hash links through the smoother so they land right.
      const onClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        const a = target?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
        if (!a) return;
        const hash = a.getAttribute("href") || "";
        if (hash.length <= 1) return;
        const el = document.querySelector(hash);
        if (el) {
          e.preventDefault();
          smoother.scrollTo(el, true, "top 80px");
        }
      };
      document.addEventListener("click", onClick);
      return () => document.removeEventListener("click", onClick);
    },
    { scope: wrapper },
  );

  return (
    <div id="smooth-wrapper" ref={wrapper}>
      <div id="smooth-content" ref={content}>
        {children}
      </div>
    </div>
  );
}

export default SmoothScroll;
