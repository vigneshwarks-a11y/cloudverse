import { BaseLayout } from "@/layouts/BaseLayout";
import { Button } from "@/components/Button";
import { track } from "@/lib/track";
import { Link } from "wouter";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Layers, TrendingUp, Users, CheckCircle2, ChevronDown, Check } from "lucide-react";
import { FinalCTA } from "@/components/FinalCTA";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPartnerInquirySchema, type InsertPartnerInquiry } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type PartnerType = "msp" | "gsi" | "reseller";

const partnerTypes: { id: PartnerType; label: string }[] = [
  { id: "msp", label: "MSP" },
  { id: "gsi", label: "GSI" },
  { id: "reseller", label: "Reseller" },
];

const partnerTypeContent: Record<PartnerType, {
  bestFor: string;
  motion: string;
  delivers: string[];
}> = {
  msp: {
    bestFor: "Managed service providers delivering ongoing cloud operations",
    motion: "Embed CloudVerse into managed FinOps and optimization offerings",
    delivers: [
      "Multi-tenant portfolio visibility",
      "Recurring optimization services",
      "White-labeled reporting options",
    ],
  },
  gsi: {
    bestFor: "Global systems integrators with enterprise transformation practices",
    motion: "Lead with CloudVerse in cloud modernization and FinOps programs",
    delivers: [
      "Enterprise implementation services",
      "Change management and governance",
      "Multi-cloud strategy alignment",
    ],
  },
  reseller: {
    bestFor: "Cloud resellers and distributors expanding service portfolio",
    motion: "Bundle CloudVerse with cloud consumption to drive value",
    delivers: [
      "Margin-friendly pricing models",
      "Customer success and retention",
      "Differentiated cloud offerings",
    ],
  },
};

const valuePillars = [
  {
    icon: Layers,
    title: "Embed into your delivery",
    desc: "Bring visibility, allocation, and optimization into your FinOps or cloud managed services.",
  },
  {
    icon: TrendingUp,
    title: "Grow revenue",
    desc: "Create new advisory + managed savings offerings, usage-based programs, and implementation packages.",
  },
  {
    icon: Users,
    title: "Win and retain customers",
    desc: "Differentiate with multi-cloud coverage + AI/Data spend optimization.",
  },
];

const programComponents = [
  "Co-selling support",
  "Partner enablement & training",
  "Multi-tenant portfolio support",
  "Embed into workflows",
  "Commercial coordination",
  "Implementation toolkit",
];

const revenueStreams = [
  { title: "Implementation services", desc: "Onboarding, integration, and configuration engagements" },
  { title: "Managed FinOps retainer", desc: "Ongoing optimization and reporting services" },
  { title: "Referral / resell margin", desc: "Commercial arrangements for customer referrals" },
];

const partnerWorkflow = [
  { step: "01", title: "Qualify", desc: "Identify customer fit" },
  { step: "02", title: "Connect", desc: "Link customer data" },
  { step: "03", title: "Deliver", desc: "Baseline + roadmap" },
  { step: "04", title: "Optimize", desc: "Ongoing value delivery" },
];

