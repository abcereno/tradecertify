import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom'; // Import Link for internal navigation

const RefundPolicyPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Refund Policy | Trade Certify</title>
                <meta name="description" content="Read the Trade Certify money-back guarantee and refund policy for our Recognition of Prior Learning (RPL) support services." />
            </Helmet>

            {/* Hero Section */}
            <section className="py-24 bg-slate-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900">Refund Policy</h1>
                    <p className="mt-4 text-xl text-slate-600">
                        Our commitment to your success is backed by a clear and fair money-back guarantee.
                    </p>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-6 prose prose-slate lg:prose-lg">
                    
                    <h2>Our Commitment to You</h2>
                    <p>
                        Thank you for choosing Trade Certify to assist you in the Recognition of Prior Learning (RPL) process. Our goal is to provide the expert guidance and support you need to have your skills formally recognised by a registered training organisation (RTO).
                    </p>

                    <hr className="my-8" />

                    <h2>Money-Back Guarantee</h2>
                    <p>
                        We are confident in our ability to help you build a successful evidence portfolio. Our money-back guarantee applies under the following conditions:
                    </p>
                    <blockquote>
                        If, after you have provided all requested evidence and we have submitted your completed portfolio to our partner RTO, you are deemed ineligible for a qualification, we will issue a full refund of our service fee. This guarantee is valid only after we have demonstrated that all reasonable efforts have been made to support your application.
                    </blockquote>
                    <p>
                        This ensures that you are protected in the unlikely event that your extensive experience, once formally assessed, does not meet the requirements for the qualification.
                    </p>

                    <hr className="my-8" />

                    <h2>Late or Missing Refunds</h2>
                    <p>
                        We process all approved refunds promptly. However, delays can sometimes occur with banking and credit card systems. If you haven’t received an expected refund, please follow these steps:
                    </p>
                    <ol>
                        <li>First, double-check your bank account.</li>
                        <li>Next, contact your credit card company, as it may take some time for the refund to be officially posted to your statement.</li>
                        <li>Then, contact your bank. There is often a processing period before a refund is reflected in your balance.</li>
                    </ol>
                    <p>
                        If you have completed all of these steps and you still have not received your refund, please contact us directly.
                    </p>

                    <hr className="my-8" />

                    <h2>Contact Us</h2>
                    <p>
                        If you have any questions or concerns about our refund policy or a specific payment, please do not hesitate to reach out. We are here to help.
                    </p>
                    <p>
                        You can contact our support team via email at <a href="mailto:info@tradecertify.com.au">info@tradecertify.com.au</a> or visit our{' '}
                        <Link to="/contact">Contact Page</Link>.
                    </p>
                </div>
            </section>
        </>
    );
};

export default RefundPolicyPage;