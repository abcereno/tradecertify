import React from 'react';
import { Helmet } from 'react-helmet-async'; // A library to manage the document head for SEO

// The refined and categorized FAQ data
const FAQ_DATA = [
  {
    category: "The RPL Process",
    questions: [
      {
        question: "How does the RPL process work?",
        answer: "Our process is simple and designed for busy tradies. It starts with a free skills check to confirm your eligibility. Then, we guide you in building a strong evidence portfolio. Finally, we connect you with an RTO that conducts the formal assessment and issues your nationally recognised qualification if you meet the qualification requirements."
      },
      {
        question: "How long does it all take?",
        answer: "The time it takes to complete your RPL will depend on how quickly you can send us your evidence. Once your portfolio is submitted to the RTO, the assessment usually takes around 4 to 8 weeks. This duration may vary if some of your evidence doesn’t match the units of competency for the qualification you are seeking, if the RTO needs to review extra details, or if any gap training is required."
      },
      {
        question: "Can you help me get my trade license?",
        answer: "While we don't handle licensing directly, the nationally recognised qualification you receive is often a key requirement for applying for a trade license. We can refer you to our trusted partner, Licence Assist, who can guide you through the specific next steps for your state and trade."
      },
       {
        question: "Can an assessor visit me on-site or call me?",
        answer: "Yes, this is a standard part of the process for the RTO. An assessor from the Registered Training Organisation may call you to verify your experience or, in some cases, arrange an on-site visit to observe your skills in a real work environment. This is always scheduled in advance with you."
      }
    ]
  },
  {
    category: "Evidence & Documents",
    questions: [
      {
        question: "Who can write me a reference letter?",
        answer: "The best person is a qualified and licensed professional who has directly supervised your work. This could be a site supervisor, an employer, or a builder you've worked with. The letter should detail your skills and responsibilities on the job."
      },
      {
        question: "What if I can't get in touch with my old boss?",
        answer: "Don't worry, this is a common situation. We can build your portfolio using other forms of evidence, such as a reference from another qualified colleague, detailed invoices, job plans, contracts, or even more photos and videos of your work."
      },
      {
        question: "How recent does my work experience need to be?",
        answer: "Generally, evidence from the last 2-3 years is considered most relevant. For trades that change rapidly, the RTO may prefer evidence from the past 12 months. We will help you select your strongest and most current examples."
      },
       {
        question: "Do I need to be in the photos and videos?",
        answer: "Yes, the best evidence shows you safely performing the work yourself. While 'before and after' shots are good supporting evidence, the core of your portfolio should feature you in action."
      }
    ]
  },
  {
    category: "Qualifications & Outcomes",
    questions: [
       {
        question: "Will my qualification be nationally recognised?",
        answer: "Absolutely. All qualifications are issued by our ASQA-registered RTO partners and are recognised under the Australian Qualifications Framework (AQF). They are valid in every state and territory and are nationally recognised and valid across Australia."
      },
       {
        question: "When will my qualification show up on my USI?",
        answer: "You are considered fully qualified the moment you receive your certificate from the RTO. The RTO is required to report this data to the government annually, so it will typically appear on your USI (Unique Student Identifier) transcript by May-June of the following year."
      },
      {
        question: "Can I use my qualification for migration purposes?",
        answer: "This is a very specific process that you must discuss with your migration agent. Our RTO partners are generally not CRICOS-approved, meaning they serve domestic students. Your agent will need to confirm if the qualification will be accepted for your specific visa and skills assessment pathway."
      },
      {
        question: "I already have some units from a previous course. Can I get credit?",
        answer: "Yes, it's very likely. If you have a Statement of Attainment for units that are equivalent to those in the new qualification, the RTO can grant you a Credit Transfer. This means you won't need to provide evidence for those specific units."
      }
    ]
  }
];

// Simple Accordion Item Component
const AccordionItem = ({ q }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div className="border-b border-slate-200 py-4">
            <button
                className="w-full flex justify-between items-center text-left text-lg font-semibold text-slate-800"
                onClick={() => setIsOpen(!isOpen)}
            >
                {q.question}
                <span className={`transform transition-transform duration-300 ${isOpen ? '-rotate-180' : ''}`}>
                    &#9660;
                </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}
            >
                <p className="text-slate-600 leading-relaxed">{q.answer}</p>
            </div>
        </div>
    );
};


const FaqPage: React.FC = () => {
    // SEO: JSON-LD Structured Data for Rich Snippets in Google
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQ_DATA.flatMap(category => 
            category.questions.map(q => ({
                "@type": "Question",
                "name": q.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": q.answer
                }
            }))
        )
    };

  return (
    <>
      <Helmet>
        <title>FAQ - Your Questions Answered | Trade Certify</title>
        <meta name="description" content="Find answers to common questions about RPL, evidence requirements, and getting your trade experience formally recognised." />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="py-24 bg-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-semibold text-lg text-[#fdb715] mb-2">Support</p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">Frequently Asked Questions</h1>
          <p className="mt-4 text-lg text-slate-600">
            Everything you need to know about our RPL service and how we help you get the recognition you deserve.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          {FAQ_DATA.map((category) => (
            <div key={category.category} className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-6 border-b-2 border-[#fdb715] pb-2">
                {category.category}
              </h2>
              <div>
                {category.questions.map((q, index) => (
                  <AccordionItem key={index} q={q} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default FaqPage;