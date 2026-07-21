export type LifecycleStage = { title: string; bullets: string[] };

export function Lifecycle({ color, stages }: { color: string; stages: [LifecycleStage, LifecycleStage, LifecycleStage] }) {
  return (
    <section className="cv-section bg-cv-surface2">
      <div className="cv-container">
        <div className="mx-auto max-w-3xl mb-12 text-center">
          <div className="cv-label mb-3" style={{ color }}>Lifecycle</div>
          <h2 className="cv-h2 text-cv-ink">Inform. Optimize. Operate.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-b border-cv-line/10">
          {stages.map((s, i) => (
            <div
              key={s.title}
              className={`p-6 sm:p-8 ${i < 2 ? "md:border-r border-cv-line/10" : ""} ${i > 0 ? "border-t md:border-t-0 border-cv-line/10" : ""}`}
            >
              <div className="cv-label" style={{ color }}>0{i + 1}</div>
              <div className="font-display font-bold text-cv-ink text-2xl mt-2">{s.title}</div>
              <ul className="mt-5 space-y-3">
                {s.bullets.map((b) => (
                  <li key={b} className="text-cv-ink/65 text-[13px] leading-relaxed flex gap-2">
                    <span className="mt-1.5" style={{ color }}>•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
