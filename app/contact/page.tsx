import type { Metadata } from "next";
import Link from "next/link";
import { Buildings, ChatRound, Letter, MapPoint, Global } from "@/lib/solar-icons";
import { DEMO_URL } from "@/lib/links";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Contact CloudVerse",
  description: "Talk to sales, support, partnerships, or press. We typically respond within one business day.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact CloudVerse",
    description: "Talk to sales, support, partnerships, or press. We typically respond within one business day.",
    url: "/contact",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "Contact CloudVerse" }],
  },
  twitter: { card: "summary_large_image", title: "Contact CloudVerse", description: "Talk to sales, support, or partnerships. We typically respond within one business day." },
};

const CHANNELS = [
  { icon: Buildings,   label: "Sales",        body: "Multi-cloud, AI, or warehouse economics. talk to a practitioner.", action: "Book a demo", href: DEMO_URL },
  { icon: ChatRound,   label: "Support",      body: "Existing customer with a question or issue.", action: "support@cloudverse.ai", href: "mailto:support@cloudverse.ai" },
  { icon: Letter,      label: "Partnerships", body: "Marketplace, technology, or solution partner inquiries.", action: "partners@cloudverse.ai", href: "mailto:partners@cloudverse.ai" },
  { icon: MapPoint,    label: "Press",        body: "Media, analyst, or speaking engagements.", action: "press@cloudverse.ai", href: "mailto:press@cloudverse.ai" },
];

export default function Page() {
  return (
    <>
      <PageHero
        centered
        eyebrow="Contact"
        accent="blue"
        title="Talk to a human. We typically respond within one business day."
        subtitle="Sales, support, partnerships, or press, reach the right team below and we'll get back to you fast."
        titleClassName="text-[length:clamp(34px,4.8vw,72px)]"
        subtitleClassName="text-[length:clamp(17px,1.4vw,20px)]"
      />

      <section className="relative overflow-hidden bg-cv-surface cv-section">
        {/* Continue the hero's blue down over the top of this section and fade
            it to transparent, so the hero and this section read as one
            continuous blue band settling into the page base (same treatment
            as the home hero → CustomerLogos). */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[linear-gradient(180deg,rgba(20,71,230,0.24)_0%,rgba(20,71,230,0.08)_42%,transparent_78%)] dark:bg-[linear-gradient(180deg,rgba(20,71,230,0.5)_0%,rgba(20,71,230,0.16)_42%,transparent_78%)]"
        />
        <div className="cv-container relative z-10">
          <div className="grid sm:grid-cols-2 gap-4">
            {CHANNELS.map((c) => {
              const Icon = c.icon;
              const isExternal = c.href.startsWith("mailto:") || c.href.startsWith("http");
              return (
                <div key={c.label} className="rounded-xl border border-cv-line/40 bg-cv-ink/[0.02] dark:border-white/10 dark:bg-white/[0.03] p-6">
                  <div className="w-10 h-10 rounded-lg bg-cv-blue/15 text-cv-blue dark:text-cv-blue-light flex items-center justify-center mb-4">
                    <Icon size={20} weight="Linear" />
                  </div>
                  <div className="cv-label">{c.label}</div>
                  <p className="text-cv-ink/70 mt-2 text-sm leading-relaxed">{c.body}</p>
                  {isExternal ? (
                    <a href={c.href} className="mt-5 inline-flex text-cv-blue dark:text-cv-blue-light text-sm font-medium" data-testid={`contact-${c.label.toLowerCase()}`}>
                      {c.action} →
                    </a>
                  ) : (
                    <Link href={c.href} className="mt-5 inline-flex text-cv-blue dark:text-cv-blue-light text-sm font-medium" data-testid={`contact-${c.label.toLowerCase()}`}>
                      {c.action} →
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-4 rounded-xl border border-cv-line/40 bg-cv-ink/[0.02] dark:border-white/10 dark:bg-white/[0.03] p-6">
            <div className="w-10 h-10 rounded-lg bg-cv-blue/15 text-cv-blue dark:text-cv-blue-light flex items-center justify-center mb-4">
              <Global size={20} weight="Linear" />
            </div>
            <div className="cv-label">Headquarters</div>
            <h3 className="font-display font-semibold text-cv-ink text-xl mt-2">CloudVerse, Inc.</h3>
            <p className="text-cv-ink/70 mt-2 text-sm leading-relaxed">Singapore · San Francisco · Bengaluru</p>
            <p className="text-cv-ink/55 mt-3 text-sm">General inquiries: <a className="text-cv-blue dark:text-cv-blue-light" href="mailto:hello@cloudverse.ai">hello@cloudverse.ai</a></p>
          </div>
        </div>
      </section>
    </>
  );
}
