const PILLARS = [
  {
    eyebrow: "Your prompts",
    title: "Under your policy",
    body: "The distilled know-how of your business — versioned and served from your control plane, not siloed inside a vendor's platform.",
  },
  {
    eyebrow: "Your model choice",
    title: "A routing decision, not a lock-in",
    body: "The model is a routing decision under your constraints — swap providers, stay cloud-agnostic, and keep your own SLAs.",
  },
  {
    eyebrow: "Your data & metrics",
    title: "An append-only ledger",
    body: "Every execution recorded on an audit trail you control — retained on your terms, closed to any single vendor's roadmap.",
  },
];

export function VendorSovereignty() {
  return (
    <section className="cv-section bg-cv-surface" data-testid="section-vendor-sovereignty">
      <div className="cv-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1664C0]/15 dark:bg-[#7CB8F8]/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#1664C0] dark:text-[#7CB8F8] mb-4">
              Governance
            </span>
            <h2 className="cv-h2 text-cv-ink">Own your stuff — or your vendor owns your advantage.</h2>
            <p className="mt-5 text-cv-ink/70 leading-relaxed">
              A frontier model going dark by government order. A price shock. A deprecation. Model access
              is now conditional infrastructure. When the vendor changes, your prompts, your data policy,
              your routes, and your audit trail have to keep working — because they live in your control
              plane, not theirs.
            </p>
            <div className="mt-8 rounded-xl border border-cv-blue/30 bg-cv-blue/5 p-5">
              <p className="text-cv-ink/85 italic leading-relaxed">
                &quot;Switching models without losing institutional learning is the sovereignty test.&quot;
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PILLARS.map((p, i) => (
              <div
                key={p.title}
                className={`rounded-xl border border-cv-line/40 bg-cv-card dark:bg-[#0D0D0D] p-6 ${
                  i === 2 ? "sm:col-span-2" : ""
                }`}
              >
                <div className="text-[11px] uppercase tracking-widest text-cv-muted mb-2">{p.eyebrow}</div>
                <h3 className="text-base font-semibold text-cv-ink">{p.title}</h3>
                <p className="mt-2 text-sm text-cv-ink/65 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
