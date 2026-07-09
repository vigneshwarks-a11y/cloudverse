import Link from "next/link";
import { ArrowRight, CheckCircle, CloseCircle, UsersGroupRounded } from "@solar-icons/react";
import type { Metadata } from "next";
import { DEMO_URL } from "@/lib/links";
import { PlatformCards } from "@/components/solution/PlatformCards";
import { FinopsShips } from "@/components/solution/FinopsShips";
import { SolutionHero } from "@/components/solution/SolutionHero";
import { WhoThisIsFor } from "@/components/solution/WhoThisIsFor";
import { FaqBlock } from "@/components/FaqBlock";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "For FinOps Teams: The Control Plane Your Finance and Engineering Teams Both Trust | CloudVerse",
  description: "Allocation, anomaly response, commitments, and chargeback on one model. Reconciles to finance. Explains itself to engineering.",
  keywords: ["FinOps team platform", "cloud chargeback", "cloud cost allocation", "anomaly detection cloud", "cloud commitment management"],
  alternates: { canonical: "/solutions/finops-teams" },
  openGraph: {
    title: "For FinOps Teams: The Platform Finance and Engineering Both Trust",
    description: "Allocation, anomaly response, commitments, and chargeback on one model. Reconciles to finance. Explains itself to engineering.",
    url: "/solutions/finops-teams",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "CloudVerse for FinOps Teams" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "For FinOps Teams: The Platform Finance and Engineering Both Trust",
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
  ["How is this different from a cost explorer?", "An explorer shows spend. CloudVerse traces variance to a driver and owner, ranks the fix, and can carry it out."],
  ["Will it fit our allocation logic?", "Yes. Virtual tags define cost dimensions that match how your business is structured."],
  ["How long to implement?", "First account connected in under 30 minutes; recoverable spend usually surfaces the same day."],
  ["Multi-currency and tax?", "Chargeback is multi-currency and reconciles to source billing."],
  ["Does it cover AI spend too?", "Yes. AIX folds AI and GPU spend into the same allocation and forecasting model."],
];

