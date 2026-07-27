"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { NAV, DEMO_URL, DOCS_URL } from "@/lib/links";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);

// Curve geometry (viewBox units). Baseline sits at BASE; the middle control
// point moves by `warp` — positive bulges up into the band above, negative
// dips down into the footer. BASE has headroom on both sides of the viewBox
// (0..H) so a full-magnitude bulge never reaches an edge; the SVG is also
// overflow-visible so the elastic ease's overshoot past MAX_WARP can't clip.
const W = 1000;
const H = 240;
const BASE = 130;
const MAX_WARP = 72;

export function Footer() {
  const root = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const path = pathRef.current;
      if (!path) return;

      const proxy = { warp: 0 };
      const draw = () =>
        path.setAttribute(
          "d",
          `M0,${H} L0,${BASE} Q${W / 2},${BASE - proxy.warp} ${W},${BASE} L${W},${H} Z`,
        );
      draw();

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      // Footer-bounce: the curved top edge tracks scroll velocity, then springs
      // back to flat with an elastic ease when scrolling settles (most visibly
      // the hard stop as the footer hits the bottom of the page).
      // quickTo = one reusable tween whose target updates each frame (creating a
      // fresh overwriting tween per frame would stall it).
      const clamp = gsap.utils.clamp(-MAX_WARP, MAX_WARP);
      const warpTo = gsap.quickTo(proxy, "warp", {
        duration: 0.7,
        ease: "elastic.out(1, 0.4)",
        onUpdate: draw,
      });
      // Drive the warp from the ticker (every frame) rather than
      // ScrollTrigger.onUpdate (fires only while the scroll position changes).
      // ScrollSmoother eases to a stop AFTER the last scroll event, so an
      // onUpdate-driven curve froze at its last high-velocity value on a hard
      // flick into the page bottom. Reading getVelocity() every frame lets the
      // warp track the momentum decaying to 0 and spring flat.
      const tick = () => {
        const smoother = ScrollSmoother.get();
        const velocity = smoother ? smoother.getVelocity() : 0;
        warpTo(clamp(velocity / 22));
      };
      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="relative bg-cv-surface pt-24 pb-10" data-testid="site-footer">
      {/* Velocity-reactive curved cap — sits above the footer, over the CTA
          band, and bulges/springs with scroll. Fill = footer surface color. */}
      <svg
        aria-hidden
        className="pointer-events-none absolute left-0 w-full"
        style={{ height: H, bottom: "100%", marginBottom: -BASE, overflow: "visible" }}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
      >
        <path ref={pathRef} d={`M0,${H} L0,${BASE} L${W},${BASE} L${W},${H} Z`} style={{ fill: "hsl(var(--cv-surface))" }} />
      </svg>

      <div className="cv-container relative">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8">
          <div className="col-span-2 sm:col-span-3 md:col-span-2">
            <div className="font-display font-bold text-cv-ink text-lg">
              CloudVerse<sup className="text-[10px] ml-0.5">™</sup>
            </div>
            <p className="text-cv-muted text-sm mt-3 max-w-none md:max-w-xs">
              The compute economics platform for the AI era. Cloud, AI, data, and engineering spend governed in one place.
            </p>
            <Link href={DEMO_URL} className="cv-btn-primary px-5 py-3 sm:px-7 sm:py-4 mt-5 mb-8 md:mb-0">
              Get a Demo
            </Link>
          </div>

          <FooterCol title="Platform" items={NAV.platform.map((p) => ({ label: p.label, href: p.href }))} />
          <FooterCol title="Solutions" items={NAV.solutions} />
          <FooterCol
            title="Company"
            items={[
              { label: "About", href: "/about" },
              { label: "Resources", href: "/resources" },
              { label: "Docs", href: DOCS_URL },
              { label: "Integrations", href: "/integrations" },
              { label: "Contact", href: "/contact" },
            ]}
          />
        </div>

        <div className="mt-14 pt-6 border-t border-cv-line flex flex-col sm:flex-row justify-between gap-3 text-xs text-cv-muted">
          <div>© {new Date().getFullYear()} cloudverse, Inc. All rights reserved.</div>
          <div className="flex gap-5">
            <Link href="/legal/privacy" className="hover:text-cv-ink">Privacy</Link>
            <Link href="/legal/terms" className="hover:text-cv-ink">Terms</Link>
            <Link href="/legal/security" className="hover:text-cv-ink">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: ReadonlyArray<{ label: string; href: string }> }) {
  return (
    <div>
      <div className="text-cv-ink text-xs uppercase tracking-[0.14em] font-semibold mb-3">{title}</div>
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it.href}>
            <Link
              href={it.href}
              {...(it.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-sm text-cv-muted hover:text-cv-ink"
            >
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
