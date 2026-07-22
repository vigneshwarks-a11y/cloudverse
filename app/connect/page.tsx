import type { Metadata } from "next";
import { CheckCircle } from "@/lib/solar-icons";
import { PageHero } from "@/components/PageHero";
import { ConnectForm } from "@/components/ConnectForm";

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

const PROOF = [
  "Connect in under 30 minutes. read-only by default",
  "First non-obvious finding the same day",
  "Multi-cloud, AI/GPU, data warehouses, and CI all on day one",
  "Berkshire Hathaway: $738,983 annualised savings tracked",
];

export default function ConnectPage() {
  return (
    <PageHero eyebrow="Get a Demo" accent="blue" title="See What's Driving Your Cloud Bill.">
      <div className="mt-8 sm:mt-10 flex max-w-6xl flex-col-reverse gap-10 lg:flex-row lg:items-start lg:gap-16">
        <div className="max-w-lg text-left lg:flex-1 lg:pt-1">
          <p className="text-sm text-cv-ink/75">
            A 30-minute working session with our solutions team. We connect a sample account live and walk you through your first findings.
          </p>
          <ul className="mt-6 space-y-3 text-left">
            {PROOF.map((p) => (
              <li key={p} className="flex gap-3 text-cv-ink/85 text-sm">
                <CheckCircle weight="Linear" size={16} className="shrink-0 mt-0.5 text-cv-blue dark:text-cv-blue-light" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full max-w-2xl shrink-0 lg:mx-0">
          <ConnectForm />
        </div>
      </div>
    </PageHero>
  );
}
