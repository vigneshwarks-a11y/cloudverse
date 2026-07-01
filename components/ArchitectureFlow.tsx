// Pattern 1 Three-column platform architecture flow
// Per brief Section 5

type Tag = { label: string; color: string };

const LEFT: Tag[] = [
  { label: "AWS", color: "#1664C0" },
  { label: "Azure", color: "#1664C0" },
  { label: "GCP", color: "#1664C0" },
  { label: "Snowflake", color: "#D97706" },
  { label: "Databricks", color: "#0E9E7A" },
  { label: "OpenAI", color: "#6954D4" },
  { label: "GPU clouds", color: "#6954D4" },
  { label: "GitHub", color: "#0E9E7A" },
];

const MIDDLE: Tag[] = [
  { label: "Allocation", color: "#1664C0" },
  { label: "Anomaly detection", color: "#1664C0" },
  { label: "Forecasting", color: "#1664C0" },
  { label: "Unit economics", color: "#1664C0" },
  { label: "AI routing", color: "#6954D4" },
  { label: "PR cost checks", color: "#0E9E7A" },
  { label: "Query attribution", color: "#D97706" },
];

const RIGHT: Tag[] = [
  { label: "FinOps Manager", color: "#1664C0" },
  { label: "Platform Engineer", color: "#0E9E7A" },
  { label: "AI/MLOps Lead", color: "#6954D4" },
  { label: "Data Engineer", color: "#D97706" },
  { label: "CFO / CIO", color: "#1664C0" },
];

function Col({ title, tags }: { title: string; tags: Tag[] }) {
  return (
    <div className="flex-1 min-w-0">
      <div className="cv-label mb-4">{title}</div>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <span
            key={t.label}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] font-medium border"
            style={{
              color: t.color,
              borderColor: `${t.color}40`,
              background: `${t.color}12`,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: t.color }} />
            {t.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function Connector() {
  return (
    <div className="flex md:flex-col items-center justify-center md:justify-start md:pt-10 gap-1.5">
      <span className="hidden md:block w-px h-6 bg-cv-ink/15" />
      <span className="w-2 h-2 rounded-full bg-cv-blue" />
      <span className="hidden md:block w-px h-6 bg-cv-ink/15" />
    </div>
  );
}

export function ArchitectureFlow() {
  return (
    <div
      className="rounded-2xl border border-cv-line/8 p-6 sm:p-8 lg:p-10"
      style={{ background: "rgba(255,255,255,0.025)" }}
      data-testid="architecture-flow"
    >
      <div className="flex flex-col md:flex-row gap-6 md:gap-4">
        <Col title="Connect your stack" tags={LEFT} />
        <Connector />
        <Col title="cloudverse platform" tags={MIDDLE} />
        <Connector />
        <Col title="Aligned to your teams" tags={RIGHT} />
      </div>
    </div>
  );
}
