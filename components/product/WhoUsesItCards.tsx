"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { IconChartPie2, IconServer2, IconInvestment } from "nucleo-isometric";

type Icon = ComponentType<{ size?: number; className?: string }>;

const ICONS: Record<string, Icon> = {
  "FinOps Manager": IconChartPie2,
  "Cloud Engineer": IconServer2,
  "Cloud / Platform Engineer": IconServer2,
  "CFO / VP Finance": IconInvestment,
};

/* Each persona is keyed to a module hue so the tiles read as distinct roles,
   not a repeated card. Equal weight, differentiated by color, not size. */
const ACCENTS: Record<string, string> = {
  "FinOps Manager": "#0E9E7A", // teal
  "Cloud Engineer": "#1664C0", // blue
  "Cloud / Platform Engineer": "#1664C0", // blue
  "CFO / VP Finance": "#D97706", // amber
};

export type WhoUsesItItem = [title: string, desc: string];

export function WhoUsesItCards({ items }: { items: WhoUsesItItem[] }) {
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
    <div ref={ref} className="grid auto-rows-fr gap-4 sm:gap-5 sm:grid-cols-2 md:grid-cols-3">
      {items.map(([t, b], i) => {
        const Icon = ICONS[t] ?? IconChartPie2;
        const accent = ACCENTS[t] ?? "#1664C0";
        return (
          <div key={t} style={rise(i)}>
            <div className="cv-visual-well group flex h-full flex-col rounded-2xl border border-cv-line/60 bg-cv-surface p-7 shadow-[0_20px_50px_-30px_rgba(16,24,40,0.28)] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-white/[0.07] dark:bg-black dark:shadow-[0_38px_84px_-34px_rgba(0,0,0,0.82)]">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-lg border"
                style={{ color: accent, borderColor: `${accent}40`, background: `${accent}1a` }}
              >
                <Icon size={28} />
              </span>
              <h3 className="font-display font-semibold text-cv-ink mt-5">{t}</h3>
              <p className="text-sm text-cv-ink/75 mt-3 flex-1 leading-relaxed">{b}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
