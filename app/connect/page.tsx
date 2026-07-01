import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowRight, IconCircleCheck } from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "Get a Demo",
  description:
    "Connect your first cloud account in under 30 minutes. Most teams have their first non-obvious finding the same day.",
  alternates: { canonical: "/connect" },
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
    <section className="cv-hero-bg pt-[140px] pb-24 min-h-[80vh]">
      <div className="cv-container relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6">
            <div className="cv-label mb-3">Get a Demo</div>
            <h1 className="cv-h1 text-cv-ink">
              See what's driving your cloud bill.
            </h1>
            <p className="cv-body-lg mt-6 text-cv-ink/75 max-w-xl">
              A 30-minute working session with our solutions team. We connect a sample account live and walk you through your first findings.
            </p>
            <ul className="mt-8 space-y-3">
              {PROOF.map((p) => (
                <li key={p} className="flex gap-3 text-cv-ink/85 text-[15px]">
                  <IconCircleCheck size={18} stroke={1} className="shrink-0 mt-0.5 text-cv-blue-light" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 pt-8 border-t border-cv-line/10">
              <div className="cv-label mb-3 text-cv-ink/50">Prefer to talk to sales?</div>
              <Link href="/contact" className="cv-btn-ghost">
                Contact sales <IconArrowRight size={14} stroke={1} />
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
                Open booking calendar <IconArrowRight size={16} stroke={1} />
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
