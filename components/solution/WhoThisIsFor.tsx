import { UserRounded } from "@solar-icons/react";

export function WhoThisIsFor({ roles, accent, bg }: { roles: string[]; accent: string; bg?: boolean }) {
  return (
    <section className={`cv-section ${bg ? "bg-cv-surface dark:bg-black" : ""}`}>
      <div className="cv-container">
        <h2 className="cv-h2 text-cv-ink mb-8">Who this is for.</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {roles.map((role) => (
            <div
              key={role}
              className="rounded-xl border border-cv-line/40 bg-cv-ink/[0.02] p-5 flex flex-col gap-3"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: `${accent}1A`, color: accent }}
              >
                <UserRounded weight="Linear" size={18} />
              </div>
              <span className="text-sm font-medium text-cv-ink/85 leading-snug">{role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
