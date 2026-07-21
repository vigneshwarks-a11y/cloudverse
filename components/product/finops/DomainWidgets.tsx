/* Per-domain product-preview visuals for the "Domain depth" bento. Each widget
   is a framed "product panel" (header · body · footer stat) built on the in-repo
   shadcn chart library (components/charts/*), so the charts read as real product
   UI — matching the FinOps page's product-scene language. Client component
   (charts are visx + motion). Colors passed explicitly; theme-aware via cv-*. */

"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { StatusPill } from "@/components/product/finops/kit";
import { AreaChart } from "@/components/charts/area-chart";
import { Area } from "@/components/charts/area";
import { BarChart } from "@/components/charts/bar-chart";
import { Bar } from "@/components/charts/bar";
import { BarXAxis } from "@/components/charts/bar-x-axis";
import { Grid } from "@/components/charts/grid";
import { PieChart } from "@/components/charts/pie-chart";
import { PieSlice } from "@/components/charts/pie-slice";
import { PieCenter } from "@/components/charts/pie-center";
import { RingChart } from "@/components/charts/ring-chart";
import { Ring } from "@/components/charts/ring";
import { RingCenter } from "@/components/charts/ring-center";
import { XAxis } from "@/components/charts/x-axis";
import { YAxis } from "@/components/charts/y-axis";
import type { PieData } from "@/components/charts/pie-context";
import type { RingData } from "@/components/charts/ring-context";

const CLOUD = "#2278E0";
const AI = "#6954D4";
const DATA = "#D97706";
const SAAS = "#0E9E7A";

/* ---- framed product panel (inset surface + window chrome) ---- */

function Panel({
  label,
  dot,
  pill,
  children,
  footer,
  className,
}: {
  label: string;
  dot: string;
  pill?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-cv-line/70 bg-cv-surface/70 shadow-[0_10px_30px_-20px_rgba(16,24,40,0.35)] backdrop-blur-sm dark:border-white/[0.08] dark:bg-white/[0.035] dark:shadow-[0_20px_50px_-28px_rgba(0,0,0,0.7)]",
        className,
      )}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-cv-line/60 px-3.5 py-2.5 dark:border-white/[0.06]">
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide text-cv-ink/70">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: dot }} />
          {label}
        </span>
        {pill}
      </div>
      <div className="flex flex-1 flex-col justify-center p-3.5">{children}</div>
      {footer && (
        <div className="flex shrink-0 items-center justify-between border-t border-cv-line/60 px-3.5 py-2 text-[11px] dark:border-white/[0.06]">
          {footer}
        </div>
      )}
    </div>
  );
}

function FootStat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <>
      <span className="text-cv-ink/70">{label}</span>
      <span className="font-mono font-semibold" style={{ color }}>
        {value}
      </span>
    </>
  );
}

function LegendRow({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-[12px]">
      <span className="flex min-w-0 items-center gap-2">
        <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: color }} />
        <span className="truncate text-cv-ink/70">{label}</span>
      </span>
      <span className="shrink-0 font-mono text-cv-ink/85">{value}</span>
    </div>
  );
}

/* ---- Cloud: cost share by service (donut) — hero panel, fills column ---- */

const CLOUD_DATA: PieData[] = [
  { label: "EC2 · compute", value: 214, color: CLOUD },
  { label: "EKS · clusters", value: 121, color: "#4E93E8" },
  { label: "S3 · storage", value: 91, color: "#84B6F0" },
  { label: "RDS · database", value: 79, color: "#B7D6F7" },
];

export function CloudWidget() {
  return (
    <Panel
      label="cost by service · MTD"
      dot={CLOUD}
      pill={<StatusPill label="W-A 86" color={CLOUD} />}
      footer={<FootStat label="vs last month" value="▲ 6% MoM" color={DATA} />}
      className="h-full"
    >
      <div className="flex flex-1 flex-col items-center">
        <PieChart data={CLOUD_DATA} size={168} innerRadius={54} padAngle={0.03} cornerRadius={4} enterTransition={{ duration: 0 }}>
          {CLOUD_DATA.map((d, i) => (
            <PieSlice key={d.label} index={i} color={d.color} />
          ))}
          <PieCenter defaultLabel="monthly" prefix="$" suffix="k" />
        </PieChart>
        <div className="mt-4 flex w-full flex-1 flex-col justify-between gap-2.5 border-t border-cv-line/50 pt-3.5 dark:border-white/[0.06]">
          {CLOUD_DATA.map((d) => (
            <LegendRow key={d.label} color={d.color!} label={d.label} value={`$${d.value}k`} />
          ))}
        </div>
      </div>
    </Panel>
  );
}

