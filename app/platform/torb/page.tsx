import Link from "next/link";
import { ArrowRight, CodeSquare, DollarMinimalistic, ShieldCheck, Chart } from "@/lib/solar-icons";
import { FaqBlock } from "@/components/FaqBlock";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { PlatformHeroMockup } from "@/components/product/PlatformHeroMockup";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import type { Metadata } from "next";
import { DEMO_URL, DOCS } from "@/lib/links";
import WhoTorbFor from "@/components/product/WhoTorbFor";
import TorbPrExample from "@/components/product/TorbPrExample";
import CostGates from "@/components/product/CostGates";
import { BeforeAfterCards, type BeforeAfterRow } from "@/components/product/BeforeAfterCards";
import { CustomerLogos } from "@/components/CustomerLogos";
import { InlineCta } from "@/components/home/InlineCta";

export const metadata: Metadata = {
  title: "CloudVerse Torb: Catch Cost Regressions Before They Reach Production",
  description:
    "Every infrastructure PR gets an inline cost impact comment before reviewers see it. Engineers see what their changes cost at the moment they can still change something.",
  keywords: ["infrastructure cost review", "PR cost analysis", "cloud cost drift", "FinOps developer tools", "shift-left cost governance", "IaC cost"],
  alternates: { canonical: "/platform/torb" },
  openGraph: {
    title: "CloudVerse Torb: Catch Cost Regressions Before They Reach Production",
    description: "Every infrastructure PR gets an inline cost impact comment before reviewers see it. Engineers see costs when they can still change something.",
    url: "/platform/torb",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "CloudVerse Torb: Developer-First Cost Governance" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CloudVerse Torb: Catch Cost Regressions Before They Reach Production",
    description: "Every infrastructure PR gets an inline cost impact comment. See costs before they hit production.",
  },
};

const TORB_TABS = [
  { id: "pr-estimate", label: "PR Cost Estimate", copy: "The monthly cost impact of a change, commented inline on the pull request.", icon: CodeSquare },
  { id: "cost-gates", label: "Cost Gates", copy: "A threshold breach can warn or block, by policy, before merge.", icon: DollarMinimalistic },
  { id: "ci-scan", label: "CI Scan", copy: "Automated cost scan runs on every push. Regressions flagged before merge. No manual review step required.", icon: Chart },
  { id: "policy", label: "Policy Engine", copy: "Cost rules written as code, versioned with the repo, applied across every team.", icon: ShieldCheck },
];

// Attribute-by-attribute contrast between the old review flow and Torb. Same
// keys on both sides so the two cards read as an aligned before/after.
const TORB_VS: BeforeAfterRow[] = [
  { k: "Signal", before: "Discovered on next month's bill", after: "Commented inline on the PR" },
  { k: "Timing", before: "Weeks after it merged", after: "Before review, before merge" },
  { k: "Owner", before: "Nobody links it back", after: "In front of who wrote it" },
  { k: "Fix", before: "Unwind work in production", after: "Change a line before it ships" },
  { k: "Policy", before: "Tribal knowledge", after: "Cost rules as code, per team" },
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
  ["Does it slow the pipeline down?", "No. The check runs alongside CI and posts a comment. It doesn't gate merges unless you set a policy to."],
  ["Which tools does it support?", "GitHub, GitLab, and Azure DevOps for CI; Terraform, Pulumi, CloudFormation, and Kubernetes for infrastructure."],
  ["How are policies managed?", "As code, in the repo. Advisory rules warn; required rules block. Versioned and reviewed like any other change."],
  ["How does this pay for itself?", "Most teams recover the cost from a single prevented regression, around $2,400 in a typical review."],
];

export default function TorbPage() {
  return (
    <>
      <PageHero
        eyebrow="CloudVerse Torb"
        accent="blue"
        title="Catch cost regressions before they reach production."
        subtitle="Cost context lands in the pull request, for infrastructure, application code, and AI calls. Velocity stays high. Governance finally keeps up."
        actions={
          <>
            <Link href={DEMO_URL} className="cv-btn-primary"><span>Book a Demo</span><ArrowRight weight="Linear" size={16} /></Link>
            <Link href="#pr-example" className="cv-btn-ghost">See a real PR example</Link>
          </>
        }
      />

      <PlatformHeroMockup tabs={TORB_TABS} docsHref={DOCS.infrastructure} />

      <section className="cv-section">
        <div className="max-w-cv mx-auto px-5 sm:px-6 lg:px-8">
          <SectionHeading title="Infrastructure cost mistakes don't look like mistakes." className="mb-12">
            A change ships. It passes review, it passes tests, it looks fine. The cost shows up weeks later on a bill nobody connects back to that pull request. By then the fix means unwinding work already in production.
            <span className="mt-4 block font-medium text-cv-ink">
              The cheapest moment to catch a regression is before it merges, in front of the person who wrote it.
            </span>
          </SectionHeading>

          <div className="mt-12">
            <BeforeAfterCards
              beforeLabel="Before Torb"
              beforeSub="Cost found after merge"
              afterLabel="With Torb"
              afterSub="Cost seen in the PR"
              rows={TORB_VS}
            />
          </div>
        </div>
      </section>

      {/* PR EXAMPLE */}
      <TorbPrExample diff={DIFF} />

      {/* WHAT PLATFORM TEAMS SHIP */}
      <CostGates />

      {/* CUSTOMER LOGOS — proof */}
      <CustomerLogos />

      {/* WHO TORB IS FOR */}
      <WhoTorbFor />

      {/* MID-PAGE CTA */}
      <InlineCta label="Book a Demo" href={DEMO_URL} testid="section-inline-cta-demo" />

      {/* FAQ */}
      <section className="cv-section">
        <div className="cv-container">
          <FaqBlock
            items={FAQ.map(([q, a]) => ({ q, a }))}
            accent="#1664C0"
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            subtitle="Common questions we get asked the most"
          />
        </div>
      </section>

      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Platform", href: "/platform/torb" }, { name: "Torb", href: "/platform/torb" }]} />
    </>
  );
}
