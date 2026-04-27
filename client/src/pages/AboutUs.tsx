import { BaseLayout } from "@/layouts/BaseLayout";
import { useEffect } from "react";
import { applyPageSeo, clearPageSeo } from "@/lib/seo";

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
          </div>

          <div className="max-w-4xl mx-auto">
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
        </div>
      </section>
    </BaseLayout>
  );
}
