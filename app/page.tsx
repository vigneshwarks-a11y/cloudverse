import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { CustomerLogos } from "@/components/CustomerLogos";
import { InvoiceEfficiency } from "@/components/home/InvoiceEfficiency";
import { ProductVideo } from "@/components/home/ProductVideo";
import { PlatformSurfaces } from "@/components/home/PlatformSurfaces";
import { Testimonials } from "@/components/home/Testimonials";
import { DEMO_URL } from "@/lib/links";

const STATS = [
  { v: "8+", label: "GPU and LLM providers supported" },
  { v: "Live", label: "Cost-quality routing" },
  { v: "Policy-bound", label: "At execution" },
  { v: "$738,983", label: "Recovered by a single customer" },
];

const STAGES = [
  {
    n: "Inform",
    icon: "/legacy/icons/stage-inform.svg",
    body: "Full cost attribution across cloud, data, and AI workloads. Down to the query, request, or deployment. Allocation that maps spend to the teams and systems that created it.",
  },
  {
    n: "Optimize",
    icon: "/legacy/icons/stage-optimize.svg",
    body: "Recommendations with quantified expected savings. Cost-quality tradeoffs modelled before you commit. Engineering-grade signals, not finance reports.",
  },
  {
    n: "Operate",
    icon: "/legacy/icons/stage-operate.svg",
    body: "Automation paths with approval workflows, full audit logs, and rollback readiness. Budgets enforced at the routing layer. Governance that engineers don't route around.",
  },
];

