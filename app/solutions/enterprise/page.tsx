import Link from "next/link";
import { Buildings, CheckCircle, CloseCircle } from "@solar-icons/react";
import type { Metadata } from "next";
import { DEMO_URL } from "@/lib/links";
import { EnterpriseDayOne } from "@/components/solution/EnterpriseDayOne";
import { SolutionHero } from "@/components/solution/SolutionHero";
import { WhoThisIsFor } from "@/components/solution/WhoThisIsFor";
import { FaqBlock } from "@/components/FaqBlock";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "For Enterprise — One Control Plane for Multi-Cloud, AI Infrastructure, and Data Economics | CloudVerse",
  description: "SSO, SCIM provisioning, granular RBAC, audit logs, customer-managed encryption keys, and the procurement options the office of the CIO expects.",
  keywords: ["enterprise cloud cost management", "multi-cloud governance", "enterprise FinOps", "SSO cloud platform", "RBAC cloud cost", "CIO cloud economics"],
  alternates: { canonical: "/solutions/enterprise" },
  openGraph: {
    title: "For Enterprise — One Control Plane for Multi-Cloud, AI and Data Economics",
    description: "SSO, SCIM, granular RBAC, audit logs, customer-managed encryption keys, and the procurement options the CIO expects.",
    url: "/solutions/enterprise",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "CloudVerse for Enterprise" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "For Enterprise — One Control Plane for Multi-Cloud Economics",
    description: "SSO, SCIM, RBAC, audit logs, and enterprise procurement options. Built for the CIO's office.",
  },
};

const STATS = [
  { v: "SSO + SCIM", l: "identity-ready on day one" },
  { v: "US / EU / APAC", l: "residency options" },
  { v: "AWS, Azure, GCP", l: "marketplace listed" },
  { v: "24/7", l: "enterprise support" },
];

const FAQ = [
  ["What controls ship for enterprise?", "SSO, SCIM, RBAC, audit logs, data residency, and customer-managed encryption keys."],
  ["Where is our data stored?", "In the region you choose (US, EU, APAC), with private-link and VPC options."],
  ["Do you support air-gapped or on-prem?", "Private GPU and on-prem inference are first-class in AIX; deployment options are available."],
  ["How does procurement work?", "Redeem committed cloud spend through marketplace listings."],
  ["What does rollout look like?", "Read-only connection in under 30 minutes, then a phased, no-fee proof of value over two to four weeks."],
];

export default function EnterprisePage() {
  return (
    <>
      <SolutionHero
        eyebrow="For Enterprise"
        h1="One control plane for multi-cloud, AI, and data economics."
        sub="Cloud, AI, data, and engineering are one estate. Govern it from one place, with SSO, SCIM, RBAC, audit logs, and encryption built in."
        accent="#1664C0"
        icon={Buildings}
        platformHref="/platform/finops"
        primaryLabel="Talk to our enterprise team"
        primaryHref="/contact"
        badges={["SSO", "RBAC", "SCIM Provisioning", "Data Residency", "Audit Logs", "Multi-Cloud"]}
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

      {/* THE PROBLEM */}
      <section className="cv-section">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink">The situation CIOs and CTOs are in.</h2>
          <p className="cv-body-lg text-cv-ink/80 mt-6">
            Cloud, AI, data, and engineering each sit in a separate tool, and cost decisions get made in places you don&apos;t have line of sight to. AI is reshaping the operational picture faster than governance can keep up.
          </p>
          <p className="cv-body-lg text-cv-ink/85 mt-4">
            Chargeback and showback creak across business units. No one owns the total, day to day. One control plane is how you take it back.
          </p>
        </div>
      </section>

      {/* WHAT IT'S COSTING YOU TODAY */}
      <section className="cv-section bg-cv-surface dark:bg-black">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-8">What that&apos;s costing you today.</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Four disconnected tools instead of one view of the estate",
              "Cost decisions made in engineering, AI ops, or data with no line of sight",
              "AI changing the operational shape faster than governance keeps up",
              "Chargeback and showback that don't hold across business units",
              "No single owner accountable for the total",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3 text-cv-ink/85">
                <CloseCircle weight="Linear" size={18} className="text-cv-muted mt-0.5 shrink-0" /> {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="cv-section">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-10">What enterprise teams operationalise on day one</h2>
          <EnterpriseDayOne
            items={[
              ["One model across the estate", "A single allocation model for cloud, AI, and warehouse spend."],
              ["Identity and audit", "SSO, SCIM, RBAC, audit logs, and customer-managed encryption keys."],
              ["Regional residency", "US, EU, and APAC options, with private-link and VPC deployment."],
              ["Marketplace and procurement", "Redeem committed spend across cloud marketplaces."],
            ]}
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="cv-section bg-cv-surface dark:bg-black">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-10">How enterprise teams run it.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              ["Connect", "Connect every cloud, AI provider, warehouse, and pipeline, read-only."],
              ["Provision", "Provision access with SSO, SCIM, and RBAC scoped to each team."],
              ["Govern", "Govern one estate: policy, residency, and audit across all four domains."],
              ["Report", "Report chargeback and showback that reconcile across business units."],
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

      {/* OUTCOMES */}
      <section className="cv-section">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-8">Outcomes leadership owns.</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Operational control: cloud, AI, data, and engineering from one control plane",
              "Engineering visibility: cost context at the point changes are made",
              "AI governance: AI folded into the operating picture, not run as an exception",
              "Cross-team picture: decisions in one team and the spend they commit in another, connected",
              "Forecasting: forecasts and capacity planning that hold as AI reshapes the estate",
              "Accountability: one view the CIO owns, with chargeback that holds across business units",
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
          <h2 className="cv-h2 text-cv-ink mb-8">Modules that power enterprise deployments</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              ["AIX", "The control plane for enterprise AI", "/platform/aix"],
              ["FinOps Platform", "Multi-cloud cost intelligence", "/platform/finops"],
              ["DevX", "Cost context in the engineering workflow", "/platform/devx"],
              ["DataX", "Allocable warehouse and pipeline spend", "/platform/datax"],
            ].map(([t, b, h]) => (
              <Link key={t} href={h as string} className="rounded-2xl border border-cv-line bg-cv-surface dark:bg-[#0D0D0D] p-6 hover:border-cv-ink/30 transition-colors">
                <h3 className="cv-h3 text-cv-ink">{t}</h3>
                <p className="text-cv-ink/75 mt-2">{b}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <WhoThisIsFor
        roles={["CIO", "CTO", "VP / Director of Engineering", "Head of Cloud / Infrastructure"]}
        accent="#1664C0"
      />

      <section className="cv-section">
        <div className="cv-container">
          <div className="text-center mb-10">
            <h2 className="cv-h2 text-cv-ink">Enterprise Questions Answered</h2>
          </div>
          <FaqBlock items={FAQ.map(([q, a]) => ({ q, a }))} accent="#1664C0" />
        </div>
      </section>

      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Solutions", href: "/solutions" }, { name: "Enterprise", href: "/solutions/enterprise" }]} />
    </>
  );
}
