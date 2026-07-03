import type { Metadata } from "next";
import type { ComponentType } from "react";
import Link from "next/link";
import { ArrowRight, Bill, Box, Compass, Database, MagicStick2, ShieldCheck, SpeedometerMax, type IconProps } from "@solar-icons/react";

type Icon = ComponentType<IconProps>;
import { CTABand } from "@/components/CTABand";
import { DEMO_URL, PRODUCT_URLS } from "@/lib/links";

export const metadata: Metadata = {
  title: "About CloudVerse | Cloud Economic Intelligence Platform",
  description:
    "Learn about cloudverse's mission to bring real-time unit economics and decision-time cost governance to modern cloud and AI teams.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About CloudVerse",
    description:
      "Learn about cloudverse's mission to bring real-time unit economics and decision-time cost governance to modern cloud and AI teams.",
  },
};

const VALUES: { title: string; desc: string; icon: Icon }[] = [
  {
    title: "Engineering-led FinOps",
    desc: "Cost decisions belong where the code is written, not weeks later in a spreadsheet.",
    icon: Compass,
  },
  {
    title: "Decision-time visibility",
    desc: "Surface the right signal at the right moment. before resources are provisioned, not after.",
    icon: SpeedometerMax,
  },
  {
    title: "Trust by default",
    desc: "Enterprise-grade security, role-based access, and full audit history on every action.",
    icon: ShieldCheck,
  },
  {
    title: "Automation over toil",
    desc: "Turn repeat optimizations into policies so teams stay fast without leaking spend.",
    icon: MagicStick2,
  },
];

