import { BaseLayout } from "@/layouts/BaseLayout";
import { Button } from "@/components/Button";
import { Link } from "wouter";
import { useEffect } from "react";

const docSections = [
  {
    title: "Getting started",
    items: [
      { title: "Documentation Overview", description: "Start here for a complete guide to CloudVerse documentation.", slug: "overview" },
      { title: "Quick Start Guide", description: "Connect your first data source in under 30 minutes.", slug: "quick-start" },
    ]
  },
  {
    title: "Integrations",
    items: [
      { title: "Integrations Setup", description: "Connect cloud providers, data platforms, and identity systems.", slug: "integrations-setup" },
      { title: "Cloud Provider Guides", description: "Step-by-step setup for AWS, Azure, GCP, and more.", slug: "cloud-providers" },
    ]
  },
  {
    title: "Security & access",
    items: [
      { title: "Security Overview", description: "Security architecture, access controls, and compliance.", slug: "security-overview" },
      { title: "Role-Based Access Control", description: "Configure workspaces, roles, and user permissions.", slug: "rbac" },
    ]
  },
  {
    title: "Data model",
    items: [
      { title: "Data Model", description: "Understand cost dimensions, allocation rules, and reporting structures.", slug: "data-model" },
      { title: "Allocation Rules", description: "Configure how costs are attributed to teams and projects.", slug: "allocation-rules" },
    ]
  },
  {
    title: "Exports & reporting",
    items: [
      { title: "Exports and Reporting", description: "Export data for external systems and custom reporting.", slug: "exports-reporting" },
      { title: "Scheduled Reports", description: "Automate report delivery to stakeholders.", slug: "scheduled-reports" },
    ]
  },
  {
    title: "API Reference",
    items: [
      { title: "API Reference", description: "Complete API documentation for programmatic access.", slug: "api-reference", external: true },
      { title: "Automation Configuration", description: "Set up automated actions, guardrails, and approval workflows.", slug: "automation-config" },
    ]
  }
];

export default function ResourcesDocs() {
  useEffect(() => {
    document.title = "Documentation — CloudVerse";
  }, []);

  return (
    <BaseLayout>
      {/* Hero */}
      <section className="py-cv-sec-lg">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="max-w-[760px] mx-auto text-center space-y-4">
            <h1 className="cv-h1">Documentation</h1>
            <p className="text-sm text-cv-muted">
              Setup, integrations, security, RBAC, and platform reference.
            </p>
          </div>
        </div>
      </section>

      {/* Doc Sections */}
      <section className="py-cv-sec-lg border-t border-cv-line">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {docSections.map((section) => (
              <div key={section.title}>
                <h2 className="text-sm font-semibold text-cv-ink mb-4 uppercase tracking-wide">
                  {section.title}
                </h2>
                <div className="space-y-0 divide-y divide-cv-line">
                  {section.items.map((item) => (
                    <div
                      key={item.slug}
                      className={`py-4 ${item.external ? 'opacity-60' : 'hover:bg-cv-surface2 -mx-3 px-3 rounded transition-colors'}`}
                    >
                      {item.external ? (
                        <div>
                          <h3 className="text-sm font-medium text-cv-ink mb-1">
                            {item.title}
                            <span className="text-xs text-cv-muted/50 ml-2">(Coming soon)</span>
                          </h3>
                          <p className="text-sm text-cv-muted">{item.description}</p>
                        </div>
                      ) : (
                        <Link href={`/resources/docs/${item.slug}`} className="block">
                          <h3 className="text-sm font-medium text-cv-ink mb-1 hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-sm text-cv-muted">{item.description}</p>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-cv-sec-lg border-t border-cv-line">
        <div className="max-w-[760px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="cv-h2 mb-3">Request onboarding support</h2>
          <p className="text-sm text-cv-muted mb-6">
            Need help getting started? Our team can walk you through setup and best practices.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto">
                Contact sales
              </Button>
            </Link>
            <Link href="/connect">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Book a demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
