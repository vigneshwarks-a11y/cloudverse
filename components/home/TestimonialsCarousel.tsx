"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { BranchingPathsUp, DollarMinimalistic, Eye, Heart, Shield } from "@solar-icons/react";

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
    company: "SE Asian Telco Group",
    companyInitial: "T",
    accentColor: "#1664C0",
    quote: '"129 applications and Rp8.77B in cloud spend, across four clouds, with no reliable owner. CloudVerse mapped spend to the way the business actually works and surfaced Rp964.80M in savings before any optimization work began."',
    name: "Southeast Asian digital & telecommunications group",
    title: "Multi-cloud estate: AWS, Huawei, Google Cloud, Cloudflare",
    initials: "TG",
    whyLabel: "cloudverse",
    tags: [
      { icon: <BranchingPathsUp weight="Linear" size={11} />, label: "Routing" },
      { icon: <Eye weight="Linear" size={11} />, label: "Visibility" },
      { icon: <Shield weight="Linear" size={11} />, label: "Governance" },
    ],
  },
  {
    company: "Tencent Cloud",
    companyInitial: "TC",
    accentColor: "#6954D4",
    quote: '"Before CloudVerse we could see the bill. We couldn\'t say who owned it, which applications drove it, or whether the architecture under it was worth the cost."',
    name: "Head of FinOps",
    title: "Large Southeast Asian digital & telecommunications group",
    initials: "TC",
    whyLabel: "cloudverse",
    tags: [
      { icon: <Eye weight="Linear" size={11} />, label: "Visibility" },
      { icon: <Shield weight="Linear" size={11} />, label: "Governance" },
      { icon: <DollarMinimalistic weight="Linear" size={11} />, label: "Cost Control" },
    ],
  },
  {
    company: "Dr. Reddy's",
    companyInitial: "DR",
    accentColor: "#0E9E7A",
    quote: '"The teams responsible for governance were reconciling provider invoices by hand and arriving at numbers finance and engineering both questioned. That\'s gone now."',
    name: "FinOps Lead",
    title: "Multi-cloud digital services group (AWS, Huawei, Google Cloud, Cloudflare)",
    initials: "DR",
    whyLabel: "cloudverse",
    tags: [
      { icon: <Shield weight="Linear" size={11} />, label: "Governance" },
      { icon: <BranchingPathsUp weight="Linear" size={11} />, label: "Routing" },
      { icon: <Eye weight="Linear" size={11} />, label: "Visibility" },
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

// Large, heavily-blurred rotated blue blob — the moody ambient glow used on the
// Enterprise Control quote cards, sized to bleed across the whole open card.
function AmbientGlow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute"
        style={{
          left: "-12%",
          top: "8%",
          width: "78%",
          height: "82%",
          borderRadius: 240,
          filter: "blur(96px)",
          opacity: 0.32,
          transform: "rotate(-24deg)",
          background: "linear-gradient(90deg, #1664C0 0%, #2278E0 100%)",
        }}
      />
      <div
        className="absolute"
        style={{
          right: "-14%",
          bottom: "-6%",
          width: "52%",
          height: "70%",
          borderRadius: 200,
          filter: "blur(90px)",
          opacity: 0.2,
          transform: "rotate(18deg)",
          background: "linear-gradient(90deg, #2278E0 0%, #1664C0 100%)",
        }}
      />
    </div>
  );
}

