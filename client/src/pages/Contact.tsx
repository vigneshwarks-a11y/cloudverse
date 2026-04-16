import { BaseLayout } from "@/layouts/BaseLayout";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { track } from "@/lib/track";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { THANK_YOU_URL } from "@/lib/links";
import { isWorkEmail } from "@/lib/workEmailValidation";

const contactFormSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z
    .string()
    .trim()
    .email("Enter a valid work email")
    .refine(isWorkEmail, "Please use your work email, not a personal email"),
  companyName: z.string().trim().min(1, "Company name is required"),
  phoneNumber: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) => !value || /^[+]?[\d\s().-]{7,20}$/.test(value),
      "Enter a valid phone number",
    ),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      companyName: "",
      phoneNumber: "",
      message: "",
    },
  });
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data: ContactFormData) => {
    track("contact_submit", data);
    setSubmitted(true);
    window.location.href = THANK_YOU_URL;
  };

  return (
    <BaseLayout>
      <Section className="pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-20 max-w-2xl mx-auto px-5 sm:px-6">
        <div className="text-center mb-12">
           <h1 className="mb-6">Contact Us</h1>
           <p className="text-xl text-muted-foreground">
             Questions? We'd love to hear from you.
           </p>
        </div>

        {submitted ? (
          <Card className="text-center py-16">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Message Sent</h3>
            <p className="text-muted-foreground mb-8">We'll get back to you shortly.</p>
            <Button onClick={() => setSubmitted(false)} variant="outline">Send another</Button>
          </Card>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-card p-8 rounded-[24px] border border-border/50 shadow-sm">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">First Name *</label>
                <input 
                  {...register("firstName")}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Jane"
                  aria-invalid={Boolean(errors.firstName)}
                  required
                />
                {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName.message}</span>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name *</label>
                <input 
                  {...register("lastName")}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Doe"
                  aria-invalid={Boolean(errors.lastName)}
                  required
                />
                {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName.message}</span>}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Work Email *</label>
              <input 
                type="email"
                {...register("email")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="jane@company.com"
                aria-invalid={Boolean(errors.email)}
                required
              />
              {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Company Name *</label>
              <input 
                {...register("companyName")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Acme Corp"
                aria-invalid={Boolean(errors.companyName)}
                required
              />
              {errors.companyName && <span className="text-red-500 text-xs">{errors.companyName.message}</span>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number (Optional)</label>
              <input 
                type="tel"
                {...register("phoneNumber")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="+1 (555) 123-4567"
                aria-invalid={Boolean(errors.phoneNumber)}
              />
              {errors.phoneNumber && <span className="text-red-500 text-xs">{errors.phoneNumber.message}</span>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <textarea 
                {...register("message")}
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="How can we help?"
              />
            </div>

            <Button type="submit" size="lg" className="w-full">
              Send Message
            </Button>
          </form>
        )}
      </Section>
    </BaseLayout>
  );
}
