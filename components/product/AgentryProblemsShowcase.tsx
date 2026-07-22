"use client";

import Link from "next/link";
import { ArrowRight, Magnifer, DocumentText, Widget, Export } from "@/lib/solar-icons";
import { Fragment, useCallback, useEffect, useRef, useState, type ReactElement, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { DEMO_URL } from "@/lib/links";

/* "Four problems Agentry fixes" — draggable carousel of feature cells (title + body
   + Learn More + a product-mock card). Every mock shares one design language —
   a titled dark panel with the CardLightEdge stroke/glow, bottom EDGE_FADE,
   cv-* tokens, status colors and mono metrics — but each problem gets its own
   composition so the four cards read as distinct:
     1. Routing decision   → vertical cost-bar comparison of candidates
     2. Policy evaluations  → status-row log (the canonical list look)
     3. Agent budgets       → horizontal per-agent budget meters
     4. Workloads           → 2×2 workload tile grid                          */

const EDGE_FADE = {
  WebkitMaskImage: "linear-gradient(to bottom,#000 82%,transparent 100%)",
  maskImage: "linear-gradient(to bottom,#000 82%,transparent 100%)",
} as const;

type Kind = "ok" | "blocked" | "flag" | "info";
const KIND_COLOR: Record<Kind, string> = {
  ok: "#0E9E7A",
  blocked: "#EF4444",
  flag: "#D97706",
  info: "#1664C0",
};

const PANEL = "border border-cv-line/70 bg-cv-ink/[0.02] dark:border-white/[0.07] dark:bg-white/[0.02]";

/* Shared light-edge treatment: gradient top-bright stroke + ambient top-left glow. */
function CardLightEdge() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[14px]"
        style={{
          padding: "1.5px",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 22%, rgba(255,255,255,0) 50%)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-6 -top-6 h-40 w-40 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(185,172,240,0.14), transparent 70%)", filter: "blur(26px)" }}
      />
    </>
  );
}

function KindIcon({ kind }: { kind: Kind }) {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {kind === "ok" && <path d="M5 13l4 4L19 7" />}
      {kind === "blocked" && <path d="M6 6l12 12M18 6L6 18" />}
      {kind === "flag" && <path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a1 1 0 0 0 .9 1.5h18.6a1 1 0 0 0 .9-1.5L13.7 3.9a1 1 0 0 0-1.7 0z" />}
      {kind === "info" && <path d="M5 12h11M13 7l5 5-5 5" />}
    </svg>
  );
}

function StatusBadge({ kind }: { kind: Kind }) {
  const c = KIND_COLOR[kind];
  return (
    <span
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border"
      style={{ borderColor: `${c}66`, color: c, background: `${c}1A` }}
    >
      <KindIcon kind={kind} />
    </span>
  );
}

function StatusPill({ kind, label }: { kind: Kind; label: string }) {
  const c = KIND_COLOR[kind];
  return (
    <span
      className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium"
      style={{ color: c, background: `${c}1A` }}
    >
      {label}
    </span>
  );
}

