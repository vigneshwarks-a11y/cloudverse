import { CheckCircle } from "@/lib/solar-icons";
import { FeatureCard, Panel, StatusPill, BLUE } from "@/components/product/BentoChrome";

/* "Warehouse cost intelligence, not just dashboards" — a bento of product
   screenshot mocks on the shared AIX chrome. Each mock matches its card:
   query-level attribution, cost-amplifying patterns, a unit-cost forecast, and
   policy-bound automation actions. cv-* tokens, theme-aware. */

/* 1. Query attribution — spend down to the query, owner, and cost. */
function QueryAttributionViz() {
  const rows: [string, string, string, boolean][] = [
    ["events · full scan", "analytics", "$117.16", true],
    ["dbt · fct_orders", "data-eng", "$42.80", false],
    ["dash · Revenue", "finance", "$18.40", false],
  ];
  return (
    <Panel className="text-xs">
      <div className="grid grid-cols-[1.4fr_auto_auto] gap-3 border-b border-cv-line px-3 py-2 text-[10px] uppercase tracking-wide text-cv-ink/70 dark:border-white/10">
        <span>Query</span>
        <span>Team</span>
        <span className="text-right">Cost</span>
      </div>
      {rows.map(([q, team, cost, hot]) => (
        <div
          key={q}
          className="grid grid-cols-[1.4fr_auto_auto] items-center gap-3 border-t border-cv-line px-3 py-2.5 first:border-t-0 dark:border-white/10"
          style={hot ? { background: `${BLUE}0d` } : undefined}
        >
          <span className="truncate font-mono text-cv-ink/75">{q}</span>
          <span className="text-cv-ink/70">{team}</span>
          <span className="text-right font-mono font-medium" style={{ color: hot ? "#D97706" : "hsl(var(--cv-ink))" }}>{cost}</span>
        </div>
      ))}
    </Panel>
  );
}

/* 2. Pattern detection — cost-amplifying shapes, counted, with a rewrite hint. */
function PatternDetectionViz() {
  const patterns: [string, string, "flag" | "info"][] = [
    ["Full scan", "×127", "flag"],
    ["Fan-out join", "×88", "flag"],
    ["Missing prune", "×64", "info"],
  ];
  return (
    <Panel className="gap-1 p-4 text-xs">
      {patterns.map(([label, count, kind]) => (
        <div
          key={label}
          className="flex items-center justify-between border-t border-cv-line/70 px-1 py-2.5 first:border-t-0 dark:border-white/10"
        >
          <span className="flex items-center gap-2 text-cv-ink/75">
            <StatusPill kind={kind} label={count} />
            {label}
          </span>
        </div>
      ))}
      <div className="flex items-center gap-1.5 pt-0.5 text-[11px] text-cv-teal">
        <CheckCircle weight="Linear" size={13} /> Rewrite suggested
      </div>
    </Panel>
  );
}

/* 3. Predictive signals — a unit-cost trend that flags a regression before close. */
function ForecastViz() {
  const bars = [38, 42, 40, 47, 52, 61, 88];
  return (
    <Panel className="p-4 text-xs">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-wide text-cv-ink/70">Projected close</div>
          <div className="mt-0.5 font-mono text-xl font-bold text-cv-ink">$128k</div>
        </div>
        <StatusPill kind="flag" label="regression · +38%" />
      </div>
      <div className="flex h-16 items-end gap-1.5">
        {bars.map((h, i) => {
          const last = i === bars.length - 1;
          return (
            <div
              key={i}
              className="flex-1 rounded-t-sm"
              style={{
                height: `${h}%`,
                background: last ? "#D97706" : `${BLUE}`,
                opacity: last ? 1 : 0.45,
                boxShadow: last ? "0 0 12px rgba(217,119,6,0.6)" : undefined,
              }}
            />
          );
        })}
      </div>
      <div className="mt-3 text-[11px] text-cv-ink/70">Flagged before month close</div>
    </Panel>
  );
}

/* 4. Safe automation — policy-bound fixes, reversible and audited. */
function AutomationViz() {
  const actions: [string, "ok" | "flag", string][] = [
    ["Resize warehouse M to S", "ok", "applied"],
    ["Auto-suspend idle 5m", "ok", "applied"],
    ["Add partition prune", "flag", "pending"],
  ];
  return (
    <Panel className="text-xs">
      <div className="border-b border-cv-line px-3 py-2 text-[10px] uppercase tracking-wide text-cv-ink/70 dark:border-white/10">Automation actions</div>
      {actions.map(([label, kind, status]) => (
        <div key={label} className="flex items-center justify-between gap-3 border-t border-cv-line px-3 py-2.5 first:border-t-0 dark:border-white/10">
          <span className="truncate text-cv-ink/75">{label}</span>
          <StatusPill kind={kind} label={status} />
        </div>
      ))}
      <div className="border-t border-cv-line px-3 py-2 text-[11px] text-cv-ink/70 dark:border-white/10">Reversible · audited</div>
    </Panel>
  );
}

const CARDS = [
  {
    title: "Query attribution",
    desc: "Every query tied to a user, role, dashboard, dbt model, or job. Spend down to the SQL.",
    viz: <QueryAttributionViz />,
  },
  {
    title: "Pattern detection",
    desc: "Cost-amplifying patterns caught and explained, with a rewrite suggested.",
    viz: <PatternDetectionViz />,
  },
  {
    title: "Predictive signals",
    desc: "Unit-cost regressions surfaced before monthly close, not in the post-mortem.",
    viz: <ForecastViz />,
  },
  {
    title: "Safe automation",
    desc: "Partition, cluster, and right-size fixes applied inside policy. Reversible and audited.",
    viz: <AutomationViz />,
  },
];

export default function WarehouseIntel() {
  return (
    <section className="cv-section">
      <div className="cv-container">
        <div className="max-w-3xl mb-10">
          <h2 className="cv-h2 text-cv-ink">Warehouse cost intelligence, not just dashboards.</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {CARDS.map(({ title, desc, viz }) => (
            <FeatureCard key={title} title={title} desc={desc}>
              {viz}
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}
