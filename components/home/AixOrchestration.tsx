"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* "One system of record" — a left accordion of AIX capabilities (the active
   one expands with copy + Learn More + an auto-advance progress bar) beside a
   product dashboard mock (logs table + trace timeline + request/response). */

type Capability = { key: string; name: string; accent: string; record: string };

const CAPABILITIES: Capability[] = [
  {
    key: "visibility",
    name: "See every asset in one system of record",
    accent: "#1664C0",
    record:
      "One view of models, tokens, teams, projects, agents, subscriptions, and APIs — instead of a spreadsheet per provider.",
  },
  {
    key: "lifecycle",
    name: "Observe the entire lifecycle of an agent run",
    accent: "#6954D4",
    record:
      "Trace every agent action and tool call to debug and optimize complex autonomous workflows.",
  },
  {
    key: "routing",
    name: "Route each request to the best-fit model",
    accent: "#0E9E7A",
    record:
      "Every request is scored live on cost, latency, quality, and compliance, and the best-fit model wins automatically.",
  },
  {
    key: "unit",
    name: "Give AI its own unit economics",
    accent: "#D97706",
    record:
      "Every run lands against a team, a feature, and a use case — cost-per-request, per-feature, and per-tenant, not numbers borrowed from infra.",
  },
  {
    key: "resilience",
    name: "Identify performance gaps with filtered views",
    accent: "#E05A2B",
    record:
      "Slice runs by model, team, or route to surface the oversized model, the wasteful prompt, and the provider that just went down.",
  },
];

const DWELL_MS = 6000;

export function AixOrchestration() {
  const [active, setActive] = useState(1);
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
          contract, an operational record, and measurable economics.
        </p>

        <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
          {/* LEFT — accordion */}
          <ul className="divide-y divide-cv-line">
            {CAPABILITIES.map((c, i) => {
              const isActive = i === active;
              return (
                <li key={c.key} className="relative">
                  <button
                    type="button"
                    onClick={() => select(i)}
                    aria-pressed={isActive}
                    className="block w-full py-5 text-left"
                  >
                    <span
                      className="text-lg font-semibold leading-snug transition-colors duration-300"
                      style={{ color: isActive ? "hsl(var(--cv-ink))" : "hsl(var(--cv-muted))" }}
                    >
                      {c.name}
                    </span>

                    <div
                      className="grid transition-[grid-template-rows,opacity] duration-500 ease-out"
                      style={{
                        gridTemplateRows: isActive ? "1fr" : "0fr",
                        opacity: isActive ? 1 : 0,
                      }}
                    >
                      <div className="overflow-hidden">
                        <p className="mt-3 max-w-md text-sm leading-relaxed text-cv-muted">{c.record}</p>
                        <Link
                          href="/platform/aix"
                          className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-cv-blue dark:text-cv-blue-light"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Learn More
                          <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                            <path d="M9 6l6 6-6 6" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </button>

                  {/* auto-advance progress bar under the active item */}
                  {isActive && !reduced && (
                    <motion.span
                      key={active}
                      className="absolute bottom-0 left-0 h-[2px] rounded-full"
                      style={{ background: `linear-gradient(90deg, ${c.accent}, transparent)` }}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: DWELL_MS / 1000, ease: "linear" }}
                    />
                  )}
                  {isActive && reduced && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full" style={{ background: c.accent }} />
                  )}
                </li>
              );
            })}
          </ul>

          {/* RIGHT — dashboard mock */}
          <Dashboard />
        </div>
      </div>
    </section>
  );
}

export default AixOrchestration;

/* ------------------------------------------------------------------ *
 * Product dashboard mock (Logs · Trace · Request details)
 * ------------------------------------------------------------------ */

const NAV_GROUPS: { title: string; items: string[] }[] = [
  { title: "Observability", items: ["Analytics", "Logs", "Exports"] },
  { title: "AI Gateway", items: ["Configs", "Virtual Keys", "Guardrails"] },
  { title: "Prompt Engineering", items: ["Playground", "Prompts", "Prompt Partials"] },
];

