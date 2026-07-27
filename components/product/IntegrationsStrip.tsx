import Link from "next/link";

export function IntegrationsStrip({ color, items }: { color: string; items: string[] }) {
  return (
    <section className="cv-section bg-cv-surface2">
      <div className="cv-container">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="max-w-xl">
            <div className="cv-label mb-3" style={{ color }}>Integrations</div>
            <h2 className="cv-h2 text-cv-ink">Connects to the stack your teams already use.</h2>
          </div>
          <Link href="/integrations" className="cv-btn-ghost shrink-0 px-5 py-3 sm:px-7 sm:py-4">
            See all integrations
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap gap-2">
          {items.map((p) => (
            <span
              key={p}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm border border-cv-line/10 bg-cv-ink/[0.03] text-cv-ink/80"
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
