import Link from "next/link";
import { ArrowRight, CheckCircle, ChartSquare, DangerTriangle, Graph, BillList } from "@/lib/solar-icons";
import { PlatformHeroMockup, type MockupTab } from "@/components/product/PlatformHeroMockup";
import { LifecycleFlow } from "@/components/product/finops/LifecycleFlow";
import { IntegrationsMarquee } from "@/components/home/IntegrationsMarquee";
import { FinopsVarianceMock } from "@/components/product/FinopsVarianceMock";
import { FaqBlock } from "@/components/FaqBlock";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import type { Metadata } from "next";
import { DEMO_URL, DOCS } from "@/lib/links";
import { WhoUsesItCards } from "@/components/product/WhoUsesItCards";
import { FinOpsHero } from "@/components/product/FinOpsHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Eyebrow } from "@/components/Eyebrow";
import { FeatureShowcase } from "@/components/home/FeatureShowcase";
import FinopsSurfaces from "@/components/product/FinopsSurfaces";
import { DomainDepth } from "@/components/product/DomainDepth";
import { InlineCta } from "@/components/home/InlineCta";
import { ProofInProduction } from "@/components/product/ProofInProduction";
import { NamedCustomers } from "@/components/product/NamedCustomers";
import { GettingStarted } from "@/components/product/GettingStarted";

export const metadata: Metadata = {
  title: "CloudVerse Technology Spend: Cloud, AI, Data & SaaS on One Model",
  description:
    "Every technology dollar, explained, owned, and optimized. Manage cloud, AI, data-platform, and SaaS spend through one intelligent control plane that connects billing, usage, contracts, and ownership into one data model.",
  keywords: ["technology spend management", "FinOps platform", "cloud cost management", "AI spend", "data platform cost", "SaaS spend", "chargeback", "multi-cloud allocation"],
  alternates: { canonical: "/platform/finops" },
  openGraph: {
    title: "CloudVerse Technology Spend: Cloud, AI, Data & SaaS on One Model",
    description: "Every technology dollar, explained, owned, and optimized. Cloud, AI, data-platform, and SaaS spend through one intelligent control plane.",
    url: "/platform/finops",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "CloudVerse Technology Spend Platform" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CloudVerse Technology Spend: One Model for Cloud, AI, Data & SaaS",
    description: "Every technology dollar, explained, owned, and optimized. One data model across billing, usage, contracts, and ownership.",
  },
};

const FAQ = [
  ["Is CloudVerse a cloud-cost management platform?", "Cloud cost management is one part of CloudVerse. CloudVerse is a technology spend platform covering cloud infrastructure, AI workloads, data platforms, and SaaS applications through one shared economic and governance model."],
  ["How is this different from traditional FinOps?", "Traditional FinOps focuses primarily on cloud financial management. CloudVerse applies the same principles of visibility, ownership, optimization, and governance across the broader technology estate, including AI, data, and SaaS."],
  ["Can we start with only one spend category?", "Yes. Organizations can begin with cloud, AI, data, or SaaS and expand through the same ownership, allocation, reporting, and workflow model."],
  ["Does it work across all our clouds?", "Yes. One allocation model across AWS, Azure, and GCP, with Oracle, Alibaba, Huawei, and Tencent supported."],
  ["Does automation touch our accounts?", "Read-only by default. Any action is opt-in, scoped, and logged."],
  ["How does CloudVerse manage AI spend specifically?", "CloudVerse connects provider, model, and workload expenditure to teams, applications, and business outcomes. For runtime AI governance, including workload identity, policy enforcement, approvals, and execution controls, CloudVerse provides Agentry."],
];

const FINOPS_TABS: MockupTab[] = [
  { id: "allocation", label: "Cost Allocation", copy: "Every dollar of cloud, AI, data, and SaaS spend mapped to a team, a product, and an owner.", icon: ChartSquare },
  { id: "anomaly", label: "Anomaly Detection", copy: "Spend spikes traced to a driver and an owner as they happen, not at month-end close.", icon: DangerTriangle },
  { id: "budgets", label: "Budgets & Forecasts", copy: "Budgets that forecast where spend lands and flag the overrun before it arrives.", icon: Graph },
  { id: "chargeback", label: "Chargeback", copy: "Audit-ready showback and chargeback every team can reconcile against the bill.", icon: BillList },
];

