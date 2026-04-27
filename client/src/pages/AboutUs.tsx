import { BaseLayout } from "@/layouts/BaseLayout";
import { useEffect } from "react";
import { applyPageSeo, clearPageSeo } from "@/lib/seo";
import { DEMO_URL } from "@/lib/links";
import {
  Compass,
  Gauge,
  ShieldCheck,
  Sparkles,
  Boxes,
  BarChart3,
  Database,
  Receipt,
  type LucideIcon,
} from "lucide-react";

const values: { title: string; desc: string; icon: LucideIcon }[] = [
  {
    title: "Engineering-led FinOps",
    desc: "Cost decisions belong where the code is written, not weeks later in a spreadsheet.",
    icon: Compass,
  },
  {
    title: "Decision-time visibility",
    desc: "Surface the right signal at the right moment — before resources are provisioned, not after.",
    icon: Gauge,
  },
  {
    title: "Trust by default",
    desc: "Enterprise-grade security, role-based access, and full audit history on every action.",
    icon: ShieldCheck,
  },
  {
    title: "Automation over toil",
    desc: "Turn repeat optimizations into policies so teams stay fast without leaking spend.",
    icon: Sparkles,
  },
];

const products: { name: string; tagline: string; icon: LucideIcon; href: string }[] = [
  { name: "AIx", tagline: "Catch cloud cost mistakes before they hit production.", icon: Sparkles, href: "https://aix.cloudverse.ai" },
  { name: "DevX", tagline: "Cut AI costs without breaking latency or quality.", icon: Boxes, href: "https://devx.cloudverse.ai" },
  { name: "DataX", tagline: "Workload-level visibility and control for analytics platforms.", icon: Database, href: "https://datax.cloudverse.ai" },
  { name: "CloudBillOps", tagline: "Unified billing, allocation, and chargeback across clouds.", icon: Receipt, href: "https://billops.cloudverse.ai" },
];

export default function AboutUs() {
  useEffect(() => {
    applyPageSeo({
      title: "About CloudVerse | Cloud Economic Intelligence Platform",
      description: "cloud economic intelligence, engineering led finops, cloud unit economics",
      keywords: "cloud economic intelligence, engineering led finops, cloud unit economics",
      ogTitle: "About CloudVerse",
      ogDescription:
        "Learn about CloudVerse’s mission to bring real-time unit economics and decision-time cost governance to modern cloud and AI teams.",
      llmSummary:
        "The About page explains CloudVerse’s mission, vision, and approach to cloud economic intelligence. CloudVerse focuses on engineering-led cost governance, workload-level attribution, and unit economics—helping organizations manage cloud, data platform, and AI infrastructure costs with clarity and accountability.",
    });

    return clearPageSeo;
  }, []);

  return (
    <BaseLayout>
      <section className="pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-20">

          <div className="text-center mb-16 lg:mb-20">
            <span className="inline-block text-xs uppercase tracking-widest text-blue-500 font-semibold mb-4">
              About CloudVerse™
            </span>
            <h1 className="cv-h1 mb-6">Building the future of cloud financial management</h1>
            <p className="text-lg sm:text-xl text-cv-muted max-w-2xl mx-auto">
              We're the compute economics platform for the AI era — bringing real-time visibility, unit economics, and automated control to every dollar your teams spend on cloud and AI infrastructure.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-20 lg:mb-28">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl opacity-50" />
              <div className="relative p-8 sm:p-12 rounded-2xl border border-cv-line bg-cv-surface2/30">
                <h2 className="text-2xl sm:text-3xl font-bold text-cv-ink mb-6 text-center">Our Mission</h2>
                <p className="text-lg sm:text-xl text-cv-muted leading-relaxed text-center">
                  CloudVerse™ AI's mission is to make cloud as it was originally promised, <span className="text-cv-ink font-semibold">"Simple and Cost-Effective"</span>. As everything becomes cloud and usage-based, enterprises will need an AI enabled platform orchestrator to govern, manage and optimize their spend across diverse cloud providers & services.
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-20 lg:mb-28">
            <div className="text-center mb-10">
              <span className="inline-block text-xs uppercase tracking-widest text-blue-500 font-semibold mb-3">
                Our Story
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-cv-ink">Why we built CloudVerse™</h2>
            </div>
            <div className="space-y-5 text-cv-muted text-base sm:text-lg leading-relaxed">
              <p>
                Cloud was supposed to be simple. Spin up what you need, pay for what you use, scale with your business. Instead, modern enterprises wake up to runaway invoices, opaque allocations, and engineering teams flying blind on the financial impact of every commit.
              </p>
              <p>
                With AI workloads on top, the gap is widening. GPUs cost more than CPUs, throughput patterns are unpredictable, and a single misconfigured experiment can burn a month of budget overnight.
              </p>
              <p>
                CloudVerse™ exists to close that gap — turning cloud and AI spend into a real economic decision layer that engineers, finance, and leadership can all trust.
              </p>
            </div>
          </div>

          <div className="mb-20 lg:mb-28">
            <div className="text-center mb-12">
              <span className="inline-block text-xs uppercase tracking-widest text-blue-500 font-semibold mb-3">
                What we believe
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-cv-ink mb-4">Principles that guide our platform</h2>
              <p className="text-cv-muted max-w-2xl mx-auto">
                Four ideas shape every product decision we make.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {values.map((v, idx) => {
                const Icon = v.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-cv-surface dark:bg-slate-900/60 border border-cv-line dark:border-white/10 hover:border-blue-500/40 transition-colors"
                    data-testid={`value-card-${idx}`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-cv-ink mb-2">{v.title}</h3>
                    <p className="text-cv-muted leading-relaxed">{v.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mb-20 lg:mb-28">
            <div className="text-center mb-12">
              <span className="inline-block text-xs uppercase tracking-widest text-blue-500 font-semibold mb-3">
                What we build
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-cv-ink mb-4">One platform, four specialized products</h2>
              <p className="text-cv-muted max-w-2xl mx-auto">
                Each module solves a specific layer of the cloud economics problem — together they form an end-to-end decision layer.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {products.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <a
                    key={idx}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-6 rounded-2xl bg-cv-surface dark:bg-slate-900/60 border border-cv-line dark:border-white/10 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition-all"
                    data-testid={`product-summary-${idx}`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-cv-ink mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{p.name}</h3>
                    <p className="text-cv-muted text-sm leading-relaxed mb-3">{p.tagline}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all">
                      Learn more →
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-xs uppercase tracking-widest text-blue-500 font-semibold mb-3">
              Where we're going
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-cv-ink mb-6">An AI-native economic layer for every enterprise</h2>
            <p className="text-lg text-cv-muted leading-relaxed mb-8">
              The next decade of compute will be defined by how well teams allocate scarce GPU, storage, and network capacity. CloudVerse™ is building the orchestration layer that makes those decisions automatic, auditable, and aligned with the business — across every cloud, every model, and every team.
            </p>
            <a
              href={DEMO_URL}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors text-sm"
              data-testid="link-book-demo-about"
            >
              Book a demo →
            </a>
          </div>

        </div>
      </section>
    </BaseLayout>
  );
}
