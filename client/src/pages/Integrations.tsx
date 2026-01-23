import { BaseLayout } from "@/layouts/BaseLayout";
import { Button } from "@/components/Button";
import { IntegrationCard } from "@/components/IntegrationCard";
import { IntegrationDrawer } from "@/components/IntegrationDrawer";
import { integrationsData, Integration } from "@/data/integrationsData";
import { track } from "@/lib/track";
import { Link } from "wouter";
import { useState, useMemo } from "react";
import { useEffect } from "react";

const CATEGORIES = ["All", "Cloud", "Data", "AI", "Kubernetes", "Infrastructure", "Identity", "Ticketing", "Collaboration", "Observability", "SaaS"];
const STATUSES = ["All", "Available", "Beta", "Coming soon"];

export default function Integrations() {
  useEffect(() => {
    document.title = "Integrations — CloudVerse™";
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

  const filtered = useMemo(() => {
    return integrationsData.filter((integration) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = integration.name.toLowerCase().includes(searchLower) ||
                           integration.short.toLowerCase().includes(searchLower) ||
                           (integration.aliases && integration.aliases.some(alias => alias.toLowerCase().includes(searchLower)));
      const matchesCategory = selectedCategory === "All" || integration.category === selectedCategory;
      const matchesStatus = selectedStatus === "All" || integration.status === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, selectedCategory, selectedStatus]);

  return (
    <BaseLayout>
      {/* Hero */}
      <section className="pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-14 lg:pb-16">
        <div className="cv-container-full space-y-6">
          <div className="max-w-[900px]">
            <span className="cv-cap font-semibold tracking-widest text-cv-muted uppercase mb-4 inline-block">
              Integrations
            </span>
            <h1 className="cv-h1 mb-4">Connect your cloud, data, and AI platforms</h1>
            <p className="text-[15px] sm:text-[16px] lg:text-[17px] leading-[24px] sm:leading-[26px] lg:leading-[28px] text-cv-muted max-w-[800px]">
              CloudVerse normalizes billing, usage, tags, and ownership into one consistent model so reporting and automation work everywhere.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 pt-2">
            <a href="#explorer" onClick={() => track("cta_explore_integrations", { location: "integrations_hero" })}>
              <Button size="lg" className="w-full sm:w-auto">
                Explore integrations
              </Button>
            </a>
          </div>
        </div>
      </section>
      {/* Normalization Layer Strip */}
      <section className="py-14 sm:py-16 lg:py-20 border-t border-cv-line">
        <div className="cv-container-full">
          <h2 className="cv-h2 mb-10 text-center">A normalization layer, not a connector list.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-cv-ink mb-2">Standardize</h3>
              <p className="text-sm text-cv-muted">
                Unify accounts, services, tags, and cost dimensions across sources.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-cv-ink mb-2">Govern</h3>
              <p className="text-sm text-cv-muted">
                Scoped permissions, audit logs, and safe automation guardrails.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-cv-ink mb-2">Automate</h3>
              <p className="text-sm text-cv-muted">
                Recommendations and actions work consistently across platforms.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Integrations Explorer */}
      <section className="py-14 sm:py-16 lg:py-20 border-t border-cv-line" id="explorer">
        <div className="cv-container-full">
          {/* Search */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search integrations…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-cv-line bg-cv-surface2 text-cv-ink placeholder-cv-muted focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-6 mb-10">
            {/* Category Filters */}
            <div>
              <p className="text-xs uppercase tracking-widest text-cv-muted/60 font-medium mb-3">
                Category
              </p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors border ${
                      selectedCategory === cat
                        ? "bg-cv-ink text-cv-surface border-cv-ink"
                        : "bg-transparent border-cv-line text-cv-muted hover:bg-cv-surface2"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <p className="text-xs uppercase tracking-widest text-cv-muted/60 font-medium mb-3">
                Status
              </p>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-1.5 text-sm rounded-lg border border-cv-line bg-cv-surface2 text-cv-ink focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
              >
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((integration) => (
              <IntegrationCard
                key={integration.id}
                integration={integration}
                onClick={setSelectedIntegration}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-cv-muted">No integrations found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </section>
      {/* Enterprise Connectors */}
      <section className="py-14 sm:py-16 lg:py-20 border-t border-cv-line">
        <div className="cv-container-full">
          <h2 className="cv-h2 mb-10">Built for enterprise access patterns.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Read-only by default",
                body: "Connections use scoped, least-privilege access."
              },
              {
                title: "Auditable and controlled",
                body: "Every sync and action is logged for review."
              },
              {
                title: "Multiple ingestion modes",
                body: "API, exports, and agents depending on the platform."
              }
            ].map((card, idx) => (
              <div key={idx} className="p-6 rounded-xl border border-cv-line bg-cv-surface2">
                <h3 className="text-base font-semibold text-cv-ink mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-cv-muted">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Request Integration CTA */}
      <section className="py-14 sm:py-16 lg:py-20 border-t border-cv-line">
        <div className="cv-container max-w-[800px] text-center">
          <h2 className="cv-h2 mb-3">Need a connector that isn't listed?</h2>
          <p className="cv-body text-cv-muted mb-6">
            Tell us what you use. We'll prioritize it with you.
          </p>
          <Link href="/contact" onClick={() => track("cta_request_integration", { location: "integrations_cta" })}>
            <Button size="lg">
              Request an integration
            </Button>
          </Link>
        </div>
      </section>
      {/* FAQ */}
      <section className="py-14 sm:py-16 lg:py-20 border-t border-cv-line">
        <div className="cv-container max-w-[800px]">
          <h2 className="cv-h2 mb-10 text-center">Questions?</h2>
          <div className="space-y-4">
            {[
              {
                q: "How long does setup take?",
                a: "Most connections are 15–30 minutes depending on method."
              },
              {
                q: "What permissions do you require?",
                a: "Read-only, scoped to billing and usage wherever possible."
              },
              {
                q: "Do you support multi-account and multi-org setups?",
                a: "Yes, CloudVerse supports enterprise hierarchies and tenancy boundaries."
              },
              {
                q: "Can we use exports instead of APIs?",
                a: "Yes, billing exports are supported when APIs aren't available."
              },
              {
                q: "Do integrations affect production performance?",
                a: "No, connections are designed to be low overhead and read-only."
              }
            ].map((faq, idx) => (
              <div key={idx} className="pb-4 border-b border-cv-line last:border-b-0">
                <h3 className="text-sm font-semibold text-cv-ink mb-2">
                  {faq.q}
                </h3>
                <p className="text-sm text-cv-muted">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Drawer */}
      <IntegrationDrawer
        integration={selectedIntegration}
        onClose={() => setSelectedIntegration(null)}
      />
    </BaseLayout>
  );
}
