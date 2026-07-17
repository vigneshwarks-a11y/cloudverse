/* "Architecture — deployed in your environment" — a call-path diagram (AI
   surfaces → AIX inside your boundary → model providers) with the reserve →
   route → settle → log pipeline, followed by the four deployment guarantees.
   Matches the home design language: cv-* tokens, pill chip, bordered cards.
   Server component. */

import { Server, LockKeyhole, DocumentText, UsersGroupRounded } from "@/lib/solar-icons";
import type { IconWeight } from "@solar-icons/react";

const SURFACES = ["Agents", "Apps", "IDEs", "RAG pipelines", "Copilots"];
const PROVIDERS = ["Commercial APIs", "Cloud-hosted", "Sovereign / local"];
const PIPELINE = ["Budget reserved", "Policy-selected route + failover", "Call", "Settled", "Logged to ledger"];

type Guarantee = {
  title: string;
  body: string;
  Icon: React.ComponentType<{ weight?: IconWeight; size?: number }>;
};

const GUARANTEES: Guarantee[] = [
  {
    Icon: Server,
    title: "Runs in your environment",
    body: "Your government or commercial cloud tenancy, or on-premises. The data plane stays inside your boundary.",
  },
  {
    Icon: DocumentText,
    title: "Prompt capture is a policy, per workload",
    body: "Full capture, redacted, or metadata-only. Your choice, per scope.",
  },
  {
    Icon: UsersGroupRounded,
    title: "Six-role RBAC across every surface",
    body: "Reading a prompt is itself a governed, permissioned action.",
  },
  {
    Icon: LockKeyhole,
    title: "Hash-verified records",
    body: "Every prompt view logged. “Who read this” and “what did it cost” are both queryable.",
  },
];

function Column({ label, items, accent }: { label: string; items: string[]; accent: string }) {
  return (
    <div className="flex-1">
      <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-cv-muted">{label}</div>
      <div className="space-y-2">
        {items.map((it) => (
          <div
            key={it}
            className="rounded-lg border border-cv-line/60 bg-cv-surface px-3 py-2.5 text-sm text-cv-ink/80 dark:border-white/10 dark:bg-black"
          >
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full align-middle" style={{ background: accent }} />
            {it}
          </div>
        ))}
      </div>
    </div>
  );
}

export function AixDeployment() {
  return (
    <section className="cv-section bg-cv-surface2 dark:bg-black" data-testid="section-architecture">
      <div className="cv-container">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14 lg:items-end">
          <div>
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#6954D4]/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#6954D4] dark:text-[#B7A9F5]">
              Architecture
            </span>
            <h2 className="cv-h2 text-balance text-cv-ink">In the call path. Deployed in your environment.</h2>
          </div>
          <p className="cv-body text-cv-ink/70 lg:max-w-md lg:justify-self-end">
            AIX sits between your AI surfaces (agents, apps, IDEs, RAG pipelines, copilots)
            and your model providers, whether commercial APIs, cloud-hosted, or sovereign/local models.
          </p>
        </div>

        {/* Call-path diagram */}
        <div className="mt-10 rounded-2xl border border-cv-line/60 bg-cv-surface p-5 sm:p-7 dark:border-white/10 dark:bg-[#0D0D0D]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-3">
            <Column label="Your AI surfaces" items={SURFACES} accent="#1664C0" />

            {/* AIX core */}
            <div className="flex-[1.4]">
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[#6954D4] dark:text-[#B7A9F5]">
                CloudVerse AIX · inside your boundary
              </div>
              <div className="rounded-xl border border-[#6954D4]/35 bg-[#6954D4]/[0.06] p-4">
                <ol className="space-y-2">
                  {PIPELINE.map((step, i) => (
                    <li key={step} className="flex items-center gap-3 text-sm text-cv-ink/85">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#6954D4]/15 font-mono text-[11px] font-semibold text-[#6954D4] dark:text-[#B7A9F5]">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <Column label="Model providers" items={PROVIDERS} accent="#0E9E7A" />
          </div>
        </div>

        {/* Deployment guarantees */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GUARANTEES.map((g) => (
            <div
              key={g.title}
              className="rounded-2xl border border-cv-line/60 bg-cv-surface p-5 dark:border-white/10 dark:bg-[#0D0D0D]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1664C0]/12 text-[#1664C0] dark:bg-[#7CB8F8]/15 dark:text-[#7CB8F8]">
                <g.Icon weight="Linear" size={20} />
              </span>
              <h3 className="mt-4 text-base font-semibold text-cv-ink">{g.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cv-ink/65">{g.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AixDeployment;
