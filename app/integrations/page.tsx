import Link from "next/link";
import { IconArrowRight, IconCheck } from "@tabler/icons-react";
import type { Metadata } from "next";
import { DEMO_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Integrations — Connects to the Stack Your Teams Already Use | CloudVerse",
  description: "Add your integration once. CloudVerse handles routing, attribution, and cost tracking across all of them. No code changes when you add a new provider.",
};

const CATEGORIES = [
  ["Cloud providers", "AWS, Microsoft Azure, Google Cloud Platform"],
  ["Data platforms", "Snowflake, Databricks, BigQuery, Microsoft Fabric, Azure Synapse"],
  ["AI providers", "OpenAI, Anthropic, HuggingFace, Mistral AI, Llama/Ollama, Cohere, Together AI, Groq, DeepSeek"],
  ["Code and CI", "GitHub, GitLab, Azure DevOps, GitHub Actions, GitLab CI, Jenkins, Argo"],
  ["APM and telemetry", "OpenTelemetry, Datadog, New Relic, Dynatrace"],
  ["Identity", "Okta, Azure Active Directory, Google Workspace (SSO + SCIM)"],
];

const PROVIDERS = [
  ["OpenAI", "GPT-4o, GPT-4o-mini, GPT-4 Turbo, GPT-3.5 Turbo"],
  ["Anthropic", "Claude 3.5 Sonnet, Claude 3 Haiku, Claude 3 Opus"],
  ["HuggingFace", "Hosted inference endpoints and open models via HuggingFace Hub"],
  ["Mistral AI", "Mistral Large, Mistral Small, Mixtral 8x7B"],
  ["Llama / Ollama", "Meta Llama 3 family via Ollama and compatible deployments"],
  ["Cohere", "Command R, Command R+, reranking endpoints"],
  ["Together AI", "Open model inference at scale"],
  ["Groq", "Ultra-low latency LPU inference"],
  ["DeepSeek", "DeepSeek-V3, DeepSeek-R1"],
];

