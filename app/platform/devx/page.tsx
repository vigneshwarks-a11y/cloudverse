import type { Metadata } from "next";
import { GitPullRequest, ShieldCheck, FileCode2, AlertTriangle, GitBranch, Workflow, Cpu, Container, Lock } from "lucide-react";
import { ProductHero } from "@/components/product/Hero";
import { SplitMockup } from "@/components/product/Mockup";
import { FeatureShowcase, type FeatureState } from "@/components/product/FeatureShowcase";
import { Capabilities } from "@/components/product/Capabilities";
import { Lifecycle } from "@/components/product/Lifecycle";
import { WhoUsesIt } from "@/components/product/WhoUsesIt";
import { IntegrationsStrip } from "@/components/product/IntegrationsStrip";
import { ExpandInto } from "@/components/product/ExpandInto";
import { FaqBlock } from "@/components/FaqBlock";
import { CTABand } from "@/components/CTABand";
import { MODULES } from "@/lib/modules";

const M = MODULES.devx;

export const metadata: Metadata = {
  title: "DevX — Shift-Left Cost Intelligence",
  description:
    "Catch cloud cost mistakes before they reach production. PR-level cost checks surfaced +$2.9k/month in impact before merge. Free tier available.",
  alternates: { canonical: "/platform/devx" },
};

const FEATURES: FeatureState[] = [
  { title: "PR cost estimate",      desc: "Every pull request gets a cost diff before reviewers see it.", mockTitle: "github.com/cloudverse/infra/pull/214", mockBody: <MockPR /> },
  { title: "CI scan result",        desc: "Terraform, Helm, and Kustomize plans scanned against your cost policy.", mockTitle: "ci/cloudverse/scan/2487", mockBody: <MockCI /> },
  { title: "Governance policy",     desc: "Org-wide rules — budget ceilings, instance allowlists, region constraints — versioned in code.", mockTitle: "devx.cloudverse.ai/policy", mockBody: <MockPolicy /> },
  { title: "Prevented regressions", desc: "Every blocked or fixed PR tracked with payback against your savings backlog.", mockTitle: "devx.cloudverse.ai/prevented", mockBody: <MockPrevented /> },
];

const FAQ = [
  { q: "Which source control systems are supported?", a: "GitHub, GitLab, Bitbucket, and Azure DevOps. Comments and check runs work natively in each." },
  { q: "What IaC does DevX understand?", a: "Terraform, OpenTofu, Pulumi, CloudFormation, Helm, Kustomize, and raw Kubernetes manifests. Coverage expands with each release." },
  { q: "Is there a free tier?", a: "Yes. Open-source repos and small teams can use DevX for free — PR comments and policy checks included." },
  { q: "How does DevX know what something costs?", a: "DevX uses live cloud pricing for every region and SKU, plus your discount and commitment context from FinOps Platform when connected." },
  { q: "Can we enforce policies as required checks?", a: "Yes. Policies can be advisory (comment) or required (block merge). Approvals and overrides are fully audited." },
  { q: "Where does the +$2.9k/month proof number come from?", a: "A single PR proposing an oversized GPU autoscaler increase was flagged by DevX with an estimated $2.4k–$2.9k/month impact and corrected before merge." },
];

