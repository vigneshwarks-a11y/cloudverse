"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "@/lib/solar-icons";
import { SectionHeading } from "@/components/SectionHeading";

/* ────────────────────────────────────────────────────────────────────────
   "Every domain of technology spend, one record."

   Right-column visual follows the Laravel Cloud tabbed-showcase recipe:
   fixed-height stage → edge mask-fade → tilted group
   (origin-top-right rotate-[5deg] skew-x-[-10deg]) → floating cards that
   bleed off the right edge. Rendered DARK (committed) - product-screenshot
   chrome sitting on a theme-aware cv-surface section.
   ──────────────────────────────────────────────────────────────────────── */

const ACCENT = {
  cloud: "#2278E0",
  ai: "#6954D4",
  data: "#D97706",
  saas: "#0E9E7A",
  eng: "#2278E0",
} as const;

const SUCCESS = "#34D399";
const DANGER = "#FF5470";
const INPROGRESS = "#4D9AEF";

/* Dark card chrome - hairline border + soft drop shadow */
const CARD =
  "rounded-lg bg-white shadow-[0_0_0_1px_rgba(15,23,42,0.06),0_10px_30px_rgba(15,23,42,0.05)] dark:bg-[#111114] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.18),0_18px_44px_rgba(0,0,0,0.55)]";

/* Top-right border light-edge - a 1px gradient-filled border isolated with the
   mask-composite trick (same technique as the Enterprise Control cards, oriented
   to the top-right corner instead of the top-left). Host must be `relative` and
   rounded; renders nothing but the lit border ring. */
function CornerEdge() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit]"
      style={{
        padding: "1px",
        background:
          "linear-gradient(225deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.18) 20%, rgba(255,255,255,0) 46%)",
        WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }}
    />
  );
}

type Key = keyof typeof ACCENT;

type Feature = {
  key: Key;
  title: string;
  desc: string;
  accent: string;
  lineItems: string[];
  users: string;
  /* Module page this domain routes to (rendered only with `withLinks`). */
  href: string;
  linkLabel: string;
};

const FEATURES: Feature[] = [
  {
    key: "cloud",
    title: "Cloud",
    desc: "Multi-cloud cost intelligence: allocation, anomalies, chargeback, and commitments across AWS, Azure, Google Cloud, and eight more providers.",
    accent: ACCENT.cloud,
    lineItems: ["Compute", "Storage", "Network"],
    users: "FinOps teams",
    href: "/platform/finops",
    linkLabel: "Explore the FinOps Platform",
  },
  {
    key: "ai",
    title: "AI",
    desc: "Spend visibility, budgets, and chargeback across every model and provider your teams use. Technology Spend explains the economics; Agentry adds execution-path governance.",
    accent: ACCENT.ai,
    lineItems: ["Tokens", "Models", "Agents"],
    users: "AI & platform teams",
    href: "/platform/agentry",
    linkLabel: "Explore Agentry",
  },
  {
    key: "data",
    title: "Data",
    desc: "Warehouse and pipeline spend, explained by query and workload behavior, not just by resource tag.",
    accent: ACCENT.data,
    lineItems: ["Warehouses", "Pipelines", "Queries"],
    users: "Data teams",
    href: "/platform/datax",
    linkLabel: "Explore DataX",
  },
  {
    key: "saas",
    title: "SaaS",
    desc: "Usage and ownership across business units: which teams use which tools, and at what utilization. (Rolling out.)",
    accent: ACCENT.saas,
    lineItems: ["Licenses", "Seats", "Renewals"],
    users: "IT & procurement",
    href: "/platform/finops",
    linkLabel: "Explore the FinOps Platform",
  },
  {
    key: "eng",
    title: "Engineering",
    desc: "Shift-left cost checks: cost signals inside the PR before merge, and Kubernetes cost attribution to service, team, and owner.",
    accent: ACCENT.eng,
    lineItems: ["CI/CD", "Kubernetes", "PR checks"],
    users: "Platform engineering",
    href: "/platform/torb",
    linkLabel: "Explore Torb",
  },
];

