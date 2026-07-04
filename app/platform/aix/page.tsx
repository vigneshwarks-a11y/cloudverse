import Link from "next/link";
import { ArrowRight, Bolt, BranchingPathsDown, CheckCircle, CloseCircle, Eye, PlugCircle, Route, Scale, ShieldCheck, Target, TrashBin2, DollarMinimalistic, FileText, type IconProps } from "@solar-icons/react";
import type { Metadata } from "next";
import type { ComponentType } from "react";

type Icon = ComponentType<IconProps>;
import { DEMO_URL } from "@/lib/links";
import { CountUpStat } from "@/components/CountUpStat";
import GovernanceBento from "@/components/product/GovernanceBento";
import NoBlackBoxes from "@/components/product/NoBlackBoxes";
import UseCaseBento from "@/components/product/UseCaseBento";
import AixRoiSplit from "@/components/product/AixRoiSplit";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { PlatformHeroMockup, type MockupTab } from "@/components/product/PlatformHeroMockup";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "AIX — The Control Plane for Enterprise AI | CloudVerse",
  description:
    "Route, govern, and meter every AI request across models, clouds, GPUs, and private endpoints. Cut AI cost 40–90%. The decision happens before the request, not after the bill.",
  keywords: ["AI cost optimization", "LLM routing", "GPU cost management", "enterprise AI governance", "AI gateway", "model routing"],
  alternates: { canonical: "/platform/aix" },
  openGraph: {
    title: "AIX — The Control Plane for Enterprise AI",
    description: "Route, govern, and meter every AI request across models, clouds, GPUs, and private endpoints. Cut AI cost 40–90%.",
    url: "/platform/aix",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "CloudVerse AIX — AI Cost Control Plane" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AIX — The Control Plane for Enterprise AI",
    description: "Route, govern, and meter every AI request. Cut AI cost 40–90%. Decision-time governance.",
  },
};

const AIX_TABS: MockupTab[] = [
  { id: "routing", label: "Routing", copy: "Every request scored live on cost, latency, and quality. Best-fit route wins, with a fallback attached.", icon: Route },
  { id: "governance", label: "Governance", copy: "Budget caps, provider allowlists, and residency rules enforced at the routing layer, before a request goes out.", icon: ShieldCheck },
  { id: "attribution", label: "Cost Attribution", copy: "Cost lands against the request, the feature, and the tenant automatically. No spreadsheet reconstruction.", icon: DollarMinimalistic },
  { id: "audit", label: "Audit Trail", copy: "Every routing decision logged: constraints active, routes evaluated, route selected, and why.", icon: FileText },
];

const STATS = [
  { v: "40–90%", l: "cost reduction on production workloads" },
  { v: "<15ms", l: "routing overhead per request" },
  { v: "96.8%", l: "lower cost vs hardcoded Claude" },
  { v: "28.5%", l: "faster vs hardcoded baseline" },
];

const STEP_ICONS = [PlugCircle, ShieldCheck, Target, BranchingPathsDown, Scale, Eye];

const STEPS = [
  { n: "Connect", body: "Add provider API keys and endpoints. Minutes per provider. No application changes required." },
  { n: "Govern", body: "Define constraints: latency ceiling, budget cap, allowed providers, compliance rules, quality floor. Per workload, per team, per region." },
  { n: "Score", body: "Each route is evaluated on real-time latency distributions, effective unit cost, and availability signals. Live, not benchmarked." },
  { n: "Route", body: "Policy constraints filter the scored routes. The best fit within policy is selected. Primary route and fallback returned together." },
  { n: "Measure", body: "Cost per request, cost per feature, cost per tenant. Attribution automatic. No reconstruction from billing data." },
  { n: "Audit", body: "Every routing decision logged: constraints active, routes evaluated, route selected, reason for selection, cost and latency outcome." },
];

const COMPARE = [
  ["Live multi-signal route scoring", "No", "Partial", "No", "Yes"],
  ["Constraint-driven intent model", "No", "No", "No", "Yes"],
  ["Cost-aware decisioning per request", "No", "Limited", "Post-hoc", "Yes"],
  ["Policy enforcement at routing layer", "Limited", "Partial", "No", "Yes"],
  ["Explainable routing decisions", "No", "No", "No", "Yes"],
  ["Primary + fallback route output", "Manual", "Basic", "No", "Yes"],
  ["GPU + managed API routing", "No", "No", "No", "Yes"],
  ["Zero vendor lock-in", "Partial", "Partial", "N/A", "Yes"],
];

