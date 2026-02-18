import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/Button";
import { X, Cpu, Code2, Database, Tag } from "lucide-react";
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

const kpis = [
  { label: "Baseline Cost Shift", value: "-12%", subtext: "steady-state spend reduced" },
  { label: "Avoided Compute Demand", value: "18%", subtext: "demand prevented pre-production" },
  { label: "Blended Compute Rate", value: "-9%", subtext: "effective unit cost reduced" },
  { label: "Volatility Control", value: "-23%", subtext: "variance reduced across daily spend" },
];

const decisionPoints = [
  { label: "Model Choice", icon: Cpu },
  { label: "Engineering Change", icon: Code2 },
  { label: "Query Execution", icon: Database },
  { label: "Capacity Commitments", icon: Tag },
];

const economicChanges = [
  { label: "Baseline shifted down", delta: "-$41K/month" },
  { label: "Demand avoided", delta: "1.8M tokens + 420 vCPU-hrs" },
  { label: "Effective rate improved", delta: "-$0.012 per compute unit" },
  { label: "Spike risk contained", delta: "3 anomalies neutralized" },
];

const whereItHappened = [
  { label: "Model selection decisions", detail: "2 cheaper equivalents adopted" },
  { label: "Engineering changes", detail: "3 high-cost patterns corrected pre-release" },
  { label: "Warehouse execution", detail: "2 runaway queries contained" },
  { label: "Commitments", detail: "coverage increased +8% (optional automation)" },
];

export function EfficiencySnapshotModal({
  open,
  onOpenChange,
  result,
  onUploadAnother,
}: EfficiencySnapshotModalProps) {
  if (!result) return null;

  const dynamicKpis = [
    { label: "Baseline Cost Shift", value: `${result.optimizationPotentialMin}%`, subtext: "steady-state spend reduced" },
    { label: "Avoided Compute Demand", value: `${Math.round(result.computeSpendPercent / 2)}%`, subtext: "demand prevented pre-production" },
    { label: "Blended Compute Rate", value: `-${Math.round(result.onDemandPercent / 5)}%`, subtext: "effective unit cost reduced" },
    { label: "Volatility Control", value: `-${result.score > 70 ? 23 : 10}%`, subtext: "variance reduced across daily spend" },
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
            <DialogTitle className="text-lg font-semibold text-cv-ink">
              Economic Decision Snapshot
            </DialogTitle>
            <p className="text-xs text-cv-muted mt-0.5">
              Baseline, demand avoidance, effective rate, and volatility — in one view.
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
          {/* Section A — KPI Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {dynamicKpis.map((kpi, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-cv-surface2/50 dark:bg-white/5 border border-cv-line dark:border-white/10 text-center"
                data-testid={`kpi-tile-${idx}`}
              >
                <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">
                  {kpi.value}
                </p>
                <p className="text-xs font-semibold text-cv-ink mt-1">{kpi.label}</p>
                <p className="text-[10px] text-cv-muted mt-0.5">{kpi.subtext}</p>
              </div>
            ))}
          </div>

          {/* Section B — Decision Points Covered */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-cv-muted">
              Decision Points Covered
            </h3>
            <div className="flex flex-wrap gap-2">
              {decisionPoints.map((dp, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm font-medium text-blue-600 dark:text-blue-400"
                >
                  <dp.icon className="w-3.5 h-3.5" />
                  {dp.label}
                </span>
              ))}
            </div>
            <p className="text-xs text-cv-muted">
              CloudVerse applies economic intent where decisions are made — not after the invoice.
            </p>
          </div>

          {/* Section C — What Changed */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-cv-muted">
                Economic Changes Detected
              </h3>
              <ul className="space-y-3">
                {result.insights.map((insight, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                    <div>
                      <span className="text-cv-ink leading-tight block">{insight}</span>
                    </div>
                  </li>
                ))}
                {result.insights.length === 0 && economicChanges.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                    <div>
                      <span className="text-cv-ink">{item.label}</span>
                      <span className="ml-2 font-semibold text-green-600 dark:text-green-400">{item.delta}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-cv-muted">
                Where It Happened
              </h3>
              <ul className="space-y-3">
                {result.topServices.slice(0, 4).map((svc, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                    <div>
                      <span className="text-cv-ink">{svc.name}</span>
                      <span className="block text-xs text-cv-muted mt-0.5">
                        {svc.percent.toFixed(1)}% of total spend detected
                      </span>
                    </div>
                  </li>
                ))}
                {result.topServices.length === 0 && whereItHappened.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                    <div>
                      <span className="text-cv-ink">{item.label}</span>
                      <span className="block text-xs text-cv-muted mt-0.5">{item.detail}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 flex flex-col gap-3 p-6 border-t border-cv-line dark:border-white/10 bg-cv-surface dark:bg-cv-surface2">
          <p className="text-[10px] text-cv-muted text-center">
            {result.providerDetected !== "Other" ? `Analysis of ${result.providerDetected} environment.` : "Snapshot is illustrative. Full metrics are computed from connected environments."}
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
