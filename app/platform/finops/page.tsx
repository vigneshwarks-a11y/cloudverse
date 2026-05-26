import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { DEMO_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "FinOps Platform — Multi-Cloud Cost Intelligence for Every Team | CloudVerse",
  description:
    "See every dollar by team, product, and provider. One model that reconciles to finance and explains itself to engineering.",
};

const ACCENT = "#1664C0";

const STATS = [
  { v: "$738,983", l: "recovered — Berkshire Hathaway HomeServices" },
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
      <section className="cv-hero-bg pt-[120px] pb-16 lg:pt-[160px] lg:pb-24 relative">
        <div className="cv-container relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium" style={{ borderColor: `${ACCENT}66`, color: "#7CB8F8" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
            FinOps Platform
          </div>
          <h1 className="cv-h1 mt-6 text-cv-ink">Multi-Cloud Cost Intelligence for Every Team</h1>
          <p className="cv-body-lg mt-6 text-cv-ink/75">
            See every dollar by team, product, and provider. One model that reconciles to finance and explains itself to engineering.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={DEMO_URL} className="cv-btn-primary"><span>Book a Demo</span><ArrowRight size={16} /></Link>
            <Link href="/integrations" className="cv-btn-ghost">Explore the Platform</Link>
          </div>
        </div>
      </section>

      <section className="border-y border-cv-line bg-cv-surface2/40">
        <div className="cv-container py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <div key={s.l}>
              <div className="text-2xl lg:text-3xl font-display font-semibold text-cv-ink">{s.v}</div>
              <div className="text-sm text-cv-muted mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="cv-section">
        <div className="cv-container max-w-4xl">
          <h2 className="cv-h2 text-cv-ink">Most FinOps tools show dashboards. This one changes what happens next.</h2>
          <p className="cv-body-lg text-cv-ink/80 mt-6">
            Most organisations already have a FinOps tool. Most of those tools show dashboards that look correct and generate recommendations that go unactioned. The problem is not visibility. It is that the intelligence stops at the dashboard.
          </p>
          <p className="cv-body-lg text-cv-ink/80 mt-4">
            CloudVerse FinOps Platform connects spend data to the teams and decisions that drive it. What the bill says, what changed, who owns it, and what to do next.
          </p>
        </div>
      </section>

      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <div className="max-w-3xl mb-10">
            <h2 className="cv-h2 text-cv-ink">Four product surfaces. One unified view.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              ["Workload mapping", "Allocation that sticks. Every tag, account, BU, and shared-service split reconciled to the finance model. Teams see the spend they own. Leaders have a view that matches the finance report."],
              ["Anomaly detection", "Identify the team, environment, and charge that drove the anomaly within hours of it happening, not in the next billing cycle review. The alert arrives with attribution, not just a number."],
              ["Commitments with payback proof", "RI, SP, and CSP coverage modelled with explicit payback before you commit. Commitment planning that shows the math, not just the recommendation. No surprises."],
              ["Audit-ready chargeback", "Showback and chargeback wired to BU reporting with multi-currency and tax support. The finance team gets a report they can use. The engineering team gets a model they can trust."],
            ].map(([t, b]) => (
              <div key={t} className="rounded-2xl border border-cv-line bg-cv-surface p-7">
                <h3 className="cv-h3 text-cv-ink">{t}</h3>
                <p className="text-cv-ink/75 mt-3 leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="rounded-3xl border border-cv-line bg-cv-surface2 p-8 lg:p-12">
            <h2 className="cv-h2 text-cv-ink max-w-3xl">How Berkshire Hathaway HomeServices recovered $738,983</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-8">
              {[
                ["$101,736", "recovered annually"],
                ["$61,582", "recovered in a single month"],
                ["$738,984", "total recovery"],
              ].map(([v, l]) => (
                <div key={l} className="rounded-xl border border-cv-line bg-cv-surface p-6">
                  <div className="text-3xl lg:text-4xl font-display font-semibold text-cv-ink">{v}</div>
                  <div className="text-sm text-cv-muted mt-2">{l}</div>
                </div>
              ))}
            </div>
            <p className="text-cv-ink/80 leading-relaxed max-w-3xl">
              A growing mid-market cloud and AWS environment. Fragmented tagging, no team-level attribution, and a FinOps process that depended on manual variance reviews.
            </p>
            <p className="text-cv-ink/80 leading-relaxed max-w-3xl mt-4">
              CloudVerse FinOps Platform connected spend to teams, surfaced the highest-impact anomalies, and gave the team an allocation model that held up to finance scrutiny. The waste was always there. It just had no address.
            </p>
          </div>
        </div>
      </section>

      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <div className="max-w-3xl mb-10">
            <h2 className="cv-h2 text-cv-ink">Inform. Optimise. Operate.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              ["Inform", "Allocation, tagging, attribution, and variance reporting. Understand what is happening, who owns it, and what changed since last month."],
              ["Optimise", "Rightsizing, commitment coverage, and waste identification. Prioritised by impact. Engineering-grade signals alongside finance reporting."],
              ["Operate", "Automated recommendations, chargeback, budget alerts, and governance controls. Automation paths with approval workflows and full audit logs."],
            ].map(([t, b], i) => (
              <div key={t} className="rounded-2xl border border-cv-line bg-cv-surface p-7">
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
          <div className="grid md:grid-cols-3 gap-5">
            {[
              ["FinOps Manager", "One model that covers cloud, data platforms, and AI workloads. Everything reconciles to finance. Automation reduces the manual review cycle."],
              ["Cloud Engineer", "Clear cost signals without leaving your workflow. See what changed, what it costs, and what to do. No more cost governance as a separate process."],
              ["CFO / VP Finance", "Spend accountability at team and product level. The bill explained in terms of business decisions, not infrastructure line items."],
            ].map(([t, b]) => (
              <div key={t} className="rounded-2xl border border-cv-line bg-cv-surface2 p-7">
                <h3 className="font-display font-semibold text-cv-ink">{t}</h3>
                <p className="text-sm text-cv-ink/75 mt-3 leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="cv-section bg-cv-surface2">
        <div className="cv-container max-w-3xl">
          <h2 className="cv-h2 text-cv-ink mb-8">FAQ</h2>
          <div className="space-y-4">
            {FAQ.map(([q, a]) => (
              <details key={q} className="rounded-xl border border-cv-line bg-cv-surface p-5">
                <summary className="cursor-pointer font-medium text-cv-ink">{q}</summary>
                <p className="text-cv-ink/75 mt-3 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONNECTS TO STACK */}
      <section className="cv-section">
        <div className="cv-container max-w-4xl">
          <h2 className="cv-h3 text-cv-ink mb-4">Connects to the stack</h2>
          <p className="text-cv-ink/75 leading-relaxed">
            AWS, Azure, Google Cloud, plus AIX for AI workload economics, DataX for warehouse intelligence, and DevX for shift-left cost intelligence.
          </p>
        </div>
      </section>

      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <div className="rounded-3xl border border-cv-line bg-cv-surface p-10 lg:p-16 text-center">
            <h2 className="cv-h2 text-cv-ink max-w-3xl mx-auto">Bring your FinOps program onto one control plane.</h2>
            <p className="cv-body-lg text-cv-ink/75 mt-5 max-w-2xl mx-auto">
              Connect your first account in under 30 minutes. Most teams have their first non-obvious finding the same day.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href={DEMO_URL} className="cv-btn-primary"><span>Book a Demo</span><ArrowRight size={16} /></Link>
              <Link href="/contact" className="cv-btn-ghost">Talk to Sales</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