function SingleProgress({ active, running, duration, className = "" }: {
  active: number; running: boolean; duration: number; className?: string;
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
    <div className={`h-1 overflow-hidden rounded-full bg-cv-ink/[0.08] ${className}`}>
      <div
        className="h-full rounded-full bg-cv-ink/45"
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

  // Below this width there's no room to show collapsed side-strips next to
  // the active card without crushing its content - show only the active
  // card, full width, and let the dots below handle navigation.
  const isMobile = containerW > 0 && containerW < 640;

  const collapsedCount = TESTIMONIALS.length - 1;
  const activeW = containerW > 0
    ? isMobile
      ? containerW
      : containerW - collapsedCount * COLLAPSED_W - collapsedCount * GAP
    : 0;

  // Width per card: active card grows to activeW, all others shrink to
  // COLLAPSED_W at the same time (parallel expand/collapse transition).
  // On mobile, collapsed cards shrink to 0 instead of a visible strip.
  const getW = (i: number) => {
    if (!containerW) return undefined;
    if (i === active) return activeW;
    return isMobile ? 0 : COLLAPSED_W;
  };

  return (
    <section className="cv-section bg-cv-surface" ref={sectionRef}>
      <div className="cv-container">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1664C0]/15 dark:bg-[#7CB8F8]/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#1664C0] dark:text-[#7CB8F8] mb-4">
          Customer Stories
        </span>
        <h2 className="cv-h2 text-cv-ink mb-10 max-w-2xl">
          Trusted by teams running AI at scale.
        </h2>

        <div
          ref={containerRef}
          className="flex gap-0 sm:gap-3"
          style={{ minHeight: 420 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {TESTIMONIALS.map((ct, i) => {
            const isActive = i === active;
            const w = getW(i);
            const contentVisible = isActive;
            // Entrance stagger
            const staggerDelay = entered ? 0 : i * 80;
            const isCollapsedOnMobile = isMobile && !isActive;

            return (
              <div
                key={i}
                className={`relative rounded-2xl overflow-hidden shrink-0 ${isCollapsedOnMobile ? "border-0" : "border border-cv-line/40"}`}
                style={{
                  width: w ?? (isActive ? undefined : COLLAPSED_W),
                  flex: (!w && isActive) ? 1 : undefined,
                  minWidth: isCollapsedOnMobile ? 0 : (w ?? COLLAPSED_W),
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
                <div className="absolute inset-0" style={{ background: "hsl(var(--cv-surface))" }} />

                {/* ── Active-card decoration: ambient glow ── */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ opacity: contentVisible ? 1 : 0 }}
                  aria-hidden
                >
                  <AmbientGlow />
                </div>

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

                  {/* Initials avatar pinned to bottom */}
                  <div className="mt-auto">
                    <div
                      className="flex items-center justify-center rounded-xl font-semibold text-white select-none"
                      style={{ width: 42, height: 42, background: ct.accentColor, fontSize: 14 }}
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
                  <div className="flex items-center justify-between gap-4 sm:gap-6 px-4 sm:px-7 pt-5 sm:pt-6 pb-3 sm:pb-4 shrink-0">
                    <div className="flex items-center gap-2 min-w-0 shrink-0">
                      <div
                        className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold text-white shrink-0"
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
                      className="w-20 shrink-0 sm:w-28"
                    />
                  </div>

                  {/* Quote */}
                  <div className="flex-1 px-4 sm:px-7 py-2 flex items-center overflow-hidden">
                    <p className="text-cv-ink/90 text-[16px] sm:text-[20px] lg:text-[26px] leading-snug max-w-5xl">
                      {ct.quote}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-cv-line/50 px-4 sm:px-7 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shrink-0">
                    <div className="flex items-center gap-3">
                      <Avatar initials={ct.initials} color={ct.accentColor} size={38} />
                      <div>
                        <div className="text-sm font-semibold text-cv-ink">{ct.name}</div>
                        <div className="text-xs font-mono text-cv-muted mt-0.5">{ct.title}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="flex items-center gap-1 text-xs font-mono text-cv-muted whitespace-nowrap">
                        Why {ct.whyLabel} <Heart weight="Linear" size={11} className="text-red-400 ml-0.5" />
                      </span>
                      {ct.tags.map((tag) => (
                        <span
                          key={tag.label}
                          className="flex items-center gap-1.5 text-xs font-mono text-cv-ink/60 border border-cv-blue/30 bg-cv-blue/10 rounded-full px-2.5 py-1 whitespace-nowrap"
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
