"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* "One system of record" — mirrors the FeatureShowcase recipe: a left tab list
   of AIX capabilities and a shared tilted, mask-faded runs feed on the right
   that cross-fades per capability. */

const INPROGRESS = "#4D9AEF";
const SUCCESS = "#34D399";
const DANGER = "#FF5470";

type Status = "progress" | "done" | "failed";
type Run = { label: string; owner: string; when: string; status: Status; initial: string; avatar: string };

const P = "#1664C0";
const D = "#D97706";
const S = "#6954D4";

type Capability = {
  key: string;
  name: string;
  accent: string;
  record: string;
  runs: Run[];
};

const CAPABILITIES: Capability[] = [
  {
    key: "visibility",
    name: "Visibility",
    accent: "#1664C0",
    record:
      "One view of all of it — models, tokens, teams, projects, agents, subscriptions, and APIs — instead of a spreadsheet per provider.",
    runs: [
      { label: "asset:gpt-4o.support-agent", owner: "Priya Shah", when: "Just now", status: "progress", initial: "P", avatar: P },
      { label: "asset:claude.rag-index", owner: "Dana Osei", when: "3 minutes ago", status: "done", initial: "D", avatar: D },
      { label: "subscription:openai.enterprise", owner: "Sam Iyer", when: "9 minutes ago", status: "done", initial: "S", avatar: S },
      { label: "api:vertex.embeddings", owner: "Priya Shah", when: "30 minutes ago", status: "done", initial: "P", avatar: P },
      { label: "agent:billing-copilot.v3", owner: "Dana Osei", when: "1 hour ago", status: "done", initial: "D", avatar: D },
      { label: "token-pool:azure-openai.prod", owner: "Sam Iyer", when: "3 hours ago", status: "done", initial: "S", avatar: S },
    ],
  },
  {
    key: "routing",
    name: "Routing",
    accent: "#6954D4",
    record:
      "Every request is scored live on cost, latency, quality, and compliance, and the best-fit model wins automatically.",
    runs: [
      { label: "route:chat.tier1 → gpt-4o-mini", owner: "Priya Shah", when: "Just now", status: "progress", initial: "P", avatar: P },
      { label: "route:summarize → claude-haiku", owner: "Dana Osei", when: "2 minutes ago", status: "done", initial: "D", avatar: D },
      { label: "route:code.review → gpt-4o", owner: "Sam Iyer", when: "7 minutes ago", status: "done", initial: "S", avatar: S },
      { label: "route:rag.answer → gemini-flash", owner: "Priya Shah", when: "25 minutes ago", status: "failed", initial: "P", avatar: P },
      { label: "route:classify → llama-70b", owner: "Dana Osei", when: "1 hour ago", status: "done", initial: "D", avatar: D },
      { label: "route:extract → gpt-4o-mini", owner: "Sam Iyer", when: "4 hours ago", status: "done", initial: "S", avatar: S },
    ],
  },
  {
    key: "optimization",
    name: "Optimization",
    accent: "#0E9E7A",
    record:
      "Find the oversized model, the wasteful prompt, and the subscription you're paying for twice — with the saving shown before you commit.",
    runs: [
      { label: "optimize:downsize gpt-4o → mini", owner: "Priya Shah", when: "Just now", status: "progress", initial: "P", avatar: P },
      { label: "optimize:prompt-trim.support", owner: "Dana Osei", when: "5 minutes ago", status: "done", initial: "D", avatar: D },
      { label: "duplicate:datadog + newrelic", owner: "Sam Iyer", when: "20 minutes ago", status: "done", initial: "S", avatar: S },
      { label: "waste:idle-endpoint.staging", owner: "Priya Shah", when: "1 hour ago", status: "failed", initial: "P", avatar: P },
      { label: "optimize:cache.rag-hits", owner: "Dana Osei", when: "2 hours ago", status: "done", initial: "D", avatar: D },
      { label: "optimize:batch.embeddings", owner: "Sam Iyer", when: "5 hours ago", status: "done", initial: "S", avatar: S },
    ],
  },
  {
    key: "unit",
    name: "Unit economics",
    accent: "#D97706",
    record:
      "AI gets its own unit economics instead of numbers borrowed from infrastructure. Every run lands against a team, a feature, and a use case.",
    runs: [
      { label: "unit:cost-per-request.search", owner: "Priya Shah", when: "Just now", status: "progress", initial: "P", avatar: P },
      { label: "unit:cost-per-feature.copilot", owner: "Dana Osei", when: "4 minutes ago", status: "done", initial: "D", avatar: D },
      { label: "unit:cost-per-tenant.acme", owner: "Sam Iyer", when: "12 minutes ago", status: "done", initial: "S", avatar: S },
      { label: "unit:margin.pro-plan", owner: "Priya Shah", when: "1 hour ago", status: "done", initial: "P", avatar: P },
      { label: "unit:cost-per-run.nightly-eval", owner: "Dana Osei", when: "3 hours ago", status: "done", initial: "D", avatar: D },
      { label: "unit:cost-per-seat.enterprise", owner: "Sam Iyer", when: "6 hours ago", status: "done", initial: "S", avatar: S },
    ],
  },
  {
    key: "resilience",
    name: "Resilience",
    accent: "#E05A2B",
    record:
      "When prices shift or a provider goes down, AIX reroutes automatically. No code change when providers or prices move.",
    runs: [
      { label: "failover:openai → azure-openai", owner: "Priya Shah", when: "Just now", status: "progress", initial: "P", avatar: P },
      { label: "reroute:latency-spike.us-east", owner: "Dana Osei", when: "3 minutes ago", status: "done", initial: "D", avatar: D },
      { label: "reprice:anthropic.new-rates", owner: "Sam Iyer", when: "18 minutes ago", status: "done", initial: "S", avatar: S },
      { label: "failover:gemini → gpt-4o", owner: "Priya Shah", when: "1 hour ago", status: "failed", initial: "P", avatar: P },
      { label: "reroute:quota.exhausted", owner: "Dana Osei", when: "2 hours ago", status: "done", initial: "D", avatar: D },
      { label: "reprice:volume-discount.q3", owner: "Sam Iyer", when: "5 hours ago", status: "done", initial: "S", avatar: S },
    ],
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

const PANEL = "absolute right-0 top-0 w-[600px]";
// Theme-aware mock surface: light card in light mode, dark app-mock in dark mode.
const CARD =
  "rounded-2xl bg-white ring-1 ring-black/10 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.22)] dark:bg-[#0c0c0f] dark:ring-white/10 dark:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]";

export function AixOrchestration() {
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
    timer.current = setInterval(() => setActive((i) => (i + 1) % CAPABILITIES.length), DWELL_MS);
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

  const current = CAPABILITIES[active];

  return (
    <section className="cv-section overflow-hidden bg-cv-surface2" data-testid="section-aix-orchestration">
      <div className="cv-container">
        <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#1664C0]/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#1664C0] dark:bg-[#7CB8F8]/15 dark:text-[#7CB8F8]">
          One system of record
        </span>
        <h2 className="cv-h2 max-w-2xl text-cv-ink">
          Enterprise AI is fragmented. AIX makes it one system of record.
        </h2>
        <p className="mt-4 max-w-2xl cv-body text-cv-ink/70">
          Not a gateway that runs your routing rules. Not observability that tells you what a request
          cost after it ran. AIX gives every asset — agent, app, RAG system, model — an identity, a
          contract, an operational record, and measurable economics. Discover · Govern · Value.
        </p>

        <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          {/* LEFT — capability tab list */}
          <ul className="space-y-1">
            {CAPABILITIES.map((c, i) => {
              const isActive = i === active;
              return (
                <li key={c.key}>
                  <button
                    type="button"
                    onClick={() => select(i)}
                    aria-pressed={isActive}
                    className="block w-full border-l-2 py-3.5 pl-5 text-left transition-colors duration-300"
                    style={{ borderColor: isActive ? c.accent : "hsl(var(--cv-line))" }}
                  >
                    <span
                      className="text-[15px] font-semibold transition-colors duration-300"
                      style={{ color: isActive ? "hsl(var(--cv-ink))" : "hsl(var(--cv-muted))" }}
                    >
                      {c.name}
                    </span>
                    {isActive && (
                      <span className="mt-1.5 block text-[13px] leading-relaxed text-cv-muted">
                        {c.record}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* RIGHT — shared tilted, mask-faded runs feed */}
          <div className="relative -mx-8 h-[420px] cursor-default select-none sm:h-[532px] lg:mx-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.key}
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
                    <RunFeed runs={current.runs} />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <p className="mt-8 text-[13px] text-cv-muted">
          Every route is scored live on cost, latency, quality, and compliance — no code change when
          prices or providers move.
        </p>
      </div>
    </section>
  );
}

export default AixOrchestration;

function RunFeed({ runs }: { runs: Run[] }) {
  return (
    <div className={`${PANEL} divide-y divide-cv-line/70 text-cv-muted dark:divide-white/[0.06] ${CARD}`}>
      {runs.map((r) => (
        <div key={r.label} className="p-1">
          <div className="group flex items-center justify-between rounded-md py-2 pl-4 pr-6 hover:bg-cv-ink/[0.04]">
            <div className="space-y-3">
              <p className="font-mono text-cv-ink">{r.label}</p>
              <div className="flex items-center gap-1.5 text-cv-muted">
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold text-white"
                  style={{ background: r.avatar }}
                >
                  {r.initial}
                </span>
                <span>{r.owner}</span>
                <span>·</span>
                <span>{r.when}</span>
              </div>
            </div>
            <div className="flex items-center gap-12">
              <RunStatus status={r.status} />
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5 text-cv-muted/50">
                <path d="M10 8L14 12L10 16" />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function RunStatus({ status }: { status: Status }) {
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
