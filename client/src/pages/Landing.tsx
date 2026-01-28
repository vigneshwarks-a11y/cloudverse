import { BaseLayout } from "@/layouts/BaseLayout";
import { InvoiceEfficiencySection } from "@/components/home/InvoiceEfficiencySection";
import { FinalCTA } from "@/components/FinalCTA";
import { Link } from "wouter";
import { track } from "@/lib/track";

const features = [
  "Visibility & reporting",
  "Developer FinOps (shift-left)",
  "Allocation & chargeback",
  "Autonomous tag normalization",
  "Detected + predicted anomalies",
  "Enterprise access controls",
  "Automation-first optimization",
  "Audit logs and governance",
];

export default function Landing() {
  return (
    <BaseLayout>
      <InvoiceEfficiencySection />

      <section className="py-12 sm:py-16 lg:py-20 border-t border-cv-line dark:border-white/10">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-20">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center text-cv-ink mb-10 sm:mb-12">
            What's included with CloudVerse
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10 sm:mb-12">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="py-3 px-4 rounded-lg bg-cv-surface2/50 dark:bg-white/[0.04] border border-cv-line dark:border-white/10"
              >
                <p className="text-sm text-cv-muted dark:text-slate-400">{feature}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/connect"
              onClick={() => track("cta_schedule_demo", { location: "landing_features" })}
              className="text-sm font-medium tracking-wide uppercase text-cv-muted hover:text-cv-ink dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              Schedule a demo →
            </Link>
          </div>
        </div>
      </section>

      <FinalCTA location="landing_page" />
    </BaseLayout>
  );
}
