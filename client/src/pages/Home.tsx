import { BaseLayout } from "@/layouts/BaseLayout";
import { Button } from "@/components/Button";
import { track } from "@/lib/track";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { DEMO_URL } from "@/lib/links";
import { PillarCard } from "@/components/PillarCard";
import { OutcomeTile } from "@/components/OutcomeTile";
import { MotionHeroBackground } from "@/components/MotionHeroBackground";
import { HeroCard } from "@/components/home/HeroCard";
import { DeploymentOptions } from "@/components/home/DeploymentOptions";
import { HowItWorks } from "@/components/home/HowItWorks";
import { InvoiceEfficiencySection } from "@/components/home/InvoiceEfficiencySection";
import { Globe, Receipt, Tag, Code2, Cpu, Activity, X, Boxes, Sparkles } from "lucide-react";
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
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    document.title = "CloudVerse™ — Cloud Financial Management";
  }, []);

  return (
    <BaseLayout>
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-14 lg:pb-16 overflow-hidden">
        <MotionHeroBackground />
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-14 items-center">
            {/* Left: Copy Block */}
            <div className="text-center lg:text-left space-y-4 sm:space-y-6 max-w-[52rem] mx-auto lg:mx-0">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cv-ink leading-tight">
                Cloud financial management for modern enterprises.
              </h1>
              <p className="text-lg sm:text-xl text-cv-ink/80 leading-relaxed max-w-[40rem] mx-auto lg:mx-0">
                Unified visibility, allocation, anomalies, and automated optimization across cloud, data, and AI platforms.
              </p>
              <p className="text-base sm:text-lg text-cv-muted pb-8 border-b border-cv-line leading-relaxed max-w-[40rem] mx-auto lg:mx-0">
                Private deployment and air-gapped options available for regulated environments.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-4 max-w-xs sm:max-w-none mx-auto lg:mx-0">
                <Link href="/connect" onClick={() => track("cta_demo", { location: "hero" })} className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto">
                    Book a demo
                  </Button>
                </Link>
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="w-full sm:w-auto"
                  onClick={() => {
                    track("cta_watch_tour", { location: "hero" });
                    setShowVideo(true);
                  }}
                >
                  Watch 90-second tour →
                </Button>
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
      {/* Products Section */}
      <section className="py-12 sm:py-16 lg:py-20 border-t border-cv-line dark:border-white/10">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-20">
          <div className="mb-10 sm:mb-12 text-center">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-cv-muted mb-3">
              CloudVerse Products
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-cv-ink mb-4">
              Purpose-built platforms for every team
            </h2>
            <p className="text-lg sm:text-xl text-cv-muted max-w-2xl mx-auto">
              Specialized solutions that extend CloudVerse capabilities to developers and AI teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* DevX Card */}
            <a 
              href="https://devx.cloudverse.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => track("product_devx", { location: "products_section" })}
              className="group relative bg-cv-surface2/50 dark:bg-slate-800/50 border border-cv-line dark:border-slate-700/50 rounded-2xl p-6 sm:p-8 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
              data-testid="product-devx-card"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Boxes className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-cv-ink mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    DevX
                  </h3>
                  <p className="text-cv-muted leading-relaxed mb-4 text-sm sm:text-base">
                    Cost context in engineering workflows. Shift-left FinOps for CI/CD, services, and environments.
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:gap-3 transition-all">
                    Visit devx.cloudverse.ai →
                  </span>
                </div>
              </div>
            </a>

            {/* AIx Card */}
            <a 
              href="https://aix.cloudverse.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => track("product_aix", { location: "products_section" })}
              className="group relative bg-cv-surface2/50 dark:bg-slate-800/50 border border-cv-line dark:border-slate-700/50 rounded-2xl p-6 sm:p-8 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
              data-testid="product-aix-card"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-cv-ink mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    AIx
                  </h3>
                  <p className="text-cv-muted leading-relaxed mb-4 text-sm sm:text-base">
                    AI cost intelligence for LLM and GPU workloads. Optimize inference, track tokens, and control AI spend.
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-purple-600 dark:text-purple-400 group-hover:gap-3 transition-all">
                    Visit aix.cloudverse.ai →
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
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
          <div className="mb-10 sm:mb-12 text-center">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-cv-muted mb-3">
              What CloudVerse Offers
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-cv-ink mb-4">One platform to manage cloud, data, and AI spend</h2>
            <p className="text-lg sm:text-xl text-cv-muted max-w-2xl mx-auto">
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
      {/* Video Modal */}
      {showVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setShowVideo(false)}
        >
          <div className="relative w-full max-w-4xl mx-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-black">
              <video 
                src="/assets/videos/tour.mp4" 
                controls 
                autoPlay 
                className="w-full aspect-video rounded-[10px]"
              />
            </div>
          </div>
        </div>
      )}
    </BaseLayout>
  );
}
