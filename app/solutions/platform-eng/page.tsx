import type { Metadata } from "next";
import { Code2, Server2, MagicStick3, BillList, DocumentText, CheckSquare, Tuning, Programming, Widget2, Tuning2, Routing } from "@/lib/solar-icons";
import { PlatformCards } from "@/components/solution/PlatformCards";
import { Panel, CheckBadge, VIZ_AMBER, VIZ_GRAY, VIZ_OK } from "@/components/solution/CardChrome";
import { HowItWorksFlow, type FlowChip, type FlowWorkload, type FlowRightNode } from "@/components/solution/HowItWorksFlow";
import { PlatformShips } from "@/components/solution/PlatformShips";
import { SolutionHero } from "@/components/solution/SolutionHero";
import { SectionEyebrow } from "@/components/solution/SectionEyebrow";
import { BulletGrid } from "@/components/solution/BulletGrid";
import { WhoThisIsFor } from "@/components/solution/WhoThisIsFor";
import { FaqBlock } from "@/components/FaqBlock";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "For Platform Engineering: Cost Gates Engineers Actually Want to Use",
  description: "PR-level cost diffs, policy-as-code, and right-sizing recommendations in your IaC pipeline. Quantified savings rolled into FinOps.",
  keywords: ["platform engineering FinOps", "IaC cost management", "policy-as-code cost", "infrastructure right-sizing", "cloud cost gates", "PR cost diff"],
  alternates: { canonical: "/solutions/platform-eng" },
  openGraph: {
    title: "For Platform Engineering: Cost Gates Engineers Actually Want to Use",
    description: "PR-level cost diffs, policy-as-code, and right-sizing recommendations in your IaC pipeline.",
    url: "/solutions/platform-eng",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "CloudVerse for Platform Engineering" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "For Platform Engineering: Cost Gates Engineers Want to Use",
    description: "PR-level cost diffs, policy-as-code, and right-sizing recommendations in your IaC pipeline.",
  },
};

const COSTS = [
  "Cost regressions noticed at the bill, not at review",
  "Always-on and oversized resources shipping without a second look",
  "Cost decisions with no clear owner, settled by month-end finger-pointing",
  "Rework: issues fixed in production instead of once, at the cheapest point",
];

const OUTCOMES = [
  "Cost: expensive changes caught before they ship, prevented at source",
  "Risk: fewer surprise bills and regressions reaching production",
  "Control: ownership on the people making the decision",
  "Productivity: less firefighting; issues fixed once, at the cheapest point",
  "Velocity: guardrails that keep delivery moving, not blocking it",
  "Visibility: financial impact inside the workflow, not buried in a bill",
];

const HOW_IT_WORKS_WORKLOADS: FlowWorkload[] = [
  { label: "Pull Requests", sub: "Every infra change", color: "#1664C0", Icon: Code2 },
  { label: "Infra Changes", sub: "Terraform, Helm, K8s", color: "#0E9E7A", Icon: Server2 },
  { label: "AI-Assisted Commits", sub: "New model calls & agent loops", color: "#6954D4", Icon: MagicStick3 },
];

const HOW_IT_WORKS_CHIPS: FlowChip[] = [
  { label: "Cost Diff", color: "#1664C0", Icon: BillList },
  { label: "Policy as Code", color: "#D97706", Icon: DocumentText },
  { label: "CI Checks", color: "#0E9E7A", Icon: CheckSquare },
  { label: "Right-Sizing", color: "#6954D4", Icon: Tuning },
];

const HOW_IT_WORKS_RIGHT: FlowRightNode[] = [
  { kind: "tile", label: "GitHub Actions", color: "#1664C0", Icon: Programming },
  { kind: "tile", label: "GitLab CI", color: "#D97706", Icon: Code2 },
  { kind: "tile", label: "Azure Pipelines", color: "#0E9E7A", Icon: Widget2 },
  { kind: "tile", label: "Jenkins", color: "#6954D4", Icon: Tuning2 },
  { kind: "tile", label: "Argo", color: "#1664C0", Icon: Routing },
  { kind: "logo", src: "/icons/kubernetes.svg", name: "Kubernetes" },
];

const FAQ = [
  ["Does it slow the PR flow?", "No. It runs alongside CI and comments. It only blocks a merge if you set a required policy."],
  ["Which IaC tools are supported?", "Terraform, Pulumi, CloudFormation, and Kubernetes, among others."],
  ["How are policies managed?", "As code in the repo. Advisory warns; required blocks. Reviewed like any change."],
  ["What's the savings path?", "Prevented regressions, tracked over time. Most teams clear the cost on the first catch."],
  ["Does it handle AI cost in code?", "Yes. It flags the new model call or chatty agent loop an AI-assisted commit adds."],
];

