import Link from "next/link";
import { ArrowRight, Check, X, Plug, ShieldCheck, Target, Split, Scale, Eye } from "lucide-react";
import type { Metadata } from "next";
import { DEMO_URL } from "@/lib/links";
import { CountUpStat } from "@/components/CountUpStat";

export const metadata: Metadata = {
  title: "AIX — The AI Control Plane for Enterprise AI Compute | CloudVerse",
  description:
    "Route, govern, audit, and optimize every AI request across models, clouds, GPUs, and private inference endpoints. Cost decisions happen at the routing layer.",
};

const ACCENT = "#6954D4";

const STATS = [
  { v: "40–90%", l: "cost reduction across production workloads" },
  { v: "<15ms", l: "routing overhead added by AIX" },
  { v: "96.8%", l: "lower cost vs hardcoded Claude Sonnet (benchmarked)" },
  { v: "28.5%", l: "faster vs same hardcoded baseline" },
];

const STEP_ICONS = [Plug, ShieldCheck, Target, Split, Scale, Eye];

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

function Cell({ v }: { v: string }) {
  if (v === "Yes") return <span className="inline-flex items-center gap-1 text-cv-teal"><Check size={14} /> Yes</span>;
  if (v === "No") return <span className="inline-flex items-center gap-1 text-cv-muted"><X size={14} /> No</span>;
  return <span className="text-cv-ink/75">{v}</span>;
}

