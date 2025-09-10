import React from "react";
// PERFORMANCE & AESTHETICS: Import SVG icons for a professional and consistent look
import { Clock, GraduationCap, DollarSign, ClipboardCheck, Rocket, Award } from "lucide-react";

const Benefits: React.FC = () => {
  const benefits = [
    {
      // Replaced emoji with a lightweight SVG icon component
      icon: <Clock className="w-10 h-10 text-[#D19D13]" />,
      title: "No Time Off Work",
      description:
        "Continue earning while we help you prepare your RPL portfolio. The entire process is flexible and works around your schedule.",
    },
    {
      icon: <GraduationCap className="w-10 h-10 text-[#D19D13]" />,
      title: "National Recognition",
      description:
        "The qualifications are nationally recognised across Australia and are issued directly by a trusted Registered Training Organisation.",
    },
    {
      icon: <DollarSign className="w-10 h-10 text-[#D19D13]" />,
      title: "Boost Your Earning Potential",
      description:
        "Formal qualifications can help you command higher rates, take on more profitable projects, and grow your business.",
    },
    {
      icon: <ClipboardCheck className="w-10 h-10 text-[#D19D13]" />,
      title: "An Expert Guide",
      description:
        "We are your expert guide. We assist you in organising and presenting your experience for a successful assessment by the RTO.",
    },
    {
      icon: <Rocket className="w-10 h-10 text-[#D19D13]" />,
      title: "The Direct Pathway",
      description:
        "Why study what you already know? RPL is the most efficient pathway for experienced tradies to get the recognition they deserve.",
    },
    {
      icon: <Award className="w-10 h-10 text-[#D19D13]" />,
      title: "Unlock New Opportunities",
      description:
        "A formal qualification is your key to unlocking supervisory roles, new licenses, and access to larger, more lucrative projects.",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            An Expert RPL Service Designed for Tradies
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
We assist with the paperwork and portfolio building so you can focus on what you do best. Our expert guidance makes the RPL process simple and efficient.          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-colors"
            >
              {/* ACCESSIBILITY: The div is hidden from screen readers as the title provides context */}
              <div className="flex justify-center items-center mb-6" aria-hidden="true">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{benefit.title}</h3>
              <p className="text-slate-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;