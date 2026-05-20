import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal — CloudVerse",
  description: "Terms of service, privacy policy, and data processing addendum.",
  alternates: { canonical: "/legal" },
};

export default function Page() {
  return (
    <section className="pt-[140px] pb-16 lg:pt-[160px] lg:pb-24">
      <div className="cv-container max-w-3xl">
        <div className="cv-label mb-4">Legal</div>
        <h1 className="cv-h1 text-cv-ink">Legal documents</h1>
        <p className="cv-body-lg mt-6 text-cv-ink/75">
          We're publishing our updated Terms of Service, Privacy Policy, and Data Processing Addendum here. For an immediate copy please reach out to <a className="text-cv-blue-light" href="mailto:legal@cloudverse.ai">legal@cloudverse.ai</a>.
        </p>
      </div>
    </section>
  );
}