export default function Page() {
  return (
    <>
      <ProductHero
        eyebrow="DevX"
        color={M.color}
        h1={<>Catch cost regressions <span style={{ color: M.color }}>before they reach production.</span></>}
        sub="Pull-request-level cost checks for infrastructure changes. Free tier. GitHub, GitLab, and Azure DevOps native."
        stats={[
          { value: "+$2.4k–2.9k/mo", label: "From a single PR", cite: "Single pull request, 2026" },
          { value: "Free", label: "Tier available" },
          { value: "3", label: "Source control vendors" },
          { value: "7+", label: "IaC formats" },
        ]}
      />

      <SplitMockup
        color={M.color}
        label="PR cost check"
        heading="Every infrastructure PR gets a cost diff before merge."
        body="DevX reads the plan, prices it against your live cloud rates and commitments, and posts an explicit impact comment with a suggested fix when needed."
        stat={{ value: "+$2.9k/mo", label: "Prevented in a single PR" }}
        mockTitle="github.com/cloudverse/infra/pull/214"
        mockBody={<MockPR />}
      />

      <FeatureShowcase
        label="Platform"
        heading="Shift-left from PR to policy to proof."
        color={M.color}
        states={FEATURES}
      />

      <Capabilities
        label="Capabilities"
        heading="Cost gates that engineers actually want."
        color={M.color}
        items={[
          { icon: GitPullRequest, title: "PR cost diff",        desc: "Inline diff comment for every infrastructure change." },
          { icon: ShieldCheck,    title: "Policy-as-code",      desc: "Cost guardrails versioned in your repo and applied as checks." },
          { icon: FileCode2,      title: "Multi-IaC support",   desc: "Terraform, Helm, Kustomize, CloudFormation, Pulumi." },
          { icon: AlertTriangle,  title: "Anomaly prevention",  desc: "Block regressions before they hit production cloud bills." },
          { icon: GitBranch,      title: "Branch protection",   desc: "Required cost checks integrated into native branch rules." },
          { icon: Workflow,       title: "Native CI integration", desc: "GitHub Actions, GitLab CI, Azure Pipelines, Jenkins, Argo." },
          { icon: Cpu,            title: "GPU + AI workloads",  desc: "Aware of GPU pricing and AI provider rate cards via AIX." },
          { icon: Container,      title: "Kubernetes-native",   desc: "Helm and Kustomize plans scored with request/limit awareness." },
          { icon: Lock,           title: "Auditable approvals", desc: "Overrides require justification and are fully logged." },
        ]}
      />

      <Lifecycle
        color={M.color}
        stages={[
          { title: "Inform",   bullets: ["Connect GitHub / GitLab / Azure DevOps", "First PR gets a cost diff within minutes", "Read repo metadata only", "No production cloud access required"] },
          { title: "Optimize", bullets: ["Suggested fixes inline in PR comments", "Right-size and right-region guidance pre-merge", "Commitment-aware pricing for accuracy", "Free tier for open-source and small teams"] },
          { title: "Operate",  bullets: ["Required checks on cost-impacting paths", "Policy-as-code reviewed like any other PR", "Audited overrides with justification", "Prevented-regression reporting wired to FinOps"] },
        ]}
      />

      <WhoUsesIt
        color={M.color}
        items={[
          { team: "Engineering", role: "Platform Engineer",  desc: "Owns the IaC and gets the cost diff on every PR they review." },
          { team: "Engineering", role: "Application Engineer", desc: "Sees the impact of their change without leaving the PR." },
          { team: "Finance",     role: "FinOps Manager",     desc: "Sets policy, tracks prevented regressions, reports back to leadership." },
        ]}
      />

      <IntegrationsStrip
        color={M.color}
        items={["GitHub", "GitLab", "Azure DevOps", "Bitbucket", "GitHub Actions", "GitLab CI", "Jenkins", "Argo CD", "Terraform"]}
      />

      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <div className="max-w-3xl mb-10">
            <div className="cv-label mb-3" style={{ color: M.color }}>FAQ</div>
            <h2 className="cv-h2 text-white">DevX questions, answered.</h2>
          </div>
          <FaqBlock items={FAQ} accent={M.color} />
        </div>
      </section>

      <ExpandInto current="devx" />
      <CTABand heading="See DevX catch a cost regression in your repo." />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "CloudVerse DevX",
            applicationCategory: "BusinessApplication",
            description: metadata.description,
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
    </>
  );
}

/* ——— Mock UIs ——— */

