import type { Metadata } from "next";
import { PlatformCards } from "@/components/solution/PlatformCards";
import { Panel, VIZ_AMBER, VIZ_RED, VIZ_GRAY } from "@/components/solution/CardChrome";
import { FinopsShips } from "@/components/solution/FinopsShips";
import { FinopsHowItWorks } from "@/components/solution/FinopsHowItWorks";
import { FinopsClusterMock } from "@/components/solution/FinopsClusterMock";
import { WhoThisIsFor } from "@/components/solution/WhoThisIsFor";
import { FaqBlock } from "@/components/FaqBlock";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Dashboard } from "@/components/home/AgentryOrchestration";
import { SolutionHero } from "@/components/solution/SolutionHero";
import { SectionEyebrow } from "@/components/solution/SectionEyebrow";
import { BulletGrid } from "@/components/solution/BulletGrid";

export const metadata: Metadata = {
  title: "For FinOps Teams: The Control Plane Your Finance and Engineering Teams Both Trust | CloudVerse",
  description: "Allocation, anomaly response, commitments, and chargeback on one model. Reconciles to finance. Explains itself to engineering.",
  keywords: ["FinOps team platform", "cloud chargeback", "cloud cost allocation", "anomaly detection cloud", "cloud commitment management"],
  alternates: { canonical: "/solutions/finops-teams" },
  openGraph: {
    title: "For FinOps Teams: The Platform Finance and Engineering Both Trust",
    description: "Allocation, anomaly response, commitments, and chargeback on one model. Reconciles to finance. Explains itself to engineering.",
    url: "/solutions/finops-teams",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "CloudVerse for FinOps Teams" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "For FinOps Teams: The Platform Finance and Engineering Both Trust",
    description: "Allocation, anomaly response, commitments, and chargeback. Reconciles to finance.",
  },
};

const COSTS = [
  "Days spent explaining a month-on-month variance by hand",
  "Shared cost allocated manually, chargeback that doesn't survive scrutiny",
  "Forecasts that hold for a quarter and then drift",
  "AI and GPU spend with no unit economics attached",
  "No single owner accountable for the total across cloud, AI, data, and engineering",
];

const OUTCOMES = [
  "Explainability: variance traced to drivers and owners, not assembled by hand",
  "Allocation: shared spend mapped automatically, chargeback that holds under scrutiny",
  "Forecasting: forecasts finance can defend, AI spend included",
  "AI governance: AI and GPU spend turned into unit economics",
  "Upstream visibility: cost decisions in data and engineering surfaced before the invoice",
  "Control: one operational view, with ownership aligned end to end",
];

const FAQ = [
  ["How is this different from a cost explorer?", "An explorer shows spend. CloudVerse traces variance to a driver and owner, ranks the fix, and can carry it out."],
  ["Will it fit our allocation logic?", "Yes. Virtual tags define cost dimensions that match how your business is structured."],
  ["How long to implement?", "First account connected in under 30 minutes; recoverable spend usually surfaces the same day."],
  ["Multi-currency and tax?", "Chargeback is multi-currency and reconciles to source billing."],
  ["Does it cover AI spend too?", "Yes. Agentry folds AI and GPU spend into the same allocation and forecasting model."],
];

