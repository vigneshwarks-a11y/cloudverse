import type { Metadata } from "next";
import { Search, Database, Zap, GaugeCircle, Workflow, FileSearch, Snowflake, Activity, Lock } from "lucide-react";
import { ProductHero } from "@/components/product/Hero";
import { SplitMockup } from "@/components/product/Mockup";
import { FeatureShowcase, type FeatureState } from "@/components/product/FeatureShowcase";
import { Capabilities } from "@/components/product/Capabilities";
import { Lifecycle } from "@/components/product/Lifecycle";
import { WhoUsesIt } from "@/components/product/WhoUsesIt";
import { IntegrationsStrip } from "@/components/product/IntegrationsStrip";
import { ExpandInto } from "@/components/product/ExpandInto";
import { FaqBlock } from "@/components/FaqBlock";
import { CTABand } from "@/components/CTABand";
import { MODULES } from "@/lib/modules";

const M = MODULES.datax;

export const metadata: Metadata = {
  title: "DataX — Data Warehouse Cost Intelligence",
  description:
    "Query and pipeline-level cost attribution for Snowflake, Databricks, BigQuery, Fabric, and Synapse. Detected a $117.16 full scan scanning 334.6 GB.",
  alternates: { canonical: "/platform/datax" },
};

const FEATURES: FeatureState[] = [
  { title: "Query pattern detection", desc: "Repeated expensive patterns surfaced with attribution and rewrite suggestions.", mockTitle: "datax.cloudverse.ai/patterns", mockBody: <MockPatterns /> },
  { title: "Full scan flag",          desc: "Any query that bypasses partition pruning or clustering flagged in real time.", mockTitle: "datax.cloudverse.ai/scans", mockBody: <MockFullScan /> },
  { title: "Predictive signal",       desc: "Predict warehouse spikes from query queue and pattern signals before they happen.", mockTitle: "datax.cloudverse.ai/signals", mockBody: <MockSignals /> },
  { title: "Safe automation",         desc: "One-click fixes that respect ownership, scheduling, and downstream contracts.", mockTitle: "datax.cloudverse.ai/automation", mockBody: <MockAutomation /> },
];

const FAQ = [
  { q: "Which warehouses does DataX support?", a: "Snowflake, Databricks, Google BigQuery, Microsoft Fabric, Azure Synapse, and Amazon Redshift. We add new platforms as customer demand drives the roadmap." },
  { q: "Does DataX execute queries against my data?", a: "No. DataX reads query history and metadata only. It never executes queries against your data and never reads row-level contents." },
  { q: "How does the $117.16 full scan number land?", a: "A single BigQuery query ran 77 times averaging 334.6 GB scanned per execution at $1.52 per run — totaling $117.16. DataX flagged the pattern and a one-click partition fix returned scans to ~3 GB." },
  { q: "Can DataX attribute spend back to users or teams?", a: "Yes. Query spend is attributed to the user, role, dashboard, dbt model, or scheduled job that issued it — across all supported warehouses." },
  { q: "Does it work with dbt?", a: "Yes. dbt model lineage is recognised and used to attribute spend at the model and project level." },
  { q: "Will DataX change my warehouse without permission?", a: "Never. Automation requires explicit policy and is fully audited. By default DataX is read-only." },
];

