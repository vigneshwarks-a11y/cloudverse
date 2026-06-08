import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { DEMO_URL } from "@/lib/links";
import { PlatformCards } from "@/components/solution/PlatformCards";

export const metadata: Metadata = {
  title: "For Platform Engineering — Cost Gates Engineers Actually Want to Use | CloudVerse",
  description: "PR-level cost diffs, policy-as-code, and right-sizing recommendations in your IaC pipeline. Quantified savings rolled into FinOps.",
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
      <section className="cv-hero-bg pt-[120px] pb-16 lg:pt-[160px] lg:pb-24 relative">
        <div className="cv-container relative z-10 max-w-4xl">
          <div className="text-xs uppercase tracking-widest text-cv-muted mb-3">For Platform Engineering</div>
          <h1 className="cv-h1 text-cv-ink">Cost Gates Engineers Actually Want to Use</h1>
          <p className="cv-body-lg mt-6 text-cv-ink/75">
            PR-level cost diffs, policy-as-code, and right-sizing recommendations in your IaC pipeline. Quantified savings rolled into FinOps.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={DEMO_URL} className="cv-btn-primary"><span>Book a Demo</span><ArrowRight size={16} /></Link>
            <Link href="/platform/devx" className="cv-btn-ghost">Explore the Platform</Link>
          </div>
        </div>
      </section>

      <section className="border-y border-cv-line bg-cv-surface2/40">
        <div className="cv-container py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <div key={s.l}>
              <div className="text-2xl lg:text-3xl font-display font-semibold text-cv-ink">{s.v}</div>
              <div className="text-sm text-cv-muted mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="cv-section">
        <div className="cv-container max-w-4xl">
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

      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <div className="max-w-3xl mb-10">
            <h2 className="cv-h2 text-cv-ink">What platform teams ship with CloudVerse</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              ["PR cost diff", "Every infra PR gets an inline cost impact estimate before reviewers see it. Advisory or required, your choice. The governance happens where the work happens."],
              ["Policy-as-code", "Cost guardrails versioned in your repo. Advisory mode posts an estimate. Required mode blocks PRs above your defined cost threshold until explicitly approved. Both modes are code, not configuration buried in a third-party portal."],
              ["Native CI integration", "GitHub Actions, GitLab CI, Azure Pipelines, Jenkins, Argo. No new pipeline. DevX slots into what your teams already use."],
              ["Multi-IaC support", "Terraform, OpenTofu, Pulumi, CloudFormation, Helm, Kubernetes. Seven-plus formats. One integration."],
            ].map(([t, b]) => (
              <div key={t} className="rounded-2xl border border-cv-line bg-cv-surface p-6">
                <h3 className="cv-h3 text-cv-ink">{t}</h3>
                <p className="text-cv-ink/75 mt-3 leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
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

      <section className="cv-section bg-cv-surface2">
        <div className="cv-container max-w-3xl">
          <h2 className="cv-h2 text-cv-ink mb-8">Platform engineering questions answered</h2>
          <div className="space-y-4">
            {FAQ.map(([q, a]) => (
              <details key={q} className="rounded-xl border border-cv-line bg-cv-surface p-5">
                <summary className="cursor-pointer font-medium text-cv-ink">{q}</summary>
                <p className="text-cv-ink/75 mt-3 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="cv-section">
        <div className="cv-container">
          <div className="rounded-3xl border border-cv-line bg-cv-surface2 p-10 lg:p-16 text-center">
            <h2 className="cv-h2 text-cv-ink max-w-3xl mx-auto">See DevX catch a cost regression in your repo.</h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href={DEMO_URL} className="cv-btn-primary"><span>Book a Demo</span><ArrowRight size={16} /></Link>
              <Link href="/contact" className="cv-btn-ghost">Talk to Sales</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
