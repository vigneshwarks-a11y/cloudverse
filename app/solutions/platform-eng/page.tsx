import Link from "next/link";
import { ArrowRight, Code2 } from "@solar-icons/react";
import type { Metadata } from "next";
import { DEMO_URL } from "@/lib/links";
import { PlatformCards } from "@/components/solution/PlatformCards";
import { PlatformShips } from "@/components/solution/PlatformShips";
import { SolutionHero } from "@/components/solution/SolutionHero";
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
  ["Will this slow down our PR flow?", "No. DevX runs as a fast check and posts a single inline comment. No extra approval step unless you opt into required mode."],
  ["Which IaC tools are supported?", "Terraform, OpenTofu, Pulumi, CloudFormation, Helm, Kubernetes, raw Kubernetes."],
  ["How do we manage cost policy?", "Policies are code in your repo. Version controlled, reviewable, auditable like any other config."],
  ["What is the path from PR comment to actual savings?", "The engineer adjusts the change, the regression never reaches production. The saving is the cost of the avoided change multiplied by its lifetime."],
];

export default function PlatformEngPage() {
  return (
    <>
      <SolutionHero
        eyebrow="For Platform Engineering"
        h1="Cost Gates Engineers Actually Want to Use"
        sub="PR-level cost diffs, policy-as-code, and right-sizing recommendations in your IaC pipeline. Quantified savings rolled into FinOps."
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
          <h2 className="cv-h2 text-cv-ink">The situation platform engineering teams are in</h2>
          <p className="cv-body-lg text-cv-ink/80 mt-6">
            You have tried sending cost reports to engineering teams. The response is silence or confusion. The numbers do not connect to anything engineers can act on at the moment they are making decisions.
          </p>
          <p className="cv-body-lg text-cv-ink/85 mt-4">
            DevX puts the cost estimate in the PR. Before the code ships. While the engineer still has context on what they built and why.
          </p>
          <p className="cv-body-lg text-cv-ink font-medium mt-4 italic">
            The cost comment arrives the same way a test failure does. In context. With a suggested fix. Before the merge.
          </p>
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

      <section className="cv-section">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-8">Platform that powers this solution</h2>
          <PlatformCards
            items={[
              ["DevX", "Shift-left cost intelligence", "/platform/devx"],
              ["FinOps Platform", "Multi-cloud cost intelligence", "/platform/finops"],
              ["AIX", "GPU and LLM economics", "/platform/aix"],
            ]}
          />
        </div>
      </section>

      <section className="cv-section">
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
