import type { Metadata } from "next";
import { Building2, ShieldCheck, Globe2, Network } from "lucide-react";
import { SolutionHero } from "@/components/solution/SolutionHero";
import { Outcomes } from "@/components/solution/Outcomes";
import { ModulesUsed } from "@/components/solution/ModulesUsed";
import { FaqBlock } from "@/components/FaqBlock";
import { CTABand } from "@/components/CTABand";

export const metadata: Metadata = {
  title: "For Enterprise — CloudVerse",
  description: "One control plane for multi-cloud, AI, infrastructure, and warehouse economics — with SSO, RBAC, audit trails, and regional residency.",
  alternates: { canonical: "/solutions/enterprise" },
};

const FAQ = [
  { q: "What enterprise controls are included?", a: "SSO (SAML / OIDC), SCIM provisioning, granular RBAC, audit logs, customer-managed encryption keys, and regional data residency." },
  { q: "Where is data stored?", a: "Choose between US, EU, and APAC regions. Customer-managed keys available on Enterprise plans." },
  { q: "Do you support air-gapped or VPC deployments?", a: "Yes — private-link, VPC peering, and dedicated single-tenant deployments are available on Enterprise." },
  { q: "What about procurement?", a: "We operate on AWS Marketplace, Azure Marketplace, and Google Cloud Marketplace — and accept committed-spend redemption on all three." },
  { q: "Who do we work with for rollout?", a: "Every Enterprise account gets a dedicated solutions engineer, FinOps practitioner, and 24/7 support." },
];

export default function Page() {
  return (
    <>
      <SolutionHero
        eyebrow="For Enterprise"
        h1={<>One control plane for <span className="text-cv-blue-light">multi-cloud, AI, infra, and data economics.</span></>}
        sub="The compute economics platform global enterprises run on — with the SSO, RBAC, residency, and procurement options the office of the CIO expects."
        proof={[
          { value: "SSO + SCIM", label: "Identity ready" },
          { value: "US / EU / APAC", label: "Residency options" },
          { value: "AWS / Azure / GCP", label: "Marketplace listed" },
          { value: "24/7", label: "Enterprise support" },
        ]}
      />

      <Outcomes
        heading="What enterprise teams operationalise on day one."
        items={[
          { icon: Building2,   title: "One model across the estate", body: "Cloud, AI, infrastructure, and warehouse spend on a single allocation model." },
          { icon: ShieldCheck, title: "Identity and audit",          body: "SSO, SCIM, granular RBAC, audit logs, and customer-managed keys." },
          { icon: Globe2,      title: "Regional residency",          body: "US, EU, and APAC regions with private-link and VPC options." },
          { icon: Network,     title: "Marketplace + procurement",   body: "AWS, Azure, and Google Cloud Marketplace with committed-spend redemption." },
        ]}
      />

      <ModulesUsed keys={["finops", "aix", "devx", "datax"].slice(0, 3) as ("finops" | "aix" | "devx" | "datax")[]} />

      <section className="cv-section bg-cv-surface">
        <div className="cv-container">
          <div className="max-w-3xl mb-10">
            <div className="cv-label mb-3">FAQ</div>
            <h2 className="cv-h2 text-cv-ink">Enterprise questions, answered.</h2>
          </div>
          <FaqBlock items={FAQ} />
        </div>
      </section>

      <CTABand heading="Talk to our enterprise team." />
    </>
  );
}
