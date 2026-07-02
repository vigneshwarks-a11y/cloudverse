import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "@solar-icons/react";
import { RESOURCES, getResource } from "@/lib/resources";
import { DEMO_URL } from "@/lib/links";

export function generateStaticParams() {
  return RESOURCES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = getResource(slug);
  if (!r) return { title: "Not found" };
  return {
    title: r.seo?.title || `${r.title} — CloudVerse Resources`,
    description: r.seo?.description,
    keywords: r.seo?.keywords,
    alternates: { canonical: `/resources/${r.slug}` },
    openGraph: {
      title: r.seo?.ogTitle || r.title,
      description: r.seo?.ogDescription || r.seo?.description,
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
  const r = getResource(slug);
  if (!r) notFound();

  const color = CATEGORY_COLORS[r.category] || "#1664C0";
  const related = RESOURCES.filter((x) => x.slug !== r.slug && x.type === r.type && x.category === r.category).slice(0, 3);

  return (
    <>
      <article className="pt-[240px] pb-12 lg:pt-[240px] lg:pb-16">
        <div className="cv-container max-w-3xl">
          <Link href="/resources" className="inline-flex items-center gap-1.5 text-sm text-cv-ink/65 hover:text-cv-ink mb-6" data-testid="link-back-resources">
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

      <section className="pb-16 lg:pb-24">
        <div className="cv-container max-w-3xl">
          <div className="space-y-6">
            {(r.content || []).map((block, i) => (
              <div
                key={i}
                className="text-cv-ink/85 text-[17px] leading-relaxed [&_b]:font-semibold [&_b]:text-cv-ink [&_br]:mb-2"
                dangerouslySetInnerHTML={{ __html: block }}
              />
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="cv-section bg-cv-surface2 border-t border-cv-line">
          <div className="cv-container max-w-5xl">
            <h2 className="cv-h3 text-cv-ink mb-6">Related {r.type === "Guide" ? "guides" : "docs"}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/resources/${rel.slug}`}
                  className="rounded-xl border border-cv-line bg-cv-surface p-5 hover:border-cv-blue/40 transition-colors"
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
          <div className="rounded-3xl border border-cv-line bg-cv-surface2 p-10 lg:p-16 text-center">
            <h2 className="cv-h2 text-cv-ink max-w-3xl mx-auto">See cloudverse in your environment.</h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href={DEMO_URL} className="cv-btn-primary"><span>Book a Demo</span><ArrowRight weight="Linear" size={16} /></Link>
              <Link href="/resources" className="cv-btn-ghost">More resources</Link>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            r.schema ?? {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: r.title,
              description: r.seo?.description,
              datePublished: r.date,
              author: { "@type": "Organization", name: "cloudverse" },
            },
          ),
        }}
      />
    </>
  );
}
