"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { UserRounded } from "@/lib/solar-icons";

export type Persona = { role: string; quote: string; category?: string };

const CYCLE_MS = 6000;
const EXPAND_MS = 420;
const COLLAPSED_W = 60;

// Per-card accent variety (matches the home testimonial look, where each card
// carries its own colour). Cycled by index.
const PALETTE = ["#1664C0", "#6954D4", "#0E9E7A", "#D97706", "#2278E0"];

// ── Ambient glow behind the active card (home testimonial style) ──────────────
function AmbientGlow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute"
        style={{
          left: "-12%", top: "8%", width: "78%", height: "82%",
          borderRadius: 240, filter: "blur(96px)", opacity: 0.32, transform: "rotate(-24deg)",
          background: "linear-gradient(90deg, #1664C0 0%, #2278E0 100%)",
        }}
      />
      <div
        className="absolute"
        style={{
          right: "-14%", bottom: "-6%", width: "52%", height: "70%",
          borderRadius: 200, filter: "blur(90px)", opacity: 0.2, transform: "rotate(18deg)",
          background: "linear-gradient(90deg, #2278E0 0%, #1664C0 100%)",
        }}
      />
    </div>
  );
}

// ── Small auto-advance progress bar in the active card header ──────────────────
function SingleProgress({ active, running, duration, className = "" }: {
  active: number; running: boolean; duration: number; className?: string;
}) {
  const [fillPct, setFillPct] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

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
      <div className="h-full rounded-full bg-cv-ink/45" style={{ width: `${fillPct}%`, transition: "none" }} />
    </div>
  );
}

function PersonaAvatar({ color, size = 38 }: { color: string; size?: number }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full"
      style={{ width: size, height: size, background: `${color}1A`, color }}
    >
      <UserRounded weight="Bold" size={size * 0.5} />
    </div>
  );
}

