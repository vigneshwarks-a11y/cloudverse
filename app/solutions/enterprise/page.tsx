import type { Metadata } from "next";
import { Server2, Cpu, Database, LockKeyhole, ShieldCheck, ListCheck, Wallet } from "@solar-icons/react";
import { EnterpriseDayOne } from "@/components/solution/EnterpriseDayOne";
import { HowItWorksFlow, type FlowChip, type FlowWorkload, type FlowRightNode } from "@/components/solution/HowItWorksFlow";
import { Panel, VIZ_RED } from "@/components/solution/CardChrome";
import { PlatformCards } from "@/components/solution/PlatformCards";
import { SolutionHero } from "@/components/solution/SolutionHero";
import { SectionEyebrow } from "@/components/solution/SectionEyebrow";
import { BulletGrid } from "@/components/solution/BulletGrid";
import { WhoThisIsFor } from "@/components/solution/WhoThisIsFor";
import { FaqBlock } from "@/components/FaqBlock";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "For Enterprise: One Control Plane for Multi-Cloud, AI Infrastructure, and Data Economics | CloudVerse",
  description: "SSO, SCIM provisioning, granular RBAC, audit logs, customer-managed encryption keys, and the procurement options the office of the CIO expects.",
  keywords: ["enterprise cloud cost management", "multi-cloud governance", "enterprise FinOps", "SSO cloud platform", "RBAC cloud cost", "CIO cloud economics"],
  alternates: { canonical: "/solutions/enterprise" },
  openGraph: {
    title: "For Enterprise: One Control Plane for Multi-Cloud, AI and Data Economics",
    description: "SSO, SCIM, granular RBAC, audit logs, customer-managed encryption keys, and the procurement options the CIO expects.",
    url: "/solutions/enterprise",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "CloudVerse for Enterprise" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "For Enterprise: One Control Plane for Multi-Cloud Economics",
    description: "SSO, SCIM, RBAC, audit logs, and enterprise procurement options. Built for the CIO's office.",
  },
};

const COSTS = [
  "Four disconnected tools instead of one view of the estate",
  "Cost decisions made in engineering, AI ops, or data with no line of sight",
  "AI changing the operational shape faster than governance keeps up",
  "Chargeback and showback that don't hold across business units",
  "No single owner accountable for the total",
];

const OUTCOMES = [
  "Operational control: cloud, AI, data, and engineering from one control plane",
  "Engineering visibility: cost context at the point changes are made",
  "AI governance: AI folded into the operating picture, not run as an exception",
  "Cross-team picture: decisions in one team and the spend they commit in another, connected",
  "Forecasting: forecasts and capacity planning that hold as AI reshapes the estate",
  "Accountability: one view the CIO owns, with chargeback that holds across business units",
];

const HOW_IT_WORKS_WORKLOADS: FlowWorkload[] = [
  { label: "Cloud Spend", sub: "AWS, Azure, GCP & more", color: "#1664C0", Icon: Server2 },
  { label: "AI & GPU Spend", sub: "Every provider & pool", color: "#6954D4", Icon: Cpu },
  { label: "Data & Warehouse Spend", sub: "Every query & pipeline", color: "#0E9E7A", Icon: Database },
];

const HOW_IT_WORKS_CHIPS: FlowChip[] = [
  { label: "SSO & RBAC", color: "#1664C0", Icon: LockKeyhole },
  { label: "Policy & Residency", color: "#D97706", Icon: ShieldCheck },
  { label: "Audit Trail", color: "#0E9E7A", Icon: ListCheck },
  { label: "Chargeback Model", color: "#6954D4", Icon: Wallet },
];

const HOW_IT_WORKS_RIGHT: FlowRightNode[] = [
  { kind: "logo", src: "/icons/aws.svg", name: "AWS" },
  { kind: "logo", src: "/icons/azure.svg", name: "Azure" },
  { kind: "logo", src: "/icons/googlecloud.svg", name: "Google Cloud" },
  { kind: "logo", src: "/icons/openai.svg", name: "OpenAI", invert: true },
  { kind: "logo", src: "/icons/snowflake.svg", name: "Snowflake" },
  { kind: "logo", src: "/icons/kubernetes.svg", name: "Kubernetes" },
];

const FAQ = [
  ["What controls ship for enterprise?", "SSO, SCIM, RBAC, audit logs, data residency, and customer-managed encryption keys."],
  ["Where is our data stored?", "In the region you choose (US, EU, APAC), with private-link and VPC options."],
  ["Do you support air-gapped or on-prem?", "Private GPU and on-prem inference are first-class in AIX; deployment options are available."],
  ["How does procurement work?", "Redeem committed cloud spend through marketplace listings."],
  ["What does rollout look like?", "Read-only connection in under 30 minutes, then a phased, no-fee proof of value over two to four weeks."],
];

