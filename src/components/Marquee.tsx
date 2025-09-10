import React, { useRef } from "react";
import { Link } from "react-router-dom";
import RplCtaButton from "@/components/RplCtaButton";
import img1 from "@/assets/carpentry.webp";
import img2 from "@/assets/building-cons.webp";
import img3 from "@/assets/plumbing.webp";
import img4 from "@/assets/auto-trades.webp";
import img5 from "@/assets/painting.webp";
import img6 from "@/assets/auto-electric.webp";
import useInView from "@/hooks/useInView";
const TRADE_AREAS = [
  { name: "Building & Construction", slug: "building-construction", image: img2 },
  { name: "Carpentry", slug: "carpentry", image: img1 },
  { name: "Plumbing Services", slug: "plumbing-services", image: img3 },
  { name: "Automotive Trades", slug: "automotive-trades", image: img4 },
  { name: "Painting & Decorating", slug: "painting-decorating", image: img5 },
  { name: "Automotive Electrical", slug: "automotive-electrical", image: img6 },
];

const Marquee: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null); // 2. Create a ref
    const isInView = useInView(sectionRef, { triggerOnce: true });
  return (
    <section ref={sectionRef} id="services" className={`py-24 sm:py-32 bg-slate-50 animate-on-scroll ${isInView ? 'is-visible' : ''}`}>
      <div  className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-semibold text-lg text-black-900 mb-2">Our Expertise</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Trades We Support
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            If you have years of experience in your trade, you could be eligible for a nationally recognised qualification. Start our free skills check to find out.
          </p>
        </div>

        {/* Trade Areas Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TRADE_AREAS.map((trade) => (
            <div
              key={trade.name}
              className="group relative flex flex-col bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div  className="overflow-hidden">
                <img
                  src={trade.image}
                  alt={`A professional in the ${trade.name} trade working on a job site.`}
                  className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                  width="480"
                  height="720"
                  loading="lazy"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col gap-2">
                {/* --- SEO FIX: The trade name is now the descriptive link --- */}
                <Link to={`/services/${trade.slug}`} className="hover:text-amber-600 transition-colors">
                  <h3 className="text-2xl font-bold text-slate-800">
                    {trade.name}
                  </h3>
                </Link>
                
                <div className="mt-auto pt-4">
                  <RplCtaButton
                    label="Check Eligibility"
                    size="md"
                    variant="primary"
                    formSrc="https://api.leadconnectorhq.com/widget/survey/hMCYKu5d6Ir83sjyduPH"
                    title={`Check Eligibility for ${trade.name}`}
                  />
                </div>
  <div className="flex justify-end mb-4">
    <Link 
      to={`/services/${trade.slug}`} 
      aria-label={`Learn more about RPL for ${trade.name}`}
      className="text-sm font-semibold text-blue-800 hover:text-blue-900 transition-colors"
    >
      Learn More &rarr;
    </Link>
  </div>
              </div>
            </div>
          ))}
        </div>
      
      </div>
    </section>
  );
};

export default Marquee;