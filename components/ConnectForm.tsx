"use client";

/* The /connect qualification form — per docs/WEBSITE-IMPLEMENTATION.md §11.12:
   name, work email, company, a persona dropdown that routes the follow-up,
   an optional spend estimate, and what they want to fix. Submits to
   /api/book-demo (see that route for the TODO on real lead delivery).

   Minimal, no outer card chrome — fields sit directly on the hero canvas
   (each input carries its own hairline border, no wrapping box/shadow),
   with DESIGN.md's actual documented Label style (small, uppercase,
   tracked) instead of a heavier form-card treatment. cv-* tokens,
   theme-aware. */

import { useState } from "react";
import { AltArrowDown, CheckCircle, DangerTriangle } from "@/lib/solar-icons";

const ROLE_OPTIONS = [
  { value: "", label: "Select your role…" },
  { value: "finance-exec", label: "Finance / Executive (CFO, CIO)" },
  { value: "finops-platform", label: "FinOps / Platform Engineering" },
  { value: "data-ai", label: "Data / AI Engineering" },
  { value: "other", label: "Other" },
];

const SPEND_OPTIONS = [
  { value: "", label: "Prefer not to say" },
  { value: "under-50k", label: "Under $50k / month" },
  { value: "50k-250k", label: "$50k – $250k / month" },
  { value: "250k-1m", label: "$250k – $1M / month" },
  { value: "over-1m", label: "$1M+ / month" },
];

const FOCUS_OPTIONS = [
  { value: "", label: "Not sure yet" },
  { value: "cloud", label: "Cloud infrastructure costs" },
  { value: "ai", label: "AI / agent spend" },
  { value: "data", label: "Data & warehouse costs" },
  { value: "saas", label: "SaaS spend" },
];

type FormState = {
  firstName: string;
  lastName: string;
  workEmail: string;
  company: string;
  role: string;
  estimatedSpend: string;
  focus: string;
};

const EMPTY: FormState = {
  firstName: "",
  lastName: "",
  workEmail: "",
  company: "",
  role: "",
  estimatedSpend: "",
  focus: "",
};

const inputClass =
  "w-full bg-cv-surface2 dark:bg-white/[0.03] border border-cv-line rounded-lg px-3.5 py-2.5 text-sm text-cv-ink placeholder:text-cv-muted/70 outline-none transition-colors focus:border-cv-blue focus:ring-2 focus:ring-cv-blue/30";

function FieldLabel({ children, required, optional }: { children: React.ReactNode; required?: boolean; optional?: boolean }) {
  return (
    <label className="mb-1 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-cv-muted">
      {children}
      {required && <span className="text-cv-blue dark:text-cv-blue-light" aria-hidden>*</span>}
      {optional && <span className="normal-case font-normal text-cv-muted/70">(optional)</span>}
    </label>
  );
}

function Select({
  id, label, value, options, onChange, testid, optional,
}: {
  id: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
  testid: string;
  optional?: boolean;
}) {
  return (
    <div>
      <FieldLabel optional={optional}>{label}</FieldLabel>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} cursor-pointer appearance-none pr-9`}
          data-testid={testid}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <AltArrowDown weight="Linear" size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-cv-muted" />
      </div>
    </div>
  );
}

export function ConnectForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const set = (patch: Partial<FormState>) => setForm((f) => ({ ...f, ...patch }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/book-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong. Try again.");
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-cv-line/60 bg-cv-surface2 dark:bg-cv-card p-8 sm:p-10 text-center" data-testid="connect-form-success">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0E9E7A]/15">
          <CheckCircle weight="Linear" size={24} className="text-[#0E9E7A]" />
        </div>
        <div className="font-display text-cv-ink text-xl font-semibold mb-2">Request received</div>
        <p className="text-cv-ink/70 text-sm max-w-sm mx-auto">
          Someone from our solutions team will reach out within one business day to schedule your working session.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-cv-line/60 bg-cv-surface2 dark:bg-cv-card p-8 sm:p-10 space-y-4 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)] dark:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)]" data-testid="connect-form">
      <div className="mb-1">
        <div className="font-display text-cv-ink text-xl font-semibold">Request a demo</div>
        <p className="mt-1.5 text-sm text-cv-ink/60">No credit card. A 30-minute working session on your own data.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel required>First name</FieldLabel>
          <input required type="text" placeholder="John" value={form.firstName} onChange={(e) => set({ firstName: e.target.value })} className={inputClass} data-testid="input-first-name" />
        </div>
        <div>
          <FieldLabel required>Last name</FieldLabel>
          <input required type="text" placeholder="Doe" value={form.lastName} onChange={(e) => set({ lastName: e.target.value })} className={inputClass} data-testid="input-last-name" />
        </div>
      </div>

      <div>
        <FieldLabel required>Work email</FieldLabel>
        <input required type="email" placeholder="john@company.com" value={form.workEmail} onChange={(e) => set({ workEmail: e.target.value })} className={inputClass} data-testid="input-work-email" />
      </div>

      <div>
        <FieldLabel required>Company</FieldLabel>
        <input required type="text" placeholder="Acme Corp" value={form.company} onChange={(e) => set({ company: e.target.value })} className={inputClass} data-testid="input-company" />
      </div>

      <Select id="role" label="Your role" value={form.role} options={ROLE_OPTIONS} onChange={(v) => set({ role: v })} testid="select-role" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select id="focus" label="What do you want to fix?" optional value={form.focus} options={FOCUS_OPTIONS} onChange={(v) => set({ focus: v })} testid="select-focus" />
        <Select id="spend" label="Monthly spend" optional value={form.estimatedSpend} options={SPEND_OPTIONS} onChange={(v) => set({ estimatedSpend: v })} testid="select-spend" />
      </div>

      {status === "error" && (
        <div className="flex items-start gap-2 rounded-lg border border-[#E5484D]/30 bg-[#E5484D]/[0.06] px-3 py-2.5 text-sm text-[#E5484D]" role="alert" data-testid="connect-form-error">
          <DangerTriangle weight="Linear" size={16} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <button type="submit" disabled={status === "submitting"} className="cv-btn-primary mt-2 w-full justify-center px-7 py-4 text-sm disabled:opacity-60" data-testid="button-submit-demo">
        {status === "submitting" ? "Sending…" : "Request demo"}
      </button>

      <p className="text-cv-ink/60 text-xs text-center">
        Read-only by default. We never write to your accounts without an explicit opt-in.
      </p>
    </form>
  );
}

export default ConnectForm;
