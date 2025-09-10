// src/components/ScrollToHashElement.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHashElement() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // A small delay to ensure the page has rendered before scrolling
    const timeoutId = setTimeout(() => {
      if (hash) {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        // Only scroll to top if there is no hash
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }, 100); // 100ms delay is usually enough

    return () => clearTimeout(timeoutId);
  }, [pathname, hash]);

  return null;
}