declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}


export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

type GTagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

export const pageview = (url: string) => {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag("config", GA_ID, { page_path: url });
};

export const event = ({ action, category, label, value }: GTagEvent) => {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};
