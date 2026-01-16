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
};

export const integrationsData: Integration[] = [
  // Cloud Providers - Available
  {
    id: "aws",
    name: "AWS",
    category: "Cloud",
    status: "Available",
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
      docsUrl: "https://docs.cloudverse.ai/integrations/aws"
    }
  },
  {
    id: "azure",
    name: "Microsoft Azure",
    aliases: ["Azure"],
    category: "Cloud",
    status: "Available",
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
      "Automation for resource governance"
    ],
    setup: {
      method: "Read-only API + billing export support",
      timeToValue: "20–40 minutes",
      permissions: "Read-only, scoped to Cost Management and Resource Graph",
      docsUrl: "https://docs.cloudverse.ai/integrations/azure"
    }
  },
  {
    id: "gcp",
    name: "Google Cloud",
    aliases: ["GCP"],
    category: "Cloud",
    status: "Available",
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
      docsUrl: "https://docs.cloudverse.ai/integrations/gcp"
    }
  },
  {
    id: "oracle-oci",
    name: "Oracle Cloud Infrastructure",
    aliases: ["OCI"],
    category: "Cloud",
    status: "Available",
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
      "Automation for governance"
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
      "Access control and governance",
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
      "Access control and governance",
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
    short: "Directory sync for identity-based allocation and governance.",
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
      "Automation for issue-based governance"
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
    short: "ITSM + ownership context for governance and accountability.",
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
      "Governance and compliance alerts"
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
      "Governance alerts"
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
      "Ops-level alerts alongside FinOps context"
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
      "Governance and compliance"
    ],
    setup: {
      method: "APIs vary by vendor",
      timeToValue: "20–40 minutes",
      permissions: "Read-only, scoped to billing and usage"
    }
  }
];
