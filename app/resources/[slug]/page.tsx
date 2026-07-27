import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as React from "react";
import Markdoc from "@markdoc/markdoc";
import { ArrowLeft, ArrowRight } from "@/lib/solar-icons";
import { getResources, getResource, type Resource } from "@/lib/resources";
import { DEMO_URL } from "@/lib/links";

export async function generateStaticParams() {
  const resources = await getResources();
  return resources.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = await getResource(slug);
  if (!r) return { title: "Not found" };
  return {
    title: r.seo?.title || `${r.title}: CloudVerse Resources`,
    description: r.seo?.description,
    keywords: r.seo?.keywords,
    alternates: { canonical: `/resources/${r.slug}` },
    openGraph: {
      title: r.seo?.title || r.title,
      description: r.seo?.description,
    },
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  FinOps: "#1664C0",
  Allocation: "#6954D4",
  Anomalies: "#D97706",
  Automation: "#0E9E7A",
  Tagging: "#1664C0",
  "Developer FinOps": "#0E9E7A",
  Integrations: "#6954D4",
  Security: "#D97706",
};

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = await getResource(slug);
  if (!r) notFound();

  const color = CATEGORY_COLORS[r.category] || "#1664C0";
  const allResources = await getResources();
  const related = allResources
    .filter((x) => x.slug !== r.slug && x.type === r.type && x.category === r.category)
    .slice(0, 3);
  const renderedContent = r.contentNode ? Markdoc.renderers.react(Markdoc.transform(r.contentNode), React) : null;

  return (
    <>
      <article className="pt-[120px] sm:pt-[160px] pb-12 lg:pt-[240px] lg:pb-16">
        <div className="cv-container max-w-4xl">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 rounded-full border border-cv-line bg-cv-surface2 dark:bg-white/[0.03] px-3.5 py-1.5 text-sm text-cv-ink/70 hover:text-cv-ink hover:border-cv-blue/40 transition-colors mb-6"
            data-testid="link-back-resources"
          >
            <ArrowLeft weight="Linear" size={14} /> Resources
          </Link>
          <div className="flex items-center gap-3 text-[12px] text-cv-ink/55 mb-5 flex-wrap">
            <span
              className="inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] uppercase tracking-wider"
              style={{ borderColor: `${color}66`, color }}
            >
              {r.type} · {r.category}
            </span>
            {r.readingTime ? (<><span>·</span><span>{r.readingTime}</span></>) : null}
            {r.date ? (<><span>·</span><span>{r.date}</span></>) : null}
          </div>
          <h1 className="cv-h1 text-cv-ink">{r.title}</h1>
          {r.summary ? <p className="cv-body-lg mt-6 text-cv-ink/75">{r.summary}</p> : null}
        </div>
      </article>

      {renderedContent && (
        <section className="pb-16 lg:pb-24">
          <div className="cv-container max-w-4xl">
            <div
              className="text-cv-ink/85 text-[17px] leading-relaxed
                [&_h2]:font-sans [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-2xl [&_h2]:text-cv-ink [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:first:mt-0
                [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:pl-5 [&_ul]:list-disc [&_ol]:mb-4 [&_ol]:pl-5 [&_ol]:list-decimal [&_li]:mb-1.5
                [&_strong]:font-semibold [&_strong]:text-cv-ink"
            >
              {renderedContent}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="cv-section bg-cv-surface2 border-t border-cv-line">
          <div className="cv-container max-w-5xl">
            <h2 className="cv-h3 text-cv-ink mb-6 max-w-2xl text-left">Related {r.type === "Guide" ? "guides" : "docs"}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/resources/${rel.slug}`}
                  className="rounded-xl border border-cv-line bg-cv-surface dark:bg-[#0D0D0D] p-5 hover:border-cv-blue/40 transition-colors"
                  data-testid={`related-${rel.slug}`}
                >
                  <div className="font-display font-semibold text-cv-ink leading-snug">{rel.title}</div>
                  {rel.readingTime ? (
                    <div className="text-xs text-cv-muted mt-2">{rel.readingTime}</div>
                  ) : null}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="cv-section">
        <div className="cv-container">
          <div className="rounded-3xl border border-cv-line/40 bg-cv-surface2 dark:bg-[#0D0D0D] p-10 lg:p-16 text-center">
            <h2 className="cv-h2 text-cv-ink max-w-3xl mx-auto">See cloudverse in your environment.</h2>
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
              <Link href={DEMO_URL} className="cv-btn-primary px-5 py-3 sm:px-7 sm:py-4"><span>Book a Demo</span><ArrowRight weight="Linear" size={16} /></Link>
              <Link href="/resources" className="cv-btn-ghost px-5 py-3 sm:px-7 sm:py-4">More resources</Link>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: r.title,
            description: r.seo?.description,
            datePublished: r.date,
            author: { "@type": "Organization", name: "cloudverse" },
          }),
        }}
      />
    </>
  );
}
