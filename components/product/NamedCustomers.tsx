/* "Named customer use cases" — a table of customers, the platforms in scope (as
   tags), and what CloudVerse governs for each. High-contrast, scannable: row
   zebra + hover, hairline column dividers, readable platform chips. Matches the
   comparison-matrix treatment. Horizontally scrollable on small screens.
   cv-* tokens, theme-aware. Server component. */

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
          className="rounded-full border border-cv-line/70 bg-cv-ink/[0.04] px-2.5 py-1 text-[12px] font-medium text-cv-ink/90 dark:border-white/15 dark:bg-white/[0.06]"
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

        <div className="mt-10 overflow-x-auto overflow-y-hidden rounded-2xl border border-cv-line dark:border-white/15 bg-cv-surface2 dark:bg-white/[0.03] shadow-[0_24px_60px_-32px_rgba(0,0,0,0.5)] dark:shadow-[0_28px_70px_-30px_rgba(0,0,0,0.85)]">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <colgroup>
              <col className="w-[24%]" />
              <col className="w-[34%]" />
              <col className="w-[42%]" />
            </colgroup>
            <thead>
              <tr className="bg-cv-ink/[0.04] dark:bg-white/[0.06]">
                <th
                  scope="col"
                  className="border-b border-cv-line/70 px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-cv-ink/60 dark:border-white/10 dark:text-white/55"
                >
                  Customer
                </th>
                <th
                  scope="col"
                  className="border-b border-l border-cv-line/70 px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-cv-ink/60 dark:border-white/10 dark:text-white/55"
                >
                  Platforms in scope
                </th>
                <th
                  scope="col"
                  className="border-b border-l border-cv-line/70 px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-cv-ink/60 dark:border-white/10 dark:text-white/55"
                >
                  What CloudVerse governs
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr
                  key={r.customer}
                  className="group border-t border-cv-line/70 dark:border-white/[0.12]"
                >
                  <th
                    scope="row"
                    className="px-6 py-6 align-top text-[15px] font-semibold leading-snug text-cv-ink transition-colors group-hover:bg-cv-ink/[0.03] dark:group-hover:bg-white/[0.04]"
                  >
                    {r.customer}
                  </th>
                  <td className="border-l border-cv-line/40 px-6 py-6 align-top transition-colors dark:border-white/[0.06] group-hover:bg-cv-ink/[0.03] dark:group-hover:bg-white/[0.04]">
                    <Tags platforms={r.platforms} />
                  </td>
                  <td className="border-l border-cv-line/40 px-6 py-6 align-top text-[14px] leading-relaxed text-cv-ink/85 transition-colors dark:border-white/[0.06] group-hover:bg-cv-ink/[0.03] dark:group-hover:bg-white/[0.04]">
                    {r.governs}
                  </td>
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
