import { useEffect } from "react";
import { BaseLayout } from "@/layouts/BaseLayout";

const stages = [
  {
    stage: "Stage 1",
    subtitle: "Designing and Planning Cloud Workloads",
    body: [
      "At the planning stage, teams define architectures, data pipelines, and AI systems without clear economic feedback. Decisions are driven by performance and speed, with cost considered abstractly or ignored altogether.",
      "CloudVerse introduces economic context early, allowing planners to evaluate tradeoffs before resources are committed. This reduces downstream surprises and aligns design intent with financial constraints.",
      "Without this capability, organizations lock in expensive architectures that are difficult to unwind later.",
    ],
  },
  {
    stage: "Stage 2",
    subtitle: "Building and Deploying Changes",
    body: [
      "As code and configurations are built, decisions that materially affect cost are made rapidly. Traditional systems surface impact weeks later, if at all.",
      "CloudVerse injects cost intelligence into CI/CD and PR workflows, making economics visible at decision time. Engineers understand consequences immediately and can adjust without friction.",
      "Without this, cost becomes a retrospective problem and erodes trust between teams.",
    ],
  },
  {
    stage: "Stage 3",
    subtitle: "Operating at Scale",
    body: [
      "In production, workloads evolve continuously. AI and data systems introduce volatility that static rules cannot manage.",
      "CloudVerse continuously monitors behavior, correlates it with economics, and surfaces non-obvious drivers. Recommendations are contextual and prioritized.",
      "Absent this, organizations drown in alerts, dashboards, and manual reviews.",
    ],
  },
  {
    stage: "Stage 4",
    subtitle: "Optimizing and Automating Decisions",
    body: [
      "As trust builds, organizations seek to reduce human toil. Manual optimization does not scale with AI.",
      "CloudVerse provides a path from insight to recommendation to automated action, enabling governance that keeps pace with complexity.",
      "Without automation, optimization windows are missed and costs spiral.",
    ],
  },
  {
    stage: "Stage 5",
    subtitle: "Executive and Strategic Decisioning",
    body: [
      "At the highest level, leaders must decide where to invest, which platforms to use, and how to scale AI responsibly.",
      "CloudVerse aggregates operational intelligence into decision-ready insight, enabling FinOps Enabled Executive Decisions (FEED) across Cloud+, AI, and data scopes.",
      "Without this, executives fund growth without understanding true unit economics.",
    ],
  },
];

export default function AICapabalities() {
  useEffect(() => {
    document.title = "AI / Capabalities";
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
              User-Journey Capabilities
            </h1>
            <p className="text-lg sm:text-xl font-bold text-cv-ink dark:text-white">
              Lifecycle View
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 lg:py-14 bg-cv-surface dark:bg-[#070b12] min-h-[60vh]">
        <div className="cv-container-full">
          <div className="max-w-5xl space-y-10">
            {stages.map((item) => (
              <article key={item.stage} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-cv-ink dark:text-white mb-4">
                  {item.stage} — {item.subtitle}
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  {item.body.map((paragraph, index) => (
                    <li
                      key={`${item.stage}-${index}`}
                      className="text-[15px] sm:text-[16px] leading-7 text-cv-muted dark:text-white/85"
                    >
                      {paragraph}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
