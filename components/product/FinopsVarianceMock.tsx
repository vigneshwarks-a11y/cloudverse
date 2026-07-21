/* Content visual for "Spend is visible. Decisions are still hard."

   A three-panel control-plane flow, read left → right on a faint dot-grid:

     spend is visible        →   the four questions, answered   →   one data model
     (inert overview,             (CloudVerse — colored              (every domain +
      the passive today)           category badges per question)      signal on one record)

   Thin connector wires run between the panels with a small glowing dot
   travelling continuously along each path (cv-wire-flow / -y). The center
   panel is the focal one (blue-lit edge + soft glow). Home-page window chrome,
   theme-aware via cv-* tokens and AA instrument-color classes.

   Palette discipline: the four questions are domain-coded — amber = the change
   / variance, blue = the owner, purple = the judgement, teal = the fix. */

import { SpendBarChart } from "./finops/SpendBarChart";

const BLUE = "#1664C0";

/* Linear-style panel: a solid, subtly-elevated surface (no glass), a gradient
   hairline edge brightest at the top, and one soft ambient shadow. */
function Frame({
  title,
  dot,
  meta,
  focal,
  dim,
  children,
}: {
  title: string;
  dot: string;
  meta: string;
  focal?: boolean;
  dim?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={
        "cv-edge-tl relative flex flex-1 flex-col overflow-hidden rounded-[18px] bg-white dark:bg-[#0C0C0E] " +
        (focal
          ? "shadow-[0_28px_70px_-34px_rgba(22,100,192,0.4)] dark:shadow-[0_34px_80px_-32px_rgba(0,0,0,0.85)]"
          : "shadow-[0_18px_50px_-34px_rgba(16,24,40,0.28)] dark:shadow-[0_26px_60px_-38px_rgba(0,0,0,0.7)]") +
        (dim ? " md:opacity-[0.96]" : "")
      }
    >
      <div className="relative z-[2] flex items-center justify-between border-b border-cv-line/70 px-4 py-3 dark:border-white/[0.06]">
        <span className="flex items-center gap-2 font-mono text-[10.5px] tracking-tight text-cv-ink/65">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: dot, boxShadow: `0 0 6px ${dot}` }} />
          {title}
        </span>
        <span className="font-mono text-[10.5px] tracking-tight text-cv-ink/55">{meta}</span>
      </div>
      <div className="relative z-[2] flex flex-1 flex-col p-5">{children}</div>
    </div>
  );
}

/* A connector between two panels: a hairline rail with one small glowing dot
   travelling continuously along it, plus a node with a directional arrow.
   Horizontal on md+, vertical (stacked) on mobile. */
function Connector() {
  const dot = { background: BLUE, boxShadow: `0 0 8px 2px ${BLUE}99` };
  return (
    <div className="relative flex shrink-0 items-center justify-center py-1 md:w-16 md:py-0">
      {/* vertical — mobile */}
      <div className="relative flex h-9 w-full items-center justify-center md:hidden">
        <div className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cv-ink/15 to-transparent dark:via-white/15" />
          <span className="cv-wire-flow-y absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full" style={dot} />
        </div>
        <ArrowNode down />
      </div>
      {/* horizontal — desktop */}
      <div className="relative hidden h-full w-full items-center justify-center md:flex">
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cv-ink/15 to-transparent dark:via-white/15" />
          <span className="cv-wire-flow absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full" style={dot} />
        </div>
        <ArrowNode />
      </div>
    </div>
  );
}

function ArrowNode({ down }: { down?: boolean }) {
  return (
    <div className="cv-linear-edge relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white text-cv-ink shadow-[0_4px_12px_-4px_rgba(0,0,0,0.35)] dark:bg-[#0C0C0E] dark:text-white">
      <svg
        viewBox="0 0 24 24"
        className={"h-3.5 w-3.5 " + (down ? "rotate-90" : "")}
        fill="none"
        stroke={BLUE}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </div>
  );
}

/* One of the four questions as a colored category badge: hue border + faint
   hue tint + hue label, with the real answer set in ink beneath. */
const Q = {
  amber: { text: "cv-amber-text", tint: "rgba(217,119,6,0.09)", ring: "rgba(217,119,6,0.32)" },
  blue: { text: "cv-blue-text", tint: "rgba(22,100,192,0.09)", ring: "rgba(22,100,192,0.30)" },
  purple: { text: "cv-purple-text", tint: "rgba(105,84,212,0.10)", ring: "rgba(105,84,212,0.32)" },
  teal: { text: "cv-teal-text", tint: "rgba(14,158,122,0.10)", ring: "rgba(14,158,122,0.32)" },
} as const;

