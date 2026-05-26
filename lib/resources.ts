import { resourcesData, type Resource as LegacyResource } from "./legacy/resourcesData";
import { resourcesFaqData, type ResourceFaqItem } from "./legacy/resourcesFaqData";
import { blogPosts as legacyBlog, type BlogPost as LegacyBlogPost } from "./legacy/blogData";

export type Resource = LegacyResource;
export type BlogPost = LegacyBlogPost & { id: string };
export type FaqItem = ResourceFaqItem;

export const RESOURCES: Resource[] = resourcesData;

export const GUIDES: Resource[] = resourcesData.filter((r) => r.type === "Guide");
export const DOCS: Resource[] = resourcesData.filter((r) => r.type === "Doc");

export const FAQS: FaqItem[] = resourcesFaqData;

export const BLOG_POSTS: BlogPost[] = legacyBlog.map((p, i) => ({ ...p, id: String(i + 1) }));

export function getResource(slug: string): Resource | undefined {
  return resourcesData.find((r) => r.slug === slug);
}
