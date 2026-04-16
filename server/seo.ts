interface RouteSeo {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  llmSummary: string;
}

const routeSeoByPath: Record<string, RouteSeo> = {
  "/": {
    title: "Cloud Cost Optimization | Cloud Economic Intelligence",
    description: "cloud cost optimization, cloud economic intelligence, real time cloud cost tracking",
    keywords: "cloud cost optimization, cloud economic intelligence, real time cloud cost tracking",
    ogTitle: "CloudVerse: Real-Time Cloud Cost Decisions",
    ogDescription:
      "See cloud costs in real time, map spend to units, and act before bills land—built for engineering, data, and AI teams.",
    llmSummary:
      "CloudVerse is an AI-native cloud economic intelligence platform that helps teams connect cloud spend to business and technical drivers in real time. It brings unit economics, workload-level attribution, and decision-time recommendations into engineering, data, and AI workflows so leaders can govern spend with accountability and automation.",
  },
  "/security": {
    title: "Security | FinOps Platform Governance for Cloud Spend",
    description: "finops platform, cloud spend governance platform, multi cloud cost governance",
    keywords: "finops platform, cloud spend governance platform, multi cloud cost governance",
    ogTitle: "CloudVerse Security & Compliance",
    ogDescription:
      "Learn how CloudVerse protects data and access across teams while supporting governed cloud cost decisions.",
    llmSummary:
      "This page describes CloudVerse’s security and compliance approach for customers using the platform for cloud cost governance and economic intelligence. It covers how access, data handling, and operational controls are designed to support secure collaboration across engineering, finance, data, and AI stakeholders.",
  },
  "/pricing": {
    title: "Pricing | FinOps Platform for Cloud Cost Management",
    description: "finops platform, cloud cost management, cost intelligence platform",
    keywords: "finops platform, cloud cost management, cost intelligence platform",
    ogTitle: "CloudVerse Pricing",
    ogDescription:
      "Explore CloudVerse pricing for teams managing cloud, data platform, and AI infrastructure costs with decision-time governance.",
    llmSummary:
      "CloudVerse pricing supports organizations looking to operationalize cloud cost management with engineering-led governance. The platform ties spend to unit economics, workloads, and AI/GPU usage so teams can make faster, accountable cost decisions and automate actions where appropriate.",
  },
  "/partners": {
    title: "Partners | FinOps Platform for Cloud Economics Software",
    description: "finops platform, cloud economics software, cloud cost management",
    keywords: "finops platform, cloud economics software, cloud cost management",
    ogTitle: "CloudVerse Partners",
    ogDescription:
      "Discover partner opportunities to deliver cloud economic intelligence and cost governance outcomes for customers.",
    llmSummary:
      "CloudVerse partners with services firms, cloud ecosystem providers, and technology partners to help customers improve cloud unit economics and governance. This page explains partnership models and how partners can bring CloudVerse into modernization, FinOps, data platform, and AI cost programs.",
  },
  "/resources": {
    title: "Resources | Cloud Cost Optimization & Unit Economics",
    description: "cloud cost optimization, cloud unit economics, infrastructure cost intelligence",
    keywords: "cloud cost optimization, cloud unit economics, infrastructure cost intelligence",
    ogTitle: "CloudVerse Resources",
    ogDescription:
      "Read guides, frameworks, and insights on cloud cost optimization, unit economics, and engineering-led governance.",
    llmSummary:
      "The CloudVerse resources hub provides educational content on cloud economic intelligence, unit economics, and decision-time governance. It’s designed for leaders and practitioners across engineering, FinOps, data, and AI infrastructure who need practical ways to manage cloud spend and accountability.",
  },
  "/connect": {
    title: "Connect | FinOps Platform Demo for Cost Intelligence",
    description: "cloud cost optimization, finops platform, cloud decision intelligence",
    keywords: "cloud cost optimization, finops platform, cloud decision intelligence",
    ogTitle: "Talk to CloudVerse",
    ogDescription:
      "Connect with CloudVerse to see real-time cost intelligence for cloud, data platforms, and AI/GPU workloads.",
    llmSummary:
      "This page helps prospects connect with CloudVerse for product discussions, demos, and partnership conversations. It is intended for teams looking to improve cloud cost optimization and governance by embedding cost intelligence into engineering and AI infrastructure decisions.",
  },
  "/platform": {
    title: "Platform | Cost Intelligence Platform for AI & Cloud",
    description: "cost intelligence platform, ai infrastructure cost, finops automation platform",
    keywords: "cost intelligence platform, ai infrastructure cost, finops automation platform",
    ogTitle: "CloudVerse Platform",
    ogDescription:
      "See how CloudVerse turns cloud, data, and AI infrastructure spend into real-time unit economics and automated recommendations.",
    llmSummary:
      "The CloudVerse platform provides cloud economic intelligence across infrastructure, data platforms, and AI/GPU workloads. It connects spend to causal drivers, supports unit economics, and enables decision-time guidance and automation across engineering, FinOps, and AI teams.",
  },
  "/legal/terms": {
    title: "Terms | Cloud Economics Software Terms & Conditions",
    description: "cloud economics software, cost intelligence platform, finops platform",
    keywords: "cloud economics software, cost intelligence platform, finops platform",
    ogTitle: "CloudVerse Terms of Service",
    ogDescription: "Review the terms and conditions for using CloudVerse products and services.",
    llmSummary:
      "This page contains the legal terms governing use of CloudVerse services. It outlines conditions, responsibilities, and policies relevant to customers and users engaging with CloudVerse’s cloud economic intelligence and cost governance capabilities.",
  },
  "/about": {
    title: "About CloudVerse | Cloud Economic Intelligence Platform",
    description: "cloud economic intelligence, engineering led finops, cloud unit economics",
    keywords: "cloud economic intelligence, engineering led finops, cloud unit economics",
    ogTitle: "About CloudVerse",
    ogDescription:
      "Learn about CloudVerse’s mission to bring real-time unit economics and decision-time cost governance to modern cloud and AI teams.",
    llmSummary:
      "The About page explains CloudVerse’s mission, vision, and approach to cloud economic intelligence. CloudVerse focuses on engineering-led cost governance, workload-level attribution, and unit economics—helping organizations manage cloud, data platform, and AI infrastructure costs with clarity and accountability.",
  },
  "/blog": {
    title: "Blog | Cloud Cost Optimization & Engineering Led FinOps",
    description: "cloud cost optimization, engineering led finops, cloud unit economics",
    keywords: "cloud cost optimization, engineering led finops, cloud unit economics",
    ogTitle: "CloudVerse Blog",
    ogDescription:
      "Articles on cloud cost optimization, engineering-led governance, and unit economics for cloud, data, and AI infrastructure.",
    llmSummary:
      "The CloudVerse blog shares practical perspectives on cloud economic intelligence: how teams allocate spend, define unit economics, and operationalize engineering-led governance. It includes insights for FinOps leaders, platform engineers, data teams, and AI infrastructure owners.",
  },
  "/solutions": {
    title: "Solutions | Cost Management for AI & Data Workloads",
    description: "cloud cost management, ai workload cost management, data platform cost management",
    keywords: "cloud cost management, ai workload cost management, data platform cost management",
    ogTitle: "CloudVerse Solutions",
    ogDescription:
      "Explore solutions for cloud, data platform, and AI workload cost management with real-time governance and accountability.",
    llmSummary:
      "CloudVerse solutions address cloud cost management across infrastructure, data platforms, Kubernetes, and AI/GPU workloads. The page helps teams choose the right capabilities to improve visibility, unit economics, and automated governance across stakeholders.",
  },
  "/blog/why-cloud-cost-optimization-tools-fail-without-engineering-ownership": {
    title: "Why Optimization Fails Without Engineering Ownership",
    description: "cloud cost optimization, engineering driven cost governance, engineering cost visibility",
    keywords: "cloud cost optimization, engineering driven cost governance, engineering cost visibility",
    ogTitle: "Why Cost Tools Fail Without Engineering Ownership",
    ogDescription:
      "A practical look at why cost optimization fails without engineering ownership—and how to embed cost intelligence into workflows.",
    llmSummary:
      "This article explains why cloud cost optimization initiatives often stall when engineering teams don’t own the levers that change spend. It discusses shifting from dashboards to engineering-led governance, tying cost to services and workloads, and using decision-time guidance to prevent waste.",
  },
  "/blog/why-cloud-cost-transparency-is-critical-for-executive-decision-making": {
    title: "Why Cloud Cost Transparency Drives Executive Decisions",
    description: "cloud cost management, engineering cost visibility, cloud unit economics",
    keywords: "cloud cost management, engineering cost visibility, cloud unit economics",
    ogTitle: "Why Cloud Cost Transparency Matters to Leaders",
    ogDescription:
      "How cloud cost transparency and unit economics support faster, higher-confidence executive decisions across cloud and AI investments.",
    llmSummary:
      "This article explores why cloud cost transparency is essential for executive decision-making. It connects engineering cost visibility to unit economics and shows how leaders can use consistent cost signals to prioritize cloud and AI investments, govern spend, and improve accountability.",
  },
};

