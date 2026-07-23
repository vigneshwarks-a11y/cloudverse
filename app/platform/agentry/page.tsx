import Link from "next/link";
import { ArrowRight, Bolt, CheckCircle, CloseCircle, Route, ShieldCheck, TrashBin2, DollarMinimalistic, FileText } from "@/lib/solar-icons";
import type { Metadata } from "next";
import { DEMO_URL, DOCS } from "@/lib/links";
import { CountUpStat } from "@/components/CountUpStat";
import GovernanceBento from "@/components/product/GovernanceBento";
import NoBlackBoxes from "@/components/product/NoBlackBoxes";
import AgentryRoiSplit from "@/components/product/AgentryRoiSplit";
import { PlatformHeroMockup, type MockupTab } from "@/components/product/PlatformHeroMockup";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Eyebrow } from "@/components/Eyebrow";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import AgentrySteps from "@/components/product/AgentrySteps";
import AgentryProvidersMarquee from "@/components/product/AgentryProvidersMarquee";
import AgentryProblemsShowcase from "@/components/product/AgentryProblemsShowcase";
import { AgentryDeployment } from "@/components/home/AgentryDeployment";
import { VendorSovereignty } from "@/components/home/VendorSovereignty";
import { TechSpendCrossLink } from "@/components/home/TechSpendCrossLink";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { InlineCta } from "@/components/home/InlineCta";
import { FaqBlock } from "@/components/FaqBlock";

export const metadata: Metadata = {
  title: "CloudVerse Agentry: The Control Plane for Enterprise AI",
  description:
    "Route, govern, and meter every AI request across models, clouds, GPUs, and private endpoints. Cut AI cost 40–90%. The decision happens before the request, not after the bill.",
  keywords: ["AI cost optimization", "LLM routing", "GPU cost management", "enterprise AI governance", "AI gateway", "model routing"],
  alternates: { canonical: "/platform/agentry" },
  openGraph: {
    title: "CloudVerse Agentry: The Control Plane for Enterprise AI",
    description: "Route, govern, and meter every AI request across models, clouds, GPUs, and private endpoints. Cut AI cost 40–90%.",
    url: "/platform/agentry",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "CloudVerse Agentry: AI Cost Control Plane" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CloudVerse Agentry: The Control Plane for Enterprise AI",
    description: "Route, govern, and meter every AI request. Cut AI cost 40–90%. Decision-time governance.",
  },
};

const AGENTRY_TABS: MockupTab[] = [
  { id: "routing", label: "Routing", copy: "Every request scored live on cost, latency, and quality. The best-fit route wins, with a fallback attached.", icon: Route },
  { id: "governance", label: "Governance", copy: "Policy, access, residency, and provider trust enforced before a request runs.", icon: ShieldCheck },
  { id: "attribution", label: "Cost Attribution", copy: "Every run lands against a team, feature, and tenant. Automatically.", icon: DollarMinimalistic },
  { id: "audit", label: "Audit Trail", copy: "Every routing decision logged with the constraints, the candidates, and why one won.", icon: FileText },
];

const STATS = [
  { v: "40–90%", l: "cost reduction on production workloads" },
  { v: "<15ms", l: "routing overhead per request" },
  { v: "96.8%", l: "lower cost vs a hardcoded Claude Sonnet setup" },
  { v: "28.5%", l: "faster than that baseline" },
];

