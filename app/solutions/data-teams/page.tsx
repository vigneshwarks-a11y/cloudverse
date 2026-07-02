import Link from "next/link";
import { ArrowRight } from "@solar-icons/react";
import type { Metadata } from "next";
import { DEMO_URL } from "@/lib/links";
import { PlatformCards } from "@/components/solution/PlatformCards";
import { DataXUnlocks } from "@/components/solution/DataXUnlocks";

export const metadata: Metadata = {
  title: "For Data Teams — Find the Queries Quietly Running Up Your Bill | CloudVerse",
  description: "Query, dashboard, and dbt-model-level attribution across Snowflake, Databricks, BigQuery, Microsoft Fabric, and Synapse.",
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
      <section className="cv-hero-bg pt-[240px] pb-16 lg:pt-[240px] lg:pb-24 relative">
        <div className="cv-container relative z-10 max-w-4xl">
          <div className="text-xs uppercase tracking-widest text-cv-muted mb-3">For Data Teams</div>
          <h1 className="cv-h1 text-cv-ink">Find the Queries Quietly Running Up Your Bill</h1>
          <p className="cv-body mt-6 text-cv-ink/75">
            Query, dashboard, and dbt-model-level attribution across Snowflake, Databricks, BigQuery, Microsoft Fabric, and Synapse. Safe automation when you want it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={DEMO_URL} className="cv-btn-primary"><span>Book a Demo</span><ArrowRight weight="Linear" size={16} /></Link>
            <Link href="/platform/datax" className="cv-btn-ghost">Explore the Platform</Link>
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
          <h2 className="cv-h2 text-cv-ink">The situation data teams are in</h2>
          <p className="cv-body-lg text-cv-ink/80 mt-6">
            Snowflake costs went up again. The data team got a Slack message asking what happened. Forty minutes of log diving later, someone found a query running 334 GB of full table scans 77 times a month. No partition filter. $117 in one query pattern. Nobody knew.
          </p>
          <p className="cv-body-lg text-cv-ink font-medium mt-4">
            DataX finds these automatically. Attribution down to the SQL. The fix included.
          </p>
        </div>
      </section>

      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <div className="max-w-3xl mb-10">
            <h2 className="cv-h2 text-cv-ink">What data teams unlock with DataX</h2>
          </div>
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
          <div className="rounded-3xl border border-cv-line bg-cv-surface2 p-8 lg:p-12 max-w-4xl">
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

      <section className="cv-section bg-cv-surface2">
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
        <div className="cv-container max-w-3xl">
          <h2 className="cv-h2 text-cv-ink mb-8">Data team questions answered</h2>
          <div className="space-y-4">
            {FAQ.map(([q, a]) => (
              <details key={q} className="rounded-xl border border-cv-line bg-cv-surface2 p-5">
                <summary className="cursor-pointer font-medium text-cv-ink">{q}</summary>
                <p className="text-cv-ink/75 mt-3 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <div className="rounded-3xl border border-cv-line bg-cv-surface p-10 lg:p-16 text-center">
            <h2 className="cv-h2 text-cv-ink max-w-3xl mx-auto">See DataX find a $117 query in your warehouse.</h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href={DEMO_URL} className="cv-btn-primary"><span>Book a Demo</span><ArrowRight weight="Linear" size={16} /></Link>
              <Link href="/contact" className="cv-btn-ghost">Talk to Sales</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