/* ---- AI: model & provider token spend trend (area) ---- */

const AI_DATA = [
  { date: new Date("2026-06-15"), spend: 30 },
  { date: new Date("2026-06-22"), spend: 36 },
  { date: new Date("2026-06-29"), spend: 33 },
  { date: new Date("2026-07-06"), spend: 45 },
  { date: new Date("2026-07-13"), spend: 41 },
  { date: new Date("2026-07-20"), spend: 53 },
  { date: new Date("2026-07-27"), spend: 49 },
  { date: new Date("2026-08-03"), spend: 62 },
];

export function AIWidget() {
  return (
    <Panel
      label="token spend · 30d"
      dot={AI}
      pill={<StatusPill label="+8%" color={DATA} dot={false} />}
      footer={<FootStat label="reconciled to bill" value="$79k / mo" color={AI} />}
      className="flex-1"
    >
      <div className="w-full">
        <AreaChart
          data={AI_DATA}
          xDataKey="date"
          aspectRatio="16 / 7"
          margin={{ top: 8, right: 10, bottom: 22, left: 30 }}
          animationDuration={0}
          enterTransition={{ duration: 0 }}
        >
          <Grid horizontal />
          <YAxis numTicks={4} />
          <XAxis numTicks={4} />
          <Area dataKey="spend" fill={AI} stroke={AI} fillOpacity={0.26} strokeWidth={2} showMarkers />
        </AreaChart>
      </div>
      <div className="mt-3 grid grid-cols-3 divide-x divide-cv-line/60 border-t border-cv-line/60 pt-3 dark:divide-white/[0.07] dark:border-white/[0.07]">
        {[
          ["gpt-4o", "$42k"],
          ["claude-3", "$28k"],
          ["embeddings", "$9k"],
        ].map(([m, v], i) => (
          <div key={m} className={i === 0 ? "pr-2" : "px-2 last:pr-0"}>
            <div className="truncate font-mono text-[10px] text-cv-ink/65">{m}</div>
            <div className="font-mono text-[13px] font-semibold text-cv-ink">{v}</div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* ---- Data: query cost by behavioral pattern (bar) ---- */

const DATA_DATA = [
  { name: "Scans", cost: 62 },
  { name: "Fan-out", cost: 41 },
  { name: "Spiky", cost: 33 },
  { name: "Repeat", cost: 21 },
];

export function DataWidget() {
  return (
    <Panel
      label="query cost by pattern"
      dot={DATA}
      pill={<StatusPill label="12 full scans" color={DATA} />}
      footer={<FootStat label="est. monthly waste" value="−$18k" color={SAAS} />}
      className="flex-1"
    >
      <div
        className="w-full"
        role="img"
        aria-label="Query cost by behavioral pattern: scans $62k, fan-out $41k, spiky $33k, repeat $21k."
      >
        <BarChart
          data={DATA_DATA}
          xDataKey="name"
          orientation="vertical"
          aspectRatio="16 / 7"
          margin={{ top: 10, right: 8, bottom: 24, left: 8 }}
          animationDuration={0}
        >
          <Grid horizontal />
          <BarXAxis />
          <Bar dataKey="cost" fill={DATA} />
        </BarChart>
      </div>
    </Panel>
  );
}

/* ---- SaaS: license utilization (ring gauge) ---- */

const SAAS_DATA: RingData[] = [{ label: "utilized", value: 72, maxValue: 100, color: SAAS }];

export function SaasWidget() {
  return (
    <Panel
      label="license utilization"
      dot={SAAS}
      pill={<StatusPill label="Coming soon" color={SAAS} dot={false} />}
      footer={<FootStat label="reclaimable" value="−$14k/yr" color={SAAS} />}
      className="flex-1"
    >
      <div className="flex items-center gap-4">
        <RingChart data={SAAS_DATA} size={124} strokeWidth={13} baseInnerRadius={44} animationDuration={0} enterTransition={{ duration: 0 }}>
          <Ring index={0} color={SAAS} />
          <RingCenter defaultLabel="seats used" suffix="%" />
        </RingChart>
        <div className="min-w-0 flex-1 divide-y divide-cv-line/60 dark:divide-white/[0.07]">
          <div className="pb-2.5">
            <div className="text-[10px] uppercase tracking-wide text-cv-ink/65">Active seats</div>
            <div className="font-mono text-[15px] font-semibold text-cv-ink">312</div>
          </div>
          <div className="pt-2.5">
            <div className="text-[10px] uppercase tracking-wide text-cv-ink/65">Idle 30d+</div>
            <div className="font-mono text-[15px] font-semibold" style={{ color: DATA }}>
              88
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}