export default function AIXPage() {
  return (
    <>
      {/* HERO */}
      <section className="cv-hero-bg pt-[120px] pb-16 lg:pt-[160px] lg:pb-24 relative">
        <div className="cv-container relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium" style={{ borderColor: `${ACCENT}66`, color: "#A99CE8" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
            AIX — AI Control Plane
          </div>
          <h1 className="cv-h1 mt-6 text-cv-ink">The AI Control Plane for Enterprise AI Compute</h1>
          <p className="cv-body-lg mt-6 text-cv-ink/75">
            Route, govern, audit, and optimize every AI request across models, clouds, GPUs, and private inference endpoints. Cost decisions happen at the routing layer, not in spreadsheets after the bill arrives.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={DEMO_URL} className="cv-btn-primary"><span>Book a Demo</span><ArrowRight size={16} /></Link>
            <Link href="/integrations" className="cv-btn-ghost">Explore the Platform</Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-cv-line bg-cv-surface2/40">
        <div className="cv-container py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <div key={s.l}>
              <CountUpStat value={s.v} className="text-2xl lg:text-3xl font-display font-semibold text-cv-ink" />
              <div className="text-sm text-cv-muted mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEM */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="max-w-4xl">
          <h2 className="cv-h2 text-cv-ink">AI compute is becoming too expensive to hardcode.</h2>
          <p className="cv-body-lg text-cv-ink/80 mt-6">
            Most teams make AI infrastructure decisions once. Model endpoint, provider, region, failover logic, cost assumptions. These get buried in application code. Six months later, a cheaper model handles 70% of those requests at equivalent quality. Nobody knows.
          </p>
          <p className="cv-body-lg text-cv-ink/80 mt-4">
            Hardcoded decisions don&apos;t update when pricing shifts. They don&apos;t reroute when a provider degrades. They don&apos;t flag when a smaller model meets quality requirements at a third of the cost. That gap is where most AI infrastructure spend goes unmanaged.
          </p>
          <div className="grid md:grid-cols-2 gap-5 mt-10">
            {/* Before — legacy / inactive */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#15171B] p-6">
              {/* Faint static node pattern */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                  backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
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
            <div className="relative overflow-hidden rounded-2xl border border-[#007CFF]/40 bg-[#0A1422] p-6 shadow-[0_0_55px_-15px_rgba(0,124,255,0.55)]">
              {/* Dynamic blue grid pattern */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(0,124,255,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(0,124,255,0.13) 1px, transparent 1px)",
                  backgroundSize: "26px 26px",
                  maskImage: "radial-gradient(ellipse 85% 80% at 75% 0%, #000 10%, transparent 75%)",
                  WebkitMaskImage: "radial-gradient(ellipse 85% 80% at 75% 0%, #000 10%, transparent 75%)",
                }}
              />
              {/* Blue blend glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 right-0 h-48 w-72 rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(0,124,255,0.28), transparent 70%)" }}
              />
              <div className="relative">
                <div className="cv-label mb-3" style={{ color: "#4DA3FF" }}>After AIX (dynamic)</div>
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
        </div>
      </section>

      {/* WHAT AIX DOES */}
      <section className="cv-section relative overflow-hidden bg-[#08090C]">
        {/* Top-center brand radial gradient */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[28rem]"
          style={{ background: "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(0,124,255,0.16), transparent 70%)" }}
        />
        <div className="cv-container relative">
          <div className="max-w-3xl mb-10">
            <h2 className="cv-h2 text-white">How AIX controls every AI request.</h2>
            <p className="cv-body-lg text-gray-400 mt-5">
              AIX sits between your application and every AI provider you use. On every request, it evaluates all available routes against the constraints your team has defined, and returns the best one, with a fallback and a full decision log.
            </p>
            <p className="text-gray-400 mt-4 italic">A gateway executes a routing rule you wrote. AIX evaluates whether that rule is still the right one.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {STEPS.map((s, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <div
                  key={s.n}
                  className="group rounded-2xl border border-white/10 bg-[#111318] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#007CFF]/40 hover:bg-[#15171D]"
                >
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#007CFF]/25 bg-[#007CFF]/10 text-[#007CFF] transition-colors duration-300 group-hover:bg-[#007CFF]/15">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <div className="text-xs text-gray-500">Step 0{i + 1}</div>
                  <h3 className="font-display font-semibold text-white text-lg mt-1">{s.n}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed mt-3">{s.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHAT AIX IS NOT — comparison */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="max-w-3xl mb-10">
            <h2 className="cv-h2 text-cv-ink">A gateway executes a rule you wrote. AIX decides what the rule should be.</h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-cv-line">
            <table className="w-full text-sm">
              <thead className="bg-cv-surface2">
                <tr className="text-left">
                  <th className="p-4 text-cv-ink font-medium">Capability</th>
                  <th className="p-4 text-cv-muted font-medium">Gateway / proxy</th>
                  <th className="p-4 text-cv-muted font-medium">LLM gateway</th>
                  <th className="p-4 text-cv-muted font-medium">Observability tool</th>
                  <th className="p-4 font-medium" style={{ color: ACCENT }}>AIX</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row, i) => (
                  <tr key={i} className="border-t border-cv-line">
                    <td className="p-4 text-cv-ink/90">{row[0]}</td>
                    <td className="p-4"><Cell v={row[1]} /></td>
                    <td className="p-4"><Cell v={row[2]} /></td>
                    <td className="p-4"><Cell v={row[3]} /></td>
                    <td className="p-4"><Cell v={row[4]} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-cv-ink/75 leading-relaxed mt-8 max-w-4xl">
            Observability tools tell you what happened after spend occurred. AIX acts before a request goes out. The routing decision, and the cost attached to it, is made explicitly before a token reaches any provider.
          </p>
        </div>
      </section>

      {/* ROI */}
      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <div className="max-w-3xl mb-10">
            <h2 className="cv-h2 text-cv-ink">The cost of not routing.</h2>
            <p className="cv-body-lg text-cv-ink/75 mt-5">
              Every hardcoded model endpoint is spending money without making a decision. AIX makes the decision explicitly. The saving is the difference.
            </p>
          </div>
          <div className="cv-label mb-4">At scale (monthly)</div>
          <div className="overflow-x-auto rounded-2xl border border-cv-line">
            <table className="w-full text-sm">
              <thead className="bg-cv-surface">
                <tr className="text-left">
                  <th className="p-4 text-cv-ink font-medium">Monthly volume</th>
                  <th className="p-4 text-cv-muted font-medium">Hardcoded spend</th>
                  <th className="p-4 text-cv-muted font-medium">With AIX</th>
                  <th className="p-4 font-medium" style={{ color: ACCENT }}>Monthly saving</th>
                </tr>
              </thead>
              <tbody>
                {ROI.map((row, i) => (
                  <tr key={i} className="border-t border-cv-line">
                    <td className="p-4 text-cv-ink/90">{row[0]}</td>
                    <td className="p-4 text-cv-ink/75">{row[1]}</td>
                    <td className="p-4 text-cv-ink/75">{row[2]}</td>
                    <td className="p-4 font-semibold text-cv-ink">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-cv-muted mt-3 italic">
            Assumptions: 40–90% cost reduction applied at 89% average. Hardcoded baseline is Claude Sonnet at $0.00298/request.
          </p>
          <div className="grid md:grid-cols-2 gap-5 mt-10">
            <div className="rounded-2xl border border-cv-line bg-cv-surface p-6">
              <div className="cv-label mb-3">Without AIX</div>
              <p className="text-cv-ink/85">Claude Sonnet, 5,537ms latency, $0.00298/req</p>
            </div>
            <div className="rounded-2xl border p-6" style={{ borderColor: `${ACCENT}66`, background: `${ACCENT}14` }}>
              <div className="cv-label mb-3" style={{ color: "#A99CE8" }}>With AIX</div>
              <p className="text-cv-ink/95">GPT-4o-mini, 3,962ms latency, $0.00010/req</p>
              <p className="text-cv-ink font-medium mt-3">Result: 96.8% lower cost. 28.5% faster.</p>
            </div>
          </div>
          <h3 className="cv-h3 text-cv-ink mt-14 mb-6">Three mechanisms</h3>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              ["Cost arbitrage", "AIX routes to the lowest-cost model that meets your quality floor. Prices change constantly. AIX adjusts automatically."],
              ["Latency wins", "Faster routing reduces infrastructure overhead on time-sensitive workloads. Smaller models are often faster too."],
              ["Waste elimination", "Stops premium model usage on tasks a smaller model handles equally well. Most applications have multiple task types. Few need the flagship model for all of them."],
            ].map(([t, b]) => (
              <div key={t} className="rounded-2xl border border-cv-line bg-cv-surface p-6">
                <h4 className="font-display font-semibold text-cv-ink">{t}</h4>
                <p className="text-sm text-cv-ink/75 mt-3 leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOR FINOPS */}
      <section className="cv-section">
        <div className="cv-container max-w-4xl">
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
                <Check size={18} className="text-cv-teal mt-0.5 shrink-0" /> {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* GOVERNANCE */}
      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <div className="max-w-3xl mb-10">
            <h2 className="cv-h2 text-cv-ink">Built for enterprise AI governance.</h2>
            <p className="cv-body-lg text-cv-ink/75 mt-5">
              Every routing decision AIX makes is recorded, auditable, and explainable. Compliance controls are enforced at the routing layer, not bolted on after.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              ["Multi-tenant isolation", "Each team's workloads, policies, and cost data are separated."],
              ["Data residency controls", "Route requests by region based on sovereignty requirements. EU, US, APAC per workload."],
              ["PII handling rules", "PII detection enforced before provider selection. Sensitive requests never reach unapproved endpoints."],
              ["Budget caps", "Hard spend ceilings applied before a request goes out."],
              ["Org/team policy scopes", "Different teams run under different constraint sets. One platform, multiple policies."],
              ["Full execution trace logs", "Every decision logged with constraints, candidates, selection, outcome."],
            ].map(([t, b]) => (
              <div key={t} className="rounded-2xl border border-cv-line bg-cv-surface p-6">
                <h4 className="font-display font-semibold text-cv-ink">{t}</h4>
                <p className="text-sm text-cv-ink/75 mt-2 leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NO BLACK BOXES */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="max-w-3xl mb-8">
            <h2 className="cv-h2 text-cv-ink">No black boxes.</h2>
            <p className="cv-body-lg text-cv-ink/75 mt-5">
              Every routing decision includes an evidence summary: constraints active, routes evaluated, route selected, reason for selection, cost and latency outcome. Incident response, finance reviews, and compliance audits all work from the same traceable record.
            </p>
          </div>
          <pre className="rounded-2xl border border-cv-line bg-cv-surface2 p-6 text-xs text-cv-ink/85 overflow-x-auto font-mono leading-relaxed">{TRACE_JSON}</pre>
          <p className="text-cv-ink/75 mt-6 max-w-4xl">
            SOC2 and ISO-aligned architecture. Audit trails, access controls, and policy enforcement structured to support compliance documentation. Specific certification status confirmed during your evaluation.
          </p>
        </div>
      </section>

      {/* USE CASES */}
      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <div className="max-w-3xl mb-12">
            <h2 className="cv-h2 text-cv-ink">Four problems AIX fixes.</h2>
          </div>
          <div className="space-y-6">
            {USE_CASES.map((uc) => (
              <div key={uc.n} className="rounded-2xl border border-cv-line bg-cv-surface p-7">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-display font-semibold" style={{ color: ACCENT }}>{uc.n}.</span>
                  <h3 className="cv-h3 text-cv-ink">{uc.title}</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 mt-6">
                  <div><div className="cv-label mb-1">Situation</div><p className="text-cv-ink/80 text-sm leading-relaxed">{uc.sit}</p></div>
                  <div><div className="cv-label mb-1">The problem</div><p className="text-cv-ink/80 text-sm leading-relaxed">{uc.prob}</p></div>
                  <div><div className="cv-label mb-1">How AIX solves it</div><p className="text-cv-ink/80 text-sm leading-relaxed">{uc.how}</p></div>
                  <div><div className="cv-label mb-1" style={{ color: "#A99CE8" }}>After AIX</div><p className="text-cv-ink/90 text-sm leading-relaxed">{uc.after}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="max-w-3xl mb-10">
            <h2 className="cv-h2 text-cv-ink">Connect once. Route everywhere.</h2>
            <p className="cv-body-lg text-cv-ink/75 mt-5">
              Add your providers once. AIX handles routing, fallback, and cost tracking across all of them. No code changes when you add a new provider.
            </p>
          </div>
          <h3 className="cv-label mb-4">Supported model providers</h3>
          <div className="overflow-x-auto rounded-2xl border border-cv-line">
            <table className="w-full text-sm">
              <thead className="bg-cv-surface2">
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
          <div className="rounded-2xl border border-cv-line bg-cv-surface2 p-7 mt-10">
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
      <section className="cv-section bg-cv-surface2">
        <div className="cv-container max-w-4xl">
          <h2 className="cv-h2 text-cv-ink">Most tools route traffic. AIX decides where it should go.</h2>
          <p className="cv-body-lg text-cv-ink/75 mt-6">
            A gateway executes whatever rule you gave it. If you told it to send traffic to Provider A, that is where it goes, even when Provider B is 90% cheaper and just as capable. A gateway has no scoring engine and no live signal evaluation. It is plumbing.
          </p>
          <p className="cv-body-lg text-cv-ink/80 mt-4">
            AIX is not a gateway replacement. It is the decision layer that makes routing intelligent rather than static.
          </p>
          <div className="cv-label mt-8 mb-3">AIX is the right fit when:</div>
          <ul className="space-y-2 text-cv-ink/85">
            {[
              "You run AI workloads in production across more than one provider",
              "AI spend is material enough that optimisation has measurable impact",
              "Compliance requirements constrain provider or region selection",
              "Your team hardcoded model endpoints and has not revisited them",
              "You want cost-aware routing without rebuilding your application",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3"><Check size={16} className="text-cv-teal mt-1 shrink-0" /> {b}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="rounded-3xl border border-cv-line bg-cv-surface2 p-10 lg:p-16 text-center">
            <h2 className="cv-h2 text-cv-ink max-w-3xl mx-auto">See AIX route your AI workloads end to end.</h2>
            <p className="cv-body-lg text-cv-ink/75 mt-5 max-w-2xl mx-auto">
              Connect your first account in under 30 minutes. Most teams have their first non-obvious finding the same day.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href={DEMO_URL} className="cv-btn-primary"><span>Get a Demo</span><ArrowRight size={16} /></Link>
              <Link href="/contact" className="cv-btn-ghost">Talk to Sales</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