export default function Page() {
  return (
    <>
      <ProductHero
        eyebrow="DataX"
        color={M.color}
        h1={<>Query and pipeline economics <span style={{ color: M.color }}>for the modern warehouse.</span></>}
        sub="Attribute every dollar of warehouse spend to the query, user, dashboard, or model that drove it — across Snowflake, Databricks, BigQuery, Fabric, and Synapse."
        stats={[
          { value: "$117.16", label: "Full scan detected", cite: "BigQuery, 2026" },
          { value: "334.6 GB", label: "Per query" },
          { value: "77 × $1.52", label: "Per run avg" },
          { value: "1-click", label: "Safe automation" },
        ]}
      />

      <SplitMockup
        color={M.color}
        label="Query inspection"
        heading="Find the queries that quietly run up your bill."
        body="DataX inspects every query and surfaces the costly patterns — full scans, unpartitioned reads, runaway loops — with a one-click safe fix when available."
        stat={{ value: "$117.16", label: "Single recurring query · BigQuery" }}
        mockTitle="datax.cloudverse.ai/queries/q_8821"
        mockBody={<MockQuery />}
      />

      <FeatureShowcase
        label="Platform"
        heading="From pattern to prediction to safe fix."
        color={M.color}
        states={FEATURES}
      />

      <Capabilities
        label="Capabilities"
        heading="Warehouse cost intelligence, not just dashboards."
        color={M.color}
        items={[
          { icon: Search,       title: "Query attribution",  desc: "Every query tied to the user, role, dashboard, model, or job that ran it." },
          { icon: FileSearch,   title: "Pattern detection",  desc: "Repeated expensive patterns surfaced with rewrite suggestions." },
          { icon: Database,     title: "Multi-warehouse",    desc: "Snowflake, Databricks, BigQuery, Fabric, Synapse, Redshift." },
          { icon: GaugeCircle,  title: "Predictive signals", desc: "Predict warehouse spikes from query queue and pattern shifts." },
          { icon: Zap,          title: "One-click fixes",    desc: "Partition, cluster, and right-size recommendations applied safely." },
          { icon: Workflow,     title: "dbt-aware",          desc: "Model lineage understood; attribution rolls up to project level." },
          { icon: Snowflake,    title: "Warehouse sizing",   desc: "Right-size warehouses and clusters based on actual workload signals." },
          { icon: Activity,     title: "Realtime monitoring", desc: "Live spend monitoring with anomaly detection across all warehouses." },
          { icon: Lock,         title: "Read-only by default", desc: "No row access. Metadata only. Automation requires explicit policy." },
        ]}
      />

      <Lifecycle
        color={M.color}
        stages={[
          { title: "Inform",   bullets: ["Connect Snowflake / Databricks / BigQuery in minutes", "Query, model, and dashboard-level attribution", "Pattern detection with cost ranking", "Read-only, metadata only"] },
          { title: "Optimize", bullets: ["Partition, cluster, and rewrite suggestions", "Right-size warehouses based on actual workload", "Schedule and queue tuning with payback proof", "dbt model-level recommendations"] },
          { title: "Operate",  bullets: ["Safe automation with policy controls", "Predictive spike alerts with attribution", "Ownership trail for every fix applied", "Spend feeds back into FinOps Platform"] },
        ]}
      />

      <WhoUsesIt
        color={M.color}
        items={[
          { team: "Data",        role: "Data Engineer",     desc: "Gets query-level attribution and safe fixes without leaving the warehouse." },
          { team: "Analytics",   role: "Analytics Engineer", desc: "Sees dbt model cost at PR-review time and ties it back to business value." },
          { team: "Platform",    role: "Data Platform Lead", desc: "Operates warehouses with policy guardrails and continuous right-sizing." },
        ]}
      />

      <IntegrationsStrip
        color={M.color}
        items={["Snowflake", "Databricks", "Google BigQuery", "Microsoft Fabric", "Azure Synapse", "Amazon Redshift", "dbt", "Airflow", "Tableau"]}
      />

      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <div className="max-w-3xl mb-10">
            <div className="cv-label mb-3" style={{ color: M.color }}>FAQ</div>
            <h2 className="cv-h2 text-white">DataX questions, answered.</h2>
          </div>
          <FaqBlock items={FAQ} accent={M.color} />
        </div>
      </section>

      <ExpandInto current="datax" />
      <CTABand heading="See DataX find a $117 query in your warehouse." />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "CloudVerse DataX",
            applicationCategory: "BusinessApplication",
            description: metadata.description,
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
    </>
  );
}

/* ——— Mock UIs ——— */

function MockQuery() {
  return (
    <div>
      <div className="rounded border border-white/10 bg-black/30 p-3 font-mono text-xs text-white/85 mb-3 overflow-x-auto">
        <div className="text-purple-300">SELECT</div>
        <div className="pl-3">customer_id, SUM(amount) AS lifetime_value</div>
        <div className="text-purple-300">FROM</div>
        <div className="pl-3">`prod.events.orders`</div>
        <div className="text-purple-300">WHERE</div>
        <div className="pl-3 text-rose-300/85">DATE(created_at) &gt;= '2025-01-01'  <span className="text-white/45">— bypasses partition</span></div>
        <div className="text-purple-300">GROUP BY</div>
        <div className="pl-3">customer_id</div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-xs">
        <Stat label="Scanned"  v="334.6 GB" />
        <Stat label="Cost/run" v="$1.52" />
        <Stat label="Runs"     v="77" />
      </div>
      <div className="mt-3 rounded border border-cv-amber/40 bg-cv-amber/10 p-3 text-xs">
        <span className="text-cv-amber font-semibold">Total spend on this pattern: $117.16</span>
        <div className="text-white/70 mt-1">One-click fix available: rewrite to use _PARTITIONDATE filter — reduces scan to ~3 GB / run.</div>
      </div>
    </div>
  );
}

