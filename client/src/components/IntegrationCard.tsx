import { Integration } from "@/data/integrationsData";
import { IntegrationLogo } from "./IntegrationLogo";

interface IntegrationCardProps {
  integration: Integration;
  onClick: (integration: Integration) => void;
}

export function IntegrationCard({ integration, onClick }: IntegrationCardProps) {
  const statusColor = {
    "Available": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    "Beta": "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    "Coming soon": "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20"
  };

  return (
    <button
      onClick={() => onClick(integration)}
      className="text-left p-5 rounded-xl border border-cv-line bg-cv-surface2 hover:bg-cv-line/30 transition-colors"
      data-testid={`card-integration-${integration.id}`}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <IntegrationLogo name={integration.name} logo={integration.logo} size={22} />
            <h3 className="text-[15px] font-semibold text-cv-ink">
              {integration.name}
            </h3>
          </div>
          <span className={`text-xs font-medium px-2.5 py-1 rounded border flex-shrink-0 ${statusColor[integration.status]}`}>
            {integration.status}
          </span>
        </div>
        <p className="text-sm text-cv-muted line-clamp-2">
          {integration.short}
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-cv-muted/60">
            {integration.category}
          </span>
          {integration.products && integration.products.length > 0 && (
            <>
              {integration.products.map((product) => (
                <span
                  key={product}
                  className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${
                    product === "AIX"
                      ? "border-purple-500/30 text-purple-600 dark:text-purple-400 bg-purple-500/10"
                      : product === "DevX"
                      ? "border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/10"
                      : "border-pink-500/30 text-pink-600 dark:text-pink-400 bg-pink-500/10"
                  }`}
                >
                  {product}
                </span>
              ))}
            </>
          )}
        </div>
      </div>
    </button>
  );
}
