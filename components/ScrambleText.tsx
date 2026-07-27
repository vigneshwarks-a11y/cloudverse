"use client";

/* Text that scrambles into place on scroll-in, via GSAP's ScrambleTextPlugin.
   Used for the section eyebrow badges. The real text is server-rendered as the
   child, so no-JS and reduced-motion visitors just see it plainly; when motion
   is allowed, the plugin cycles random glyphs and resolves left-to-right to the
   real text the first time the badge enters the viewport. */

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function ScrambleText({
  text,
  className,
  /** Glyph set to scramble through. Badges are uppercase, so default to caps. */
  chars = "upperCase",
  duration = 1.1,
}: {
  text: string;
  className?: string;
  chars?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // After mount, render the text as opaque HTML so React stops reconciling the
  // node the ScrambleText plugin rewrites — otherwise a re-render (Fast
  // Refresh, navigation) mid-scramble can throw "removeChild … not a child of
  // this node". The real text is still server-rendered first for SSR/hydration.
  const [ready, setReady] = useState(false);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return; // leave the real text in place

      // Desktop-only, same breakpoint PinnedLoopCarousel uses to gate its own
      // motion. Below it, skip the animation and leave the real text in
      // place: a fast flick-scroll on a real phone can fire several of these
      // badges' scramble tweens in the same burst, and the garbled mid-tween
      // frame can then sit on screen far longer than intended (a stalled main
      // thread under that burst, a killed ScrollTrigger on refresh) — reading
      // as the section "not loading." Below `lg`, correctness beats the
      // flourish; the failsafe below is a second layer of defense for
      // desktop, not a substitute for this.
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      if (!isDesktop) return;

      // Already past the reveal threshold at mount (deep link, restored scroll
      // position, or a fast flick that outran hydration on a real phone)?
      // Skip the effect entirely instead of scrambling something the visitor
      // can already read — there's nothing to "reveal" here, and it also
      // avoids every such badge on the page firing its scramble in the same
      // burst, which is what makes the mid-scramble frame linger visibly
      // instead of resolving in a blink.
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

      // First pass: go opaque, then run the scramble once the effect re-runs.
      if (!ready) {
        setReady(true);
        return;
      }

      const tween = gsap.to(el, {
        duration,
        ease: "none",
        scrambleText: { text, chars, speed: 0.7, tweenLength: false },
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none", // scramble once, on first entry
        },
      });

      // Safety net: whatever the cause (a stalled main thread, a killed
      // ScrollTrigger on refresh), this badge must never sit on a garbled
      // mid-scramble frame indefinitely — force the real text once the tween
      // should clearly be done.
      const failsafe = window.setTimeout(() => {
        if (el.isConnected) el.textContent = text;
      }, duration * 1000 + 1500);

      return () => {
        window.clearTimeout(failsafe);
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: ref, dependencies: [ready] },
  );

  return ready ? (
    <span ref={ref} className={className} dangerouslySetInnerHTML={{ __html: text }} />
  ) : (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}

export default ScrambleText;
