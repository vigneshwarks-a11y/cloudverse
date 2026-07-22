/* "Named customer use cases" — a table of customers, the platforms in scope (as
   tags), and what CloudVerse governs for each. Horizontally scrollable on small
   screens. Matches the platform design language: cv-* tokens, pill chip. Server
   component. */

type Row = { customer: string; platforms: string[]; governs: string };

const ROWS: Row[] = [
  {
    customer: "Axis Max Life Insurance",
    platforms: ["OCI", "AWS", "Azure"],
    governs: "Compute, data warehouse, and storage optimization; chargeback; budget controls; DevOps cost governance.",
  },
  {
    customer: "Dr. Reddy's Laboratories",
    platforms: ["AWS", "GCP", "Azure"],
    governs: "Compute, RDS, data warehouse, and storage optimization; chargeback; budget controls; DevOps; BU-head reporting.",
  },
  {
    customer: "XL-Smart",
    platforms: ["AWS", "GCP", "Tencent", "Huawei", "Snowflake", "Databricks", "Anthropic", "OpenAI"],
    governs: "Enterprise cloud, data, and AI spend optimization and governance across providers, warehouses, and LLMs.",
  },
  {
    customer: "Berkshire Hathaway HomeServices",
    platforms: ["Azure", "OpenAI", "Azure AI"],
    governs: "Optimization, governance, usage visibility, and AI spend controls.",
  },
  {
    customer: "Carlsberg",
    platforms: ["Azure", "AWS", "OpenAI", "Azure AI"],
    governs: "Enterprise governance, commitment management, and AI spend governance.",
  },
];

function Tags({ platforms }: { platforms: string[] }) {
  return (
    <div className="flex max-w-[26rem] flex-wrap gap-2">
      {platforms.map((p) => (
        <span
          key={p}
          className="rounded-full border border-cv-line/70 bg-cv-surface2 px-2.5 py-1 text-xs font-medium text-cv-ink/75 dark:border-white/15 dark:bg-white/[0.04]"
        >
          {p}
        </span>
      ))}
    </div>
  );
}

export function NamedCustomers() {
  return (
    <section className="cv-section bg-cv-surface" data-testid="section-named-customers">
      <div className="cv-container">
        <div className="max-w-5xl text-left">
          <h2 className="cv-h2 max-w-3xl text-cv-ink">Governed in production, across the estate.</h2>
          <p className="mt-5 cv-body-lg text-cv-ink/70">
            Expansion pattern: Cloud, then Data, then SaaS, then AI, as enterprises bring their full
            technology estate under one model.
          </p>
        </div>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-cv-line/60 dark:border-white/10">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <colgroup>
              <col className="w-[22%]" />
              <col className="w-[32%]" />
              <col className="w-[46%]" />
            </colgroup>
            <thead>
              <tr className="bg-cv-surface2 dark:bg-[#0D0D0D]">
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-cv-muted">Customer</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-cv-muted">Platforms in scope</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-cv-muted">What CloudVerse governs</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.customer} className="border-t border-cv-line/50 dark:border-white/10">
                  <th className="px-6 py-6 align-top text-base font-semibold text-cv-ink">{r.customer}</th>
                  <td className="px-6 py-6 align-top">
                    <Tags platforms={r.platforms} />
                  </td>
                  <td className="px-6 py-6 align-top text-sm leading-relaxed text-cv-ink/70">{r.governs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default NamedCustomers;
