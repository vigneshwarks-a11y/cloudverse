import Link from "next/link";
import { ArrowRight, CheckCircle, ShieldCheck, Cloud, Database, Cpu, CodeSquare, ChartSquare, UsersGroupRounded, ServerSquare, Server } from "@/lib/solar-icons";
import type { Metadata } from "next";
import type { ComponentType } from "react";
import type { IconProps } from "@solar-icons/react";
import { DEMO_URL } from "@/lib/links";
import { PageHero } from "@/components/PageHero";
import AgentryProvidersMarquee from "@/components/product/AgentryProvidersMarquee";
import IntegrationSteps from "@/components/product/IntegrationSteps";
import IntegrationsCatalog from "@/components/product/IntegrationsCatalog";
import ClosingCtaBand from "@/components/ClosingCtaBand";
import { FaqBlock } from "@/components/FaqBlock";

export const metadata: Metadata = {
  title: "Integrations: Connects to the Stack Your Teams Already Use | CloudVerse",
  description: "Add your integration once. CloudVerse handles routing, attribution, and cost tracking across all of them. No code changes when you add a new provider.",
  keywords: ["cloud integrations", "AWS integration", "Snowflake integration", "OpenAI cost tracking", "cloud provider connectors"],
  alternates: { canonical: "/integrations" },
  openGraph: {
    title: "CloudVerse Integrations: Connects to Your Entire Stack",
    description: "Add your integration once. CloudVerse handles routing, attribution, and cost tracking across all of them.",
    url: "/integrations",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "CloudVerse Integrations" }],
  },
  twitter: { card: "summary_large_image", title: "CloudVerse Integrations", description: "Connect once. CloudVerse handles routing, attribution, and cost tracking across your entire stack." },
};

type Category = { title: string; body: string; Icon: ComponentType<IconProps> };

const CATEGORIES: Category[] = [
  { title: "Cloud providers", body: "AWS, Microsoft Azure, Google Cloud Platform", Icon: Cloud },
  { title: "Data platforms", body: "Snowflake, Databricks, BigQuery, Microsoft Fabric, Azure Synapse", Icon: Database },
  { title: "AI providers", body: "OpenAI, Anthropic, HuggingFace, Mistral, Llama/Ollama, Cohere, Together AI, Groq, DeepSeek", Icon: Cpu },
  { title: "Code and CI", body: "GitHub, GitLab, Azure DevOps, GitHub Actions, GitLab CI, Jenkins, Argo", Icon: CodeSquare },
  { title: "APM and telemetry", body: "OpenTelemetry, Datadog, New Relic, Dynatrace", Icon: ChartSquare },
  { title: "Identity", body: "Okta, Azure Active Directory, Google Workspace (SSO + SCIM)", Icon: UsersGroupRounded },
];

const PERMISSIONS: [string, string][] = [
  ["Read-only by default", "Metadata, query logs, and billing telemetry. Never touches your underlying data, workload code, or runtime configuration."],
  ["Automation is opt-in", "Explicitly granted, scoped to specific resources, and fully auditable. Every action is logged with its reason, impact, and rollback path."],
  ["Least-privilege scripts", "Provided for your security team to review before any connection is established."],
];

const ENTERPRISE: [string, string][] = [
  ["Private-link available", "No data leaves your VPC."],
  ["Audit logs", "All connection and access activity logged."],
  ["Customer-managed keys", "Bring your own encryption keys on enterprise accounts."],
  ["Least-privilege onboarding", "Reviewed by your security team before any connection is established."],
  ["Multiple ingestion modes", "Push, pull, and event-driven options depending on platform type."],
];

const GPU_ITEMS: { title: string; body: string; Icon: ComponentType<IconProps> }[] = [
  { title: "Private model deployments", body: "vLLM, TGI, and custom inference servers.", Icon: ServerSquare },
  { title: "GPU providers", body: "CoreWeave, Lambda Labs, and RunPod.", Icon: Cpu },
  { title: "On-premises infrastructure", body: "Your own dedicated inference hardware.", Icon: Server },
];

