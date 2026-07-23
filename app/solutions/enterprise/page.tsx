import type { Metadata } from "next";
import { DOCS } from "@/lib/links";
import { Server2, Cpu, Database, LockKeyhole, ShieldCheck, ListCheck, Wallet } from "@/lib/solar-icons";
import { EnterpriseDayOne } from "@/components/solution/EnterpriseDayOne";
import { HowItWorksFlow, type FlowChip, type FlowWorkload, type FlowRightNode } from "@/components/solution/HowItWorksFlow";
import { Panel, VIZ_RED, VIZ_OK } from "@/components/solution/CardChrome";
import { PlatformCards } from "@/components/solution/PlatformCards";
import { RelatedSolutions } from "@/components/solution/RelatedSolutions";
import { SolutionHero } from "@/components/solution/SolutionHero";
import { SectionEyebrow } from "@/components/solution/SectionEyebrow";
import { SectionHeading } from "@/components/SectionHeading";
import { BulletGrid } from "@/components/solution/BulletGrid";
import { WhoThisIsFor } from "@/components/solution/WhoThisIsFor";
import { FaqBlock } from "@/components/FaqBlock";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "For Enterprise: Govern Cloud, AI, Data, and Engineering From One Place",
  description: "One operational view instead of four tools, with chargeback and showback that hold across business units. SSO, SCIM, RBAC, audit logs, and residency built in.",
  keywords: ["enterprise cloud cost management", "multi-cloud governance", "enterprise FinOps", "SSO cloud platform", "RBAC cloud cost", "CIO cloud economics"],
  alternates: { canonical: "/solutions/enterprise" },
  openGraph: {
    title: "For Enterprise: Govern Cloud, AI, Data, and Engineering From One Place",
    description: "One operational view instead of four tools, with chargeback and showback that hold across business units.",
    url: "/solutions/enterprise",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "CloudVerse for Enterprise" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "For Enterprise: One Estate, Governed From One Place",
    description: "One reconciled total across cloud, AI, data, and engineering. SSO, SCIM, RBAC, audit logs, and residency built in.",
  },
};

const COSTS = [
  "Four consoles, four totals, and month-end is the first time anyone adds them up.",
  "The cloud bill lands weeks after the decision that drove it.",
  "AI is reshaping the estate faster than the governance model was built for.",
  "Chargeback breaks the moment a cost spans two business units.",
  "Ask who owns the total, and the room goes quiet.",
];

const OUTCOMES = [
  "One estate on one record: cloud, AI, data, and engineering reconciled to a single total.",
  "Decision-time context: cost shows up where the change is made, not weeks after the invoice.",
  "AI in the operating picture: governed alongside everything else, not run as an exception.",
  "Cross-unit chargeback: allocation that holds when a cost spans two business units.",
  "Forecasts that survive AI: capacity planning that keeps pace as workloads shift.",
  "One owner of the total: a number the office of the CIO can stand behind.",
];

const HOW_IT_WORKS_WORKLOADS: FlowWorkload[] = [
  { label: "Cloud Spend", sub: "AWS, Azure, GCP & more", color: "#1664C0", Icon: Server2 },
  { label: "AI & GPU Spend", sub: "Every provider & pool", color: "#6954D4", Icon: Cpu },
  { label: "Data & Warehouse Spend", sub: "Every query & pipeline", color: "#0E9E7A", Icon: Database },
];

const HOW_IT_WORKS_CHIPS: FlowChip[] = [
  { label: "SSO & RBAC", color: "#1664C0", Icon: LockKeyhole },
  { label: "Policy & Residency", color: "#D97706", Icon: ShieldCheck },
  { label: "Audit Trail", color: "#0E9E7A", Icon: ListCheck },
  { label: "Chargeback Model", color: "#6954D4", Icon: Wallet },
];

const HOW_IT_WORKS_RIGHT: FlowRightNode[] = [
  { kind: "logo", src: "/icons/aws.svg", name: "AWS" },
  { kind: "logo", src: "/icons/azure.svg", name: "Azure" },
  { kind: "logo", src: "/icons/googlecloud.svg", name: "Google Cloud" },
  { kind: "logo", src: "/icons/openai.svg", name: "OpenAI", invert: true },
  { kind: "logo", src: "/icons/snowflake.svg", name: "Snowflake" },
  { kind: "logo", src: "/icons/kubernetes.svg", name: "Kubernetes" },
];

const FAQ = [
  ["What controls ship for enterprise?", "SSO, SCIM, RBAC, audit logs, data residency, and customer-managed encryption keys."],
  ["Where is our data stored?", "In the region you choose (US, EU, APAC), with private-link and VPC options."],
  ["Do you support air-gapped or on-prem?", "Private GPU and on-prem inference are first-class in Agentry; deployment options are available."],
  ["How does procurement work?", "Redeem committed cloud spend through marketplace listings."],
  ["What does rollout look like?", "A read-only connection in under 30 minutes, then a phased, no-fee proof of value over two to four weeks."],
];

