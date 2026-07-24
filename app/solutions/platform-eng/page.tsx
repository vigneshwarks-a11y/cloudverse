import type { Metadata } from "next";
import { DOCS } from "@/lib/links";
import { Code2, Server2, BillList, Programming } from "@/lib/solar-icons";
import { PlatformCards } from "@/components/solution/PlatformCards";
import { RelatedSolutions } from "@/components/solution/RelatedSolutions";
import { Panel, CheckBadge, VIZ_AMBER, VIZ_OK } from "@/components/solution/CardChrome";
import { SituationConnectorMock, type SituationPickItem } from "@/components/solution/SituationConnectorMock";
import { WorkflowHero } from "@/components/solution/WorkflowHero";
import { PlatformShips } from "@/components/solution/PlatformShips";
import { SolutionHero } from "@/components/solution/SolutionHero";
import { HeroBlend } from "@/components/solution/HeroBlend";
import { SectionEyebrow } from "@/components/solution/SectionEyebrow";
import { SectionHeading } from "@/components/SectionHeading";
import { BulletGrid } from "@/components/solution/BulletGrid";
import { WhoThisIsFor } from "@/components/solution/WhoThisIsFor";
import { FaqBlock } from "@/components/FaqBlock";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "For Platform Engineering: Put Cost in the Workflow, Before the Change Ships",
  description: "Infrastructure, code, and AI changes flagged in the pull request, with policy-as-code and right-sizing in your IaC pipeline. Velocity stays. Governance catches up.",
  keywords: ["platform engineering FinOps", "IaC cost management", "policy-as-code cost", "infrastructure right-sizing", "cloud cost gates", "PR cost diff"],
  alternates: { canonical: "/solutions/platform-eng" },
  openGraph: {
    title: "For Platform Engineering: Put Cost in the Workflow, Before the Change Ships",
    description: "PR-level cost diffs, policy-as-code, and right-sizing recommendations in your IaC pipeline.",
    url: "/solutions/platform-eng",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "CloudVerse for Platform Engineering" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "For Platform Engineering: Cost in the Pull Request",
    description: "PR-level cost diffs, policy-as-code, and right-sizing in your IaC pipeline.",
  },
};

const TORB_BILL_LINES: SituationPickItem[] = [
  { label: "Compute · +$2,400/mo", Icon: Server2, bg: "#D9A404", active: true },
  { label: "Storage", Icon: BillList, bg: "#0E9E7A" },
  { label: "Network egress", Icon: Code2, bg: "#2E5CF0" },
  { label: "Unattributed", Icon: Programming, bg: "#94969C" },
];

const COSTS = [
  "Cost regressions noticed at the bill, not at review.",
  "Always-on and oversized resources shipping without a second look.",
  "Cost decisions with no clear owner, settled by month-end finger-pointing.",
  "Rework, because issues get fixed in production instead of once, at the cheapest point.",
];

