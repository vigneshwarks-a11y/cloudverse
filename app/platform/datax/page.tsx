import Link from "next/link";
import { ArrowRight, CheckCircle, ChartSquare, Database, MagicStick, ShieldCheck } from "@solar-icons/react";
import type { Metadata } from "next";
import { DEMO_URL } from "@/lib/links";
import WarehouseIntel from "@/components/product/WarehouseIntel";
import { FaqBlock } from "@/components/FaqBlock";
import { ClosingCTA } from "@/components/home/ClosingCTA";
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
  ["Snowflake", "Credits, spillage, clustering, caching"],
  ["Databricks", "DBUs, clusters, shuffle behaviour"],
  ["BigQuery", "Scan economics, slots, reservations"],
  ["Microsoft Fabric", "CU debt, smoothing, throttling"],
  ["Azure Synapse", "DWUs, serverless TB scanned"],
];

const FAQ = [
  ["Does DataX read our actual data?", "No. DataX reads query history and metadata only, never row contents. Read-only by default."],
  ["Which warehouses are supported?", "Snowflake, Databricks, BigQuery, Microsoft Fabric, Azure Synapse."],
  ["How does it work with dbt?", "DataX attributes costs to dbt model runs and flags high-cost models with optimisation suggestions. The attribution follows the DAG."],
  ["Can data engineers act on recommendations directly?", "Yes. One-click optimisation. All actions are policy-bound and auditable. No finance approval cycle required for routine fixes."],
  ["How does DataX pricing work?", "Pricing is calculated automatically after login based on your connected platforms. It reflects your steady-state analytics footprint, not spike volume or alert activity."],
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
                <h1 className="cv-h1 mt-6 leading-[1.25] text-cv-ink">Find the Queries Quietly Running Up Your Bill</h1>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={DEMO_URL} className="cv-btn-primary"><span>Book a Demo</span><ArrowRight weight="Linear" size={16} /></Link>
                  <Link href="/integrations" className="cv-btn-secondary">Explore the Platform</Link>
                </div>
              </div>

              <div className="mt-10 lg:mt-0 lg:max-w-xs xl:max-w-sm shrink-0">
                <p className="cv-body text-cv-ink/70">
                  Query, dashboard, and dbt-model-level attribution across Snowflake, Databricks, BigQuery, Microsoft Fabric, and Synapse. Safe automation when you want it.
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
              Most data teams find out about expensive queries the same way. The monthly bill arrives, it is higher than last month, and everyone starts guessing. The data is somewhere in the query logs. Finding it takes hours. Fixing it takes longer.
            </p>
            <p className="cv-body-lg text-cv-ink/80">
              DataX attributes every dollar of warehouse spend to the query, pipeline, dashboard, and team that ran it. Not to &quot;the data team.&quot; To the specific SELECT that ran 334.6 GB without a partition filter.
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
              ["The $117 full scan", "A BigQuery SELECT scanning 334.6 GB per query due to missing partition pruning. Zero cache hit rate. $117.16 in real cost. Fix: one-click partition pruning."],
              ["The pattern view billing never shows", "DataX groups queries into cost-amplifying patterns, not one-off executions. This query ran 77 times at $1.52 average cost for $117.16 total. 100% scan rate. Tagged full-scan, spiky, fan-out. This is where hidden spend actually lives."],
              ["The high-frequency amplifier", "A query running 77 times a month does not look expensive until the repetition multiplies the cost. DataX detects this automatically. Exact SQL available. Frequency plus cost math explained. Cache and materialisation fixes suggested."],
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
          <h2 className="cv-h2 text-cv-ink mb-5">DataX does not profit from your inefficiency.</h2>
          <p className="cv-body-lg text-cv-ink/75 mb-10">
            DataX prices on the structural drivers of your data platform cost, not on billing noise.
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-cv-line/40 bg-cv-surface dark:bg-[#0D0D0D] p-6">
              <div className="cv-label mb-3">What pricing reflects</div>
              <ul className="space-y-2 text-cv-ink/85 text-sm">
                <li>• Analytics compute footprint: warehouses, clusters, slots, capacities</li>
                <li>• Analytics storage footprint: tables, partitions, datasets</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-cv-line/40 bg-cv-surface dark:bg-[#0D0D0D] p-6">
              <div className="cv-label mb-3">What does not affect pricing</div>
              <ul className="space-y-2 text-cv-ink/80 text-sm">
                <li>• Sudden cost spikes or anomalies</li>
                <li>• Inefficient queries or pipelines</li>
                <li>• Retries, backfills, or bad deployments</li>
                <li>• Alert volume or rule execution</li>
                <li>• Short-term workload regressions</li>
              </ul>
            </div>
          </div>
          <p className="text-cv-ink/75 mt-6">
            These are precisely the problems DataX is designed to detect and prevent. We do not monetize them.
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
            DataX applies approved optimisations within policies you define, and logs every action for audit and rollback.
          </p>
          <p className="text-cv-ink/70 italic mb-10">The automation model is about DataX behaviour, not your pipelines.</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="cv-label mb-3">Controls</div>
              <ul className="space-y-2 text-cv-ink/85">
                <li>• Opt-in policies and scoped permissions</li>
                <li>• Confidence scoring gates execution</li>
                <li>• Approval workflows for higher-risk changes</li>
                <li>• Every action logged with reason, impact, rollback readiness</li>
              </ul>
            </div>
            <div>
              <div className="cv-label mb-3">Automation modes</div>
              <ul className="space-y-2 text-cv-ink/85">
                <li>• Observe only</li>
                <li>• Recommend only</li>
                <li>• Auto-apply safe</li>
                <li>• Approval required</li>
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
                  <th className="p-4 text-cv-ink font-medium">What DataX covers</th>
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
              <li>1. Intent-based onboarding per platform type</li>
              <li>2. Read-only permissions by default</li>
              <li>3. Optional automation permissions — scoped, explicit</li>
              <li>4. Metadata Pulse verifies telemetry before ingest</li>
              <li>5. Least-privilege scripts your security team can audit</li>
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

      <ClosingCTA />
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Platform", href: "/platform/finops" }, { name: "DataX", href: "/platform/datax" }]} />
    </>
  );
}
