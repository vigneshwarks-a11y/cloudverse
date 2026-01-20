import { BaseLayout } from "@/layouts/BaseLayout";
import { Button } from "@/components/Button";
import { track } from "@/lib/track";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { DollarSign, Code2, Briefcase, Server, Cpu } from "lucide-react";
import { useTheme } from "next-themes";
import financePreview from "@/assets/finance_white.png";
import financePreviewDark from "@/assets/finance_black.png";
import developerFinopsPreview from "@/assets/engineering_white.png";
import developerFinopsPreviewDark from "@/assets/engineering_black.png";
import businessPreview from "@/assets/business_white.png";
import businessPreviewDark from "@/assets/business_black.png";
import itPreview from "@/assets/it_platform_white.png";
import itPreviewDark from "@/assets/it_platform_black.png";
import aiPreview from "@/assets/ai_data_white.png";
import aiPreviewDark from "@/assets/ai_data_black.png";
import { FinalCTA } from "@/components/FinalCTA";

type Role = "finance" | "engineering" | "business" | "it" | "ai";

const roles: { id: Role; label: string; icon: typeof DollarSign }[] = [
  { id: "finance", label: "Finance", icon: DollarSign },
  { id: "engineering", label: "Engineering", icon: Code2 },
  { id: "business", label: "Business", icon: Briefcase },
  { id: "it", label: "IT & Platform", icon: Server },
  { id: "ai", label: "AI / Data", icon: Cpu },
];

const roleContent: Record<Role, {
  outcomes: string[];
  useCases: { title: string; desc: string }[];
  preview: string;
  workflow: string[];
}> = {
  finance: {
    outcomes: [
      "Unified multi-cloud cost visibility by BU/app/product",
      "Allocation-ready dimensions + audit-ready reports",
      "Forecasting + budget variance visibility",
      "Realized savings tracking (not estimates)",
    ],
    useCases: [
      { title: "Monthly close support", desc: "Chargeback/showback views with clear ownership" },
      { title: "Unit economics", desc: "Cost per product, channel, or customer segment" },
      { title: "Executive reporting", desc: "Leadership-ready packs with trend analysis" },
    ],
    preview: "Typical Finance view: spend variance, allocations, and savings realization.",
    workflow: ["Connect billing data", "Normalize dimensions", "Allocate to BUs", "Track savings"],
  },
  engineering: {
    outcomes: [
      "Cost context where engineers work (services/environments/owners)",
      "Actionable optimization recommendations with guardrails",
      "Fewer surprises: anomaly alerts and ownership clarity",
    ],
    useCases: [
      { title: "Idle & rightsizing", desc: "Across compute, storage, and data services" },
      { title: "Tag hygiene", desc: "Ownership enforcement and tag governance" },
      { title: "Environment breakdown", desc: "Cost by env/service with safe deploy changes" },
    ],
    preview: "Engineering context: service-level cost, environment split, recommended actions.",
    workflow: ["Connect cloud accounts", "Map to services", "Surface recommendations", "Apply with approvals"],
  },
  business: {
    outcomes: [
      "Business unit accountability with clear cost drivers",
      "Unit economics tied to usage/volume metrics",
      "ROI and trend visibility for strategic decisions",
    ],
    useCases: [
      { title: "Cost per transaction", desc: "Link spend to customer or workload volume" },
      { title: "Compare efficiency", desc: "Products, regions, or teams on spend efficiency" },
      { title: "Leadership rollups", desc: "Cross-org visibility with driver attribution" },
    ],
    preview: "Business view: unit economics, BU rollups, driver attribution.",
    workflow: ["Connect cost data", "Normalize by BU", "Tie to metrics", "Surface insights"],
  },
  it: {
    outcomes: [
      "Standardized cost model across providers + accounts",
      "Policy-driven governance + access controls",
      "Centralized integrations and operational readiness",
    ],
    useCases: [
      { title: "Multi-tenant governance", desc: "Access boundaries and policy enforcement" },
      { title: "Tag standards", desc: "Organization-wide normalization and compliance" },
      { title: "Platform KPIs", desc: "Compliance signals and operational metrics" },
    ],
    preview: "IT view: normalized dimensions, governance, and enterprise-wide controls.",
    workflow: ["Connect all providers", "Normalize taxonomy", "Enforce policies", "Report compliance"],
  },
  ai: {
    outcomes: [
      "Optimize GPU and AI workload spend with placement & utilization insights",
      "Track LLM/API usage and cost signals (OpenAI + data platforms)",
      "Detect anomalies in AI/data pipelines early",
    ],
    useCases: [
      { title: "GPU idle detection", desc: "Scheduling optimization and utilization tracking" },
      { title: "LLM cost insights", desc: "Token usage and routing cost signals" },
      { title: "Data warehouse costs", desc: "Databricks + Snowflake attribution" },
    ],
    preview: "AI/Data view: GPU utilization, LLM spend signals, pipeline cost drivers.",
    workflow: ["Connect AI platforms", "Normalize workloads", "Detect anomalies", "Optimize placement"],
  },
};

