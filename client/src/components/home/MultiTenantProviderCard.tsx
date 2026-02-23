import { Layers } from "lucide-react";

export function MultiTenantProviderCard() {
  return (
    <div className="relative group" data-testid="multi-tenant-provider-card">
      {/* Outer Glows */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>
      
      {/* Main Card */}
      <div className="relative bg-cv-surface/80 dark:bg-slate-900/90 backdrop-blur-xl border border-cv-line dark:border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-cv-line dark:border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <Layers className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-cv-ink">Provider Console</h4>
              <p className="text-[10px] text-cv-muted font-medium uppercase tracking-wider">Last sync: 2m ago</p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-cv-surface2 dark:bg-white/5 border border-cv-line dark:border-white/10 text-[10px] font-medium text-cv-muted">
            Multi-tenant
          </span>
        </div>

        {/* Content Area */}
        <div className="p-6 space-y-6">
          {/* KPI Tiles */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Tenants", value: "24" },
              { label: "Active Orgs", value: "186" },
              { label: "Isolation", value: "Strict" },
            ].map((kpi, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-cv-surface2/50 dark:bg-white/[0.03] border border-cv-line dark:border-white/5 text-center">
                <p className="text-[10px] text-cv-muted uppercase tracking-wider mb-1">{kpi.label}</p>
                <p className="text-sm font-bold text-cv-ink">{kpi.value}</p>
              </div>
            ))}
          </div>

          {/* Mini Table */}
          <div className="space-y-3">
            <div className="grid grid-cols-3 px-2 text-[10px] text-cv-muted font-semibold uppercase tracking-wider">
              <span>Tenant</span>
              <span className="text-center">Coverage</span>
              <span className="text-right">Exposure</span>
            </div>
            <div className="space-y-2">
              {[
                { name: "Enterprise A", coverage: "AWS + Azure", exposure: "Stable", status: "success" },
                { name: "Enterprise B", coverage: "AWS + GCP", exposure: "Watch", status: "warning" },
                { name: "Enterprise C", coverage: "Azure + Snowflake", exposure: "Stable", status: "success" },
              ].map((row, idx) => (
                <div key={idx} className="grid grid-cols-3 items-center px-3 py-2.5 rounded-lg bg-cv-surface2/30 dark:bg-white/[0.02] border border-cv-line dark:border-white/5">
                  <span className="text-xs font-medium text-cv-ink truncate">{row.name}</span>
                  <span className="text-[10px] text-cv-muted text-center">{row.coverage}</span>
                  <span className={`text-[10px] font-bold text-right ${
                    row.status === 'success' ? 'text-green-600/70 dark:text-green-400/60' : 'text-amber-600/70 dark:text-amber-400/60'
                  }`}>
                    {row.exposure}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Chips */}
          <div className="flex flex-wrap gap-2 pt-2">
            {["Org → Team → Keys", "Audit Trails", "Policy Controls", "Portfolio View"].map((chip, idx) => (
              <span key={idx} className="px-2 py-1 rounded-md bg-cv-surface2 dark:bg-white/5 text-[9px] font-medium text-cv-muted border border-cv-line dark:border-white/10">
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
