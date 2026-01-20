import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { MicroPreview } from "./MicroPreview";

const steps = [
  {
    number: "01",
    title: "Connect",
    body: "Read-only connections across clouds, data, and AI platforms.",
    bullets: [
      "Scoped access and tenant isolation",
      "Imports billing + usage signals"
    ],
    visualLabel: "Connections"
  },
  {
    number: "02",
    title: "Normalize",
    body: "A unified cost model for accounts, tags, owners, services, and products.",
    bullets: [
      "Tag normalization + governance",
      "Allocation-ready dimensions"
    ],
    visualLabel: "Cost model"
  },
  {
    number: "03",
    title: "Automate",
    body: "Recommendations and actions driven by 40+ ML models, with guardrails.",
    bullets: [
      "Detect + predict anomalies",
      "Track realized savings"
    ],
    visualLabel: "Automation"
  }
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-step") || "0", 10);
            setActiveStep(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    const stepElements = containerRef.current?.querySelectorAll("[data-step]");
    stepElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-8 sm:py-10 lg:py-12">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 -z-10 opacity-20"
        style={{
          background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(0, 0, 0, 0))",
          animation: "drift 12s ease-in-out infinite"
        }}
        aria-hidden="true"
      />
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20 space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-cv-ink">
            How CloudVerse™ works
          </h2>
          <p className="text-base sm:text-lg text-cv-muted leading-relaxed">
            Connect once. Normalize everything. Automate what you can.
          </p>
        </div>

        {/* Timeline Section */}
        <div
          ref={containerRef}
          className="rounded-3xl border border-cv-line dark:border-white/10 bg-cv-surface2/50 dark:bg-white/[0.03] backdrop-blur-sm overflow-hidden p-6 sm:p-8 lg:p-12 shadow-sm dark:shadow-[0_30px_80px_rgba(0,0,0,0.55)] relative"
        >
          {/* Desktop Timeline Line */}
          <div className="hidden lg:block absolute top-[72px] left-[16.6%] right-[16.6%] h-px bg-gradient-to-r from-transparent via-cv-line dark:via-white/20 to-transparent" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} data-step={idx} className="space-y-6">
                {/* Mobile Timeline Indicator */}
                <div className="lg:hidden flex items-start gap-4">
                  <div className="flex flex-col items-center pt-1">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold text-xs transition-all",
                        activeStep === idx
                          ? "border-blue-500 bg-blue-500/20 text-blue-400"
                          : "border-cv-line dark:border-white/20 text-cv-muted"
                      )}
                    >
                      {step.number}
                    </div>
                    {idx < steps.length - 1 && (
                      <div className="w-0.5 h-12 bg-gradient-to-b from-cv-line dark:from-white/20 to-transparent mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pt-1">
                    <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold text-cv-muted bg-cv-surface2/50 dark:bg-white/5">
                      Step {step.number}
                    </span>
                  </div>
                </div>

                {/* Desktop Number Pill */}
                <div className="hidden lg:flex items-center justify-center mb-6">
                  <div
                    className="w-12 h-12 rounded-full border-2 flex items-center justify-center font-semibold text-sm transition-all border-cv-line dark:border-white/20 text-cv-muted bg-white dark:bg-transparent"
                  >
                    {step.number}
                  </div>
                </div>

                {/* Card Content */}
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-semibold text-cv-ink">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-cv-muted leading-relaxed">
                    {step.body}
                  </p>

                  {/* Bullets */}
                  <ul className="space-y-2">
                    {step.bullets.map((bullet, bidx) => (
                      <li key={bidx} className="flex items-start gap-3">
                        <span className="text-blue-400 font-semibold mt-0.5">→</span>
                        <span className="text-sm text-cv-muted">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Micro Visual Tile */}
                <div className="mt-5 lg:mt-6 h-[180px] sm:h-[160px]">
                  <MicroPreview variant={idx === 0 ? "connect" : idx === 1 ? "normalize" : "automate"} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes drift {
          0%, 100% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(10px) translateY(-5px);
          }
        }
      `}</style>
    </section>
  );
}
