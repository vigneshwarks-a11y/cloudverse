import Link from "next/link";
import { ArrowRight, Database } from "@solar-icons/react";
import type { Metadata } from "next";
import { DEMO_URL } from "@/lib/links";
import { PlatformCards } from "@/components/solution/PlatformCards";
import { DataXUnlocks } from "@/components/solution/DataXUnlocks";
import { SolutionHero } from "@/components/solution/SolutionHero";
import { FaqBlock } from "@/components/FaqBlock";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "For Data Teams — Find the Queries Quietly Running Up Your Bill | CloudVerse",
  description: "Query, dashboard, and dbt-model-level attribution across Snowflake, Databricks, BigQuery, Microsoft Fabric, and Synapse.",
  keywords: ["data team cost optimization", "warehouse cost visibility", "dbt cost attribution", "Snowflake FinOps", "Databricks cost management"],
  alternates: { canonical: "/solutions/data-teams" },
  openGraph: {
    title: "For Data Teams — Find the Queries Running Up Your Bill",
    description: "Query, dashboard, and dbt-model-level attribution across Snowflake, Databricks, BigQuery, and Synapse.",
    url: "/solutions/data-teams",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "CloudVerse for Data Teams" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "For Data Teams — Find the Queries Running Up Your Bill",
    description: "Attribution across Snowflake, Databricks, BigQuery, Microsoft Fabric, and Synapse.",
  },
};

const STATS = [
  { v: "$117.16", l: "full scan detected" },
  { v: "334.6 GB", l: "scanned per query" },
  { v: "6", l: "warehouses supported" },
  { v: "Read-only", l: "by default" },
];

const FAQ = [
  ["Does DataX read our actual data?", "No. DataX reads query history and metadata only, never row contents. Read-only by default."],
  ["Which warehouses are supported?", "Snowflake, Databricks, BigQuery, Microsoft Fabric, Azure Synapse."],
  ["How does it work with dbt?", "DataX attributes costs to dbt model runs and flags high-cost models with optimisation suggestions. Attribution follows the DAG."],
  ["Can data engineers act on recommendations directly?", "Yes. One-click optimisation. All actions are policy-bound and auditable. No finance approval cycle required for routine fixes."],
];

export default function DataTeamsPage() {
  return (
    <>
      <SolutionHero
        eyebrow="For Data Teams"
        h1="Find the Queries Quietly Running Up Your Bill"
        sub="Query, dashboard, and dbt-model-level attribution across Snowflake, Databricks, BigQuery, Microsoft Fabric, and Synapse. Safe automation when you want it."
        accent="#D97706"
        icon={Database}
        platformHref="/platform/datax"
        badges={["Query Attribution", "Pattern Detection", "Predictive Signals", "Safe Automation", "6 Warehouses", "Read-Only by Default"]}
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
          <h2 className="cv-h2 text-cv-ink">The situation data teams are in</h2>
          <p className="cv-body-lg text-cv-ink/80 mt-6">
            Snowflake costs went up again. The data team got a Slack message asking what happened. Forty minutes of log diving later, someone found a query running 334 GB of full table scans 77 times a month. No partition filter. $117 in one query pattern. Nobody knew.
          </p>
          <p className="cv-body-lg text-cv-ink font-medium mt-4">
            DataX finds these automatically. Attribution down to the SQL. The fix included.
          </p>
        </div>
      </section>

      <section className="cv-section bg-cv-surface dark:bg-black">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-10">What data teams unlock with DataX</h2>
          <DataXUnlocks
            items={[
              ["Query attribution", "Every query tied to the user, role, dashboard, model, or job that ran it. When the data team gets blamed for the bill, they can show exactly which workload and which team owns the cost."],
              ["Pattern detection", "Repeated expensive patterns surfaced with rewrite suggestions. DataX groups queries into cost-amplifying patterns, not one-off executions. The problem is usually a handful of patterns running hundreds of times."],
              ["Predictive signals", "Predict warehouse cost spikes from queue depth and pattern shifts before they hit the bill. Most regressions are visible in telemetry before they become a finance conversation."],
              ["Safe automation", "One-click partition, cluster, and right-size fixes. Policy-bound. Auditable. Reversible. Automation in DataX is opt-in, scoped, and logged in full."],
            ]}
          />
        </div>
      </section>

      <section className="cv-section">
        <div className="cv-container">
          <div className="rounded-3xl border border-cv-line/40 dark:bg-[#0D0D0D] p-8 lg:p-12 max-w-4xl">
            <h2 className="cv-h2 text-cv-ink">The $117 finding (real DataX output)</h2>
            <p className="text-cv-ink/80 mt-6">
              A BigQuery SELECT scanning 334.6 GB per query due to missing partition pruning.
            </p>
            <ul className="mt-5 space-y-2 text-cv-ink/85">
              <li>• 0% cache hit rate</li>
              <li>• 77 runs at $1.52 average cost</li>
              <li>• $117.16 total</li>
              <li>• Tagged: full-scan, spiky, fan-out</li>
              <li>• Fix: one-click partition pruning</li>
            </ul>
            <p className="text-cv-ink/80 mt-6 italic">
              This is where hidden spend actually lives. Not in one catastrophic bill. In a pattern nobody noticed until the month-end review.
            </p>
          </div>
        </div>
      </section>

      <section className="cv-section bg-cv-surface dark:bg-black">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-8">Platform that powers this solution</h2>
          <PlatformCards
            items={[
              ["DataX", "Warehouse intelligence", "/platform/datax"],
              ["FinOps Platform", "Multi-cloud cost intelligence", "/platform/finops"],
              ["DevX", "Shift-left cost intelligence", "/platform/devx"],
            ]}
          />
        </div>
      </section>

      <section className="cv-section">
        <div className="cv-container">
          <div className="text-center mb-10">
            <h2 className="cv-h2 text-cv-ink">Data Team Questions Answered</h2>
          </div>
          <FaqBlock items={FAQ.map(([q, a]) => ({ q, a }))} accent="#1664C0" />
        </div>
      </section>

      <ClosingCTA />
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Solutions", href: "/solutions" }, { name: "Data Teams", href: "/solutions/data-teams" }]} />
    </>
  );
}
