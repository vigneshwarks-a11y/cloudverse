import { useEffect, useState } from "react";

interface Outcome {
  title: string;
  desc: string;
}

interface Provider {
  name: string;
  src: string;
}

interface OutcomesWindowProps {
  label: string;
  outcomes: Outcome[];
  outcomeSet2?: Outcome[];
  cloudProviders?: Provider[];
  aiProviders?: Provider[];
}

export function OutcomesWindow({ 
  label, 
  outcomes, 
  outcomeSet2, 
  cloudProviders = [],
  aiProviders = [],
}: OutcomesWindowProps) {
  const [showSet2, setShowSet2] = useState(false);
  const hasMultipleSets = !!outcomeSet2;
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (hasMultipleSets && !prefersReducedMotion) {
      const interval = setInterval(() => {
        setShowSet2(prev => !prev);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [hasMultipleSets, prefersReducedMotion]);

  const currentOutcomes = !prefersReducedMotion && showSet2 && outcomeSet2 ? outcomeSet2 : outcomes;
  const hasProviders = cloudProviders.length > 0 || aiProviders.length > 0;

  return (
    <div className="w-full rounded-[28px] border border-cv-line bg-cv-surface2/50 dark:bg-white/[0.04] backdrop-blur-sm overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
      {/* Header */}
      <div className="bg-cv-surface2/80 dark:bg-white/[0.03] px-6 py-4 border-b border-cv-line flex items-center gap-2">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/80"></div>
        </div>
        <span className="text-xs tracking-[0.24em] uppercase text-cv-muted font-semibold">
          {label}
        </span>
      </div>

      {/* Body */}
      <div className="px-6 py-6 pb-8">
        <div className={`grid ${hasProviders ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-10 lg:gap-12`}>
          {/* Left: Outcomes List */}
          <div className="relative">
            <div
              className={`transition-opacity ${hasMultipleSets ? 'duration-1000' : ''} ${
                showSet2 && hasMultipleSets ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <div className="space-y-5">
                {outcomes.slice(0, 4).map((outcome, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <h4 className="text-[15px] font-semibold text-blue-600 dark:text-[#5b9dff]">
                      {outcome.title}
                    </h4>
                    <p className="text-sm text-cv-muted leading-6">
                      {outcome.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {outcomeSet2 && (
              <div
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  showSet2 ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <div className="space-y-5">
                  {outcomeSet2.slice(0, 4).map((outcome, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                      <h4 className="text-[15px] font-semibold text-blue-600 dark:text-[#5b9dff]">
                        {outcome.title}
                      </h4>
                      <p className="text-sm text-cv-muted leading-6">
                        {outcome.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Providers */}
          {hasProviders && (
            <div className="flex flex-col border-t lg:border-t-0 lg:border-l border-cv-line pt-6 lg:pt-0 lg:pl-6">
              <h5 className="text-xs uppercase tracking-widest text-cv-muted font-semibold mb-6">
                Supported
              </h5>

              {/* Cloud Providers */}
              {cloudProviders.length > 0 && (
                <div className="mb-6">
                  <h6 className="text-[11px] uppercase tracking-widest text-cv-muted font-semibold mb-3">
                    Cloud
                  </h6>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {cloudProviders.map((provider) => (
                      <div
                        key={provider.name}
                        className="rounded-xl border border-cv-line bg-white dark:bg-white h-11 flex items-center justify-center px-3"
                      >
                        <img
                          src={provider.src}
                          alt={provider.name}
                          className="h-5 w-auto"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI & Data Providers */}
              {aiProviders.length > 0 && (
                <div>
                  <h6 className="text-[11px] uppercase tracking-widest text-cv-muted font-semibold mb-3">
                    AI & Data
                  </h6>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {aiProviders.map((provider) => (
                      <div
                        key={provider.name}
                        className="rounded-xl border border-cv-line bg-white dark:bg-white h-11 flex items-center justify-center px-3"
                      >
                        <img
                          src={provider.src}
                          alt={provider.name}
                          className={`${provider.name === 'NVIDIA' ? 'h-8' : 'h-5'} w-auto`}
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-cv-muted mt-3">
                    Kubernetes, SaaS, and more available.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
