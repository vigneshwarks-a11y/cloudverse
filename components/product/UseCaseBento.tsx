"use client";

import { useEffect, useRef, useState } from "react";

const BLUE = "#1664C0";
const CYAN = "#38BDF8";
const RED = "#E5484D";

type UseCase = {
  n: string;
  title: string;
  sit: string;
  prob: string;
  how: string;
  after: string;
};

function Block({
  label,
  text,
  accent,
}: {
  label: string;
  text: string;
  accent: string;
}) {
  return (
    <div>
      <div className="cv-label mb-1.5" style={{ color: accent }}>
        {label}
      </div>
      <p className="text-sm leading-relaxed text-cv-ink/75">{text}</p>
    </div>
  );
}

function Card({ uc }: { uc: UseCase }) {
  return (
    <div
      className="relative flex h-full flex-col overflow-hidden rounded-xl border border-cv-line/40 bg-cv-surface dark:bg-[#0D0D0D] p-7 sm:p-8"
    >
      {/* soft ambient blue glow (identical across all cards) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -left-16 h-64 w-64 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${BLUE}26, transparent 70%)` }}
      />
      <div className="relative flex h-full flex-col">
        {/* number badge + title */}
        <div className="mb-6 flex items-center gap-3">
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold"
            style={{ color: BLUE, background: `${BLUE}1a`, border: `1px solid ${BLUE}59` }}
          >
            {uc.n}
          </span>
          <h3 className="cv-h3 font-semibold text-cv-ink">{uc.title}</h3>
        </div>
        {/* content fills remaining space */}
        <div className="flex flex-1 flex-col gap-5">
          <Block label="Situation" text={uc.sit} accent={CYAN} />
          <Block label="The problem" text={uc.prob} accent={RED} />
          <Block label="How AIX solves it" text={uc.how} accent={CYAN} />
          <Block label="After AIX" text={uc.after} accent={RED} />
        </div>
      </div>
    </div>
  );
}

export default function UseCaseBento({ useCases }: { useCases: UseCase[] }) {
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
    <div ref={ref} className="grid auto-rows-fr gap-3 sm:grid-cols-2">
      {useCases.map((uc, i) => (
        <div key={uc.n} style={rise(i)}>
          <Card uc={uc} />
        </div>
      ))}
    </div>
  );
}
