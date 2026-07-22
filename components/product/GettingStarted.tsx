/* "Getting started — 30/60/90" — a three-phase rollout as a divided grid.
   Adapts the Aceternity feature-grid interaction to the CloudVerse system:
   hairline-divided cells (no separate cards), a hover gradient wash, a growing
   signal-blue accent beside the title, and the title sliding right on hover.
   The rollout IS an ordered sequence, so each cell keeps its 01–03 marker.
   Pure CSS hover (server component); reduced-motion falls back to a crossfade. */

type Phase = { when: string; title: string; body: string };

const PHASES: Phase[] = [
  {
    when: "First 30 days",
    title: "Connect and establish the baseline",
    body: "Connect billing, usage, and organizational sources. Configure ownership, tagging, and allocation rules. Baseline cost and usage; identify initial anomalies and waste signals.",
  },
  {
    when: "By 60 days",
    title: "Optimize and operationalize",
    body: "Review and prioritize savings opportunities. Enable anomaly monitoring and governance workflows. Set alerts, dashboards, and reporting views.",
  },
  {
    when: "By 90 days",
    title: "Expand and automate",
    body: "Integrate with enterprise systems (e.g. ITSM). Build unit economics and business-aligned reporting. Activate additional domains as needed. Enable governed automation for approved use cases.",
  },
];

export function GettingStarted() {
  return (
    <section className="cv-section bg-cv-surface" data-testid="section-getting-started">
      <div className="cv-container">
        <div className="max-w-5xl">
          <p className="cv-label mb-4">Getting started</p>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-16">
            <h2 className="cv-h2 text-cv-ink lg:flex-1">30, 60, 90.</h2>
            <p className="cv-body text-cv-ink/70 lg:w-full lg:max-w-xl lg:shrink-0 lg:pt-1">
              Customers can begin with cloud, AI, data, or SaaS according to their immediate priority.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 border-y border-cv-line/60 dark:border-white/10 md:grid-cols-3">
          {PHASES.map((p, i) => (
            <div
              key={p.when}
              className={[
                "group/phase relative flex flex-col py-9",
                // hairline dividers: bottom between stacked cells (mobile),
                // right between columns (desktop)
                i < PHASES.length - 1 && "border-b border-cv-line/60 dark:border-white/10 md:border-b-0",
                i < PHASES.length - 1 && "md:border-r md:border-cv-line/60 md:dark:border-white/10",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {/* hover wash — rises from the base of the cell */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cv-ink/[0.045] to-transparent opacity-0 transition-opacity duration-300 group-hover/phase:opacity-100 motion-reduce:transition-none dark:from-white/[0.05]"
              />

              {/* eyebrow + ordinal */}
              <div className="relative z-10 flex items-center justify-between px-8">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cv-blue dark:text-cv-blue-light">
                  {p.when}
                </span>
                <span className="font-mono text-sm font-semibold tabular-nums text-cv-muted">0{i + 1}</span>
              </div>

              {/* title with the growing accent that turns signal-blue on hover */}
              <div className="relative z-10 mt-5 px-8">
                <span
                  aria-hidden
                  className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-cv-line transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/phase:h-8 group-hover/phase:bg-cv-blue motion-reduce:transition-none dark:bg-white/15 dark:group-hover/phase:bg-cv-blue-light"
                />
                <h3 className="inline-block text-lg font-semibold text-cv-ink transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/phase:translate-x-1.5 motion-reduce:transition-none">
                  {p.title}
                </h3>
              </div>

              <p className="relative z-10 mt-3 px-8 cv-body text-cv-ink/70">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GettingStarted;
