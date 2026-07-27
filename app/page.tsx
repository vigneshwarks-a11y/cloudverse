import Link from "next/link";
import { ArrowRight, CheckCircle } from "@/lib/solar-icons";
import type { Metadata } from "next";
import { CustomerLogos } from "@/components/CustomerLogos";
import { HomeHero } from "@/components/home/HomeHero";
import { FaqBlock } from "@/components/FaqBlock";
import { HardcodeCost } from "@/components/home/HardcodeCost";
import { BeforeAfterAgentry } from "@/components/home/BeforeAfterAgentry";
import { HowAgentryWorks } from "@/components/home/HowAgentryWorks";
import { CostOfNotRouting } from "@/components/home/CostOfNotRouting";
import { PinnedLoopCarousel } from "@/components/home/PinnedLoopCarousel";
import { NotAGateway } from "@/components/home/NotAGateway";
import { AgentryGovernance } from "@/components/home/AgentryGovernance";
import { IntegrationsMarquee } from "@/components/home/IntegrationsMarquee";
import { AgentryOrchestration } from "@/components/home/AgentryOrchestration";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { FeatureShowcase } from "@/components/home/FeatureShowcase";
import { InlineCta } from "@/components/home/InlineCta";
import { SectionHeading } from "@/components/SectionHeading";
import { GuidesResources } from "@/components/home/GuidesResources";
import { FinopsVarianceMock } from "@/components/product/FinopsVarianceMock";
import { DomainDepth } from "@/components/product/DomainDepth";
import { DOCS } from "@/lib/links";

export const metadata: Metadata = {
  title: "CloudVerse: Own Every Technology Dollar. Govern Every Workload.",
  description:
    "One ledger for every dollar of cloud, AI, data, SaaS, and engineering spend, each entry tied to the team, the workload, and the decision that caused it. Governance before the request runs. Evidence after it does.",
  keywords: ["technology spend management", "cloud cost management", "FinOps platform", "cost allocation and chargeback", "enterprise AI governance", "AI control plane", "AI cost optimization", "LLM routing", "execution ledger"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "CloudVerse: Own Every Technology Dollar. Govern Every Workload.",
    description: "One ledger for every dollar of cloud, AI, data, SaaS, and engineering spend, tied to the team, the workload, and the decision that caused it.",
    url: "/",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "CloudVerse: own every technology dollar, govern every workload that spends it" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CloudVerse: Own Every Technology Dollar. Govern Every Workload.",
    description: "One ledger across cloud, AI, data, SaaS, and engineering spend. Governance before the request runs. Evidence after it does.",
  },
};

