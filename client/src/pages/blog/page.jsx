import { blogData } from "./data";
import { useEffect } from "react";
import { BaseLayout } from "@/layouts/BaseLayout";
import Banner from "./components/Banner";
import Blogs from "./components/Blogs";

const BlogPage = () => {
  useEffect(() => {
    document.title = "Blog CloudVerse™";
  }, []);

  return (
    <BaseLayout>
      <Banner />
      <Blogs blogData={blogData} />
    </BaseLayout>
  );
};

export default BlogPage;
