export type ModuleKey = "finops" | "agentry" | "torb" | "datax";

export type ModuleConfig = {
  key: ModuleKey;
  name: string;
  href: string;
  color: string;
  tagline: string;
};

export const MODULES: Record<ModuleKey, ModuleConfig> = {
  finops: { key: "finops", name: "FinOps Platform", href: "/platform/finops", color: "#1664C0", tagline: "Multi-cloud cost intelligence" },
  agentry: { key: "agentry", name: "CloudVerse Agentry", href: "/platform/agentry", color: "#6954D4", tagline: "GPU & LLM economics" },
  torb:    { key: "torb",    name: "CloudVerse Torb",    href: "/platform/torb",    color: "#0E9E7A", tagline: "Shift-left cost intelligence" },
  datax:  { key: "datax",  name: "DataX",           href: "/platform/datax",  color: "#D97706", tagline: "Warehouse intelligence" },
};

export const MODULE_LIST: ModuleConfig[] = [MODULES.finops, MODULES.agentry, MODULES.torb, MODULES.datax];

export function siblings(current: ModuleKey): ModuleConfig[] {
  return MODULE_LIST.filter((m) => m.key !== current);
}
