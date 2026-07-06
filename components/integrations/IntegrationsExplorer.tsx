"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { AltArrowDown, ArrowRight, CloseCircle, Magnifer, SquareArrowRightUp } from "@solar-icons/react";
import { integrationsData, type Integration } from "@/lib/integrationsData";
import { IntegrationLogo } from "./IntegrationLogo";

const CATEGORIES = ["All", "Cloud", "Data", "AI", "Kubernetes", "Infrastructure", "Identity", "Ticketing", "Collaboration", "Observability", "SaaS"] as const;
const STATUSES = ["All", "Available", "Beta", "Coming soon"] as const;
const MODULES = ["All", "AIX", "DevX", "DataX"] as const;

const STATUS_STYLE: Record<Integration["status"], string> = {
  "Available":   "bg-cv-teal/10 text-cv-teal border-cv-teal/30",
  "Beta":        "bg-cv-amber/10 text-cv-amber border-cv-amber/30",
  "Coming soon": "bg-cv-ink/[0.04] text-cv-ink/55 border-cv-line/20",
};

const PRODUCT_STYLE: Record<string, string> = {
  AIX:   "border-cv-purple/40 text-cv-purple bg-cv-purple/10",
  DevX:  "border-cv-blue/40 text-cv-blue bg-cv-blue/10",
  DataX: "border-cv-amber/40 text-cv-amber bg-cv-amber/10",
};

export function IntegrationsExplorer() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [status, setStatus] = useState<string>("All");
  const [mod, setMod] = useState<string>("All");
  const [active, setActive] = useState<Integration | null>(null);

  // Close drawer on Esc
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  const filtered = useMemo(() => {
    const needle = q.toLowerCase().trim();
    return integrationsData.filter((i) => {
      if (cat !== "All" && i.category !== cat) return false;
      if (status !== "All" && i.status !== status) return false;
      if (mod !== "All" && !i.products?.includes(mod as "AIX" | "DevX" | "DataX")) return false;
      if (!needle) return true;
      return (
        i.name.toLowerCase().includes(needle) ||
        i.short.toLowerCase().includes(needle) ||
        i.aliases?.some((a) => a.toLowerCase().includes(needle))
      );
    });
  }, [q, cat, status, mod]);

  return (
    <>
      {/* Search */}
      <div className="relative mb-6 max-w-xl">
        <Magnifer weight="Linear" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cv-ink/45" />
        <input
          type="text"
          placeholder="Search integrations…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-cv-line/40 bg-cv-card dark:bg-[#0D0D0D] text-cv-ink placeholder-cv-muted focus:outline-none focus:border-cv-blue/60 transition-colors"
          data-testid="input-search-integrations"
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-x-10 gap-y-5 mb-10 lg:items-start">
        <FilterRow label="Module" options={MODULES as unknown as readonly string[]} value={mod} onChange={setMod} testidPrefix="filter-module" />
        <FilterRow label="Category" options={CATEGORIES as unknown as readonly string[]} value={cat} onChange={setCat} testidPrefix="filter-category" />
        <SelectFilter label="Status" options={STATUSES as unknown as readonly string[]} value={status} onChange={setStatus} testidPrefix="filter-status" />
      </div>

      <div className="mb-4 text-xs text-cv-ink/55">
        Showing <span className="text-cv-ink tabular-nums">{filtered.length}</span> of <span className="tabular-nums">{integrationsData.length}</span> integrations
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((i) => (
          <button
            key={i.id}
            onClick={() => setActive(i)}
            className="group text-left p-5 rounded-xl border border-cv-line/40 bg-cv-card dark:bg-[#0D0D0D] hover:border-cv-blue/40 transition-all"
            data-testid={`card-integration-${i.id}`}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3 min-w-0">
                <IntegrationLogo name={i.name} logo={i.logo} size={22} />
                <h3 className="text-[15px] font-semibold text-cv-ink truncate">{i.name}</h3>
              </div>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded border whitespace-nowrap ${STATUS_STYLE[i.status]}`}>
                {i.status}
              </span>
            </div>
            <p className="text-sm text-cv-ink/65 line-clamp-2 leading-relaxed min-h-[40px]">{i.short}</p>
            <div className="flex items-center gap-1.5 flex-wrap mt-4">
              <span className="text-[11px] text-cv-ink/45 uppercase tracking-wider">{i.category}</span>
              {i.products?.map((p) => (
                <span key={p} className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${PRODUCT_STYLE[p]}`}>
                  {p}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 rounded-xl border border-dashed border-cv-line/40">
          <p className="text-cv-ink/55">No integrations match those filters.</p>
          <button
            onClick={() => { setQ(""); setCat("All"); setStatus("All"); setMod("All"); }}
            className="mt-3 text-sm text-cv-blue dark:text-cv-blue-light hover:text-cv-ink"
          >
            Reset filters
          </button>
        </div>
      )}

      {/* Drawer */}
      {active && <Drawer integration={active} onClose={() => setActive(null)} />}
    </>
  );
}

