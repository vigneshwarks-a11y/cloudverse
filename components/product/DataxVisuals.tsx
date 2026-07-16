/* DataX section visuals — self-sizing product-screenshot mocks in the shared
   AIX panel language (CardLightEdge + soft shadow), one per content section:
   a query finding, the automation policy + audit event, the least-privilege
   connection scopes, and a unit-cost trend. cv-* tokens, theme-aware.
   Server components. */

import { CheckCircle, CloseCircle } from "@/lib/solar-icons";
import { CardLightEdge, StatusPill } from "@/components/product/BentoChrome";

const AMBER = "#D97706";

/* Self-sizing panel (unlike the bento Panel, no bottom fade / flex-fill) so
   footers stay crisp when used standalone in a section column. */
function VizPanel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-cv-line bg-white shadow-[0_16px_40px_-24px_rgba(16,24,40,0.18)] dark:border-white/10 dark:bg-black dark:shadow-[0_30px_70px_-25px_rgba(0,0,0,0.5)]">
      <CardLightEdge />
      <div className={`relative ${className}`}>{children}</div>
    </div>
  );
}

/* 1. The $117 finding — a real query-cost finding: SQL, scan stats, cost. */
export function DataxFindingMock() {
  return (
    <VizPanel>
      {/* window bar */}
      <div className="flex items-center justify-between border-b border-cv-line px-4 py-3 dark:border-white/10">
        <span className="font-mono text-xs text-cv-muted">warehouse · prod_analytics</span>
        <StatusPill kind="flag" label="Full scan" />
      </div>

      {/* SQL snippet */}
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[12px] leading-relaxed text-cv-ink/80">
{`SELECT user_id, event, ts
FROM   events
WHERE  event = 'click'
`}<span className="text-cv-muted">-- no partition filter on event_date</span>
      </pre>

      {/* scan stats */}
      <div className="grid grid-cols-2 gap-px border-t border-cv-line bg-cv-line/60 text-xs dark:border-white/10 dark:bg-white/10">
        {[
          ["Bytes scanned", "334.6 GB"],
          ["Runs / month", "77"],
          ["Avg cost", "$1.52"],
          ["Total", "$117.16"],
        ].map(([l, v], i) => (
          <div key={l} className="bg-white px-4 py-3 dark:bg-black">
            <div className="text-[10px] uppercase tracking-wide text-cv-muted">{l}</div>
            <div className="mt-0.5 font-mono text-base font-bold" style={{ color: i === 3 ? AMBER : "hsl(var(--cv-ink))" }}>{v}</div>
          </div>
        ))}
      </div>

      {/* fix hint */}
      <div className="flex items-center gap-2 border-t border-cv-line px-4 py-3 text-[12px] text-cv-teal dark:border-white/10">
        <CheckCircle weight="Bold" size={14} />
        Suggested: filter on the <span className="font-mono">event_date</span> partition
      </div>
    </VizPanel>
  );
}

/* 2. Automation policy — mode selector + the resulting audit event. */
export function DataxAutomationMock() {
  const modes = ["Off", "Recommend only", "Approve then apply", "Auto within policy"];
  const active = 3;
  return (
    <VizPanel>
      <div className="border-b border-cv-line px-4 py-3 text-[10px] uppercase tracking-wide text-cv-muted dark:border-white/10">
        Automation policy
      </div>
      <div className="space-y-2 p-4">
        {modes.map((m, i) => {
          const on = i === active;
          return (
            <div
              key={m}
              className="flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm"
              style={
                on
                  ? { borderColor: `${AMBER}66`, background: `${AMBER}12`, color: "hsl(var(--cv-ink))" }
                  : { borderColor: "hsl(var(--cv-line))" }
              }
            >
              <span
                className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2"
                style={{ borderColor: on ? AMBER : "hsl(var(--cv-line))" }}
              >
                {on && <span className="h-1.5 w-1.5 rounded-full" style={{ background: AMBER }} />}
              </span>
              <span className={on ? "font-medium text-cv-ink" : "text-cv-muted"}>{m}</span>
            </div>
          );
        })}
      </div>

      {/* resulting audit event */}
      <div className="border-t border-cv-line px-4 py-3 dark:border-white/10">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-wide text-cv-muted">Audit event</span>
          <StatusPill kind="ok" label="logged" />
        </div>
        <p className="font-mono text-[11px] leading-relaxed text-cv-ink/80">
          <span className="text-cv-muted">Detected</span> Warehouse oversizing (Snowflake)<br />
          <span className="text-cv-muted">Action</span> Resized Medium to Small<br />
          <span className="text-cv-muted">Approved</span> Auto-Apply · Safe Optimisation
        </p>
      </div>
    </VizPanel>
  );
}

/* 3. Connection scopes — least-privilege, read-only by default. */
export function DataxConnectionMock() {
  const scopes: { label: string; state: "granted" | "never" | "off" }[] = [
    { label: "Query history", state: "granted" },
    { label: "Warehouse metering", state: "granted" },
    { label: "Billing telemetry", state: "granted" },
    { label: "Table contents", state: "never" },
    { label: "Automation", state: "off" },
  ];
  return (
    <VizPanel>
      <div className="flex items-center justify-between border-b border-cv-line px-4 py-3 dark:border-white/10">
        <span className="font-mono text-xs text-cv-ink/80">Connection · Snowflake</span>
        <StatusPill kind="ok" label="Read-only" />
      </div>
      <div className="divide-y divide-cv-line dark:divide-white/10">
        {scopes.map(({ label, state }) => (
          <div key={label} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
            <span className="flex items-center gap-2.5 text-cv-ink/80">
              {state === "granted" ? (
                <CheckCircle weight="Bold" size={16} className="shrink-0 text-cv-teal" />
              ) : (
                <CloseCircle weight="Bold" size={16} className="shrink-0 text-cv-muted/60" />
              )}
              {label}
            </span>
            {state === "granted" && <StatusPill kind="ok" label="granted" />}
            {state === "never" && <StatusPill kind="blocked" label="never" />}
            {state === "off" && <StatusPill kind="flag" label="opt-in · off" />}
          </div>
        ))}
      </div>
      <div className="border-t border-cv-line px-4 py-3 text-[11px] text-cv-muted dark:border-white/10">
        Revoke any time
      </div>
    </VizPanel>
  );
}

/* 4. Unit-cost trend — cost per unit of work improving as the platform scales. */
export function DataxPricingMock() {
  const bars = [88, 80, 74, 63, 55, 48, 40];
  return (
    <VizPanel className="p-5">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-wide text-cv-muted">Cost per unit of work</div>
          <div className="mt-0.5 font-mono text-xl font-bold text-cv-ink">
            -54% <span className="text-xs font-medium text-cv-muted">/ 6 mo</span>
          </div>
        </div>
        <StatusPill kind="ok" label="improving" />
      </div>
      <div className="flex h-24 items-end gap-2">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm"
            style={{
              height: `${h}%`,
              background: i === bars.length - 1 ? "#0E9E7A" : AMBER,
              opacity: i === bars.length - 1 ? 1 : 0.35 + i * 0.06,
            }}
          />
        ))}
      </div>
      <div className="mt-3 text-[11px] text-cv-muted">You pay for your platform, not your waste.</div>
    </VizPanel>
  );
}
