// Centralized URL configuration for CloudVerse™

export const DEMO_URL = "/connect";
export const SIGNIN_URL = "https://id.cloudverse.ai";

export const PRODUCT_URLS = {
  aix: "https://aix.cloudverse.ai",
  devx: "https://devx.cloudverse.ai",
  datax: "https://datax.cloudverse.ai",
  billops: "https://billops.cloudverse.ai",
};

export const NAV = {
  platform: [
    { label: "AIX", href: "/platform/aix", desc: "Optimizing the future of enterprise AI consumption.", color: "#6954D4", featured: true },
    { label: "FinOps Platform", href: "/platform/finops", desc: "Multi-cloud cost intelligence", color: "#1664C0" },
    { label: "DevX", href: "/platform/devx", desc: "Shift-left cost checks", color: "#0E9E7A" },
    { label: "DataX", href: "/platform/datax", desc: "Warehouse intelligence", color: "#D97706" },
  ],
  solutions: [
    { label: "FinOps Teams", href: "/solutions/finops-teams" },
    { label: "AI Engineering", href: "/solutions/ai-engineering" },
    { label: "Platform Engineering", href: "/solutions/platform-eng" },
    { label: "Data Teams", href: "/solutions/data-teams" },
    { label: "Enterprise", href: "/solutions/enterprise" },
  ],
  primary: [
    { label: "Integrations", href: "/integrations" },
    { label: "Events", href: "/events" },
    { label: "Resources", href: "/resources" },
    { label: "About", href: "/about" },
  ],
} as const;
