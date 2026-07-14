"use client";

import { useEffect, useState } from "react";

/* FinOps "what you ship" bento — image-topped cards in the home/AixGovernance
   idiom: a polished product-screenshot mock fills a top "screenshot" slot
   (bordered panel with a lit top-left edge + ambient glow on a dark surface,
   content fading at the bottom), with the title + description in a footer
   below. Blue is the neutral accent; green = proof/reconciled, amber =
   anomaly/expiring, red = restricted. Theme-aware via cv-* tokens. */

const BLUE = "#2278E0";
const OK = "#0E9E7A";
const VIOLET = "#6954D4";
const AMBER = "#D97706";
const GRAY = "#94969C";

const EDGE_FADE = {
  WebkitMaskImage: "linear-gradient(to bottom,#000 90%,transparent 100%)",
  maskImage: "linear-gradient(to bottom,#000 90%,transparent 100%)",
} as const;

/* ─────────────────────────── card + panel chrome ─────────────────────────── */

function FeatureCard({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-cv-line/60 bg-cv-surface dark:border-white/10 dark:bg-[#0D0D0D]">
      <div className="relative flex h-64 shrink-0 items-center justify-center overflow-hidden bg-cv-surface2 p-6 dark:bg-black">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(34,120,224,0.18), transparent 70%)" }}
        />
        <div className="relative flex h-full w-full flex-col justify-center">{children}</div>
      </div>
      <div className="flex flex-1 flex-col px-5 pt-6 pb-6 md:px-6 md:pb-7">
        <h3 className="mb-2 text-base font-semibold text-cv-ink md:text-lg">{title}</h3>
        <p className="text-sm text-cv-muted md:text-base">{desc}</p>
      </div>
    </div>
  );
}

function CardLightEdge() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
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
        style={{ background: "radial-gradient(circle, rgba(200,218,255,0.13), transparent 70%)", filter: "blur(26px)" }}
      />
    </>
  );
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className="relative flex flex-1 flex-col overflow-hidden rounded-[14px] border border-cv-line bg-white shadow-[0_10px_28px_-14px_rgba(16,24,40,0.10)] dark:border-white/10 dark:bg-black dark:shadow-[0_12px_30px_-12px_rgba(0,0,0,0.6)]"
      style={EDGE_FADE}
    >
      <CardLightEdge />
      <div className={`relative flex flex-1 flex-col ${className}`}>{children}</div>
    </div>
  );
}

/* ─────────────────────────── small building blocks ─────────────────────────── */

function Pill({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span className="justify-self-start rounded-full px-2 py-0.5 text-[10px] font-medium" style={{ color, background: `${color}1A` }}>
      {children}
    </span>
  );
}

function Tab({ label, active }: { label: string; active?: boolean }) {
  return (
    <span
      className="rounded-md border px-2.5 py-1 text-[11px] font-medium"
      style={
        active
          ? { color: BLUE, borderColor: `${BLUE}80`, background: `${BLUE}1a` }
          : { color: "hsl(var(--cv-muted))", borderColor: "hsl(var(--cv-line))" }
      }
    >
      {label}
    </span>
  );
}

/* ───────────────────────────── the four mocks ───────────────────────────── */

type VizProps = { reduced: boolean };

/* 1. Allocation — team split table with share bars + realized $. */
function AllocationViz() {
  const rows: [string, number, string, string][] = [
    ["Engineering", 46, BLUE, "$84.2k"],
    ["Data", 28, OK, "$51.3k"],
    ["Platform", 18, VIOLET, "$33.0k"],
    ["Shared", 8, GRAY, "$14.7k"],
  ];
  return (
    <Panel className="p-0">
      <div className="flex items-center gap-1.5 border-b border-cv-line px-3 py-2 dark:border-white/10">
        <Tab label="Teams" active />
        <Tab label="Services" />
        <Tab label="Env" />
      </div>
      <div className="grid grid-cols-[1fr_1.3fr_auto] items-center gap-3 border-b border-cv-line px-3 py-1.5 text-[10px] uppercase tracking-wide text-cv-muted dark:border-white/10">
        <span>Team</span>
        <span>Share</span>
        <span className="text-right">Cost</span>
      </div>
      {rows.map(([name, pct, color, cost], i) => (
        <div
          key={name}
          className={`grid grid-cols-[1fr_1.3fr_auto] items-center gap-3 px-3 py-2 text-xs ${i > 0 ? "border-t border-cv-line dark:border-white/10" : ""}`}
        >
          <span className="truncate text-cv-ink/80">{name}</span>
          <div className="flex items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-cv-ink/10 dark:bg-white/10">
              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
            </div>
            <span className="w-8 text-right tabular-nums" style={{ color }}>{pct}%</span>
          </div>
          <span className="whitespace-nowrap font-mono tabular-nums text-cv-muted">{cost}</span>
        </div>
      ))}
    </Panel>
  );
}

