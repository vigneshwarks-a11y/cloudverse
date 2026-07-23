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

      // First pass: go opaque, then run the scramble once the effect re-runs.
      if (!ready) {
        setReady(true);
        return;
      }

      gsap.to(el, {
        duration,
        ease: "none",
        scrambleText: { text, chars, speed: 0.7, tweenLength: false },
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none", // scramble once, on first entry
        },
      });
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
