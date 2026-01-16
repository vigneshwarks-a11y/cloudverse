import { Integration } from "@/data/integrationsData";
import { Button } from "@/components/Button";
import { IntegrationLogo } from "./IntegrationLogo";
import { X } from "lucide-react";
import { useLocation } from "wouter";

interface IntegrationDrawerProps {
  integration: Integration | null;
  onClose: () => void;
}

export function IntegrationDrawer({ integration, onClose }: IntegrationDrawerProps) {
  const [, setLocation] = useLocation();
  if (!integration) return null;

  const statusColor = {
    "Available": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    "Beta": "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    "Coming soon": "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20"
  };

  // Limit to 5 items per list
  const ingestItems = integration.whatWeIngest.slice(0, 5);
  const outputItems = integration.outputs.slice(0, 5);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-cv-surface border-l border-cv-line z-50 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-cv-surface border-b border-cv-line p-5 md:p-6 flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <IntegrationLogo name={integration.name} logo={integration.logo} size={28} />
              <h2 className="text-lg md:text-xl font-semibold text-cv-ink">
                {integration.name}
              </h2>
              <span className={`text-xs font-medium px-2 py-1 rounded border flex-shrink-0 whitespace-nowrap ${statusColor[integration.status]}`}>
                {integration.status}
              </span>
            </div>
            <p className="text-sm text-cv-muted line-clamp-2">
              {integration.short}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-cv-muted hover:text-cv-ink transition-colors flex-shrink-0 mt-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="divide-y divide-cv-line">
          {/* What we ingest */}
          <div className="px-5 md:px-6 py-5">
            <h3 className="text-xs uppercase tracking-widest text-cv-muted mb-3">
              What we ingest
            </h3>
            <ul className="space-y-2">
              {ingestItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm leading-6 text-cv-muted">
                  <span className="text-primary font-semibold mt-0.5 flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What it unlocks */}
          <div className="px-5 md:px-6 py-5">
            <h3 className="text-xs uppercase tracking-widest text-cv-muted mb-3">
              What it unlocks
            </h3>
            <ul className="space-y-2">
              {outputItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm leading-6 text-cv-muted">
                  <span className="text-primary font-semibold mt-0.5 flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Setup requirements */}
          <div className="px-5 md:px-6 py-5">
            <h3 className="text-xs uppercase tracking-widest text-cv-muted mb-3">
              Setup requirements
            </h3>
            <div className="rounded-xl border border-cv-line bg-cv-surface2 p-4 md:p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs uppercase tracking-widest text-cv-muted mb-1">
                    Method
                  </div>
                  <p className="text-sm font-medium text-cv-ink">
                    {integration.setup.method}
                  </p>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-cv-muted mb-1">
                    Time to value
                  </div>
                  <p className="text-sm font-medium text-cv-ink">
                    {integration.setup.timeToValue}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <div className="text-xs uppercase tracking-widest text-cv-muted mb-1">
                    Permissions
                  </div>
                  <p className="text-sm font-medium text-cv-ink">
                    {integration.setup.permissions}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-5 md:px-6 py-5 border-t border-cv-line">
            <div className="flex gap-3">
              <Button variant="secondary" size="lg" className="flex-1">
                Request access
              </Button>
              <Button 
                variant="tertiary" 
                size="lg" 
                className="flex-1"
                onClick={() => {
                  onClose();
                  if (integration.setup.docsUrl) {
                    setLocation(integration.setup.docsUrl);
                  } else {
                    setLocation("/resources");
                  }
                }}
              >
                Setup docs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
