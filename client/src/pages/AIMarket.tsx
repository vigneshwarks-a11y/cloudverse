import { useEffect } from "react";
import { BaseLayout } from "@/layouts/BaseLayout";

const marketRows = [
  ["Bengaluru", "Karnataka", "India", "Engineering and AI hub"],
  ["Hyderabad", "Telangana", "India", "Cloud and data platforms concentration"],
  ["Mumbai", "Maharashtra", "India", "Enterprise and financial services"],
  ["Singapore", "—", "Singapore", "Regional SEA cloud hub"],
  ["Jakarta", "—", "Indonesia", "Fast-growing digital economy"],
  ["Kuala Lumpur", "—", "Malaysia", "Regional enterprise expansion"],
  ["Bangkok", "—", "Thailand", "Cloud adoption growth"],
  ["Dubai", "—", "UAE", "Regional HQ for cloud and AI"],
  ["Abu Dhabi", "—", "UAE", "AI and sovereign cloud initiatives"],
  ["Riyadh", "—", "Saudi Arabia", "Government-led AI investment"],
  ["Jeddah", "—", "Saudi Arabia", "Enterprise modernization"],
  ["San Francisco", "California", "USA", "AI and SaaS epicenter"],
  ["Seattle", "Washington", "USA", "Hyperscaler ecosystem"],
  ["Austin", "Texas", "USA", "Cloud and startup growth"],
  ["New York", "New York", "USA", "Enterprise and fintech concentration"],
];

export default function AIMarket() {
  useEffect(() => {
    document.title = "AI / Market";
  }, []);

  return (
    <BaseLayout>
      <section className="pt-12 sm:pt-16 lg:pt-20 pb-10 border-b border-cv-line dark:border-white/10 bg-cv-surface dark:bg-[#070b12]">
        <div className="cv-container-full">
          <div className="max-w-5xl">
            <span className="text-xs uppercase tracking-widest text-cv-muted dark:text-white/70 mb-4 inline-block font-bold">
              AI
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cv-ink dark:text-white mb-3">
              Potential Markets
            </h1>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 lg:py-14 bg-cv-surface dark:bg-[#070b12] min-h-[60vh]">
        <div className="cv-container-full">
          <div className="max-w-6xl space-y-6">
            <div className="overflow-x-auto rounded-xl border border-cv-line dark:border-white/15">
              <table className="w-full min-w-[920px] bg-cv-surface2 dark:bg-[#0d1420]">
                <thead>
                  <tr className="border-b border-cv-line dark:border-white/15">
                    <th className="text-left p-4 text-sm font-bold text-cv-ink dark:text-white">City</th>
                    <th className="text-left p-4 text-sm font-bold text-cv-ink dark:text-white">State/Region</th>
                    <th className="text-left p-4 text-sm font-bold text-cv-ink dark:text-white">Country</th>
                    <th className="text-left p-4 text-sm font-bold text-cv-ink dark:text-white">Why This Market Is Relevant</th>
                  </tr>
                </thead>
                <tbody>
                  {marketRows.map((row, index) => (
                    <tr key={`${row[0]}-${index}`} className="border-b border-cv-line dark:border-white/10 last:border-b-0">
                      <td className="p-4 text-sm text-cv-muted dark:text-white/85 align-top">{row[0]}</td>
                      <td className="p-4 text-sm text-cv-muted dark:text-white/85 align-top">{row[1]}</td>
                      <td className="p-4 text-sm text-cv-muted dark:text-white/85 align-top">{row[2]}</td>
                      <td className="p-4 text-sm text-cv-muted dark:text-white/85 align-top">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
