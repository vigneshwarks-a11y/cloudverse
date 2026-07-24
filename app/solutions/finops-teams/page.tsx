import type { Metadata } from "next";
import { DOCS } from "@/lib/links";
import { UsersGroupRounded, MagicStick, Wallet, ShieldCheck } from "@/lib/solar-icons";
import { PlatformCards } from "@/components/solution/PlatformCards";
import { RelatedSolutions } from "@/components/solution/RelatedSolutions";
import { SituationConnectorMock, type SituationPickItem } from "@/components/solution/SituationConnectorMock";
import { FinopsShips } from "@/components/solution/FinopsShips";
import { WorkflowHero } from "@/components/solution/WorkflowHero";
import { FinopsClusterMock } from "@/components/solution/FinopsClusterMock";
import { WhoThisIsFor } from "@/components/solution/WhoThisIsFor";
import { FaqBlock } from "@/components/FaqBlock";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Dashboard } from "@/components/home/AgentryOrchestration";
import { SolutionHero } from "@/components/solution/SolutionHero";
import { HeroBlend } from "@/components/solution/HeroBlend";
import { SectionEyebrow } from "@/components/solution/SectionEyebrow";
import { SectionHeading } from "@/components/SectionHeading";
import { BulletGrid } from "@/components/solution/BulletGrid";

export const metadata: Metadata = {
  title: "For FinOps Teams: Allocation, Anomalies, and Chargeback Finance Can Defend",
  description: "Trace variance to a driver and an owner, allocate shared spend automatically, and produce chargeback that reconciles to source billing, across cloud, AI, and data.",
  keywords: ["FinOps team platform", "cloud chargeback", "cloud cost allocation", "anomaly detection cloud", "cloud commitment management"],
  alternates: { canonical: "/solutions/finops-teams" },
  openGraph: {
    title: "For FinOps Teams: Allocation, Anomalies, and Chargeback Finance Can Defend",
    description: "Trace variance to a driver and an owner, allocate shared spend automatically, and produce chargeback that reconciles to source billing.",
    url: "/solutions/finops-teams",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "CloudVerse for FinOps Teams" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "For FinOps Teams: Chargeback Finance Can Defend",
    description: "Variance traced to a driver and owner, allocation that runs itself, forecasts finance can defend.",
  },
};

const FINOPS_OWNERS: SituationPickItem[] = [
  { label: "ML Platform team", Icon: UsersGroupRounded, bg: "#2E5CF0", active: true },
  { label: "Data Engineering", Icon: MagicStick, bg: "#6954D4" },
  { label: "Finance ops", Icon: Wallet, bg: "#D9A404" },
  { label: "Unassigned", Icon: ShieldCheck, bg: "#94969C" },
];

const COSTS = [
  "Days spent reconstructing a month-on-month variance by hand.",
  "Shared spend split with a spreadsheet, chargeback that falls apart under scrutiny.",
  "Forecasts that hold for a quarter, then drift.",
  "AI and GPU spend on the bill with no unit economics attached.",
  "Cloud, AI, data, and engineering each priced in a different tool, never on one model.",
];

