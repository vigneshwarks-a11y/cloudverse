import { BaseLayout } from "@/layouts/BaseLayout";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { termsContent, type LegalSection, type LegalSubsection } from "@/data/termsContent";
import { privacyContent } from "@/data/privacyContent";

export default function Legal() {
  const [location] = useLocation();
  
  useEffect(() => {
    if (location === "/legal/terms") {
      document.title = "Terms of Service — CloudVerse™";
    } else if (location === "/legal/privacy") {
      document.title = "Privacy Policy — CloudVerse™";
    }
  }, [location]);

  const isTerms = location === "/legal/terms";
  const content = isTerms ? termsContent : privacyContent;

  return (
    <BaseLayout>
      <section className="pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-20">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-cv-ink mb-8">
            {content.title}
          </h1>

          <div className="prose max-w-none text-cv-muted space-y-8">
            {content.intro && (
              <p className="text-cv-ink font-medium leading-relaxed">
                {content.intro}
              </p>
            )}
            
            {content.sections.map((section: LegalSection) => (
              <div key={section.id} className="space-y-4">
                <h2 className="text-2xl font-bold text-cv-ink border-b border-cv-line pb-2">
                  {section.title}
                </h2>
                
                {section.body && <p className="leading-relaxed">{section.body}</p>}
                
                {section.content && (
                  <div className="space-y-4">
                    {section.content.map((p, i) => (
                      <p key={i} className="leading-relaxed">{p}</p>
                    ))}
                  </div>
                )}

                {section.intro && <p className="leading-relaxed">{section.intro}</p>}
                
                {section.list && (
                  <ul className="list-disc pl-6 space-y-2">
                    {section.list.map((item, i) => (
                      <li key={i} className="leading-relaxed">{item}</li>
                    ))}
                  </ul>
                )}

                {section.subsections && (
                  <div className="space-y-6 pl-4 border-l-2 border-cv-line">
                    {section.subsections.map((sub: LegalSubsection, i) => (
                      <div key={i} className="space-y-2">
                        <h3 className="text-lg font-semibold text-cv-ink">{sub.title}</h3>
                        {sub.body && <p className="leading-relaxed">{sub.body}</p>}
                        {sub.intro && <p className="leading-relaxed">{sub.intro}</p>}
                        {sub.list && (
                          <ul className="list-disc pl-6 space-y-2">
                            {sub.list.map((item, j) => (
                              <li key={j} className="leading-relaxed">{item}</li>
                            ))}
                          </ul>
                        )}
                        {sub.footer && <p className="text-sm italic mt-2">{sub.footer}</p>}
                      </div>
                    ))}
                  </div>
                )}

                {section.footer && <p className="text-sm italic pt-2">{section.footer}</p>}
              </div>
            ))}
            
            <p className="text-sm text-cv-muted pt-8 border-t border-cv-line">
              Last updated: {content.lastUpdated}
            </p>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
