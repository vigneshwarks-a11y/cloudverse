import type { Metadata } from "next";
import { Cpu, ShieldCheck, GitBranch, Receipt, Scale, Activity, Globe2, Workflow, Layers } from "lucide-react";
import { ProductHero } from "@/components/product/Hero";
import { AIXArchitecture } from "@/components/product/AIXArchitecture";
import { FeatureShowcase, type FeatureState } from "@/components/product/FeatureShowcase";
import { Capabilities } from "@/components/product/Capabilities";
import { Lifecycle } from "@/components/product/Lifecycle";
import { WhoUsesIt } from "@/components/product/WhoUsesIt";
import { IntegrationsStrip } from "@/components/product/IntegrationsStrip";
import { ExpandInto } from "@/components/product/ExpandInto";
import { FaqBlock } from "@/components/FaqBlock";
import { CTABand } from "@/components/CTABand";
import { MODULES } from "@/lib/modules";

const M = MODULES.aix;

export const metadata: Metadata = {
  title: "AIX — GPU and LLM Cost Economics",
  description:
    "Autonomous optimization for GPU and LLM workloads across 8+ providers. Continuously evaluates where AI workloads should run based on cost, latency, and policy.",
  alternates: { canonical: "/platform/aix" },
};

const FEATURES: FeatureState[] = [
  { title: "Live route evaluation", desc: "Every request scored against cost, latency, quality, and policy in real time.", mockTitle: "aix.cloudverse.ai/routes", mockBody: <MockRoutes /> },
  { title: "Guardrail scoring",     desc: "Policy guardrails enforced before a workload reaches the provider.", mockTitle: "aix.cloudverse.ai/guardrails", mockBody: <MockGuardrails /> },
  { title: "Decision output",       desc: "Primary route + fallback returned with full reasoning trail.", mockTitle: "aix.cloudverse.ai/decisions", mockBody: <MockDecisions /> },
  { title: "Cost attribution",      desc: "GPU hours, tokens, and requests attributed back to team and product.", mockTitle: "aix.cloudverse.ai/attribution", mockBody: <MockAttribution /> },
];

const FAQ = [
  { q: "Which AI providers does AIX route across?", a: "OpenAI, Anthropic, AWS Bedrock, Vertex AI, Azure OpenAI, CoreWeave, Lambda Labs, plus self-hosted clusters on Kubernetes. We add new providers regularly." },
  { q: "How does the routing decision actually work?", a: "Each request is scored against your policy — latency ceiling, budget cap, region, task type, compliance — and live signals from providers. The lowest-cost route that satisfies all constraints wins, with an explicit fallback." },
  { q: "Is this a proxy or an SDK?", a: "Both. You can route through the AIX gateway as a drop-in proxy, or integrate the SDK directly. Either way the decision logic is the same and fully auditable." },
  { q: "Can we keep our prompts and data private?", a: "Yes. AIX never stores prompt content unless you explicitly opt into logging for evaluation. Metadata is captured for cost attribution." },
  { q: "What about open-source and self-hosted models?", a: "AIX routes to any OpenAI-compatible endpoint, including vLLM, TGI, and Triton clusters running on your own GPUs or CoreWeave / Lambda." },
  { q: "How does AIX integrate with FinOps Platform?", a: "GPU spend, token spend, and inference cost flow into FinOps allocation natively. One unit-economic model for AI plus cloud — no separate report." },
];

