import { BaseLayout } from "@/components/BaseLayout";
import { InvoiceEfficiencySection } from "@/components/home/InvoiceEfficiencySection";
import { FinalCTA } from "@/components/FinalCTA";

export default function Landing() {
  return (
    <BaseLayout>
      <InvoiceEfficiencySection />
      <FinalCTA location="landing_page" />
    </BaseLayout>
  );
}
