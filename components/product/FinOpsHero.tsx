import Link from "next/link";
import { ArrowRight, ChartSquare, Bell, Layers, ChatDots } from "@solar-icons/react";
import { DEMO_URL } from "@/lib/links";
import { PlatformHeroMockup } from "@/components/product/PlatformHeroMockup";

const FINOPS_TABS = [
  { id: "anomalies", label: "Anomalies", copy: "Identify the team and charge that drove the spike within hours.", icon: Bell },
  { id: "recommendations", label: "Recommendations", copy: "Ranked by impact. Specific enough to act on.", icon: ChartSquare },
  { id: "allocation", label: "Allocation", copy: "One model that covers all three clouds. Reconciles to finance.", icon: Layers },
  { id: "platform-ai", label: "Platform AI", copy: "Ask questions about spend, trends, and opportunities in plain English.", icon: ChatDots},
];

export function FinOpsHero() {
  return (
    <div className="cv-hero-bg">
      <section className="pt-[240px] pb-16 lg:pt-[240px] lg:pb-20 relative">
        <div className="max-w-cv mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-20">
            <div className="flex-1 min-w-0 lg:max-w-xl xl:max-w-2xl">
              <span className="block text-xs font-semibold uppercase tracking-widest text-[#1664C0] dark:text-[#7CB8F8]">
                FinOps Platform
              </span>
              <h1 className="cv-h1 mt-4 leading-[1.25] text-cv-ink">Multi-Cloud Cost Intelligence for Every Team</h1>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={DEMO_URL} className="cv-btn-primary">
                  <span>Book a Demo</span>
                  <ArrowRight weight="Linear" size={16} />
                </Link>
                <Link href="/integrations" className="cv-btn-ghost">Explore the Platform</Link>
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
