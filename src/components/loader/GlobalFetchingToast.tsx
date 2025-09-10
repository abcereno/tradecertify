import { useEffect } from "react";
import { useIsFetching } from "@tanstack/react-query";
import { toast } from "sonner"; // Use the 'sonner' toast library

/**
 * Shows a non-blocking toast notification whenever React Query has in-flight requests.
 * Includes a small debounce to avoid flashing on very fast requests.
 */
const GlobalFetchingToast: React.FC = () => {
  const isFetching = useIsFetching();

  useEffect(() => {
    let timeoutId: number | undefined;

    // Use a unique ID for the toast so we can update/dismiss the same one
    const toastId = "global-fetching-toast";

    if (isFetching > 0) {
      // After a short delay, show the loading toast
      timeoutId = window.setTimeout(() => {
        toast.loading("Syncing data…", {
          id: toastId,
          description: "Talking to our servers",
        });
      }, 150);
    } else {
      // If fetching finishes before the timeout, clear it
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      // Instantly dismiss the toast when fetching is complete
      toast.dismiss(toastId);
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [isFetching]);

  // This component renders nothing itself; it only controls the toast
  return null;
};

export default GlobalFetchingToast;
