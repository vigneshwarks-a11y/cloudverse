/* Customer-proof visual — an "unowned → attributed" estate ledger, distinct
   from the FinOps K8s-connect mock: a table of applications moving from no
   owner across four clouds to a mapped owner and cost, closing on the
   surfaced-savings total. Panel/CardChrome idiom, theme-aware. */

import { Panel, CheckBadge, VIZ_GRAY as GRAY } from "@/components/solution/CardChrome";

type Row = { app: string; cloud: string; logo?: string; owner: string; amount: string };

const ROWS: Row[] = [
  { app: "billing-api", cloud: "AWS", logo: "/icons/aws.svg", owner: "Retail BU", amount: "Rp142M" },
  { app: "customer-portal", cloud: "Azure", logo: "/icons/azure.svg", owner: "Digital BU", amount: "Rp96M" },
  { app: "iot-gateway", cloud: "Google Cloud", logo: "/icons/googlecloud.svg", owner: "Network Ops", amount: "Rp58M" },
];

export function DataXAttributionMock() {
  return (
    <div className="flex flex-col gap-3">
      <Panel className="p-0" chrome="datax.app/estate-attribution">
        <div className="flex items-center justify-between border-b border-cv-line px-4 py-2.5 dark:border-white/10">
          <span className="text-[15px] font-semibold text-cv-ink">129 applications, 4 clouds, unowned</span>
        </div>

        <div className="grid grid-cols-[1.3fr_0.9fr_0.9fr] items-center gap-3 border-b border-cv-line/60 px-4 py-1.5 text-[10px] uppercase tracking-wide text-cv-muted dark:border-white/10">
          <span>Application</span>
          <span>Owner</span>
          <span className="text-right">Monthly cost</span>
        </div>

        {ROWS.map((r, i) => (
          <div
            key={r.app}
            className={`grid grid-cols-[1.3fr_0.9fr_0.9fr] items-center gap-3 px-4 py-2.5 text-xs ${i > 0 ? "border-t border-cv-line/60 dark:border-white/10" : ""}`}
          >
            <span className="flex min-w-0 items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.logo} alt="" aria-hidden className="h-4 w-4 shrink-0 object-contain" />
              <span className="truncate font-mono text-cv-ink/85">{r.app}</span>
            </span>
            <CheckBadge>{r.owner}</CheckBadge>
            <span className="whitespace-nowrap text-right font-mono tabular-nums text-cv-ink">{r.amount}</span>
          </div>
        ))}

        <div className="grid grid-cols-[1.3fr_0.9fr_0.9fr] items-center gap-3 border-t border-cv-line/60 px-4 py-2.5 text-xs dark:border-white/10">
          <span className="flex min-w-0 items-center gap-2 text-cv-muted">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded" style={{ background: `${GRAY}22` }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: GRAY }} />
            </span>
            <span className="truncate">+126 more applications</span>
          </span>
          <span className="truncate text-cv-muted">mapped</span>
          <span className="whitespace-nowrap text-right font-mono tabular-nums text-cv-ink/70">Rp668.80M</span>
        </div>
      </Panel>

      <Panel className="justify-center gap-1 p-4" chrome="datax.app/savings">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-widest text-cv-muted">Savings surfaced before optimization</div>
            <div className="mt-1 font-mono text-3xl font-bold tracking-tight text-cv-teal lg:text-4xl">Rp964.80M</div>
          </div>
          <div className="space-y-1.5 sm:text-right">
            <div className="flex items-center justify-between gap-4 sm:justify-end">
              <span className="text-[11px] uppercase tracking-wide text-cv-muted">Applications mapped</span>
              <span className="font-mono text-sm font-bold text-cv-ink">129</span>
            </div>
            <div className="flex items-center justify-between gap-4 sm:justify-end">
              <span className="text-[11px] uppercase tracking-wide text-cv-muted">Clouds unified</span>
              <span className="font-mono text-sm font-bold text-cv-teal">4</span>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}

export default DataXAttributionMock;