function FilterRow({ label, options, value, onChange, testidPrefix }: {
  label: string; options: readonly string[]; value: string; onChange: (v: string) => void; testidPrefix: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-[11px] uppercase tracking-widest text-cv-ink/50 font-medium">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`px-4 py-2 text-sm rounded-full border transition-all ${
              value === o
                ? "bg-cv-ink text-cv-surface border-cv-ink font-medium"
                : "bg-transparent border-cv-line/40 text-cv-ink/70 hover:border-cv-line/70 hover:text-cv-ink"
            }`}
            data-testid={`${testidPrefix}-${o.toLowerCase().replace(/\s+/g, "-")}`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function SelectFilter({ label, options, value, onChange, testidPrefix }: {
  label: string; options: readonly string[]; value: string; onChange: (v: string) => void; testidPrefix: string;
}) {
  return (
    <div className="flex flex-col gap-3 lg:items-end">
      <div className="text-[11px] uppercase tracking-widest text-cv-ink/50 font-medium">{label}</div>
      <div className="relative w-full lg:w-40">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none px-4 py-2 pr-9 text-sm rounded-full border border-cv-line/40 bg-transparent text-cv-ink focus:outline-none focus:border-cv-blue/60 transition-colors"
          data-testid={`${testidPrefix}-select`}
        >
          {options.map((o) => (
            <option key={o} value={o} className="bg-cv-surface text-cv-ink">
              {o}
            </option>
          ))}
        </select>
        <AltArrowDown
          weight="Linear"
          size={14}
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-cv-ink/50"
        />
      </div>
    </div>
  );
}

function Drawer({ integration, onClose }: { integration: Integration; onClose: () => void }) {
  return (
    <>
      <div
        className="fixed inset-0 bg-cv-surface/60 backdrop-blur-sm z-40 animate-in fade-in"
        onClick={onClose}
        data-testid="drawer-backdrop"
      />
      <aside
        className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-cv-surface2 dark:bg-[#0D0D0D] border-l border-cv-line/40 z-50 overflow-y-auto shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label={`${integration.name} integration details`}
        data-testid="drawer-integration"
      >
        {/* Header */}
        <div className="sticky top-0 bg-cv-surface2/95 dark:bg-[#0D0D0D]/95 backdrop-blur border-b border-cv-line/40 p-5 sm:p-6 flex items-start justify-between gap-4 z-10">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <IntegrationLogo name={integration.name} logo={integration.logo} size={32} />
              <h2 className="font-display text-xl font-semibold text-cv-ink truncate">{integration.name}</h2>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${STATUS_STYLE[integration.status]}`}>
                {integration.status}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-cv-ink/45">{integration.category}</span>
              {integration.products?.map((p) => (
                <span key={p} className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${PRODUCT_STYLE[p]}`}>
                  {p}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-cv-ink/55 hover:text-cv-ink shrink-0 mt-1 p-1 -m-1"
            aria-label="Close"
            data-testid="button-close-drawer"
          >
            <CloseCircle weight="Linear" size={20} />
          </button>
        </div>

        <div className="px-5 sm:px-6 py-5">
          <p className="text-sm text-cv-ink/75 leading-relaxed">{integration.short}</p>
        </div>

        {/* Documentation CTA (the click that goes into docs) */}
        {integration.setup.docsUrl && (
          <div className="px-5 sm:px-6 pb-5">
            <Link
              href={integration.setup.docsUrl}
              className="flex items-center justify-between gap-3 rounded-lg border border-cv-blue/40 bg-cv-blue/10 hover:bg-cv-blue/15 transition-colors p-4"
              data-testid={`link-docs-${integration.id}`}
            >
              <div>
                <div className="text-[11px] uppercase tracking-widest text-cv-blue dark:text-cv-blue-light mb-1">Setup documentation</div>
                <div className="text-sm text-cv-ink font-medium">Read the {integration.name} setup guide</div>
              </div>
              <SquareArrowRightUp weight="Linear" size={18} className="text-cv-blue dark:text-cv-blue-light shrink-0" />
            </Link>
          </div>
        )}

        <div className="divide-y divide-white/10">
          <Section title="What we ingest">
            <BulletList items={integration.whatWeIngest.slice(0, 5)} />
          </Section>
          <Section title="What it unlocks">
            <BulletList items={integration.outputs.slice(0, 5)} />
          </Section>
          <Section title="Setup requirements">
            <div className="rounded-xl border border-cv-line/40 bg-cv-card dark:bg-[#0D0D0D] p-4 sm:p-5 space-y-4">
              <Field label="Method" value={integration.setup.method} />
              <Field label="Time to value" value={integration.setup.timeToValue} />
              <Field label="Permissions" value={integration.setup.permissions} />
            </div>
          </Section>
          <div className="px-5 sm:px-6 py-5">
            <Link
              href={`/connect?integration=${encodeURIComponent(integration.name)}`}
              className="cv-btn-primary w-full justify-center"
              data-testid={`link-request-${integration.id}`}
            >
              Request {integration.name} access <ArrowRight weight="Linear" size={16} />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="px-5 sm:px-6 py-5">
      <h3 className="text-[11px] uppercase tracking-widest text-cv-ink/50 mb-3">{title}</h3>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 text-sm text-cv-ink/75 leading-6">
          <span className="text-cv-blue dark:text-cv-blue-light shrink-0 mt-0.5">•</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-cv-ink/45 mb-1">{label}</div>
      <p className="text-sm text-cv-ink">{value}</p>
    </div>
  );
}
