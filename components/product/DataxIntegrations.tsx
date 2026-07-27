import Link from "next/link";
import { ArrowRight, CheckCircle } from "@/lib/solar-icons";
import { SectionHeading } from "@/components/SectionHeading";

/* DataX integrations — the home-style logo section (centered heading + logo
   tiles + trust line + "View all integrations"), scoped to the warehouses and
   lakehouses DataX connects to. Snowflake ships a real mark; the rest use
   brand-coloured monogram tiles since no SVG asset exists for them.
   cv-* tokens, theme-aware. Server component. */

type Warehouse = { name: string; initials: string; color: string; src?: string };

const WAREHOUSES: Warehouse[] = [
  { name: "Snowflake", initials: "SN", color: "#29B5E8", src: "/icons/snowflake.svg" },
  { name: "Databricks", initials: "DB", color: "#FF3621" },
  { name: "BigQuery", initials: "BQ", color: "#4285F4" },
  { name: "Microsoft Fabric", initials: "MF", color: "#159F80" },
  { name: "Azure Synapse", initials: "AS", color: "#0078D4" },
  { name: "Amazon Redshift", initials: "RS", color: "#8C4FFF" },
];

function Tile({ w }: { w: Warehouse }) {
  return (
    <div className="flex w-[104px] flex-col items-center gap-3 sm:w-[128px]">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cv-line/60 bg-cv-surface dark:border-white/10 dark:bg-[#0D0D0D]">
        {w.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={w.src} alt={w.name} loading="lazy" className="h-9 w-9 object-contain" />
        ) : (
          <span
            className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold"
            style={{ color: w.color, background: `${w.color}1F` }}
          >
            {w.initials}
          </span>
        )}
      </div>
      <span className="text-center text-sm font-medium text-cv-muted">{w.name}</span>
    </div>
  );
}

export function DataxIntegrations() {
  return (
    <section className="cv-section relative overflow-hidden bg-cv-surface2 dark:bg-black">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[32rem]"
        style={{ background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(22,100,192,0.16), transparent 70%)" }}
      />

      <div className="cv-container relative z-10">
        {/* Heading — two-column */}
        <SectionHeading title="Connects to the stack your teams already use.">
          Warehouses, lakehouses, and pipelines, connected once.
        </SectionHeading>

        {/* Warehouse logo tiles */}
        <div className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-10 sm:gap-x-14">
          {WAREHOUSES.map((w) => (
            <Tile key={w.name} w={w} />
          ))}
        </div>

        {/* Trust line + CTA */}
        <div className="mt-16 flex w-full flex-col items-center gap-4 sm:w-auto">
          <div className="inline-flex items-center gap-2 text-xs text-cv-muted">
            <CheckCircle weight="Linear" size={13} className="text-cv-teal shrink-0" />
            Read-only by default. Automation is opt-in, scoped, and logged.
          </div>
          <Link
            href="/integrations"
            className="cv-btn-ghost w-full justify-center px-5 py-3 sm:w-auto sm:px-7 sm:py-4"
          >
            View all integrations <ArrowRight weight="Linear" size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default DataxIntegrations;
