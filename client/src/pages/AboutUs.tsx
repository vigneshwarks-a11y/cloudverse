import { BaseLayout } from "@/layouts/BaseLayout";
import { useEffect } from "react";

const leadershipTeam = [
  {
    name: "Leadership Member 1",
    role: "CEO & Co-Founder",
    image: "/team/leader-1.jpg",
  },
  {
    name: "Leadership Member 2",
    role: "CTO & Co-Founder",
    image: "/team/leader-2.jpg",
  },
  {
    name: "Leadership Member 3",
    role: "COO",
    image: "/team/leader-3.jpg",
  },
];

const boardOfAdvisory = [
  {
    name: "Advisor 1",
    role: "Board Advisor",
    image: "/team/advisor-1.jpg",
  },
  {
    name: "Advisor 2",
    role: "Board Advisor",
    image: "/team/advisor-2.jpg",
  },
  {
    name: "Advisor 3",
    role: "Board Advisor",
    image: "/team/advisor-3.jpg",
  },
  {
    name: "Advisor 4",
    role: "Board Advisor",
    image: "/team/advisor-4.jpg",
  },
  {
    name: "Advisor 5",
    role: "Board Advisor",
    image: "/team/advisor-5.jpg",
  },
  {
    name: "Advisor 6",
    role: "Board Advisor",
    image: "/team/advisor-6.jpg",
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
                  <h3 className="text-lg font-semibold text-cv-ink mb-1">{member.name}</h3>
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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
              {boardOfAdvisory.map((member, idx) => (
                <div key={idx} className="group text-center">
                  <div className="relative mb-4 mx-auto w-24 h-24 sm:w-28 sm:h-28">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl transform rotate-2 group-hover:rotate-4 transition-transform" />
                    <div className="relative w-full h-full rounded-xl overflow-hidden border border-cv-line bg-cv-surface2">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.classList.add('flex', 'items-center', 'justify-center');
                          target.parentElement!.innerHTML = `<span class="text-2xl text-cv-muted">${member.name.charAt(0)}</span>`;
                        }}
                      />
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-cv-ink mb-0.5">{member.name}</h3>
                  <p className="text-xs text-cv-muted">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
