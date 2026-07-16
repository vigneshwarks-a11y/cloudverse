"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { Code, FileText, Tuning2 } from "@/lib/solar-icons";
import type { IconProps } from "@solar-icons/react";

type Icon = ComponentType<IconProps>;

type Persona = {
  title: string;
  body: string;
  Icon: Icon;
  color: string;
};

const PERSONAS: Persona[] = [
  {
    title: "Platform Engineering",
    body: "Cost guardrails that don't slow delivery.",
    Icon: Tuning2,
    color: "#007CFF",
  },
  {
    title: "DevOps / SRE",
    body: "Fewer surprise bills reaching production.",
    Icon: Code,
    color: "#007CFF",
  },
  {
    title: "FinOps",
    body: "Engineering adoption and clear ownership, at last.",
    Icon: FileText,
    color: "#007CFF",
  },
];

export default function WhoDevxFor() {
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
    <section className="cv-section bg-cv-surface2 dark:bg-black">
      <div className="cv-container">
        <h2 className="cv-h2 text-cv-ink mb-10">Who DevX is for</h2>
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {PERSONAS.map(({ title, body, Icon, color }, i) => (
            <div
              key={title}
              className="relative rounded-3xl border border-cv-line/40 p-8 lg:p-10 text-left transition-all duration-700 ease-out"
              style={{
                background: `linear-gradient(160deg, hsl(var(--cv-card)) 0%, ${color}14 100%)`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{
                  background: `${color}1F`,
                  boxShadow: `inset 0 0 0 1px ${color}40`,
                }}
              >
                <Icon weight="Linear" className="h-7 w-7 text-cv-ink" aria-hidden />
              </div>
              <h3 className="mt-6 font-display font-semibold text-lg text-cv-ink">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cv-ink/70">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
