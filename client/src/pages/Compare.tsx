import { BaseLayout } from "@/layouts/BaseLayout";
import { useEffect } from "react";
import { Link } from "wouter";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const industryBenchmarks = {
  avgSpending: 2500000,
  avgComputeCost: 45,
  avgStorageCost: 25,
  avgNetworkCost: 15,
  avgOptimizationPotential: 30,
};

const spendingByIndustry = [
  { industry: "Tech/SaaS", avgSpending: 3200000, range: "2-8M" },
  { industry: "Finance", avgSpending: 2800000, range: "1.5-6M" },
  { industry: "Healthcare", avgSpending: 1900000, range: "1-4M" },
  { industry: "Retail", avgSpending: 2300000, range: "1-5M" },
  { industry: "Manufacturing", avgSpending: 1700000, range: "800K-3M" },
];

const costBreakdown = [
  { name: "Compute", value: 45, fill: "#3b82f6" },
  { name: "Storage", value: 25, fill: "#8b5cf6" },
  { name: "Network", value: 15, fill: "#06b6d4" },
  { name: "Database", value: 10, fill: "#10b981" },
  { name: "Other", value: 5, fill: "#6366f1" },
];

const optimizationOpportunities = [
  { area: "Reserved Instances", potential: 25, industry: 22, yours: 18 },
  { area: "Spot/Preemptible", potential: 35, industry: 28, yours: 15 },
  { area: "Idle Resources", potential: 20, industry: 15, yours: 22 },
  { area: "Data Transfer", potential: 15, industry: 12, yours: 18 },
  { area: "Storage Tiering", potential: 18, industry: 14, yours: 10 },
];

const comparisonMetrics = [
  {
    metric: "Monthly Spend",
    industry: "$2.5M",
    yours: "$2.8M",
    status: "Higher",
    variance: "+12%",
  },
  {
    metric: "Compute Cost %",
    industry: "45%",
    yours: "52%",
    status: "Higher",
    variance: "+7%",
  },
  {
    metric: "Utilization Rate",
    industry: "72%",
    yours: "64%",
    status: "Lower",
    variance: "-8%",
  },
  {
    metric: "Optimization Potential",
    industry: "28%",
    yours: "35%",
    status: "Higher",
    variance: "+7%",
  },
];

export default function Compare() {
  useEffect(() => {
    document.title = "Cloud Spending Comparison — CloudVerse™";
  }, []);

  return (
    <BaseLayout>
      {/* Hero Section */}
      <section className="pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-14 lg:pb-16">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cv-ink mb-6">
              Cloud Spending Comparison
            </h1>
            <p className="text-lg sm:text-xl text-cv-ink/80 mb-4">
              Benchmark your cloud spending against industry averages.
            </p>
            <p className="text-base sm:text-lg text-cv-muted">
              See how your organization compares to peers in your industry and identify optimization opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Metrics Section */}
      <section className="py-14 sm:py-16 lg:py-18 border-t border-cv-line">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-cv-ink mb-8">
            Your vs. Industry Average
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {comparisonMetrics.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-cv-line bg-cv-surface2/50 dark:bg-white/5 p-6"
              >
                <p className="text-sm text-cv-muted mb-3">{item.metric}</p>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-cv-muted">Industry</p>
                    <p className="text-lg sm:text-xl font-semibold text-cv-ink">
                      {item.industry}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-cv-muted">Your Organization</p>
                    <p className="text-lg sm:text-xl font-semibold text-cv-ink">
                      {item.yours}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-cv-line">
                    <span
                      className={`text-xs font-semibold ${
                        item.status === "Higher"
                          ? "text-red-400"
                          : "text-green-400"
                      }`}
                    >
                      {item.status} {item.variance}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spending by Industry Section */}
      <section className="py-14 sm:py-16 lg:py-18 border-t border-cv-line">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-cv-ink mb-8">
            Average Spending by Industry
          </h2>
          <div className="rounded-2xl border border-cv-line bg-cv-surface2/50 dark:bg-white/5 p-8">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={spendingByIndustry}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="industry" stroke="rgba(255,255,255,0.6)" />
                <YAxis stroke="rgba(255,255,255,0.6)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0,0,0,0.8)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  labelStyle={{ color: "white" }}
                />
                <Legend />
                <Bar dataKey="avgSpending" fill="#3b82f6" name="Average Spending" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {spendingByIndustry.map((item, idx) => (
                <div key={idx} className="rounded-lg border border-cv-line bg-cv-surface2/50 dark:bg-white/5 p-4">
                  <p className="text-sm font-semibold text-cv-ink mb-2">
                    {item.industry}
                  </p>
                  <p className="text-2xl font-bold text-blue-400">
                    ${(item.avgSpending / 1000000).toFixed(1)}M
                  </p>
                  <p className="text-xs text-cv-muted mt-1">Range: {item.range}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cost Breakdown */}
      <section className="py-14 sm:py-16 lg:py-18 border-t border-cv-line">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-cv-ink mb-8">
            Industry Average Cost Breakdown
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-cv-line bg-cv-surface2/50 dark:bg-white/5 p-8 flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={costBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {costBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                    labelStyle={{ color: "white" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              {costBreakdown.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg border border-cv-line bg-cv-surface2/50 dark:bg-white/5 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    />
                    <span className="text-cv-ink font-medium">{item.name}</span>
                  </div>
                  <span className="text-lg font-semibold text-cv-ink">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Optimization Opportunities */}
      <section className="py-14 sm:py-16 lg:py-18 border-t border-cv-line">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-cv-ink mb-8">
            Optimization Opportunities (% Savings Potential)
          </h2>
          <div className="rounded-2xl border border-cv-line bg-cv-surface2/50 dark:bg-white/5 p-8">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={optimizationOpportunities}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="area" stroke="rgba(255,255,255,0.6)" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="rgba(255,255,255,0.6)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0,0,0,0.8)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  labelStyle={{ color: "white" }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="potential"
                  stroke="#10b981"
                  name="Max Potential"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="industry"
                  stroke="#3b82f6"
                  name="Industry Average"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="yours"
                  stroke="#f59e0b"
                  name="Your Organization"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 sm:py-16 lg:py-18 border-t border-cv-line">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-20">
          <div className="rounded-2xl border border-cv-line bg-gradient-to-b from-cv-surface2/80 to-cv-surface2/50 dark:from-white/[0.06] dark:to-white/[0.03] p-10 sm:p-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-cv-ink mb-4">
                Ready to optimize your cloud spend?
              </h2>
              <p className="text-lg text-cv-muted mb-8">
                CloudVerse can help you identify and implement cost optimization strategies
                specific to your organization.
              </p>
              <Link
                href="/connect"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
              >
                Schedule a Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
