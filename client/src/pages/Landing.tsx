import { BaseLayout } from "@/layouts/BaseLayout";
import { InvoiceEfficiencySection } from "@/components/home/InvoiceEfficiencySection";
import { track } from "@/lib/track";
import {
  Boxes,
  BarChart3,
  Code2,
  Target,
  Tag,
  Search,
  Shield,
  Settings,
  ClipboardList,
  type LucideIcon,
  Sparkles
} from "lucide-react";
import dataxLogo from "@/assets/datax-logo.png";
import billopsLogo from "@/assets/billops.png";

const features: { title: string; desc: string; icon: LucideIcon }[] = [
  { title: "Visibility & reporting", desc: "Track spend, usage, and trends across teams.", icon: BarChart3 },
  { title: "Developer FinOps (shift-left)", desc: "Put cost signals into dev workflows early.", icon: Code2 },
  { title: "Allocation & chargeback", desc: "Attribute costs to owners with confidence.", icon: Target },
  { title: "Autonomous tag normalization", desc: "Clean and standardize tags automatically.", icon: Tag },
  { title: "Detected + predicted anomalies", desc: "Spot spikes now and forecast risk.", icon: Search },
  { title: "Enterprise access controls", desc: "Role-based access and auditability built in.", icon: Shield },
  { title: "Automation-first optimization", desc: "Turn savings actions into policies.", icon: Settings },
  { title: "Audit logs and governance", desc: "Full change history for compliance.", icon: ClipboardList },
];

export default function Landing() {
  return (
    <BaseLayout>
      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8">

        <InvoiceEfficiencySection />

        <section className="pt-[30px] pb-[30px] border-t border-cv-line dark:border-white/10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-cv-ink sm:mb-12 mt-[27px] mb-[27px]">
            What's included with CloudVerse™
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 sm:mb-12">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-cv-surface dark:bg-slate-900/60 border border-cv-line dark:border-white/10 hover:border-cv-line/80 dark:hover:border-white/20 hover:bg-cv-surface2/30 dark:hover:bg-slate-800/60 transition-all group"
                  data-testid={`feature-card-`}
                >
                  <div className="w-9 h-9 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center mb-3 group-hover:bg-blue-500/15 dark:group-hover:bg-blue-500/25 transition-colors">
                    <Icon className="w-4 h-4 text-blue-500" />
                  </div>
                  <h4 className="font-medium text-cv-ink mb-1 text-[16px]">{feature.title}</h4>
                  <p className="text-cv-muted dark:text-slate-500 text-[14px]">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="pt-[40px] pb-[40px] border-t border-cv-line dark:border-white/10">
          <div className="mb-12 sm:mb-14">
            <h2 className="text-[30px] font-bold tracking-tight text-cv-ink mb-4">
              Let's explore what's possible
            </h2>
            <p className="sm:text-xl text-cv-muted dark:text-slate-400 max-w-2xl text-[18px]">
              See how CloudVerse™ can help your team gain visibility, control costs, and unlock savings across your cloud infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <a
              href="https://devx.cloudverse.ai"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("product_devx", { location: "products_section" })}
              className="group relative bg-cv-surface2/50 dark:bg-slate-800/50 border border-cv-line dark:border-slate-700/50 rounded-2xl p-6 sm:p-8 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 is_cvdevx"
              data-testid="product-devx-card"
            >
              <div className="flex flex-col gap-4">
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Boxes className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-cv-ink mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">DevX</h3>
                  <p className="text-cv-muted leading-relaxed mb-4 text-sm sm:text-base">Cut AI costs without breaking latency or quality.</p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:gap-3 transition-all">Visit devx.cloudverse.ai →</span>
                </div>
              </div>
            </a>

            <a
              href="https://aix.cloudverse.ai"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("product_aix", { location: "products_section" })}
              className="group relative bg-cv-surface2/50 dark:bg-slate-800/50 border border-cv-line dark:border-slate-700/50 rounded-2xl p-6 sm:p-8 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 is_cvaix"
              data-testid="product-aix-card"
            >
              <div className="flex flex-col gap-4">
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-cv-ink mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">AIx</h3>
                  <p className="text-cv-muted leading-relaxed mb-4 text-sm sm:text-base">Catch cloud cost mistakes before they reach production.</p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-purple-600 dark:text-purple-400 group-hover:gap-3 transition-all">Visit aix.cloudverse.ai →</span>
                </div>
              </div>
            </a>

            <a
              href="https://datax.cloudverse.ai"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("product_datax", { location: "products_section" })}
              className="group relative bg-cv-surface2/50 dark:bg-slate-800/50 border border-cv-line dark:border-slate-700/50 rounded-2xl p-6 sm:p-8 hover:border-pink-500/50 hover:shadow-lg hover:shadow-pink-500/10 transition-all duration-300 is_cvdatax"
              data-testid="product-datax-card"
            >
              <div className="flex flex-col gap-4">
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-pink-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-pink-500/20">
                  <img src={dataxLogo} alt="DataX" className="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-cv-ink mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">DataX</h3>
                  <p className="text-cv-muted leading-relaxed mb-4 text-sm sm:text-base">Analytics data cost visibility and workload controls. Monitor usage, optimize queries, and control spend.</p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-pink-600 dark:text-pink-400 group-hover:gap-3 transition-all">Visit datax.cloudverse.ai →</span>
                </div>
              </div>
            </a>

            <a
              href="https://billops.cloudverse.ai"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("product_billops", { location: "products_section" })}
              className="group relative bg-cv-surface2/50 dark:bg-slate-800/50 border border-cv-line dark:border-slate-700/50 rounded-2xl p-6 sm:p-8 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 is_cvbillops"
              data-testid="product-billops-card"
            >
              <div className="flex flex-col gap-4">
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <img src={billopsLogo} alt="CloudBillOps" className="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-cv-ink mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">CloudBillOps</h3>
                  <p className="text-cv-muted leading-relaxed mb-4 text-sm sm:text-base">Unified cloud billing and cost operations. Track usage, allocate costs, enforce controls.</p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-orange-600 dark:text-orange-400 group-hover:gap-3 transition-all">Visit billops.cloudverse.ai →</span>
                </div>
              </div>
            </a>
          </div>
        </section>

      </div>
    </BaseLayout>
  );
}
