import { useEffect } from "react";
import { BaseLayout } from "@/layouts/BaseLayout";

export default function AIFeatures() {
  useEffect(() => {
    document.title = "AI / Features";
  }, []);

  return (
    <BaseLayout>
      <section className="pt-12 sm:pt-16 lg:pt-20 pb-10 border-b border-cv-line dark:border-white/10 bg-cv-surface dark:bg-[#070b12]">
        <div className="cv-container-full">
          <div className="max-w-5xl">
            <span className="text-xs uppercase tracking-widest text-cv-muted dark:text-white/70 mb-4 inline-block font-bold">
              AI
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cv-ink dark:text-white mb-3">
              Brand-Defined Capabilities
            </h1>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 lg:py-14 bg-cv-surface dark:bg-[#070b12] min-h-[60vh]">
        <div className="cv-container-full">
          <div className="max-w-5xl space-y-10">
            <article className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-cv-ink dark:text-white">CloudVerse FinOps Control Plane</h2>
              <p className="text-[15px] sm:text-[16px] leading-7 text-cv-muted dark:text-white/85">
                CloudVerse provides a unified economic intelligence plane that spans hyperscalers, NeoCloud GPU providers, data platforms, and AI systems. Unlike traditional FinOps tools that normalize billing data, this capability models <b>economic intent</b> connecting spend to architectural decisions, workload behavior, and organizational ownership. It establishes unit economics as a first-class construct rather than an after-the-fact calculation.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-7 text-cv-muted dark:text-white/85">
                Operationally, organizations use this control plane to understand cost per service, per workload, per model, or per transaction, rather than aggregated monthly spend. This allows finance, engineering, and leadership to speak a shared language grounded in operational reality. Forecasting, anomaly detection, and optimization are contextualized by how systems are actually used.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-7 text-cv-muted dark:text-white/85">
                Without this layer, organizations operate blind to causality. Spend reviews become political, optimization remains manual, and AI/data costs outpace governance. The FinOps Control Plane is the anchor that enables every other CloudVerse surface.
              </p>
            </article>

            <article className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-cv-ink dark:text-white">DevX - Engineering-Led Cost Intelligence</h2>
              <p className="text-[15px] sm:text-[16px] leading-7 text-cv-muted dark:text-white/85">
                DevX embeds economic feedback directly into engineering workflows such as pull requests, infrastructure-as-code changes, and configuration updates. It surfaces cost deltas and architectural implications <b>before deployment</b>, translating abstract cloud pricing into concrete engineering signals.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-7 text-cv-muted dark:text-white/85">
                Day-to-day, engineers see how a specific code or configuration change impacts cost and why. Recommendations provide alternative configurations and tradeoffs rather than static rules. This shifts cost accountability left without blocking velocity.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-7 text-cv-muted dark:text-white/85">
                Without DevX, cost is discovered after deployment, when rollback is expensive and accountability is unclear. Engineers disengage from FinOps, and finance teams chase behavior instead of influencing it.
              </p>
            </article>

            <article className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-cv-ink dark:text-white">DataX - Data Platform Economics</h2>
              <p className="text-[15px] sm:text-[16px] leading-7 text-cv-muted dark:text-white/85">
                DataX provides workload-level economics for data platforms such as Snowflake, Databricks, Synapse, and BigQuery. It decomposes spend into queries, pipelines, jobs, and execution patterns, translating opaque data costs into actionable engineering insight.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-7 text-cv-muted dark:text-white/85">
                Organizations use DataX to identify hidden cost drivers, redesign inefficient workloads, and assign ownership beyond "the data team." This enables data leaders to defend decisions with clarity and optimize without guesswork.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-7 text-cv-muted dark:text-white/85">
                Without DataX, data costs are treated as a black box. Optimization efforts are blunt, accountability is misassigned, and costs continue to grow without structural change.
              </p>
            </article>

            <article className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-cv-ink dark:text-white">AIX - AI and GPU Economic Intelligence</h2>
              <p className="text-[15px] sm:text-[16px] leading-7 text-cv-muted dark:text-white/85">
                AIX is built specifically for AI-driven environments where GPU usage, model selection, and inference routing drive non-linear costs. It models cost per model run, per training cycle, and per inference, exposing cost-quality tradeoffs that traditional FinOps tools cannot represent.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-7 text-cv-muted dark:text-white/85">
                In practice, AIX helps AI leaders decide between models, providers, and routing strategies based on economics, not intuition. It provides early recommendations and a roadmap toward automated decisioning.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-7 text-cv-muted dark:text-white/85">
                Without AIX, AI costs are managed manually through meetings and spreadsheets. Visibility gaps persist, GPU utilization is inefficient, and leadership lacks confidence in ROI.
              </p>
            </article>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
