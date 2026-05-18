import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cloudverse.ai";

const ROUTES = [
  "/",
  "/platform/finops",
  "/platform/aix",
  "/platform/devx",
  "/platform/datax",
  "/solutions/finops-teams",
  "/solutions/ai-engineering",
  "/solutions/platform-eng",
  "/solutions/data-teams",
  "/solutions/enterprise",
  "/integrations",
  "/events",
  "/resources",
  "/about",
  "/connect",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
