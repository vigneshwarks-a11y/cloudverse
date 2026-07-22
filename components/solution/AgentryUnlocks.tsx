"use client";

import { useEffect, useState } from "react";
import {
  FeatureCard,
  Panel,
  Pill,
  Tab,
  CheckBadge,
  Callout,
  VIZ_BLUE as BLUE,
  VIZ_OK as OK,
  VIZ_VIOLET as VIOLET,
  VIZ_GRAY as GRAY,
} from "@/components/solution/CardChrome";

/* AI Engineering "what Agentry unlocks" bento — same image-topped FeatureCard
   idiom as FinopsShips: a bordered panel with a lit top-left edge + ambient
   glow on a dark surface, tables/charts/meters inside. Theme-aware via
   cv-* tokens. */

type VizProps = { reduced: boolean };

/* 1. Multi-provider routing — ranked provider table with score bars. */
function RoutingViz() {
  const rows: [string, number, string, string][] = [
    ["OpenAI", 38, BLUE, "$0.014/1k"],
    ["Anthropic", 27, OK, "$0.018/1k"],
    ["Bedrock", 21, VIOLET, "$0.011/1k"],
    ["Vertex", 14, GRAY, "$0.009/1k"],
  ];
  return (
    <Panel className="p-0" chrome="agentry.app/routing">
      <div className="flex items-center gap-1.5 border-b border-cv-line px-3 py-2 dark:border-white/10">
        <Tab label="Cost" active />
        <Tab label="Latency" />
        <Tab label="Quality" />
      </div>
      <div className="grid grid-cols-[1fr_1.3fr_auto] items-center gap-3 border-b border-cv-line px-3 py-1.5 text-[10px] uppercase tracking-wide text-cv-muted dark:border-white/10">
        <span>Provider</span>
        <span>Score</span>
        <span className="text-right">Rate</span>
      </div>
      {rows.map(([name, pct, color, rate], i) => (
        <div
          key={name}
          className={`grid grid-cols-[1fr_1.3fr_auto] items-center gap-3 px-3 py-2 text-xs ${i > 0 ? "border-t border-cv-line dark:border-white/10" : ""}`}
        >
          <span className="flex items-center gap-1.5 truncate text-cv-ink/80">
            {name}
            {i === 0 && <Pill color={OK}>best fit</Pill>}
          </span>
          <div className="flex items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-cv-ink/10 dark:bg-white/10">
              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
            </div>
            <span className="w-8 text-right tabular-nums" style={{ color }}>{pct}%</span>
          </div>
          <span className="whitespace-nowrap font-mono tabular-nums text-cv-muted">{rate}</span>
        </div>
      ))}
    </Panel>
  );
}

/* 2. Policy guardrails — enforcement checklist with a status header. */
function GuardrailsViz() {
  const rules = ["PII handling", "Data residency", "Provider allowlist", "Budget cap"];
  return (
    <Panel className="justify-center gap-3 p-4" chrome="agentry.app/policy">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wide text-cv-muted">Pre-execution policy</span>
        <span className="text-[10px] font-medium text-cv-muted">4 rules</span>
      </div>
      {rules.map((r) => (
        <div key={r} className="flex items-center justify-between rounded-md border border-cv-line/60 px-2.5 py-1.5 text-xs dark:border-white/10">
          <span className="text-cv-ink/75">{r}</span>
          <CheckBadge>Enforced</CheckBadge>
        </div>
      ))}
    </Panel>
  );
}

/* 3. Right-sized GPU economics — cost-per-hour comparison across pools,
   with a savings callout so the "economics" claim is a concrete number. */
function GpuViz() {
  const pools: [string, string, number, string][] = [
    ["Hosted APIs", "$2.40/hr", 62, BLUE],
    ["Dedicated pools", "$0.85/hr", 38, OK],
  ];
  return (
    <Panel className="justify-center gap-3 p-4" chrome="agentry.app/gpu-pools">
      <span className="text-[10px] uppercase tracking-wide text-cv-muted">Cost per GPU-hour, by pool</span>
      {pools.map(([name, rate, pct, color]) => (
        <div key={name}>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-cv-ink/80">{name}</span>
            <span className="tabular-nums text-cv-muted">
              <span className="font-mono font-semibold" style={{ color }}>{rate}</span> · {pct}% of load
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-cv-ink/10 dark:bg-white/10">
            <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
          </div>
        </div>
      ))}
      <Callout>
        <span className="text-cv-ink/85">+24% load shifted</span>{" "}
        <span className="text-cv-muted">to dedicated pools this week — saved $2,140</span>
      </Callout>
    </Panel>
  );
}

