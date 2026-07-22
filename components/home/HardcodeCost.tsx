/* "AI compute is becoming too expensive to hardcode" — a lead-in section that
   sets up the Before/After Agentry comparison that follows. Two-column: heading left,
   supporting copy right, matching the home lead-in rhythm. cv-* tokens,
   theme-aware. Server component. */

export function HardcodeCost() {
  return (
    <section className="pt-16 sm:pt-20 lg:pt-28 pb-0 bg-cv-surface2 dark:bg-black" data-testid="section-hardcode-cost">
      <div className="cv-container">
        <div className="flex max-w-3xl flex-col items-start text-left">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#1664C0]/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#1664C0] dark:bg-[#7CB8F8]/15 dark:text-[#7CB8F8]">
            The problem
          </span>
          <h2 className="cv-h2 text-balance text-cv-ink">
            AI agents are multiplying faster than they can be governed.
          </h2>
          <p className="cv-body mt-4 text-cv-ink/70">
            40% of enterprise applications will embed task-specific AI agents in 2026, up from under 5%
            in 2025 (Gartner). Every ungoverned agent is unbudgeted spend, an unauditable decision path,
            and an unmonitored data flow, invisible to you until the invoice lands or the incident
            does.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HardcodeCost;
