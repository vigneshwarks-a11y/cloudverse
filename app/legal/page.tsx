import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal — CloudVerse",
  description: "Terms of service, privacy policy, and data processing addendum.",
  alternates: { canonical: "/legal" },
  robots: { index: true, follow: false },
  openGraph: {
    title: "Legal — CloudVerse",
    description: "Terms of service, privacy policy, and data processing addendum.",
    url: "/legal",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "CloudVerse Legal" }],
  },
  twitter: { card: "summary_large_image", title: "Legal — CloudVerse", description: "Terms of service, privacy policy, and data processing addendum." },
};

export default function Page() {
  return (
    <section className="pt-[120px] sm:pt-[160px] pb-16 lg:pt-[240px] lg:pb-24">
      <div className="cv-container max-w-3xl">
        <div className="cv-label mb-4">Legal</div>
        <h1 className="cv-h1 text-cv-ink">Legal documents</h1>
        <p className="cv-body-lg mt-6 text-cv-ink/75">
          We're publishing our updated Terms of Service, Privacy Policy, and Data Processing Addendum here. For an immediate copy please reach out to <a className="text-cv-blue dark:text-cv-blue-light" href="mailto:legal@cloudverse.ai">legal@cloudverse.ai</a>.
        </p>
      </div>
    </section>
  );
}
