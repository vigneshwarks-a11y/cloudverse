"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { SectionHeading } from "@/components/SectionHeading";
/* "The cost of not routing" — quantifies hardcoded spend versus Agentry-routed
   spend: a monthly at-scale savings table beside a single-request Without/With
   comparison, closed by a result banner. cv-* tokens, theme-aware.

   Motion: the at-scale dollar figures count up from 0 to their target once the
   table scrolls into view (GSAP onUpdate, plays once). SSR renders the final
   values, so no-JS / reduced-motion always shows the real numbers. */

// [label, hardcoded, withAgentry, monthlySaving] — raw dollars; formatted below.
const SCALE_ROWS: [string, number, number, number][] = [
  ["1M requests", 2980, 298, 2682],
  ["5M requests", 14900, 1490, 13410],
  ["10M requests", 29800, 2980, 26820],
  ["50M requests", 149000, 14900, 134100],
];

const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

/* A dollar figure that counts up on scroll-in. Renders the final value for SSR
   (data-count-value drives the client animation). */
function Money({ value, className }: { value: number; className?: string }) {
  return (
    <span data-count data-count-value={value} className={className}>
      {money(value)}
    </span>
  );
}

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
      className={`rounded-2xl border p-5 ${
        withAgentry
          ? "border-[#1664C0]/40 bg-[#1664C0]/[0.05] dark:border-[#7CB8F8]/25 dark:bg-[#1664C0]/[0.10]"
          : "border-cv-line/50 bg-cv-card/60 dark:border-white/10 dark:bg-[#0D0D0D]"
      }`}
    >
      <div className={`text-xs font-semibold uppercase tracking-widest ${withAgentry ? "text-[#1664C0] dark:text-[#7CB8F8]" : "text-cv-muted"}`}>
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
  const scope = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return; // SSR already rendered the final figures

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = parseFloat(el.dataset.countValue || "0");
        const obj = { v: 0 };
        el.textContent = money(0); // start at zero before the trigger fires
        gsap.to(obj, {
          v: target,
          duration: 1.4,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = money(obj.v);
          },
          scrollTrigger: {
            trigger: scope.current,
            start: "top 80%",
            toggleActions: "play none none none", // count up once, on first entry
          },
        });
      });
    },
    { scope },
  );

  return (
    <section ref={scope} className="cv-section bg-cv-surface2 dark:bg-black" data-testid="section-cost-of-not-routing">
      <div className="cv-container">
        <SectionHeading eyebrow="Economics" title="The cost of not routing.">
          Every hardcoded endpoint spends money without making a decision. The same work, on the right
          model, often costs a fraction, at the same or better quality.
        </SectionHeading>

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
                    <th className="px-5 py-3 text-right font-medium">With Agentry</th>
                    <th className="px-5 py-3 text-right font-medium">Monthly saving</th>
                  </tr>
                </thead>
                <tbody>
                  {SCALE_ROWS.map(([vol, hard, agentry, save]) => (
                    <tr key={vol} className="border-b border-cv-line/30 last:border-0 dark:border-white/[0.06]">
                      <td className="px-5 py-3.5 text-cv-ink/80">{vol}</td>
                      <td className="px-5 py-3.5 text-right font-mono text-cv-ink/70"><Money value={hard} /></td>
                      <td className="px-5 py-3.5 text-right font-mono text-cv-ink"><Money value={agentry} /></td>
                      <td className="px-5 py-3.5 text-right font-mono font-semibold text-cv-teal"><Money value={save} /></td>
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
