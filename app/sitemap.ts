import type { MetadataRoute } from "next";
import { RESOURCES } from "@/lib/resources";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cloudverse.ai";

const STATIC_ROUTES = [
  "/",
  "/platform/finops",
  "/platform/aix",
  "/platform/devx",
  "/platform/datax",
  "/solutions",
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
  "/sign-up",
  "/efficiency-snapshot",
  "/legal",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: (path === "/" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
  const resourceEntries = RESOURCES.map((r) => ({
    url: `${SITE_URL}/resources/${r.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...staticEntries, ...resourceEntries];
}
