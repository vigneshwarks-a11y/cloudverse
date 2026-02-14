export function EconomicDecisionLayerDiagram() {
  const layers = [
    "Applications",
    "AI Models & Inference",
    "Data & Pipelines",
    "CI/CD & Deployment",
    "Cloud Infrastructure",
  ];

  return (
    <div className="relative max-w-2xl mx-auto my-10 sm:my-12" data-testid="diagram-economic-layer">
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
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex items-center justify-center pointer-events-none z-10">
        <div className="w-full border-t-2 border-b-2 border-blue-500/60 bg-blue-500/10 dark:bg-blue-500/15 py-2 px-4 flex flex-col items-center">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Economic Decision Layer
          </span>
          <span className="text-xs text-blue-500/80 dark:text-blue-400/70 font-medium">
            CloudVerse
          </span>
        </div>
      </div>
    </div>
  );
}