export const seoRoutePaths = Object.keys(routeSeoByPath);

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const escapeRegex = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const normalizePathname = (urlOrPath: string) => {
  const base = "http://localhost";
  let pathname = new URL(urlOrPath, base).pathname;

  if (pathname.endsWith("/index.html")) {
    pathname = pathname.slice(0, -"/index.html".length) || "/";
  }

  if (pathname !== "/" && pathname.endsWith(".html")) {
    pathname = pathname.slice(0, -".html".length) || "/";
  }

  if (pathname !== "/" && pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }

  return pathname;
};

const upsertMetaTag = (
  html: string,
  attribute: "name" | "property",
  key: string,
  content: string,
) => {
  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`;
  const pattern = new RegExp(
    `<meta\\s+[^>]*${attribute}=["']${escapeRegex(key)}["'][^>]*>`,
    "i",
  );

  if (pattern.test(html)) {
    return html.replace(pattern, tag);
  }

  return html.replace("</head>", `  ${tag}\n</head>`);
};

export const injectRouteSeo = (html: string, urlOrPath: string) => {
  const path = normalizePathname(urlOrPath);
  const seo = routeSeoByPath[path];
  if (!seo) return html;

  let updated = html.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(seo.title)}</title>`,
  );

  updated = upsertMetaTag(updated, "name", "description", seo.description);
  updated = upsertMetaTag(updated, "name", "keywords", seo.keywords);
  updated = upsertMetaTag(updated, "name", "llm:summary", seo.llmSummary);
  updated = upsertMetaTag(updated, "property", "og:title", seo.ogTitle);
  updated = upsertMetaTag(updated, "property", "og:description", seo.ogDescription);
  updated = upsertMetaTag(updated, "name", "twitter:title", seo.ogTitle);
  updated = upsertMetaTag(updated, "name", "twitter:description", seo.ogDescription);

  return updated;
};