const AGENTRY_FAQS = [
  {
    q: "What is an AI control plane?",
    a: "The system that discovers every AI agent and model in use, governs execution in real time (budgets, policy, routing, kill switch), and records every call as evidence. It sets policy before a request runs and proves cost and outcome after.",
  },
  {
    q: "How is Agentry different from an AI gateway?",
    a: "A gateway runs the routing rule you already wrote. Agentry discovers what's actually running across your estate, including agents nobody told you about, and enforces budget, identity, and policy on every call, not just the ones already wired through a gateway.",
  },
  {
    q: "Does Agentry proxy my traffic or add latency?",
    a: "Routing overhead is under 15ms per request. Agentry can operate as a decision layer without mediating all traffic. Execution stays in your control.",
  },
  {
    q: "What happens when a model is deprecated or a provider goes down?",
    a: "Every route carries a fallback. Agentry reroutes within your constraints, and your prompts, policies, and audit trail keep working because they live in your control plane, not the vendor's.",
  },
  {
    q: "Can Agentry run entirely inside our own environment?",
    a: "Yes. Agentry deploys into your cloud tenancy or on-premises; the data plane stays inside your boundary, and prompt capture is a per-workload policy: full capture, redacted, or metadata-only.",
  },
  {
    q: "How fast can we see this on real workloads?",
    a: "A scoped private pilot in a tenancy you control: discover what's already running, govern one real workload, and read out the evidence, in about three weeks.",
  },
];

// Attribute-by-attribute contrast between a hardcoded setup and Agentry. Same keys
// on both sides so the two cards read as an aligned before/after comparison.
const HARDCODED_VS: { k: string; before: string; after: string }[] = [
  { k: "Model", before: "One, chosen once", after: "Best fit, per request" },
  { k: "Provider", before: "Fixed", after: "Scored live, with a fallback" },
  { k: "Region", before: "Fixed", after: "Chosen by residency rule" },
  { k: "Routing", before: "None — every request goes the same place", after: "Cost, latency, quality, and compliance" },
  { k: "Cost", before: "An assumption, not a measurement", after: "Attributed, capped, and on the record" },
];


const ROI = [
  ["1M requests", "$2,980", "$298", "$2,682"],
  ["5M requests", "$14,900", "$1,490", "$13,410"],
  ["10M requests", "$29,800", "$2,980", "$26,820"],
  ["50M requests", "$149,000", "$14,900", "$134,100"],
];

const TRACE_JSON = `{
  "requestId": "req_a1b2c3",
  "constraints": {
    "budget_cap": "$0.0005",
    "region": "EU",
    "latency_max": 4000
  },
  "routesEvaluated": 4,
  "selectedRoute": "GPT-4o-mini (Together AI, eu-west)",
  "reason": "Lowest cost within latency and region constraints",
  "result": {
    "cost": "$0.00010/req",
    "latency": "3,962ms",
    "fallback": "Mistral-Large (eu-central)"
  }
}`;

