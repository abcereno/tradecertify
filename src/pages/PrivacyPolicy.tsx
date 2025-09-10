import React, { useEffect, useMemo, useState } from "react";
import SEO from "@/SEO";
import { webpageJSONLD, breadcrumbJSONLD } from "@/seo/builders";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
type TocItem = { id: string; title: string };

const TOC: TocItem[] = [
  { id: "introduction", title: "1. Introduction" },
  { id: "collection", title: "2. Collection & Storage of Personal Information" },
  { id: "use", title: "3. Use of Personal Information" },
  { id: "disclosure", title: "4. Disclosing Personal Information" },
  { id: "overseas", title: "5. Overseas Data Transfers" },
  { id: "behavioural-ads", title: "6. Behavioural Advertising" },
  { id: "cookies", title: "7. Cookies & Tracking" },
  { id: "security", title: "8. Data Security & Retention" },
  { id: "changes", title: "9. Changes" },
  { id: "access-correction-complaints", title: "10. Access, Correction & Complaints" },
];

const SectionTitle: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => (
  <h2 id={id} className="scroll-mt-28 text-2xl font-bold text-[#373b40] mb-4">
    {children}
  </h2>
);

export default function PrivacyPolicy() {
  const lastUpdated = useMemo(() => "1 September 2025", []);
  const [activeId, setActiveId] = useState<string>(TOC[0].id);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1));
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "0px 0px -70% 0px", threshold: [0, 1] }
    );

    TOC.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const handleTocClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    // Update hash without jumping
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <>
     <SEO
       title="Privacy Policy"
       description="How Trade Certify collects, uses, stores, and protects personal information."
       canonical="/privacy"
       jsonLd={[
         webpageJSONLD("Privacy Policy", "/privacy"),
         breadcrumbJSONLD([{ name: "Home", url: "/" }, { name: "Privacy Policy", url: "/privacy" }]),
       ]}
     />
      {/* Hero */} 
      <header className="bg-gradient-to-b from-white to-[#f7f8fa] border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <div className="flex items-start gap-5">
            <div className="h-12 w-12 rounded-2xl bg-[#fdb715]/15 grid place-items-center text-[#fdb715]">
              {/* lock icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" className="opacity-90" aria-hidden>
                <path
                  fill="currentColor"
                  d="M17 8h-1V6a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2Zm-8-2a3 3 0 1 1 6 0v2H9V6Zm9 12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v8Z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-[#373b40]">Privacy Policy</h1>
              <p className="mt-2 text-gray-600">
                This policy explains how Trade Certify collects, uses, discloses, and protects your
                personal information in line with the Australian Privacy Act 1988 (Cth).
              </p>
              <p className="mt-2 text-sm text-gray-500">Last updated: {lastUpdated}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-[260px_1fr] gap-10">
          {/* TOC */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Table of Contents
              </p>
              <nav className="space-y-1">
                {TOC.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={handleTocClick(item.id)}
                    className={[
                      "block rounded-lg px-3 py-2 text-sm transition-colors",
                      activeId === item.id
                        ? "bg-[#fdb715]/15 text-[#373b40] font-semibold"
                        : "text-gray-600 hover:bg-gray-50",
                    ].join(" ")}
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <article className="space-y-10">
            {/* 1 */}
            <section aria-labelledby="introduction-heading">
              <SectionTitle id="introduction">1. Introduction</SectionTitle>
              <p className="text-gray-700">
                1.1 Trade Certify (“we,” “us,” or “our”) is committed to protecting your privacy. This
                Privacy Policy outlines how we collect, use, hold, disclose, and protect your personal
                information through our website and services, in accordance with applicable privacy
                laws, including the Australian Privacy Act 1988 (Cth).
              </p>
              <p className="text-gray-700 mt-3">
                1.2 By providing personal information to us, you consent to our collection, hold, use,
                and disclosure of your personal information in accordance with this Privacy Policy and
                any other arrangements that may apply between us.
              </p>
              <p className="text-gray-700 mt-3">
                1.3 We reserve the right, at our discretion, to change this Privacy Policy by posting
                the revised Privacy Policy on our website. By using our website and providing us with
                personal information, you acknowledge that you have read and agreed to the revised
                Privacy Policy.
              </p>
            </section>

            {/* 2 */}
            <section aria-labelledby="collection-heading">
              <SectionTitle id="collection">2. Collection & Storage of Personal Information</SectionTitle>

              <p className="text-gray-700 font-semibold">2.1 Information collected automatically:</p>
              <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
                <li>Web browser type, IP address, time zone, and cookies on your device;</li>
                <li>Web pages you view, referring sites or search terms, and interaction details with the site.</li>
              </ul>

              <p className="text-gray-700 font-semibold mt-4">2.2 Information you provide to us (examples):</p>
              <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
                <li>Your name and contact details (email, phone number)</li>
                <li>Educational background and credentials (e.g., Unique Student Identifier (USI))</li>
                <li>English proficiency</li>
                <li>Billing and shipping addresses</li>
                <li>Payment information</li>
                <li>Evidence and documentation to support your RPL application</li>
                <li>Information about your past work experience and qualifications</li>
              </ul>

              <p className="text-gray-700 mt-4">
                2.3 We may also collect additional information in various circumstances, such as when
                you provide feedback, share details about your personal or business matters, update
                your content or email preferences, participate in surveys or promotions, supply
                financial or credit card details, or interact with our customer support team.
              </p>

              <p className="text-gray-700 mt-4 font-semibold">2.4 How we collect:</p>
              <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
                <li>
                  Directly from you (in person, phone, letter, electronic communication, application
                  forms, or when you request further details about our services through our website)
                </li>
                <li>When making purchases from Trade Certify</li>
                <li>Automatically via tracking technologies like cookies and analytics tools</li>
                <li>From third parties such as analytics providers and Registered Training Organisations (RTOs)</li>
              </ul>

              <p className="text-gray-700 mt-4">
                2.5 If you have opted into our mailing list, you can unsubscribe from marketing
                communications at any time. You may also request removal from the list at any time.
              </p>
              <p className="text-gray-700 mt-3">
                2.6 Our services and site are not intended for minors (under 18 years of age). Trade Certify
                does not knowingly collect personal information from minors without parental consent.
              </p>
            </section>

            {/* 3 */}
            <section aria-labelledby="use-heading">
              <SectionTitle id="use">3. Use of Personal Information</SectionTitle>
              <p className="text-gray-700">3.1 Your information may be used to:</p>
              <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
                <li>Process orders and service requests, including payment processing and confirmations</li>
                <li>Communicate with you about purchases, services, updates, or support</li>
                <li>Enhance, optimise, and understand usage trends through analytics</li>
                <li>Prevent fraud, perform risk screening, and secure the site</li>
                <li>With explicit consent, provide marketing and promotional communications</li>
                <li>Facilitate RPL and assessment services, manage applications, and liaise with RTOs and authorities as required</li>
              </ul>
            </section>

            {/* 4 */}
            <section aria-labelledby="disclosure-heading">
              <SectionTitle id="disclosure">4. Disclosing Personal Information</SectionTitle>
              <p className="text-gray-700">4.1 We may disclose your personal data, with your consent or as required, with:</p>
              <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
                <li>Our employees</li>
                <li>
                  Third-party suppliers or service providers, including Registered Training Organisations,
                  agents assisting with delivery services, and mailing or distribution providers
                </li>
                <li>Professional advisors, such as accountants, lawyers, and auditors</li>
                <li>Payment processors, including banks or merchants handling card transactions</li>
                <li>Parties acquiring our business or assets</li>
                <li>Third parties you have specifically authorised to receive your information</li>
                <li>
                  Others, including government agencies, local councils, courts, regulatory bodies,
                  and law enforcement, authorised or permitted by law
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                4.2 By submitting your personal information to us, you agree to the terms of this Privacy
                Policy and the types of disclosures described herein. When we share your personal
                information with third parties, we will request that they handle it in accordance with
                this Policy. Trade Certify does not guarantee that third parties will protect your
                information and is not liable for any privacy breaches by such third parties.
              </p>
            </section>

            {/* 5 */}
            <section aria-labelledby="overseas-heading">
              <SectionTitle id="overseas">5. Overseas Data Transfers</SectionTitle>
              <p className="text-gray-700">
                5.1 By providing your personal information, you agree to its disclosure outside Australia
                and acknowledge that Trade Certify is not responsible under the Privacy Act 1988 (Cth)
                for how overseas recipients handle that information.
              </p>
              <p className="text-gray-700 mt-3">
                5.2 Trade Certify will take reasonable steps to ensure that any overseas recipient
                manages your personal information in a manner substantially consistent with the
                Australian Privacy Principles under the Privacy Act 1988 (Cth).
              </p>
            </section>

            {/* 6 */}
            <section aria-labelledby="behavioural-ads-heading">
              <SectionTitle id="behavioural-ads">6. Behavioural Advertising</SectionTitle>
              <p className="text-gray-700">
                6.1 Trade Certify may use your personal information to deliver targeted advertisements
                or marketing communications that we believe may be relevant to you. For more
                information on how targeted advertising works, see the Network Advertising Initiative (NAI):{" "}
                <a
                  className="text-[#fdb715] underline-offset-2 hover:underline"
                  href="https://www.networkadvertising.org/understanding-online-advertising/how-does-it-work"
                  target="_blank"
                  rel="noreferrer"
                >
                  networkadvertising.org
                </a>.
              </p>
              <p className="text-gray-700 mt-3">6.2 Opt out via:</p>
              <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
                <li>
                  Facebook:&nbsp;
                  <a className="text-[#fdb715] hover:underline" target="_blank" rel="noreferrer"
                     href="https://www.facebook.com/settings/?tab=ads">
                    facebook.com/settings/?tab=ads
                  </a>
                </li>
                <li>
                  Google:&nbsp;
                  <a className="text-[#fdb715] hover:underline" target="_blank" rel="noreferrer"
                     href="https://www.google.com/settings/ads/anonymous">
                    google.com/settings/ads/anonymous
                  </a>
                </li>
                <li>
                  Bing:&nbsp;
                  <a className="text-[#fdb715] hover:underline" target="_blank" rel="noreferrer"
                     href="https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads">
                    advertise.bingads.microsoft.com/.../personalized-ads
                  </a>
                </li>
              </ul>
              <p className="text-gray-700 mt-3">
                6.3 You can also opt out through the Digital Advertising Alliance:&nbsp;
                <a className="text-[#fdb715] hover:underline" target="_blank" rel="noreferrer"
                   href="http://optout.aboutads.info/">
                  optout.aboutads.info
                </a>.
              </p>
            </section>

            {/* 7 */}
            <section aria-labelledby="cookies-heading">
              <SectionTitle id="cookies">7. Cookies & Tracking</SectionTitle>
              <p className="text-gray-700">7.1 We use cookies and similar technologies to:</p>
              <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
                <li>Enhance your experience, remember preferences, and enable website functionality</li>
                <li>Collect analytics data and improve our marketing efforts</li>
              </ul>
              <p className="text-gray-700 mt-3">
                7.2 A cookie is a small text file stored on your device for record-keeping purposes.
                We use session ID cookies to make navigation easier. Session cookies expire when you
                close your browser. If you reject cookies, you can still access our website, but
                certain features may be limited.
              </p>
              <p className="text-gray-700 mt-3">
                7.3 Some partners may also use cookies and web beacons on our website. We do not have
                access to or control over these tracking technologies.
              </p>
              <p className="text-gray-700 mt-3">
                7.4 We may run ads through Google based on your visits to our site. You can opt out via
                Google’s advertising page.
              </p>
              <p className="text-gray-700 mt-3">
                7.5 We do not change our data collection or usage practices in response to “Do Not Track”
                signals from browsers.
              </p>
            </section>

            {/* 8 */}
            <section aria-labelledby="security-heading">
              <SectionTitle id="security">8. Data Security & Retention</SectionTitle>
              <p className="text-gray-700">
                8.1 We protect your data using encryption, secure storage, and other procedural safeguards.
              </p>
              <p className="text-gray-700 mt-3">
                8.2 When you place an order through our site, we retain your information for the legally
                required period (e.g., 2 years) or until you request its deletion; thereafter, the data
                is securely destroyed or de-identified.
              </p>
            </section>

            {/* 9 */}
            <section aria-labelledby="changes-heading">
              <SectionTitle id="changes">9. Changes</SectionTitle>
              <p className="text-gray-700">
                9.1 We may update this privacy policy from time to time to reflect changes to our practices
                or for operational, legal, or regulatory reasons.
              </p>
              <p className="text-gray-700 mt-3">
                9.2 Any changes can be made at our discretion and take effect immediately upon posting on
                our website.
              </p>
              <p className="text-gray-700 mt-3">
                9.3 We encourage you to review this Privacy Policy periodically for updates.
              </p>
            </section>

            {/* 10 */}
            <section aria-labelledby="access-correction-complaints-heading">
              <SectionTitle id="access-correction-complaints">
                10. Access, Correction & Complaints
              </SectionTitle>
              <p className="text-gray-700">10.1 You have the right to:</p>
              <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
                <li>Access or correct your personal information (request via written notice)</li>
                <li>Challenge data accuracy and completeness</li>
                <li>Lodge complaints about privacy practices</li>
              </ul>
              <p className="text-gray-700 mt-3">
                10.2 For questions, further information, or to lodge a complaint, contact us at{" "}
                <a href="mailto:info@tradecertify.com.au" className="text-[#fdb715] hover:underline">
                  info@tradecertify.com.au
                </a>.
              </p>
            </section>

            {/* Footer note */}
            <div className="pt-4 text-sm text-gray-500">
              This Privacy Policy applies to Trade Certify and describes our handling of personal information
              in connection with our website and services in Australia.
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
