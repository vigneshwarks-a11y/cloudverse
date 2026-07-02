import { CheckCircle } from "@solar-icons/react";

const BLUE = "#2278E0";

function Card({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-cv-line/40 bg-cv-surface dark:bg-[#0D0D0D] p-6 backdrop-blur-sm">
      {/* soft radial blue glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(34,120,224,0.22), transparent 70%)" }}
      />
      <div className="relative">
        <h4 className="font-display font-semibold text-cv-ink">{title}</h4>
        <p className="mt-2 text-sm leading-relaxed text-cv-muted">{desc}</p>
      </div>
      <div className="relative mt-6 flex-1">{children}</div>
    </div>
  );
}

/* 1. Multi-tenant isolation workspace selector + resource allocation table */
function TenantViz() {
  const workspaces = ["Acme AI", "Beta Labs", "Core Eng"];
  const rows: [string, number][] = [
    ["Tenant A", 42],
    ["Tenant B", 31],
    ["Tenant C", 27],
  ];
  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2">
        {workspaces.map((w, i) => (
          <span
            key={w}
            className={
              i === 0
                ? "rounded-md border px-2.5 py-1 text-xs"
                : "rounded-md border border-cv-line px-2.5 py-1 text-xs text-cv-muted"
            }
            style={i === 0 ? { color: BLUE, borderColor: `${BLUE}80`, background: `${BLUE}1a` } : undefined}
          >
            {w}
          </span>
        ))}
      </div>
      <div className="overflow-hidden rounded-lg border border-cv-line">
        <div className="flex items-center justify-between border-b border-cv-line px-3 py-2 text-[10px] uppercase tracking-wide text-cv-muted">
          <span>Workspace</span>
          <span>GPU allocation</span>
        </div>
        {rows.map(([t, pct]) => (
          <div key={t} className="flex items-center gap-3 px-3 py-2 text-xs">
            <span className="w-16 text-cv-ink/70">{t}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-cv-ink/10">
              <div
                className="h-full rounded-full"
                style={{ width: `${pct}%`, background: BLUE, boxShadow: `0 0 10px ${BLUE}99` }}
              />
            </div>
            <span className="w-9 text-right tabular-nums" style={{ color: BLUE }}>
              {pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 2. Data residency controls dark map with blue regions + rule toggles */
function ResidencyViz() {
  const markers = [
    { left: "26%", top: "38%" }, // US
    { left: "50%", top: "30%" }, // EU
    { left: "76%", top: "46%" }, // APAC
  ];
  const toggles: [string, boolean][] = [
    ["EU", true],
    ["US", true],
    ["APAC", false],
  ];
  return (
    <div>
      <div
        className="relative mb-3 h-24 overflow-hidden rounded-lg border border-cv-line"
        style={{
          backgroundColor: "#0B0D11",
          backgroundImage:
            "radial-gradient(rgba(34,120,224,0.18) 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      >
        {markers.map((m, i) => (
          <span
            key={i}
            className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ left: m.left, top: m.top, background: BLUE, boxShadow: `0 0 14px 3px ${BLUE}` }}
          />
        ))}
      </div>
      <div className="space-y-1.5">
        {toggles.map(([region, on]) => (
          <div
            key={region}
            className="flex items-center justify-between rounded-md border border-cv-line px-3 py-1.5 text-xs"
          >
            <span className="text-cv-ink/70">{region} routing</span>
            <span
              className={`flex h-4 w-7 items-center rounded-full p-0.5 transition-colors ${on ? "" : "bg-cv-ink/15"}`}
              style={{
                background: on ? BLUE : undefined,
                boxShadow: on ? `0 0 10px ${BLUE}80` : undefined,
                justifyContent: on ? "flex-end" : "flex-start",
              }}
            >
              <span className="h-3 w-3 rounded-full bg-white" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 3. PII handling rules config table with redacted samples */
function PiiViz() {
  const rows: [string, string, string][] = [
    ["Email", "Mask", "a•••@•••.io"],
    ["SSN", "Block", "•••-••-••••"],
    ["Full name", "Tokenize", "[REDACTED]"],
    ["Card no.", "Block", "•••• •••• 4•2"],
  ];
  return (
    <div className="overflow-hidden rounded-lg border border-cv-line text-xs">
      <div className="grid grid-cols-[1fr_auto_1.2fr] gap-2 border-b border-cv-line px-3 py-2 text-[10px] uppercase tracking-wide text-cv-muted">
        <span>Field</span>
        <span>Rule</span>
        <span>Sample</span>
      </div>
      {rows.map(([field, rule, sample]) => (
        <div
          key={field}
          className="grid grid-cols-[1fr_auto_1.2fr] items-center gap-2 border-t border-cv-line px-3 py-2"
        >
          <span className="text-cv-ink/70">{field}</span>
          <span
            className="justify-self-start rounded px-1.5 py-0.5 text-[10px]"
            style={{ color: BLUE, background: `${BLUE}1a`, border: `1px solid ${BLUE}40` }}
          >
            {rule}
          </span>
          <span className="font-mono text-cv-muted">{sample}</span>
        </div>
      ))}
    </div>
  );
}

/* 4. Budget caps horizontal blue spend meters */
function BudgetViz() {
  const meters: [string, string, string, number][] = [
    ["Research", "$8.2k", "$10k", 82],
    ["Platform", "$4.1k", "$6k", 68],
    ["Data Eng", "$2.7k", "$5k", 54],
  ];
  return (
    <div className="space-y-3">
      {meters.map(([team, used, cap, pct]) => (
        <div key={team}>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-cv-ink/70">{team}</span>
            <span className="tabular-nums text-cv-muted">
              <span style={{ color: BLUE }}>{used}</span> / {cap}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-cv-ink/10">
            <div
              className="h-full rounded-full"
              style={{ width: `${pct}%`, background: BLUE, boxShadow: `0 0 12px ${BLUE}aa` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* 5. Org/team policy scopes hierarchical assignment tree */
function PolicyTreeViz() {
  const teams: [string, string][] = [
    ["Platform Eng", "Strict-Prod"],
    ["Research", "Flexible"],
    ["Data Team", "Residency-EU"],
  ];
  return (
    <div className="rounded-lg border border-cv-line p-3 text-xs">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full" style={{ background: BLUE, boxShadow: `0 0 10px ${BLUE}` }} />
        <span className="font-medium text-cv-ink/85">Organization</span>
      </div>
      <div className="ml-1 mt-1 border-l border-cv-line pl-4">
        {teams.map(([team, policy]) => (
          <div key={team} className="relative flex items-center justify-between py-1.5">
            <span
              aria-hidden
              className="absolute -left-4 top-1/2 h-px w-3 bg-cv-ink/15"
            />
            <span className="text-cv-ink/70">{team}</span>
            <span
              className="rounded px-1.5 py-0.5 text-[10px]"
              style={{ color: BLUE, background: `${BLUE}1a`, border: `1px solid ${BLUE}40` }}
            >
              {policy}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 6. Full execution trace logs node-based chronological waterfall */
function TraceViz() {
  const stages: [string, number, number, string][] = [
    ["Intake", 0, 16, "8ms"],
    ["Constraint eval", 16, 20, "11ms"],
    ["Route scoring", 36, 30, "16ms"],
    ["Selection", 66, 12, "6ms"],
    ["Dispatch", 78, 20, "10ms"],
  ];
  return (
    <div className="space-y-2">
      {stages.map(([label, offset, width, dur], i) => (
        <div key={label} className="text-[11px]">
          <div className="mb-1 flex items-center justify-between text-cv-muted">
            <span className="flex items-center gap-1.5">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: BLUE, boxShadow: `0 0 8px ${BLUE}` }}
              />
              {label}
            </span>
            <span className="tabular-nums text-cv-muted">{dur}</span>
          </div>
          <div className="relative h-1.5 w-full">
            <div className="absolute inset-0 rounded-full bg-cv-ink/[0.06]" />
            <div
              className="absolute h-1.5 rounded-full"
              style={{
                left: `${offset}%`,
                width: `${width}%`,
                background: BLUE,
                opacity: 0.5 + i * 0.1,
                boxShadow: `0 0 8px ${BLUE}80`,
              }}
            />
          </div>
        </div>
      ))}
      <div className="flex items-center gap-1.5 pt-1 text-[11px]" style={{ color: BLUE }}>
        <CheckCircle weight="Linear" size={13} /> Trace committed to audit log
      </div>
    </div>
  );
}

export default function GovernanceBento() {
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      <Card
        title="Multi-tenant isolation"
        desc="Each team's workloads, policies, and cost data are separated."
      >
        <TenantViz />
      </Card>
      <Card
        title="Data residency controls"
        desc="Route requests by region based on sovereignty requirements. EU, US, APAC per workload."
      >
        <ResidencyViz />
      </Card>
      <Card
        title="PII handling rules"
        desc="PII detection enforced before provider selection. Sensitive requests never reach unapproved endpoints."
      >
        <PiiViz />
      </Card>
      <Card
        title="Budget caps"
        desc="Hard spend ceilings applied before a request goes out."
      >
        <BudgetViz />
      </Card>
      <Card
        title="Org/team policy scopes"
        desc="Different teams run under different constraint sets. One platform, multiple policies."
      >
        <PolicyTreeViz />
      </Card>
      <Card
        title="Full execution trace logs"
        desc="Every decision logged with constraints, candidates, selection, outcome."
      >
        <TraceViz />
      </Card>
    </div>
  );
}
