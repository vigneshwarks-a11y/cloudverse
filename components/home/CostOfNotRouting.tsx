/* "The cost of not routing" — quantifies hardcoded spend versus AIX-routed
   spend: a monthly at-scale savings table beside a single-request Without/With
   comparison, closed by a result banner. cv-* tokens, theme-aware. Server
   component. */

const SCALE_ROWS: [string, string, string, string][] = [
  ["1M requests", "$2,980", "$298", "$2,682"],
  ["5M requests", "$14,900", "$1,490", "$13,410"],
  ["10M requests", "$29,800", "$2,980", "$26,820"],
  ["50M requests", "$149,000", "$14,900", "$134,100"],
];

function CompareCard({
  label,
  tone,
  rows,
}: {
  label: string;
  tone: "without" | "with";
  rows: { k: string; v: string; delta?: string }[];
}) {
  const withAix = tone === "with";
  return (
    <div
      className={`rounded-2xl border p-5 ${
        withAix
          ? "border-[#1664C0]/40 bg-[#1664C0]/[0.05] dark:border-[#7CB8F8]/25 dark:bg-[#1664C0]/[0.10]"
          : "border-cv-line/50 bg-cv-card/60 dark:border-white/10 dark:bg-[#0D0D0D]"
      }`}
    >
      <div className={`text-xs font-semibold uppercase tracking-widest ${withAix ? "text-[#1664C0] dark:text-[#7CB8F8]" : "text-cv-muted"}`}>
        {label}
      </div>
      <dl className="mt-4 space-y-3">
        {rows.map((r) => (
          <div key={r.k} className="flex items-baseline justify-between gap-3">
            <dt className="text-sm text-cv-muted">{r.k}</dt>
            <dd className="flex items-baseline gap-1.5 text-right">
              <span className="font-mono text-sm font-semibold text-cv-ink">{r.v}</span>
              {r.delta && (
                <span className="font-mono text-[11px] font-semibold text-cv-teal">{r.delta}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function CostOfNotRouting() {
  return (
    <section className="cv-section bg-cv-surface2 dark:bg-black" data-testid="section-cost-of-not-routing">
      <div className="cv-container">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14 lg:items-end">
          <div>
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#1664C0]/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#1664C0] dark:bg-[#7CB8F8]/15 dark:text-[#7CB8F8]">
              Economics
            </span>
            <h2 className="cv-h2 text-cv-ink">The cost of not routing.</h2>
          </div>
          <p className="cv-body text-cv-ink/70 lg:max-w-md lg:justify-self-end">
            Every hardcoded endpoint spends money without making a decision. The same work, on the right
            model, often costs a fraction, at the same or better quality.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.25fr_1fr] lg:gap-5">
          {/* At-scale monthly savings table */}
          <div className="overflow-hidden rounded-2xl border border-cv-line/50 bg-cv-surface dark:border-white/10 dark:bg-[#0D0D0D]">
            <div className="border-b border-cv-line/50 px-5 py-3 text-xs font-semibold uppercase tracking-widest text-cv-muted dark:border-white/10">
              At scale (monthly)
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[440px] text-sm">
                <thead>
                  <tr className="border-b border-cv-line/50 text-left text-[11px] uppercase tracking-wider text-cv-muted dark:border-white/10">
                    <th className="px-5 py-3 font-medium">Monthly volume</th>
                    <th className="px-5 py-3 text-right font-medium">Hardcoded spend</th>
                    <th className="px-5 py-3 text-right font-medium">With AIX</th>
                    <th className="px-5 py-3 text-right font-medium">Monthly saving</th>
                  </tr>
                </thead>
                <tbody>
                  {SCALE_ROWS.map(([vol, hard, aix, save]) => (
                    <tr key={vol} className="border-b border-cv-line/30 last:border-0 dark:border-white/[0.06]">
                      <td className="px-5 py-3.5 text-cv-ink/80">{vol}</td>
                      <td className="px-5 py-3.5 text-right font-mono text-cv-ink/60">{hard}</td>
                      <td className="px-5 py-3.5 text-right font-mono text-cv-ink">{aix}</td>
                      <td className="px-5 py-3.5 text-right font-mono font-semibold text-cv-teal">{save}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="px-5 py-3 text-[11px] leading-relaxed text-cv-muted">
              Assumption: 40&ndash;90% reduction applied at an 89% average. Your mix will differ; the audit
              measures yours.
            </p>
          </div>

          {/* Single-request Without / With comparison */}
          <div className="flex flex-col gap-4">
            <CompareCard
              label="Example · without AIX"
              tone="without"
              rows={[
                { k: "Model", v: "Claude Sonnet" },
                { k: "Latency", v: "5,537 ms" },
                { k: "Cost / request", v: "$0.00298" },
              ]}
            />
            <CompareCard
              label="Example · with AIX"
              tone="with"
              rows={[
                { k: "Model", v: "GPT-4o-mini" },
                { k: "Latency", v: "3,962 ms", delta: "-28.5%" },
                { k: "Cost / request", v: "$0.00010", delta: "-96.8%" },
              ]}
            />
          </div>
        </div>

        {/* Result banner */}
        <div className="mt-5 flex flex-col items-center gap-1 rounded-2xl border border-cv-teal/30 bg-cv-teal/[0.06] px-6 py-5 text-center sm:flex-row sm:justify-center sm:gap-3">
          <span className="font-mono text-lg font-bold text-cv-teal">40&ndash;90% lower cost, depending on workload mix.</span>
          <span className="text-sm text-cv-ink/70">The example above is one workload; the audit measures yours.</span>
        </div>
      </div>
    </section>
  );
}

export default CostOfNotRouting;
