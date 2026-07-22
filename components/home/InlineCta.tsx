import Link from "next/link";
import { ArrowRight } from "@/lib/solar-icons";

/* Slim mid-page conversion moment: one optional line + one button.
   Deliberately lighter than ClosingCtaBand so it reads as a pause in the
   scroll, not another full section. */
export function InlineCta({
  label,
  href,
  sub,
  testid,
}: {
  label: string;
  href: string;
  sub?: string;
  testid?: string;
}) {
  return (
    <section className="bg-cv-surface py-10 sm:py-12" data-testid={testid ?? "section-inline-cta"}>
      <div className="cv-container flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center sm:gap-6">
        {sub && <p className="cv-body text-cv-ink/70">{sub}</p>}
        <Link href={href} className="cv-btn-primary shrink-0">
          <span>{label}</span> <ArrowRight weight="Linear" size={16} />
        </Link>
      </div>
    </section>
  );
}
