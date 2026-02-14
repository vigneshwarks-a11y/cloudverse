export function EconomicDecisionLayerDiagram() {
  const topLayers = [
    "Applications",
    "AI Models & Inference",
  ];

  const bottomLayers = [
    "Data Platforms & Pipelines",
    "CI/CD & Deployment",
    "Cloud Infrastructure",
  ];

  const chips = [
    "Model Choice",
    "Engineering Change",
    "Query Execution",
    "Capacity Commitments",
  ];

  return (
    <div className="max-w-2xl mx-auto my-8 sm:my-10" data-testid="diagram-economic-layer">
      <div className="flex flex-col gap-2">
        {topLayers.map((layer, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center py-3 sm:py-4 px-4 rounded-lg border border-cv-line bg-cv-surface2/50 dark:bg-white/[0.04] text-sm sm:text-base font-medium text-cv-ink"
          >
            {layer}
          </div>
        ))}

        <div className="my-1">
          <div className="rounded-xl border border-blue-500/50 bg-blue-500/[0.06] dark:bg-blue-500/[0.10] py-4 sm:py-5 px-5 sm:px-6 shadow-[0_0_28px_rgba(59,130,246,0.12)] dark:shadow-[0_0_36px_rgba(59,130,246,0.18)]">
            <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] text-blue-500/70 dark:text-blue-400/60 text-center mb-2">
              Embedded Decision Logic
            </p>
            <p className="text-sm sm:text-base font-semibold text-blue-600 dark:text-blue-400 text-center tracking-wide">
              CloudVerse Economic Decision Layer
            </p>
            <div className="flex items-center justify-center gap-2 sm:gap-3 mt-3 flex-wrap">
              {chips.map((chip, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2.5 py-1 rounded-md border border-blue-500/30 dark:border-blue-400/25 text-[10px] sm:text-[11px] font-medium text-blue-600 dark:text-blue-400 bg-blue-500/[0.06] dark:bg-blue-400/[0.08]"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>

        {bottomLayers.map((layer, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center py-3 sm:py-4 px-4 rounded-lg border border-cv-line bg-cv-surface2/50 dark:bg-white/[0.04] text-sm sm:text-base font-medium text-cv-ink"
          >
            {layer}
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-cv-muted mt-6">
        Economic intent is applied at the decision point — not after the invoice.
      </p>
    </div>
  );
}
