import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { DEMO_URL } from "@/lib/links";
import { PlatformCards } from "@/components/solution/PlatformCards";
import { FinopsShips } from "@/components/solution/FinopsShips";

export const metadata: Metadata = {
  title: "For FinOps Teams — The Control Plane Your Finance and Engineering Teams Both Trust | CloudVerse",
  description: "Allocation, anomaly response, commitments, and chargeback on one model. Reconciles to finance. Explains itself to engineering.",
};

const STATS = [
  { v: "$738,983", l: "recovered (BHHS)" },
  { v: "<30 min", l: "first account connected" },
  { v: "Same day", l: "first finding" },
  { v: "5+", l: "cloud providers unified" },
];

const FAQ = [
  ["How is this different from cost-explorer dashboards?", "Dashboards explain the invoice. CloudVerse governs the decisions that shape it."],
  ["Can we keep our current allocation logic?", "Yes. CloudVerse imports existing tag structures and cost allocation rules as a starting point."],
  ["How long until we are using it day to day?", "Most teams have a working allocation model within the first account connection."],
  ["Do you support multi-currency and tax?", "Yes."],
];

export default function FinOpsTeamsPage() {
  return (
    <>
      <section className="cv-hero-bg pt-[120px] pb-16 lg:pt-[160px] lg:pb-24 relative">
        <div className="cv-container relative z-10 max-w-4xl">
          <div className="text-xs uppercase tracking-widest text-cv-muted mb-3">For FinOps Teams</div>
          <h1 className="cv-h1 text-cv-ink">The Control Plane Your Finance and Engineering Teams Both Trust</h1>
          <p className="cv-body-lg mt-6 text-cv-ink/75">
            Allocation, anomaly response, commitments, and chargeback on one model. Reconciles to finance. Explains itself to engineering.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={DEMO_URL} className="cv-btn-primary"><span>Book a Demo</span><ArrowRight size={16} /></Link>
            <Link href="/platform/finops" className="cv-btn-ghost">Explore the Platform</Link>
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
          <h2 className="cv-h2 text-cv-ink">The situation FinOps teams are in</h2>
          <p className="cv-body-lg text-cv-ink/80 mt-6">
            The dashboards are accurate. The recommendations are ignored. Engineering says the tool does not understand their workloads. Finance says the numbers do not match the invoice. Leadership wants automation. You are running manual variance reports to bridge the gap.
          </p>
          <p className="cv-body-lg text-cv-ink/85 mt-4">
            CloudVerse gives you one model that covers cloud infrastructure, data platforms, and AI workloads. Attribution that holds up to finance scrutiny. Recommendations that engineering actually acts on.
          </p>
        </div>
      </section>

      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <div className="max-w-3xl mb-10">
            <h2 className="cv-h2 text-cv-ink">What FinOps teams ship faster with CloudVerse</h2>
          </div>
          <FinopsShips
            items={[
              ["Allocation everyone agrees on", "One model with tags, accounts, BUs, and shared-service splits, reconciled to finance. The finance team gets the report they need. The engineering team gets a view that matches their cost centres."],
              ["Anomalies with attribution", "Identify the team, environment, and charge that drove the anomaly within hours of it happening. The alert arrives with context, not just a number. No more spending half the week explaining what spiked."],
              ["Commitments with payback proof", "RI, SP, and CSP coverage modelled with explicit payback before you commit. The decision gets made with the full math visible, not retrospectively justified."],
              ["Audit-ready chargeback", "Showback and chargeback wired to BU reporting with multi-currency and tax support. The report your finance team can actually use."],
            ]}
          />
        </div>
      </section>

      <section className="cv-section">
        <div className="cv-container">
          <div className="rounded-3xl border border-cv-line bg-cv-surface2 p-8 lg:p-12">
            <h2 className="cv-h2 text-cv-ink max-w-3xl">How Berkshire Hathaway HomeServices recovered $738,983</h2>
            <p className="text-cv-ink/85 mt-5 text-lg">$101,736 annual recovery. $61,582 in a single month. $738,984 total.</p>
            <p className="text-cv-ink/80 leading-relaxed max-w-3xl mt-6">
              Fragmented tagging, no team-level attribution, and a FinOps process that depended on manual variance reviews. CloudVerse connected spend to teams, surfaced the highest-impact anomalies, and delivered an allocation model the finance team trusted.
            </p>
          </div>
        </div>
      </section>

      <section className="cv-section bg-cv-surface2">
        <div className="cv-container max-w-4xl">
          <h2 className="cv-h2 text-cv-ink">How this is different</h2>
          <p className="cv-body-lg text-cv-ink/80 mt-6">
            Dashboards explain the invoice. CloudVerse governs the decisions that shape it: PR-level checks in engineering workflows, AI and GPU economics, and warehouse query attribution. All on one model.
          </p>
        </div>
      </section>

      <section className="cv-section">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-8">Platform that powers this solution</h2>
          <PlatformCards
            items={[
              ["FinOps Platform", "Multi-cloud cost intelligence", "/platform/finops"],
              ["DevX", "Shift-left cost intelligence", "/platform/devx"],
              ["DataX", "Warehouse intelligence", "/platform/datax"],
            ]}
          />
        </div>
      </section>

      <section className="cv-section bg-cv-surface2">
        <div className="cv-container max-w-3xl">
          <h2 className="cv-h2 text-cv-ink mb-8">FinOps team questions answered</h2>
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

      <section className="cv-section">
        <div className="cv-container">
          <div className="rounded-3xl border border-cv-line bg-cv-surface2 p-10 lg:p-16 text-center">
            <h2 className="cv-h2 text-cv-ink max-w-3xl mx-auto">Bring your FinOps program onto one control plane.</h2>
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
