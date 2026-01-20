import { BaseLayout } from "@/layouts/BaseLayout";
import { useEffect } from "react";
import { Linkedin } from "lucide-react";

const leadershipTeam = [
  {
    name: "Chaand Deshwal",
    role: "Founder & CEO",
    image: "/team/chaand-deshwal.jpg",
    linkedin: "https://linkedin.com/in/chaand-deshwal",
  },
  {
    name: "Ann Pho Quoc",
    role: "CPTO",
    image: "/team/ann-pho-quoc.jpg",
    linkedin: "https://linkedin.com/in/ann-pho-quoc",
  },
  {
    name: "Justin",
    role: "GTM Lead North-America",
    image: "/team/justin.jpg",
    linkedin: "https://linkedin.com/in/justin",
  },
];

const boardOfAdvisory = [
  {
    name: "Advisor 1",
    role: "Board Advisor",
    image: "/team/advisor-1.jpg",
    linkedin: "https://linkedin.com/in/advisor-1",
  },
  {
    name: "Advisor 2",
    role: "Board Advisor",
    image: "/team/advisor-2.jpg",
    linkedin: "https://linkedin.com/in/advisor-2",
  },
  {
    name: "Advisor 3",
    role: "Board Advisor",
    image: "/team/advisor-3.jpg",
    linkedin: "https://linkedin.com/in/advisor-3",
  },
  {
    name: "Advisor 4",
    role: "Board Advisor",
    image: "/team/advisor-4.jpg",
    linkedin: "https://linkedin.com/in/advisor-4",
  },
  {
    name: "Advisor 5",
    role: "Board Advisor",
    image: "/team/advisor-5.jpg",
    linkedin: "https://linkedin.com/in/advisor-5",
  },
  {
    name: "Advisor 6",
    role: "Board Advisor",
    image: "/team/advisor-6.jpg",
    linkedin: "https://linkedin.com/in/advisor-6",
  },
];

export default function AboutUs() {
  useEffect(() => {
    document.title = "About Us — CloudVerse™";
  }, []);

  return (
    <BaseLayout>
      <section className="pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <span className="inline-block text-xs uppercase tracking-widest text-blue-500 font-semibold mb-4">
              About CloudVerse
            </span>
            <h1 className="cv-h1 mb-6">Building the future of cloud financial management</h1>
          </div>

          <div className="max-w-4xl mx-auto mb-20 lg:mb-28">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl opacity-50" />
              <div className="relative p-8 sm:p-12 rounded-2xl border border-cv-line bg-cv-surface2/30">
                <h2 className="text-2xl sm:text-3xl font-bold text-cv-ink mb-6 text-center">Our Mission</h2>
                <p className="text-lg sm:text-xl text-cv-muted leading-relaxed text-center">
                  CloudVerse AI's mission is to make cloud as it was originally promised, <span className="text-cv-ink font-semibold">"Simple and Cost-Effective"</span>. As everything becomes cloud and usage-based, enterprises will need an AI enabled platform orchestrator to govern, manage and optimize their spend across diverse cloud providers & services.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-20 lg:mb-28">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-cv-ink mb-4">Leadership Team</h2>
              <p className="text-cv-muted max-w-2xl mx-auto">
                Our leadership team brings decades of experience in cloud infrastructure, enterprise software, and financial operations.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {leadershipTeam.map((member, idx) => (
                <div key={idx} className="group text-center">
                  <div className="relative mb-5 mx-auto w-40 h-40 sm:w-48 sm:h-48">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform" />
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-cv-line bg-cv-surface2">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.classList.add('flex', 'items-center', 'justify-center');
                          target.parentElement!.innerHTML = `<span class="text-4xl text-cv-muted">${member.name.charAt(0)}</span>`;
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-cv-ink">{member.name}</h3>
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 transition-colors"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                  <p className="text-sm text-cv-muted">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-cv-ink mb-4">Board of Advisors</h2>
              <p className="text-cv-muted max-w-2xl mx-auto">
                Industry veterans and thought leaders guiding our strategic vision.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {boardOfAdvisory.map((member, idx) => (
                <div key={idx} className="group text-center">
                  <div className="relative mb-5 mx-auto w-32 h-32 sm:w-40 sm:h-40">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 to-purple-500/15 rounded-2xl transform rotate-2 group-hover:rotate-4 transition-transform" />
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-cv-line bg-cv-surface2">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.classList.add('flex', 'items-center', 'justify-center');
                          target.parentElement!.innerHTML = `<span class="text-3xl text-cv-muted">${member.name.charAt(0)}</span>`;
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <h3 className="text-base font-semibold text-cv-ink">{member.name}</h3>
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 transition-colors"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                  <p className="text-sm text-cv-muted">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