const OUTCOMES = [
  "Explainability: variance traced to a driver and an owner, not assembled by hand.",
  "Allocation: shared spend mapped automatically, chargeback that holds under an audit.",
  "Forecasting: forecasts finance can defend, AI spend included.",
  "AI economics: AI and GPU spend turned into cost per request, feature, and team.",
  "Upstream visibility: cost decisions in data and engineering surfaced before the invoice.",
  "One model: cloud, AI, and data on a single allocation model, owned end to end.",
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
            The invoice is on time. The explanation isn&apos;t.{" "}
            <span className="text-cv-blue dark:text-cv-blue-light">We fix that.</span>
          </>
        }
        sub="Explainability, allocation, and forecasts finance can defend, across cloud, AI, and data, with AI turned into unit economics."
        platformHref="/platform/finops"
      />

      {/* THE SITUATION — two-column lead-in */}
      <section className="relative overflow-hidden cv-section">
        <HeroBlend />
        <div className="cv-container relative z-10">
          <div className="flex flex-col items-start gap-10">
            <SectionHeading lead eyebrow="The situation" title="Accurate to the cent, and still unexplained.">
              <p className="cv-body-lg text-cv-ink/80">
                Your dashboards are accurate and your recommendations get ignored, because they don&apos;t reach the person who can act, with the context to act on.
              </p>
              <p className="cv-body-lg text-cv-ink/85 mt-4">
                And now AI spend is landing in places where the value isn&apos;t quantified yet. One model across infrastructure, data, and AI is the only way the numbers reconcile.
              </p>
            </SectionHeading>
            <SituationConnectorMock
              leftHeading="Variance"
              leftValue="+$42,180 this month"
              attributeHeading="Explanation"
              attributeValue="GPU autoscale, EU region"
              connectorLabel="Attributed to"
              rightHeading="Owner"
              rightSearchPlaceholder="Was unassigned…"
              items={FINOPS_OWNERS}
            />
          </div>
        </div>
      </section>

      {/* WHAT IT'S COSTING YOU TODAY — card grid */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <div className="max-w-2xl mb-8 text-left">
            <SectionEyebrow className="mb-4">The cost of the gap</SectionEyebrow>
            <h2 className="cv-h2 text-cv-ink">What the gap costs finance every month.</h2>
          </div>
          <BulletGrid items={COSTS} tone="negative" />
        </div>
      </section>

      {/* WHAT FINOPS TEAMS SHIP */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="max-w-2xl mb-10 text-left">
            <SectionEyebrow className="mb-4">What you ship</SectionEyebrow>
            <h2 className="cv-h2 text-cv-ink">What FinOps teams ship faster with CloudVerse.</h2>
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

      {/* HOW IT WORKS — flow diagram (FinOps allocation, not AI routing) */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <SectionHeading lead eyebrow="How it works" title={<>How allocation and chargeback<br />actually run.</>} className="mb-8" docsHref={DOCS.chargeback}>
            <div className="space-y-4">
              <p className="cv-body-lg text-cv-muted">
                CloudVerse connects your cloud, AI, and data billing read-only, maps shared spend with virtual tags, and traces every variance to a driver and an owner.
              </p>
              <p className="cv-body-lg text-cv-muted">
                Anomalies arrive with the charge attached, chargeback reconciles to source billing, and forecasts run on the model finance signs off on.
              </p>
            </div>
          </SectionHeading>
          <WorkflowHero />
        </div>
      </section>

      {/* CUSTOMER PROOF — Berkshire (all three figures labeled, proof bank §4.3) */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
            <div className="text-left">
              <SectionEyebrow className="mb-4">Customer proof</SectionEyebrow>
              <h2 className="cv-h2 text-cv-ink">How Berkshire Hathaway HomeServices recovered $738,983.</h2>
            </div>
            <div className="text-left">
              <p className="leading-relaxed text-cv-ink/80">
                A growing AWS estate, fragmented tagging, and no team-level attribution. CloudVerse tied spend to teams, surfaced the anomalies that mattered, and gave finance a model that held up under review.
              </p>
              <div className="mt-8 flex flex-wrap gap-6">
                <div>
                  <div className="font-mono text-2xl font-bold tracking-tight text-cv-ink">$738,983</div>
                  <p className="mt-1 text-xs text-cv-muted">realized in total</p>
                </div>
                <div className="hidden sm:block w-px self-stretch bg-cv-line/50" />
                <div>
                  <div className="font-mono text-2xl font-bold tracking-tight text-cv-ink">$101,736</div>
                  <p className="mt-1 text-xs text-cv-muted">recurring, per year</p>
                </div>
                <div className="hidden sm:block w-px self-stretch bg-cv-line/50" />
                <div>
                  <div className="font-mono text-2xl font-bold tracking-tight text-cv-ink">$61,582</div>
                  <p className="mt-1 text-xs text-cv-muted">in a single month</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 w-full">
            <FinopsClusterMock />
          </div>
        </div>
      </section>

      {/* HOW THIS IS DIFFERENT — two-column lead-in */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <SectionHeading lead eyebrow="The difference" title="What a dashboard can't do.">
            <p className="cv-body-lg text-cv-ink/80">
              Dashboards explain the invoice. CloudVerse governs the decisions that shape it: PR-level checks in engineering workflows, AI and GPU economics, and warehouse query attribution. All on one model.
            </p>
          </SectionHeading>

          {/* Product screen mockup (reused from the home Agentry orchestration section) */}
          <div className="mt-12 lg:mt-16">
            <Dashboard />
          </div>
        </div>
      </section>

      {/* OUTCOMES — card grid with bolded lead */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="max-w-2xl mb-8 text-left">
            <SectionEyebrow className="mb-4">Outcomes</SectionEyebrow>
            <h2 className="cv-h2 text-cv-ink">Outcomes finance can sign off on.</h2>
          </div>
          <BulletGrid items={OUTCOMES} tone="positive" />
        </div>
      </section>

      {/* PLATFORM */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <div className="max-w-2xl mb-8 text-left">
            <SectionEyebrow className="mb-4">Platform</SectionEyebrow>
            <h2 className="cv-h2 text-cv-ink">The modules behind it.</h2>
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
        heading="Who this is for."
        subhead="The people who answer for the number."
        personas={[
          {
            role: "CFO",
            category: "Finance leadership",
            quote: "One number for the board, with every dollar of cloud, AI, data, and SaaS tied to an owner.",
          },
          {
            role: "VP / Director of Finance",
            category: "Finance leadership",
            quote: "Chargeback that survives an audit, and forecasts that still hold at quarter-end.",
          },
          {
            role: "Head of FP&A",
            category: "Planning & analysis",
            quote: "Month-on-month variance explained in minutes, the team and the charge already attached.",
          },
          {
            role: "Head of Technology / IT Finance",
            category: "Technology finance",
            quote: "Engineering and infrastructure spend mapped to services and teams, without chasing spreadsheets.",
          },
          {
            role: "FinOps leads",
            category: "Cloud & FinOps",
            quote: "Allocation, commitments, and anomalies in one place, backed by proof instead of assumptions.",
          },
        ]}
      />

      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <FaqBlock
            items={FAQ.map(([q, a]) => ({ q, a }))}
            title="FinOps questions, answered."
            subtitle="What finance and FinOps leads ask first."
          />
        </div>
      </section>

      <RelatedSolutions current="/solutions/finops-teams" />

      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Solutions", href: "/solutions" }, { name: "FinOps Teams", href: "/solutions/finops-teams" }]} />
    </>
  );
}
