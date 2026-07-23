import type { Metadata } from "next";
import type { ComponentType } from "react";
import Link from "next/link";
import { ArrowRight, Bill, Box, Compass, Database, MagicStick2, ShieldCheck, SpeedometerMax } from "@/lib/solar-icons";
import type { IconProps } from "@solar-icons/react";

type Icon = ComponentType<IconProps>;
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Eyebrow } from "@/components/Eyebrow";
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
  { name: "Agentry", tagline: "Catch cloud cost mistakes before they hit production.", icon: MagicStick2, href: PRODUCT_URLS.agentry },
  { name: "Torb", tagline: "Cut AI costs without breaking latency or quality.", icon: Box, href: PRODUCT_URLS.torb },
  { name: "DataX", tagline: "Workload-level visibility and control for analytics platforms.", icon: Database, href: PRODUCT_URLS.datax },
  { name: "CloudBillOps", tagline: "Unified billing, allocation, and chargeback across clouds.", icon: Bill, href: PRODUCT_URLS.billops },
];

export default function Page() {
  return (
    <>
      {/* Hero */}
      <PageHero
        centered
        eyebrow="About CloudVerse™"
        accent="blue"
        title={
          <>
            Building the future of
            <br />
            <span className="text-cv-blue dark:text-cv-blue-light">cloud financial management.</span>
          </>
        }
        subtitle="We're the compute economics platform for the AI era, bringing real-time visibility, unit economics, and automated control to every dollar your teams spend on cloud and AI infrastructure."
        titleClassName="text-[length:clamp(34px,4.8vw,72px)]"
        subtitleClassName="text-[length:clamp(17px,1.4vw,20px)]"
      />

      {/* Mission */}
      <section className="relative overflow-hidden bg-cv-surface cv-section">
        {/* Continue the hero's blue down over the top of this section and fade
            it to transparent, so the hero and this section read as one
            continuous blue band settling into the page base (same treatment
            as the home hero → CustomerLogos). */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[linear-gradient(180deg,rgba(20,71,230,0.24)_0%,rgba(20,71,230,0.08)_42%,transparent_78%)] dark:bg-[linear-gradient(180deg,rgba(20,71,230,0.5)_0%,rgba(20,71,230,0.16)_42%,transparent_78%)]"
        />
        <div className="cv-container relative z-10">
          <SectionHeading lead eyebrow="Our Mission" title="Transparent, predictable, and profitable.">
            CloudVerse™ is building the compute economics layer the cloud era was always
            missing. As AI workloads multiply and cloud spend becomes a defining business
            variable, enterprises need more than dashboards. They need an intelligent platform
            that transforms raw compute costs into strategic financial decisions.
          </SectionHeading>
        </div>
      </section>

      {/* Story */}
      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <div className="max-w-2xl text-left">
            <Eyebrow>Our Story</Eyebrow>
            <h2 className="cv-h2 text-cv-ink">Why we built CloudVerse™</h2>
          </div>
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="rounded-2xl border border-cv-line/40 bg-cv-card dark:bg-black p-6">
              <p className="text-cv-ink/75 leading-relaxed">
                Cloud promised simplicity. What enterprises got instead was financial opacity:
                sprawling invoices, disconnected cost centers, and engineering teams blind to the
                economic weight of every deployment decision.
              </p>
            </div>
            <div className="rounded-2xl border border-cv-line/40 bg-cv-card dark:bg-black p-6">
              <p className="text-cv-ink/75 leading-relaxed">
                AI made it worse. GPU clusters, spot instances, and experimental workloads
                introduced spend that finance can&apos;t model and engineering can&apos;t control.
                One misconfigured job can erase a quarter&apos;s infrastructure budget overnight.
              </p>
            </div>
            <div className="rounded-2xl border border-cv-line/40 bg-cv-card dark:bg-black p-6">
              <p className="text-cv-ink/75 leading-relaxed">
                CloudVerse™ was built to solve this at the root, giving engineers, finance, and
                leadership a shared, real-time view of compute value, where every infrastructure
                decision ties directly to business outcomes.
              </p>
              <p className="text-cv-ink font-semibold mt-3">That&apos;s compute economics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="cv-section bg-cv-surface">
        <div className="cv-container">
          <SectionHeading eyebrow="What we believe" title="Principles that guide our platform">
            Four ideas shape every product decision we make.
          </SectionHeading>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VALUES.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-cv-line/40 bg-cv-card dark:bg-black p-6 hover:border-cv-line/70 transition-colors"
                  data-testid={`value-card-${idx}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-cv-blue/10 flex items-center justify-center mb-4">
                    <Icon weight="Linear" className="w-5 h-5 text-cv-blue" />
                  </div>
                  <h3 className="text-base font-semibold text-cv-ink mb-2">{v.title}</h3>
                  <p className="text-sm text-cv-ink/70 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <SectionHeading eyebrow="What we build" title="One platform, four specialized products">
            Each module solves a specific layer of the cloud economics problem, together they
            form an end-to-end decision layer.
          </SectionHeading>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRODUCTS.map((p, idx) => {
              const Icon = p.icon;
              return (
                <a
                  key={idx}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-cv-line/40 bg-cv-card dark:bg-black p-6 hover:border-cv-line/70 transition-colors"
                  data-testid={`product-summary-${idx}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cv-blue/20 to-cv-purple/20 flex items-center justify-center mb-4">
                    <Icon weight="Linear" className="w-5 h-5 text-cv-blue" />
                  </div>
                  <h3 className="text-base font-semibold text-cv-ink mb-2 group-hover:text-cv-blue transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-sm text-cv-ink/70 leading-relaxed mb-3">{p.tagline}</p>
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
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-16">
            <div className="lg:flex-1">
              <Eyebrow>Where we&apos;re going</Eyebrow>
              <h2 className="cv-h2 text-balance text-cv-ink">
                An AI-native economic decision layer for every enterprise
              </h2>
              <Link href={DEMO_URL} className="cv-btn-primary mt-6" data-testid="link-book-demo-about">
                Book a demo <ArrowRight weight="Linear" size={16} />
              </Link>
            </div>
            <p className="cv-body-lg text-pretty text-cv-ink/70 lg:w-full lg:max-w-xl lg:shrink-0 lg:pt-1">
              The next decade of compute will be defined by how well teams allocate scarce GPU,
              storage, and network capacity. CloudVerse™ is building the economic decision layer
              that makes those choices automatic, auditable, and aligned with business outcomes,
              across every cloud, every model, and every team.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