/* Shared card shell — the titled dark panel every mock lives inside. */
function MockCard({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div
      className="relative flex h-[430px] flex-col overflow-hidden rounded-2xl border border-cv-line/60 bg-cv-surface p-4 shadow-[0_10px_28px_-14px_rgba(16,24,40,0.10)] dark:border-white/[0.07] dark:bg-[#101014] dark:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]"
      style={EDGE_FADE}
    >
      <CardLightEdge />
      <div className="px-1 pb-3 text-base font-semibold text-cv-ink">{heading}</div>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}

/* ── Mock 1 · Routing decision — vertical cost-bar comparison ───────────── */
// Context bars use one cohesive blue scale (the site's primary accent) at
// full saturation, darkest → lightest as cost drops; the chosen route breaks
// the scale with green so the "winner" still reads instantly. Mixing four
// clashing status hues (red/amber/blue/green) at low opacity read as muddy
// against the dark panel — a single-hue ramp plus one accent avoids that.
const CANDIDATES = [
  { name: "opus", cost: 0.00298, color: "#0E3F8C" },
  { name: "gpt-4o", cost: 0.0025, color: "#1664C0" },
  { name: "mistral", cost: 0.0003, color: "#4D9AEF" },
  { name: "4o-mini", cost: 0.0001, color: KIND_COLOR.ok, chosen: true },
];
function RoutingMock() {
  const max = Math.max(...CANDIDATES.map((c) => c.cost));
  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className={`flex flex-1 items-end justify-between gap-3 rounded-xl p-4 ${PANEL}`}>
        {CANDIDATES.map((c) => (
          <div key={c.name} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
            <span className="font-mono text-[10px] text-cv-muted">${c.cost.toFixed(5)}</span>
            <div
              className="w-full rounded-t-md transition-all"
              style={{
                height: `${8 + (c.cost / max) * 92}%`,
                background: c.color,
                boxShadow: c.chosen ? `0 0 16px -2px ${c.color}` : undefined,
              }}
            />
            <span className={c.chosen ? "text-[11px] font-medium text-cv-ink" : "text-[11px] text-cv-muted"}>{c.name}</span>
          </div>
        ))}
      </div>
      <div className={`flex items-center gap-3 rounded-xl px-3 py-3 ${PANEL}`}>
        <StatusBadge kind="ok" />
        <div className="min-w-0">
          <div className="truncate text-sm text-cv-ink/90">Routed → gpt-4o-mini</div>
          <div className="text-[11px] text-cv-muted">Cheapest route that holds quality</div>
        </div>
        <span className="ml-auto"><StatusPill kind="ok" label="96.8% saved" /></span>
      </div>
    </div>
  );
}

