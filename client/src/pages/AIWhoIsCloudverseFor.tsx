import { useEffect } from "react";
import { BaseLayout } from "@/layouts/BaseLayout";

const industries = [
  "Technology and SaaS",
  "AI / Machine Learning Platforms",
  "Data-Driven Enterprises",
  "FinTech",
  "E-commerce and Marketplaces",
  "Media and Streaming",
  "Gaming",
  "Telecommunications",
  "Healthcare Technology",
  "Enterprise Software Providers",
  "Cloud Service Providers / NeoClouds",
  "Digital-First Enterprises",
];

const stakeholders = [
  "Engineering",
  "Platform Engineering",
  "Data and Analytics",
  "Artificial Intelligence / ML",
  "Finance / FinOps",
  "Product",
  "Operations",
  "Executive Leadership",
  "IT and Infrastructure",
  "Strategy",
];

const roleUsers = [
  ["Engineering", "Platform Engineering Manager", "Owns shared infrastructure and cost-impacting architecture"],
  ["Engineering", "Cloud Infrastructure Engineer", "Designs and operates cloud resources"],
  ["Engineering", "DevOps Engineer", "Manages CI/CD pipelines and deployment decisions"],
  ["Engineering", "Site Reliability Engineer", "Balances reliability with cost efficiency"],
  ["Data and Analytics", "Data Engineering Lead", "Owns pipelines and data platform cost behavior"],
  ["Data and Analytics", "Analytics Engineer", "Designs analytical workloads with cost implications"],
  ["Data and Analytics", "Head of Data Platform", "Accountable for Snowflake/Databricks economics"],
  ["AI and ML", "Machine Learning Engineering Lead", "Controls training and inference workloads"],
  ["AI and ML", "Head of AI Infrastructure", "Owns GPU capacity and AI cost optimization"],
  ["AI and ML", "AI Platform Architect", "Designs model routing and compute strategy"],
  ["Finance", "FinOps Lead", "Oversees cloud economics and optimization programs"],
  ["Finance", "Financial Planning and Analysis Manager", "Forecasts and reports technology spend"],
  ["Product", "Technical Product Manager", "Balances feature velocity with infrastructure cost"],
  ["Executive", "Chief Technology Officer", "Accountable for scale, velocity, and cost tradeoffs"],
  ["Executive", "Chief Financial Officer", "Funds AI and cloud programs, demands ROI"],
  ["Operations", "Cloud Operations Manager", "Oversees day-to-day cloud efficiency"],
  ["Strategy", "Director of Cloud Economics", "Aligns business strategy with cloud spend"],
  ["IT", "Head of Infrastructure", "Oversees multi-cloud operating model"],
];

const icpRows = [
  [
    "Platform Engineering + DevOps + SRE Leaders",
    "Engineers make cost-impacting decisions without real-time economic feedback",
    "Decision-time cost intelligence embedded into workflows",
  ],
  [
    "Data Platform + Analytics Engineering Leaders",
    "Rising data platform costs with no clear workload-level accountability",
    "Unit economics for queries, pipelines, and data workloads",
  ],
  [
    "AI Infrastructure + FinOps + Executive Leadership",
    "GPU and AI costs are unpredictable, non-linear, and unmanaged",
    "AI-native economic intelligence with a path to automation",
  ],
];

export default function AIWhoIsCloudverseFor() {
  useEffect(() => {
    document.title = "AI / Who is Cloudverse for";
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
              Who is Cloudverse for
            </h1>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 lg:py-14 bg-cv-surface dark:bg-[#070b12] min-h-[60vh]">
        <div className="cv-container-full">
          <div className="max-w-6xl space-y-10">
            <article className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-cv-ink dark:text-white">Industry Coverage</h2>
              <ul className="list-disc pl-6 space-y-2">
                {industries.map((item) => (
                  <li key={item} className="text-[15px] sm:text-[16px] leading-7 text-cv-muted dark:text-white/85">
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-cv-ink dark:text-white">Functional Stakeholders</h2>
              <ul className="list-disc pl-6 space-y-2">
                {stakeholders.map((item) => (
                  <li key={item} className="text-[15px] sm:text-[16px] leading-7 text-cv-muted dark:text-white/85">
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-cv-ink dark:text-white">Role-Level Users</h2>
              <div className="overflow-x-auto rounded-xl border border-cv-line dark:border-white/15">
                <table className="w-full min-w-[900px] bg-cv-surface2 dark:bg-[#0d1420]">
                  <thead>
                    <tr className="border-b border-cv-line dark:border-white/15">
                      <th className="text-left p-4 text-sm font-bold text-cv-ink dark:text-white">Role Category</th>
                      <th className="text-left p-4 text-sm font-bold text-cv-ink dark:text-white">Job Title</th>
                      <th className="text-left p-4 text-sm font-bold text-cv-ink dark:text-white">Primary Responsibility</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roleUsers.map((row, index) => (
                      <tr key={`${row[0]}-${row[1]}-${index}`} className="border-b border-cv-line dark:border-white/10 last:border-b-0">
                        <td className="p-4 text-sm text-cv-muted dark:text-white/85 align-top">{row[0]}</td>
                        <td className="p-4 text-sm text-cv-muted dark:text-white/85 align-top">{row[1]}</td>
                        <td className="p-4 text-sm text-cv-muted dark:text-white/85 align-top">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            <article className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-cv-ink dark:text-white">Ideal Customer Profile (ICP) Definitions</h2>
              <div className="overflow-x-auto rounded-xl border border-cv-line dark:border-white/15">
                <table className="w-full min-w-[900px] bg-cv-surface2 dark:bg-[#0d1420]">
                  <thead>
                    <tr className="border-b border-cv-line dark:border-white/15">
                      <th className="text-left p-4 text-sm font-bold text-cv-ink dark:text-white">Profile</th>
                      <th className="text-left p-4 text-sm font-bold text-cv-ink dark:text-white">Pain Point</th>
                      <th className="text-left p-4 text-sm font-bold text-cv-ink dark:text-white">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {icpRows.map((row, index) => (
                      <tr key={`${row[0]}-${index}`} className="border-b border-cv-line dark:border-white/10 last:border-b-0">
                        <td className="p-4 text-sm text-cv-muted dark:text-white/85 align-top">{row[0]}</td>
                        <td className="p-4 text-sm text-cv-muted dark:text-white/85 align-top">{row[1]}</td>
                        <td className="p-4 text-sm text-cv-muted dark:text-white/85 align-top">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
