import { BaseLayout } from "@/layouts/BaseLayout";
import { Button } from "@/components/Button";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { track } from "@/lib/track";
import { guides } from "@/data/resourcesData";
import { blogPosts } from "@/data/blogData";
import { FinalCTA } from "@/components/FinalCTA";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { subscribers } from "@shared/schema";

const subscribeSchema = z.object({
  email: z.string().email("Valid email is required"),
});

type SubscribeFormData = z.infer<typeof subscribeSchema>;
const SHOULD_CALL_SUBSCRIBE_API = false;

export default function Resources() {
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Resources — CloudVerse™";
  }, []);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<SubscribeFormData>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      email: "",
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: SubscribeFormData) => {
      if (SHOULD_CALL_SUBSCRIBE_API) {
        await apiRequest("POST", "/api/subscribe", {
          firstName: "",
          lastName: "",
          email: data.email,
        });
      }
    },
    onSuccess: () => {
      toast({
        title: "Subscribed!",
        description: "You'll receive our latest resources and updates.",
      });
      reset();
      track("resources_subscribe_success");
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to subscribe. Please try again.",
        variant: "destructive"
      });
    }
  });

  return (
    <BaseLayout>
      {/* Hero */}
      <section className="pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-14 lg:pb-16">
        <div className="cv-container-full space-y-4 sm:space-y-6">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest text-cv-muted mb-4 inline-block">CloudVerse™ Resources</span>
            <h1 className="cv-h1 mb-4">Guides and documentation for infrastructure economics</h1>
            <p className="text-[15px] sm:text-[16px] lg:text-[17px] leading-[24px] sm:leading-[26px] lg:leading-[28px] text-cv-muted mb-6">
              Practical guidance on visibility, allocation, anomalies, and automation across cloud, data, and AI platforms.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">

              <Button size="lg" className="w-full sm:w-auto" data-testid="button-subscribe" onClick={() => {
                document.getElementById("subscribe-section")?.scrollIntoView({ behavior: "smooth" });
              }}>
                Subscribe
              </Button>

              <Link href="/resources/guides" data-track="resources_guides_open">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Browse Guides
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Blog Section */}
      <section className="py-14 sm:py-16 lg:py-20 border-t border-cv-line">
        <div className="cv-container max-w-[1000px]">
          <h2 className="cv-h2 mb-8">Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <div
                key={post.slug}
                className="block rounded-xl border border-cv-line bg-cv-surface2 p-5 hover:bg-cv-line/30 transition-colors cursor-pointer"
                data-testid={`card-blog-${post.slug}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium px-2 py-1 rounded border border-cv-line bg-cv-surface text-cv-muted">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-cv-ink mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-cv-muted mb-4 line-clamp-3">
                  {post.summary}
                </p>
                <div className="flex items-center justify-between text-xs text-cv-muted/70">
                  <span>{post.author}</span>
                  <div className="flex items-center gap-2">
                    <span>{post.readingTime}</span>
                    <span>·</span>
                    <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/blog">
              <Button variant="secondary" data-testid="button-view-all-blog">View all posts</Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Guides Section */}
      <section className="py-14 sm:py-16 lg:py-20 border-t border-cv-line">
        <div className="cv-container max-w-[1000px]">
          <h2 className="cv-h2 mb-8">Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.slice(0, 4).map((guide) => (
              <Link
                key={guide.slug}
                href={`/resources/guides/${guide.slug}`}
                className="block rounded-xl border border-cv-line bg-cv-surface2 p-6 hover:bg-cv-line/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium px-2 py-1 rounded border border-cv-line bg-cv-surface text-cv-muted">
                    {guide.category}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-cv-ink mb-2">
                  {guide.title}
                </h3>
                <p className="text-sm text-cv-muted mb-4 line-clamp-2">
                  {guide.summary}
                </p>
                <div className="flex items-center gap-3 text-xs text-cv-muted/70">
                  {guide.readingTime && <span>{guide.readingTime}</span>}
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/resources/guides">
              <Button variant="secondary">View all guides</Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Bottom CTA */}
      <FinalCTA
        title="Want help applying this to your environment?"
        location="resources_bottom"
      />
    </BaseLayout >
  );
}