const DWELL_MS = 5500;

const MASK: React.CSSProperties = {
  WebkitMaskImage:
    "linear-gradient(to bottom,#000 55%,transparent 100%), linear-gradient(to left,#000 72%,transparent 100%)",
  WebkitMaskComposite: "source-in",
  maskImage:
    "linear-gradient(to bottom,#000 55%,transparent 100%), linear-gradient(to left,#000 72%,transparent 100%)",
  maskComposite: "intersect",
};

export function FeatureShowcase({ withLinks = false }: { withLinks?: boolean }) {
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const startTimer = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    if (reduced) return;
    timer.current = setInterval(
      () => setActive((i) => (i + 1) % FEATURES.length),
      DWELL_MS
    );
  }, [reduced]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [startTimer]);

  const select = (i: number) => {
    setActive(i);
    startTimer();
  };

  const current = FEATURES[active];

  return (
    <section className="bg-cv-surface cv-section overflow-hidden">
      <div className="cv-container">
        <SectionHeading eyebrow="One platform · Five domains" title="Every domain of technology spend, one record." lead>
          Cloud taught enterprises what ungoverned spend costs. AI is repeating
          it faster. CloudVerse puts every domain on one record: for AI and
          engineering we sit at the execution path itself; for cloud, data, and
          SaaS we make every dollar accountable with allocation, chargeback, and
          evidence.
        </SectionHeading>

        <div className="mt-12 hidden items-center gap-12 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          {/* ── LEFT: tab list ── */}
          <ul className="space-y-1">
            {FEATURES.map((f, i) => {
              const isActive = i === active;
              return (
                <li key={f.key}>
                  <button
                    type="button"
                    onClick={() => select(i)}
                    aria-pressed={isActive}
                    className="group block w-full border-l-2 py-3.5 pl-5 text-left transition-colors duration-300"
                    style={{
                      borderColor: isActive ? f.accent : "hsl(var(--cv-line))",
                    }}
                  >
                    <span className="flex items-center gap-2.5">
                      <span
                        className="text-xl font-semibold transition-colors duration-300"
                        style={{
                          color: isActive
                            ? "hsl(var(--cv-ink))"
                            : "hsl(var(--cv-muted))",
                        }}
                      >
                        {f.title}
                      </span>
                    </span>
                    <span
                      className="mt-1.5 block text-[15px] leading-relaxed transition-opacity duration-300"
                      style={{
                        color: "hsl(var(--cv-muted))",
                        opacity: isActive ? 1 : 0.6,
                      }}
                    >
                      {f.desc}
                    </span>
                  </button>
                  {withLinks && isActive && (
                    <div className="border-l-2 pb-3 pl-5" style={{ borderColor: f.accent }}>
                      <Link
                        href={f.href}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline underline-offset-4"
                        style={{ color: f.accent }}
                        data-testid={`link-router-${f.key}`}
                      >
                        {f.linkLabel} <ArrowRight weight="Linear" size={14} />
                      </Link>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* ── RIGHT: one shared tilted, mask-faded frame for all 5 ── */}
          <VisualFrame reduced={reduced} activeKey={current.key}>
            <DomainVisual k={current.key} />
          </VisualFrame>
        </div>

        {/* ── Mobile: accordion — active item reveals description + visual,
            the rest show only their heading. ── */}
        <div className="mt-10 lg:hidden">
          <ul className="space-y-1">
            {FEATURES.map((f, i) => {
              const isActive = i === active;
              return (
                <li key={f.key} className={isActive ? "pb-4" : undefined}>
                  {/* Accent line runs alongside the heading + description only,
                      not down past the visual. */}
                  <div
                    className="border-l-2 pl-4"
                    style={{ borderColor: isActive ? f.accent : "hsl(var(--cv-line))" }}
                  >
                    <button
                      type="button"
                      onClick={() => select(i)}
                      aria-pressed={isActive}
                      className="block w-full py-3.5 text-left text-lg font-semibold transition-colors duration-300"
                      style={{ color: isActive ? "hsl(var(--cv-ink))" : "hsl(var(--cv-muted))" }}
                    >
                      {f.title}
                    </button>
                    {isActive && (
                      <p className="pb-1 text-sm leading-relaxed text-cv-muted">{f.desc}</p>
                    )}
                    {withLinks && isActive && (
                      <Link
                        href={f.href}
                        className="mb-2 inline-flex items-center gap-1.5 text-sm font-semibold hover:underline underline-offset-4"
                        style={{ color: f.accent }}
                        data-testid={`link-router-m-${f.key}`}
                      >
                        {f.linkLabel} <ArrowRight weight="Linear" size={14} />
                      </Link>
                    )}
                  </div>
                  {isActive && (
                    <div className="mt-4 pl-4">
                      <ScaledVisual designW={600} designH={532}>
                        <TiltedVisual reduced={reduced}>
                          <DomainVisual k={f.key} />
                        </TiltedVisual>
                      </ScaledVisual>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <p className="mt-8 text-[13px] text-cv-muted">
          The data model holds every domain to the same standard. Read-only by
          default: connect in under 30 minutes.
        </p>
      </div>
    </section>
  );
}

export default FeatureShowcase;

/* Maps a domain key to its visual. */
function DomainVisual({ k }: { k: Key }) {
  switch (k) {
    case "cloud":
      return <CloudState />;
    case "ai":
      return <AiState />;
    case "data":
      return <DataState />;
    case "saas":
      return <SaasState />;
    case "eng":
      return <EngState />;
    default:
      return null;
  }
}

/* Reproduces the desktop frame's look (edge MASK-fade + origin-top-right tilt/
   skew) at a fixed design size, so the mobile visual matches desktop exactly —
   just scaled by ScaledVisual. */
function TiltedVisual({ children, reduced }: { children: React.ReactNode; reduced: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden pt-24" style={reduced ? undefined : MASK}>
      <div className={"relative origin-top-right " + (reduced ? "" : "rotate-[5deg] skew-x-[-10deg]")}>
        {children}
      </div>
    </div>
  );
}

/* Responsive wrapper: renders the fixed 600px-wide visual design and scales it
   down (never up) to fit the available width, reserving the scaled height so it
   never overflows. Lets the mobile layout reuse the exact desktop visuals. */
function ScaledVisual({
  children,
  designW = 600,
  designH = 540,
}: {
  children: React.ReactNode;
  designW?: number;
  designH?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.56);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setScale(Math.min(1, el.clientWidth / designW));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [designW]);
  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ height: designH * scale }}>
      <div
        className="absolute left-0 top-0"
        style={{ width: designW, height: designH, transform: `scale(${scale})`, transformOrigin: "top left" }}
      >
        {children}
      </div>
    </div>
  );
}

/* ═══════════════════════ VisualFrame - the ONE shared frame ═══════════════════════
   Defined a single time so the geometry can't drift between the 5 states:
   the fixed-size container, the edge MASK-fade, and the tilted group
   (origin-top-right · scale · rotate · skew) all live here. Each visual
   renders its content as children and bleeds past the right/bottom edges,
   fading out via MASK - never hard-clipped. Only the children cross-fade;
   the frame's bounding box, tilt and fade are identical for every state. */

const PANEL = "absolute right-0 top-0 w-[600px]"; // unified panel anchor + width

function VisualFrame({
  reduced,
  activeKey,
  children,
}: {
  reduced: boolean;
  activeKey: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative -mx-8 h-[420px] cursor-default select-none sm:h-[532px] lg:mx-0">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeKey}
          className="absolute inset-0"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.3 }}
        >
          <div
            className="relative -mx-8 box-content h-full overflow-hidden px-8 pt-24"
            style={reduced ? undefined : MASK}
          >
            <div
              className={
                "relative origin-top-right scale-[0.72] sm:scale-100 " +
                (reduced ? "" : "rotate-[5deg] skew-x-[-10deg]")
              }
            >
              {children}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* Small building blocks */

function Dot({ color }: { color: string }) {
  return (
    <span
      className="inline-block h-1 w-3 shrink-0 rounded-full"
      style={{ background: color }}
    />
  );
}

function Chevron() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5 text-cv-muted/60"
    >
      <path d="M10 8L14 12L10 16" />
    </svg>
  );
}

/* ═══════════════════════════ Cloud - metrics cards ═══════════════════════════ */

function CloudState() {
  const times = ["06 PM", "09 PM", "12 AM", "03 AM", "06 AM", "09 AM", "12 PM", "03 PM"];
  return (
    <>
      {/* Top metrics card - provider spend */}
      <div className={`${PANEL} p-6 text-cv-muted ${CARD}`}>
        <CornerEdge />
        <div className="flex justify-end gap-8">
          <Legend color={ACCENT.cloud} label="AWS" value="$42.1K" />
          <Legend color={ACCENT.ai} label="Azure" value="$18.3K" />
          <Legend color={SUCCESS} label="GCP" value="$9.7K" />
        </div>
        <LineChart
          series={[
            { color: ACCENT.cloud, pts: "0,58 85,50 170,56 255,38 340,44 425,28 510,32 600,18" },
            { color: ACCENT.ai, pts: "0,80 85,76 170,82 255,72 340,68 425,74 510,62 600,60" },
            { color: SUCCESS, pts: "0,92 85,90 170,88 255,90 340,84 425,86 510,82 600,80" },
          ]}
        />
        <div className="mt-3 flex justify-between text-xs text-cv-muted/60">
          {times.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>

      {/* Second metrics card - resource lines. Staggered down + right from
          card 1 so it reads as a distinct cascading surface (own shadow). */}
      <div className={`absolute top-[252px] right-[-56px] w-[600px] p-6 text-cv-muted ${CARD}`}>
        <CornerEdge />
        <div className="flex justify-end gap-8">
          <Legend color="#94A3B8" label="Compute" value="$31.4K" />
          <Legend color="#FFB224" label="Storage" value="$12.7K" />
          <Legend color={DANGER} label="Network" value="$4.2K" />
        </div>
        <LineChart
          series={[
            { color: "#94A3B8", pts: "0,40 85,44 170,36 255,42 340,34 425,40 510,30 600,34" },
            { color: "#FFB224", pts: "0,66 85,62 170,68 255,60 340,64 425,56 510,60 600,52" },
            { color: DANGER, pts: "0,90 85,88 170,92 255,86 340,88 425,90 510,86 600,88" },
          ]}
        />
        <div className="mt-3 flex justify-between text-xs text-cv-muted/60">
          {times.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>

      {/* Floating tooltip - straddles the seam between the two cards, centered */}
      <div
        className="absolute top-[212px] right-[266px] hidden overflow-hidden divide-y divide-cv-line/70 dark:divide-white/[0.06] rounded-lg bg-cv-card dark:bg-[#141418] text-cv-muted shadow-[0_0_0_1px_rgba(255,255,255,0.08),8px_12px_28px_rgba(0,0,0,0.5)] sm:block"
      >
        <CornerEdge />
        <div className="px-4 py-2 font-medium text-cv-ink">09:45 AM</div>
        <div className="space-y-2 px-4 py-3">
          {[
            ["EC2", "$12.4K", ACCENT.cloud],
            ["S3", "$3.1K", "#FFB224"],
            ["RDS", "$2.0K", SUCCESS],
          ].map(([label, val, color]) => (
            <div key={label} className="flex justify-between gap-10 text-[13px]">
              <span className="flex items-center gap-2 text-cv-ink">
                <Dot color={color} />
                {label}
              </span>
              <span>{val}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function Legend({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <div className="text-right">
      <p className="flex items-center justify-end gap-2 text-cv-muted">
        <Dot color={color} />
        {label}
      </p>
      <p className="text-xl font-medium text-cv-ink">{value}</p>
    </div>
  );
}

function LineChart({ series }: { series: { color: string; pts: string }[] }) {
  return (
    <svg viewBox="0 0 600 100" className="mt-6 h-28 w-full" preserveAspectRatio="none">
      {[25, 50, 75].map((y) => (
        <line key={y} x1="0" x2="600" y1={y} y2={y} stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1" />
      ))}
      {series.map((s, i) => (
        <polyline
          key={i}
          points={s.pts}
          fill="none"
          stroke={s.color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

/* ═══════════════════════════ AI - log stream ═══════════════════════════ */

function AiState() {
  return (
    <div className={`${PANEL} space-y-0.5 overflow-hidden p-4 font-mono text-[13px] text-cv-muted ${CARD}`}>
      <CornerEdge />
      <AiLog time="14:02:11" label="gpt-4o · agent:research-bot" tokens="1,204 tokens" status="DONE" />
      <AiLog time="14:03:47" label="claude-opus · agent:support-bot" tokens="890 tokens" status="DONE" />

      {/* Flagged row - contained: timestamp shrinks-0, detail block flexes
          and wraps within the card; nothing runs past the edges. */}
      <div className="flex gap-3 rounded-md border border-[#ff003f]/15 bg-[#ff003f]/[0.08] p-1.5 text-[#ff5470]/70">
        <p className="shrink-0">
          14:04:02 <span className="text-[#ff5470]">15:04:02.918</span> UTC
        </p>
        <div className="min-w-0 flex-1">
          <p>
            <span className="text-[#ff5470]">Policy violation: token budget exceeded</span>
          </p>
          <div className="mt-2 space-y-1 border-l border-cv-line dark:border-white/10 pl-4">
            <p>class: <span className="text-[#ff5470]">Agentry\Policy\BudgetExceeded</span></p>
            <p>agent: <span className="text-[#ff5470]">agent:billing-sync · model: gpt-4o</span></p>
            <p>requested: <span className="text-[#ff5470]">12,000 tokens · allowed: 5,000 tokens</span></p>
            <p className="-mx-1.5 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 hover:bg-[#ff003f]/10">
              Action taken
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5">
                <path d="M8 10L12 14L16 10" />
              </svg>
            </p>
          </div>
        </div>
        <div className="flex size-[1.125rem] shrink-0 items-center justify-center rounded-sm bg-cv-ink/[0.06] dark:bg-[#1a1a1e] text-[#ff5470] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5">
            <path d="M16 14L12 10L8 14" />
          </svg>
        </div>
      </div>

      <AiLog time="14:05:15" label="gemini-1.5 · agent:sync-worker" tokens="2,301 tokens" status="DONE" dim />
      <AiLog time="14:06:02" label="gpt-4o-mini · agent:classifier" tokens="512 tokens" status="RUNNING" dim />
      <AiLog time="14:07:44" label="claude-opus · agent:planner" tokens="3,190 tokens" status="DONE" dim />
      <AiLog time="14:08:19" label="gpt-4o · agent:research-bot" tokens="1,004 tokens" status="RUNNING" dim />
      <AiLog time="14:09:51" label="gemini-1.5 · agent:sync-worker" tokens="880 tokens" status="RUNNING" dim />
      <AiLog time="14:10:33" label="claude-opus · agent:support-bot" tokens="1,470 tokens" status="DONE" dim />
      <AiLog time="14:11:07" label="gpt-4o-mini · agent:classifier" tokens="640 tokens" status="RUNNING" dim />
    </div>
  );
}

function AiLog({
  time,
  label,
  tokens,
  status,
  dim,
}: {
  time: string;
  label: string;
  tokens: string;
  status: "DONE" | "RUNNING";
  dim?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-md p-1.5 hover:bg-cv-ink/[0.05]" style={{ opacity: dim ? 0.55 : 1 }}>
      <span className="shrink-0">
        2026-07-08 <span className="text-cv-ink">{time}.471</span> UTC
      </span>
      <span className="min-w-0 flex-1 truncate text-cv-ink">{label}</span>
      <span className="shrink-0">
        {status === "DONE" ? (
          <>
            <span className="text-cv-ink">{tokens}</span> DONE
          </>
        ) : (
          "RUNNING"
        )}
      </span>
      <div className="flex size-[1.125rem] shrink-0 items-center justify-center rounded-sm bg-cv-ink/[0.06] dark:bg-[#1a1a1e] text-cv-ink/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5">
          <path d={status === "DONE" ? "M8 10L12 14L16 10" : "M16 14L12 10L8 14"} />
        </svg>
      </div>
    </div>
  );
}

/* ═══════════════════════════ Data - run history ═══════════════════════════ */

function DataState() {
  const rows = [
    { label: "warehouse:snowflake.orders_sync", owner: "Priya Shah", when: "Just now", status: "progress", initial: "P", avatar: ACCENT.cloud },
    { label: "pipeline:dbt.revenue_model", owner: "Dana Osei", when: "4 minutes ago", status: "done", initial: "D", avatar: ACCENT.data },
    { label: "query:looker.churn_report", owner: "Sam Iyer", when: "8 minutes ago", status: "done", initial: "S", avatar: ACCENT.ai },
    { label: "pipeline:airflow.etl_nightly", owner: "Priya Shah", when: "1 hour ago", status: "failed", initial: "P", avatar: ACCENT.cloud },
    { label: "warehouse:databricks.feature_build", owner: "Dana Osei", when: "2 hours ago", status: "done", initial: "D", avatar: ACCENT.data },
    { label: "query:bigquery.margin_daily", owner: "Sam Iyer", when: "4 hours ago", status: "done", initial: "S", avatar: ACCENT.ai },
  ] as const;

  return (
    <div className={`${PANEL} divide-y divide-cv-line/70 dark:divide-white/[0.06] text-cv-muted ${CARD}`}>
      <CornerEdge />
      {rows.map((r) => (
        <div key={r.label} className="p-1">
          <div className="group flex items-center justify-between rounded-md py-2 pr-6 pl-4 hover:bg-cv-ink/[0.05]">
            <div className="space-y-3">
              <p className="font-mono text-cv-ink">{r.label}</p>
              <div className="flex items-center gap-1.5 text-cv-muted">
                <span className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold text-white" style={{ background: r.avatar }}>
                  {r.initial}
                </span>
                <span>{r.owner}</span>
                <span>·</span>
                <span>{r.when}</span>
              </div>
            </div>
            <div className="flex items-center gap-12">
              <RunStatus status={r.status} />
              <Chevron />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function RunStatus({ status }: { status: "progress" | "done" | "failed" }) {
  if (status === "progress") {
    return (
      <p className="flex w-28 items-center gap-2 font-medium" style={{ color: INPROGRESS }}>
        <svg viewBox="0 0 24 24" fill="none" className="size-4 animate-spin">
          <circle cx="12" cy="12" r="9" stroke={INPROGRESS} strokeWidth="3" strokeOpacity="0.25" />
          <path d="M21 12a9 9 0 0 0-9-9" stroke={INPROGRESS} strokeWidth="3" strokeLinecap="round" />
        </svg>
        In progress
      </p>
    );
  }
  if (status === "failed") {
    return (
      <p className="flex w-28 items-center gap-2 font-medium" style={{ color: DANGER }}>
        <svg viewBox="0 0 16 16" fill={DANGER} className="size-4">
          <path fillRule="evenodd" clipRule="evenodd" d="M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8ZM6.03033 4.96967C5.73744 4.67678 5.26256 4.67678 4.96967 4.96967C4.67678 5.26256 4.67678 5.73744 4.96967 6.03033L6.93934 8L4.96967 9.96967C4.67678 10.2626 4.67678 10.7374 4.96967 11.0303C5.26256 11.3232 5.73744 11.3232 6.03033 11.0303L8 9.06066L9.96967 11.0303C10.2626 11.3232 10.7374 11.3232 11.0303 11.0303C11.3232 10.7374 11.3232 10.2626 11.0303 9.96967L9.06066 8L11.0303 6.03033C11.3232 5.73744 11.3232 5.26256 11.0303 4.96967C10.7374 4.67678 10.2626 4.67678 9.96967 4.96967L8 6.93934L6.03033 4.96967Z" />
        </svg>
        Failed
      </p>
    );
  }
  return (
    <p className="flex w-28 items-center gap-2 font-medium" style={{ color: SUCCESS }}>
      <svg viewBox="0 0 16 16" fill={SUCCESS} className="size-4">
        <path fillRule="evenodd" clipRule="evenodd" d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM11.1865 5.1874C10.8212 4.8975 10.2828 4.94972 9.98386 5.30405L6.9191 8.93721L5.95897 8.00596C5.62521 7.68224 5.08408 7.68224 4.75032 8.00596C4.41656 8.32969 4.41656 8.85454 4.75032 9.17827L6.37822 10.7572C6.54896 10.9228 6.78396 11.0106 7.02512 10.999C7.26629 10.9873 7.49111 10.8772 7.64401 10.696L11.3068 6.35389C11.6057 5.99956 11.5518 5.47731 11.1865 5.1874Z" />
      </svg>
      Finished
    </p>
  );
}

/* ═══════════════════════════ SaaS - command palette ═══════════════════════════ */

function SaasState() {
  return (
    <div className={`${PANEL} rounded-lg bg-white dark:bg-[#111114] p-1 shadow-[0_0_0_1px_rgba(15,23,42,0.06),0_10px_30px_rgba(15,23,42,0.05)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.18),0_18px_44px_rgba(0,0,0,0.55)]`}>
      <div className="relative overflow-hidden rounded-lg bg-cv-card dark:bg-[#141418] shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_0_0_7px_#F1F3F6,0_0_0_8px_rgba(0,0,0,0.06)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_0_0_7px_#0c0c0f,0_0_0_8px_rgba(255,255,255,0.06)]">
        <CornerEdge />
        <div className="flex items-center border-b border-white/[0.06] p-4 text-cv-muted">
          <span className="mr-2 h-6 w-0.5 animate-pulse-dot rounded-full bg-[#4D9AEF]" />
          Search subscriptions, seats, tools…
        </div>
        <div className="px-2.5 py-3.5">
          <p className="p-2 pt-0 text-xs font-medium text-cv-muted">Duplicate tools detected</p>
          <PaletteRow name="Figma" meta="2 workspaces active" accent={ACCENT.saas} />
          <PaletteRow name="Notion" meta="3 seats overlapping" accent={ACCENT.saas} />
          <p className="p-2 pt-4 text-xs font-medium text-cv-muted">Renewals this month</p>
          <PaletteRow name="Datadog" meta="renews in 6 days" accent={ACCENT.data} />
          <PaletteRow name="Slack" meta="renews in 12 days" accent={ACCENT.data} />
          <PaletteRow name="Zoom" meta="renews in 19 days" accent={ACCENT.data} />
          <PaletteRow name="Linear" meta="renews in 23 days" accent={ACCENT.data} />
          <PaletteRow name="GitHub" meta="renews in 27 days" accent={ACCENT.data} />
        </div>
      </div>
    </div>
  );
}

function PaletteRow({ name, meta, accent }: { name: string; meta: string; accent: string }) {
  return (
    <div className="flex h-11 items-center gap-3 rounded-md p-2 text-cv-muted hover:bg-cv-ink/[0.06]">
      <span className="flex h-6 w-6 items-center justify-center rounded-md text-[11px] font-semibold text-white" style={{ background: accent }}>
        {name[0]}
      </span>
      <span className="font-medium text-cv-ink">{name}</span>
      <span className="ml-auto text-[13px]">{meta}</span>
    </div>
  );
}

/* ═══════════════════════════ Engineering - PR cost check ═══════════════════════════ */

function EngState() {
  const lines = [
    ["Compute · EKS", "+$920/mo"],
    ["Data egress", "+$210/mo"],
    ["Logging", "+$110/mo"],
  ];
  return (
    <div className={`${PANEL} p-4 text-cv-muted ${CARD}`}>
      <CornerEdge />
      {/* PR header */}
      <div className="flex items-center justify-between rounded-md p-2">
        <div className="flex items-center gap-2">
          <span className="rounded-md px-1.5 py-0.5 text-[11px] font-semibold" style={{ color: ACCENT.eng, background: `${ACCENT.eng}22` }}>
            PR #482
          </span>
          <span className="font-mono text-[13px] text-cv-ink">feat: add checkout retry queue</span>
        </div>
        <span className="rounded-full px-2.5 py-1 text-[11px] font-medium" style={{ color: "#FFB224", background: "#FFB22422" }}>
          Needs review
        </span>
      </div>

      <div className="my-2 h-px bg-cv-ink/10 dark:bg-white/[0.06]" />

      {/* Cost check block */}
      <div className="rounded-md bg-cv-ink/[0.04] dark:bg-white/[0.03] p-3">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-medium text-cv-ink">CloudVerse cost check</span>
          <span className="font-mono text-[15px] font-semibold" style={{ color: ACCENT.data }}>+$1,240/mo</span>
        </div>
        <div className="mt-3 space-y-1.5 font-mono text-[13px]">
          {lines.map(([label, val]) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-cv-muted">{label}</span>
              <span className="text-cv-ink">{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Attribution */}
      <p className="mt-3 px-1 text-[12px] leading-relaxed text-cv-muted">
        Kubernetes attribution:{" "}
        <span className="font-mono text-cv-ink">service:checkout</span> ·{" "}
        <span className="font-mono text-cv-ink">team:payments</span> ·{" "}
        <span className="font-mono text-cv-ink">owner:Sam Iyer</span>
      </p>

      {/* Checks */}
      <div className="mt-3 space-y-2 px-1">
        {[
          ["CI/CD pipeline", "passed", "done"],
          ["PR checks", "passed", "done"],
          ["Cost budget", "evaluating", "progress"],
        ].map(([label, note, state]) => (
          <div key={label} className="flex items-center gap-2 text-[13px]">
            {state === "done" ? (
              <svg viewBox="0 0 16 16" fill={SUCCESS} className="size-4">
                <path fillRule="evenodd" clipRule="evenodd" d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM11.1865 5.1874C10.8212 4.8975 10.2828 4.94972 9.98386 5.30405L6.9191 8.93721L5.95897 8.00596C5.62521 7.68224 5.08408 7.68224 4.75032 8.00596C4.41656 8.32969 4.41656 8.85454 4.75032 9.17827L6.37822 10.7572C6.54896 10.9228 6.78396 11.0106 7.02512 10.999C7.26629 10.9873 7.49111 10.8772 7.64401 10.696L11.3068 6.35389C11.6057 5.99956 11.5518 5.47731 11.1865 5.1874Z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" className="size-4 animate-spin">
                <circle cx="12" cy="12" r="9" stroke={INPROGRESS} strokeWidth="3" strokeOpacity="0.25" />
                <path d="M21 12a9 9 0 0 0-9-9" stroke={INPROGRESS} strokeWidth="3" strokeLinecap="round" />
              </svg>
            )}
            <span className="text-cv-ink">{label}</span>
            <span className="ml-auto text-[12px] text-cv-muted">{note}</span>
          </div>
        ))}
      </div>

      {/* Recent PR cost checks - fills the shared frame */}
      <div className="mt-3 border-t border-white/[0.06] px-1 pt-3">
        <p className="mb-2 text-[11px] font-medium text-cv-muted">Recent cost checks</p>
        <div className="space-y-2 font-mono text-[13px]">
          {[
            ["#478", "fix: retry backoff", "+$180/mo"],
            ["#471", "chore: bump base image", "+$40/mo"],
            ["#465", "feat: batch exports", "+$610/mo"],
          ].map(([pr, title, delta]) => (
            <div key={pr} className="flex items-center gap-2">
              <span className="shrink-0 rounded px-1 text-[11px] font-semibold" style={{ color: ACCENT.eng, background: `${ACCENT.eng}22` }}>
                {pr}
              </span>
              <span className="truncate text-cv-ink/80">{title}</span>
              <span className="ml-auto shrink-0 text-cv-ink">{delta}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
