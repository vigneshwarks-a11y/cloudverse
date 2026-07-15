import Link from "next/link";
import { ArrowRight, CheckCircle } from "@solar-icons/react";
import { IconChartPie2, IconInvestment, IconArrowRefresh } from "nucleo-isometric";
import { IntegrationsMarquee } from "@/components/home/IntegrationsMarquee";
import { FinopsVarianceMock } from "@/components/product/FinopsVarianceMock";
import { FaqBlock } from "@/components/FaqBlock";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import type { Metadata } from "next";
import { DEMO_URL } from "@/lib/links";
import { WhoUsesItCards } from "@/components/product/WhoUsesItCards";
import { FinOpsHero } from "@/components/product/FinOpsHero";
import { FeatureShowcase } from "@/components/home/FeatureShowcase";
import FinopsSurfaces from "@/components/product/FinopsSurfaces";

export const metadata: Metadata = {
  title: "FinOps Platform: Multi-Cloud Cost Intelligence for Every Team | CloudVerse",
  description:
    "See every dollar by team, product, and provider. One model that reconciles to finance and explains itself to engineering.",
  keywords: ["FinOps platform", "cloud cost management", "multi-cloud cost visibility", "cloud allocation", "chargeback", "cloud unit economics"],
  alternates: { canonical: "/platform/finops" },
  openGraph: {
    title: "FinOps Platform: Multi-Cloud Cost Intelligence for Every Team",
    description: "See every dollar by team, product, and provider. One model that reconciles to finance and explains itself to engineering.",
    url: "/platform/finops",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "CloudVerse FinOps Platform: Multi-Cloud Cost Intelligence" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FinOps Platform: Multi-Cloud Cost Intelligence",
    description: "See every dollar by team, product, and provider. Reconciles to finance. Explains itself to engineering.",
  },
};

const FAQ = [
  ["How is this different from a cloud cost explorer?", "An explorer shows spend. CloudVerse traces variance to a driver and owner, ranks the fix, and can carry it out. It changes what happens after the dashboard."],
  ["Does it work across all our clouds?", "Yes. One allocation model across AWS, Azure, and GCP, with Oracle, Alibaba, Huawei, and Tencent supported."],
  ["Will it fit our existing allocation logic?", "Yes. Virtual tags let you define cost dimensions that match how the business is structured, not how billing is structured."],
  ["How fast do we see value?", "First account connected in under 30 minutes. Most teams find recoverable spend the same day."],
  ["Does automation touch our accounts?", "Read-only by default. Any action is opt-in, scoped, and logged."],
];

export default function FinOpsPage() {
  return (
    <>
      <FinOpsHero />

      {/* DOMAINS OVERVIEW */}
      <FeatureShowcase />

      {/* CONNECTS TO STACK — same integration section as the home page / DataX */}
      <section className="cv-section bg-cv-surface2 dark:bg-black relative overflow-hidden">
        {/* Ambient blue glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[32rem]"
          style={{ background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(22,100,192,0.16), transparent 70%)" }}
        />

        <div className="cv-container relative z-10">
          {/* Heading */}
          <div className="text-center">
            <h2 className="cv-h2 text-cv-ink mx-auto max-w-2xl">
              Connects to the stack you already run.
            </h2>
            <p className="mt-5 cv-body text-cv-ink/60 max-w-lg mx-auto">
              AWS, Azure, and Google Cloud for infrastructure. AIX for AI spend, DataX for warehouses, and DevX for the engineering workflow. One view across all of it.
            </p>
          </div>

          {/* Logos marquee - two rows of app-icon tiles */}
          <IntegrationsMarquee />

          {/* Trust line + CTA */}
          <div className="mt-16 flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-2 text-xs text-cv-muted">
              <CheckCircle weight="Linear" size={13} className="text-cv-teal shrink-0" />
              Read-only by default. Automation is opt-in, scoped, and logged.
            </div>
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

      <section className="cv-section">
        <div className="max-w-cv mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
            <h2 className="cv-h2 text-cv-ink">Most FinOps tools show dashboards. This one changes what happens next.</h2>
            <div>
              <p className="cv-body-lg text-cv-ink/80">
                A dashboard tells you spend went up. It doesn&apos;t tell you which team, which change, or what to do first.
              </p>
              <p className="cv-body-lg text-cv-ink/80 mt-4">
                CloudVerse traces the variance to a driver and an owner, ranks the fix by impact, and carries it out once you approve. Cloud spend is visible everywhere. Here it&apos;s finally clear.
              </p>
            </div>
          </div>
          <FinopsVarianceMock />
        </div>
      </section>

      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <FinopsSurfaces />
        </div>
      </section>

      {/* LIFECYCLE — CloudZero-style split: heading left, isometric icon rows right */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            {/* left: eyebrow + heading + lead */}
            <div className="lg:pt-2">
              <p className="cv-label mb-4">The FinOps lifecycle</p>
              <h2 className="cv-h2 text-cv-ink">Inform. Optimise. Operate.</h2>
              <p className="cv-body-lg mt-5 max-w-md text-cv-ink/70">
                One model that carries you from visibility to action: allocation you can trust, savings ranked by impact, and approved fixes that run inside policy, with an audit trail.
              </p>
            </div>

            {/* right: isometric icon rows */}
            <div className="divide-y divide-cv-line/60 overflow-hidden rounded-2xl border border-cv-line/60 bg-cv-surface dark:divide-white/10 dark:border-white/10 dark:bg-[#0D0D0D]">
              {[
                {
                  Icon: IconChartPie2,
                  title: "Inform",
                  body: "Allocation and attribution first. Every dollar mapped to an owner and a driver.",
                },
                {
                  Icon: IconInvestment,
                  title: "Optimise",
                  body: "Rightsizing, idle cleanup, commitment and spot planning, ranked by impact.",
                },
                {
                  Icon: IconArrowRefresh,
                  title: "Operate",
                  body: "Approved fixes automated on a schedule, inside policy, with an audit trail.",
                },
              ].map(({ Icon, title, body }) => (
                <div key={title} className="flex items-start gap-5 p-6 md:p-7">
                  <Icon size={46} aria-hidden className="shrink-0 text-[#1664C0] dark:text-[#7CB8F8]" />
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-cv-ink">{title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-cv-muted">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="cv-section">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-10">Built for the teams accountable for the bill</h2>
          <WhoUsesItCards
            items={[
              ["FinOps Manager", "Allocation and chargeback that hold up, and a queue of ranked actions instead of a spreadsheet."],
              ["Cloud Engineer", "The driver behind a spike, with the fix and the risk attached."],
              ["CFO / VP Finance", "A forecast you can defend and a number that reconciles to the ledger."],
            ]}
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="text-center mb-10">
            <h2 className="cv-h2 text-cv-ink">Frequently Asked Questions</h2>
          </div>
          <FaqBlock items={FAQ.map(([q, a]) => ({ q, a }))} accent="#1664C0" />
        </div>
      </section>

      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Platform", href: "/platform/finops" }, { name: "FinOps", href: "/platform/finops" }]} />
    </>
  );
}
