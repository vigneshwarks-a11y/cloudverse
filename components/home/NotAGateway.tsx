/* "Not a gateway. Not observability. Not a cost tool." — a capability matrix
   contrasting adjacent tool categories against CloudVerse Agentry. The Agentry column is
   highlighted; a dash renders as a muted "—". Horizontally scrollable on small
   screens. Matches home design language: cv-* tokens, pill chip. Server
   component. */

const COLS = [
  "LLM Observability\n(Helicone, Langfuse)",
  "Cloud-native Guardrails\n(Bedrock, Foundry, Vertex)",
  "Agent Registries\n(Agent 365, Agent Fabric)",
  "IT Cost Tools\n(Apptio, Flexera)",
];

// Each row: [capability, obs, guardrails, registries, costtools, Agentry]
const ROWS: [string, string, string, string, string, string][] = [
  ["Discover agents across clouds, SaaS, frameworks, K8s", "—", "Own platform only", "Catalog focus", "—", "Cross-estate"],
  ["Enforce budgets per call, in flight", "Observe only", "Quota-level", "—", "After the invoice", "Reserve → settle"],
  ["Block unregistered / spoofed callers", "—", "Platform IAM", "Identity registry", "—", "Identity-gated routing"],
  ["Route & fail over across providers by policy", "—", "Within own models", "—", "—", "Provider-neutral"],
  ["Audit-grade economics ledger + governed prompt capture", "Traces, not governance", "Per-platform logs", "—", "Cost, no AI context", "Hash-verified, RBAC'd"],
  ["Private / sovereign deployment", "Varies", "Their cloud", "—", "Varies", "Your tenancy"],
];

function Cell({ value, agentry }: { value: string; agentry?: boolean }) {
  if (value === "—") return <span className="text-cv-muted/50">—</span>;
  return <span className={agentry ? "font-semibold text-cv-ink" : "text-cv-ink/70"}>{value}</span>;
}

export function NotAGateway() {
  return (
    <section className="cv-section bg-cv-surface" data-testid="section-not-a-gateway">
      <div className="cv-container">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#1664C0]/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#1664C0] dark:bg-[#7CB8F8]/15 dark:text-[#7CB8F8]">
            How Agentry compares
          </span>
          <h2 className="cv-h2 text-balance text-cv-ink">
            Not a gateway. Not observability. Not a cost tool.
          </h2>
          <p className="cv-body mt-4 text-cv-ink/70">
            Adjacent tools see pieces. Agentry governs the whole.
          </p>
        </div>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-cv-line/60 dark:border-white/10">
          <table className="w-full min-w-[860px] border-collapse text-sm">
            <thead>
              <tr className="bg-cv-surface2 dark:bg-[#0D0D0D]">
                <th className="sticky left-0 z-10 bg-cv-surface2 px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-cv-muted dark:bg-[#0D0D0D]">
                  Capability
                </th>
                {COLS.map((c) => (
                  <th
                    key={c}
                    className="whitespace-pre-line px-4 py-4 text-left text-[11px] font-semibold uppercase leading-tight tracking-wider text-cv-muted"
                  >
                    {c}
                  </th>
                ))}
                <th className="whitespace-pre-line bg-[#1664C0]/[0.06] px-4 py-4 text-left text-[11px] font-semibold uppercase leading-tight tracking-wider text-[#1664C0] dark:bg-[#1664C0]/15 dark:text-[#7CB8F8]">
                  CloudVerse Agentry
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => {
                const [cap, ...cells] = row;
                return (
                  <tr key={cap} className="border-t border-cv-line/50 dark:border-white/10">
                    <th className="sticky left-0 z-10 bg-cv-surface2 px-5 py-4 text-left align-top text-[13px] font-medium text-cv-ink dark:bg-[#0D0D0D]">
                      {cap}
                    </th>
                    {cells.map((v, i) => {
                      const isAgentry = i === cells.length - 1;
                      return (
                        <td
                          key={i}
                          className={`px-4 py-4 align-top text-[13px] ${
                            isAgentry ? "bg-[#1664C0]/[0.06] dark:bg-[#1664C0]/[0.10]" : ""
                          }`}
                        >
                          <Cell value={v} agentry={isAgentry} />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-4 max-w-3xl text-sm italic text-cv-ink/70">
          Each adjacent category is good at its piece. None combines cross-estate discovery, in-path
          enforcement, and an economics ledger deployable inside your own boundary.
        </p>
      </div>
    </section>
  );
}

export default NotAGateway;