const HOME_FAQS = [
  {
    q: "What is an AI control plane?",
    a: "The system that discovers every AI agent and model in use, governs execution in real time (budgets, policy, routing, kill switch), and records every call as evidence. It sets policy before a request runs and proves cost and outcome after.",
  },
  {
    q: "Is CloudVerse a cloud-cost management platform?",
    a: "Cloud cost management is one part of CloudVerse. CloudVerse is a technology spend platform covering cloud infrastructure, AI workloads, data platforms, and SaaS applications through one shared economic and governance model.",
  },
  {
    q: "How is Agentry different from an AI gateway?",
    a: "A gateway runs the routing rule you already wrote. Agentry discovers what's actually running across your estate, including agents nobody told you about, and enforces budget, identity, and policy on every call, not just the ones already wired through a gateway.",
  },
  {
    q: "Does Agentry proxy my traffic or add latency?",
    a: "Routing overhead is under 15ms per request. Agentry can operate as a decision layer without mediating all traffic. Execution stays in your control.",
  },
  {
    q: "What happens when a model is deprecated or a provider goes down?",
    a: "Every route carries a fallback. Agentry reroutes within your constraints, and your prompts, policies, and audit trail keep working because they live in your control plane, not the vendor's.",
  },
  {
    q: "Can Agentry run entirely inside our own environment?",
    a: "Yes. Agentry deploys into your cloud tenancy or on-premises; the data plane stays inside your boundary, and prompt capture is a per-workload policy: full capture, redacted, or metadata-only.",
  },
  {
    q: "Can we start with only one spend category?",
    a: "Yes. Organizations can begin with cloud, AI, data, or SaaS and expand through the same ownership, allocation, reporting, and workflow model.",
  },
  {
    q: "How fast can we see this on real workloads?",
    a: "A scoped private pilot in a tenancy you control: discover what's already running, govern one real workload, and read out the evidence, in about three weeks.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO wrapper carries the gradient background */}
      <div className="cv-hero-bg">
        {/* HERO — client component; on-load entrance stagger via GSAP */}
        <HomeHero />
      </div>

      {/* CUSTOMER LOGOS */}
      <CustomerLogos />

      {/* PROBLEM · ECONOMICS · HOW IT WORKS — pinned, infinite-loop scroll
          carousel on desktop (see PinnedLoopCarousel); plain stacked sections
          on mobile/reduced-motion/no-JS. */}
      <PinnedLoopCarousel>
        <div>
          {/* THE PROBLEM — AI COMPUTE IS TOO EXPENSIVE TO HARDCODE, + BEFORE/AFTER */}
          <HardcodeCost />
          <BeforeAfterAgentry />
        </div>
        {/* THE COST OF NOT ROUTING — the money story */}
        <CostOfNotRouting />
        {/* HOW AGENTRY WORKS — DISCOVER · GOVERN · PROVE */}
        <HowAgentryWorks />
      </PinnedLoopCarousel>

      {/* WHAT IT DOES FOR YOU ON DAY ONE */}
      <AgentryGovernance />

      {/* NOT A GATEWAY. NOT OBSERVABILITY. NOT A COST TOOL. */}
      <NotAGateway />

      {/* AGENTRY ORCHESTRATION - One system of record */}
      <AgentryOrchestration />

      {/* MID-PAGE CTA — capture the convinced evaluator */}
      <InlineCta
        filled
        label="Start a 3-week private pilot"
        href="/connect"
        sub="Most teams find at least one ungoverned agent in the first onboarding call."
        testid="section-inline-cta-pilot"
      />

      {/* THE ESTATE PROBLEM — lead-in to the platform router: the same four
          questions across cloud, AI, data, and SaaS. Shares the section with
          /platform/finops; carries a contrasting surface so the router and
          domain-depth bands below don't read as one flat block. */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
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

      {/* PLATFORM ROUTER — one platform, every module (replaces the Tech-Spend banner) */}
      <FeatureShowcase withLinks />

      {/* DOMAIN DEPTH — the follow-through: what each domain actually gets */}
      <DomainDepth />

      {/* GUIDES & RESOURCES */}
      <GuidesResources />

      {/* INTEGRATIONS — pre-close reassurance */}
      <section className="cv-section bg-cv-surface2 dark:bg-black relative overflow-hidden">
        {/* Ambient blue glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[32rem]"
          style={{ background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(22,100,192,0.16), transparent 70%)" }}
        />

        <div className="cv-container relative z-10">
          {/* Heading — two-column */}
          <SectionHeading eyebrow="Integrations" title="Connects to the stack your teams already run.">
            Cloud, models, GPUs, data warehouses, and CI, connected once.
          </SectionHeading>

          {/* Logos marquee - two rows of app-icon tiles */}
          <IntegrationsMarquee />

          {/* Trust line + CTA */}
          <div className="mt-16 flex w-full flex-col items-center gap-4 sm:w-auto">
            <div className="inline-flex items-center gap-2 text-xs text-cv-muted">
              <CheckCircle weight="Linear" size={13} className="text-cv-teal shrink-0" />
              Read-only by default. Automation is opt-in, scoped, and logged.
            </div>
            <Link
              href="/integrations"
              className="cv-btn-ghost w-full justify-center px-5 py-3 sm:w-auto sm:px-7 sm:py-4"
              data-testid="link-integrations"
            >
              View all integrations <ArrowRight weight="Linear" size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS / PROOF — adjacent to the ask */}
      <TestimonialsCarousel />

      {/* FAQ */}
      <section className="cv-section bg-cv-surface overflow-hidden">
        <div className="cv-container">
          <FaqBlock
            items={HOME_FAQS}
            accent="#1664C0"
            title="Frequently Asked Questions"
            subtitle="Common questions we get asked the most"
          />
        </div>
      </section>
    </>
  );
}
