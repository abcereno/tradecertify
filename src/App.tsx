// src/App.tsx
import React, { Suspense, useState, useEffect, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

import { ModalProvider } from "@/components/modal/ModalProvider";
import ScrollToHashElement from "@/components/ScrollToHashElement";

import FullPageLoader from "@/components/loader/FullPageLoader";
// We can use the toast-based loader for a better UX during background fetches
import GlobalFetchingToast from "./components/loader/GlobalFetchingToast"; 
import Header from "@/components/Header";
import Footer from "./components/Footer";
import ChatWidgetLoader from "./components/ChatWidgetLoader";

// --- PERFORMANCE: Use React.lazy directly. The artificial delay is removed. ---
const Index = lazy(() => import("@/pages/Index"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const QualificationPage = lazy(() => import("@/pages/QualificationPage"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const Terms = lazy(() => import("@/pages/Terms"));
const Booking = lazy(() => import("@/pages/Booking"));
const RtoPartners = lazy(() => import("@/pages/RtoPartners"));
const TradePage = lazy(() => import("@/pages/TradePage"));
const WhatIsRplPage = lazy(() => import("@/pages/WhatIsRplPage"));
const Faq = lazy(() => import("@/pages/Faq"));

const queryClient = new QueryClient();

// --- OPTIMIZATION: Create a clean MainLayout component ---
const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <ScrollToHashElement />
    <main>{children}</main>
    <Footer />
  </>
);

const App = () => {
  // --- OPTIMIZATION: App Shell loading state for a polished initial load ---
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // This timer provides a smooth entry animation without sacrificing performance.
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 400); // A brief, controlled delay

    return () => clearTimeout(timer);
  }, []);

  // --- Show the loader only during the initial app initialization ---
  if (isInitializing) {
    return <FullPageLoader />;
  }

  return (
    <ThemeProvider defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Sonner />
          <ModalProvider>
            <BrowserRouter>
              <ChatWidgetLoader />
              {/* This toast will appear for background data fetches */}
              <GlobalFetchingToast />
              
              <Suspense fallback={<FullPageLoader message="Loading page…" />}>
                <Routes>
                  <Route path="/*" element={
                    <MainLayout>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/qualifications/:slug" element={<QualificationPage />} />
                        <Route path="/services/:slug" element={<TradePage />} />
                        <Route path="/faq" element={<Faq />} />
                        <Route path="/whats-rpl" element={<WhatIsRplPage />} />
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/booking" element={<Booking />} />
                        <Route path="/rto-partners" element={<RtoPartners />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </MainLayout>
                  }/>
                </Routes>
              </Suspense>
            </BrowserRouter>
          </ModalProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;