import React from "react";
import { useAppContext } from "@/contexts/AppContext";
import { useIsMobile } from "@/hooks/use-mobile";
import Hero from "./Hero";
import Marquee from "./Marquee";
import Process from "./Process";
import Testimonials from "./Testimonials";
import Benefits from "./Benefits";
import CTA from "./CTA";
import { Container } from "./layouts/Grid";
import Stats from "./Stats";
import RplCtaButton from "./RplCtaButton";
const AppLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useAppContext();
  const isMobile = useIsMobile();

  return (
    <>
        <Hero />
          <Testimonials />
    <Container>
        <Marquee />
    </Container>
            {/* 'Cant find your trade?' CTA */}
        <div className="text-center bg-slate-900 py-12 sm:py-16 text-white">
          <h3 className="text-2xl font-bold mb-4">
            Don't see your <span className="text-[#D19D13]">TRADE</span>?
          </h3>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Our expertise covers dozens of trades. Contact us to see how we can help you get the recognition you deserve.
          </p>
          <RplCtaButton
            label="Enquire Now"
            size="lg"
            variant="primary"
            formSrc="https://api.leadconnectorhq.com/widget/survey/hMCYKu5d6Ir83sjyduPH"
            title="General Enquiry"
          />
        </div>
    <Container>
        <Benefits />
    </Container>
        <Stats />
        <Container>
        <Process />
        </Container>
        <CTA />
    </>
  );
};

export default AppLayout;
