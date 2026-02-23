export type BlogPost = {
  title: string;
  slug: string;
  summary: string;
  category: string;
  readingTime: string;
  date: string;
  author: string;
};

export const blogPosts: BlogPost[] = [
  {
    title: "Why Infrastructure Economics Is the Next Frontier for AI Teams",
    slug: "infrastructure-economics-next-frontier",
    summary: "AI teams are scaling fast but without economic decision logic, every model call, every GPU hour, and every pipeline run accumulates unmanaged cost. Here's how to change that.",
    category: "AI Infrastructure",
    readingTime: "6 min",
    date: "2026-02-18",
    author: "CloudVerse Team"
  },
  {
    title: "The Hidden Cost of On-Demand: What Your Invoice Isn't Telling You",
    slug: "hidden-cost-on-demand",
    summary: "Most teams overpay by 30–60% because they default to on-demand pricing. We break down how commitment strategies and workload shaping can shift your baseline.",
    category: "Cost Optimization",
    readingTime: "8 min",
    date: "2026-02-10",
    author: "CloudVerse Team"
  },
  {
    title: "From FinOps to Infrastructure Economics: What Changed and Why",
    slug: "finops-to-infrastructure-economics",
    summary: "FinOps focused on visibility and reporting. Infrastructure economics embeds decision logic at the point of execution model choice, deployment, and procurement.",
    category: "Industry",
    readingTime: "5 min",
    date: "2026-01-28",
    author: "CloudVerse Team"
  },
  {
    title: "How DevX Catches Cost Regressions Before Production",
    slug: "devx-cost-regressions",
    summary: "Engineering changes account for the majority of cloud cost variance. DevX evaluates IaC and application code across 14+ languages to surface economic impact pre-merge.",
    category: "Developer FinOps",
    readingTime: "7 min",
    date: "2026-01-20",
    author: "CloudVerse Team"
  },
  {
    title: "Rightsizing AI Inference: Matching Models to Workloads",
    slug: "rightsizing-ai-inference",
    summary: "Not every prompt needs GPT-4. AIx evaluates cost-performance curves at runtime so teams can select the most economical model without quality regressions.",
    category: "AI Infrastructure",
    readingTime: "9 min",
    date: "2026-01-12",
    author: "CloudVerse Team"
  },
  {
    title: "Multi-Tenant Cloud Economics for Resellers and Distributors",
    slug: "multi-tenant-cloud-economics",
    summary: "Managing compute exposure across customer portfolios requires hierarchical visibility and tenant-level isolation. Here's how CloudVerse enables it.",
    category: "Multi-Tenant",
    readingTime: "6 min",
    date: "2026-01-05",
    author: "CloudVerse Team"
  },
];
