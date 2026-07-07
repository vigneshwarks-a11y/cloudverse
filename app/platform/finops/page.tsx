import Link from "next/link";
import { ArrowRight } from "@solar-icons/react";
import { FaqBlock } from "@/components/FaqBlock";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import type { Metadata } from "next";
import { DEMO_URL } from "@/lib/links";
import { WhoUsesItCards } from "@/components/product/WhoUsesItCards";
import { FinOpsHero } from "@/components/product/FinOpsHero";

export const metadata: Metadata = {
  title: "FinOps Platform — Multi-Cloud Cost Intelligence for Every Team | CloudVerse",
  description:
    "See every dollar by team, product, and provider. One model that reconciles to finance and explains itself to engineering.",
  keywords: ["FinOps platform", "cloud cost management", "multi-cloud cost visibility", "cloud allocation", "chargeback", "cloud unit economics"],
  alternates: { canonical: "/platform/finops" },
  openGraph: {
    title: "FinOps Platform — Multi-Cloud Cost Intelligence for Every Team",
    description: "See every dollar by team, product, and provider. One model that reconciles to finance and explains itself to engineering.",
    url: "/platform/finops",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "CloudVerse FinOps Platform — Multi-Cloud Cost Intelligence" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FinOps Platform — Multi-Cloud Cost Intelligence",
    description: "See every dollar by team, product, and provider. Reconciles to finance. Explains itself to engineering.",
  },
};

const STATS = [
  { v: "$101,736", l: "saved annually" },
  { v: "$61,582", l: "recovered in a single month" },
  { v: "5+", l: "cloud providers unified" },
];

const FAQ = [
  ["How is this different from a cloud cost explorer?", "An explorer shows spend. CloudVerse traces variance to a driver and owner, ranks the fix, and can carry it out. It changes what happens after the dashboard."],
  ["Does it work across all our clouds?", "Yes. One allocation model across AWS, Azure, and GCP, with Oracle, Alibaba, Huawei, and Tencent supported."],
  ["Will it fit our existing allocation logic?", "Yes. Virtual tags let you define cost dimensions that match how the business is structured, not how billing is structured."],
  ["How fast do we see value?", "First account connected in under 30 minutes. Most teams find recoverable spend the same day."],
  ["Does automation touch our accounts?", "Read-only by default. Any action is opt-in, scoped, and logged."],
];

