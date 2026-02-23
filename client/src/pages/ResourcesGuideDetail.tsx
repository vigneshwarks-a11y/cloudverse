import { BaseLayout } from "@/layouts/BaseLayout";
import { Button } from "@/components/Button";
import { Link, useParams } from "wouter";
import { useEffect } from "react";
import { guides } from "@/data/resourcesData";

const sectionTitlePattern =
  /^(Section\s+\d+\s*(?:-|:)?\s+.+|The\s+(Trigger|Constraint|Misconception|Reality|Model|Failure Modes|CloudVerse Approach|Outcome|Starting Point)\s*:?\s*)(.*)$/i;

const splitSectionHeading = (content: string) => {
  const trimmed = content.trim();
  const firstBreakMatch = trimmed.match(/<br\s*\/?>\s*<br\s*\/?>/i);

  // Prefer "first line = heading, rest = body" so headings like
  // "The Trigger: When ..." keep their right-side text.
  if (firstBreakMatch) {
    const breakIndex = firstBreakMatch.index ?? -1;
    const headingCandidate = trimmed.slice(0, breakIndex).trim();
    const remainder = trimmed
      .slice(breakIndex + firstBreakMatch[0].length)
      .trim();

    if (headingCandidate.match(sectionTitlePattern)) {
      return { heading: headingCandidate, remainder };
    }
  }

  const match = trimmed.match(sectionTitlePattern);
  if (!match) return null;
  return { heading: match[1].trim(), remainder: "" };
};

const clearManagedHeadTags = () => {
  if (typeof document === "undefined") return;
  document
    .querySelectorAll('[data-guide-seo="true"], [data-guide-schema="true"]')
    .forEach((node) => node.remove());
};

