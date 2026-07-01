import type { ReactNode } from "react";

const BLUE = "#007CFF";
const VALUE = "#7CB8F8";

function Bar({ pct }: { pct: number }) {
  return (
    <div className="h-2 flex-1 rounded-full bg-cv-ink/[0.06]">
      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: BLUE }} />
    </div>
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <span
      className="inline-flex h-4 w-7 shrink-0 items-center rounded-full px-0.5 transition-colors"
      style={{ background: on ? BLUE : "rgba(255,255,255,0.15)" }}
    >
      <span
        className="h-3 w-3 rounded-full bg-white transition-all"
        style={{ marginLeft: on ? "12px" : "0" }}
      />
    </span>
  );
}

function Panel({ children }: { children: ReactNode }) {
  return <div className="mt-5 rounded-xl border border-cv-line bg-cv-card p-4">{children}</div>;
}

function QueryAttributionVisual() {
  const teams = ["Acme AI", "Beta Labs", "Core Eng"];
  const rows: [string, number][] = [
    ["Tenant A", 42],
    ["Tenant B", 31],
    ["Tenant C", 27],
  ];
  return (
    <Panel>
      <div className="mb-4 flex flex-wrap gap-2">
        {teams.map((t, i) => (
          <span
            key={t}
            className="rounded-full px-2.5 py-1 text-[11px]"
            style={
              i === 0
                ? { background: `${BLUE}26`, color: VALUE, border: `1px solid ${BLUE}59` }
                : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.08)" }
            }
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mb-2 flex items-center gap-3 text-[10px] font-medium uppercase tracking-wide text-cv-ink/40">
        <span className="w-16">Workspace</span>
        <span className="flex-1">GPU allocation</span>
        <span className="w-9" />
      </div>
      <div className="space-y-2">
        {rows.map(([name, pct]) => (
          <div key={name} className="flex items-center gap-3 text-[11px]">
            <span className="w-16 text-cv-ink/60">{name}</span>
            <Bar pct={pct} />
            <span className="w-9 text-right font-medium" style={{ color: VALUE }}>{pct}%</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function PatternDetectionVisual() {
  const dots = [
    { top: "20%", left: "22%" },
    { top: "55%", left: "60%" },
    { top: "32%", left: "80%" },
  ];
  const routes: [string, boolean][] = [
    ["EU routing", true],
    ["US routing", true],
    ["APAC routing", false],
  ];
  return (
    <Panel>
      <div className="relative mb-4 h-20 overflow-hidden rounded-lg border border-cv-line bg-cv-card">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--cv-ink) / 0.05) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--cv-ink) / 0.05) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        {dots.map((d, i) => (
          <span
            key={i}
            className="absolute h-2.5 w-2.5 rounded-full"
            style={{ top: d.top, left: d.left, background: BLUE, boxShadow: `0 0 10px 2px ${BLUE}AA` }}
          />
        ))}
      </div>
      <div className="space-y-2">
        {routes.map(([label, on]) => (
          <div key={label} className="flex items-center justify-between text-[11px] text-cv-ink/60">
            <span>{label}</span>
            <Toggle on={on} />
          </div>
        ))}
      </div>
    </Panel>
  );
}

function PredictiveSignalsVisual() {
  const rows: { field: string; rule: string; sample: string }[] = [
    { field: "Email", rule: "Mask", sample: "a***@***.io" },
    { field: "SSN", rule: "Block", sample: "***-**-****" },
    { field: "Full name", rule: "Tokenize", sample: "[REDACTED]" },
    { field: "Card no.", rule: "Block", sample: "**** **** 4242" },
  ];
  return (
    <Panel>
      <div className="grid grid-cols-[1fr_1fr_1.2fr] gap-x-2 text-[10px] font-medium uppercase tracking-wide text-cv-ink/40">
        <span>Field</span>
        <span>Rule</span>
        <span className="text-right">Sample</span>
      </div>
      <div className="mt-2 space-y-2">
        {rows.map((r) => (
          <div key={r.field} className="grid grid-cols-[1fr_1fr_1.2fr] items-center gap-x-2 text-[11px]">
            <span className="text-cv-ink/70">{r.field}</span>
            <span>
              <span
                className="inline-block rounded px-2 py-0.5 text-[10px] font-medium"
                style={{ background: `${BLUE}26`, color: VALUE }}
              >
                {r.rule}
              </span>
            </span>
            <span className="text-right font-mono text-cv-ink/55">{r.sample}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function SafeAutomationVisual() {
  const rows: { team: string; spent: string; cap: string; pct: number }[] = [
    { team: "Research", spent: "$8.2k", cap: "$10k", pct: 82 },
    { team: "Platform", spent: "$4.1k", cap: "$8k", pct: 51 },
    { team: "Data Eng", spent: "$2.7k", cap: "$5k", pct: 54 },
  ];
  return (
    <Panel>
      <div className="mb-3 text-[10px] font-medium uppercase tracking-wide text-cv-ink/40">Budget tracking</div>
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.team}>
            <div className="mb-1 flex items-center justify-between text-[11px]">
              <span className="text-cv-ink/60">{r.team}</span>
              <span className="font-medium" style={{ color: VALUE }}>
                {r.spent} / {r.cap}
              </span>
            </div>
            <Bar pct={r.pct} />
          </div>
        ))}
      </div>
    </Panel>
  );
}

type Card = { title: string; body: string; visual: ReactNode };

const CARDS: Card[] = [
  {
    title: "Query attribution",
    body: "Every query tied to the user, role, dashboard, model, or job that ran it. When the data team gets blamed, they can show exactly which workload and which team owns the cost.",
    visual: <QueryAttributionVisual />,
  },
  {
    title: "Pattern detection",
    body: "Repeated expensive patterns surfaced with rewrite suggestions. The problem is usually a handful of query patterns running hundreds of times, not one catastrophic scan. DataX finds the pattern, not just the instance.",
    visual: <PatternDetectionVisual />,
  },
  {
    title: "Predictive signals",
    body: "Detect warehouse cost spikes from queue depth and pattern shifts before they hit the bill. Most regressions are visible in telemetry before they become a finance conversation. DataX flags them before they do.",
    visual: <PredictiveSignalsVisual />,
  },
  {
    title: "Safe automation",
    body: "One-click partition, cluster, and right-size fixes. Fully policy-bound and auditable. Automation in DataX controls when recommendations may be applied, and provides a complete audit trail of every decision and action. Opt-in, scoped, reversible.",
    visual: <SafeAutomationVisual />,
  },
];

export default function WarehouseIntel() {
  return (
    <section className="cv-section">
      <div className="cv-container">
        <div className="max-w-3xl mb-10">
          <h2 className="cv-h2 text-cv-ink">Warehouse cost intelligence, not just dashboards.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CARDS.map(({ title, body, visual }) => (
            <div key={title} className="flex flex-col rounded-2xl border border-cv-line bg-cv-surface2 p-7">
              <h3 className="cv-h3 text-cv-ink">{title}</h3>
              <p className="text-cv-ink/75 mt-3 leading-relaxed">{body}</p>
              <div aria-hidden className="mt-auto">{visual}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
