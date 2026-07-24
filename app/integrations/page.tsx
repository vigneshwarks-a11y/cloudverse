import Link from "next/link";
import { ArrowRight, CheckCircle, Cloud, Database, Cpu, CodeSquare, ChartSquare, UsersGroupRounded, ServerSquare, Server } from "@/lib/solar-icons";
import type { Metadata } from "next";
import type { ComponentType } from "react";
import type { IconProps } from "@solar-icons/react";
import { DEMO_URL } from "@/lib/links";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { CardLightEdge } from "@/components/product/BentoChrome";
import AgentryProvidersMarquee from "@/components/product/AgentryProvidersMarquee";
import IntegrationSteps from "@/components/product/IntegrationSteps";
import IntegrationsCatalog from "@/components/product/IntegrationsCatalog";
import ClosingCtaBand from "@/components/ClosingCtaBand";
import { FaqBlock } from "@/components/FaqBlock";

export const metadata: Metadata = {
  title: "Integrations: Connects to the Stack Your Teams Already Use",
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
        centered
        eyebrow="Integrations"
        accent="blue"
        title={
          <>
            Connects to the stack
            <br />
            <span className="text-cv-blue dark:text-cv-blue-light">your teams already use.</span>
          </>
        }
        subtitle="Add your integration once. CloudVerse handles routing, attribution, and cost tracking across all of them. No code changes when you add a new provider."
        titleClassName="text-[length:clamp(34px,4.8vw,72px)]"
        subtitleClassName="text-[length:clamp(17px,1.4vw,20px)]"
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
        {/* Continue the hero's blue down over the top of this section and fade
            it to transparent, so the hero and this section read as one
            continuous blue band settling into the page base (same treatment
            as the home hero → CustomerLogos). */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[linear-gradient(180deg,rgba(20,71,230,0.24)_0%,rgba(20,71,230,0.08)_42%,transparent_78%)] dark:bg-[linear-gradient(180deg,rgba(20,71,230,0.5)_0%,rgba(20,71,230,0.16)_42%,transparent_78%)]"
        />
        <div className="cv-container relative z-10">
          <SectionHeading title="Every model provider, one endpoint.">
            Route across managed APIs and private deployments without changing your application code.
          </SectionHeading>
          <div className="mt-12 lg:mt-16">
            <AgentryProvidersMarquee />
          </div>
          <p className="mt-14 text-center text-sm italic text-cv-muted">More providers added regularly.</p>
        </div>
      </section>

      {/* INTEGRATIONS DIRECTORY — searchable catalog */}
      <section className="cv-section">
        <div className="cv-container">
          <SectionHeading className="max-w-2xl" eyebrow="Integration directory" title="Browse every connector." />
          <div className="mt-10">
            <IntegrationsCatalog />
          </div>
        </div>
      </section>

      {/* INTEGRATION CATEGORIES — bento */}
      <section className="cv-section">
        <div className="cv-container">
          <SectionHeading className="max-w-2xl" eyebrow="What we connect" title="Every layer of your compute stack, in one place." />
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
          <div className="flex flex-col items-start gap-10">
            <SectionHeading className="w-full" lead eyebrow="Security model" title="Read-only by default. Automation is opt-in.">
              <p>
                CloudVerse connects to your infrastructure using read-only access. It reads metadata, query logs, billing telemetry, and policy signals, and never touches your data or runtime unless you explicitly grant automation permissions.
              </p>
              <Link href="/contact" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cv-blue dark:text-cv-blue-light hover:text-cv-blue-bright hover:underline underline-offset-4 transition-colors">
                Review our security posture <ArrowRight weight="Linear" size={14} />
              </Link>
            </SectionHeading>

            <div className="relative w-full overflow-hidden rounded-2xl border border-cv-line/60 bg-cv-surface2 dark:border-white/10 dark:bg-[#0D0D0D] p-6 lg:p-8">
              <CardLightEdge />
              <div className="relative grid gap-6 sm:grid-cols-3 sm:divide-x sm:divide-cv-line/50 sm:dark:divide-white/10">
                {PERMISSIONS.map(([t, b]) => (
                  <div key={t} className="sm:px-5 sm:first:pl-0 sm:last:pr-0">
                    <div
                      className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg"
                      style={{ color: "#0E9E7A", background: "#0E9E7A1A" }}
                    >
                      <CheckCircle weight="Bold" size={16} />
                    </div>
                    <div className="font-display font-semibold text-cv-ink">{t}</div>
                    <p className="mt-1.5 text-sm leading-relaxed text-cv-ink/70">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENTERPRISE ACCESS — bento */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <SectionHeading className="max-w-2xl" eyebrow="Enterprise-ready" title="Built for enterprise access patterns." />
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
          <div className="flex flex-col items-start gap-10">
            {/* top: eyebrow + heading + body */}
            <SectionHeading className="w-full" lead eyebrow="Private compute" title="Private deployments and GPU infrastructure.">
              Agentry treats private GPU capacity as a first-class routing target alongside managed APIs. If you run models on dedicated hardware or a NeoCloud provider, Agentry routes to them with the same cost and policy logic.
            </SectionHeading>

            {/* below: bordered grid of icon cells — one row, three columns
                (stacks to a single column on mobile) */}
            <div className="w-full overflow-hidden rounded-2xl border border-cv-line/70 divide-y divide-cv-line/70 dark:border-white/10 dark:divide-white/10 sm:grid sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
              {GPU_ITEMS.map(({ title, body, Icon }) => (
                <div key={title} className="flex flex-col items-start px-7 py-7 sm:px-8">
                  <div className="text-cv-blue dark:text-cv-blue-light">
                    <Icon weight="Bold" size={28} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-cv-ink">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-cv-muted">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THREE STEPS */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <SectionHeading className="max-w-2xl" eyebrow="Getting started" title="Three steps to go live." />
          <div className="mt-12">
            <IntegrationSteps />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="cv-section">
        <div className="cv-container">
          <FaqBlock
            items={FAQ.map(([q, a]) => ({ q, a }))}
            accent="#1664C0"
            title="Frequently Asked Questions"
            subtitle="Common questions we get asked the most"
          />
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
