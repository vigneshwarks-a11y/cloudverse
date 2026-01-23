import { BaseLayout } from "@/layouts/BaseLayout";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "wouter";

const faqItems = [
  {
    question: "How do I get started?",
    answer: "Book a demo from our website to speak with our team. We'll walk you through setup and integrations."
  },
  {
    question: "What cloud providers do you support?",
    answer: "We support AWS, Azure, GCP, Alibaba Cloud, Huawei Cloud, Tencent Cloud, and growing support for others."
  },
  {
    question: "Is there a free trial?",
    answer: "Contact our sales team to discuss trial options for your organization."
  },
  {
    question: "How secure is CloudVerse?",
    answer: "We follow ISO 27001, SOC 2 Type II, and offer private deployment for regulated environments."
  }
];

export default function Help() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <BaseLayout>
      <section className="pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-20 relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-20">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12 space-y-3">
              <span className="inline-block text-xs uppercase tracking-widest text-cv-muted font-semibold">
                CloudVerse™ Help
              </span>
              <h1 className="cv-h1">Frequently asked questions</h1>
            </div>

            <div className="space-y-4">
              {faqItems.map((item, idx) => (
                <div key={idx} className="border border-cv-line rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="w-full px-6 py-4 flex items-center justify-between bg-cv-surface2/50 dark:bg-white/5 hover:bg-cv-surface2 dark:hover:bg-white/10 transition-colors text-left"
                  >
                    <span className="font-semibold text-cv-ink">{item.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-cv-muted transition-transform ${
                        openIndex === idx ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openIndex === idx && (
                    <div className="px-6 py-4 border-t border-cv-line bg-cv-surface2/50 dark:bg-white/5">
                      <p className="text-cv-muted">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 border border-cv-line rounded-lg bg-cv-surface2/50 dark:bg-white/5 text-center">
              <p className="text-cv-muted mb-4">Need more help?</p>
              <Link
                href="/connect"
                className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
              >
                Contact support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