const LOGS: { time: string; trace: string }[] = [
  { time: "Apr 30, 03:36:58", trace: "9c89c525-fdf8-4fce-bb94-fd2814" },
  { time: "Apr 30, 03:36:56", trace: "634ff4bf-04b9-4c60-b69f-9363c6" },
  { time: "Apr 30, 03:36:47", trace: "5923890b-f23a-4819-8e29-38243b" },
  { time: "Apr 30, 03:36:37", trace: "0824d426-126e-44c6-b56a-53554" },
  { time: "Apr 30, 03:36:37", trace: "ea263144-5b42-4baa-8372-654731" },
  { time: "Apr 30, 03:36:32", trace: "0a10de63-b1ec-44d5-9a8a-9e6625" },
  { time: "Apr 30, 03:35:37", trace: "f33833de-cc9d-4ae6-8c96-84f0e0" },
  { time: "Apr 30, 03:34:59", trace: "4b05bc4d-40e2-4ba4-a50c-9bd2d1" },
  { time: "Apr 30, 03:33:47", trace: "1e3e916b-720e-4aa0-99ca-ec0927" },
];

const TIMELINE: { label: string; dur: string; indent: number }[] = [
  { label: "Crew.kickoff", dur: "1.51 s", indent: 0 },
  { label: "Crew Created", dur: "0.31 ms", indent: 1 },
  { label: "Task.execute_sync", dur: "1.1 s", indent: 1 },
  { label: "Task Created", dur: "0.04 ms", indent: 2 },
  { label: "Agent.execute_…", dur: "1.1 s", indent: 2 },
  { label: "Completions.c…", dur: "1.08 s", indent: 3 },
  { label: "Task.execut…", dur: "399.97 ms", indent: 1 },
  { label: "Task Created", dur: "0.11 ms", indent: 2 },
  { label: "Agent.ex…", dur: "396.66 ms", indent: 2 },
];

const META: [string, string][] = [
  ["traceId", "9480ca99-d906-5614-ad3b"],
  ["spanId", "13247436097119146000"],
  ["spanName", "Task Created"],
  ["startTime", "1746009025279647000"],
  ["endTime", "1746009025279760000"],
  ["_source", "opentelemetry"],
];

