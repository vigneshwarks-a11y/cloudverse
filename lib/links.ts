// Centralized URL configuration for CloudVerse™

export const DEMO_URL = "/connect";
export const SIGNIN_URL = "https://id.cloudverse.ai";
export const DOCS_URL = "https://docs.cloudverse.ai";

/* Deep links into the docs site, keyed by feature area. Every value is a real
   page verified against docs.cloudverse.ai/sitemap.xml — add new keys only
   after confirming the page exists. Feature sections link through this map so
   URL fixes happen in one place. */
export const DOCS = {
  aiEconomics: `${DOCS_URL}/cost-management/ai-economics/`,
  governance: `${DOCS_URL}/governance/`,
  costExplorer: `${DOCS_URL}/cost-management/cost-explorer/`,
  anomalies: `${DOCS_URL}/cost-management/anomalies/`,
  chargeback: `${DOCS_URL}/cost-management/chargeback-allocation/`,
  unitEconomics: `${DOCS_URL}/cost-management/unit-economics/`,
  optimize: `${DOCS_URL}/optimization/`,
  dataPlatform: `${DOCS_URL}/data-platform/`,
  dataOptimization: `${DOCS_URL}/automation/data-optimization/`,
  automation: `${DOCS_URL}/automation/`,
  // Closest topical match for Torb's shift-left/infra cost gates. [verify]
  infrastructure: `${DOCS_URL}/infrastructure/`,
  integrations: `${DOCS_URL}/integrations/`,
} as const;

export const PRODUCT_URLS = {
  agentry: "https://agentry.cloudverse.ai",
  torb: "https://torb.cloudverse.ai",
  datax: "https://datax.cloudverse.ai",
  billops: "https://billops.cloudverse.ai",
};

export const NAV = {
  platform: [
    { label: "FinOps Platform", href: "/platform/finops", desc: "Multi-cloud cost intelligence", color: "#1664C0", icon: "finops" },
    { label: "Torb", href: "/platform/torb", desc: "Shift-left cost checks for engineering teams", color: "#0E9E7A", icon: "torb" },
    { label: "DataX", href: "/platform/datax", desc: "Warehouse spend intelligence", color: "#D97706", icon: "datax" },
    { label: "Agentry", href: "/platform/agentry", desc: "Optimizing the future of enterprise AI consumption.", color: "#6954D4", icon: "agentry" },
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
    { label: "Resources", href: "/resources" },
    { label: "Docs", href: DOCS_URL },
    { label: "About", href: "/about" },
  ],
} as const;
