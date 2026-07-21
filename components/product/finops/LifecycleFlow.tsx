/* Lifecycle — Understand · Optimize · Govern · Prove, laid out with the bordered
   bento technique: ONE container subdivided by hairlines into a 2×2 of cells (no
   floating card shells, no gaps), each cell carrying a real working instrument
   that floats on the cell canvas, then the step ordinal + title on one row and a
   two-line description below. The four are peers in an ordered sequence, so the
   grid is symmetric and the ordinal is styled identically on each. (The lifecycle
   is a fixed four-step sequence, so it fills a 2×2 rather than the reference's
   five-cell 2+3 — no stage is invented to pad a third column.)

   Color follows the Domain-Code Rule: amber = cost / spend / variance / attention,
   teal = savings / confidence / good / reconciled. Scope tags are neutral so only
   those two meanings carry hue. All badges are flat-fill; status badges add a
   leading dot. Flat surfaces, hairline enclosures, no gradient. Theme-aware,
   CSS-only motion, server component. Responsive: collapses to one column below sm. */

import { StatusPill, Meter, AreaChart, Bars, C } from "@/components/product/finops/kit";
import { CheckCircle, ArrowUp } from "@/lib/solar-icons";
import { cn } from "@/lib/utils";

/* Neutral scope tag — metadata (team, source), carries no cost/savings hue. */
function ScopeTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-cv-ink/[0.06] px-2 py-0.5 font-mono text-[10px] text-cv-ink/70 dark:bg-white/[0.07]">
      {children}
    </span>
  );
}

/* Filled/empty impact dots — an illustrative confidence-of-impact readout. */
function ImpactDots({ filled }: { filled: number }) {
  return (
    <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-cv-ink/50">
      Impact
      <span className="flex gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: i < filled ? C.teal : "hsl(var(--cv-ink) / 0.16)" }}
          />
        ))}
      </span>
    </span>
  );
}

type Stage = { n: number; title: string; body: string; visual: React.ReactNode };

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

const STAGES: Stage[] = [
  {
    n: 1,
    title: "Understand",
    body: "What changed and who owns it. Every dollar mapped to an owner and a driver.",
    // COST story → amber. Spend chart with the spike flagged, axis + timeframe
    // give it the same explanatory detail as Optimize's confidence + impact.
    visual: (
      <div className="flex h-full flex-col justify-between gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium text-cv-ink/70">Daily spend</span>
          <span className="text-[10px] uppercase tracking-[0.14em] text-cv-muted">Last 7 days</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <Bars values={[40, 52, 46, 60, 55, 68, 96]} flag={6} color={C.amber} height={100} />
          <div className="flex gap-1">
            {DAYS.map((d, i) => (
              <span
                key={i}
                className={cn(
                  "flex-1 text-center font-mono text-[9px] tabular-nums",
                  i === 6 ? "cv-amber-text font-semibold" : "text-cv-muted"
                )}
              >
                {d}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-end justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <ScopeTag>team:data-eng</ScopeTag>
            <ScopeTag>Snowflake</ScopeTag>
          </div>
          <span className="flex flex-col items-end leading-none">
            <span className="text-[9px] uppercase tracking-wide text-cv-muted">Top driver</span>
            <span className="mt-1 flex items-center gap-0.5 font-mono text-[14px] font-semibold cv-amber-text">
              <ArrowUp weight="Bold" size={12} />
              $18.4k
            </span>
          </span>
        </div>
      </div>
    ),
  },
  {
    n: 2,
    title: "Optimize",
    body: "Rightsizing, commitments, and waste, ranked by impact and confidence.",
    // SAVINGS story → teal throughout.
    visual: (
      <div className="flex h-full flex-col justify-center gap-6">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[15px] font-medium text-cv-ink">Right-size warehouse</span>
          <span className="font-mono text-[13px] font-semibold cv-teal-text">−$4.2k/mo</span>
        </div>
        <Meter label="Confidence" pct={94} right="High" color={C.teal} />
        <ImpactDots filled={3} />
      </div>
    ),
  },
  {
    n: 3,
    title: "Govern",
    body: "Budgets, approvals, and chargeback that survive an audit.",
    // Budget utilization: near-limit = amber (attention), healthy = teal (good).
    // Status pills flat-fill + dot; "Approval required" is attention → amber.
    visual: (
      <div className="flex h-full flex-col justify-center gap-5">
        <Meter label="Budget · Research" pct={82} right="82%" color={C.amber} />
        <Meter label="Budget · Platform" pct={61} right="61%" color={C.teal} />
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <StatusPill label="Approval required" color={C.amber} />
          <StatusPill label="Policy: on" color={C.teal} />
        </div>
      </div>
    ),
  },
  {
    n: 4,
    title: "Prove",
    body: "Savings and unit economics reconciled to the bill, as evidence.",
    // Realized SAVINGS → teal. "reconciled" a flat-fill dot pill like the rest.
    visual: (
      <div className="flex h-full flex-col justify-between gap-4">
        <div className="min-h-0 flex-1">
          <AreaChart values={[12, 20, 30, 38, 52, 66, 84, 96]} color={C.teal} height={120} markLast grid />
        </div>
        <div className="flex items-end justify-between gap-3">
          <span className="flex items-center gap-2 text-[15px] font-semibold text-cv-ink">
            <span className="flex h-4 w-4 items-center justify-center rounded-full" style={{ background: C.teal }}>
              <CheckCircle weight="Bold" size={11} className="text-white" />
            </span>
            $956k realized
          </span>
          <StatusPill label="reconciled" color={C.teal} />
        </div>
      </div>
    ),
  },
];

export function LifecycleFlow() {
  return (
    /* one bordered container, subdivided by hairlines into a 2×2 */
    <div className="cv-record-rise overflow-hidden rounded-[24px] border border-cv-line/70 dark:border-white/10">
      <ol className="grid gap-px bg-cv-line/60 dark:bg-white/[0.08] sm:grid-cols-2">
        {STAGES.map((s) => (
          <li
            key={s.title}
            className="flex flex-col gap-6 bg-cv-surface p-7 transition-colors duration-200 hover:bg-cv-ink/[0.015] dark:bg-[#080808] dark:hover:bg-white/[0.02] lg:p-9"
          >
            {/* instrument floats directly on the cell canvas — no well */}
            <div className="h-[196px] w-full">{s.visual}</div>
            {/* ordinal + title on one row, description below — identical on all four */}
            <div>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-[22px] font-semibold leading-none tracking-tight text-cv-ink">{s.title}</h3>
                <span className="font-mono text-[13px] font-medium tabular-nums text-cv-muted">
                  {String(s.n).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-2.5 max-w-[46ch] text-[15px] font-medium leading-relaxed text-cv-ink/70">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default LifecycleFlow;
