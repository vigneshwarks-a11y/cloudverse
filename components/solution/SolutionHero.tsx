import Link from "next/link";
import { ArrowRight, CheckCircle } from "@solar-icons/react";
import type { ComponentType } from "react";
import type { IconProps } from "@solar-icons/react";
import { DEMO_URL } from "@/lib/links";

type Icon = ComponentType<IconProps>;

export function SolutionHero({
  eyebrow,
  h1,
  sub,
  accent,
  icon: Icon,
  badges,
  platformHref,
  primaryLabel = "Book a Demo",
  primaryHref = DEMO_URL,
  secondaryLabel = "Explore the platform",
}: {
  eyebrow: string;
  h1: React.ReactNode;
  sub: string;
  accent: string;
  icon: Icon;
  badges: string[];
  platformHref: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="cv-hero-bg pt-[120px] sm:pt-[160px] pb-16 lg:pt-[240px] lg:pb-20 relative overflow-hidden">
      <div className="cv-container relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center">
          {/* Left: eyebrow + headline + copy + CTAs */}
          <div>
            <span className="block text-xs font-semibold uppercase tracking-widest text-[#1664C0] dark:text-[#7CB8F8]">
              {eyebrow}
            </span>
            <h1 className="mt-6 font-display font-extrabold tracking-tight text-cv-ink" style={{ fontSize: "clamp(30px, 3.8vw, 52px)", lineHeight: 1.1, textWrap: "balance" }}>
              {h1}
            </h1>
            <p className="cv-body mt-6 text-cv-muted max-w-lg">{sub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryHref} className="cv-btn-primary">
                <span>{primaryLabel}</span> <ArrowRight weight="Linear" size={16} />
              </Link>
              <Link href={platformHref} className="cv-btn-ghost">
                {secondaryLabel}
              </Link>
            </div>
          </div>

          {/* Right: icon graphic with spinning ring + orbit */}
          <div className="relative mx-auto aspect-square w-full max-w-[340px]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 blur-3xl"
              style={{ background: `radial-gradient(ellipse 70% 70% at 50% 50%, ${accent}40 0%, transparent 70%)` }}
            />
            {/* orbit ring */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-[6%] rounded-full border"
              style={{ borderColor: `${accent}30` }}
            >
              <span className="absolute h-2 w-2 rounded-full -top-1 left-[20%]" style={{ background: accent, boxShadow: `0 0 10px ${accent}` }} />
              <span className="absolute h-1.5 w-1.5 rounded-full -bottom-0.5 right-[12%]" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />
            </div>
            {/* spinning conic ring */}
            <div className="absolute inset-[16%] rounded-[32%] p-[2px]">
              <div
                aria-hidden
                className="absolute inset-0 rounded-[32%]"
                style={{
                  background: `conic-gradient(from var(--cv-ring-angle), ${accent}00, ${accent}, ${accent}00 60%)`,
                  animation: "cv-ring-spin 6s linear infinite",
                }}
              />
              <div className="relative flex h-full w-full items-center justify-center rounded-[30%] border border-cv-line/40 bg-cv-card dark:bg-[#0D0D0D]">
                <Icon size={64} weight="Linear" style={{ color: accent }} />
              </div>
            </div>
          </div>
        </div>

        {/* Feature badges */}
        {badges.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2.5">
            {badges.map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-1.5 rounded-full border border-cv-line/40 bg-cv-ink/[0.03] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-cv-ink/70"
              >
                <CheckCircle weight="Linear" size={12} style={{ color: accent }} />
                {b}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
