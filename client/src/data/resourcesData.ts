export type Resource = {
  type: "Guide" | "Doc";
  title: string;
  slug: string;
  summary: string;
  category: "FinOps" | "Allocation" | "Anomalies" | "Automation" | "Tagging" | "Developer FinOps" | "Integrations" | "Security";
  readingTime?: string;
  date?: string;
  featured?: boolean;
  content?: string[];
};

export const resourcesData: Resource[] = [
  // Guides
  {
    type: "Guide",
    title: "Getting Started with Cloud Cost Visibility",
    slug: "getting-started-cloud-cost-visibility",
    summary: "Learn how to establish baseline visibility across multi-cloud environments.",
    category: "FinOps",
    readingTime: "8 min",
    date: "2024-12-15",
    featured: true,
    content: [
      "Visibility is the foundation of any FinOps practice. Before you can optimize, allocate, or automate, you need to understand what you're spending and where.",
      "This guide walks through the essential steps for connecting your cloud billing data and establishing a single source of truth for cost reporting.",
      "We cover best practices for AWS Cost and Usage Reports, Azure Cost Management exports, and GCP BigQuery billing exports.",
      "By the end, you'll have a clear picture of your cloud spend across providers, accounts, and services."
    ]
  },
  {
    type: "Guide",
    title: "Building an Effective Tagging Strategy",
    slug: "effective-tagging-strategy",
    summary: "Design a tagging taxonomy that scales with your organization.",
    category: "Tagging",
    readingTime: "10 min",
    date: "2024-12-10",
    featured: true,
    content: [
      "Tags are the foundation of accurate cost allocation. A well-designed tagging strategy enables attribution to teams, projects, and cost centers.",
      "This guide covers the essential tags every organization needs, common pitfalls to avoid, and strategies for enforcing tag compliance.",
      "We'll walk through examples from Finance, Engineering, and Platform team perspectives.",
      "You'll leave with a practical taxonomy you can implement immediately."
    ]
  },
  {
    type: "Guide",
    title: "Setting Up Accurate Cost Allocation",
    slug: "accurate-cost-allocation",
    summary: "Move from visibility to accountability with team-level chargeback.",
    category: "Allocation",
    readingTime: "12 min",
    date: "2024-12-05",
    featured: true,
    content: [
      "Cost allocation turns visibility into accountability. When teams see their costs, behavior changes.",
      "This guide explains how to set up allocation rules that map cloud spend to business dimensions like teams, products, and environments.",
      "We cover handling shared costs, untagged resources, and Kubernetes workload attribution.",
      "The goal is a chargeback model that's accurate, fair, and actionable."
    ]
  },
  {
    type: "Guide",
    title: "Detecting and Responding to Cost Anomalies",
    slug: "detecting-cost-anomalies",
    summary: "Catch unexpected spend before it becomes a problem.",
    category: "Anomalies",
    readingTime: "7 min",
    date: "2024-11-28",
    content: [
      "Cost anomalies (unexpected spikes or drops in spend) can indicate misconfigurations, runaway processes, or security incidents.",
      "This guide explains how anomaly detection works and how to configure alerts that are actionable rather than noisy.",
      "We cover setting baselines, tuning sensitivity, and building response playbooks.",
      "The result is early warning for cost issues before they hit your bill."
    ]
  },
  {
    type: "Guide",
    title: "Automating Cost Optimization Actions",
    slug: "automating-cost-optimization",
    summary: "Move from recommendations to automated savings with guardrails.",
    category: "Automation",
    readingTime: "9 min",
    date: "2024-11-20",
    content: [
      "Optimization recommendations are only valuable if they're acted upon. Automation closes the loop.",
      "This guide covers safe automation patterns for rightsizing, scheduling, and resource cleanup.",
      "We explain how guardrails and approval workflows protect against unintended changes.",
      "You'll learn how to start small and scale automation as confidence grows."
    ]
  },
  {
    type: "Guide",
    title: "FinOps for Engineering Teams",
    slug: "finops-for-engineering",
    summary: "Practical cost awareness for developers and platform engineers.",
    category: "Developer FinOps",
    readingTime: "6 min",
    date: "2024-11-15",
    content: [
      "FinOps isn't just for Finance. Engineering teams play a critical role in cost efficiency.",
      "This guide provides practical tips for developers to understand their cost footprint and make cost-aware decisions.",
      "We cover reading cost reports, understanding unit economics, and integrating cost into CI/CD.",
      "The goal is cost-conscious engineering without slowing down delivery."
    ]
  },
  {
    type: "Guide",
    title: "Connecting Cloud Provider Integrations",
    slug: "connecting-cloud-integrations",
    summary: "Step-by-step setup for AWS, Azure, GCP, and more.",
    category: "Integrations",
    readingTime: "5 min",
    date: "2024-11-10",
    content: [
      "Integrations are the data pipelines that power your FinOps platform.",
      "This guide walks through the setup process for major cloud providers, including permissions and export configuration.",
      "We cover best practices for read-only access and least-privilege scoping.",
      "By the end, you'll have connected your first data source and be ready for visibility."
    ]
  },
  {
    type: "Guide",
    title: "Kubernetes Cost Attribution",
    slug: "kubernetes-cost-attribution",
    summary: "Allocate container costs to namespaces, teams, and applications.",
    category: "Allocation",
    readingTime: "11 min",
    date: "2024-11-05",
    content: [
      "Kubernetes adds complexity to cost allocation. Containers share nodes, and traditional tagging doesn't apply.",
      "This guide explains how to attribute Kubernetes costs using namespace labels, pod annotations, and resource requests.",
      "We cover agent deployment, metric collection, and allocation methodologies.",
      "The result is accurate container cost attribution that integrates with your overall FinOps practice."
    ]
  },
  {
    type: "Guide",
    title: "Implementing RBAC for FinOps Data",
    slug: "implementing-rbac-finops",
    summary: "Control who sees what with role-based access controls.",
    category: "Security",
    readingTime: "6 min",
    date: "2024-10-28",
    content: [
      "Not everyone should see all cost data. RBAC enables appropriate access based on roles and responsibilities.",
      "This guide covers setting up workspaces, defining roles, and mapping users to appropriate access levels.",
      "We explain how to balance transparency with governance requirements.",
      "The goal is a secure, compliant FinOps environment that enables collaboration."
    ]
  },
  {
    type: "Guide",
    title: "Managing Databricks and Data Platform Costs",
    slug: "managing-databricks-costs",
    summary: "Visibility and optimization for analytics and data workloads.",
    category: "FinOps",
    readingTime: "8 min",
    date: "2024-10-20",
    content: [
      "Data platforms like Databricks represent a significant and growing share of cloud spend.",
      "This guide explains how to gain visibility into compute costs, storage, and job-level attribution.",
      "We cover optimization strategies specific to data workloads, including cluster sizing and job scheduling.",
      "The result is a complete picture of your data platform costs alongside traditional cloud spend."
    ]
  },
  {
    type: "Guide",
    title: "Forecasting Cloud Spend",
    slug: "forecasting-cloud-spend",
    summary: "Build accurate forecasts for budgeting and planning.",
    category: "FinOps",
    readingTime: "7 min",
    date: "2024-10-15",
    content: [
      "Accurate forecasting enables better budgeting, capacity planning, and stakeholder communication.",
      "This guide covers forecasting methodologies, from simple trend analysis to more sophisticated predictive models.",
      "We explain how to account for seasonality, growth, and one-time events.",
      "You'll learn how to build forecasts that are useful for Finance and credible to leadership."
    ]
  },
  {
    type: "Guide",
    title: "AI and GPU Cost Management",
    slug: "ai-gpu-cost-management",
    summary: "Track and optimize costs for AI workloads and GPU compute.",
    category: "FinOps",
    readingTime: "9 min",
    date: "2024-10-10",
    content: [
      "AI workloads and GPU compute are among the fastest-growing cost categories in enterprise cloud spend.",
      "This guide covers visibility strategies for AI platforms, including OpenAI API usage and GPU instance costs.",
      "We explain allocation challenges unique to AI workloads and how to address them.",
      "The goal is cost-conscious AI development without limiting innovation."
    ]
  },

  // Docs
  {
    type: "Doc",
    title: "Documentation Overview",
    slug: "overview",
    summary: "Start here for a complete guide to CloudVerse documentation.",
    category: "FinOps"
  },
  {
    type: "Doc",
    title: "API Reference",
    slug: "api-reference",
    summary: "Complete API documentation for programmatic access.",
    category: "Integrations"
  },
  {
    type: "Doc",
    title: "Integrations Setup",
    slug: "integrations-setup",
    summary: "Connect cloud providers, data platforms, and identity systems.",
    category: "Integrations"
  },
  {
    type: "Doc",
    title: "Security Overview",
    slug: "security-overview",
    summary: "Security architecture, access controls, and compliance.",
    category: "Security"
  },
  {
    type: "Doc",
    title: "Role-Based Access Control",
    slug: "rbac",
    summary: "Configure workspaces, roles, and user permissions.",
    category: "Security"
  },
  {
    type: "Doc",
    title: "Data Model",
    slug: "data-model",
    summary: "Understand cost dimensions, allocation rules, and reporting structures.",
    category: "Allocation"
  },
  {
    type: "Doc",
    title: "Exports and Reporting",
    slug: "exports-reporting",
    summary: "Export data for external systems and custom reporting.",
    category: "FinOps"
  },
  {
    type: "Doc",
    title: "Automation Configuration",
    slug: "automation-config",
    summary: "Set up automated actions, guardrails, and approval workflows.",
    category: "Automation"
  }
];

export const guides = resourcesData.filter(r => r.type === "Guide");
export const docs = resourcesData.filter(r => r.type === "Doc");
export const featuredGuides = guides.filter(r => r.featured);
export const categories = ["FinOps", "Allocation", "Anomalies", "Automation", "Tagging", "Developer FinOps", "Integrations", "Security"] as const;
