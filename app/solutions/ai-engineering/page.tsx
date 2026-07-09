import { CheckCircle, CloseCircle, Cpu } from "@solar-icons/react";
import type { Metadata } from "next";
import { DEMO_URL } from "@/lib/links";
import AixUnlocks from "@/components/solution/AixUnlocks";
import { PlatformCards } from "@/components/solution/PlatformCards";
import { SolutionHero } from "@/components/solution/SolutionHero";
import { WhoThisIsFor } from "@/components/solution/WhoThisIsFor";
import { FaqBlock } from "@/components/FaqBlock";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "For AI Engineering: Run Every AI Workload Where It Costs Least and Runs Best | CloudVerse",
  description: "Live cost-quality routing across 8+ GPU and LLM providers. Policy-bound at execution. FinOps attribution included.",
  keywords: ["AI engineering cost", "LLM provider routing", "GPU cost optimization", "AI FinOps", "machine learning cost management"],
  alternates: { canonical: "/solutions/ai-engineering" },
  openGraph: {
    title: "For AI Engineering: Run Every AI Workload Where It Costs Least",
    description: "Live cost-quality routing across 8+ GPU and LLM providers. Policy-bound at execution. FinOps attribution included.",
    url: "/solutions/ai-engineering",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "CloudVerse for AI Engineering Teams" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "For AI Engineering: Run AI Workloads Where They Cost Least",
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
  ["How is this different from an LLM gateway?", "A gateway runs the rule you wrote. AIX scores every route live and decides what the rule should be, then logs why."],
  ["Can we mix hosted and self-hosted models?", "Yes. Managed APIs and private GPU pools (vLLM/TGI, CoreWeave, Lambda, RunPod, on-prem) are all first-class routing targets."],
  ["What about prompt privacy?", "PII is detected and handled (mask, tokenize, or block) before a request reaches any provider."],
  ["How does cost attribution work?", "Every request is tagged to a team, feature, and tenant at routing time, so allocation needs no manual clean-up."],
  ["Do we change application code?", "No. Routing and policy change at the rule layer, not in your code."],
  ["Can we automate safely?", "Read-only to start. Automation is opt-in, gated by approval, and fully logged."],
];

export default function AIEngineeringPage() {
  return (
    <>
      <SolutionHero
        eyebrow="For AI Engineering"
        h1="Run every AI workload where it costs least and runs best."
        sub="Live cost-quality routing across 8+ GPU and LLM providers. Policy-bound at execution. Full attribution included."
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
            You picked a model once and wired it in. There are now cheaper models that clear the same quality bar, but changing means a code change nobody has time for.
          </p>
          <p className="cv-body-lg text-cv-ink/80 mt-4">
            Meanwhile AI-assisted coding and agents are moving your inference and GPU cost week to week, and the bill arrives with no owner attached.
          </p>
          <p className="cv-body-lg text-cv-ink font-medium mt-4">AIX closes both gaps.</p>
        </div>
      </section>

      {/* WHAT IT'S COSTING YOU TODAY */}
      <section className="cv-section bg-cv-surface dark:bg-black">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-8">What that&apos;s costing you today.</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "AI spend you can't cleanly attribute to a team, feature, or use case",
              "Unit economics borrowed from infrastructure, not sized for tokens and GPUs",
              "Inference and GPU cost that shifts every week as agents and copilots scale",
              "The \"is this worth it?\" question from finance you can't yet answer with confidence",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3 text-cv-ink/85">
                <CloseCircle weight="Linear" size={18} className="text-cv-muted mt-0.5 shrink-0" /> {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <AixUnlocks />

      {/* HOW IT WORKS */}
      <section className="cv-section">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-10">How AI engineering teams run it.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              ["Connect", "Connect your providers and GPU pools. Minutes each, no app change."],
              ["Set policy", "Set policy per workload: quality floor, budget cap, allowed providers, residency."],
              ["Route", "Route every request to the best-fit model, with a fallback and a decision log."],
              ["Measure", "Measure cost per request, feature, and tenant, and take the number to finance."],
            ].map(([title, body], i) => (
              <div key={title} className="rounded-2xl border border-cv-line/40 bg-cv-surface2 dark:bg-[#0D0D0D] p-6">
                <div className="text-xs uppercase tracking-widest text-cv-muted">Step 0{i + 1}</div>
                <h3 className="cv-h3 text-cv-ink mt-2">{title}</h3>
                <p className="text-cv-ink/75 mt-3 leading-relaxed text-sm">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cv-section bg-cv-surface dark:bg-black">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink">The numbers.</h2>
          <ul className="mt-8 space-y-3">
            {[
              "40–90% cost reduction across production workloads",
              "Under 15ms routing overhead",
              "96.8% lower cost than a hardcoded Claude Sonnet setup, 28.5% faster",
              "Agent spend variance down from 3x to under 15% after AIX",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3 text-cv-ink/85">
                <CheckCircle weight="Linear" size={18} className="text-cv-teal mt-0.5 shrink-0" /> {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="cv-section">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-8">Outcomes you can take to the board.</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Attribution that maps AI spend to teams, features, and use cases",
              "Routing that kills 10–100x waste on the wrong model-for-the-job",
              "AI-native unit economics: cost per request, per feature, per user",
              "Governance: policy, access, residency, and vendor oversight in one place",
              "Visibility into the AI cost shipping out of engineering (Copilot, Cursor, agents)",
              "A number that holds up in front of finance, the CEO, and the board",
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
              ["AIX", "Routing, governance, and AI unit economics", "/platform/aix"],
              ["DevX", "Catches the new model call or chatty agent loop in the pull request", "/platform/devx"],
              ["DataX", "Attributes the warehouse cost your RAG and model pipelines drive", "/platform/datax"],
            ]}
          />
        </div>
      </section>

      <WhoThisIsFor
        roles={["Head of AI", "Chief AI Officer", "VP / Director of MLOps", "Head of Data Science / ML Engineering", "AI Platform leads"]}
        accent="#6954D4"
      />

      <section className="cv-section bg-cv-surface dark:bg-black">
        <div className="cv-container">
          <div className="text-center mb-10">
            <h2 className="cv-h2 text-cv-ink">AI Engineering Questions Answered</h2>
          </div>
          <FaqBlock items={FAQ.map(([q, a]) => ({ q, a }))} accent="#1664C0" />
        </div>
      </section>

      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Solutions", href: "/solutions" }, { name: "AI Engineering", href: "/solutions/ai-engineering" }]} />
    </>
  );
}
