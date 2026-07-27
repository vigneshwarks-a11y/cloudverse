"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle } from "@/lib/solar-icons";
import { SIGNIN_URL, DEMO_URL } from "@/lib/links";
import { HeroEyebrow } from "@/components/PageHero";
import { SplitHeading } from "@/components/SplitHeading";
import { Eyebrow } from "@/components/Eyebrow";
import { useHeroReveal } from "@/lib/useHeroReveal";

const STEPS = [
  "Connect AWS, Azure, or GCP in read-only mode",
  "See cost, allocation, and anomalies the same day",
  "Invite finance and engineering. RBAC included",
  "Get a payback-quantified backlog inside week one",
];

export function SignUpHero() {
  const scope = useHeroReveal<HTMLElement>();

  return (
    <section
      ref={scope}
      className="cv-hero-bg pt-[120px] sm:pt-[160px] pb-16 lg:pt-[240px] lg:pb-24 relative min-h-[80vh]"
      style={{ background: "hsl(var(--cv-surface))" }}
    >
      <div className="cv-container relative z-10">
        <div className="max-w-2xl text-left">
          <div className="hero-anim mb-4"><HeroEyebrow accent="blue">Get started</HeroEyebrow></div>
          <SplitHeading className="cv-h1 text-cv-ink">
            See Where Your Cloud Bill Is <span className="text-cv-blue dark:text-cv-blue-light">Actually Going.</span>
          </SplitHeading>
          <p className="hero-anim cv-body-lg mt-6 text-cv-ink/75">
            CloudVerse connects read-only and surfaces your first non-obvious finding the same day. No credit card.
          </p>

          <div className="hero-anim mt-10 grid sm:grid-cols-2 gap-3">
            <Link href={SIGNIN_URL} className="cv-btn-primary px-5 py-3 sm:px-7 sm:py-4 justify-center text-center" data-testid="link-create-account">
              Create your account <ArrowRight weight="Linear" size={16} />
            </Link>
            <Link href={DEMO_URL} className="cv-btn-ghost px-5 py-3 sm:px-7 sm:py-4 justify-center text-center" data-testid="link-book-demo">
              Book a guided demo
            </Link>
          </div>

          <div className="hero-anim mt-12 text-left rounded-2xl border border-cv-line/10 bg-cv-ink/[0.02] p-7">
            <Eyebrow>What happens next</Eyebrow>
            <ul className="space-y-3">
              {STEPS.map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <CheckCircle weight="Linear" size={18} className="shrink-0 mt-0.5 text-cv-blue dark:text-cv-blue-light" />
                  <span className="text-cv-ink/80 text-[15px]">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="hero-anim text-cv-ink/45 text-xs mt-8">
            By creating an account you agree to our <Link href="/legal" className="underline">Terms</Link> and <Link href="/legal" className="underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}

export default SignUpHero;