/* 4. Spend attribution — segmented bar + legend rows. */
function AttributionViz() {
  const segments: [string, number, string, string][] = [
    ["Team", 45, BLUE, "$28.1k"],
    ["Product", 30, "#3F95F2", "$18.7k"],
    ["Workload", 25, "#7CB8F8", "$15.6k"],
  ];
  return (
    <Panel className="justify-center gap-3 p-4" chrome="agentry.app/attribution">
      <span className="text-[10px] uppercase tracking-wide text-cv-muted">Spend attribution · live</span>
      <div className="flex h-2.5 w-full overflow-hidden rounded-full">
        {segments.map(([name, pct, color]) => (
          <div key={name} style={{ width: `${pct}%`, background: color }} />
        ))}
      </div>
      <div className="space-y-1.5">
        {segments.map(([name, pct, color, amount]) => (
          <div key={name} className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-cv-ink/75">
              <span className="h-2 w-2 rounded-full" style={{ background: color }} />
              {name}
            </span>
            <span className="tabular-nums text-cv-muted">
              <span style={{ color }}>{pct}%</span> · <span className="font-mono text-cv-ink">{amount}</span>
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* 5. Token and GPU visibility — token trend AND GPU utilization stacked in
   one view, per model/run, so both halves of the title are represented. */
function TokenChartViz({ reduced }: VizProps) {
  const TOKEN_LINE = "0,42 20,36 40,38 60,28 80,32 100,18 120,24";
  const GPU_LINE = "0,30 20,24 40,26 60,14 80,20 100,10 120,16";
  return (
    <Panel className="justify-center gap-4 p-4" chrome="agentry.app/telemetry">
      <div>
        <div className="flex items-center justify-between text-[10px] uppercase tracking-wide text-cv-muted">
          <span>Tokens · last 24h</span>
          <span className="font-mono text-sm font-bold tabular-nums normal-case" style={{ color: BLUE }}>2.4M</span>
        </div>
        <svg viewBox="0 0 120 50" className="mt-1.5 h-9 w-full" preserveAspectRatio="none">
          <polyline points={TOKEN_LINE} fill="none" stroke={BLUE} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          <circle cx={120} cy={24} r={2.5} fill={BLUE}>
            {!reduced && <animate attributeName="r" values="2;3.5;2" dur="2.4s" repeatCount="indefinite" />}
          </circle>
        </svg>
      </div>
      <div className="border-t border-cv-line/50 dark:border-white/10" />
      <div>
        <div className="flex items-center justify-between text-[10px] uppercase tracking-wide text-cv-muted">
          <span>GPU utilization</span>
          <span className="font-mono text-sm font-bold tabular-nums normal-case" style={{ color: OK }}>71% avg</span>
        </div>
        <svg viewBox="0 0 120 50" className="mt-1.5 h-9 w-full" preserveAspectRatio="none">
          <polyline points={GPU_LINE} fill="none" stroke={OK} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          <circle cx={120} cy={16} r={2.5} fill={OK}>
            {!reduced && <animate attributeName="r" values="2;3.5;2" dur="2.4s" repeatCount="indefinite" />}
          </circle>
        </svg>
      </div>
      <div className="flex items-center justify-between text-[10px] text-cv-muted">
        <span>per model, per run</span>
        <CheckBadge>attributed</CheckBadge>
      </div>
    </Panel>
  );
}

/* 6. Model registry and failover — versioned model table with status dots. */
function RegistryViz() {
  const models: [string, string, string, string][] = [
    ["gpt-4o", "v2.1", "Primary", BLUE],
    ["claude-3.5", "v1.4", "Fallback", "#94969C"],
    ["llama-3", "v3.0", "Active", OK],
  ];
  return (
    <Panel className="p-0" chrome="agentry.app/model-registry">
      <div className="grid grid-cols-[1.3fr_0.8fr_1fr] items-center gap-3 border-b border-cv-line px-3 py-1.5 text-[10px] uppercase tracking-wide text-cv-muted dark:border-white/10">
        <span>Model</span>
        <span>Version</span>
        <span className="text-right">Status</span>
      </div>
      {models.map(([name, version, status, color], i) => (
        <div
          key={name}
          className={`grid grid-cols-[1.3fr_0.8fr_1fr] items-center gap-3 px-3 py-2 text-xs ${i > 0 ? "border-t border-cv-line dark:border-white/10" : ""}`}
        >
          <span className="truncate font-mono text-cv-ink/80">{name}</span>
          <span style={{ color: BLUE }}>{version}</span>
          <span className="flex items-center justify-end gap-1.5 text-cv-ink/70">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
            {status}
          </span>
        </div>
      ))}
    </Panel>
  );
}

const VISUALS: Record<string, (p: VizProps) => React.JSX.Element> = {
  "Multi-provider routing": RoutingViz,
  "Policy guardrails": GuardrailsViz,
  "Right-sized GPU economics": GpuViz,
  "Spend attribution": AttributionViz,
  "Token and GPU visibility": TokenChartViz,
  "Model registry and failover": RegistryViz,
};

const CARDS: [title: string, desc: string][] = [
  ["Multi-provider routing", "Every request scored across providers on cost, latency, and quality. Best-fit wins, fallback attached."],
  ["Policy guardrails", "Allowed providers, residency, and budget enforced before execution."],
  ["Right-sized GPU economics", "Move workloads between hosted APIs and dedicated GPU pools as price and load change."],
  ["Spend attribution", "Cost allocated to the team, product, and workload that ran it, automatically."],
  ["Token and GPU visibility", "Token-level tracking and GPU utilization in one view, per model and per run."],
  ["Model registry and failover", "Versioned models with automatic failover when a provider degrades."],
];

export function AgentryUnlocks() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {CARDS.map(([t, b]) => {
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
