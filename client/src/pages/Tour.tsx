import { BaseLayout } from "@/layouts/BaseLayout";
import { useEffect } from "react";

export default function Tour() {
  useEffect(() => {
    document.title = "90-Second Tour — CloudVerse™";
  }, []);

  return (
    <BaseLayout>
      <section className="pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cv-ink mb-6">
              90-Second Tour
            </h1>
            <p className="text-xl text-cv-muted mb-12">
              See CloudVerse in action.
            </p>

            {/* Video Placeholder */}
            <div className="rounded-2xl border border-cv-line bg-cv-surface2/50 dark:bg-white/5 aspect-video flex items-center justify-center mb-8">
              <div className="text-center">
                <p className="text-cv-muted mb-4">Video coming soon</p>
                <p className="text-sm text-cv-muted">
                  Check back later for a full walkthrough of CloudVerse features.
                </p>
              </div>
            </div>

            <p className="text-cv-muted">
              In the meantime, <a href="/platform" className="text-blue-400 hover:text-blue-300 underline">explore our platform →</a>
            </p>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
