"use client";
import { SectionHeading } from "@/components/SectionHeading";
import { DOCS } from "@/lib/links";

import Link from "next/link";
import { Fragment, useLayoutEffect, useRef, useState } from "react";
import { ArrowRight } from "@/lib/solar-icons";
import { CardLightEdge, EDGE_FADE } from "@/components/home/cardChrome";

/* ------------------------------------------------------------------ *
 * "Take the driver's seat with AI Governance" — a 2x2 grid of the four
 * governance capabilities, each with a product mock: Govern before spend,
 * Every decision logged, Multi-tenant isolation, and Budget caps.
 * cv-* tokens, theme-aware.
 * ------------------------------------------------------------------ */

/* Responsive scaler: visuals are laid out at a fixed pixel "design width". On
   columns wider than `designW` the visual renders naturally; on narrower columns
   it renders at the full design width and is transform-scaled down to fit. */
function ScaledVisual({ children, designW = 500 }: { children: React.ReactNode; designW?: number }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<{ fixed: boolean; scale: number; height?: number }>({ fixed: false, scale: 1 });

  useLayoutEffect(() => {
    const el = outer.current;
    const ic = inner.current;
    if (!el || !ic) return;
    const measure = () => {
      const w = el.clientWidth;
      if (w >= designW) {
        setState((s) => (s.fixed || s.scale !== 1 ? { fixed: false, scale: 1 } : s));
      } else {
        const scale = w / designW;
        const h = Math.max(ic.offsetHeight, ic.scrollHeight);
        setState({ fixed: true, scale, height: h * scale });
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    ro.observe(ic);
    return () => ro.disconnect();
  }, [designW]);

  return (
    <div ref={outer} className="relative w-full" style={state.fixed ? { height: state.height } : undefined}>
      <div
        ref={inner}
        className={state.fixed ? "absolute left-0 top-0 origin-top-left" : undefined}
        style={state.fixed ? { width: designW, transform: `scale(${state.scale})` } : undefined}
      >
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Block 1 - Govern AI before the spend happens (policy-evaluation panel)
 * ------------------------------------------------------------------ */

type PolicyStatus = "Allowed" | "Blocked" | "Flagged";

function statusColor(s: PolicyStatus) {
  return s === "Allowed" ? "#0E9E7A" : s === "Blocked" ? "#EF4444" : "#D97706";
}

function StatusIcon({ status }: { status: PolicyStatus }) {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {status === "Allowed" && <path d="M5 13l4 4L19 7" />}
      {status === "Blocked" && <path d="M6 6l12 12M18 6L6 18" />}
      {status === "Flagged" && <path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a1 1 0 0 0 .9 1.5h18.6a1 1 0 0 0 .9-1.5L13.7 3.9a1 1 0 0 0-1.7 0z" />}
    </svg>
  );
}

function StatusBadge({ status }: { status: PolicyStatus }) {
  const c = statusColor(status);
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border" style={{ borderColor: `${c}66`, color: c, background: `${c}1A` }}>
      <StatusIcon status={status} />
    </span>
  );
}

function StatusPill({ status }: { status: PolicyStatus }) {
  const c = statusColor(status);
  return (
    <span className="ml-auto shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium" style={{ color: c, background: `${c}1A` }}>
      {status}
    </span>
  );
}

const POLICY_DETAILS: [string, string][] = [
  ["policy_id", "pg-prod-guardrails"],
  ["decision", "Allowed before run"],
  ["data_residency", "eu-west-1"],
  ["access_role", "FinOps Admin"],
  ["checks", "budget-limit, residency"],
  ["gate_latency", "42ms"],
];

const POLICY_ROWS: { status: PolicyStatus; route: string; date: string; expanded: boolean }[] = [
  { status: "Allowed", route: "gpt-4o · Prompt run", date: "March 9th, 2025", expanded: true },
  { status: "Blocked", route: "claude-3 · Agent call", date: "March 3rd, 2025", expanded: false },
  { status: "Flagged", route: "llama-3 · Fine-tune", date: "March 3rd, 2025", expanded: false },
];

function PolicyRow({ status, route, date, expanded }: (typeof POLICY_ROWS)[number]) {
  return (
    <div className="rounded-xl border border-cv-line/70 bg-cv-ink/[0.02] px-3 py-3 dark:border-white/[0.07] dark:bg-white/[0.02]">
      <div className="flex items-center gap-3">
        <StatusBadge status={status} />
        <div className="min-w-0">
          <div className="truncate text-sm text-cv-ink/90">{route}</div>
          <div className="text-[11px] text-cv-muted">{date}</div>
        </div>
        <StatusPill status={status} />
      </div>
      {expanded && (
        <div className="mt-3 grid grid-cols-[minmax(120px,auto)_1fr] gap-x-6 gap-y-1.5 border-t border-cv-line/60 pt-3 text-xs dark:border-white/5">
          {POLICY_DETAILS.map(([k, v]) => (
            <Fragment key={k}>
              <span className="truncate text-cv-muted">{k}:</span>
              <span className="font-mono text-cv-ink/80">{v}</span>
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

function MockRBACVisual() {
  return (
    <div className="mt-6 h-[430px]">
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-cv-line bg-white p-4 shadow-[0_10px_28px_-14px_rgba(16,24,40,0.10)] dark:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] dark:border-white/10 dark:bg-[#141418]" style={EDGE_FADE}>
        <CardLightEdge />
        <div className="px-1 pb-3 text-base font-semibold text-cv-ink">Policy Evaluations</div>
        <div className="flex flex-1 flex-col justify-between gap-2.5">
          {POLICY_ROWS.map((r, i) => (
            <PolicyRow key={i} {...r} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Block 2 - Every decision logged and traceable (tokens / latency)
 * ------------------------------------------------------------------ */

const TOKEN_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const GREEN_BARS = [62, 70, 80, 66, 92, 74];
const ORANGE_BARS = [52, 34, 44, 30, 22, 26];

function TrendUp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M14 7h6v6" />
    </svg>
  );
}

function MockCostVisual() {
  const linePath =
    "M0,78 C18,78 26,58 44,58 C62,58 66,86 86,74 C104,63 108,40 132,44 C150,47 156,34 178,40 C196,45 198,92 214,70 C226,54 232,100 246,74 C262,64 280,70 300,66";
  const areaPath = `${linePath} L300,120 L0,120 Z`;

  return (
    <div className="relative mt-6 h-[430px]">
      {/* CARD 1 - Tokens Used (back, upper-left) */}
      <div
        className="absolute left-0 top-0 w-[82%] overflow-hidden rounded-[14px] border border-cv-line dark:border-white/10 bg-white dark:bg-[#141418] p-4 shadow-[0_10px_28px_-14px_rgba(16,24,40,0.10)] dark:shadow-[0_12px_30px_-12px_rgba(0,0,0,0.6)]"
        style={EDGE_FADE}
      >
        <CardLightEdge />
        <div className="rounded-xl border border-cv-line dark:border-white/10 bg-cv-ink/[0.03] dark:bg-white/[0.02] px-4 py-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs text-cv-muted">Tokens Used</div>
              <div className="mt-0.5 text-3xl font-bold text-cv-ink">34.5M</div>
            </div>
            <div className="space-y-1.5 text-right text-[11px] font-medium">
              <div className="flex items-center justify-end gap-1 text-cv-muted">
                Request Token Used: <span className="text-[#34D399]">85.91%</span>
                <TrendUp className="h-3 w-3 text-[#34D399]" />
              </div>
              <div className="flex items-center justify-end gap-1 text-cv-muted">
                Response Token Used: <span className="text-[#FF9736]">63.24%</span>
                <TrendUp className="h-3 w-3 text-[#FF9736]" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 flex h-[150px] items-end gap-3 px-1">
          {TOKEN_MONTHS.map((m, i) => (
            <div key={m} className="flex h-full flex-1 items-end justify-center gap-1.5">
              <div className="w-2.5 rounded-full" style={{ height: `${GREEN_BARS[i]}%`, background: "linear-gradient(to top, #2FBE86, #8CF3C8)", boxShadow: "0 0 8px rgba(52,211,153,0.55)" }} />
              <div className="w-2.5 rounded-full" style={{ height: `${ORANGE_BARS[i]}%`, background: "linear-gradient(to top, #E07E28, #FFC58A)", boxShadow: "0 0 8px rgba(255,151,54,0.55)" }} />
            </div>
          ))}
        </div>
        <div className="mt-2 flex gap-3 px-1">
          {TOKEN_MONTHS.map((m) => (
            <span key={m} className="flex-1 text-center text-[10px] text-cv-muted">{m}</span>
          ))}
        </div>
      </div>

      {/* CARD 2 - Latency (front, lower-right) */}
      <div
        className="absolute bottom-3 right-0 z-20 w-[60%] overflow-hidden rounded-[14px] border border-cv-line dark:border-white/10 bg-white dark:bg-[#141418] p-4 shadow-[0_14px_34px_-16px_rgba(16,24,40,0.12)] dark:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.75)]"
        style={EDGE_FADE}
      >
        <CardLightEdge />
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs text-cv-muted">Latency</div>
            <div className="mt-0.5 text-3xl font-bold text-cv-ink">313.69ms</div>
          </div>
          <div className="flex items-center gap-1 rounded-lg border border-cv-line dark:border-white/15 bg-cv-ink/[0.05] dark:bg-white/[0.04] px-2.5 py-1 text-xs text-cv-ink/80">
            Mean
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
        <div className="mt-4">
          <svg viewBox="0 0 300 120" preserveAspectRatio="none" className="h-[150px] w-full" aria-hidden>
            <defs>
              <linearGradient id="latFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B7CF6" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#8B7CF6" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[24, 48, 72, 96].map((y) => (
              <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="2 4" vectorEffect="non-scaling-stroke" />
            ))}
            <path d={areaPath} fill="url(#latFill)" />
            <path d={linePath} fill="none" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          </svg>
          <div className="mt-1 flex justify-between px-1 text-[10px] text-cv-muted">
            <span>Jan</span>
            <span>Mar</span>
            <span>May</span>
            <span>Jul</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Block 3 - Multi-tenant isolation (per-workspace policy + cost ceiling)
 * ------------------------------------------------------------------ */

const TENANTS: { name: string; meta: string; policy: string; gpu: number; cap: string; color: string }[] = [
  { name: "Acme AI", meta: "24 workloads · us-east-1", policy: "Strict-Prod", gpu: 42, cap: "$4.2k/mo", color: "#1664C0" },
  { name: "Beta Labs", meta: "11 workloads · us-west-2", policy: "Flexible", gpu: 31, cap: "$3.1k/mo", color: "#6954D4" },
  { name: "Core Eng", meta: "9 workloads · eu-west-1", policy: "Residency-EU", gpu: 27, cap: "$2.7k/mo", color: "#0E9E7A" },
  { name: "Data Sci", meta: "18 workloads · us-east-1", policy: "Flexible", gpu: 55, cap: "$5.1k/mo", color: "#D97706" },
  { name: "Growth", meta: "6 workloads · us-west-2", policy: "Strict-Prod", gpu: 18, cap: "$1.9k/mo", color: "#0EA5E9" },
];

function MockTenantVisual() {
  return (
    <div className="mt-6 h-[430px]">
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-cv-line bg-white p-4 shadow-[0_10px_28px_-14px_rgba(16,24,40,0.10)] dark:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] dark:border-white/10 dark:bg-[#141418]" style={EDGE_FADE}>
        <CardLightEdge />
        <div className="flex items-baseline justify-between px-1.5 pb-2.5">
          <span className="text-base font-semibold text-cv-ink">Workspaces</span>
          <span className="text-[11px] font-medium text-cv-muted">5 active</span>
        </div>

        {/* column header */}
        <div className="grid grid-cols-[1.3fr_1fr_1.1fr_auto] gap-3 border-b border-cv-line/60 px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-cv-muted dark:border-white/5">
          <span>Workspace</span>
          <span>Policy</span>
          <span>GPU alloc.</span>
          <span className="text-right">Cost cap</span>
        </div>

        <div className="flex flex-1 flex-col gap-1.5 pt-2">
          {TENANTS.map((t) => (
            <div key={t.name} className="grid grid-cols-[1.3fr_1fr_1.1fr_auto] items-center gap-3 rounded-xl border border-cv-line/70 bg-cv-ink/[0.02] px-3 py-2.5 dark:border-white/[0.07] dark:bg-white/[0.02]">
              <span className="flex items-center gap-2.5 min-w-0">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: t.color, boxShadow: `0 0 0 3px ${t.color}22` }} />
                <span className="min-w-0">
                  <span className="block truncate text-[13px] font-semibold leading-tight text-cv-ink">{t.name}</span>
                  <span className="block truncate text-[10px] leading-tight text-cv-muted">{t.meta}</span>
                </span>
              </span>
              <span className="truncate">
                <span className="rounded-full border border-cv-line/70 bg-cv-ink/[0.03] px-2 py-0.5 text-[11px] text-cv-ink/70 dark:border-white/10 dark:bg-white/[0.04]">{t.policy}</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-14 overflow-hidden rounded-full bg-cv-ink/[0.08] dark:bg-white/[0.08]">
                  <span className="block h-full rounded-full" style={{ width: `${t.gpu}%`, background: t.color }} />
                </span>
                <span className="font-mono text-[11px] tabular-nums text-cv-muted">{t.gpu}%</span>
              </span>
              <span className="text-right font-mono text-xs font-semibold text-cv-ink">{t.cap}</span>
            </div>
          ))}
        </div>

        <div className="mt-2.5 flex items-center gap-2 rounded-lg border border-[#1664C0]/25 bg-[#1664C0]/[0.06] px-3 py-2 text-[11px] text-cv-ink/70">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#1664C0]" />
          Isolated policy set and cost ceiling per workspace
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Block 4 - Budget caps (per-team spend meters, enforced at routing)
 * ------------------------------------------------------------------ */

const BUDGETS: { team: string; spent: number; limit: number; pct: number; flag?: boolean }[] = [
  { team: "Research", spent: 8.2, limit: 10, pct: 82, flag: true },
  { team: "Platform", spent: 4.1, limit: 6, pct: 68 },
  { team: "ML Infra", spent: 5.2, limit: 8, pct: 65 },
  { team: "Data Eng", spent: 2.7, limit: 5, pct: 54 },
  { team: "Growth", spent: 1.8, limit: 4, pct: 45 },
];

function MockBudgetVisual() {
  return (
    <div className="mt-6 h-[430px]">
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-cv-line bg-white p-5 shadow-[0_10px_28px_-14px_rgba(16,24,40,0.10)] dark:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] dark:border-white/10 dark:bg-[#141418]" style={EDGE_FADE}>
        <CardLightEdge />
        <div className="flex items-center justify-between px-1.5 pb-2.5">
          <span className="text-base font-semibold text-cv-ink">Budget Caps</span>
          <span className="rounded-full border border-cv-line/70 px-2 py-0.5 text-[10px] font-medium text-cv-muted dark:border-white/10">Enforced at routing</span>
        </div>

        <div className="flex flex-1 flex-col gap-1.5">
          {BUDGETS.map((b) => {
            const c = b.flag ? "#D97706" : "#1664C0";
            return (
              <div
                key={b.team}
                className={`rounded-xl px-3.5 py-2 ${
                  b.flag
                    ? "bg-[#D97706]/[0.06] ring-1 ring-[#D97706]/20"
                    : "border border-cv-line/70 bg-cv-ink/[0.02] dark:border-white/[0.07] dark:bg-white/[0.02]"
                }`}
              >
                <div className="mb-1.5 flex items-baseline justify-between">
                  <span className="flex items-center gap-2 text-[13px] font-semibold text-cv-ink">
                    {b.team}
                    {b.flag && (
                      <span className="rounded-full bg-[#D97706]/15 px-2 py-0.5 text-[10px] font-semibold text-[#D97706]">Approaching cap</span>
                    )}
                  </span>
                  <span className="font-mono text-[11px] text-cv-muted">
                    <span className="font-semibold text-cv-ink">${b.spent}k</span> / ${b.limit}k
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-cv-ink/[0.08] dark:bg-white/[0.08]">
                    <div className="h-full rounded-full" style={{ width: `${b.pct}%`, background: `linear-gradient(90deg, ${c}, ${c}CC)` }} />
                  </div>
                  <span className="w-9 shrink-0 text-right font-mono text-[11px] font-semibold tabular-nums" style={{ color: c }}>{b.pct}%</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-2.5 flex items-center gap-2 rounded-lg border border-cv-line/60 bg-cv-ink/[0.02] px-3 py-2 text-[11px] text-cv-ink/70 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0E9E7A]" />
          Block or reroute before the cap is breached
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Section
 * ------------------------------------------------------------------ */

const FEATURES = [
  {
    title: "Block rogue and spoofed agents",
    body: "A leaked or shared API key starts making model calls that look like a legitimate workload. Execution is identity-gated: only registered workloads with scoped runtime keys can route. Unknown callers are denied and logged; per-workload keys are revocable in one click. A stolen key becomes a dead key.",
    Visual: MockRBACVisual,
  },
  {
    title: "Answer audit and finance with evidence",
    body: "What did AI cost last quarter, per team and workload, and who accessed which prompts? The execution ledger attributes every call and dollar to a workload, team, and policy. Prompt access is RBAC-gated and every view is logged. Questions that took weeks of forensics become queries.",
    Visual: MockCostVisual,
  },
  {
    title: "Guardrail shadow AI, don't just ban it",
    body: "Teams have quietly built agents on Bedrock, Copilot Studio, Kubernetes, and raw OpenAI keys. Agentry discovers them across clouds, SaaS platforms, and clusters, ranks them by spend, and gives each a one-step on-ramp: point it at the governed endpoint, policy applies, nothing gets rewritten.",
    Visual: MockTenantVisual,
  },
  {
    title: "Stop runaway agent cost, in flight",
    body: "An agent enters a retry loop at 2am, burning tokens on your most expensive model. Budgets are reserved before each call and settled after. When a cap is breached, the next call is denied or downgraded, and a kill switch acts mid-incident. You find out from an alert with the loop already stopped, not the month-end invoice.",
    Visual: MockBudgetVisual,
  },
];

const CELL = "bg-cv-surface dark:bg-[#0D0D0D] p-6 lg:p-8 flex flex-col";

export function AgentryGovernance() {
  return (
    <section className="cv-section relative overflow-hidden bg-cv-surface">
      {/* Ambient blue gradient wash across the top, behind the header. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 hidden h-[460px] dark:block"
        style={{
          background:
            "radial-gradient(58% 105% at 32% -8%, rgba(46,107,214,0.58) 0%, rgba(22,100,192,0.26) 40%, transparent 74%), radial-gradient(46% 95% at 66% -6%, rgba(77,154,239,0.36) 0%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 block h-[460px] dark:hidden"
        style={{
          background:
            "radial-gradient(58% 105% at 32% -8%, rgba(120,170,255,0.30) 0%, rgba(150,190,255,0.12) 42%, transparent 74%), radial-gradient(46% 95% at 66% -6%, rgba(160,200,255,0.20) 0%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />
      <div className="cv-container relative z-10">
        {/* Section header */}
        <SectionHeading
          className="mb-20 lg:mb-28 lg:pt-8"
          eyebrow="Day one"
          title="What it does for you on day one"
          docsHref={DOCS.governance}
        >
          Not a roadmap. The things Agentry handles the moment it&apos;s in the execution path: rogue agents, audit-grade evidence, shadow AI, and runaway cost stopped in flight.
        </SectionHeading>

        {/* 2x2 grid of governance capabilities. Each ROW is its own grid so the
            two cells in a row stretch to equal height and their visuals (pushed
            to the bottom via mt-auto) align across the row. */}
        <div className="border border-cv-line/30 divide-y divide-cv-line/30">
          {[
            [FEATURES[0], FEATURES[1]],
            [FEATURES[2], FEATURES[3]],
          ].map((row, ri) => (
            <div key={ri} className="grid grid-cols-1 divide-y divide-cv-line/30 md:grid-cols-2 md:divide-y-0 md:divide-x">
              {row.map(({ title, body, Visual }) => (
                <div key={title} className={CELL}>
                  <h3 className="text-lg font-semibold text-cv-ink">{title}</h3>
                  <p className="mt-2 text-base text-cv-subtle leading-relaxed">{body}</p>
                  <Link href="/platform/agentry" className="mt-3 inline-flex items-center gap-1 text-xs text-[#1664C0] hover:text-[#0e4fa0] dark:text-[#7CB8F8] dark:hover:text-[#A9C8F8] transition-colors font-medium">
                    Learn More <ArrowRight weight="Linear" size={12} />
                  </Link>
                  <div className="mt-auto"><ScaledVisual><Visual /></ScaledVisual></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AgentryGovernance;
