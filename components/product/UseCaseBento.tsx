const BLUE = "#2E86FF";
const PURPLE = "#6954D4";
const RED = "#E5484D";

type UseCase = {
  n: string;
  title: string;
  sit: string;
  prob: string;
  how: string;
  after: string;
};

function Block({
  label,
  text,
  accent,
  highlight,
}: {
  label: string;
  text: string;
  accent?: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="cv-label mb-1.5" style={accent ? { color: accent } : undefined}>
        {label}
      </div>
      <p className={`text-sm leading-relaxed ${highlight ? "text-cv-ink/90" : "text-cv-ink/75"}`}>
        {text}
      </p>
    </div>
  );
}

function CardShell({
  n,
  title,
  glow,
  glowCorner,
  className,
  children,
}: {
  n: string;
  title: string;
  glow: string;
  glowCorner: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-7 sm:p-8 ${className ?? ""}`}
    >
      {/* soft ambient glow */}
      <div
        aria-hidden
        className={`pointer-events-none absolute h-64 w-64 rounded-full blur-3xl ${glowCorner}`}
        style={{ background: `radial-gradient(circle, ${glow}33, transparent 70%)` }}
      />
      <div className="relative">
        <div className="mb-6 flex items-center gap-3">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg font-display text-sm font-semibold"
            style={{ color: glow, background: `${glow}1a`, border: `1px solid ${glow}40` }}
          >
            {n}
          </span>
          <h3 className="cv-h3 text-cv-ink">{title}</h3>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ---------- Section ---------- */

export default function UseCaseBento({ useCases }: { useCases: UseCase[] }) {
  const [c1, c2, c3, c4] = useCases;

  const blocks = (uc: UseCase) => (
    <>
      <Block label="Situation" text={uc.sit} />
      <Block label="The problem" text={uc.prob} accent={RED} />
      <Block label="How AIX solves it" text={uc.how} accent={BLUE} />
      <Block label="After AIX" text={uc.after} accent="#A99CE8" highlight />
    </>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* Card 1 — large feature */}
      <CardShell
        n={c1.n}
        title={c1.title}
        glow={BLUE}
        glowCorner="-top-16 -left-16"
        className="lg:col-span-6"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">{blocks(c1)}</div>
      </CardShell>

      {/* Card 2 — large feature (mirrored) */}
      <CardShell
        n={c2.n}
        title={c2.title}
        glow={PURPLE}
        glowCorner="-top-16 -right-16"
        className="lg:col-span-6"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">{blocks(c2)}</div>
      </CardShell>

      {/* Card 3 — narrower */}
      <CardShell
        n={c3.n}
        title={c3.title}
        glow={RED}
        glowCorner="-bottom-16 -left-16"
        className="lg:col-span-5"
      >
        <div className="grid gap-5">{blocks(c3)}</div>
      </CardShell>

      {/* Card 4 — wider */}
      <CardShell
        n={c4.n}
        title={c4.title}
        glow={BLUE}
        glowCorner="-bottom-16 -right-16"
        className="lg:col-span-7"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">{blocks(c4)}</div>
      </CardShell>
    </div>
  );
}
