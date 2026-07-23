import Link from "next/link";
import { ArrowRight } from "@/lib/solar-icons";
import { DEMO_URL } from "@/lib/links";

export type ProofStat = { value: string; label: string; cite?: string };

export function ProductHero({
  eyebrow,
  color,
  h1,
  sub,
  stats,
}: {
  eyebrow: string;
  color: string;
  h1: React.ReactNode;
  sub: string;
  stats: ProofStat[];
}) {
  return (
    <section className="cv-hero-bg pt-[140px] pb-16 lg:pt-[160px] lg:pb-20 relative">
      <div className="cv-container relative z-10">
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-[0.14em]"
          style={{ color, background: `${color}20` }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: color }} />
          {eyebrow}
        </div>
        <h1 className="cv-h1 mt-5 text-cv-ink max-w-4xl">{h1}</h1>
        <p className="cv-body mt-6 text-cv-ink/75 max-w-2xl">{sub}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={DEMO_URL} className="cv-btn-primary" style={{ background: color }}>
            Book a Demo <ArrowRight weight="Linear" size={16} />
          </Link>
          <Link href="#features" className="cv-btn-ghost">
            See it in action
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-cv-line/10 bg-cv-ink/[0.03] p-5"
              data-testid={`proof-${s.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
            >
              <div className="font-display font-bold text-cv-ink text-2xl tabular-nums">{s.value}</div>
              <div className="text-cv-ink/65 text-[12px] uppercase tracking-wider mt-2">{s.label}</div>
              {s.cite && <div className="text-cv-ink/40 text-[11px] mt-1.5">{s.cite}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
