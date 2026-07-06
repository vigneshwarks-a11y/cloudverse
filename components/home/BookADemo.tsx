"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar } from "@solar-icons/react";
import { DEMO_URL } from "@/lib/links";

// Scattered logo bubbles — [src, size, top%, left%, opacity, delay]
const BUBBLES: [string, number, number, number, number, number][] = [
  ["/legacy/integration/awstop.svg",      72,  8,  62, 1.00, 0],
  ["/legacy/integration/Azuretop.svg",    64, 22,  80, 1.00, 60],
  ["/legacy/integration/googletop.svg",   64,  2,  48, 1.00, 120],
  ["/legacy/integration/snowflake.svg",   56, 42,  90, 0.90, 180],
  ["/legacy/integration/datadog.svg",     56, 58,  68, 0.90, 240],
  ["/legacy/integration/kuber.svg",       52, 72,  84, 0.80, 300],
  ["/legacy/integration/sparktop.svg",    48, 28,  55, 0.55, 360],
  ["/legacy/integration/oracle.svg",      44, 80,  56, 0.45, 420],
  ["/legacy/integration/oceantop.svg",    40, 14,  92, 0.35, 180],
  ["/legacy/integration/tencenttop.svg",  38, 64,  50, 0.25, 60],
  ["/legacy/integration/vcenter.svg",     34, 48,  76, 0.20, 300],
  ["/legacy/integration/alibabatop.svg",  30, 88,  70, 0.15, 420],
];

export function BookADemo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setEntered(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-cv-surface2 py-20 lg:py-28"
    >
      {/* Subtle radial background tint */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 75% 50%, hsl(var(--cv-hero-glow)), transparent 70%)",
        }}
      />

      <div className="cv-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center min-h-[420px]">

          {/* ── Left: text content ── */}
          <div
            style={{
              opacity: entered ? 1 : 0,
              transform: entered ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 600ms ease, transform 600ms cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-6">
              <Calendar weight="Linear" size={15} className="text-cv-muted" />
              <span className="cv-label text-cv-muted">Book a Demo</span>
            </div>

            {/* Headline */}
            <h2 className="cv-h1 text-cv-ink max-w-md">
              See CloudVerse<br />in action.
            </h2>

            {/* Description */}
            <p className="cv-body-lg text-cv-muted mt-6 max-w-sm">
              Connect your first account in under 30 minutes. Most teams find something they didn&apos;t expect the same day.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href={DEMO_URL} className="cv-btn-primary" data-testid="link-demo-cta">
                Book a Demo <ArrowRight weight="Linear" size={16} />
              </Link>
              <Link href="/sign-up" className="cv-btn-secondary" data-testid="link-signup-cta">
                Get started free
              </Link>
            </div>

            {/* Social proof line */}
            <p className="mt-6 text-xs text-cv-muted/70">
              No setup fees · No-fee proof of value · 2–4 week onboarding
            </p>
          </div>

          {/* ── Right: floating logo bubbles ── */}
          <div className="relative hidden lg:block" style={{ height: 420 }}>
            {BUBBLES.map(([src, size, top, left, opacity, delay], i) => (
              <div
                key={i}
                aria-hidden
                style={{
                  position: "absolute",
                  top: `${top}%`,
                  left: `${left}%`,
                  transform: entered
                    ? "translate(-50%, -50%) scale(1)"
                    : "translate(-50%, -50%) scale(0.7)",
                  opacity: entered ? opacity : 0,
                  transition: `opacity 500ms ease ${delay}ms, transform 500ms cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`,
                }}
              >
                <div
                  className="rounded-full flex items-center justify-center bg-cv-surface dark:bg-[#0D0D0D] border border-cv-line shadow-sm"
                  style={{ width: size, height: size }}
                >
                  <img
                    src={src}
                    alt=""
                    style={{ width: size * 0.52, height: size * 0.52, objectFit: "contain" }}
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
