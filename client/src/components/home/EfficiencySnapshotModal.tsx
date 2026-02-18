import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/Button";
import { X, TrendingDown } from "lucide-react";
import { DEMO_URL } from "@/lib/links";
import { track } from "@/lib/track";

export interface SavingsOpportunity {
  service: string;
  currentSpend: number;
  estimatedSavingsPercent: number;
  estimatedSavingsAmount: number;
  action: string;
}

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
  savingsOpportunities: SavingsOpportunity[];
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

export function EfficiencySnapshotModal({
  open,
  onOpenChange,
  result,
  onUploadAnother,
}: EfficiencySnapshotModalProps) {
  if (!result) return null;

  const totalEstimatedSavings = (result.savingsOpportunities || []).reduce(
    (sum, o) => sum + (o.estimatedSavingsAmount || 0),
    0
  );

  const dynamicKpis = [
    {
      label: "Efficiency Score",
      value: `${result.score}/100`,
      subtext: result.score >= 70 ? "above average" : "optimization opportunity",
    },
    {
      label: "Total Spend",
      value: fmt(result.totalSpend, result.currency),
      subtext: `${result.billingPeriodStart} to ${result.billingPeriodEnd}`,
    },
    {
      label: "Estimated Savings",
      value: totalEstimatedSavings > 0 ? fmt(totalEstimatedSavings, result.currency) : `${result.optimizationPotentialMin}–${result.optimizationPotentialMax}%`,
      subtext: totalEstimatedSavings > 0 ? "potential monthly savings" : "estimated savings range",
    },
    {
      label: "On-Demand Exposure",
      value: `${result.onDemandPercent}%`,
      subtext: "of compute without commitments",
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

  const opportunities = result.savingsOpportunities || [];

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
                <p className={`text-xl sm:text-2xl font-bold ${
                  idx === 0 && result.score >= 70
                    ? "text-green-600 dark:text-green-400"
                    : idx === 0
                    ? "text-amber-600 dark:text-amber-400"
                    : idx === 2
                    ? "text-green-600 dark:text-green-400"
                    : "text-cv-ink"
                }`}>
                  {kpi.value}
                </p>
                <p className="text-xs font-semibold text-cv-ink mt-1">{kpi.label}</p>
                <p className="text-[10px] text-cv-muted mt-0.5">{kpi.subtext}</p>
              </div>
            ))}
          </div>

          {opportunities.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-cv-muted">
                Where You Can Save — By Service
              </h3>
              <div className="space-y-2">
                {opportunities.map((opp, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-cv-surface2/50 dark:bg-white/5 border border-cv-line dark:border-white/10"
                    data-testid={`savings-opportunity-${idx}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <TrendingDown className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm font-semibold text-cv-ink">{opp.service}</span>
                        </div>
                        <p className="text-xs text-cv-muted mt-1.5 leading-relaxed">{opp.action}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-lg font-bold text-green-600 dark:text-green-400">
                          {fmt(opp.estimatedSavingsAmount, result.currency)}
                        </p>
                        <p className="text-[10px] text-cv-muted">
                          ~{opp.estimatedSavingsPercent}% of {fmt(opp.currentSpend, result.currency)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {totalEstimatedSavings > 0 && (
                <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20">
                  <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                    Total Estimated Savings
                  </span>
                  <span className="text-lg font-bold text-green-700 dark:text-green-400">
                    {fmt(totalEstimatedSavings, result.currency)}/mo
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-cv-muted">
              Recommendations
            </h3>
            <ul className="space-y-3">
              {result.insights.map((insight, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                  <span className="text-cv-ink leading-relaxed">{insight}</span>
                </li>
              ))}
              {result.insights.length === 0 && opportunities.length === 0 && (
                <li className="text-sm text-cv-muted">
                  Upload a more detailed invoice for specific recommendations.
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="sticky bottom-0 flex flex-col gap-3 p-6 border-t border-cv-line dark:border-white/10 bg-cv-surface dark:bg-cv-surface2">
          <p className="text-[10px] text-cv-muted text-center">
            {result.providerDetected !== "Other" && result.providerDetected !== "Unknown"
              ? `Analysis of ${result.providerDetected} environment. Estimates are directional — connect your environment for precise recommendations.`
              : "Estimates are directional — connect your environment for precise recommendations."}
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
