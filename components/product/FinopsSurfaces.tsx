import type { ReactNode } from "react";
import { StatusPill, BLUE } from "@/components/product/BentoChrome";

/* "Four product surfaces. One unified view." — the four FinOps surfaces laid
   out as ONE unified bento panel (TypingMind-style reference): a single
   bordered container subdivided by hairlines, each product mock floating
   directly on the cell canvas with the title + copy anchored beneath it. No
   per-card frames, no drop shadows or glows — depth is the hairline grid and
   the instruments themselves. cv-* tokens, theme-aware, server component. */

const AMBER = "#D97706";

/* ---- shared mock primitives -------------------------------------------- */

function MockLabel({ children }: { children: ReactNode }) {
  return (
    <span className="text-xs font-medium uppercase tracking-[0.12em] text-cv-muted">
      {children}
    </span>
  );
}

/* A labelled progress row: name + trailing value over a track bar. */
function BarRow({
  name,
  value,
  pct,
  color = BLUE,
}: {
  name: string;
  value: string;
  pct: number;
  color?: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-xs text-cv-ink/80">{name}</span>
        <span className="font-mono text-xs tabular-nums text-cv-ink/55">{value}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-cv-ink/[0.07] dark:bg-white/[0.08]">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

/* ---- 1. Workload mapping — allocation by team, reconciled to source ----- */
function AllocationViz() {
  const rows: [string, number, string][] = [
    ["Platform Eng", 42, "42% · $214k"],
    ["Data Science", 28, "28% · $142k"],
    ["Shared Services", 18, "18% · $91k"],
    ["Frontend", 12, "12% · $61k"],
  ];
  return (
    <div className="w-full">
      <div className="mb-5 flex items-center justify-between">
        <MockLabel>Allocation by team</MockLabel>
        <StatusPill kind="ok" label="Reconciled · 100%" />
      </div>
      <div className="space-y-4">
        {rows.map(([name, pct, value]) => (
          <BarRow key={name} name={name} value={value} pct={pct} />
        ))}
      </div>
    </div>
  );
}

/* ---- 2. Anomaly detection — a spike flagged and traced to its driver ---- */
function AnomalyViz() {
  const bars = [34, 30, 38, 32, 36, 33, 40, 35, 92, 41];
  const spike = 8;
  return (
    <div className="w-full">
      <div className="mb-5 flex items-center justify-between">
        <MockLabel>Daily spend · prod-emr</MockLabel>
        <span className="font-mono text-xs font-medium tabular-nums" style={{ color: AMBER }}>
          +$4,812
        </span>
      </div>
      <div className="flex h-24 items-end gap-2">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-[3px]"
            style={{
              height: `${h}%`,
              background: i === spike ? AMBER : BLUE,
              opacity: i === spike ? 1 : 0.32,
              boxShadow: i === spike ? `0 0 20px ${AMBER}99` : undefined,
            }}
          />
        ))}
      </div>
      <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-cv-line/70 px-3 py-2.5 dark:border-white/10">
        <StatusPill kind="flag" label="3.1× baseline" />
        <span className="text-xs text-cv-ink/70">Data Science · prod-emr · detected 2h ago</span>
      </div>
    </div>
  );
}

