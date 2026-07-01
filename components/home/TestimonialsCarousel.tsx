"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { IconHeart, IconStack2, IconCurrencyDollar, IconSettings } from "@tabler/icons-react";

const CYCLE_MS = 6000;
const EXPAND_MS = 420; // parallel expand/collapse duration
const GAP = 12;
const COLLAPSED_W = 60;

type Tag = { icon: React.ReactNode; label: string };
type Testimonial = {
  company: string;
  companyInitial: string;
  accentColor: string;
  quote: string;
  name: string;
  title: string;
  initials: string;
  whyLabel: string;
  tags: Tag[];
};

const TESTIMONIALS: Testimonial[] = [
  {
    company: "Perficient",
    companyInitial: "P",
    accentColor: "#1664C0",
    quote: '"We\'re looking at what our engineers are doing, monitoring model usage and cost characteristics. cloudverse centralises governance so we can isolate workloads, enforce logging rules, and scale AI reliably across every client engagement."',
    name: "Enterprise Customer",
    title: "VP of AI Data Platforms Strategy",
    initials: "VP",
    whyLabel: "cloudverse",
    tags: [
      { icon: <IconStack2 size={11} stroke={1} />, label: "Governance" },
      { icon: <IconCurrencyDollar size={11} stroke={1} />, label: "Cost Control" },
      { icon: <IconSettings size={11} stroke={1} />, label: "Easy Set-Up" },
    ],
  },
  {
    company: "Enterprise",
    companyInitial: "E",
    accentColor: "#6954D4",
    quote: '"One of the things I really appreciate about cloudverse is how quickly it helps you scale reliably. It centralizes governance and includes built-in observability and metrics, which makes monitoring and optimization much easier."',
    name: "Enterprise Leader",
    title: "Director of R&D to AI",
    initials: "EL",
    whyLabel: "cloudverse",
    tags: [
      { icon: <IconStack2 size={11} stroke={1} />, label: "Observability" },
      { icon: <IconCurrencyDollar size={11} stroke={1} />, label: "Clear ROI" },
      { icon: <IconSettings size={11} stroke={1} />, label: "Scalability" },
    ],
  },
  {
    company: "FinOps Team",
    companyInitial: "F",
    accentColor: "#0E9E7A",
    quote: '"cloudverse gave us one place to see every dollar we were spending on AI — by model, by team, by workload. We cut wasteful spend in the first week and now every budget review starts with the cloudverse dashboard."',
    name: "FinOps Leader",
    title: "Head of Cloud Economics",
    initials: "FL",
    whyLabel: "cloudverse",
    tags: [
      { icon: <IconCurrencyDollar size={11} stroke={1} />, label: "Spend Visibility" },
      { icon: <IconStack2 size={11} stroke={1} />, label: "Attribution" },
      { icon: <IconSettings size={11} stroke={1} />, label: "Reporting" },
    ],
  },
];

function Avatar({ initials, color, size = 36 }: { initials: string; color: string; size?: number }) {
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-semibold shrink-0 select-none"
      style={{ width: size, height: size, background: color, fontSize: size * 0.35 }}
    >
      {initials}
    </div>
  );
}

