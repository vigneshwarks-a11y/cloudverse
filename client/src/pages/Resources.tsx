import { BaseLayout } from "@/layouts/BaseLayout";
import { Button } from "@/components/Button";
import { Link } from "wouter";
import { useEffect } from "react";
import { track } from "@/lib/track";
import { featuredGuides, categories } from "@/data/resourcesData";
import { FinalCTA } from "@/components/FinalCTA";

export default function Resources() {
  useEffect(() => {
    document.title = "Resources — CloudVerse™";
  }, []);

  return (
    <BaseLayout>
      {/* Hero */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-16 lg:pb-20">
        <div className="cv-container-full space-y-4 sm:space-y-6">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest text-cv-muted mb-4 inline-block">CloudVerse™ Resources</span>
            <h1 className="cv-h1 mb-4">Guides and documentation for enterprise FinOps</h1>
            <p className="text-[15px] sm:text-[16px] lg:text-[17px] leading-[24px] sm:leading-[26px] lg:leading-[28px] text-cv-muted mb-6">
              Practical guidance on visibility, allocation, anomalies, and automation across cloud, data, and AI platforms.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
              <Link href="/resources/guides" data-track="resources_guides_open">
                <Button size="lg" className="w-full sm:w-auto">
                  Browse guides
                </Button>
              </Link>
              <Link href="/resources/docs" data-track="resources_docs_open">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  View documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Two Primary Cards */}
      <section className="py-14 sm:py-16 lg:py-20 border-t border-cv-line">
        <div className="cv-container max-w-[1000px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Guides Card */}
            <div className="rounded-2xl border border-cv-line bg-cv-surface2 p-6 md:p-8">
              <h3 className="text-lg font-semibold text-cv-ink mb-3">Guides</h3>
              <p className="text-sm text-cv-muted mb-6">
                Playbooks and best practices for Finance, Engineering, and platform teams.
              </p>
              <Link href="/resources/guides" className="text-sm font-medium text-primary hover:underline">
                Browse Guides →
              </Link>
            </div>

            {/* Documentation Card */}
            <div className="rounded-2xl border border-cv-line bg-cv-surface2 p-6 md:p-8">
              <h3 className="text-lg font-semibold text-cv-ink mb-3">Documentation</h3>
              <p className="text-sm text-cv-muted mb-6">
                Setup, integrations, security, RBAC, and platform reference.
              </p>
              <Link href="/resources/docs" className="text-sm font-medium text-primary hover:underline">
                View Documentation →
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Guides */}
      <section className="py-14 sm:py-16 lg:py-20 border-t border-cv-line">
        <div className="cv-container max-w-[1000px]">
          <h2 className="cv-h2 mb-8">Featured</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredGuides.slice(0, 3).map((guide) => (
              <Link 
                key={guide.slug} 
                href={`/resources/guides/${guide.slug}`}
                className="block rounded-xl border border-cv-line bg-cv-surface2 p-5 hover:bg-cv-line/30 transition-colors"
              >
                <span className="text-xs font-medium px-2 py-1 rounded border border-cv-line bg-cv-surface text-cv-muted inline-block mb-3">
                  {guide.category}
                </span>
                <h4 className="text-sm font-semibold text-cv-ink mb-2 line-clamp-2">
                  {guide.title}
                </h4>
                <p className="text-sm text-cv-muted mb-3 line-clamp-2">
                  {guide.summary}
                </p>
                {guide.readingTime && (
                  <span className="text-xs text-cv-muted/70">{guide.readingTime}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* Browse by Category */}
      <section className="py-14 sm:py-16 lg:py-20 border-t border-cv-line">
        <div className="cv-container max-w-[1000px]">
          <h2 className="cv-h2 mb-6">Browse by category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/resources/guides?category=${encodeURIComponent(category)}`}
                className="text-sm font-medium px-4 py-2 rounded-full border border-cv-line bg-cv-surface2 text-cv-muted hover:bg-cv-line/30 transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* Product Updates CTA */}
      <section className="py-14 sm:py-16 lg:py-20 border-t border-cv-line">
        <div className="cv-container max-w-[800px] text-center">
          <h3 className="text-lg font-semibold text-cv-ink mb-2">Product updates</h3>
          <p className="text-sm text-cv-muted mb-4">
            New connectors, automation paths, and playbooks.
          </p>
          <Link href="/contact">
            <Button variant="secondary" size="lg">
              Contact sales
            </Button>
          </Link>
        </div>
      </section>
      {/* Bottom CTA */}
      <FinalCTA 
        title="Want help applying this to your environment?"
        location="resources_bottom"
      />
    </BaseLayout>
  );
}