const upsertMetaTag = (attribute: string, key: string, content?: string) => {
  if (!content || typeof document === "undefined") return;

  let element = document.querySelector(
    `meta[${attribute}="${key}"][data-guide-seo="true"]`
  ) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    element.setAttribute("data-guide-seo", "true");
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

const upsertCanonicalTag = (href?: string) => {
  if (!href || typeof document === "undefined") return;

  let element = document.querySelector(
    'link[rel="canonical"][data-guide-seo="true"]'
  ) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    element.setAttribute("data-guide-seo", "true");
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
};

const applyGuideHeadTags = (guide: (typeof guides)[number]) => {
  if (!guide || typeof document === "undefined") return;

  clearManagedHeadTags();

  const seo = guide.seo || {};
  const fallbackDescription = seo.description || guide.summary || "";

  document.title = seo.title || `${guide.title} CloudVerse`;

  upsertMetaTag("name", "description", fallbackDescription);
  upsertMetaTag("name", "keywords", seo.keywords || "");
  upsertMetaTag("name", "llm:summary", seo.llmSummary || "");

  upsertMetaTag("property", "og:type", "article");
  upsertMetaTag("property", "og:title", seo.ogTitle || seo.title || guide.title);
  upsertMetaTag("property", "og:description", seo.ogDescription || fallbackDescription);
  upsertMetaTag(
    "property",
    "og:url",
    typeof window !== "undefined" ? window.location.href : ""
  );

  upsertMetaTag("name", "twitter:card", "summary_large_image");
  upsertMetaTag("name", "twitter:title", seo.ogTitle || seo.title || guide.title);
  upsertMetaTag(
    "name",
    "twitter:description",
    seo.ogDescription || fallbackDescription
  );

  upsertCanonicalTag(typeof window !== "undefined" ? window.location.href : "");

  if (guide.schema) {
    const schemaElement = document.createElement("script");
    schemaElement.type = "application/ld+json";
    schemaElement.setAttribute("data-guide-schema", "true");
    schemaElement.textContent = JSON.stringify(guide.schema);
    document.head.appendChild(schemaElement);
  }
};

export default function ResourcesGuideDetail() {
  const params = useParams<{ slug: string }>();
  const guide = guides.find(g => g.slug === params.slug);

  useEffect(() => {
    if (guide) {
      applyGuideHeadTags(guide);
    }
    return () => clearManagedHeadTags();
  }, [guide]);

  if (!guide) {
    return (
      <BaseLayout>
        <section className="py-cv-sec-lg">
          <div className="max-w-[840px] mx-auto px-6 lg:px-12 text-center">
            <h1 className="cv-h1 mb-4">Guide not found</h1>
            <p className="text-sm text-cv-muted mb-6">
              The guide you're looking for doesn't exist.
            </p>
            <Link href="/resources/guides">
              <Button variant="secondary">Back to guides</Button>
            </Link>
          </div>
        </section>
      </BaseLayout>
    );
  }

  const relatedGuides = guides
    .filter(g => g.slug !== guide.slug && g.category === guide.category)
    .slice(0, 3);

  return (
    <BaseLayout>
      {/* Back Link */}
      <section className="pt-8 pb-4">
        <div className="max-w-[840px] mx-auto px-6 lg:px-12">
          <Link href="/resources/guides" className="text-sm text-cv-muted hover:text-cv-ink transition-colors">
            ← Back to guides
          </Link>
        </div>
      </section>

      {/* Article Header */}
      <section className="pb-8">
        <div className="max-w-[840px] mx-auto px-6 lg:px-12">
          <h1 className="text-3xl md:text-4xl font-semibold text-cv-ink mb-4">
            {guide.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-cv-muted">
            <span className="text-xs font-medium px-2 py-1 rounded border border-cv-line bg-cv-surface">
              {guide.category}
            </span>
            {guide.readingTime && (
              <>
                <span>•</span>
                <span>{guide.readingTime}</span>
              </>
            )}
            {guide.date && (
              <>
                <span>•</span>
                <span>{new Date(guide.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-cv-sec-md border-t border-cv-line">
        <div className="max-w-[840px] mx-auto px-6 lg:px-12">
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-base text-cv-muted leading-7 mb-6">
              {guide.summary}
            </p>
            {guide.content && guide.content.map((paragraph, idx) => (
              (() => {
                const section = splitSectionHeading(paragraph);
                if (!section) {
                  return (
                    <div
                      key={idx}
                      className="text-sm text-cv-muted leading-7 mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-3 [&_li]:mb-2 [&_li]:pl-1 [&_a]:text-primary [&_a]:underline"
                      dangerouslySetInnerHTML={{ __html: paragraph }}
                    />
                  );
                }

                return (
                  <section key={idx} className="mb-5">
                    <h2 className="text-lg md:text-xl font-semibold text-cv-ink mb-2">
                      {section.heading}
                    </h2>
                    {section.remainder ? (
                      <div
                        className="text-sm text-cv-muted leading-7 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-3 [&_li]:mb-2 [&_li]:pl-1 [&_a]:text-primary [&_a]:underline"
                        dangerouslySetInnerHTML={{ __html: section.remainder }}
                      />
                    ) : null}
                  </section>
                );
              })()
            ))}
          </div>
        </div>
      </section>

      {/* Related Guides */}
      {relatedGuides.length > 0 && (
        <section className="py-cv-sec-lg border-t border-cv-line">
          <div className="max-w-[840px] mx-auto px-6 lg:px-12">
            <h2 className="text-lg font-semibold text-cv-ink mb-6">Related guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedGuides.map((related) => (
                <Link
                  key={related.slug}
                  href={`/resources/guides/${related.slug}`}
                  className="block rounded-xl border border-cv-line bg-cv-surface2 p-4 hover:bg-cv-line/30 transition-colors"
                >
                  <h4 className="text-sm font-semibold text-cv-ink mb-2 line-clamp-2">
                    {related.title}
                  </h4>
                  {related.readingTime && (
                    <span className="text-xs text-cv-muted/70">{related.readingTime}</span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-cv-sec-lg border-t border-cv-line">
        <div className="max-w-[760px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="cv-h2 mb-3">Want help applying this?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4">
            <Link href="/connect">
              <Button size="lg" className="w-full sm:w-auto">
                Book a demo
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Contact sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
