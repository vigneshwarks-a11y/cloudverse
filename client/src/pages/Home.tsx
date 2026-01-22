import { BaseLayout } from "@/layouts/BaseLayout";
import { Button } from "@/components/Button";
import { track } from "@/lib/track";
import { Link } from "wouter";
import { useEffect } from "react";
import { DEMO_URL } from "@/lib/links";
import { PillarCard } from "@/components/PillarCard";
import { OutcomeTile } from "@/components/OutcomeTile";
import { MotionHeroBackground } from "@/components/MotionHeroBackground";
import { HeroCard } from "@/components/home/HeroCard";
import { DeploymentOptions } from "@/components/home/DeploymentOptions";
import { HowItWorks } from "@/components/home/HowItWorks";
import { InvoiceEfficiencySection } from "@/components/home/InvoiceEfficiencySection";
import { Globe, Receipt, Tag, Code2, Cpu, Activity } from "lucide-react";
import { FinalCTA } from "@/components/FinalCTA";

const customerLogos = [
  { name: "Dr. Reddy's", src: "/logos/dr-reddys.svg", srcDark: "/logos/dr-reddys.svg", className: "brightness-110" },
  { name: "Infogain", src: "/logos/infogain.svg", srcDark: "/logos/infogain.svg", className: "brightness-125" },
  { name: "Max Life Insurance", src: "/logos/axis-max-life-insurance-logo.svg", srcDark: "/logos/axis-max-life-insurance-logo.svg", className: "brightness-150" },
  { name: "Shaw Industries", srcLight: "/logos/logo-dark-Shaw.svg", srcDark: "/logos/logo-white-Shaw.svg", className: "" },
  { name: "SISL Infotech", srcLight: "/logos/logo-1-1-sisl.svg", srcDark: "/logos/logo-light-sisl.svg", className: "" },
  { name: "Ginesys", srcLight: "/logos/ginesys-dark.png", srcDark: "/logos/ginesys-light.svg", className: "" },
  { name: "Ken42", src: "/logos/ken42.png", srcDark: "/logos/ken42-dark.png", className: "" },
  { name: "PiChain", src: "/logos/pichain.png", srcDark: "/logos/pichain.png", className: "!h-9 sm:!h-10 invert dark:invert-0" },
  { name: "Optimile", src: "/logos/optimile.png", srcDark: "/logos/optimile.png", className: "invert dark:invert-0" },
];

const pillarCards = [
  {
    icon: Globe,
    title: "Multi-cloud FinOps",
    description: "Unified cost visibility, allocation, chargeback, and optimization across major clouds and regions.",
  },
  {
    icon: Receipt,
    title: "Data Cost Optimization",
    description: "Optimize Databricks, Snowflake, Azure Synapse, and Amazon Redshift by eliminating inefficient query patterns, right-sizing compute, and attribute costs.",
  },
  {
    icon: Tag,
    title: "Tagging & Cost Normalization",
    description: "Automated tag governance and normalized dimensions that make allocation and reporting consistent.",
  },
  {
    icon: Code2,
    title: "Developer FinOps (Shift-left)",
    description: "Cost context where engineers work: services, environments, pipelines, and workloads.",
  },
  {
    icon: Cpu,
    title: "AI & GPU Workload Optimization",
    description: "Optimize GPUs and LLM usage across training and inference with smarter placement and routing.",
  },
  {
    icon: Activity,
    title: "ML-driven Optimization & Anomalies",
    description: "Detect anomalies early, predict risk, and automate savings actions with guardrails and tracking.",
  },
];

