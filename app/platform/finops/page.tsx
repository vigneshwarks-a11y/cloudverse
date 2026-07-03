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
  ["How is this different from cost explorer dashboards?", "Dashboards explain the invoice. CloudVerse governs the decisions that shape it: PR-level checks, AI/GPU economics, and warehouse query attribution on one model."],
  ["Can we keep our current allocation logic?", "Yes. CloudVerse imports existing tag structures and cost allocation rules as a starting point."],
  ["How long until we are using it day to day?", "Most teams have a working allocation model within the first account connection. Meaningful depth takes two to four weeks of iteration depending on tagging maturity."],
  ["Do you support multi-currency and tax?", "Yes."],
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
              Most organisations already have a FinOps tool. Most of those tools show dashboards that look correct and generate recommendations that go unactioned. The problem is not visibility. It is that the intelligence stops at the dashboard.
            </p>
            <p className="cv-body-lg text-cv-ink/80">
              CloudVerse FinOps Platform connects spend data to the teams and decisions that drive it. What the bill says, what changed, who owns it, and what to do next.
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
                <p className="text-cv-ink/70 mt-3 leading-relaxed">Allocation that sticks. Every tag, account, BU, and shared-service split reconciled to the finance model. Teams see the spend they own. Leaders have a view that matches the finance report.</p>
                {/* Allocation interface */}
                <div className="mt-6 rounded-xl border border-cv-line/40 bg-cv-card dark:bg-[#0D0D0D] p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs font-medium text-cv-ink/80">Allocation by team</span>
                    <span className="rounded-full border border-[#1664C0]/40 bg-[#1664C0]/10 px-2 py-0.5 text-[10px] font-medium text-[#7C9BFF]">Reconciled · 100%</span>
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
                <p className="text-cv-ink/70 mt-3 leading-relaxed">Identify the team, environment, and charge that drove the anomaly within hours of it happening, not in the next billing cycle review. The alert arrives with attribution, not just a number.</p>
                {/* Anomaly chart */}
                <div className="mt-6 rounded-xl border border-cv-line/40 bg-cv-card dark:bg-[#0D0D0D] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-medium text-cv-ink/80">Daily spend · prod-emr</span>
                    <span className="font-mono text-[11px] text-[#7C9BFF]">+$4,812</span>
                  </div>
                  <div className="flex h-24 items-end gap-1.5">
                    {[34, 30, 38, 32, 36, 33, 40, 35, 92, 41].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: i === 8 ? "linear-gradient(to top, #1664C0, #7C9BFF)" : "hsl(var(--cv-ink) / 0.10)" }} />
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-3 rounded-lg border border-[#1664C0]/30 bg-[#1664C0]/[0.08] p-3">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[#7C9BFF]" />
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
                <p className="text-cv-ink/70 mt-3 leading-relaxed">RI, SP, and CSP coverage modelled with explicit payback before you commit. Commitment planning that shows the math, not just the recommendation. No surprises.</p>
                {/* Commitment planning */}
                <div className="mt-6 rounded-xl border border-cv-line/40 bg-cv-card dark:bg-[#0D0D0D] p-4">
                  <div className="mb-4 grid grid-cols-2 gap-3">
                    {[
                      ["Est. savings", "$128k/yr"],
                      ["Payback", "4.2 mo"],
                    ].map(([l, v]) => (
                      <div key={l} className="rounded-lg border border-cv-line bg-cv-ink/[0.03] p-3">
                        <div className="text-[10px] uppercase tracking-wider text-cv-muted">{l}</div>
                        <div className="mt-1 font-display text-xl font-semibold text-cv-ink">{v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {[
                      ["RI coverage", 78],
                      ["Savings Plan", 64],
                      ["CSP coverage", 51],
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
                <p className="text-cv-ink/70 mt-3 leading-relaxed">Showback and chargeback wired to BU reporting with multi-currency and tax support. The finance team gets a report they can use. The engineering team gets a model they can trust.</p>
                {/* Chargeback dashboard */}
                <div className="mt-6 rounded-xl border border-cv-line/40 bg-cv-card dark:bg-[#0D0D0D] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-medium text-cv-ink/80">Chargeback · Q2</span>
                    <span className="rounded-full border border-[#1664C0]/40 bg-[#1664C0]/10 px-2 py-0.5 text-[10px] font-medium text-[#7C9BFF]">USD · EUR · GBP</span>
                  </div>
                  <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 text-[11px]">
                    <div className="border-b border-cv-line pb-2 text-[10px] uppercase tracking-wider text-cv-muted">Business unit</div>
                    <div className="border-b border-cv-line pb-2 text-right text-[10px] uppercase tracking-wider text-cv-muted">Tax</div>
                    <div className="border-b border-cv-line pb-2 text-right text-[10px] uppercase tracking-wider text-cv-muted">Total</div>
                    {[
                      ["Retail", "$3,140", "$48,210"],
                      ["Mortgage", "$2,015", "$31,540"],
                      ["Insurance", "$1,260", "$19,880"],
                    ].map(([bu, tax, total]) => (
                      <div key={bu} className="contents">
                        <div className="border-b border-cv-line py-2 text-cv-ink/80">{bu}</div>
                        <div className="border-b border-cv-line py-2 text-right font-mono text-cv-muted">{tax}</div>
                        <div className="border-b border-cv-line py-2 text-right font-mono text-cv-ink/90">{total}</div>
                      </div>
                    ))}
                    <div className="py-2 font-medium text-cv-ink/90">Total</div>
                    <div className="py-2 text-right font-mono text-cv-muted">$6,415</div>
                    <div className="py-2 text-right font-mono font-semibold text-[#7C9BFF]">$99,630</div>
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
              ["Inform", "Allocation, tagging, attribution, and variance reporting. Understand what is happening, who owns it, and what changed since last month."],
              ["Optimise", "Rightsizing, commitment coverage, and waste identification. Prioritised by impact. Engineering-grade signals alongside finance reporting."],
              ["Operate", "Automated recommendations, chargeback, budget alerts, and governance controls. Automation paths with approval workflows and full audit logs."],
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
              ["FinOps Manager", "One model that covers cloud, data platforms, and AI workloads. Everything reconciles to finance. Automation reduces the manual review cycle."],
              ["Cloud Engineer", "Clear cost signals without leaving your workflow. See what changed, what it costs, and what to do. No more cost governance as a separate process."],
              ["CFO / VP Finance", "Spend accountability at team and product level. The bill explained in terms of business decisions, not infrastructure line items."],
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
          <h2 className="cv-h3 text-cv-ink mb-5">Connects to the stack</h2>
          <p className="text-cv-ink/75 leading-relaxed">
            AWS, Azure, Google Cloud, plus AIX for AI workload economics, DataX for warehouse intelligence, and DevX for shift-left cost intelligence.
          </p>
        </div>
      </section>

      <ClosingCTA />
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Platform", href: "/platform/finops" }, { name: "FinOps", href: "/platform/finops" }]} />
    </>
  );
}
