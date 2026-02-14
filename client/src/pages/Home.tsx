import { BaseLayout } from "@/layouts/BaseLayout";
import { Button } from "@/components/Button";
import { track } from "@/lib/track";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { DEMO_URL } from "@/lib/links";
import { PillarCard } from "@/components/PillarCard";
import { MotionHeroBackground } from "@/components/MotionHeroBackground";
import { HeroCard } from "@/components/home/HeroCard";
import { DeploymentOptions } from "@/components/home/DeploymentOptions";
import { HowItWorks } from "@/components/home/HowItWorks";
import { InvoiceEfficiencySection } from "@/components/home/InvoiceEfficiencySection";
import { MultiTenantProviderCard } from "@/components/home/MultiTenantProviderCard";
import { Receipt, Tag, Code2, Cpu, Activity, X, Boxes, Sparkles } from "lucide-react";
import { FinalCTA } from "@/components/FinalCTA";
import billopsLogo from "@/assets/billops.png";
import dataxLogo from "@/assets/datax-logo.png";

const customerLogos = [
  { name: "Dr. Reddy's", src: "/logos/dr-reddys.svg", srcDark: "/logos/dr-reddys.svg", className: "brightness-110" },
  { name: "Infogain", src: "/logos/infogain.svg", srcDark: "/logos/infogain.svg", className: "brightness-125" },
  { name: "Max Life Insurance", src: "/logos/axis-max-life-insurance-logo.svg", srcDark: "/logos/axis-max-life-insurance-logo.svg", className: "brightness-150" },
  { name: "Shaw Industries", srcLight: "/logos/logo-dark-Shaw.png", srcDark: "/logos/logo-dark-Shaw.png", className: "invert dark:invert-0 brightness-450 !h-12 sm:!h-20"  },
  { name: "SISL Infotech", srcLight: "/logos/logo-1-1-sisl.svg", srcDark: "/logos/logo-light-sisl.svg", className: "" },
  { name: "Ginesys", srcLight: "/logos/ginesys-dark.png", srcDark: "/logos/ginesys-light.svg", className: "" },
  { name: "Ken42", src: "/logos/ken42.png", srcDark: "/logos/ken42-dark.png", className: "" },
  { name: "PiChain", src: "/logos/pichain.png", srcDark: "/logos/pichain.png", className: "!h-9 sm:!h-10 invert dark:invert-0" },
  { name: "Optimile", src: "/logos/optimile.png", srcDark: "/logos/optimile.png", className: "invert dark:invert-0" },
  { name: "Aura ML", src: "/logos/aura-ml.png", srcDark: "/logos/aura-ml.png", className: "invert dark:invert-0" },
  { name: "Autoflow", src: "/logos/autoflow.png", srcDark: "/logos/autoflow.png", className: "invert dark:invert-0" },
  { name: "Climaty AI", src: "/logos/climaty-ai.png", srcDark: "/logos/climaty-ai.png", className: "!h-7 sm:!h-8 invert dark:invert-0" },
  { name: "Doqfy", src: "/logos/doqfy.png", srcDark: "/logos/doqfy.png", className: "!h-9 sm:!h-10 invert dark:invert-0 brightness-150" },
  { name: "Skylark", src: "/logos/skylark.png", srcDark: "/logos/skylark.png", className: "invert dark:invert-0" },
];

const pillarCards = [
  {
    icon: Sparkles,
    title: "AIX: AI Model Economics (LLMs)",
    description: "AIX applies economic decision logic to Large Language Model (LLM) usage. For every prompt, inference request, or AI workload, it evaluates required performance — reasoning depth, latency, context length, and quality — against real-time cost-per-token and model economics. It ensures routine tasks use cost-efficient models and complex tasks use premium models only when justified, preventing silent LLM overspend at scale.",
  },
  {
    icon: Code2,
    title: "DevX: Engineering Decision Economics",
    description: "DevX embeds economic decision logic directly into pull requests, repositories, and CI/CD pipelines. It analyzes both Infrastructure-as-Code (Terraform, Pulumi, CDK, ARM, and related frameworks) and application source code across 14+ supported languages. When developers introduce changes — whether provisioning infrastructure or modifying runtime logic — DevX evaluates projected compute and cost impact before deployment, highlighting economically significant patterns early in the workflow.",
  },
  {
    icon: Receipt,
    title: "DataX: Data Execution Economics",
    description: "DataX applies economic intent to live data workloads across warehouses and data platforms. It detects inefficient queries, high-cost execution patterns, and compute-heavy pipelines, and ensures warehouse behavior remains within defined cost-performance thresholds during execution. This prevents structural warehouse waste from compounding as AI-driven data usage scales.",
  },
  {
    icon: Tag,
    title: "Commitments Optimizer: Compute Procurement Economics",
    description: "Align long-term capacity commitments with real demand patterns to improve blended compute rates and reduce structural exposure. It turns commitment strategy into a systematic discipline — informed by usage trends and demand signals — rather than ad hoc purchasing.",
  },
  {
    icon: Activity,
    title: "Volatility Control: Variance & Exposure Management",
    description: "Predict usage spikes early to reduce variance and prevent weekend-scale surprises. Volatility Control identifies abnormal demand patterns across AI, compute, and data workloads so exposure is contained before it becomes a material budget deviation.",
  },
  {
    icon: Cpu,
    title: "Autonomous Optimization Engine: Continuous Baseline Shift",
    description: "Lower steady-state infrastructure cost by continuously tuning live workloads using ML-driven actions with guardrails. This drives a sustained downward shift in baseline compute behavior — not one-time cleanups or theoretical savings.",
  },
];

