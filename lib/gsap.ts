"use client";

/* Single source of GSAP + plugin registration for the whole site.
 *
 * Import { gsap, ScrollTrigger, ScrollSmoother, useGSAP } from "@/lib/gsap"
 * everywhere instead of importing "gsap" and its plugins directly in each
 * component. Registering a plugin more than once is technically harmless
 * (GSAP dedupes), but a single registration point keeps SSR/HMR in Next from
 * ending up with mismatched plugin instances and makes the scroller wiring
 * unambiguous.
 *
 * SMOOTH SCROLL — this site uses GSAP's own ScrollSmoother (see
 * components/SmoothScroll.tsx), NOT Lenis / Locomotive. ScrollSmoother is a
 * GSAP plugin, so ScrollTrigger is synced to it automatically: there is no
 * ScrollTrigger.scrollerProxy() here, and there must not be — scrollerProxy
 * exists to teach ScrollTrigger about *third-party, non-GSAP* scrollers, and
 * pointing it at ScrollSmoother would double-transform the scroll position.
 *
 * ScrollSmoother transforms #smooth-content, which breaks position:fixed /
 * position:sticky inside it. Use ScrollTrigger `pin` (not CSS sticky) for
 * anything that must hold its place while the page scrolls under it.
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrambleTextPlugin, SplitText, useGSAP);
}

/** The live ScrollSmoother instance, or undefined before it mounts / when
 *  smoothing is disabled (reduced-motion, touch). */
export function getSmoother() {
  return ScrollSmoother.get();
}

export { gsap, ScrollTrigger, ScrollSmoother, ScrambleTextPlugin, SplitText, useGSAP };
