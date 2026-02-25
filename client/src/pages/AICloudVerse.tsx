import { useEffect } from "react";
import { BaseLayout } from "@/layouts/BaseLayout";

export default function AICloudVerse() {
  useEffect(() => {
    document.title = "AI / CloudVerse";
  }, []);

  return (
    <BaseLayout>
      <section className="pt-12 sm:pt-16 lg:pt-20 pb-10 border-b border-cv-line dark:border-white/10 bg-cv-surface dark:bg-[#070b12]">
        <div className="cv-container-full">
          <div className="max-w-4xl">
            <span className="text-xs uppercase tracking-widest text-cv-muted dark:text-white/70 mb-4 inline-block">
              AI
            </span>
            <h1 className="cv-h1 mb-4 text-cv-ink dark:text-white">CloudVerse</h1>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 lg:py-14 bg-cv-surface dark:bg-[#070b12] min-h-[60vh]">
        <div className="cv-container-full">
          <div className="max-w-4xl space-y-6">
            <p className="text-[15px] sm:text-[16px] lg:text-[17px] leading-[26px] text-cv-muted dark:text-white/85">
             CloudVerse operates as an <b>economic intelligence layer</b> that sits above cloud infrastructure, data platforms, and AI workloads, translating technical activity into real-time economic decisions. It does not exist to report on spend after it occurs, but to <b>influence decisions before and while cost is created.</b> The system is designed for environments where cost behavior is controlled primarily by engineers, data teams, and AI practitioners rather than finance alone.
            </p>

            <p className="text-[15px] sm:text-[16px] lg:text-[17px] leading-[26px] text-cv-muted dark:text-white/85">
              Before CloudVerse adoption, organizations typically rely on a stitched stack of tools: cloud billing dashboards, FinOps reporting platforms, spreadsheets, and periodic reviews. These systems explain what happened but fail to change what happens next. Engineering teams receive cost feedback too late, finance teams lack architectural context, and AI workloads introduce non-linear cost behavior that humans cannot govern manually. The result is <b>high decision latency</b>, political cost conversations, and reactive optimization.
            </p>

            <p className="text-[15px] sm:text-[16px] lg:text-[17px] leading-[26px] text-cv-muted dark:text-white/85">
             CloudVerse replaces this fragmented model with a <b>single intelligence plane</b> that continuously understands: what is running, why it exists, who triggered it, what it costs in unit terms, and what should change. It embeds cost intelligence directly into <b>engineering workflows (DevX), data platforms (DataX), and AI/GPU systems (AIX),</b> while feeding structured economic insight upward into FinOps and executive decision-making. This creates a <b>closed loop between action, cost, and accountability</b>.
            </p>

            <p className="text-[15px] sm:text-[16px] lg:text-[17px] leading-[26px] text-cv-muted dark:text-white/85">
              Organizations choose CloudVerse over stitched solutions when complexity becomes the bottleneck. As AI, GPU, and data workloads scale, manual governance collapses. CloudVerse is selected not for visibility, but because it <b>reduces decision latency</b>,aligns engineering and finance without friction , and provides a credible path from insight to recommendation to automation. It is an operating system for cloud economics  in the Cloud+ and AI-native era, not a reporting tool.
            </p>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