const ROI = [
  ["1M requests", "$2,980", "$298", "$2,682"],
  ["5M requests", "$14,900", "$1,490", "$13,410"],
  ["10M requests", "$29,800", "$2,980", "$26,820"],
  ["50M requests", "$149,000", "$14,900", "$134,100"],
];

const PROVIDERS = [
  ["OpenAI", "GPT-4o, GPT-4o-mini, GPT-4 Turbo, GPT-3.5 Turbo. Managed API."],
  ["Anthropic", "Claude 3.5 Sonnet, Claude 3 Haiku, Claude 3 Opus. Managed API."],
  ["HuggingFace", "Hosted inference endpoints and open models via HuggingFace Hub."],
  ["Mistral AI", "Mistral Large, Mistral Small, Mixtral 8x7B. Managed API and self-hosted."],
  ["Llama / Ollama", "Meta Llama 3 family via Ollama and compatible deployments."],
  ["Cohere", "Command R, Command R+, reranking endpoints. Managed API."],
  ["Together AI", "Open model inference at scale. Llama, Mistral, Qwen variants."],
  ["Groq", "Ultra-low latency LPU inference. Llama and Mistral family."],
  ["DeepSeek", "DeepSeek-V3, DeepSeek-R1. Managed API."],
];

const USE_CASES = [
  {
    n: "1",
    title: "Multi-provider cost arbitrage",
    sit: "A SaaS company runs 15M AI requests per month through a single hardcoded premium model.",
    prob: "$44,700/month. 70% of those requests could be handled by a smaller model at equivalent quality.",
    how: "Profiles each request type by task complexity. Routes to the lowest-cost model that meets the defined quality floor. No prompt changes. No application rewrites.",
    after: "~$12,600/month. 30% premium, 70% cost-optimised. Full cost allocation by request type.",
  },
  {
    n: "2",
    title: "Compliance-bound routing",
    sit: "A financial services firm operates in the EU, UK, and Singapore, each with different data residency requirements. Provider allowlists are maintained in a spreadsheet.",
    prob: "Manual enforcement. Unapproved providers get used in testing. Compliance audits require manual log reconstruction.",
    how: "Residency rules configured per org and region in the AIX policy engine. PII handling rules enforced before provider selection. Every routing decision produces a machine-generated audit trace.",
    after: "Zero unapproved provider incidents post-deployment. Audit logs complete, not manually assembled. Security team removes spreadsheet enforcement process entirely.",
  },
  {
    n: "3",
    title: "GPU cost control for AI agents",
    sit: "An enterprise team runs AI agents for internal automation. Monthly AI spend varies by up to 3x depending on agent activity.",
    prob: "No cost visibility per agent run. Budget caps exist in documentation but are not enforced at the infrastructure layer. Spend spikes get raised by finance two weeks after the fact.",
    how: "Per-agent budget constraints applied at the routing layer. When a ceiling is approached, AIX routes to lower-cost alternatives automatically. Cost per agent run visible in real time.",
    after: "Monthly spend variance drops from 3x to under 15%. Finance gets allocation data without engineering involvement. Budget enforcement becomes automated, not a policy conversation.",
  },
  {
    n: "4",
    title: "Multi-model AI product infrastructure",
    sit: "A product team builds an AI-native app with five distinct features, each with different latency, quality, and cost requirements. One model is hardcoded per feature.",
    prob: "Six months in, two routing choices are suboptimal. One due to pricing, one due to latency degradation. Fixing either requires a deployment cycle.",
    how: "Each feature is a separate AIX workload with its own constraint profile. When a better-fit model becomes available, AIX routes there automatically. Routing updates happen at the constraint layer, not the code layer.",
    after: "Product team responds to model market changes in hours, not sprint cycles. Per-feature cost visible in the AIX dashboard. No deployment needed when providers or prices change.",
  },
];

