import { Button } from "@/components/Button";
import { track } from "@/lib/track";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface FinalCTAProps {
  title?: string;
  description?: string;
  location: string;
}

export function FinalCTA({ 
  title = "Stay updated with CloudVerse", 
  description = "Get the latest guides, best practices, and FinOps insights delivered to your inbox.",
  location
}: FinalCTAProps) {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const mutation = useMutation({
    mutationFn: async (data: { email: string }) => {
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
      setEmail("");
      track("subscribe_success", { location });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to subscribe. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      mutation.mutate({ email });
    }
  };

  return (
    <section className="py-8 sm:py-10 lg:py-12 border-t border-cv-line dark:border-white/10">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-20">
        <div className="rounded-2xl border border-cv-line bg-cv-surface2/50 dark:bg-gradient-to-b dark:from-white/[0.06] dark:to-white/[0.03] p-10 sm:p-12 lg:p-16 flex flex-col items-center text-center">
          <div className="max-w-2xl flex flex-col items-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-cv-ink mb-4">
              {title}
            </h2>
            <p className="text-lg sm:text-xl text-cv-muted mb-8">
              {description}
            </p>
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 bg-cv-surface2 border border-cv-line rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-cv-ink placeholder:text-cv-muted/50"
                  data-testid="input-email-cta"
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full sm:w-auto"
                  disabled={mutation.isPending}
                  data-testid="button-subscribe-cta"
                >
                  {mutation.isPending ? "Subscribing..." : "Subscribe"}
                </Button>
              </div>
              <p className="text-xs text-cv-muted mt-4">
                We'll never share your information.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
