import type { LucideIcon } from "lucide-react";

export type Capability = { icon: LucideIcon; title: string; desc: string };

export function Capabilities({
  label,
  heading,
  color,
  items,
}: {
  label: string;
  heading: string;
  color: string;
  items: Capability[];
}) {
  return (
    <section className="cv-section bg-cv-surface">
      <div className="cv-container">
        <div className="max-w-3xl mb-10">
          <div className="cv-label mb-3" style={{ color }}>{label}</div>
          <h2 className="cv-h2 text-cv-ink">{heading}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="rounded-xl border border-cv-line/10 bg-cv-ink/[0.02] p-6">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: `${color}1A`, color }}
                >
                  <Icon size={20} />
                </div>
                <div className="font-display font-semibold text-cv-ink text-lg">{c.title}</div>
                <p className="text-cv-ink/65 text-sm mt-2 leading-relaxed">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
