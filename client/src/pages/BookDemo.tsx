import { BaseLayout } from "@/layouts/BaseLayout";
import { useEffect } from "react";
import { DEMO_URL } from "@/lib/links";

export default function BookDemo() {
  useEffect(() => {
    document.title = "Book a Demo — CloudVerse™";
  }, []);

  return (
    <BaseLayout>
      <section className="pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cv-ink mb-6">
              Book a Demo
            </h1>
            <p className="text-xl text-cv-muted mb-12">
              Let us show you how CloudVerse can help you manage your cloud costs.
            </p>

            {/* Calendly Placeholder */}
            <div className="rounded-2xl border border-cv-line bg-cv-surface2/50 dark:bg-white/5 p-8 sm:p-12">
              <p className="text-cv-muted mb-6">
                Redirecting to scheduling system...
              </p>
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
              >
                Schedule a Demo
              </a>
              <p className="text-sm text-cv-muted mt-6">
                If you're not redirected automatically, click the button above.
              </p>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
