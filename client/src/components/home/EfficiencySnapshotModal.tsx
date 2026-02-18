import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/Button";
import { X } from "lucide-react";
import { DEMO_URL } from "@/lib/links";
import { track } from "@/lib/track";

export interface AnalysisResult {
  score: number;
  currency: string;
  totalSpend: number;
  billingPeriodStart: string;
  billingPeriodEnd: string;
  providerDetected: string;
  lineItemCount: number;
  topAccountIdentifier?: string;
  topServices: { name: string; spend: number; percent: number }[];
  topRegions: { name: string; spend: number; percent: number }[];
  topLineItems: { displayName: string; service: string; quantity?: number; unit?: string; cost: number }[];
  computeSpendPercent: number;
  onDemandPercent: number;
  optimizationPotentialMin: number;
  optimizationPotentialMax: number;
  insights: string[];
}

interface EfficiencySnapshotModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result: AnalysisResult | null;
  onUploadAnother: () => void;
}

function fmt(n: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

function buildInsightsFromData(result: AnalysisResult): string[] {
  const lines: string[] = [];
  const c = result.currency || "USD";

  if (result.totalSpend > 0) {
    lines.push(`Total spend for the billing period: ${fmt(result.totalSpend, c)}`);
  }

  for (const svc of result.topServices) {
    if (svc.name && svc.percent > 0) {
      lines.push(`${svc.name} accounts for ${svc.percent.toFixed(1)}% of total spend (${fmt(svc.spend, c)})`);
    }
  }

  if (result.computeSpendPercent > 0) {
    lines.push(`Compute concentration: ${result.computeSpendPercent.toFixed(0)}% of total spend`);
  }

  if (result.onDemandPercent > 0) {
    lines.push(`Estimated on-demand usage: ${result.onDemandPercent.toFixed(0)}% of compute`);
  }

  if (result.optimizationPotentialMin > 0 || result.optimizationPotentialMax > 0) {
    lines.push(`Estimated savings potential: ${result.optimizationPotentialMin}% – ${result.optimizationPotentialMax}%`);
  }

  return lines;
}

export function EfficiencySnapshotModal({
  open,
  onOpenChange,
  result,
  onUploadAnother,
}: EfficiencySnapshotModalProps) {
  if (!result) return null;

  const insights = result.insights.length > 0 ? result.insights : buildInsightsFromData(result);

  const dynamicKpis = [
    {
      label: "Efficiency Score",
      value: `${result.score}/100`,
      subtext: result.score >= 70 ? "above average" : "improvement opportunity",
    },
    {
      label: "Total Spend",
      value: fmt(result.totalSpend, result.currency),
      subtext: `${result.billingPeriodStart} – ${result.billingPeriodEnd}`,
    },
    {
      label: "Compute Concentration",
      value: `${result.computeSpendPercent.toFixed(0)}%`,
      subtext: "of total spend on compute",
    },
    {
      label: "Savings Potential",
      value: `${result.optimizationPotentialMin}–${result.optimizationPotentialMax}%`,
      subtext: "estimated optimization range",
    },
  ];

  const handleBookDemo = () => {
    track("cta_demo", { location: "economic_snapshot_modal" });
    window.open(DEMO_URL, "_blank");
  };

  const handleUploadAnother = () => {
    onOpenChange(false);
    onUploadAnother();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[960px] w-[95vw] max-h-[90vh] overflow-y-auto p-0 gap-0 bg-cv-surface dark:bg-cv-surface2 border-cv-line dark:border-white/10">
        <DialogHeader className="sticky top-0 z-10 flex flex-row items-center justify-between px-6 py-4 border-b border-cv-line dark:border-white/10 bg-cv-surface dark:bg-cv-surface2">
          <div>
            <DialogTitle className="text-lg font-semibold text-cv-ink" data-testid="text-modal-title">
              Economic Decision Snapshot
            </DialogTitle>
            <p className="text-xs text-cv-muted mt-0.5">
              {result.providerDetected !== "Other" && result.providerDetected !== "Unknown"
                ? `${result.providerDetected} — ${result.lineItemCount} line items analyzed`
                : `${result.lineItemCount} line items analyzed`}
            </p>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="p-1.5 rounded-lg hover:bg-cv-surface2 dark:hover:bg-white/5 transition-colors"
            aria-label="Close"
            data-testid="button-close-modal"
          >
            <X className="w-5 h-5 text-cv-muted" />
          </button>
        </DialogHeader>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {dynamicKpis.map((kpi, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-cv-surface2/50 dark:bg-white/5 border border-cv-line dark:border-white/10 text-center"
                data-testid={`kpi-tile-${idx}`}
              >
                <p className={`text-xl sm:text-2xl font-bold ${idx === 0 && result.score >= 70 ? "text-green-600 dark:text-green-400" : idx === 0 ? "text-amber-600 dark:text-amber-400" : "text-cv-ink"}`}>
                  {kpi.value}
                </p>
                <p className="text-xs font-semibold text-cv-ink mt-1">{kpi.label}</p>
                <p className="text-[10px] text-cv-muted mt-0.5">{kpi.subtext}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-cv-muted">
                Analysis
              </h3>
              <ul className="space-y-3">
                {insights.map((insight, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                    <span className="text-cv-ink leading-tight">{insight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-cv-muted">
                Top Services by Spend
              </h3>
              <ul className="space-y-3">
                {result.topServices.map((svc, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                    <div>
                      <span className="text-cv-ink font-medium">{svc.name}</span>
                      <span className="block text-xs text-cv-muted mt-0.5">
                        {fmt(svc.spend, result.currency)} — {(svc.percent || 0).toFixed(1)}% of total
                      </span>
                    </div>
                  </li>
                ))}
                {result.topServices.length === 0 && (
                  <li className="text-sm text-cv-muted">No service breakdown available</li>
                )}
              </ul>

              {result.topLineItems.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-cv-muted">
                    Top Line Items
                  </h4>
                  {result.topLineItems.filter(li => li.cost > 0).slice(0, 3).map((li, idx) => (
                    <div key={idx} className="flex justify-between text-xs text-cv-ink">
                      <span className="truncate mr-2">{li.displayName}</span>
                      <span className="font-medium flex-shrink-0">{fmt(li.cost, result.currency)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 flex flex-col gap-3 p-6 border-t border-cv-line dark:border-white/10 bg-cv-surface dark:bg-cv-surface2">
          <p className="text-[10px] text-cv-muted text-center">
            {result.providerDetected !== "Other" && result.providerDetected !== "Unknown"
              ? `Analysis of ${result.providerDetected} environment.`
              : "Analysis based on uploaded invoice data."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleBookDemo}
              className="flex-1"
              data-testid="button-modal-book-demo"
            >
              Book a demo
            </Button>
            <Button
              variant="secondary"
              onClick={handleUploadAnother}
              className="flex-1"
              data-testid="button-modal-upload-another"
            >
              Run another snapshot
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
