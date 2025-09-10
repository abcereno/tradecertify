import React from 'react';
import { Helmet } from 'react-helmet-async';
import RplCtaButton from '@/components/RplCtaButton'; // Assuming component path

const WhatIsRplPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>What is RPL? | Recognition of Prior Learning | Trade Certify</title>
                <meta name="description" content="Learn about Recognition of Prior Learning (RPL), the official process for turning your on-the-job trade experience into a nationally recognised qualification in Australia." />
            </Helmet>

            {/* Hero Section */}
            <section className="py-24 bg-slate-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <p className="font-semibold text-lg text-[#fdb715] mb-2">The Smart Pathway</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900">What is Recognition of Prior Learning (RPL)?</h1>
                    <p className="mt-4 text-xl text-slate-600">
RPL is an assessment process that recognises the skills and knowledge you’ve already gained—whether through work experience, formal training, or life experiences—towards a nationally recognized qualification.                    </p>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-6">

                    {/* Simple Analogy Section */}
                    <div className="mb-16 p-8 bg-slate-50 rounded-2xl">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Think of It Like This...</h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            You've been driving safely for 20 years, but you've lost your driver's license card. You don't need to go back to driving school and learn from scratch. You just need to take a practical test to prove you still have the skills.
                            <br/><br/>
                            <strong>RPL is the same for your trade.</strong> You've already done the learning on-site for years; now it's time to prove your skills and get the formal qualification you've earned, without going back to a classroom.
                        </p>
                    </div>

                    {/* Who is RPL For? Section */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Who is RPL For?</h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            RPL is the perfect pathway for skilled tradespeople who have:
                        </p>
                        <ul className="mt-6 space-y-4 text-lg text-slate-600">
                            <li className="flex items-start">
                                <span className="text-[#fdb715] font-bold mr-3">✔</span>
                                <span>Years of practical, hands-on experience in their trade.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-[#fdb715] font-bold mr-3">✔</span>
                                <span>Learned their skills on the job rather than through formal study.</span>
                            </li>
                             <li className="flex items-start">
                                <span className="text-[#fdb715] font-bold mr-3">✔</span>
                                <span>Experience from overseas that needs to be formally recognised in Australia.</span>
                            </li>
                             <li className="flex items-start">
                                <span className="text-[#fdb715] font-bold mr-3">✔</span>
                                <span>The skills, but not the formal "piece of paper" required for a license or a better job.</span>
                            </li>
                        </ul>
                    </div>

                     {/* The Benefits Section */}
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">The Benefits of an RPL Qualification</h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Getting your skills formally recognised through RPL isn't just about getting a certificate. It's about unlocking your future potential.
                        </p>
                         <div className="mt-8 grid md:grid-cols-2 gap-8">
                            <div className="bg-slate-50 p-6 rounded-lg">
                                <h3 className="font-bold text-xl text-slate-800 mb-2">Increase Your Earnings</h3>
                                <p className="text-slate-600">Formal qualifications can help you command higher rates and win more profitable contracts.</p>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-lg">
                                <h3 className="font-bold text-xl text-slate-800 mb-2">Meet License Requirements</h3>
                                <p className="text-slate-600">A qualification is often the first step to getting the trade license you need to work for yourself.</p>
                            </div>
                              <div className="bg-slate-50 p-6 rounded-lg">
                                <h3 className="font-bold text-xl text-slate-800 mb-2">Save Time and Money</h3>
                                <p className="text-slate-600">RPL is significantly faster and more affordable than going back to TAFE or undertaking a full apprenticeship.</p>
                            </div>
                             <div className="bg-slate-50 p-6 rounded-lg">
                                <h3 className="font-bold text-xl text-slate-800 mb-2">Advance Your Career</h3>
                                <p className="text-slate-600">Unlock opportunities for supervisory roles, access to larger commercial projects, and more.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            
            {/* Final CTA */}
            <section className="py-20 bg-slate-800 text-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to See if You're Eligible?</h2>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
                        The first step is a free, no-obligation skills check with our team. We'll review your experience and confirm if the RPL pathway is right for you.
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
        </>
    );
};

export default WhatIsRplPage;