import type { Metadata } from "next";
import Snapshot from "./Snapshot";

export const metadata: Metadata = {
  title: "Efficiency Snapshot — CloudVerse",
  description: "Upload any cloud invoice and get an actionable savings report in 30 seconds. AWS, Azure, GCP, Snowflake, Databricks — analyzed by gpt-4o-mini.",
  alternates: { canonical: "/efficiency-snapshot" },
};

export default function Page() {
  return <Snapshot />;
}
