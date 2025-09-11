// src/hooks/useGtagConversion.ts
import { useCallback } from "react";

export function useGtagConversion() {
  const triggerConversion = useCallback((url?: string) => {
    const callback = () => {
      if (typeof url !== "undefined") {
        window.location.href = url;
      }
    };

    if (typeof window.gtag !== "undefined") {
      window.gtag("event", "conversion", {
        send_to: "AW-17516193986/QT63CK-JvJgbEMLRr6BB",
        value: 1.0,
        currency: "AUD",
        event_callback: callback,
      });
    } else {
      // fallback if gtag not ready
      callback();
    }

    return false;
  }, []);

  return { triggerConversion };
}