const FAQ: [string, string][] = [
  ["How long does setup take?", "Most connections take 15–30 minutes depending on the ingestion method. Cloud and AI providers are usually the fastest; enterprise integrations with private networking may take longer to review and approve."],
  ["What permissions do you require?", "Read-only by default, scoped to billing and usage telemetry wherever possible. CloudVerse never touches your underlying data, workload code, or runtime configuration. Automation is opt-in, scoped to specific resources, and fully logged."],
  ["Do you support multi-account and multi-org setups?", "Yes. CloudVerse supports enterprise hierarchies and tenancy boundaries across multiple accounts, subscriptions, and projects, with allocation dimensions that map to how your organization is structured."],
  ["Can we use exports instead of APIs?", "Yes. Billing exports are supported when direct APIs aren't available. We offer multiple ingestion modes — push, pull, and event-driven — depending on the platform type."],
  ["Do integrations affect production performance?", "No. Connections are read-only and designed to be low-overhead. They ingest metadata, query logs, and billing telemetry without touching your workload code or runtime."],
  ["What if the connector we need isn't listed?", "Talk to us. We add integrations based on customer demand, and least-privilege connection scripts are provided for your security team to review before anything goes live."],
];

export default function IntegrationsPage() {
  return (
    <>
      {/* HERO */}
      <PageHero
        eyebrow="Integrations"
        accent="blue"
        title={
          <>
            Connects to the stack{" "}
            <span className="text-cv-blue dark:text-cv-blue-light">your teams already use.</span>
          </>
        }
        subtitle="Add your integration once. CloudVerse handles routing, attribution, and cost tracking across all of them. No code changes when you add a new provider."
        actions={
          <>
            <Link href={DEMO_URL} className="cv-btn-primary">
              <span>Set up your integrations</span>
              <ArrowRight weight="Linear" size={16} />
            </Link>
            <Link href="/contact" className="cv-btn-ghost">
              Request a connector
            </Link>
          </>
        }
      >
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-2 text-xs text-cv-muted">
            <CheckCircle weight="Linear" size={13} className="text-cv-teal shrink-0" />
            Read-only by default. Automation is opt-in, scoped, and logged.
          </div>
        </div>
      </PageHero>

      {/* AI PROVIDERS — reuse the home marquee design */}
      <section className="cv-section relative overflow-hidden bg-cv-surface2 dark:bg-black">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[32rem]"
          style={{ background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(22,100,192,0.16), transparent 70%)" }}
        />
        <div className="cv-container relative z-10">
          <div className="text-center">
            <h2 className="cv-h2 text-cv-ink mx-auto max-w-2xl">Every model provider, one endpoint.</h2>
            <p className="mt-5 cv-body text-cv-ink/70 max-w-lg mx-auto">
              Route across managed APIs and private deployments without changing your application code.
            </p>
          </div>
          <AgentryProvidersMarquee />
          <p className="mt-14 text-center text-sm italic text-cv-muted">More providers added regularly.</p>
        </div>
      </section>

      {/* INTEGRATIONS DIRECTORY — searchable catalog */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="cv-label mb-4">Integration directory</p>
            <h2 className="cv-h2 text-cv-ink">Browse every connector.</h2>
          </div>
          <div className="mt-10">
            <IntegrationsCatalog />
          </div>
        </div>
      </section>

      {/* INTEGRATION CATEGORIES — bento */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="cv-label mb-4">What we connect</p>
            <h2 className="cv-h2 text-cv-ink">Every layer of your compute stack, in one place.</h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map(({ title, body, Icon }) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-cv-line/60 bg-cv-surface p-6 shadow-sm shadow-black/[0.04] ring-1 ring-transparent transition-colors hover:border-cv-blue/40 dark:bg-[#0D0D0D] lg:p-8"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full blur-3xl"
                  style={{ background: "radial-gradient(circle, rgba(34,120,224,0.16), transparent 70%)" }}
                />
                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1664C0]/12 text-[#1664C0] dark:bg-[#7CB8F8]/15 dark:text-[#7CB8F8]">
                    <Icon weight="Linear" size={22} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-cv-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cv-muted">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY / PERMISSIONS MODEL */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="flex flex-col items-center gap-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="cv-label mb-4">Security model</p>
              <h2 className="cv-h2 text-cv-ink">Read-only by default. Automation is opt-in.</h2>
              <p className="cv-body-lg text-cv-ink/75 mt-6">
                CloudVerse connects to your infrastructure using read-only access. It reads metadata, query logs, billing telemetry, and policy signals, and never touches your data or runtime unless you explicitly grant automation permissions.
              </p>
              <Link href="/contact" className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-cv-blue dark:text-cv-blue-light hover:text-cv-blue-bright hover:underline underline-offset-4 transition-colors">
                Review our security posture <ArrowRight weight="Linear" size={14} />
              </Link>
            </div>

            <div className="mx-auto w-full max-w-2xl rounded-2xl border border-cv-line/60 bg-cv-surface2 dark:bg-[#0D0D0D] p-6 lg:p-8">
              <div className="mb-5 flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1664C0]/12 text-[#1664C0] dark:bg-[#7CB8F8]/15 dark:text-[#7CB8F8]">
                  <ShieldCheck weight="Bold" size={18} />
                </div>
                <span className="font-display font-semibold text-cv-ink">Permissions model</span>
              </div>
              <ul className="divide-y divide-cv-line/60">
                {PERMISSIONS.map(([t, b]) => (
                  <li key={t} className="flex items-start gap-3 py-4 first:pt-0 last:pb-0">
                    <CheckCircle weight="Linear" size={18} className="mt-0.5 shrink-0 text-cv-teal" />
                    <span className="text-sm leading-relaxed text-cv-ink/80">
                      <strong className="font-semibold text-cv-ink">{t}:</strong> {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ENTERPRISE ACCESS — bento */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="cv-label mb-4">Enterprise-ready</p>
            <h2 className="cv-h2 text-cv-ink">Built for enterprise access patterns.</h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ENTERPRISE.map(([t, b]) => (
              <div key={t} className="rounded-2xl border border-cv-line/60 bg-cv-surface dark:bg-[#0D0D0D] p-6 lg:p-8">
                <CheckCircle weight="Bold" size={20} className="text-[#1664C0] dark:text-[#7CB8F8]" />
                <h3 className="mt-4 font-display font-semibold text-cv-ink">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cv-muted">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRIVATE DEPLOYMENTS + GPU */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="flex flex-col items-center gap-10">
            {/* top: eyebrow + heading + body */}
            <div className="mx-auto max-w-2xl text-center">
              <p className="cv-label mb-4">Private compute</p>
              <h2 className="cv-h2 text-cv-ink">Private deployments and GPU infrastructure.</h2>
              <p className="cv-body-lg text-cv-ink/75 mt-6">
                Agentry treats private GPU capacity as a first-class routing target alongside managed APIs. If you run models on dedicated hardware or a NeoCloud provider, Agentry routes to them with the same cost and policy logic.
              </p>
            </div>

            {/* below: bordered grid of icon-cell rows */}
            <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-cv-line/70 divide-y divide-cv-line/70 dark:border-white/10 dark:divide-white/10">
              {GPU_ITEMS.map(({ title, body, Icon }) => (
                <div key={title} className="grid grid-cols-[auto_1fr] items-stretch">
                  <div className="flex items-center justify-center border-r border-cv-line/70 px-7 py-6 text-cv-blue dark:border-white/10 dark:text-cv-blue-light sm:px-9">
                    <Icon weight="Bold" size={28} />
                  </div>
                  <div className="px-6 py-6 sm:px-8">
                    <h3 className="font-display text-lg font-semibold text-cv-ink">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-cv-muted">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THREE STEPS */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="cv-label mb-4">Getting started</p>
            <h2 className="cv-h2 text-cv-ink">Three steps to go live.</h2>
          </div>
          <div className="mt-12">
            <IntegrationSteps />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="text-center mb-10">
            <h2 className="cv-h2 text-cv-ink">Frequently Asked Questions</h2>
          </div>
          <FaqBlock items={FAQ.map(([q, a]) => ({ q, a }))} accent="#1664C0" />
        </div>
      </section>

      {/* FINAL CTA — closing band (replaces the global one on this page) */}
      <ClosingCtaBand
        heading="Need a connector that is not listed?"
        subtext="Talk to us. We add integrations based on customer demand."
        primaryLabel="Talk to Us"
        primaryHref="/contact"
        secondaryLabel="View Documentation"
        secondaryHref="/resources"
      />
    </>
  );
}
