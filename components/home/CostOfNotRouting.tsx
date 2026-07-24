import { SectionHeading } from "@/components/SectionHeading";
/* "The cost of not routing" — quantifies hardcoded spend versus Agentry-routed
   spend: a monthly at-scale savings table beside a single-request Without/With
   comparison, closed by a result banner. cv-* tokens, theme-aware.

   Renders statically — this is panel content inside PinnedLoopCarousel, which
   owns all scroll-driven animation for the group (see that component's header
   comment for why panel content must not carry its own ScrollTrigger, e.g. a
   count-up or fade-in keyed to this element's own scroll position). Server
   component. */

// [label, hardcoded, withAgentry, monthlySaving] — raw dollars; formatted below.
const SCALE_ROWS: [string, number, number, number][] = [
  ["1M requests", 2980, 298, 2682],
  ["5M requests", 14900, 1490, 13410],
  ["10M requests", 29800, 2980, 26820],
  ["50M requests", 149000, 14900, 134100],
];

const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

function CompareCard({
  label,
  tone,
  rows,
}: {
  label: string;
  tone: "without" | "with";
  rows: { k: string; v: string; delta?: string }[];
}) {
  const withAgentry = tone === "with";
  return (
    <div
      className={`rounded-2xl border p-6 ${
        withAgentry
          ? "border-[#1664C0]/40 bg-[#1664C0]/[0.05] dark:border-[#7CB8F8]/25 dark:bg-[#1664C0]/[0.10]"
          : "border-cv-line/50 bg-cv-card/60 dark:border-white/10 dark:bg-[#0D0D0D]"
      }`}
    >
      <div className={`text-xs font-semibold uppercase tracking-widest ${withAgentry ? "text-[#1664C0] dark:text-[#7CB8F8]" : "text-cv-muted"}`}>
        {label}
      </div>
      <dl className="mt-5 space-y-4">
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
        <SectionHeading eyebrow="Economics" title="The cost of not routing.">
          Every hardcoded endpoint spends money without making a decision. The same work, on the right
          model, often costs a fraction, at the same or better quality.
        </SectionHeading>

        <div data-fit-visual className="mt-10">
        <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr] lg:gap-6">
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
                    <th className="px-5 py-3 text-right font-medium">With Agentry</th>
                    <th className="px-5 py-3 text-right font-medium">Monthly saving</th>
                  </tr>
                </thead>
                <tbody>
                  {SCALE_ROWS.map(([vol, hard, agentry, save]) => (
                    <tr key={vol} className="border-b border-cv-line/30 last:border-0 dark:border-white/[0.06]">
                      <td className="px-5 py-4 text-cv-ink/80">{vol}</td>
                      <td className="px-5 py-4 text-right font-mono text-cv-ink/70">{money(hard)}</td>
                      <td className="px-5 py-4 text-right font-mono text-cv-ink">{money(agentry)}</td>
                      <td className="px-5 py-4 text-right font-mono font-semibold text-cv-teal">{money(save)}</td>
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
          <div className="flex flex-col gap-5 lg:gap-6">
            <CompareCard
              label="Example · without Agentry"
              tone="without"
              rows={[
                { k: "Model", v: "Claude Sonnet" },
                { k: "Latency", v: "5,537 ms" },
                { k: "Cost / request", v: "$0.00298" },
              ]}
            />
            <CompareCard
              label="Example · with Agentry"
              tone="with"
              rows={[
                { k: "Model", v: "GPT-4o-mini" },
                { k: "Latency", v: "3,962 ms", delta: "-28.5%" },
                { k: "Cost / request", v: "$0.00010", delta: "-96.8%" },
              ]}
            />
          </div>
        </div>

        {/* Result banner — kept inside the data-fit-visual wrapper so it scales
            with the cards/table as one unit. Left outside, the fit layer's
            (negative, when shrinking) margin compensation pulls it up against
            the cards and swallows this gap. */}
        <div className="mt-6 flex flex-col items-center gap-1 rounded-2xl border border-cv-teal/30 bg-cv-teal/[0.06] px-6 py-6 text-center sm:flex-row sm:justify-center sm:gap-3">
          <span className="font-mono text-lg font-bold text-cv-teal">40&ndash;90% lower cost, depending on workload mix.</span>
          <span className="text-sm text-cv-ink/70">The example above is one workload; the audit measures yours.</span>
        </div>
        </div>
      </div>
    </section>
  );
}

export default CostOfNotRouting;
