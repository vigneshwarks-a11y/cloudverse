"use client";
import React, { useEffect, useMemo } from "react";
import { Link, useParams } from "wouter";
import { BaseLayout } from "@/layouts/BaseLayout";
import { blogDetailPage } from "../blogdata";
import { formatBlogSlug } from "../data";
import "./styl.css";

const stripHtmlTags = (value = "") =>
  value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

const removeLeadingBulletDots = (value = "") =>
  value
    .replace(/(<li\b[^>]*>\s*)(?:&bull;|&#8226;|•|·|●|◦)+\s*/gi, "$1")
    .replace(/(<p\b[^>]*>\s*)(?:&bull;|&#8226;|•|·|●|◦)+\s*/gi, "$1");

const toSectionId = (value = "") => formatBlogSlug(value);

const clearManagedHeadTags = () => {
  if (typeof document === "undefined") return;
  document
    .querySelectorAll('[data-blog-seo="true"], [data-blog-schema="true"]')
    .forEach((node) => node.remove());
};

const upsertMetaTag = (attribute, key, content) => {
  if (!content || typeof document === "undefined") return;

  let element = document.querySelector(
    `meta[${attribute}="${key}"][data-blog-seo="true"]`
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    element.setAttribute("data-blog-seo", "true");
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

const upsertCanonicalTag = (href) => {
  if (!href || typeof document === "undefined") return;

  let element = document.querySelector('link[rel="canonical"][data-blog-seo="true"]');
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    element.setAttribute("data-blog-seo", "true");
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
};

const applyBlogHeadTags = (blog) => {
  if (!blog || typeof document === "undefined") return;

  clearManagedHeadTags();

  const seo = blog.seo || {};
  const fallbackDescription =
    seo.description || stripHtmlTags(blog?.paragraph?.[0]?.para || "");

  document.title = seo.title || `${blog.title} CloudVerse™`;

  upsertMetaTag("name", "description", fallbackDescription);
  upsertMetaTag("name", "keywords", seo.keywords || blog.keywords || "");
  upsertMetaTag("name", "llm:summary", seo.llmSummary || "");
  upsertMetaTag("name", "author", blog.writtenby || "");

  upsertMetaTag("property", "og:type", "article");
  upsertMetaTag("property", "og:title", seo.ogTitle || seo.title || blog.title);
  upsertMetaTag(
    "property",
    "og:description",
    seo.ogDescription || fallbackDescription
  );
  upsertMetaTag("property", "og:image", seo.ogImage || "");
  upsertMetaTag(
    "property",
    "og:url",
    typeof window !== "undefined" ? window.location.href : ""
  );

  upsertMetaTag("name", "twitter:card", "summary_large_image");
  upsertMetaTag(
    "name",
    "twitter:title",
    seo.ogTitle || seo.title || blog.title
  );
  upsertMetaTag(
    "name",
    "twitter:description",
    seo.ogDescription || fallbackDescription
  );
  upsertMetaTag("name", "twitter:image", seo.ogImage || "");
  upsertCanonicalTag(typeof window !== "undefined" ? window.location.href : "");

  if (blog.schema) {
    const schemaElement = document.createElement("script");
    schemaElement.type = "application/ld+json";
    schemaElement.setAttribute("data-blog-schema", "true");
    schemaElement.textContent = JSON.stringify(blog.schema);
    document.head.appendChild(schemaElement);
  }
};

function BlogDetailPage() {
  const params = useParams();
  const slug = decodeURIComponent(params?.slug || "");

  const blog = useMemo(
    () =>
      blogDetailPage.find(
        (item) => formatBlogSlug(item.routtitle || item.title) === slug
      ),
    [slug]
  );

  useEffect(() => {
    if (!blog) {
      document.title = "Blog Not Found CloudVerse™";
      return;
    }

    applyBlogHeadTags(blog);
    return () => clearManagedHeadTags();
  }, [blog]);

  if (!blog) {
    return (
      <BaseLayout>
        <section className="py-cv-sec-lg">
          <div className="max-w-[840px] mx-auto px-6 lg:px-12 text-center">
            <h1 className="cv-h1 mb-4">Blog not found</h1>
            <p className="text-sm text-cv-muted mb-6">
              The blog post you are looking for does not exist.
            </p>
            <Link href="/blog" className="text-primary text-sm font-medium hover:underline">
              Back to blog
            </Link>
          </div>
        </section>
      </BaseLayout>
    );
  }

  const tableOfContents = (blog.paragraph || []).filter((item) => item.subtitle);

  return (
    <BaseLayout>
      <section className="pt-8 pb-4">
        <div className="max-w-[920px] mx-auto px-6 lg:px-12">
          <Link href="/blog" className="text-sm text-cv-muted hover:text-cv-ink transition-colors">
            ← Back to blog
          </Link>
        </div>
      </section>

      <article className="pb-cv-sec-lg">
        <div className="max-w-[920px] mx-auto px-6 lg:px-12">
          <header className="pb-8 border-b border-cv-line">
            <h1 className="text-3xl md:text-5xl font-semibold text-cv-ink leading-tight mb-5">
              {blog.title}
            </h1>
            <div className="flex flex-wrap gap-3 text-sm text-cv-muted">
              <span>{blog.date}</span>
              {blog.writtenby ? <span>• {blog.writtenby}</span> : null}
              {blog.institute ? <span>• {blog.institute}</span> : null}
            </div>
          </header>

          {tableOfContents.length > 0 ? (
            <aside className="mt-8 mb-10 rounded-2xl border border-cv-line bg-cv-surface2 p-6">
              <p className="text-sm font-semibold text-cv-ink mb-3">Table of Contents</p>
              <ul className="space-y-2">
                {tableOfContents.map((item, index) => (
                  <li key={`${toSectionId(item.subtitle)}-${index}`}>
                    <a
                      href={`#${toSectionId(item.subtitle)}`}
                      className="text-sm text-cv-muted hover:text-primary transition-colors"
                    >
                      {item.subtitle}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}

          <div className="space-y-10">
            {(blog.paragraph || []).map((section, index) => (
              <section key={`${section.subtitle || "section"}-${index}`} className="space-y-4">
                {section.heading ? (
                  <p className="text-base md:text-lg font-semibold text-cv-ink">
                    {section.heading}
                  </p>
                ) : null}
                {section.subtitle ? (
                  <h2
                    id={toSectionId(section.subtitle)}
                    className="text-xl md:text-2xl font-semibold text-cv-ink"
                  >
                    {section.subtitle}
                  </h2>
                ) : null}
                {section.featureTitle ? (
                  <h3 className="text-lg font-semibold text-cv-ink">
                    {section.featureTitle}
                  </h3>
                ) : null}
                {section.para ? (
                  <div
                    className="text-sm md:text-base leading-7 text-cv-muted [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-3 [&_li]:mb-2 [&_li]:pl-1 [&_a]:text-primary [&_a]:underline"
                    dangerouslySetInnerHTML={{
                      __html: removeLeadingBulletDots(section.para),
                    }}
                  />
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </article>
    </BaseLayout>
  );
}

export default BlogDetailPage;
