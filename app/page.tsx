import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import { CustomerLogos } from "@/components/CustomerLogos";
import { InvoiceEfficiency } from "@/components/home/InvoiceEfficiency";
import { ProductVideo } from "@/components/home/ProductVideo";
import { PlatformSurfaces } from "@/components/home/PlatformSurfaces";
import { Testimonials } from "@/components/home/Testimonials";
import { CountUpStat } from "@/components/CountUpStat";
import { FaqBlock } from "@/components/FaqBlock";
import { DEMO_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "CloudVerse — The Control Plane for Enterprise AI",
  description:
    "Put every AI model, agent, and dollar on one record. Route, govern, and meter your AI, and prove the ROI. Built on the FinOps platform enterprises already trust.",
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
    q: "Does CloudVerse only do AI, or cloud cost too?",
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
      {/* HERO */}
      <section className="cv-hero-bg pt-[120px] pb-32 lg:pt-[160px] lg:pb-48 relative">
        <div className="cv-container relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cv-blue/40 text-cv-blue-light text-xs font-medium uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-cv-blue-light animate-pulse-dot" />
              The Control Plane for Enterprise AI
            </div>
            <h1 className="cv-h1 mt-6 text-cv-ink">
              Run your AI like you run <br className="hidden md:block" />
              <span style={{ color: "#7CB8F8" }}>the business.</span>
            </h1>
            <p className="cv-body-lg mt-6 text-cv-ink/75 max-w-3xl">
              Most companies can&apos;t tell you what their AI costs, who&apos;s running it, or whether it&apos;s any good. CloudVerse can. AIX puts every model and agent on one record: what ran, who owned it, what it cost, what it came back with. It runs on the same platform we already use for cloud, data, and engineering spend at companies like Berkshire Hathaway.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={DEMO_URL} className="cv-btn-primary" data-testid="link-hero-demo">
                Book a Demo <ArrowRight size={16} />
              </Link>
              <Link href="/platform/aix" className="cv-btn-ghost" data-testid="link-hero-explore">
                See how AIX works
              </Link>
            </div>
            <p className="mt-4 text-sm text-cv-muted">
              Connect your first account in under 30 minutes. No-fee proof of value in two to four weeks.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCT VIDEO */}
      <ProductVideo />

      {/* CUSTOMER LOGOS */}
      <section className="border-y border-cv-line py-10">
        <div className="cv-container">
          <p className="text-xs uppercase tracking-widest text-cv-muted text-center mb-8">
            The teams trusting us with their cloud and AI spend
          </p>
          <CustomerLogos />
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-b border-cv-line bg-cv-surface2/40">
        <div className="cv-container py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {STATS.map((s) => (
              <div key={s.label}>
                <CountUpStat value={s.v} className="text-2xl lg:text-3xl font-display font-semibold text-cv-ink" />
                <div className="text-sm text-cv-muted mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="cv-section">
        <div className="cv-container">
          <p className="text-xl lg:text-2xl leading-relaxed text-cv-ink/85 font-light max-w-4xl">
            AI got into everything before anyone set up the controls. Research agents, copilots, a dozen model subscriptions, GPU jobs nobody tracks. The bill shows up on time every month. The answer to what it was, who ran it, and whether it earned its money never does.
          </p>
          <p className="mt-6 text-xl lg:text-2xl leading-relaxed text-cv-ink font-medium">
            CloudVerse is where that answer lives.
          </p>
        </div>
      </section>

      {/* BEFORE / DURING / AFTER */}
      <section className="cv-section bg-[#0B0B0F]">
        <div className="cv-container">
          <div className="max-w-3xl mb-4">
            <div className="cv-label mb-3 text-[#7C9BFF]">How it works</div>
            <h2 className="cv-h2 text-white">One place to decide, run, and account for every AI request.</h2>
          </div>
          <p className="text-cv-ink/70 max-w-3xl mb-12 leading-relaxed">
            An AI control plane is the system that governs, routes, and meters every AI request across your models and providers. CloudVerse is the only one that works in all three windows: before a request runs, while it runs, and after.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-cv-line/20 rounded-2xl overflow-hidden">
            {EXECUTION_STAGES.map((s, i) => (
              <div
                key={s.label}
                className={`p-8 ${i < 2 ? "md:border-r border-cv-line/20" : ""} ${i > 0 ? "border-t md:border-t-0 border-cv-line/20" : ""}`}
              >
                <div
                  className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest mb-5"
                  style={{ background: `${s.accent}22`, color: s.accent }}
                >
                  {s.label}
                </div>
                <p className="text-cv-ink/80 leading-relaxed text-[15px]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AIX — WHAT IT DOES */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="max-w-3xl mb-4">
            <div className="cv-label mb-3" style={{ color: "#A99CE8" }}>AIX</div>
            <h2 className="cv-h2 text-cv-ink">AIX is the operating system for your AI.</h2>
          </div>
          <p className="text-cv-ink/70 max-w-3xl mb-12 leading-relaxed">
            An HRMS holds the record for every employee. AIX holds it for every model and agent. Onboard it, route it, budget it, review it, audit it.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {AIX_CAPABILITIES.map((c, i) => (
              <div
                key={c.title}
                className={`rounded-2xl border p-6 ${
                  i === 0
                    ? "border-[#6954D4]/40 bg-[#6954D4]/6 md:col-span-2 lg:col-span-1"
                    : "border-cv-line bg-cv-surface2"
                }`}
              >
                <h3 className="font-display font-semibold text-cv-ink text-lg">{c.title}</h3>
                <p className="text-cv-ink/70 text-[15px] leading-relaxed mt-3">{c.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/platform/aix" className="cv-btn-ghost" data-testid="link-aix-deeper">
              Go deeper on AIX <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* PLATFORM SURFACES */}
      <PlatformSurfaces />

      {/* BHHS CASE STUDY */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="relative overflow-hidden rounded-3xl border border-[#1664C0]/30 bg-[#0A0C14] p-8 lg:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
                maskImage: "radial-gradient(ellipse at 0% 0%, #000 0%, transparent 70%)",
                WebkitMaskImage: "radial-gradient(ellipse at 0% 0%, #000 0%, transparent 70%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -top-32 right-0 h-72 w-[36rem] rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(22,100,192,0.22), transparent 70%)" }}
            />

            <div className="relative">
              <div className="cv-label mb-4 text-[#7C9BFF]">Case study — Berkshire Hathaway HomeServices</div>
              <h2 className="cv-h2 max-w-3xl text-white">
                How Berkshire Hathaway HomeServices recovered $738,983
              </h2>

              <div className="mt-12 mb-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#1664C0]/25 bg-[#1664C0]/15 md:grid-cols-3">
                {[
                  { v: "$101,736", l: "annual recovery" },
                  { v: "$61,582", l: "single month recovery" },
                  { v: "$738,984", l: "total recovered" },
                ].map((s) => (
                  <div key={s.l} className="bg-[#0B0E18] p-8">
                    <div className="font-display text-4xl font-semibold text-white lg:text-5xl">{s.v}</div>
                    <div className="mt-3 text-sm uppercase tracking-widest text-cv-muted">{s.l}</div>
                  </div>
                ))}
              </div>

              <p className="max-w-3xl leading-relaxed text-cv-ink/80">
                A growing AWS environment, fragmented tagging, no team-level attribution. CloudVerse tied spend to teams, surfaced the anomalies that mattered most, and gave finance a model that held up under review.
              </p>
              <p className="mt-6 max-w-3xl border-l-2 border-[#1664C0] pl-5 text-lg italic text-white/95">
                The waste was always there. It just had no address.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* HOW YOU RUN IT */}
      <section className="cv-section bg-[#0B0B0F]">
        <div className="cv-container">
          <div className="max-w-3xl mb-12">
            <div className="cv-label mb-3 text-[#7C9BFF]">How you run it</div>
            <h2 className="cv-h2 text-white">Connect. Govern. Route. Measure.</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
            {LIFECYCLE_STEPS.map((s) => (
              <div
                key={s.n}
                className="relative rounded-2xl border border-[#1664C0]/30 bg-[#0E0E14] p-7"
              >
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#7C9BFF]">{s.n}</span>
                <h3 className="mt-3 font-display text-xl font-bold text-white">{s.title}</h3>
                <p className="text-cv-ink/70 leading-relaxed mt-3 text-[14px]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section className="cv-section relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(22,100,192,0.12), transparent 70%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundPosition: "0 0, 22px 22px",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse 75% 65% at 50% 45%, #000 35%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 50% 45%, #000 35%, transparent 100%)",
          }}
        />

        <div className="cv-container relative z-10 text-center">
          <div className="cv-label mb-3">Integrations</div>
          <h2 className="cv-h2 text-cv-ink max-w-3xl mx-auto">Connects to the stack your teams already run.</h2>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {INTEGRATIONS_LOGOS.map((l) => (
              <div
                key={l.name}
                className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#070710] px-5 py-4 shadow-[inset_0_0_24px_rgba(255,255,255,0.035),0_1px_0_0_rgba(255,255,255,0.02)]"
                data-testid={`integration-${l.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <img src={l.src} alt="" aria-hidden className="h-8 w-8 shrink-0 object-contain opacity-90" loading="lazy" />
                <span className="text-sm font-medium text-cv-ink/90 text-left">{l.name}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cv-line bg-cv-surface2 text-sm text-cv-ink/85">
            <Check size={14} className="text-cv-teal" />
            Read-only by default. Automation is opt-in, scoped, and logged.
          </div>
          <div className="mt-6">
            <Link href="/integrations" className="cv-btn-ghost" data-testid="link-integrations">
              View all integrations <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Efficiency Snapshot */}
      <InvoiceEfficiency compact />

      {/* FAQ */}
      <section className="cv-section">
        <div className="cv-container max-w-3xl">
          <div className="cv-label mb-3">Common questions</div>
          <h2 className="cv-h2 text-cv-ink mb-10">What people ask before the demo.</h2>
          <FaqBlock items={HOME_FAQS} accent="#1664C0" />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cv-section bg-[#0B0B0F]">
        <div className="cv-container">
          <div className="relative overflow-hidden rounded-[2rem] border border-[#1664C0]/20 bg-[#080B14] px-6 py-7 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:px-10 lg:py-10">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(22,100,192,0.14), transparent 60%)" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
                maskImage: "radial-gradient(ellipse at 50% 0%, #000 0%, transparent 70%)",
                WebkitMaskImage: "radial-gradient(ellipse at 50% 0%, #000 0%, transparent 70%)",
              }}
            />

            <div className="relative">
              <div className="relative mx-auto mb-5 h-28 w-28 sm:h-32 sm:w-32">
                <div className="absolute inset-0 rounded-full border border-white/[0.08]" />
                <div className="absolute inset-5 rounded-full border border-white/[0.06]" />
                <div className="absolute inset-10 rounded-full border border-[#1664C0]/15" />
                <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-[#1664C0]/70" />
                <span className="absolute right-2 top-1/3 h-1.5 w-1.5 rounded-full bg-[#7C9BFF]/50" />
                <span className="absolute bottom-3 left-5 h-1.5 w-1.5 rounded-full bg-white/30" />
                <span className="absolute bottom-6 right-6 h-1.5 w-1.5 rounded-full bg-[#1664C0]/40" />
                <span className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white/20" />
                <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-[#1664C0]/30 bg-[#0B0E18]">
                  <img src="/legacy/logo/cloudverse-icon.png" alt="CloudVerse" className="h-8 w-auto" />
                </div>
              </div>

              <h2 className="cv-h2 mx-auto max-w-3xl text-white">
                Connect your first account in under 30 minutes.
              </h2>
              <p className="cv-body-lg mx-auto mt-5 max-w-2xl text-cv-ink/75">
                Most teams find something they didn&apos;t expect the same day. No-fee proof of value, two to four weeks.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Link href={DEMO_URL} className="cv-btn-primary" data-testid="link-final-demo">
                  Book a Demo <ArrowRight size={16} />
                </Link>
                <Link href="/contact" className="cv-btn-ghost" data-testid="link-final-sales">
                  Talk to Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
