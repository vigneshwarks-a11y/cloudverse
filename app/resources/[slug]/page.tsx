import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { RESOURCES, getResource } from "@/lib/resources";
import { CTABand } from "@/components/CTABand";

export function generateStaticParams() {
  return RESOURCES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = getResource(slug);
  if (!r) return { title: "Not found" };
  return {
    title: `${r.title} — CloudVerse Resources`,
    description: r.excerpt,
    alternates: { canonical: `/resources/${r.slug}` },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = getResource(slug);
  if (!r) notFound();

  return (
    <>
      <article className="pt-[140px] pb-12 lg:pt-[160px] lg:pb-16">
        <div className="cv-container max-w-3xl">
          <Link href="/resources" className="inline-flex items-center gap-1.5 text-sm text-cv-ink/65 hover:text-cv-ink mb-6">
            <ArrowLeft size={14} /> Resources
          </Link>
          <div className="flex items-center gap-3 text-[12px] text-cv-ink/55 mb-5">
            <span className="cv-label">{r.tag}</span>
            <span>·</span>
            <span>{r.readTime}</span>
            <span>·</span>
            <span>{r.date}</span>
          </div>
          <h1 className="cv-h1 text-cv-ink">{r.title}</h1>
          <p className="cv-body-lg mt-6 text-cv-ink/75">{r.excerpt}</p>
        </div>
      </article>

      <section className="pb-16 lg:pb-24">
        <div className="cv-container max-w-3xl">
          <div className="prose-cv">
            {r.body.split("\n\n").map((block, i) => {
              if (block.startsWith("**") && block.endsWith("**")) {
                return <h2 key={i} className="font-display font-bold text-cv-ink text-2xl mt-10 mb-4">{block.slice(2, -2)}</h2>;
              }
              const parts = block.split(/(\*\*[^*]+\*\*)/);
              return (
                <p key={i} className="text-cv-ink/80 text-[17px] leading-relaxed mt-5">
                  {parts.map((p, j) =>
                    p.startsWith("**") && p.endsWith("**") ? (
                      <strong key={j} className="text-cv-ink font-semibold">{p.slice(2, -2)}</strong>
                    ) : (
                      <span key={j}>{p}</span>
                    )
                  )}
                </p>
              );
            })}
          </div>
        </div>
      </section>

      <CTABand heading="See CloudVerse in your environment." />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: r.title,
            description: r.excerpt,
            datePublished: r.date,
            author: { "@type": "Organization", name: "CloudVerse" },
          }),
        }}
      />
    </>
  );
}