function Stat({ label, v }: { label: string; v: string }) {
  return (
    <div className="rounded border border-white/10 p-2.5 bg-white/[0.03]">
      <div className="text-white/55 text-[10px] uppercase tracking-wider">{label}</div>
      <div className="text-white font-display font-semibold mt-0.5 tabular-nums">{v}</div>
    </div>
  );
}

function MockPatterns() {
  return (
    <div className="space-y-2">
      {[
        { name: "Full scan on prod.events.orders", spend: "$117/wk", calls: "77 ×" },
        { name: "Cross-join in marketing.cohorts", spend: "$84/wk", calls: "32 ×" },
        { name: "SELECT * on warehouse vault.fact", spend: "$61/wk", calls: "104 ×" },
        { name: "Unfiltered dbt incremental run", spend: "$48/wk", calls: "14 ×" },
      ].map((p) => (
        <div key={p.name} className="flex items-center justify-between p-3 rounded border border-white/10 bg-white/[0.02]">
          <div className="text-white/85 text-xs">{p.name}</div>
          <div className="flex gap-4 items-center">
            <span className="text-white/55 text-[11px]">{p.calls}</span>
            <span className="text-cv-amber tabular-nums text-xs font-medium">{p.spend}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function MockFullScan() {
  return (
    <div className="font-mono text-xs space-y-1.5">
      <div className="text-white/65"><span className="text-cv-amber">!</span> bigquery · prod.events.orders · 334.6 GB scanned</div>
      <div className="text-white/65"><span className="text-cv-amber">!</span> snowflake · ANALYTICS.WH · 178 GB · no clustering used</div>
      <div className="text-white/65"><span className="text-cv-amber">!</span> databricks · gold.transactions · 92 GB · full table read</div>
      <div className="text-white/65"><span className="text-emerald-400">✓</span> bigquery · marts.user_events · partition pruned · 4.1 GB</div>
      <div className="text-white/65"><span className="text-emerald-400">✓</span> snowflake · DIM_PRODUCT · micro-partition · 0.8 GB</div>
      <div className="mt-3 text-white">Flagged 3 patterns · est. <span className="text-cv-amber font-semibold">$842/wk recoverable</span></div>
    </div>
  );
}

function MockSignals() {
  return (
    <div>
      <div className="text-[11px] text-white/55 uppercase tracking-wider mb-3">Next-24h forecast · ANALYTICS_WH</div>
      <div className="flex items-end gap-1 h-32 mb-3">
        {[18, 22, 19, 24, 28, 35, 48, 62, 71, 64, 58, 52, 49, 56, 68, 82, 76, 64, 51, 38, 28, 21, 18, 16].map((h, i) => (
          <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: i > 14 ? "#D97706" : "#1664C0", opacity: i > 14 ? 0.85 : 0.6 }} />
        ))}
      </div>
      <div className="rounded border border-cv-amber/40 bg-cv-amber/10 p-3 text-xs text-white/85">
        <span className="text-cv-amber font-semibold">Predicted spike at 14:00 UTC</span> — pattern matches dashboard refresh cohort. Recommend warehouse SCALEUP_L → SCALEUP_M.
      </div>
    </div>
  );
}

function MockAutomation() {
  return (
    <div className="space-y-2">
      {[
        { action: "Add partition filter to dashboard `cohorts_v2`", owner: "team-analytics", state: "Pending review" },
        { action: "Right-size warehouse ANALYTICS_WH (L → M)", owner: "data-platform", state: "Applied · saved $940/wk" },
        { action: "Disable scheduled run `legacy_aggregates`", owner: "team-marketing", state: "Approved" },
        { action: "Add cluster key to `events.orders`", owner: "data-platform", state: "Applied · saved $612/wk" },
      ].map((a) => (
        <div key={a.action} className="p-3 rounded border border-white/10 bg-white/[0.02]">
          <div className="flex justify-between gap-3 mb-1">
            <span className="text-white text-xs">{a.action}</span>
            <span className="text-white/55 text-[11px] shrink-0">{a.owner}</span>
          </div>
          <div className="text-cv-amber text-[11px]">{a.state}</div>
        </div>
      ))}
    </div>
  );
}