export default function FinOpsPage() {
  return (
    <>
      <FinOpsHero />

      <PlatformHeroMockup tabs={FINOPS_TABS} docsHref={DOCS.costExplorer} />

      {/* DOMAINS OVERVIEW */}
      <FeatureShowcase />

      {/* CONNECTS TO STACK — same integration section as the home page / DataX */}
      <section className="cv-section bg-cv-surface2 dark:bg-black relative overflow-hidden">
        {/* Ambient blue glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[32rem]"
          style={{ background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(22,100,192,0.16), transparent 70%)" }}
        />

        <div className="cv-container relative z-10">
          <SectionHeading title="Connects to the stack you already run." className="mb-12" docsHref={DOCS.integrations} docsLabel="Read the integration docs">
            AWS, Azure, and Google Cloud for infrastructure.{" "}
            <Link href="/platform/agentry" className="text-cv-blue dark:text-cv-blue-light hover:underline underline-offset-2">Agentry</Link> for AI spend,{" "}
            <Link href="/platform/datax" className="text-cv-blue dark:text-cv-blue-light hover:underline underline-offset-2">DataX</Link> for warehouses, and{" "}
            <Link href="/platform/torb" className="text-cv-blue dark:text-cv-blue-light hover:underline underline-offset-2">Torb</Link> for the engineering workflow. One view across all of it.
          </SectionHeading>

          {/* Logos marquee - full connector breadth */}
          <div className="mt-14">
            <IntegrationsMarquee />
          </div>

          {/* Trust line + CTA */}
          <div className="mt-16 flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-2 text-xs text-cv-muted">
              <CheckCircle weight="Linear" size={13} className="text-cv-teal shrink-0" />
              Read-only by default. Automation is opt-in, scoped, and logged.
            </div>
            <Link
              href="/integrations"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-cv-blue dark:text-cv-blue-light hover:text-cv-blue-bright hover:underline underline-offset-4 transition-colors"
              data-testid="link-integrations"
            >
              View all integrations <ArrowRight weight="Linear" size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="cv-section">
        <div className="max-w-cv mx-auto px-5 sm:px-6 lg:px-8">
          <SectionHeading title="Spend is visible. Decisions are still hard." className="mb-12" docsHref={DOCS.anomalies}>
            Across cloud, AI, data, and SaaS, every team gets stuck on the same four questions, and today they get asked in four different tools, by four different owners, with no shared answer.
            <span className="mt-4 block">
              What changed, who owns it, whether the spend is justified, and what to do next, answered once, on one record, prioritized by impact across your whole technology budget.
            </span>
          </SectionHeading>
          <FinopsVarianceMock />
        </div>
      </section>

      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <SectionHeading className="mb-12" eyebrow="The fix" accent="teal" title="How CloudVerse fixes it.">
            What changed, who owns it, whether the spend is justified, and what to do next, answered once, on one record, prioritized by impact across your whole technology budget.
          </SectionHeading>
          <FinopsSurfaces />
        </div>
      </section>

      {/* LIFECYCLE — heading band over a flat 2×2 grid of the four lifecycle
          stages, each framing one real instrument on a cinematic dark field */}
      <section className="cv-section relative overflow-hidden bg-cv-surface2 dark:bg-black">
        <div className="cv-container relative">
          {/* header band — centered vertical stack over a full-width divider */}
          <div className="border-b border-cv-line/60 pb-10 dark:border-white/10">
            <SectionHeading eyebrow="The lifecycle" title="Understand. Optimize. Govern. Prove." className="mb-12" docsHref={DOCS.optimize}>
              One model carries every domain from fragmented invoices to continuous economic control: understand what changed and who owns it, optimize toward the highest-impact fix, govern it with budgets and policy, and prove the realized result.
            </SectionHeading>
          </div>

          {/* the four stages as a 2×2 bento */}
          <div className="mt-12 lg:mt-14">
            <LifecycleFlow />
          </div>
        </div>
      </section>

      {/* DOMAIN DEPTH */}
      <DomainDepth />

      {/* MID-PAGE CTA */}
      <InlineCta label="Request a technology spend assessment" href="/contact" testid="section-inline-cta-assessment" />

      {/* PROOF IN PRODUCTION */}
      <ProofInProduction />

      {/* NAMED CUSTOMER USE CASES */}
      <NamedCustomers />

      {/* GETTING STARTED — 30/60/90 */}
      <GettingStarted />

      <section className="cv-section">
        <div className="cv-container">
          <Eyebrow accent="teal">Who it's for</Eyebrow>
          <h2 className="cv-h2 text-cv-ink mb-10 text-left">Built for every stakeholder</h2>
          <WhoUsesItCards
            items={[
              ["FinOps Manager", "Allocation and chargeback that hold up, and a queue of ranked actions instead of a spreadsheet."],
              ["Cloud / Platform Engineer", "The driver behind a spike, with the fix and the risk attached."],
              ["CFO / VP Finance", "A forecast you can defend and a number that reconciles to the ledger, across every domain, not just cloud."],
            ]}
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="text-center mb-10">
            <Eyebrow accent="teal">FAQ</Eyebrow>
            <h2 className="cv-h2 text-cv-ink">Frequently Asked Questions</h2>
          </div>
          <FaqBlock items={FAQ.map(([q, a]) => ({ q, a }))} accent="#0E9E7A" />
        </div>
      </section>

      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Platform", href: "/platform/finops" }, { name: "FinOps", href: "/platform/finops" }]} />
    </>
  );
}