export default function EnterprisePage() {
  return (
    <>
      <SolutionHero
        eyebrow="For Enterprise"
        h1={
          <>
            Cloud, AI, data, and engineering are one estate.{" "}
            <span className="text-cv-blue dark:text-cv-blue-light">Govern it from one place.</span>
          </>
        }
        sub="One operational view instead of four tools, with chargeback and showback that hold up across business units, and AI folded into the picture instead of run as an exception."
        platformHref="/platform/finops"
        primaryLabel="Talk to our enterprise team"
        primaryHref="/contact"
      />

      {/* THE SITUATION */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="flex flex-col items-start gap-10">
            <SectionHeading lead eyebrow="The situation" title="One estate, four tools, and no reconciled total.">
              <p className="cv-body-lg text-cv-ink/80">
                Cloud, AI, data, and engineering each sit in a separate tool, and cost decisions get made in places you don&apos;t have line of sight to. AI is reshaping the operational picture faster than governance can keep up.
              </p>
              <p className="cv-body-lg text-cv-ink/85 mt-4">
                Chargeback and showback creak across business units. No one owns the total, day to day. One control plane is how you take it back.
              </p>
            </SectionHeading>
            <div className="mx-auto w-full max-w-3xl">
              <Panel className="justify-between p-6" chrome="enterprise.app/situation">
                <span className="text-[10px] uppercase tracking-wide text-cv-muted">Four tools, four totals</span>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["Cloud console", "$1.2M"],
                    ["AI platform", "$310k"],
                    ["Data warehouse", "$180k"],
                    ["DevOps tool", "$95k"],
                  ].map(([label, amt]) => (
                    <div key={label} className="rounded-md border border-dashed border-cv-line/60 px-3.5 py-4 text-xs dark:border-white/15">
                      <div className="text-cv-ink/55">{label}</div>
                      <div className="mt-1 font-mono font-semibold text-cv-ink/80">{amt}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-3 rounded-md px-3.5 py-4 text-xs" style={{ background: `${VIZ_RED}12` }}>
                  <span className="min-w-0 flex-1" style={{ color: VIZ_RED }}>No single reconciled total</span>
                  <span className="shrink-0 whitespace-nowrap font-mono font-semibold" style={{ color: VIZ_RED }}>Unowned</span>
                </div>
              </Panel>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IT'S COSTING YOU TODAY */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <div className="max-w-2xl mb-8 text-left">
            <SectionEyebrow className="mb-4">The cost of the gap</SectionEyebrow>
            <h2 className="cv-h2 text-cv-ink">What the gap costs before anyone notices.</h2>
          </div>
          <BulletGrid items={COSTS} tone="negative" />
        </div>
      </section>

      {/* WHAT YOU SHIP */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="max-w-2xl mb-10 text-left">
            <SectionEyebrow className="mb-4">What you ship</SectionEyebrow>
            <h2 className="cv-h2 text-cv-ink">What&apos;s live on day one.</h2>
          </div>
          <EnterpriseDayOne
            items={[
              ["One allocation model", "Cloud, AI, and warehouse spend on a single model, reconciled to finance."],
              ["Identity and audit", "SSO, SCIM, RBAC, audit logs, and customer-managed encryption keys."],
              ["Regional residency", "US, EU, and APAC, with private-link and VPC deployment."],
              ["Marketplace and procurement", "Redeem committed cloud spend through marketplace listings."],
            ]}
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <SectionHeading lead eyebrow="How it works" title="How the control plane runs the estate." className="mb-12" docsHref={DOCS.governance}>
            <div className="space-y-4">
              <p className="cv-body-lg text-cv-muted">
                CloudVerse connects every cloud, AI provider, warehouse, and pipeline read-only, then provisions access, governs policy and residency, and reports chargeback that reconciles across business units.
              </p>
              <p className="cv-body-lg text-cv-muted">
                Four tools show four slices of the estate. One control plane shows the total, and who owns it.
              </p>
            </div>
          </SectionHeading>
          <HowItWorksFlow
            workloads={HOW_IT_WORKS_WORKLOADS}
            chips={HOW_IT_WORKS_CHIPS}
            hubLabel="Cloud · AI · Data · Engineering"
            hubSub="one control plane"
            right={HOW_IT_WORKS_RIGHT}
            bottomRows={["Marketplace redemption", "Business unit reconciliation"]}
          />
        </div>
      </section>

      {/* PROOF — Berkshire estate consolidation (numbers per proof bank §4.3) */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
            <div className="text-left">
              <SectionEyebrow className="mb-4">Proof</SectionEyebrow>
              <h2 className="cv-h2 text-cv-ink">Berkshire Hathaway HomeServices put its estate on one record.</h2>
            </div>
            <div className="text-left">
              <p className="leading-relaxed text-cv-ink/80">
                A growing multi-cloud estate, fragmented tagging, and no owner of the total. On one control plane, spend tied back to teams, the anomalies that mattered surfaced, and finance got a number that held up in front of the board.
              </p>
              <div className="mt-8 flex flex-wrap gap-6">
                <div>
                  <div className="font-mono text-2xl font-bold tracking-tight text-cv-ink">$738,983</div>
                  <p className="mt-1 text-xs text-cv-muted">realized in total</p>
                </div>
                <div className="hidden sm:block w-px self-stretch bg-cv-line/50" />
                <div>
                  <div className="font-mono text-2xl font-bold tracking-tight text-cv-ink">$101,736</div>
                  <p className="mt-1 text-xs text-cv-muted">recurring, per year</p>
                </div>
                <div className="hidden sm:block w-px self-stretch bg-cv-line/50" />
                <div>
                  <div className="font-mono text-2xl font-bold tracking-tight text-cv-ink">$61,582</div>
                  <p className="mt-1 text-xs text-cv-muted">in a single month</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-12 w-full max-w-3xl">
            <Panel className="justify-between p-6" chrome="enterprise.app/estate">
              <span className="text-[10px] uppercase tracking-wide text-cv-muted">One reconciled total</span>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Cloud", "$1.2M"],
                  ["AI & GPU", "$310k"],
                  ["Data warehouse", "$180k"],
                  ["Engineering", "$95k"],
                ].map(([label, amt]) => (
                  <div key={label} className="rounded-md border border-cv-line/60 px-3.5 py-4 text-xs dark:border-white/15">
                    <div className="text-cv-ink/55">{label}</div>
                    <div className="mt-1 font-mono font-semibold text-cv-ink/80">{amt}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between gap-3 rounded-md px-3.5 py-4 text-xs" style={{ background: `${VIZ_OK}12` }}>
                <span className="min-w-0 flex-1" style={{ color: VIZ_OK }}>Reconciled to a single total, with an owner</span>
                <span className="shrink-0 whitespace-nowrap font-mono font-semibold" style={{ color: VIZ_OK }}>Owned</span>
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
            <h2 className="cv-h2 text-cv-ink">What leadership gets to own.</h2>
          </div>
          <BulletGrid items={OUTCOMES} tone="positive" />
        </div>
      </section>

      {/* PLATFORM */}
      <section className="cv-section">
        <div className="cv-container">
          <div className="max-w-2xl mb-8 text-left">
            <SectionEyebrow className="mb-4">Platform</SectionEyebrow>
            <h2 className="cv-h2 text-cv-ink">The four modules behind it.</h2>
          </div>
          <PlatformCards
            items={[
              ["Agentry", "The control plane for enterprise AI", "/platform/agentry"],
              ["FinOps Platform", "Multi-cloud cost intelligence", "/platform/finops"],
              ["Torb", "Cost context in the engineering workflow", "/platform/torb"],
              ["DataX", "Allocable warehouse and pipeline spend", "/platform/datax"],
            ]}
          />
        </div>
      </section>

      <WhoThisIsFor
        accent="#1664C0"
        heading="Who this is for."
        subhead="The office of the CIO, and the leads who answer to it."
        personas={[
          {
            role: "CIO",
            category: "Office of the CIO",
            quote: "One control plane for cloud, AI, data, and engineering, with a single owner of the total.",
          },
          {
            role: "CTO",
            category: "Office of the CIO",
            quote: "Governance that keeps pace with how fast AI is reshaping the estate.",
          },
          {
            role: "VP / Director of Engineering",
            category: "Engineering leadership",
            quote: "Cost context at the point the change is made, not three tools removed from it.",
          },
          {
            role: "Head of Cloud / Infrastructure",
            category: "Infrastructure",
            quote: "Chargeback and showback that reconcile across every business unit.",
          },
        ]}
      />

      <section className="cv-section bg-cv-surface2 dark:bg-black">
        <div className="cv-container">
          <FaqBlock
            items={FAQ.map(([q, a]) => ({ q, a }))}
            title="Enterprise questions, answered."
            subtitle="What the office of the CIO asks before rollout."
          />
        </div>
      </section>

      <RelatedSolutions current="/solutions/enterprise" />

      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Solutions", href: "/solutions" }, { name: "Enterprise", href: "/solutions/enterprise" }]} />
    </>
  );
}
