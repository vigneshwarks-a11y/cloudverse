export function EconomicDecisionLayerDiagram() {
  const chips = [
    "Model Choice",
    "Engineering Change",
    "Query Execution",
    "Capacity Commitments",
  ];

  return (
    <div className="max-w-3xl mx-auto my-8 sm:my-12 px-4" data-testid="diagram-economic-layer">
      <div className="flex flex-col gap-4">
        {/* Top Tier */}
        <div className="rounded-2xl border border-cv-line bg-cv-surface2/50 dark:bg-white/[0.04] p-6 text-center shadow-sm">
          <h3 className="text-base sm:text-lg font-semibold text-cv-ink">Applications & AI Systems</h3>
          <p className="text-xs sm:text-sm text-cv-muted mt-1">Product features, agents, and services</p>
        </div>

        {/* Middle Tier - Highlighted */}
        <div className="relative">
          <div className="rounded-2xl border-2 border-blue-500/50 bg-blue-500/[0.08] dark:bg-blue-500/[0.12] p-8 text-center shadow-[0_0_30px_rgba(59,130,246,0.2)]">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-1">
              ECONOMIC DECISION LAYER
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-cv-ink">CloudVerse™</h3>
            <p className="text-xs sm:text-sm text-cv-muted mt-1">Decision logic embedded at execution points</p>
            
            <div className="flex items-center justify-center gap-2 sm:gap-3 mt-6 flex-wrap">
              {chips.map((chip, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-3 py-1 rounded-full border border-blue-500/30 dark:border-blue-400/25 text-[10px] sm:text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-500/[0.06] dark:bg-blue-400/[0.08]"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Tier */}
        <div className="rounded-2xl border border-cv-line bg-cv-surface2/50 dark:bg-white/[0.04] p-6 text-center shadow-sm">
          <h3 className="text-base sm:text-lg font-semibold text-cv-ink">Cloud Infrastructure & Capacity</h3>
          <p className="text-xs sm:text-sm text-cv-muted mt-1">Cloud, data platforms, and GPU/CPU capacity</p>
        </div>
      </div>

      <p className="text-center text-sm text-cv-muted mt-8 italic">
        Economic intent is applied at the decision point - not after the invoice.
      </p>
    </div>
  );
}
