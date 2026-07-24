import Link from "next/link";
import { ArrowRight } from "@/lib/solar-icons";

const BASE_BLUE = "#1447E6"; // brand royal blue

/* Slim mid-page conversion moment: one optional line + one button.
   Deliberately lighter than ClosingCtaBand so it reads as a pause in the
   scroll, not another full section.

   Pass `filled` to render the content inside a saturated brand-blue color
   block — a deliberate accent break for closing / high-intent CTAs. */
export function InlineCta({
  label,
  href,
  sub,
  filled = false,
  testid,
}: {
  label: string;
  href: string;
  sub?: string;
  filled?: boolean;
  testid?: string;
}) {
  if (filled) {
    return (
      <section className="bg-cv-surface py-10 sm:py-14" data-testid={testid ?? "section-inline-cta"}>
        <div className="cv-container">
          <div
            className="relative overflow-hidden rounded-3xl px-6 py-10 sm:px-12 sm:py-12"
            style={{ background: `linear-gradient(120deg, ${BASE_BLUE}, #2E5CF0)` }}
          >
            {/* Soft corner glow for depth */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full blur-3xl"
              style={{ background: "rgba(255,255,255,0.18)" }}
            />
            <div className="relative flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:gap-10 sm:text-left">
              {sub && <p className="text-lg font-medium leading-snug text-white lg:whitespace-nowrap">{sub}</p>}
              <Link
                href={href}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#1447E6] transition-colors duration-150 hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1447E6]"
              >
                <span>{label}</span> <ArrowRight weight="Linear" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-cv-surface pt-6 sm:pt-8 pb-10 sm:pb-12" data-testid={testid ?? "section-inline-cta"}>
      <div className="cv-container flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center sm:gap-6">
        {sub && <p className="cv-body text-cv-ink/70">{sub}</p>}
        <Link href={href} className="cv-btn-primary shrink-0">
          <span>{label}</span> <ArrowRight weight="Linear" size={16} />
        </Link>
      </div>
    </section>
  );
}
