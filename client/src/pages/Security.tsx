import { BaseLayout } from "@/layouts/BaseLayout";
import { Button } from "@/components/Button";
import { MotionHero } from "@/components/MotionHero";
import { OutcomesWindow } from "@/components/OutcomesWindow";
import { track } from "@/lib/track";
import { Link } from "wouter";
import { useEffect } from "react";

const securityControls = [
  { title: "SSO + SCIM (Google/Microsoft)", desc: "Enterprise identity and directory-based access" },
  { title: "RBAC + audit logs", desc: "Fine-grained permissions with full activity tracking" },
  { title: "Data isolation by org", desc: "Multi-tenant boundaries with strict separation" },
  { title: "Private deployment options", desc: "Customer-controlled VPC/VNet environments" },
  { title: "Air-gapped deployment support", desc: "For regulated and classified environments" },
];

const deploymentOptions = [
  {
    title: "SaaS (Multi-tenant)",
    bestFor: "Most teams getting started quickly",
    description: "Fully managed, always up-to-date",
    bullets: [
      "Zero infrastructure management",
      "Automatic updates and scaling",
      "SOC 2 Type II compliant",
    ],
  },
  {
    title: "Private (VPC/VNet)",
    bestFor: "Enterprise security requirements",
    description: "Deployed in your cloud environment",
    bullets: [
      "Data stays in your network",
      "Custom retention policies",
      "Integrate with existing controls",
    ],
  },
  {
    title: "Air-gapped",
    bestFor: "Regulated & classified environments",
    description: "Fully isolated deployment",
    bullets: [
      "No external network access",
      "On-premises or private cloud",
      "Compliance-ready audit trails",
    ],
  },
];

export default function Security() {
  useEffect(() => {
    document.title = "Security — CloudVerse™";
  }, []);

  return (
    <BaseLayout>
      <MotionHero>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-left space-y-4 sm:space-y-6 max-w-[44rem]">
            <span className="cv-cap font-semibold tracking-widest text-cv-muted uppercase">
              CloudVerse™ Security
            </span>
            <h1 className="cv-h1">
              Security and compliance, built in
            </h1>
            <p className="text-[15px] sm:text-[16px] lg:text-[18px] leading-[24px] sm:leading-[26px] lg:leading-[30px] text-cv-muted max-w-[40rem]">
              Designed for enterprise environments, from access control to auditability.
            </p>
            <p className="text-sm text-cv-muted/70 border-l-2 border-cv-line pl-4">
              Private deployment and air-gapped options available for regulated environments.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-4 max-w-xs sm:max-w-none">
              <Link href="/contact" onClick={() => track("cta_security_contact", { location: "security_hero" })} className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto">
                  Talk to security
                </Button>
              </Link>
              <Link href="/connect" onClick={() => track("cta_demo", { location: "security_hero" })} className="w-full sm:w-auto">
                <Button variant="tertiary" size="lg" className="w-full sm:w-auto">
                  Book a demo
                </Button>
              </Link>
            </div>
          </div>

          <div className="w-full max-w-[640px] mx-auto lg:mx-0">
            <OutcomesWindow 
              label="Controls"
              outcomes={securityControls}
            />
          </div>
        </div>
      </MotionHero>

      <section className="py-14 sm:py-16 lg:py-20 border-t border-cv-line">
        <div className="cv-container max-w-[1000px]">
          <h2 className="cv-h2 mb-8 text-center">Designed for enterprise trust.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="border border-cv-line rounded-lg p-6 bg-cv-surface2">
              <h3 className="text-sm font-semibold text-cv-ink mb-3">
                Least-privilege by default
              </h3>
              <p className="text-sm text-cv-muted">
                Connections are scoped and read-only wherever possible.
              </p>
            </div>

            <div className="border border-cv-line rounded-lg p-6 bg-cv-surface2">
              <h3 className="text-sm font-semibold text-cv-ink mb-3">
                Auditable actions
              </h3>
              <p className="text-sm text-cv-muted">
                Syncs and automation paths are logged for review.
              </p>
            </div>

            <div className="border border-cv-line rounded-lg p-6 bg-cv-surface2">
              <h3 className="text-sm font-semibold text-cv-ink mb-3">
                Data minimization
              </h3>
              <p className="text-sm text-cv-muted">
                Only the signals needed for reporting and automation are collected.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 lg:py-20 border-t border-cv-line">
        <div className="cv-container max-w-[800px] text-center">
          <h2 className="cv-h2 mb-4">Compliance alignment</h2>
          <p className="text-sm text-cv-muted mb-6">
            CloudVerse is built to support common enterprise security reviews and compliance requirements.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {["ISO 27001", "SOC 2 Type II", "GDPR Ready", "HIPAA Compatible"].map((cert) => (
              <span
                key={cert}
                className="text-xs font-semibold tracking-wide uppercase px-4 py-2 border border-cv-line rounded-full text-cv-muted"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 lg:py-14 border-t border-cv-line">
        <div className="cv-container text-center">
          <div className="max-w-[600px] mx-auto space-y-4">
            <h2 className="cv-h2">Ready to discuss security?</h2>
            <p className="text-cv-muted">
              Our team can walk through controls, compliance, and deployment options.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
              <Link href="/contact" onClick={() => track("cta_security_contact", { location: "security_bottom" })}>
                <Button size="lg" className="w-full sm:w-auto">
                  Talk to security
                </Button>
              </Link>
              <Link href="/connect" onClick={() => track("cta_demo", { location: "security_bottom" })}>
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Book a demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
