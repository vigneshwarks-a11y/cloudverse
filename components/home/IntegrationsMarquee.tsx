/* Two-row infinite logo marquee for the "Connects to the stack…" section.
   Each integration is an app-icon tile (brand-tinted rounded square + colour
   logo + label). Both rows scroll right-to-left on a seamless CSS loop; each
   track holds two identical copies so translating -50% wraps invisibly.
   Reduced-motion and hover-pause come from the shared .cv-marquee-* CSS in
   globals.css. Assets use the colour brand marks under /legacy/integration so
   they read on the dark tiles without any filter recolouring. */

type Integ = { name: string; src: string; color: string; invert?: boolean };

const INTEGRATIONS: Integ[] = [
  { name: "AWS", src: "/icons/aws.svg", color: "#FF9900" },
  { name: "Azure", src: "/icons/azure.svg", color: "#0089D6" },
  { name: "Google Cloud", src: "/icons/googlecloud.svg", color: "#4285F4" },
  { name: "Kubernetes", src: "/icons/kubernetes.svg", color: "#326CE5" },
  { name: "Snowflake", src: "/icons/snowflake.svg", color: "#29B5E8" },
  { name: "Datadog", src: "/icons/datadog.svg", color: "#632CA6" },
  { name: "Oracle", src: "/icons/oracle.svg", color: "#E0523A" },
  { name: "Alibaba", src: "/icons/alibabacloud.svg", color: "#FF6A00" },
  { name: "Tencent", src: "/icons/tencentcloud.svg", color: "#1E7BE8" },
  { name: "Spark", src: "/icons/apache-spark.svg", color: "#E25A1C" },
  { name: "vCenter", src: "/icons/vmware.svg", color: "#3BA7DE" },
  { name: "DigitalOcean", src: "/icons/digitalocean.svg", color: "#0080FF" },
  // Model providers — same logos as the integrations page "Every model
  // provider, one endpoint." marquee. Dark marks carry `invert` for dark theme.
  { name: "OpenAI", src: "/icons/openai.svg", color: "#000000", invert: true },
  { name: "Anthropic", src: "/icons/anthropic.svg", color: "#D97757", invert: true },
  { name: "Google Gemini", src: "/icons/gemini.svg", color: "#4285F4" },
  { name: "Mistral AI", src: "/icons/mistral.svg", color: "#FF7000" },
  { name: "Cohere", src: "/icons/cohere.svg", color: "#39594D" },
  { name: "Llama", src: "/icons/meta.svg", color: "#0668E1" },
  { name: "Ollama", src: "/icons/ollama.svg", color: "#000000", invert: true },
  { name: "Groq", src: "/icons/groq.svg", color: "#F55036" },
  { name: "DeepSeek", src: "/icons/deepseek.svg", color: "#4D6BFE" },
  { name: "HuggingFace", src: "/icons/huggingface.svg", color: "#FFD21E" },
];

// Row A in list order; Row B is a genuine shuffle (not a rotation) of the same
// logos, so the two rows never scroll the same sequence past each other.
const ROW_A = INTEGRATIONS;
const ROW_B_ORDER = [13, 4, 20, 8, 1, 15, 9, 18, 3, 11, 6, 21, 0, 16, 5, 12, 19, 2, 10, 17, 7, 14];
const ROW_B = ROW_B_ORDER.map((i) => INTEGRATIONS[i]);

const MASK = {
  maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
  WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
} as const;

function Tile({ item, dup }: { item: Integ; dup?: boolean }) {
  return (
    <div className="mr-5 flex w-[64px] shrink-0 flex-col items-center gap-2.5 sm:mr-14 sm:w-[124px] sm:gap-3.5">
      <div className="flex h-12 items-center justify-center sm:h-16">
        <img
          src={item.src}
          alt={dup ? "" : item.name}
          loading="lazy"
          className={`h-11 w-11 object-contain transition-transform duration-300 hover:scale-110 sm:h-14 sm:w-14${
            item.invert ? " dark:invert" : ""
          }`}
        />
      </div>
      <span className="text-xs font-medium text-cv-muted whitespace-nowrap sm:text-sm">{item.name}</span>
    </div>
  );
}

function MarqueeRow({ items, duration }: { items: Integ[]; duration: string }) {
  return (
    <div className="cv-marquee-pause relative w-full overflow-hidden" style={MASK}>
      <div className="cv-marquee-track flex w-max" style={{ animationDuration: duration }}>
        <div className="flex">
          {items.map((i) => (
            <Tile key={i.name} item={i} />
          ))}
        </div>
        <div className="flex" aria-hidden="true">
          {items.map((i) => (
            <Tile key={`${i.name}-dup`} item={i} dup />
          ))}
        </div>
      </div>
    </div>
  );
}

export function IntegrationsMarquee() {
  return (
    <div className="mt-16 flex flex-col gap-10">
      <MarqueeRow items={ROW_A} duration="48s" />
      <MarqueeRow items={ROW_B} duration="58s" />
    </div>
  );
}
