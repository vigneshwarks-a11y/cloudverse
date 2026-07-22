"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CardLightEdge } from "@/components/home/cardChrome";

/* "One system of record" - a left accordion of Agentry capabilities (the active
   one expands with copy + Learn More + an auto-advance progress bar) beside a
   product dashboard mock (logs table + trace timeline + request/response). */

type Capability = { key: string; name: string; accent: string; record: string };

const CAPABILITIES: Capability[] = [
  {
    key: "visibility",
    name: "See every asset in one system of record",
    accent: "#1664C0",
    record:
      "One view of models, tokens, teams, projects, agents, subscriptions, and APIs, instead of a spreadsheet per provider.",
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
      "Every run lands against a team, a feature, and a use case: cost-per-request, per-feature, and per-tenant, not numbers borrowed from infra.",
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

export function AgentryOrchestration() {
  const [active, setActive] = useState(1);
  // Bumped on every manual tap so the progress bar remounts and restarts from
  // 0% even when the already-active item is tapped again.
  const [cycle, setCycle] = useState(0);
  const [reduced, setReduced] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  // Only run the auto-advance + progress fill once the section is on screen, so
  // the loader fills from 0 when the user sees it (not already complete).
  const rootRef = useRef<HTMLElement | null>(null);
  const inView = useInView(rootRef, { margin: "-20% 0px -20% 0px" });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const startTimer = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    if (reduced || !inView) return;
    timer.current = setInterval(() => setActive((i) => (i + 1) % CAPABILITIES.length), DWELL_MS);
  }, [reduced, inView]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [startTimer]);

  const select = (i: number) => {
    setActive(i);
    setCycle((c) => c + 1);
    startTimer();
  };

  return (
    <section ref={rootRef} className="cv-section overflow-hidden bg-cv-surface2" data-testid="section-agentry-orchestration">
      <div className="cv-container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#1664C0]/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#1664C0] dark:bg-[#7CB8F8]/15 dark:text-[#7CB8F8]">
            One system of record
          </span>
          <h2 className="cv-h2 text-cv-ink max-sm:text-[22px]">
            Enterprise AI is fragmented. Agentry makes it one system of record.
          </h2>
          <p className="mt-4 cv-body text-cv-ink/70">
            Not a gateway that runs your routing rules. Not observability that tells you what a request
            cost after it ran. Agentry gives every asset (agent, app, RAG system, model) an identity, a
            contract, an operational record, and measurable economics.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
          {/* LEFT - accordion (desktop) */}
          <ul className="hidden divide-y divide-cv-line lg:block">
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
                          href="/platform/agentry"
                          className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-cv-blue dark:text-cv-blue-light"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Learn More
                          <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                            <path d="M9 6l6 6-6 6" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </button>

                  {/* auto-advance progress bar under the active item: solid
                      fill that grows left-to-right */}
                  {isActive && !reduced && inView && (
                    <motion.span
                      key={`${active}-${cycle}`}
                      className="absolute bottom-0 left-0 h-[2px] rounded-full bg-[#1664C0]"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: DWELL_MS / 1000, ease: "linear" }}
                    />
                  )}
                  {isActive && reduced && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full" style={{ background: "#1664C0" }} />
                  )}
                </li>
              );
            })}
          </ul>

          {/* LEFT - accordion (mobile): title + divider, active item reveals
              copy, Learn More, and a track + gradient-fill progress bar whose
              glowing leading edge advances to 100% before auto-advancing. */}
          <ul className="lg:hidden">
            {CAPABILITIES.map((c, i) => {
              const isActive = i === active;
              return (
                <li key={c.key}>
                  <button
                    type="button"
                    onClick={() => select(i)}
                    aria-pressed={isActive}
                    className="block w-full pb-3 pt-5 text-left"
                  >
                    <span
                      className="text-lg font-semibold leading-snug transition-colors duration-300"
                      style={{ color: isActive ? "hsl(var(--cv-ink))" : "hsl(var(--cv-muted))" }}
                    >
                      {c.name}
                    </span>
                  </button>

                  {/* full-width divider below the title */}
                  <div className="h-px w-full bg-cv-line" />

                  {/* expanded body - only for the active item */}
                  <div
                    className="grid transition-[grid-template-rows,opacity] duration-500 ease-out"
                    style={{ gridTemplateRows: isActive ? "1fr" : "0fr", opacity: isActive ? 1 : 0 }}
                  >
                    <div className="overflow-hidden">
                      <p className="mt-3 text-sm leading-relaxed text-cv-muted">{c.record}</p>
                      <Link
                        href="/platform/agentry"
                        className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-cv-blue dark:text-cv-blue-light"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Learn More
                        <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <path d="M9 6l6 6-6 6" />
                        </svg>
                      </Link>

                      {/* auto-advance progress bar - matches the desktop loader:
                          a muted track with a solid fill that grows and a glow
                          riding its leading edge */}
                      {isActive && (
                        <div className="relative mt-5 h-[2px] w-full rounded-full bg-cv-line">
                          {reduced ? (
                            <div className="absolute inset-y-0 left-0 w-full rounded-full bg-[#1664C0]" />
                          ) : !inView ? (
                            <div className="absolute inset-y-0 left-0 w-0 rounded-full bg-[#1664C0]" />
                          ) : (
                            <motion.div
                              key={`${active}-${cycle}`}
                              className="absolute inset-y-0 left-0 rounded-full bg-[#1664C0]"
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              transition={{ duration: DWELL_MS / 1000, ease: "linear" }}
                            />
                          )}
                        </div>
                      )}

                      {/* the dashboard visual, inside the active item — full desktop
                          layout scaled down at a locked 16:9 ratio */}
                      {isActive && (
                        <div className="mb-6 mt-6">
                          <ScaledDashboard />
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* RIGHT - dashboard mock (desktop; on mobile it lives inside the
              active accordion item instead) */}
          <div className="hidden lg:block">
            <Dashboard />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AgentryOrchestration;

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

/* Renders the full desktop dashboard at a fixed design width and transform-
   scales it to fit the available column, keeping a locked 16:9 box. Used on
   mobile so the complete visual (sidebar + logs + detail panel) shows exactly
   as it does on desktop, only smaller — never a cropped/rearranged version. */
export function ScaledDashboard({ designW = 780 }: { designW?: number }) {
  const outer = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.44);
  useLayoutEffect(() => {
    const el = outer.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      if (w > 0) setScale(Math.min(1, w / designW));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [designW]);
  const designH = (designW * 9) / 16;
  return (
    <div ref={outer} className="w-full overflow-hidden" style={{ height: designH * scale }}>
      <div style={{ width: designW, height: designH, transform: `scale(${scale})`, transformOrigin: "top left" }}>
        <Dashboard full />
      </div>
    </div>
  );
}

export function Dashboard({ full = false }: { full?: boolean }) {
  return (
    <div className="aspect-video w-full rounded-2xl shadow-[0_16px_40px_-24px_rgba(16,24,40,0.18)] dark:shadow-[0_30px_70px_-25px_rgba(0,0,0,0.5)]">
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-cv-line bg-white text-[#1d1d1f] dark:border-white/10 dark:bg-[#0c0c0f] dark:text-[#e5e5e7]">
        {/* top-left light edge (shared Day-one chrome) */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-30">
          <CardLightEdge />
        </div>
        {/* window top bar */}
        <div className="flex items-center gap-3 border-b border-black/[0.07] px-3 py-2 text-xs dark:border-white/[0.08]">
          <span className="flex items-center gap-1.5 font-semibold">
            <span className="grid h-4 w-4 place-items-center rounded-full bg-[#1664C0] text-[8px] text-white">C</span>
            Cloudverse
          </span>
          <span className="font-semibold text-[#1d1d1f] dark:text-white">Logs</span>
          <div className="ml-2 flex items-center gap-1 text-[11px]">
            <span className="rounded-md bg-black/[0.05] px-2 py-0.5 dark:bg-white/[0.08]">Workspace</span>
            <span className="px-2 py-0.5 text-[#86868b] dark:text-[#8a8a90]">Organisation</span>
          </div>
        </div>

        <div className="flex min-h-0 flex-1">
          {/* sidebar */}
          <aside className={`${full ? "block" : "hidden md:block"} w-40 shrink-0 border-r border-black/[0.06] bg-[#fafafa] p-2.5 dark:border-white/[0.06] dark:bg-[#111114]`}>
            {NAV_GROUPS.map((g) => (
              <div key={g.title} className="mb-3">
                <div className="px-2 pb-1 text-[9px] font-semibold uppercase tracking-wider text-[#a1a1a6] dark:text-[#6f6f76]">{g.title}</div>
                {g.items.map((it) => {
                  const on = it === "Logs";
                  return (
                    <div
                      key={it}
                      className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] ${on ? "bg-[#1664C0]/10 font-medium text-[#1664C0] dark:bg-[#1664C0]/20 dark:text-[#7CB8F8]" : "text-[#57575c] dark:text-[#a1a1a6]"}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${on ? "bg-[#1664C0] dark:bg-[#7CB8F8]" : "bg-[#1664C0]/40"}`} />
                      {it}
                    </div>
                  );
                })}
              </div>
            ))}
          </aside>

          {/* logs table */}
          <div className="min-w-0 flex-1 border-r border-black/[0.06] dark:border-white/[0.06]">
            <div className="flex items-center gap-2 border-b border-black/[0.06] px-3 py-2 dark:border-white/[0.06]">
              <div className="flex-1 rounded-md border border-black/[0.08] bg-[#fafafa] px-2.5 py-1 text-[11px] text-[#a1a1a6] dark:border-white/10 dark:bg-white/[0.03] dark:text-[#6f6f76]">Search Filter</div>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-4 border-b border-black/[0.06] px-3 py-2 text-[9px] font-semibold uppercase tracking-wider text-[#a1a1a6] dark:border-white/[0.06] dark:text-[#6f6f76]">
              <span>Timestamp</span>
              <span>Trace ID</span>
            </div>
            {LOGS.map((l, i) => (
              <div
                key={l.trace}
                className={`grid grid-cols-[auto_1fr] items-center gap-x-4 border-b border-black/[0.04] px-3 py-2 text-[11px] dark:border-white/[0.04] ${i === LOGS.length - 1 ? "bg-[#1664C0]/[0.06] dark:bg-[#1664C0]/[0.14]" : ""}`}
              >
                <span className="whitespace-nowrap text-[#57575c] dark:text-[#c7c7cc]">{l.time} AM</span>
                <span className="truncate font-mono text-[#86868b] dark:text-[#8a8a90]">{l.trace}</span>
              </div>
            ))}
          </div>

          {/* detail panel */}
          <div className={`${full ? "flex" : "hidden lg:flex"} w-[280px] shrink-0 flex-col`}>
            <div className="flex items-center justify-between border-b border-black/[0.06] px-3 py-2 text-[11px] dark:border-white/[0.06]">
              <span className="text-[#86868b] dark:text-[#8a8a90]">Trace ID</span>
              <span className="truncate font-mono text-[10px] text-[#1d1d1f] dark:text-white">9480ca99-d906…f8a91</span>
            </div>
            {/* tabs */}
            <div className="flex gap-4 border-b border-black/[0.06] px-3 py-2 text-[11px] dark:border-white/[0.06]">
              <span className="text-[#86868b] dark:text-[#8a8a90]">Request Details</span>
              <span className="border-b-2 border-[#1664C0] pb-1.5 font-medium text-[#1664C0] dark:border-[#7CB8F8] dark:text-[#7CB8F8]">Guardrails &amp; Feedback</span>
            </div>

            {/* trace timeline */}
            <div className="border-b border-black/[0.06] px-3 py-2 dark:border-white/[0.06]">
              <div className="mb-1.5 text-[9px] font-semibold uppercase tracking-wider text-[#a1a1a6] dark:text-[#6f6f76]">Timeline</div>
              {TIMELINE.map((t, i) => (
                <div key={i} className="flex items-center justify-between py-[3px] text-[10px]" style={{ paddingLeft: t.indent * 10 }}>
                  <span className="flex items-center gap-1.5 truncate text-[#57575c] dark:text-[#a1a1a6]">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#1664C0] dark:bg-[#7CB8F8]" />
                    {t.label}
                  </span>
                  <span className="shrink-0 font-mono text-[#a1a1a6] dark:text-[#6f6f76]">{t.dur}</span>
                </div>
              ))}
            </div>

            {/* meta */}
            <div className="space-y-1 border-b border-black/[0.06] px-3 py-2 dark:border-white/[0.06]">
              {META.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-2 text-[10px]">
                  <span className="text-[#a1a1a6] dark:text-[#6f6f76]">{k}</span>
                  <span className="truncate font-mono text-[#57575c] dark:text-[#c7c7cc]">{v}</span>
                </div>
              ))}
            </div>

            {/* response + feedback */}
            <div className="px-3 py-2">
              <div className="mb-1 text-[10px] font-medium text-[#57575c] dark:text-[#a1a1a6]">Response (0 tokens)</div>
              <pre className="overflow-hidden rounded-md border border-black/[0.06] bg-[#fbfbfd] p-2 text-[9px] leading-relaxed text-[#1d1d1f] dark:border-white/10 dark:bg-white/[0.03] dark:text-[#c7c7cc]">
{`{
  "status": 200,
  "headers": { "Content-Type": "application/json" },
  "body": {},
  "responseTime": 0.1129,
  "lastUsedOptionJsonPath": ""
}`}
              </pre>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[10px] font-medium text-[#57575c] dark:text-[#a1a1a6]">Feedback</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} viewBox="0 0 24 24" className="h-3 w-3 fill-[rgba(0,0,0,0.15)] dark:fill-[rgba(255,255,255,0.22)]" aria-hidden>
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
