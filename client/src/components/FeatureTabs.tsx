import { useState } from "react";
import platformDashboardPreview from "@/assets/platform-dashboard-preview.png";
import automationDashboardPreview from "@/assets/automation-dashboard-preview.png";
import anomalyDashboardPreview from "@/assets/anomaly-dashboard-preview.png";

const featureTabs = [
  {
    id: "developer-finops",
    label: "Developer FinOps",
    title: "Shift cost awareness left.",
    body: "Brings cost context into engineering workflows before changes ship.",
    bullets: [
      "Cost context aligned to services and environments",
      "Recommendations engineers can act on",
      "Fewer surprises, less rework",
    ],
    image: platformDashboardPreview,
  },
  {
    id: "visibility",
    label: "Visibility",
    title: "See spend clearly across clouds and orgs.",
    body: "Understand cost drivers from organization down to resource.",
    bullets: [
      "Multi-cloud and multi-account views",
      "Drill-down without rebuilding dashboards",
      "Export-ready views for reporting",
    ],
    image: null,
  },
  {
    id: "tag-engine",
    label: "Tag Engine",
    title: "Clean dimensions power clean allocation.",
    body: "Normalize and enrich tags, then map ownership automatically.",
    bullets: [
      "Tag normalization and drift detection",
      "Ownership mapping using rules + ML",
      "Allocation that holds up under scrutiny",
    ],
    image: null,
  },
  {
    id: "anomalies",
    label: "Anomalies",
    title: "Detect spikes. Predict risk.",
    body: "Respond to abnormal spend and forecast overruns.",
    bullets: [
      "Detected anomalies near real time",
      "Predicted anomalies using ML models",
      "Clear paths to investigate and fix",
    ],
    image: anomalyDashboardPreview,
  },
  {
    id: "automation",
    label: "Automation",
    title: "Move from insight to action, automatically.",
    body: "CloudVerse applies recommendations safely, not just reports them.",
    bullets: [
      "40+ ML models powering recommendations",
      "Guardrails, approvals, and safe automation",
      "Track savings as realized, not estimated",
      "GPU and model inference optimization paths",
    ],
    image: automationDashboardPreview,
  },
];

export function FeatureTabs() {
  const [activeTab, setActiveTab] = useState("developer-finops");
  const activeTabContent = featureTabs.find((tab) => tab.id === activeTab);

  return (
    <div className="border border-cv-line rounded-2xl bg-cv-surface2 overflow-hidden">
      {/* Tab buttons */}
      <div
        className="flex flex-wrap border-b border-cv-line p-6"
        role="tablist"
      >
        {featureTabs.map((tab, idx) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 sm:px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-cv-surface2/50 dark:bg-white/5 text-cv-ink rounded"
                : "text-cv-muted hover:text-cv-ink"
            } ${idx < featureTabs.length - 1 ? "mr-2 sm:mr-3" : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTabContent && (
        <div
          id={`panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 md:p-10"
        >
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-cv-ink">
              {activeTabContent.title}
            </h3>
            <p className="text-sm text-cv-muted max-w-[56ch]">
              {activeTabContent.body}
            </p>
            <ul className="space-y-2 pt-4">
              {activeTabContent.bullets.map((bullet, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-sm text-cv-muted"
                >
                  <span className="text-primary font-semibold mt-0.5 flex-shrink-0">
                    •
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            {activeTabContent.image ? (
              <img
                src={activeTabContent.image}
                alt={activeTabContent.title}
                className="w-full h-auto object-contain"
              />
            ) : (
              <div className="w-full aspect-[4/3] flex items-center justify-center rounded-xl bg-cv-surface border border-cv-line overflow-hidden">
                <span className="text-cv-muted text-sm">Preview coming soon</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
