import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MODULES, type ModuleKey } from "@/lib/modules";

export function ModulesUsed({
  keys,
  heading = "Modules that power this solution",
}: {
  keys: ModuleKey[];
  heading?: string;
}) {
  return (
    <section className="cv-section bg-cv-surface2">
      <div className="cv-container">
        <div className="max-w-3xl mb-10">
          <div className="cv-label mb-3">Platform</div>
          <h2 className="cv-h2 text-cv-ink">{heading}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {keys.map((k) => {
            const m = MODULES[k];
            return (
              <Link
                key={k}
                href={m.href}
                className="group rounded-xl border border-cv-line/10 bg-cv-ink/[0.02] p-6 hover:bg-cv-ink/[0.04] transition-colors"
                style={{ borderTop: `3px solid ${m.color}` }}
                data-testid={`module-${k}`}
              >
                <div className="cv-label" style={{ color: m.color }}>{m.name}</div>
                <p className="text-cv-ink/75 text-sm mt-4 leading-relaxed">{m.tagline}.</p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: m.color }}>
                  Learn more <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
