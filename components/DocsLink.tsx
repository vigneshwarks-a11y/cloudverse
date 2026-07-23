import { ArrowRight } from "@/lib/solar-icons";

/* Inline "Read the docs" affordance for feature sections — the site's
   "Learn more" look (blue text + trailing arrow), rendered as a real anchor
   because the docs live on an external origin (docs.cloudverse.ai) and open
   in a new tab. Pass a DOCS.* entry from lib/links as href. */
export function DocsLink({
  href,
  label = "Read the docs",
  className = "",
}: {
  href: string;
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        "group inline-flex items-center gap-1.5 text-sm font-semibold text-cv-blue dark:text-cv-blue-light hover:underline underline-offset-4 " +
        className
      }
    >
      {label}
      <ArrowRight weight="Linear" size={14} className="transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

export default DocsLink;
