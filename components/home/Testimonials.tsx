"use client";

import { useEffect, useRef, useState } from "react";

type Testimonial = {
  slot: string;
  quote: string;
  name: string;
  title: string;
  initials: string;
  tags: string[];
};

const TESTIMONIALS: Testimonial[] = [
  {
    slot: "Testimonial slot 1",
    quote:
      "[TESTIMONIAL SLOT 1 — FinOps leader, financial services or tech]",
    name: "FinOps Leader",
    title: "Financial services / tech",
    initials: "F1",
    tags: ["FinOps", "Cost attribution"],
  },
  {
    slot: "Testimonial slot 2",
    quote:
      "[TESTIMONIAL SLOT 2 — Engineering leader, platform or cloud team]",
    name: "Engineering Leader",
    title: "Platform / cloud team",
    initials: "E2",
    tags: ["Platform", "Automation"],
  },
  {
    slot: "Testimonial slot 3",
    quote:
      "[TESTIMONIAL SLOT 3 — Data team or analytics engineering]",
    name: "Data Leader",
    title: "Analytics engineering",
    initials: "D3",
    tags: ["DataX", "Warehouse spend"],
  },
];

const CYCLE_MS = 6000;

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [paused, setPaused] = useState(false);
  const genRef = useRef(0);
  const len = TESTIMONIALS.length;

  function select(i: number) {
    genRef.current += 1;
    setActive(i);
    setCycle((c) => c + 1);
  }

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
      className="cv-section relative overflow-hidden bg-[#08080C]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Subtle grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, #000 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, #000 30%, transparent 100%)",
        }}
      />
      {/* Soft blue glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(22,100,192,0.22), transparent 70%)" }}
      />

      <div className="cv-container relative z-10">
        <div className="max-w-3xl mb-12">
          <div className="cv-label mb-3">Testimonials</div>
          <h2 className="cv-h2 text-cv-ink">Trusted by the teams who own the spend.</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
          {/* Active large card */}
          <div
            key={active}
            className="relative rounded-3xl border border-white/[0.08] p-8 lg:p-12 overflow-hidden animate-fade-up"
            style={{
              background:
                "linear-gradient(135deg, rgba(22,100,192,0.16), rgba(8,8,12,0.4) 55%, rgba(8,8,12,0.2))",
            }}
            data-testid="testimonial-active"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(22,100,192,0.25), transparent 70%)" }}
            />
            <div className="relative">
              <div className="text-[#7C9BFF] text-6xl leading-none font-display select-none">&ldquo;</div>
              <blockquote className="mt-2 text-xl lg:text-2xl leading-relaxed text-white font-display max-w-2xl">
                {current.quote}
              </blockquote>

              <div className="mt-10 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#1664C0]/50 bg-[#1664C0]/15 text-sm font-semibold text-[#7C9BFF]">
                  {current.initials}
                </div>
                <div>
                  <div className="font-semibold text-white">{current.name}</div>
                  <div className="text-sm text-cv-muted">{current.title}</div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {current.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-cv-ink/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Slim side cards */}
          <div className="flex flex-row lg:flex-col gap-4">
            {TESTIMONIALS.map((t, i) => {
              const isActive = i === active;
              return (
                <button
                  key={t.slot}
                  type="button"
                  onClick={() => select(i)}
                  aria-pressed={isActive}
                  data-testid={`testimonial-card-${i}`}
                  className={`group relative flex-1 lg:flex-none overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 ${
                    isActive
                      ? "border-[#1664C0]/60 bg-[#1664C0]/10"
                      : "border-white/[0.08] bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="flex items-center gap-3 lg:h-28">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                        isActive
                          ? "border border-[#1664C0]/60 bg-[#1664C0]/20 text-[#7C9BFF]"
                          : "border border-white/10 bg-white/[0.05] text-cv-muted"
                      }`}
                    >
                      {t.initials}
                    </div>
                    <span
                      className={`hidden lg:block text-[11px] font-semibold uppercase tracking-widest lg:[writing-mode:vertical-rl] lg:rotate-180 ${
                        isActive ? "text-[#7C9BFF]" : "text-cv-muted"
                      }`}
                    >
                      {t.name}
                    </span>
                    <span className="lg:hidden text-sm font-medium text-cv-ink/85">{t.name}</span>
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
