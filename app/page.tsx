import Link from "next/link";
import { ArrowRight, CheckCircle } from "@/lib/solar-icons";
import type { Metadata } from "next";
import { CustomerLogos } from "@/components/CustomerLogos";
import { HeroSquares, HeroEyebrow } from "@/components/PageHero";
import { ProductVideo } from "@/components/home/ProductVideo";
import { FaqBlock } from "@/components/FaqBlock";
import { HardcodeCost } from "@/components/home/HardcodeCost";
import { BeforeAfterAix } from "@/components/home/BeforeAfterAix";
import { HowAixWorks } from "@/components/home/HowAixWorks";
import { CostOfNotRouting } from "@/components/home/CostOfNotRouting";
import { NotAGateway } from "@/components/home/NotAGateway";
import { AixGovernance } from "@/components/home/AixGovernance";
import { AixDeployment } from "@/components/home/AixDeployment";
import { TechSpendCrossLink } from "@/components/home/TechSpendCrossLink";
import { IntegrationsMarquee } from "@/components/home/IntegrationsMarquee";
import { VendorSovereignty } from "@/components/home/VendorSovereignty";
import { AixOrchestration } from "@/components/home/AixOrchestration";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { DEMO_URL } from "@/lib/links";
import { GuidesResources } from "@/components/home/GuidesResources";

export const metadata: Metadata = {
  title: "CloudVerse: The Enterprise AI Control Plane",
  description:
    "Govern every AI execution and prove the economics behind it. One system of record for every agent, model route, prompt, and dollar of AI spend, with governance enforced in the execution path, deployed in your environment.",
  keywords: ["enterprise AI governance", "AI control plane", "AI agent governance", "AI cost optimization", "LLM routing", "AI spend", "execution ledger"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "CloudVerse: The Enterprise AI Control Plane",
    description: "Govern every AI execution. Prove the economics behind it. One system of record for every agent, model route, prompt, and dollar of AI spend.",
    url: "/",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "CloudVerse: The Enterprise AI Control Plane" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CloudVerse: The Enterprise AI Control Plane",
    description: "Govern every AI execution. Prove the economics behind it. Governance enforced in the execution path, not a report after the fact.",
  },
};