const INTEGRATIONS = [
  "AWS", "Azure", "Google Cloud", "Snowflake", "Databricks", "BigQuery",
  "Microsoft Fabric", "Azure Synapse", "OpenAI", "Anthropic", "HuggingFace",
  "Mistral AI", "Groq", "DeepSeek", "GitHub", "GitLab", "Azure DevOps",
  "Terraform", "Pulumi", "Kubernetes",
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="cv-hero-bg pt-[120px] pb-32 lg:pt-[160px] lg:pb-48 relative">
        <div className="cv-container relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cv-blue/40 text-cv-blue-light text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-cv-blue-light animate-pulse-dot" />
              Compute Economics Platform
            </div>
            <h1 className="cv-h1 mt-6 text-cv-ink">
              The Compute Economics Platform <br className="hidden md:block" />
              <span style={{ color: "#7CB8F8" }}>for the AI Era</span>
            </h1>
            <p className="cv-body-lg mt-6 text-cv-ink/75 max-w-3xl">
              CloudVerse connects cloud infrastructure, data platforms, and AI workloads under one control plane. Cost context arrives where decisions get made, not after bills land.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={DEMO_URL} className="cv-btn-primary" data-testid="link-hero-demo">
                Book a Demo <ArrowRight size={16} />
              </Link>
              <Link href="/platform/finops" className="cv-btn-ghost" data-testid="link-hero-explore">
                Explore the Platform
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT VIDEO */}
      <ProductVideo />

      {/* STATS STRIP */}
      <section className="border-y border-cv-line bg-cv-surface2/40">
        <div className="cv-container py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {STATS.map((s) => (
              <div key={s.label} data-testid={`stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`}>
                <div className="text-2xl lg:text-3xl font-display font-semibold text-cv-ink">{s.v}</div>
                <div className="text-sm text-cv-muted mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE PROBLEM (no header) */}
      <section className="cv-section">
        <div className="cv-container">
          <p className="text-xl lg:text-2xl leading-relaxed text-cv-ink/85 font-light">
            AI compute gets expensive by default. Data warehouse costs don&apos;t explain themselves. Cloud infrastructure spend grows faster than the teams managing it. The organizations that control this are the ones who ship cost intelligence into engineering workflows before the bill arrives, not after.
          </p>
          <p className="mt-6 text-xl lg:text-2xl leading-relaxed text-cv-ink font-medium">
            CloudVerse is how they do it.
          </p>
        </div>
      </section>

      {/* PRODUCTS */}
      <PlatformSurfaces />

      {/* BHHS CASE STUDY */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="relative overflow-hidden rounded-3xl border border-[#1664C0]/30 bg-[#0A0C14] p-8 shadow-[0_0_80px_-30px_rgba(22,100,192,0.5)] lg:p-14">
            {/* Subtle grid */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
                maskImage: "radial-gradient(ellipse at 0% 0%, #000 0%, transparent 70%)",
                WebkitMaskImage: "radial-gradient(ellipse at 0% 0%, #000 0%, transparent 70%)",
              }}
            />
            {/* Soft blue glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-32 right-0 h-72 w-[36rem] rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(22,100,192,0.22), transparent 70%)" }}
            />

            <div className="relative">
              <div className="cv-label mb-4 text-[#7C9BFF]">Case study — Berkshire Hathaway HomeServices</div>
              <h2 className="cv-h2 max-w-3xl text-white">
                How Berkshire Hathaway HomeServices recovered $738,983
              </h2>

              <div className="mt-12 mb-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#1664C0]/25 bg-[#1664C0]/15 md:grid-cols-3">
                {[
                  { v: "$101,736", l: "annual recovery" },
                  { v: "$61,582", l: "single month recovery" },
                  { v: "$738,984", l: "total recovered" },
                ].map((s) => (
                  <div key={s.l} className="bg-[#0B0E18] p-8">
                    <div className="font-display text-4xl font-semibold text-white lg:text-5xl">{s.v}</div>
                    <div className="mt-3 text-sm uppercase tracking-widest text-cv-muted">{s.l}</div>
                  </div>
                ))}
              </div>

              <p className="max-w-3xl leading-relaxed text-cv-ink/80">
                A growing mid-market AWS environment with fragmented tagging and no team-level attribution. CloudVerse connected spend to teams, surfaced the highest-impact anomalies, and gave the FinOps team a model that held up to finance review.
              </p>
              <p className="mt-6 max-w-3xl border-l-2 border-[#1664C0] pl-5 text-lg italic text-white/95">
                The waste was always there. It just had no address.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* HOW IT WORKS — lifecycle */}
      <section className="cv-section bg-[#0B0B0F]">
        <div className="cv-container">
          <div className="max-w-3xl mb-12">
            <div className="cv-label mb-3">Lifecycle</div>
            <h2 className="cv-h2 text-cv-ink">Three stages. One control plane.</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {STAGES.map((s, i) => (
              <div
                key={s.n}
                className="relative rounded-2xl border border-[#1664C0]/40 bg-[#0E0E14] p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex items-center rounded-full border border-[#1664C0] bg-[#1664C0]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#7C9BFF]">
                    Stage 0{i + 1}
                  </span>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#1664C0]/40 bg-[#1664C0]/10">
                    <img src={s.icon} alt="" aria-hidden className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold text-white">{s.n}</h3>
                <p className="text-cv-ink/75 leading-relaxed mt-4">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATION STRIP */}
      <section className="cv-section relative overflow-hidden">
        {/* Soft blue tint */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(22,100,192,0.12), transparent 70%)" }}
        />
        {/* Dotted coordinate grid backdrop */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundPosition: "0 0, 22px 22px",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(ellipse 75% 65% at 50% 45%, #000 35%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 65% at 50% 45%, #000 35%, transparent 100%)",
          }}
        />

        <div className="cv-container relative z-10 text-center">
          <div className="cv-label mb-3">Integrations</div>
          <h2 className="cv-h2 text-cv-ink max-w-3xl mx-auto">Connects to the stack your teams already use.</h2>

          {/* Logo + name cards */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: "AWS", src: "/legacy/integration/awstop.svg" },
              { name: "Azure", src: "/legacy/integration/Azuretop.svg" },
              { name: "Google Cloud", src: "/legacy/integration/googletop.svg" },
              { name: "Snowflake", src: "/legacy/integration/snowflake.svg" },
              { name: "Datadog", src: "/legacy/integration/datadog.svg" },
              { name: "Kubernetes", src: "/legacy/integration/kuber.svg" },
              { name: "Oracle", src: "/legacy/integration/oracle.svg" },
              { name: "Alibaba", src: "/legacy/integration/alibabatop.svg" },
              { name: "Tencent", src: "/legacy/integration/tencenttop.svg" },
              { name: "Spark", src: "/legacy/integration/sparktop.svg" },
              { name: "vCenter", src: "/legacy/integration/vcenter.svg" },
              { name: "DigitalOcean", src: "/legacy/integration/oceantop.svg" },
            ].map((l) => (
              <div
                key={l.name}
                className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#070710] px-5 py-4 shadow-[inset_0_0_24px_rgba(255,255,255,0.035),0_1px_0_0_rgba(255,255,255,0.02)]"
                data-testid={`integration-${l.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <img src={l.src} alt="" aria-hidden className="h-8 w-8 shrink-0 object-contain opacity-90" loading="lazy" />
                <span className="text-sm font-medium text-cv-ink/90 text-left">{l.name}</span>
              </div>
            ))}
          </div>

          <p className="text-cv-ink/75 max-w-3xl mx-auto text-sm mt-10">
            Plus {INTEGRATIONS.join(", ")}, and more.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cv-line bg-cv-surface2 text-sm text-cv-ink/85">
            <Check size={14} className="text-cv-teal" />
            Read-only by default. Automation is opt-in, scoped, and auditable.
          </div>
          <div className="mt-6">
            <Link href="/integrations" className="cv-btn-ghost" data-testid="link-integrations">
              View all integrations <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Customer logos marquee */}
      <CustomerLogos />

      {/* Efficiency Snapshot — gated invoice upload */}
      <InvoiceEfficiency compact />

      {/* FINAL CTA */}
      <section className="cv-section bg-[#0B0B0F]">
        <div className="cv-container">
          <div className="relative overflow-hidden rounded-[2rem] border border-[#1664C0]/20 bg-[#080B14] px-6 py-7 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:px-10 lg:py-10">
            {/* Soft blue tint */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(22,100,192,0.14), transparent 60%)" }}
            />
            {/* Subtle grid */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
                maskImage: "radial-gradient(ellipse at 50% 0%, #000 0%, transparent 70%)",
                WebkitMaskImage: "radial-gradient(ellipse at 50% 0%, #000 0%, transparent 70%)",
              }}
            />

            <div className="relative">
              {/* Orbit visual */}
              <div className="relative mx-auto mb-5 h-28 w-28 sm:h-32 sm:w-32">
                {/* Orbit rings */}
                <div className="absolute inset-0 rounded-full border border-white/[0.08]" />
                <div className="absolute inset-5 rounded-full border border-white/[0.06]" />
                <div className="absolute inset-10 rounded-full border border-[#1664C0]/15" />
                {/* Faded orbit nodes */}
                <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-[#1664C0]/70" />
                <span className="absolute right-2 top-1/3 h-1.5 w-1.5 rounded-full bg-[#7C9BFF]/50" />
                <span className="absolute bottom-3 left-5 h-1.5 w-1.5 rounded-full bg-white/30" />
                <span className="absolute bottom-6 right-6 h-1.5 w-1.5 rounded-full bg-[#1664C0]/40" />
                <span className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white/20" />
                {/* Center CloudVerse logo */}
                <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-[#1664C0]/30 bg-[#0B0E18]">
                  <img
                    src="/legacy/logo/cloudverse-icon.png"
                    alt="CloudVerse"
                    className="h-8 w-auto"
                  />
                </div>
              </div>

              <h2 className="cv-h2 mx-auto max-w-3xl text-white">
                Connect your first account in under 30 minutes.
              </h2>
              <p className="cv-body-lg mx-auto mt-5 max-w-2xl text-cv-ink/75">
                Most teams have their first non-obvious finding the same day.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Link href={DEMO_URL} className="cv-btn-primary" data-testid="link-final-demo">
                  Book a Demo <ArrowRight size={16} />
                </Link>
                <Link href="/contact" className="cv-btn-ghost" data-testid="link-final-sales">
                  Talk to Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
