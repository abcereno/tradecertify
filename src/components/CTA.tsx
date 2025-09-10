import RplCtaButton from "./RplCtaButton";

const CTA: React.FC = () => {
  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-slate-900 text-white overflow-hidden">
      {/* Subtle background pattern for a premium feel */}
      <div className="absolute inset-0 opacity-5"></div>
      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
          Ready to Get <span className="text-[#D19D13]">Recognised</span>?
        </h2>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">
          Your years of on-the-job experience are valuable. Take our free skills check today to see if you're eligible to have your skills formally recognised.
        </p>

        <RplCtaButton
          label="Start Your Free Skills Check"
          size="lg"
          variant="primary"
          formSrc="https://api.leadconnectorhq.com/widget/survey/hMCYKu5d6Ir83sjyduPH"
          title="RPL Skills Check"
        />
      </div>
    </section>
  );
};

export default CTA;