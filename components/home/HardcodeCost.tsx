/* "AI compute is becoming too expensive to hardcode" — a lead-in section that
   sets up the Before/After AIX comparison that follows. Two-column: heading left,
   supporting copy right, matching the home lead-in rhythm. cv-* tokens,
   theme-aware. Server component. */

export function HardcodeCost() {
  return (
    <section className="pt-16 sm:pt-20 lg:pt-28 pb-0 bg-cv-surface2 dark:bg-black" data-testid="section-hardcode-cost">
      <div className="cv-container">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
          <h2 className="cv-h2 text-balance text-cv-ink">
            AI compute is becoming too expensive to hardcode.
          </h2>
          <p className="cv-body text-cv-ink/70 lg:self-end">
            Most teams pick a model once, wire it into the app, and move on. Six months later a cheaper
            model handles 70% of those requests just as well, and nobody notices. A hardcoded choice
            doesn&apos;t update when prices drop or reroute when a provider slows down. That gap is where the
            budget quietly goes.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HardcodeCost;
