"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { IconChartPie2, IconServer2, IconInvestment } from "nucleo-isometric";

type Icon = ComponentType<{ size?: number; className?: string }>;

const BLUE = "#007CFF";

const ICONS: Record<string, Icon> = {
  "FinOps Manager": IconChartPie2,
  "Cloud Engineer": IconServer2,
  "Cloud / Platform Engineer": IconServer2,
  "CFO / VP Finance": IconInvestment,
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
        return (
          <div key={t} style={rise(i)}>
            <div
              className="flex h-full flex-col rounded-xl border bg-cv-surface dark:bg-[#0D0D0D] p-7"
              style={{ borderColor: "rgba(255,255,255,0.10)" }}
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-lg"
                style={{ background: `${BLUE}1a`, border: `1px solid ${BLUE}40`, color: BLUE }}
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
