import React from "react";
import { useSearchParams } from "react-router-dom";
import SEO from "@/SEO";
import { breadcrumbJSONLD, webpageJSONLD } from "@/seo/builders";

// Your HighLevel widget URL (can be overridden via ?src=)
const BOOKING_IFRAME_SRC =
  "https://api.leadconnectorhq.com/widget/booking/iGWRDTDUJmCmIAUmlNCX";

const Booking: React.FC = () => {
  const [params] = useSearchParams();
  const src = params.get("src") || BOOKING_IFRAME_SRC;

  return (
    <>
      <SEO
        title="Book a Consultation"
        description="Schedule your RPL consultation with Trade Certify."
        canonical="/booking"
        jsonLd={[
          webpageJSONLD("Book a Consultation", "/booking"),
          breadcrumbJSONLD([
            { name: "Home", url: "/" },
            { name: "Book a Consultation", url: "/booking" },
          ]),
        ]}
      />

      {/* Hero */}
      <header className="bg-gradient-to-b from-white to-[#f7f8fa] border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-extrabold text-[#373b40]">Book a Consultation</h1>
          <p className="mt-2 text-gray-600">
            Pick a time that suits you. We’ll walk through your experience and map the best qualification options via RPL.
          </p>
        </div>
      </header>

      {/* Embedded iframe */}
      <section className="bg-[#f7f8fa]">
        <div className="max-w-5xl mx-auto px-4">
            <iframe
              src={src}
              title="Trade Certify Booking"
              className="w-full rounded-lg"
              style={{ width: "100%", border: "none", overflow: "hidden", minHeight: 920 }}
              height={920}
              scrolling="no"
              loading="lazy"
              allowFullScreen
            />
        </div>
      </section>
    </>
  );
};

export default Booking;
