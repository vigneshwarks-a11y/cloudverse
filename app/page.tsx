import Link from "next/link";
import { ArrowRight, CheckCircle } from "@solar-icons/react";
import type { Metadata } from "next";
import { CustomerLogos } from "@/components/CustomerLogos";
import { ProductVideo } from "@/components/home/ProductVideo";
import { PlatformSurfaces } from "@/components/home/PlatformSurfaces";
import { Testimonials } from "@/components/home/Testimonials";
import { CountUpStat } from "@/components/CountUpStat";
import { FaqBlock } from "@/components/FaqBlock";
import { AixGovernance } from "@/components/home/AixGovernance";
import { AixOrchestration } from "@/components/home/AixOrchestration";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { DEMO_URL } from "@/lib/links";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { GuidesResources } from "@/components/home/GuidesResources";

export const metadata: Metadata = {
  title: "CloudVerse — The Control Plane for Enterprise AI",
  description:
    "Put every AI model, agent, and dollar on one record. Route, govern, and meter your AI, and prove the ROI. Built on the FinOps platform enterprises already trust.",
  keywords: ["cloud cost management", "AI cost optimization", "FinOps", "compute economics", "enterprise AI governance", "cloud spend", "LLM cost"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "CloudVerse — The Control Plane for Enterprise AI",
    description: "Put every AI model, agent, and dollar on one record. Route, govern, and meter your AI, and prove the ROI.",
    url: "/",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "CloudVerse — Compute Economics Platform" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CloudVerse — The Control Plane for Enterprise AI",
    description: "Route, govern, and meter your AI. Prove the ROI. Built on the FinOps platform enterprises trust.",
  },
};

const STATS = [
  { v: "40–90%", label: "less AI spend on production workloads" },
  { v: "96.8%", label: "cheaper inference than a hardcoded setup (benchmarked)" },
  { v: "$738,983", label: "recovered by a single customer" },
  { v: "10–100x", label: "cost gap when the wrong model runs the job" },
];

const EXECUTION_STAGES = [
  {
    label: "Before it runs",
    body: "The owner, the budget, the allowed providers, the residency rule, and the quality floor are set before a single token leaves.",
    accent: "#6954D4",
  },
  {
    label: "While it runs",
    body: "Every route is scored live on cost, latency, quality, and compliance. The best fit wins, a fallback waits, and the budget holds in real time.",
    accent: "#007CFF",
  },
  {
    label: "After it runs",
    body: "Cost lands against the request, the feature, and the tenant. The run goes on the ledger with its outcome and an audit trail.",
    accent: "#0E9E7A",
  },
];

const AIX_CAPABILITIES = [
  {
    title: "Routing",
    body: "Every workload goes to the model that fits its cost, latency, and quality needs. Automatically. No code change when prices move.",
  },
  {
    title: "Visibility",
    body: "One view of all of it: models, tokens, teams, projects, agents, subscriptions, APIs.",
  },
  {
    title: "Optimization",
    body: "Find the oversized model, the wasteful prompt, the subscription you're paying for twice. See the saving before you commit.",
  },
  {
    title: "Governance & evals",
    body: "Policy, access control, residency, vendor oversight, and quality checks. On by default.",
  },
  {
    title: "Productivity",
    body: "Measure what AI changed about engineering output, in hours and in dollars.",
  },
];

const LIFECYCLE_STEPS = [
  { n: "01", title: "Connect", body: "Plug in your cloud, AI, and data accounts. Read-only by default. Most teams are live in under 30 minutes." },
  { n: "02", title: "Govern", body: "Set owners, budgets, policies, and allowed providers. Rules apply before a request runs, not after the bill lands." },
  { n: "03", title: "Route & Measure", body: "AIX scores every request live and routes it. Cost lands against the request, the feature, and the tenant automatically." },
  { n: "04", title: "Optimize", body: "Surface the savings, automate the ones you approve, and track what changed. No spreadsheet reconstruction." },
];

