import Link from "next/link";
import { ArrowRight, CheckCircle, CloseCircle, Database } from "@solar-icons/react";
import type { Metadata } from "next";
import { DEMO_URL } from "@/lib/links";
import { PlatformCards } from "@/components/solution/PlatformCards";
import { DataXUnlocks } from "@/components/solution/DataXUnlocks";
import { SolutionHero } from "@/components/solution/SolutionHero";
import { WhoThisIsFor } from "@/components/solution/WhoThisIsFor";
import { FaqBlock } from "@/components/FaqBlock";
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
  { v: "334.6 GB", l: "per query" },
  { v: "77 runs", l: "at $1.52" },
  { v: "6", l: "warehouses" },
];

const FAQ = [
  ["Does DataX read our data?", "No. Metadata only, over a read-only role. Never table contents."],
  ["Which warehouses?", "Snowflake, Databricks, BigQuery, Microsoft Fabric, and Azure Synapse."],
  ["How does dbt attribution work?", "Cost is mapped through the dbt DAG to the model and owner that caused it."],
  ["Can it take action?", "Yes, policy-bound: reversible and audited, in the automation mode you choose."],
  ["How does it handle AI-driven data cost?", "It attributes warehouse traffic from RAG agents and model pipelines, so that spend finally has an owner."],
];

export default function DataTeamsPage() {
  return (
    <>
      <SolutionHero
        eyebrow="For Data Teams"
        h1="Make shared data spend allocable."
        sub="Trace warehouse and pipeline cost to the query, the pipeline, and the team that ran it, including the data spend your AI workloads now drive."
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
          <h2 className="cv-h2 text-cv-ink">The situation data teams are in.</h2>
          <p className="cv-body-lg text-cv-ink/80 mt-6">
            Warehouse spend is unpredictable and rarely maps to a team or product. A single unpruned query scans hundreds of gigabytes; run on a schedule, it compounds.
          </p>
          <p className="cv-body-lg text-cv-ink font-medium mt-4">
            And now AI workloads are reading from your warehouses at scale, on budgets that were never sized for them, often from AI-assisted code with no obvious owner. DataX finds these automatically, with attribution down to the SQL.
          </p>
        </div>
      </section>

      {/* WHAT IT'S COSTING YOU TODAY */}
      <section className="cv-section bg-cv-surface dark:bg-black">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-8">What that&apos;s costing you today.</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Data platform spend that surprises you month to month",
              "Warehouse and pipeline cost you can't cleanly attribute to a team or product",
              "A rising share of the bill driven by AI workloads reading from warehouses",
              "Queries from AI-assisted code showing up with no owner",
              "No unit economics for data: cost per pipeline, per query, per dataset",
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
          <h2 className="cv-h2 text-cv-ink mb-10">What data teams unlock with DataX</h2>
          <DataXUnlocks
            items={[
              ["Query attribution", "Every query tied to a user, role, dashboard, dbt model, or job."],
              ["Pattern detection", "Cost-amplifying patterns caught, with a rewrite suggested."],
              ["Predictive signals", "Unit-cost regressions surfaced before monthly close."],
              ["Safe automation", "Partition, cluster, and right-size fixes, reversible and audited."],
            ]}
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="cv-section">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-10">How data teams run it.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              ["Connect", "Connect your warehouses over a read-only role. Metadata only."],
              ["Attribute", "Attribute every query and pipeline to an owner through the dbt DAG."],
              ["Catch", "Catch the patterns and regressions billing dashboards miss."],
              ["Fix", "Fix within policy: reversible, audited, on your approval."],
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

      {/* PROOF */}
      <section className="cv-section bg-cv-surface dark:bg-black">
        <div className="cv-container">
          <div className="rounded-3xl border border-cv-line/40 dark:bg-[#0D0D0D] p-8 lg:p-12">
            <h2 className="cv-h2 text-cv-ink max-w-3xl">From invisible spend to accountable architecture.</h2>
            <p className="text-cv-ink/80 leading-relaxed max-w-3xl mt-6">
              A Southeast Asian digital and telecommunications group ran 129 applications across four clouds with no reliable owner. CloudVerse mapped spend to how the business works and surfaced Rp964.80M in savings before optimization began.
            </p>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="cv-section">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-8">Outcomes you can defend.</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Attribution: warehouse and pipeline cost traced to the query that committed it",
              "Pattern detection: full scans and runaway queries caught before they compound",
              "AI visibility: AI-driven warehouse traffic attributed cleanly",
              "Engineering visibility: data cost committed by code surfaced before the bill",
              "Predictive signals: unit-cost regressions before close, not in the post-mortem",
              "Defendability: data economics that hold up in front of finance and the board",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3 text-cv-ink/85">
                <CheckCircle weight="Linear" size={18} className="text-cv-teal mt-0.5 shrink-0" /> {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="cv-section bg-cv-surface dark:bg-black">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-8">Platform that powers this solution</h2>
          <PlatformCards
            items={[
              ["DataX", "Query attribution, pattern detection, safe automation", "/platform/datax"],
              ["FinOps Platform", "Warehouse spend folded into one allocation model", "/platform/finops"],
              ["AIX", "Attributes the model pipelines and RAG agents driving warehouse load", "/platform/aix"],
            ]}
          />
        </div>
      </section>

      <WhoThisIsFor
        roles={["Head of Data / Chief Data Officer", "VP / Director of Data Engineering", "Head of Analytics / BI", "Data Platform lead / Lakehouse architect"]}
        accent="#D97706"
      />

      <section className="cv-section">
        <div className="cv-container">
          <div className="text-center mb-10">
            <h2 className="cv-h2 text-cv-ink">Data Team Questions Answered</h2>
          </div>
          <FaqBlock items={FAQ.map(([q, a]) => ({ q, a }))} accent="#1664C0" />
        </div>
      </section>

      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Solutions", href: "/solutions" }, { name: "Data Teams", href: "/solutions/data-teams" }]} />
    </>
  );
}
