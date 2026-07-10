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
import { PlatformHeroMockup, type MockupTab } from "@/components/product/PlatformHeroMockup";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import OrbitCore from "@/components/OrbitCore";

export const metadata: Metadata = {
  title: "AIX: The Control Plane for Enterprise AI | CloudVerse",
  description:
    "Route, govern, and meter every AI request across models, clouds, GPUs, and private endpoints. Cut AI cost 40–90%. The decision happens before the request, not after the bill.",
  keywords: ["AI cost optimization", "LLM routing", "GPU cost management", "enterprise AI governance", "AI gateway", "model routing"],
  alternates: { canonical: "/platform/aix" },
  openGraph: {
    title: "AIX: The Control Plane for Enterprise AI",
    description: "Route, govern, and meter every AI request across models, clouds, GPUs, and private endpoints. Cut AI cost 40–90%.",
    url: "/platform/aix",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "CloudVerse AIX: AI Cost Control Plane" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AIX: The Control Plane for Enterprise AI",
    description: "Route, govern, and meter every AI request. Cut AI cost 40–90%. Decision-time governance.",
  },
};

const AIX_TABS: MockupTab[] = [
  { id: "routing", label: "Routing", copy: "Every request scored live on cost, latency, and quality. The best-fit route wins, with a fallback attached.", icon: Route },
  { id: "governance", label: "Governance", copy: "Policy, access, residency, and provider trust enforced before a request runs.", icon: ShieldCheck },
  { id: "attribution", label: "Cost Attribution", copy: "Every run lands against a team, feature, and tenant. Automatically.", icon: DollarMinimalistic },
  { id: "audit", label: "Audit Trail", copy: "Every routing decision logged with the constraints, the candidates, and why one won.", icon: FileText },
];

const STATS = [
  { v: "40–90%", l: "cost reduction on production workloads" },
  { v: "<15ms", l: "routing overhead per request" },
  { v: "96.8%", l: "lower cost vs a hardcoded Claude Sonnet setup" },
  { v: "28.5%", l: "faster than that baseline" },
];

const STEP_ICONS = [PlugCircle, ShieldCheck, Target, BranchingPathsDown, Scale, Eye];

const STEPS = [
  { n: "Connect", body: "Add your provider API keys and endpoints. Minutes per provider, no application change." },
  { n: "Govern", body: "Set the constraints: latency ceiling, budget cap, allowed providers, residency, quality floor." },
  { n: "Score", body: "Each route is evaluated live on cost, latency distribution, and quality fit." },
  { n: "Route", body: "Policy filters the scored routes; the best-fit wins and a fallback stands ready." },
  { n: "Measure", body: "Cost per request, per feature, and per tenant, tracked as it happens." },
  { n: "Audit", body: "Every decision logged: constraints active, routes considered, and why one won." },
];

const COMPARE = [
  ["Live multi-signal route scoring", "No", "Partial", "No", "Yes"],
  ["Constraint-driven intent model", "No", "No", "No", "Yes"],
  ["Cost-aware decisioning per request", "No", "Limited", "Post-hoc", "Yes"],
  ["Policy enforcement at routing layer", "Limited", "Partial", "No", "Yes"],
  ["Explainable routing decisions", "No", "No", "No", "Yes"],
  ["Primary + fallback route output", "Manual", "Basic", "No", "Yes"],
  ["GPU + managed API routing", "No", "No", "No", "Yes"],
  ["No vendor lock-in", "Partial", "Partial", "N/A", "Yes"],
];

const ROI = [
  ["1M requests", "$2,980", "$298", "$2,682"],
  ["5M requests", "$14,900", "$1,490", "$13,410"],
  ["10M requests", "$29,800", "$2,980", "$26,820"],
  ["50M requests", "$149,000", "$14,900", "$134,100"],
];

const PROVIDERS = [
  ["OpenAI", "GPT-4o, GPT-4o-mini, GPT-4 Turbo, GPT-3.5 Turbo."],
  ["Anthropic", "Claude 3.5 Sonnet, Claude 3 Haiku, Claude 3 Opus."],
  ["Google", "Gemini family."],
  ["Cohere", "Command R, Command R+, reranking."],
  ["Mistral AI", "Mistral Large, Mistral Small, Mixtral 8x7B."],
  ["Llama / Ollama", "Meta Llama 3 family."],
  ["Together AI", "Open-model inference at scale."],
  ["Groq", "Ultra-low-latency LPU inference."],
  ["DeepSeek", "DeepSeek-V3, DeepSeek-R1."],
  ["HuggingFace", "Hosted inference endpoints and open models."],
];

