"use client";

import { useEffect, useRef, useState } from "react";

export default function NoBlackBoxes({ traceJson }: { traceJson: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

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
          className={`grid gap-10 lg:grid-cols-2 lg:items-start ${
            visible ? "cv-video-rise" : "opacity-0"
          }`}
        >
          {/* Left: headline + intro paragraph */}
          <div className="max-w-xl">
            <h2 className="cv-h2 text-cv-ink">No black boxes.</h2>
            <p className="cv-body-lg text-cv-ink/75 mt-5">
              Every routing decision includes an evidence summary: constraints active, routes evaluated, route selected, reason for selection, cost and latency outcome. Incident response, finance reviews, and compliance audits all work from the same traceable record.
            </p>
          </div>

          {/* Right: code block in glowing animated border + bottom text */}
          <div>
            {/* Glowing rotating blue gradient border */}
            <div className="relative rounded-2xl p-[1.5px]">
              <div
                aria-hidden
                className="cv-ring-blue absolute inset-0 rounded-2xl"
              />
              <div
                aria-hidden
                className="cv-ring-blue pointer-events-none absolute inset-0 rounded-2xl opacity-60 blur-md"
              />
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#070710]">
                {/* Mac chrome */}
                <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                  <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                </div>
                <pre className="overflow-x-auto p-6 font-mono text-xs leading-relaxed text-cv-ink/85">
                  {traceJson}
                </pre>
              </div>
            </div>

            <p className="text-cv-ink/75 mt-6">
              SOC2 and ISO-aligned architecture. Audit trails, access controls, and policy enforcement structured to support compliance documentation. Specific certification status confirmed during your evaluation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
