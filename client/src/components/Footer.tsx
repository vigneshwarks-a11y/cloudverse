import { Link } from "wouter";
import { track } from "@/lib/track";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "Platform", href: "/platform" },
        { label: "Solutions", href: "/solutions" },
        { label: "Integrations", href: "/integrations" },
        { label: "Pricing", href: "/pricing" },
        { label: "Security", href: "/security" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "/resources" },
        { label: "Documentation", href: "#" },
        { label: "API Reference", href: "#" },
        { label: "Status", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Careers", href: "#" },
        { label: "Contact", href: "/contact" },
        { label: "Legal", href: "/legal/terms" },
      ],
    },
  ];

  return (
    <footer className="bg-secondary/30 pt-16 sm:pt-20 lg:pt-24 pb-10 sm:pb-12 border-t border-border mt-auto">
      <div className="cv-container">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 mb-12 sm:mb-16">
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <Link 
              href="/" 
              onClick={() => track("footer_home")}
              className="flex items-center gap-2 text-xl font-bold tracking-tight mb-4"
            >
              <img src="/logo.png" alt="CloudVerse.ai" className="h-7 w-auto" />
              <span>CloudVerse.ai</span>
            </Link>
            <p className="text-muted-foreground text-[14px] sm:text-[15px] max-w-xs">
              Cloud financial management for modern engineering teams. Visibility, allocation, and optimization in one platform.
            </p>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="font-semibold text-[13px] text-foreground mb-3 sm:mb-4">{column.title}</h4>
              <ul className="space-y-2 sm:space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-[13px] text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 sm:pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[12px] sm:text-[13px] text-muted-foreground text-center sm:text-left">
            © {currentYear} CloudVerse Inc. All rights reserved.
          </p>
          <div className="flex gap-4 sm:gap-6">
            <Link 
              href="/legal/privacy"
              className="text-[12px] sm:text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/legal/terms"
              className="text-[12px] sm:text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
