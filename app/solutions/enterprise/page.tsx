import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import type { Metadata } from "next";
import { DEMO_URL } from "@/lib/links";
import { EnterpriseDayOne } from "@/components/solution/EnterpriseDayOne";

export const metadata: Metadata = {
  title: "For Enterprise — One Control Plane for Multi-Cloud, AI Infrastructure, and Data Economics | CloudVerse",
  description: "SSO, SCIM provisioning, granular RBAC, audit logs, customer-managed encryption keys, and the procurement options the office of the CIO expects.",
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
      <section className="cv-hero-bg pt-[120px] pb-16 lg:pt-[160px] lg:pb-24 relative">
        <div className="cv-container relative z-10 max-w-4xl">
          <div className="text-xs uppercase tracking-widest text-cv-muted mb-3">For Enterprise</div>
          <h1 className="cv-h1 text-cv-ink">One Control Plane for Multi-Cloud, AI Infrastructure, and Data Economics</h1>
          <p className="cv-body-lg mt-6 text-cv-ink/75">
            The compute economics platform global enterprises run on. SSO, SCIM provisioning, granular RBAC, audit logs, customer-managed encryption keys, and the procurement options the office of the CIO expects.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="cv-btn-primary"><span>Talk to Our Enterprise Team</span><IconArrowRight size={16} stroke={1} /></Link>
            <Link href="/platform/finops" className="cv-btn-ghost">Explore the Platform</Link>
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
        <div className="cv-container">
          <div className="max-w-3xl mb-10">
            <h2 className="cv-h2 text-cv-ink">What enterprise teams operationalise on day one</h2>
          </div>
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

      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-8">Modules that power enterprise deployments</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              ["FinOps Platform", "Multi-cloud cost intelligence", "/platform/finops"],
              ["AIX", "GPU and LLM economics", "/platform/aix"],
              ["DevX", "Shift-left cost intelligence", "/platform/devx"],
            ].map(([t, b, h]) => (
              <Link key={t} href={h as string} className="rounded-2xl border border-cv-line bg-cv-surface p-6 hover:border-cv-ink/30 transition-colors">
                <h3 className="cv-h3 text-cv-ink">{t}</h3>
                <p className="text-cv-ink/75 mt-2">{b}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cv-section">
        <div className="cv-container max-w-3xl">
          <h2 className="cv-h2 text-cv-ink mb-8">Enterprise questions answered</h2>
          <div className="space-y-4">
            {FAQ.map(([q, a]) => (
              <details key={q} className="rounded-xl border border-cv-line bg-cv-surface2 p-5">
                <summary className="cursor-pointer font-medium text-cv-ink">{q}</summary>
                <p className="text-cv-ink/75 mt-3 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <div className="rounded-3xl border border-cv-line bg-cv-surface p-10 lg:p-16 text-center">
            <h2 className="cv-h2 text-cv-ink max-w-3xl mx-auto">Talk to our enterprise team.</h2>
            <p className="cv-body-lg text-cv-ink/75 mt-5 max-w-2xl mx-auto">
              Connect your first account in under 30 minutes. Most teams have their first non-obvious finding the same day.
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
