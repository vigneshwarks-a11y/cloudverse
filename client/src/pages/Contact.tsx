import { BaseLayout } from "@/layouts/BaseLayout";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { useForm } from "react-hook-form";
import { track } from "@/lib/track";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function Contact() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data: any) => {
    track("contact_submit", data);
    setSubmitted(true);
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
                <label className="text-sm font-medium">First Name</label>
                <input 
                  {...register("firstName", { required: true })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Jane"
                />
                {errors.firstName && <span className="text-red-500 text-xs">Required</span>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name</label>
                <input 
                  {...register("lastName", { required: true })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Doe"
                />
                {errors.lastName && <span className="text-red-500 text-xs">Required</span>}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Work Email</label>
              <input 
                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="jane@company.com"
              />
              {errors.email && <span className="text-red-500 text-xs">Valid email required</span>}
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
