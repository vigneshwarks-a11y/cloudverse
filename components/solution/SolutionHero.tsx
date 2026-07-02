import Link from "next/link";
import { ArrowRight } from "@solar-icons/react";
import { DEMO_URL } from "@/lib/links";

export function SolutionHero({
  eyebrow,
  h1,
  sub,
  proof,
}: {
  eyebrow: string;
  h1: React.ReactNode;
  sub: string;
  proof?: { value: string; label: string; cite?: string }[];
}) {
  return (
    <section className="cv-hero-bg pt-[140px] pb-16 lg:pt-[160px] lg:pb-20 relative">
      <div className="cv-container relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1664C0]/15 dark:bg-[#7CB8F8]/15 text-[#1664C0] dark:text-[#7CB8F8] text-xs font-semibold uppercase tracking-[0.14em]">
          <span className="w-1.5 h-1.5 rounded-full bg-cv-blue-light animate-pulse-dot" />
          {eyebrow}
        </div>
        <h1 className="cv-h1 mt-5 text-cv-ink max-w-4xl">{h1}</h1>
        <p className="cv-body mt-6 text-cv-ink/75 max-w-2xl">{sub}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={DEMO_URL} className="cv-btn-primary">
            Book a Demo <ArrowRight weight="Linear" size={16} />
          </Link>
          <Link href="/platform/finops" className="cv-btn-ghost">
            Explore the platform
          </Link>
        </div>

        {proof && proof.length > 0 && (
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {proof.map((p) => (
              <div key={p.label} className="rounded-xl border border-cv-line/10 bg-cv-ink/[0.03] p-5">
                <div className="font-display font-bold text-cv-ink text-2xl tabular-nums">{p.value}</div>
                <div className="text-cv-ink/65 text-[12px] uppercase tracking-wider mt-2">{p.label}</div>
                {p.cite && <div className="text-cv-ink/40 text-[11px] mt-1.5">{p.cite}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
