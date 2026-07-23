import { CheckCircle } from "@/lib/solar-icons";
import { FeatureCard, Panel, StatusPill, BLUE } from "@/components/product/BentoChrome";
import { Eyebrow } from "@/components/Eyebrow";
import { DocsLink } from "@/components/DocsLink";
import { DOCS } from "@/lib/links";

/* "Cost review, in the workflow engineers already use" — a bento of product
   screenshot mocks on the shared Agentry chrome (FeatureCard + Panel). */

function PrDiffViz() {
  return (
    <Panel className="gap-2 p-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-cv-line/70 px-1 pb-2 dark:border-white/10">
        <span className="text-cv-ink/70">main.tf</span>
        <span className="rounded-full px-2 py-0.5 text-[10px] font-medium text-[#1664C0] dark:text-[#7CB8F8]" style={{ background: `${BLUE}1F` }}>
          cost impact
        </span>
      </div>
      <div className="mt-1 flex items-center justify-between rounded px-2 py-1.5 bg-[#EF4444]/[0.08] text-cv-ink/70">
        <span>- t3.large</span>
        <span>$2,400/mo</span>
      </div>
      <div className="flex items-center justify-between rounded px-2 py-1.5 text-[#1664C0] dark:text-[#7CB8F8]" style={{ background: `${BLUE}1F` }}>
        <span>+ t3.medium</span>
        <span>$1,200/mo</span>
      </div>
      <div className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold text-cv-teal">
        <CheckCircle weight="Bold" size={13} /> saves $1,200/mo
      </div>
    </Panel>
  );
}

function PolicyViz() {
  const rows: [string, "flag" | "blocked", string][] = [
    ["advisory", "flag", "warn and continue"],
    ["required", "blocked", "block until resolved"],
  ];
  return (
    <Panel className="text-xs">
      <div className="grid grid-cols-[auto_1fr] gap-3 border-b border-cv-line px-4 py-2 text-[10px] uppercase tracking-wide text-cv-ink/70 dark:border-white/10">
        <span>Mode</span>
        <span>Trigger</span>
      </div>
      {rows.map(([mode, kind, trigger]) => (
        <div key={mode} className="grid grid-cols-[auto_1fr] items-center gap-3 border-t border-cv-line px-4 py-3 first:border-t-0 dark:border-white/10">
          <StatusPill kind={kind} label={mode} />
          <span className="text-cv-ink/70">{trigger}</span>
        </div>
      ))}
      <div className="border-t border-cv-line px-4 py-2.5 text-[11px] text-cv-ink/70 dark:border-white/10">Rules versioned in the repo</div>
    </Panel>
  );
}

function CiViz() {
  const platforms = ["GitHub Actions", "GitLab CI", "Azure Pipelines", "Jenkins", "Argo"];
  return (
    <Panel className="gap-1 p-4 text-xs">
      {platforms.map((p) => (
        <div
          key={p}
          className="flex items-center justify-between border-t border-cv-line/70 px-1 py-2.5 first:border-t-0 dark:border-white/10"
        >
          <span className="text-cv-ink/80">{p}</span>
          <StatusPill kind="ok" label="connected" />
        </div>
      ))}
    </Panel>
  );
}

function IacViz() {
  const tools = ["Terraform", "OpenTofu", "Pulumi", "CloudFormation", "Helm", "Kubernetes"];
  return (
    <Panel className="p-4">
      <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
        {tools.map((t) => (
          <div key={t} className="flex items-center gap-2 text-cv-ink/80">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full" style={{ background: `${BLUE}26` }}>
              <CheckCircle weight="Linear" className="h-2.5 w-2.5 text-[#1664C0] dark:text-[#7CB8F8]" />
            </span>
            {t}
          </div>
        ))}
      </div>
      <div className="mt-4 text-[11px] font-semibold text-[#1664C0] dark:text-[#7CB8F8]">7+ formats supported</div>
    </Panel>
  );
}

const CARDS = [
  { title: "PR cost diff", desc: "The before-and-after cost of a change, line by line.", viz: <PrDiffViz /> },
  { title: "Policy-as-code", desc: "Cost rules in version control.", viz: <PolicyViz /> },
  { title: "Native CI integration", desc: "Runs in the pipeline you already have.", viz: <CiViz /> },
  { title: "Multi-IaC support", desc: "Reads your infrastructure as it's written.", viz: <IacViz /> },
];

export default function CostGates() {
  return (
    <section className="cv-section">
      <div className="cv-container">
        <div className="mb-10 max-w-3xl text-left">
          <Eyebrow>Cost review</Eyebrow>
          <h2 className="cv-h2 text-cv-ink lg:whitespace-nowrap">Cost review, in the workflow engineers already use.</h2>
          <DocsLink href={DOCS.infrastructure} className="mt-5" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {CARDS.map(({ title, desc, viz }) => (
            <FeatureCard key={title} title={title} desc={desc}>
              {viz}
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}
