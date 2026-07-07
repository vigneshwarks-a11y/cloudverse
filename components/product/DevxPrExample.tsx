"use client";

import { useEffect, useRef, useState } from "react";

const CYAN = "#38BDF8";

export default function DevxPrExample({ diff }: { diff: string }) {
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
    <section id="pr-example" className="cv-section bg-cv-surface2 dark:bg-black">
      <div className="cv-container">
        <div ref={ref}>
          <div className="max-w-3xl mb-8" style={rise(0)}>
            <h2 className="cv-h2 text-cv-ink">This is what a DevX PR comment looks like.</h2>
            <p className="text-cv-ink/75 mt-4">
              This is a real DevX output. An infrastructure change that looked routine. NAT gateway flag and a compute resize.
            </p>
          </div>

          {/* Equal-height left/right split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* LEFT: code window with Mac chrome + blue glowing border */}
            <div className="h-full" style={rise(1)}>
              <div className="relative h-full rounded-2xl p-[1.5px]">
                <div aria-hidden className="cv-ring-blue absolute inset-0 rounded-2xl" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-cv-line bg-cv-card dark:bg-[#0D0D0D]">
                  {/* Mac chrome */}
                  <div className="flex items-center gap-2 border-b border-cv-line bg-cv-ink/[0.03] px-4 py-3">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                    <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                    <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <pre className="flex-1 overflow-auto p-6 font-mono text-xs leading-relaxed text-cv-ink/85">
                    {diff}
                  </pre>
                </div>
              </div>
            </div>

            {/* RIGHT: two stacked cards, equal combined height to code window */}
            <div className="flex h-full flex-col gap-6">
              {/* TOP: DevX cost estimate dark, thin border */}
              <div className="rounded-2xl border border-cv-line bg-cv-surface dark:bg-[#0D0D0D] p-6" style={rise(2)}>
                <div className="cv-label mb-2 text-[#1664C0] dark:text-[#38BDF8]">DevX cost estimate</div>
                <div className="text-3xl font-display font-semibold text-cv-ink">+$1.1k to $1.4k</div>
                <div className="text-sm text-cv-muted">per month</div>
                <div className="cv-label mt-5 mb-2 text-[#1664C0] dark:text-[#38BDF8]">Primary drivers</div>
                <ul className="text-sm text-cv-ink/80 space-y-1">
                  <li>• Instance size increase</li>
                  <li>• Always-on scheduling</li>
                </ul>
              </div>

              {/* BOTTOM: why this matters dark, blue glowing border */}
              <div className="relative flex-1 rounded-2xl p-[1.5px]" style={rise(3)}>
                <div aria-hidden className="cv-ring-blue absolute inset-0 rounded-2xl" />
                <div className="relative h-full rounded-2xl border border-cv-line bg-cv-surface dark:bg-[#0D0D0D] p-6">
                  <div className="cv-label mb-2 text-[#1664C0] dark:text-[#38BDF8]">Why this matters</div>
                  <ul className="text-sm text-cv-ink/80 space-y-1">
                    <li>• Recurring monthly cost</li>
                    <li>• No attached owner or budget line</li>
                  </ul>
                  <div className="cv-label mt-5 mb-2 text-[#1664C0] dark:text-[#38BDF8]">Suggested fix</div>
                  <ul className="text-sm text-cv-ink/80 space-y-1">
                    <li>• Drop one instance tier</li>
                    <li>• Add an auto-stop schedule for non-prod</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-cv-muted mt-6 italic" style={rise(4)}>
            Estimates are directional. They do not affect billing. They inform decisions before billing happens.
          </p>
        </div>
      </div>
    </section>
  );
}
