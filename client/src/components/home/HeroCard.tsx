import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { LOGOS, CLOUD_PROVIDERS, AI_GPU_PROVIDERS, LOGO_DISPLAY_NAMES, type LogoKey } from "@/config/logos";

const heroOutcomesSet1 = [
  { title: "Unified Cost Visibility", desc: "Real-time view across all clouds and services" },
  { title: "Real-time Anomalies", desc: "Detect and predict cost spikes before impact" },
  { title: "Compliance Ready", desc: "Audit trails, access controls, and deployment options" },
  { title: "Multi-cloud Native", desc: "Support for AWS, Azure, GCP, and emerging platforms" },
];

const heroOutcomesSet2 = [
  { title: "Automated Optimization", desc: "AI-driven cost reduction and waste prevention" },
  { title: "ML-powered Recommendations", desc: "Smart sizing, reservations, and savings plans" },
  { title: "One-click Actions", desc: "Apply fixes with audit trails and rollbacks" },
  { title: "Realized Savings", desc: "Track outcomes, not estimates" },
];

function LogoPill({ logoKey, className = "" }: { logoKey: LogoKey; className?: string }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const variant = mounted ? (resolvedTheme === 'dark' ? 'dark' : 'light') : 'dark';
  const logoPath = LOGOS[logoKey][variant];
  const displayName = LOGO_DISPLAY_NAMES[logoKey];

  return (
    <div 
      className={`logo-pill flex items-center justify-center h-11 sm:h-10 rounded bg-slate-200 dark:bg-slate-200 ${className}`}
      data-testid={`logo-${logoKey}`}
    >
      <img
        src={logoPath}
        alt={displayName}
        className="h-6 sm:h-6 w-auto max-w-[65px] sm:max-w-[70px] object-contain"
      />
    </div>
  );
}

export function HeroCard() {
  const [showSet2, setShowSet2] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const interval = setInterval(() => {
      setShowSet2((prev) => !prev);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full lg:w-[480px] xl:w-[540px] 2xl:w-[580px] rounded-[28px] border border-cv-line dark:border-slate-700/50 bg-cv-surface dark:bg-slate-900 overflow-hidden min-h-[480px] sm:min-h-[440px] shadow-xl shadow-black/20 relative flex flex-col">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 via-transparent to-blue-900/20 pointer-events-none opacity-50 dark:opacity-100" />
      
      {/* Window Header */}
      <div className="bg-cv-surface2/80 dark:bg-slate-800/80 px-8 py-5 border-b border-cv-line dark:border-slate-700/50 flex items-center gap-3 relative z-10">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <div className="w-3 h-3 rounded-full bg-green-400/80" />
        </div>
        <span className="text-[11px] font-semibold tracking-widest text-cv-muted dark:text-slate-400 uppercase ml-auto">
          CloudVerse™ Outcomes
        </span>
      </div>

      {/* Window Content */}
      <div className="p-6 sm:p-8 relative z-10 flex flex-col h-full">
        {/* Outcomes List - Crossfading */}
        <div className="relative mb-4 sm:mb-6 min-h-[260px] sm:min-h-[280px]">
          <div
            className={`transition-opacity duration-1000 space-y-4 sm:space-y-6 ${
              showSet2 ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            {heroOutcomesSet1.map((outcome, idx) => (
              <div key={idx}>
                <h4 className="text-[15px] font-semibold text-blue-600 dark:text-blue-400 mb-1.5 leading-relaxed">
                  {outcome.title}
                </h4>
                <p className="text-[13px] text-cv-muted dark:text-slate-400 leading-relaxed">
                  {outcome.desc}
                </p>
              </div>
            ))}
          </div>
          <div
            className={`absolute inset-0 transition-opacity duration-1000 space-y-4 sm:space-y-6 ${
              showSet2 ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {heroOutcomesSet2.map((outcome, idx) => (
              <div key={idx}>
                <h4 className="text-[15px] font-semibold text-blue-600 dark:text-blue-400 mb-1.5 leading-relaxed">
                  {outcome.title}
                </h4>
                <p className="text-[13px] text-cv-muted dark:text-slate-400 leading-relaxed">
                  {outcome.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-cv-line dark:border-slate-700/50 pt-3 mt-auto" />

        {/* Supported Platforms - Compact single section */}
        <div className="pt-2">
          <p className="text-[9px] font-medium tracking-wider text-cv-muted/60 dark:text-slate-500/60 uppercase mb-2">
            Works with
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5 sm:gap-2">
            {[...CLOUD_PROVIDERS, ...AI_GPU_PROVIDERS].map((key) => (
              <LogoPill key={key} logoKey={key} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
