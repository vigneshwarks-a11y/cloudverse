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
    company: "SE Asian Digital & Telco Group",
    companyInitial: "T",
    accentColor: "#1664C0",
    quote: '"129 applications and Rp8.77B in cloud spend across four clouds, with no reliable owner. CloudVerse mapped spend to how the business actually works and surfaced Rp964.80M in savings before any optimization began."',
    name: "Southeast Asian digital & telecommunications group",
    title: "Multi-cloud estate — AWS, Huawei, Google Cloud, Cloudflare (anonymized)",
    initials: "TG",
    whyLabel: "cloudverse",
    tags: [
      { icon: <BranchingPathsUp weight="Linear" size={11} />, label: "Multi-cloud" },
      { icon: <DollarMinimalistic weight="Linear" size={11} />, label: "Allocation" },
      { icon: <Eye weight="Linear" size={11} />, label: "Architecture" },
    ],
  },
  {
    company: "Berkshire Hathaway HomeServices",
    companyInitial: "BH",
    accentColor: "#6954D4",
    quote: '"A growing AWS estate, fragmented tagging, no team-level attribution. CloudVerse tied spend to teams and gave finance a model that held up under review."',
    name: "Berkshire Hathaway HomeServices",
    title: "$101,736 annual recovery · $61,582 in a single month · $738,983 realized",
    initials: "BH",
    whyLabel: "cloudverse",
    tags: [
      { icon: <Eye weight="Linear" size={11} />, label: "Visibility" },
      { icon: <Shield weight="Linear" size={11} />, label: "Governance" },
      { icon: <DollarMinimalistic weight="Linear" size={11} />, label: "Cost Control" },
    ],
  },
  {
    company: "The Outcome, in One Number",
    companyInitial: "%",
    accentColor: "#0E9E7A",
    quote: '"40–90% less spend on production AI workloads once routing and governance are in place. Most teams find something they didn\'t expect on day one."',
    name: "The outcome, in one number",
    title: "Across CloudVerse customers",
    initials: "40+",
    whyLabel: "cloudverse",
    tags: [
      { icon: <BranchingPathsUp weight="Linear" size={11} />, label: "Routing" },
      { icon: <DollarMinimalistic weight="Linear" size={11} />, label: "Optimization" },
      { icon: <Shield weight="Linear" size={11} />, label: "Governance" },
    ],
  },
];

