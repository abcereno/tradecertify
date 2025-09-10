// src/config/staticRoutes.ts
import { TRADE_PAGE_CONTENT } from "@/data/trades"; // Adjust this import path to where your TRADE_AREAS array is located

// Generate the dynamic service routes from your data
const serviceRoutes = TRADE_PAGE_CONTENT.map(trade => `/services/${trade.slug}`);

// List all crawlable non-dynamic routes here
const baseRoutes: string[] = [
  "/",
  "/privacy",
  "/faq",
  "/terms",
  "/contact",
  "/whats-rpl",
  "/refunds", 
];

// Combine the base routes and the dynamically generated service routes
export const STATIC_ROUTES: string[] = [
    ...baseRoutes,
    ...serviceRoutes,
];