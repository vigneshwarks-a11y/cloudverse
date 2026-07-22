import Link from "next/link";
import { DEMO_URL } from "@/lib/links";

/**
 * Closing CTA band - a deliberate saturated brand-blue accent break from the
 * dark theme, placed above the footer across marketing pages.
 * Copy defaults match the prior ClosingCTA section.
 */

const BASE_BLUE = "#1447E6"; // brand royal blue

export interface ClosingCtaBandProps {
  heading?: string;
  /** Optional supporting line. Omitted by default (matches the prior CTA). */
  subtext?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  /** Primary ("Book a Demo") destination. Defaults to the shared demo route. */
  primaryHref?: string;
  /** Secondary destination. */
  secondaryHref?: string;
}

export default function ClosingCtaBand({
  heading = "Your Cloud and AI Spend is Growing. Find Out Exactly Where.",
  subtext,
  primaryLabel = "Book a Demo",
  secondaryLabel = "Request a free AI cost audit",
  primaryHref = DEMO_URL,
  secondaryHref = "/contact",
}: ClosingCtaBandProps) {
  return (
    <section className="relative overflow-hidden" style={{ background: BASE_BLUE }}>
      {/* Content */}
      <div className="cv-container relative flex flex-col items-start py-10 md:py-32">
        <h2 className="max-w-4xl text-balance text-[clamp(19px,5vw,22px)] font-medium leading-[1.3] text-white sm:text-[32px] sm:leading-[1.1] md:text-3xl md:leading-[1.05] lg:text-[48px] lg:leading-[1.05]">
          {(() => {
            // Break after the first sentence so the second line starts with the
            // next sentence (e.g. "Find Out Exactly Where.").
            const idx = heading.indexOf(". ");
            if (idx === -1) return heading;
            return (
              <>
                {heading.slice(0, idx + 1)}
                <br />
                {heading.slice(idx + 2)}
              </>
            );
          })()}
        </h2>
        {subtext && <p className="mt-4 max-w-3xl text-pretty text-lg text-[#A8EFFF]">{subtext}</p>}

        <div className="mt-10 flex flex-row flex-wrap justify-start gap-6 font-medium">
          <Link
            href={primaryHref}
            aria-label={primaryLabel}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm text-[#1447E6] transition-colors duration-100 hover:bg-neutral-100"
          >
            {primaryLabel}
          </Link>
          <Link
            href={secondaryHref}
            aria-label={secondaryLabel}
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-neutral-900/90 px-5 py-2.5 text-sm text-white transition-colors duration-100 hover:bg-neutral-900/80"
          >
            <span>{secondaryLabel}</span>
            <svg className="-mr-1 size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M9 6L15 12L9 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
