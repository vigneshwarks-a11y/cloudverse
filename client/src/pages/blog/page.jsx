import { blogData } from "./data";
import { useEffect } from "react";
import { BaseLayout } from "@/layouts/BaseLayout";
import { applyPageSeo, clearPageSeo } from "@/lib/seo";
import Banner from "./components/Banner";
import Blogs from "./components/Blogs";

const BlogPage = () => {
  useEffect(() => {
    applyPageSeo({
      title: "Blog | Cloud Cost Optimization & Engineering Led FinOps",
      description: "cloud cost optimization, engineering led finops, cloud unit economics",
      keywords: "cloud cost optimization, engineering led finops, cloud unit economics",
      ogTitle: "CloudVerse Blog",
      ogDescription:
        "Articles on cloud cost optimization, engineering-led governance, and unit economics for cloud, data, and AI infrastructure.",
      llmSummary:
        "The CloudVerse blog shares practical perspectives on cloud economic intelligence: how teams allocate spend, define unit economics, and operationalize engineering-led governance. It includes insights for FinOps leaders, platform engineers, data teams, and AI infrastructure owners.",
    });

    return clearPageSeo;
  }, []);

  return (
    <BaseLayout>
      <Banner />
      <Blogs blogData={blogData} />
    </BaseLayout>
  );
};

export default BlogPage;
