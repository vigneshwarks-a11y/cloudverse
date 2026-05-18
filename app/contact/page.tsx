import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageSquare, MapPin, Building2 } from "lucide-react";
import { DEMO_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Contact CloudVerse",
  description: "Talk to sales, support, partnerships, or press. We typically respond within one business day.",
  alternates: { canonical: "/contact" },
};

const CHANNELS = [
  { icon: Building2,    label: "Sales",        body: "Multi-cloud, AI, or warehouse economics — talk to a practitioner.", action: "Book a demo", href: DEMO_URL },
  { icon: MessageSquare,label: "Support",      body: "Existing customer with a question or issue.", action: "support@cloudverse.ai", href: "mailto:support@cloudverse.ai" },
  { icon: Mail,         label: "Partnerships", body: "Marketplace, technology, or solution partner inquiries.", action: "partners@cloudverse.ai", href: "mailto:partners@cloudverse.ai" },
  { icon: MapPin,       label: "Press",        body: "Media, analyst, or speaking engagements.", action: "press@cloudverse.ai", href: "mailto:press@cloudverse.ai" },
];

export default function Page() {
  return (
    <>
      <section className="cv-hero-bg pt-[140px] pb-12 lg:pt-[160px] lg:pb-16 relative">
        <div className="cv-container relative z-10">
          <div className="cv-label mb-4">Contact</div>
          <h1 className="cv-h1 text-white max-w-3xl">Talk to a human — we typically respond within one business day.</h1>
        </div>
      </section>

      <section className="cv-section bg-cv-surface">
        <div className="cv-container">
          <div className="grid sm:grid-cols-2 gap-4">
            {CHANNELS.map((c) => {
              const Icon = c.icon;
              const isExternal = c.href.startsWith("mailto:") || c.href.startsWith("http");
              return (
                <div key={c.label} className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                  <div className="w-10 h-10 rounded-lg bg-cv-blue/15 text-cv-blue-light flex items-center justify-center mb-4">
                    <Icon size={20} />
                  </div>
                  <div className="cv-label">{c.label}</div>
                  <p className="text-white/70 mt-2 text-sm leading-relaxed">{c.body}</p>
                  {isExternal ? (
                    <a href={c.href} className="mt-5 inline-flex text-cv-blue-light text-sm font-medium" data-testid={`contact-${c.label.toLowerCase()}`}>
                      {c.action} →
                    </a>
                  ) : (
                    <Link href={c.href} className="mt-5 inline-flex text-cv-blue-light text-sm font-medium" data-testid={`contact-${c.label.toLowerCase()}`}>
                      {c.action} →
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-7 sm:p-9">
            <div className="cv-label mb-3">Headquarters</div>
            <h3 className="font-display font-semibold text-white text-xl">CloudVerse, Inc.</h3>
            <p className="text-white/70 mt-2 text-sm">Singapore · San Francisco · Bengaluru</p>
            <p className="text-white/55 mt-3 text-sm">General inquiries: <a className="text-cv-blue-light" href="mailto:hello@cloudverse.ai">hello@cloudverse.ai</a></p>
          </div>
        </div>
      </section>
    </>
  );
}
