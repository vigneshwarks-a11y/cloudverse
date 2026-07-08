import { FeatureShowcase } from "@/components/home/FeatureShowcase";

export const metadata = { title: "Preview · Feature Showcase" };

export default function FeatureShowcasePreview() {
  return (
    <main className="dark min-h-screen bg-cv-surface">
      <FeatureShowcase />
    </main>
  );
}
