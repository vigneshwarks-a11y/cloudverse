import type { IconProps } from "@solar-icons/react";
import type { ComponentType } from "react";

type Icon = ComponentType<IconProps>;

export type Outcome = { icon: Icon; title: string; body: string; metric?: string };

export function Outcomes({
  label = "Outcomes",
  heading,
  items,
}: {
  label?: string;
  heading: string;
  items: Outcome[];
}) {
  return (
    <section className="cv-section bg-cv-surface">
      <div className="cv-container">
        <div className="max-w-3xl mb-10">
          <div className="cv-label mb-3">{label}</div>
          <h2 className="cv-h2 text-cv-ink">{heading}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((o) => {
            const Icon = o.icon;
            return (
              <div key={o.title} className="rounded-xl border border-cv-line/10 bg-cv-ink/[0.02] p-6">
                <div className="w-10 h-10 rounded-lg bg-cv-blue/15 text-cv-blue dark:text-cv-blue-light flex items-center justify-center mb-4">
                  <Icon size={20} weight="Linear" />
                </div>
                <div className="font-display font-semibold text-cv-ink text-lg">{o.title}</div>
                <p className="text-cv-ink/65 text-sm mt-2 leading-relaxed">{o.body}</p>
                {o.metric && (
                  <div className="mt-4 text-cv-blue dark:text-cv-blue-light font-display font-semibold tabular-nums">{o.metric}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