export default function Page() {
  return (
    <>
      <ProductHero
        eyebrow="AIX"
        color={M.color}
        h1={<>Economic control for <span style={{ color: M.color }}>every AI workload.</span></>}
        sub="Continuously evaluate where AI workloads should run based on cost, latency, quality, and policy — across 8+ GPU and LLM providers."
        stats={[
          { value: "8+", label: "GPU & LLM providers" },
          { value: "Live", label: "Cost-quality routing" },
          { value: "Auditable", label: "Decision trail" },
          { value: "Policy-bound", label: "Execution" },
        ]}
      />

      <AIXArchitecture />

      <FeatureShowcase
        label="Platform"
        heading="Routing, guardrails, and attribution on one engine."
        color={M.color}
        states={FEATURES}
      />

      <Capabilities
        label="Capabilities"
        heading="Everything you need to run AI workloads economically."
        color={M.color}
        items={[
          { icon: Workflow,    title: "Multi-provider routing", desc: "Score every request across OpenAI, Anthropic, Bedrock, Vertex, CoreWeave, and more." },
          { icon: ShieldCheck, title: "Policy guardrails",      desc: "Region, compliance, content, and budget guardrails enforced before execution." },
          { icon: Scale,       title: "Cost-quality scoring",   desc: "Live signals from providers feed routing decisions in real time." },
          { icon: Activity,    title: "Latency SLOs",           desc: "p50/p95/p99 thresholds with explicit fallback when a provider misbehaves." },
          { icon: Receipt,     title: "Token & GPU attribution",desc: "Spend attributed by team, product, model, and request." },
          { icon: Cpu,         title: "GPU economics",          desc: "Right-size and right-place GPU workloads across cloud and dedicated providers." },
          { icon: GitBranch,   title: "A/B + canary routing",   desc: "Run new models against your live traffic with full cost and quality reporting." },
          { icon: Layers,      title: "Model registry",         desc: "One registry across hosted and self-hosted endpoints." },
          { icon: Globe2,      title: "Multi-region failover",  desc: "Region-aware routing that survives provider outages without manual intervention." },
        ]}
      />

      <Lifecycle
        color={M.color}
        stages={[
          { title: "Inform",   bullets: ["Connect providers in minutes", "Per-model and per-team token economics", "Live cost-quality signals across providers", "Audit trail on every decision"] },
          { title: "Optimize", bullets: ["Cost-aware routing across hosted and self-hosted", "Latency-aware fallback with provider scoring", "Right-size GPU pools per workload", "A/B routing for new models with payback proof"] },
          { title: "Operate",  bullets: ["Policy-bound execution at request time", "Region and compliance guardrails", "Continuous spend attribution to FinOps", "Provider outage failover without ops involvement"] },
        ]}
      />

      <WhoUsesIt
        color={M.color}
        items={[
          { team: "AI / MLOps", role: "AI Engineering Lead", desc: "Routes inference and training across providers with policy and cost in the loop." },
          { team: "Platform",   role: "Platform Engineer",   desc: "Operates the AIX gateway and integrates it into existing service mesh." },
          { team: "Finance",    role: "FinOps Manager",      desc: "Attributes GPU and token spend back to team, product, and unit revenue." },
        ]}
      />

      <IntegrationsStrip
        color={M.color}
        items={["OpenAI", "Anthropic", "AWS Bedrock", "Vertex AI", "Azure OpenAI", "CoreWeave", "Lambda Labs", "vLLM", "Kubernetes"]}
      />

      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <div className="max-w-3xl mb-10">
            <div className="cv-label mb-3" style={{ color: M.color }}>FAQ</div>
            <h2 className="cv-h2 text-white">AIX questions, answered.</h2>
          </div>
          <FaqBlock items={FAQ} accent={M.color} />
        </div>
      </section>

      <ExpandInto current="aix" />
      <CTABand heading="See AIX route a live workload." />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "CloudVerse AIX",
            applicationCategory: "BusinessApplication",
            description: metadata.description,
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
    </>
  );
}

/* ——— Mock UIs ——— */

