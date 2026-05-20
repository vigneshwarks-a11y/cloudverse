import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RESOURCES } from "@/lib/resources";
import { blogPosts, faqs } from "@/lib/blog";
import { CTABand } from "@/components/CTABand";

export const metadata: Metadata = {
  title: "Resources | Cloud Cost Optimization & Unit Economics",
  description:
    "Guides, frameworks, and insights on cloud cost optimization, unit economics, and engineering-led governance.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "CloudVerse Resources",
    description:
      "Read guides, frameworks, and insights on cloud cost optimization, unit economics, and engineering-led governance.",
  },
};

const TAG_COLORS: Record<string, string> = {
  Guide: "#0E9E7A",
  Report: "#1664C0",
  "Customer story": "#D97706",
  Whitepaper: "#6954D4",
};

export default function Page() {
  const featuredBlog = blogPosts.slice(0, 3);
  const recentBlog = blogPosts.slice(3, 6);
  const featuredFaqs = faqs.slice(0, 3);
  const featuredResources = RESOURCES.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="cv-hero-bg pt-[140px] pb-12 lg:pt-[160px] lg:pb-16 relative">
        <div className="cv-container relative z-10">
          <div className="max-w-3xl">
            <span className="cv-label inline-block mb-4">CloudVerse™ Resources</span>
            <h1 className="cv-h1 text-cv-ink mb-4">
              Guides and documentation for infrastructure economics
            </h1>
            <p className="cv-body-lg text-cv-ink/75 mb-8 max-w-2xl">
              Practical guidance on visibility, allocation, anomalies, and automation across cloud,
              data, and AI platforms.
            </p>
            <div className="flex flex-wrap items-start gap-3">
              <a href="#articles" className="cv-btn-primary" data-testid="button-browse">
                Browse articles
              </a>
              <a href="#faq" className="cv-btn-ghost" data-testid="button-browse-faq">
                Browse FAQ
              </a>
              <a href="#blog" className="cv-btn-ghost" data-testid="button-browse-blog">
                Browse blog
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured articles */}
      <section id="articles" className="cv-section bg-cv-surface border-t border-cv-line">
        <div className="cv-container">
          <div className="flex items-end justify-between mb-8">
            <h2 className="cv-h2 text-cv-ink">Featured articles</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredResources.map((r) => (
              <Link
                key={r.slug}
                href={`/resources/${r.slug}`}
                className="group rounded-xl border border-cv-line bg-cv-surface2 p-6 hover:border-cv-blue/40 transition-colors flex flex-col"
                data-testid={`resource-${r.slug}`}
              >
                <div className="flex items-center gap-3 text-[11px] text-cv-muted mb-4">
                  <span
                    className="inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] uppercase tracking-wider"
                    style={{
                      borderColor: `${TAG_COLORS[r.tag]}66`,
                      color: TAG_COLORS[r.tag],
                    }}
                  >
                    {r.tag}
                  </span>
                  <span>·</span>
                  <span>{r.readTime}</span>
                </div>
                <div className="font-display font-semibold text-cv-ink text-lg leading-snug">
                  {r.title}
                </div>
                <p className="text-cv-muted text-sm mt-3 leading-relaxed flex-1">{r.excerpt}</p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm text-cv-blue font-medium">
                  Read article{" "}
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured blog */}
      <section id="blog" className="cv-section bg-cv-surface2 border-t border-cv-line">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-8">Featured blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBlog.map((post) => (
              <article
                key={post.id}
                className="block rounded-xl border border-cv-line bg-cv-surface p-5"
                data-testid={`card-featured-blog-${post.slug}`}
              >
                <span
                  className="inline-block text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full mb-3"
                  style={{ background: "rgba(0, 113, 227, 0.1)", color: "#0071E3" }}
                >
                  {post.category}
                </span>
                <h3 className="text-base font-semibold text-cv-ink mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-cv-muted mb-4 line-clamp-3">{post.summary}</p>
                <div className="flex items-center justify-between text-xs text-cv-muted">
                  <span>{post.author}</span>
                  <span>
                    {post.date} · {post.readingTime}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Recent posts */}
      <section className="cv-section bg-cv-surface border-t border-cv-line">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-8">Recent posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentBlog.map((post) => (
              <article
                key={post.id}
                className="block rounded-xl border border-cv-line bg-cv-surface2 p-5"
                data-testid={`card-blog-${post.slug}`}
              >
                <span
                  className="inline-block text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full mb-3"
                  style={{ background: "rgba(0, 113, 227, 0.1)", color: "#0071E3" }}
                >
                  {post.category}
                </span>
                <h3 className="text-base font-semibold text-cv-ink mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-cv-muted mb-4 line-clamp-3">{post.summary}</p>
                <div className="flex items-center justify-between text-xs text-cv-muted">
                  <span>{post.author}</span>
                  <span>
                    {post.date} · {post.readingTime}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="cv-section bg-cv-surface2 border-t border-cv-line">
        <div className="cv-container max-w-4xl">
          <h2 className="cv-h2 text-cv-ink mb-8">Frequently asked</h2>
          <div className="space-y-4">
            {featuredFaqs.map((faq) => (
              <article
                key={faq.id}
                className="rounded-xl border border-cv-line bg-cv-surface p-5 sm:p-6"
                data-testid={`faq-${faq.id}`}
              >
                <h3 className="text-base sm:text-lg font-semibold text-cv-ink mb-3">
                  {faq.question}
                </h3>
                <p className="text-sm sm:text-[15px] leading-relaxed text-cv-muted mb-4">
                  {faq.answer}
                </p>
                <span className="inline-flex items-center text-xs font-medium px-2 py-1 rounded border border-cv-line bg-cv-surface2 text-cv-muted">
                  {faq.tag}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        heading="Have a story worth telling?"
        sub="We work with practitioners on customer stories, joint research, and guest pieces."
      />
    </>
  );
}
