import type { Metadata } from "next";
import { DOCS } from "@/lib/links";
import { Cpu } from "@/lib/solar-icons";
import { AgentryUnlocks } from "@/components/solution/AgentryUnlocks";
import { SituationConnectorMock, type SituationPickItem } from "@/components/solution/SituationConnectorMock";
import { WorkflowHero } from "@/components/solution/WorkflowHero";
import { SectionGlow } from "@/components/solution/SectionGlow";
import { PlatformCards } from "@/components/solution/PlatformCards";
import { RelatedSolutions } from "@/components/solution/RelatedSolutions";
import { SolutionHero } from "@/components/solution/SolutionHero";
import { HeroBlend } from "@/components/solution/HeroBlend";
import { SectionEyebrow } from "@/components/solution/SectionEyebrow";
import { SectionHeading } from "@/components/SectionHeading";
import { BulletGrid } from "@/components/solution/BulletGrid";
import { WhoThisIsFor } from "@/components/solution/WhoThisIsFor";
import { FaqBlock } from "@/components/FaqBlock";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "For AI Engineering: Your AI Spend Outran Your Governance",
  description: "Attribute every dollar to a team, feature, and use case. Route every workload to the right model. Walk into the budget conversation with numbers you can defend.",
  keywords: ["AI engineering cost", "LLM provider routing", "GPU cost optimization", "AI FinOps", "machine learning cost management"],
  alternates: { canonical: "/solutions/ai-engineering" },
  openGraph: {
    title: "For AI Engineering: Your AI Spend Outran Your Governance. Take It Back.",
    description: "Attribute every dollar to a team, feature, and use case. Route every workload to the right model.",
    url: "/solutions/ai-engineering",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "CloudVerse for AI Engineering Teams" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "For AI Engineering: Take Back Your AI Spend",
    description: "Live cost-quality routing across 8+ GPU and LLM providers, with attribution finance can defend.",
  },
};

const AI_ENG_MODELS: SituationPickItem[] = [
  { label: "claude-3.5-haiku · $0.006/1k", Icon: Cpu, bg: "#0E3F8C" },
  { label: "gemini-1.5-flash · $0.004/1k", Icon: Cpu, bg: "#1664C0" },
  { label: "llama-3-70b · $0.003/1k", Icon: Cpu, bg: "#4D9AEF", active: true },
];

const COSTS = [
  "AI spend you can't cleanly attribute to a team, feature, or use case.",
  "Unit economics borrowed from infrastructure, not sized for tokens and GPUs.",
  "Inference and GPU cost that shifts every week as agents and copilots scale.",
  "The \"is this worth it?\" question from finance you can't yet answer with confidence.",
];

const OUTCOMES = [
  "Attribution: AI spend mapped to teams, features, and use cases.",
  "Routing: the 10–100x waste of the wrong model for a job, gone.",
  "AI-native unit economics: cost per request, per feature, per user.",
  "Governance: policy, access, residency, and vendor oversight in one place.",
  "Shadow AI, surfaced: the spend leaving engineering through Copilot, Cursor, and agents.",
  "Credibility: a number that holds up in front of finance, the CEO, and the board.",
];

