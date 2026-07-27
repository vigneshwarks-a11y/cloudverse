/* One-time migration: lib/legacy/* → Keystatic content entries under content/.
   Run with `npx tsx scripts/migrate-to-keystatic.ts`. Does not delete the
   legacy source files — this only writes new content/ files. Re-running is
   safe; it overwrites the generated files deterministically. */

import fs from "node:fs";
import path from "node:path";
import { resourcesData } from "../lib/legacy/resourcesData";
import { blogPosts } from "../lib/legacy/blogData";
import { resourcesFaqData } from "../lib/legacy/resourcesFaqData";

const ROOT = process.cwd();

function slugifyForFilename(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function yamlScalar(value: unknown): string {
  if (value === undefined || value === null) return "''";
  if (typeof value === "boolean" || typeof value === "number") return String(value);
  const str = String(value);
  // Quote anything that isn't a bare alphanumeric/space/hyphen token, since
  // colons, quotes, and leading symbols are all significant in YAML.
  const needsQuoting = str === "" || /[:#'"{}\[\]|>&*!%@`\n]/.test(str) || /^[\s-]/.test(str) || /\s$/.test(str);
  if (!needsQuoting) return str;
  return `'${str.replace(/'/g, "''")}'`;
}

// Keystatic's `format: { contentField }` folder entries are ONE file:
// frontmatter for every other field, then the designated content field's
// markdown body directly below the closing `---`. There is no separate
// content.mdoc — Keystatic fakes that path internally, backed by this same
// file's body region.
function writeEntry(dir: string, fields: Record<string, unknown>, body: string) {
  fs.mkdirSync(dir, { recursive: true });
  const lines = Object.entries(fields).map(([key, value]) => `${key}: ${yamlScalar(value)}`);
  const trimmedBody = body.trim();
  fs.writeFileSync(path.join(dir, "index.mdoc"), `---\n${lines.join("\n")}\n---\n${trimmedBody ? `${trimmedBody}\n` : ""}`);
}

/* ---- HTML(-in-JS-strings) → Markdoc/markdown conversion for guide bodies ---- */

function htmlBlockToMarkdown(html: string): string {
  let s = html;

  // Lists: <ul>/<ol> containing <li> items → markdown bullets/numbers,
  // wrapped in blank lines so they read as their own block regardless of
  // what precedes/follows them inline in the source string.
  s = s.replace(/<(ul|ol)>([\s\S]*?)<\/\1>/g, (_m, tag: string, inner: string) => {
    const items = [...inner.matchAll(/<li>([\s\S]*?)<\/li>/g)].map((m) => m[1].trim());
    const lines = items.map((item, i) => (tag === "ol" ? `${i + 1}. ${item}` : `- ${item}`));
    return `\n\n${lines.join("\n")}\n\n`;
  });

  // Bold (drops the inline color styling — markdown has no equivalent, and
  // the migration decision was clean markdown over raw-HTML passthrough).
  // `(?:\s[^>]*)?` (not `[^>]*`) is load-bearing: a bare `[^>]*` after `<b`
  // also matches `<br />`, since "br" starts with "b" too — that silently
  // swallowed every line break as a fake bold-open tag.
  s = s.replace(/<b(?:\s[^>]*)?>([\s\S]*?)<\/b>/g, "**$1**");

  // Paragraph breaks, then any leftover single breaks.
  s = s.replace(/<br\s*\/?>\s*<br\s*\/?>/g, "\n\n");
  s = s.replace(/<br\s*\/?>/g, "\n");

  // Collapse runs of blank lines the above can introduce.
  s = s.replace(/\n{3,}/g, "\n\n");

  return s.trim();
}

function guideBlockToMarkdownSection(block: string): string {
  const converted = htmlBlockToMarkdown(block);
  const breakIdx = converted.indexOf("\n\n");
  if (breakIdx === -1) return converted;
  const heading = converted.slice(0, breakIdx).trim();
  const body = converted.slice(breakIdx + 2).trim();
  return `## ${heading}\n\n${body}`;
}

function guideContentToMarkdown(blocks: string[] | undefined): string {
  if (!blocks || blocks.length === 0) return "";
  return blocks.map(guideBlockToMarkdownSection).join("\n\n");
}

/* ---------------------------------- Guides & docs --------------------------------- */

let guideCount = 0;
let docCount = 0;

for (const r of resourcesData) {
  const isGuide = r.type === "Guide";
  const dir = path.join(ROOT, "content", isGuide ? "guides" : "docs", r.slug);

  const common: Record<string, unknown> = {
    title: r.title,
    category: r.category,
    summary: r.summary ?? "",
  };

  if (isGuide) {
    writeEntry(
      dir,
      {
        ...common,
        readingTime: r.readingTime ?? "",
        date: r.date,
        featured: Boolean(r.featured),
        seoTitle: r.seo?.title ?? "",
        seoDescription: r.seo?.description ?? "",
        seoKeywords: r.seo?.keywords ?? "",
      },
      guideContentToMarkdown(r.content),
    );
    guideCount++;
  } else {
    writeEntry(dir, common, "");
    docCount++;
  }
}

/* ------------------------------------- Blog ------------------------------------ */

let blogCount = 0;

blogPosts.forEach((post, i) => {
  const dir = path.join(ROOT, "content", "blog", post.slug);
  writeEntry(
    dir,
    {
      title: post.title,
      category: post.category,
      excerpt: post.summary,
      author: post.author,
      date: post.date,
      readingTime: post.readingTime,
      // Matches the current /resources page behavior, where "featured" is
      // simulated by slicing the first 3 posts (BLOG_POSTS.slice(0, 3)).
      featured: i < 3,
    },
    "",
  );
  blogCount++;
});

/* -------------------------------------- FAQ ------------------------------------- */

let faqCount = 0;
const faqDir = path.join(ROOT, "content", "faqs");
fs.mkdirSync(faqDir, { recursive: true });

for (const faq of resourcesFaqData) {
  const filenameSlug = `${String(faq.id).padStart(3, "0")}-${slugifyForFilename(faq.question)}`;
  const json = {
    question: faq.question,
    answer: faq.answer,
    // Preserves today's implicit display order (array/document position).
    order: faq.id,
  };
  fs.writeFileSync(path.join(faqDir, `${filenameSlug}.json`), `${JSON.stringify(json, null, 2)}\n`);
  faqCount++;
}

console.log("Migration complete:");
console.log(`  guides: ${guideCount}`);
console.log(`  docs: ${docCount}`);
console.log(`  blogPosts: ${blogCount}`);
console.log(`  faqs: ${faqCount}`);