function Dashboard() {
  return (
    <div className="rounded-2xl p-[2px] shadow-[0_30px_70px_-25px_rgba(0,0,0,0.5)]" style={{ background: "linear-gradient(135deg,#f9a8d4,#c4b5fd 45%,#93c5fd)" }}>
      <div className="overflow-hidden rounded-[15px] bg-white text-[#1d1d1f]">
        {/* window top bar */}
        <div className="flex items-center gap-3 border-b border-black/[0.07] px-3 py-2 text-xs">
          <span className="flex items-center gap-1.5 font-semibold">
            <span className="grid h-4 w-4 place-items-center rounded-full bg-[#1664C0] text-[8px] text-white">C</span>
            cloudverse
          </span>
          <span className="font-semibold text-[#1d1d1f]">Logs</span>
          <div className="ml-2 flex items-center gap-1 text-[11px]">
            <span className="rounded-md bg-black/[0.05] px-2 py-0.5">Workspace</span>
            <span className="px-2 py-0.5 text-[#86868b]">Organisation</span>
          </div>
        </div>

        <div className="flex min-h-[420px]">
          {/* sidebar */}
          <aside className="hidden w-40 shrink-0 border-r border-black/[0.06] bg-[#fafafa] p-2.5 md:block">
            {NAV_GROUPS.map((g) => (
              <div key={g.title} className="mb-3">
                <div className="px-2 pb-1 text-[9px] font-semibold uppercase tracking-wider text-[#a1a1a6]">{g.title}</div>
                {g.items.map((it) => {
                  const on = it === "Logs";
                  return (
                    <div
                      key={it}
                      className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] ${on ? "bg-[#1664C0]/10 font-medium text-[#1664C0]" : "text-[#57575c]"}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${on ? "bg-[#1664C0]" : "bg-[#c7c7cc]"}`} />
                      {it}
                    </div>
                  );
                })}
              </div>
            ))}
          </aside>

          {/* logs table */}
          <div className="min-w-0 flex-1 border-r border-black/[0.06]">
            <div className="flex items-center gap-2 border-b border-black/[0.06] px-3 py-2">
              <div className="flex-1 rounded-md border border-black/[0.08] bg-[#fafafa] px-2.5 py-1 text-[11px] text-[#a1a1a6]">Search Filter</div>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-4 border-b border-black/[0.06] px-3 py-2 text-[9px] font-semibold uppercase tracking-wider text-[#a1a1a6]">
              <span>Timestamp</span>
              <span>Trace ID</span>
            </div>
            {LOGS.map((l, i) => (
              <div
                key={l.trace}
                className={`grid grid-cols-[auto_1fr] items-center gap-x-4 border-b border-black/[0.04] px-3 py-2 text-[11px] ${i === LOGS.length - 1 ? "bg-[#1664C0]/[0.06]" : ""}`}
              >
                <span className="whitespace-nowrap text-[#57575c]">{l.time} AM</span>
                <span className="truncate font-mono text-[#86868b]">{l.trace}</span>
              </div>
            ))}
          </div>

          {/* detail panel */}
          <div className="hidden w-[280px] shrink-0 flex-col lg:flex">
            <div className="flex items-center justify-between border-b border-black/[0.06] px-3 py-2 text-[11px]">
              <span className="text-[#86868b]">Trace ID</span>
              <span className="truncate font-mono text-[10px] text-[#1d1d1f]">9480ca99-d906…f8a91</span>
            </div>
            {/* tabs */}
            <div className="flex gap-4 border-b border-black/[0.06] px-3 py-2 text-[11px]">
              <span className="text-[#86868b]">Request Details</span>
              <span className="border-b-2 border-[#1664C0] pb-1.5 font-medium text-[#1664C0]">Guardrails &amp; Feedback</span>
            </div>

            {/* trace timeline */}
            <div className="border-b border-black/[0.06] px-3 py-2">
              <div className="mb-1.5 text-[9px] font-semibold uppercase tracking-wider text-[#a1a1a6]">Timeline</div>
              {TIMELINE.map((t, i) => (
                <div key={i} className="flex items-center justify-between py-[3px] text-[10px]" style={{ paddingLeft: t.indent * 10 }}>
                  <span className="flex items-center gap-1.5 truncate text-[#57575c]">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#34D399]" />
                    {t.label}
                  </span>
                  <span className="shrink-0 font-mono text-[#a1a1a6]">{t.dur}</span>
                </div>
              ))}
            </div>

            {/* meta */}
            <div className="space-y-1 border-b border-black/[0.06] px-3 py-2">
              {META.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-2 text-[10px]">
                  <span className="text-[#a1a1a6]">{k}</span>
                  <span className="truncate font-mono text-[#57575c]">{v}</span>
                </div>
              ))}
            </div>

            {/* response + feedback */}
            <div className="px-3 py-2">
              <div className="mb-1 text-[10px] font-medium text-[#57575c]">Response (0 tokens)</div>
              <pre className="overflow-hidden rounded-md border border-black/[0.06] bg-[#fbfbfd] p-2 text-[9px] leading-relaxed text-[#1d1d1f]">
{`{
  "status": 200,
  "headers": { "Content-Type": "application/json" },
  "body": {},
  "responseTime": 0.1129,
  "lastUsedOptionJsonPath": ""
}`}
              </pre>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[10px] font-medium text-[#57575c]">Feedback</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} viewBox="0 0 24 24" className="h-3 w-3" style={{ fill: "rgba(0,0,0,0.15)" }} aria-hidden>
                      <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5 20.4l1.4-6.8L1.3 9l6.9-.7L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
