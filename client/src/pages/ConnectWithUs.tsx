import { BaseLayout } from "@/layouts/BaseLayout";
import { Button } from "@/components/Button";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Calendar as CalendarIcon, Clock, ChevronDown } from "lucide-react";
import { useSearch } from "wouter";
import { integrationsData } from "@/data/integrationsData";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { track } from "@/lib/track";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  preferredDate: z.string().min(1, "Preferred date is required"),
  preferredTime: z.string().min(1, "Preferred time is required"),
  interestedIntegration: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const integrationOptions = [
  { value: "", label: "No specific integration" },
  ...integrationsData.map(i => ({ value: i.name, label: i.name }))
];

const timeSlots = [
  { value: "09:00", label: "9:00 AM" },
  { value: "09:30", label: "9:30 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "10:30", label: "10:30 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "11:30", label: "11:30 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "12:30", label: "12:30 PM" },
  { value: "13:00", label: "1:00 PM" },
  { value: "13:30", label: "1:30 PM" },
  { value: "14:00", label: "2:00 PM" },
  { value: "14:30", label: "2:30 PM" },
  { value: "15:00", label: "3:00 PM" },
  { value: "15:30", label: "3:30 PM" },
  { value: "16:00", label: "4:00 PM" },
  { value: "16:30", label: "4:30 PM" },
  { value: "17:00", label: "5:00 PM" },
];

export default function ConnectWithUs() {
  const { toast } = useToast();
  const searchString = useSearch();
  const urlParams = new URLSearchParams(searchString);
  const integrationFromUrl = urlParams.get("integration") || "";
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [dateOpen, setDateOpen] = useState(false);

  useEffect(() => {
    document.title = "Connect With Us — CloudVerse™";
  }, []);

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      preferredDate: "",
      preferredTime: "",
      interestedIntegration: integrationFromUrl
    }
  });

  useEffect(() => {
    if (integrationFromUrl) {
      setValue("interestedIntegration", integrationFromUrl);
    }
  }, [integrationFromUrl, setValue]);

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        preferredDateTime: `${data.preferredDate}T${data.preferredTime}`,
        interestedIntegration: data.interestedIntegration || null
      };
      await apiRequest("POST", "/api/demo/inquiry", payload);
    },
    onSuccess: (_data, variables) => {
      track("demo_inquiry_submit", {
        preferredDate: variables.preferredDate,
        preferredTime: variables.preferredTime,
        interestedIntegration: variables.interestedIntegration || "none",
      });
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
          
          <div className="max-w-[700px] mx-auto">
            <form 
              onSubmit={handleSubmit((data) => mutation.mutate(data))} 
              className="space-y-8"
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
                      className="w-full bg-cv-surface2 border border-cv-line rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-cv-ink placeholder:text-cv-muted/50"
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
                      className="w-full bg-cv-surface2 border border-cv-line rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-cv-ink placeholder:text-cv-muted/50"
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
                    className="w-full bg-cv-surface2 border border-cv-line rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-cv-ink placeholder:text-cv-muted/50"
                    data-testid="input-email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="interestedIntegration" className="text-xs font-medium text-cv-muted uppercase tracking-wider">
                    Interested in a specific integration?
                  </label>
                  <div className="relative">
                    <select
                      id="interestedIntegration"
                      {...register("interestedIntegration")}
                      className="w-full bg-cv-surface2 border border-cv-line rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-cv-ink appearance-none cursor-pointer"
                      data-testid="select-integration"
                    >
                      {integrationOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cv-muted pointer-events-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-cv-muted uppercase tracking-wider flex items-center gap-2">
                      <CalendarIcon className="w-3.5 h-3.5" />
                      Preferred Date
                    </label>
                    <Popover open={dateOpen} onOpenChange={setDateOpen}>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className="w-full bg-cv-surface2 border border-cv-line rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-cv-ink text-left flex items-center justify-between"
                          data-testid="input-date"
                        >
                          <span className={selectedDate ? "text-cv-ink" : "text-cv-muted/50"}>
                            {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
                          </span>
                          <CalendarIcon className="w-4 h-4 text-cv-muted" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={(date) => {
                            setSelectedDate(date);
                            if (date) {
                              setValue("preferredDate", format(date, "yyyy-MM-dd"));
                            }
                            setDateOpen(false);
                          }}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <input type="hidden" {...register("preferredDate")} />
                    {errors.preferredDate && (
                      <p className="text-red-500 text-xs">{errors.preferredDate.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="preferredTime" className="text-xs font-medium text-cv-muted uppercase tracking-wider flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" />
                      Preferred Time
                    </label>
                    <div className="relative">
                      <select
                        id="preferredTime"
                        {...register("preferredTime")}
                        className="w-full bg-cv-surface2 border border-cv-line rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-cv-ink appearance-none cursor-pointer"
                        data-testid="input-time"
                      >
                        <option value="">Select a time</option>
                        {timeSlots.map((slot) => (
                          <option key={slot.value} value={slot.value}>
                            {slot.label}
                          </option>
                        ))}
                      </select>
                      <Clock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cv-muted pointer-events-none" />
                    </div>
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
      </section>
    </BaseLayout>
  );
}
