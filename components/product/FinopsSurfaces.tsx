import { FeatureCard, Panel, StatusPill, BLUE } from "@/components/product/BentoChrome";

/* "Four product surfaces. One unified view." — a bento of FinOps product
   screenshot mocks on the shared AIX chrome: allocation, anomaly detection,
   commitments with payback, and audit-ready chargeback. cv-* tokens,
   theme-aware. Server component. */

/* 1. Workload mapping — allocation by team, reconciled to source. */
function AllocationViz() {
  const rows: [string, number, string][] = [
    ["Platform Eng", 42, "$214k"],
    ["Data Science", 28, "$142k"],
    ["Shared Services", 18, "$91k"],
    ["Frontend", 12, "$61k"],
  ];
  return (
    <Panel className="p-4 text-xs">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wide text-cv-muted">Allocation by team</span>
        <StatusPill kind="ok" label="Reconciled · 100%" />
      </div>
      <div className="space-y-2.5">
        {rows.map(([name, pct, amt]) => (
          <div key={name}>
            <div className="mb-1 flex items-center justify-between text-[11px]">
              <span className="text-cv-ink/75">{name}</span>
              <span className="font-mono text-cv-muted">{pct}% · {amt}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-cv-ink/[0.08] dark:bg-white/10">
              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: BLUE }} />
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* 2. Anomaly detection — a spike flagged and traced to a driver. */
function AnomalyViz() {
  const bars = [34, 30, 38, 32, 36, 33, 40, 35, 92, 41];
  return (
    <Panel className="p-4 text-xs">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wide text-cv-muted">Daily spend · prod-emr</span>
        <span className="font-mono text-[11px]" style={{ color: "#D97706" }}>+$4,812</span>
      </div>
      <div className="flex h-16 items-end gap-1.5">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm"
            style={{
              height: `${h}%`,
              background: i === 8 ? "#D97706" : BLUE,
              opacity: i === 8 ? 1 : 0.4,
              boxShadow: i === 8 ? "0 0 12px rgba(217,119,6,0.6)" : undefined,
            }}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-lg border border-cv-line/70 px-2.5 py-2 dark:border-white/10">
        <StatusPill kind="flag" label="3.1×" />
        <span className="text-[11px] text-cv-ink/70">Data Science · prod-emr · detected 2h ago</span>
      </div>
    </Panel>
  );
}

/* 3. Commitments with payback proof — realized, not assumed. */
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
    <Panel className="p-4 text-xs">
      <div className="mb-3 grid grid-cols-2 gap-2.5">
        {tiles.map(([l, v]) => (
          <div key={l} className="rounded-lg border border-cv-line/70 px-3 py-2 dark:border-white/10">
            <div className="text-[10px] uppercase tracking-wide text-cv-muted">{l}</div>
            <div className="mt-0.5 font-mono text-base font-bold text-cv-ink">{v}</div>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {coverage.map(([l, pct]) => (
          <div key={l}>
            <div className="mb-1 flex items-center justify-between text-[11px]">
              <span className="text-cv-ink/75">{l}</span>
              <span className="font-mono text-cv-muted">{pct}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-cv-ink/[0.08] dark:bg-white/10">
              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: BLUE }} />
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* 4. Audit-ready chargeback — multi-currency, reconciled to source billing. */
function ChargebackViz() {
  const rows: [string, string][] = [
    ["EMEA", "€12.4k"],
    ["APAC", "¥9.8k"],
    ["Americas", "$21.1k"],
  ];
  return (
    <Panel className="text-xs">
      <div className="flex items-center justify-between border-b border-cv-line px-3 py-2 dark:border-white/10">
        <span className="text-[10px] uppercase tracking-wide text-cv-muted">Chargeback · Q2</span>
        <StatusPill kind="info" label="EUR · JPY · USD" />
      </div>
      <div className="grid grid-cols-[1fr_auto] gap-3 border-b border-cv-line px-3 py-1.5 text-[10px] uppercase tracking-wide text-cv-muted dark:border-white/10">
        <span>Business unit</span>
        <span className="text-right">Total</span>
      </div>
      {rows.map(([bu, total]) => (
        <div key={bu} className="grid grid-cols-[1fr_auto] items-center gap-3 border-t border-cv-line px-3 py-2.5 first:border-t-0 dark:border-white/10">
          <span className="text-cv-ink/75">{bu}</span>
          <span className="text-right font-mono text-cv-ink/90">{total}</span>
        </div>
      ))}
    </Panel>
  );
}

const CARDS = [
  { title: "Workload mapping", desc: "Shared spend mapped to teams, services, and products, automatically. Chargeback that survives an audit.", viz: <AllocationViz /> },
  { title: "Anomaly detection", desc: "Spikes flagged in real time and traced to a root-cause signal before they compound.", viz: <AnomalyViz /> },
  { title: "Commitments with payback proof", desc: "RIs, Savings Plans, and CUDs with realized payback tracked, not assumed.", viz: <CommitmentsViz /> },
  { title: "Audit-ready chargeback", desc: "Multi-currency, reconciled to source billing.", viz: <ChargebackViz /> },
];

export default function FinopsSurfaces() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {CARDS.map(({ title, desc, viz }) => (
        <FeatureCard key={title} title={title} desc={desc}>
          {viz}
        </FeatureCard>
      ))}
    </div>
  );
}
