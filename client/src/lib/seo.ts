type MetaAttribute = "name" | "property";

export interface PageSeoConfig {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  llmSummary: string;
}

const PAGE_SEO_FLAG = "data-page-seo";

const upsertMetaTag = (attribute: MetaAttribute, key: string, content?: string) => {
  if (typeof document === "undefined") return;

  const managedSelector = `meta[${attribute}="${key}"][${PAGE_SEO_FLAG}="true"]`;
  const baseSelector = `meta[${attribute}="${key}"]:not([data-blog-seo="true"]):not([data-guide-seo="true"])`;

  let element = document.querySelector(managedSelector) as HTMLMetaElement | null;
  const isManagedElement = !!element;

  if (!element) {
    element = document.querySelector(baseSelector) as HTMLMetaElement | null;
  }

  if (!content) {
    if (isManagedElement) {
      element?.remove();
    }
    return;
  }

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    element.setAttribute(PAGE_SEO_FLAG, "true");
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

export const clearPageSeo = () => {
  if (typeof document === "undefined") return;
  document
    .querySelectorAll(`meta[${PAGE_SEO_FLAG}="true"]`)
    .forEach((node) => node.remove());
};

export const applyPageSeo = (config: PageSeoConfig) => {
  if (typeof document === "undefined") return;

  document.title = config.title;

  upsertMetaTag("name", "description", config.description);
  upsertMetaTag("name", "keywords", config.keywords);
  upsertMetaTag("name", "llm:summary", config.llmSummary);

  upsertMetaTag("property", "og:title", config.ogTitle);
  upsertMetaTag("property", "og:description", config.ogDescription);

  upsertMetaTag("name", "twitter:title", config.ogTitle);
  upsertMetaTag("name", "twitter:description", config.ogDescription);
};