export default function IntegrationsPage() {
  return (
    <>
      <section className="cv-hero-bg pt-[120px] pb-16 lg:pt-[160px] lg:pb-24 relative">
        <div className="cv-container relative z-10 max-w-4xl">
          <h1 className="cv-h1 text-cv-ink">Connects to the Stack Your Teams Already Use</h1>
          <p className="cv-body-lg mt-6 text-cv-ink/75">
            Add your integration once. CloudVerse handles routing, attribution, and cost tracking across all of them. No code changes when you add a new provider.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={DEMO_URL} className="cv-btn-primary"><span>Set up your integrations</span><IconArrowRight size={16} stroke={1} /></Link>
          </div>
        </div>
      </section>

      {/* SECURITY MODEL */}
      <section className="cv-section">
        <div className="cv-container max-w-4xl">
          <h2 className="cv-h2 text-cv-ink">Read-only by default. Automation is opt-in.</h2>
          <p className="cv-body-lg text-cv-ink/80 mt-6">
            CloudVerse connects to your infrastructure using read-only access. It reads metadata, query logs, billing telemetry, and policy signals. It never touches your underlying data, workload code, or runtime configuration unless you explicitly grant automation permissions.
          </p>
          <p className="cv-body-lg text-cv-ink/80 mt-4">
            Automation permissions are scoped, explicit, and auditable. Every automated action is logged with the reason, the expected impact, and a rollback path.
          </p>
          <div className="cv-label mt-8 mb-3">Permissions model</div>
          <ul className="space-y-3">
            {[
              ["Read-only by default", "metadata, query logs, billing telemetry. Never touches underlying data."],
              ["Automation is opt-in", "explicitly granted, scoped to specific resources, fully auditable."],
              ["Least-privilege scripts", "provided for your security team to review before connection."],
            ].map(([t, b]) => (
              <li key={t} className="flex items-start gap-3 text-cv-ink/85">
                <IconCheck size={18} stroke={1} className="text-cv-teal mt-1 shrink-0" />
                <span><strong className="text-cv-ink">{t}:</strong> {b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* INTEGRATION CATEGORIES */}
      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <div className="max-w-3xl mb-10">
            <h2 className="cv-h2 text-cv-ink">Integration categories</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {CATEGORIES.map(([t, b]) => (
              <div key={t} className="rounded-2xl border border-cv-line bg-cv-surface p-6">
                <h3 className="cv-h3 text-cv-ink">{t}</h3>
                <p className="text-cv-ink/75 mt-3 leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI PROVIDER DETAIL */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="max-w-3xl mb-10">
            <h2 className="cv-h2 text-cv-ink">Supported model providers</h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-cv-line">
            <table className="w-full text-sm">
              <thead className="bg-cv-surface2">
                <tr className="text-left">
                  <th className="p-4 text-cv-ink font-medium w-1/4">Provider</th>
                  <th className="p-4 text-cv-ink font-medium">Models and notes</th>
                </tr>
              </thead>
              <tbody>
                {PROVIDERS.map(([p, n]) => (
                  <tr key={p} className="border-t border-cv-line">
                    <td className="p-4 font-medium text-cv-ink">{p}</td>
                    <td className="p-4 text-cv-ink/75">{n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-cv-muted text-sm mt-4 italic">More providers added regularly.</p>
        </div>
      </section>

      {/* GPU INFRASTRUCTURE */}
      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <div className="max-w-3xl mb-8">
            <h2 className="cv-h2 text-cv-ink">Private deployments and GPU infrastructure.</h2>
          </div>
          <p className="cv-body-lg text-cv-ink/75 max-w-4xl">
            AIX treats private GPU capacity as a first-class routing target alongside managed APIs. If you run models on dedicated hardware or a NeoCloud provider, AIX routes to them with the same cost and policy logic.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Private model deployments: vLLM, TGI, custom inference",
              "GPU providers: CoreWeave, Lambda Labs, RunPod",
              "On-premises infrastructure: your own inference hardware",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3 text-cv-ink/85">
                <IconCheck size={18} stroke={1} className="text-cv-teal mt-0.5 shrink-0" /> {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ENTERPRISE ACCESS */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="max-w-3xl mb-10">
            <h2 className="cv-h2 text-cv-ink">Built for enterprise access patterns.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              ["Private-link available", "No data leaves your VPC."],
              ["Audit logs", "All connection and access activity logged."],
              ["Customer-managed encryption keys", "Available for enterprise accounts."],
              ["Least-privilege onboarding scripts", "Reviewed by your security team before any connection is established."],
              ["Multiple ingestion modes", "Push, pull, and event-driven options depending on platform type."],
            ].map(([t, b]) => (
              <div key={t} className="rounded-2xl border border-cv-line bg-cv-surface2 p-6">
                <h3 className="font-display font-semibold text-cv-ink">{t}</h3>
                <p className="text-sm text-cv-ink/75 mt-2 leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THREE STEPS */}
      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <div className="max-w-3xl mb-10">
            <h2 className="cv-h2 text-cv-ink">Three steps to get started</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              ["Connect providers", "Add API keys and endpoints. Minutes per provider."],
              ["Define constraints", "Set latency, budget, compliance, and provider rules per workload."],
              ["Route through CloudVerse", "Point model calls at the CloudVerse endpoint. Routing handled from there."],
            ].map(([t, b], i) => (
              <div key={t} className="rounded-2xl border border-cv-line bg-cv-surface p-6">
                <div className="text-xs uppercase tracking-widest text-cv-muted">Step 0{i + 1}</div>
                <h3 className="cv-h3 text-cv-ink mt-2">{t}</h3>
                <p className="text-cv-ink/75 mt-3 leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="rounded-3xl border border-cv-line bg-cv-surface2 p-10 lg:p-16 text-center">
            <h2 className="cv-h2 text-cv-ink max-w-3xl mx-auto">Need a connector that is not listed?</h2>
            <p className="cv-body-lg text-cv-ink/75 mt-5 max-w-2xl mx-auto">
              Talk to us. We add integrations based on customer demand.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/contact" className="cv-btn-primary"><span>Talk to Us</span><IconArrowRight size={16} stroke={1} /></Link>
              <Link href="/resources" className="cv-btn-ghost">View Documentation</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
