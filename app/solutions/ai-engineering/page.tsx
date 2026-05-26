import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import { DEMO_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "For AI Engineering — Run Every AI Workload Where It Costs Least and Runs Best | CloudVerse",
  description: "Live cost-quality routing across 8+ GPU and LLM providers. Policy-bound at execution. FinOps attribution included.",
};

const STATS = [
  { v: "8+", l: "GPU and LLM providers" },
  { v: "Live", l: "cost-quality routing" },
  { v: "Policy-bound", l: "at execution" },
  { v: "Auditable", l: "decision trail" },
];

const FAQ = [
  ["How is this different from an LLM gateway?", "A gateway executes a routing rule you wrote. AIX evaluates whether that rule is still the right one, continuously, using live cost and latency signals. The distinction matters when pricing shifts or a new model becomes available."],
  ["Can we mix hosted and self-hosted models?", "Yes. AIX treats private GPU deployments and NeoCloud infrastructure as first-class routing targets alongside managed APIs. Same cost and policy logic applies to all of them."],
  ["What about prompt privacy?", "AIX does not proxy traffic by default. It returns a routing decision. Your application sends the request. Prompt content never passes through AIX unless you configure otherwise."],
  ["How does the cost attribution work?", "Every request is tagged to the team, feature, or workload that made it. Cost allocation is automatic. Finance does not need engineering to explain the report."],
];

export default function AIEngineeringPage() {
  return (
    <>
      <section className="cv-hero-bg pt-[120px] pb-16 lg:pt-[160px] lg:pb-24 relative">
        <div className="cv-container relative z-10 max-w-4xl">
          <div className="text-xs uppercase tracking-widest text-cv-muted mb-3">For AI Engineering</div>
          <h1 className="cv-h1 text-cv-ink">Run Every AI Workload Where It Costs Least and Runs Best</h1>
          <p className="cv-body-lg mt-6 text-cv-ink/75">
            Live cost-quality routing across 8+ GPU and LLM providers. Policy-bound at execution. FinOps attribution included.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={DEMO_URL} className="cv-btn-primary"><span>Book a Demo</span><ArrowRight size={16} /></Link>
            <Link href="/platform/aix" className="cv-btn-ghost">Explore the Platform</Link>
          </div>
        </div>
      </section>

      <section className="border-y border-cv-line bg-cv-surface2/40">
        <div className="cv-container py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <div key={s.l}>
              <div className="text-2xl lg:text-3xl font-display font-semibold text-cv-ink">{s.v}</div>
              <div className="text-sm text-cv-muted mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="cv-section">
        <div className="cv-container max-w-4xl">
          <h2 className="cv-h2 text-cv-ink">The situation AI engineering teams are in</h2>
          <p className="cv-body-lg text-cv-ink/80 mt-6">
            Most teams hardcoded a model endpoint eighteen months ago because it was the right call at the time. Since then, three providers have launched models that handle 70% of those requests at a third of the cost. The endpoint still works, so nobody has changed it.
          </p>
          <p className="cv-body-lg text-cv-ink/80 mt-4">
            Meanwhile, GPU costs for agent infrastructure vary by 3x month to month depending on workload activity. Finance asks for an allocation report. The answer is a spreadsheet that took two engineers a week to build.
          </p>
          <p className="cv-body-lg text-cv-ink font-medium mt-4">AIX solves both of these.</p>
        </div>
      </section>

      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <div className="max-w-3xl mb-10">
            <h2 className="cv-h2 text-cv-ink">What AIX unlocks for AI engineering teams</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              ["Multi-provider routing", "Score every request across OpenAI, Anthropic, Bedrock, Vertex, Cohere, Groq, HuggingFace, and self-hosted infrastructure. Route to the best fit based on cost, latency, and quality requirements for that specific task type. Automatically."],
              ["Policy guardrails", "Compliance, content, latency, and budget guardrails enforced before execution. PII handling rules, data residency constraints, and provider allowlists applied at the routing layer, not retrofitted in application code."],
              ["Right-sized GPU economics", "Move workloads between hosted and dedicated GPU pools without rewriting code. AIX handles the routing logic. Your engineers handle the model."],
              ["Token and GPU attribution", "Spend tied back to team, product, and unit revenue. Automatic. No separate AI cost report reconstructed from billing data after the fact."],
              ["Model registry", "Track model versions, provider options, and performance benchmarks. Multi-region failover built in. Primary and fallback routes generated on every request."],
            ].map(([t, b]) => (
              <div key={t} className="rounded-2xl border border-cv-line bg-cv-surface p-6">
                <h3 className="cv-h3 text-cv-ink">{t}</h3>
                <p className="text-cv-ink/75 mt-3 leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cv-section">
        <div className="cv-container max-w-4xl">
          <h2 className="cv-h2 text-cv-ink">The numbers</h2>
          <ul className="mt-8 space-y-3">
            {[
              "40–90% cost reduction across production workloads",
              "Less than 15ms routing overhead",
              "96.8% lower cost vs hardcoded Claude Sonnet",
              "Spend variance drops from 3x to under 15% for agent workloads after AIX",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3 text-cv-ink/85">
                <Check size={18} className="text-cv-teal mt-0.5 shrink-0" /> {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-8">Platform that powers this solution</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              ["AIX", "GPU and LLM economics", "/platform/aix"],
              ["FinOps Platform", "Multi-cloud cost intelligence", "/platform/finops"],
              ["DevX", "Shift-left cost intelligence", "/platform/devx"],
            ].map(([t, b, h]) => (
              <Link key={t} href={h as string} className="rounded-2xl border border-cv-line bg-cv-surface p-6 hover:border-cv-ink/30 transition-colors">
                <h3 className="cv-h3 text-cv-ink">{t}</h3>
                <p className="text-cv-ink/75 mt-2">{b}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cv-section">
        <div className="cv-container max-w-3xl">
          <h2 className="cv-h2 text-cv-ink mb-8">AI engineering questions answered</h2>
          <div className="space-y-4">
            {FAQ.map(([q, a]) => (
              <details key={q} className="rounded-xl border border-cv-line bg-cv-surface2 p-5">
                <summary className="cursor-pointer font-medium text-cv-ink">{q}</summary>
                <p className="text-cv-ink/75 mt-3 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <div className="rounded-3xl border border-cv-line bg-cv-surface p-10 lg:p-16 text-center">
            <h2 className="cv-h2 text-cv-ink max-w-3xl mx-auto">Bring AIX to your AI workloads.</h2>
            <p className="cv-body-lg text-cv-ink/75 mt-5 max-w-2xl mx-auto">
              Connect your first account in under 30 minutes. Most teams have their first non-obvious finding the same day.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href={DEMO_URL} className="cv-btn-primary"><span>Book a Demo</span><ArrowRight size={16} /></Link>
              <Link href="/contact" className="cv-btn-ghost">Talk to Sales</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
