/* "Domain depth" — per-domain capability lists (Cloud, AI, Data, SaaS) plus the
   two capabilities shared across all four. Matches the platform design language:
   cv-* tokens, pill chip, rounded-2xl bordered cards. Server component. */

type Domain = {
  title: string;
  color: string;
  tag?: string;
  items: [string, string][]; // [term, detail]
};

const DOMAINS: Domain[] = [
  {
    title: "Cloud",
    color: "#2278E0",
    items: [
      ["Architecture Intelligence", "cost, performance, and Well-Architected posture at the application level, not just the resource level."],
      ["ML-driven anomalies, closed loop", "detect early, predict risk, and let approved fixes implement automatically under governed policy."],
      ["Kubernetes cost optimization", "connect cluster activity to cost by namespace, workload, and environment."],
    ],
  },
  {
    title: "AI",
    color: "#6954D4",
    items: [
      ["Model & provider spend visibility", "cost by model, provider, and workload, reconciled to the actual bill."],
      ["Budget allocation and chargeback", "AI spend attributed to team and product, the same way cloud spend is."],
    ],
  },
  {
    title: "Data",
    color: "#D97706",
    items: [
      ["Behavioral cost intelligence", "group repeat queries into cost-amplifying patterns; detect full scans, fan-out, and spiky usage."],
      ["Predictive signals", "pinpoint what changed across pipelines and teams before spend spikes hit the bill."],
    ],
  },
  {
    title: "SaaS",
    color: "#0E9E7A",
    tag: "Coming soon",
    items: [
      ["Usage and ownership mapping", "which teams use which tools, and at what utilization, across business units."],
    ],
  },
];

const SHARED: [string, string][] = [
  ["Tagging & normalization", "automated tag governance for allocation and reporting that holds up under audit."],
  ["Automated chargeback", "consistent, audit-ready showback and chargeback, one model, every domain."],
];

export function DomainDepth() {
  return (
    <section className="cv-section bg-cv-surface" data-testid="section-domain-depth">
      <div className="cv-container">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="cv-label mb-4">Domain depth</p>
            <h2 className="cv-h2 text-cv-ink">What each domain gets, in depth.</h2>
          </div>
          <p className="cv-body-lg text-cv-ink/70">
            The same model runs across every domain, with capabilities tuned to how each one actually
            spends.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {DOMAINS.map((d) => (
            <div
              key={d.title}
              className="rounded-2xl border border-cv-line/60 bg-cv-surface2 p-6 dark:border-white/10 dark:bg-[#0D0D0D]"
            >
              <div className="mb-4 flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
                <h3 className="text-lg font-semibold text-cv-ink">{d.title}</h3>
                {d.tag && (
                  <span className="rounded-full border border-cv-line/70 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-cv-muted dark:border-white/15">
                    {d.tag}
                  </span>
                )}
              </div>
              <ul className="space-y-3">
                {d.items.map(([term, detail]) => (
                  <li key={term} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: d.color }} />
                    <p className="text-[15px] leading-relaxed text-cv-ink/70">
                      <span className="font-semibold text-cv-ink">{term}</span> {detail}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Shared across all four */}
        <div className="mt-5 rounded-2xl border border-cv-line/60 bg-cv-surface2 p-6 dark:border-white/10 dark:bg-[#0D0D0D]">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-cv-muted">Shared across all four</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {SHARED.map(([term, detail]) => (
              <p key={term} className="text-[15px] leading-relaxed text-cv-ink/70">
                <span className="font-semibold text-cv-ink">{term}</span> {detail}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DomainDepth;
