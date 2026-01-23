import { BaseLayout } from "@/layouts/BaseLayout";
import { useEffect } from "react";

const leadershipTeam = [
  {
    name: "Chaand Deshwal",
    role: "Founder & CEO",
    image: "/team/chaand-deshwal.png",
    linkedin: "https://www.linkedin.com/in/chanddeshwal/",
  },
  {
    name: "Ahn Pho Quoc",
    role: "CPTO",
    image: "/team/ann-pho-quoc.png",
    linkedin: "https://www.linkedin.com/in/anh-pho-43b76311b/",
  },
  {
    name: "Justin Gatlin",
    role: "GTM Lead North-America",
    image: "/team/justin.png",
    linkedin: "https://www.linkedin.com/in/justinrgatlin/",
  },
  {
    name: "Shishir Garg",
    role: "Chief Alliances & Partnerships Officer",
    image: "/team/shishir.png",
    linkedin: "https://www.linkedin.com/in/gargs/",
  },
];

const boardOfAdvisory = [
  {
    name: "Venky Rao",
    image: "/team/venky-rao.png",
    linkedin: "https://www.linkedin.com/in/venkyrao/",
  },
  {
    name: "Minh Le",
    image: "/team/minh-le.png",
    linkedin: "https://www.linkedin.com/in/minh-le-9987634/",
  },
  {
    name: "Manoj Chugh",
    image: "/team/manoj-chugh.png",
    linkedin: "https://www.linkedin.com/in/manoj-chugh-a68ab15/",
  },
  {
    name: "Ajay Turki",
    image: "/team/ajay-turki.png",
    linkedin: "https://www.linkedin.com/in/ajayturki/",
  },
  {
    name: "Rachel Chen Paulo",
    image: "/team/rachel-chen-paulo.png",
    linkedin: "https://www.linkedin.com/in/rachel-chen-paulo-9b28637",
  },
  {
    name: "Vijay Sahrawat",
    image: "/team/vijay-sahrawat.png",
    linkedin: "https://www.linkedin.com/in/vijay-sahrawat/",
  },
];

export default function AboutUs() {
  useEffect(() => {
    document.title = "About Us — CloudVerse™";
  }, []);

  return (
    <BaseLayout>
      <section className="pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-20">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
              {leadershipTeam.map((member, idx) => (
                <div key={idx} className="group">
                  <div className="relative mb-6 w-full aspect-square rounded-3xl overflow-hidden bg-black">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.classList.add('flex', 'items-center', 'justify-center');
                        target.parentElement!.innerHTML = `<span class="text-5xl text-gray-600">${member.name.charAt(0)}</span>`;
                      }}
                    />
                  </div>
                  <div className="flex items-start justify-between">
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-cv-ink">{member.name}</h3>
                      <p className="text-sm text-cv-muted">{member.role}</p>
                    </div>
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#0A66C2] hover:bg-[#004182] transition-colors"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
              {boardOfAdvisory.map((member, idx) => (
                <div key={idx} className="group">
                  <div className="relative mb-6 w-full aspect-square rounded-3xl overflow-hidden bg-black">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.classList.add('flex', 'items-center', 'justify-center');
                        target.parentElement!.innerHTML = `<span class="text-5xl text-gray-600">${member.name.charAt(0)}</span>`;
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-cv-ink">{member.name}</h3>
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#0A66C2] hover:bg-[#004182] transition-colors"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
