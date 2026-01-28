import { BaseLayout } from "@/layouts/BaseLayout";
import { Button } from "@/components/Button";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { track } from "@/lib/track";
import { featuredGuides, categories, guides } from "@/data/resourcesData";
import { FinalCTA } from "@/components/FinalCTA";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const subscribeSchema = z.object({
  email: z.string().email("Valid email is required"),
});

type SubscribeFormData = z.infer<typeof subscribeSchema>;

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
      await apiRequest("POST", "/api/subscribe", {
        firstName: "",
        lastName: "",
        email: data.email,
      });
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
      {/* Hero with Subscribe */}
      <section className="pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-14 lg:pb-16">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <span className="text-xs uppercase tracking-widest text-cv-muted mb-4 inline-block">CloudVerse™ Resources</span>
              <h1 className="cv-h1 mb-4">Guides and documentation for enterprise FinOps</h1>
              <p className="text-[15px] sm:text-[16px] lg:text-[17px] leading-[24px] sm:leading-[26px] lg:leading-[28px] text-cv-muted mb-6">
                Practical guidance on visibility, allocation, anomalies, and automation across cloud, data, and AI platforms.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                <Link href="/resources/guides" data-track="resources_guides_open">
                  <Button size="lg" className="w-full sm:w-auto">
                    Browse guides
                  </Button>
                </Link>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl border border-cv-line bg-cv-surface2/50 dark:bg-white/5">
              <h3 className="text-lg font-semibold text-cv-ink mb-2">Subscribe</h3>
              <p className="text-sm text-cv-muted mb-4">
                Get the latest guides and FinOps insights delivered to your inbox.
              </p>
              <form 
                onSubmit={handleSubmit((data) => mutation.mutate(data))} 
                className="space-y-4"
                data-testid="subscribe-form"
              >
                <input 
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="your@email.com"
                  className="w-full bg-cv-surface border border-cv-line rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-cv-ink placeholder:text-cv-muted/50 text-sm"
                  data-testid="input-email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
                <Button 
                  type="submit" 
                  size="lg"
                  className="w-full"
                  disabled={mutation.isPending}
                  data-testid="button-subscribe"
                >
                  {mutation.isPending ? "Subscribing..." : "Subscribe"}
                </Button>
                <p className="text-xs text-cv-muted text-center">
                  We'll never share your information.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Guides */}
      <section className="py-14 sm:py-16 lg:py-20 border-t border-cv-line">
        <div className="cv-container max-w-[1000px]">
          <div className="flex items-center justify-between mb-8">
            <h2 className="cv-h2">Featured</h2>
            <Link href="/resources/guides">
              <Button variant="ghost" size="sm" className="text-cv-muted hover:text-cv-ink">
                View all guides
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredGuides.slice(0, 3).map((guide) => (
              <Link 
                key={guide.slug} 
                href={`/resources/guides/${guide.slug}`}
                className="block rounded-xl border border-cv-line bg-cv-surface2 p-5 hover:bg-cv-line/30 transition-colors"
              >
                <span className="text-xs font-medium px-2 py-1 rounded border border-cv-line bg-cv-surface text-cv-muted inline-block mb-3">
                  {guide.category}
                </span>
                <h4 className="text-sm font-semibold text-cv-ink mb-2 line-clamp-2">
                  {guide.title}
                </h4>
                <p className="text-sm text-cv-muted mb-3 line-clamp-2">
                  {guide.summary}
                </p>
                {guide.readingTime && (
                  <span className="text-xs text-cv-muted/70">{guide.readingTime}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* Browse by Category */}
      <section className="py-14 sm:py-16 lg:py-20 border-t border-cv-line">
        <div className="cv-container max-w-[1000px]">
          <h2 className="cv-h2 mb-6">Browse by category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/resources/guides?category=${encodeURIComponent(category)}`}
                className="text-sm font-medium px-4 py-2 rounded-full border border-cv-line bg-cv-surface2 text-cv-muted hover:bg-cv-line/30 transition-colors"
              >
                {category}
              </Link>
            ))}
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
    </BaseLayout>
  );
}
