/* "Getting started — 30/60/90" — a three-phase rollout plan as numbered cards.
   Matches the platform design language: cv-* tokens, pill chip, bordered cards.
   Server component. */

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
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="cv-label mb-4">Getting started</p>
            <h2 className="cv-h2 text-cv-ink">30, 60, 90.</h2>
          </div>
          <p className="cv-body-lg text-cv-ink/70">
            Customers can begin with cloud, AI, data, or SaaS according to their immediate priority.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PHASES.map((p, i) => (
            <div
              key={p.when}
              className="relative flex flex-col rounded-2xl border border-cv-line/60 bg-cv-surface2 p-7 dark:border-white/10 dark:bg-[#0D0D0D]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#1664C0] dark:text-[#7CB8F8]">
                  {p.when}
                </span>
                <span className="font-mono text-sm font-semibold text-cv-muted">0{i + 1}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-cv-ink">{p.title}</h3>
              <p className="mt-3 cv-body text-cv-ink/65">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GettingStarted;
