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
    { label: "AIX", href: "/platform/aix", desc: "Optimizing the future of enterprise AI consumption.", color: "#6954D4", icon: "aix" },
    { label: "FinOps Platform", href: "/platform/finops", desc: "Multi-cloud cost intelligence", color: "#1664C0", icon: "finops" },
    { label: "DevX", href: "/platform/devx", desc: "Shift-left cost checks for engineering teams", color: "#0E9E7A", icon: "devx" },
    { label: "DataX", href: "/platform/datax", desc: "Warehouse spend intelligence", color: "#D97706", icon: "datax" },
  ],
  solutions: [
    { label: "FinOps Teams", href: "/solutions/finops-teams", desc: "Cloud cost ownership at scale", icon: "finops-teams" },
    { label: "AI Engineering", href: "/solutions/ai-engineering", desc: "Govern and optimize AI spend", icon: "ai-eng" },
    { label: "Platform Engineering", href: "/solutions/platform-eng", desc: "Shift-left cost into CI/CD", icon: "platform-eng" },
    { label: "Data Teams", href: "/solutions/data-teams", desc: "Warehouse cost attribution", icon: "data-teams" },
    { label: "Enterprise", href: "/solutions/enterprise", desc: "Enterprise-grade controls and support", icon: "enterprise" },
  ],
  primary: [
    { label: "Integrations", href: "/integrations" },
    { label: "Events", href: "/events" },
    { label: "Resources", href: "/resources" },
    { label: "About", href: "/about" },
  ],
} as const;
