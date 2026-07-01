import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import type { Metadata } from "next";
import { DEMO_URL } from "@/lib/links";
import WhoDevxFor from "@/components/product/WhoDevxFor";
import DevxPrExample from "@/components/product/DevxPrExample";
import CostGates from "@/components/product/CostGates";

export const metadata: Metadata = {
  title: "DevX — Catch Cost Regressions Before They Reach Production | CloudVerse",
  description:
    "Every infrastructure PR gets an inline cost impact comment before reviewers see it. Engineers see what their changes cost at the moment they can still change something.",
};

const ACCENT = "#0E9E7A";
const BRAND = "#2277E0";

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
      <section className="cv-hero-bg pt-[120px] pb-16 lg:pt-[160px] lg:pb-24 relative">
        <div className="cv-container relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium" style={{ borderColor: `${ACCENT}66`, color: "#3FD0A3" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
            DevX — Shift-Left Cost Intelligence
          </div>
          <h1 className="cv-h1 mt-6 text-cv-ink">Catch Cost Regressions Before They Reach Production</h1>
          <p className="cv-body-lg mt-6 text-cv-ink/75">
            Every infrastructure PR gets an inline cost impact comment before reviewers see it. Engineers see what their changes cost at the moment they can still change something.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={DEMO_URL} className="cv-btn-primary"><span>Book a Demo</span><IconArrowRight size={16} stroke={1} /></Link>
            <Link href="#pr-example" className="cv-btn-ghost">See a Real PR Example</Link>
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
          <h2 className="cv-h2 text-cv-ink">Infrastructure cost mistakes do not look like mistakes.</h2>
          <p className="cv-body-lg text-cv-ink/80 mt-6">
            Infrastructure decisions that cause cost regressions look like correct Terraform. The NAT gateway goes in because someone needed it for one sprint. Nobody removes it. The always-on compute instance gets sized for peak load. Load normalises. The instance stays.
          </p>
          <p className="cv-body-lg text-cv-ink/80 mt-4">
            Cost reports land three weeks after the deployment. The engineer who wrote the change has moved on to four other things. Nobody changes anything.
          </p>
          <p className="cv-body-lg text-cv-ink font-medium mt-4">
            DevX puts a cost estimate on every PR before it merges. Engineers see impact at the moment they still have context on what they built and why.
          </p>
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
            <div className="flex h-full flex-col rounded-3xl border border-cv-line bg-cv-surface2 p-8 lg:p-10">
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
            <div className="flex h-full flex-col rounded-3xl border border-cv-line bg-cv-surface2 p-8 lg:p-10">
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
      <section className="cv-section bg-cv-surface2">
        <div className="cv-container max-w-3xl">
          <h2 className="cv-h2 text-cv-ink mb-8">FAQ</h2>
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
            <p className="cv-body-lg text-cv-ink/75 mt-5 max-w-2xl mx-auto">
              Connect your first account in under 30 minutes. Most teams find their first cost regression the same day.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href={DEMO_URL} className="cv-btn-primary"><span>Book a Demo</span><IconArrowRight size={16} stroke={1} /></Link>
              <Link href="/contact" className="cv-btn-ghost">Talk to Sales</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
