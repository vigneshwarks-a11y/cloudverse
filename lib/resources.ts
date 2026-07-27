import { createReader } from "@keystatic/core/reader";
import type { Node as MarkdocNode } from "@markdoc/markdoc";
import keystaticConfig from "@/keystatic.config";

/* Resources data layer — reads guides, docs, blog posts, and FAQs from the
   Keystatic content/ directory (see keystatic.config.ts) instead of the old
   lib/legacy/* fixtures. Keeps the same public shape (Resource, BlogPost,
   FaqItem) that app/resources/page.tsx, app/resources/[slug]/page.tsx, and
   app/sitemap.ts were already built against, so callers only had to switch
   from importing constants to awaiting functions. */

const reader = createReader(process.cwd(), keystaticConfig);

export type Category =
  | "FinOps"
  | "Allocation"
  | "Anomalies"
  | "Automation"
  | "Tagging"
  | "Developer FinOps"
  | "Integrations"
  | "Security";

export type Resource = {
  type: "Guide" | "Doc";
  title: string;
  slug: string;
  summary?: string;
  category: Category;
  readingTime?: string;
  date?: string;
  featured?: boolean;
  contentNode?: MarkdocNode;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  readingTime: string;
  date: string;
  author: string;
  featured: boolean;
  contentNode?: MarkdocNode;
};

export type FaqItem = {
  id: number;
  question: string;
  answer: string;
  order: number;
};

async function loadGuides(): Promise<Resource[]> {
  const entries = await reader.collections.guides.all();
  return Promise.all(
    entries.map(async ({ slug, entry }) => ({
      type: "Guide" as const,
      title: entry.title,
      slug,
      summary: entry.summary || undefined,
      category: entry.category as Category,
      readingTime: entry.readingTime || undefined,
      date: entry.date || undefined,
      featured: entry.featured,
      contentNode: (await entry.content()).node,
      seo: {
        title: entry.seoTitle || undefined,
        description: entry.seoDescription || undefined,
        keywords: entry.seoKeywords || undefined,
      },
    })),
  );
}

async function loadDocs(): Promise<Resource[]> {
  const entries = await reader.collections.docs.all();
  return Promise.all(
    entries.map(async ({ slug, entry }) => ({
      type: "Doc" as const,
      title: entry.title,
      slug,
      summary: entry.summary || undefined,
      category: entry.category as Category,
      contentNode: (await entry.content()).node,
    })),
  );
}

export async function getGuides(): Promise<Resource[]> {
  return loadGuides();
}

export async function getDocs(): Promise<Resource[]> {
  return loadDocs();
}

export async function getResources(): Promise<Resource[]> {
  const [guides, docs] = await Promise.all([loadGuides(), loadDocs()]);
  return [...guides, ...docs];
}

export async function getResource(slug: string): Promise<Resource | undefined> {
  const guideEntry = await reader.collections.guides.read(slug);
  if (guideEntry) {
    return {
      type: "Guide",
      title: guideEntry.title,
      slug,
      summary: guideEntry.summary || undefined,
      category: guideEntry.category as Category,
      readingTime: guideEntry.readingTime || undefined,
      date: guideEntry.date || undefined,
      featured: guideEntry.featured,
      contentNode: (await guideEntry.content()).node,
      seo: {
        title: guideEntry.seoTitle || undefined,
        description: guideEntry.seoDescription || undefined,
        keywords: guideEntry.seoKeywords || undefined,
      },
    };
  }
  const docEntry = await reader.collections.docs.read(slug);
  if (docEntry) {
    return {
      type: "Doc",
      title: docEntry.title,
      slug,
      summary: docEntry.summary || undefined,
      category: docEntry.category as Category,
      contentNode: (await docEntry.content()).node,
    };
  }
  return undefined;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const entries = await reader.collections.blogPosts.all();
  return Promise.all(
    entries.map(async ({ slug, entry }, i) => ({
      id: String(i + 1),
      title: entry.title,
      slug,
      summary: entry.excerpt,
      category: entry.category,
      readingTime: entry.readingTime,
      date: entry.date || "",
      author: entry.author,
      featured: entry.featured,
      contentNode: (await entry.content()).node,
    })),
  );
}

export async function getFaqs(): Promise<FaqItem[]> {
  const entries = await reader.collections.faqs.all();
  return entries
    .map(({ entry }, i) => ({
      id: i + 1,
      question: entry.question,
      answer: entry.answer,
      order: entry.order ?? i + 1,
    }))
    .sort((a, b) => a.order - b.order);
}
