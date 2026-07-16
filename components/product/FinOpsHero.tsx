import Link from "next/link";
import { ArrowRight, ChartSquare, Bell, Layers, ChatDots } from "@/lib/solar-icons";
import { DEMO_URL } from "@/lib/links";
import { PlatformHeroMockup } from "@/components/product/PlatformHeroMockup";

const FINOPS_TABS = [
  { id: "anomalies", label: "Anomalies", copy: "Find the team and the charge behind a spike within hours, not at month-end.", icon: Bell },
  { id: "recommendations", label: "Recommendations", copy: "Ranked by impact, specific enough to act on today.", icon: ChartSquare },
  { id: "allocation", label: "Allocation", copy: "One model across every cloud. Reconciles to finance.", icon: Layers },
  { id: "platform-ai", label: "Platform AI", copy: "Ask about spend, trends, and savings in plain English.", icon: ChatDots},
];

export function FinOpsHero() {
  return (
    <div className="cv-hero-bg">
      <section className="pt-[120px] sm:pt-[160px] pb-16 lg:pt-[240px] lg:pb-20 relative">
        <div className="max-w-cv mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-20">
            <div className="flex-1 min-w-0 lg:max-w-2xl xl:max-w-3xl">
              <span className="block text-xs font-semibold uppercase tracking-widest text-[#1664C0] dark:text-[#7CB8F8]">
                FinOps Platform
              </span>
              <h1 className="cv-h1 mt-4 leading-[1.25] text-cv-ink">Multi-cloud cost intelligence for every team.</h1>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={DEMO_URL} className="cv-btn-primary">
                  <span>Book a Demo</span>
                  <ArrowRight weight="Linear" size={16} />
                </Link>
                <Link href="/integrations" className="cv-btn-ghost">Explore the platform</Link>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:max-w-xs xl:max-w-sm shrink-0">
              <p className="cv-body text-cv-ink/70">
                See every dollar by team, product, and provider. One model that reconciles to finance and explains itself to engineering.
              </p>
            </div>
          </div>
        </div>
      </section>
      <PlatformHeroMockup tabs={FINOPS_TABS} />
    </div>
  );
}
