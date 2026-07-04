import Link from "next/link";
import { ArrowRight, CodeSquare, DollarMinimalistic, ShieldCheck, Chart } from "@solar-icons/react";
import { FaqBlock } from "@/components/FaqBlock";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { PlatformHeroMockup } from "@/components/product/PlatformHeroMockup";
import type { Metadata } from "next";
import { DEMO_URL } from "@/lib/links";
import WhoDevxFor from "@/components/product/WhoDevxFor";
import DevxPrExample from "@/components/product/DevxPrExample";
import CostGates from "@/components/product/CostGates";

export const metadata: Metadata = {
  title: "DevX — Catch Cost Regressions Before They Reach Production | CloudVerse",
  description:
    "Every infrastructure PR gets an inline cost impact comment before reviewers see it. Engineers see what their changes cost at the moment they can still change something.",
  keywords: ["infrastructure cost review", "PR cost analysis", "cloud cost drift", "FinOps developer tools", "shift-left cost governance", "IaC cost"],
  alternates: { canonical: "/platform/devx" },
  openGraph: {
    title: "DevX — Catch Cost Regressions Before They Reach Production",
    description: "Every infrastructure PR gets an inline cost impact comment before reviewers see it. Engineers see costs when they can still change something.",
    url: "/platform/devx",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "CloudVerse DevX — Developer-First Cost Governance" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevX — Catch Cost Regressions Before They Reach Production",
    description: "Every infrastructure PR gets an inline cost impact comment. See costs before they hit production.",
  },
};

const BRAND = "#2278E0";

const DEVX_TABS = [
  { id: "pr-estimate", label: "PR Cost Estimate", copy: "Every infrastructure PR gets an inline cost estimate before reviewers see it. Engineers see impact at the moment they can still change something.", icon: CodeSquare },
  { id: "cost-gates", label: "Cost Gates", copy: "Define thresholds per team or repo. Advisory or required enforcement. Policy as code, version controlled alongside your infrastructure.", icon: DollarMinimalistic },
  { id: "ci-scan", label: "CI Scan", copy: "Automated cost scan runs on every push. Regressions flagged before merge. No manual review step required.", icon: Chart },
  { id: "policy", label: "Policy Engine", copy: "Policies live in your repo. Enforce cost budgets per PR, per team, or per environment. Reviewable and auditable like any other config.", icon: ShieldCheck },
];

const STATS = [
  { v: "+$2.4k to $2.9k", l: "flagged on a single PR" },
  { v: "Free tier", l: "available" },
  { v: "GitHub, GitLab, Azure DevOps", l: "native integrations" },
  { v: "7+", l: "IaC formats supported" },
];

const DIFF = `resource "aws_nat_gateway" "this" {
- count = 1
+ count = var.enable_nat_gateway ? 1 : 0
   allocation_id = aws_eip.nat.id
   subnet_id     = aws_subnet.public.id
}

resource "aws_instance" "app" {
- instance_type = "t3.large"
+ instance_type = "t3.medium"
}`;

const FAQ = [
  ["Will this slow down our PR flow?", "No. DevX runs as a fast check and posts a single inline comment. No extra approval step unless you opt into required mode."],
  ["Which IaC tools are supported?", "Terraform, OpenTofu, Pulumi, CloudFormation, Helm, Kubernetes, raw Kubernetes."],
  ["How do we manage cost policy?", "Policies are code in your repo. Define thresholds, apply advisory or required enforcement per team or repo. Version controlled and reviewable like any other config."],
  ["What is the path from PR comment to actual savings?", "The engineer sees the estimate, adjusts the change before merge, and the regression never reaches production. The saving is the cost of the avoided change multiplied by its lifetime."],
];