// ── Expanding-card carousel (home testimonial behaviour) ──────────────────────
function PersonaCarousel({ personas }: { personas: Persona[] }) {
  const [active, setActive] = useState(0);
  const [busy, setBusy] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [entered, setEntered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver((e) => setContainerW(e[0].contentRect.width));
    obs.observe(el);
    setContainerW(el.getBoundingClientRect().width);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setEntered(true); obs.disconnect(); } },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const goTo = useCallback((next: number) => {
    if (next === active || busy) return;
    setBusy(true);
    setActive(next);
    setTimeout(() => setBusy(false), EXPAND_MS);
  }, [active, busy]);

  const advance = useCallback(() => goTo((active + 1) % personas.length), [active, goTo, personas.length]);

  useEffect(() => {
    if (!entered || hovered || busy) return;
    const t = setTimeout(advance, CYCLE_MS);
    return () => clearTimeout(t);
  }, [active, entered, hovered, busy, advance]);

  const isMobile = containerW > 0 && containerW < 640;
  const collapsedCount = personas.length - 1;
  const activeW = containerW > 0
    ? isMobile ? containerW : containerW - collapsedCount * COLLAPSED_W - collapsedCount * 12
    : 0;

  const getW = (i: number) => {
    if (!containerW) return undefined;
    if (i === active) return activeW;
    return isMobile ? 0 : COLLAPSED_W;
  };

  return (
    <div ref={sectionRef}>
      <div
        ref={containerRef}
        className="flex gap-0 sm:gap-3"
        style={{ minHeight: 380 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {personas.map((p, i) => {
          const isActive = i === active;
          const w = getW(i);
          const accent = PALETTE[i % PALETTE.length];
          const staggerDelay = entered ? 0 : i * 80;
          const isCollapsedOnMobile = isMobile && !isActive;

          return (
            <div
              key={p.role}
              className={`relative shrink-0 overflow-hidden rounded-2xl ${isCollapsedOnMobile ? "border-0" : "border border-cv-line/40"}`}
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
              <div className="absolute inset-0" style={{ background: "hsl(var(--cv-surface))" }} />

              {/* active glow */}
              <div className="absolute inset-0 transition-opacity duration-500" style={{ opacity: isActive ? 1 : 0 }} aria-hidden>
                <AmbientGlow />
              </div>

              {/* collapsed strip */}
              <button
                className="absolute inset-0 flex w-full flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cv-blue/60"
                style={{
                  opacity: isActive ? 0 : 1,
                  pointerEvents: isActive || busy ? "none" : "auto",
                  transition: `opacity ${EXPAND_MS * 0.4}ms ease-in-out`,
                  paddingTop: 20, paddingBottom: 20,
                }}
                onClick={() => goTo(i)}
                tabIndex={isActive ? -1 : 0}
                aria-label={`View: ${p.role}`}
              >
                <span
                  className="select-none whitespace-nowrap font-mono text-[11px] text-cv-muted/70"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.1em" }}
                >
                  {p.role}
                </span>
                <div className="mt-auto">
                  <PersonaAvatar color={accent} size={42} />
                </div>
              </button>

              {/* expanded content */}
              <div
                className="absolute inset-0 z-10 flex flex-col"
                style={{
                  opacity: isActive ? 1 : 0,
                  pointerEvents: isActive ? "auto" : "none",
                  transition: `opacity 260ms ease-in-out ${isActive ? EXPAND_MS * 0.55 : 0}ms`,
                }}
              >
                <div className="flex shrink-0 items-center justify-between gap-4 px-4 pb-3 pt-5 sm:gap-6 sm:px-7 sm:pb-4 sm:pt-6">
                  <div className="flex min-w-0 shrink-0 items-center gap-2">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-white" style={{ background: accent }}>
                      <UserRounded weight="Bold" size={15} />
                    </div>
                    <span className="truncate text-sm font-semibold tracking-wide text-cv-ink">{p.role}</span>
                  </div>
                  <SingleProgress
                    active={active}
                    running={entered && !hovered && !busy}
                    duration={CYCLE_MS}
                    className="w-20 shrink-0 sm:w-28"
                  />
                </div>

                <div className="flex flex-1 items-center overflow-hidden px-4 py-2 sm:px-7">
                  <p className="max-w-4xl text-[16px] leading-snug text-cv-ink/90 sm:text-[20px] lg:text-[26px]">
                    {p.quote}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-3 border-t border-cv-line/50 px-4 py-4 sm:px-7 sm:py-5">
                  <PersonaAvatar color={accent} size={38} />
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-cv-ink">{p.role}</div>
                    {p.category && <div className="mt-0.5 font-mono text-xs text-cv-muted">{p.category}</div>}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* mobile dots */}
      <div className="mt-5 flex justify-center gap-2 sm:hidden">
        {personas.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-cv-blue" : "w-1.5 bg-cv-line"}`}
            aria-label={`Go to persona ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export function WhoThisIsFor({
  roles,
  personas,
  accent,
  bg,
}: {
  roles?: string[];
  personas?: Persona[];
  accent: string;
  bg?: boolean;
}) {
  return (
    <section className={`cv-section relative overflow-hidden ${bg ? "bg-cv-surface dark:bg-black" : ""}`}>
      {/* soft accent glow, testimonial-style */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/4 h-72 w-[36rem] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${accent}22, transparent 70%)` }}
      />
      <div className="cv-container relative z-10">
        <div className="mb-10 flex max-w-3xl items-baseline gap-3 text-left">
          <h2 className="cv-h2 text-cv-ink">Who this is for.</h2>
          <span className="hidden text-sm text-cv-muted sm:inline">The people who own the number.</span>
        </div>

        {personas?.length ? (
          <PersonaCarousel personas={personas} />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {(roles ?? []).map((role) => (
              <div key={role} className="flex flex-col gap-3 rounded-xl border border-cv-line/40 bg-cv-ink/[0.02] p-5">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: `${accent}1A`, color: accent }}
                >
                  <UserRounded weight="Linear" size={18} />
                </div>
                <span className="text-sm font-medium leading-snug text-cv-ink/85">{role}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
