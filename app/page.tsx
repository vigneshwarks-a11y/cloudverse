import Link from "next/link";
import { ArrowRight, CheckCircle } from "@solar-icons/react";
import type { Metadata } from "next";
import { CustomerLogos } from "@/components/CustomerLogos";
import { ProductVideo } from "@/components/home/ProductVideo";
import { FaqBlock } from "@/components/FaqBlock";
import { HardcodeCost } from "@/components/home/HardcodeCost";
import { BeforeAfterAix } from "@/components/home/BeforeAfterAix";
import { CostOfNotRouting } from "@/components/home/CostOfNotRouting";
import { AixGovernance } from "@/components/home/AixGovernance";
import { IntegrationsMarquee } from "@/components/home/IntegrationsMarquee";
import { VendorSovereignty } from "@/components/home/VendorSovereignty";
import { AixOrchestration } from "@/components/home/AixOrchestration";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { DEMO_URL } from "@/lib/links";
import { GuidesResources } from "@/components/home/GuidesResources";

export const metadata: Metadata = {
  title: "CloudVerse: The Control Plane for Enterprise AI",
  description:
    "Put every AI model, agent, and dollar on one record. Route, govern, and meter your AI, and prove the ROI. Built on the FinOps platform enterprises already trust.",
  keywords: ["cloud cost management", "AI cost optimization", "FinOps", "compute economics", "enterprise AI governance", "cloud spend", "LLM cost"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "CloudVerse: The Control Plane for Enterprise AI",
    description: "Put every AI model, agent, and dollar on one record. Route, govern, and meter your AI, and prove the ROI.",
    url: "/",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "CloudVerse: Compute Economics Platform" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CloudVerse: The Control Plane for Enterprise AI",
    description: "Route, govern, and meter your AI. Prove the ROI. Built on the FinOps platform enterprises trust.",
  },
};

const HOME_FAQS = [
  {
    q: "What is an AI control plane?",
    a: "The system that governs, routes, and meters every AI request across your models and providers. It sets policy and budget before a request runs, scores routes while it runs, and records cost and outcome after.",
  },
  {
    q: "How is AIX different from an AI gateway?",
    a: "A gateway runs the routing rule you already wrote. AIX works out what the rule should be, scoring every route live on cost, latency, quality, and compliance, then logs why one won.",
  },
  {
    q: "How is it different from LLM observability?",
    a: "Observability tells you what a request cost after it ran. AIX settles that before it runs and enforces budget and policy in real time.",
  },
  {
    q: "Does AIX proxy my traffic or add latency?",
    a: "Routing overhead is under 15ms per request, and AIX can operate as a decision layer without mediating all traffic. Execution stays in your control.",
  },
  {
    q: "What happens when a model is deprecated or a provider goes down?",
    a: "Every route carries a fallback. AIX reroutes within your constraints, and your prompts, policies, and audit trail keep working because they live in your control plane.",
  },
  {
    q: "How fast is this live?",
    a: "First account connected in under 30 minutes, read-only by default. Most teams find something they didn't expect the same day, inside a no-fee, two-to-four-week proof of value.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO + VIDEO wrapper shares the same gradient background */}
      <div className="cv-hero-bg">
        {/* HERO */}
        <section className="pt-[160px] sm:pt-[200px] pb-20 lg:pt-[300px] lg:pb-32 relative">
          <div className="cv-container relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-20">
              {/* Left: eyebrow + headline + CTAs */}
              <div className="flex-1 min-w-0 lg:max-w-2xl xl:max-w-3xl">
                <p className="cv-label mb-5">The Control Plane for Enterprise AI and Compute</p>
                <h1 className="cv-h1 text-cv-ink max-w-3xl">
                  Own every dollar.<br />
                  <span className="text-cv-blue dark:text-cv-blue-light lg:whitespace-nowrap">Govern every AI execution.</span>
                </h1>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={DEMO_URL} className="cv-btn-primary" data-testid="link-hero-demo">
                    Book a demo
                  </Link>
                  <Link href="/contact" className="cv-btn-ghost !text-cv-ink !border-cv-ink/30 hover:!border-cv-ink/60 hover:!bg-cv-ink/10 dark:!text-white dark:!border-white/40 dark:hover:!border-white/70 dark:hover:!bg-white/10" data-testid="link-hero-audit">
                    Request a free AI cost audit
                  </Link>
                </div>
              </div>

              {/* Right: subhead + utility links */}
              <div className="mt-10 lg:mt-0 lg:max-w-xs xl:max-w-sm shrink-0">
                <p className="cv-body text-cv-ink/70">
                  One ledger for every dollar of cloud, AI, data, SaaS, and engineering spend, each entry tied to the team, the workload, and the decision that caused it. Governance before the request runs. Evidence after it does.
                </p>
                <div className="mt-5 flex flex-col gap-2">
                  <Link href="/platform/aix" className="text-sm text-cv-blue dark:text-cv-blue-light hover:text-cv-blue-bright hover:underline underline-offset-2 transition-colors flex items-center gap-1" data-testid="link-hero-platform">
                    See the platform <ArrowRight weight="Linear" size={13} />
                  </Link>
                  <Link href="/connect" className="text-sm text-cv-blue dark:text-cv-blue-light hover:text-cv-blue-bright hover:underline underline-offset-2 transition-colors flex items-center gap-1" data-testid="link-hero-walkthrough">
                    Walkthrough on your own data, in 30 minutes <ArrowRight weight="Linear" size={13} />
                  </Link>
                </div>
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

      {/* INTEGRATIONS */}
      <section className="cv-section bg-cv-surface2 dark:bg-black relative overflow-hidden">
        {/* Ambient blue glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[32rem]"
          style={{ background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(22,100,192,0.16), transparent 70%)" }}
        />

        <div className="cv-container relative z-10">
          {/* Heading */}
          <div className="text-center">
            <h2 className="cv-h2 text-cv-ink mx-auto max-w-2xl">
              Connects to the stack your teams already run.
            </h2>
            <p className="mt-5 cv-body text-cv-ink/60 max-w-lg mx-auto">
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

      {/* THE COST OF NOT ROUTING */}
      <CostOfNotRouting />

      {/* AIX GOVERNANCE - Take the driver's seat */}
      <AixGovernance />

      {/* VENDOR SOVEREIGNTY - Own your stuff */}
      <VendorSovereignty />

      {/* AIX ORCHESTRATION - One system of record */}
      <AixOrchestration />

      {/* TESTIMONIALS */}
      <TestimonialsCarousel />

      {/* GUIDES & RESOURCES */}
      <GuidesResources />

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
