"use client";

import { FeatureCard, Panel, Tab, CodeLine, Callout, CheckBadge, VIZ_BLUE as BLUE, VIZ_AMBER as AMBER } from "@/components/solution/CardChrome";

/* Platform Engineering "what you ship" bento — same image-topped FeatureCard
   idiom as FinopsShips: a bordered panel with a lit top-left edge + ambient
   glow on a dark surface, tables/code panels inside. Theme-aware via
   cv-* tokens. */

/* 1. PR cost diff — code-editor-style panel with an inline cost delta. */
function PrDiffViz() {
  return (
    <Panel className="p-0" chrome="devx.app/pull/1042">
      <div className="flex items-center gap-1.5 border-b border-cv-line px-3 py-2 dark:border-white/10">
        <Tab label="infra/ec2.tf" active />
      </div>
      <div className="flex-1 p-3 font-mono text-[11px] leading-relaxed">
        <div className="flex items-center gap-2 rounded-sm bg-[#EF4444]/10 px-1.5 py-0.5">
          <span className="text-[#EF4444]">-</span>
          <span className="text-cv-ink/65">instance_type = m5.large</span>
        </div>
        <div className="flex items-center gap-2 rounded-sm bg-[#0E9E7A]/10 px-1.5 py-0.5">
          <span className="text-[#0E9E7A]">+</span>
          <span className="text-cv-ink/65">instance_type = m5.2xlarge</span>
        </div>
        <div className="mt-3">
          <span className="rounded-md px-2 py-0.5 font-sans text-[10px] font-semibold" style={{ background: `${BLUE}1f`, color: BLUE }}>
            Cost impact +$1,240 / mo
          </span>
        </div>
      </div>
    </Panel>
  );
}

/* 2. Policy-as-code — line-numbered rule file with an inline warning
   callout, in the idiom of Laravel Cloud's env-var editor tooltip. */
function PolicyViz() {
  return (
    <Panel className="p-0" chrome="devx.app/policy.rego">
      <div className="flex items-center gap-1.5 border-b border-cv-line px-3 py-2 dark:border-white/10">
        <Tab label="Advisory" />
        <Tab label="Required" active />
      </div>
      <div className="flex items-center gap-1.5 px-3 pt-2.5 text-[11px] font-medium" style={{ color: AMBER }}>
        <svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke={AMBER} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 9v4M12 17h.01M10.29 3.86 1.82 18a1 1 0 0 0 .87 1.5h18.62a1 1 0 0 0 .87-1.5L13.71 3.86a1 1 0 0 0-1.72 0Z" />
        </svg>
        This rule blocks 1 pending PR.
      </div>
      <div className="relative flex-1 pt-2 pb-3">
        <CodeLine n={1}><span style={{ color: BLUE }}>rule</span> <span className="text-cv-ink/75">cost_guard {"{"}</span></CodeLine>
        <div className="rounded-sm" style={{ background: `${AMBER}14` }}>
          <CodeLine n={2}><span className="text-cv-ink/75">if delta &gt; $500 → </span><span style={{ color: AMBER }}>block</span></CodeLine>
        </div>
        <CodeLine n={3}><span className="text-cv-ink/55">notify: #platform-eng</span></CodeLine>
        <CodeLine n={4}><span className="text-cv-ink/75">{"}"}</span></CodeLine>
        <div className="mt-2 px-3">
          <Callout>
            <span className="text-cv-ink/85">Required mode</span>{" "}
            <span className="text-cv-muted">blocks the PR until explicitly approved</span>
          </Callout>
        </div>
      </div>
    </Panel>
  );
}

/* 3. Native CI integration — pipeline provider status table. */
function CiViz() {
  const rows = ["GitHub Actions", "GitLab CI", "Azure Pipelines", "Jenkins", "Argo"];
  return (
    <Panel className="p-0" chrome="devx.app/pipelines">
      <div className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-cv-line px-3 py-1.5 text-[10px] uppercase tracking-wide text-cv-muted dark:border-white/10">
        <span>Pipeline</span>
        <span className="text-right">Status</span>
      </div>
      {rows.map((r, i) => (
        <div key={r} className={`grid grid-cols-[1fr_auto] items-center gap-3 px-3 py-2 text-xs ${i > 0 ? "border-t border-cv-line dark:border-white/10" : ""}`}>
          <span className="truncate text-cv-ink/80">{r}</span>
          <CheckBadge>Connected</CheckBadge>
        </div>
      ))}
    </Panel>
  );
}

/* 4. Multi-IaC support — one integration, every format recognized and
   scanned (the claim is breadth, not a percentage, so a checklist reads
   more honestly than a bar chart). */
function IacViz() {
  const formats = ["Terraform", "OpenTofu", "Pulumi", "CloudFormation", "Helm", "Kubernetes"];
  return (
    <Panel className="justify-center gap-3 p-4" chrome="devx.app/iac-formats">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wide text-cv-muted">Scanned on every PR</span>
        <span className="text-[10px] font-medium text-cv-muted">7+ formats</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {formats.map((f) => (
          <div key={f} className="rounded-md border border-cv-line/60 px-2.5 py-1.5 dark:border-white/10">
            <CheckBadge>{f}</CheckBadge>
          </div>
        ))}
      </div>
      <div className="text-[10px] text-cv-muted">One integration. No pipeline change.</div>
    </Panel>
  );
}

const VISUALS: Record<string, () => React.JSX.Element> = {
  "PR cost diff": PrDiffViz,
  "Policy-as-code": PolicyViz,
  "Native CI integration": CiViz,
  "Multi-IaC support": IacViz,
};

export type PlatformShipItem = [title: string, desc: string];

export function PlatformShips({ items }: { items: PlatformShipItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {items.map(([t, b]) => {
        const Viz = VISUALS[t];
        return (
          <FeatureCard key={t} title={t} desc={b}>
            {Viz ? <Viz /> : null}
          </FeatureCard>
        );
      })}
    </div>
  );
}
