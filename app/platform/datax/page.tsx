import Link from "next/link";
import { ArrowRight, CheckCircle, ChartSquare, Database, MagicStick, ShieldCheck } from "@solar-icons/react";
import type { Metadata } from "next";
import { DEMO_URL } from "@/lib/links";
import WarehouseIntel from "@/components/product/WarehouseIntel";
import { FaqBlock } from "@/components/FaqBlock";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { PlatformHeroMockup } from "@/components/product/PlatformHeroMockup";

export const metadata: Metadata = {
  title: "DataX — Find the Queries Quietly Running Up Your Bill | CloudVerse",
  description:
    "Query, dashboard, and dbt-model-level attribution across Snowflake, Databricks, BigQuery, Microsoft Fabric, and Synapse. Safe automation when you want it.",
  keywords: ["Snowflake cost optimization", "Databricks cost management", "BigQuery cost attribution", "warehouse FinOps", "data platform cost", "query cost analysis"],
  alternates: { canonical: "/platform/datax" },
  openGraph: {
    title: "DataX — Find the Queries Quietly Running Up Your Bill",
    description: "Query, dashboard, and dbt-model-level attribution across Snowflake, Databricks, BigQuery, and more. Safe automation when you want it.",
    url: "/platform/datax",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "CloudVerse DataX — Warehouse Cost Intelligence" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DataX — Find the Queries Running Up Your Bill",
    description: "Query-level attribution across Snowflake, Databricks, BigQuery, and Synapse. Automated right-sizing.",
  },
};

const ACCENT = "#D97706";

const DATAX_TABS = [
  { id: "attribution", label: "Query Attribution", copy: "Every dollar of warehouse spend attributed to the query, pipeline, dashboard, and team that ran it.", icon: ChartSquare },
  { id: "warehouse", label: "Warehouse Intel", copy: "Full scan detection, spillage, clustering, and caching analysis across all connected warehouses.", icon: Database },
  { id: "anomaly", label: "Anomaly Detection", copy: "Cost-amplifying patterns detected automatically. Frequency, scan rate, and total cost explained.", icon: MagicStick },
  { id: "automation", label: "Safe Automation", copy: "Approved optimisations applied within your policies. Every action logged, auditable, and reversible.", icon: ShieldCheck },
];

const STATS = [
  { v: "$117.16", l: "full scan detected on a single query pattern" },
  { v: "334.6 GB", l: "scanned per query" },
  { v: "77 runs", l: "at $1.52 average cost" },
  { v: "6", l: "warehouses supported" },
  { v: "Read-only", l: "by default" },
];

const PLATFORMS = [
  ["Snowflake", "Query history, warehouse metering, roles"],
  ["Databricks", "Job and cluster usage, SQL warehouse metering"],
  ["BigQuery", "Job metadata, bytes scanned, reservations"],
  ["Microsoft Fabric", "Capacity and item usage"],
  ["Azure Synapse", "Pool usage and query metadata"],
];

const FAQ = [
  ["Does DataX read our actual data?", "No. It reads metadata only, query history and metering, over a read-only role. Never the contents of a table."],
  ["Which warehouses are supported?", "Snowflake, Databricks, BigQuery, Microsoft Fabric, and Azure Synapse."],
  ["How does dbt attribution work?", "DataX maps spend through the dbt DAG, so cost lands on the model and the owner that caused it."],
  ["Can it take action, or only report?", "Both. Fixes are policy-bound, reversible, and audited. You choose the automation mode."],
  ["What drives AI-related warehouse cost?", "RAG agents and model pipelines that query warehouses at scale. DataX attributes that traffic so AI-driven data cost is finally visible."],
];

