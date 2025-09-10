import RplCtaButton from "./RplCtaButton";

const Process: React.FC = () => {
  
  const steps = [
    {
      number: "01",
      title: "Free Skills Check",
      description:
        "First, we review your work history and skills in a no-obligation chat to confirm that RPL is the right pathway for you.",
    },
    {
      number: "02",
      title: "Portfolio Preparation",
      description:
        "With our expert guidance, you gather the right evidence—like photos, videos, and references—to build a strong portfolio.",
    },
    {
      number: "03",
      title: "Formal Skills Assessment",
      description:
        "We submit your completed portfolio to a trusted, ASQA-registered RTO. Their qualified assessors validate your skills.",
    },
    {
      number: "04",
      title: "Nationally Recognised Outcome",
      description:
        "If successful, the RTO issues your nationally recognised qualification, giving you the formal recognition you've earned.",
    },
  ];

  return (
    <section id="process" className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Your Simple Pathway to Recognition
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Our expert team guides you through a clear, four-step process, handling the complexity so you can get qualified without the hassle.
          </p>
        </div>

        {/* --- AESTHETIC UPGRADE: Connected Timeline Layout --- */}
        <div className="relative">
          {/* The connecting line (visible on md screens and up) */}
          <div 
            className="hidden md:block absolute top-8 left-1/2 w-0.5 h-[calc(100%-4rem)] bg-slate-200"
            aria-hidden="true"
          ></div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
            {steps.map((step, index) => (
              <div 
                key={index} 
                // Alternating layout for desktop timeline effect
                className={`relative p-6 rounded-2xl ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
              >
                <div className="md:absolute top-1/2 -translate-y-1/2" style={index % 2 === 0 ? { right: 'calc(100% + 2rem)' } : { left: 'calc(100% + 2rem)' }}>
                  <div className="bg-[#fdb715] text-slate-900 w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto md:mx-0">
                    {step.number}
                  </div>
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">
                        {step.title}
                    </h3>
                    <p className="text-slate-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-20">
          <RplCtaButton
            label="Start Your Free Skills Check"
            size="lg"
            variant="primary"
            formSrc="https://api.leadconnectorhq.com/widget/survey/hMCYKu5d6Ir83sjyduPH"
            title="RPL Skills Check"
          />
        </div>
      </div>
    </section>
  );
};

export default Process;