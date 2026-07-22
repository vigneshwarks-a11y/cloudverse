/* "How Agentry works — Discover, Govern, Prove" — the three things that have to be
   true before you can trust AI spend, as three numbered capability cards with an
   accent per step. Matches the home card design language: cv-* tokens,
   pill chip, rounded-2xl bordered cards. Server component. */

import { IconFileSearch, IconShield, IconReceipt } from "nucleo-isometric";

type Step = {
  n: string;
  title: string;
  body: string;
  color: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
};

const STEPS: Step[] = [
  {
    n: "01",
    title: "Discover",
    color: "#1664C0",
    Icon: IconFileSearch,
    body: "Find every AI asset in one governed inventory: agents on Bedrock, Azure AI Foundry, and Vertex; SaaS agents like Copilot Studio and Agentforce; Kubernetes and in-house builds. Shadow AI included.",
  },
  {
    n: "02",
    title: "Govern",
    color: "#6954D4",
    Icon: IconShield,
    body: "Enforcement lives in the execution path, not in a report after the fact: budgets reserved and settled per call, policy and human-approval gates, model routing and failover, a kill switch that works mid-incident.",
  },
  {
    n: "03",
    title: "Prove",
    color: "#0E9E7A",
    Icon: IconReceipt,
    body: "An execution ledger records every call, route decision, token, and cost, with policy-governed prompt and response capture, so your spend and value claims are evidence, not estimates.",
  },
];

export function HowAgentryWorks() {
  return (
    <section className="cv-section bg-cv-surface" data-testid="section-how-agentry-works">
      <div className="cv-container">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#1664C0]/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#1664C0] dark:bg-[#7CB8F8]/15 dark:text-[#7CB8F8]">
            How Agentry works
          </span>
          <h2 className="cv-h2 text-balance text-cv-ink">
            Three things have to be true before you can trust AI spend.
          </h2>
          <p className="cv-body mt-4 text-cv-ink/70">
            Agentry does all three: discover what&apos;s running, govern it in the execution path, and
            prove the economics after.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.title}
              className="relative flex flex-col overflow-hidden rounded-2xl border border-cv-line/60 bg-cv-surface2 p-7 dark:border-white/10 dark:bg-[#0D0D0D]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl"
                style={{ background: `radial-gradient(circle, ${s.color}26, transparent 70%)` }}
              />
              <div className="relative flex items-center justify-between">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: `${s.color}1A`, color: s.color }}
                >
                  <s.Icon size={30} />
                </span>
                <span className="font-mono text-sm font-semibold" style={{ color: s.color }}>
                  {s.n}
                </span>
              </div>
              <h3 className="relative mt-5 text-xl font-semibold text-cv-ink">{s.title}</h3>
              <p className="relative mt-3 cv-body text-cv-ink/65">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowAgentryWorks;
