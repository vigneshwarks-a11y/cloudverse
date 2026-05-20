import type { Metadata } from "next";
import { Search, FileSearch, Zap, GaugeCircle } from "lucide-react";
import { SolutionHero } from "@/components/solution/SolutionHero";
import { Outcomes } from "@/components/solution/Outcomes";
import { ModulesUsed } from "@/components/solution/ModulesUsed";
import { FaqBlock } from "@/components/FaqBlock";
import { CTABand } from "@/components/CTABand";

export const metadata: Metadata = {
  title: "For Data Teams — CloudVerse",
  description: "Query-level attribution and safe automation for Snowflake, Databricks, BigQuery, Fabric, and Synapse. Spot a $117 recurring query before finance does.",
  alternates: { canonical: "/solutions/data-teams" },
};

const FAQ = [
  { q: "Does DataX read our actual data?", a: "No. DataX reads query history and metadata only — never row contents — and is read-only by default." },
  { q: "Which warehouses are supported?", a: "Snowflake, Databricks, BigQuery, Microsoft Fabric, Azure Synapse, and Amazon Redshift." },
  { q: "How does it work with dbt?", a: "Lineage is recognised — query and model spend rolls up to the dbt model and project level." },
  { q: "Can data engineers act on recommendations directly?", a: "Yes — safe automation is opt-in and policy-bound. Every applied fix has an owner, an audit trail, and quantified payback." },
];

export default function Page() {
  return (
    <>
      <SolutionHero
        eyebrow="For Data Teams"
        h1={<>Find the queries <span className="text-cv-blue-light">quietly running up your bill.</span></>}
        sub="Query, dashboard, and dbt-model-level attribution across Snowflake, Databricks, BigQuery, Fabric, and Synapse — with safe automation when you want it."
        proof={[
          { value: "$117.16", label: "Full scan detected", cite: "BigQuery, 2026" },
          { value: "334.6 GB", label: "Per query" },
          { value: "6", label: "Warehouses supported" },
          { value: "Read-only", label: "By default" },
        ]}
      />

      <Outcomes
        heading="What data teams unlock with DataX."
        items={[
          { icon: Search,      title: "Query attribution",   body: "Every query tied to the user, role, dashboard, model, or job that ran it." },
          { icon: FileSearch,  title: "Pattern detection",   body: "Repeated expensive patterns surfaced with rewrite suggestions." },
          { icon: GaugeCircle, title: "Predictive signals",  body: "Predict warehouse spikes from queue and pattern shifts before they hit." },
          { icon: Zap,         title: "Safe automation",     body: "One-click partition, cluster, and right-size fixes — policy-bound and audited." },
        ]}
      />

      <ModulesUsed keys={["datax", "finops", "devx"]} />

      <section className="cv-section bg-cv-surface">
        <div className="cv-container">
          <div className="max-w-3xl mb-10">
            <div className="cv-label mb-3">FAQ</div>
            <h2 className="cv-h2 text-cv-ink">Data team questions, answered.</h2>
          </div>
          <FaqBlock items={FAQ} />
        </div>
      </section>

      <CTABand heading="See DataX find a $117 query in your warehouse." />
    </>
  );
}
