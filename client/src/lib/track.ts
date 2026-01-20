// Vendor-agnostic tracking abstraction

export type TrackPayload = Record<string, any>;

// Global queue for before hydration or external scripts
declare global {
  interface Window {
    __cvTrackQueue?: Array<{ event: string; payload?: TrackPayload }>;
    mixpanel?: {
      track?: (event: string, payload?: TrackPayload) => void;
    };
  }
}

// Initialize queue
if (typeof window !== "undefined") {
  window.__cvTrackQueue = window.__cvTrackQueue || [];
}

export function track(event: string, payload?: TrackPayload): void {
  if (typeof window === "undefined") return;

  // 1. Console log in dev
  if (import.meta.env.DEV) {
    console.groupCollapsed(`[Track] ${event}`);
    console.log(payload);
    console.groupEnd();
  }

  // 2. Push to global queue (can be picked up by GTM/GA/PostHog later)
  window.__cvTrackQueue?.push({ event, payload });

  // 3. Forward to Mixpanel when available
  if (window.mixpanel?.track) {
    window.mixpanel.track(event, payload);
  }

  // 4. Dispatch custom event for immediate internal listeners
  const customEvent = new CustomEvent("cv:track", {
    detail: { event, payload },
  });
  window.dispatchEvent(customEvent);
}

// Helper to attach to React events
export const trackEvent = (name: string, payload?: TrackPayload) => () => {
  track(name, payload);
};
