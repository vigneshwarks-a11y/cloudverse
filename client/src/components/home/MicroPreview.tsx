import { cn } from "@/lib/utils";

interface MicroPreviewProps {
  variant: "connect" | "normalize" | "automate";
}

export function MicroPreview({ variant }: MicroPreviewProps) {
  if (variant === "connect") {
    return (
      <div className="w-full h-full rounded-xl border border-cv-line p-4 overflow-hidden flex flex-col gap-3 bg-white dark:bg-black">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
            <span className="text-[10px] font-medium text-cv-muted uppercase tracking-wider">AWS Production</span>
          </div>
          <span className="text-[10px] text-cv-muted">Connected</span>
        </div>
        <div className="space-y-2">
          <div className="h-1.5 w-full bg-cv-surface2/50 dark:bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-[65%] bg-blue-500/50" />
          </div>
          <div className="flex justify-between items-center text-[9px]">
            <span className="text-cv-muted">Syncing billing data...</span>
            <span className="text-blue-400">88%</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-1">
          <div className="p-2 rounded-lg bg-cv-surface2/50 dark:bg-white/5 border border-cv-line space-y-1">
            <div className="text-[8px] text-cv-muted uppercase">Latency</div>
            <div className="text-xs font-semibold text-cv-muted">142ms</div>
          </div>
          <div className="p-2 rounded-lg bg-cv-surface2/50 dark:bg-white/5 border border-cv-line space-y-1">
            <div className="text-[8px] text-cv-muted uppercase">Status</div>
            <div className="text-xs font-semibold text-green-400/80">Active</div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "normalize") {
    return (
      <div className="w-full h-full rounded-xl border border-cv-line p-4 overflow-hidden flex flex-col gap-2.5 bg-white dark:bg-black">
        <div className="text-[10px] font-medium text-cv-muted uppercase tracking-wider mb-1">Cost Dimensions</div>
        <div className="space-y-2">
          {[
            { label: "Environment", value: "Production", color: "bg-blue-500" },
            { label: "Team", value: "Platform Engineering", color: "bg-purple-500" },
            { label: "Service", value: "Auth-API", color: "bg-cyan-500" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-1.5 rounded-lg bg-cv-surface2/50 dark:bg-white/5 border border-cv-surface2/50 dark:border-white/5">
              <div className="flex items-center gap-2">
                <div className={cn("w-1 h-3 rounded-full", item.color)} />
                <span className="text-[10px] text-cv-muted">{item.label}</span>
              </div>
              <span className="text-[10px] font-medium text-cv-muted">{item.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-auto pt-2 flex items-center justify-center gap-1">
          <div className="w-1 h-1 rounded-full bg-cv-muted/30" />
          <div className="w-1 h-1 rounded-full bg-cv-muted/50" />
          <div className="w-1 h-1 rounded-full bg-cv-muted/30" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-xl border border-cv-line p-3 sm:p-4 overflow-hidden flex flex-col gap-2 sm:gap-3 bg-white dark:bg-black">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium text-cv-muted uppercase tracking-wider">Anomalies</span>
        <div className="px-1.5 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-[8px] text-red-400 uppercase font-bold">Alert</div>
      </div>
      <div className="relative h-12 sm:h-16 w-full mt-1">
        <svg className="w-full h-full" viewBox="0 0 100 40">
          <path
            d="M0 35 L20 32 L40 34 L60 10 L80 15 L100 8"
            fill="none"
            stroke="rgba(239, 68, 68, 0.5)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M0 35 L20 32 L40 34 L60 10 L80 15 L100 8 V40 H0 Z"
            fill="url(#gradient-red)"
            className="opacity-20"
          />
          <defs>
            <linearGradient id="gradient-red" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <circle cx="60" cy="10" r="2" fill="#ef4444" />
        </svg>
      </div>
      <div className="space-y-1 mt-1">
        <div className="text-[10px] font-semibold text-cv-ink">Unexpected Spike Detected</div>
        <div className="text-[9px] text-cv-muted">EC2 usage increased by 42% in us-east-1</div>
      </div>
    </div>
  );
}
