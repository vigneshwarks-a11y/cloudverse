import { blogDetailPage } from "./blogdata";

const stripHtmlTags = (value = "") =>
  value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

const truncateWithEllipsis = (value = "", limit = 190) => {
  const content = value.trim();
  if (!content) return "";
  if (content.length <= limit) return `${content}...`;
  return `${content.slice(0, limit).trim()}...`;
};

export const formatBlogSlug = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const buildSummary = (blog) => {
  const firstParagraph = stripHtmlTags(blog?.paragraph?.[0]?.para || "");
  return truncateWithEllipsis(firstParagraph, 190);
};

export const blogData = [...blogDetailPage]
  .filter((blog) => !(blog.id >= 28 && blog.id <= 36))
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