export default function DevXPage() {
  return (
    <>
      <div className="cv-hero-bg">
        <section className="pt-[120px] sm:pt-[160px] pb-16 lg:pt-[240px] lg:pb-20 relative">
          <div className="max-w-cv mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-20">
              <div className="flex-1 min-w-0 lg:max-w-xl xl:max-w-2xl">
                <span className="block text-xs font-semibold uppercase tracking-widest text-[#1664C0] dark:text-[#7CB8F8]">
                  DevX
                </span>
                <h1 className="cv-h1 mt-6 leading-[1.25] text-cv-ink">Catch Cost Regressions Before They Reach Production</h1>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={DEMO_URL} className="cv-btn-primary"><span>Book a Demo</span><ArrowRight weight="Linear" size={16} /></Link>
                  <Link href="#pr-example" className="cv-btn-ghost">See a Real PR Example</Link>
                </div>
              </div>

              <div className="mt-10 lg:mt-0 lg:max-w-xs xl:max-w-sm shrink-0">
                <p className="cv-body text-cv-ink/70">
                  Every infrastructure PR gets an inline cost impact comment before reviewers see it. Engineers see what their changes cost at the moment they can still change something.
                </p>
              </div>
            </div>
          </div>
        </section>
        <PlatformHeroMockup tabs={DEVX_TABS} />
      </div>

      <section className="pt-8 pb-12 lg:pt-10 lg:pb-16">
        <div className="max-w-cv mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {STATS.map((s) => (
              <div
                key={s.l}
                className="flex flex-col items-center justify-center rounded-2xl border border-cv-ink/10 dark:border-white/10 px-4 py-8 sm:px-6 sm:py-10 text-center bg-white/40 dark:bg-[#0D0D0D] backdrop-blur-sm min-h-[120px] sm:min-h-[140px]"
              >
                <div className="font-mono text-base sm:text-xl lg:text-3xl font-bold text-cv-ink tracking-tight leading-snug">{s.v}</div>
                <p className="mt-2 sm:mt-3 text-xs sm:text-sm font-medium text-cv-muted tracking-wide leading-snug">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cv-section">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink">Infrastructure cost mistakes do not look like mistakes.</h2>
          <div className="mt-6 space-y-4">
            <p className="cv-body-lg text-cv-ink/80">
              Infrastructure decisions that cause cost regressions look like correct Terraform. The NAT gateway goes in because someone needed it for one sprint. Nobody removes it. The always-on compute instance gets sized for peak load. Load normalises. The instance stays.
            </p>
            <p className="cv-body-lg text-cv-ink/80">
              Cost reports land three weeks after the deployment. The engineer who wrote the change has moved on to four other things. Nobody changes anything.
            </p>
            <p className="cv-body-lg text-cv-ink font-medium">
              DevX puts a cost estimate on every PR before it merges. Engineers see impact at the moment they still have context on what they built and why.
            </p>
          </div>
        </div>
      </section>

      {/* PR EXAMPLE */}
      <DevxPrExample diff={DIFF} />

      {/* WHAT PLATFORM TEAMS SHIP */}
      <CostGates />

      {/* WHO DEVX IS FOR */}
      <WhoDevxFor />

      {/* PRICING */}
      <section className="cv-section">
        <div className="cv-container">
          {/* Header above cards */}
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="cv-h2 text-cv-ink">Most customers recover the cost of DevX from a single prevented regression.</h2>
            <p className="cv-body-lg text-cv-ink/75 mt-5">
              A missed NAT gateway cleanup runs $800 per month minimum. A misconfigured always-on instance in non-prod runs higher. DevX catches these before they merge.
            </p>
          </div>

          {/* Pricing cards */}
          <div className="mt-14 lg:mt-20 grid gap-6 lg:gap-8 lg:grid-cols-3 items-stretch">
            {/* Free */}
            <div className="flex h-full flex-col rounded-3xl border border-cv-line/40 bg-cv-surface2 dark:bg-[#0D0D0D] p-8 lg:p-10">
              <div className="text-xs uppercase tracking-[0.18em] font-semibold text-cv-muted">Free</div>
              <div className="mt-5 text-5xl lg:text-6xl font-display font-semibold text-cv-ink leading-none tracking-tight">
                $0<span className="text-lg font-normal text-cv-muted">/month</span>
              </div>
              <div className="mt-8 h-px bg-cv-line" />
              <ul className="space-y-3.5 text-sm text-cv-ink/80 mt-8 leading-relaxed">
                <li>• Unlimited public repos</li>
                <li>• Standard PR cost estimates</li>
                <li>• Basic CI scan</li>
                <li>• Weekly reports</li>
              </ul>
            </div>

            {/* Business — primary focal point (CloudVerse brand blue) */}
            <div
              className="relative flex h-full flex-col rounded-3xl border-2 p-8 lg:p-10 lg:z-10"
              style={{
                borderColor: BRAND,
                background: `linear-gradient(180deg, ${BRAND}1F 0%, ${BRAND}0A 100%)`,
                boxShadow: `0 0 0 1px ${BRAND}33, 0 24px 70px -24px ${BRAND}80`,
              }}
            >
              <span
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-cv-ink"
                style={{ background: `linear-gradient(90deg, ${BRAND}, #1664C0)`, boxShadow: `0 10px 26px -8px ${BRAND}99` }}
              >
                Most popular
              </span>
              <div className="text-xs uppercase tracking-[0.18em] font-semibold" style={{ color: "#7CB8F8" }}>Business</div>
              <div className="mt-5 text-5xl lg:text-6xl font-display font-semibold text-cv-ink leading-none tracking-tight">
                $900<span className="text-lg font-normal text-cv-muted">/month</span>
              </div>
              <div className="mt-8 h-px" style={{ background: `${BRAND}40` }} />
              <ul className="space-y-3.5 text-sm text-cv-ink/90 mt-8 leading-relaxed">
                <li>• Everything in Free</li>
                <li>• Private repos</li>
                <li>• Priority CI scans</li>
                <li>• Advanced PR policy engine</li>
                <li>• SSO (GitHub, Okta, and others)</li>
                <li>• Includes 1,000 units per month. $0.50 per additional unit.</li>
              </ul>
            </div>

            {/* Enterprise */}
            <div className="flex h-full flex-col rounded-3xl border border-cv-line/40 bg-cv-surface2 dark:bg-[#0D0D0D] p-8 lg:p-10">
              <div className="text-xs uppercase tracking-[0.18em] font-semibold text-cv-muted">Enterprise</div>
              <div className="mt-5 text-5xl lg:text-6xl font-display font-semibold text-cv-ink leading-none tracking-tight">Custom</div>
              <div className="mt-8 h-px bg-cv-line" />
              <ul className="space-y-3.5 text-sm text-cv-ink/80 mt-8 leading-relaxed">
                <li>• Everything in Business</li>
                <li>• Custom allowance and unlimited scale</li>
                <li>• Dedicated success manager</li>
                <li>• SLA and premium support</li>
                <li>• On-prem deployment options</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="text-center mb-10">
            <h2 className="cv-h2 text-cv-ink">Frequently Asked Questions</h2>
          </div>
          <FaqBlock items={FAQ.map(([q, a]) => ({ q, a }))} accent="#1664C0" />
        </div>
      </section>

      <ClosingCTA />
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Platform", href: "/platform/finops" }, { name: "DevX", href: "/platform/devx" }]} />
    </>
  );
}