function MockPR() {
  return (
    <div className="font-mono text-xs">
      <div className="flex items-center gap-2 mb-3 text-white/65">
        <GitPullRequest size={14} className="text-emerald-400" />
        <span className="text-white">#214 Bump GPU autoscaler ceiling for training cluster</span>
      </div>
      <div className="rounded border border-white/10 bg-black/30 p-3 mb-3">
        <div className="text-[10px] text-white/45 uppercase tracking-wider mb-2">terraform/clusters/training.tf</div>
        <div className="text-rose-300/85">- max_node_count = 16</div>
        <div className="text-emerald-300/90">+ max_node_count = 64</div>
        <div className="text-rose-300/85">- node_pool = "g5.4xlarge"</div>
        <div className="text-emerald-300/90">+ node_pool = "p3.16xlarge"</div>
      </div>
      <div className="rounded border border-cv-teal/40 bg-cv-teal/10 p-3">
        <div className="text-cv-teal text-[11px] font-semibold uppercase tracking-wider mb-1">CloudVerse DevX</div>
        <div className="text-white">Estimated impact: <span className="text-cv-teal font-semibold">+$2,420 to $2,910 / month</span></div>
        <div className="text-white/65 mt-2">Suggested: keep g5.4xlarge with 32 ceiling, schedule p3.16xlarge only during training windows.</div>
      </div>
    </div>
  );
}

function MockCI() {
  return (
    <div className="font-mono text-xs space-y-1.5">
      <div className="text-white/65"><span className="text-emerald-400">✓</span> Pricing data loaded (us-east-1, eu-west-1)</div>
      <div className="text-white/65"><span className="text-emerald-400">✓</span> Terraform plan parsed · 42 resources</div>
      <div className="text-white/65"><span className="text-emerald-400">✓</span> Helm chart parsed · 18 manifests</div>
      <div className="text-white/65"><span className="text-cv-teal">!</span> Policy: gpu_max_monthly_cost_per_pool — warning</div>
      <div className="text-white/65"><span className="text-rose-400">✗</span> Policy: region_allowlist — fail (ap-south-1)</div>
      <div className="text-white/65"><span className="text-emerald-400">✓</span> Cost diff posted to PR</div>
      <div className="text-white mt-3">Result: <span className="text-rose-400 font-semibold">1 fail, 1 warn</span> — merge blocked</div>
    </div>
  );
}

function MockPolicy() {
  return (
    <div className="font-mono text-xs">
      <div className="rounded border border-white/10 bg-black/30 p-3 text-white/85">
        <div className="text-white/45 text-[10px] uppercase tracking-wider mb-2">policies/cost.yaml</div>
        <div><span className="text-purple-300">policy</span>: gpu_max_monthly_cost_per_pool</div>
        <div className="pl-3"><span className="text-purple-300">limit</span>: $25000</div>
        <div className="pl-3"><span className="text-purple-300">severity</span>: warning</div>
        <div className="mt-2"><span className="text-purple-300">policy</span>: region_allowlist</div>
        <div className="pl-3"><span className="text-purple-300">allow</span>: [us-east-1, us-west-2, eu-west-1]</div>
        <div className="pl-3"><span className="text-purple-300">severity</span>: required</div>
        <div className="mt-2"><span className="text-purple-300">policy</span>: instance_family_allowlist</div>
        <div className="pl-3"><span className="text-purple-300">deny</span>: [x1, x1e, u-*]</div>
        <div className="pl-3"><span className="text-purple-300">severity</span>: required</div>
      </div>
    </div>
  );
}

function MockPrevented() {
  return (
    <div className="space-y-2">
      <div className="text-[11px] text-white/55 uppercase tracking-wider mb-2">Prevented impact · last 30 days</div>
      {[
        { pr: "#214 GPU autoscaler ceiling raise", val: "$2,910/mo" },
        { pr: "#198 RDS db.r6g.16xlarge upgrade", val: "$1,840/mo" },
        { pr: "#191 Helm: requests 4× actual usage", val: "$1,120/mo" },
        { pr: "#187 New egress-heavy region", val: "$760/mo" },
        { pr: "#172 Reserved Instance miss", val: "$540/mo" },
      ].map((p) => (
        <div key={p.pr} className="flex justify-between items-center p-3 rounded border border-white/10 bg-white/[0.02]">
          <span className="text-white/85 text-xs">{p.pr}</span>
          <span className="text-cv-teal tabular-nums text-xs font-medium">{p.val}</span>
        </div>
      ))}
    </div>
  );
}
