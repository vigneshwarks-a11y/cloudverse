"use client";

// Pattern 2 Feature list + UI mockup with tabbed states

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
        <div className="max-w-3xl mb-10 text-left">
          <div className="cv-label mb-3" style={{ color }}>{label}</div>
          <h2 className="cv-h2 text-cv-ink">{heading}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr] gap-6 md:gap-8">
          <div className="flex flex-col gap-2">
            {states.map((s, i) => (
              <button
                key={s.title}
                onClick={() => setActive(i)}
                className={`text-left p-4 rounded-lg border transition-all ${
                  i === active
                    ? "bg-cv-ink/[0.05] border-cv-line/20"
                    : "bg-transparent border-cv-line/8 hover:border-cv-line/15"
                }`}
                style={i === active ? { borderColor: `${color}66` } : undefined}
                data-testid={`feature-tab-${i}`}
              >
                <div className="text-cv-ink text-sm font-medium">{s.title}</div>
                {i === active && (
                  <div className="text-cv-ink/65 text-xs mt-1.5 leading-relaxed">{s.desc}</div>
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
    <div className="rounded-xl overflow-hidden border border-cv-line/10 bg-cv-surface2 dark:bg-[#0D0D0D] shadow-2xl">
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-cv-line/10 bg-cv-ink/[0.03]">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cv-ink/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-cv-ink/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-cv-ink/15" />
        </div>
        <div className="flex-1 mx-auto max-w-md">
          <div className="bg-cv-ink/[0.04] border border-cv-line/10 rounded-md px-3 py-1 text-xs text-cv-ink/55 text-center font-mono">
            {title}
          </div>
        </div>
        <span className="w-2 h-2 rounded-full" style={{ background: color }} />
      </div>
      <div className="p-5 sm:p-7 min-h-[320px]">{children}</div>
    </div>
  );
}
