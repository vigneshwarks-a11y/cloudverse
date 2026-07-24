import type { Metadata } from "next";
import { DOCS } from "@/lib/links";
import { Layers, MagicStick3, Graph, Database } from "@/lib/solar-icons";
import { PlatformCards } from "@/components/solution/PlatformCards";
import { RelatedSolutions } from "@/components/solution/RelatedSolutions";
import { DataXUnlocks } from "@/components/solution/DataXUnlocks";
import { WorkflowHero } from "@/components/solution/WorkflowHero";
import { SectionGlow } from "@/components/solution/SectionGlow";
import { DataXAttributionMock } from "@/components/solution/DataXAttributionMock";
import { SituationConnectorMock, type SituationPickItem } from "@/components/solution/SituationConnectorMock";
import { SolutionHero } from "@/components/solution/SolutionHero";
import { HeroBlend } from "@/components/solution/HeroBlend";
import { SectionEyebrow } from "@/components/solution/SectionEyebrow";
import { SectionHeading } from "@/components/SectionHeading";
import { BulletGrid } from "@/components/solution/BulletGrid";
import { WhoThisIsFor } from "@/components/solution/WhoThisIsFor";
import { FaqBlock } from "@/components/FaqBlock";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "For Data Teams: Make Shared Data Spend Allocable",
  description: "Trace warehouse and pipeline cost to the query, dashboard, and dbt model across Snowflake, Databricks, BigQuery, Microsoft Fabric, and Synapse, including the spend your AI workloads drive.",
  keywords: ["data team cost optimization", "warehouse cost visibility", "dbt cost attribution", "Snowflake FinOps", "Databricks cost management"],
  alternates: { canonical: "/solutions/data-teams" },
  openGraph: {
    title: "For Data Teams: Make Shared Data Spend Allocable",
    description: "Query, dashboard, and dbt-model-level attribution across Snowflake, Databricks, BigQuery, and Synapse.",
    url: "/solutions/data-teams",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "CloudVerse for Data Teams" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "For Data Teams: Make Shared Data Spend Allocable",
    description: "Attribution across Snowflake, Databricks, BigQuery, Microsoft Fabric, and Synapse.",
  },
};

const DATAX_TEAMS: SituationPickItem[] = [
  { label: "Data Engineering", Icon: Database, bg: "#0E9E7A" },
  { label: "AI agent workload", Icon: MagicStick3, bg: "#D9A404", active: true },
  { label: "Analytics", Icon: Graph, bg: "#2E5CF0" },
  { label: "Unowned", Icon: Layers, bg: "#94969C" },
];

const COSTS = [
  "Data platform spend that surprises you month to month.",
  "Warehouse and pipeline cost you can't cleanly attribute to a team or product.",
  "A rising share of the bill driven by AI workloads reading from warehouses.",
  "Queries from AI-assisted code showing up with no owner.",
  "No unit economics for data: cost per pipeline, per query, per dataset.",
];

