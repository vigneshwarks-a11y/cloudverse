import { config, fields, collection } from "@keystatic/core";

/* Keystatic content schema for the /resources section (guides, docs, blog
   posts, FAQ). Storage is local-only for now — content lives in content/ and
   is committed to git like any other source file; there is no remote/cloud
   sync configured. See docs/keystatic-migration-notes.md for the mapping
   from the old lib/legacy/* data files to these collections. */

const CATEGORY_OPTIONS = [
  { label: "FinOps", value: "FinOps" },
  { label: "Allocation", value: "Allocation" },
  { label: "Anomalies", value: "Anomalies" },
  { label: "Automation", value: "Automation" },
  { label: "Tagging", value: "Tagging" },
  { label: "Developer FinOps", value: "Developer FinOps" },
  { label: "Integrations", value: "Integrations" },
  { label: "Security", value: "Security" },
] as const;

export default config({
  storage: { kind: "local" },
  collections: {
    guides: collection({
      label: "Guides",
      slugField: "title",
      path: "content/guides/*/",
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["title", "category", "featured"],
      schema: {
        title: fields.slug({ name: { label: "Title", validation: { isRequired: true } } }),
        category: fields.select({
          label: "Category",
          options: CATEGORY_OPTIONS,
          defaultValue: "FinOps",
        }),
        readingTime: fields.text({ label: "Read time", description: 'e.g. "9 min"' }),
        date: fields.date({ label: "Date" }),
        featured: fields.checkbox({ label: "Featured", defaultValue: false }),
        summary: fields.text({ label: "Description", multiline: true }),
        seoTitle: fields.text({ label: "Meta title" }),
        seoDescription: fields.text({ label: "Meta description", multiline: true }),
        seoKeywords: fields.text({ label: "Meta keywords" }),
        content: fields.markdoc({ label: "Content" }),
      },
    }),
    docs: collection({
      label: "Docs",
      slugField: "title",
      path: "content/docs/*/",
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["title", "category"],
      schema: {
        title: fields.slug({ name: { label: "Title", validation: { isRequired: true } } }),
        category: fields.select({
          label: "Category",
          options: CATEGORY_OPTIONS,
          defaultValue: "FinOps",
        }),
        summary: fields.text({ label: "Description", multiline: true }),
        content: fields.markdoc({ label: "Content" }),
      },
    }),
    blogPosts: collection({
      label: "Blog posts",
      slugField: "title",
      path: "content/blog/*/",
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["title", "category", "date", "featured"],
      schema: {
        title: fields.slug({ name: { label: "Title", validation: { isRequired: true } } }),
        category: fields.text({ label: "Category" }),
        excerpt: fields.text({ label: "Excerpt", multiline: true }),
        author: fields.text({ label: "Author" }),
        date: fields.date({ label: "Date" }),
        readingTime: fields.text({ label: "Read time" }),
        featured: fields.checkbox({ label: "Featured", defaultValue: false }),
        content: fields.markdoc({ label: "Content" }),
      },
    }),
    faqs: collection({
      label: "FAQs",
      slugField: "question",
      path: "content/faqs/*",
      format: "json",
      columns: ["question", "order"],
      schema: {
        question: fields.slug({ name: { label: "Question", validation: { isRequired: true } } }),
        answer: fields.text({ label: "Answer", multiline: true }),
        order: fields.integer({ label: "Display order", defaultValue: 1 }),
      },
    }),
  },
});
