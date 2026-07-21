import type { ReactNode } from "react";
import { Magnifer, CheckCircle } from "@/lib/solar-icons";

/* Platform capabilities — the control-plane story from PRODUCT.md (every model
   and agent onboarded, given a job, budgeted, reviewed, audited) laid out as ONE
   bordered bento panel: a single container subdivided by hairlines into a 2-cell
   row over a 3-cell row, with a real working mini-mockup floating on each cell
   canvas and the title + copy anchored beneath. No per-cell card shells, no
   drop shadows or gradients — depth is the hairline grid and the instruments.
   cv-* tokens, theme-aware, server component. Responsive: both rows collapse to
   a single column below md. */

const PURPLE = "#6954D4"; // AIX / control-plane accent
const TEAL = "#0E9E7A"; // good / on / reconciled
const AMBER = "#D97706"; // attention

/* ---- shared mock primitives -------------------------------------------- */

/* Flat-fill status pill with a leading dot. */
function Pill({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold"
      style={{ color, background: `${color}1A` }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

function MockLabel({ children }: { children: ReactNode }) {
  return (
    <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-cv-muted">
      {children}
    </span>
  );
}

/* ---- 1. Model & agent registry — search + a live model list ------------- */
function RegistryMock() {
  const rows: [string, string, string, string][] = [
    ["4o", "gpt-4o", "Active", TEAL],
    ["S4", "claude-sonnet-4", "Active", TEAL],
    ["rag", "internal-rag", "Onboarding", AMBER],
  ];
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 rounded-lg border border-cv-line/70 bg-cv-ink/[0.02] px-3 py-2 dark:border-white/10 dark:bg-white/[0.03]">
        <Magnifer size={14} className="shrink-0 text-cv-muted" />
        <span className="text-[13px] text-cv-muted">Search models</span>
      </div>
      <div className="mt-3 space-y-2.5">
        {rows.map(([tag, name, status, color]) => (
          <div key={name} className="flex items-center gap-2.5">
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-mono text-[10px] font-semibold"
              style={{ color: PURPLE, background: `${PURPLE}1A` }}
            >
              {tag}
            </span>
            <span className="truncate font-mono text-[13px] text-cv-ink/85">{name}</span>
            <span className="ml-auto shrink-0">
              <Pill label={status} color={color} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- 2. Unified spend — one model across cloud / AI / data / SaaS ------- */
function SpendMock() {
  const rows: [string, number, string][] = [
    ["Cloud", 46, "$214k"],
    ["AI", 29, "$134k"],
    ["Data", 15, "$71k"],
    ["SaaS", 10, "$48k"],
  ];
  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <MockLabel>Spend under management</MockLabel>
        <Pill label="Reconciled" color={TEAL} />
      </div>
      <div className="space-y-3">
        {rows.map(([name, pct, amt]) => (
          <div key={name}>
            <div className="mb-1.5 flex items-baseline justify-between text-[12px]">
              <span className="text-cv-ink/80">{name}</span>
              <span className="font-mono tabular-nums text-cv-ink/55">{amt}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-cv-ink/[0.07] dark:bg-white/[0.08]">
              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: PURPLE }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- 3. Budgets & policy — enforcement toggle over a budget cap --------- */
function PolicyMock() {
  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between rounded-xl border border-cv-line/70 px-3.5 py-3 dark:border-white/10">
        <span className="text-[13px] font-medium text-cv-ink">Policy enforcement</span>
        {/* toggle — on */}
        <span
          className="relative inline-flex h-5 w-9 shrink-0 items-center rounded-full"
          style={{ background: PURPLE }}
        >
          <span className="absolute right-0.5 h-4 w-4 rounded-full bg-white" />
        </span>
      </div>
      <div className="rounded-xl border border-cv-line/70 px-3.5 py-3 dark:border-white/10">
        <div className="mb-2 flex items-baseline justify-between text-[12px]">
          <span className="text-cv-ink/80">Budget cap · Research</span>
          <span className="font-mono tabular-nums text-cv-ink/55">82%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-cv-ink/[0.07] dark:bg-white/[0.08]">
          <div className="h-full rounded-full" style={{ width: "82%", background: AMBER }} />
        </div>
      </div>
    </div>
  );
}

/* ---- 4. Routing & controls — a labelled cost↔quality slider ------------- */
function RoutingMock() {
  return (
    <div className="w-full rounded-xl border border-cv-line/70 px-3.5 py-3.5 dark:border-white/10">
      <div className="mb-3 flex items-baseline justify-between">
        <span className="text-[13px] font-medium text-cv-ink">Routing</span>
        <span className="font-mono text-[12px] tabular-nums text-cv-ink/60">Balanced</span>
      </div>
      <div className="relative h-1.5 w-full rounded-full bg-cv-ink/[0.07] dark:bg-white/[0.08]">
        <div className="h-full rounded-full" style={{ width: "52%", background: PURPLE }} />
        <span
          className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 bg-cv-surface dark:bg-black"
          style={{ left: "52%", marginLeft: "-7px", borderColor: PURPLE }}
        />
      </div>
      <div className="mt-2.5 flex items-center justify-between text-[10px] text-cv-muted">
        <span>Cost</span>
        <span>Latency</span>
        <span>Quality</span>
      </div>
    </div>
  );
}

/* ---- 5. Audit trail — a reviewable log of control-plane events ---------- */
function AuditMock() {
  const rows: [string, string][] = [
    ["Budget approved · Research", "2m ago"],
    ["Model onboarded · internal-rag", "1h ago"],
    ["Policy updated · Platform", "3h ago"],
  ];
  return (
    <div className="w-full overflow-hidden rounded-xl border border-cv-line/70 dark:border-white/10">
      {rows.map(([event, time], i) => (
        <div
          key={event}
          className={`flex items-center gap-2.5 px-3.5 py-3 ${i > 0 ? "border-t border-cv-line/70 dark:border-white/10" : ""}`}
        >
          <CheckCircle weight="Bold" size={15} className="shrink-0" style={{ color: TEAL }} />
          <span className="truncate text-[12px] text-cv-ink/80">{event}</span>
          <span className="ml-auto shrink-0 font-mono text-[11px] tabular-nums text-cv-muted">{time}</span>
        </div>
      ))}
    </div>
  );
}

/* ---- the five capabilities --------------------------------------------- */

type Cell = { title: string; desc: string; mock: ReactNode };

const ROW_1: Cell[] = [
  {
    title: "Model & agent registry",
    desc: "Every model, agent, and copilot onboarded and on the books, with an owner, a job, and a status.",
    mock: <RegistryMock />,
  },
  {
    title: "Unified spend",
    desc: "Cloud, AI, data, and SaaS spend on one model, every dollar mapped to an owner and reconciled to the bill.",
    mock: <SpendMock />,
  },
];

const ROW_2: Cell[] = [
  {
    title: "Budgets & policy",
    desc: "Budgets and guardrails per team, model, or agent, enforced before the spend happens.",
    mock: <PolicyMock />,
  },
  {
    title: "Routing & controls",
    desc: "Tune routing between cost and quality, with limits you set per workload.",
    mock: <RoutingMock />,
  },
  {
    title: "Audit trail",
    desc: "Every budget and policy change logged and reviewable, so the record holds under audit.",
    mock: <AuditMock />,
  },
];

function CapabilityCell({ cell, mockMinH }: { cell: Cell; mockMinH: string }) {
  return (
    <article className="flex flex-col gap-6 bg-cv-surface p-7 transition-colors duration-200 hover:bg-cv-ink/[0.015] dark:bg-[#080808] dark:hover:bg-white/[0.02] lg:p-9">
      <div className={`flex items-start ${mockMinH}`}>{cell.mock}</div>
      <div>
        <h3 className="font-display text-lg font-semibold tracking-tight text-cv-ink">{cell.title}</h3>
        <p className="mt-2 max-w-[42ch] text-sm font-medium leading-relaxed text-cv-ink/70">{cell.desc}</p>
      </div>
    </article>
  );
}

export function Capabilities({
  label = "Platform capabilities",
  heading = "Put every model, agent, and dollar on the books.",
  color = PURPLE,
}: {
  label?: string;
  heading?: string;
  color?: string;
}) {
  return (
    <section className="cv-section bg-cv-surface">
      <div className="cv-container">
        <div className="mb-10 max-w-3xl">
          <div className="cv-label mb-3" style={{ color }}>{label}</div>
          <h2 className="cv-h2 text-cv-ink">{heading}</h2>
        </div>

        {/* one bordered container, subdivided by hairlines into 2 over 3 */}
        <div className="cv-record-rise overflow-hidden rounded-[24px] border border-cv-line/70 dark:border-white/10">
          <div className="grid gap-px bg-cv-line/60 dark:bg-white/[0.08]">
            {/* row 1 — two cells */}
            <div className="grid gap-px bg-cv-line/60 dark:bg-white/[0.08] md:grid-cols-2">
              {ROW_1.map((cell) => (
                <CapabilityCell key={cell.title} cell={cell} mockMinH="min-h-[168px]" />
              ))}
            </div>
            {/* row 2 — three cells */}
            <div className="grid gap-px bg-cv-line/60 dark:bg-white/[0.08] md:grid-cols-3">
              {ROW_2.map((cell) => (
                <CapabilityCell key={cell.title} cell={cell} mockMinH="min-h-[116px]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Capabilities;
