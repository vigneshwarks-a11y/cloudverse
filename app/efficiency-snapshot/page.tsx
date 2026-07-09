import type { Metadata } from "next";
import Snapshot from "./Snapshot";

export const metadata: Metadata = {
  title: "Efficiency Snapshot: CloudVerse",
  description: "Upload any cloud invoice and get an actionable savings report in 30 seconds. AWS, Azure, GCP, Snowflake, Databricks, analyzed by gpt-4o-mini.",
  keywords: ["cloud invoice analyzer", "cloud savings report", "AWS cost analysis", "Azure cost optimization", "cloud efficiency tool"],
  alternates: { canonical: "/efficiency-snapshot" },
  openGraph: {
    title: "Efficiency Snapshot: Free Cloud Invoice Analyzer",
    description: "Upload any cloud invoice and get an actionable savings report in 30 seconds. AWS, Azure, GCP, Snowflake, Databricks.",
    url: "/efficiency-snapshot",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "CloudVerse Efficiency Snapshot Tool" }],
  },
  twitter: { card: "summary_large_image", title: "Efficiency Snapshot: Free Cloud Invoice Analyzer", description: "Upload any cloud invoice. Get an actionable savings report in 30 seconds." },
};

export default function Page() {
  return <Snapshot />;
}
