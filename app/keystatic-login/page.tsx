"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeClosed } from "@/lib/solar-icons";

const inputClass =
  "w-full bg-cv-surface2 dark:bg-white/[0.03] border border-cv-line rounded-lg px-3.5 py-2.5 pr-11 text-sm text-cv-ink placeholder:text-cv-muted/70 outline-none transition-colors focus:border-cv-blue focus:ring-2 focus:ring-cv-blue/30";

function KeystaticLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/keystatic-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong. Try again.");
      router.replace(searchParams.get("redirect") || "/keystatic");
      router.refresh();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center px-5">
      <div className="w-full max-w-sm rounded-2xl border border-cv-line/60 bg-cv-surface2 dark:bg-[#0D0D0D] p-8">
        <h1 className="cv-h3 text-cv-ink">Keystatic admin</h1>
        <p className="cv-body mt-2 text-cv-ink/65 text-sm">Enter the admin password to manage site content.</p>

        <form onSubmit={handleSubmit} className="mt-6">
          <label htmlFor="keystatic-password" className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-cv-muted">
            Password
          </label>
          <div className="relative">
            <input
              id="keystatic-password"
              type={showPassword ? "text" : "password"}
              required
              autoFocus
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="••••••••"
              className={inputClass}
              data-testid="input-keystatic-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-cv-muted hover:text-cv-ink transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
              data-testid="button-toggle-password-visibility"
            >
              {showPassword ? <EyeClosed weight="Linear" size={18} /> : <Eye weight="Linear" size={18} />}
            </button>
          </div>

          {status === "error" && <p className="mt-2 text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={status === "submitting" || !password}
            className="cv-btn-primary w-full justify-center px-5 py-3 mt-6 disabled:opacity-50 disabled:pointer-events-none"
            data-testid="button-keystatic-login"
          >
            {status === "submitting" ? "Checking…" : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function KeystaticLoginPage() {
  return <KeystaticLoginForm />;
}
