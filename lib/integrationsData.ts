export type Integration = {
  id: string;
  name: string;
  aliases?: string[];
  category: "Cloud" | "Data" | "AI" | "Kubernetes" | "Infrastructure" | "Identity" | "Ticketing" | "Collaboration" | "Observability" | "SaaS";
  status: "Available" | "Beta" | "Coming soon";
  short: string;
  whatWeIngest: string[];
  outputs: string[];
  setup: {
    method: string;
    timeToValue: string;
    permissions: string;
    docsUrl?: string;
  };
  logo?: {
    src: string;
    alt: string;
    invert?: boolean;
  };
  products?: ("Agentry" | "Torb" | "DataX")[];
};

export const integrationsData: Integration[] = [
  // Cloud Providers - Available
  {
    id: "aws",
    name: "AWS",
    category: "Cloud",
    status: "Available",
    products: ["Agentry", "Torb", "DataX"],
    short: "Billing and usage ingestion with allocation dimensions.",
    logo: { src: "/logos/aws.svg", alt: "AWS" },
    whatWeIngest: [
      "Cost and Usage Report data with resource tags",
      "Multi-account and cross-region billing",
      "Reserved instance and savings plans",
      "Cost anomalies and optimization opportunities"
    ],
    outputs: [
      "Cost reporting by service, account, and tag",
      "Allocation dimensions for chargeback",
      "Detected and predicted anomalies",
      "Automation paths for cost optimization"
    ],
    setup: {
      method: "Read-only API + CUR export",
      timeToValue: "15–30 minutes",
      permissions: "Read-only, scoped to billing, usage, and tags",
      docsUrl: "/resources/guides/aws-setup"
    }
  },
  {
    id: "azure",
    name: "Microsoft Azure",
    aliases: ["Azure"],
    category: "Cloud",
    status: "Available",
    products: ["Agentry", "Torb", "DataX"],
    short: "Billing, subscriptions, and cost dimensions across tenants.",
    logo: { src: "/logos/azure.svg", alt: "Microsoft Azure" },
    whatWeIngest: [
      "Cost Management API and billing exports",
      "Subscriptions and resource groups",
      "Reserved instances and savings plans",
      "Tags and cost allocation rules"
    ],
    outputs: [
      "Cost reporting by subscription and resource group",
      "Allocation by business unit and environment",
      "Anomaly detection on spend trends",
      "Automation for resource management"
    ],
    setup: {
      method: "Read-only API + billing export support",
      timeToValue: "20–40 minutes",
      permissions: "Read-only, scoped to Cost Management and Resource Graph",
      docsUrl: "/resources/guides/azure-setup"
    }
  },
  {
    id: "gcp",
    name: "Google Cloud",
    aliases: ["GCP"],
    category: "Cloud",
    status: "Available",
    products: ["Agentry", "Torb", "DataX"],
    short: "Billing and usage via BigQuery-backed exports and APIs.",
    logo: { src: "/logos/gcp.svg", alt: "Google Cloud" },
    whatWeIngest: [
      "BigQuery billing export data",
      "Committed use discounts and pricing",
      "Resource labels and project metadata",
      "Usage across compute, storage, and networking"
    ],
    outputs: [
      "Cost reporting by project and service",
      "Allocation by label and cost center",
      "Anomaly detection on usage patterns",
      "Automation for commitment-based optimization"
    ],
    setup: {
      method: "Read-only API + BigQuery billing export",
      timeToValue: "15–30 minutes",
      permissions: "Read-only, scoped to billing project and BigQuery",
      docsUrl: "/resources/guides/gcp-setup"
    }
  },
  {
    id: "oracle-oci",
    name: "Oracle Cloud Infrastructure",
    aliases: ["OCI"],
    category: "Cloud",
    status: "Available",
    products: ["Agentry", "Torb", "DataX"],
    short: "Billing and usage across tenancy compartments.",
    logo: { src: "/logos/oci.svg", alt: "Oracle Cloud" },
    whatWeIngest: [
      "OCI billing and metering APIs",
      "Compartment and resource tagging",
      "Billing summary and itemized costs",
      "Service usage and subscriptions"
    ],
    outputs: [
      "Cost reporting by compartment and service",
      "Allocation by tag and business unit",
      "Anomaly detection on spend",
      "Optimization recommendations"
    ],
    setup: {
      method: "Read-only API",
      timeToValue: "20–35 minutes",
      permissions: "Read-only, scoped to billing and compartment inspection"
    }
  },
  {
    id: "alibaba-cloud",
    name: "Alibaba Cloud",
    aliases: ["AliCloud", "Alibaba"],
    category: "Cloud",
    status: "Available",
    products: ["Agentry", "Torb", "DataX"],
    short: "Billing and usage ingestion for multi-cloud visibility.",
    logo: { src: "/logos/alibaba.svg", alt: "Alibaba Cloud" },
    whatWeIngest: [
      "Billing and metering APIs",
      "Resource tagging and metadata",
      "Multi-account and multi-region data",
      "Cost allocation rules"
    ],
    outputs: [
      "Cost reporting by account and service",
      "Allocation by business dimension",
      "Anomaly detection",
      "Optimization paths"
    ],
    setup: {
      method: "Read-only API",
      timeToValue: "15–30 minutes",
      permissions: "Read-only, scoped to billing and resources"
    }
  },
  {
    id: "huawei-cloud",
    name: "Huawei Cloud",
    category: "Cloud",
    status: "Available",
    products: ["Agentry", "Torb", "DataX"],
    short: "Billing and usage ingestion for enterprise reporting.",
    logo: { src: "/logos/huawei.svg", alt: "Huawei Cloud" },
    whatWeIngest: [
      "Cloud billing and cost APIs",
      "Resource inventory and tagging",
      "Usage metrics and subscriptions",
      "Multi-account support"
    ],
    outputs: [
      "Cost reporting by service and account",
      "Allocation and chargeback",
      "Anomaly detection",
      "Optimization recommendations"
    ],
    setup: {
      method: "Read-only API",
      timeToValue: "15–30 minutes",
      permissions: "Read-only, scoped to billing and usage"
    }
  },
  {
    id: "tencent-cloud",
    name: "Tencent Cloud",
    category: "Cloud",
    status: "Available",
    products: ["Agentry", "Torb", "DataX"],
    short: "Billing and usage ingestion across accounts and regions.",
    logo: { src: "/logos/tencent.svg", alt: "Tencent Cloud" },
    whatWeIngest: [
      "Billing and metering APIs",
      "Cost allocation data",
      "Multi-account and regional usage",
      "Service consumption and tags"
    ],
    outputs: [
      "Cost reporting by account and service",
      "Allocation by business unit",
      "Anomaly detection",
      "Optimization insights"
    ],
    setup: {
      method: "Read-only API",
      timeToValue: "15–30 minutes",
      permissions: "Read-only, scoped to billing and resources"
    }
  },

  // Data - Available
  {
    id: "databricks",
    name: "Databricks",
    category: "Data",
    status: "Available",
    products: ["DataX"],
    short: "Workspace usage and compute costs for analytics spend.",
    logo: { src: "/logos/databricks.svg", alt: "Databricks" },
    whatWeIngest: [
      "Workspace and cluster metrics",
      "Compute hours and SKU data",
      "Job execution logs and costs",
      "SQL warehouse usage"
    ],
    outputs: [
      "Cost reporting by workspace and cluster",
      "Team-level allocation",
      "Usage anomalies and waste detection",
      "Optimization recommendations"
    ],
    setup: {
      method: "Read-only API",
      timeToValue: "15–20 minutes",
      permissions: "Read-only access to workspace and billing APIs"
    }
  },

  // Data - Coming Soon
  {
    id: "snowflake",
    name: "Snowflake",
    category: "Data",
    status: "Coming soon",
    products: ["DataX"],
    short: "Warehouse consumption and credits for data spend.",
    logo: { src: "/logos/snowflake.svg", alt: "Snowflake" },
    whatWeIngest: [
      "Account usage views and query costs",
      "Storage metrics and capacity",
      "Compute credit consumption",
      "User and role metadata"
    ],
    outputs: [
      "Cost reporting by warehouse and team",
      "Allocation by business function",
      "Query-level cost analysis",
      "Optimization recommendations"
    ],
    setup: {
      method: "Read-only user + account usage views",
      timeToValue: "20–30 minutes",
      permissions: "Read-only, scoped to account usage and information schemas"
    }
  },

  // AI - Available
  {
    id: "openai",
    name: "OpenAI",
    category: "AI",
    status: "Available",
    products: ["Agentry"],
    short: "API usage, token consumption, and cost signals.",
    logo: { src: "/logos/openai.svg", alt: "OpenAI" },
    whatWeIngest: [
      "API usage and request counts",
      "Token consumption by model",
      "Error rates and latency metrics",
      "Organization and project-level data"
    ],
    outputs: [
      "Cost reporting by model and endpoint",
      "Team and project-level allocation",
      "Usage anomalies and waste",
      "Optimization for prompt efficiency"
    ],
    setup: {
      method: "Read-only API",
      timeToValue: "10–15 minutes",
      permissions: "Read-only, scoped to usage and billing APIs"
    }
  },

  // Kubernetes - Available
  {
    id: "kubernetes",
    name: "Kubernetes",
    category: "Kubernetes",
    status: "Available",
    products: ["Torb"],
    short: "Cluster usage and workload attribution via agent.",
    logo: { src: "/logos/kubernetes.svg", alt: "Kubernetes" },
    whatWeIngest: [
      "Node and pod metrics from Prometheus",
      "Container resource requests and limits",
      "Namespace and label data",
      "Egress and storage metrics"
    ],
    outputs: [
      "Cost reporting by namespace and workload",
      "Team and application-level allocation",
      "Right-sizing recommendations",
      "Automation for resource management"
    ],
    setup: {
      method: "Agent",
      timeToValue: "30–45 minutes",
      permissions: "Agent with minimal telemetry, read-only access to cluster metrics"
    }
  },

  {
    id: "openshift",
    name: "OpenShift",
    category: "Kubernetes",
    status: "Available",
    products: ["Torb"],
    short: "Cluster and namespace attribution for enterprise platforms.",
    logo: { src: "/logos/openshift.svg", alt: "OpenShift" },
    whatWeIngest: [
      "Cluster and node metrics",
      "Namespace and project data",
      "Pod and container resource usage",
      "User and team assignments"
    ],
    outputs: [
      "Cost reporting by namespace and team",
      "Project-level allocation",
      "Workload optimization recommendations",
      "Automation for workload management"
    ],
    setup: {
      method: "Agent",
      timeToValue: "30–45 minutes",
      permissions: "Agent with read-only access to cluster and project data"
    }
  },

  // Infrastructure - Available
  {
    id: "vcenter",
    name: "vCenter",
    aliases: ["VMware"],
    category: "Infrastructure",
    status: "Available",
    products: ["Torb"],
    short: "Virtual infrastructure inventory and usage attribution.",
    logo: { src: "/logos/vcenter.svg", alt: "vCenter" },
    whatWeIngest: [
      "VM and host inventory",
      "Resource utilization metrics",
      "Tags and custom attributes",
      "Cluster and datacenter data"
    ],
    outputs: [
      "Cost reporting by VM and business unit",
      "Right-sizing and optimization paths",
      "Resource utilization analysis",
      "Chargeback and allocation"
    ],
    setup: {
      method: "Read-only API",
      timeToValue: "20–30 minutes",
      permissions: "Read-only, scoped to inventory and metrics"
    }
  },

  // Identity - Available
  {
    id: "oauth-microsoft",
    name: "OAuth: Microsoft",
    category: "Identity",
    status: "Available",
    products: ["Torb"],
    short: "SSO via Microsoft OAuth for secure login.",
    logo: { src: "/logos/microsoft-oauth.svg", alt: "Microsoft OAuth" },
    whatWeIngest: [
      "User identity and attributes",
      "Organization and tenant data",
      "Group and role assignments",
      "Session and authentication logs"
    ],
    outputs: [
      "User-based cost allocation",
      "Team and department attribution",
      "Access control and policy enforcement",
      "Compliance and audit trails"
    ],
    setup: {
      method: "OAuth2 integration",
      timeToValue: "10–15 minutes",
      permissions: "Read-only, scoped to user identity and attributes"
    }
  },

  {
    id: "oauth-google",
    name: "OAuth: Google",
    category: "Identity",
    status: "Available",
    products: ["Torb"],
    short: "SSO via Google OAuth for secure login.",
    logo: { src: "/logos/google-oauth.svg", alt: "Google OAuth" },
    whatWeIngest: [
      "User identity and profile data",
      "Organization and workspace data",
      "Group and role assignments",
      "Session and sign-in logs"
    ],
    outputs: [
      "User-based cost allocation",
      "Team attribution",
      "Access control and policy enforcement",
      "Audit trails"
    ],
    setup: {
      method: "OAuth2 integration",
      timeToValue: "10–15 minutes",
      permissions: "Read-only, scoped to user identity"
    }
  },

  {
    id: "entra-id",
    name: "Microsoft Entra ID",
    aliases: ["Azure AD"],
    category: "Identity",
    status: "Available",
    products: ["Torb"],
    short: "Directory sync for identity-based allocation and access control.",
    logo: { src: "/logos/entra.svg", alt: "Microsoft Entra ID" },
    whatWeIngest: [
      "User and group metadata",
      "Role assignments and permissions",
      "Tenant and domain configuration",
      "Directory sync data"
    ],
    outputs: [
      "Team-based cost allocation",
      "Department and cost center mapping",
      "Access control and audit trails",
      "Compliance reporting"
    ],
    setup: {
      method: "Read-only API",
      timeToValue: "15–25 minutes",
      permissions: "Read-only, scoped to directory and user data"
    }
  },

  // Ticketing - Available
  {
    id: "jira",
    name: "Jira",
    category: "Ticketing",
    status: "Available",
    products: ["Torb"],
    short: "Tickets and ownership context for allocation and ops.",
    logo: { src: "/logos/jira.svg", alt: "Jira" },
    whatWeIngest: [
      "Project and issue metadata",
      "Epic and story tracking",
      "Sprint and team assignment",
      "Custom field and status data"
    ],
    outputs: [
      "Cost allocation by project and epic",
      "Team-level attribution",
      "ROI and delivery cost analysis",
      "Automation for issue-based workflows"
    ],
    setup: {
      method: "Read-only API",
      timeToValue: "15–20 minutes",
      permissions: "Read-only, scoped to projects and issues"
    }
  },

  {
    id: "servicenow",
    name: "ServiceNow",
    category: "Ticketing",
    status: "Available",
    products: ["Torb"],
    short: "ITSM + ownership context for accountability and workflow integration.",
    logo: { src: "/logos/servicenow.svg", alt: "ServiceNow" },
    whatWeIngest: [
      "Configuration items and CMDB data",
      "Incident and change tracking",
      "Service and SLA metrics",
      "Custom records and workflows"
    ],
    outputs: [
      "Service-level cost allocation",
      "IT cost attribution and chargeback",
      "Compliance and audit reporting",
      "Automation for provisioning and deprovisioning"
    ],
    setup: {
      method: "Read-only API",
      timeToValue: "20–30 minutes",
      permissions: "Read-only, scoped to CMDB and service data"
    }
  },

  // Collaboration - Available
  {
    id: "slack",
    name: "Slack",
    category: "Collaboration",
    status: "Available",
    products: ["Torb"],
    short: "Alerts and notifications delivery for anomalies and automation.",
    logo: { src: "/logos/slack.svg", alt: "Slack" },
    whatWeIngest: [
      "Workspace and channel metadata",
      "Team and user information",
      "Notification and event logs",
      "Integration activity data"
    ],
    outputs: [
      "Real-time cost anomaly alerts",
      "Automation approval workflows",
      "Team-based notifications",
      "Compliance and policy alerts"
    ],
    setup: {
      method: "Webhook",
      timeToValue: "10–15 minutes",
      permissions: "Webhook integration, no data ingestion"
    }
  },

  {
    id: "microsoft-teams",
    name: "Microsoft Teams",
    category: "Collaboration",
    status: "Available",
    products: ["Torb"],
    short: "Notifications and approvals for automation workflows.",
    logo: { src: "/logos/teams.svg", alt: "Microsoft Teams" },
    whatWeIngest: [
      "Organization and team data",
      "Channel and user information",
      "Message and notification logs",
      "Integration activity"
    ],
    outputs: [
      "Real-time cost alerts and anomalies",
      "Automation approval workflows",
      "Team notifications and updates",
      "Policy enforcement alerts"
    ],
    setup: {
      method: "Webhook",
      timeToValue: "10–15 minutes",
      permissions: "Webhook integration, no data ingestion"
    }
  },

  // Observability - Available
  {
    id: "cloud-monitoring",
    name: "Cloud Monitoring",
    aliases: ["CloudWatch", "Azure Monitor", "Google Monitoring", "GCP Monitoring", "Ops Suite"],
    category: "Observability",
    status: "Available",
    products: ["Torb"],
    short: "Signals from major cloud monitoring suites.",
    logo: { src: "/logos/cloud-monitoring.svg", alt: "Cloud Monitoring" },
    whatWeIngest: [
      "CloudWatch metrics and usage signals",
      "Azure Monitor signals for resources and services",
      "Google Cloud Monitoring / Ops Suite signals"
    ],
    outputs: [
      "Faster anomaly investigation",
      "Enriched recommendations and automation guardrails",
      "Ops-level alerts alongside economic context"
    ],
    setup: {
      method: "Read-only API",
      timeToValue: "15–30 minutes",
      permissions: "Read-only, scoped to monitoring signals"
    }
  },

  // SaaS - Coming Soon
  {
    id: "top-saas",
    name: "Top SaaS (Top 10)",
    category: "SaaS",
    status: "Coming soon",
    products: ["Torb"],
    short: "Key SaaS spend and usage normalization.",
    logo: { src: "/logos/saas.svg", alt: "SaaS" },
    whatWeIngest: [
      "Billing and subscription data",
      "Usage and feature consumption",
      "License and seat allocation",
      "Cost and pricing metadata"
    ],
    outputs: [
      "SaaS cost reporting and allocation",
      "License utilization analysis",
      "Spend anomalies and optimization",
      "Compliance reporting"
    ],
    setup: {
      method: "APIs vary by vendor",
      timeToValue: "20–40 minutes",
      permissions: "Read-only, scoped to billing and usage"
    }
  },

  // Agentry - Coming Soon (AI Providers)
  {
    id: "anthropic",
    name: "Anthropic",
    category: "AI",
    status: "Coming soon",
    products: ["Agentry"],
    short: "Claude API usage and cost attribution for model economics.",
    logo: { src: "/logos/saas.svg", alt: "Anthropic" },
    whatWeIngest: [
      "API usage and request volumes",
      "Token consumption by model variant",
      "Latency and error metrics",
      "Organization-level billing data"
    ],
    outputs: [
      "Cost reporting by model and use case",
      "Cost-performance curve analysis",
      "Usage anomaly detection",
      "Routing optimization recommendations"
    ],
    setup: {
      method: "Read-only API",
      timeToValue: "10–15 minutes",
      permissions: "Read-only, scoped to usage and billing"
    }
  },
  {
    id: "azure-openai",
    name: "Azure OpenAI",
    category: "AI",
    status: "Coming soon",
    products: ["Agentry"],
    short: "Managed OpenAI deployment cost and usage signals.",
    logo: { src: "/logos/azure.svg", alt: "Azure OpenAI" },
    whatWeIngest: [
      "Deployment and model usage metrics",
      "Token consumption and throughput",
      "Provisioned capacity utilization",
      "Regional deployment data"
    ],
    outputs: [
      "Cost reporting by deployment and model",
      "Capacity utilization analysis",
      "Cost-performance optimization paths",
      "Routing and scaling recommendations"
    ],
    setup: {
      method: "Read-only API",
      timeToValue: "15–20 minutes",
      permissions: "Read-only, scoped to Azure OpenAI resources"
    }
  },
  {
    id: "aws-bedrock",
    name: "AWS Bedrock",
    category: "AI",
    status: "Coming soon",
    products: ["Agentry"],
    short: "Foundation model invocation costs and usage attribution.",
    logo: { src: "/logos/aws.svg", alt: "AWS Bedrock" },
    whatWeIngest: [
      "Model invocation counts and latency",
      "Token usage by foundation model",
      "Provisioned throughput metrics",
      "Cross-account usage data"
    ],
    outputs: [
      "Cost reporting by model and workload",
      "Foundation model cost comparison",
      "Usage anomaly detection",
      "Commitment and throughput optimization"
    ],
    setup: {
      method: "Read-only API",
      timeToValue: "15–20 minutes",
      permissions: "Read-only, scoped to Bedrock usage and billing"
    }
  },
  {
    id: "google-vertex-ai",
    name: "Google Vertex AI",
    category: "AI",
    status: "Coming soon",
    products: ["Agentry"],
    short: "Vertex AI model and pipeline cost attribution.",
    logo: { src: "/logos/gcp.svg", alt: "Google Vertex AI" },
    whatWeIngest: [
      "Model endpoint usage and prediction counts",
      "Training job costs and duration",
      "Pipeline execution metrics",
      "Auto-scaling and resource utilization"
    ],
    outputs: [
      "Cost reporting by model and pipeline",
      "Training vs. inference cost breakdown",
      "Resource utilization analysis",
      "Optimization recommendations"
    ],
    setup: {
      method: "Read-only API",
      timeToValue: "15–20 minutes",
      permissions: "Read-only, scoped to Vertex AI resources"
    }
  },

  // Torb - Coming Soon (Dev workflow)
  {
    id: "github",
    name: "GitHub",
    category: "SaaS",
    status: "Coming soon",
    products: ["Torb"],
    short: "PR-level economic gates and infrastructure change detection.",
    logo: { src: "/logos/saas.svg", alt: "GitHub" },
    whatWeIngest: [
      "Pull request metadata and diffs",
      "Repository and branch information",
      "CI/CD workflow execution data",
      "Team and contributor assignments"
    ],
    outputs: [
      "PR-level cost impact estimates",
      "Economic gate enforcement on merges",
      "Infrastructure change cost attribution",
      "Team-level deployment cost tracking"
    ],
    setup: {
      method: "GitHub App or OAuth",
      timeToValue: "10–15 minutes",
      permissions: "Read-only, scoped to repository and PR data"
    }
  },
  {
    id: "gitlab",
    name: "GitLab",
    category: "SaaS",
    status: "Coming soon",
    products: ["Torb"],
    short: "Merge request gates and pipeline cost attribution.",
    logo: { src: "/logos/saas.svg", alt: "GitLab" },
    whatWeIngest: [
      "Merge request metadata and changes",
      "Pipeline execution and job data",
      "Project and group information",
      "Runner utilization metrics"
    ],
    outputs: [
      "MR-level cost impact analysis",
      "Pipeline cost attribution by team",
      "Economic enforcement on merge approval",
      "Infrastructure change detection"
    ],
    setup: {
      method: "OAuth or API token",
      timeToValue: "10–15 minutes",
      permissions: "Read-only, scoped to projects and pipelines"
    }
  },
  {
    id: "azure-devops",
    name: "Azure DevOps",
    category: "SaaS",
    status: "Coming soon",
    products: ["Torb"],
    short: "Pipeline and repo integration for shift-left economics.",
    logo: { src: "/logos/azure.svg", alt: "Azure DevOps" },
    whatWeIngest: [
      "Pull request and branch metadata",
      "Build and release pipeline data",
      "Work item and sprint tracking",
      "Agent pool utilization"
    ],
    outputs: [
      "PR-level infrastructure cost estimates",
      "Pipeline cost attribution",
      "Economic gates on deployment approval",
      "Team and project cost tracking"
    ],
    setup: {
      method: "OAuth or PAT",
      timeToValue: "15–20 minutes",
      permissions: "Read-only, scoped to repos and pipelines"
    }
  },
  {
    id: "terraform",
    name: "Terraform",
    category: "Infrastructure",
    status: "Coming soon",
    products: ["Torb"],
    short: "Infrastructure-as-code cost estimation and drift detection.",
    logo: { src: "/logos/saas.svg", alt: "Terraform" },
    whatWeIngest: [
      "Plan output and resource changes",
      "State file resource inventory",
      "Module and workspace metadata",
      "Provider and version information"
    ],
    outputs: [
      "Pre-apply cost estimates",
      "Drift detection and cost impact",
      "Resource lifecycle cost tracking",
      "Economic gates on terraform apply"
    ],
    setup: {
      method: "CLI integration or API",
      timeToValue: "15–20 minutes",
      permissions: "Read-only, scoped to plan and state data"
    }
  },

  // DataX - Coming Soon (Data platforms)
  {
    id: "bigquery",
    name: "BigQuery",
    category: "Data",
    status: "Coming soon",
    products: ["DataX"],
    short: "Query-level cost enforcement and workload economics.",
    logo: { src: "/logos/gcp.svg", alt: "BigQuery" },
    whatWeIngest: [
      "Query execution logs and bytes scanned",
      "Slot utilization and reservation data",
      "Dataset and table metadata",
      "User and project-level usage"
    ],
    outputs: [
      "Query-level cost attribution",
      "Workload gating and throttling policies",
      "Slot utilization optimization",
      "Team and project cost reporting"
    ],
    setup: {
      method: "Read-only API + INFORMATION_SCHEMA",
      timeToValue: "15–25 minutes",
      permissions: "Read-only, scoped to job and usage data"
    }
  },
  {
    id: "amazon-redshift",
    name: "Amazon Redshift",
    category: "Data",
    status: "Coming soon",
    products: ["DataX"],
    short: "Cluster workload economics and query cost enforcement.",
    logo: { src: "/logos/aws.svg", alt: "Amazon Redshift" },
    whatWeIngest: [
      "Query execution logs and resource usage",
      "Cluster and node utilization metrics",
      "Workload management queue data",
      "Concurrency scaling usage"
    ],
    outputs: [
      "Query-level cost attribution",
      "Cluster right-sizing recommendations",
      "Workload policy enforcement",
      "Team and schema cost reporting"
    ],
    setup: {
      method: "Read-only API + system tables",
      timeToValue: "20–30 minutes",
      permissions: "Read-only, scoped to system views and usage data"
    }
  },
  {
    id: "azure-synapse",
    name: "Azure Synapse / Fabric",
    aliases: ["Synapse", "Fabric"],
    category: "Data",
    status: "Coming soon",
    products: ["DataX"],
    short: "Data platform workload economics and capacity management.",
    logo: { src: "/logos/azure.svg", alt: "Azure Synapse" },
    whatWeIngest: [
      "SQL pool and Spark pool usage",
      "Pipeline execution and data flow metrics",
      "Capacity unit consumption",
      "Workspace and lakehouse metadata"
    ],
    outputs: [
      "Workload cost attribution by pool",
      "Pipeline cost analysis",
      "Capacity right-sizing recommendations",
      "Policy enforcement on data workloads"
    ],
    setup: {
      method: "Read-only API",
      timeToValue: "20–30 minutes",
      permissions: "Read-only, scoped to workspace and pool data"
    }
  }
];
