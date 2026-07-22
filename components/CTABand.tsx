import Link from "next/link";
import { ArrowRight } from "@/lib/solar-icons";
import { DEMO_URL } from "@/lib/links";

export function CTABand({
  heading = "See what's driving your cloud bill.",
  sub = "Connect your first account in under 30 minutes. Most teams have their first non-obvious finding the same day.",
}: {
  heading?: string;
  sub?: string;
}) {
  return (
    <section className="cv-section bg-cv-surface">
      <div className="cv-container">
        <div className="max-w-3xl">
          <h2 className="cv-h2 text-cv-ink">{heading}</h2>
          <p className="cv-body-lg mt-5 text-cv-ink/70">{sub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={DEMO_URL} className="cv-btn-primary">
              Get a Demo <ArrowRight weight="Linear" size={16} />
            </Link>
            <Link href="/contact" className="cv-btn-ghost">
              Talk to Sales
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
