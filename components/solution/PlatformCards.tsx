"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Wallet, Code2, Database, Cpu, LayoutGrid, type LucideIcon } from "lucide-react";

const BLUE = "#007CFF";

const ICONS: Record<string, LucideIcon> = {
  "FinOps Platform": Wallet,
  DevX: Code2,
  DataX: Database,
  AIX: Cpu,
};

export type PlatformItem = [title: string, blurb: string, href: string];

export function PlatformCards({ items }: { items: PlatformItem[] }) {
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
      {items.map(([t, b, h], i) => {
        const Icon = ICONS[t] ?? LayoutGrid;
        return (
          <div key={t} style={rise(i)}>
            <Link
              href={h}
              className="group flex h-full flex-col rounded-xl border bg-black p-7 transition-colors hover:border-[#007CFF]"
              style={{ borderColor: `${BLUE}66` }}
              data-testid={`module-card-${t.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-lg"
                style={{ background: `${BLUE}1a`, border: `1px solid ${BLUE}40` }}
              >
                <Icon size={22} style={{ color: BLUE }} />
              </span>
              <h3 className="cv-h3 font-semibold text-cv-ink mt-5">{t}</h3>
              <p className="text-cv-ink/75 mt-2 flex-1">{b}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