export default function Home() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    document.title = "CloudVerse™ — AI Infrastructure Economics";
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
                Enterprise AI Infrastructure Economics Platform
              </h1>
              <p className="text-lg sm:text-xl text-cv-ink/80 leading-relaxed max-w-[40rem] mx-auto lg:mx-0">
                Making AI infrastructure decisions economically intentional.
              </p>
              <p className="text-base sm:text-lg text-cv-muted pb-8 border-b border-cv-line leading-relaxed max-w-[40rem] mx-auto lg:mx-0">
                CloudVerse embeds economic decision logic across model selection, workload behavior, and compute procurement — so technical execution and financial intent stay aligned.
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
                Trusted by platform and engineering teams at leading enterprises.
              </p>
            </div>

            {/* Right: Hero Card with Outcomes */}
            <div className="w-full max-w-[640px] mx-auto lg:mx-0">
              <HeroCard />
            </div>
          </div>
        </div>
      </section>
      {/* Customer Logos Section */}
      <section className="pt-6 sm:pt-8 lg:pt-10 pb-10 sm:pb-12 lg:pb-14 border-t border-cv-line dark:border-white/10 overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-20">
          <p className="text-center text-base sm:text-lg text-cv-muted mb-8 sm:mb-10">
            Used by platform and engineering teams at leading enterprises.
          </p>
          <div className="relative overflow-hidden">
            <div className="flex dark:hidden">
              <div className="flex items-center gap-x-12 sm:gap-x-16 lg:gap-x-20 animate-marquee-loop shrink-0">
                {customerLogos.map((logo, idx) => (
                  <img
                    key={`${logo.name}-a-${idx}`}
                    src={logo.srcLight || logo.src || logo.srcDark}
                    alt={logo.name}
                    loading="lazy"
                    decoding="async"
                    className={`h-10 sm:h-12 w-auto object-contain opacity-100 grayscale shrink-0 ${logo.className || ""}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-x-12 sm:gap-x-16 lg:gap-x-20 animate-marquee-loop shrink-0 ml-12 sm:ml-16 lg:ml-20">
                {customerLogos.map((logo, idx) => (
                  <img
                    key={`${logo.name}-b-${idx}`}
                    src={logo.srcLight || logo.src || logo.srcDark}
                    alt={logo.name}
                    loading="lazy"
                    decoding="async"
                    className={`h-10 sm:h-12 w-auto object-contain opacity-100 grayscale shrink-0 ${logo.className || ""}`}
                  />
                ))}
              </div>
            </div>
            <div className="hidden dark:flex">
              <div className="flex items-center gap-x-12 sm:gap-x-16 lg:gap-x-20 animate-marquee-loop shrink-0">
                {customerLogos.map((logo, idx) => (
                  <img
                    key={`${logo.name}-dark-a-${idx}`}
                    src={logo.srcDark || logo.src}
                    alt={logo.name}
                    loading="lazy"
                    decoding="async"
                    className={`h-10 sm:h-12 w-auto object-contain opacity-100 transition-opacity shrink-0 ${logo.className || ""}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-x-12 sm:gap-x-16 lg:gap-x-20 animate-marquee-loop shrink-0 ml-12 sm:ml-16 lg:ml-20">
                {customerLogos.map((logo, idx) => (
                  <img
                    key={`${logo.name}-dark-b-${idx}`}
                    src={logo.srcDark || logo.src}
                    alt={logo.name}
                    loading="lazy"
                    decoding="async"
                    className={`h-10 sm:h-12 w-auto object-contain opacity-100 transition-opacity shrink-0 ${logo.className || ""}`}
                  />
                ))}
              </div>
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-cv-ink mb-4">Economic decision logic for every layer</h2>
            <p className="text-lg sm:text-xl text-cv-muted max-w-2xl mx-auto">
              Built for enterprise scale, with enforcement at the decision point.
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

      {/* How CloudVerse Works Section */}
      <div className="border-t border-cv-line dark:border-white/10">
        <HowItWorks />
      </div>

      {/* Economic Decision Layer Section */}
      <section className="py-10 sm:py-14 lg:py-16 border-t border-cv-line dark:border-white/10">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-20">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-cv-ink">
              The Economic Decision Layer for AI Infrastructure
            </h2>
            <p className="text-lg sm:text-xl text-cv-muted leading-relaxed">
              Modern AI stacks include models, data platforms, orchestration, and infrastructure. What they lack is embedded economic decision logic.
            </p>
            <p className="text-base sm:text-lg text-cv-ink/80 leading-relaxed">
              CloudVerse operates as the economic decision layer — influencing model selection, evaluating deployments for economic impact, shaping live workload behavior, and structuring long-term capacity commitments.
            </p>
          </div>

          <EconomicDecisionLayerDiagram />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-10">
            <div className="p-6 rounded-xl border border-cv-line bg-cv-surface2/50 dark:bg-white/[0.04]">
              <h3 className="text-lg font-semibold text-cv-ink mb-3">Model & Workload Selection</h3>
              <p className="text-sm text-cv-muted leading-relaxed mb-2">AIX evaluates cost-performance curves at runtime.</p>
              <p className="text-sm text-cv-muted leading-relaxed">DevX evaluates economic impact of engineering changes before production.</p>
            </div>
            <div className="p-6 rounded-xl border border-cv-line bg-cv-surface2/50 dark:bg-white/[0.04]">
              <h3 className="text-lg font-semibold text-cv-ink mb-3">Active Infrastructure Behavior</h3>
              <p className="text-sm text-cv-muted leading-relaxed mb-2">DataX enforces execution policies on live workloads.</p>
              <p className="text-sm text-cv-muted leading-relaxed">Inefficient queries are identified and addressed automatically.</p>
            </div>
            <div className="p-6 rounded-xl border border-cv-line bg-cv-surface2/50 dark:bg-white/[0.04]">
              <h3 className="text-lg font-semibold text-cv-ink mb-3">Commitment & Procurement Strategy</h3>
              <p className="text-sm text-cv-muted leading-relaxed mb-2">Commitments can be executed programmatically.</p>
              <p className="text-sm text-cv-muted leading-relaxed">Procurement becomes systematic — not reactive.</p>
            </div>
          </div>
        </div>
      </section>

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
            <a
              href="https://devx.cloudverse.ai"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("product_devx", { location: "products_section" })}
              className="group relative bg-cv-surface2/50 dark:bg-slate-800/50 border border-cv-line dark:border-slate-700/50 rounded-2xl p-6 sm:p-8 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 is_cvdevx"
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
                    Economic decision logic embedded in PRs, repos, and CI/CD pipelines — analyzing IaC and application code across 14+ languages.
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:gap-3 transition-all">
                    Visit devx.cloudverse.ai →
                  </span>
                </div>
              </div>
            </a>

            <a
              href="https://aix.cloudverse.ai"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("product_aix", { location: "products_section" })}
              className="group relative bg-cv-surface2/50 dark:bg-slate-800/50 border border-cv-line dark:border-slate-700/50 rounded-2xl p-6 sm:p-8 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 is_cvaix"
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

            <a
              href="https://datax.cloudverse.ai"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("product_datax", { location: "products_section" })}
              className="group relative bg-cv-surface2/50 dark:bg-slate-800/50 border border-cv-line dark:border-slate-700/50 rounded-2xl p-6 sm:p-8 hover:border-pink-500/50 hover:shadow-lg hover:shadow-pink-500/10 transition-all duration-300 is_cvdatax"
              data-testid="product-datax-card"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-pink-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-pink-500/20">
                  <img src={dataxLogo} alt="DataX" className="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-cv-ink mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                    DataX
                  </h3>
                  <p className="text-cv-muted leading-relaxed mb-4 text-sm sm:text-base">
                    Analytics data cost visibility and workload controls. Monitor usage, optimize queries, and control spend.
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-pink-600 dark:text-pink-400 group-hover:gap-3 transition-all">
                    Visit datax.cloudverse.ai →
                  </span>
                </div>
              </div>
            </a>

            <a
              href="https://billops.cloudverse.ai"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("product_billops", { location: "products_section" })}
              className="group relative bg-cv-surface2/50 dark:bg-slate-800/50 border border-cv-line dark:border-slate-700/50 rounded-2xl p-6 sm:p-8 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 is_cvbillops"
              data-testid="product-billops-card"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <img src={billopsLogo} alt="CloudBillOps" className="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-cv-ink mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    CloudBillOps
                  </h3>
                  <p className="text-cv-muted leading-relaxed mb-4 text-sm sm:text-base">
                    Unified cloud billing and cost operations. Track usage, allocate costs, enforce controls.
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-orange-600 dark:text-orange-400 group-hover:gap-3 transition-all">
                    Visit billops.cloudverse.ai →
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <DeploymentOptions />

      {/* Multi-Tenant Section */}
      <section className="py-12 sm:py-16 lg:py-20 border-t border-cv-line dark:border-white/10">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-cv-ink">
                Built for Multi-Tenant Cloud Providers
              </h2>
              <p className="text-lg sm:text-xl text-cv-muted leading-relaxed">
                CloudVerse supports hierarchical tenancy, sub-tenant isolation, and partner-level economic visibility — enabling resellers and distributors to manage compute exposure across customer portfolios.
              </p>
              <ul className="space-y-4">
                {[
                  "Multi-tenant architecture with strict data isolation",
                  "Portfolio-level compute exposure visibility",
                  "Commitment optimization across downstream customers"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-base sm:text-lg text-cv-muted">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <MultiTenantProviderCard />
          </div>
        </div>
      </section>

      {/* Invoice Efficiency Score Section */}
      <InvoiceEfficiencySection />

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
