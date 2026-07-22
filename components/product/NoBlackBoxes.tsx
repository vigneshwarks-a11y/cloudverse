"use client";

import { useEffect, useRef, useState } from "react";

/* "No black boxes." — a designed decision-trace card showing the raw JSON of a
   routing decision, so nothing is hidden. */

export default function NoBlackBoxes({ traceJson }: { traceJson: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const rise = (i: number): React.CSSProperties => ({
    opacity: visible || reduceMotion ? 1 : 0,
    transform: reduceMotion || visible ? "translateY(0)" : "translateY(24px)",
    transition: "opacity 700ms ease-out, transform 700ms ease-out",
    transitionDelay: reduceMotion ? "0ms" : `${i * 120}ms`,
  });

  return (
    <section className="cv-section relative overflow-hidden">
      {/* Subtle blue gradient fading left to right (CloudVerse blue only) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(0,124,255,0.10) 0%, rgba(0,124,255,0.04) 35%, transparent 70%)",
        }}
      />
      <div className="cv-container relative">
        <div
          ref={ref}
          className="flex flex-col items-start gap-10"
        >
          {/* headline + description */}
          <div
            className="flex max-w-2xl flex-col items-start text-left"
            style={rise(1)}
          >
            <h2 className="cv-h2 text-cv-ink">No black boxes.</h2>
            <p className="cv-body-lg text-cv-ink/75 mt-5">
              Every routing decision includes an evidence summary: the constraints active, the routes evaluated, the one selected, and why. If you can&apos;t explain a decision, you can&apos;t govern it.
            </p>
            <p className="text-cv-ink/75 mt-8">
              SOC2 and ISO-aligned architecture. Audit trails, access controls, and policy enforcement structured to support compliance documentation. Specific certification status confirmed during your evaluation.
            </p>
          </div>

          {/* decision-trace card (raw JSON) */}
          <div className="mx-auto w-full max-w-3xl" style={rise(0)}>
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-cv-line/60 bg-cv-card shadow-[0_10px_30px_-16px_rgba(15,23,42,0.15)] dark:border-white/10 dark:bg-[#0D0D0D] dark:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)]">
              {/* chrome header: mac dots + JSON label */}
              <div className="flex items-center justify-between gap-3 border-b border-cv-line bg-cv-ink/[0.03] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                  <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                </div>
                <span className="rounded-md bg-cv-ink/[0.08] px-2.5 py-1 text-[11px] font-medium text-cv-ink dark:bg-white/10">
                  JSON
                </span>
              </div>

              <pre className="flex-1 overflow-auto p-6 font-mono text-xs leading-relaxed text-cv-ink/85">
                {traceJson}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
