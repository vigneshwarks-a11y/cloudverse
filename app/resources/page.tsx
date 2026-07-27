import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/lib/solar-icons";
import { GUIDES, DOCS, FAQS, BLOG_POSTS } from "@/lib/resources";
import { PageHero } from "@/components/PageHero";
import { FaqBlock } from "@/components/FaqBlock";
import { Eyebrow } from "@/components/Eyebrow";
import { DEMO_URL } from "@/lib/links";

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

export default function ResourcesPage() {
  const featuredGuides = GUIDES.filter((g) => g.featured).slice(0, 3);
  const moreGuides = GUIDES.filter((g) => !g.featured).slice(0, 6);
  const featuredBlog = BLOG_POSTS.slice(0, 3);
  const recentBlog = BLOG_POSTS.slice(3, 9);

  return (
    <>
      {/* HERO */}
      <PageHero
        centered
        eyebrow={<>CloudVerse&trade; Resources</>}
        accent="blue"
        title={
          <>
            Guides and Documentation
            <br />
            for <span className="text-cv-blue dark:text-cv-blue-light">Infrastructure Economics</span>
          </>
        }
        subtitle="Practical guidance on visibility, allocation, anomalies, and automation across cloud, data, and AI platforms."
        titleClassName="text-[length:clamp(34px,4.8vw,72px)]"
        subtitleClassName="text-[length:clamp(17px,1.4vw,20px)]"
        actions={
          <>
            <a href="#guides" className="cv-btn-primary px-5 py-3 sm:px-7 sm:py-4" data-testid="button-browse-guides">Browse guides</a>
            <a href="#docs" className="cv-btn-ghost px-5 py-3 sm:px-7 sm:py-4" data-testid="button-browse-docs">Documentation</a>
            <a href="#faq" className="cv-btn-ghost px-5 py-3 sm:px-7 sm:py-4" data-testid="button-browse-faq">FAQ</a>
            <a href="#blog" className="cv-btn-ghost px-5 py-3 sm:px-7 sm:py-4" data-testid="button-browse-blog">Blog</a>
          </>
        }
      />

      {/* FEATURED GUIDES */}
      <section id="guides" className="relative overflow-hidden bg-cv-surface cv-section">
        {/* Continue the hero's blue down over the top of this section and fade
            it to transparent, so the hero and this section read as one
            continuous blue band settling into the page base (same treatment
            as the home hero → CustomerLogos). */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[linear-gradient(180deg,rgba(20,71,230,0.24)_0%,rgba(20,71,230,0.08)_42%,transparent_78%)] dark:bg-[linear-gradient(180deg,rgba(20,71,230,0.5)_0%,rgba(20,71,230,0.16)_42%,transparent_78%)]"
        />
        <div className="cv-container relative z-10">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
            <div>
              <Eyebrow>Guides</Eyebrow>
              <h2 className="cv-h2 text-cv-ink">Featured guides</h2>
            </div>
            <span className="text-sm text-cv-muted">{GUIDES.length} guides total</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredGuides.map((r) => (
              <ResourceCard key={r.slug} r={r} accent />
            ))}
          </div>

          {moreGuides.length > 0 && (
            <>
              <h3 className="cv-h3 text-cv-ink mt-14 mb-6 max-w-2xl text-left">More guides</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {moreGuides.map((r) => (
                  <ResourceCard key={r.slug} r={r} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* DOCS */}
      <section id="docs" className="cv-section bg-cv-surface2 border-t border-cv-line">
        <div className="cv-container">
          <Eyebrow>Docs</Eyebrow>
          <h2 className="cv-h2 text-cv-ink mb-8 max-w-2xl text-left">Documentation</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DOCS.map((d) => (
              <Link
                key={d.slug}
                href={`/resources/${d.slug}`}
                className="rounded-xl border border-cv-line bg-cv-surface dark:bg-[#0D0D0D] p-5 hover:border-cv-blue/40 transition-colors flex flex-col"
                data-testid={`doc-${d.slug}`}
              >
                <span
                  className="inline-block text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full mb-3 self-start"
                  style={{ background: `${CATEGORY_COLORS[d.category] || "#1664C0"}22`, color: CATEGORY_COLORS[d.category] || "#1664C0" }}
                >
                  {d.category}
                </span>
                <div className="font-display font-semibold text-cv-ink text-base leading-snug">{d.title}</div>
                <div className="mt-4 inline-flex items-center gap-1.5 text-sm text-cv-blue dark:text-cv-blue-light">
                  Read doc <ArrowRight weight="Linear" size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="cv-section bg-cv-surface border-t border-cv-line">
        <div className="cv-container">
          <Eyebrow>Blog</Eyebrow>
          <h2 className="cv-h2 text-cv-ink mb-8 max-w-2xl text-left">Featured blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBlog.map((post) => (
              <BlogCard key={post.id} post={post} dark />
            ))}
          </div>

          {recentBlog.length > 0 && (
            <>
              <h3 className="cv-h3 text-cv-ink mt-14 mb-6 max-w-2xl text-left">Recent posts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentBlog.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="cv-section bg-cv-surface2 border-t border-cv-line">
        <div className="cv-container max-w-4xl">
          <FaqBlock
            title="Frequently asked"
            subtitle="Common questions we get asked the most"
            items={FAQS.slice(0, 6).map((faq) => ({ q: faq.question, a: faq.answer }))}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="rounded-3xl border border-cv-line/40 bg-cv-surface2 dark:bg-[#0D0D0D] p-10 lg:p-16 text-center">
            <h2 className="cv-h2 text-cv-ink max-w-3xl mx-auto">Have a story worth telling?</h2>
            <p className="cv-body-lg text-cv-ink/75 mt-5 max-w-2xl mx-auto">
              We work with practitioners on customer stories, joint research, and guest pieces.
            </p>
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
              <Link href={DEMO_URL} className="cv-btn-primary px-5 py-3 sm:px-7 sm:py-4"><span>Book a Demo</span><ArrowRight weight="Linear" size={16} /></Link>
              <Link href="/contact" className="cv-btn-ghost px-5 py-3 sm:px-7 sm:py-4">Talk to Us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ResourceCard({ r, accent }: { r: import("@/lib/resources").Resource; accent?: boolean }) {
  const color = CATEGORY_COLORS[r.category] || "#1664C0";
  return (
    <Link
      href={`/resources/${r.slug}`}
      className={`group rounded-xl border p-6 transition-colors flex flex-col ${accent ? "border-cv-blue/30 bg-cv-surface2 dark:bg-[#0D0D0D]" : "border-cv-line bg-cv-surface2 dark:bg-[#0D0D0D]"} hover:border-cv-blue/60`}
      data-testid={`resource-${r.slug}`}
    >
      <div className="flex items-center gap-3 text-[11px] text-cv-muted mb-4">
        <span
          className="inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] uppercase tracking-wider"
          style={{ borderColor: `${color}66`, color }}
        >
          {r.category}
        </span>
        {r.readingTime ? (<><span>·</span><span>{r.readingTime}</span></>) : null}
      </div>
      <div className="font-display font-semibold text-cv-ink text-lg leading-snug">{r.title}</div>
      {r.seo?.description ? (
        <p className="text-cv-muted text-sm mt-3 leading-relaxed flex-1 min-w-0 line-clamp-3">{r.seo.description}</p>
      ) : null}
      <div className="mt-5 inline-flex items-center gap-1.5 text-sm text-cv-blue dark:text-cv-blue-light font-medium">
        Read guide <ArrowRight weight="Linear" size={14} className="group-hover:translate-x-0.5 transition-transform" />
      </div>
    </Link>
  );
}

function BlogCard({ post, dark }: { post: import("@/lib/resources").BlogPost; dark?: boolean }) {
  return (
    <article
      className={`block rounded-xl border border-cv-line p-5 ${dark ? "bg-cv-surface2 dark:bg-[#0D0D0D]" : "bg-cv-surface"}`}
      data-testid={`blog-${post.slug}`}
    >
      <span className="inline-block text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full mb-3 bg-[#1664C0]/10 dark:bg-[#7CB8F8]/10 text-[#1664C0] dark:text-[#7CB8F8]">
        {post.category}
      </span>
      <h3 className="text-base font-semibold text-cv-ink mb-2 line-clamp-2">{post.title}</h3>
      <p className="text-sm text-cv-muted mb-4 line-clamp-3">{post.summary}</p>
      <div className="flex items-center justify-between text-xs text-cv-muted">
        <span>{post.author}</span>
        <span>{post.date} · {post.readingTime}</span>
      </div>
    </article>
  );
}
