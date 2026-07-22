import type { Metadata } from "next";
import { ArrowRight, CheckCircle } from "@/lib/solar-icons";
import { SIGNIN_URL, DEMO_URL } from "@/lib/links";
import { HeroEyebrow } from "@/components/PageHero";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Get Started with CloudVerse",
  description: "Connect your first cloud account in under 30 minutes. Read-only by default. Free tier available for Torb.",
  alternates: { canonical: "/sign-up" },
  openGraph: {
    title: "Get Started with CloudVerse",
    description: "Connect your first cloud account in under 30 minutes. Read-only by default. Free tier available for Torb.",
    url: "/sign-up",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "Get Started with CloudVerse" }],
  },
  twitter: { card: "summary_large_image", title: "Get Started with CloudVerse", description: "Connect your first cloud account in under 30 minutes. Read-only by default." },
};

const STEPS = [
  "Connect AWS, Azure, or GCP in read-only mode",
  "See cost, allocation, and anomalies the same day",
  "Invite finance and engineering. RBAC included",
  "Get a payback-quantified backlog inside week one",
];

export default function Page() {
  return (
    <section className="cv-hero-bg pt-[120px] sm:pt-[160px] pb-16 lg:pt-[240px] lg:pb-24 relative min-h-[80vh]" style={{ background: "hsl(var(--cv-surface))" }}>
      <div className="cv-container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-4"><HeroEyebrow accent="blue">Get started</HeroEyebrow></div>
          <h1 className="cv-h1 text-cv-ink">
            See Where Your Cloud Bill Is <span className="text-cv-blue dark:text-cv-blue-light">Actually Going.</span>
          </h1>
          <p className="cv-body-lg mt-6 text-cv-ink/75">
            CloudVerse connects read-only and surfaces your first non-obvious finding the same day. No credit card.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 gap-3">
            <Link href={SIGNIN_URL} className="cv-btn-primary justify-center text-center" data-testid="link-create-account">
              Create your account <ArrowRight weight="Linear" size={16} />
            </Link>
            <Link href={DEMO_URL} className="cv-btn-ghost justify-center text-center" data-testid="link-book-demo">
              Book a guided demo
            </Link>
          </div>

          <div className="mt-12 text-left rounded-2xl border border-cv-line/10 bg-cv-ink/[0.02] p-7">
            <div className="cv-label mb-4">What happens next</div>
            <ul className="space-y-3">
              {STEPS.map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <CheckCircle weight="Linear" size={18} className="shrink-0 mt-0.5 text-cv-blue dark:text-cv-blue-light" />
                  <span className="text-cv-ink/80 text-[15px]">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-cv-ink/45 text-xs mt-8">
            By creating an account you agree to our <Link href="/legal" className="underline">Terms</Link> and <Link href="/legal" className="underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
