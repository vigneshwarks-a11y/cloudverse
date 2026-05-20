import type { Metadata } from "next";
import { Workflow, ShieldCheck, Receipt, Cpu } from "lucide-react";
import { SolutionHero } from "@/components/solution/SolutionHero";
import { Outcomes } from "@/components/solution/Outcomes";
import { ModulesUsed } from "@/components/solution/ModulesUsed";
import { FaqBlock } from "@/components/FaqBlock";
import { CTABand } from "@/components/CTABand";

export const metadata: Metadata = {
  title: "For AI Engineering — CloudVerse",
  description: "Route every AI workload across 8+ GPU and LLM providers with cost, latency, and policy in the loop. Live decisions. Auditable trail.",
  alternates: { canonical: "/solutions/ai-engineering" },
};

const FAQ = [
  { q: "How is this different from an LLM gateway?", a: "Gateways proxy traffic. AIX runs a cost-quality-policy decision on every request, returns a primary route and fallback, and attributes spend back to FinOps — all auditable." },
  { q: "Can we mix hosted and self-hosted models?", a: "Yes. Self-hosted vLLM, TGI, Triton, and OpenAI-compatible endpoints route through the same decision engine as Anthropic, OpenAI, Bedrock, and Vertex." },
  { q: "What about prompt privacy?", a: "Prompt content is never stored unless you explicitly opt in for evaluation. Metadata is captured for attribution and decision audit." },
  { q: "How does the cost attribution work?", a: "Tokens and GPU hours are attributed by team, product, model, and request — and rolled into FinOps allocation natively." },
];

export default function Page() {
  return (
    <>
      <SolutionHero
        eyebrow="For AI Engineering"
        h1={<>Run every AI workload <span className="text-cv-blue-light">where it costs least and runs best.</span></>}
        sub="Live cost-quality routing across 8+ GPU and LLM providers, policy-bound at execution, and attributed back to your FinOps model."
        proof={[
          { value: "8+", label: "GPU & LLM providers" },
          { value: "Live", label: "Cost-quality routing" },
          { value: "Auditable", label: "Decision trail" },
          { value: "Native", label: "FinOps attribution" },
        ]}
      />

      <Outcomes
        heading="What AI engineering teams unlock with AIX."
        items={[
          { icon: Workflow,    title: "Multi-provider routing",  body: "Score every request across OpenAI, Anthropic, Bedrock, Vertex, CoreWeave, and self-hosted." },
          { icon: ShieldCheck, title: "Policy guardrails",       body: "Region, compliance, content, latency, and budget guardrails enforced before execution." },
          { icon: Cpu,         title: "Right-sized GPU economics", body: "Move workloads between hosted and dedicated GPU pools without rewriting code." },
          { icon: Receipt,     title: "Token & GPU attribution", body: "Spend tied back to team, product, and unit revenue — not a separate AI report." },
        ]}
      />

      <ModulesUsed keys={["aix", "finops", "devx"]} />

      <section className="cv-section bg-cv-surface">
        <div className="cv-container">
          <div className="max-w-3xl mb-10">
            <div className="cv-label mb-3">FAQ</div>
            <h2 className="cv-h2 text-cv-ink">AI engineering questions, answered.</h2>
          </div>
          <FaqBlock items={FAQ} />
        </div>
      </section>

      <CTABand heading="See AIX route your AI workloads end-to-end." />
    </>
  );
}
