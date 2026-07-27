"use client";
import { SectionHeading } from "@/components/SectionHeading";
import Link from "next/link";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
// All GSAP + plugins come from the single registration point.
import { gsap, ScrollTrigger, getSmoother } from "@/lib/gsap";
import { CardLightEdge } from "@/components/home/cardChrome";

/* "One system of record" — a pinned scroll-scrub stack. As the section holds
   in place, scroll progress drives which capability is "active": its bullet
   lights up while the others dim, and the matching product visual crossfades
   in on the right. All of it lives in one scrubbed GSAP timeline so it tracks
   the scrollbar smoothly (no React state re-renders mid-scroll).

   Stack runs on lg+ with motion allowed. Below that (or reduced-motion) the
   GSAP never mounts and everything renders as a plain, fully-legible stack. */

/* Debug toggle for the pinned ScrollTrigger. Flip to true to see start/end
   and pin-spacing markers while tuning; leave false in production. */
const SHOW_MARKERS = false;

/* Pixels of scroll spent on each capability while pinned. Total pin distance
   is CAPABILITIES.length * STEP_DISTANCE. Tune here. */
const STEP_DISTANCE = 400;

type Capability = { key: string; name: string; accent: string; record: string };

const CAPABILITIES: Capability[] = [
  {
    key: "visibility",
    name: "See every asset in one system of record",
    accent: "#1664C0",
    record: "One view of every model, agent, and API, not a spreadsheet per provider.",
  },
  {
    key: "lifecycle",
    name: "Observe the entire lifecycle of an agent run",
    accent: "#6954D4",
    record: "Trace every agent action and tool call to debug complex workflows.",
  },
  {
    key: "routing",
    name: "Route each request to the best-fit model",
    accent: "#0E9E7A",
    record: "Every request scored live on cost, latency, and quality. The best-fit model wins.",
  },
  {
    key: "unit",
    name: "Give AI its own unit economics",
    accent: "#D97706",
    record: "Every run tied to a team, feature, and use case, with cost per request.",
  },
  {
    key: "resilience",
    name: "Identify performance gaps with filtered views",
    accent: "#E05A2B",
    record: "Slice runs by model, team, or route to surface waste and outages.",
  },
];

