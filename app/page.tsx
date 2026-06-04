import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { CustomerLogos } from "@/components/CustomerLogos";
import { InvoiceEfficiency } from "@/components/home/InvoiceEfficiency";
import { ProductVideo } from "@/components/home/ProductVideo";
import { DEMO_URL } from "@/lib/links";

const STATS = [
  { v: "8+", label: "GPU and LLM providers supported" },
  { v: "Live", label: "Cost-quality routing" },
  { v: "Policy-bound", label: "At execution" },
  { v: "$738,983", label: "Recovered by a single customer" },
];

const MODULES = [
  {
    name: "AIX",
    href: "/platform/aix",
    color: "#6954D4",
    body: "Routes every AI request to the lowest-cost model that meets your quality and latency requirements. Budget caps applied before spend occurs. Full decision trace on every request.",
  },
  {
    name: "DataX",
    href: "/platform/datax",
    color: "#D97706",
    body: "Finds the queries running up your warehouse bill. Attributes cost to the query, pipeline, and team that ran it. Suggests the fix. Automates it when you're ready.",
  },
  {
    name: "DevX",
    href: "/platform/devx",
    color: "#0E9E7A",
    body: "Catches infrastructure cost regressions in pull requests before they reach production. Engineers see what their changes cost at the moment they can still change something.",
  },
  {
    name: "FinOps Platform",
    href: "/platform/finops",
    color: "#1664C0",
    body: "Multi-cloud cost intelligence across AWS, Azure, and GCP. Allocation, anomaly detection, commitment planning, and variance reporting on one model that reconciles to finance.",
  },
];

const STAGES = [
  {
    n: "Inform",
    body: "Full cost attribution across cloud, data, and AI workloads. Down to the query, request, or deployment. Allocation that maps spend to the teams and systems that created it.",
  },
  {
    n: "Optimize",
    body: "Recommendations with quantified expected savings. Cost-quality tradeoffs modelled before you commit. Engineering-grade signals, not finance reports.",
  },
  {
    n: "Operate",
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
        <div className="cv-container max-w-4xl">
          <p className="text-xl lg:text-2xl leading-relaxed text-cv-ink/85 font-light">
            AI compute gets expensive by default. Data warehouse costs don&apos;t explain themselves. Cloud infrastructure spend grows faster than the teams managing it. The organizations that control this are the ones who ship cost intelligence into engineering workflows before the bill arrives, not after.
          </p>
          <p className="mt-6 text-xl lg:text-2xl leading-relaxed text-cv-ink font-medium">
            CloudVerse is how they do it.
          </p>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <div className="max-w-3xl mb-12">
            <div className="cv-label mb-3">Platform overview</div>
            <h2 className="cv-h2 text-cv-ink">One control plane. Four compute surfaces.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {MODULES.map((m) => (
              <Link
                key={m.name}
                href={m.href}
                className="group rounded-2xl border border-cv-line bg-cv-surface p-7 hover:border-cv-ink/30 transition-colors"
                data-testid={`card-module-${m.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: m.color }} />
                  <h3 className="cv-h3 text-cv-ink">{m.name}</h3>
                </div>
                <p className="text-cv-ink/75 leading-relaxed">{m.body}</p>
                <div className="mt-5 inline-flex items-center gap-1 text-sm text-cv-blue-light group-hover:gap-2 transition-all">
                  Learn more <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BHHS CASE STUDY */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="rounded-3xl border border-cv-line bg-cv-surface2 p-8 lg:p-12">
            <div className="cv-label mb-3">Case study — Berkshire Hathaway HomeServices</div>
            <h2 className="cv-h2 text-cv-ink max-w-3xl">
              How Berkshire Hathaway HomeServices recovered $738,983
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 mb-10">
              {[
                { v: "$101,736", l: "annual recovery" },
                { v: "$61,582", l: "single month recovery" },
                { v: "$738,984", l: "total recovered" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl border border-cv-line p-6 bg-cv-surface">
                  <div className="text-3xl lg:text-4xl font-display font-semibold text-cv-ink">{s.v}</div>
                  <div className="text-sm text-cv-muted mt-2">{s.l}</div>
                </div>
              ))}
            </div>
            <p className="text-cv-ink/80 leading-relaxed max-w-3xl">
              A growing mid-market AWS environment with fragmented tagging and no team-level attribution. CloudVerse connected spend to teams, surfaced the highest-impact anomalies, and gave the FinOps team a model that held up to finance review.
            </p>
            <p className="text-cv-ink/95 italic mt-4 max-w-3xl">
              The waste was always there. It just had no address.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — lifecycle */}
      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <div className="max-w-3xl mb-12">
            <div className="cv-label mb-3">Lifecycle</div>
            <h2 className="cv-h2 text-cv-ink">Three stages. One control plane.</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {STAGES.map((s, i) => (
              <div key={s.n} className="rounded-2xl border border-cv-line bg-cv-surface p-7">
                <div className="text-xs uppercase tracking-widest text-cv-muted">Stage 0{i + 1}</div>
                <h3 className="cv-h3 text-cv-ink mt-2">{s.n}</h3>
                <p className="text-cv-ink/75 leading-relaxed mt-4">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATION STRIP */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="max-w-3xl mb-10">
            <div className="cv-label mb-3">Integrations</div>
            <h2 className="cv-h2 text-cv-ink">Connects to the stack your teams already use.</h2>
          </div>

          {/* Logo grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-10">
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
                className="h-20 rounded-xl border border-cv-line bg-cv-surface2 flex items-center justify-center p-4"
                data-testid={`integration-${l.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <img src={l.src} alt={l.name} className="max-h-10 max-w-full object-contain opacity-90" loading="lazy" />
              </div>
            ))}
          </div>

          <p className="text-cv-ink/75 max-w-3xl text-sm">
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
      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <div className="rounded-3xl border border-cv-line bg-cv-surface p-10 lg:p-16 text-center">
            <h2 className="cv-h2 text-cv-ink max-w-3xl mx-auto">
              Connect your first account in under 30 minutes.
            </h2>
            <p className="cv-body-lg text-cv-ink/75 mt-5 max-w-2xl mx-auto">
              Most teams have their first non-obvious finding the same day.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href={DEMO_URL} className="cv-btn-primary" data-testid="link-final-demo">
                Book a Demo <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="cv-btn-ghost" data-testid="link-final-sales">
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
