import Link from "next/link";
import { ArrowRight, CheckCircle, CloseCircle } from "@solar-icons/react";
import type { Metadata } from "next";
import { DEMO_URL } from "@/lib/links";
import { CountUpStat } from "@/components/CountUpStat";
import { PlatformCards } from "@/components/solution/PlatformCards";
import { FinopsShips } from "@/components/solution/FinopsShips";
import { FinopsHowItWorks } from "@/components/solution/FinopsHowItWorks";
import { FinopsClusterMock } from "@/components/solution/FinopsClusterMock";
import { WhoThisIsFor } from "@/components/solution/WhoThisIsFor";
import { FaqBlock } from "@/components/FaqBlock";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Dashboard } from "@/components/home/AixOrchestration";

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

// Shared eyebrow pill — the same chip used across the redesigned sections.
const PILL =
  "inline-flex items-center gap-1.5 rounded-full bg-[#1664C0]/15 dark:bg-[#7CB8F8]/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#1664C0] dark:text-[#7CB8F8]";

const STATS = [
  { v: "$738,983", l: "recovered (BHHS)" },
  { v: "<30 min", l: "first account connected" },
  { v: "Same day", l: "first finding" },
  { v: "5+", l: "cloud providers unified" },
];

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
  ["Does it cover AI spend too?", "Yes. AIX folds AI and GPU spend into the same allocation and forecasting model."],
];

