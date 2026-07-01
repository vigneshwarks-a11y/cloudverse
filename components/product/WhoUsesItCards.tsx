"use client";

import { useEffect, useRef, useState } from "react";
import { IconAdjustmentsHorizontal, IconCode, IconFileText, IconLayoutGrid, Icon as TablerIcon } from "@tabler/icons-react";

const BLUE = "#007CFF";

const ICONS: Record<string, TablerIcon> = {
  "FinOps Manager": IconAdjustmentsHorizontal,
  "Cloud Engineer": IconCode,
  "CFO / VP Finance": IconFileText,
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
    <div ref={ref} className="grid auto-rows-fr gap-5 md:grid-cols-3">
      {items.map(([t, b], i) => {
        const Icon = ICONS[t] ?? IconLayoutGrid;
        return (
          <div key={t} style={rise(i)}>
            <div
              className="flex h-full flex-col rounded-xl border bg-cv-surface p-7"
              style={{ borderColor: `${BLUE}66` }}
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-lg"
                style={{ background: `${BLUE}1a`, border: `1px solid ${BLUE}40` }}
              >
                <Icon size={22} stroke={1} style={{ color: BLUE }} />
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