export default function Home() {
  useEffect(() => {
    document.title = "CloudVerse™ — Cloud Financial Management";
  }, []);

  return (
    <BaseLayout>
      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-14 lg:pb-16 overflow-hidden">
        <MotionHeroBackground />
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Copy Block */}
            <div className="text-left space-y-4 sm:space-y-6 max-w-[44rem]">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cv-ink leading-tight">
                Cloud financial management for modern enterprises.
              </h1>
              <p className="text-lg sm:text-xl text-cv-ink/80 leading-relaxed max-w-[40rem]">
                Unified visibility, allocation, anomalies, and automated optimization across cloud, data, and AI platforms.
              </p>
              <p className="text-base sm:text-lg text-cv-muted pb-8 border-b border-cv-line leading-relaxed max-w-[40rem]">
                Private deployment and air-gapped options available for regulated environments.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-4">
                <Link href="/connect" onClick={() => track("cta_demo", { location: "hero" })}>
                  <Button size="lg" className="w-full sm:w-auto">
                    Book a demo
                  </Button>
                </Link>
                <Link href="/tour" onClick={() => track("cta_watch_tour", { location: "hero" })}>
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Watch 90-second tour →
                  </Button>
                </Link>
              </div>

              <p className="text-sm text-cv-muted pt-2">
                Trusted by FinOps and platform teams at leading enterprises.
              </p>
            </div>

            {/* Right: Hero Card with Outcomes */}
            <div className="w-full max-w-[640px] mx-auto lg:mx-0">
              <HeroCard />
            </div>
          </div>
        </div>
      </section>
      {/* Invoice Efficiency Score Section */}
      <InvoiceEfficiencySection />
      <DeploymentOptions />
      {/* Customer Logos Section */}
      <section className="pt-6 sm:pt-8 lg:pt-10 pb-10 sm:pb-12 lg:pb-14 border-t border-cv-line dark:border-white/10 overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-20">
          <p className="text-center text-base sm:text-lg text-cv-muted mb-8 sm:mb-10">
            Used by FinOps teams at leading enterprises.
          </p>
          <div className="relative">
            <div className="flex items-center gap-x-10 sm:gap-x-14 lg:gap-x-16 animate-marquee">
              {[...customerLogos, ...customerLogos].map((logo, idx) => (
                <img
                  key={`${logo.name}-${idx}`}
                  src={logo.srcLight || logo.src || logo.srcDark}
                  alt={logo.name}
                  loading="lazy"
                  decoding="async"
                  className={`h-7 sm:h-8 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity grayscale shrink-0 dark:hidden ${logo.className || ""}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-x-10 sm:gap-x-14 lg:gap-x-16 animate-marquee hidden dark:flex absolute top-0 left-0">
              {[...customerLogos, ...customerLogos].map((logo, idx) => (
                <img
                  key={`${logo.name}-dark-${idx}`}
                  src={logo.srcDark || logo.src}
                  alt={logo.name}
                  loading="lazy"
                  decoding="async"
                  className={`h-7 sm:h-8 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity shrink-0 ${logo.className || ""}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* What CloudVerse Offers Section */}
      <section className="py-8 sm:py-10 lg:py-12 border-t border-cv-line dark:border-white/10">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-20">
          <div className="mb-10 sm:mb-12">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-cv-muted mb-3">
              What CloudVerse Offers
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-cv-ink mb-4">One platform to manage cloud, data, and AI spend</h2>
            <p className="text-lg sm:text-xl text-cv-muted max-w-2xl">
              Built for enterprise scale, multi-tenant governance, and measurable outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {pillarCards.map((card, idx) => (
              <PillarCard
                key={idx}
                icon={card.icon}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>

          <div className="text-center">
            <Link href="/platform" onClick={() => track("link_explore_platform", { location: "pillar_cards" })}>
              <span className="text-cv-muted hover:text-cv-ink transition-colors inline-flex items-center gap-2">
                Explore the platform →
              </span>
            </Link>
          </div>
        </div>
      </section>
      {/* How CloudVerse Works Section (imported premium component) */}
      <div className="border-t border-cv-line dark:border-white/10">
        <HowItWorks />
      </div>
      {/* Security & Compliance Section */}
      <section className="py-10 sm:py-12 lg:py-14 border-t border-cv-line dark:border-white/10">
        <div className="cv-container text-center px-5 sm:px-6 lg:px-20">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-cv-ink">
              Security and compliance, built in
            </h2>
            <p className="text-lg sm:text-xl text-cv-muted">
              Designed for enterprise environments, from access control to auditability.
            </p>
            <div className="flex items-center justify-center gap-8 pt-4">
              <div className="flex flex-col items-center gap-2">
                <img src="/assets/security/iso27001.png" alt="ISO 27001" className="h-16 w-auto grayscale opacity-80" />
                <span className="text-xs font-semibold uppercase tracking-widest text-cv-muted">ISO 27001</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <img src="/assets/security/soc2.png" alt="SOC 2 Type II" className="h-16 w-auto grayscale opacity-80" />
                <span className="text-xs font-semibold uppercase tracking-widest text-cv-muted">SOC 2 Type II</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Final CTA Section */}
      <FinalCTA location="home_final" />
    </BaseLayout>
  );
}
