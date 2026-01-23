import { useState } from "react";
import { useTheme } from "next-themes";
import platformDashboardPreview from "@/assets/developer_finops_light.png";
import platformDashboardPreviewDark from "@/assets/developer_finops_black.png";
import automationDashboardPreview from "@/assets/automation-dashboard-preview.png";
import automationDashboardPreviewDark from "@/assets/automation-dashboard-preview-dark.png";
import anomalyDashboardPreview from "@/assets/anomaly-dashboard-preview.png";
import anomalyDashboardPreviewDark from "@/assets/anomaly-dashboard-preview-dark.png";
import visibilityDashboardPreview from "@/assets/visibility-dashboard-preview.png";
import visibilityDashboardPreviewDark from "@/assets/visibility-dashboard-preview-dark.png";
import tagEngineDashboardPreview from "@/assets/tag_engine_white.png";
import tagEngineDashboardPreviewDark from "@/assets/tag_engine_black.png";

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
    imageDark: platformDashboardPreviewDark,
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
    image: visibilityDashboardPreview,
    imageDark: visibilityDashboardPreviewDark,
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
    image: tagEngineDashboardPreview,
    imageDark: tagEngineDashboardPreviewDark,
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
    imageDark: anomalyDashboardPreviewDark,
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
    imageDark: automationDashboardPreviewDark,
  },
];

export function FeatureTabs() {
  const [activeTab, setActiveTab] = useState("developer-finops");
  const { resolvedTheme } = useTheme();
  const activeTabContent = featureTabs.find((tab) => tab.id === activeTab);
  const isDark = resolvedTheme === "dark";

  return (
    <div className="border border-cv-line rounded-2xl bg-cv-surface2 overflow-hidden">
      {/* Tab buttons */}
      <div
        className="overflow-x-auto scrollbar-hide border-b border-cv-line"
        role="tablist"
      >
        <div className="flex gap-2 p-3 sm:p-4 md:p-6 min-w-max sm:min-w-0 sm:flex-wrap sm:justify-center">
          {featureTabs.map((tab) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              tabIndex={activeTab === tab.id ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all rounded-lg flex-shrink-0 ${
                activeTab === tab.id
                  ? "text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-500/20 shadow-sm"
                  : "text-cv-muted hover:text-cv-ink hover:bg-cv-surface2 dark:hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {activeTabContent && (
        <div
          id={`panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className="p-4 sm:p-6 md:p-10"
        >
          {/* Image - shows first on mobile, hidden on desktop */}
          <div className="block lg:hidden mb-6">
            {activeTabContent.image ? (
              <img
                src={(isDark && activeTabContent.imageDark) ? activeTabContent.imageDark : activeTabContent.image}
                alt={activeTabContent.title}
                className="w-full aspect-[16/10] object-cover rounded-xl"
              />
            ) : (
              <div className="w-full aspect-[16/10] flex items-center justify-center rounded-xl bg-cv-surface border border-cv-line overflow-hidden">
                <span className="text-cv-muted text-sm">Preview coming soon</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold text-cv-ink">
                {activeTabContent.title}
              </h3>
              <p className="text-sm text-cv-muted">
                {activeTabContent.body}
              </p>
              <ul className="space-y-2 pt-2 sm:pt-4">
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

            {/* Image - hidden on mobile, shows on desktop */}
            <div className="hidden lg:flex items-center justify-center h-full">
              {activeTabContent.image ? (
                <img
                  src={(isDark && activeTabContent.imageDark) ? activeTabContent.imageDark : activeTabContent.image}
                  alt={activeTabContent.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <div className="w-full aspect-[4/3] flex items-center justify-center rounded-xl bg-cv-surface border border-cv-line overflow-hidden">
                  <span className="text-cv-muted text-sm">Preview coming soon</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
