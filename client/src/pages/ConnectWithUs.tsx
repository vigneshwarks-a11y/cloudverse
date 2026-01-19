import { BaseLayout } from "@/layouts/BaseLayout";
import { Button } from "@/components/Button";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertDemoInquirySchema, type InsertDemoInquiry } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function ConnectWithUs() {
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Connect With Us — CloudVerse™";
  }, []);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<InsertDemoInquiry>({
    resolver: zodResolver(insertDemoInquirySchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      preferredDateTime: ""
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertDemoInquiry) => {
      await apiRequest("POST", "/api/demo/inquiry", data);
    },
    onSuccess: () => {
      toast({
        title: "Demo Request Submitted",
        description: "We'll be in touch shortly to confirm your demo.",
      });
      reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit request. Please try again.",
        variant: "destructive"
      });
    }
  });

  return (
    <BaseLayout>
      <section className="pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-[600px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="cv-h1 mb-4">Connect With Us</h1>
            <p className="cv-body text-cv-muted">
              Schedule a personalized demo to see how CloudVerse can transform your cloud cost management.
            </p>
          </div>
          
          <form 
            onSubmit={handleSubmit((data) => mutation.mutate(data))} 
            className="space-y-6 p-8 rounded-2xl border border-cv-line bg-cv-surface2/30"
            data-testid="demo-inquiry-form"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-xs font-medium text-cv-muted uppercase tracking-wider">
                  First Name
                </label>
                <input 
                  id="firstName"
                  {...register("firstName")}
                  placeholder="John"
                  className="w-full bg-cv-surface2 border border-cv-line rounded-md px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-cv-ink placeholder:text-cv-muted/50"
                  data-testid="input-first-name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs">{errors.firstName.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-xs font-medium text-cv-muted uppercase tracking-wider">
                  Last Name
                </label>
                <input 
                  id="lastName"
                  {...register("lastName")}
                  placeholder="Doe"
                  className="w-full bg-cv-surface2 border border-cv-line rounded-md px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-cv-ink placeholder:text-cv-muted/50"
                  data-testid="input-last-name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-medium text-cv-muted uppercase tracking-wider">
                Email
              </label>
              <input 
                id="email"
                type="email"
                {...register("email")}
                placeholder="john@company.com"
                className="w-full bg-cv-surface2 border border-cv-line rounded-md px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-cv-ink placeholder:text-cv-muted/50"
                data-testid="input-email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="preferredDateTime" className="text-xs font-medium text-cv-muted uppercase tracking-wider">
                Preferred Date & Time
              </label>
              <input 
                id="preferredDateTime"
                type="datetime-local"
                {...register("preferredDateTime")}
                className="w-full bg-cv-surface2 border border-cv-line rounded-md px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-cv-ink"
                data-testid="input-datetime"
              />
              {errors.preferredDateTime && (
                <p className="text-red-500 text-xs">{errors.preferredDateTime.message}</p>
              )}
            </div>

            <Button 
              type="submit" 
              size="lg"
              className="w-full"
              disabled={mutation.isPending}
              data-testid="button-submit-demo"
            >
              {mutation.isPending ? "Submitting..." : "Request Demo"}
            </Button>
          </form>
        </div>
      </section>
    </BaseLayout>
  );
}