function SingleProgress({ active, running, duration }: {
  active: number; running: boolean; duration: number;
}) {
  const [fillPct, setFillPct] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef  = useRef<number | null>(null);

  useEffect(() => {
    setFillPct(0);
    startRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (!running) return;
    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      setFillPct(Math.min((elapsed / duration) * 100, 100));
      if (elapsed < duration) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [running, duration, active]);

  return (
    <div className="h-0.5 w-24 rounded-full bg-white/20 overflow-hidden">
      <div
        className="h-full rounded-full bg-white/80"
        style={{ width: `${fillPct}%`, transition: "none" }}
      />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function TestimonialsCarousel() {
  const [active, setActive] = useState(0);
  const [busy, setBusy] = useState(false);

  const [hovered, setHovered] = useState(false);
  const [entered, setEntered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef   = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(e => setContainerW(e[0].contentRect.width));
    obs.observe(el);
    setContainerW(el.getBoundingClientRect().width);
    return () => obs.disconnect();
  }, []);

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

  const goTo = useCallback((next: number) => {
    if (next === active || busy) return;
    setBusy(true);
    // Expand new card and shrink old card at the same time.
    setActive(next);
    setTimeout(() => setBusy(false), EXPAND_MS);
  }, [active, busy]);

  const advance = useCallback(() => {
    goTo((active + 1) % TESTIMONIALS.length);
  }, [active, goTo]);

  useEffect(() => {
    if (!entered || hovered || busy) return;
    const t = setTimeout(advance, CYCLE_MS);
    return () => clearTimeout(t);
  }, [active, entered, hovered, busy, advance]);

  const collapsedCount = TESTIMONIALS.length - 1;
  const activeW = containerW > 0
    ? containerW - collapsedCount * COLLAPSED_W - collapsedCount * GAP
    : 0;

  // Width per card: active card grows to activeW, all others shrink to
  // COLLAPSED_W at the same time (parallel expand/collapse transition).
  const getW = (i: number) => {
    if (!containerW) return undefined;
    return i === active ? activeW : COLLAPSED_W;
  };

  return (
    <section className="cv-section bg-cv-surface" ref={sectionRef}>
      <div className="cv-container">
        <div className="cv-label mb-4 text-cv-muted">Customer Stories</div>
        <h2 className="cv-h2 text-cv-ink mb-10 max-w-2xl">
          Trusted by teams running AI at scale.
        </h2>

        <div
          ref={containerRef}
          className="flex gap-3"
          style={{ minHeight: 360 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {TESTIMONIALS.map((ct, i) => {
            const isActive = i === active;
            const w = getW(i);
            const contentVisible = isActive;
            // Entrance stagger
            const staggerDelay = entered ? 0 : i * 80;

            return (
              <div
                key={i}
                className="relative rounded-2xl border border-cv-line/40 overflow-hidden shrink-0"
                style={{
                  width: w ?? (isActive ? undefined : COLLAPSED_W),
                  flex: (!w && isActive) ? 1 : undefined,
                  minWidth: w ?? COLLAPSED_W,
                  transition: [
                    `width ${EXPAND_MS}ms ease-in-out`,
                    `min-width ${EXPAND_MS}ms ease-in-out`,
                    `opacity 280ms ease-out ${staggerDelay}ms`,
                    `transform 280ms ease-out ${staggerDelay}ms`,
                  ].join(", "),
                  opacity: entered ? 1 : 0,
                  transform: entered ? "none" : isActive ? "translateY(10px)" : "translateX(14px)",
                }}
              >
                {/* ── Background ── */}
                <div
                  className="absolute inset-0 transition-colors duration-500"
                  style={{
                    background: contentVisible
                      ? `radial-gradient(ellipse 80% 60% at 20% 0%, #1664C055 0%, transparent 60%),
                         radial-gradient(ellipse 60% 80% at 80% 100%, #2278E030 0%, transparent 55%),
                         #000`
                      : "#000",
                  }}
                />

                {/* ── Collapsed strip (always rendered, fades out when active) ── */}
                <button
                  className="absolute inset-0 flex flex-col items-center w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cv-blue/60"
                  style={{
                    opacity: contentVisible ? 0 : 1,
                    pointerEvents: contentVisible || busy ? "none" : "auto",
                    transition: `opacity ${EXPAND_MS * 0.4}ms ease-in-out`,
                    paddingTop: 20,
                    paddingBottom: 20,
                  }}
                  onClick={() => goTo(i)}
                  tabIndex={contentVisible ? -1 : 0}
                  aria-label={`View testimonial from ${ct.company}`}
                >
                  {/* Company name near top */}
                  <div className="flex items-start justify-center pt-1">
                    <span
                      className="font-mono text-[11px] text-cv-muted/70 whitespace-nowrap select-none"
                      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.1em" }}
                    >
                      {ct.company}
                    </span>
                  </div>

                  {/* Square rounded avatar pinned to bottom */}
                  <div className="mt-auto">
                    <div
                      className="rounded-xl overflow-hidden flex items-center justify-center text-white font-semibold select-none"
                      style={{
                        width: 42,
                        height: 42,
                        background: ct.accentColor,
                        fontSize: 14,
                      }}
                    >
                      {ct.initials}
                    </div>
                  </div>
                </button>

                {/* ── Expanded content (always rendered, fades in when active) ── */}
                <div
                  className="absolute inset-0 flex flex-col z-10"
                  style={{
                    opacity: contentVisible ? 1 : 0,
                    pointerEvents: contentVisible ? "auto" : "none",
                    // Delay content fade-in so it appears after card has grown
                    transition: `opacity 260ms ease-in-out ${contentVisible ? EXPAND_MS * 0.55 : 0}ms`,
                  }}
                >
                  {/* Top bar */}
                  <div className="flex items-center justify-between px-7 pt-6 pb-4 shrink-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className="h-7 w-7 rounded-md flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ background: ct.accentColor }}
                      >
                        {ct.companyInitial}
                      </div>
                      <span className="text-cv-ink font-semibold text-sm tracking-wide truncate">{ct.company}</span>
                    </div>
                    <SingleProgress
                      active={active}
                      running={entered && !hovered && !busy}
                      duration={CYCLE_MS}
                    />
                  </div>

                  {/* Quote */}
                  <div className="flex-1 px-7 py-2 flex items-end overflow-hidden">
                    <p className="text-cv-ink/85 text-lg lg:text-xl leading-relaxed max-w-2xl">
                      {ct.quote}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-cv-line/50 px-7 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shrink-0">
                    <div className="flex items-center gap-3">
                      <Avatar initials={ct.initials} color={ct.accentColor} size={38} />
                      <div>
                        <div className="text-sm font-semibold text-cv-ink">{ct.name}</div>
                        <div className="text-xs font-mono text-cv-muted mt-0.5">{ct.title}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="flex items-center gap-1 text-xs font-mono text-cv-muted whitespace-nowrap">
                        Why {ct.whyLabel} <IconHeart size={11} stroke={1} className="text-red-400 ml-0.5" />
                      </span>
                      {ct.tags.map((tag) => (
                        <span
                          key={tag.label}
                          className="flex items-center gap-1.5 text-xs font-mono text-cv-ink/60 border border-cv-line rounded-full px-2.5 py-1 whitespace-nowrap"
                        >
                          {tag.icon} {tag.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Mobile dots */}
        <div className="flex sm:hidden justify-center gap-2 mt-5">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-cv-blue" : "w-1.5 bg-cv-line"}`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
