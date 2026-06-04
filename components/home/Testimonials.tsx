"use client";

import { useEffect, useRef, useState } from "react";

type Testimonial = {
  slot: string;
  quote: string;
  name: string;
  title: string;
  initials: string;
  product: string;
  tags: string[];
};

const TESTIMONIALS: Testimonial[] = [
  {
    slot: "Testimonial slot 1",
    quote: "[TESTIMONIAL SLOT 1 — FinOps leader, financial services or tech]",
    name: "FinOps Leader",
    title: "Financial services / tech",
    initials: "F1",
    product: "FinOps",
    tags: ["Cost attribution", "Anomaly detection", "Finance-grade reporting"],
  },
  {
    slot: "Testimonial slot 2",
    quote: "[TESTIMONIAL SLOT 2 — Engineering leader, platform or cloud team]",
    name: "Engineering Leader",
    title: "Platform / cloud team",
    initials: "E2",
    product: "DevX",
    tags: ["Automation paths", "Policy guardrails", "Rollback readiness"],
  },
  {
    slot: "Testimonial slot 3",
    quote: "[TESTIMONIAL SLOT 3 — Data team or analytics engineering]",
    name: "Data Leader",
    title: "Analytics engineering",
    initials: "D3",
    product: "DataX",
    tags: ["Warehouse spend", "Query attribution", "Workload tuning"],
  },
];

const CYCLE_MS = 6000;

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [paused, setPaused] = useState(false);
  const genRef = useRef(0);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const focusMainRef = useRef(false);
  const len = TESTIMONIALS.length;

  function select(i: number) {
    genRef.current += 1;
    focusMainRef.current = true;
    setActive(i);
    setCycle((c) => c + 1);
  }

  useEffect(() => {
    if (focusMainRef.current) {
      focusMainRef.current = false;
      mainCardRef.current?.focus();
    }
  }, [active]);

  useEffect(() => {
    if (paused) return;
    if (typeof window !== "undefined") {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
    }
    genRef.current += 1;
    const myGen = genRef.current;
    const id = window.setTimeout(() => {
      if (myGen !== genRef.current) return;
      setActive((a) => (a + 1) % len);
    }, CYCLE_MS);
    return () => window.clearTimeout(id);
  }, [active, cycle, paused, len]);

  const current = TESTIMONIALS[active];

  return (
    <section
      className="cv-testimonials cv-section relative overflow-hidden bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      {/* Soft blue glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/3 h-72 w-[40rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(22,100,192,0.20), transparent 70%)" }}
      />

      <div className="cv-container relative z-10">
        <div className="mb-6 flex items-baseline gap-3">
          <span className="cv-label">Testimonials</span>
          <span className="text-sm text-cv-muted">Trusted by the teams who own the spend.</span>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
          {/* Active cinematic card */}
          <div
            key={active}
            ref={mainCardRef}
            tabIndex={-1}
            aria-live="polite"
            aria-label={`Testimonial from ${current.name}`}
            className="relative flex min-h-[440px] flex-col overflow-hidden rounded-3xl border border-white/10 shadow-[0_0_60px_-20px_rgba(22,100,192,0.5)] animate-fade-up focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1664C0] focus-visible:ring-offset-2 focus-visible:ring-offset-black lg:w-[78%]"
            data-testid="testimonial-active"
          >
            {/* Blue fading into black */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg, rgba(22,100,192,0.6) 0%, rgba(22,100,192,0.32) 30%, rgba(8,8,12,0.9) 68%, #000 100%)",
              }}
            />
            {/* Subtle grid overlay */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
                maskImage: "linear-gradient(to bottom, #000 0%, transparent 75%)",
                WebkitMaskImage: "linear-gradient(to bottom, #000 0%, transparent 75%)",
              }}
            />

            {/* Top row: logo + progress indicator */}
            <div className="relative flex items-center justify-between p-8 lg:px-10">
              <img src="/legacy/logo/whitelogo.svg" alt="CloudVerse" className="h-7 w-auto opacity-90" />
              <div className="flex items-center gap-2" aria-hidden>
                {TESTIMONIALS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === active ? "w-7 bg-[#1664C0]" : "w-1.5 bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Quote */}
            <div className="relative flex flex-1 items-center px-8 lg:px-10">
              <blockquote className="font-display text-2xl lg:text-4xl leading-snug text-white max-w-3xl">
                {current.quote}
              </blockquote>
            </div>

            {/* Bottom strip */}
            <div className="relative mt-6 flex flex-col gap-4 border-t border-white/10 bg-black/40 p-6 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between lg:px-10">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#1664C0]/50 bg-[#1664C0]/20 text-sm font-semibold text-[#7C9BFF]">
                  {current.initials}
                </div>
                <div>
                  <div className="font-semibold text-white">{current.name}</div>
                  <div className="text-sm text-cv-muted">{current.title}</div>
                </div>
                <span className="ml-2 hidden items-center rounded-full border border-[#1664C0]/50 bg-[#1664C0]/15 px-3 py-1 text-xs font-medium text-[#7C9BFF] sm:inline-flex">
                  {current.product}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {current.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-cv-ink/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Slim vertical side cards — same row, same height */}
          <div className="flex flex-row gap-3 lg:flex-1">
            {TESTIMONIALS.map((t, i) => {
              if (i === active) return null;
              return (
                <button
                  key={t.slot}
                  type="button"
                  onClick={() => select(i)}
                  aria-label={`Show testimonial from ${t.name}`}
                  data-testid={`testimonial-card-${i}`}
                  className="group relative flex flex-1 items-end justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] transition-all duration-300 hover:border-white/25 hover:bg-white/[0.06]"
                >
                  <div className="flex h-full w-full flex-col items-center justify-between py-5">
                    {/* Rotated name (desktop) */}
                    <span className="hidden flex-1 items-center text-xs font-semibold uppercase tracking-widest text-cv-muted group-hover:text-cv-ink/80 lg:flex lg:[writing-mode:vertical-rl] lg:rotate-180">
                      {t.name}
                    </span>
                    {/* Avatar at the bottom */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-xs font-semibold text-cv-muted transition-colors group-hover:text-cv-ink/80">
                      {t.initials}
                    </div>
                    {/* Name fallback (mobile) */}
                    <span className="mt-2 text-center text-[11px] font-medium text-cv-ink/80 lg:hidden">
                      {t.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
