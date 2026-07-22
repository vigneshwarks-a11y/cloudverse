/* Supported model providers — reuses the exact home-page IntegrationsMarquee
   design: each provider is an app-icon tile (colour brand logo + label below),
   two rows scrolling right-to-left on a seamless CSS loop, edge-masked.
   Both tracks hold two identical copies so translating -50% wraps invisibly.
   Reduced-motion and hover-pause come from the shared .cv-marquee-* CSS in
   globals.css. Logos are real brand SVGs under /public/icons; the few pure
   black/near-black marks (OpenAI, Anthropic, Ollama) carry `invert` so they
   flip to white on the dark theme. */

type Provider = { name: string; src: string; invert?: boolean };

const PROVIDERS: Provider[] = [
  { name: "OpenAI", src: "/icons/openai.svg", invert: true },
  { name: "Anthropic", src: "/icons/anthropic.svg", invert: true },
  { name: "Google Gemini", src: "/icons/gemini.svg" },
  { name: "Mistral AI", src: "/icons/mistral.svg" },
  { name: "Cohere", src: "/icons/cohere.svg" },
  { name: "Llama", src: "/icons/meta.svg" },
  { name: "Ollama", src: "/icons/ollama.svg", invert: true },
  { name: "Groq", src: "/icons/groq.svg" },
  { name: "DeepSeek", src: "/icons/deepseek.svg" },
  { name: "HuggingFace", src: "/icons/huggingface.svg" },
  // Cloud, data, and infrastructure connectors — the same set the home-page
  // "Connects to the stack" marquee shows, so both read as one estate.
  { name: "AWS", src: "/icons/aws.svg" },
  { name: "Azure", src: "/icons/azure.svg" },
  { name: "Google Cloud", src: "/icons/googlecloud.svg" },
  { name: "Kubernetes", src: "/icons/kubernetes.svg" },
  { name: "Snowflake", src: "/icons/snowflake.svg" },
  { name: "Datadog", src: "/icons/datadog.svg" },
  { name: "Oracle", src: "/icons/oracle.svg" },
  { name: "Alibaba", src: "/icons/alibabacloud.svg" },
  { name: "Tencent", src: "/icons/tencentcloud.svg" },
  { name: "Spark", src: "/icons/apache-spark.svg" },
  { name: "vCenter", src: "/icons/vmware.svg" },
  { name: "DigitalOcean", src: "/icons/digitalocean.svg" },
];

// Row A in list order; Row B is a genuine shuffle (not a rotation) of the same
// logos, so the two rows never scroll the same sequence past each other.
const ROW_A = PROVIDERS;
const ROW_B_ORDER = [13, 4, 20, 8, 1, 15, 9, 18, 3, 11, 6, 21, 0, 16, 5, 12, 19, 2, 10, 17, 7, 14];
const ROW_B = ROW_B_ORDER.map((i) => PROVIDERS[i]);

const MASK = {
  maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
  WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
} as const;

function Tile({ item, dup }: { item: Provider; dup?: boolean }) {
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

function MarqueeRow({ items, duration }: { items: Provider[]; duration: string }) {
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

export default function AgentryProvidersMarquee() {
  return (
    <div className="mt-4 flex flex-col gap-10">
      <MarqueeRow items={ROW_A} duration="48s" />
      <MarqueeRow items={ROW_B} duration="58s" />
    </div>
  );
}