const OUTCOMES = [
  "Cost: expensive changes caught before they ship, prevented at source.",
  "Risk: fewer surprise bills and regressions reaching production.",
  "Control: ownership on the people making the decision.",
  "Productivity: less firefighting, issues fixed once at the cheapest point.",
  "Velocity: guardrails that keep delivery moving, not blocking it.",
  "Visibility: financial impact inside the workflow, not buried in a bill.",
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
        accent="teal"
        h1={
          <>
            Put cost in the workflow,{" "}
            <span className="text-[#0E9E7A] dark:text-[#5FD3B4]">before the change ships.</span>
          </>
        }
        sub="Infrastructure, code, and AI changes flagged in the pull request. Velocity stays. Governance catches up."
        platformHref="/platform/torb"
      />

      <section className="relative overflow-hidden cv-section">
        <HeroBlend />
        <div className="cv-container relative z-10">
          <div className="flex flex-col items-start gap-10">
            <SectionHeading lead eyebrow="The situation" title="Tests gate the merge. Cost doesn't.">
              <p className="cv-body-lg text-cv-ink/80">
                You already gate code on tests and static analysis. Cost is the one thing that ships unreviewed and shows up weeks later on a bill nobody connects back to that pull request.
              </p>
              <p className="cv-body-lg text-cv-ink/85 mt-4">
                By then the expensive change is in production and the fix means rework. Torb puts the cost estimate in the pull request, where the person who wrote the change can still cheaply change it.
              </p>
            </SectionHeading>
            <SituationConnectorMock
              leftHeading="Pull request"
              leftValue="#1042 · tests passed"
              attributeHeading="Cost impact"
              attributeValue="Not checked at merge"
              connectorLabel="Regresses to"
              rightHeading="Bill line"
              rightSearchPlaceholder="Unattributed, 3 weeks later…"
              items={TORB_BILL_LINES}
            />
          </div>
        </div>
      </section>

      {/* WHAT IT'S COSTING YOU TODAY */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <div className="max-w-2xl mb-8 text-left">
            <SectionEyebrow className="mb-4">The cost of the gap</SectionEyebrow>
            <h2 className="cv-h2 text-cv-ink">What ships unreviewed costs you.</h2>
          </div>
          <BulletGrid items={COSTS} tone="negative" />
        </div>
      </section>

      {/* WHAT YOU SHIP */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="max-w-2xl mb-10 text-left">
            <SectionEyebrow className="mb-4">What you ship</SectionEyebrow>
            <h2 className="cv-h2 text-cv-ink">What platform teams ship with CloudVerse.</h2>
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
          <SectionHeading lead eyebrow="How it works" title={<>How Torb controls<br />every infra change.</>} className="mb-8" docsHref={DOCS.infrastructure}>
            <div className="space-y-4">
              <p className="cv-body-lg text-cv-muted">
                Torb sits in your CI pipeline. On each infra change it estimates the cost delta against your team's policy and posts it inline, with a fallback and a decision log.
              </p>
              <p className="cv-body-lg text-cv-muted">
                A linter runs the rule you wrote. Torb works out whether that rule is still right.
              </p>
            </div>
          </SectionHeading>
          <WorkflowHero />
        </div>
      </section>

      {/* THE PAYBACK */}
      <section className="cv-section">
        <div className="cv-container">
          <SectionHeading lead eyebrow="The payback" title="Most teams recover the cost from a single prevented regression.">
            <p className="cv-body-lg text-cv-ink/75">
              In a typical pre-production review, Torb flags around $2,400 of monthly spend before it ships. One catch pays for the tool. The figure below is illustrative of a single review.
            </p>
          </SectionHeading>
          <div className="mx-auto mt-10 max-w-md">
            <Panel className="justify-center gap-2.5 p-4" chrome="torb.app/payback">
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
          <div className="max-w-2xl mb-8 text-left">
            <SectionEyebrow className="mb-4">Outcomes</SectionEyebrow>
            <h2 className="cv-h2 text-cv-ink">Outcomes your team feels.</h2>
          </div>
          <BulletGrid items={OUTCOMES} tone="positive" />
        </div>
      </section>

      {/* PLATFORM */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="max-w-2xl mb-8 text-left">
            <SectionEyebrow className="mb-4">Platform</SectionEyebrow>
            <h2 className="cv-h2 text-cv-ink">The modules behind the gate.</h2>
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
        heading="Who this is for."
        subhead="The people who ship the change."
        personas={[
          {
            role: "Head of Platform Engineering",
            category: "Platform leadership",
            quote: "Cost sits next to tests and static analysis, one more gate the team already trusts.",
          },
          {
            role: "Head of Development",
            category: "Engineering leadership",
            quote: "Expensive changes get caught in review, not three weeks later on the invoice.",
          },
          {
            role: "Head of Infrastructure Automation",
            category: "Platform engineering",
            quote: "Policy as code, versioned in the repo, with no separate portal to keep in sync.",
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
            eyebrow="FAQ"
            title="Platform engineering questions, answered."
            subtitle="What platform and DevOps leads ask first."
          />
        </div>
      </section>

      <RelatedSolutions current="/solutions/platform-eng" />

      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Solutions", href: "/solutions" }, { name: "Platform Engineering", href: "/solutions/platform-eng" }]} />
    </>
  );
}
