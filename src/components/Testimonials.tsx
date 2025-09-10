import React from 'react';
import FiveStars from './icons/FiveStars';
const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Sean O' Mahony",
      initials: "SO",
      trade: "Happy Client",
      quote: "We had a great experience with the Trade Certify team... their communication was clear, consistent, and professional. They guided us through every step... making it smooth and stress-free.",
      link: "https://share.google/HdEYWLe3edM4viu9O"
    },
    {
      name: "Sauce Maguire",
      initials: "SM",
      trade: "Happy Client",
      quote: "The team at Trade Certify are terrific, they made life so much easier and with no hassle... They made getting my cert a breeze. Couldn’t thank them enough.",
      link: "https://share.google/G4BRj8REJOqtxKAqX"
    },
    {
      name: "Ryan Helenius",
      initials: "RH",
      trade: "Happy Client",
      quote: "It's the best thing I've ever done. Tomas was great help and got everything sorted. Definitely recommended if anyone has the experience but can't afford to be an apprentice.",
      link: "https://share.google/NFu8o3JtELBvCdZji"
    },
    {
      name: "Jake Schmidt",
      initials: "JS",
      trade: "Happy Client",
      quote: "Trade Certify have been great to deal with. Always clear communication and prompt answers to any questions. They made the process as easy as can be.",
      link: "https://share.google/Ep9Vd1vY17pgNeCoE"
    },
    {
      name: "Ramadan Ameen",
      initials: "RA",
      trade: "Happy Client",
      quote: "I’m truly grateful for all the help and support from the Trade Certify team. The whole process was smooth, professional, and really well-organised.",
      link: "https://share.google/3tyYfJfCDzI90Imie"
    },
    {
      name: "Super Rooster",
      initials: "SR",
      trade: "Happy Client",
      quote: "Very thankful for the information provided! Ryan at Trade Certify provided very detailed responses to all of the questions I had... would definitely recommend this service.",
      link: "https://share.google/O0VbV3igLC3OsB3G1"
    }
  ];

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Hear From Tradies We've Supported
          </h2>
          <p className="text-xl text-slate-600">
            See how our expert guidance has helped tradies across Australia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="bg-white rounded-2xl shadow-md p-6 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <img
                  loading="lazy"
                  src={`https://placehold.co/48x48/373b40/f0f2f5/png?text=${testimonial.initials}`}
                  alt={`Profile of ${testimonial.name}, a Trade Certify client.`}
                  className="w-12 h-12 rounded-full object-cover mr-4 bg-gray-200"
                  // PERFORMANCE: Prevents layout shift
                  width="48"
                  height="48"
                />
                <div>
                  <h3 className="font-bold text-slate-800">{testimonial.name}</h3>
                  <FiveStars className="h-6 w-auto text-amber-500" />
              </div>
              </div>
              <p className="text-slate-600 italic flex-grow mb-4">"{testimonial.quote}"</p>
              
<div className="mt-auto border-t border-slate-100 pt-4 text-right">
  <a
    href={testimonial.link}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`View the original review from ${testimonial.name}`}
    // The Fix: Using a darker, accessible color for the link
    className="text-sm font-semibold text-amber-800 hover:text-amber-900 transition-colors"
  >
    View Review →
  </a>
</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;