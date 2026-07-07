"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#6954D4";
const CYAN = "#38BDF8";

export default function AixRoiSplit({ roi }: { roi: string[][] }) {
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
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
      {/* LEFT: label + table + assumptions */}
      <div className="flex flex-col" style={rise(0)}>
        <div className="cv-label mb-4 text-[#1664C0] dark:text-[#38BDF8]">At scale (monthly)</div>
        <div className="flex-1 overflow-x-auto rounded-2xl border border-cv-line/40">
          <table className="w-full text-sm">
            <thead className="bg-cv-surface dark:bg-[#0D0D0D]">
              <tr className="text-left">
                <th className="p-4 text-cv-ink font-medium">Monthly volume</th>
                <th className="p-4 text-cv-muted font-medium">Hardcoded spend</th>
                <th className="p-4 text-cv-muted font-medium">With AIX</th>
                <th className="p-4 font-medium" style={{ color: ACCENT }}>Monthly saving</th>
              </tr>
            </thead>
            <tbody>
              {roi.map((row, i) => (
                <tr key={i} className="border-t border-cv-line">
                  <td className="p-4 text-cv-ink/90">{row[0]}</td>
                  <td className="p-4 text-cv-ink/75">{row[1]}</td>
                  <td className="p-4 text-cv-ink/75">{row[2]}</td>
                  <td className="p-4 font-semibold text-cv-ink">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-cv-muted mt-3 italic">
          Assumption: 40–90% reduction applied at an 89% average. Your mix will differ; the audit measures yours.
        </p>
      </div>

      {/* RIGHT: two stacked cards, equal combined height to the table */}
      <div className="flex h-full flex-col gap-6">
        {/* TOP: Without AIX dark, thin border */}
        <div className="rounded-2xl border border-cv-line/40 bg-cv-surface dark:bg-[#0D0D0D] p-6" style={rise(1)}>
          <div className="cv-label mb-3 text-[#1664C0] dark:text-[#38BDF8]">Without AIX</div>
          <p className="text-cv-ink/85">Claude Sonnet, 5,537ms latency, $0.00298/req</p>
        </div>

        {/* BOTTOM: With AIX dark, blue glowing border */}
        <div className="relative flex-1 rounded-2xl p-[1.5px]" style={rise(2)}>
          <div aria-hidden className="cv-ring-blue absolute inset-0 rounded-2xl" />
          <div className="relative flex h-full flex-col rounded-2xl border border-cv-line bg-cv-surface dark:bg-[#0D0D0D] p-6">
            <div className="cv-label mb-3 text-[#1664C0] dark:text-[#38BDF8]">With AIX</div>
            <p className="text-cv-ink/95">GPT-4o-mini, 3,962ms latency, $0.00010/req</p>
            <p className="text-cv-ink font-medium mt-3">Result: 96.8% lower cost. 28.5% faster.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
