import { BaseLayout } from "@/layouts/BaseLayout";
import { Button } from "@/components/Button";
import { MotionHero } from "@/components/MotionHero";
import { OutcomesWindow } from "@/components/OutcomesWindow";
import { FeatureTabs } from "@/components/FeatureTabs";
import { track } from "@/lib/track";
import { Link } from "wouter";
import { useEffect } from "react";
import { FinalCTA } from "@/components/FinalCTA";

const platformOutcomesSet1 = [
  { title: "Unified Cost Visibility", desc: "Real-time view across all clouds and services" },
  { title: "Clean Allocation", desc: "Normalized dimensions for showback and chargeback" },
  { title: "Real-time Anomalies", desc: "Detect and predict spikes before impact" },
  { title: "Compliance Ready", desc: "Audit trails, access controls, deployment options" },
  { title: "Multi-cloud Native", desc: "Built for heterogeneous enterprise environments" },
];

const platformOutcomesSet2 = [
  { title: "Automated Optimization", desc: "Apply savings actions with guardrails" },
  { title: "40+ ML Models", desc: "Recommendations powered by predictive models" },
  { title: "Realized Savings", desc: "Track outcomes, not just estimates" },
  { title: "Policy-driven Control", desc: "Approvals, RBAC, and safe defaults" },
  { title: "AI-era Spend Ops", desc: "Optimize cloud, data, and AI workloads" },
];

const cloudProviders = [
  { name: "AWS", src: "/logos/aws/aws-light.svg" },
  { name: "Azure", src: "/logos/azure/azure-icon.png" },
  { name: "GCP", src: "/logos/gcp/gcp-icon.png" },
  { name: "Alibaba Cloud", src: "/logos/alibaba/alibaba-icon.png" },
  { name: "Huawei Cloud", src: "/logos/huawei/huawei-icon.png" },
  { name: "Tencent Cloud", src: "/logos/tencent/tencent-icon.png" },
];

const aiProviders = [
  { name: "OpenAI", src: "/logos/openai/openai-light.svg" },
  { name: "Snowflake", src: "/logos/snowflake/snowflake-light.svg" },
  { name: "NVIDIA", src: "/logos/nvidia.png" },
];

const capabilities = [
  {
    title: "Visibility & Reporting",
    body: "Real-time views across providers, accounts, regions, services, and resources.",
  },
  {
    title: "Allocation & Chargeback",
    body: "Audit-ready showback and chargeback with shared pools and rules.",
  },
  {
    title: "Anomalies (Detected + Predicted)",
    body: "Catch spend spikes and forecast risk before month-end.",
  },
  {
    title: "Automation-first Optimization",
    body: "Apply safe actions automatically with guardrails and approvals.",
  },
  {
    title: "Developer FinOps (Shift-left)",
    body: "Cost context in engineering workflows, before changes ship.",
  },
  {
    title: "AI & GPU Cost Optimization",
    body: "Optimize GPU infrastructure and model inference spend with anomaly detection and automated actions.",
  },
];

export default function Platform() {
  useEffect(() => {
    document.title = "Platform — CloudVerse™";
  }, []);

  return (
    <BaseLayout>
      <MotionHero>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-left space-y-4 sm:space-y-6 max-w-[44rem]">
            <span className="cv-cap font-semibold tracking-widest text-cv-muted uppercase">
              CloudVerse™ Platform
            </span>
            <h1 className="cv-h1">Automated spend governance in one platform</h1>
            <p className="text-[15px] sm:text-[16px] lg:text-[18px] leading-[24px] sm:leading-[26px] lg:leading-[30px] text-cv-muted max-w-[40rem]">
              Manage cloud, data, and AI spend with clean dimensions, anomalies, and automated actions.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-4 max-w-xs sm:max-w-none">
              <Link href="/connect" onClick={() => track("cta_demo", { location: "platform_hero" })} className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto">
                  Book a demo
                </Button>
              </Link>
              <Link href="/integrations" onClick={() => track("cta_explore_integrations", { location: "platform_hero" })} className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  View integrations
                </Button>
              </Link>
            </div>
          </div>

          <div className="w-full max-w-[640px] mx-auto lg:mx-0">
            <OutcomesWindow 
              label="CloudVerse™ Pillars"
              outcomes={platformOutcomesSet1}
              outcomeSet2={platformOutcomesSet2}
              cloudProviders={cloudProviders}
              aiProviders={aiProviders}
            />
          </div>
        </div>
      </MotionHero>
      <section className="py-14 sm:py-16 lg:py-20">
        <div className="cv-container-full">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="cv-h2 mb-3">What you get with CloudVerse</h2>
            <p className="text-[15px] sm:text-[16px] lg:text-[17px] leading-[24px] sm:leading-[26px] lg:leading-[28px] text-cv-muted">
              A platform built to report, detect, and act automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, idx) => (
              <div key={idx} className="border border-cv-line rounded-cv p-6 hover:border-cv-muted transition-colors">
                <h3 className="text-base font-semibold mb-3">{cap.title}</h3>
                <p className="text-sm text-cv-muted max-w-[42ch]">{cap.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-14 sm:py-16 lg:py-20">
        <div className="cv-container-full">
          <FeatureTabs />
        </div>
      </section>
      <section className="py-10 sm:py-12 lg:py-14 border-y border-cv-line">
        <div className="cv-container-full">
          <div className="text-center mb-8">
            <h2 className="cv-h2">How it fits into your workflow</h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {["Connect", "Normalize", "Analyze", "Detect", "Automate", "Report"].map(
              (step, idx, arr) => (
                <div key={step} className="flex items-center gap-6">
                  <span className="text-[15px] font-medium text-cv-muted uppercase tracking-widest">
                    {step}
                  </span>
                  {idx < arr.length - 1 && (
                    <span className="text-cv-line">•</span>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </section>
      <FinalCTA 
        title="Get a platform view of your cloud economics"
        description="We'll map your structure and automation opportunities."
        location="platform_bottom"
      />
    </BaseLayout>
  );
}
