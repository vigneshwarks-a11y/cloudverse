import Link from "next/link";
import { ArrowRight, CheckCircle } from "@/lib/solar-icons";
import { IconChartPie2, IconInvestment, IconShield, IconReceipt } from "nucleo-isometric";
import { IntegrationsMarquee } from "@/components/home/IntegrationsMarquee";
import { FinopsVarianceMock } from "@/components/product/FinopsVarianceMock";
import { FaqBlock } from "@/components/FaqBlock";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import type { Metadata } from "next";
import { DEMO_URL } from "@/lib/links";
import { WhoUsesItCards } from "@/components/product/WhoUsesItCards";
import { FinOpsHero } from "@/components/product/FinOpsHero";
import { FeatureShowcase } from "@/components/home/FeatureShowcase";
import FinopsSurfaces from "@/components/product/FinopsSurfaces";
import { DomainDepth } from "@/components/product/DomainDepth";
import { ProofInProduction } from "@/components/product/ProofInProduction";
import { NamedCustomers } from "@/components/product/NamedCustomers";
import { WhyCloudVerse } from "@/components/product/WhyCloudVerse";
import { GettingStarted } from "@/components/product/GettingStarted";

export const metadata: Metadata = {
  title: "CloudVerse Technology Spend: Cloud, AI, Data & SaaS on One Model | CloudVerse",
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
  ["How does CloudVerse manage AI spend specifically?", "CloudVerse connects provider, model, and workload expenditure to teams, applications, and business outcomes. For runtime AI governance, including workload identity, policy enforcement, approvals, and execution controls, CloudVerse provides AIX."],
];

export default function FinOpsPage() {
  return (
    <>
      <FinOpsHero />

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
          {/* Heading - two-column left/right */}
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-14 lg:items-end">
            <h2 className="cv-h2 text-cv-ink">
              Connects to the stack you already run.
            </h2>
            <p className="cv-body text-cv-ink/60 lg:max-w-md lg:justify-self-end">
              AWS, Azure, and Google Cloud for infrastructure. AIX for AI spend, DataX for warehouses, and DevX for the engineering workflow. One view across all of it.
            </p>
          </div>

          {/* Logos marquee - two rows of app-icon tiles */}
          <IntegrationsMarquee />

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
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
            <h2 className="cv-h2 text-cv-ink">Spend is visible. Decisions are still hard.</h2>
            <div>
              <p className="cv-body-lg text-cv-ink/80">
                Across cloud, AI, data, and SaaS, every team gets stuck on the same four questions, and today they get asked in four different tools, by four different owners, with no shared answer.
              </p>
              <p className="cv-body-lg text-cv-ink/80 mt-4">
                What changed, who owns it, whether the spend is justified, and what to do next, answered once, on one record, prioritized by impact across your whole technology budget.
              </p>
            </div>
          </div>
          <FinopsVarianceMock />
        </div>
      </section>

      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <FinopsSurfaces />
        </div>
      </section>

      {/* LIFECYCLE — CloudZero-style split: heading left, isometric icon rows right */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            {/* left: eyebrow + heading + lead */}
            <div className="lg:pt-2">
              <p className="cv-label mb-4">The lifecycle</p>
              <h2 className="cv-h2 text-cv-ink">Understand. Optimize. Govern. Prove.</h2>
              <p className="cv-body-lg mt-5 max-w-md text-cv-ink/70">
                One model carries every domain from fragmented invoices to continuous economic control: understand what changed and who owns it, optimize toward the highest-impact fix, govern it with budgets and policy, and prove the realized result.
              </p>
            </div>

            {/* right: isometric icon rows */}
            <div className="divide-y divide-cv-line/60 overflow-hidden rounded-2xl border border-cv-line/60 bg-cv-surface dark:divide-white/10 dark:border-white/10 dark:bg-[#0D0D0D]">
              {[
                {
                  Icon: IconChartPie2,
                  title: "Understand",
                  body: "What changed and who owns it. Every dollar mapped to an owner and a driver, across every domain.",
                },
                {
                  Icon: IconInvestment,
                  title: "Optimize",
                  body: "Toward the highest-impact fix. Rightsizing, commitments, and waste, ranked by impact and confidence.",
                },
                {
                  Icon: IconShield,
                  title: "Govern",
                  body: "Budgets and policy that hold. Guardrails, approvals, and chargeback that survive an audit.",
                },
                {
                  Icon: IconReceipt,
                  title: "Prove",
                  body: "The realized result. Savings and unit economics reconciled to the bill, as evidence.",
                },
              ].map(({ Icon, title, body }) => (
                <div key={title} className="flex items-start gap-5 p-6 md:p-7">
                  <Icon size={46} aria-hidden className="shrink-0 text-[#1664C0] dark:text-[#7CB8F8]" />
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-cv-ink">{title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-cv-muted">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DOMAIN DEPTH */}
      <DomainDepth />

      {/* PROOF IN PRODUCTION */}
      <ProofInProduction />

      {/* NAMED CUSTOMER USE CASES */}
      <NamedCustomers />

      {/* WHY CLOUDVERSE OVER FLEXERA / IBM APPTIO */}
      <WhyCloudVerse />

      {/* GETTING STARTED — 30/60/90 */}
      <GettingStarted />

      <section className="cv-section">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-10">Built for every stakeholder</h2>
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
            <h2 className="cv-h2 text-cv-ink">Frequently Asked Questions</h2>
          </div>
          <FaqBlock items={FAQ.map(([q, a]) => ({ q, a }))} accent="#1664C0" />
        </div>
      </section>

      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Platform", href: "/platform/finops" }, { name: "FinOps", href: "/platform/finops" }]} />
    </>
  );
}
