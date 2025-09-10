import { lazy, type ComponentType, type LazyExoticComponent } from "react";

/**
 * DEV-friendly lazy() that delays resolving the module so Suspense fallback is visible.
 * - Works in dev (via NODE_ENV) or when URL has ?previewLoader=1
 * - No `any` types.
 */
export function lazyWithDelay<TProps extends Record<string, unknown>>(
  factory: () => Promise<{ default: ComponentType<TProps> }>,
  ms = 1500
): LazyExoticComponent<ComponentType<TProps>> {
  const isDev =
    (typeof process !== "undefined" && process.env?.NODE_ENV === "development") ||
    (typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).has("previewLoader"));

  const shouldDelay = isDev && ms > 0;

  return lazy(async () => {
    const modPromise = factory();
    if (!shouldDelay) return modPromise;
    await new Promise<void>((resolve) => setTimeout(resolve, ms));
    return modPromise;
  });
}
