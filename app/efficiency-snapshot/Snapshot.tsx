"use client";

import { useState } from "react";
import { Upload, Sparkles, AlertCircle, CheckCircle2, FileText, Loader2 } from "lucide-react";
import { CTABand } from "@/components/CTABand";

type Result = {
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
  savingsOpportunities: {
    service: string;
    currentSpend: number;
    estimatedSavingsPercent: number;
    estimatedSavingsAmount: number;
    action: string;
  }[];
  insights: string[];
};

export default function Snapshot() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  async function analyze(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/parse-invoice", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  const fmt = (n: number, c: string) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: c, maximumFractionDigits: 0 }).format(n);

  return (
    <>
      <section className="cv-hero-bg pt-[140px] pb-12 lg:pt-[160px] lg:pb-14 relative">
        <div className="cv-container relative z-10">
          <div className="cv-label mb-4">Efficiency snapshot</div>
          <h1 className="cv-h1 text-white max-w-3xl">
            Upload a cloud invoice. Get an <span className="text-cv-blue-light">actionable savings report</span> in 30 seconds.
          </h1>
          <p className="cv-body-lg mt-6 text-white/75 max-w-2xl">
            Drop in any AWS, Azure, GCP, Snowflake, or Databricks invoice (CSV or text). We surface your top savings opportunities — not just a chart of what you spent.
          </p>
        </div>
      </section>

      <section className="cv-section pt-0 bg-cv-surface">
        <div className="cv-container max-w-3xl">
          <form onSubmit={analyze} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <label
              htmlFor="file"
              className="flex flex-col items-center justify-center text-center p-10 rounded-xl border-2 border-dashed border-white/15 bg-white/[0.02] cursor-pointer hover:border-cv-blue/40 transition-colors"
            >
              <Upload size={28} className="text-cv-blue-light mb-3" />
              <div className="text-white font-medium">{file ? file.name : "Drop a CSV or text invoice"}</div>
              <div className="text-white/55 text-xs mt-1">CSV, TXT · up to 5 MB · processed in-memory</div>
              <input
                id="file"
                type="file"
                accept=".csv,.txt,text/csv,text/plain"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                data-testid="input-invoice"
              />
            </label>

            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={!file || loading}
                className="cv-btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="button-analyze"
              >
                {loading ? <><Loader2 size={16} className="animate-spin" /> Analyzing…</> : <><Sparkles size={16} /> Analyze invoice</>}
              </button>
              {file && !loading && (
                <button
                  type="button"
                  onClick={() => { setFile(null); setResult(null); setError(null); }}
                  className="cv-btn-ghost justify-center"
                >
                  Clear
                </button>
              )}
            </div>

            {error && (
              <div className="mt-5 flex items-start gap-3 rounded-lg border border-rose-500/30 bg-rose-500/10 p-4">
                <AlertCircle size={18} className="text-rose-400 shrink-0 mt-0.5" />
                <span className="text-rose-200 text-sm">{error}</span>
              </div>
            )}
          </form>

          {result && (
            <div className="mt-8 space-y-6" data-testid="result-card">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                <div className="flex flex-wrap items-end justify-between gap-6 mb-6">
                  <div>
                    <div className="cv-label mb-2">Efficiency score</div>
                    <div className="font-display font-bold text-white text-6xl tabular-nums">{result.score}</div>
                    <div className="text-white/55 text-sm mt-1">out of 100</div>
                  </div>
                  <div className="text-right">
                    <div className="cv-label mb-2">Total invoice</div>
                    <div className="font-display font-bold text-white text-3xl tabular-nums">
                      {fmt(result.totalSpend, result.currency)}
                    </div>
                    <div className="text-white/55 text-xs mt-1">
                      {result.providerDetected} · {result.billingPeriodStart} → {result.billingPeriodEnd}
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-cv-blue/40 bg-cv-blue/10 p-5">
                  <div className="cv-label mb-2" style={{ color: "#7CB8F8" }}>Estimated savings potential</div>
                  <div className="font-display font-bold text-white text-2xl tabular-nums">
                    {result.optimizationPotentialMin}% – {result.optimizationPotentialMax}%
                  </div>
                </div>
              </div>

              {result.topServices.length > 0 && (
                <Card title="Top services by spend">
                  <div className="space-y-2">
                    {result.topServices.map((s) => (
                      <div key={s.name} className="flex items-center gap-3">
                        <div className="text-white/85 text-sm w-40 truncate">{s.name}</div>
                        <div className="flex-1 h-6 rounded bg-white/8 overflow-hidden">
                          <div className="h-full bg-cv-blue" style={{ width: `${s.percent}%` }} />
                        </div>
                        <div className="text-white tabular-nums text-sm w-24 text-right">{fmt(s.spend, result.currency)}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {result.savingsOpportunities.length > 0 && (
                <Card title="Savings opportunities">
                  <div className="space-y-3">
                    {result.savingsOpportunities.map((o) => (
                      <div key={o.service} className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                        <div className="flex justify-between gap-3 mb-2">
                          <div className="text-white font-medium">{o.service}</div>
                          <div className="text-cv-blue-light tabular-nums font-medium text-sm shrink-0">
                            ~{fmt(o.estimatedSavingsAmount, result.currency)} / {o.estimatedSavingsPercent}%
                          </div>
                        </div>
                        <div className="text-white/70 text-sm">{o.action}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {result.insights.length > 0 && (
                <Card title="Recommendations">
                  <ul className="space-y-3">
                    {result.insights.map((i, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-cv-blue-light shrink-0 mt-0.5" />
                        <span className="text-white/80 text-[15px]">{i}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              {result.topLineItems.length > 0 && (
                <Card title="Top line items">
                  <div className="space-y-1.5">
                    {result.topLineItems.map((i, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2.5 rounded bg-white/[0.02] border border-white/8">
                        <div className="flex items-start gap-3 min-w-0">
                          <FileText size={14} className="text-white/45 shrink-0 mt-1" />
                          <div className="min-w-0">
                            <div className="text-white text-sm truncate">{i.displayName}</div>
                            <div className="text-white/45 text-[11px]">{i.service}</div>
                          </div>
                        </div>
                        <div className="text-white tabular-nums text-sm shrink-0 ml-3">{fmt(i.cost, result.currency)}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          )}
        </div>
      </section>

      <CTABand heading="Want this same analysis on live cloud data?" sub="Connect your account read-only — we'll surface the full picture in under 30 minutes." />
    </>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
      <div className="cv-label mb-5">{title}</div>
      {children}
    </div>
  );
}
