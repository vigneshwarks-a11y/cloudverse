import Link from "next/link";
import { Buildings } from "@solar-icons/react";
import type { Metadata } from "next";
import { DEMO_URL } from "@/lib/links";
import { EnterpriseDayOne } from "@/components/solution/EnterpriseDayOne";
import { SolutionHero } from "@/components/solution/SolutionHero";
import { FaqBlock } from "@/components/FaqBlock";
import { ClosingCTA } from "@/components/home/ClosingCTA";
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
  ["What enterprise controls are included?", "SSO/SAML, OIDC, SCIM provisioning, granular RBAC, audit logs, customer-managed encryption, and regional data residency. All included."],
  ["Where is data stored?", "Region-specific. US, EU, and APAC options available with private-link and VPC options."],
  ["Do you support air-gapped or VPC deployments?", "Contact our enterprise team to discuss your specific requirements."],
  ["What about procurement?", "AWS, Azure, and Google Cloud Marketplace with committed-spend redemption."],
  ["Who do we work with for rollout?", "CloudVerse enterprise accounts include a dedicated solutions engineer for onboarding and a customer success manager post-launch."],
];

export default function EnterprisePage() {
  return (
    <>
      <SolutionHero
        eyebrow="For Enterprise"
        h1="One Control Plane for Multi-Cloud, AI Infrastructure, and Data Economics"
        sub="The compute economics platform global enterprises run on. SSO, SCIM provisioning, granular RBAC, audit logs, customer-managed encryption keys, and the procurement options the office of the CIO expects."
        accent="#1664C0"
        icon={Buildings}
        platformHref="/platform/finops"
        primaryLabel="Talk to Our Enterprise Team"
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

      <section className="cv-section">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-10">What enterprise teams operationalise on day one</h2>
          <EnterpriseDayOne
            items={[
              ["One model across the estate", "Cloud, AI infrastructure, and warehouse spend on a single allocation model. One view for FinOps, one view for engineering, one view for finance. They all match."],
              ["Identity and audit", "SSO, SCIM, granular RBAC, audit logs, customer-managed encryption keys. The access controls and audit trails your security and compliance teams require, available from the start."],
              ["Regional residency", "US, EU, and APAC regions with private-link and VPC options. Data stays where your sovereignty requirements say it should."],
              ["Marketplace and procurement", "AWS, Azure, and Google Cloud Marketplace listings with committed-spend redemption. Procurement through the channels your finance team already uses."],
            ]}
          />
        </div>
      </section>

      <section className="cv-section bg-cv-surface dark:bg-black">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-8">Modules that power enterprise deployments</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              ["FinOps Platform", "Multi-cloud cost intelligence", "/platform/finops"],
              ["AIX", "GPU and LLM economics", "/platform/aix"],
              ["DevX", "Shift-left cost intelligence", "/platform/devx"],
            ].map(([t, b, h]) => (
              <Link key={t} href={h as string} className="rounded-2xl border border-cv-line bg-cv-surface dark:bg-[#0D0D0D] p-6 hover:border-cv-ink/30 transition-colors">
                <h3 className="cv-h3 text-cv-ink">{t}</h3>
                <p className="text-cv-ink/75 mt-2">{b}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cv-section">
        <div className="cv-container">
          <div className="text-center mb-10">
            <h2 className="cv-h2 text-cv-ink">Enterprise Questions Answered</h2>
          </div>
          <FaqBlock items={FAQ.map(([q, a]) => ({ q, a }))} accent="#1664C0" />
        </div>
      </section>

      <ClosingCTA />
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Solutions", href: "/solutions" }, { name: "Enterprise", href: "/solutions/enterprise" }]} />
    </>
  );
}
