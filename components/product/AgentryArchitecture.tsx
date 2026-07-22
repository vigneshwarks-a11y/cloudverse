// Pattern 3 Agentry decision engine architecture

const INTENT = [
  "Latency ceiling",
  "Budget cap",
  "Region constraint",
  "Task type",
  "Compliance",
];

const ENGINE = [
  { label: "Live signal evaluation", color: "#0E9E7A" },
  { label: "Policy guardrails", color: "#6954D4" },
  { label: "Route scoring", color: "#1664C0" },
  { label: "Cost attribution", color: "#D97706" },
  { label: "Compliance enforcement", color: "#E5484D" },
];

const PROVIDERS = ["OpenAI", "Anthropic", "Bedrock", "Vertex AI", "CoreWeave", "Azure OAI", "Lambda Labs", "+ more"];

export function AgentryArchitecture() {
  return (
    <section className="cv-section bg-cv-surface2">
      <div className="cv-container">
        <div className="max-w-3xl mb-10 text-left">
          <div className="cv-label mb-3" style={{ color: "#6954D4" }}>Decision engine</div>
          <h2 className="cv-h2 text-cv-ink">Every AI workload, routed with policy and proof.</h2>
        </div>

        <div className="rounded-2xl border border-cv-line/10 bg-cv-ink/[0.025] p-6 sm:p-8 lg:p-10">
          <div className="grid lg:grid-cols-[1fr_auto_1.4fr_auto_1fr] gap-6 lg:gap-4 items-start">
            {/* Intent */}
            <div>
              <div className="cv-label mb-4">Workload intent</div>
              <ul className="space-y-2">
                {INTENT.map((i) => (
                  <li key={i} className="flex items-center gap-2 text-cv-ink/85 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-cv-blue-light" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>

            <Chevron />

            {/* Engine */}
            <div className="rounded-xl border border-cv-line/15 bg-cv-ink/[0.04] p-5">
              <div className="cv-label mb-4" style={{ color: "#6954D4" }}>cloudverse Agentry</div>
              <div className="flex flex-wrap gap-2">
                {ENGINE.map((e) => (
                  <span
                    key={e.label}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] font-medium border"
                    style={{ color: e.color, borderColor: `${e.color}55`, background: `${e.color}14` }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: e.color }} />
                    {e.label}
                  </span>
                ))}
              </div>
            </div>

            <Chevron />

            {/* Providers */}
            <div>
              <div className="cv-label mb-4">Providers</div>
              <div className="grid grid-cols-2 gap-2">
                {PROVIDERS.map((p) => (
                  <div key={p} className="rounded-md border border-cv-line/10 bg-cv-ink/[0.04] px-2.5 py-2 text-xs text-cv-ink/80 text-center">
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Output bar */}
          <div className="mt-8 rounded-xl border border-cv-blue/40 bg-cv-blue/10 p-5">
            <div className="cv-label mb-3 text-[#1664C0] dark:text-[#7CB8F8]">Decision output</div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <div className="text-cv-ink/70 text-[11px] uppercase tracking-wider">Primary route</div>
                <div className="text-cv-ink font-medium mt-1">Anthropic Claude (us-east-1)</div>
                <div className="text-cv-ink/55 text-xs mt-1 font-mono">$0.0042 / req · 480ms p95</div>
              </div>
              <div>
                <div className="text-cv-ink/70 text-[11px] uppercase tracking-wider">Fallback</div>
                <div className="text-cv-ink font-medium mt-1">OpenAI GPT-4o (us-west-2)</div>
                <div className="text-cv-ink/55 text-xs mt-1 font-mono">$0.0061 / req · 540ms p95</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Chevron() {
  return (
    <div className="hidden lg:flex items-center justify-center pt-12">
      <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
        <path d="M2 2L11 10L2 18" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}