const OUTCOMES = [
  "Attribution: warehouse and pipeline cost traced to the query that committed it.",
  "Pattern detection: full scans and runaway queries caught before they compound.",
  "AI visibility: AI-driven warehouse traffic attributed cleanly.",
  "Engineering visibility: data cost committed by code surfaced before the bill.",
  "Predictive signals: unit-cost regressions before close, not in the post-mortem.",
  "Defendability: data economics that hold up in front of finance and the board.",
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
        accent="amber"
        h1={
          <>
            Make shared data spend
            <br />
            <span className="text-[#D97706] dark:text-[#F0B366]">allocable.</span>
          </>
        }
        sub="Trace warehouse and pipeline cost to the query, the pipeline, and the team that ran it, including the data spend your AI workloads now drive."
        platformHref="/platform/datax"
      />

      <section className="relative overflow-hidden cv-section">
        <HeroBlend />
        <div className="cv-container relative z-10">
          <div className="flex flex-col items-start gap-10">
            <SectionHeading lead eyebrow="The situation" title="One unpruned query, times seventy-seven a month.">
              <p className="cv-body-lg text-cv-ink/80">
                Warehouse spend is unpredictable and rarely maps to a team or product. A single unpruned query scans hundreds of gigabytes; run on a schedule, it compounds.
              </p>
              <p className="cv-body-lg text-cv-ink font-medium mt-4">
                And now AI workloads are reading from your warehouses at scale, on budgets that were never sized for them, often from AI-assisted code with no obvious owner. DataX finds these automatically, with attribution down to the SQL.
              </p>
            </SectionHeading>
            <SituationConnectorMock
              leftHeading="Query"
              leftValue="SELECT * FROM orders"
              attributeHeading="Data scanned"
              attributeValue="334.6 GB · ×77 this month"
              connectorLabel="Attributed to"
              rightHeading="Team"
              rightSearchPlaceholder="Was unowned…"
              items={DATAX_TEAMS}
            />
          </div>
        </div>
      </section>

      {/* WHAT IT'S COSTING YOU TODAY */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <div className="max-w-2xl mb-8 text-left">
            <SectionEyebrow className="mb-4">The cost of the gap</SectionEyebrow>
            <h2 className="cv-h2 text-cv-ink">What unattributed data spend costs you.</h2>
          </div>
          <BulletGrid items={COSTS} tone="negative" />
        </div>
      </section>

      {/* WHAT YOU SHIP */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="max-w-2xl mb-10 text-left">
            <SectionEyebrow className="mb-4">What you ship</SectionEyebrow>
            <h2 className="cv-h2 text-cv-ink">What DataX does for data teams.</h2>
          </div>
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
      <section className="cv-section relative overflow-hidden bg-cv-surface2 dark:bg-black">
        <SectionGlow />
        <div className="cv-container relative z-10">
          <SectionHeading lead eyebrow="How it works" title={<>How DataX controls<br />every warehouse dollar.</>} className="mb-8" docsHref={DOCS.dataPlatform}>
            <div className="space-y-4">
              <p className="cv-body-lg text-cv-muted">
                DataX sits alongside your warehouses read-only, attributes every query's cost to an owner through the dbt DAG, and applies the fix once you approve it.
              </p>
              <p className="cv-body-lg text-cv-muted">
                A cost explorer shows the spend. DataX shows who caused it, and what to do next.
              </p>
            </div>
          </SectionHeading>
          <WorkflowHero className="mt-12 lg:mt-16" />
        </div>
      </section>

      {/* CUSTOMER PROOF — anonymized SEA case (proof bank §4.3) */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
            <div className="text-left">
              <SectionEyebrow className="mb-4">Customer proof</SectionEyebrow>
              <h2 className="cv-h2 text-cv-ink">From invisible spend to accountable architecture.</h2>
            </div>
            <div className="text-left">
              <p className="leading-relaxed text-cv-ink/80">
                A Southeast Asian digital and telecommunications group ran 129 applications across four clouds with no reliable owner. CloudVerse mapped spend to how the business works and surfaced Rp964.80M in savings before optimization began.
              </p>
              <div className="mt-8 flex flex-wrap gap-6">
                <div>
                  <div className="font-mono text-2xl font-bold tracking-tight text-cv-ink">Rp964.80M</div>
                  <p className="mt-1 text-xs text-cv-muted">surfaced before optimization</p>
                </div>
                <div className="hidden sm:block w-px self-stretch bg-cv-line/50" />
                <div>
                  <div className="font-mono text-2xl font-bold tracking-tight text-cv-ink">129</div>
                  <p className="mt-1 text-xs text-cv-muted">applications mapped</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 w-full">
            <DataXAttributionMock />
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <div className="max-w-2xl mb-8 text-left">
            <SectionEyebrow className="mb-4">Outcomes</SectionEyebrow>
            <h2 className="cv-h2 text-cv-ink">Outcomes you can defend.</h2>
          </div>
          <BulletGrid items={OUTCOMES} tone="positive" />
        </div>
      </section>

      {/* PLATFORM */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="max-w-2xl mb-8 text-left">
            <SectionEyebrow className="mb-4">Platform</SectionEyebrow>
            <h2 className="cv-h2 text-cv-ink">The modules behind attribution.</h2>
          </div>
          <PlatformCards
            items={[
              ["DataX", "Query attribution, pattern detection, safe automation", "/platform/datax"],
              ["FinOps Platform", "Warehouse spend folded into one allocation model", "/platform/finops"],
              ["Agentry", "Attributes the model pipelines and RAG agents driving warehouse load", "/platform/agentry"],
            ]}
          />
        </div>
      </section>

      <WhoThisIsFor
        accent="#D97706"
        heading="Who this is for."
        subhead="The people who answer for the data bill."
        personas={[
          {
            role: "Head of Data / Chief Data Officer",
            category: "Data leadership",
            quote: "Warehouse spend finally maps to the team and product that drove it, not a shared line item.",
          },
          {
            role: "VP / Director of Data Engineering",
            category: "Data engineering",
            quote: "Full scans and runaway queries get caught before they compound, not at monthly close.",
          },
          {
            role: "Head of Analytics / BI",
            category: "Analytics",
            quote: "Dashboard and query cost traced back to the report that's actually driving the bill.",
          },
          {
            role: "Data Platform lead / Lakehouse architect",
            category: "Platform engineering",
            quote: "Attribution runs through the dbt DAG automatically, no manual tagging to maintain.",
          },
        ]}
      />

      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <FaqBlock
            items={FAQ.map(([q, a]) => ({ q, a }))}
            title="Data team questions, answered."
            subtitle="What data and analytics leads ask first."
          />
        </div>
      </section>

      <RelatedSolutions current="/solutions/data-teams" />

      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Solutions", href: "/solutions" }, { name: "Data Teams", href: "/solutions/data-teams" }]} />
    </>
  );
}
