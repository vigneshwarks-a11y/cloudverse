import Link from "next/link";
import { ArrowRight, UsersGroupRounded } from "@solar-icons/react";
import type { Metadata } from "next";
import { DEMO_URL } from "@/lib/links";
import { PlatformCards } from "@/components/solution/PlatformCards";
import { FinopsShips } from "@/components/solution/FinopsShips";
import { SolutionHero } from "@/components/solution/SolutionHero";
import { FaqBlock } from "@/components/FaqBlock";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "For FinOps Teams — The Control Plane Your Finance and Engineering Teams Both Trust | CloudVerse",
  description: "Allocation, anomaly response, commitments, and chargeback on one model. Reconciles to finance. Explains itself to engineering.",
  keywords: ["FinOps team platform", "cloud chargeback", "cloud cost allocation", "anomaly detection cloud", "cloud commitment management"],
  alternates: { canonical: "/solutions/finops-teams" },
  openGraph: {
    title: "For FinOps Teams — The Platform Finance and Engineering Both Trust",
    description: "Allocation, anomaly response, commitments, and chargeback on one model. Reconciles to finance. Explains itself to engineering.",
    url: "/solutions/finops-teams",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "CloudVerse for FinOps Teams" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "For FinOps Teams — The Platform Finance and Engineering Both Trust",
    description: "Allocation, anomaly response, commitments, and chargeback. Reconciles to finance.",
  },
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
      <SolutionHero
        eyebrow="For FinOps Teams"
        h1="The Control Plane Your Finance and Engineering Teams Both Trust"
        sub="Allocation, anomaly response, commitments, and chargeback on one model. Reconciles to finance. Explains itself to engineering."
        accent="#1664C0"
        icon={UsersGroupRounded}
        platformHref="/platform/finops"
        badges={["Allocation", "Anomaly Detection", "Commitments", "Chargeback", "Forecasting", "5+ Cloud Providers"]}
      />

      <section className="pt-8 pb-12 lg:pt-10 lg:pb-16">
        <div className="max-w-cv mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {STATS.map((s) => (
              <div
                key={s.l}
                className="flex flex-col items-center justify-center rounded-2xl border border-cv-ink/10 dark:border-white/10 px-6 py-10 text-center bg-white/40 dark:bg-[#0D0D0D] backdrop-blur-sm"
              >
                <div className="font-mono text-2xl lg:text-3xl font-bold text-cv-ink tracking-tight">{s.v}</div>
                <p className="mt-3 text-sm font-medium text-cv-muted tracking-wide max-w-[160px] line-clamp-2">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cv-section">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink">The situation FinOps teams are in</h2>
          <p className="cv-body-lg text-cv-ink/80 mt-6">
            The dashboards are accurate. The recommendations are ignored. Engineering says the tool does not understand their workloads. Finance says the numbers do not match the invoice. Leadership wants automation. You are running manual variance reports to bridge the gap.
          </p>
          <p className="cv-body-lg text-cv-ink/85 mt-4">
            cloudverse gives you one model that covers cloud infrastructure, data platforms, and AI workloads. Attribution that holds up to finance scrutiny. Recommendations that engineering actually acts on.
          </p>
        </div>
      </section>

      <section className="cv-section bg-cv-surface dark:bg-black">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-10">What FinOps teams ship faster with cloudverse</h2>
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
          <div className="rounded-3xl border border-cv-line/40 dark:bg-[#0D0D0D] p-8 lg:p-12">
            <h2 className="cv-h2 text-cv-ink max-w-3xl">How Berkshire Hathaway HomeServices recovered $738,983</h2>
            <p className="text-cv-ink/85 mt-5 text-lg">$101,736 annual recovery. $61,582 in a single month. $738,984 total.</p>
            <p className="text-cv-ink/80 leading-relaxed max-w-3xl mt-6">
              Fragmented tagging, no team-level attribution, and a FinOps process that depended on manual variance reviews. CloudVerse connected spend to teams, surfaced the highest-impact anomalies, and delivered an allocation model the finance team trusted.
            </p>
          </div>
        </div>
      </section>

      <section className="cv-section bg-cv-surface dark:bg-black">
        <div className="cv-container">
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

      <section className="cv-section">
        <div className="cv-container">
          <div className="text-center mb-10">
            <h2 className="cv-h2 text-cv-ink">FinOps Team Questions Answered</h2>
          </div>
          <FaqBlock items={FAQ.map(([q, a]) => ({ q, a }))} accent="#1664C0" />
        </div>
      </section>

      <ClosingCTA />
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Solutions", href: "/solutions" }, { name: "FinOps Teams", href: "/solutions/finops-teams" }]} />
    </>
  );
}
