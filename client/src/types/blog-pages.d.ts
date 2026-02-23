declare module "@/pages/blog/page" {
  import type { ComponentType } from "react";
  import type { RouteComponentProps } from "wouter";

  const BlogPage: ComponentType<RouteComponentProps>;
  export default BlogPage;
}

declare module "@/pages/blog/[slug]/page" {
  import type { ComponentType } from "react";
  import type { RouteComponentProps } from "wouter";

  const BlogDetailPage: ComponentType<RouteComponentProps<{ slug: string }>>;
  export default BlogDetailPage;
}