export default function FinOpsTeamsPage() {
  return (
    <>
      {/* HERO — home-page layout: headline + CTAs left, subhead + links right */}
      <div className="cv-hero-bg">
        <section className="pt-[120px] sm:pt-[160px] pb-12 lg:pt-[240px] lg:pb-16 relative">
          <div className="cv-container relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-20">
              {/* Left: eyebrow + headline + CTAs */}
              <div className="flex-1 min-w-0 lg:max-w-2xl xl:max-w-3xl">
                <p className="cv-label mb-5">For FinOps Teams</p>
                <h1 className="cv-h1 text-cv-ink max-w-3xl">
                  The control plane your finance and engineering teams{" "}
                  <span className="text-cv-blue dark:text-cv-blue-light">both trust.</span>
                </h1>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={DEMO_URL} className="cv-btn-primary">
                    <span>Book a demo</span><ArrowRight weight="Linear" size={16} />
                  </Link>
                  <Link href="/platform/finops" className="cv-btn-ghost !text-cv-ink !border-cv-ink/30 hover:!border-cv-ink/60 hover:!bg-cv-ink/10 dark:!text-white dark:!border-white/40 dark:hover:!border-white/70 dark:hover:!bg-white/10">
                    Explore the platform
                  </Link>
                </div>
              </div>

              {/* Right: subhead + utility links */}
              <div className="mt-10 lg:mt-0 lg:max-w-xs xl:max-w-sm shrink-0">
                <p className="cv-body text-cv-ink/70">
                  Allocation, anomaly response, commitments, and chargeback on one model, across cloud, data, and AI. Reconciles to finance. Explains itself to engineering.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* STATS — animated count-up + polished cards */}
      <section className="pt-8 pb-12 lg:pt-10 lg:pb-16">
        <div className="max-w-cv mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3">
            {STATS.map((s) => (
              <div
                key={s.l}
                className="flex flex-col items-center justify-center rounded-2xl border border-cv-ink/10 dark:border-white/10 px-6 py-10 text-center bg-white/40 dark:bg-[#0D0D0D] backdrop-blur-sm"
              >
                <CountUpStat value={s.v} className="font-mono text-3xl lg:text-4xl font-bold text-cv-ink tracking-tight" />
                <p className="mt-3 text-sm font-medium text-cv-muted tracking-tight max-w-[160px] line-clamp-2">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE SITUATION — two-column lead-in */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
            <div>
              <span className={`${PILL} mb-4`}>The situation</span>
              <h2 className="cv-h2 text-cv-ink text-balance">The situation FinOps teams are in.</h2>
            </div>
            <div className="space-y-4 lg:self-end">
              <p className="cv-body-lg text-cv-ink/80">
                The invoice is on time. The explanation isn&apos;t. Your dashboards are accurate and your recommendations get ignored, because they don&apos;t reach the person who can act, with the context to act on.
              </p>
              <p className="cv-body-lg text-cv-ink/85">
                And now AI spend is landing in places where the value isn&apos;t quantified yet. One model across infrastructure, data, and AI is the only way the numbers reconcile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IT'S COSTING YOU TODAY — card grid */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <span className={`${PILL} mb-4`}>The cost of the gap</span>
          <h2 className="cv-h2 text-cv-ink mb-8">What that&apos;s costing you today.</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COSTS.map((b) => (
              <li key={b} className="flex items-start gap-3 rounded-2xl border border-cv-line/40 bg-cv-surface dark:bg-[#0D0D0D] p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EF4444]/10 text-[#EF4444] dark:text-[#F87171]">
                  <CloseCircle weight="Linear" size={16} />
                </span>
                <span className="text-sm leading-relaxed text-cv-ink/85">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHAT FINOPS TEAMS SHIP */}
      <section className="cv-section">
        <div className="cv-container">
          <span className={`${PILL} mb-4`}>What you ship</span>
          <h2 className="cv-h2 text-cv-ink mb-10">What FinOps teams ship faster with CloudVerse</h2>
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
          <span className={`${PILL} mb-4`}>How it works</span>
          <h2 className="cv-h2 text-cv-ink">How compute economics works.</h2>
          <div className="mt-4 max-w-3xl space-y-4 mb-12">
            <p className="cv-body-lg text-cv-muted">
              Modern AI stacks have observability and orchestration. What they lack is economic control at the decision point.
            </p>
            <p className="cv-body-lg text-cv-muted">
              CloudVerse embeds economic decision logic across model selection, workload execution, and capacity commitments, so every compute decision is evaluated for cost, performance, and risk before it scales.
            </p>
          </div>
          <FinopsHowItWorks />
        </div>
      </section>

      {/* CUSTOMER PROOF */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
            <div>
              <span className={`${PILL} mb-4`}>Customer proof</span>
              <h2 className="cv-h2 text-cv-ink max-w-xl">How Berkshire Hathaway HomeServices recovered $738,983</h2>
              <p className="mt-6 leading-relaxed text-cv-ink/80 max-w-xl">
                A growing AWS estate, fragmented tagging, and no team-level attribution. CloudVerse tied spend to teams, surfaced the anomalies that mattered, and gave finance a model that held up under review.
              </p>
              <div className="mt-8 flex flex-wrap gap-6">
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
            <FinopsClusterMock />
          </div>
        </div>
      </section>

      {/* HOW THIS IS DIFFERENT — two-column lead-in */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
            <div>
              <span className={`${PILL} mb-4`}>The difference</span>
              <h2 className="cv-h2 text-cv-ink text-balance">How this is different</h2>
            </div>
            <p className="cv-body-lg text-cv-ink/80 lg:self-end">
              Dashboards explain the invoice. CloudVerse governs the decisions that shape it: PR-level checks in engineering workflows, AI and GPU economics, and warehouse query attribution. All on one model.
            </p>
          </div>

          {/* Product screen mockup (reused from the home AIX orchestration section) */}
          <div className="mt-12 lg:mt-16">
            <Dashboard />
          </div>
        </div>
      </section>

      {/* OUTCOMES — card grid with bolded lead */}
      <section className="cv-section">
        <div className="cv-container">
          <span className={`${PILL} mb-4`}>Outcomes</span>
          <h2 className="cv-h2 text-cv-ink mb-8">Outcomes you can defend.</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {OUTCOMES.map((b) => {
              const [lead, ...rest] = b.split(": ");
              return (
                <li key={b} className="flex items-start gap-3 rounded-2xl border border-cv-line/40 bg-cv-surface2 dark:bg-[#0D0D0D] p-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cv-teal/12 text-cv-teal">
                    <CheckCircle weight="Linear" size={16} />
                  </span>
                  <span className="text-sm leading-relaxed text-cv-ink/85">
                    <span className="font-semibold text-cv-ink">{lead}. </span>
                    {rest.join(": ")}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* PLATFORM */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <span className={`${PILL} mb-4`}>Platform</span>
          <h2 className="cv-h2 text-cv-ink mb-8">Platform that powers this solution</h2>
          <PlatformCards
            items={[
              ["FinOps Platform", "Allocation, forecasting, anomalies, commitments", "/platform/finops"],
              ["AIX", "Turns AI and GPU spend into unit economics", "/platform/aix"],
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
