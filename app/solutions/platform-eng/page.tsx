import type { Metadata } from "next";
import { GitPullRequest, ShieldCheck, Workflow, FileCode2 } from "lucide-react";
import { SolutionHero } from "@/components/solution/SolutionHero";
import { Outcomes } from "@/components/solution/Outcomes";
import { ModulesUsed } from "@/components/solution/ModulesUsed";
import { FaqBlock } from "@/components/FaqBlock";
import { CTABand } from "@/components/CTABand";

export const metadata: Metadata = {
  title: "For Platform Engineering — CloudVerse",
  description: "Cost gates engineers actually want. PR-level cost diffs, policy-as-code, and right-sizing recommendations integrated into your IaC pipeline.",
  alternates: { canonical: "/solutions/platform-eng" },
};

const FAQ = [
  { q: "Will this slow down our PR flow?", a: "No. DevX runs as a fast check in your existing CI and posts a single inline comment with a cost diff and suggested fix — no extra approval step required unless you opt in." },
  { q: "Which IaC tools are supported?", a: "Terraform, OpenTofu, Pulumi, CloudFormation, Helm, Kustomize, and raw Kubernetes manifests." },
  { q: "How do we manage cost policy?", a: "Policy-as-code — versioned in your repo, reviewed like any other PR, applied either as advisory comments or required checks." },
  { q: "What's the path from PR comment to actual savings?", a: "Every prevented regression is tracked in FinOps as a quantified outcome — so platform engineering shows up in monthly savings reporting." },
];

export default function Page() {
  return (
    <>
      <SolutionHero
        eyebrow="For Platform Engineering"
        h1={<>Cost gates engineers <span className="text-cv-blue-light">actually want to use.</span></>}
        sub="PR-level cost diffs, policy-as-code, and right-sizing recommendations native to your IaC pipeline — with quantified savings rolled into FinOps."
        proof={[
          { value: "+$2.4k–2.9k/mo", label: "From a single PR" },
          { value: "GitHub / GitLab / ADO", label: "Native integrations" },
          { value: "7+", label: "IaC formats" },
          { value: "Free", label: "Tier available" },
        ]}
      />

      <Outcomes
        heading="What platform teams ship with CloudVerse."
        items={[
          { icon: GitPullRequest, title: "PR cost diff",          body: "Every infra PR gets an inline cost impact comment before reviewers see it." },
          { icon: ShieldCheck,    title: "Policy-as-code",        body: "Cost guardrails versioned in your repo, applied as advisory or required checks." },
          { icon: Workflow,       title: "Native CI integration", body: "GitHub Actions, GitLab CI, Azure Pipelines, Jenkins, Argo — no new pipeline required." },
          { icon: FileCode2,      title: "Multi-IaC support",     body: "Terraform, OpenTofu, Pulumi, CloudFormation, Helm, Kustomize, raw Kubernetes." },
        ]}
      />

      <ModulesUsed keys={["devx", "finops", "aix"]} />

      <section className="cv-section bg-cv-surface">
        <div className="cv-container">
          <div className="max-w-3xl mb-10">
            <div className="cv-label mb-3">FAQ</div>
            <h2 className="cv-h2 text-white">Platform engineering questions, answered.</h2>
          </div>
          <FaqBlock items={FAQ} />
        </div>
      </section>

      <CTABand heading="See DevX catch a cost regression in your repo." />
    </>
  );
}
