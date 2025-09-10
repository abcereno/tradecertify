import React from 'react';
import { useParams } from 'react-router-dom';
import { TRADE_PAGE_CONTENT } from '@/data/trades'; // Import your content
import RplCtaButton from '@/components/RplCtaButton';

const TradePage: React.FC = () => {
  // Get the slug from the URL (e.g., 'carpentry')
  const { slug } = useParams<{ slug: string }>();

  // Find the content for this specific page
  const trade = TRADE_PAGE_CONTENT.find(t => t.slug === slug);

  // Show a 'not found' message if the slug is invalid
  if (!trade) {
    return (
      <section className="py-24 text-center">
        <h1 className="text-4xl font-bold">Trade Not Found</h1>
        <p className="mt-4">Sorry, we couldn't find information for this trade.</p>
      </section>
    );
  }

  return (
    <>
      {/* Hero Section for the Trade */}
      <section className="relative py-32 bg-slate-800 text-white">
        <div className="absolute inset-0">
            <img src={trade.heroImage} alt={trade.title} className="w-full h-full object-cover opacity-30" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">{trade.title}</h1>
          <p className="mt-6 text-xl text-slate-200">{trade.intro}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          {trade.sections.map((section, index) => (
            <div key={index} className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">{section.title}</h2>
              <p className="text-lg text-slate-600 leading-relaxed">{section.content}</p>
            </div>
          ))}

          {/* FAQ Section */}
          {/* <div className="mt-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {trade.faq.map((item, index) => (
                <div key={index} className="border-l-4 border-[#fdb715] pl-6">
                  <h3 className="text-xl font-semibold text-slate-800">{item.question}</h3>
                  <p className="mt-2 text-lg text-slate-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </section>

       {/* Final CTA */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
             <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Get Your Skills Recognised?</h2>
             <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                Start our free, no-obligation skills check to see if you're eligible for the RPL pathway.
             </p>
            <RplCtaButton
                label="Start Free Skills Check"
                size="lg"
                variant="primary"
                formSrc="https://api.leadconnectorhq.com/widget/survey/hMCYKu5d6Ir83sjyduPH"
                title={`Skills Check for ${trade.title}`}
            />
        </div>
      </section>
    </>
  );
};

export default TradePage;