export function AgentryOrchestration() {
  const rootRef = useRef<HTMLElement | null>(null);
  // Below lg (where the GSAP pin never mounts, see matchMedia below) each
  // bullet is a collapsed accordion row instead of an always-visible image
  // stack — tapping it reveals that capability's screenshot inline, so
  // mobile/tablet isn't a long scroll of five full screenshots up front.
  const [openMobile, setOpenMobile] = useState<number | null>(null);

  // useLayoutEffect (not useEffect) so the cleanup runs synchronously in
  // React's mutation phase — before the DOM node is detached on navigation.
  // pin: true wraps this section in a GSAP pin-spacer; if the revert ran in a
  // passive useEffect cleanup (after React already detached the node), React
  // would call removeChild on a section still nested in the spacer and throw
  // "removeChild … not a child of this node". Layout-effect cleanup unwraps
  // the spacer first, so the node is back where React expects it.
  useLayoutEffect(() => {
    // gsap.context scopes every selector/trigger created inside it to the
    // section, and ctx.revert() on cleanup kills the pin, its pin-spacer, and
    // all tweens — so navigating away or re-rendering never leaves a dangling
    // ScrollTrigger behind (the classic React/Next double-mount hazard).
    const ctx = gsap.context(() => {
      const n = CAPABILITIES.length;

      // matchMedia so the pin only exists on desktop with motion allowed; it
      // auto-tears-down when the query stops matching (e.g. resize to mobile),
      // and is still captured by the surrounding context for ctx.revert().
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const bullets = gsap.utils.toArray<HTMLElement>("[data-bullet]");
        const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");
        const fill = rootRef.current?.querySelector<HTMLElement>("[data-progress-fill]");

        // Start state: first capability active, first panel shown.
        gsap.set(panels, { autoAlpha: 0, scale: 0.98 });
        gsap.set(panels[0], { autoAlpha: 1, scale: 1 });
        if (fill) gsap.set(fill, { scaleY: 0, transformOrigin: "top" });
        paintBullets(bullets, 0);

        let current = 0;
        const paint = (progress: number) => {
          const idx = Math.round(progress * (n - 1));
          if (idx !== current) {
            current = idx;
            paintBullets(bullets, idx);
          }
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "+=" + n * STEP_DISTANCE,
            pin: true,
            scrub: 1,
            markers: SHOW_MARKERS,
            onUpdate: (self) => paint(self.progress),
          },
        });

        // Vertical progress fill grows across the whole pinned duration.
        if (fill) tl.to(fill, { scaleY: 1, ease: "none", duration: n - 1 }, 0);

        // Crossfade each panel into the next as the scrollbar scrubs through.
        // The active bullet flips at scroll-time i-0.5 (Math.round in paint), so
        // center each 0.5-long crossfade on that flip point (start at i-0.75) —
        // otherwise the panel reaches the next image half a step before the
        // bullet highlights it, and the image looks out of sync with the text.
        for (let i = 1; i < n; i++) {
          tl.to(panels[i - 1], { autoAlpha: 0, scale: 0.98, duration: 0.5 }, i - 0.75)
            .to(panels[i], { autoAlpha: 1, scale: 1, duration: 0.5 }, "<");
        }
      });
    }, rootRef);

    // Logos, images and the self-hosted font settle after mount and change
    // section heights, which shifts every trigger's start/end. Refresh once
    // the window fully loads so the pin math is measured against final layout.
    // (ScrollSmoother already refreshes on document.fonts.ready.)
    const onLoad = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") ScrollTrigger.refresh();
    else window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
  }, []);

  // Clicking a bullet jumps the pinned timeline to that step. Works through
  // ScrollSmoother when present, native scroll otherwise.
  const goTo = (i: number) => {
    const st = ScrollTrigger.getAll().find((t) => t.pin && t.trigger === rootRef.current);
    if (!st) return; // not pinned (mobile / reduced-motion): let the anchor be a no-op
    const y = st.start + (i / (CAPABILITIES.length - 1)) * (st.end - st.start);
    const smoother = getSmoother();
    if (smoother) smoother.scrollTo(y, true);
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section
      ref={rootRef}
      className="cv-section bg-cv-surface2 [@media(max-height:900px)]:py-14 [@media(max-height:800px)]:py-10"
      data-testid="section-agentry-orchestration"
    >
      {/* clip at the layout box so the pinned visual can't bleed past the
          container's right edge — it stays aligned with the intro paragraph. */}
      <div className="cv-container overflow-x-clip">
        <SectionHeading eyebrow="One system of record" title="Enterprise AI is fragmented. Agentry makes it one system of record.">
          Not a gateway that runs your routing rules. Not observability that tells you what a request
          cost after it ran. Agentry gives every asset (agent, app, RAG system, model) an identity, a
          contract, an operational record, and measurable economics.
        </SectionHeading>

        <div className="mt-12 grid grid-cols-1 items-center gap-12 [@media(max-height:900px)]:mt-8 [@media(max-height:800px)]:mt-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-stretch lg:gap-14">
          {/* LEFT — capability list. Every record is always rendered (dimmed
              when inactive) so the pinned section never changes height. On lg
              the column stretches to the row height (set by the image) and the
              list distributes across it, so both sides end level without
              cropping the screenshot. */}
          <div className="relative lg:flex lg:h-full lg:flex-col">
            {/* vertical progress rail (desktop, animated) */}
            <span aria-hidden className="pointer-events-none absolute left-0 top-1 hidden h-[calc(100%-0.5rem)] w-px bg-cv-line lg:block">
              <span data-progress-fill className="absolute inset-0 block bg-[#1664C0]" />
            </span>

            <ul className="lg:flex lg:flex-1 lg:flex-col lg:justify-between lg:pl-6">
              {CAPABILITIES.map((c, i) => {
                const isOpen = openMobile === i;
                return (
                  <li key={c.key} data-bullet className="py-3 transition-opacity duration-300 [@media(max-height:900px)]:py-2.5 [@media(max-height:800px)]:py-1.5 lg:opacity-100">
                    <button
                      type="button"
                      onClick={() => {
                        goTo(i);
                        setOpenMobile((cur) => (cur === i ? null : i));
                      }}
                      aria-expanded={isOpen}
                      className="flex w-full items-start justify-between gap-3 text-left lg:cursor-pointer"
                    >
                      <span>
                        <span
                          data-bullet-name
                          className="text-lg font-semibold leading-snug text-cv-ink transition-colors duration-300"
                        >
                          {c.name}
                        </span>
                        <p className="mt-2 max-w-md text-sm leading-relaxed text-cv-muted">{c.record}</p>
                      </span>
                      <svg
                        viewBox="0 0 24 24"
                        className={`mt-1 h-4 w-4 shrink-0 text-cv-muted transition-transform duration-300 motion-reduce:transition-none lg:hidden ${isOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>

                    {/* Mobile/tablet only (<lg): tapping the bullet reveals its
                        screenshot inline instead of every capability's image
                        being stacked up front — desktop keeps the crossfading
                        panel stack on the right instead (see below). */}
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none lg:hidden ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                    >
                      <div className="overflow-hidden">
                        <div className="pt-4">
                          <CapabilityPanel cap={c} />
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <Link
              href="/platform/agentry"
              className="group mt-3 inline-flex items-center gap-1 text-sm font-medium text-cv-blue dark:text-cv-blue-light lg:ml-6"
            >
              Learn more about Agentry
              <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M9 6l6 6-6 6" />
              </svg>
            </Link>
          </div>

          {/* RIGHT — desktop-only (lg+) visual stack. Panels overlay (absolute)
              and crossfade, driven by the pinned GSAP timeline above. Below lg
              the pin never mounts, so this column is hidden entirely — each
              capability's screenshot instead renders inline inside its own
              bullet (see the accordion in the LEFT column). The column matches
              the screenshots' native 2565/1562 ratio (not 8/5), so the image
              fills its frame edge-to-edge with no letterbox band top/bottom,
              and is vertically centered against the left column (items-center
              on the grid). */}
          <div className="relative hidden lg:block lg:aspect-[1920/1024]">
            {CAPABILITIES.map((c) => (
              <div key={c.key} data-panel className="lg:absolute lg:inset-0">
                <CapabilityPanel cap={c} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AgentryOrchestration;

/* Highlight the active capability, dim the rest — driven by scroll, applied
   straight to the DOM (no React state) so it stays smooth under scrub. */
function paintBullets(bullets: HTMLElement[], active: number) {
  bullets.forEach((b, idx) => {
    const on = idx === active;
    b.style.opacity = on ? "1" : "0.45";
    const name = b.querySelector<HTMLElement>("[data-bullet-name]");
    if (name) name.style.color = on ? "hsl(var(--cv-ink))" : "hsl(var(--cv-muted))";
  });
}

/* ------------------------------------------------------------------ *
 * Capability visuals — five compact product panels sharing one window
 * chrome, each accented in its capability hue, crossfaded on scroll.
 * ------------------------------------------------------------------ */

function CapabilityPanel({ cap }: { cap: Capability }) {
  return (
    // Low-opacity white "shell" mat around the screenshot. The shell (outer
    // container) carries the shared top-left light edge (CardLightEdge) as its
    // border treatment, matching the other product wells on the home page. The
    // frame matches the screenshots' native 2565/1562 ratio and uses
    // object-cover, so the image fills edge-to-edge with no letterbox band (at
    // a matched ratio cover crops effectively nothing).
    <div
      className="relative aspect-[1920/1024] w-full overflow-hidden rounded-2xl bg-white/[0.06] p-2"
      style={{ boxShadow: "0 24px 60px -30px rgba(0,0,0,0.7)" }}
    >
      {/* Light-edge border overlay on the shell container */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 rounded-2xl">
        <CardLightEdge />
      </div>
      <div
        className="relative h-full w-full overflow-hidden rounded-xl border"
        style={{ borderColor: "rgba(255,255,255,0.10)" }}
      >
        <Image
          src={encodeURI(PANEL_IMAGE[cap.key])}
          alt={PANEL_TITLE[cap.key]}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="rounded-xl object-cover"
        />
        {/* Black fade on the right edge so the screenshot dissolves into the
            page instead of ending on a hard vertical line. Wide, and solid
            black across the last stretch, so the clipped right edge is fully
            masked. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-2/5 rounded-r-xl"
          style={{ background: "linear-gradient(to left, #000 0%, #000 30%, rgba(0,0,0,0) 100%)" }}
        />
      </div>
    </div>
  );
}

const PANEL_TITLE: Record<string, string> = {
  visibility: "Fleet management — every agent and app in one inventory",
  lifecycle: "Runs and traces — every governed execution",
  routing: "Model routing — what routed where, why, and on what evidence",
  unit: "AI spend — where spend goes, by team",
  resilience: "Quality — dimension scores and filtered evaluations",
};

// Real product screenshots, dropped in from public/ui-assets/one system
// record section — one per capability, replacing the earlier hand-built
// CSS mockups.
const PANEL_IMAGE: Record<string, string> = {
  visibility: "/ui-assets/one system record section/Fleet Management.webp",
  lifecycle: "/ui-assets/one system record section/Runs and Traces.webp",
  routing: "/ui-assets/one system record section/Model Routing.webp",
  unit: "/ui-assets/one system record section/AI Spend.webp",
  resilience: "/ui-assets/one system record section/Quality.webp",
};

/* ------------------------------------------------------------------ *
 * Product dashboard mock (Logs · Trace · Request details)
 *
 * Retained and exported because other surfaces reuse it
 * (components/product/AgentrySteps, app/solutions/finops-teams). The
 * home "one system of record" section no longer renders it directly —
 * it uses the crossfading CapabilityPanel stack above.
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
        <div aria-hidden className="pointer-events-none absolute inset-0 z-30 rounded-2xl">
          <CardLightEdge />
        </div>
        {/* window top bar */}
        <div className="flex items-center gap-3 border-b border-black/[0.07] px-3 py-2 text-xs dark:border-white/[0.08]">
          <span className="flex items-center gap-1.5 font-semibold">
            <Image src="/cv-logo.png" alt="" width={16} height={16} className="h-4 w-4 object-contain" />
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
