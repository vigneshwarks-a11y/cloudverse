import { BaseLayout } from "@/layouts/BaseLayout";
import { InvoiceEfficiencySection } from "@/components/home/InvoiceEfficiencySection";
import { track } from "@/lib/track";
import { useState, useEffect } from "react";
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
  Calendar as CalendarIcon,
  Clock,
  type LucideIcon,
  Sparkles
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { THANK_YOU_URL } from "@/lib/links";
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

const marketplaces = [
  {
    name: "AWS",
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="#FF9900">
        <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167z" />
      </svg>
    )
  },
  {
    name: "Google Cloud",
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
        <path d="M12 7.5c2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5-4.5-2-4.5-4.5 2-4.5 4.5-4.5m0-1.5c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z" fill="#4285F4" />
        <path d="M19.1 8.3l1.4-2.4c.2-.3.1-.7-.2-.9-.3-.2-.7-.1-.9.2l-1.4 2.4c-1.5-1-3.3-1.6-5.2-1.6-1.9 0-3.7.6-5.2 1.6L6.2 5.2c-.2-.3-.6-.4-.9-.2-.3.2-.4.6-.2.9l1.4 2.4C4.3 9.8 3 12.3 3 15h18c0-2.7-1.3-5.2-3.4-6.7z" fill="#EA4335" />
        <path d="M3 15c0 3.3 2.7 6 6 6h6c3.3 0 6-2.7 6-6H3z" fill="#34A853" />
        <path d="M9 15c0-1.7 1.3-3 3-3s3 1.3 3 3" fill="#FBBC05" />
      </svg>
    )
  },
  {
    name: "Azure",
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="#0078D4">
        <path d="M13.05 4.24L6.56 18.05a.5.5 0 00.46.7h10.28a.5.5 0 00.47-.34l3.23-9.5a.5.5 0 00-.47-.66H15.2l2.48-4.35a.5.5 0 00-.43-.75H13.5a.5.5 0 00-.45.28zM3 18.05l3.16-5.72 2.87 5.37a.5.5 0 00.44.3H3.5a.5.5 0 01-.5-.5v.05a.5.5 0 010 .5z" />
      </svg>
    )
  },
  {
    name: "Alibaba Cloud",
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="#FF6A00">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-9.5v3l2 1.5 2-1.5v-3l-2-1.5-2 1.5z" />
      </svg>
    )
  },
];

const integrationOptions = [
  "No specific integration",
  "AWS",
  "GCP",
  "Azure",
  "Alibaba",
  "Other",
];

