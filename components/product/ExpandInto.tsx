import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { siblings, type ModuleKey } from "@/lib/modules";

export function ExpandInto({ current }: { current: ModuleKey }) {
  const items = siblings(current);
  return (
    <section className="cv-section bg-cv-surface">
      <div className="cv-container">
        <div className="max-w-3xl mb-10">
          <div className="cv-label mb-3">Expand into</div>
          <h2 className="cv-h2 text-cv-ink">One control plane. Add modules as you scale.</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {items.map((m) => (
            <Link
              key={m.key}
              href={m.href}
              className="group rounded-xl border border-cv-line/10 bg-cv-ink/[0.02] p-6 hover:bg-cv-ink/[0.04] transition-colors"
              style={{ borderTop: `3px solid ${m.color}` }}
              data-testid={`expand-${m.key}`}
            >
              <div className="cv-label" style={{ color: m.color }}>{m.name}</div>
              <p className="text-cv-ink/75 text-sm mt-4 leading-relaxed">{m.tagline}.</p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: m.color }}>
                Learn more <IconArrowRight size={14} stroke={1} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
