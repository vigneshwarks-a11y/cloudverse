import Link from "next/link";
import { ArrowRight } from "@/lib/solar-icons";
import { NAV } from "@/lib/links";

/* Sibling-solution cross-links. Solutions pages previously only linked out to
   /platform/*; this closes the gap by pointing each persona page at the other
   team pages, driven from the same NAV.solutions source as the header/footer. */
export function RelatedSolutions({
  current,
  heading = "Built for other teams too",
  bg = false,
}: {
  /** Current solution href, e.g. "/solutions/enterprise" — excluded from the list. */
  current: string;
  heading?: string;
  bg?: boolean;
}) {
  const others = NAV.solutions.filter((s) => s.href !== current);
  if (others.length === 0) return null;

  return (
    <section className={`cv-section ${bg ? "bg-cv-surface2 dark:bg-black" : ""}`}>
      <div className="cv-container">
        <h2 className="cv-h2 text-cv-ink mb-8">{heading}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex h-full flex-col rounded-xl border border-cv-line/40 bg-cv-surface dark:bg-[#0D0D0D] p-5 transition-colors hover:border-cv-blue/40"
              data-testid={`related-solution-${s.icon}`}
            >
              <span className="text-sm font-semibold text-cv-ink">{s.label}</span>
              <span className="mt-1 flex-1 text-sm text-cv-ink/70">{s.desc}</span>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-cv-blue">
                View
                <ArrowRight weight="Linear" size={13} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
