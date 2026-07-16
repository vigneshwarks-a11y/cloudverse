import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "@/lib/solar-icons";

export const metadata: Metadata = {
  title: "Book a Demo: CloudVerse",
  description:
    "Connect your first cloud account in under 30 minutes. Most teams have their first non-obvious finding the same day.",
  alternates: { canonical: "/connect" },
  openGraph: {
    title: "Book a CloudVerse Demo",
    description: "Connect your first cloud account in under 30 minutes. Most teams find something non-obvious the same day.",
    url: "/connect",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "Book a CloudVerse Demo" }],
  },
  twitter: { card: "summary_large_image", title: "Book a CloudVerse Demo", description: "Connect your first cloud account in under 30 minutes. Non-obvious findings the same day." },
};

const HUBSPOT_URL = "https://meetings.hubspot.com";

const PROOF = [
  "Connect in under 30 minutes. read-only by default",
  "First non-obvious finding the same day",
  "Multi-cloud, AI/GPU, data warehouses, and CI all on day one",
  "Berkshire Hathaway: $738,983 annualised savings tracked",
];

export default function ConnectPage() {
  return (
    <section className="cv-hero-bg pt-[120px] sm:pt-[160px] lg:pt-[240px] pb-24 min-h-[80vh]">
      <div className="cv-container relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6">
            <div className="cv-label mb-3">Get a Demo</div>
            <h1 className="cv-h1 text-cv-ink">
              See What's Driving Your Cloud Bill.
            </h1>
            <p className="cv-body-lg mt-6 text-cv-ink/75 max-w-xl">
              A 30-minute working session with our solutions team. We connect a sample account live and walk you through your first findings.
            </p>
            <ul className="mt-8 space-y-3">
              {PROOF.map((p) => (
                <li key={p} className="flex gap-3 text-cv-ink/85 text-[15px]">
                  <CheckCircle weight="Linear" size={18} className="shrink-0 mt-0.5 text-cv-blue dark:text-cv-blue-light" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 pt-8 border-t border-cv-line/10">
              <div className="cv-label mb-3 text-cv-ink/50">Prefer to talk to sales?</div>
              <Link href="/contact" className="cv-btn-ghost">
                Contact sales <ArrowRight weight="Linear" size={14} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div
              className="rounded-2xl border border-cv-line/10 p-7 sm:p-8"
              style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(8px)" }}
            >
              <div className="font-display text-cv-ink text-2xl font-bold mb-2">
                Book your slot
              </div>
              <p className="text-cv-ink/65 text-sm mb-6">
                Pick a time that works. You'll get a calendar invite with the join link and a short pre-call form.
              </p>
              <a
                href={HUBSPOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cv-btn-primary w-full justify-center"
                data-testid="link-hubspot-booking"
              >
                Open booking calendar <ArrowRight weight="Linear" size={16} />
              </a>
              <div className="mt-6 pt-6 border-t border-cv-line/10 text-cv-ink/55 text-xs">
                CloudVerse™ never sells your data. Connections are read-only by default and can be revoked at any time.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
