import type { MetadataRoute } from "next";
import { RESOURCES } from "@/lib/resources";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cloudverse.ai";

type RouteConfig = { path: string; priority: number; changeFreq: "weekly" | "monthly" };

const STATIC_ROUTES: RouteConfig[] = [
  { path: "/",                        priority: 1.0,  changeFreq: "weekly"  },
  { path: "/platform/finops",         priority: 0.9,  changeFreq: "monthly" },
  { path: "/platform/agentry",         priority: 0.9,  changeFreq: "monthly" },
  { path: "/platform/torb",            priority: 0.9,  changeFreq: "monthly" },
  { path: "/platform/datax",          priority: 0.9,  changeFreq: "monthly" },
  { path: "/solutions",               priority: 0.8,  changeFreq: "monthly" },
  { path: "/solutions/finops-teams",  priority: 0.8,  changeFreq: "monthly" },
  { path: "/solutions/ai-engineering",priority: 0.8,  changeFreq: "monthly" },
  { path: "/solutions/platform-eng",  priority: 0.8,  changeFreq: "monthly" },
  { path: "/solutions/data-teams",    priority: 0.8,  changeFreq: "monthly" },
  { path: "/solutions/enterprise",    priority: 0.8,  changeFreq: "monthly" },
  { path: "/integrations",            priority: 0.7,  changeFreq: "monthly" },
  { path: "/resources",               priority: 0.7,  changeFreq: "weekly"  },
  { path: "/about",                   priority: 0.7,  changeFreq: "monthly" },
  { path: "/connect",                 priority: 0.7,  changeFreq: "monthly" },
  { path: "/efficiency-snapshot",     priority: 0.6,  changeFreq: "monthly" },
  { path: "/contact",                 priority: 0.5,  changeFreq: "monthly" },
  { path: "/sign-up",                 priority: 0.5,  changeFreq: "monthly" },
  { path: "/legal",                   priority: 0.3,  changeFreq: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries = STATIC_ROUTES.map(({ path, priority, changeFreq }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: changeFreq,
    priority,
  }));
  const resourceEntries = RESOURCES.map((r) => ({
    url: `${SITE_URL}/resources/${r.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...staticEntries, ...resourceEntries];
}
