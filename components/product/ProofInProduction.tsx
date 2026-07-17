/* "Proof in production" — a real cloud deployment with headline outcomes shown
   as a stat strip. Matches the platform design language: cv-* tokens, pill chip,
   bordered stat tiles. Server component. */

const STATS: [string, string][] = [
  ["129", "applications mapped with full cost economics"],
  ["Rp2.90B", "direct cloud cost under active management"],
  ["Rp956.6M", "identified savings opportunity surfaced"],
  ["50", "anomalies detected, 46 flagged high severity"],
];

export function ProofInProduction() {
  return (
    <section className="cv-section bg-cv-surface2 dark:bg-black" data-testid="section-proof-in-production">
      <div className="cv-container">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="cv-label mb-4">Proof in production</p>
            <h2 className="cv-h2 text-cv-ink">Real deployment. Real governance. Real savings, starting with cloud.</h2>
          </div>
          <p className="cv-body-lg text-cv-ink/70">
            A leading Southeast Asian telecommunications group: full cloud spend deployment across a
            100+ application estate.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map(([v, l]) => (
            <div
              key={l}
              className="rounded-2xl border border-cv-line/60 bg-cv-surface p-6 dark:border-white/10 dark:bg-[#0D0D0D]"
            >
              <div className="font-mono text-3xl font-bold tracking-tight text-cv-ink lg:text-4xl">{v}</div>
              <p className="mt-3 text-sm leading-relaxed text-cv-muted">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProofInProduction;