const FAQ = [
  ["How is this different from an LLM gateway?", "A gateway runs the rule you wrote. Agentry scores every route live and decides what the rule should be, then logs why."],
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
        accent="purple"
        h1={
          <>
            Your AI spend outran your governance.{" "}
            <span className="text-[#6954D4] dark:text-[#A99CF0]">Take it back.</span>
          </>
        }
        sub="Attribute every dollar to a team, a feature, a use case. Route every workload to the right model. Walk into the budget conversation with numbers you can defend."
        platformHref="/platform/agentry"
      />

      <section className="relative overflow-hidden cv-section">
        <HeroBlend />
        <div className="cv-container relative z-10">
          <div className="flex flex-col items-start gap-10">
            <SectionHeading eyebrow="The situation" title="The model you picked once is now the expensive one." lead>
              You picked a model once and wired it in. There are now cheaper models that clear the same quality bar, but changing means a code change nobody has time for.
              <span className="mt-4 block">
                Meanwhile AI-assisted coding and agents are moving your inference and GPU cost week to week, and the bill arrives with no owner attached.
              </span>
              <span className="mt-4 block font-medium text-cv-ink">Agentry closes both gaps.</span>
            </SectionHeading>
            <SituationConnectorMock
              leftHeading="Model"
              leftValue="gpt-4-turbo"
              attributeHeading="Cost per 1k tokens"
              attributeValue="$0.030 · locked in code"
              connectorLabel="Routes to"
              rightHeading="Cheaper alternative"
              rightSearchPlaceholder="Same quality bar…"
              items={AI_ENG_MODELS}
            />
          </div>
        </div>
      </section>

      {/* WHAT IT'S COSTING YOU TODAY */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <div className="max-w-2xl mb-8 text-left">
            <SectionEyebrow className="mb-4">The cost of the gap</SectionEyebrow>
            <h2 className="cv-h2 text-cv-ink">What the gap costs while you decide.</h2>
          </div>
          <BulletGrid items={COSTS} tone="negative" />
        </div>
      </section>

      {/* WHAT YOU SHIP */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="max-w-2xl mb-10 text-left">
            <SectionEyebrow className="mb-4">What you ship</SectionEyebrow>
            <h2 className="cv-h2 text-cv-ink">What Agentry does for AI engineering teams.</h2>
          </div>
          <AgentryUnlocks />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="cv-section relative overflow-hidden bg-cv-surface2 dark:bg-black">
        <SectionGlow />
        <div className="cv-container relative z-10">
          <SectionHeading className="mb-8" eyebrow="How it works" title={<>How Agentry controls<br />every AI request.</>} lead docsHref={DOCS.aiEconomics}>
            Agentry sits between your app and every AI provider. On each request it scores the routes against your team's rules and returns the best one, with a fallback and a full decision log.
            <span className="mt-4 block">
              A gateway runs the rule you wrote. Agentry works out whether that rule is still right.
            </span>
          </SectionHeading>
          <WorkflowHero className="mt-12 lg:mt-16" />
        </div>
      </section>

      {/* THE NUMBERS */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="max-w-2xl text-left">
            <SectionEyebrow className="mb-4">The numbers</SectionEyebrow>
            <h2 className="cv-h2 text-cv-ink">What changes once Agentry is routing.</h2>
            <p className="mt-3 text-sm text-cv-muted">Benchmarked figures are labeled. Ranges are drawn from production workloads.</p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              "40–90% lower AI cost across production workloads",
              "Under 15ms of routing overhead per request",
              "96.8% lower cost and 28.5% faster than a hardcoded Claude Sonnet setup (benchmarked)",
              "10–100x cost gap between the right model for a job and the wrong one",
            ].map((b) => (
              <div key={b} className="flex items-start gap-3 rounded-2xl border border-cv-line/40 bg-cv-surface dark:bg-[#0D0D0D] p-5 text-cv-ink/85">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cv-teal" /> {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <div className="max-w-2xl mb-8 text-left">
            <SectionEyebrow className="mb-4">Outcomes</SectionEyebrow>
            <h2 className="cv-h2 text-cv-ink">Outcomes you can take to the board.</h2>
          </div>
          <BulletGrid items={OUTCOMES} tone="positive" />
        </div>
      </section>

      {/* PLATFORM */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="max-w-2xl mb-8 text-left">
            <SectionEyebrow className="mb-4">Platform</SectionEyebrow>
            <h2 className="cv-h2 text-cv-ink">The modules behind the routing.</h2>
          </div>
          <PlatformCards
            items={[
              ["Agentry", "Routing, governance, and AI unit economics", "/platform/agentry"],
              ["Torb", "Catches the new model call or chatty agent loop in the pull request", "/platform/torb"],
              ["DataX", "Attributes the warehouse cost your RAG and model pipelines drive", "/platform/datax"],
            ]}
          />
        </div>
      </section>

      <WhoThisIsFor
        accent="#6954D4"
        heading="Who this is for."
        subhead="The people who answer for the AI bill."
        personas={[
          {
            role: "Head of AI",
            category: "AI leadership",
            quote: "Every model route explained and priced, so the AI number holds up in front of the board.",
          },
          {
            role: "Chief AI Officer",
            category: "AI leadership",
            quote: "Governance and cost on one model, so growth doesn't mean losing control of spend.",
          },
          {
            role: "VP / Director of MLOps",
            category: "AI operations",
            quote: "Routing and fallback logged automatically, with no chasing why a request went where it did.",
          },
          {
            role: "Head of Data Science / ML Engineering",
            category: "AI engineering",
            quote: "Cost per request, per feature, per user, without instrumenting it by hand.",
          },
          {
            role: "AI Platform leads",
            category: "Platform engineering",
            quote: "One policy layer across every provider and GPU pool in production.",
          },
        ]}
      />

      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <FaqBlock
            items={FAQ.map(([q, a]) => ({ q, a }))}
            title="AI engineering questions, answered."
            subtitle="What Heads of AI and MLOps leads ask first."
          />
        </div>
      </section>

      <RelatedSolutions current="/solutions/ai-engineering" />

      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Solutions", href: "/solutions" }, { name: "AI Engineering", href: "/solutions/ai-engineering" }]} />
    </>
  );
}
