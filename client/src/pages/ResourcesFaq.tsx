import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { BaseLayout } from "@/layouts/BaseLayout";
import { Button } from "@/components/Button";
import { resourcesFaqData } from "@/data/resourcesFaqData";

export default function ResourcesFaq() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.title = "FAQ CloudVerse";
  }, []);

  const filteredFaqs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return resourcesFaqData;

    return resourcesFaqData.filter((item) => {
      return (
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.tag.toLowerCase().includes(q)
      );
    });
  }, [query]);

  return (
    <BaseLayout>
      <section className="pt-12 sm:pt-16 lg:pt-20 pb-10 border-b border-cv-line">
        <div className="cv-container max-w-[1100px]">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest text-cv-muted mb-4 inline-block">CloudVerse Resources</span>
            <h1 className="cv-h1 mb-4">FAQ</h1>
            <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-cv-muted mb-6">
              Answers on cloud cost management, FinOps, Kubernetes, AI/GPU economics, forecasting, and governance.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search questions, answers, or tags..."
                className="w-full sm:max-w-[420px] px-4 py-2.5 text-sm rounded-lg border border-cv-line bg-cv-surface2 text-cv-ink placeholder:text-cv-muted/50 focus:outline-none focus:ring-1 focus:ring-primary"
                data-testid="input-resources-faq-search"
              />
              <Link href="/resources/guides">
                <Button variant="secondary" size="lg">Browse Guides</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 lg:py-14">
        <div className="cv-container max-w-[1100px]">
          <p className="text-sm text-cv-muted mb-6" data-testid="text-faq-count">
            Showing {filteredFaqs.length} of {resourcesFaqData.length} FAQs
          </p>

          <div className="space-y-4">
            {filteredFaqs.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-cv-line bg-cv-surface2 p-5 sm:p-6"
                data-testid={`faq-item-${item.id}`}
              >
                <h2 className="text-base sm:text-lg font-semibold text-cv-ink mb-3">
                  {item.id}. {item.question}
                </h2>
                <div className="space-y-3 mb-4">
                  {item.answer.split("\n").map((line, idx) => (
                    <p key={`${item.id}-${idx}`} className="text-sm sm:text-[15px] leading-6 text-cv-muted whitespace-pre-wrap">
                      {line}
                    </p>
                  ))}
                </div>
                <span className="inline-flex items-center text-xs font-medium px-2 py-1 rounded border border-cv-line bg-cv-surface text-cv-muted">
                  {item.tag}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
