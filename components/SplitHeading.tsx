"use client";

/* A heading whose words rise into place on load, via GSAP SplitText.
   Splits into masked lines + words, then animates each word up from below its
   line (y 110%) with a slight rotation and stagger — the word-reveal used for
   hero headers. The split is reverted once the reveal finishes, restoring the
   original DOM (so text stays selectable and reflows normally on resize).

   The heading text is server-rendered as children, so no-JS and reduced-motion
   visitors just see it in place. Splitting waits for document.fonts.ready so
   line breaks are measured against the real (self-hosted) font, not the
   fallback. */

import { useRef, useState, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

export function SplitHeading({
  children,
  className,
  as: Tag = "h1" as ElementType,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  // Once mounted we hand the heading's markup to the DOM as opaque HTML
  // (dangerouslySetInnerHTML) so React stops reconciling the subtree that
  // SplitText mutates. Without this, a re-render (Fast Refresh, navigation)
  // landing while the split is live throws "removeChild … not a child of this
  // node", because React can't find the original nodes GSAP wrapped/moved.
  // The children are still server-rendered on the first pass for SSR/SEO and
  // clean hydration; only after mount do we switch to the opaque copy.
  const [html, setHtml] = useState<string | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return; // leave the heading in place

      // First pass: snapshot the server-rendered markup and re-render it as
      // opaque HTML. The effect re-runs once `html` is set (it's a dependency).
      if (html === null) {
        setHtml(el.innerHTML);
        return;
      }

      // Hide before first paint (useGSAP runs in a layout effect) so the full
      // heading never flashes before the split is ready.
      gsap.set(el, { autoAlpha: 0 });

      let split: SplitText | null = null;
      let cancelled = false;

      const run = () => {
        if (cancelled || !el) return;
        split = SplitText.create(el, { type: "lines,words", mask: "lines" });
        gsap.set(el, { autoAlpha: 1 });
        gsap.from(split.words, {
          yPercent: 110,
          rotationZ: 8,
          duration: 0.6,
          ease: "power4.out",
          stagger: 0.06,
          // Restore the (opaque) markup once revealed so it reflows on resize.
          onComplete: () => split?.revert(),
        });
      };

      const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
      (fonts?.ready ?? Promise.resolve()).then(run);

      return () => {
        cancelled = true;
        split?.revert();
        gsap.set(el, { autoAlpha: 1 }); // never leave it hidden on unmount
      };
    },
    { scope: ref, dependencies: [html] },
  );

  return html === null ? (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  ) : (
    <Tag ref={ref} className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
}

export default SplitHeading;