const timeSlots = [
  { value: "09:00", label: "9:00 AM" },
  { value: "09:30", label: "9:30 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "10:30", label: "10:30 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "11:30", label: "11:30 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "12:30", label: "12:30 PM" },
  { value: "13:00", label: "1:00 PM" },
  { value: "13:30", label: "1:30 PM" },
  { value: "14:00", label: "2:00 PM" },
  { value: "14:30", label: "2:30 PM" },
  { value: "15:00", label: "3:00 PM" },
  { value: "15:30", label: "3:30 PM" },
  { value: "16:00", label: "4:00 PM" },
  { value: "16:30", label: "4:30 PM" },
  { value: "17:00", label: "5:00 PM" },
];

function GetItDirectlySection() {
  const initialFormData = {
    firstName: "",
    lastName: "",
    workEmail: "",
    integration: "No specific integration",
    preferredDate: "",
    preferredTime: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [dateOpen, setDateOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [dateTimeError, setDateTimeError] = useState<string | null>(null);
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) setIsHighlighted(true);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.preferredDate || !formData.preferredTime) {
      setDateTimeError("Preferred date and time are required.");
      return;
    }
    track("campaign_enquiry", { ...formData });
    setFormData(initialFormData);
    setSelectedDate(undefined);
    setDateOpen(false);
    setDateTimeError(null);
    window.location.href = THANK_YOU_URL;
  };

  const inputClass = "w-full bg-cv-surface2 border border-cv-line rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-cv-ink placeholder:text-cv-muted/50";

  return (
    <div
      className="rounded-2xl border bg-cv-surface p-5 sm:p-6 shadow-lg transition-all duration-500 relative overflow-hidden border-blue-500/40 shadow-blue-500/10 pt-[6px] pb-[6px] pl-[20px] pr-[20px]"
      data-testid="demo-form-sidebar"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
      <div className="relative">
        <div className="text-center mb-5">
          <span className="inline-block text-[10px] uppercase tracking-[0.2em] text-blue-500 font-semibold mb-2">
            Schedule a Demo
          </span>
          <h3 className="text-lg font-bold text-cv-ink leading-snug">
            See CloudVerse™ in action
          </h3>
        </div>

        <div className="mb-5 p-4 rounded-xl border border-cv-line bg-cv-surface2/50 dark:bg-white/5">
          <h4 className="text-sm font-semibold text-cv-ink text-center mb-2">Get it directly</h4>
          <p className="text-[11px] text-cv-muted text-center mb-3">
            Purchase from your preferred cloud marketplace.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <a
              href="https://aws.amazon.com/marketplace/pp/prodview-g72gjnuqrts2m"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("marketplace_click", { provider: "aws", location: "landing" })}
              className="flex items-center justify-center h-12 rounded-lg border border-cv-line bg-white dark:bg-cv-surface2 hover:border-blue-600 hover:shadow-md transition-all cloud_aws"
              data-testid="marketplace-aws"
            >
              <img src="/logos/aws-light-mode.png" alt="AWS" className="h-7 w-auto dark:hidden" />
              <img src="/logos/aws-dark-mode.png" alt="AWS" className="h-7 w-auto hidden dark:block" />
            </a>
            <a
              href="https://console.cloud.google.com/marketplace/product/cloudverse-marketplace-public/mcp20"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("marketplace_click", { provider: "gcp", location: "landing" })}
              className="flex items-center justify-center h-12 rounded-lg border border-cv-line bg-white dark:bg-cv-surface2 hover:border-blue-600 hover:shadow-md transition-all cloud_gcp"
              data-testid="marketplace-gcp"
            >
              <img src="/logos/gcp-light-mode.png" alt="Google Cloud" className="h-7 w-auto dark:hidden" />
              <img src="/logos/gcp-dark-mode.png" alt="Google Cloud" className="h-7 w-auto hidden dark:block" />
            </a>
            <a
              href="https://marketplace.microsoft.com/en-au/product/saas/cloudversepteltd1683193289260.cloudverse-multi-cloud-management-platform"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("marketplace_click", { provider: "microsoft", location: "landing" })}
              className="flex items-center justify-center h-12 rounded-lg border border-cv-line bg-white dark:bg-cv-surface2 hover:border-blue-600 hover:shadow-md transition-all cloud_azure"
              data-testid="marketplace-azure"
            >
              <img src="/logos/azure-marketplace.png" alt="Microsoft Azure" className="h-7 w-auto" />
            </a>
            <a
              href="https://marketplace.alibabacloud.com/products/56680002/sgcmfw00032481.html?spm=a3c0i.26795044.0.0.5edb2faaOBdVso&innerSource=search"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("marketplace_click", { provider: "alibaba", location: "landing" })}
              className="flex items-center justify-center h-12 rounded-lg border border-cv-line bg-white dark:bg-cv-surface2 hover:border-blue-600 hover:shadow-md transition-all cloud_alibaba"
              data-testid="marketplace-alibaba"
            >
              <img src="/logos/alibaba-marketplace.png" alt="Alibaba Cloud" className="h-7 w-auto" />
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-cv-line"></div>
          <span className="text-xs text-cv-muted font-medium">or fill the form</span>
          <div className="flex-1 h-px bg-cv-line"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3" data-testid="landing-demo-form">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-cv-muted uppercase tracking-wider">First Name</label>
              <input
                type="text"
                placeholder="John"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className={inputClass}
                data-testid="input-first-name"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-medium text-cv-muted uppercase tracking-wider">Last Name</label>
              <input
                type="text"
                placeholder="Doe"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className={inputClass}
                data-testid="input-last-name"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-medium text-cv-muted uppercase tracking-wider">Work Email</label>
            <input
              type="email"
              placeholder="john@company.com"
              required
              value={formData.workEmail}
              onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
              className={inputClass}
              data-testid="input-work-email"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-medium text-cv-muted uppercase tracking-wider">Integration?</label>
            <select
              value={formData.integration}
              onChange={(e) => setFormData({ ...formData, integration: e.target.value })}
              className={`${inputClass} appearance-none cursor-pointer`}
              data-testid="select-integration"
            >
              {integrationOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-cv-surface">{opt}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-medium text-cv-muted uppercase tracking-wider flex items-center gap-1">
              <CalendarIcon className="w-3 h-3" />
              Preferred Date & Time
            </label>
            <div className="grid grid-cols-2 gap-2">
              <Popover open={dateOpen} onOpenChange={setDateOpen}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={`${inputClass} text-left cursor-pointer flex items-center justify-between`}
                    data-testid="input-date"
                  >
                    <span className={selectedDate ? "text-cv-ink" : "text-cv-muted/50"}>
                      {selectedDate ? format(selectedDate, "MMM d, yyyy") : "Select date"}
                    </span>
                    <CalendarIcon className="w-3.5 h-3.5 text-cv-muted" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 bg-cv-surface border border-cv-line shadow-xl rounded-xl"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      setFormData((prev) => ({
                        ...prev,
                        preferredDate: date ? format(date, "yyyy-MM-dd") : "",
                      }));
                      setDateTimeError(null);
                      setDateOpen(false);
                    }}
                    disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                    initialFocus
                    className="rounded-xl"
                  />
                </PopoverContent>
              </Popover>

              <div className="relative">
                <select
                  value={formData.preferredTime}
                  onChange={(e) => {
                    setFormData({ ...formData, preferredTime: e.target.value });
                    setDateTimeError(null);
                  }}
                  className={`${inputClass} appearance-none cursor-pointer pr-8`}
                  data-testid="input-time"
                >
                  <option value="">Time</option>
                  {timeSlots.map((slot) => (
                    <option key={slot.value} value={slot.value}>{slot.label}</option>
                  ))}
                </select>
                <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-cv-muted pointer-events-none" />
              </div>
            </div>
            {dateTimeError && (
              <p className="text-red-500 text-[10px]">{dateTimeError}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors text-sm"
            data-testid="button-request-demo"
          >
            Request Demo
          </button>

          <p className="text-[10px] text-cv-muted/60 text-center">
            By submitting, you agree to our privacy policy. We'll never share your information.
          </p>
        </form>
      </div>
    </div>
  );
}