const USE_CASES = [
  {
    n: "1",
    title: "Multi-provider cost arbitrage",
    sit: "A SaaS company runs 15M AI requests a month.",
    prob: "$44,700/month, and 70% of it could run on a smaller model at the same quality.",
    how: "AIX profiles each request by task complexity and routes accordingly.",
    after: "~$12,600/month. 30% on premium models, 70% cost-optimized.",
  },
  {
    n: "2",
    title: "Compliance-bound routing",
    sit: "A financial services firm operates across the EU, UK, and Singapore.",
    prob: "Residency is enforced by hand, and unapproved providers slip into testing.",
    how: "Residency rules configured per org and region, enforced before routing.",
    after: "Zero unapproved-provider incidents. Audit logs complete.",
  },
  {
    n: "3",
    title: "GPU cost control for AI agents",
    sit: "An enterprise runs AI agents for internal automation.",
    prob: "No per-run cost visibility. Budget caps exist only in a doc.",
    how: "Per-agent budget constraints applied at the routing layer.",
    after: "Monthly spend variance drops from 3x to under 15%.",
  },
  {
    n: "4",
    title: "Multi-model AI product infrastructure",
    sit: "A product team ships an AI-native app with five distinct features.",
    prob: "Six months in, two routing choices are quietly wrong.",
    how: "Each feature is its own AIX workload with its own constraint profile.",
    after: "The team responds to model-market changes in hours, not a sprint.",
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
                <h1 className="cv-h1 mt-6 leading-[1.25] text-cv-ink">The control plane for enterprise AI.</h1>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={DEMO_URL} className="cv-btn-primary"><span>Book a Demo</span><ArrowRight weight="Linear" size={16} /></Link>
                  <Link href="/integrations" className="cv-btn-ghost">Explore the platform</Link>
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
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
            <h2 className="cv-h2 text-cv-ink">AI compute is becoming too expensive to hardcode.</h2>
            <div>
              <p className="cv-body-lg text-cv-ink/80">
                Most teams pick a model once, wire it into the app, and move on. Six months later a cheaper model handles 70% of those requests just as well, and nobody notices.
              </p>
              <p className="cv-body-lg text-cv-ink/80 mt-4">
                A hardcoded choice doesn&apos;t update when prices drop. It doesn&apos;t reroute when a provider slows down. That gap is where the budget quietly goes.
              </p>
            </div>
          </div>

          {/* OrbitCore - AIX routing every request around one system of record */}
          <div className="mt-12">
            <OrbitCore
              brand="AIX"
              labels={[
                "Model selection",
                "Provider scoring",
                "Cost controls",
                "Residency rules",
                "Latency routing",
                "Compliance log",
              ]}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5 mt-12">
            {/* Before - legacy / inactive */}
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
                  <li>• Model: one, chosen once</li>
                  <li>• Provider: fixed</li>
                  <li>• Region: fixed</li>
                  <li>• Routing: none; every request goes the same place</li>
                  <li>• Cost: an assumption, not a measurement</li>
                </ul>
              </div>
            </div>
            {/* After - premium / active */}
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
                <div className="cv-label mb-3 text-[#1664C0] dark:text-[#4D9AEF]">After AIX (dynamic)</div>
                <ul className="space-y-2 text-sm text-cv-ink/90">
                  <li>• Model: the best fit for each request</li>
                  <li>• Provider: scored live, with a fallback</li>
                  <li>• Region: chosen by residency rule</li>
                  <li>• Routing: cost, latency, quality, and compliance, per request</li>
                  <li>• Cost: attributed, capped, and on the record</li>
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
            AIX sits between your application and every AI provider you use. On each request it scores the available routes against the rules your team set, then returns the best one with a fallback and a full decision log.
          </p>
          <p className="text-cv-muted italic mb-10">A gateway runs the rule you wrote. AIX works out whether that rule is still right.</p>
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

      {/* WHAT AIX IS NOT - comparison */}
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
            Observability tells you what a request cost after it ran. AIX settles that before it does.
          </p>
        </div>
      </section>

      {/* ROI */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="max-w-cv mx-auto px-5 sm:px-6 lg:px-8">
          <h2 className="cv-h2 text-cv-ink mb-5">The cost of not routing.</h2>
          <p className="cv-body-lg text-cv-ink/75 mb-10">
            Every hardcoded endpoint spends money without making a decision. The same work, on the right model, often costs a fraction, at the same or better quality.
          </p>
          <AixRoiSplit roi={ROI} />
          <h3 className="cv-h3 text-cv-ink mt-14 mb-6">Three mechanisms</h3>
          <div className="grid md:grid-cols-3 gap-3">
            {([
              ["Cost arbitrage", "AIX routes to the lowest-cost model that clears your quality floor.", Scale],
              ["Latency wins", "A faster route cuts the compute you pay for while a request waits.", Bolt],
              ["Waste elimination", "Stops premium models running work a smaller model handles just as well.", TrashBin2],
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
            AIX gives AI its own unit economics: cost per request, per feature, per tenant, allocated automatically.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Cost per request, per feature, and per tenant, allocated without manual clean-up",
              "Budget caps enforced before a request goes out, not reconciled after",
              "Scenario modeling before a model, traffic, or context change ships",
              "Anomaly detection on AI spend, with root-cause signals",
              "Spend attributed to the team, product, and use case that drove it",
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
            Every routing decision AIX makes is recorded, auditable, and explainable. Governance is on by default, not bolted on.
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
              A gateway executes whatever rule you gave it. AIX is the layer that works out what the rule should be, request by request, and proves the decision afterward.
            </p>
            <p className="cv-body-lg text-cv-ink/80">
              It isn&apos;t a gateway replacement; it&apos;s the decision layer above one.
            </p>
            <div className="cv-label mt-2 mb-3">AIX is right when you have:</div>
            <ul className="space-y-2 text-cv-ink/85">
              {[
                "Workloads across more than one model or provider",
                "AI spend large enough that the wrong model matters",
                "Compliance or residency rules to enforce",
                "Hardcoded endpoints that haven't been revisited since launch",
                "A need to prove, not assume, what each request cost",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3"><CheckCircle weight="Linear" size={16} className="text-cv-teal mt-1 shrink-0" /> {b}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Platform", href: "/platform/finops" }, { name: "AIX", href: "/platform/aix" }]} />
    </>
  );
}