const HOME_FAQS = [
  {
    q: "What is an AI control plane?",
    a: "An AI control plane is the system that governs, routes, and meters every AI request across your models and providers. It sets policy and budget before a request runs, scores routes while it runs, and records cost and outcome after.",
  },
  {
    q: "How is this different from an AI gateway?",
    a: "A gateway runs the routing rule you wrote. AIX works out what the rule should be, scoring every route live on cost, latency, quality, and compliance, and records the cost and outcome of each one.",
  },
  {
    q: "How is it different from LLM observability?",
    a: "Observability tells you what a request cost after it ran. AIX settles that before it does, and enforces budget and policy in real time.",
  },
  {
    q: "Does cloudverse only do AI, or cloud cost too?",
    a: "Both. AIX runs the AI. FinOps, DevX, and DataX run cloud, engineering, and data on the same platform.",
  },
  {
    q: "How fast is this live?",
    a: "First account connected in under 30 minutes. Most teams find something they didn't expect the same day, inside a no-fee, two-to-four-week proof of value.",
  },
];

const INTEGRATIONS_LOGOS = [
  { name: "AWS", src: "/legacy/integration/awstop.svg" },
  { name: "Azure", src: "/legacy/integration/Azuretop.svg" },
  { name: "Google Cloud", src: "/legacy/integration/googletop.svg" },
  { name: "Snowflake", src: "/legacy/integration/snowflake.svg" },
  { name: "Datadog", src: "/legacy/integration/datadog.svg" },
  { name: "Kubernetes", src: "/legacy/integration/kuber.svg" },
  { name: "Oracle", src: "/legacy/integration/oracle.svg" },
  { name: "Alibaba", src: "/legacy/integration/alibabatop.svg" },
  { name: "Tencent", src: "/legacy/integration/tencenttop.svg" },
  { name: "Spark", src: "/legacy/integration/sparktop.svg" },
  { name: "vCenter", src: "/legacy/integration/vcenter.svg" },
  { name: "DigitalOcean", src: "/legacy/integration/oceantop.svg" },
];