export default function FinOpsPage() {
  return (
    <>
      <FinOpsHero />

      <section className="pt-8 pb-12 lg:pt-10 lg:pb-16">
        <div className="max-w-cv mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            {STATS.map((s, i) => (
              <div
                key={s.l}
                className={`flex flex-col items-center justify-center rounded-2xl border border-cv-ink/10 dark:border-white/10 px-6 py-10 text-center bg-white/40 dark:bg-[#0D0D0D] backdrop-blur-sm${i === STATS.length - 1 && STATS.length % 2 !== 0 ? " col-span-2 lg:col-span-1" : ""}`}
              >
                <div className="font-mono text-2xl lg:text-3xl font-bold text-cv-ink tracking-tight">{s.v}</div>
                <p className="mt-3 text-sm font-medium text-cv-muted tracking-wide">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cv-section">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink">Most FinOps tools show dashboards. This one changes what happens next.</h2>
          <div className="mt-6 space-y-4">
            <p className="cv-body-lg text-cv-ink/80">
              A dashboard tells you spend went up. It doesn&apos;t tell you which team, which change, or what to do first.
            </p>
            <p className="cv-body-lg text-cv-ink/80">
              CloudVerse traces the variance to a driver and an owner, ranks the fix by impact, and carries it out once you approve. Cloud spend is visible everywhere. Here it&apos;s finally clear.
            </p>
          </div>
        </div>
      </section>

      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-10">Four product surfaces. One unified view.</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {/* Workload mapping */}
            <div className="relative overflow-hidden rounded-2xl border border-cv-line/40 bg-cv-card dark:bg-[#0D0D0D] p-7">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: "radial-gradient(ellipse 85% 60% at 0% 0%, rgba(22,100,192,0.10), transparent 60%)" }}
              />
              <div className="relative">
                <h3 className="cv-h3 text-cv-ink">Workload mapping</h3>
                <p className="text-cv-ink/70 mt-3 leading-relaxed">Shared spend mapped to teams, services, environments, and products, automatically. Chargeback that survives an audit.</p>
                {/* Allocation interface */}
                <div className="mt-6 rounded-xl border border-cv-line/40 bg-cv-card dark:bg-[#0D0D0D] p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs font-medium text-cv-ink/80">Allocation by team</span>
                    <span className="rounded-full border border-[#1664C0]/40 bg-[#1664C0]/10 px-2 py-0.5 text-[10px] font-medium text-[#1664C0] dark:text-[#7C9BFF]">Reconciled · 100%</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      ["Platform Eng", 42, "$214k"],
                      ["Data Science", 28, "$142k"],
                      ["Shared Services", 18, "$91k"],
                      ["Frontend", 12, "$61k"],
                    ].map(([name, pct, amt]) => (
                      <div key={name as string}>
                        <div className="mb-1 flex items-center justify-between text-[11px]">
                          <span className="text-cv-ink/80">{name}</span>
                          <span className="font-mono text-cv-muted">{pct}% · {amt}</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-cv-ink/[0.06]">
                          <div className="h-full rounded-full bg-gradient-to-r from-[#1664C0] to-[#7C9BFF]" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Anomaly detection */}
            <div className="relative overflow-hidden rounded-2xl border border-cv-line/40 bg-cv-card dark:bg-[#0D0D0D] p-7">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: "radial-gradient(ellipse 85% 60% at 100% 0%, rgba(22,100,192,0.10), transparent 60%)" }}
              />
              <div className="relative">
                <h3 className="cv-h3 text-cv-ink">Anomaly detection</h3>
                <p className="text-cv-ink/70 mt-3 leading-relaxed">Spikes flagged in real time and traced to a root-cause signal before they compound.</p>
                {/* Anomaly chart */}
                <div className="mt-6 rounded-xl border border-cv-line/40 bg-cv-card dark:bg-[#0D0D0D] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-medium text-cv-ink/80">Daily spend · prod-emr</span>
                    <span className="font-mono text-[11px] text-[#1664C0] dark:text-[#7C9BFF]">+$4,812</span>
                  </div>
                  <div className="flex h-24 items-end gap-1.5">
                    {[34, 30, 38, 32, 36, 33, 40, 35, 92, 41].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: i === 8 ? "linear-gradient(to top, #1664C0, #7C9BFF)" : "hsl(var(--cv-ink) / 0.10)" }} />
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-3 rounded-lg border border-[#1664C0]/30 bg-[#1664C0]/[0.08] p-3">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[#1664C0] dark:bg-[#7C9BFF]" />
                    <div className="text-[11px] leading-tight">
                      <div className="font-medium text-cv-ink/90">Anomaly · Data Science · prod-emr</div>
                      <div className="text-cv-muted">3.1× baseline · detected 2h ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Commitments with payback proof */}
            <div className="relative overflow-hidden rounded-2xl border border-cv-line/40 bg-cv-card dark:bg-[#0D0D0D] p-7">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: "radial-gradient(ellipse 85% 60% at 0% 100%, rgba(22,100,192,0.10), transparent 60%)" }}
              />
              <div className="relative">
                <h3 className="cv-h3 text-cv-ink">Commitments with payback proof</h3>
                <p className="text-cv-ink/70 mt-3 leading-relaxed">RIs, Savings Plans, and CUDs with realized payback tracked, not assumed.</p>
                {/* Commitment planning */}
                <div className="mt-6 rounded-xl border border-cv-line/40 bg-cv-card dark:bg-[#0D0D0D] p-4">
                  <div className="mb-4 grid grid-cols-2 gap-3">
                    {[
                      ["Est. savings", "$128k/yr"],
                      ["Payback", "7.4 mo"],
                    ].map(([l, v]) => (
                      <div key={l} className="rounded-lg border border-cv-line bg-cv-ink/[0.03] p-3">
                        <div className="text-[10px] uppercase tracking-wider text-cv-muted">{l}</div>
                        <div className="mt-1 font-display text-xl font-semibold text-cv-ink">{v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {[
                      ["RI coverage", 72],
                      ["Savings Plan", 64],
                      ["CSP coverage", 58],
                    ].map(([l, pct]) => (
                      <div key={l as string}>
                        <div className="mb-1 flex items-center justify-between text-[11px]">
                          <span className="text-cv-ink/80">{l}</span>
                          <span className="font-mono text-cv-muted">{pct}%</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-cv-ink/[0.06]">
                          <div className="h-full rounded-full bg-gradient-to-r from-[#1664C0] to-[#7C9BFF]" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Audit-ready chargeback */}
            <div className="relative overflow-hidden rounded-2xl border border-cv-line/40 bg-cv-card dark:bg-[#0D0D0D] p-7">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: "radial-gradient(ellipse 85% 60% at 100% 100%, rgba(22,100,192,0.10), transparent 60%)" }}
              />
              <div className="relative">
                <h3 className="cv-h3 text-cv-ink">Audit-ready chargeback</h3>
                <p className="text-cv-ink/70 mt-3 leading-relaxed">Multi-currency, reconciled to source billing.</p>
                {/* Chargeback dashboard */}
                <div className="mt-6 rounded-xl border border-cv-line/40 bg-cv-card dark:bg-[#0D0D0D] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-medium text-cv-ink/80">Chargeback · Q2</span>
                    <span className="rounded-full border border-[#1664C0]/40 bg-[#1664C0]/10 px-2 py-0.5 text-[10px] font-medium text-[#1664C0] dark:text-[#7C9BFF]">EUR · JPY · USD</span>
                  </div>
                  <div className="grid grid-cols-[1fr_auto] gap-x-4 text-[11px]">
                    <div className="border-b border-cv-line pb-2 text-[10px] uppercase tracking-wider text-cv-muted">Business unit</div>
                    <div className="border-b border-cv-line pb-2 text-right text-[10px] uppercase tracking-wider text-cv-muted">Total</div>
                    {[
                      ["EMEA", "€12.4k"],
                      ["APAC", "¥9.8k"],
                      ["Americas", "$21.1k"],
                    ].map(([bu, total]) => (
                      <div key={bu} className="contents">
                        <div className="border-b border-cv-line py-2 text-cv-ink/80">{bu}</div>
                        <div className="border-b border-cv-line py-2 text-right font-mono text-cv-ink/90">{total}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-10">Inform. Optimise. Operate.</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              ["Inform", "Allocation and attribution first. Every dollar mapped to an owner and a driver."],
              ["Optimise", "Rightsizing, idle cleanup, commitment and spot planning, ranked by impact."],
              ["Operate", "Approved fixes automated on a schedule, inside policy, with an audit trail."],
            ].map(([t, b], i) => (
              <div key={t} className="rounded-2xl border border-cv-line/40 bg-cv-surface dark:bg-[#0D0D0D] p-7">
                <div className="text-xs uppercase tracking-widest text-cv-muted">Stage 0{i + 1}</div>
                <h3 className="cv-h3 text-cv-ink mt-2">{t}</h3>
                <p className="text-cv-ink/75 mt-4 leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cv-section">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-10">Built for the teams accountable for the bill</h2>
          <WhoUsesItCards
            items={[
              ["FinOps Manager", "Allocation and chargeback that hold up, and a queue of ranked actions instead of a spreadsheet."],
              ["Cloud Engineer", "The driver behind a spike, with the fix and the risk attached."],
              ["CFO / VP Finance", "A forecast you can defend and a number that reconciles to the ledger."],
            ]}
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="text-center mb-10">
            <h2 className="cv-h2 text-cv-ink">Frequently Asked Questions</h2>
          </div>
          <FaqBlock items={FAQ.map(([q, a]) => ({ q, a }))} accent="#1664C0" />
        </div>
      </section>

      {/* CONNECTS TO STACK */}
      <section className="cv-section">
        <div className="cv-container">
          <h2 className="cv-h3 text-cv-ink mb-5">Connects to the stack you already run.</h2>
          <p className="text-cv-ink/75 leading-relaxed">
            AWS, Azure, and Google Cloud for infrastructure. AIX for AI spend, DataX for warehouses, and DevX for the engineering workflow. One view across all of it.
          </p>
        </div>
      </section>

      <ClosingCTA />
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Platform", href: "/platform/finops" }, { name: "FinOps", href: "/platform/finops" }]} />
    </>
  );
}