const TRACE_JSON = `{
  "requestId": "req_a1b2c3",
  "constraints": {
    "budget_cap": "$0.0005",
    "region": "EU",
    "latency_max": 4000
  },
  "routesEvaluated": 4,
  "selectedRoute": "GPT-4o-mini (Together AI, eu-west)",
  "reason": "Lowest cost within latency and region constraints",
  "result": {
    "cost": "$0.00010/req",
    "latency": "3,962ms",
    "fallback": "Mistral-Large (eu-central)"
  }
}`;

function CompCell({ v }: { v: string }) {
  if (v === "No") return <span className="inline-flex items-center gap-1 text-cv-muted"><CloseCircle weight="Linear" size={14} /> No</span>;
  return <span className="text-cv-muted">{v}</span>;
}

export default function AIXPage() {
  return (
    <>
      {/* HERO */}
      <div className="cv-hero-bg">
        <section className="pt-[120px] sm:pt-[160px] pb-16 lg:pt-[240px] lg:pb-20 relative">
          <div className="max-w-cv mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-20">
              {/* Left: badge + headline + CTAs */}
              <div className="flex-1 min-w-0 lg:max-w-xl xl:max-w-2xl">
                <span className="block text-xs font-semibold uppercase tracking-widest text-[#1664C0] dark:text-[#7CB8F8]">
                  AIX
                </span>
                <h1 className="cv-h1 mt-6 leading-[1.25] text-cv-ink">The Control Plane for Enterprise AI.</h1>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={DEMO_URL} className="cv-btn-primary"><span>Book a Demo</span><ArrowRight weight="Linear" size={16} /></Link>
                  <Link href="/integrations" className="cv-btn-ghost">Explore the Platform</Link>
                </div>
              </div>

              {/* Right: description */}
              <div className="mt-10 lg:mt-0 lg:max-w-xs xl:max-w-sm shrink-0">
                <p className="cv-body text-cv-ink/70">
                  Route, govern, and meter every AI request across your models, clouds, GPUs, and private endpoints. The cost decision gets made before the request goes out, not in a spreadsheet after the bill lands.
                </p>
                <p className="mt-4 text-sm text-cv-muted italic">Optimizing the future of enterprise AI consumption.</p>
              </div>
            </div>
          </div>
        </section>

        {/* HERO MOCKUP */}
        <PlatformHeroMockup tabs={AIX_TABS} />
      </div>

      {/* STATS */}
      <section className="pt-8 pb-12 lg:pt-10 lg:pb-16">
        <div className="max-w-cv mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3">
            {STATS.map((s) => (
              <div
                key={s.l}
                className="flex flex-col items-center justify-center rounded-2xl border border-cv-ink/10 dark:border-white/10 px-6 py-10 text-center bg-white/40 dark:bg-[#0D0D0D] backdrop-blur-sm"
              >
                <CountUpStat value={s.v} className="font-mono text-3xl lg:text-4xl font-bold text-cv-ink tracking-tight" />
                <p className="mt-3 text-sm font-medium text-cv-muted tracking-wide max-w-[160px] line-clamp-2">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="cv-section">
        <div className="max-w-cv mx-auto px-5 sm:px-6 lg:px-8">
          <h2 className="cv-h2 text-cv-ink">AI compute is becoming too expensive to hardcode.</h2>
          <p className="cv-body-lg text-cv-ink/80 mt-6">
            Most teams make AI infrastructure decisions once. Model endpoint, provider, region, failover logic, cost assumptions. These get buried in application code. Six months later, a cheaper model handles 70% of those requests at equivalent quality. Nobody knows.
          </p>
          <p className="cv-body-lg text-cv-ink/80 mt-4">
            Hardcoded decisions don&apos;t update when pricing shifts. They don&apos;t reroute when a provider degrades. They don&apos;t flag when a smaller model meets quality requirements at a third of the cost. That gap is where most AI infrastructure spend goes unmanaged.
          </p>
          <div className="grid md:grid-cols-2 gap-5 mt-10">
            {/* Before — legacy / inactive */}
            <div className="relative overflow-hidden rounded-2xl border border-cv-line/40 bg-cv-card dark:bg-[#0D0D0D] p-6">
              {/* Faint static node pattern */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                  backgroundImage: "radial-gradient(hsl(var(--cv-ink) / 0.06) 1px, transparent 1px)",
                  backgroundSize: "18px 18px",
                }}
              />
              <div className="relative">
                <div className="cv-label mb-3 text-cv-muted">Before AIX (hardcoded)</div>
                <ul className="space-y-2 text-sm text-cv-ink/70">
                  <li>• Model: Claude Sonnet</li>
                  <li>• Provider: Anthropic</li>
                  <li>• Region: us-east-1</li>
                  <li>• Routing: static</li>
                  <li>• Cost assumptions: set at launch, never revisited</li>
                </ul>
              </div>
            </div>
            {/* After — premium / active */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-cv-card dark:bg-[#0D0D0D] p-6">
              {/* Dynamic blue grid pattern */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(34,120,224,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(34,120,224,0.13) 1px, transparent 1px)",
                  backgroundSize: "26px 26px",
                  maskImage: "radial-gradient(ellipse 85% 80% at 75% 0%, #000 10%, transparent 75%)",
                  WebkitMaskImage: "radial-gradient(ellipse 85% 80% at 75% 0%, #000 10%, transparent 75%)",
                }}
              />
              {/* Blue blend glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 right-0 h-48 w-72 rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(34,120,224,0.28), transparent 70%)" }}
              />
              <div className="relative">
                <div className="cv-label mb-3" style={{ color: "#4D9AEF" }}>After AIX (dynamic)</div>
                <ul className="space-y-2 text-sm text-cv-ink/90">
                  <li>• Model: evaluated per request against constraints</li>
                  <li>• Provider: scored across all connected providers</li>
                  <li>• Region: applied per data residency policy</li>
                  <li>• Routing: live signal evaluation on every request</li>
                  <li>• Cost: attributed per request, per feature, per tenant</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT AIX DOES */}
      <section className="cv-section relative overflow-hidden bg-cv-surface">
        {/* Top-center brand radial gradient */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[28rem]"
          style={{ background: "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(34,120,224,0.16), transparent 70%)" }}
        />
        <div className="max-w-cv mx-auto px-5 sm:px-6 lg:px-8 relative">
          <h2 className="cv-h2 text-cv-ink mb-5">How AIX controls every AI request.</h2>
          <p className="cv-body-lg text-cv-muted mb-2">
            AIX sits between your application and every AI provider you use. On every request, it evaluates all available routes against the constraints your team has defined, and returns the best one, with a fallback and a full decision log.
          </p>
          <p className="text-cv-muted italic mb-10">A gateway executes a routing rule you wrote. AIX evaluates whether that rule is still the right one.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {STEPS.map((s, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <div
                  key={s.n}
                  className="group rounded-2xl border border-cv-line/40 bg-cv-card dark:bg-[#0D0D0D] p-6 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#2278E0]/25 bg-[#2278E0]/10 text-[#2278E0] transition-colors duration-300 group-hover:bg-[#2278E0]/15">
                    <Icon size={20} />
                  </div>
                  <div className="text-xs text-cv-muted">Step 0{i + 1}</div>
                  <h3 className="font-display font-semibold text-cv-ink text-lg mt-1">{s.n}</h3>
                  <p className="text-sm text-cv-muted leading-relaxed mt-3">{s.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHAT AIX IS NOT — comparison */}
      <section className="cv-section">
        <div className="max-w-cv mx-auto px-5 sm:px-6 lg:px-8">
          <h2 className="cv-h2 text-cv-ink mb-10">A gateway executes a rule you wrote. AIX decides what the rule should be.</h2>
          {/* Desktop/tablet: full comparison table */}
          <div className="hidden md:block overflow-x-auto rounded-2xl border border-cv-line/40 bg-cv-card dark:bg-[#0D0D0D] shadow-[0_0_60px_-20px_rgba(34,120,224,0.25)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-cv-line">
                  <th className="p-4 text-cv-ink font-medium">Capability</th>
                  <th className="p-4 text-cv-muted font-medium">Gateway / Proxy</th>
                  <th className="p-4 text-cv-muted font-medium">LLM Gateway</th>
                  <th className="p-4 text-cv-muted font-medium">Observability Tool</th>
                  <th
                    className="p-4 font-semibold"
                    style={{
                      color: "#2278E0",
                      background: "rgba(34,120,224,0.08)",
                      textShadow: "0 0 16px rgba(34,120,224,0.55)",
                    }}
                  >
                    AIX
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row, i) => (
                  <tr key={i} className="border-t border-cv-line">
                    <td className="p-4 text-cv-ink/90">{row[0]}</td>
                    <td className="p-4"><CompCell v={row[1]} /></td>
                    <td className="p-4"><CompCell v={row[2]} /></td>
                    <td className="p-4"><CompCell v={row[3]} /></td>
                    <td className="p-4 font-semibold" style={{ background: "rgba(34,120,224,0.08)" }}>
                      <span
                        className="inline-flex items-center gap-1.5"
                        style={{ color: "#2278E0", textShadow: "0 0 14px rgba(34,120,224,0.6)" }}
                      >
                        <CheckCircle weight="Linear" size={15} /> Yes
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: stacked cards, no horizontal scroll needed */}
          <div className="md:hidden space-y-3">
            {COMPARE.map((row, i) => (
              <div key={i} className="rounded-2xl border border-cv-line/40 bg-cv-card dark:bg-[#0D0D0D] p-4">
                <div className="text-cv-ink font-medium mb-3">{row[0]}</div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-cv-muted">Gateway / Proxy</span>
                    <CompCell v={row[1]} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-cv-muted">LLM Gateway</span>
                    <CompCell v={row[2]} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-cv-muted">Observability Tool</span>
                    <CompCell v={row[3]} />
                  </div>
                  <div
                    className="flex items-center justify-between rounded-lg px-2.5 py-1.5 -mx-2.5 mt-1"
                    style={{ background: "rgba(34,120,224,0.08)" }}
                  >
                    <span className="font-semibold" style={{ color: "#2278E0" }}>AIX</span>
                    <span className="inline-flex items-center gap-1.5 font-semibold" style={{ color: "#2278E0" }}>
                      <CheckCircle weight="Linear" size={15} /> Yes
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-cv-ink/75 leading-relaxed mt-8 max-w-4xl">
            Observability tools tell you what happened after spend occurred. AIX acts before a request goes out. The routing decision, and the cost attached to it, is made explicitly before a token reaches any provider.
          </p>
        </div>
      </section>

      {/* ROI */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="max-w-cv mx-auto px-5 sm:px-6 lg:px-8">
          <h2 className="cv-h2 text-cv-ink mb-5">The cost of not routing.</h2>
          <p className="cv-body-lg text-cv-ink/75 mb-10">
            Every hardcoded model endpoint is spending money without making a decision. AIX makes the decision explicitly. The saving is the difference.
          </p>
          <AixRoiSplit roi={ROI} />
          <h3 className="cv-h3 text-cv-ink mt-14 mb-6">Three mechanisms</h3>
          <div className="grid md:grid-cols-3 gap-3">
            {([
              ["Cost arbitrage", "AIX routes to the lowest-cost model that meets your quality floor. Prices change constantly. AIX adjusts automatically.", Scale],
              ["Latency wins", "Faster routing reduces infrastructure overhead on time-sensitive workloads. Smaller models are often faster too.", Bolt],
              ["Waste elimination", "Stops premium model usage on tasks a smaller model handles equally well. Most applications have multiple task types. Few need the flagship model for all of them.", TrashBin2],
            ] as [string, string, Icon][]).map(([t, b, Icon]) => (
              <div key={t} className="rounded-2xl border border-cv-line/40 bg-cv-surface dark:bg-[#0D0D0D] p-6">
                <Icon className="h-9 w-9" style={{ color: "#2278E0" }} aria-hidden />
                <h4 className="font-display font-semibold text-cv-ink mt-4">{t}</h4>
                <p className="text-sm text-cv-ink/75 mt-3 leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOR FINOPS */}
      <section className="cv-section">
        <div className="max-w-cv mx-auto px-5 sm:px-6 lg:px-8">
          <h2 className="cv-h2 text-cv-ink">From cloud cost reporting to AI compute economics.</h2>
          <p className="cv-body-lg text-cv-ink/75 mt-5">
            AIX gives you cost-per-request, cost-per-feature, and cost-per-tenant allocation. Budget caps are enforced at the routing layer before spend occurs. No spreadsheet reconstruction after the fact.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Cost-per-request, cost-per-feature, cost-per-tenant allocation — automatic",
              "Budget caps enforced before a request goes out, not after the bill arrives",
              "Scenario modelling: simulate cost impact before traffic or model changes go live",
              "Anomaly detection: cost deviations flagged before they compound",
              "Spend attribution: know which feature, tenant, or workload is driving AI cost",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3 text-cv-ink/85">
                <CheckCircle weight="Linear" size={18} className="text-cv-teal mt-0.5 shrink-0" /> {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* GOVERNANCE */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="max-w-cv mx-auto px-5 sm:px-6 lg:px-8">
          <h2 className="cv-h2 text-cv-ink mb-5">Built for enterprise AI governance.</h2>
          <p className="cv-body-lg text-cv-ink/75 mb-10">
            Every routing decision AIX makes is recorded, auditable, and explainable. Compliance controls are enforced at the routing layer, not bolted on after.
          </p>
          <GovernanceBento />
        </div>
      </section>

      {/* NO BLACK BOXES */}
      <NoBlackBoxes traceJson={TRACE_JSON} />

      {/* USE CASES */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="max-w-cv mx-auto px-5 sm:px-6 lg:px-8">
          <h2 className="cv-h2 text-cv-ink mb-12">Four problems AIX fixes.</h2>
          <UseCaseBento useCases={USE_CASES} />
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section className="cv-section">
        <div className="max-w-cv mx-auto px-5 sm:px-6 lg:px-8">
          <h2 className="cv-h2 text-cv-ink mb-5">Connect once. Route everywhere.</h2>
          <p className="cv-body-lg text-cv-ink/75 mb-10">
            Add your providers once. AIX handles routing, fallback, and cost tracking across all of them. No code changes when you add a new provider.
          </p>
          <h3 className="cv-label mb-4">Supported model providers</h3>
          <div className="overflow-x-auto rounded-2xl border border-cv-line/40">
            <table className="w-full text-sm">
              <thead className="bg-cv-surface2 dark:bg-[#0D0D0D]">
                <tr className="text-left">
                  <th className="p-4 text-cv-ink font-medium w-1/4">Provider</th>
                  <th className="p-4 text-cv-ink font-medium">Models and notes</th>
                </tr>
              </thead>
              <tbody>
                {PROVIDERS.map(([p, n]) => (
                  <tr key={p} className="border-t border-cv-line">
                    <td className="p-4 font-medium text-cv-ink">{p}</td>
                    <td className="p-4 text-cv-ink/75">{n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-2xl border border-cv-line/40 bg-cv-surface2 dark:bg-[#0D0D0D] p-7 mt-10">
            <h3 className="cv-h3 text-cv-ink mb-3">Private deployments and GPU infrastructure</h3>
            <p className="text-cv-ink/75 mb-4">
              AIX treats private GPU capacity as a first-class routing target alongside managed APIs. If you run models on dedicated hardware or a NeoCloud provider, AIX routes to them with the same cost and policy logic.
            </p>
            <ul className="space-y-2 text-cv-ink/80 text-sm">
              <li>• Private model deployments: vLLM, TGI, custom inference</li>
              <li>• GPU providers: CoreWeave, Lambda Labs, RunPod</li>
              <li>• On-premises infrastructure: your own inference hardware</li>
            </ul>
          </div>
        </div>
      </section>

      {/* WHY AIX */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink">Most tools route traffic. AIX decides where it should go.</h2>
          <div className="mt-6 space-y-4">
            <p className="cv-body-lg text-cv-ink/75">
              A gateway executes whatever rule you gave it. If you told it to send traffic to Provider A, that is where it goes, even when Provider B is 90% cheaper and just as capable. A gateway has no scoring engine and no live signal evaluation. It is plumbing.
            </p>
            <p className="cv-body-lg text-cv-ink/80">
              AIX is not a gateway replacement. It is the decision layer that makes routing intelligent rather than static.
            </p>
            <div className="cv-label mt-2 mb-3">AIX is the right fit when:</div>
            <ul className="space-y-2 text-cv-ink/85">
              {[
                "You run AI workloads in production across more than one provider",
                "AI spend is material enough that optimisation has measurable impact",
                "Compliance requirements constrain provider or region selection",
                "Your team hardcoded model endpoints and has not revisited them",
                "You want cost-aware routing without rebuilding your application",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3"><CheckCircle weight="Linear" size={16} className="text-cv-teal mt-1 shrink-0" /> {b}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <ClosingCTA />
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Platform", href: "/platform/finops" }, { name: "AIX", href: "/platform/aix" }]} />
    </>
  );
}
