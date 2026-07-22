/* "How compute economics works" flow diagram — FinOps-specific data fed
   into the shared HowItWorksFlow visual. Server component. */

import { Routing, ShieldCheck, DocumentText, Tuning, Widget, Cpu, Database } from "@/lib/solar-icons";
import { HowItWorksFlow, type FlowChip, type FlowWorkload, type FlowRightNode } from "@/components/solution/HowItWorksFlow";

const CHIPS: FlowChip[] = [
  { label: "Model Routing", color: "#1664C0", Icon: Routing },
  { label: "Torb Guardrails", color: "#0E9E7A", Icon: ShieldCheck },
  { label: "DataX Policies", color: "#D97706", Icon: DocumentText },
  { label: "Commitments Optimizer", color: "#6954D4", Icon: Tuning },
];

const WORKLOADS: FlowWorkload[] = [
  { label: "Applications", sub: "Product features & services", color: "#1664C0", Icon: Widget },
  { label: "AI Agents", sub: "Autonomous workflows", color: "#6954D4", Icon: Cpu },
  { label: "Data Workloads", sub: "Pipelines & analytics", color: "#0E9E7A", Icon: Database },
];

const RIGHT: FlowRightNode[] = [
  { kind: "logo", src: "/icons/aws.svg", name: "AWS" },
  { kind: "logo", src: "/icons/azure.svg", name: "Azure" },
  { kind: "logo", src: "/icons/googlecloud.svg", name: "Google Cloud" },
  { kind: "logo", src: "/icons/snowflake.svg", name: "Snowflake" },
  { kind: "logo", src: "/icons/kubernetes.svg", name: "Kubernetes" },
  { kind: "logo", src: "/icons/openai.svg", name: "OpenAI", invert: true },
];

export function FinopsHowItWorks() {
  return (
    <HowItWorksFlow
      workloads={WORKLOADS}
      chips={CHIPS}
      hubLabel="Cost · Performance · Risk"
      hubSub="evaluated before it scales"
      right={RIGHT}
      bottomRows={["GPU / CPU capacity", "On-prem & private cloud"]}
    />
  );
}

export default FinopsHowItWorks;
