import { Shield, Cloud, Lock } from "lucide-react";

const options = [
  {
    title: "CloudVerse Cloud",
    description: "Fully managed SaaS hosted by CloudVerse. Get started in minutes with zero infrastructure overhead.",
    icon: Cloud,
    tag: "Most Popular",
  },
  {
    title: "Private Deployment",
    description: "Deploy CloudVerse within your own VPC (AWS), VNet (Azure), or private cluster. Keep data within your network.",
    icon: Shield,
    tag: "Enterprise",
  },
  {
    title: "Air-gapped",
    description: "Full offline deployment for highly regulated environments. Maintain complete control and isolation.",
    icon: Lock,
    tag: "Regulated",
  },
];

export function DeploymentOptions() {
  return (
    <section className="py-8 sm:py-10 lg:py-12 border-t border-cv-line dark:border-white/10">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-20">
        <div className="mb-10 sm:mb-12 text-center">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-cv-muted mb-3">
            Deployment Options
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-cv-ink mb-4">
            Choose the deployment model that fits your security requirements.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {options.map((option, idx) => (
            <div
              key={idx}
              className="group p-8 rounded-2xl border border-cv-line dark:border-white/10 bg-cv-surface2/30 dark:bg-white/[0.02] hover:bg-cv-surface2/50 dark:hover:bg-white/[0.04] transition-all duration-300 flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 group-hover:border-blue-500/40 transition-colors">
                  <option.icon className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-cv-surface2/50 dark:bg-white/5 border border-cv-line dark:border-white/10 text-cv-muted">
                  {option.tag}
                </span>
              </div>
              <h3 className="text-xl font-bold text-cv-ink mb-3 group-hover:text-blue-400 transition-colors">
                {option.title}
              </h3>
              <p className="text-cv-muted leading-relaxed mb-6">
                {option.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
