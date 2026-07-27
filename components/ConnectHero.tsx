"use client";

import { SpeedometerMax, Bolt, Layers } from "@/lib/solar-icons";
import { HeroEyebrow } from "@/components/PageHero";
import { SplitHeading } from "@/components/SplitHeading";
import { ConnectForm } from "@/components/ConnectForm";
import { useHeroReveal } from "@/lib/useHeroReveal";

const PROOF: { icon: React.ComponentType<{ weight?: "Linear"; size?: number; className?: string }>; text: string }[] = [
  { icon: SpeedometerMax, text: "Connect in under 30 minutes, read-only by default" },
  { icon: Bolt, text: "Your first non-obvious finding the same day" },
  { icon: Layers, text: "Multi-cloud, AI/GPU, data warehouses, and CI on day one" },
];

export function ConnectHero() {
  const scope = useHeroReveal<HTMLElement>();

  return (
    <section
      ref={scope}
      className="cv-hero-bg relative pt-36 pb-16 sm:pt-44 lg:pt-52 lg:pb-24"
      style={{ background: "hsl(var(--cv-surface))" }}
    >
      <div className="max-w-cv relative z-10 mx-auto px-5 sm:px-6 lg:px-8">
        {/* Content left, form as the focal element on the right. */}
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          {/* LEFT — the pitch */}
          <div className="text-left">
            <div className="hero-anim"><HeroEyebrow accent="blue">Get a demo</HeroEyebrow></div>
            <SplitHeading className="cv-h1 mt-5 text-balance leading-[1.08] text-cv-ink">
              See what&apos;s driving your cloud and AI bill.
            </SplitHeading>
            <p className="hero-anim cv-body-lg mt-6 max-w-xl text-cv-ink/75">
              A 30-minute working session with our solutions team. We connect a sample account live and
              walk you through your first findings.
            </p>
            <ul className="hero-anim mt-10 space-y-5">
              {PROOF.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cv-line/60 bg-cv-ink/[0.03] text-cv-blue dark:border-white/10 dark:bg-white/[0.03] dark:text-cv-blue-light">
                    <Icon weight="Linear" size={20} />
                  </span>
                  <span className="text-[15px] text-cv-ink/85">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — the form (the focus) */}
          <div className="hero-anim w-full lg:justify-self-end lg:max-w-xl">
            <ConnectForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ConnectHero;
