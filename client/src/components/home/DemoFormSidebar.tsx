import { Button } from "@/components/Button";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar as CalendarIcon, Clock, ChevronDown, CheckCircle } from "lucide-react";
import { track } from "@/lib/track";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { THANK_YOU_URL } from "@/lib/links";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  preferredDate: z.string().min(1, "Preferred date is required"),
  preferredTime: z.string().min(1, "Preferred time is required"),
});

type FormData = z.infer<typeof formSchema>;

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

export function DemoFormSidebar() {
  const [dateOpen, setDateOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 600 && !isHighlighted) {
        setIsHighlighted(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHighlighted]);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      preferredDate: "",
      preferredTime: "",
    }
  });

  const onSubmit = (data: FormData) => {
    track("demo_inquiry_submit", {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      source: "homepage_sidebar",
    });
    reset();
    setSelectedDate(undefined);
    setDateOpen(false);
    window.location.href = THANK_YOU_URL;
  };

  const inputClass = "w-full bg-cv-surface2 border border-cv-line rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-cv-ink placeholder:text-cv-muted/50";

  return (
    <div
      ref={sidebarRef}
      className={`rounded-2xl border bg-cv-surface p-5 shadow-lg transition-all duration-500 ${
        isHighlighted
          ? "border-blue-500/40 shadow-blue-500/10"
          : "border-cv-line shadow-cv-line/10"
      }`}
      data-testid="demo-form-sidebar"
    >
      <div className="text-center mb-5">
        <span className="inline-block text-[10px] uppercase tracking-[0.2em] text-blue-500 font-semibold mb-2">
          Schedule a Demo
        </span>
        <h3 className="text-lg font-bold text-cv-ink leading-snug">
          See CloudVerse™ in action
        </h3>
        <p className="text-xs text-cv-muted mt-1">
          30-minute personalized walkthrough
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3"
        data-testid="sidebar-demo-form"
      >
        <div className="grid grid-cols-2 gap-2">
          <div>
            <input
              {...register("firstName")}
              placeholder="First name"
              className={inputClass}
              data-testid="sidebar-input-first-name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-[10px] mt-0.5">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <input
              {...register("lastName")}
              placeholder="Last name"
              className={inputClass}
              data-testid="sidebar-input-last-name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-[10px] mt-0.5">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div>
          <input
            type="email"
            {...register("email")}
            placeholder="Work email"
            className={inputClass}
            data-testid="sidebar-input-email"
          />
          {errors.email && (
            <p className="text-red-500 text-[10px] mt-0.5">{errors.email.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Popover open={dateOpen} onOpenChange={setDateOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className={`${inputClass} text-left cursor-pointer flex items-center justify-between`}
                data-testid="sidebar-input-date"
              >
                <span className={selectedDate ? "text-cv-ink" : "text-cv-muted/50"}>
                  {selectedDate ? format(selectedDate, "MMM d") : "Date"}
                </span>
                <CalendarIcon className="w-3.5 h-3.5 text-cv-muted" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 bg-cv-surface border border-cv-line shadow-xl rounded-xl"
              align="start"
            >
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
                disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                initialFocus
                className="rounded-xl"
              />
            </PopoverContent>
          </Popover>
          <input type="hidden" {...register("preferredDate")} />

          <div className="relative">
            <select
              {...register("preferredTime")}
              className={`${inputClass} appearance-none cursor-pointer pr-8`}
              data-testid="sidebar-input-time"
            >
              <option value="">Time</option>
              {timeSlots.map((slot) => (
                <option key={slot.value} value={slot.value}>
                  {slot.label}
                </option>
              ))}
            </select>
            <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-cv-muted pointer-events-none" />
          </div>
        </div>
        {(errors.preferredDate || errors.preferredTime) && (
          <p className="text-red-500 text-[10px]">
            {errors.preferredDate?.message || errors.preferredTime?.message}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          className="w-full"
          data-testid="sidebar-button-submit"
        >
          Request Demo
        </Button>
      </form>

      <div className="mt-4 space-y-2">
        {["No credit card required", "30-min personalized session", "Works with AWS, Azure, GCP"].map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-[11px] text-cv-muted">
            <CheckCircle className="w-3 h-3 text-green-500 shrink-0" />
            <span>{item}</span>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-cv-muted/60 text-center mt-3">
        By submitting, you agree to our privacy policy.
      </p>
    </div>
  );
}
