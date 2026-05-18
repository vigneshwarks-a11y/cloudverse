import type { Metadata } from "next";
import { CTABand } from "@/components/CTABand";

export const metadata: Metadata = {
  title: "Integrations — CloudVerse",
  description: "Connect AWS, Azure, GCP, Snowflake, Databricks, GitHub, and 50+ tools your teams already use. Read-only by default.",
  alternates: { canonical: "/integrations" },
};

const CATEGORIES: { label: string; color: string; items: string[] }[] = [
  { label: "Cloud providers", color: "#1664C0", items: ["AWS", "Microsoft Azure", "Google Cloud", "Alibaba Cloud", "Huawei Cloud", "Oracle Cloud", "IBM Cloud"] },
  { label: "AI & GPU providers", color: "#6954D4", items: ["OpenAI", "Anthropic", "AWS Bedrock", "Vertex AI", "Azure OpenAI", "CoreWeave", "Lambda Labs", "Together AI"] },
  { label: "Data warehouses", color: "#D97706", items: ["Snowflake", "Databricks", "Google BigQuery", "Microsoft Fabric", "Azure Synapse", "Amazon Redshift", "ClickHouse"] },
  { label: "Source control & CI", color: "#0E9E7A", items: ["GitHub", "GitLab", "Bitbucket", "Azure DevOps", "GitHub Actions", "GitLab CI", "Jenkins", "Argo CD", "CircleCI"] },
  { label: "IaC & orchestration", color: "#0E9E7A", items: ["Terraform", "OpenTofu", "Pulumi", "CloudFormation", "Helm", "Kustomize", "Kubernetes", "dbt", "Airflow"] },
  { label: "Observability & ITSM", color: "#1664C0", items: ["Datadog", "Grafana", "New Relic", "OpenTelemetry", "PagerDuty", "ServiceNow", "Jira"] },
  { label: "Identity & finance", color: "#1664C0", items: ["Okta", "Microsoft Entra", "Google Workspace", "SAML / OIDC", "SCIM", "NetSuite", "Workday", "Sage Intacct"] },
];

export default function Page() {
  return (
    <>
      <section className="cv-hero-bg pt-[140px] pb-12 lg:pt-[160px] lg:pb-16 relative">
        <div className="cv-container relative z-10">
          <div className="cv-label mb-4">Integrations</div>
          <h1 className="cv-h1 text-white max-w-3xl">Connects to the stack your teams already use.</h1>
          <p className="cv-body-lg mt-6 text-white/75 max-w-2xl">
            50+ integrations across cloud, AI, data, source control, identity, and finance. Read-only by default.
            Adding a connector is typically a 30-minute job.
          </p>
        </div>
      </section>

      <section className="cv-section bg-cv-surface">
        <div className="cv-container space-y-14">
          {CATEGORIES.map((cat) => (
            <div key={cat.label}>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                <h2 className="font-display font-semibold text-white text-xl">{cat.label}</h2>
                <span className="text-white/45 text-sm">· {cat.items.length}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((name) => (
                  <span
                    key={name}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm border border-white/10 bg-white/[0.03] text-white/85"
                    data-testid={`integration-${name.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: cat.color }} />
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 sm:p-9">
            <h3 className="font-display font-semibold text-white text-lg">Don't see what you need?</h3>
            <p className="text-white/65 mt-2 max-w-2xl text-sm leading-relaxed">
              CloudVerse exposes a public API and a webhook framework — most missing integrations can be wired in days, not quarters. Open standards (OpenTelemetry, OpenCost, OPA, FOCUS) are first-class throughout.
            </p>
          </div>
        </div>
      </section>

      <CTABand heading="Connect your first integration in under 30 minutes." />
    </>
  );
}
