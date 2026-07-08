import Link from "next/link";
import { DEMO_URL } from "@/lib/links";
import { PixelMosaic } from "@/components/PixelMosaic";

/**
 * Closing CTA band — a deliberate saturated brand-blue accent break from the
 * dark theme, placed above the footer across marketing pages.
 *
 * Layering technique: solid base blue → generated pixel-mosaic pattern →
 * horizontal gradient overlay softening the pattern under the text → content.
 * Palette is the saturated #0057FF CTA-band blue family.
 * Copy defaults match the prior ClosingCTA section.
 */

const BASE_BLUE = "#0057FF"; // saturated CTA-band blue (from reference snippet)

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
      {/* Pixel-mosaic texture — light squares + very dark blue squares */}
      <PixelMosaic
        patternId="cv-cta-mosaic"
        darkColor="#00143C"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      {/* Gradient overlay: darker/saturated blue at left fading to flat base by ~80% */}
      <div
        aria-hidden
        className="absolute inset-0 h-full w-full bg-gradient-to-r from-[#0055ff99] via-[#0057FF] via-80% to-[#0057FF]"
      />

      {/* Content */}
      <div className="cv-container relative py-10 md:py-32">
        <h2 className="max-w-4xl text-[32px] font-medium leading-[1.05] text-white md:text-3xl lg:text-[48px] lg:leading-[1.05]">
          {heading}
        </h2>
        {subtext && <p className="mt-4 max-w-2xl text-lg text-[#A8EFFF]">{subtext}</p>}

        <div className="mt-10 flex flex-row flex-wrap gap-6 font-medium">
          <Link
            href={primaryHref}
            aria-label={primaryLabel}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm text-[#0057FF] transition-colors duration-100 hover:bg-neutral-100"
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
