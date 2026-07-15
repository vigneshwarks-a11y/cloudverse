"use client";

import { FeatureCard, Panel, CheckBadge, VIZ_BLUE as BLUE, VIZ_OK as OK, VIZ_VIOLET as VIOLET, VIZ_AMBER as AMBER } from "@/components/solution/CardChrome";

/* Enterprise "what enterprise teams operationalise" bento — same
   image-topped FeatureCard idiom as FinopsShips: a bordered panel with a
   lit top-left edge + ambient glow on a dark surface, tables/checklists
   inside. Theme-aware via cv-* tokens. */

/* 1. One model across the estate — the SAME total shown from three
   different vantage points, each reconciled, so "one model" reads as
   one number that holds up everywhere rather than an abstract "% match". */
function ModelViz() {
  const views: [string, string][] = [
    ["As seen in FinOps", BLUE],
    ["As seen in Engineering", VIOLET],
    ["As seen in Finance", AMBER],
  ];
  return (
    <Panel className="justify-center gap-3 p-4" chrome="enterprise.app/allocation-model">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wide text-cv-muted">This month's estate spend</span>
        <span className="font-mono text-base font-bold tabular-nums" style={{ color: BLUE }}>$1.84M</span>
      </div>
      {views.map(([v, color]) => (
        <div key={v} className="flex items-center justify-between rounded-md border border-cv-line/60 px-2.5 py-1.5 text-xs dark:border-white/10">
          <span className="flex items-center gap-2 text-cv-ink/75">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />
            {v}
          </span>
          <span className="flex items-center gap-2">
            <span className="font-mono tabular-nums text-cv-ink/85">$1.84M</span>
            <CheckBadge color={color}>Matches</CheckBadge>
          </span>
        </div>
      ))}
    </Panel>
  );
}

/* 2. Identity and audit — enabled security controls checklist. */
function IdentityViz() {
  const items: [string, string][] = [
    ["SSO", BLUE],
    ["SCIM", VIOLET],
    ["RBAC", OK],
    ["Audit logs", AMBER],
    ["Encryption keys", BLUE],
  ];
  return (
    <Panel className="justify-center gap-2.5 p-4" chrome="enterprise.app/identity">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wide text-cv-muted">Identity &amp; audit</span>
        <span className="text-[10px] font-medium text-cv-muted">5 controls</span>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-[11px] text-cv-ink/75">
        {items.map(([it, color]) => (
          <CheckBadge key={it} color={color}>{it}</CheckBadge>
        ))}
      </div>
    </Panel>
  );
}

/* 3. Regional residency — region list with connection status, in the
   idiom of Laravel Cloud's connected-domains list. */
function RegionViz() {
  const rows: [string, string, string][] = [
    ["US", "Private-link", BLUE],
    ["EU", "VPC", VIOLET],
    ["APAC", "Private-link", AMBER],
  ];
  return (
    <Panel className="p-0" chrome="enterprise.app/residency">
      {rows.map(([region, opt, color], i) => (
        <div key={region} className={`grid grid-cols-[1fr_auto_auto] items-center gap-3 px-3 py-2.5 text-xs ${i > 0 ? "border-t border-cv-line/60 dark:border-white/10" : ""}`}>
          <span className="flex items-center gap-2 text-cv-ink/85">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />
            {region}
          </span>
          <CheckBadge color={color}>Connected</CheckBadge>
          <span className="whitespace-nowrap text-cv-muted">{opt}</span>
        </div>
      ))}
    </Panel>
  );
}

/* 4. Marketplace and procurement — committed-spend listing table. */
function MarketplaceViz() {
  const rows: [string, string, string][] = [
    ["AWS Marketplace", "$142k", AMBER],
    ["Azure Marketplace", "$96k", BLUE],
    ["Google Cloud Marketplace", "$58k", OK],
  ];
  return (
    <Panel className="p-0" chrome="enterprise.app/marketplace">
      <div className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-cv-line px-3 py-1.5 text-[10px] uppercase tracking-wide text-cv-muted dark:border-white/10">
        <span>Marketplace</span>
        <span className="text-right">Committed spend</span>
      </div>
      {rows.map(([p, amount, color], i) => (
        <div key={p} className={`grid grid-cols-[1fr_auto] items-center gap-3 px-3 py-2 text-xs ${i > 0 ? "border-t border-cv-line dark:border-white/10" : ""}`}>
          <span className="flex items-center gap-2 truncate text-cv-ink/80">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />
            {p}
          </span>
          <span className="whitespace-nowrap font-mono tabular-nums" style={{ color }}>{amount}</span>
        </div>
      ))}
      <div className="grid grid-cols-[1fr_auto] items-center gap-3 border-t border-cv-line px-3 py-2 text-xs dark:border-white/10" style={{ background: `${VIOLET}12` }}>
        <span className="font-semibold text-cv-ink">Total redeemed</span>
        <span className="whitespace-nowrap text-right font-mono font-semibold tabular-nums" style={{ color: VIOLET }}>$296k</span>
      </div>
    </Panel>
  );
}

const VISUALS: Record<string, () => React.JSX.Element> = {
  "One model across the estate": ModelViz,
  "Identity and audit": IdentityViz,
  "Regional residency": RegionViz,
  "Marketplace and procurement": MarketplaceViz,
};

export type EnterpriseItem = [title: string, desc: string];

export function EnterpriseDayOne({ items }: { items: EnterpriseItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {items.map(([t, b]) => {
        const Viz = VISUALS[t];
        return (
          <FeatureCard key={t} title={t} desc={b}>
            {Viz ? <Viz /> : null}
          </FeatureCard>
        );
      })}
    </div>
  );
}