export default function PlatformEngPage() {
  return (
    <>
      <SolutionHero
        eyebrow="For Platform Engineering"
        h1="Cost gates engineers actually want to use."
        sub="PR-level cost diffs, policy-as-code, and right-sizing recommendations in your IaC pipeline. Guardrails that keep delivery moving."
        platformHref="/platform/torb"
      />

      <section className="cv-section">
        <div className="cv-container">
          <div className="flex flex-col items-center gap-10">
            <div className="mx-auto max-w-2xl text-center">
              <SectionEyebrow className="mb-4">The situation</SectionEyebrow>
              <h2 className="cv-h2 text-cv-ink">The situation platform engineering teams are in.</h2>
              <p className="cv-body-lg text-cv-ink/80 mt-6">
                You already gate code on tests and static analysis. Cost is the one thing that ships unreviewed and shows up weeks later on a bill nobody connects back to that pull request.
              </p>
              <p className="cv-body-lg text-cv-ink/85 mt-4">
                By then the expensive change is in production and the fix means rework. Torb puts the cost estimate in the pull request, where the person who wrote the change can still cheaply change it.
              </p>
            </div>
            <div className="mx-auto w-full max-w-3xl">
              <Panel className="justify-between p-6" chrome="devx.app/pull/1042">
                <span className="text-[10px] uppercase tracking-wide text-cv-muted">Merge checks</span>
                <div className="flex items-center justify-between rounded-md border border-cv-line/60 px-3.5 py-4 text-xs dark:border-white/10">
                  <span className="text-cv-ink/75">Unit tests</span>
                  <CheckBadge>Passed</CheckBadge>
                </div>
                <div className="flex items-center justify-between rounded-md border border-cv-line/60 px-3.5 py-4 text-xs dark:border-white/10">
                  <span className="text-cv-ink/75">Static analysis</span>
                  <CheckBadge>Passed</CheckBadge>
                </div>
                <div className="flex items-center justify-between rounded-md border border-dashed border-cv-line/60 px-3.5 py-4 text-xs dark:border-white/15">
                  <span className="text-cv-ink/50">Cost impact</span>
                  <span className="font-medium" style={{ color: VIZ_GRAY }}>Not checked</span>
                </div>
                <div className="my-1 flex items-center justify-center text-[10px] uppercase tracking-wide text-cv-muted">3 weeks later ↓</div>
                <div className="flex items-center justify-between gap-3 rounded-md px-3.5 py-4 text-xs" style={{ background: `${VIZ_AMBER}12` }}>
                  <span className="min-w-0 flex-1" style={{ color: VIZ_AMBER }}>Unattributed regression on the bill</span>
                  <span className="shrink-0 whitespace-nowrap font-mono font-semibold" style={{ color: VIZ_AMBER }}>+$2,400/mo</span>
                </div>
              </Panel>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IT'S COSTING YOU TODAY */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <div className="mx-auto max-w-2xl mb-8 text-center">
            <SectionEyebrow className="mb-4">The cost of the gap</SectionEyebrow>
            <h2 className="cv-h2 text-cv-ink">What that&apos;s costing you today.</h2>
          </div>
          <BulletGrid items={COSTS} tone="negative" />
        </div>
      </section>

      {/* WHAT YOU SHIP */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="mx-auto max-w-2xl mb-10 text-center">
            <SectionEyebrow className="mb-4">What you ship</SectionEyebrow>
            <h2 className="cv-h2 text-cv-ink">What platform teams ship with CloudVerse</h2>
          </div>
          <PlatformShips
            items={[
              ["PR cost diff", "Every infra PR gets an inline cost impact estimate before reviewers see it. Advisory or required, your choice. The governance happens where the work happens."],
              ["Policy-as-code", "Cost guardrails versioned in your repo. Advisory mode posts an estimate. Required mode blocks PRs above your defined cost threshold until explicitly approved. Both modes are code, not configuration buried in a third-party portal."],
              ["Native CI integration", "GitHub Actions, GitLab CI, Azure Pipelines, Jenkins, Argo. No new pipeline. Torb slots into what your teams already use."],
              ["Multi-IaC support", "Terraform, OpenTofu, Pulumi, CloudFormation, Helm, Kubernetes. Seven-plus formats. One integration."],
            ]}
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <div className="mx-auto max-w-3xl mb-12 text-center">
            <SectionEyebrow className="mb-4">How it works</SectionEyebrow>
            <h2 className="cv-h2 text-cv-ink">How Torb controls every infra change.</h2>
            <div className="mt-4 space-y-4">
              <p className="cv-body-lg text-cv-muted">
                Torb sits in your CI pipeline and every pull request. On each infra change it estimates the cost delta against policy your team wrote, then posts it inline with a fallback path and a full decision log.
              </p>
              <p className="cv-body-lg text-cv-muted">
                A linter runs the rule you wrote. Torb works out whether that rule is still right.
              </p>
            </div>
          </div>
          <HowItWorksFlow
            workloads={HOW_IT_WORKS_WORKLOADS}
            chips={HOW_IT_WORKS_CHIPS}
            hubLabel="Cost · Risk · Ownership"
            hubSub="evaluated before it merges"
            right={HOW_IT_WORKS_RIGHT}
            bottomRows={["Terraform / OpenTofu / Pulumi", "CloudFormation / Helm"]}
          />
        </div>
      </section>

      {/* THE PAYBACK */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="max-w-3xl mx-auto text-center">
            <SectionEyebrow className="mb-4">The payback</SectionEyebrow>
            <h2 className="cv-h2 text-cv-ink">Most teams recover the cost from a single prevented regression.</h2>
            <p className="cv-body-lg text-cv-ink/75 mt-5">
              In a typical pre-production review, Torb flags around $2,400 of monthly spend before it ships. One catch pays for the tool.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-md">
            <Panel className="justify-center gap-2.5 p-4" chrome="devx.app/payback">
              <div className="flex items-center justify-between rounded-md border border-cv-line/60 px-3.5 py-4 text-xs dark:border-white/10">
                <span className="text-cv-ink/70">Flagged before merge</span>
                <span className="font-mono font-semibold" style={{ color: VIZ_AMBER }}>+$2,400/mo</span>
              </div>
              <div className="flex items-center justify-between rounded-md border border-cv-line/60 px-3.5 py-4 text-xs dark:border-white/10">
                <span className="text-cv-ink/70">Reviewed &amp; confirmed</span>
                <CheckBadge>Same PR</CheckBadge>
              </div>
              <div className="flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs" style={{ background: `${VIZ_OK}12` }}>
                <span style={{ color: VIZ_OK }}>Tool pays for itself</span>
                <span className="font-mono font-semibold" style={{ color: VIZ_OK }}>First catch</span>
              </div>
            </Panel>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <div className="mx-auto max-w-2xl mb-8 text-center">
            <SectionEyebrow className="mb-4">Outcomes</SectionEyebrow>
            <h2 className="cv-h2 text-cv-ink">Outcomes your team feels.</h2>
          </div>
          <BulletGrid items={OUTCOMES} tone="positive" />
        </div>
      </section>

      {/* PLATFORM */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="mx-auto max-w-2xl mb-8 text-center">
            <SectionEyebrow className="mb-4">Platform</SectionEyebrow>
            <h2 className="cv-h2 text-cv-ink">Platform that powers this solution</h2>
          </div>
          <PlatformCards
            items={[
              ["Torb", "Cost context in the pull request", "/platform/torb"],
              ["Agentry", "Catches the new model call or agent loop an AI-assisted commit introduces", "/platform/agentry"],
              ["FinOps Platform", "The spend those changes commit, allocated and forecast", "/platform/finops"],
            ]}
          />
        </div>
      </section>

      <WhoThisIsFor
        accent="#0E9E7A"
        personas={[
          {
            role: "Head of Platform Engineering",
            category: "Platform leadership",
            quote: "Cost sits next to tests and static analysis — one more gate the team already trusts.",
          },
          {
            role: "Head of Development",
            category: "Engineering leadership",
            quote: "Expensive changes get caught in review, not three weeks later on the invoice.",
          },
          {
            role: "Head of Infrastructure Automation",
            category: "Platform engineering",
            quote: "Policy as code, versioned in the repo — no separate portal to keep in sync.",
          },
          {
            role: "DevOps / SRE leads",
            category: "Operations",
            quote: "PR-level cost diffs mean fewer surprise regressions to firefight after the fact.",
          },
        ]}
      />

      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <FaqBlock
            items={FAQ.map(([q, a]) => ({ q, a }))}
            accent="#1664C0"
            title="Platform Engineering Questions Answered"
            subtitle="Common questions we get asked the most"
          />
        </div>
      </section>

      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Solutions", href: "/solutions" }, { name: "Platform Engineering", href: "/solutions/platform-eng" }]} />
    </>
  );
}
