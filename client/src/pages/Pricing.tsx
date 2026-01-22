import { BaseLayout } from "@/layouts/BaseLayout";
import { Button } from "@/components/Button";
import { track } from "@/lib/track";
import { Link } from "wouter";
import { useEffect } from "react";
import { FinalCTA } from "@/components/FinalCTA";
import { Check } from "lucide-react";

export default function Pricing() {
  useEffect(() => {
    document.title = "Pricing — CloudVerse™";
  }, []);

  const plans = [
    {
      name: "Starter",
      description: "Get started with comprehensive cloud cost management.",
      price: "$500",
      billingUnit: "per month (billed annually)",
      cta: "Purchase now",
      ctaVariant: "primary" as const,
      limits: ["Maximum $100,000 annual spend", "Access to all features", "Unlimited users", "1 year data retention"],
      dark: false
    },
    {
      name: "Professional",
      description: "Multi-cloud visibility, allocation, and automation at scale.",
      price: "$2000",
      billingUnit: "per month (billed annually)",
      cta: "Purchase now",
      ctaVariant: "primary" as const,
      limits: ["Maximum $1M annual spend", "Access to all features", "Unlimited users", "1 year data retention"],
      dark: false,
      popular: true
    },
    {
      name: "Enterprise",
      description: "Custom pricing and deployment for complex environments.",
      price: "Custom",
      billingUnit: "",
      limits: ["Unlimited cloud spend", "Access to all features", "Unlimited users", "5 years data retention", "SOC2 Report", "Dedicated account manager"],
      dark: true
    }
  ];

  const capabilities = [
    "Visibility & reporting",
    "Allocation & chargeback",
    "Detected + predicted anomalies",
    "Automation-first optimization",
    "Developer FinOps (shift-left)",
    "Autonomous tag normalization",
    "Enterprise access controls",
    "Audit logs and governance"
  ];

  return (
    <BaseLayout>
      {/* Hero */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-16 lg:pb-20">
        <div className="cv-container text-center space-y-4 sm:space-y-6 max-w-[720px] mx-auto">
          <span className="cv-cap font-semibold tracking-widest text-cv-muted uppercase">
            Pricing
          </span>
          <h1 className="cv-h1">Simple pricing that scales with you</h1>
          <p className="text-[15px] sm:text-[16px] lg:text-[17px] leading-[24px] sm:leading-[26px] lg:leading-[28px] text-cv-muted">
            CloudVerse pricing is designed for enterprise environments: clear, predictable, and aligned to real usage.
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-14 sm:py-16 lg:py-20 border-t border-cv-line">
        <div className="cv-container-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1240px] mx-auto">
            {plans.map((plan, idx) => (
              <div 
                key={idx} 
                className={`p-10 rounded-3xl border relative ${plan.popular ? 'ring-2 ring-blue-600 border-blue-600' : ''} ${plan.dark ? 'bg-black text-white border-white/10' : 'bg-white dark:bg-cv-surface2 border-cv-line'} flex flex-col shadow-sm`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className={`text-xl font-medium mb-8 ${plan.dark ? 'text-white/60' : 'text-cv-muted'}`}>
                  {plan.name}
                </h3>
                
                <div className={`mb-10 p-6 rounded-2xl ${plan.dark ? 'bg-white/[0.08]' : 'bg-cv-surface2/50 dark:bg-white/5'}`}>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-xl font-bold">
                      {plan.billingUnit ? '/Month' : ''}
                    </span>
                    {plan.billingUnit && (
                      <span className={`text-sm ml-1 ${plan.dark ? 'text-white/40' : 'text-cv-muted'}`}>
                        (billed annually)
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex-1 mb-10">
                  <ul className="space-y-5">
                    {plan.limits.map((limit, limitIdx) => (
                      <li key={limitIdx} className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </div>
                        <span className={`text-[15px] font-medium leading-tight ${plan.dark ? 'text-white/80' : 'text-cv-muted'}`}>
                          {limit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link 
                  href="/connect"
                  onClick={() => track("pricing_cta", { plan: plan.name, location: "pricing_plans" })}
                >
                  <Button 
                    size="lg" 
                    className={`w-full py-6 text-base font-semibold rounded-xl transition-all ${plan.dark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* What's Included */}
      <section className="py-14 sm:py-16 lg:py-20 border-t border-cv-line">
        <div className="cv-container-full">
          <h2 className="cv-h2 mb-10 text-center">What's included with CloudVerse</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((cap, idx) => (
              <div key={idx} className="text-sm text-cv-muted">
                {cap}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Usage & Scale */}
      <section className="py-14 sm:py-16 lg:py-20 border-t border-cv-line">
        <div className="cv-container max-w-[800px]">
          <h2 className="cv-h2 mb-6 text-center">Designed for enterprise scale</h2>
          <p className="text-[15px] leading-[24px] text-cv-muted mb-6 text-center">
            CloudVerse supports multi-account, multi-org, and multi-cloud environments. Pricing scales with usage and complexity, not arbitrary limits.
          </p>
          <div className="space-y-3 flex flex-col items-center">
            <div className="flex items-start gap-3 w-fit">
              <span className="text-primary font-semibold mt-1 flex-shrink-0">•</span>
              <span className="text-sm text-cv-muted text-left">Multi-cloud and multi-platform support</span>
            </div>
            <div className="flex items-start gap-3 w-fit">
              <span className="text-primary font-semibold mt-1 flex-shrink-0">•</span>
              <span className="text-sm text-cv-muted text-left">Large org hierarchies and shared services</span>
            </div>
            <div className="flex items-start gap-3 w-fit">
              <span className="text-primary font-semibold mt-1 flex-shrink-0">•</span>
              <span className="text-sm text-cv-muted text-left">Safe automation with guardrails</span>
            </div>
            <div className="flex items-start gap-3 w-fit">
              <span className="text-primary font-semibold mt-1 flex-shrink-0">•</span>
              <span className="text-sm text-cv-muted text-left">No impact on production workloads</span>
            </div>
          </div>
        </div>
      </section>
      {/* Enterprise & Custom */}
      <section className="py-14 sm:py-16 lg:py-20 border-t border-cv-line">
        <div className="cv-container max-w-[800px]">
          <h2 className="cv-h2 mb-3 text-center">Enterprise and custom deployments</h2>
          <p className="text-sm text-cv-muted mb-6 text-center">
            For complex environments, CloudVerse offers custom pricing and deployment options aligned to your architecture and governance needs.
          </p>
          <div className="space-y-3 mb-8 flex flex-col items-center">
            <div className="flex items-start gap-3 w-fit">
              <span className="text-primary font-semibold mt-1 flex-shrink-0">•</span>
              <span className="text-sm text-cv-muted text-left">Custom onboarding and data modeling</span>
            </div>
            <div className="flex items-start gap-3 w-fit">
              <span className="text-primary font-semibold mt-1 flex-shrink-0">•</span>
              <span className="text-sm text-cv-muted text-left">Advanced automation workflows</span>
            </div>
            <div className="flex items-start gap-3 w-fit">
              <span className="text-primary font-semibold mt-1 flex-shrink-0">•</span>
              <span className="text-sm text-cv-muted text-left">Dedicated support options</span>
            </div>
            <div className="flex items-start gap-3 w-fit">
              <span className="text-primary font-semibold mt-1 flex-shrink-0">•</span>
              <span className="text-sm text-cv-muted text-left">Security and compliance reviews</span>
            </div>
          </div>
          <div className="text-center">
            {/* <Link href="/contact" onClick={() => track("pricing_contact_sales", { location: "pricing_enterprise" })}>
              <Button variant="secondary" size="lg">
                Contact sales
              </Button>
            </Link> */}
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section className="py-14 sm:py-16 lg:py-20 border-t border-cv-line">
        <div className="cv-container max-w-[800px]">
          <h2 className="cv-h2 mb-10 text-center">Questions?</h2>
          <div className="space-y-6">
            {[
              {
                q: "How is pricing calculated?",
                a: "Pricing is based on usage and environment complexity. We'll review this with you during onboarding."
              },
              {
                q: "Do you support multi-cloud pricing?",
                a: "Yes, pricing supports environments spanning multiple clouds and platforms."
              },
              {
                q: "Are there limits on accounts or teams?",
                a: "CloudVerse is designed for enterprise scale. Limits, if any, depend on plan and usage."
              },
              {
                q: "Can we start small and scale?",
                a: "Yes, most customers start with visibility and expand into automation."
              },
              {
                q: "Is support included?",
                a: "Standard support is included. Advanced support options are available."
              }
            ].map((faq, idx) => (
              <div key={idx} className="pb-6 border-b border-cv-line last:border-b-0">
                <h3 className="text-sm font-semibold text-cv-ink mb-2">
                  {faq.q}
                </h3>
                <p className="text-sm text-cv-muted">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Final CTA */}
      <FinalCTA 
        description="We'll walk through your environment and recommend the right plan."
        location="pricing_bottom"
      />
    </BaseLayout>
  );
}