/* ---- 3. Commitments with payback proof — realized, not assumed ---------- */
function CommitmentsViz() {
  const tiles: [string, string][] = [
    ["Est. savings", "$128k/yr"],
    ["Payback", "7.4 mo"],
  ];
  const coverage: [string, number][] = [
    ["RI coverage", 72],
    ["Savings Plan", 64],
    ["CSP coverage", 58],
  ];
  return (
    <div className="w-full">
      <div className="mb-5 grid grid-cols-2 gap-3">
        {tiles.map(([l, v]) => (
          <div key={l} className="rounded-xl border border-cv-line/70 px-4 py-3 dark:border-white/10">
            <MockLabel>{l}</MockLabel>
            <div className="mt-1.5 font-mono text-lg font-bold tabular-nums text-cv-ink">{v}</div>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        {coverage.map(([l, pct]) => (
          <BarRow key={l} name={l} value={`${pct}%`} pct={pct} />
        ))}
      </div>
    </div>
  );
}

/* ---- 4. Audit-ready chargeback — multi-currency, reconciled to source --- */
function ChargebackViz() {
  const rows: [string, string][] = [
    ["EMEA", "€12.4k"],
    ["APAC", "¥9.8k"],
    ["Americas", "$21.1k"],
  ];
  return (
    <div className="w-full overflow-hidden rounded-xl border border-cv-line/70 dark:border-white/10">
      <div className="flex items-center justify-between px-4 py-3">
        <MockLabel>Chargeback · Q2</MockLabel>
        <StatusPill kind="info" label="EUR · JPY · USD" />
      </div>
      <div className="grid grid-cols-[1fr_auto] gap-3 border-t border-cv-line/70 px-4 py-2 dark:border-white/10">
        <MockLabel>Business unit</MockLabel>
        <span className="text-right text-xs font-medium uppercase tracking-[0.12em] text-cv-muted">
          Total
        </span>
      </div>
      {rows.map(([bu, total]) => (
        <div
          key={bu}
          className="grid grid-cols-[1fr_auto] items-center gap-3 border-t border-cv-line/70 px-4 py-3 dark:border-white/10"
        >
          <span className="text-xs text-cv-ink/80">{bu}</span>
          <span className="text-right font-mono text-xs tabular-nums text-cv-ink/90">{total}</span>
        </div>
      ))}
      <div className="grid grid-cols-[1fr_auto] items-center gap-3 border-t border-cv-line/70 bg-cv-ink/[0.02] px-4 py-3 dark:border-white/10 dark:bg-white/[0.03]">
        <span className="text-xs font-medium text-cv-ink">Total reconciled</span>
        <span className="text-right font-mono text-xs font-semibold tabular-nums text-cv-ink">$43.3k</span>
      </div>
    </div>
  );
}

/* ---- the four surfaces -------------------------------------------------- */

const CARDS = [
  {
    title: "Workload mapping",
    desc: "Shared spend mapped to teams, services, and products, automatically. Chargeback that survives an audit.",
    viz: <AllocationViz />,
  },
  {
    title: "Anomaly detection",
    desc: "Spikes flagged in real time and traced to a root-cause signal before they compound.",
    viz: <AnomalyViz />,
  },
  {
    title: "Commitments with payback proof",
    desc: "RIs, Savings Plans, and CUDs with realized payback tracked, not assumed.",
    viz: <CommitmentsViz />,
  },
  {
    title: "Audit-ready chargeback",
    desc: "Every currency normalized and reconciled back to source billing, so the number holds under review.",
    viz: <ChargebackViz />,
  },
];

export default function FinopsSurfaces() {
  return (
    <div className="overflow-hidden rounded-[24px] border border-cv-line/70 bg-cv-surface dark:border-white/10 dark:bg-[#080808]">
      <div className="grid grid-cols-1 gap-px bg-cv-line/60 dark:bg-white/[0.08] md:grid-cols-2">
        {CARDS.map(({ title, desc, viz }) => (
          <article
            key={title}
            className="flex flex-col gap-7 bg-cv-surface p-7 transition-colors duration-200 hover:bg-cv-ink/[0.015] dark:bg-[#080808] dark:hover:bg-white/[0.02] lg:p-9"
          >
            <div className="flex min-h-[200px] flex-1 items-center">{viz}</div>
            <div>
              <h3 className="text-lg font-semibold tracking-[-0.01em] text-cv-ink md:text-xl">{title}</h3>
              <p className="mt-2 max-w-[46ch] text-base leading-relaxed text-cv-ink/70">{desc}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