export default function DataXPage() {
  return (
    <>
      <div className="cv-hero-bg">
        <section className="pt-[120px] sm:pt-[160px] pb-16 lg:pt-[240px] lg:pb-20 relative">

          <div className="max-w-cv mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-20">
              <div className="flex-1 min-w-0 lg:max-w-xl xl:max-w-2xl">
                <span className="block text-xs font-semibold uppercase tracking-widest text-[#1664C0] dark:text-[#7CB8F8]">
                  DataX
                </span>
                <h1 className="cv-h1 mt-6 leading-[1.25] text-cv-ink">Find the queries quietly running up your bill.</h1>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={DEMO_URL} className="cv-btn-primary"><span>Book a Demo</span><ArrowRight weight="Linear" size={16} /></Link>
                  <Link href="/integrations" className="cv-btn-ghost">Explore the platform</Link>
                </div>
              </div>

              <div className="mt-10 lg:mt-0 lg:max-w-xs xl:max-w-sm shrink-0">
                <p className="cv-body text-cv-ink/70">
                  Trace warehouse and pipeline cost to the query, the dashboard, the dbt model, and the team that ran it, across Snowflake, Databricks, BigQuery, Fabric, and Synapse.
                </p>
              </div>
            </div>
          </div>
        </section>
        <PlatformHeroMockup tabs={DATAX_TABS} />
      </div>

      <section className="pt-8 pb-12 lg:pt-10 lg:pb-16">
        <div className="max-w-cv mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
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
          <h2 className="cv-h2 text-cv-ink">Your data warehouse is a blank check.</h2>
          <div className="mt-6 space-y-4">
            <p className="cv-body-lg text-cv-ink/80">
              Warehouse and pipeline cost scales with how people use it, and it rarely maps back to a team or a product.
            </p>
            <p className="cv-body-lg text-cv-ink/80">
              A single query can scan hundreds of gigabytes and cost more than a server. Run it on a schedule and it compounds, quietly, on someone else&apos;s budget.
            </p>
            <p className="cv-body-lg text-cv-ink font-medium italic">
              Stop waiting for the monthly bill to see who burned the budget.
            </p>
          </div>
        </div>
      </section>

      {/* $117 FINDING */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-3">We find the leaks billing dashboards miss.</h2>
          <p className="text-cv-ink/70 italic mb-10">This is a real DataX finding. Not a mock. Not an illustration.</p>
          <div className="grid md:grid-cols-3 gap-3">
            {[
              ["The $117 full scan", "One query, no partition pruning, scanning everything to return a little."],
              ["The pattern billing never shows", "The same shape of query run 77 times a month, invisible in a total."],
              ["The high-frequency amplifier", "A cheap query on a tight schedule that adds up to real money."],
            ].map(([t, b]) => (
              <div key={t} className="rounded-2xl border border-cv-line/40 bg-cv-surface dark:bg-[#0D0D0D] p-6">
                <h3 className="font-display font-semibold text-cv-ink text-lg" style={{ color: ACCENT }}>{t}</h3>
                <p className="text-sm text-cv-ink/75 mt-3 leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT DATA TEAMS UNLOCK */}
      <WarehouseIntel />

      {/* PRICING PHILOSOPHY */}
      <section className="cv-section bg-cv-surface">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-5">DataX doesn&apos;t profit from your inefficiency.</h2>
          <p className="cv-body-lg text-cv-ink/75 mb-10">
            DataX prices on the structural drivers of your data platform cost, not on billing noise.
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-cv-line/40 bg-cv-surface dark:bg-[#0D0D0D] p-6">
              <div className="cv-label mb-3">What affects pricing</div>
              <ul className="space-y-2 text-cv-ink/85 text-sm">
                <li>• Platforms connected</li>
                <li>• Seats</li>
                <li>• Retention window</li>
                <li>• Automation scope</li>
                <li>• Support tier</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-cv-line/40 bg-cv-surface dark:bg-[#0D0D0D] p-6">
              <div className="cv-label mb-3">What doesn&apos;t</div>
              <ul className="space-y-2 text-cv-ink/80 text-sm">
                <li>• Your total spend</li>
                <li>• How much you waste</li>
                <li>• How many queries you run</li>
                <li>• Warehouse size</li>
                <li>• How much we save you</li>
              </ul>
            </div>
          </div>
          <p className="text-cv-ink/75 mt-6">
            We don&apos;t profit from your inefficiency. What you pay reflects your platform, not your problems.
          </p>
          <p className="text-cv-ink/85 mt-4 italic">
            As your platform becomes more efficient, your cost per unit of work improves without being penalised for growth.
          </p>
        </div>
      </section>

      {/* SAFE AUTOMATION */}
      <section className="cv-section">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-5">Automation without losing control.</h2>
          <p className="cv-body-lg text-cv-ink/75 mb-2">
            DataX applies approved optimisations within the policies you define.
          </p>
          <p className="text-cv-ink/70 italic mb-10">The automation model is about DataX behaviour, not your pipelines.</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="cv-label mb-3">Controls</div>
              <ul className="space-y-2 text-cv-ink/85">
                <li>• Approval gates</li>
                <li>• Scoped permissions</li>
                <li>• Reversible actions</li>
                <li>• Full audit trail</li>
              </ul>
            </div>
            <div>
              <div className="cv-label mb-3">Automation modes</div>
              <ul className="space-y-2 text-cv-ink/85">
                <li>• Off</li>
                <li>• Recommend only</li>
                <li>• Approve then apply</li>
                <li>• Auto within policy</li>
              </ul>
            </div>
          </div>
          <div className="rounded-2xl border border-cv-line/40 bg-cv-surface2 dark:bg-[#0D0D0D] p-6 mt-10">
            <div className="cv-label mb-3">Example audit event</div>
            <p className="text-sm text-cv-ink/85 font-mono leading-relaxed">
              <span className="text-cv-ink/95">Detected:</span> Warehouse Oversizing (Snowflake).<br />
              <span className="text-cv-ink/95">Reason:</span> 95th percentile utilisation under 15% for 7 days.<br />
              <span className="text-cv-ink/95">Action taken:</span> Resized Medium to Small.<br />
              <span className="text-cv-ink/95">Approved by:</span> Auto-Apply (Policy: Safe Optimisation).
            </p>
          </div>
          <p className="text-cv-ink font-medium mt-6 italic">If it was not logged, it did not happen.</p>
        </div>
      </section>

      {/* SUPPORTED PLATFORMS */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-5">Enterprise integrations built for least privilege.</h2>
          <p className="cv-body-lg text-cv-ink/75 mb-10">
            Connect platforms using read-only access by default. Enable automation only when you are ready: scoped, auditable, reversible.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-cv-line">
            <table className="w-full text-sm">
              <thead className="bg-cv-surface dark:bg-[#0D0D0D]">
                <tr className="text-left">
                  <th className="p-4 text-cv-ink font-medium">Platform</th>
                  <th className="p-4 text-cv-ink font-medium">What DataX reads</th>
                </tr>
              </thead>
              <tbody>
                {PLATFORMS.map(([p, b]) => (
                  <tr key={p} className="border-t border-cv-line">
                    <td className="p-4 font-medium text-cv-ink">{p}</td>
                    <td className="p-4 text-cv-ink/75">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-10">
            <div className="cv-label mb-4">Connection model</div>
            <ol className="space-y-2 text-cv-ink/85">
              <li>1. Read-only role</li>
              <li>2. Metadata only, never your data</li>
              <li>3. Scoped to what you approve</li>
              <li>4. Every action logged</li>
              <li>5. Revoke any time</li>
            </ol>
            <p className="text-cv-ink/75 mt-6 max-w-3xl">
              Read-only means read-only. DataX ingests metadata, query logs, and billing telemetry. It never touches your underlying data, workload code, or runtime configuration unless you explicitly grant automation permissions.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {/* FAQ */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="text-center mb-10">
            <h2 className="cv-h2 text-cv-ink">Frequently Asked Questions</h2>
          </div>
          <FaqBlock items={FAQ.map(([q, a]) => ({ q, a }))} accent="#1664C0" />
        </div>
      </section>

      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Platform", href: "/platform/finops" }, { name: "DataX", href: "/platform/datax" }]} />
    </>
  );
}
