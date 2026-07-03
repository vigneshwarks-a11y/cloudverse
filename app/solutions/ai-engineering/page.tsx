import { CheckCircle, Cpu } from "@solar-icons/react";
import type { Metadata } from "next";
import { DEMO_URL } from "@/lib/links";
import AixUnlocks from "@/components/solution/AixUnlocks";
import { PlatformCards } from "@/components/solution/PlatformCards";
import { SolutionHero } from "@/components/solution/SolutionHero";
import { FaqBlock } from "@/components/FaqBlock";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "For AI Engineering — Run Every AI Workload Where It Costs Least and Runs Best | CloudVerse",
  description: "Live cost-quality routing across 8+ GPU and LLM providers. Policy-bound at execution. FinOps attribution included.",
  keywords: ["AI engineering cost", "LLM provider routing", "GPU cost optimization", "AI FinOps", "machine learning cost management"],
  alternates: { canonical: "/solutions/ai-engineering" },
  openGraph: {
    title: "For AI Engineering — Run Every AI Workload Where It Costs Least",
    description: "Live cost-quality routing across 8+ GPU and LLM providers. Policy-bound at execution. FinOps attribution included.",
    url: "/solutions/ai-engineering",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "CloudVerse for AI Engineering Teams" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "For AI Engineering — Run AI Workloads Where They Cost Least",
    description: "Live cost-quality routing across 8+ GPU and LLM providers. FinOps attribution included.",
  },
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
      <SolutionHero
        eyebrow="For AI Engineering"
        h1="Run Every AI Workload Where It Costs Least and Runs Best"
        sub="Live cost-quality routing across 8+ GPU and LLM providers. Policy-bound at execution. FinOps attribution included."
        accent="#6954D4"
        icon={Cpu}
        platformHref="/platform/aix"
        badges={["Live Routing", "Cost-Quality Scoring", "8+ Providers", "Budget Caps", "Fallback Routing", "Audit Trails"]}
      />

      <section className="pt-8 pb-12 lg:pt-10 lg:pb-16">
        <div className="max-w-cv mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {STATS.map((s) => (
              <div
                key={s.l}
                className="flex flex-col items-center justify-center rounded-2xl border border-cv-ink/10 dark:border-white/10 px-6 py-10 text-center bg-white/40 dark:bg-[#0D0D0D] backdrop-blur-sm"
              >
                <div className="font-mono text-2xl lg:text-3xl font-bold text-cv-ink tracking-tight">{s.v}</div>
                <p className="mt-3 text-sm font-medium text-cv-muted tracking-wide max-w-[160px] line-clamp-2">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cv-section">
        <div className="cv-container">
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

      <AixUnlocks />

      <section className="cv-section">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink">The numbers</h2>
          <ul className="mt-8 space-y-3">
            {[
              "40–90% cost reduction across production workloads",
              "Less than 15ms routing overhead",
              "96.8% lower cost vs hardcoded Claude Sonnet",
              "Spend variance drops from 3x to under 15% for agent workloads after AIX",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3 text-cv-ink/85">
                <CheckCircle weight="Linear" size={18} className="text-cv-teal mt-0.5 shrink-0" /> {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="cv-section bg-cv-surface dark:bg-black">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-8">Platform that powers this solution</h2>
          <PlatformCards
            items={[
              ["AIX", "GPU and LLM economics", "/platform/aix"],
              ["FinOps Platform", "Multi-cloud cost intelligence", "/platform/finops"],
              ["DevX", "Shift-left cost intelligence", "/platform/devx"],
            ]}
          />
        </div>
      </section>

      <section className="cv-section">
        <div className="cv-container">
          <div className="text-center mb-10">
            <h2 className="cv-h2 text-cv-ink">AI Engineering Questions Answered</h2>
          </div>
          <FaqBlock items={FAQ.map(([q, a]) => ({ q, a }))} accent="#1664C0" />
        </div>
      </section>

      <ClosingCTA />
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Solutions", href: "/solutions" }, { name: "AI Engineering", href: "/solutions/ai-engineering" }]} />
    </>
  );
}