export default function AgentryPage() {
  return (
    <>
      {/* HERO */}
      <PageHero
        eyebrow="CloudVerse Agentry"
        accent="purple"
        title="The control plane for enterprise AI."
        subtitle="Route, govern, and meter every AI request across your models, clouds, GPUs, and private endpoints. The cost decision gets made before the request goes out, not in a spreadsheet after the bill lands."
        actions={
          <>
            <Link href={DEMO_URL} className="cv-btn-primary"><span>Book a Demo</span><ArrowRight weight="Linear" size={16} /></Link>
            <Link href="/integrations" className="cv-btn-ghost">Explore the platform</Link>
          </>
        }
      >
      </PageHero>

      {/* HERO MOCKUP */}
      <PlatformHeroMockup tabs={AGENTRY_TABS} docsHref={DOCS.aiEconomics} />

      {/* STATS */}
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

      {/* PROBLEM */}
      <section className="cv-section">
        <div className="max-w-cv mx-auto px-5 sm:px-6 lg:px-8">
          <SectionHeading title="AI compute is becoming too expensive to hardcode." className="mb-12">
            Most teams pick a model once, wire it into the app, and move on. Six months later a cheaper model handles 70% of those requests just as well, and nobody notices.
            <span className="mt-4 block">
              A hardcoded choice doesn&apos;t update when prices drop. It doesn&apos;t reroute when a provider slows down. That gap is where the budget quietly goes.
            </span>
          </SectionHeading>

          <div className="grid gap-5 md:grid-cols-2 mt-12 items-stretch">
            {/* Before - legacy / static */}
            <div className="cv-visual-well relative overflow-hidden rounded-2xl border border-cv-line/50 bg-cv-card dark:bg-black">
              {/* Faint static node pattern */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                  backgroundImage: "radial-gradient(hsl(var(--cv-ink) / 0.05) 1px, transparent 1px)",
                  backgroundSize: "18px 18px",
                }}
              />
              {/* Header */}
              <div className="relative flex items-center gap-2.5 border-b border-cv-line/50 px-5 py-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cv-ink/[0.06] text-cv-muted dark:bg-white/[0.06]">
                  <TrashBin2 weight="Linear" size={18} />
                </span>
                <div>
                  <div className="text-[15px] font-semibold text-cv-ink">Before Agentry</div>
                  <div className="text-xs text-cv-muted">Hardcoded, static</div>
                </div>
              </div>
              {/* Rows */}
              <ul className="relative divide-y divide-cv-line/40">
                {HARDCODED_VS.map((r) => (
                  <li key={r.k} className="flex items-start gap-3 px-5 py-3.5">
                    <span className="w-16 shrink-0 pt-0.5 text-[11px] font-semibold uppercase tracking-wider text-cv-muted/70">
                      {r.k}
                    </span>
                    <span className="flex flex-1 items-start gap-2 text-[15px] text-cv-ink/55">
                      <CloseCircle weight="Linear" size={15} className="mt-0.5 shrink-0 text-cv-muted/60" />
                      <span>{r.before}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* After - dynamic / active */}
            <div className="cv-visual-well relative overflow-hidden rounded-2xl border border-[#2278E0]/25 bg-cv-card dark:bg-black shadow-[0_0_50px_-24px_rgba(34,120,224,0.5)]">
              {/* Dynamic blue grid pattern */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(34,120,224,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(34,120,224,0.13) 1px, transparent 1px)",
                  backgroundSize: "26px 26px",
                  maskImage: "radial-gradient(ellipse 85% 80% at 75% 0%, #000 10%, transparent 75%)",
                  WebkitMaskImage: "radial-gradient(ellipse 85% 80% at 75% 0%, #000 10%, transparent 75%)",
                }}
              />
              {/* Blue blend glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 right-0 h-48 w-72 rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(34,120,224,0.28), transparent 70%)" }}
              />
              {/* Header */}
              <div className="relative flex items-center gap-2.5 border-b border-[#2278E0]/20 px-5 py-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2278E0]/15 text-[#1664C0] dark:text-[#7CB8F8]">
                  <Bolt weight="Bold" size={18} />
                </span>
                <div>
                  <div className="text-[15px] font-semibold text-cv-ink">After Agentry</div>
                  <div className="text-xs text-[#1664C0] dark:text-[#7CB8F8]">Dynamic, per request</div>
                </div>
              </div>
              {/* Rows */}
              <ul className="relative divide-y divide-cv-line/40">
                {HARDCODED_VS.map((r) => (
                  <li key={r.k} className="flex items-start gap-3 px-5 py-3.5">
                    <span className="w-16 shrink-0 pt-0.5 text-[11px] font-semibold uppercase tracking-wider text-cv-muted">
                      {r.k}
                    </span>
                    <span className="flex flex-1 items-start gap-2 text-[15px] text-cv-ink/90">
                      <CheckCircle weight="Bold" size={15} className="mt-0.5 shrink-0 text-[#1664C0] dark:text-[#7CB8F8]" />
                      <span>{r.after}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT AGENTRY DOES */}
      <section className="cv-section relative overflow-hidden bg-cv-surface">
        {/* Top-center brand radial gradient */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[28rem]"
          style={{ background: "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(34,120,224,0.16), transparent 70%)" }}
        />
        <div className="max-w-cv mx-auto px-5 sm:px-6 lg:px-8 relative">
          <SectionHeading title="How Agentry controls every AI request." className="mb-12" docsHref={DOCS.aiEconomics}>
            Agentry sits between your application and every AI provider you use. On each request it scores the available routes against the rules your team set, then returns the best one with a fallback and a full decision log.
          </SectionHeading>
          <p className="text-cv-muted italic mb-10 max-w-3xl text-left">A gateway runs the rule you wrote. Agentry works out whether that rule is still right.</p>
          <AgentrySteps />
        </div>
      </section>

      {/* ROI */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="max-w-cv mx-auto px-5 sm:px-6 lg:px-8">
          <SectionHeading title="The cost of not routing." className="mb-12">
            Every hardcoded endpoint spends money without making a decision. The same work, on the right model, often costs a fraction, at the same or better quality.
          </SectionHeading>
          <AgentryRoiSplit roi={ROI} />
        </div>
      </section>

      {/* ARCHITECTURE — IN THE CALL PATH, DEPLOYED IN YOUR ENVIRONMENT */}
      <AgentryDeployment />

      {/* GOVERNANCE */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="max-w-cv mx-auto px-5 sm:px-6 lg:px-8">
          <SectionHeading title="Built for enterprise AI governance." className="mb-12" docsHref={DOCS.governance}>
            Every routing decision Agentry makes is recorded, auditable, and explainable. Governance is on by default, not bolted on.
          </SectionHeading>
          <GovernanceBento />
        </div>
      </section>

      {/* NO BLACK BOXES */}
      <NoBlackBoxes traceJson={TRACE_JSON} />

      {/* VENDOR SOVEREIGNTY — own your prompts, routing, and ledger */}
      <VendorSovereignty />

      {/* FOUR PROBLEMS — carousel */}
      <AgentryProblemsShowcase />

      {/* MID-PAGE CTA — capture the convinced evaluator */}
      <InlineCta
        label="Start a 3-week private pilot"
        href={DEMO_URL}
        sub="Most teams find at least one ungoverned agent in the first onboarding call."
        testid="section-inline-cta-pilot"
      />

      {/* INTEGRATIONS */}
      <section className="cv-section">
        <div className="cv-container">
          {/* Heading — two-column */}
          <SectionHeading title="Connect once. Route everywhere." className="mb-12" docsHref={DOCS.integrations} docsLabel="Read the integration docs">
            Add your providers once. Agentry handles routing, fallback, and cost tracking across all of them. No code changes when you add a new provider.
          </SectionHeading>
          <h3 className="cv-label mt-8 text-[#1664C0] dark:text-[#7CB8F8]">Supported model providers</h3>

          {/* Provider logos - two rows of app-icon tiles */}
          <div className="mt-8">
            <AgentryProvidersMarquee />
          </div>

          {/* Full catalog link */}
          <div className="mt-10 flex justify-center">
            <Link
              href="/integrations"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-cv-blue dark:text-cv-blue-light hover:text-cv-blue-bright hover:underline underline-offset-4 transition-colors"
              data-testid="link-integrations"
            >
              View all integrations <ArrowRight weight="Linear" size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS / PROOF */}
      <TestimonialsCarousel />

      {/* CROSS-LINK TO TECHNOLOGY SPEND */}
      <TechSpendCrossLink />

      {/* FAQ */}
      <section className="cv-section bg-cv-surface overflow-hidden">
        <div className="cv-container">
          <div className="text-center">
            <Eyebrow accent="purple">FAQ</Eyebrow>
          </div>
          <FaqBlock
            items={AGENTRY_FAQS}
            accent="#1664C0"
            title="Frequently Asked Questions"
            subtitle="Common questions we get asked the most"
          />
        </div>
      </section>

      {/* FINAL CTA */}
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Platform", href: "/platform/agentry" }, { name: "Agentry", href: "/platform/agentry" }]} />
    </>
  );
}
