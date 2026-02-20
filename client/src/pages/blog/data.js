import { blogDetailPage } from "./blogdata";

const stripHtmlTags = (value = "") =>
  value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

export const formatBlogSlug = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const buildSummary = (blog) => {
  const seoDescription = blog?.seo?.description?.trim();
  if (seoDescription) return seoDescription;

  const fallbackDesc = stripHtmlTags(blog?.paragraph?.[0]?.para || "");
  return fallbackDesc ? `${fallbackDesc.slice(0, 190)}...` : "";
};

export const blogData = [...blogDetailPage]
  .sort((a, b) => b.id - a.id)
  .map((blog) => {
    const slug = formatBlogSlug(blog.routtitle || blog.title);
    const schemaAuthor = blog?.schema?.author?.[0]?.name;

    return {
      id: blog.id,
      slug,
      title: blog.title,
      desc: buildSummary(blog),
      path: `/blog/${slug}`,
      name: schemaAuthor || blog.writtenby || "",
      date: blog.date,
    };
  });
