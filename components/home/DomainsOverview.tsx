const DOMAINS = [
  {
    name: "Cloud",
    color: "#1664C0",
    record:
      "Multi-cloud cost intelligence: allocation, anomalies, chargeback, and commitments, across AWS, Azure, Google Cloud, and eight more providers.",
    lineItems: "Compute · Storage · Network",
    users: "FinOps teams",
  },
  {
    name: "AI",
    color: "#6954D4",
    record:
      "Governed AI execution: tokens, models, agents, and GPUs: policy set before the request, metered during, ROI evidence after. This is AIX.",
    lineItems: "Tokens · Models · Agents",
    users: "AI & platform teams",
  },
  {
    name: "Data",
    color: "#D97706",
    record:
      "Warehouse spend intelligence: Snowflake, Databricks, and pipeline costs attributed to the teams and workloads that drive them.",
    lineItems: "Warehouses · Pipelines · Queries",
    users: "Data teams",
  },
  {
    name: "SaaS",
    color: "#0E9E7A",
    record:
      "License and renewal intelligence: subscriptions, seats, and duplicate tools surfaced before the renewal invoice hits.",
    lineItems: "Licenses · Seats · Renewals",
    users: "IT & procurement",
  },
  {
    name: "Engineering",
    color: "#1664C0",
    record:
      "Shift-left cost checks: cost signals inside the PR before merge, and Kubernetes cost attribution to service, team, and owner.",
    lineItems: "CI/CD · Kubernetes · PR checks",
    users: "Platform engineering",
  },
];

export function DomainsOverview() {
  return (
    <section className="cv-section bg-cv-surface2" data-testid="section-domains-overview">
      <div className="cv-container">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1664C0]/15 dark:bg-[#7CB8F8]/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#1664C0] dark:text-[#7CB8F8] mb-4">
          One platform · Five domains
        </span>
        <h2 className="cv-h2 text-cv-ink max-w-2xl">Every domain of technology spend, one record.</h2>
        <p className="mt-4 cv-body text-cv-ink/70 max-w-2xl">
          Cloud taught enterprises what ungoverned spend costs. AI is repeating it faster. CloudVerse puts
          every domain on one record: for AI and engineering we sit at the execution path itself; for
          cloud, data, and SaaS we make every dollar accountable with allocation, chargeback, and evidence.
        </p>

        <div className="mt-10 border border-cv-line/40 rounded-2xl overflow-hidden bg-cv-surface">
          <div className="hidden md:grid grid-cols-[140px_1fr_220px_180px] gap-4 px-6 py-3 border-b border-cv-line/40 bg-cv-ink/[0.02] text-[11px] uppercase tracking-widest text-cv-ink/45 font-medium">
            <div>Domain</div>
            <div>What&apos;s on the record</div>
            <div>Line items</div>
            <div>Users</div>
          </div>
          {DOMAINS.map((d) => (
            <div
              key={d.name}
              className="grid grid-cols-1 md:grid-cols-[140px_1fr_220px_180px] gap-2 md:gap-4 px-6 py-5 border-b border-cv-line/40 last:border-0"
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full shrink-0" style={{ background: d.color }} />
                <span className="font-semibold text-cv-ink text-sm">{d.name}</span>
              </div>
              <p className="text-sm text-cv-ink/70 leading-relaxed">{d.record}</p>
              <div className="text-xs text-cv-muted font-mono">{d.lineItems}</div>
              <div className="text-xs text-cv-muted">{d.users}</div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-cv-muted text-center md:text-left">
          The data model holds every domain to the same standard. Read-only by default: connect in under
          30 minutes.
        </p>
      </div>
    </section>
  );
}
