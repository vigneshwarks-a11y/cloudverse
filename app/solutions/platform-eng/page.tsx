import Link from "next/link";
import { ArrowRight, CheckCircle, CloseCircle, Code2 } from "@solar-icons/react";
import type { Metadata } from "next";
import { DEMO_URL } from "@/lib/links";
import { PlatformCards } from "@/components/solution/PlatformCards";
import { PlatformShips } from "@/components/solution/PlatformShips";
import { SolutionHero } from "@/components/solution/SolutionHero";
import { WhoThisIsFor } from "@/components/solution/WhoThisIsFor";
import { FaqBlock } from "@/components/FaqBlock";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "For Platform Engineering — Cost Gates Engineers Actually Want to Use | CloudVerse",
  description: "PR-level cost diffs, policy-as-code, and right-sizing recommendations in your IaC pipeline. Quantified savings rolled into FinOps.",
  keywords: ["platform engineering FinOps", "IaC cost management", "policy-as-code cost", "infrastructure right-sizing", "cloud cost gates", "PR cost diff"],
  alternates: { canonical: "/solutions/platform-eng" },
  openGraph: {
    title: "For Platform Engineering — Cost Gates Engineers Actually Want to Use",
    description: "PR-level cost diffs, policy-as-code, and right-sizing recommendations in your IaC pipeline.",
    url: "/solutions/platform-eng",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "CloudVerse for Platform Engineering" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "For Platform Engineering — Cost Gates Engineers Want to Use",
    description: "PR-level cost diffs, policy-as-code, and right-sizing recommendations in your IaC pipeline.",
  },
};

const STATS = [
  { v: "+$2.4k to $2.9k", l: "flagged from a single PR" },
  { v: "Free tier", l: "available" },
  { v: "GitHub, GitLab, Azure DevOps", l: "native" },
  { v: "7+", l: "IaC formats supported" },
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
        accent="#0E9E7A"
        icon={Code2}
        platformHref="/platform/devx"
        badges={["PR-Level Diffs", "Policy-as-Code", "CI Native", "Cost Gates", "Shift-Left", "7+ IaC Formats"]}
      />

      <section className="pt-8 pb-12 lg:pt-10 lg:pb-16">
        <div className="max-w-cv mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {STATS.map((s) => (
              <div
                key={s.l}
                className="flex flex-col items-center justify-center rounded-2xl border border-cv-ink/10 dark:border-white/10 px-6 py-10 text-center bg-white/40 dark:bg-[#0D0D0D] backdrop-blur-sm"
              >
                <div className="font-mono text-2xl lg:text-3xl font-bold text-cv-ink tracking-tight">{s.v}</div>
                <p className="mt-3 text-sm font-medium text-cv-muted tracking-wide max-w-[160px] line-clamp-2">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cv-section">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink">The situation platform engineering teams are in.</h2>
          <p className="cv-body-lg text-cv-ink/80 mt-6">
            You already gate code on tests and static analysis. Cost is the one thing that ships unreviewed and shows up weeks later on a bill nobody connects back to that pull request.
          </p>
          <p className="cv-body-lg text-cv-ink/85 mt-4">
            By then the expensive change is in production and the fix means rework. DevX puts the cost estimate in the pull request, where the person who wrote the change can still cheaply change it.
          </p>
        </div>
      </section>

      {/* WHAT IT'S COSTING YOU TODAY */}
      <section className="cv-section bg-cv-surface dark:bg-black">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-8">What that&apos;s costing you today.</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Cost regressions noticed at the bill, not at review",
              "Always-on and oversized resources shipping without a second look",
              "Cost decisions with no clear owner, settled by month-end finger-pointing",
              "Rework: issues fixed in production instead of once, at the cheapest point",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3 text-cv-ink/85">
                <CloseCircle weight="Linear" size={18} className="text-cv-muted mt-0.5 shrink-0" /> {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="cv-section bg-cv-surface dark:bg-black">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-10">What platform teams ship with cloudverse</h2>
          <PlatformShips
            items={[
              ["PR cost diff", "Every infra PR gets an inline cost impact estimate before reviewers see it. Advisory or required, your choice. The governance happens where the work happens."],
              ["Policy-as-code", "Cost guardrails versioned in your repo. Advisory mode posts an estimate. Required mode blocks PRs above your defined cost threshold until explicitly approved. Both modes are code, not configuration buried in a third-party portal."],
              ["Native CI integration", "GitHub Actions, GitLab CI, Azure Pipelines, Jenkins, Argo. No new pipeline. DevX slots into what your teams already use."],
              ["Multi-IaC support", "Terraform, OpenTofu, Pulumi, CloudFormation, Helm, Kubernetes. Seven-plus formats. One integration."],
            ]}
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="cv-section">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-10">How platform teams run it.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              ["Install", "Install the CI check on your repos. No workflow change."],
              ["Write", "Write cost policy as code: thresholds, advisory or required, per team."],
              ["Review", "Review the cost diff inline on every pull request."],
              ["Track", "Track prevented spend over time, by team and repo."],
            ].map(([title, body], i) => (
              <div key={title} className="rounded-2xl border border-cv-line/40 bg-cv-surface2 dark:bg-[#0D0D0D] p-6">
                <div className="text-xs uppercase tracking-widest text-cv-muted">Step 0{i + 1}</div>
                <h3 className="cv-h3 text-cv-ink mt-2">{title}</h3>
                <p className="text-cv-ink/75 mt-3 leading-relaxed text-sm">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI */}
      <section className="cv-section bg-cv-surface dark:bg-black">
        <div className="cv-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="cv-h2 text-cv-ink">Most teams recover the cost from a single prevented regression.</h2>
            <p className="cv-body-lg text-cv-ink/75 mt-5">
              In a typical pre-production review, DevX flags around $2,400 of monthly spend before it ships. One catch pays for the tool.
            </p>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="cv-section">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-8">Outcomes your team feels.</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Cost: expensive changes caught before they ship, prevented at source",
              "Risk: fewer surprise bills and regressions reaching production",
              "Control: ownership on the people making the decision",
              "Productivity: less firefighting; issues fixed once, at the cheapest point",
              "Velocity: guardrails that keep delivery moving, not blocking it",
              "Visibility: financial impact inside the workflow, not buried in a bill",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3 text-cv-ink/85">
                <CheckCircle weight="Linear" size={18} className="text-cv-teal mt-0.5 shrink-0" /> {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="cv-section bg-cv-surface dark:bg-black">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-8">Platform that powers this solution</h2>
          <PlatformCards
            items={[
              ["DevX", "Cost context in the pull request", "/platform/devx"],
              ["AIX", "Catches the new model call or agent loop an AI-assisted commit introduces", "/platform/aix"],
              ["FinOps Platform", "The spend those changes commit, allocated and forecast", "/platform/finops"],
            ]}
          />
        </div>
      </section>

      <WhoThisIsFor
        roles={["Head of Platform Engineering", "Head of Development", "Head of Infrastructure Automation", "DevOps / SRE leads"]}
        accent="#0E9E7A"
      />

      <section className="cv-section bg-cv-surface dark:bg-black">
        <div className="cv-container">
          <div className="text-center mb-10">
            <h2 className="cv-h2 text-cv-ink">Platform Engineering Questions Answered</h2>
          </div>
          <FaqBlock items={FAQ.map(([q, a]) => ({ q, a }))} accent="#1664C0" />
        </div>
      </section>

      <ClosingCTA />
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Solutions", href: "/solutions" }, { name: "Platform Engineering", href: "/solutions/platform-eng" }]} />
    </>
  );
}