function Avatar({ initials, color, size = 36 }: { initials: string; color: string; size?: number }) {
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-semibold shrink-0 select-none"
      style={{ width: `${size}px`, height: `${size}px`, background: color, fontSize: `${Math.round(size * 0.35)}px` }}
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
    <div className="h-0.5 w-24 rounded-full bg-cv-ink/15 overflow-hidden">
      <div
        className="h-full rounded-full bg-cv-ink/70"
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(e => setContainerW(e[0].contentRect.width));
    obs.observe(el);
    setContainerW(el.getBoundingClientRect().width);
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
    if (hovered || busy) return;
    const t = setTimeout(advance, CYCLE_MS);
    return () => clearTimeout(t);
  }, [active, hovered, busy, advance]);

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
    <section className="cv-section bg-cv-surface">
      <div className="cv-container">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1664C0]/15 dark:bg-[#7CB8F8]/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#1664C0] dark:text-[#7CB8F8] mb-4">
          Customer Stories
        </span>
        <h2 className="cv-h2 text-cv-ink mb-3 max-w-2xl">
          Customer stories
        </h2>
        <p className="text-cv-ink/70 leading-relaxed mb-10 max-w-2xl">
          Teams running cloud and AI at scale, on the record.
        </p>

        {/* Desktop accordion */}
        <div
          ref={containerRef}
          className="hidden sm:flex gap-3"
          style={{ minHeight: 380 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {TESTIMONIALS.map((ct, i) => {
            const isActive = i === active;
            const w = getW(i);
            const contentVisible = isActive;

            return (
              <div
                key={i}
                className="relative rounded-2xl border border-cv-line/40 overflow-hidden shrink-0"
                style={{
                  width: w ?? (isActive ? undefined : COLLAPSED_W),
                  flex: (!w && isActive) ? 1 : undefined,
                  minWidth: w ?? COLLAPSED_W,
                  transition: `width ${EXPAND_MS}ms ease-in-out, min-width ${EXPAND_MS}ms ease-in-out`,
                }}
              >
                {/* Background */}
                <div
                  className="absolute inset-0 transition-colors duration-500"
                  style={{
                    background: contentVisible
                      ? `radial-gradient(ellipse 80% 60% at 20% 0%, #6954D440 0%, transparent 60%),
                         radial-gradient(ellipse 60% 80% at 80% 100%, #7C3AED20 0%, transparent 55%),
                         #0D0D0D`
                      : "#0D0D0D",
                  }}
                />

                {/* Collapsed strip */}
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
                  <div className="flex items-start justify-center pt-1">
                    <span
                      className="font-mono text-[11px] text-cv-muted/70 whitespace-nowrap select-none [writing-mode:vertical-rl] rotate-180 tracking-widest"
                    >
                      {ct.company}
                    </span>
                  </div>
                  <div className="mt-auto">
                    <div
                      className="w-[42px] h-[42px] rounded-xl overflow-hidden flex items-center justify-center text-white text-sm font-semibold select-none"
                      style={{ background: ct.accentColor }}
                    >
                      {ct.initials}
                    </div>
                  </div>
                </button>

                {/* Expanded content */}
                <div
                  className="absolute inset-0 flex flex-col z-10"
                  style={{
                    opacity: contentVisible ? 1 : 0,
                    pointerEvents: contentVisible ? "auto" : "none",
                    transition: `opacity 260ms ease-in-out ${contentVisible ? EXPAND_MS * 0.55 : 0}ms`,
                  }}
                >
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
                    <SingleProgress active={active} running={!hovered && !busy} duration={CYCLE_MS} />
                  </div>
                  <div className="flex-1 px-7 py-2 flex items-end overflow-hidden">
                    <p className="text-cv-ink/85 text-lg lg:text-xl leading-relaxed max-w-2xl">{ct.quote}</p>
                  </div>
                  <div className="border-t border-cv-line/50 px-7 py-5 flex flex-row items-center justify-between gap-4 shrink-0">
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar initials={ct.initials} color={ct.accentColor} size={38} />
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-cv-ink truncate">{ct.name}</div>
                        <div className="text-xs font-mono text-cv-muted mt-0.5 truncate">{ct.title}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
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

        {/* Mobile: single card, full width */}
        <div className="sm:hidden">
          {TESTIMONIALS.map((ct, i) => {
            if (i !== active) return null;
            return (
              <div
                key={i}
                className="relative rounded-2xl border border-cv-line/40 overflow-hidden"
                style={{
                  background: `radial-gradient(ellipse 80% 50% at 20% 0%, #6954D440 0%, transparent 60%),
                    radial-gradient(ellipse 60% 70% at 80% 100%, #7C3AED20 0%, transparent 55%),
                    #0D0D0D`,
                }}
              >
                {/* Top bar */}
                <div className="flex items-center justify-between px-5 pt-5 pb-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className="h-7 w-7 rounded-md flex items-center justify-center text-white text-xs font-bold shrink-0"
                      style={{ background: ct.accentColor }}
                    >
                      {ct.companyInitial}
                    </div>
                    <span className="text-cv-ink font-semibold text-sm tracking-wide truncate">{ct.company}</span>
                  </div>
                  <SingleProgress active={active} running={!hovered && !busy} duration={CYCLE_MS} />
                </div>

                {/* Quote */}
                <div className="px-5 pb-5 pt-2">
                  <p className="text-cv-ink/85 text-base leading-relaxed">{ct.quote}</p>
                </div>

                {/* Footer */}
                <div className="border-t border-cv-line/50 px-5 py-4">
                  <div className="flex items-start gap-3">
                    <Avatar initials={ct.initials} color={ct.accentColor} size={34} />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-cv-ink">{ct.name}</div>
                      <div className="text-xs font-mono text-cv-muted mt-0.5 leading-snug">{ct.title}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap mt-3">
                    <span className="flex items-center gap-1 text-xs font-mono text-cv-muted">
                      Why {ct.whyLabel} <Heart weight="Linear" size={10} className="text-red-400 ml-0.5" />
                    </span>
                    {ct.tags.map((tag) => (
                      <span
                        key={tag.label}
                        className="flex items-center gap-1 text-[11px] font-mono text-cv-ink/60 border border-cv-blue/30 bg-cv-blue/10 rounded-full px-2 py-0.5 whitespace-nowrap"
                      >
                        {tag.icon} {tag.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile dots */}
        <div className="flex sm:hidden justify-center gap-2 mt-4">
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
