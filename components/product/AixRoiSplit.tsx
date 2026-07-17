"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#2278E0";

// Spec rows for the two comparison cards. `cut` renders a reduction chip.
const WITHOUT = [
  ["Model", "Claude Sonnet"],
  ["Latency", "5,537 ms"],
  ["Cost / 1000 requests", "$2.98"],
] as const;

const WITH: [string, string, string?][] = [
  ["Model", "GPT-4o-mini"],
  ["Latency", "3,962 ms", "-28.5%"],
  ["Cost / 1000 requests", "$0.10", "-96.8%"],
];

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="shrink-0 rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-semibold text-white">
      {children}
    </span>
  );
}

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
      {/* LEFT: one box holding label + table + assumptions */}
      <div className="flex flex-col" style={rise(0)}>
        <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-cv-line/40 bg-cv-surface dark:bg-[#0D0D0D]">
          <div className="cv-label px-6 pt-6 pb-3 text-[#1664C0] dark:text-[#7CB8F8]">At scale (monthly)</div>
          <div className="flex-1 overflow-x-auto">
            <table className="h-full w-full text-sm">
              <thead className="bg-cv-surface dark:bg-[#0D0D0D]">
                <tr className="text-left">
                  <th className="px-6 py-4 align-middle text-cv-ink font-medium">Monthly volume</th>
                  <th className="px-6 py-4 align-middle text-cv-muted font-medium">Hardcoded spend</th>
                  <th className="px-6 py-4 align-middle text-cv-muted font-medium">With AIX</th>
                  <th className="px-6 py-4 align-middle font-medium text-[#1664C0] dark:text-[#7CB8F8]">Monthly saving</th>
                </tr>
              </thead>
              <tbody>
                {roi.map((row, i) => (
                  <tr key={i} className="border-t border-cv-line">
                    <td className="px-6 py-4 align-middle text-cv-ink/90">{row[0]}</td>
                    <td className="px-6 py-4 align-middle text-cv-ink/75">{row[1]}</td>
                    <td className="px-6 py-4 align-middle text-cv-ink/75">{row[2]}</td>
                    <td className="px-6 py-4 align-middle font-semibold text-cv-ink">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="border-t border-cv-line p-6 text-xs italic text-cv-muted">
            Assumption: 40–90% reduction applied at an 89% average. Your mix will differ; the audit measures yours.
          </p>
        </div>
      </div>

      {/* RIGHT: two stacked comparison cards, same combined height as the table */}
      <div className="flex h-full flex-col gap-6">
        {/* Without AIX — neutral (equal height) */}
        <div
          className="flex flex-1 flex-col rounded-2xl border border-cv-line/40 bg-cv-surface dark:bg-[#0D0D0D] p-6"
          style={rise(1)}
        >
          <div className="cv-label mb-3 text-cv-muted">Without AIX</div>
          <dl className="divide-y divide-cv-line/50">
            {WITHOUT.map(([k, v]) => (
              <div key={k} className="flex items-center justify-between py-2.5 text-sm">
                <dt className="text-cv-muted">{k}</dt>
                <dd className="font-mono text-cv-ink/80">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* With AIX — solid blue card (sized to content so the result
            highlight is never clipped) */}
        <div
          className="relative flex flex-col overflow-hidden rounded-2xl p-6 text-white shadow-[0_24px_60px_-24px_rgba(22,100,192,0.65)]"
          style={{ ...rise(2), background: "linear-gradient(150deg, #2278E0 0%, #1664C0 52%, #0E3F8C 100%)" }}
        >
          <div className="cv-label mb-3 text-white/85">With AIX</div>
          <dl className="divide-y divide-white/15">
            {WITH.map(([k, v, cut]) => (
              <div key={k} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                <dt className="text-white/70">{k}</dt>
                <dd className="flex items-center gap-2 font-mono text-white">
                  {v}
                  {cut && <Chip>{cut}</Chip>}
                </dd>
              </div>
            ))}
          </dl>
          {/* Result highlight fills the remaining space */}
          <div className="mt-auto flex flex-wrap items-baseline gap-x-2 gap-y-1 rounded-xl border border-white/25 bg-white/10 px-4 py-3.5">
            <span className="text-lg font-bold text-white">30× lower cost</span>
            <span className="text-white/60">·</span>
            <span className="text-lg font-bold text-white">1.6s faster per request</span>
            <span className="w-full text-xs text-white/75">Same task, same-or-better quality.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