/* 2. Anomaly — cost chart (gradient area) with the spike attributed to a team. */
function AnomalyViz({ reduced }: VizProps) {
  const LINE =
    "40,104 56,98 70,100 86,92 100,96 116,86 130,90 146,82 160,86 176,78 190,82 206,73 220,77 234,67 246,26 256,64 268,60 282,56 298,49 308,45";
  const grid = [
    [24, "20K"],
    [73, "10K"],
    [122, "0"],
  ] as const;
  return (
    <Panel className="gap-1.5 p-3">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wide text-cv-muted">Cost anomalies · last 24h</span>
        <span className="font-mono text-[10px] text-cv-muted">
          team:<span className="text-cv-ink/80">data-eng</span> · svc:<span className="text-cv-ink/80">BigQuery</span>
        </span>
      </div>
      <div className="relative min-h-0 flex-1">
        <svg viewBox="0 0 320 150" className="h-full w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="fs-anom-line" x1="40" y1="0" x2="308" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#22C55E" />
              <stop offset="52%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#F97316" />
            </linearGradient>
            <linearGradient id="fs-anom-fill" x1="0" y1="12" x2="0" y2="130" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </linearGradient>
          </defs>
          {grid.map(([y, label]) => (
            <g key={label}>
              <line x1={40} y1={y} x2={316} y2={y} stroke="hsl(var(--cv-line))" strokeWidth={1} strokeOpacity={0.5} vectorEffect="non-scaling-stroke" />
              <text x={34} y={y + 3.5} textAnchor="end" fontSize={9} fill="hsl(var(--cv-muted))">{label}</text>
            </g>
          ))}
          <polygon points={`${LINE} 308,130 40,130`} fill="url(#fs-anom-fill)" />
          <polyline points={LINE} fill="none" stroke="url(#fs-anom-line)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          <line x1={246} y1={26} x2={246} y2={130} stroke={AMBER} strokeWidth={1} strokeDasharray="2 3" opacity={0.5} vectorEffect="non-scaling-stroke" />
          <circle cx={246} cy={26} r={7} fill={AMBER} opacity={0.16}>
            {!reduced && <animate attributeName="r" values="6;9;6" dur="2.4s" repeatCount="indefinite" />}
          </circle>
          <circle cx={246} cy={26} r={3.5} fill={AMBER} stroke="hsl(var(--cv-card))" strokeWidth={1.4} vectorEffect="non-scaling-stroke" />
        </svg>
        <span className="absolute right-1 top-0 flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: AMBER }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: AMBER }} />
          Spike +$3,240
        </span>
      </div>
    </Panel>
  );
}

/* 3. Commitments — RI/SP/CUD coverage meters with realized $ + status. */
function CommitmentViz() {
  const meters: [string, number, string, "active" | "expiring"][] = [
    ["Reserved Inst.", 72, "$46k", "active"],
    ["Savings Plans", 64, "$31k", "active"],
    ["CUDs", 58, "$19k", "expiring"],
  ];
  return (
    <Panel className="justify-center gap-3.5 p-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wide text-cv-muted">Commitment coverage</span>
        <span className="flex items-center gap-1 text-[10px] font-medium" style={{ color: OK }}>
          <ShieldCheck color={OK} size={11} /> 7.4 mo payback
        </span>
      </div>
      {meters.map(([name, pct, saved, status]) => {
        const c = status === "expiring" ? AMBER : BLUE;
        return (
          <div key={name}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5">
                <span className="text-cv-ink/80">{name}</span>
                <Pill color={status === "expiring" ? AMBER : OK}>{status === "expiring" ? "Expiring" : "Active"}</Pill>
              </span>
              <span className="tabular-nums text-cv-muted">
                <span style={{ color: c }}>{pct}%</span> · <span className="font-mono text-cv-ink">{saved}</span>
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-cv-ink/10 dark:bg-white/10">
              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: c, boxShadow: `0 0 12px ${c}aa` }} />
            </div>
          </div>
        );
      })}
    </Panel>
  );
}

/* 4. Chargeback — multi-currency statement reconciled to source billing. */
function ChargebackViz() {
  const rows: [string, string][] = [
    ["EMEA", "€12.4k"],
    ["APAC", "¥9.8k"],
    ["Americas", "$21.1k"],
  ];
  return (
    <Panel className="p-0">
      <div className="grid grid-cols-[1fr_auto_1.1fr] items-center gap-3 border-b border-cv-line px-3 py-1.5 text-[10px] uppercase tracking-wide text-cv-muted dark:border-white/10">
        <span>Business unit</span>
        <span>Status</span>
        <span className="text-right">Net + tax</span>
      </div>
      {rows.map(([bu, amount]) => (
        <div key={bu} className="grid grid-cols-[1fr_auto_1.1fr] items-center gap-3 border-t border-cv-line px-3 py-2 text-xs dark:border-white/10">
          <span className="text-cv-ink/80">{bu}</span>
          <Pill color={OK}>Reconciled</Pill>
          <span className="whitespace-nowrap text-right font-mono tabular-nums text-cv-ink">{amount}</span>
        </div>
      ))}
      <div className="grid grid-cols-[1fr_auto] items-center gap-3 border-t border-cv-line px-3 py-2 text-xs dark:border-white/10" style={{ background: `${OK}12` }}>
        <span className="font-semibold text-cv-ink">Total reconciled</span>
        <span className="whitespace-nowrap text-right font-mono font-semibold tabular-nums" style={{ color: OK }}>$43.3k</span>
      </div>
    </Panel>
  );
}

function ShieldCheck({ color, size = 14 }: { color: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <path d="M12 3l7 3v6c0 4-3 6.6-7 8-4-1.4-7-4-7-8V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

const VISUALS: Record<string, (p: VizProps) => React.JSX.Element> = {
  "Allocation everyone agrees on": AllocationViz,
  "Anomalies with attribution": AnomalyViz,
  "Commitments with payback proof": CommitmentViz,
  "Audit-ready chargeback": ChargebackViz,
};

export type ShipItem = [title: string, desc: string];

export function FinopsShips({ items }: { items: ShipItem[] }) {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {items.map(([t, b]) => {
        const Viz = VISUALS[t];
        return (
          <FeatureCard key={t} title={t} desc={b}>
            {Viz ? <Viz reduced={reduced} /> : null}
          </FeatureCard>
        );
      })}
    </div>
  );
}
