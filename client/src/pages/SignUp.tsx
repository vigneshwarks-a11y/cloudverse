import { BaseLayout } from "@/layouts/BaseLayout";
import { Button } from "@/components/Button";
import { track } from "@/lib/track";
import { useState } from "react";
import { CheckCircle2, Zap, Shield, BarChart3, Clock } from "lucide-react";

export default function SignUp() {
  const [name, setName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");

  const personalDomains = [
    "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com",
    "icloud.com", "mail.com", "protonmail.com", "zoho.com", "yandex.com",
  ];

  const validateWorkEmail = (email: string) => {
    const domain = email.split("@")[1]?.toLowerCase();
    if (!domain) return false;
    return !personalDomains.includes(domain);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateWorkEmail(workEmail)) {
      setEmailError("Please use your work email, not a personal email.");
      return;
    }
    setEmailError("");
    track("trial_request", { name, workEmail });
    setSubmitted(true);
  };

  const inputClass =
    "w-full bg-cv-surface2 border border-cv-line rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-cv-ink placeholder:text-cv-muted/50";

  const benefits = [
    { icon: Zap, text: "Full platform access for 14 days" },
    { icon: BarChart3, text: "Multi-cloud cost visibility from day one" },
    { icon: Shield, text: "No credit card required" },
    { icon: Clock, text: "Set up in under 5 minutes" },
  ];

  return (
    <BaseLayout>
      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-500 mb-4">
              Start Free Trial
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-cv-ink leading-tight mb-6">
              See what your cloud spend is really doing
            </h1>
            <p className="text-lg text-cv-muted leading-relaxed mb-10 max-w-lg">
              Get full access to CloudVerse™ — the compute economics platform that gives engineering and finance teams visibility, control, and savings across every cloud.
            </p>

            <div className="space-y-5">
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <div key={idx} className="flex items-center gap-4" data-testid={`benefit-${idx}`}>
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-blue-500" />
                    </div>
                    <p className="text-cv-ink font-medium">{benefit.text}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 pt-8 border-t border-cv-line">
              <p className="text-sm text-cv-muted mb-3">Trusted by teams managing cloud spend at</p>
              <div className="flex flex-wrap items-center gap-6 opacity-60">
                <span className="text-sm font-semibold text-cv-ink">Fortune 500</span>
                <span className="text-cv-line">|</span>
                <span className="text-sm font-semibold text-cv-ink">Series A–D startups</span>
                <span className="text-cv-line">|</span>
                <span className="text-sm font-semibold text-cv-ink">Gov & enterprise</span>
              </div>
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="rounded-2xl border border-green-500/30 bg-green-500/5 p-10 text-center" data-testid="signup-success">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-cv-ink mb-3">You're on the list</h2>
                <p className="text-cv-muted leading-relaxed mb-6">
                  We'll send trial access details to <strong className="text-cv-ink">{workEmail}</strong> shortly. Check your inbox.
                </p>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSubmitted(false);
                    setName("");
                    setWorkEmail("");
                  }}
                  data-testid="button-signup-another"
                >
                  Sign up another teammate
                </Button>
              </div>
            ) : (
              <div className="rounded-2xl border border-cv-line bg-cv-surface p-8 sm:p-10 shadow-lg relative overflow-hidden" data-testid="signup-form-card">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
                <div className="relative">
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-cv-ink mb-2">Request trial access</h2>
                    <p className="text-sm text-cv-muted">No credit card. No commitment. Just clarity on your cloud costs.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5" data-testid="signup-form">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-cv-muted uppercase tracking-wider">Full Name</label>
                      <input
                        type="text"
                        placeholder="Jane Smith"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={inputClass}
                        data-testid="input-signup-name"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-cv-muted uppercase tracking-wider">Work Email</label>
                      <input
                        type="email"
                        placeholder="jane@company.com"
                        required
                        value={workEmail}
                        onChange={(e) => {
                          setWorkEmail(e.target.value);
                          if (emailError) setEmailError("");
                        }}
                        className={inputClass}
                        data-testid="input-signup-email"
                      />
                      {emailError && (
                        <p className="text-red-500 text-xs mt-1" data-testid="email-error">{emailError}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors text-sm"
                      data-testid="button-request-trial"
                    >
                      Request Trial Access
                    </button>

                    <p className="text-[11px] text-cv-muted/60 text-center leading-relaxed">
                      By signing up, you agree to our{" "}
                      <a href="/legal/terms" className="underline hover:text-cv-ink transition-colors">terms of service</a>{" "}
                      and{" "}
                      <a href="/legal/privacy" className="underline hover:text-cv-ink transition-colors">privacy policy</a>.
                    </p>
                  </form>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </BaseLayout>
  );
}
