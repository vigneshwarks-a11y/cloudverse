"use client";

import { useState } from "react";
import { CheckCircle } from "@solar-icons/react";

const BLUE = "#2278E0";

/* Shared with the "Four problems AIX fixes" cards: a soft bottom fade on
   every mock panel + a semantic status palette surfaced as small rounded
   pills, so this grid reads in the same design language. Blue stays the
   brand accent for neutral resource visuals (bars, map dots, tree node);
   status colors (ok/blocked/flag) carry meaning on rule/decision pills. */
const EDGE_FADE = {
  WebkitMaskImage: "linear-gradient(to bottom,#000 88%,transparent 100%)",
  maskImage: "linear-gradient(to bottom,#000 88%,transparent 100%)",
} as const;

type Kind = "ok" | "blocked" | "flag" | "info";
const KIND_COLOR: Record<Kind, string> = {
  ok: "#0E9E7A",
  blocked: "#EF4444",
  flag: "#D97706",
  info: BLUE,
};

function StatusPill({ kind, label }: { kind: Kind; label: string }) {
  const c = KIND_COLOR[kind];
  return (
    <span
      className="justify-self-start rounded-full px-2 py-0.5 text-[10px] font-medium"
      style={{ color: c, background: `${c}1A` }}
    >
      {label}
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Feature card chrome
 * ------------------------------------------------------------------ *
 * Uniform image-topped card: the illustration fills a top "screenshot" slot
 * (like Feature73's product image), title + description sit in a padded
 * footer below. Same card shape repeats for every feature — no asymmetric
 * spans — recoloured to cv-* tokens for light/dark.
 */
function FeatureCard({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-cv-line/60 bg-cv-surface dark:border-white/10 dark:bg-[#0D0D0D]">
      <div className="relative flex h-64 shrink-0 items-center justify-center overflow-hidden bg-cv-surface2 p-6 dark:bg-black">
        {/* soft radial blue glow, upper-right */}
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

/* ------------------------------------------------------------------ *
 * Shared mock-card chrome — matches the home-page governance visuals:
 * a bright top-left gradient edge + ambient corner glow on a white/black
 * surface with a soft drop shadow, so each inner viz reads as a polished
 * product-screenshot panel rather than a flat outlined box.
 * ------------------------------------------------------------------ */
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
      <div className={`relative flex flex-1 flex-col justify-center ${className}`}>{children}</div>
    </div>
  );
}

/* 1. Multi-tenant isolation — workspace selector + a table of the *same*
      workspaces (not a mismatched "Tenant A/B/C"). The copy claims three
      things stay separate — workloads, policies, cost — so the table shows
      all three per row: GPU allocation, a policy scope tag, and a cost cap. */
const WORKSPACES: [string, number, string, string][] = [
  ["Acme AI", 42, "Strict-Prod", "$4.2k / mo"],
  ["Beta Labs", 31, "Flexible", "$3.1k / mo"],
  ["Core Eng", 27, "Residency-EU", "$2.7k / mo"],
];

function TenantViz() {
  const [active, setActive] = useState(0);
  return (
    <Panel className="p-0">
      {/* Segmented tab bar lives inside the card, above the table it drives. */}
      <div className="flex items-center gap-1.5 border-b border-cv-line px-3 py-2 dark:border-white/10">
        {WORKSPACES.map(([w], i) => {
          const on = i === active;
          return (
            <button
              key={w}
              type="button"
              onClick={() => setActive(i)}
              className="rounded-md border px-2.5 py-1 text-xs font-medium transition-colors"
              style={
                on
                  ? { color: BLUE, borderColor: `${BLUE}80`, background: `${BLUE}1a` }
                  : { color: "hsl(var(--cv-muted))", borderColor: "hsl(var(--cv-line))" }
              }
            >
              {w}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-[1fr_auto_1.2fr_auto] items-center gap-3 border-b border-cv-line px-3 py-1.5 text-[10px] uppercase tracking-wide text-cv-muted dark:border-white/10">
        <span className="whitespace-nowrap">Workspace</span>
        <span className="whitespace-nowrap">Policy</span>
        <span className="whitespace-nowrap">GPU alloc.</span>
        <span className="whitespace-nowrap">Cost cap</span>
      </div>
      {WORKSPACES.map(([w, pct, policy, cost], i) => {
        const on = i === active;
        return (
          <div
            key={w}
            className={`grid grid-cols-[1fr_auto_1.2fr_auto] items-center gap-3 px-3 py-2 text-xs transition-colors ${i > 0 ? "border-t border-cv-line dark:border-white/10" : ""}`}
            style={on ? { background: `${BLUE}0d` } : undefined}
          >
            <span className={`truncate ${on ? "font-medium text-cv-ink" : "text-cv-ink/70"}`}>{w}</span>
            <ScopeTag>{policy}</ScopeTag>
            <div className="flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-cv-ink/10 dark:bg-white/10">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${pct}%`, background: BLUE, boxShadow: on ? `0 0 10px ${BLUE}99` : undefined, opacity: on ? 1 : 0.45 }}
                />
              </div>
              <span className="w-9 text-right tabular-nums" style={{ color: on ? BLUE : "hsl(var(--cv-muted))" }}>
                {pct}%
              </span>
            </div>
            <span className="whitespace-nowrap font-mono text-cv-muted">{cost}</span>
          </div>
        );
      })}
    </Panel>
  );
}

/* 2. Data residency controls — region / enforcement / approved-provider table,
      same row pattern as PiiViz so the ruling reads directly off the visual. */
function ResidencyViz() {
  const rows: [string, string, Kind, string][] = [
    ["eu-west-1", "Enforced", "ok", "Azure EU · Mistral"],
    ["us-east-1", "Enforced", "ok", "OpenAI · Anthropic"],
    ["ap-south-1", "Restricted", "blocked", "Pending approval"],
  ];
  return (
    <Panel className="text-xs">
      <div className="grid grid-cols-[1fr_auto_1.3fr] gap-2 border-b border-cv-line dark:border-white/10 px-3 py-2 text-[10px] uppercase tracking-wide text-cv-muted">
        <span>Region</span>
        <span>Status</span>
        <span>Approved providers</span>
      </div>
      {rows.map(([region, label, kind, providers]) => (
        <div
          key={region}
          className="grid grid-cols-[1fr_auto_1.3fr] items-center gap-2 border-t border-cv-line dark:border-white/10 px-3 py-2"
        >
          <span className="font-mono text-cv-ink/80">{region}</span>
          <StatusPill kind={kind} label={label} />
          <span className="text-cv-muted">{providers}</span>
        </div>
      ))}
    </Panel>
  );
}

/* 3. PII handling rules config table with redacted samples */
function PiiViz() {
  const rows: [string, string, Kind, string][] = [
    ["Email", "Mask", "info", "a•••@•••.io"],
    ["SSN", "Block", "blocked", "•••-••-••••"],
    ["Full name", "Tokenize", "flag", "[REDACTED]"],
    ["Card no.", "Block", "blocked", "•••• •••• 4•2"],
  ];
  return (
    <Panel className="text-xs">
      <div className="grid grid-cols-[1fr_auto_1.2fr] gap-2 border-b border-cv-line dark:border-white/10 px-3 py-2 text-[10px] uppercase tracking-wide text-cv-muted">
        <span>Field</span>
        <span>Rule</span>
        <span>Sample</span>
      </div>
      {rows.map(([field, rule, kind, sample]) => (
        <div
          key={field}
          className="grid grid-cols-[1fr_auto_1.2fr] items-center gap-2 border-t border-cv-line dark:border-white/10 px-3 py-2"
        >
          <span className="text-cv-ink/70">{field}</span>
          <StatusPill kind={kind} label={rule} />
          <span className="font-mono text-cv-muted">{sample}</span>
        </div>
      ))}
    </Panel>
  );
}

/* 4. Budget caps horizontal blue spend meters */
function BudgetViz() {
  const meters: [string, string, string, number, Kind][] = [
    ["Research", "$8.2k", "$10k", 82, "flag"],
    ["Platform", "$4.1k", "$6k", 68, "ok"],
    ["Data Eng", "$2.7k", "$5k", 54, "ok"],
  ];
  return (
    <Panel className="space-y-3 p-4">
      {meters.map(([team, used, cap, pct, kind]) => {
        const c = KIND_COLOR[kind];
        return (
          <div key={team}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-cv-ink/70">{team}</span>
              <span className="tabular-nums text-cv-muted">
                <span style={{ color: c }}>{used}</span> / {cap}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-cv-ink/10 dark:bg-white/10">
              <div
                className="h-full rounded-full"
                style={{ width: `${pct}%`, background: c, boxShadow: `0 0 12px ${c}aa` }}
              />
            </div>
          </div>
        );
      })}
    </Panel>
  );
}

/* 5. Org/team policy scopes hierarchical assignment tree */
/* Policy scopes are different *modes*, not pass/fail states — so they get a
   neutral tag, not the ok/blocked/flag status palette used for real outcomes
   elsewhere on this page (that would misread "Strict-Prod" as an error). */
function ScopeTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="shrink-0 rounded-full border border-cv-line px-2.5 py-1 text-[11px] font-medium text-cv-ink/80 dark:border-white/15">
      {children}
    </span>
  );
}

function PolicyTreeViz() {
  const teams: [string, string, string][] = [
    ["Platform Eng", "Strict-Prod", "Prod routes only, no fallback"],
    ["Research", "Flexible", "Full model access, sandboxed"],
    ["Data Team", "Residency-EU", "EU providers only"],
  ];
  return (
    <Panel className="p-3 text-xs">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full" style={{ background: BLUE, boxShadow: `0 0 10px ${BLUE}` }} />
        <span className="font-medium text-cv-ink/85">Organization</span>
      </div>
      <div className="ml-1 mt-1.5 space-y-2.5 border-l border-cv-line dark:border-white/10 pl-4">
        {teams.map(([team, policy, meta]) => (
          <div key={team} className="relative flex items-center justify-between gap-3">
            <span
              aria-hidden
              className="absolute -left-4 top-1/2 h-px w-3 bg-cv-ink/15 dark:bg-white/15"
            />
            <div className="min-w-0">
              <div className="text-cv-ink/80">{team}</div>
              <div className="truncate text-[10px] text-cv-muted">{meta}</div>
            </div>
            <ScopeTag>{policy}</ScopeTag>
          </div>
        ))}
      </div>
    </Panel>
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
    <Panel className="space-y-1.5 px-4 py-3">
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
            <div className="absolute inset-0 rounded-full bg-cv-ink/[0.06] dark:bg-white/[0.08]" />
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
      <div className="flex items-center gap-1.5 pt-0.5 text-[11px]" style={{ color: BLUE }}>
        <CheckCircle weight="Linear" size={13} /> Trace committed to audit log
      </div>
    </Panel>
  );
}

export default function GovernanceBento() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <FeatureCard
        title="Multi-tenant isolation"
        desc="Workloads, policies, and cost kept fully separate."
      >
        <TenantViz />
      </FeatureCard>
      <FeatureCard
        title="Data residency controls"
        desc="Route by region to meet sovereignty rules."
      >
        <ResidencyViz />
      </FeatureCard>
      <FeatureCard
        title="PII handling rules"
        desc="Detection enforced before provider selection."
      >
        <PiiViz />
      </FeatureCard>
      <FeatureCard
        title="Budget caps"
        desc="Hard ceilings applied before a request goes out."
      >
        <BudgetViz />
      </FeatureCard>
      <FeatureCard
        title="Org / team policy scopes"
        desc="Different teams run under different constraint sets."
      >
        <PolicyTreeViz />
      </FeatureCard>
      <FeatureCard
        title="Full execution trace logs"
        desc="Every decision timed, scored, and logged."
      >
        <TraceViz />
      </FeatureCard>
    </div>
  );
}
