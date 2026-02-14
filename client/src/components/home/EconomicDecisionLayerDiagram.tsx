export function EconomicDecisionLayerDiagram() {
  const layers = [
    "Applications",
    "AI Models & Inference",
    "Data & Pipelines",
    "CI/CD & Deployment",
    "Cloud Infrastructure",
  ];

  return (
    <div className="relative max-w-2xl mx-auto my-8 sm:my-10" data-testid="diagram-economic-layer">
      <div className="flex flex-col gap-2">
        {layers.map((layer, idx) => (
          <div
            key={idx}
            className="relative flex items-center justify-center py-3 sm:py-4 px-4 rounded-lg border border-cv-line bg-cv-surface2/50 dark:bg-white/[0.04] text-sm sm:text-base font-medium text-cv-ink"
          >
            {layer}
          </div>
        ))}
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 left-[-12px] right-[-12px] z-10 pointer-events-none">
        <div
          className="relative border border-blue-500/40 rounded-lg bg-blue-500/[0.08] dark:bg-blue-500/[0.12] py-3 sm:py-4 px-6 shadow-[0_0_24px_rgba(59,130,246,0.15)] dark:shadow-[0_0_32px_rgba(59,130,246,0.2)]"
        >
          <div className="flex items-center justify-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-500/40" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 whitespace-nowrap">
              Economic Decision Layer
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-500/40" />
          </div>
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-2 flex-wrap">
            {["Model Selection", "Deployment Enforcement", "Runtime Controls", "Procurement Execution"].map((label, idx) => (
              <span key={idx} className="text-[9px] sm:text-[10px] font-medium tracking-wider text-blue-500/70 dark:text-blue-400/60 uppercase whitespace-nowrap">
                {label}{idx < 3 && <span className="ml-3 sm:ml-4 text-blue-500/30 dark:text-blue-400/30">•</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
