const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const entries = [
  {
    letter: 'A',
    term: 'Access control (RBAC)',
    definition:
      'A way to limit what each person can see or do in a tool based on their role. For example, Finance can view chargeback reports, while Engineering can view service level costs.',
  },
  {
    letter: 'A',
    term: 'Air-gapped deployment',
    definition:
      'A deployment that runs without direct internet connectivity. Used in regulated environments where systems must stay isolated.',
  },
  {
    letter: 'A',
    term: 'Allocation',
    definition:
      'The process of mapping shared cloud costs to the teams, products, environments, or customers that caused them.',
  },
  {
    letter: 'A',
    term: 'Allocation dimension',
    definition:
      'A label you allocate by, such as team, product, business unit, environment, or customer.',
  },
  {
    letter: 'A',
    term: 'Always-on cost',
    definition:
      'Spend that happens continuously because something is running 24/7, even when usage is low (for example, a NAT Gateway or an always-on instance).',
  },
  {
    letter: 'A',
    term: 'Anomaly',
    definition:
      'A spend pattern that is unusual compared to normal behavior, like a sudden daily spike or a steady climb that does not match expected usage.',
  },
  {
    letter: 'A',
    term: 'Anomaly detection',
    definition:
      'Finding abnormal spend patterns automatically and alerting the right team early.',
  },
  {
    letter: 'A',
    term: 'API ingestion',
    definition:
      'Pulling billing and usage data directly from a provider\'s APIs instead of uploading files.',
  },
  {
    letter: 'B',
    term: 'Budget',
    definition:
      'A target spend limit for a team, product, or environment over a time period.',
  },
  {
    letter: 'B',
    term: 'Budget variance',
    definition:
      'The gap between planned spend and actual spend.',
  },
  {
    letter: 'C',
    term: 'Chargeback',
    definition:
      'Billing internal teams for the costs they create. It is used when Finance wants teams to be accountable like they would be with a real invoice.',
  },
  {
    letter: 'C',
    term: 'Showback',
    definition:
      'Sharing cost reports with teams without billing them. It is used to build awareness before moving to chargeback.',
  },
  {
    letter: 'C',
    term: 'Cloud financial management',
    definition:
      'The operating practice of understanding cloud spend, assigning ownership, forecasting, and reducing waste in a repeatable way.',
  },
  {
    letter: 'C',
    term: 'Common costs',
    definition:
      'Shared costs that are not naturally tied to one team or service, like shared networking, shared platforms, or central tooling.',
  },
  {
    letter: 'C',
    term: 'Commitments',
    definition:
      'Discount programs like Reserved Instances and Savings Plans where you commit to usage to get lower rates.',
  },
  {
    letter: 'C',
    term: 'Cost driver',
    definition:
      'The main reason spend is rising, such as a specific service, region, workload, or configuration change.',
  },
  {
    letter: 'C',
    term: 'Cost regression',
    definition:
      'A change that increases cost compared to the previous baseline. DevX focuses on catching these before they hit production.',
  },
  {
    letter: 'C',
    term: 'Custom tags',
    definition:
      'Tags you define and apply to resources so you can group and allocate spend consistently.',
  },
  {
    letter: 'D',
    term: 'Data platform spend',
    definition:
      'Costs from platforms like Databricks and Snowflake, often tied to compute time, warehouse usage, or credits.',
  },
  {
    letter: 'D',
    term: 'Dynamic perspectives',
    definition:
      'Different ways to slice the same spend data, for example by team, environment, product, region, or service.',
  },
  {
    letter: 'E',
    term: 'Efficiency Snapshot',
    definition:
      'A read-only analysis created from a single invoice upload. It is meant to give teams a starting baseline before they set up full integrations.',
  },
  {
    letter: 'E',
    term: 'Efficiency score',
    definition:
      'A high level score that summarizes how efficiently spend is being used, based on waste signals and coverage gaps found in the snapshot.',
  },
  {
    letter: 'E',
    term: 'Environment',
    definition:
      'A grouping like production, staging, or development. Cost issues often look different in non-production versus production.',
  },
  {
    letter: 'F',
    term: 'Forecasting',
    definition:
      'Estimating future spend based on current usage, trend patterns, and planned changes.',
  },
  {
    letter: 'G',
    term: 'Guardrails',
    definition:
      'Rules that prevent risky cost behavior, such as stopping an always-on resource in non-production or flagging a large instance type increase.',
  },
  {
    letter: 'G',
    term: 'GPU',
    definition:
      'A graphics processing unit used for AI training and inference. GPU costs often move quickly with demand and scaling.',
  },
  {
    letter: 'I',
    term: 'Inference',
    definition:
      'Running a model to generate output, for example answering a question or producing text. Inference is often a large part of ongoing AI cost.',
  },
  {
    letter: 'I',
    term: 'Integrations',
    definition:
      'Connections that bring billing, usage, and ownership signals into CloudVerse or DevX. Examples include cloud providers, Kubernetes, OpenAI, identity systems, and ticketing tools.',
  },
  {
    letter: 'I',
    term: 'Invoice ingestion',
    definition:
      'Uploading billing files like PDF, CSV, or XLSX so the tool can parse costs without needing direct cloud access.',
  },
  {
    letter: 'K',
    term: 'Kubernetes workload attribution',
    definition:
      'Mapping cluster costs to namespaces, services, or workloads so teams know who is responsible for the spend.',
  },
  {
    letter: 'L',
    term: 'Least privilege',
    definition:
      'Granting only the minimum access needed to do the job. CloudVerse integrations are typically scoped and read-only by default.',
  },
  {
    letter: 'L',
    term: 'LLM (Large Language Model)',
    definition:
      'A model that generates text or other outputs. LLM costs are commonly tied to token usage and request volume.',
  },
  {
    letter: 'M',
    term: 'Monthly close support',
    definition:
      'Helping Finance reconcile cloud spend for accounting close, including allocation, variance explanation, and reporting.',
  },
  {
    letter: 'M',
    term: 'Multi-cloud',
    definition:
      'Using more than one cloud provider, such as AWS, Azure, and GCP. This increases reporting and allocation complexity.',
  },
  {
    letter: 'M',
    term: 'Multi-tenant governance',
    definition:
      'Separating data and controls across multiple business units, subsidiaries, or customers inside one platform.',
  },
  {
    letter: 'N',
    term: 'Normalization layer',
    definition:
      'A consistent model that standardizes billing, usage, tags, and ownership across sources so reporting and automation behave the same way everywhere.',
  },
  {
    letter: 'N',
    term: 'Non-production (non-prod)',
    definition:
      'Environments used for testing and development. A common cost issue is running production-like resources in non-prod all the time.',
  },
  {
    letter: 'O',
    term: 'One-click actions',
    definition:
      'Applying an optimization action directly from a recommendation, usually with tracking and audit logging.',
  },
  {
    letter: 'O',
    term: 'Optimization',
    definition:
      'Reducing waste and improving efficiency by changing how resources are provisioned or used. Examples include rightsizing, cleaning up idle resources, and improving commitment coverage.',
  },
  {
    letter: 'O',
    term: 'Ownership',
    definition:
      'A clear mapping between spend and the team or product responsible for it.',
  },
  {
    letter: 'P',
    term: 'Policy enforcement',
    definition:
      'Applying cost rules consistently across repos and teams, such as requiring approval for high-impact infrastructure changes.',
  },
  {
    letter: 'P',
    term: 'Pre-production cost review',
    definition:
      'Estimating and reviewing cost impact before a change ships, usually during pull request review or CI.',
  },
  {
    letter: 'P',
    term: 'Pull request (PR)',
    definition:
      'A request to merge code changes. DevX adds cost checks and cost comments directly into PR workflows.',
  },
  {
    letter: 'R',
    term: 'RBAC (Role-Based Access Control)',
    definition:
      'See "Access control".',
  },
  {
    letter: 'R',
    term: 'Read-only connection',
    definition:
      'An integration mode that can read billing and usage data but cannot change resources.',
  },
  {
    letter: 'R',
    term: 'Real-time anomalies',
    definition:
      'Alerts based on current usage patterns rather than waiting for end-of-month billing.',
  },
  {
    letter: 'R',
    term: 'Realized savings',
    definition:
      'Savings that are actually achieved and tracked, not just estimated.',
  },
  {
    letter: 'R',
    term: 'Reservations (Reserved Instances)',
    definition:
      'A commitment discount model, commonly used in AWS and other clouds, where you reserve capacity or usage to reduce cost.',
  },
  {
    letter: 'R',
    term: 'Rightsizing',
    definition:
      'Changing resource sizes to match real usage, for example moving from a larger instance to a smaller one if utilization is consistently low.',
  },
  {
    letter: 'S',
    term: 'Savings Plans',
    definition:
      'A commitment discount model where you commit to a spend level or usage level to get reduced rates.',
  },
  {
    letter: 'S',
    term: 'Scoped permissions',
    definition:
      'Access granted to only the required accounts, projects, or billing scopes, often with tenant boundaries.',
  },
  {
    letter: 'S',
    term: 'Spend variance',
    definition:
      'How much spend changed compared to a prior period or compared to a budget.',
  },
  {
    letter: 'T',
    term: 'Tag coverage',
    definition:
      'How much of your spend is properly tagged. Poor tag coverage often blocks accurate allocation and chargeback.',
  },
  {
    letter: 'T',
    term: 'Tenant isolation',
    definition:
      'Keeping one business unit\'s or customer\'s data separate from another\'s in the same platform.',
  },
  {
    letter: 'T',
    term: 'Tokens',
    definition:
      'Units used to measure LLM usage. Costs are often tied to tokens processed or generated.',
  },
  {
    letter: 'U',
    term: 'Unified bill',
    definition:
      'A single consolidated view of spend across multiple clouds and accounts.',
  },
  {
    letter: 'U',
    term: 'Unit economics',
    definition:
      'Cost measured in a way the business understands, like cost per customer, cost per product, cost per feature, or cost per transaction.',
  },
  {
    letter: 'U',
    term: 'Usage-based pricing',
    definition:
      'Pricing where cost depends on how much you use, not just what you provision.',
  },
  {
    letter: 'W',
    term: 'Waste signal',
    definition:
      'A sign that money is being spent without value, such as idle resources, always-on non-prod infrastructure, low utilization, or poor commitment coverage.',
  },
  {
    letter: 'W',
    term: 'Workload-aware governance',
    definition:
      'Managing cost based on what workloads are doing, not just what the invoice says later. This typically requires linking spend to services, features, environments, and runtime signals.',
  },
];

export const glossaryEntries = entries.map((entry) => ({
  ...entry,
  id: `${entry.letter.toLowerCase()}-${slugify(entry.term)}`,
}));
