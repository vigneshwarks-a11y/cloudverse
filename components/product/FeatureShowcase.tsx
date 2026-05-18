"use client";

// Pattern 2 — Feature list + UI mockup with tabbed states

import { useState } from "react";

export type FeatureState = {
  title: string;
  desc: string;
  mockTitle: string;
  mockBody: React.ReactNode;
};

export function FeatureShowcase({
  label,
  heading,
  color,
  states,
}: {
  label: string;
  heading: string;
  color: string;
  states: FeatureState[];
}) {
  const [active, setActive] = useState(0);
  const cur = states[active];

  return (
    <section id="features" className="cv-section cv-section-band bg-cv-surface2">
      <div className="cv-container">
        <div className="max-w-3xl mb-10">
          <div className="cv-label mb-3" style={{ color }}>{label}</div>
          <h2 className="cv-h2 text-white">{heading}</h2>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          <div className="flex flex-col gap-2">
            {states.map((s, i) => (
              <button
                key={s.title}
                onClick={() => setActive(i)}
                className={`text-left p-4 rounded-lg border transition-all ${
                  i === active
                    ? "bg-white/[0.05] border-white/20"
                    : "bg-transparent border-white/8 hover:border-white/15"
                }`}
                style={i === active ? { borderColor: `${color}66` } : undefined}
                data-testid={`feature-tab-${i}`}
              >
                <div className="text-white text-sm font-medium">{s.title}</div>
                {i === active && (
                  <div className="text-white/65 text-xs mt-1.5 leading-relaxed">{s.desc}</div>
                )}
              </button>
            ))}
          </div>

          <BrowserFrame title={cur.mockTitle} color={color}>
            {cur.mockBody}
          </BrowserFrame>
        </div>
      </div>
    </section>
  );
}

export function BrowserFrame({
  title,
  color,
  children,
}: {
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-cv-navy shadow-2xl">
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/10 bg-white/[0.03]">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        </div>
        <div className="flex-1 mx-auto max-w-md">
          <div className="bg-white/[0.04] border border-white/10 rounded-md px-3 py-1 text-xs text-white/55 text-center font-mono">
            {title}
          </div>
        </div>
        <span className="w-2 h-2 rounded-full" style={{ background: color }} />
      </div>
      <div className="p-5 sm:p-7 min-h-[320px]">{children}</div>
    </div>
  );
}