function QBadge({
  tone,
  n,
  q,
  answer,
  value,
  delay,
}: {
  tone: keyof typeof Q;
  n: string;
  q: string;
  answer: string;
  value?: string;
  delay: number;
}) {
  const t = Q[tone];
  return (
    <div
      className="cv-record-rise flex flex-col rounded-[13px] border p-3"
      style={{ background: t.tint, borderColor: t.ring, animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-2">
        <span className={"font-mono text-[10px] tabular-nums opacity-70 " + t.text}>{n}</span>
        <span className={"text-[11px] font-semibold uppercase tracking-[0.08em] " + t.text}>{q}</span>
      </div>
      <div className="mt-2 text-[12.5px] leading-snug text-cv-ink/85">{answer}</div>
      {value && <div className={"mt-1 font-mono text-[12px] font-semibold tabular-nums " + t.text}>{value}</div>}
    </div>
  );
}

/* Domain tile for the "one data model" grid — an aligned icon + label, one
   per spend domain, each in its module hue. */
function DomainTile({ label, tone, icon }: { label: string; tone: keyof typeof Q; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-[13px] border border-cv-line/70 bg-cv-surface2/60 py-3.5 dark:border-white/[0.06] dark:bg-white/[0.02]">
      <span className={Q[tone].text}>{icon}</span>
      <span className="text-[11px] font-medium text-cv-ink/80">{label}</span>
    </div>
  );
}

const ICON = {
  cloud: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 18a4 4 0 0 1-.5-7.97 5.5 5.5 0 0 1 10.6-1.06A3.75 3.75 0 0 1 17 18Z" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="7" y="7" width="10" height="10" rx="2.5" />
      <path d="M10.5 3v2M13.5 3v2M10.5 19v2M13.5 19v2M3 10.5h2M3 13.5h2M19 10.5h2M19 13.5h2" />
    </svg>
  ),
  data: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <ellipse cx="12" cy="6" rx="7" ry="2.6" />
      <path d="M5 6v6c0 1.44 3.13 2.6 7 2.6s7-1.16 7-2.6V6" />
      <path d="M5 12v6c0 1.44 3.13 2.6 7 2.6s7-1.16 7-2.6v-6" />
    </svg>
  ),
  saas: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </svg>
  ),
};

export function FinopsVarianceMock() {
  return (
    <div className="relative mt-12">
      {/* soft blue bloom behind the focal (center) panel */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-72 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: `radial-gradient(ellipse at center, ${BLUE}18, transparent 72%)`, filter: "blur(70px)" }}
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-stretch">
        {/* ── Panel A — spend is visible (passive, inert) ── */}
        <Frame title="spend / overview" dot="#8A8F98" meta="Last 30d" dim>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-cv-ink/65">Total spend</div>
              <div className="mt-1.5 font-mono text-[26px] font-semibold leading-none tabular-nums text-cv-ink">$128,400</div>
            </div>
            <span className="inline-flex items-center gap-1 text-[13px] font-semibold cv-amber-text">
              <svg viewBox="0 0 10 8" className="h-2 w-2.5" fill="currentColor" aria-hidden>
                <path d="M5 0l5 8H0z" />
              </svg>
              18%
            </span>
          </div>

          <SpendBarChart />

          <p className="mt-auto pt-4 text-[12px] leading-relaxed text-cv-ink/70">
            Visible — but it can&apos;t tell you which team, which change, or what to do.
          </p>
        </Frame>

        <Connector />

        {/* ── Panel B — the record: four questions, answered once (focal) ── */}
        <Frame title="variance / investigation" dot="#0E9E7A" meta="auto-attributed" focal>
          <div className="cv-record-rise flex items-baseline justify-between" style={{ animationDelay: "0ms" }}>
            <span className="flex items-baseline gap-2">
              <span className="font-mono text-[19px] font-semibold tabular-nums cv-amber-text">+$18,400</span>
              <span className="text-[11px] font-medium text-cv-ink/60">variance</span>
            </span>
            <span className="text-[10.5px] text-cv-ink/60">vs. forecast</span>
          </div>

          <div className="mt-4 grid flex-1 grid-cols-1 gap-2.5 sm:grid-cols-2">
            <QBadge tone="amber" n="01" q="What changed" answer="Snowflake full-table scans" value="+$18,400" delay={60} />
            <QBadge tone="blue" n="02" q="Who owns it" answer="team : data-eng" delay={120} />
            <QBadge tone="purple" n="03" q="Is it justified" answer="No · over forecast" delay={180} />
            <QBadge tone="teal" n="04" q="What to do next" answer="Right-size warehouse" value="−$4.2k/mo" delay={240} />
          </div>

          <div className="cv-record-rise mt-4 flex items-center justify-between gap-3" style={{ animationDelay: "300ms" }}>
            <p className="text-[11.5px] leading-snug text-cv-ink/70">
              Answered once, on one record.
              <span className="text-cv-ink/50"> Prioritized by impact · reversible · audited.</span>
            </p>
            <button
              type="button"
              className="cv-approve inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2 text-[12px] font-semibold text-white"
            >
              Approve &amp; apply
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </Frame>

        <Connector />

        {/* ── Panel C — one data model: every domain + signal on one record ── */}
        <Frame title="one data model" dot={BLUE} meta="unified">
          <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-cv-ink/65">Across your budget</div>

          <div className="mt-3 grid grid-cols-2 gap-2.5">
            <DomainTile label="Cloud" tone="blue" icon={ICON.cloud} />
            <DomainTile label="AI" tone="purple" icon={ICON.ai} />
            <DomainTile label="Data" tone="amber" icon={ICON.data} />
            <DomainTile label="SaaS" tone="teal" icon={ICON.saas} />
          </div>

          <div className="mt-4">
            <div className="mb-2 text-[10px] font-medium uppercase tracking-[0.14em] text-cv-ink/55">On one record</div>
            <div className="flex flex-wrap gap-1.5">
              {["Billing", "Usage", "Contracts", "Ownership"].map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-cv-line/70 px-2 py-0.5 font-mono text-[10.5px] text-cv-ink/70 dark:border-white/[0.08]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <p className="mt-auto pt-4 text-[12px] leading-relaxed text-cv-ink/70">
            Every dollar traced to a cause and an owner — one model, whole technology budget.
          </p>
        </Frame>
      </div>

      {/* Fade the instruments into the canvas at the bottom. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-16 bg-gradient-to-b from-transparent to-cv-surface"
      />
    </div>
  );
}