export default function Partners() {
  const [activeType, setActiveType] = useState<PartnerType>("msp");
  const formRef = useRef<HTMLDivElement>(null);
  const content = partnerTypeContent[activeType];
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<InsertPartnerInquiry>({
    resolver: zodResolver(insertPartnerInquirySchema),
    defaultValues: {
      fullName: "",
      businessEmail: "",
      companyName: "",
      phoneNumber: "",
      countryRegion: "",
      partnerType: "",
      employeeCount: "",
      cloudProviders: [],
      website: "",
      message: "",
      agreedToTerms: "no"
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertPartnerInquiry) => {
      await apiRequest("POST", "/api/partners/inquiry", data);
    },
    onSuccess: () => {
      toast({
        title: "Inquiry Sent",
        description: "We'll be in touch shortly.",
      });
      reset();
    }
  });

  const onSubmit = (data: InsertPartnerInquiry) => {
    track("partner_inquiry_submit", {
      partnerType: data.partnerType,
      employeeCount: data.employeeCount,
      cloudProvidersCount: data.cloudProviders?.length ?? 0,
    });
    mutation.mutate(data);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const cloudProviders = [
    "Aws", "Gcp", "Azure", "Alicloud", "Tencent", "Huawei", "Private Cloud", "Other Cloud"
  ];

  const selectedProviders = watch("cloudProviders") || [];

  const toggleProvider = (provider: string) => {
    const current = [...selectedProviders];
    const index = current.indexOf(provider);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(provider);
    }
    setValue("cloudProviders", current);
  };

  useEffect(() => {
    document.title = "Partners — CloudVerse™";
  }, []);

  return (
    <BaseLayout>
      {/* Hero */}
      <section className="pt-20 sm:pt-24 lg:pt-28 pb-14 sm:pb-16 lg:pb-20 border-b border-cv-line">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-20 pl-[32px] pr-[32px]">
          <div className="max-w-3xl">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-cv-muted mb-4">
              CloudVerse™ Partner Program
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cv-ink mb-6 leading-tight">
              Partner with CloudVerse™
            </h1>
            <p className="text-lg sm:text-xl text-cv-muted mb-8 leading-relaxed">
              For MSPs, GSIs, and Resellers who want to deliver measurable savings faster and grow services revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="w-full sm:w-auto" 
                onClick={() => { track("cta_partner_apply", { location: "partners_hero" }); scrollToForm(); }}
                data-testid="button-partner-apply-hero"
              >
                Become a partner
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Pillars */}
      <section className="py-14 sm:py-16 lg:py-20 border-b border-cv-line">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {valuePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-2xl border border-cv-line bg-cv-surface2/30 dark:bg-white/[0.02] hover:bg-cv-surface2/50 dark:hover:bg-white/[0.04] transition-colors"
                >
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 w-fit mb-6">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-cv-ink mb-3">{pillar.title}</h3>
                  <p className="text-cv-muted leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-14 sm:py-16 lg:py-20 border-b border-cv-line">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-cv-ink mb-8 text-center">
            Partner types
          </h2>
          
          {/* Type Selector */}
          <div className="flex justify-center gap-3 mb-10">
            {partnerTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                data-testid={`button-partner-type-${type.id}`}
                className={cn(
                  "px-6 py-3 rounded-full text-sm font-medium transition-all",
                  activeType === type.id
                    ? "bg-blue-600 text-white"
                    : "bg-cv-surface2/50 dark:bg-white/5 text-cv-muted hover:bg-cv-surface2 dark:hover:bg-white/10 border border-cv-line"
                )}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Type Content */}
          <div className="max-w-2xl mx-auto rounded-2xl border border-cv-line bg-cv-surface2/30 dark:bg-white/[0.03] p-8">
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold text-cv-muted uppercase tracking-wider mb-2">Best for</p>
                <p className="text-lg text-cv-ink/90">{content.bestFor}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-cv-muted uppercase tracking-wider mb-2">Typical motion</p>
                <p className="text-base text-cv-muted">{content.motion}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-cv-muted uppercase tracking-wider mb-3">What you deliver</p>
                <ul className="space-y-2">
                  {content.delivers.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-cv-muted">
                      <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Components */}
      <section className="py-14 sm:py-16 lg:py-20 border-b border-cv-line">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-cv-ink mb-8 text-center">
            Program components
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {programComponents.map((component, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-cv-line bg-cv-surface2/30 dark:bg-white/[0.02] text-center"
              >
                <p className="text-sm font-medium text-cv-ink/80">{component}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Revenue Streams */}
      <section className="py-14 sm:py-16 lg:py-20 border-b border-cv-line">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-cv-ink mb-8 text-center">
            How partners make money
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {revenueStreams.map((stream, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-cv-line bg-cv-surface2/30 dark:bg-white/[0.02]"
              >
                <h3 className="text-lg font-semibold text-cv-ink mb-2">{stream.title}</h3>
                <p className="text-sm text-cv-muted">{stream.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Workflow */}
      <section className="py-14 sm:py-16 lg:py-20 border-b border-cv-line">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-cv-ink mb-12 text-center">
            Partner workflow
          </h2>
          <div className="relative">
            {/* Connection Line (Desktop) */}
            <div className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-cv-line z-0" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4 lg:gap-6 relative z-10">
              {partnerWorkflow.map((item, idx) => (
                <div key={idx} className="text-center group">
                  <div className="w-12 h-12 rounded-full bg-cv-surface border border-cv-line group-hover:border-blue-500/50 flex items-center justify-center mx-auto mb-4 transition-colors relative bg-cv-surface">
                    <span className="text-sm font-bold text-blue-500">{item.step}</span>
                  </div>
                  <h4 className="text-base font-semibold text-cv-ink mb-1">{item.title}</h4>
                  <p className="text-xs text-cv-muted max-w-[160px] mx-auto">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partner Form Section */}
      <section ref={formRef} className="py-20 bg-cv-surface border-t border-cv-line">
        <div className="max-w-[1000px] mx-auto px-6">
          <h2 className="cv-h2 mb-10 text-cv-ink">Become a partner with CloudVerse Ai</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-medium text-cv-muted uppercase tracking-wider">Full Name</label>
                <input 
                  {...register("fullName")}
                  placeholder="Full Name"
                  className="w-full bg-cv-surface2 border border-cv-line rounded-md px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-cv-ink placeholder:text-cv-muted/50"
                />
                {errors.fullName && <p className="text-red-500 text-[10px]">{errors.fullName.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-cv-muted uppercase tracking-wider">Business Email</label>
                <input 
                  {...register("businessEmail")}
                  placeholder="Business Email"
                  className="w-full bg-cv-surface2 border border-cv-line rounded-md px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-cv-ink placeholder:text-cv-muted/50"
                />
                {errors.businessEmail && <p className="text-red-500 text-[10px]">{errors.businessEmail.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-cv-muted uppercase tracking-wider">Company Name</label>
                <input 
                  {...register("companyName")}
                  placeholder="Company Name"
                  className="w-full bg-cv-surface2 border border-cv-line rounded-md px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-cv-ink placeholder:text-cv-muted/50"
                />
                {errors.companyName && <p className="text-red-500 text-[10px]">{errors.companyName.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-cv-muted uppercase tracking-wider">Phone Number</label>
                <input 
                  {...register("phoneNumber")}
                  placeholder="Phone Number"
                  className="w-full bg-cv-surface2 border border-cv-line rounded-md px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-cv-ink placeholder:text-cv-muted/50"
                />
                {errors.phoneNumber && <p className="text-red-500 text-[10px]">{errors.phoneNumber.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-cv-muted uppercase tracking-wider">Country/Region</label>
                <div className="relative">
                  <select 
                    {...register("countryRegion")}
                    className="w-full appearance-none bg-cv-surface2 border border-cv-line rounded-md px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-cv-ink"
                  >
                    <option value="">Search and Select Country</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="SG">Singapore</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="JP">Japan</option>
                    <option value="AU">Australia</option>
                    <option value="IN">India</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cv-muted pointer-events-none" />
                </div>
                {errors.countryRegion && <p className="text-red-500 text-[10px]">{errors.countryRegion.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-cv-muted uppercase tracking-wider">Partner Type</label>
                <div className="relative">
                  <select 
                    {...register("partnerType")}
                    className="w-full appearance-none bg-cv-surface2 border border-cv-line rounded-md px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-cv-ink"
                  >
                    <option value="">Please select</option>
                    <option value="msp">MSP</option>
                    <option value="gsi">GSI</option>
                    <option value="reseller">Reseller</option>
                    <option value="technology">Technology Partner</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cv-muted pointer-events-none" />
                </div>
                {errors.partnerType && <p className="text-red-500 text-[10px]">{errors.partnerType.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-cv-muted uppercase tracking-wider">Partner Number of Employees</label>
              <div className="relative">
                <select 
                  {...register("employeeCount")}
                  className="w-full appearance-none bg-cv-surface2 border border-cv-line rounded-md px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-cv-ink"
                >
                  <option value="">Please select</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="201-500">201-500</option>
                  <option value="500+">500+</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cv-muted pointer-events-none" />
              </div>
              {errors.employeeCount && <p className="text-red-500 text-[10px]">{errors.employeeCount.message}</p>}
            </div>

            <div className="space-y-4">
              <label className="text-xs font-medium text-cv-muted uppercase tracking-wider">Which main cloud providers do you work with today?</label>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {cloudProviders.map((provider) => (
                  <label key={provider} className="flex items-center gap-2 cursor-pointer group">
                    <div 
                      onClick={() => toggleProvider(provider)}
                      className={cn(
                        "w-4 h-4 border rounded flex items-center justify-center transition-colors",
                        selectedProviders.includes(provider) 
                          ? "bg-blue-600 border-blue-600" 
                          : "border-cv-line group-hover:border-cv-muted"
                      )}
                    >
                      {selectedProviders.includes(provider) && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-sm text-cv-muted group-hover:text-cv-ink">{provider}</span>
                  </label>
                ))}
              </div>
              {errors.cloudProviders && <p className="text-red-500 text-[10px]">{errors.cloudProviders.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-cv-muted uppercase tracking-wider">Website</label>
              <input 
                {...register("website")}
                placeholder="https://example.com"
                className="w-full bg-cv-surface2 border border-cv-line rounded-md px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-cv-ink placeholder:text-cv-muted/50"
              />
              {errors.website && <p className="text-red-500 text-[10px]">{errors.website.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-cv-muted uppercase tracking-wider">Message (optional)</label>
              <textarea 
                {...register("message")}
                placeholder="Your message"
                rows={4}
                className="w-full bg-cv-surface2 border border-cv-line rounded-md px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors resize-none text-cv-ink placeholder:text-cv-muted/50"
              />
            </div>

            <div className="flex items-center gap-2">
              <div 
                onClick={() => setValue("agreedToTerms", watch("agreedToTerms") === "yes" ? "no" : "yes")}
                className={cn(
                  "w-4 h-4 border rounded flex items-center justify-center cursor-pointer transition-colors",
                  watch("agreedToTerms") === "yes" 
                    ? "bg-blue-600 border-blue-600" 
                    : "border-cv-line"
                )}
              >
                {watch("agreedToTerms") === "yes" && <Check className="w-3 h-3 text-white" />}
              </div>
              <span className="text-[10px] text-cv-muted">
                I agree to the <a href="/legal/terms" className="text-blue-500 hover:underline">Terms & Conditions</a>
              </span>
              {errors.agreedToTerms && <p className="text-red-500 text-[10px] ml-2">{errors.agreedToTerms.message}</p>}
            </div>

            <button 
              type="submit" 
              disabled={mutation.isPending}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-md transition-colors disabled:opacity-50"
            >
              {mutation.isPending ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </section>

      {/* CTA */}
      <FinalCTA 
        title="Talk to our partner team"
        description="Learn how CloudVerse can help you grow services revenue and deliver measurable value."
        location="partners_bottom"
      />
    </BaseLayout>
  );
}
