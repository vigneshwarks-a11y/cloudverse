"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { IconUpload, IconFileText, IconCircleCheck, IconAlertTriangle, IconSparkles, IconX } from "@tabler/icons-react";
import Link from "next/link";

type Result = {
  score: number;
  currency: string;
  totalSpend: number;
  billingPeriodStart: string;
  billingPeriodEnd: string;
  providerDetected: string;
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

type State = "idle" | "processing" | "gate" | "result" | "error";

const ACCEPTED = ".csv,.txt,text/csv,text/plain";
const MAX_MB = 5;

export function InvoiceEfficiency({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [drag, setDrag] = useState(false);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", workEmail: "", company: "" });
  const fileRef = useRef<HTMLInputElement>(null);

  const process = useCallback(async (file: File) => {
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (![".csv", ".txt"].includes(ext)) {
      setError("Unsupported file type. CSV or TXT only.");
      setState("error");
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setError(`File too large. Max ${MAX_MB}MB.`);
      setState("error");
      return;
    }
    setState("processing");
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/parse-invoice", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");
      setResult(data);
      setState("gate");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Analysis failed");
      setState("error");
    }
  }, []);

  const reset = () => {
    setState("idle");
    setResult(null);
    setError("");
    setModal(false);
    setForm({ firstName: "", lastName: "", workEmail: "", company: "" });
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleGate = (e: React.FormEvent) => {
    e.preventDefault();
    setState("result");
    setModal(true);
  };

  const fmt = (n: number, c: string) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: c || "USD", maximumFractionDigits: 0 }).format(n);

  const input = "w-full bg-cv-surface2 border border-cv-line rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cv-blue/40 focus:border-cv-blue transition-all text-cv-ink placeholder:text-cv-muted/60";

  return (
    <section className={`${compact ? "py-12 sm:py-16" : "py-14 sm:py-20 lg:py-24"} bg-cv-surface`} data-testid="section-invoice-efficiency">
      <div className="cv-container">
        <div className="max-w-md mx-auto">
            {state === "idle" && (
              <div
                onClick={() => fileRef.current?.click()}
                onDrop={(e) => {
                  e.preventDefault();
                  setDrag(false);
                  const f = e.dataTransfer.files[0];
                  if (f) process(f);
                }}
                onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
                onDragLeave={() => setDrag(false)}
                role="button"
                tabIndex={0}
                aria-label="Upload invoice"
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && fileRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                  drag
                    ? "border-cv-blue bg-cv-blue/10"
                    : "border-cv-line hover:border-cv-blue/60 hover:bg-cv-blue/5"
                }`}
                data-testid="upload-dropzone"
              >
                <IconUpload className="w-10 h-10 mx-auto mb-4 text-cv-muted" stroke={1} />
                <p className="text-base font-medium text-cv-ink mb-1">
                  Drop invoice here or click to upload
                </p>
                <p className="text-sm text-cv-muted">CSV or TXT · max {MAX_MB}MB</p>
                <input
                  ref={fileRef}
                  type="file"
                  accept={ACCEPTED}
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) process(f); }}
                  className="hidden"
                  data-testid="file-input"
                />
              </div>
            )}

            {state === "processing" && (
              <div className="border-2 border-cv-line rounded-2xl p-8 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-cv-blue/10 flex items-center justify-center">
                  <IconFileText className="w-7 h-7 text-[#1664C0] dark:text-[#7CB8F8] animate-pulse" stroke={1} />
                </div>
                <p className="text-base font-medium text-cv-ink mb-4">Analyzing invoice…</p>
                <div className="w-48 h-2 mx-auto bg-cv-line rounded-full overflow-hidden">
                  <div
                    className="h-full w-full bg-gradient-to-r from-cv-blue via-cv-purple to-cv-blue animate-shimmer"
                    style={{ backgroundSize: "200% 100%" }}
                  />
                </div>
              </div>
            )}

            {state === "gate" && (
              <div className="border-2 border-cv-blue/30 rounded-2xl p-6 bg-cv-surface2 text-left" data-testid="gate-form">
                <div className="text-center mb-5">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-500/15 flex items-center justify-center">
                    <IconCircleCheck className="w-6 h-6 text-emerald-500" stroke={1} />
                  </div>
                  <p className="text-base font-semibold text-cv-ink">Analysis complete</p>
                  <p className="text-sm text-cv-muted mt-1">Enter your details to view the snapshot.</p>
                </div>
                <form onSubmit={handleGate} className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <Field label="First name" required value={form.firstName} onChange={(v) => setForm({ ...form, firstName: v })} placeholder="John" className={input} testid="input-first-name" />
                    <Field label="Last name" required value={form.lastName} onChange={(v) => setForm({ ...form, lastName: v })} placeholder="Doe" className={input} testid="input-last-name" />
                  </div>
                  <Field label="Work email" required type="email" value={form.workEmail} onChange={(v) => setForm({ ...form, workEmail: v })} placeholder="john@company.com" className={input} testid="input-work-email" />
                  <Field label="Company" required value={form.company} onChange={(v) => setForm({ ...form, company: v })} placeholder="Acme Corp" className={input} testid="input-company" />
                  <button type="submit" className="cv-btn-primary w-full mt-2" data-testid="button-view-snapshot">
                    View my snapshot
                  </button>
                  <p className="text-[10px] text-cv-muted/70 text-center">
                    By submitting, you agree to our privacy policy.
                  </p>
                </form>
              </div>
            )}

            {state === "error" && (
              <div className="border-2 border-rose-500/30 rounded-2xl p-8 text-center bg-rose-500/5">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-rose-500/10 flex items-center justify-center">
                  <IconAlertTriangle className="w-7 h-7 text-rose-500" stroke={1} />
                </div>
                <p className="text-sm font-medium text-rose-500 mb-4" data-testid="error-message">{error}</p>
                <button onClick={reset} className="cv-btn-ghost" data-testid="button-try-again">Try again</button>
              </div>
            )}

            {state === "result" && result && (
              <div className="border-2 border-emerald-500/30 rounded-2xl p-6 bg-emerald-500/5">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <IconCircleCheck className="w-5 h-5 text-emerald-500" stroke={1} />
                  </div>
                  <div>
                    <p className="text-base font-medium text-cv-ink">Snapshot ready</p>
                    <p className="text-sm text-cv-muted">Efficiency score: {result.score}/100</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button onClick={() => setModal(true)} className="cv-btn-primary flex-1 justify-center" data-testid="button-view-snapshot-again">
                    <IconSparkles size={16} stroke={1} /> View snapshot
                  </button>
                  <button onClick={reset} className="cv-btn-ghost flex-1 justify-center" data-testid="button-upload-another">
                    Upload another
                  </button>
                </div>
              </div>
            )}
        </div>
      </div>

      {modal && result && <ResultsModal result={result} fmt={fmt} onClose={() => setModal(false)} />}
    </section>
  );
}

function Field({
  label, value, onChange, type = "text", placeholder, required, className, testid,
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; required?: boolean; className: string; testid: string;
}) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-medium text-cv-muted uppercase tracking-wider">{label}</label>
      <input
        type={type} required={required} placeholder={placeholder}
        value={value} onChange={(e) => onChange(e.target.value)}
        className={className} data-testid={testid}
      />
    </div>
  );
}

function ResultsModal({
  result, fmt, onClose,
}: { result: Result; fmt: (n: number, c: string) => string; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prev?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-cv-surface/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in"
      onClick={onClose}
      data-testid="modal-results"
      role="dialog"
      aria-modal="true"
      aria-labelledby="snapshot-modal-title"
    >
      <div
        className="w-full sm:max-w-3xl max-h-[92vh] sm:max-h-[88vh] overflow-y-auto bg-cv-surface border border-cv-line rounded-t-2xl sm:rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-cv-surface/95 backdrop-blur border-b border-cv-line p-5 sm:p-6 flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-cv-muted">Efficiency snapshot</p>
            <h3 id="snapshot-modal-title" className="text-lg sm:text-xl font-semibold text-cv-ink mt-1">
              {result.providerDetected} · {result.billingPeriodStart} → {result.billingPeriodEnd}
            </h3>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close snapshot"
            className="p-2 text-cv-muted hover:text-cv-ink rounded-md focus:outline-none focus:ring-2 focus:ring-cv-blue/50"
          >
            <IconX size={20} stroke={1} />
          </button>
        </div>

        <div className="p-5 sm:p-7 space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <Stat label="Efficiency score" value={`${result.score}`} sub="out of 100" big />
            <Stat label="Total invoice" value={fmt(result.totalSpend, result.currency)} sub={result.providerDetected} big />
          </div>

          <div className="rounded-xl border border-cv-blue/40 bg-cv-blue/10 p-5">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#1664C0] dark:text-[#7CB8F8] mb-1">Estimated savings potential</p>
            <p className="text-2xl font-semibold text-cv-ink tabular-nums">
              {result.optimizationPotentialMin}% – {result.optimizationPotentialMax}%
            </p>
          </div>

          {result.topServices.length > 0 && (
            <Block title="Top services by spend">
              <div className="space-y-2">
                {result.topServices.slice(0, 6).map((s) => (
                  <div key={s.name} className="flex items-center gap-3">
                    <div className="text-cv-ink text-sm w-32 sm:w-40 truncate">{s.name}</div>
                    <div className="flex-1 h-5 rounded bg-cv-line/40 overflow-hidden">
                      <div className="h-full bg-cv-blue" style={{ width: `${s.percent}%` }} />
                    </div>
                    <div className="text-cv-ink tabular-nums text-sm w-20 sm:w-24 text-right">{fmt(s.spend, result.currency)}</div>
                  </div>
                ))}
              </div>
            </Block>
          )}

          {result.savingsOpportunities.length > 0 && (
            <Block title="Savings opportunities">
              <div className="space-y-3">
                {result.savingsOpportunities.map((o) => (
                  <div key={o.service} className="rounded-lg border border-cv-line bg-cv-surface2 p-4">
                    <div className="flex justify-between gap-3 mb-2">
                      <div className="text-cv-ink font-medium">{o.service}</div>
                      <div className="text-[#1664C0] dark:text-[#7CB8F8] tabular-nums font-medium text-sm shrink-0">
                        ~{fmt(o.estimatedSavingsAmount, result.currency)} / {o.estimatedSavingsPercent}%
                      </div>
                    </div>
                    <div className="text-cv-muted text-sm">{o.action}</div>
                  </div>
                ))}
              </div>
            </Block>
          )}

          {result.insights.length > 0 && (
            <Block title="Recommendations">
              <ul className="space-y-3">
                {result.insights.map((i, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <IconCircleCheck size={18} stroke={1} className="text-[#1664C0] dark:text-[#7CB8F8] shrink-0 mt-0.5" />
                    <span className="text-cv-ink/85 text-[15px]">{i}</span>
                  </li>
                ))}
              </ul>
            </Block>
          )}
        </div>

        <div className="sticky bottom-0 bg-cv-surface/95 backdrop-blur border-t border-cv-line p-5 sm:p-6 flex flex-col sm:flex-row gap-3">
          <Link href="/connect" className="cv-btn-primary flex-1 justify-center" data-testid="link-results-demo">
            Talk to us about live cloud data
          </Link>
          <button onClick={onClose} className="cv-btn-ghost flex-1 justify-center">Close</button>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, sub, big = false }: { label: string; value: string; sub?: string; big?: boolean }) {
  return (
    <div className="rounded-xl border border-cv-line bg-cv-surface2 p-4 sm:p-5">
      <p className="text-[10px] uppercase tracking-[0.25em] text-cv-muted mb-1.5">{label}</p>
      <p className={`${big ? "text-3xl sm:text-4xl" : "text-xl"} font-semibold text-cv-ink tabular-nums`}>{value}</p>
      {sub && <p className="text-xs text-cv-muted mt-1">{sub}</p>}
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.25em] text-cv-muted mb-3">{title}</p>
      {children}
    </div>
  );
}