export default function Solutions() {
  const [activeRole, setActiveRole] = useState<Role>("finance");
  const { resolvedTheme } = useTheme();
  const content = roleContent[activeRole];

  useEffect(() => {
    document.title = "Solutions — CloudVerse™";
  }, []);

  return (
    <BaseLayout>
      {/* Hero */}
      <section className="pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-14 lg:pb-16 border-b border-cv-line">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pl-[48px] pr-[48px]">
          <div className="max-w-3xl">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-cv-muted mb-4">
              CloudVerse™ Solutions
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cv-ink mb-6 leading-tight">Solutions for every team that touches spend</h1>
            <p className="text-lg sm:text-xl text-cv-muted mb-8 leading-relaxed">
              Finance, Engineering, IT, Business, and AI/Data teams use CloudVerse to see spend clearly, enforce accountability, and act on savings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/connect" onClick={() => track("cta_demo", { location: "solutions_hero" })}>
                <Button size="lg" className="w-full sm:w-auto">
                  Book a demo
                </Button>
              </Link>
              <Link href="/integrations" onClick={() => track("cta_integrations", { location: "solutions_hero" })}>
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  View integrations
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Role Selector */}
      <section className="py-10 sm:py-12 lg:py-14 border-b border-cv-line">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.id}
                  onClick={() => setActiveRole(role.id)}
                  data-testid={`button-role-${role.id}`}
                  className={cn(
                    "flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm font-medium transition-all",
                    activeRole === role.id
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                      : "bg-cv-surface2/50 dark:bg-white/5 text-cv-muted hover:bg-cv-surface2/80 dark:hover:bg-white/10 hover:text-cv-ink border border-cv-line"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {role.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>
      {/* Role Content */}
      <section className="py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left: Outcomes + Use Cases */}
            <div className="space-y-10">
              {/* Top Outcomes */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-cv-ink mb-6">
                  Top outcomes
                </h2>
                <ul className="space-y-4">
                  {content.outcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-blue-400 font-bold mt-0.5">→</span>
                      <span className="text-base sm:text-lg text-cv-ink/80 leading-relaxed">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Use Cases */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-cv-ink mb-6">
                  Use cases
                </h3>
                <div className="space-y-4">
                  {content.useCases.map((uc, idx) => (
                    <div key={idx} className="p-5 rounded-xl border border-cv-line bg-cv-surface2/30 dark:bg-white/[0.02]">
                      <h4 className="text-base font-semibold text-cv-ink mb-1">{uc.title}</h4>
                      <p className="text-sm text-cv-muted">{uc.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Preview Card + Workflow */}
            <div className="space-y-8">
              {/* Preview Card */}
              {activeRole === "finance" ? (
                <div className="rounded-2xl overflow-hidden">
                  <img 
                    src={resolvedTheme === "dark" ? financePreviewDark : financePreview} 
                    alt="Typical Finance view: spend variance, allocations, and savings realization"
                    className="w-full h-auto block"
                  />
                </div>
              ) : activeRole === "engineering" ? (
                <div className="rounded-2xl overflow-hidden">
                  <img 
                    src={resolvedTheme === "dark" ? developerFinopsPreviewDark : developerFinopsPreview} 
                    alt="Engineering context: service-level cost, environment split, recommended actions"
                    className="w-full h-auto block"
                  />
                </div>
              ) : activeRole === "business" ? (
                <div className="rounded-2xl overflow-hidden">
                  <img 
                    src={resolvedTheme === "dark" ? businessPreviewDark : businessPreview} 
                    alt="Business view: unit economics, BU rollups, driver attribution"
                    className="w-full h-auto block"
                  />
                </div>
              ) : activeRole === "it" ? (
                <div className="rounded-2xl overflow-hidden">
                  <img 
                    src={resolvedTheme === "dark" ? itPreviewDark : itPreview} 
                    alt="IT view: normalized dimensions, governance, and enterprise-wide controls"
                    className="w-full h-auto block"
                  />
                </div>
              ) : activeRole === "ai" ? (
                <div className="rounded-2xl overflow-hidden">
                  <img 
                    src={resolvedTheme === "dark" ? aiPreviewDark : aiPreview} 
                    alt="AI/Data view: GPU utilization, LLM spend signals, pipeline cost drivers"
                    className="w-full h-auto block"
                  />
                </div>
              ) : (
                <div className="rounded-2xl border border-cv-line bg-cv-surface2/30 dark:bg-white/[0.03] overflow-hidden">
                  <div className="bg-cv-surface2/50 dark:bg-white/5 px-6 py-4 border-b border-cv-line flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/70"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400/70"></div>
                    </div>
                    <span className="text-[10px] font-semibold tracking-widest text-cv-muted uppercase ml-auto">
                      Dashboard Preview
                    </span>
                  </div>
                  <div className="p-6 sm:p-8">
                    <div className="space-y-4">
                      <div className="h-3 w-3/4 bg-cv-surface2/50 dark:bg-white/10 rounded"></div>
                      <div className="h-3 w-1/2 bg-cv-surface2/50 dark:bg-white/10 rounded"></div>
                      <div className="grid grid-cols-3 gap-3 mt-6">
                        <div className="h-20 bg-blue-500/10 rounded-lg border border-blue-500/20"></div>
                        <div className="h-20 bg-purple-500/10 rounded-lg border border-purple-500/20"></div>
                        <div className="h-20 bg-cyan-500/10 rounded-lg border border-cyan-500/20"></div>
                      </div>
                      <div className="h-32 bg-cv-surface2/50 dark:bg-white/5 rounded-lg border border-cv-line mt-4"></div>
                    </div>
                    <p className="text-sm text-cv-muted mt-6 italic">{content.preview}</p>
                  </div>
                </div>
              )}

              {/* Workflow Strip */}
              <div>
                <h4 className="text-sm font-semibold text-cv-muted uppercase tracking-widest mb-4">
                  How CloudVerse helps
                </h4>
                <div className="flex flex-wrap items-center gap-2">
                  {content.workflow.map((step, idx) => (
                    <div key={idx} className="flex items-center">
                      <span className="px-3 py-1.5 rounded-full bg-cv-surface2/50 dark:bg-white/5 border border-cv-line text-xs font-medium text-cv-muted">
                        {step}
                      </span>
                      {idx < content.workflow.length - 1 && (
                        <span className="text-cv-muted mx-2">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <FinalCTA location="solutions_bottom" />
    </BaseLayout>
  );
}
