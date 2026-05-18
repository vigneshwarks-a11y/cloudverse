export type Audience = { team: string; role: string; desc: string };

export function WhoUsesIt({ color, items }: { color: string; items: Audience[] }) {
  return (
    <section className="cv-section bg-cv-surface">
      <div className="cv-container">
        <div className="max-w-3xl mb-10">
          <div className="cv-label mb-3" style={{ color }}>Who uses it</div>
          <h2 className="cv-h2 text-white">Built for the teams accountable for the bill.</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {items.map((a) => (
            <div key={a.team} className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
              <div className="cv-label" style={{ color }}>{a.team}</div>
              <div className="font-display font-semibold text-white text-lg mt-3">{a.role}</div>
              <p className="text-white/65 text-sm mt-2 leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
