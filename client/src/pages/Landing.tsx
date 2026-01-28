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

const AwsIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167z" fill="#FF9900"/>
  </svg>
);

const GcpIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <path d="M12.19 5.24l3.19-3.19.47.47 2.11-.52.52 2.11 2.11-.52.52 2.11-3.19 3.19-.47-.47-2.11.52-.52-2.11-2.11.52-.52-2.11z" fill="#EA4335"/>
    <path d="M19.07 9.93l-3.19 3.19-.47-.47-2.11.52-.52-2.11-2.11.52-.52-2.11 3.19-3.19.47.47 2.11-.52.52 2.11 2.11-.52.52 2.11z" fill="#4285F4"/>
    <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="#34A853"/>
    <path d="M8.24 12.19l-3.19 3.19.47.47-.52 2.11 2.11.52-.52 2.11 2.11.52 3.19-3.19-.47-.47.52-2.11-2.11-.52.52-2.11-2.11-.52z" fill="#FBBC05"/>
  </svg>
);

const AzureIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.483 21.3H24L14.025 4.013l-3.038 8.347 5.836 6.938L5.483 21.3zM13.23 2.7L6.105 8.677 0 19.253h5.505l7.725-16.553z" fill="#0078D4"/>
  </svg>
);

const AlibabaIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M China 6.5l-3.5 2.5v6l3.5 2.5 3.5-2.5v-6L12 6.5zm0 2l2 1.43v4.14l-2 1.43-2-1.43V9.93l2-1.43z" fill="#FF6A00"/>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#FF6A00"/>
  </svg>
);

const marketplaces = [
  { name: "AWS", icon: <AwsIcon /> },
  { name: "Google Cloud", icon: <GcpIcon /> },
  { name: "Azure", icon: <AzureIcon /> },
  { name: "Alibaba Cloud", icon: <AlibabaIcon /> },
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
                  className="px-4 py-2 rounded-full text-sm font-medium bg-cv-surface2/50 dark:bg-white/[0.06] border border-cv-line dark:border-white/10 text-cv-muted dark:text-slate-300 hover:bg-cv-surface2 dark:hover:bg-white/10 transition-colors inline-flex items-center gap-2"
                >
                  {mp.icon}
                  <span>{mp.name}</span>
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