function MockRoutes() {
  return (
    <div className="font-mono text-xs space-y-2">
      <div className="text-white/55 text-[10px] uppercase tracking-wider mb-2">Live routes · last 60s</div>
      {[
        { req: "POST /v1/chat", route: "Anthropic Claude 3.5", cost: "$0.0042", lat: "480ms" },
        { req: "POST /v1/chat", route: "OpenAI GPT-4o-mini",   cost: "$0.0006", lat: "210ms" },
        { req: "POST /v1/embed", route: "Bedrock Titan",       cost: "$0.00008", lat: "85ms" },
        { req: "POST /v1/chat", route: "Anthropic Claude 3.5", cost: "$0.0044", lat: "510ms" },
        { req: "POST /v1/chat", route: "self-hosted · vLLM",   cost: "$0.0011", lat: "320ms" },
      ].map((r, i) => (
        <div key={i} className="grid grid-cols-[1fr_1.5fr_auto_auto] gap-3 p-2 rounded bg-white/[0.03]">
          <span className="text-white/80">{r.req}</span>
          <span className="text-cv-blue-light">{r.route}</span>
          <span className="text-white/85 tabular-nums">{r.cost}</span>
          <span className="text-white/65 tabular-nums">{r.lat}</span>
        </div>
      ))}
    </div>
  );
}

function MockGuardrails() {
  return (
    <div className="space-y-2">
      {[
        { name: "Region · EU-only for PII workloads", state: "Active", color: "#0E9E7A" },
        { name: "Budget · team-search ≤ $4,000/mo", state: "78% used", color: "#D97706" },
        { name: "Compliance · SOC 2 providers only", state: "Active", color: "#0E9E7A" },
        { name: "Latency · p95 ≤ 800ms (chat)", state: "Active", color: "#0E9E7A" },
        { name: "Content · no provider training opt-in", state: "Active", color: "#0E9E7A" },
      ].map((g) => (
        <div key={g.name} className="flex items-center justify-between p-3 rounded border border-white/10 bg-white/[0.02]">
          <span className="text-white/85 text-xs">{g.name}</span>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium" style={{ color: g.color }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: g.color }} />
            {g.state}
          </span>
        </div>
      ))}
    </div>
  );
}

function MockDecisions() {
  return (
    <div className="space-y-3">
      <div className="rounded border border-cv-blue/40 bg-cv-blue/10 p-4">
        <div className="text-[11px] uppercase tracking-wider text-cv-blue-light mb-1">Primary</div>
        <div className="text-white font-medium">Anthropic Claude 3.5 Sonnet · us-east-1</div>
        <div className="font-mono text-xs text-white/60 mt-1">$0.0042 / req · 480ms p95 · score 0.92</div>
      </div>
      <div className="rounded border border-white/10 p-4 bg-white/[0.02]">
        <div className="text-[11px] uppercase tracking-wider text-white/55 mb-1">Fallback</div>
        <div className="text-white font-medium">OpenAI GPT-4o · us-west-2</div>
        <div className="font-mono text-xs text-white/60 mt-1">$0.0061 / req · 540ms p95 · score 0.87</div>
      </div>
      <div className="text-[11px] text-white/50">Decision logged to /decisions/req_8e2f… · auditable for 90 days</div>
    </div>
  );
}

function MockAttribution() {
  return (
    <div>
      <div className="text-[11px] text-white/55 uppercase tracking-wider mb-3">Token spend · last 7d</div>
      {[
        { team: "team-search",   pct: 92, val: "$3,140" },
        { team: "team-support",  pct: 64, val: "$2,180" },
        { team: "team-content",  pct: 38, val: "$1,290" },
        { team: "team-internal", pct: 18, val: "$612" },
      ].map((t) => (
        <div key={t.team} className="flex items-center gap-3 mb-2">
          <div className="text-white/85 text-xs w-32">{t.team}</div>
          <div className="flex-1 h-5 rounded bg-white/8 overflow-hidden">
            <div className="h-full" style={{ width: `${t.pct}%`, background: "#6954D4" }} />
          </div>
          <div className="text-white tabular-nums text-xs w-16 text-right">{t.val}</div>
        </div>
      ))}
    </div>
  );
}
