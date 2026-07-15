"use client";

import { useEffect, useState } from "react";
import { FeatureCard, Panel, Pill, Tab, Toggle, VIZ_BLUE as BLUE, VIZ_AMBER as AMBER } from "@/components/solution/CardChrome";

/* Data Teams "what data teams unlock" bento — same image-topped FeatureCard
   idiom as FinopsShips: a bordered panel with a lit top-left edge + ambient
   glow on a dark surface, tables/charts inside. Theme-aware via cv-* tokens. */

type VizProps = { reduced: boolean };

/* 1. Query attribution — query → owner → cost table. */
function AttributionViz() {
  const rows: [string, string, number, string][] = [
    ["dash_revenue", "Analytics", 82, "$4.2k"],
    ["model_churn", "DS team", 54, "$2.6k"],
    ["etl_nightly", "Data Eng", 38, "$1.8k"],
  ];
  return (
    <Panel className="p-0" chrome="datax.app/query-attribution">
      <div className="flex items-center gap-1.5 border-b border-cv-line px-3 py-2 dark:border-white/10">
        <Tab label="Queries" active />
        <Tab label="Dashboards" />
        <Tab label="dbt models" />
      </div>
      <div className="grid grid-cols-[1fr_1.2fr_auto] items-center gap-3 border-b border-cv-line px-3 py-1.5 text-[10px] uppercase tracking-wide text-cv-muted dark:border-white/10">
        <span>Query</span>
        <span>Owner</span>
        <span className="text-right">Cost</span>
      </div>
      {rows.map(([q, owner, pct, cost], i) => (
        <div key={q} className={`grid grid-cols-[1fr_1.2fr_auto] items-center gap-3 px-3 py-2 text-xs ${i > 0 ? "border-t border-cv-line dark:border-white/10" : ""}`}>
          <span className="truncate font-mono text-cv-ink/75">{q}</span>
          <div className="flex items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-cv-ink/10 dark:bg-white/10">
              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: BLUE }} />
            </div>
            <span className="w-16 truncate text-cv-muted">{owner}</span>
          </div>
          <span className="whitespace-nowrap font-mono tabular-nums text-cv-muted">{cost}</span>
        </div>
      ))}
    </Panel>
  );
}

/* 2. Pattern detection — cost-amplifying pattern table with run counts. */
function PatternViz() {
  const rows: [string, string][] = [
    ["full-scan", "×127"],
    ["fan-out join", "×88"],
    ["missing prune", "×64"],
  ];
  return (
    <Panel className="p-0" chrome="datax.app/patterns">
      <div className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-cv-line px-3 py-1.5 text-[10px] uppercase tracking-wide text-cv-muted dark:border-white/10">
        <span>Pattern</span>
        <span className="text-right">Occurrences</span>
      </div>
      {rows.map(([label, count], i) => (
        <div key={label} className={`grid grid-cols-[1fr_auto] items-center gap-3 px-3 py-2 text-xs ${i > 0 ? "border-t border-cv-line dark:border-white/10" : ""}`}>
          <span className="truncate font-mono text-cv-ink/75">{label}</span>
          <Pill color={AMBER}>{count}</Pill>
        </div>
      ))}
    </Panel>
  );
}

/* 3. Predictive signals — unit-cost chart with a forecast spike. */
function PredictiveViz({ reduced }: VizProps) {
  const LINE = "40,108 60,104 80,106 100,96 120,98 140,86 160,90";
  const FORECAST = "160,90 200,78 240,58 280,22";
  const grid = [
    [24, "High"],
    [73, "Mid"],
    [122, "Low"],
  ] as const;
  return (
    <Panel className="gap-1.5 p-3" chrome="datax.app/forecast">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wide text-cv-muted">Unit-cost forecast</span>
        <span className="font-mono text-base font-bold tabular-nums" style={{ color: AMBER }}>+38% projected</span>
      </div>
      <div className="relative min-h-0 flex-1">
        <svg viewBox="0 0 320 150" className="h-full w-full" preserveAspectRatio="none">
          {grid.map(([y, label]) => (
            <g key={label}>
              <line x1={40} y1={y} x2={300} y2={y} stroke="hsl(var(--cv-line))" strokeWidth={1} strokeOpacity={0.5} vectorEffect="non-scaling-stroke" />
              <text x={34} y={y + 3.5} textAnchor="end" fontSize={9} fill="hsl(var(--cv-muted))">{label}</text>
            </g>
          ))}
          <polyline points={LINE} fill="none" stroke={BLUE} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          <polyline points={FORECAST} fill="none" stroke={AMBER} strokeWidth={2.5} strokeDasharray="4 4" strokeLinecap="round" strokeLinejoin="round" opacity={0.85} vectorEffect="non-scaling-stroke" />
          <circle cx={280} cy={22} r={7} fill={AMBER} opacity={0.16}>
            {!reduced && <animate attributeName="r" values="6;9;6" dur="2.4s" repeatCount="indefinite" />}
          </circle>
          <circle cx={280} cy={22} r={3.5} fill={AMBER} stroke="hsl(var(--cv-card))" strokeWidth={1.4} vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    </Panel>
  );
}

/* 4. Safe automation — reversible fix queue with toggle rows. */
function AutomationViz() {
  const fixes: [string, boolean][] = [
    ["Partition prune", true],
    ["Right-size cluster", true],
    ["Deprecate unused view", false],
  ];
  return (
    <Panel className="justify-center gap-2.5 p-4" chrome="datax.app/automation">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wide text-cv-muted">Fix queue</span>
        <Pill color={BLUE}>Reversible · audited</Pill>
      </div>
      {fixes.map(([label, on]) => (
        <div key={label} className="flex items-center justify-between rounded-md border border-cv-line/60 px-2.5 py-1.5 text-xs dark:border-white/10">
          <span className="text-cv-ink/75">{label}</span>
          <Toggle on={on} />
        </div>
      ))}
    </Panel>
  );
}

const VISUALS: Record<string, (p: VizProps) => React.JSX.Element> = {
  "Query attribution": AttributionViz,
  "Pattern detection": PatternViz,
  "Predictive signals": PredictiveViz,
  "Safe automation": AutomationViz,
};

export type UnlockItem = [title: string, desc: string];

export function DataXUnlocks({ items }: { items: UnlockItem[] }) {
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