export default function FinOpsTeamsPage() {
  return (
    <>
      <SolutionHero
        eyebrow="For FinOps Teams"
        h1={
          <>
            The control plane your finance and engineering teams{" "}
            <span className="text-cv-blue dark:text-cv-blue-light">both trust.</span>
          </>
        }
        sub="Allocation, anomaly response, commitments, and chargeback on one model, across cloud, data, and AI. Reconciles to finance. Explains itself to engineering."
        platformHref="/platform/finops"
      />

      {/* THE SITUATION — two-column lead-in */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="flex flex-col items-center gap-10">
            <div className="mx-auto max-w-2xl text-center">
              <SectionEyebrow className="mb-4">The situation</SectionEyebrow>
              <h2 className="cv-h2 text-cv-ink text-balance">The situation FinOps teams are in.</h2>
              <p className="cv-body-lg text-cv-ink/80 mt-6">
                The invoice is on time. The explanation isn&apos;t. Your dashboards are accurate and your recommendations get ignored, because they don&apos;t reach the person who can act, with the context to act on.
              </p>
              <p className="cv-body-lg text-cv-ink/85 mt-4">
                And now AI spend is landing in places where the value isn&apos;t quantified yet. One model across infrastructure, data, and AI is the only way the numbers reconcile.
              </p>
            </div>
            <div className="mx-auto w-full max-w-3xl">
              <Panel className="justify-between p-6" chrome="finops.app/variance">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wide text-cv-muted">This month&apos;s variance</span>
                  <span className="font-mono text-base font-bold tabular-nums" style={{ color: VIZ_RED }}>+$42,180</span>
                </div>
                <div className="flex items-center justify-between rounded-md border border-dashed border-cv-line/60 px-3.5 py-4 text-xs dark:border-white/15">
                  <span className="text-cv-ink/55">Explanation</span>
                  <span className="font-medium" style={{ color: VIZ_GRAY }}>Pending</span>
                </div>
                <div className="flex items-center justify-between rounded-md border border-dashed border-cv-line/60 px-3.5 py-4 text-xs dark:border-white/15">
                  <span className="text-cv-ink/55">Owner assigned</span>
                  <span className="font-medium" style={{ color: VIZ_GRAY }}>Unassigned</span>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-md px-3.5 py-4 text-xs" style={{ background: `${VIZ_AMBER}12` }}>
                  <span className="min-w-0 flex-1" style={{ color: VIZ_AMBER }}>AI spend, unquantified value</span>
                  <span className="shrink-0 whitespace-nowrap font-mono font-semibold" style={{ color: VIZ_AMBER }}>$18,400</span>
                </div>
              </Panel>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IT'S COSTING YOU TODAY — card grid */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <div className="mx-auto max-w-2xl mb-8 text-center">
            <SectionEyebrow className="mb-4">The cost of the gap</SectionEyebrow>
            <h2 className="cv-h2 text-cv-ink">What that&apos;s costing you today.</h2>
          </div>
          <BulletGrid items={COSTS} tone="negative" />
        </div>
      </section>

      {/* WHAT FINOPS TEAMS SHIP */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="mx-auto max-w-2xl mb-10 text-center">
            <SectionEyebrow className="mb-4">What you ship</SectionEyebrow>
            <h2 className="cv-h2 text-cv-ink">What FinOps teams ship faster with CloudVerse</h2>
          </div>
          <FinopsShips
            items={[
              ["Allocation everyone agrees on", "Shared spend mapped to teams, products, and environments automatically. Chargeback that survives an audit."],
              ["Anomalies with attribution", "A spike arrives with the team and the charge already attached."],
              ["Commitments with payback proof", "RIs, SPs, and CUDs with realized payback tracked, not assumed."],
              ["Audit-ready chargeback", "Multi-currency, reconciled to source billing."],
            ]}
          />
        </div>
      </section>

      {/* HOW IT WORKS — flow diagram */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <div className="mx-auto max-w-3xl mb-12 text-center">
            <SectionEyebrow className="mb-4">How it works</SectionEyebrow>
            <h2 className="cv-h2 text-cv-ink">How compute economics works.</h2>
            <div className="mt-4 space-y-4">
              <p className="cv-body-lg text-cv-muted">
                Modern AI stacks have observability and orchestration. What they lack is economic control at the decision point.
              </p>
              <p className="cv-body-lg text-cv-muted">
                CloudVerse embeds economic decision logic across model selection, workload execution, and capacity commitments, so every compute decision is evaluated for cost, performance, and risk before it scales.
              </p>
            </div>
          </div>
          <FinopsHowItWorks />
        </div>
      </section>

      {/* CUSTOMER PROOF */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="flex flex-col items-center gap-10">
            <div className="mx-auto max-w-2xl text-center">
              <SectionEyebrow className="mb-4">Customer proof</SectionEyebrow>
              <h2 className="cv-h2 text-cv-ink">How Berkshire Hathaway HomeServices recovered $738,983</h2>
              <p className="mt-6 leading-relaxed text-cv-ink/80">
                A growing AWS estate, fragmented tagging, and no team-level attribution. CloudVerse tied spend to teams, surfaced the anomalies that mattered, and gave finance a model that held up under review.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-6">
                <div>
                  <div className="font-mono text-2xl font-bold text-cv-ink tracking-tight">$101,736</div>
                  <p className="mt-1 text-xs text-cv-muted">annual recovery</p>
                </div>
                <div className="hidden sm:block w-px self-stretch bg-cv-line/50" />
                <div>
                  <div className="font-mono text-2xl font-bold text-cv-ink tracking-tight">$61,582</div>
                  <p className="mt-1 text-xs text-cv-muted">in a single month</p>
                </div>
              </div>
            </div>
            <div className="mx-auto w-full max-w-3xl">
              <FinopsClusterMock />
            </div>
          </div>
        </div>
      </section>

      {/* HOW THIS IS DIFFERENT — two-column lead-in */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <SectionEyebrow className="mb-4">The difference</SectionEyebrow>
            <h2 className="cv-h2 text-cv-ink text-balance">How this is different</h2>
            <p className="cv-body-lg mt-4 text-cv-ink/80">
              Dashboards explain the invoice. CloudVerse governs the decisions that shape it: PR-level checks in engineering workflows, AI and GPU economics, and warehouse query attribution. All on one model.
            </p>
          </div>

          {/* Product screen mockup (reused from the home Agentry orchestration section) */}
          <div className="mt-12 lg:mt-16">
            <Dashboard />
          </div>
        </div>
      </section>

      {/* OUTCOMES — card grid with bolded lead */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="mx-auto max-w-2xl mb-8 text-center">
            <SectionEyebrow className="mb-4">Outcomes</SectionEyebrow>
            <h2 className="cv-h2 text-cv-ink">Outcomes you can defend.</h2>
          </div>
          <BulletGrid items={OUTCOMES} tone="positive" />
        </div>
      </section>

      {/* PLATFORM */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <div className="mx-auto max-w-2xl mb-8 text-center">
            <SectionEyebrow className="mb-4">Platform</SectionEyebrow>
            <h2 className="cv-h2 text-cv-ink">Platform that powers this solution</h2>
          </div>
          <PlatformCards
            items={[
              ["FinOps Platform", "Allocation, forecasting, anomalies, commitments", "/platform/finops"],
              ["Agentry", "Turns AI and GPU spend into unit economics", "/platform/agentry"],
              ["DataX", "Makes warehouse and pipeline cost allocable", "/platform/datax"],
            ]}
          />
        </div>
      </section>

      <WhoThisIsFor
        accent="#1664C0"
        personas={[
          {
            role: "CFO",
            category: "Finance leadership",
            quote: "One number I can take to the board — every dollar of cloud, AI, data, and SaaS tied to an owner.",
          },
          {
            role: "VP / Director of Finance",
            category: "Finance leadership",
            quote: "Chargeback that survives an audit, and forecasts that still hold at quarter-end.",
          },
          {
            role: "Head of FP&A",
            category: "Planning & analysis",
            quote: "Month-on-month variance explained in minutes — the team and the charge already attached.",
          },
          {
            role: "Head of Technology / IT Finance",
            category: "Technology finance",
            quote: "Engineering and infrastructure spend mapped to services and teams, without chasing spreadsheets.",
          },
          {
            role: "FinOps leads",
            category: "Cloud & FinOps",
            quote: "Allocation, commitments, and anomalies in one place — backed by proof, not assumptions.",
          },
        ]}
      />

      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <FaqBlock
            items={FAQ.map(([q, a]) => ({ q, a }))}
            accent="#1664C0"
            title="FinOps Team Questions Answered"
            subtitle="Common questions we get asked the most"
          />
        </div>
      </section>

      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Solutions", href: "/solutions" }, { name: "FinOps Teams", href: "/solutions/finops-teams" }]} />
    </>
  );
}
