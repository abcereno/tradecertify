export {};

declare global {
  interface Window {
    gtag?: (
      command: "event",
      action: string,
      params: Record<string, string>
    ) => void;
  }
}
