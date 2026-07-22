"use client";

import { useCallback, useEffect, useState, type ReactElement } from "react";
import useEmblaCarousel from "embla-carousel-react";

/* Draggable feature carousel for the Agentry page. Each slide is a card with a
   lightweight product-mockup illustration on top and a title + description
   pinned to the bottom (fixed illustration height keeps the titles aligned
   across slides of different widths). cv-* tokens throughout for light/dark. */

const CARD =
  "flex h-full flex-col gap-6 rounded-2xl border border-cv-line/60 bg-cv-card p-6 shadow-[0_10px_30px_-16px_rgba(15,23,42,0.15)] dark:border-white/10 dark:bg-[#0D0D0D] dark:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)]";
const ILLO = "flex h-[260px] items-center justify-center self-center";

function Check({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

/* ── Illustration 1: model catalog ─────────────────────────────────────── */
const MODELS = [
  { name: "GPT-4o", mono: "AI", color: "#0E9E7A", meta: "312ms" },
  { name: "Claude", mono: "AN", color: "#C96442", meta: "290ms" },
  { name: "Gemini", mono: "GM", color: "#4285F4", meta: "features" },
  { name: "Mistral", mono: "ML", color: "#EE792F", meta: "features" },
  { name: "Llama-3", mono: "LL", color: "#6954D4", meta: "features" },
];
function ModelsIllo() {
  return (
    <div className="w-[300px] max-w-full rounded-xl border border-cv-line/70 bg-cv-ink/[0.02] p-3 dark:border-white/[0.07] dark:bg-white/[0.02]">
      <div className="mb-2 flex items-center gap-1.5 px-1 text-[11px] font-semibold uppercase tracking-widest text-cv-muted">
        Models
        <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 rotate-90 fill-current opacity-50" aria-hidden><polygon points="6 3 20 12 6 21 6 3" /></svg>
      </div>
      <div className="space-y-1.5">
        {MODELS.map((m, i) => (
          <div
            key={m.name}
            className={[
              "flex items-center gap-2.5 rounded-lg border px-2.5 py-2",
              i === 0
                ? "border-[#1664C0]/40 bg-[#1664C0]/[0.06] dark:border-[#7CB8F8]/30 dark:bg-[#7CB8F8]/[0.06]"
                : "border-transparent",
            ].join(" ")}
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[9px] font-bold text-white" style={{ background: m.color }}>
              {m.mono}
            </span>
            <span className="flex-1 truncate text-sm font-medium text-cv-ink">{m.name}</span>
            {i === 0 ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#1664C0]/12 px-2 py-0.5 text-[10px] font-semibold text-[#1664C0] dark:bg-[#7CB8F8]/15 dark:text-[#7CB8F8]">
                <Check className="h-2.5 w-2.5" /> routed
              </span>
            ) : (
              <span className="font-mono text-[10px] text-cv-muted">{m.meta}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Illustration 2: guardrail checklist ───────────────────────────────── */
const GUARDS = [
  { label: "PII redaction", on: true },
  { label: "Budget cap · $0.0005", on: true },
  { label: "EU residency", on: true },
  { label: "Approved providers", on: true },
  { label: "Rate limit", on: false },
];
function GuardrailsIllo() {
  return (
    <div className="w-[260px] max-w-full rounded-xl border border-cv-line/70 bg-cv-ink/[0.02] p-4 dark:border-white/[0.07] dark:bg-white/[0.02]">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-cv-ink">Guardrails</span>
        <span className="font-mono text-[11px] text-cv-muted">4/5</span>
      </div>
      <div className="space-y-2.5">
        {GUARDS.map((g) => (
          <div key={g.label} className="flex items-center gap-2.5">
            <span
              className={[
                "flex size-4 items-center justify-center rounded",
                g.on ? "bg-[#0E9E7A]/25 text-[#0E9E7A] dark:text-[#34D399]" : "border border-cv-line text-transparent",
              ].join(" ")}
            >
              {g.on && <Check className="h-2.5 w-2.5" />}
            </span>
            <span className={g.on ? "text-sm text-cv-ink/80" : "text-sm text-cv-muted"}>{g.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Illustration 3: decision timeline ─────────────────────────────────── */
const STEPS = [
  { label: "Request scored", meta: "12ms", accent: "#1664C0" },
  { label: "Route selected · GPT-4o-mini", meta: "now", accent: "#0E9E7A" },
  { label: "Logged & attributed", meta: "audit", accent: "#6954D4" },
];
function TimelineIllo() {
  return (
    <div className="w-[320px] max-w-full">
      <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#0E9E7A]/12 px-2.5 py-1 text-[11px] font-semibold text-[#0E9E7A] dark:text-[#34D399]">
        <span className="h-1.5 w-1.5 rounded-full bg-current" /> Decision resolved
      </div>
      <div className="relative space-y-3 pl-6">
        <div className="absolute bottom-3 left-[7px] top-2 border-l border-dashed border-cv-line" />
        {STEPS.map((s) => (
          <div key={s.label} className="relative">
            <span className="absolute -left-6 top-1.5 h-3.5 w-3.5 rounded-full border-2 bg-cv-card dark:bg-[#0D0D0D]" style={{ borderColor: s.accent }} />
            <div className="flex items-center justify-between gap-2 rounded-xl border border-cv-line/70 bg-cv-ink/[0.02] px-3 py-2.5 dark:border-white/[0.07] dark:bg-white/[0.02]">
              <span className="text-sm font-medium text-cv-ink/85">{s.label}</span>
              <span className="font-mono text-[10px] text-cv-muted">{s.meta}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Illustration 4: cost attribution ──────────────────────────────────── */
const TEAMS = [
  { name: "Platform", pct: 42, cost: "$18.7k", color: "#1664C0" },
  { name: "Support", pct: 28, cost: "$12.4k", color: "#0E9E7A" },
  { name: "Data", pct: 18, cost: "$8.0k", color: "#D97706" },
  { name: "Growth", pct: 12, cost: "$5.3k", color: "#6954D4" },
];
function AttributionIllo() {
  return (
    <div className="w-[260px] max-w-full rounded-xl border border-cv-line/70 bg-cv-ink/[0.02] p-4 dark:border-white/[0.07] dark:bg-white/[0.02]">
      <div className="mb-3 text-sm font-semibold text-cv-ink">Cost by team</div>
      <div className="space-y-3">
        {TEAMS.map((t) => (
          <div key={t.name}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-cv-ink/80">{t.name}</span>
              <span className="font-mono text-cv-muted">{t.cost}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-cv-ink/[0.06] dark:bg-white/[0.08]">
              <div className="h-full rounded-full" style={{ width: `${t.pct}%`, background: t.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

type Slide = { title: string; desc: string; Illo: () => ReactElement; basis: string };
const SLIDES: Slide[] = [
  {
    title: "One API. Every model.",
    desc: "GPT, Claude, Gemini, Mistral, and Llama behind a single interface, scored live on cost, latency, and quality with seamless switching.",
    Illo: ModelsIllo,
    basis: "lg:flex-[0_0_58%]",
  },
  {
    title: "Guardrails before the request.",
    desc: "Policy, budget, and residency enforced at decision time, not reconciled at month-end.",
    Illo: GuardrailsIllo,
    basis: "lg:flex-[0_0_38%]",
  },
  {
    title: "Every decision on the record.",
    desc: "Each request logged with the constraints active, the routes evaluated, and why one won.",
    Illo: TimelineIllo,
    basis: "lg:flex-[0_0_58%]",
  },
  {
    title: "Cost attributed to every team.",
    desc: "Every run lands against a team, a feature, and a tenant, automatically.",
    Illo: AttributionIllo,
    basis: "lg:flex-[0_0_38%]",
  },
];

export default function AixFeatureCarousel() {
  const [emblaRef, embla] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect).on("reInit", onSelect);
    return () => {
      embla.off("select", onSelect).off("reInit", onSelect);
    };
  }, [embla, onSelect]);

  return (
    <section className="cv-section overflow-hidden">
      <div className="cv-container">
        {/* header */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="cv-h2 text-cv-ink">One decision layer for every AI request.</h2>
          <p className="cv-body-lg text-cv-muted mt-4">
            Agentry routes, governs, and proves every call across your models and providers. The right route is chosen per request, with the evidence to back it.
          </p>
        </div>
        {/* controls (desktop) */}
        <div className="mt-6 hidden justify-center gap-2 md:flex">
          <CarouselButton dir="prev" disabled={!canPrev} onClick={() => embla?.scrollPrev()} />
          <CarouselButton dir="next" disabled={!canNext} onClick={() => embla?.scrollNext()} />
        </div>

        {/* carousel */}
        <div className="mt-12 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {SLIDES.map(({ title, desc, Illo, basis }) => (
              <div
                key={title}
                className={`min-w-0 flex-[0_0_88%] sm:flex-[0_0_60%] ${basis}`}
              >
                <div className={CARD}>
                  <div className={ILLO}>
                    <Illo />
                  </div>
                  <div className="mt-auto space-y-2">
                    <h3 className="font-medium text-cv-ink">{title}</h3>
                    <p className="text-balance text-cv-ink/65">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* controls (mobile) */}
        <div className="mt-6 flex justify-center gap-2 md:hidden">
          <CarouselButton dir="prev" disabled={!canPrev} onClick={() => embla?.scrollPrev()} />
          <CarouselButton dir="next" disabled={!canNext} onClick={() => embla?.scrollNext()} />
        </div>
      </div>
    </section>
  );
}

function CarouselButton({ dir, disabled, onClick }: { dir: "prev" | "next"; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous" : "Next"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-cv-line text-cv-ink transition-colors enabled:hover:bg-cv-ink/[0.06] disabled:opacity-35 dark:enabled:hover:bg-white/10"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {dir === "prev" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 6l6 6-6 6" />}
      </svg>
    </button>
  );
}