export default function HomePage() {
  return (
    <>
      {/* HERO + VIDEO wrapper shares the same gradient background */}
      <div className="cv-hero-bg">
        {/* HERO */}
        <section className="pt-[120px] sm:pt-[160px] pb-6 lg:pt-[240px] lg:pb-8 relative">
          <div className="cv-container relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-20">
              {/* Left: eyebrow + headline + CTAs */}
              <div className="flex-1 min-w-0 lg:max-w-xl xl:max-w-2xl">
                <p className="cv-label mb-5">The AI-Native FinOps Platform</p>
                <h1 className="cv-h1 text-cv-ink max-w-xl">
                  Every Dollar of Cloud, Data, and AI Spend. Owned.
                </h1>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={DEMO_URL} className="cv-btn-primary" data-testid="link-hero-demo">
                    Book a Demo
                  </Link>
                  <Link href="/contact" className="cv-btn-secondary" data-testid="link-hero-audit">
                    Request a free AI cost audit
                  </Link>
                </div>
              </div>

              {/* Right: subhead + utility links */}
              <div className="mt-10 lg:mt-0 lg:max-w-xs xl:max-w-sm shrink-0">
                <p className="cv-body text-cv-ink/70">
                  Most teams can see their cloud bill. Few can explain it, and fewer can act on it fast enough to matter. CloudVerse ties every dollar to the decision that caused it, across cloud, data, AI, and engineering.
                </p>
                <div className="mt-5 flex flex-col gap-2">
                  <Link href="/platform/aix" className="text-sm text-cv-blue dark:text-cv-blue-light hover:text-cv-blue-bright hover:underline underline-offset-2 transition-colors flex items-center gap-1" data-testid="link-hero-platform">
                    See the platform <ArrowRight weight="Linear" size={13} />
                  </Link>
                  <Link href="/connect" className="text-sm text-cv-blue dark:text-cv-blue-light hover:text-cv-blue-bright hover:underline underline-offset-2 transition-colors flex items-center gap-1" data-testid="link-hero-walkthrough">
                    Walkthrough on your own data, in 30 minutes <ArrowRight weight="Linear" size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCT VIDEO */}
        <ProductVideo />

        {/* STATS CARDS */}
        <section className="pt-6 pb-10 lg:pt-8 lg:pb-12">
        <div className="cv-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {[
              { v: "$739K+", label: "Annualized cloud savings at one customer" },
              { v: "40–90%", label: "AI cost cut across production workloads" },
              { v: "96.8%", label: "Lower inference cost than a hardcoded model setup" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center justify-center rounded-2xl border border-cv-ink/10 dark:border-white/10 px-8 py-12 text-center bg-white/40 dark:bg-white/5 backdrop-blur-sm"
              >
                <CountUpStat value={s.v} className="font-mono text-5xl lg:text-6xl font-bold text-cv-ink tracking-tight" />
                <p className="mt-4 text-sm font-medium text-cv-muted tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        </section>
      </div>

      {/* CUSTOMER LOGOS */}
      <CustomerLogos />

      {/* AIX GOVERNANCE */}
      <AixGovernance />

      {/* AIX ORCHESTRATION */}
      <AixOrchestration />




      {/* TESTIMONIALS */}
      <TestimonialsCarousel />

      {/* GUIDES & RESOURCES */}
      <GuidesResources />

      {/* INTEGRATIONS */}
      <section className="cv-section bg-cv-surface relative overflow-hidden">
        {/* Subtle dot texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(hsl(var(--cv-ink) / 0.06) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, #000 20%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, #000 20%, transparent 100%)",
          }}
        />
        {/* Blue center glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(22,100,192,0.10), transparent 70%)" }}
        />

        <div className="cv-container relative z-10 flex flex-col items-center text-center">
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1664C0]/15 dark:bg-[#7CB8F8]/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#1664C0] dark:text-[#7CB8F8] mb-4">
            Integrations
          </span>

          {/* Heading */}
          <h2 className="cv-h2 text-cv-ink max-w-2xl">
            Connects to the stack<br className="hidden sm:block" /> your teams already run.
          </h2>

          {/* Cards grid */}
          <div className="mt-12 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {INTEGRATIONS_LOGOS.map((l) => (
              <div
                key={l.name}
                className="group relative flex items-center gap-4 rounded-xl border border-cv-line/40 bg-cv-card dark:bg-black px-5 py-4 text-left transition-colors hover:border-cv-line/60 cursor-default"
                data-testid={`integration-${l.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <span className="pointer-events-none absolute inset-0 rounded-xl bg-cv-ink/[0.06] opacity-0 transition-opacity group-hover:opacity-100" />
                <img
                  src={l.src}
                  alt=""
                  aria-hidden
                  className="relative h-8 w-8 shrink-0 object-contain"
                  loading="lazy"
                />
                <span className="relative text-sm font-medium text-cv-ink/85 truncate">{l.name}</span>
              </div>
            ))}
          </div>

          {/* Trust badge */}
          <div className="mt-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-cv-blue/40 bg-cv-blue/10 text-sm text-cv-ink/70">
            <CheckCircle weight="Linear" size={13} className="text-cv-teal shrink-0" />
            Read-only by default. Automation is opt-in, scoped, and logged.
          </div>

          {/* CTA button */}
          <div className="mt-5">
            <Link
              href="/integrations"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-cv-line text-sm font-medium text-cv-ink hover:bg-cv-ink/[0.06] hover:border-cv-line/80 transition-colors"
              data-testid="link-integrations"
            >
              View all integrations <ArrowRight weight="Linear" size={15} />
            </Link>
          </div>
        </div>
      </section>


      {/* FAQ */}
      <section className="cv-section bg-cv-surface">
        <div className="cv-container">
          <div className="text-center mb-10">
            <h2 className="cv-h2 text-cv-ink">Frequently Asked Questions</h2>
            <p className="mt-3 cv-body text-cv-muted">Common questions we get asked the most</p>
          </div>
          <FaqBlock items={HOME_FAQS} accent="#1664C0" />
        </div>
      </section>

      {/* FINAL CTA */}
      <ClosingCTA />
    </>
  );
}
