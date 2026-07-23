import type { Metadata } from "next";
import { ChatRound, Cpu, Server2, Wallet, CheckSquare, ShieldCheck, Routing } from "@/lib/solar-icons";
import { AgentryUnlocks } from "@/components/solution/AgentryUnlocks";
import { Panel, CodeLine, Pill, VIZ_AMBER, VIZ_RED } from "@/components/solution/CardChrome";
import { HowItWorksFlow, type FlowChip, type FlowWorkload, type FlowRightNode } from "@/components/solution/HowItWorksFlow";
import { PlatformCards } from "@/components/solution/PlatformCards";
import { RelatedSolutions } from "@/components/solution/RelatedSolutions";
import { SolutionHero } from "@/components/solution/SolutionHero";
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

const HOW_IT_WORKS_WORKLOADS: FlowWorkload[] = [
  { label: "Chat & Copilots", sub: "User-facing requests", color: "#1664C0", Icon: ChatRound },
  { label: "AI Agents", sub: "Autonomous workflows", color: "#6954D4", Icon: Cpu },
  { label: "Batch Inference", sub: "Scheduled & bulk jobs", color: "#0E9E7A", Icon: Server2 },
];

const HOW_IT_WORKS_CHIPS: FlowChip[] = [
  { label: "Cost Scoring", color: "#1664C0", Icon: Wallet },
  { label: "Quality Scoring", color: "#0E9E7A", Icon: CheckSquare },
  { label: "Policy Guardrails", color: "#D97706", Icon: ShieldCheck },
  { label: "Fallback Routing", color: "#6954D4", Icon: Routing },
];

const HOW_IT_WORKS_RIGHT: FlowRightNode[] = [
  { kind: "logo", src: "/icons/openai.svg", name: "OpenAI", invert: true },
  { kind: "logo", src: "/icons/anthropic.svg", name: "Anthropic" },
  { kind: "logo", src: "/icons/gemini.svg", name: "Gemini" },
  { kind: "logo", src: "/icons/meta.svg", name: "Meta" },
  { kind: "logo", src: "/icons/mistral.svg", name: "Mistral" },
  { kind: "logo", src: "/icons/groq.svg", name: "Groq" },
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

      <section className="cv-section">
        <div className="cv-container">
          <div className="flex flex-col items-start gap-10">
            <SectionHeading eyebrow="The situation" title="The model you picked once is now the expensive one." lead>
              You picked a model once and wired it in. There are now cheaper models that clear the same quality bar, but changing means a code change nobody has time for.
              <span className="mt-4 block">
                Meanwhile AI-assisted coding and agents are moving your inference and GPU cost week to week, and the bill arrives with no owner attached.
              </span>
              <span className="mt-4 block font-medium text-cv-ink">Agentry closes both gaps.</span>
            </SectionHeading>
            <div className="mx-auto w-full max-w-3xl">
              <Panel className="justify-between p-6" chrome="agentry.app/situation">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wide text-cv-muted">Current route · hardcoded</span>
                  <Pill color={VIZ_AMBER}>Locked in code</Pill>
                </div>
                <div className="rounded-md border border-cv-line/60 py-2 dark:border-white/10">
                  <CodeLine n={1}>
                    <span className="text-cv-ink/75">model: </span>
                    <span style={{ color: VIZ_AMBER }}>&quot;gpt-4-turbo&quot;</span>
                  </CodeLine>
                </div>
                <div className="space-y-2.5">
                  {[
                    ["claude-3.5-haiku", "$0.006/1k"],
                    ["gemini-1.5-flash", "$0.004/1k"],
                    ["llama-3-70b", "$0.003/1k"],
                  ].map(([name, price]) => (
                    <div key={name} className="flex items-center justify-between gap-3 rounded-md border border-cv-line/60 px-3.5 py-3 text-xs dark:border-white/10">
                      <span className="min-w-0 flex-1 truncate text-cv-ink/70">{name}</span>
                      <span className="flex shrink-0 flex-col items-end gap-0.5">
                        <span className="whitespace-nowrap font-mono tabular-nums text-cv-muted">{price}</span>
                        <span className="whitespace-nowrap text-[10px] text-cv-ink/35">blocked · code change</span>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-3 rounded-md px-3.5 py-4 text-xs" style={{ background: `${VIZ_RED}12` }}>
                  <span className="min-w-0 flex-1" style={{ color: VIZ_RED }}>GPU + inference spend, rising weekly</span>
                  <span className="shrink-0 whitespace-nowrap font-mono font-semibold" style={{ color: VIZ_RED }}>No owner</span>
                </div>
              </Panel>
            </div>
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
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <SectionHeading className="mb-12" eyebrow="How it works" title="How Agentry controls every AI request." lead>
            Agentry sits between your application and every AI provider you use. On each request it scores the available routes against the rules your team set, then returns the best one with a fallback and a full decision log.
            <span className="mt-4 block">
              A gateway runs the rule you wrote. Agentry works out whether that rule is still right.
            </span>
          </SectionHeading>
          <HowItWorksFlow
            workloads={HOW_IT_WORKS_WORKLOADS}
            chips={HOW_IT_WORKS_CHIPS}
            hubLabel="Cost · Quality · Latency"
            hubSub="scored on every request"
            right={HOW_IT_WORKS_RIGHT}
            bottomRows={["Hosted APIs", "Dedicated GPU pools"]}
          />
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
