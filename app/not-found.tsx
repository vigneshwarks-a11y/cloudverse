import Link from "next/link";
import { DEMO_URL } from "@/lib/links";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="cv-hero-bg min-h-[70vh] flex items-center pt-[240px] pb-20">
      <div className="cv-container relative z-10 text-center max-w-2xl mx-auto">
        <div className="cv-label mb-3">Error 404</div>
        <h1 className="cv-h1 text-cv-ink">This page is being rebuilt.</h1>
        <p className="cv-body-lg mt-5 text-cv-ink/70">
          The site is in the middle of a migration to the new compute economics platform. Most pages are rolling out shortly.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link href="/" className="cv-btn-primary">Back to home</Link>
          <Link href={DEMO_URL} className="cv-btn-ghost">Get a Demo</Link>
        </div>
      </div>
    </section>
  );
}
