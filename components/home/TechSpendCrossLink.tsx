/* "Cross-link to Technology Spend" — a banner pointing AIX visitors who also own
   cloud/data/SaaS spend to the Technology Spend platform. Matches home design
   language: cv-* tokens, bordered card, primary CTA. Server component. */

import Link from "next/link";
import { ArrowRight } from "@/lib/solar-icons";

export function TechSpendCrossLink() {
  return (
    <section className="cv-section bg-cv-surface2 dark:bg-black" data-testid="section-tech-spend-crosslink">
      <div className="cv-container">
        <div className="relative overflow-hidden rounded-2xl border border-cv-line/60 bg-cv-surface p-7 sm:p-10 dark:border-white/10 dark:bg-[#0D0D0D]">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(34,120,224,0.16), transparent 70%)" }}
          />
          <div className="relative flex flex-col items-center gap-6 text-center">
            <div className="mx-auto max-w-2xl">
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#1664C0]/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#1664C0] dark:bg-[#7CB8F8]/15 dark:text-[#7CB8F8]">
                One platform
              </span>
              <h2 className="cv-h2 text-balance text-cv-ink">
                Already governing your cloud, data, or SaaS spend?
              </h2>
              <p className="mt-4 cv-body text-cv-ink/70">
                AIX runs on the same platform as CloudVerse Technology Spend: one data model, one
                login, no re-procurement. If cloud, data, or SaaS spend is also on your plate, see the
                Technology Spend Platform.
              </p>
            </div>
            <Link href="/platform/finops" className="cv-btn-primary shrink-0" data-testid="link-tech-spend">
              <span>See the Technology Spend Platform</span>
              <ArrowRight weight="Linear" size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TechSpendCrossLink;