const HOME_FAQS = [
  {
    q: "What is an AI control plane?",
    a: "The system that discovers every AI agent and model in use, governs execution in real time (budgets, policy, routing, kill switch), and records every call as evidence. It sets policy before a request runs and proves cost and outcome after.",
  },
  {
    q: "How is AIX different from an AI gateway?",
    a: "A gateway runs the routing rule you already wrote. AIX discovers what's actually running across your estate, including agents nobody told you about, and enforces budget, identity, and policy on every call, not just the ones already wired through a gateway.",
  },
  {
    q: "Does AIX proxy my traffic or add latency?",
    a: "Routing overhead is under 15ms per request. AIX can operate as a decision layer without mediating all traffic. Execution stays in your control.",
  },
  {
    q: "What happens when a model is deprecated or a provider goes down?",
    a: "Every route carries a fallback. AIX reroutes within your constraints, and your prompts, policies, and audit trail keep working because they live in your control plane, not the vendor's.",
  },
  {
    q: "Can AIX run entirely inside our own environment?",
    a: "Yes. AIX deploys into your cloud tenancy or on-premises; the data plane stays inside your boundary, and prompt capture is a per-workload policy: full capture, redacted, or metadata-only.",
  },
  {
    q: "How fast can we see this on real workloads?",
    a: "A scoped private pilot in a tenancy you control: discover what's already running, govern one real workload, and read out the evidence, in about three weeks.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO + VIDEO wrapper shares the same solid grid background */}
      <div className="cv-hero-bg" style={{ background: "hsl(var(--cv-surface))" }}>
        {/* HERO */}
        <section className="relative pt-36 pb-16 sm:pt-48 lg:pt-56 lg:pb-24">
          <HeroSquares />
          <div className="max-w-cv relative z-10 mx-auto px-5 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              <HeroEyebrow accent="blue">The Enterprise AI Control Plane</HeroEyebrow>
              <h1 className="cv-h1 mt-4 text-balance leading-[1.08] text-cv-ink">
                Govern every AI execution.{" "}
                <span className="text-cv-blue dark:text-cv-blue-light">Prove the economics behind it.</span>
              </h1>
              <p className="cv-body mt-6 max-w-[60ch] text-pretty text-cv-ink/70 sm:mt-7">
                One system of record for every agent, model route, prompt, and dollar of AI spend, with governance enforced in the execution path, not a report after the fact.
              </p>
              <div className="mt-10 flex flex-col items-center gap-3 sm:mt-12 sm:flex-row sm:justify-center sm:gap-4">
                <Link href={DEMO_URL} className="cv-btn-primary" data-testid="link-hero-demo">
                  Book a demo
                </Link>
                <Link href="/contact" className="cv-btn-ghost" data-testid="link-hero-audit">
                  Request a free AI cost &amp; risk audit
                </Link>
              </div>
              <p className="mt-6 text-sm italic text-cv-muted">
                Private deployment. Your cloud, your data plane, your keys.
              </p>
              <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:gap-6">
                <Link href="/platform/aix" className="text-sm text-cv-blue dark:text-cv-blue-light hover:text-cv-blue-bright hover:underline underline-offset-2 transition-colors flex items-center gap-1" data-testid="link-hero-platform">
                  See the platform <ArrowRight weight="Linear" size={13} />
                </Link>
                <Link href="/connect" className="text-sm text-cv-blue dark:text-cv-blue-light hover:text-cv-blue-bright hover:underline underline-offset-2 transition-colors flex items-center gap-1" data-testid="link-hero-walkthrough">
                  Walkthrough on your own data, in 30 minutes <ArrowRight weight="Linear" size={13} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCT VIDEO */}
        <ProductVideo />
      </div>

      {/* CUSTOMER LOGOS */}
      <CustomerLogos />

      {/* AI COMPUTE IS TOO EXPENSIVE TO HARDCODE */}
      <HardcodeCost />

      {/* BEFORE / AFTER AIX */}
      <BeforeAfterAix />

      {/* HOW AIX WORKS — DISCOVER · GOVERN · PROVE */}
      <HowAixWorks />

      {/* INTEGRATIONS */}
      <section className="cv-section bg-cv-surface2 dark:bg-black relative overflow-hidden">
        {/* Ambient blue glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[32rem]"
          style={{ background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(22,100,192,0.16), transparent 70%)" }}
        />

        <div className="cv-container relative z-10">
          {/* Heading - centered */}
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#1664C0]/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#1664C0] dark:bg-[#7CB8F8]/15 dark:text-[#7CB8F8]">
              Integrations
            </span>
            <h2 className="cv-h2 text-cv-ink">
              Connects to the stack your teams already run.
            </h2>
            <p className="cv-body mt-4 text-cv-ink/70">
              Cloud, models, GPUs, data warehouses, and CI, connected once.
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

      {/* WHAT IT DOES FOR YOU ON DAY ONE */}
      <AixGovernance />

      {/* ARCHITECTURE — DEPLOYED IN YOUR ENVIRONMENT */}
      <AixDeployment />

      {/* THE COST OF NOT ROUTING */}
      <CostOfNotRouting />

      {/* NOT A GATEWAY. NOT OBSERVABILITY. NOT A COST TOOL. */}
      <NotAGateway />

      {/* VENDOR SOVEREIGNTY - Own your stuff */}
      <VendorSovereignty />

      {/* AIX ORCHESTRATION - One system of record */}
      <AixOrchestration />

      {/* TESTIMONIALS / PROOF */}
      <TestimonialsCarousel />

      {/* CROSS-LINK TO TECHNOLOGY SPEND */}
      <TechSpendCrossLink />

      {/* GUIDES & RESOURCES */}
      <GuidesResources />

      {/* FAQ */}
      <section className="cv-section bg-cv-surface overflow-hidden">
        <div className="cv-container">
          <div className="mb-4 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1664C0]/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#1664C0] dark:bg-[#7CB8F8]/15 dark:text-[#7CB8F8]">
              FAQ
            </span>
          </div>
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