export default function EnterprisePage() {
  return (
    <>
      <SolutionHero
        eyebrow="For Enterprise"
        h1="One control plane for multi-cloud, AI, and data economics."
        sub="Cloud, AI, data, and engineering are one estate. Govern it from one place, with SSO, SCIM, RBAC, audit logs, and encryption built in."
        platformHref="/platform/finops"
        primaryLabel="Talk to our enterprise team"
        primaryHref="/contact"
      />

      {/* THE PROBLEM */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-stretch lg:gap-16">
            <div>
              <SectionEyebrow className="mb-4">The situation</SectionEyebrow>
              <h2 className="cv-h2 text-cv-ink">The situation CIOs and CTOs are in.</h2>
              <p className="cv-body-lg text-cv-ink/80 mt-6">
                Cloud, AI, data, and engineering each sit in a separate tool, and cost decisions get made in places you don&apos;t have line of sight to. AI is reshaping the operational picture faster than governance can keep up.
              </p>
              <p className="cv-body-lg text-cv-ink/85 mt-4">
                Chargeback and showback creak across business units. No one owns the total, day to day. One control plane is how you take it back.
              </p>
            </div>
            <div className="flex">
              <Panel className="justify-between p-6" chrome="enterprise.app/situation">
                <span className="text-[10px] uppercase tracking-wide text-cv-muted">Four tools, four totals</span>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["Cloud console", "$1.2M"],
                    ["AI platform", "$310k"],
                    ["Data warehouse", "$180k"],
                    ["DevOps tool", "$95k"],
                  ].map(([label, amt]) => (
                    <div key={label} className="rounded-md border border-dashed border-cv-line/60 px-3.5 py-4 text-xs dark:border-white/15">
                      <div className="text-cv-ink/55">{label}</div>
                      <div className="mt-1 font-mono font-semibold text-cv-ink/80">{amt}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-3 rounded-md px-3.5 py-4 text-xs" style={{ background: `${VIZ_RED}12` }}>
                  <span className="min-w-0 flex-1" style={{ color: VIZ_RED }}>No single reconciled total</span>
                  <span className="shrink-0 whitespace-nowrap font-mono font-semibold" style={{ color: VIZ_RED }}>Unowned</span>
                </div>
              </Panel>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IT'S COSTING YOU TODAY */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <SectionEyebrow className="mb-4">The cost of the gap</SectionEyebrow>
          <h2 className="cv-h2 text-cv-ink mb-8">What that&apos;s costing you today.</h2>
          <BulletGrid items={COSTS} tone="negative" />
        </div>
      </section>

      {/* WHAT YOU SHIP */}
      <section className="cv-section">
        <div className="cv-container">
          <SectionEyebrow className="mb-4">What you ship</SectionEyebrow>
          <h2 className="cv-h2 text-cv-ink mb-10">What enterprise teams operationalise on day one</h2>
          <EnterpriseDayOne
            items={[
              ["One model across the estate", "A single allocation model for cloud, AI, and warehouse spend."],
              ["Identity and audit", "SSO, SCIM, RBAC, audit logs, and customer-managed encryption keys."],
              ["Regional residency", "US, EU, and APAC options, with private-link and VPC deployment."],
              ["Marketplace and procurement", "Redeem committed spend across cloud marketplaces."],
            ]}
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <SectionEyebrow className="mb-4">How it works</SectionEyebrow>
          <h2 className="cv-h2 text-cv-ink">How the control plane runs the estate.</h2>
          <div className="mt-4 max-w-3xl space-y-4 mb-12">
            <p className="cv-body-lg text-cv-muted">
              CloudVerse connects every cloud, AI provider, warehouse, and pipeline read-only, then provisions access, governs policy and residency, and reports chargeback that reconciles across business units.
            </p>
            <p className="cv-body-lg text-cv-muted">
              Four tools show four slices of the estate. One control plane shows the total, and who owns it.
            </p>
          </div>
          <HowItWorksFlow
            workloads={HOW_IT_WORKS_WORKLOADS}
            chips={HOW_IT_WORKS_CHIPS}
            hubLabel="Cloud · AI · Data · Engineering"
            hubSub="one control plane"
            right={HOW_IT_WORKS_RIGHT}
            bottomRows={["Marketplace redemption", "Business unit reconciliation"]}
          />
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="cv-section">
        <div className="cv-container">
          <SectionEyebrow className="mb-4">Outcomes</SectionEyebrow>
          <h2 className="cv-h2 text-cv-ink mb-8">Outcomes leadership owns.</h2>
          <BulletGrid items={OUTCOMES} tone="positive" />
        </div>
      </section>

      {/* PLATFORM */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <SectionEyebrow className="mb-4">Platform</SectionEyebrow>
          <h2 className="cv-h2 text-cv-ink mb-8">Modules that power enterprise deployments</h2>
          <PlatformCards
            items={[
              ["AIX", "The control plane for enterprise AI", "/platform/aix"],
              ["FinOps Platform", "Multi-cloud cost intelligence", "/platform/finops"],
              ["DevX", "Cost context in the engineering workflow", "/platform/devx"],
              ["DataX", "Allocable warehouse and pipeline spend", "/platform/datax"],
            ]}
          />
        </div>
      </section>

      <WhoThisIsFor
        accent="#1664C0"
        personas={[
          {
            role: "CIO",
            category: "Executive leadership",
            quote: "One control plane for cloud, AI, data, and engineering — the total finally has an owner.",
          },
          {
            role: "CTO",
            category: "Executive leadership",
            quote: "Governance keeps pace with how fast AI is reshaping the estate, instead of trailing it.",
          },
          {
            role: "VP / Director of Engineering",
            category: "Engineering leadership",
            quote: "Cost context shows up where the decision is made, not three tools removed from it.",
          },
          {
            role: "Head of Cloud / Infrastructure",
            category: "Infrastructure",
            quote: "Chargeback and showback that actually reconcile across every business unit.",
          },
        ]}
      />

      <section className="cv-section">
        <div className="cv-container">
          <FaqBlock
            items={FAQ.map(([q, a]) => ({ q, a }))}
            accent="#1664C0"
            title="Enterprise Questions Answered"
            subtitle="Common questions we get asked the most"
          />
        </div>
      </section>

      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Solutions", href: "/solutions" }, { name: "Enterprise", href: "/solutions/enterprise" }]} />
    </>
  );
}
