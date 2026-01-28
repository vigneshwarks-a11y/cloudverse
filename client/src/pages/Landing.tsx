import { BaseLayout } from "@/layouts/BaseLayout";
import { InvoiceEfficiencySection } from "@/components/home/InvoiceEfficiencySection";
import { Link } from "wouter";
import { track } from "@/lib/track";
import { useState } from "react";

const features = [
  { title: "Visibility & reporting", desc: "Track spend, usage, and trends across teams.", icon: "📊" },
  { title: "Developer FinOps (shift-left)", desc: "Put cost signals into dev workflows early.", icon: "⚡" },
  { title: "Allocation & chargeback", desc: "Attribute costs to owners with confidence.", icon: "🎯" },
  { title: "Autonomous tag normalization", desc: "Clean and standardize tags automatically.", icon: "🏷️" },
  { title: "Detected + predicted anomalies", desc: "Spot spikes now and forecast risk.", icon: "🔍" },
  { title: "Enterprise access controls", desc: "Role-based access and auditability built in.", icon: "🔐" },
  { title: "Automation-first optimization", desc: "Turn savings actions into policies.", icon: "⚙️" },
  { title: "Audit logs and governance", desc: "Full change history for compliance.", icon: "📋" },
];

const marketplaces = [
  { name: "AWS", icon: "🔶" },
  { name: "Google Cloud", icon: "🔷" },
  { name: "Azure", icon: "🔵" },
  { name: "Alibaba Cloud", icon: "🟠" },
];

const integrationOptions = [
  "No specific integration",
  "AWS",
  "GCP",
  "Azure",
  "Alibaba",
  "Other",
];

function GetItDirectlySection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    workEmail: "",
    integration: "No specific integration",
    preferredDate: "",
    preferredTime: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    track("landing_demo_request", { ...formData });
    alert("Demo request submitted! We'll be in touch soon.");
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 border-t border-cv-line dark:border-white/10">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-20">
        <div className="max-w-2xl mx-auto">
          <div className="rounded-2xl border border-cv-line dark:border-white/10 bg-cv-surface dark:bg-slate-900/80 p-6 sm:p-8 lg:p-10 shadow-xl dark:shadow-blue-500/5">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-semibold text-cv-ink mb-3">
                Get it directly
              </h2>
              <p className="text-cv-muted dark:text-slate-400">
                Purchase CloudVerse directly from your preferred cloud marketplace.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {marketplaces.map((mp) => (
                <button
                  key={mp.name}
                  type="button"
                  className="px-4 py-2 rounded-full text-sm font-medium bg-cv-surface2/50 dark:bg-white/[0.06] border border-cv-line dark:border-white/10 text-cv-muted dark:text-slate-300 hover:bg-cv-surface2 dark:hover:bg-white/10 transition-colors"
                >
                  {mp.icon} {mp.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-cv-line dark:bg-white/10" />
              <span className="text-sm text-cv-muted dark:text-slate-500">or talk to us</span>
              <div className="flex-1 h-px bg-cv-line dark:bg-white/10" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-cv-surface2/50 dark:bg-white/[0.04] border border-cv-line dark:border-white/10 text-cv-ink dark:text-white placeholder:text-cv-muted/60 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-cv-surface2/50 dark:bg-white/[0.04] border border-cv-line dark:border-white/10 text-cv-ink dark:text-white placeholder:text-cv-muted/60 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                />
              </div>

              <input
                type="email"
                placeholder="Work Email"
                required
                value={formData.workEmail}
                onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-cv-surface2/50 dark:bg-white/[0.04] border border-cv-line dark:border-white/10 text-cv-ink dark:text-white placeholder:text-cv-muted/60 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
              />

              <select
                value={formData.integration}
                onChange={(e) => setFormData({ ...formData, integration: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-cv-surface2/50 dark:bg-white/[0.04] border border-cv-line dark:border-white/10 text-cv-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
              >
                {integrationOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-cv-surface dark:bg-slate-800">
                    {opt === "No specific integration" ? "Interested in a specific integration?" : opt}
                  </option>
                ))}
              </select>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="date"
                  required
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-cv-surface2/50 dark:bg-white/[0.04] border border-cv-line dark:border-white/10 text-cv-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                />
                <input
                  type="time"
                  required
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-cv-surface2/50 dark:bg-white/[0.04] border border-cv-line dark:border-white/10 text-cv-ink dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors"
              >
                Request Demo
              </button>

              <p className="text-xs text-center text-cv-muted/70 dark:text-slate-500">
                By submitting, you agree to our privacy policy. We'll never share your information.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Landing() {
  return (
    <BaseLayout>
      <InvoiceEfficiencySection />

      <section className="py-12 sm:py-16 lg:py-20 border-t border-cv-line dark:border-white/10">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-20">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center text-cv-ink mb-10 sm:mb-12">
            What's included with CloudVerse
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 sm:mb-12">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-cv-surface dark:bg-slate-900/60 border border-cv-line dark:border-white/10 hover:border-cv-line/80 dark:hover:border-white/20 hover:bg-cv-surface2/30 dark:hover:bg-slate-800/60 transition-all group"
              >
                <div className="w-9 h-9 rounded-full bg-cv-surface2/80 dark:bg-white/[0.08] flex items-center justify-center mb-3 group-hover:bg-cv-surface2 dark:group-hover:bg-white/10 transition-colors">
                  <span className="text-base">{feature.icon}</span>
                </div>
                <h4 className="text-sm font-medium text-cv-ink mb-1">{feature.title}</h4>
                <p className="text-xs text-cv-muted dark:text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/connect"
              onClick={() => track("cta_schedule_demo", { location: "landing_features" })}
              className="text-sm font-medium tracking-wide uppercase text-cv-muted hover:text-cv-ink dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              Schedule a demo →
            </Link>
          </div>
        </div>
      </section>

      <GetItDirectlySection />

      <section className="py-12 sm:py-16 lg:py-20 border-t border-cv-line dark:border-white/10">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-20">
          <div className="text-center mb-12 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-cv-ink mb-4">
              Let's explore what's possible
            </h2>
            <p className="text-lg sm:text-xl text-cv-muted dark:text-slate-400 max-w-2xl mx-auto">
              See how CloudVerse can help your team gain visibility, control costs, and unlock savings across your cloud infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-cv-line dark:border-white/10 bg-cv-surface dark:bg-slate-900/80 p-6 sm:p-8 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 mb-6 flex items-center justify-center">
                <span className="text-white text-xl font-bold">AI</span>
              </div>
              <p className="text-sm text-cv-muted dark:text-slate-400 mb-3">
                Cut AI costs without breaking latency or quality.
              </p>
              <h3 className="text-xl sm:text-2xl font-semibold text-cv-ink">
                CloudVerse AIX
              </h3>
            </div>

            <div className="rounded-2xl border border-cv-line dark:border-white/10 bg-cv-surface dark:bg-slate-900/80 p-6 sm:p-8 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 mb-6 flex items-center justify-center">
                <span className="text-white text-xl font-bold">DX</span>
              </div>
              <p className="text-sm text-cv-muted dark:text-slate-400 mb-3">
                Catch cloud cost mistakes before they reach production.
              </p>
              <h3 className="text-xl sm:text-2xl font-semibold text-cv-ink">
                DevX
              </h3>
              <p className="text-sm text-cv-muted dark:text-slate-500 mt-1">
                by CloudVerse.ai
              </p>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