/* ── Mock 2 · Policy evaluations — status-row log (canonical list) ──────── */
type Row = { kind: Kind; pill: string; title: string; sub: string; details?: [string, string][] };
const POLICY_ROWS: Row[] = [
  {
    kind: "ok",
    pill: "Allowed",
    title: "gpt-4o · eu-west-1 prompt",
    sub: "March 9th, 2025",
    details: [
      ["policy_id", "pg-prod-guardrails"],
      ["decision", "Allowed before run"],
      ["data_residency", "eu-west-1"],
      ["access_role", "FinOps Admin"],
      ["checks", "PII redaction, budget-limit"],
      ["gate_latency", "42ms"],
    ],
  },
  { kind: "blocked", pill: "Blocked", title: "claude-3 · us-east agent call", sub: "March 3rd, 2025" },
  { kind: "flag", pill: "Flagged", title: "llama-3 · ap-south fine-tune", sub: "March 3rd, 2025" },
];
function EvalRow({ kind, pill, title, sub, details }: Row) {
  return (
    <div className={`rounded-xl px-3 py-3 ${PANEL}`}>
      <div className="flex items-center gap-3">
        <StatusBadge kind={kind} />
        <div className="min-w-0">
          <div className="truncate text-sm text-cv-ink/90">{title}</div>
          <div className="text-[11px] text-cv-muted">{sub}</div>
        </div>
        <span className="ml-auto"><StatusPill kind={kind} label={pill} /></span>
      </div>
      {details && (
        <div className="mt-3 grid grid-cols-[minmax(120px,auto)_1fr] gap-x-6 gap-y-1.5 border-t border-cv-line/60 pt-3 text-xs dark:border-white/5">
          {details.map(([k, v]) => (
            <Fragment key={k}>
              <span className="truncate text-cv-muted">{k}:</span>
              <span className="font-mono text-cv-ink/80">{v}</span>
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
function PolicyMock() {
  return (
    <div className="flex flex-1 flex-col justify-between gap-2.5">
      {POLICY_ROWS.map((r) => (
        <EvalRow key={r.title} {...r} />
      ))}
    </div>
  );
}

/* ── Mock 3 · Agent budgets — horizontal budget meters ──────────────────── */
const AGENTS: { name: string; spent: number; cap: number; kind: Kind; pill: string }[] = [
  { name: "support-agent", spent: 124, cap: 200, kind: "ok", pill: "On track" },
  { name: "research-agent", spent: 176, cap: 200, kind: "flag", pill: "Near cap" },
  { name: "ops-agent", spent: 90, cap: 200, kind: "ok", pill: "On track" },
];
function BudgetMock() {
  return (
    <div className="flex flex-1 flex-col gap-2.5">
      {AGENTS.map((a) => {
        const pct = Math.round((a.spent / a.cap) * 100);
        const c = KIND_COLOR[a.kind];
        return (
          <div key={a.name} className={`rounded-xl px-3.5 py-3 ${PANEL}`}>
            <div className="flex items-center justify-between">
              <span className="text-sm text-cv-ink/90">{a.name}</span>
              <StatusPill kind={a.kind} label={a.pill} />
            </div>
            <div className="mt-2.5 flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-cv-ink/[0.06] dark:bg-white/[0.08]">
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: c }} />
              </div>
              <span className="shrink-0 font-mono text-[11px] text-cv-muted">${a.spent}/${a.cap}</span>
            </div>
          </div>
        );
      })}
      <div className={`mt-auto flex items-center justify-between rounded-xl px-3.5 py-3 text-xs ${PANEL}`}>
        <span className="text-cv-muted">Monthly spend variance</span>
        <span className="font-mono font-medium text-[#0E9E7A] dark:text-[#34D399]">3× → &lt;15%</span>
      </div>
    </div>
  );
}

/* ── Mock 4 · Workloads — 2×2 workload tile grid ────────────────────────── */
/* Copy claims each workload has its own *constraint profile* and that the
   team can re-route in hours, not a sprint — so every tile now surfaces both
   directly, instead of a mix of unrelated volume stats and an unlabeled
   status dot. Profile gets its own neutral color scale (not the ok/blocked
   status palette) since latency-first vs cost-first isn't a pass/fail state. */
type IconCmp = typeof Magnifer;
type Profile = "latency-first" | "cost-first" | "quality-first";
const PROFILE_COLOR: Record<Profile, string> = {
  "latency-first": "#1664C0",
  "cost-first": "#D97706",
  "quality-first": "#6954D4",
};
const WORKLOADS: { name: string; model: string; profile: Profile; switched: string; Icon: IconCmp }[] = [
  { name: "search", model: "GPT-4o-mini", profile: "latency-first", switched: "3h ago", Icon: Magnifer },
  { name: "summarize", model: "Claude", profile: "quality-first", switched: "1d ago", Icon: DocumentText },
  { name: "classify", model: "Gemini", profile: "cost-first", switched: "2h ago", Icon: Widget },
  { name: "extract", model: "Mistral", profile: "latency-first", switched: "6h ago", Icon: Export },
];
function WorkloadMock() {
  return (
    <div className="grid flex-1 grid-cols-2 auto-rows-fr gap-2.5">
      {WORKLOADS.map((w) => {
        const c = PROFILE_COLOR[w.profile];
        return (
          <div key={w.name} className={`flex flex-col gap-2.5 rounded-xl p-3.5 ${PANEL}`}>
            <div className="flex items-center gap-2">
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
                style={{ color: c, background: `${c}1A` }}
              >
                <w.Icon size={13} weight="Bold" />
              </span>
              <span className="text-sm font-medium text-cv-ink">{w.name}</span>
            </div>
            <span
              className="inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[10px] font-medium"
              style={{ color: c, background: `${c}1A` }}
            >
              {w.profile}
            </span>
            <div className="text-[11px] text-cv-muted">→ {w.model}</div>
            <div className="mt-auto font-mono text-[10px] text-cv-muted">switched {w.switched}</div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Four problems, each with its own mock ──────────────────────────────── */
type Problem = { title: string; body: string; heading: string; Mock: () => ReactElement };
const PROBLEMS: Problem[] = [
  {
    title: "Multi-provider cost arbitrage",
    body: "Requests are profiled by task complexity and routed to the cheapest model that holds quality — the same 15M calls drop from ~$44.7k to ~$12.6k a month.",
    heading: "Routing decision",
    Mock: RoutingMock,
  },
  {
    title: "Compliance-bound routing",
    body: "Residency rules configured per org and region, enforced before routing, so no unapproved provider ever slips into production.",
    heading: "Policy evaluations",
    Mock: PolicyMock,
  },
  {
    title: "GPU cost control for AI agents",
    body: "Per-agent budget caps applied at the routing layer take monthly spend variance from 3× down to under 15%.",
    heading: "Agent budgets",
    Mock: BudgetMock,
  },
  {
    title: "Multi-model product infrastructure",
    body: "Each feature is its own workload with its own constraint profile, so the team responds to model-market shifts in hours, not a sprint.",
    heading: "Workloads",
    Mock: WorkloadMock,
  },
];

const CELL =
  "group flex h-full flex-col rounded-2xl border border-cv-line/60 bg-cv-surface p-6 shadow-[0_20px_50px_-30px_rgba(16,24,40,0.28)] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-white/[0.07] dark:bg-[#0D0D0D] dark:shadow-[0_38px_84px_-34px_rgba(0,0,0,0.82)] lg:p-8";

function Cell({ title, body, heading, Mock }: Problem) {
  return (
    <div className={CELL}>
      <h3 className="text-lg font-semibold text-cv-ink">{title}</h3>
      <p className="mt-2 text-base leading-relaxed text-cv-ink/55">{body}</p>
      <Link
        href={DEMO_URL}
        className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#6954D4] transition-colors hover:text-[#5842c0] dark:text-[#A99CF0] dark:hover:text-[#C2B8F5]"
      >
        Learn More <ArrowRight weight="Linear" size={12} />
      </Link>
      <div className="mt-auto pt-8">
        <MockCard heading={heading}>
          <Mock />
        </MockCard>
      </div>
    </div>
  );
}

const DWELL_MS = 2200;

export default function AgentryProblemsShowcase() {
  const [emblaRef, embla] = useEmblaCarousel({ align: "start", loop: true, containScroll: "trimSnaps", duration: 14 });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [hovered, setHovered] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

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

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Auto-advance one card at a time; pauses on hover/touch and for
  // prefers-reduced-motion, and restarts its dwell whenever the user drags
  // the carousel manually so it doesn't fight their interaction.
  useEffect(() => {
    if (!embla || reduced || hovered) return;
    timer.current = setInterval(() => embla.scrollNext(), DWELL_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [embla, reduced, hovered]);

  return (
    <section
      className="cv-section overflow-hidden bg-cv-surface2 dark:bg-black"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="cv-container">
        {/* header */}
        <div className="mb-6 flex max-w-3xl flex-col items-start text-left">
          <h2 className="cv-h2 text-cv-ink">Four problems Agentry fixes.</h2>
          <p className="cv-body-lg text-cv-muted mt-4">
            The routing problems teams actually hit in production — and how Agentry resolves each one at decision time.
          </p>
        </div>
        {/* controls (desktop) */}
        <div className="mb-12 hidden justify-center gap-2 md:flex">
          <CarouselButton dir="prev" disabled={!canPrev} onClick={() => embla?.scrollPrev()} />
          <CarouselButton dir="next" disabled={!canNext} onClick={() => embla?.scrollNext()} />
        </div>

        {/* carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6 lg:gap-8">
            {PROBLEMS.map((p) => (
              <div key={p.title} className="min-w-0 flex-[0_0_88%] sm:flex-[0_0_60%] lg:flex-[0_0_46%]">
                <Cell {...p} />
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