export default function FinOpsTeamsPage() {
  return (
    <>
      <SolutionHero
        eyebrow="For FinOps Teams"
        h1="The control plane your finance and engineering teams both trust."
        sub="Allocation, anomaly response, commitments, and chargeback on one model, across cloud, data, and AI."
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
          <h2 className="cv-h2 text-cv-ink">The situation FinOps teams are in.</h2>
          <p className="cv-body-lg text-cv-ink/80 mt-6">
            The invoice is on time. The explanation isn&apos;t. Your dashboards are accurate and your recommendations get ignored, because they don&apos;t reach the person who can act, with the context to act on.
          </p>
          <p className="cv-body-lg text-cv-ink/85 mt-4">
            And now AI spend is landing in places where the value isn&apos;t quantified yet. One model across infrastructure, data, and AI is the only way the numbers reconcile.
          </p>
        </div>
      </section>

      {/* WHAT IT'S COSTING YOU TODAY */}
      <section className="cv-section bg-cv-surface dark:bg-black">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-8">What that&apos;s costing you today.</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Days spent explaining a month-on-month variance by hand",
              "Shared cost allocated manually, chargeback that doesn't survive scrutiny",
              "Forecasts that hold for a quarter and then drift",
              "AI and GPU spend with no unit economics attached",
              "No single owner accountable for the total across cloud, AI, data, and engineering",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3 text-cv-ink/85">
                <CloseCircle weight="Linear" size={18} className="text-cv-muted mt-0.5 shrink-0" /> {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="cv-section bg-cv-surface dark:bg-black">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-10">What FinOps teams ship faster with cloudverse</h2>
          <FinopsShips
            items={[
              ["Allocation everyone agrees on", "Shared spend mapped to teams, products, and environments automatically. Chargeback that survives an audit."],
              ["Anomalies with attribution", "A spike arrives with the team and the charge already attached."],
              ["Commitments with payback proof", "RIs, SPs, and CUDs with realized payback tracked, not assumed."],
              ["Audit-ready chargeback", "Multi-currency, reconciled to source billing."],
            ]}
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="cv-section">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-10">How finance teams run it.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              ["Connect", "Connect your clouds, warehouses, and AI providers, read-only."],
              ["Map", "Map spend to the business with virtual tags that match your org, not the billing account."],
              ["Explain", "Explain variance and anomalies with the driver and owner attached."],
              ["Forecast", "Forecast and charge back on a model that reconciles to the ledger."],
            ].map(([title, body], i) => (
              <div key={title} className="rounded-2xl border border-cv-line/40 bg-cv-surface2 dark:bg-[#0D0D0D] p-6">
                <div className="text-xs uppercase tracking-widest text-cv-muted">Step 0{i + 1}</div>
                <h3 className="cv-h3 text-cv-ink mt-2">{title}</h3>
                <p className="text-cv-ink/75 mt-3 leading-relaxed text-sm">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cv-section bg-cv-surface dark:bg-black">
        <div className="cv-container">
          <div className="rounded-3xl border border-cv-line/40 dark:bg-[#0D0D0D] p-8 lg:p-12">
            <h2 className="cv-h2 text-cv-ink max-w-3xl">How Berkshire Hathaway HomeServices recovered $738,983</h2>
            <p className="text-cv-ink/85 mt-5 text-lg">$101,736 annual recovery. $61,582 in a single month.</p>
            <p className="text-cv-ink/80 leading-relaxed max-w-3xl mt-6">
              A growing AWS estate, fragmented tagging, and no team-level attribution. CloudVerse tied spend to teams, surfaced the anomalies that mattered, and gave finance a model that held up under review.
            </p>
          </div>
        </div>
      </section>

      <section className="cv-section">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink">How this is different</h2>
          <p className="cv-body-lg text-cv-ink/80 mt-6">
            Dashboards explain the invoice. CloudVerse governs the decisions that shape it: PR-level checks in engineering workflows, AI and GPU economics, and warehouse query attribution. All on one model.
          </p>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="cv-section bg-cv-surface dark:bg-black">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-8">Outcomes you can defend.</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Explainability: variance traced to drivers and owners, not assembled by hand",
              "Allocation: shared spend mapped automatically, chargeback that holds under scrutiny",
              "Forecasting: forecasts finance can defend, AI spend included",
              "AI governance: AI and GPU spend turned into unit economics",
              "Upstream visibility: cost decisions in data and engineering surfaced before the invoice",
              "Control: one operational view, with ownership aligned end to end",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3 text-cv-ink/85">
                <CheckCircle weight="Linear" size={18} className="text-cv-teal mt-0.5 shrink-0" /> {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="cv-section">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-8">Platform that powers this solution</h2>
          <PlatformCards
            items={[
              ["FinOps Platform", "Allocation, forecasting, anomalies, commitments", "/platform/finops"],
              ["AIX", "Turns AI and GPU spend into unit economics", "/platform/aix"],
              ["DataX", "Makes warehouse and pipeline cost allocable", "/platform/datax"],
            ]}
          />
        </div>
      </section>

      <WhoThisIsFor
        roles={["CFO", "VP / Director of Finance", "Head of FP&A", "Head of Technology / IT Finance", "FinOps leads"]}
        accent="#1664C0"
        bg
      />

      <section className="cv-section">
        <div className="cv-container">
          <div className="text-center mb-10">
            <h2 className="cv-h2 text-cv-ink">FinOps Team Questions Answered</h2>
          </div>
          <FaqBlock items={FAQ.map(([q, a]) => ({ q, a }))} accent="#1664C0" />
        </div>
      </section>

      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Solutions", href: "/solutions" }, { name: "FinOps Teams", href: "/solutions/finops-teams" }]} />
    </>
  );
}
