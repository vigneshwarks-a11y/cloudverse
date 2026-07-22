/* "Not a gateway. Not observability. Not a cost tool." — a capability matrix
   contrasting adjacent tool categories against CloudVerse Agentry. The Agentry
   column is the featured column: filled, blue-keyed, each supported capability
   marked with a teal check so the winning column reads at a glance. Competitor
   cells show their partial coverage in readable ink; a "not covered" cell reads
   as a clear centered dash. Row zebra + hover and hairline column dividers make
   the 6-column matrix scannable. Horizontally scrollable on small screens.
   cv-* tokens, theme-aware. Server component. */

import { SectionHeading } from "@/components/SectionHeading";

type Col = { name: string; examples: string };

const COLS: Col[] = [
  { name: "LLM Observability", examples: "Helicone, Langfuse" },
  { name: "Cloud-native Guardrails", examples: "Bedrock, Foundry, Vertex" },
  { name: "Agent Registries", examples: "Agent 365, Agent Fabric" },
  { name: "IT Cost Tools", examples: "Apptio, Flexera" },
];

// Each row: [capability, obs, guardrails, registries, costtools, Agentry].
// "—" renders as a "not covered" mark; the last value is the Agentry answer.
const ROWS: [string, string, string, string, string, string][] = [
  ["Discover agents across clouds, SaaS, frameworks, K8s", "—", "Own platform only", "Catalog focus", "—", "Cross-estate"],
  ["Enforce budgets per call, in flight", "Observe only", "Quota-level", "—", "After the invoice", "Reserve → settle"],
  ["Block unregistered / spoofed callers", "—", "Platform IAM", "Identity registry", "—", "Identity-gated routing"],
  ["Route & fail over across providers by policy", "—", "Within own models", "—", "—", "Provider-neutral"],
  ["Audit-grade economics ledger + governed prompt capture", "Traces, not governance", "Per-platform logs", "—", "Cost, no AI context", "Hash-verified, RBAC'd"],
  ["Private / sovereign deployment", "Varies", "Their cloud", "—", "Varies", "Your tenancy"],
];

function Check() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mt-[3px] h-3.5 w-3.5 shrink-0 text-[#0E9E7A] dark:text-[#34D399]"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

/* Competitor cell: a readable partial answer, or a clear "not covered" dash. */
function CompCell({ value }: { value: string }) {
  if (value === "—") {
    return (
      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-cv-ink/[0.05] text-cv-ink/40 dark:bg-white/[0.06] dark:text-white/35" aria-label="Not covered">
        <span className="h-px w-2 bg-current" />
      </span>
    );
  }
  return <span className="text-cv-ink/80">{value}</span>;
}

export function NotAGateway() {
  return (
    <section className="cv-section bg-cv-surface" data-testid="section-not-a-gateway">
      <div className="cv-container">
        <SectionHeading eyebrow="How Agentry compares" title="Not a gateway. Not observability. Not a cost tool.">
          Adjacent tools see pieces. Agentry governs the whole.
        </SectionHeading>

        <div className="mt-10 overflow-x-auto overflow-y-hidden rounded-2xl border border-cv-line/70 dark:border-white/10">
          <table className="w-full min-w-[880px] border-collapse text-left">
            <colgroup>
              <col className="w-[26%]" />
              <col span={4} />
              <col className="w-[15%]" />
            </colgroup>

            <thead>
              <tr>
                <th
                  scope="col"
                  className="sticky left-0 z-10 border-b border-cv-line/70 bg-cv-surface2 px-5 pb-4 pt-5 align-bottom text-[11px] font-semibold uppercase tracking-[0.12em] text-cv-ink/60 dark:border-white/10 dark:bg-[#0D0D0D] dark:text-white/55"
                >
                  Capability
                </th>
                {COLS.map((c) => (
                  <th
                    key={c.name}
                    scope="col"
                    className="border-b border-l border-cv-line/70 bg-cv-surface2 px-4 pb-4 pt-5 align-bottom dark:border-white/10 dark:bg-[#0D0D0D]"
                  >
                    <span className="block text-[12px] font-semibold leading-snug text-cv-ink/85">{c.name}</span>
                    <span className="mt-1 block text-[11px] font-normal leading-snug text-cv-ink/45 dark:text-white/45">
                      {c.examples}
                    </span>
                  </th>
                ))}
                <th
                  scope="col"
                  className="relative border-b border-l border-[#1664C0]/25 bg-[#1664C0]/[0.07] px-4 pb-4 pt-5 align-bottom dark:border-[#7CB8F8]/25 dark:bg-[#1664C0]/[0.16]"
                >
                  {/* featured-column top accent */}
                  <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-[#1664C0] dark:bg-[#7CB8F8]" />
                  <span className="block text-[12px] font-semibold leading-snug text-[#1664C0] dark:text-[#7CB8F8]">
                    CloudVerse Agentry
                  </span>
                  <span className="mt-1 block text-[11px] font-normal leading-snug text-[#1664C0]/70 dark:text-[#7CB8F8]/70">
                    Control plane
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              {ROWS.map((row, ri) => {
                const [cap, ...cells] = row;
                const zebra = ri % 2 === 1;
                return (
                  <tr
                    key={cap}
                    className="group border-t border-cv-line/50 dark:border-white/[0.08]"
                  >
                    <th
                      scope="row"
                      className={`sticky left-0 z-10 border-r border-cv-line/50 px-5 py-4 text-left align-top text-[14px] font-medium leading-snug text-cv-ink transition-colors dark:border-white/[0.08] ${
                        zebra ? "bg-cv-surface2 dark:bg-white/[0.02]" : "bg-cv-surface dark:bg-black"
                      } group-hover:bg-cv-ink/[0.03] dark:group-hover:bg-white/[0.05]`}
                    >
                      {cap}
                    </th>
                    {cells.map((v, i) => {
                      const isAgentry = i === cells.length - 1;
                      if (isAgentry) {
                        return (
                          <td
                            key={i}
                            className="border-l border-[#1664C0]/20 bg-[#1664C0]/[0.07] px-4 py-4 align-top dark:border-[#7CB8F8]/20 dark:bg-[#1664C0]/[0.16]"
                          >
                            <span className="flex items-start gap-2 text-[14px] font-semibold text-cv-ink">
                              <Check />
                              {v}
                            </span>
                          </td>
                        );
                      }
                      return (
                        <td
                          key={i}
                          className={`border-l border-cv-line/40 px-4 py-4 align-top text-[13px] leading-snug transition-colors dark:border-white/[0.06] ${
                            zebra ? "bg-cv-ink/[0.012] dark:bg-white/[0.015]" : ""
                          } group-hover:bg-cv-ink/[0.03] dark:group-hover:bg-white/[0.04]`}
                        >
                          <CompCell value={v} />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-cv-ink/70">
          Each adjacent category is good at its piece. None combines cross-estate discovery, in-path
          enforcement, and an economics ledger deployable inside your own boundary.
        </p>
      </div>
    </section>
  );
}

export default NotAGateway;
