import { Link } from "react-router-dom";
import RplCtaButton from "@/components/RplCtaButton";

// PERFORMANCE: Import each responsive image version
import heroSmall from "../assets/hero-small.webp";
import heroMedium from "../assets/hero-medium.webp";
import heroLarge from "../assets/hero-large.webp";

const Hero: React.FC = () => {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <picture>
          {/* Use the large image for screens 1281px and wider */}
          <source media="(min-width: 1281px)" srcSet={heroLarge} />
          {/* Use the medium image for screens 641px to 1280px */}
          <source media="(min-width: 641px)" srcSet={heroMedium} />
          {/* The small image is the default for mobile and the <img> src */}
          <img
            src={heroSmall}
            alt="An experienced Australian tradesperson reviewing plans on a modern construction site."
            className="w-full h-full object-cover object-right opacity-20"
            width="480"  // Width of the SMALLEST image
            height="768" // Height of the SMALLEST image
            // PERFORMANCE: This is a direct hint to the browser to prioritize this image
            fetchPriority="high"
          />
        </picture>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 sm:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Turn Your <span className="text-amber-500">Experience</span> into Recognition
          </h1>
          <p className="text-lg md:text-2xl mb-6 text-slate-200">
  <strong>Our Role:</strong> We are your expert guide in the RPL process. Our service helps you build a strong portfolio to submit to a nationally registered RTO for formal assessment and certification.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <RplCtaButton
              label="Check Your Eligibility Now"
              size="lg"
              variant="primary"
              formSrc="https://api.leadconnectorhq.com/widget/survey/hMCYKu5d6Ir83sjyduPH"
              title="Check Your Eligibility Now"
            />
            <Link
              to="/booking"
              className="border-2 border-white hover:bg-white hover:text-slate-900 font-bold py-4 px-8 rounded-lg text-lg transition-colors text-center"
            >
              Book a Call
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;