const PRODUCTS: { name: string; tagline: string; icon: Icon; href: string }[] = [
  { name: "AIX", tagline: "Catch cloud cost mistakes before they hit production.", icon: MagicStick2, href: PRODUCT_URLS.aix },
  { name: "DevX", tagline: "Cut AI costs without breaking latency or quality.", icon: Box, href: PRODUCT_URLS.devx },
  { name: "DataX", tagline: "Workload-level visibility and control for analytics platforms.", icon: Database, href: PRODUCT_URLS.datax },
  { name: "CloudBillOps", tagline: "Unified billing, allocation, and chargeback across clouds.", icon: Bill, href: PRODUCT_URLS.billops },
];

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="cv-hero-bg pt-[120px] sm:pt-[160px] pb-16 lg:pt-[240px] lg:pb-20 relative">
        <div className="cv-container relative z-10 text-center">
          <span className="cv-label inline-block mb-4">About CloudVerse™</span>
          <h1 className="cv-h1 text-cv-ink max-w-4xl mx-auto">
            Building the Future of Cloud Financial Management
          </h1>
          <p className="cv-body-lg mt-6 text-cv-ink/75 max-w-2xl mx-auto">
            We're the compute economics platform for the AI era. bringing real-time visibility,
            unit economics, and automated control to every dollar your teams spend on cloud and AI
            infrastructure.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="cv-section bg-cv-surface">
        <div className="cv-container">
          <div className="max-w-4xl mx-auto relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-cv-blue/10 to-cv-purple/10 rounded-3xl blur-2xl opacity-50 pointer-events-none" />
            <div className="relative p-8 sm:p-12 rounded-2xl border border-cv-line bg-cv-surface2 dark:bg-[#0D0D0D]">
              <h2 className="cv-h2 text-cv-ink mb-6 text-center">Our Mission</h2>
              <p className="text-lg sm:text-xl text-cv-muted leading-relaxed text-center">
                CloudVerse™ is building the compute economics layer the cloud era was always
                missing —{" "}
                <span className="text-cv-ink font-semibold">
                  &ldquo;Transparent, Predictable, and Profitable&rdquo;
                </span>
                . As AI workloads multiply and cloud spend becomes a defining business variable,
                enterprises need more than dashboards. They need an intelligent platform that
                transforms raw compute costs into strategic financial decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="cv-label inline-block mb-3">Our Story</span>
              <h2 className="cv-h2 text-cv-ink">Why we built CloudVerse™</h2>
            </div>
            <div className="space-y-5 text-cv-ink/80 text-base sm:text-lg leading-relaxed">
              <p>
                Cloud promised simplicity. What enterprises got instead was financial opacity —
                sprawling invoices, disconnected cost centers, and engineering teams blind to the
                economic weight of every deployment decision.
              </p>
              <p>
                AI made it worse. GPU clusters, spot instances, and experimental workloads
                introduced spend that finance can&apos;t model and engineering can&apos;t control.
                One misconfigured job can erase a quarter&apos;s infrastructure budget overnight.
              </p>
              <p>
                CloudVerse™ was built to solve this at the root. giving engineers, finance, and
                leadership a shared, real-time view of compute value, where every infrastructure
                decision ties directly to business outcomes.
              </p>
              <p className="text-cv-ink font-semibold">That&apos;s compute economics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="cv-section bg-cv-surface">
        <div className="cv-container">
          <div className="text-center mb-12">
            <span className="cv-label inline-block mb-3">What we believe</span>
            <h2 className="cv-h2 text-cv-ink mb-4">Principles that guide our platform</h2>
            <p className="text-cv-muted max-w-2xl mx-auto">
              Four ideas shape every product decision we make.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 max-w-4xl mx-auto">
            {VALUES.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-cv-surface2 dark:bg-[#0D0D0D] border border-cv-line dark:border-white/10 hover:border-cv-blue/40 transition-colors"
                  data-testid={`value-card-${idx}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-cv-blue/10 flex items-center justify-center mb-4">
                    <Icon weight="Linear" className="w-5 h-5 text-cv-blue" />
                  </div>
                  <h3 className="text-lg font-semibold text-cv-ink mb-2">{v.title}</h3>
                  <p className="text-cv-muted leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <div className="text-center mb-12">
            <span className="cv-label inline-block mb-3">What we build</span>
            <h2 className="cv-h2 text-cv-ink mb-4">
              One platform, four specialized products
            </h2>
            <p className="text-cv-muted max-w-2xl mx-auto">
              Each module solves a specific layer of the cloud economics problem. together they
              form an end-to-end decision layer.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRODUCTS.map((p, idx) => {
              const Icon = p.icon;
              return (
                <a
                  key={idx}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 rounded-2xl bg-cv-surface dark:bg-[#0D0D0D] border border-cv-line hover:border-cv-blue/40 hover:shadow-lg hover:shadow-cv-blue/10 transition-all"
                  data-testid={`product-summary-${idx}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cv-blue/20 to-cv-purple/20 flex items-center justify-center mb-4">
                    <Icon weight="Linear" className="w-5 h-5 text-cv-blue" />
                  </div>
                  <h3 className="text-lg font-semibold text-cv-ink mb-2 group-hover:text-cv-blue transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-cv-muted text-sm leading-relaxed mb-3">{p.tagline}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-cv-blue group-hover:gap-2 transition-all">
                    Learn more <ArrowRight weight="Linear" size={12} />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="cv-section bg-cv-surface">
        <div className="cv-container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="cv-label inline-block mb-3">Where we&apos;re going</span>
            <h2 className="cv-h2 text-cv-ink mb-6">
              An AI-native economic decision layer for every enterprise
            </h2>
            <p className="text-lg text-cv-muted leading-relaxed mb-8">
              The next decade of compute will be defined by how well teams allocate scarce GPU,
              storage, and network capacity. CloudVerse™ is building the economic decision layer
              that makes those choices automatic, auditable, and aligned with business outcomes —
              across every cloud, every model, and every team.
            </p>
            <Link
              href={DEMO_URL}
              className="cv-btn-primary"
              data-testid="link-book-demo-about"
            >
              Book a demo <ArrowRight weight="Linear" size={16} />
            </Link>
          </div>
        </div>
      </section>

      <CTABand
        heading="Want to work with us?"
        sub="We're hiring practitioners across product, engineering, and customer teams."
      />
    </>
  );
}
