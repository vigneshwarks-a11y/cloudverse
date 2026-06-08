import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import { DEMO_URL } from "@/lib/links";
import WarehouseIntel from "@/components/product/WarehouseIntel";

export const metadata: Metadata = {
  title: "DataX — Find the Queries Quietly Running Up Your Bill | CloudVerse",
  description:
    "Query, dashboard, and dbt-model-level attribution across Snowflake, Databricks, BigQuery, Microsoft Fabric, and Synapse. Safe automation when you want it.",
};

const ACCENT = "#D97706";

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
      <section className="cv-hero-bg pt-[120px] pb-16 lg:pt-[160px] lg:pb-24 relative">
        <div className="cv-container relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium" style={{ borderColor: `${ACCENT}66`, color: "#F0B254" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
            DataX — Warehouse Intelligence
          </div>
          <h1 className="cv-h1 mt-6 text-cv-ink">Find the Queries Quietly Running Up Your Bill</h1>
          <p className="cv-body-lg mt-6 text-cv-ink/75">
            Query, dashboard, and dbt-model-level attribution across Snowflake, Databricks, BigQuery, Microsoft Fabric, and Synapse. Safe automation when you want it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={DEMO_URL} className="cv-btn-primary"><span>Book a Demo</span><ArrowRight size={16} /></Link>
            <Link href="/integrations" className="cv-btn-ghost">Explore the Platform</Link>
          </div>
        </div>
      </section>

      <section className="border-y border-cv-line bg-cv-surface2/40">
        <div className="cv-container py-8 grid grid-cols-2 lg:grid-cols-5 gap-6">
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
          <h2 className="cv-h2 text-cv-ink">Your data warehouse is a blank check.</h2>
          <p className="cv-body-lg text-cv-ink/80 mt-6">
            Most data teams find out about expensive queries the same way. The monthly bill arrives, it is higher than last month, and everyone starts guessing. The data is somewhere in the query logs. Finding it takes hours. Fixing it takes longer.
          </p>
          <p className="cv-body-lg text-cv-ink/80 mt-4">
            DataX attributes every dollar of warehouse spend to the query, pipeline, dashboard, and team that ran it. Not to &quot;the data team.&quot; To the specific SELECT that ran 334.6 GB without a partition filter.
          </p>
          <p className="cv-body-lg text-cv-ink font-medium mt-4 italic">
            Stop waiting for the monthly bill to see who burned the budget.
          </p>
        </div>
      </section>

      {/* $117 FINDING */}
      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <div className="max-w-3xl mb-10">
            <h2 className="cv-h2 text-cv-ink">We find the leaks billing dashboards miss.</h2>
            <p className="text-cv-ink/70 mt-4 italic">This is a real DataX finding. Not a mock. Not an illustration.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              ["The $117 full scan", "A BigQuery SELECT scanning 334.6 GB per query due to missing partition pruning. Zero cache hit rate. $117.16 in real cost. Fix: one-click partition pruning."],
              ["The pattern view billing never shows", "DataX groups queries into cost-amplifying patterns, not one-off executions. This query ran 77 times at $1.52 average cost for $117.16 total. 100% scan rate. Tagged full-scan, spiky, fan-out. This is where hidden spend actually lives."],
              ["The high-frequency amplifier", "A query running 77 times a month does not look expensive until the repetition multiplies the cost. DataX detects this automatically. Exact SQL available. Frequency plus cost math explained. Cache and materialisation fixes suggested."],
            ].map(([t, b]) => (
              <div key={t} className="rounded-2xl border border-cv-line bg-cv-surface p-6">
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
      <section className="cv-section bg-cv-surface2">
        <div className="cv-container max-w-4xl">
          <h2 className="cv-h2 text-cv-ink">DataX does not profit from your inefficiency.</h2>
          <p className="cv-body-lg text-cv-ink/75 mt-6">
            DataX prices on the structural drivers of your data platform cost, not on billing noise.
          </p>
          <div className="grid md:grid-cols-2 gap-5 mt-8">
            <div className="rounded-2xl border border-cv-line bg-cv-surface p-6">
              <div className="cv-label mb-3">What pricing reflects</div>
              <ul className="space-y-2 text-cv-ink/85 text-sm">
                <li>• Analytics compute footprint: warehouses, clusters, slots, capacities</li>
                <li>• Analytics storage footprint: tables, partitions, datasets</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-cv-line bg-cv-surface p-6">
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
          <div className="max-w-3xl mb-10">
            <h2 className="cv-h2 text-cv-ink">Automation without losing control.</h2>
            <p className="cv-body-lg text-cv-ink/75 mt-5">
              DataX applies approved optimisations within policies you define, and logs every action for audit and rollback.
            </p>
            <p className="text-cv-ink/70 mt-4 italic">The automation model is about DataX behaviour, not your pipelines.</p>
          </div>
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
          <div className="rounded-2xl border border-cv-line bg-cv-surface2 p-6 mt-10">
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
      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <div className="max-w-3xl mb-10">
            <h2 className="cv-h2 text-cv-ink">Enterprise integrations built for least privilege.</h2>
            <p className="cv-body-lg text-cv-ink/75 mt-5">
              Connect platforms using read-only access by default. Enable automation only when you are ready: scoped, auditable, reversible.
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-cv-line">
            <table className="w-full text-sm">
              <thead className="bg-cv-surface">
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
      <section className="cv-section">
        <div className="cv-container max-w-3xl">
          <h2 className="cv-h2 text-cv-ink mb-8">FAQ</h2>
          <div className="space-y-4">
            {FAQ.map(([q, a]) => (
              <details key={q} className="rounded-xl border border-cv-line bg-cv-surface2 p-5 group">
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
            <p className="cv-body-lg text-cv-ink/75 mt-5 max-w-2xl mx-auto">
              Connect your first account in under 30 minutes. Most teams have their first non-obvious finding the same day.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href={DEMO_URL} className="cv-btn-primary"><span>Book a Demo</span><ArrowRight size={16} /></Link>
              <Link href="/contact" className="cv-btn-ghost">Talk to Sales</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
