import { BaseLayout } from "@/layouts/BaseLayout";
import { Button } from "@/components/Button";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, Users, Zap, Shield, TrendingDown } from "lucide-react";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  preferredDate: z.string().min(1, "Preferred date is required"),
  preferredTime: z.string().min(1, "Preferred time is required"),
});

type FormData = z.infer<typeof formSchema>;

const benefits = [
  {
    icon: TrendingDown,
    title: "See Your Savings Potential",
    description: "Get a personalized analysis of optimization opportunities across your cloud spend."
  },
  {
    icon: Users,
    title: "Talk to Cloud Experts",
    description: "Our team has helped enterprises save millions on cloud infrastructure."
  },
  {
    icon: Zap,
    title: "30-Minute Deep Dive",
    description: "A focused session tailored to your specific cloud challenges and goals."
  },
  {
    icon: Shield,
    title: "No Commitment Required",
    description: "Learn how CloudVerse works with zero pressure. We're here to help."
  }
];

export default function ConnectWithUs() {
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Connect With Us — CloudVerse™";
  }, []);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      preferredDate: "",
      preferredTime: ""
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        preferredDateTime: `${data.preferredDate}T${data.preferredTime}`
      };
      await apiRequest("POST", "/api/demo/inquiry", payload);
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
      <section className="pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 lg:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
        
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12 lg:mb-16">
            <span className="inline-block text-xs uppercase tracking-widest text-blue-500 font-semibold mb-4">
              Schedule a Demo
            </span>
            <h1 className="cv-h1 mb-4">Let's explore what's possible</h1>
            <p className="cv-body text-cv-muted max-w-2xl mx-auto">
              See how CloudVerse can help your team gain visibility, control costs, and unlock savings across your cloud infrastructure.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="space-y-8">
              <div className="space-y-6">
                {benefits.map((benefit, idx) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={idx} className="flex gap-4 group">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                        <Icon className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-cv-ink mb-1">{benefit.title}</h3>
                        <p className="text-sm text-cv-muted">{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="hidden lg:block p-6 rounded-xl border border-cv-line bg-cv-surface2/50">
                <div className="flex items-start gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face" 
                    alt="Customer" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm text-cv-muted italic mb-3">
                      "CloudVerse helped us identify $2.3M in annual savings within the first month. The demo was incredibly valuable."
                    </p>
                    <p className="text-sm font-semibold text-cv-ink">Sarah Chen</p>
                    <p className="text-xs text-cv-muted">VP of Engineering, TechCorp</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-50" />
              <form 
                onSubmit={handleSubmit((data) => mutation.mutate(data))} 
                className="relative space-y-5 p-8 sm:p-10 rounded-2xl border border-cv-line bg-cv-surface dark:bg-cv-surface/80 backdrop-blur-sm shadow-xl"
                data-testid="demo-inquiry-form"
              >
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-cv-ink mb-2">Book Your Demo</h2>
                  <p className="text-sm text-cv-muted">Fill in your details and we'll be in touch shortly.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-xs font-medium text-cv-muted uppercase tracking-wider">
                      First Name
                    </label>
                    <input 
                      id="firstName"
                      {...register("firstName")}
                      placeholder="John"
                      className="w-full bg-cv-surface2 border border-cv-line rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-cv-ink placeholder:text-cv-muted/50"
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
                      className="w-full bg-cv-surface2 border border-cv-line rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-cv-ink placeholder:text-cv-muted/50"
                      data-testid="input-last-name"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-medium text-cv-muted uppercase tracking-wider">
                    Work Email
                  </label>
                  <input 
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="john@company.com"
                    className="w-full bg-cv-surface2 border border-cv-line rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-cv-ink placeholder:text-cv-muted/50"
                    data-testid="input-email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs">{errors.email.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="preferredDate" className="text-xs font-medium text-cv-muted uppercase tracking-wider flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      Preferred Date
                    </label>
                    <input 
                      id="preferredDate"
                      type="date"
                      {...register("preferredDate")}
                      className="w-full bg-cv-surface2 border border-cv-line rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-cv-ink"
                      data-testid="input-date"
                    />
                    {errors.preferredDate && (
                      <p className="text-red-500 text-xs">{errors.preferredDate.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="preferredTime" className="text-xs font-medium text-cv-muted uppercase tracking-wider flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" />
                      Preferred Time
                    </label>
                    <input 
                      id="preferredTime"
                      type="time"
                      {...register("preferredTime")}
                      className="w-full bg-cv-surface2 border border-cv-line rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-cv-ink"
                      data-testid="input-time"
                    />
                    {errors.preferredTime && (
                      <p className="text-red-500 text-xs">{errors.preferredTime.message}</p>
                    )}
                  </div>
                </div>

                <Button 
                  type="submit" 
                  size="lg"
                  className="w-full mt-2"
                  disabled={mutation.isPending}
                  data-testid="button-submit-demo"
                >
                  {mutation.isPending ? "Submitting..." : "Request Demo"}
                </Button>
                
                <p className="text-xs text-cv-muted text-center pt-2">
                  By submitting, you agree to our privacy policy. We'll never share your information.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
