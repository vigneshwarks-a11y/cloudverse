"use client";

import { useEffect, useRef, useState } from "react";
import { SlidersHorizontal, Code2, FileText, type LucideIcon } from "lucide-react";

type Persona = {
  title: string;
  body: string;
  Icon: LucideIcon;
  color: string;
};

const PERSONAS: Persona[] = [
  {
    title: "Platform engineers",
    body: "Stop cost governance from being a retrospective exercise. Policies live in the repo. Every PR gets a signal before it ships. Governance happens where the work happens.",
    Icon: SlidersHorizontal,
    color: "#007CFF",
  },
  {
    title: "Application engineers",
    body: "Catch costly code patterns early. Expensive loops, chatty APIs, and inefficient resource usage flagged in context before production. The estimate arrives with a suggested fix.",
    Icon: Code2,
    color: "#007CFF",
  },
  {
    title: "FinOps teams",
    body: "Shift cost accountability into the delivery workflow. Surface cost risks where decisions are made, before infrastructure or code ships. Stop chasing post-production waste.",
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
    <section className="cv-section bg-cv-surface2">
      <div className="cv-container">
        <h2 className="cv-h2 text-cv-ink mb-10">Who DevX is for</h2>
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {PERSONAS.map(({ title, body, Icon, color }, i) => (
            <div
              key={title}
              className="relative rounded-3xl border p-8 lg:p-10 text-center transition-all duration-700 ease-out"
              style={{
                background: `linear-gradient(160deg, #0A1018 0%, ${color}14 100%)`,
                borderColor: `${color}80`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <div
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{
                  background: `${color}1F`,
                  boxShadow: `inset 0 0 0 1px ${color}40`,
                }}
              >
                <Icon className="h-7 w-7 text-white" strokeWidth={1.75} aria-hidden />
              </div>
              <h3 className="mt-6 font-display font-semibold text-lg text-white">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cv-ink/70">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