export default function Landing() {
  return (
    <BaseLayout>
      {/* Two-Column Layout */}
      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-10">

          {/* Left Column: All content sections */}
          <div className="min-w-0">

            {/* Mobile-only Demo Form */}
            <div className="lg:hidden py-8 border-b border-cv-line dark:border-white/10">
              <GetItDirectlySection />
            </div>

            <InvoiceEfficiencySection />

            <section className="py-12 sm:py-16 lg:py-20 border-t border-cv-line dark:border-white/10">
              <h2 className="text-2xl sm:text-3xl font-semibold text-cv-ink mb-10 sm:mb-12">
                What's included with CloudVerse™
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 sm:mb-12">
                {features.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-cv-surface dark:bg-slate-900/60 border border-cv-line dark:border-white/10 hover:border-cv-line/80 dark:hover:border-white/20 hover:bg-cv-surface2/30 dark:hover:bg-slate-800/60 transition-all group"
                      data-testid={`feature-card-${idx}`}
                    >
                      <div className="w-9 h-9 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center mb-3 group-hover:bg-blue-500/15 dark:group-hover:bg-blue-500/25 transition-colors">
                        <Icon className="w-4 h-4 text-blue-500" />
                      </div>
                      <h4 className="text-sm font-medium text-cv-ink mb-1">{feature.title}</h4>
                      <p className="text-xs text-cv-muted dark:text-slate-500 leading-relaxed">{feature.desc}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="py-12 sm:py-16 lg:py-20 border-t border-cv-line dark:border-white/10">
              <div className="mb-12 sm:mb-14">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-cv-ink mb-4">
                  Let's explore what's possible
                </h2>
                <p className="text-lg sm:text-xl text-cv-muted dark:text-slate-400 max-w-2xl">
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
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                      <Boxes className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <div className="flex-1">
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
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                      <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <div className="flex-1">
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
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-pink-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-pink-500/20">
                      <img src={dataxLogo} alt="DataX" className="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
                    </div>
                    <div className="flex-1">
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
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                      <img src={billopsLogo} alt="CloudBillOps" className="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-cv-ink mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">CloudBillOps</h3>
                      <p className="text-cv-muted leading-relaxed mb-4 text-sm sm:text-base">Unified cloud billing and cost operations. Track usage, allocate costs, enforce controls.</p>
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-orange-600 dark:text-orange-400 group-hover:gap-3 transition-all">Visit billops.cloudverse.ai →</span>
                    </div>
                  </div>
                </a>
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Demo Form (desktop only) */}
          <div className="hidden lg:block">
            <div className="sticky top-24 pt-[4px] pb-[4px]">
              <GetItDirectlySection />
            </div>
          </div>

        </div>
      </div>
    </BaseLayout>
  );
}
