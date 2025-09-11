export {};

type GtagCommand = "js" | "config" | "event";

type GtagEventParams = {
  send_to?: string;
  value?: number;
  currency?: string;
  event_callback?: () => void;
  [key: string]: unknown; // allow any extra keys
};

interface Gtag {
  (command: "js", date: Date): void;
  (command: "config", targetId: string, config?: Record<string, unknown>): void;
  (command: "event", action: string, params?: GtagEventParams): void;
}

declare global {
  interface Window {
    gtag?: Gtag;
  }
}
