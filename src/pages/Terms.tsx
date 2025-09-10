import React, { useEffect, useMemo, useState } from "react";
import SEO from "@/SEO";
import { breadcrumbJSONLD, webpageJSONLD } from "@/seo/builders";

type TocItem = { id: string; title: string };

const TOC: TocItem[] = [
  { id: "introduction", title: "1. Introduction" },
  { id: "background", title: "2. Background" },
  { id: "role-trade-certify", title: "3. Role of Trade Certify in the RPL Process" },
  { id: "role-rto", title: "4. Role of Registered Training Organisation (RTO)" },
  { id: "role-applicant", title: "5. Role of Applicant" },
  { id: "eligibility-evidence", title: "6. Eligibility and Evidence" },
  { id: "account-management-scope", title: "7. Account Management and Scope" },
  { id: "gap-assessments", title: "8. GAP Assessments" },
  { id: "limitation-liability", title: "9. Limitation of Liability" },
  { id: "confidentiality-privacy", title: "10. Confidentiality and Privacy" },
  { id: "termination", title: "11. Termination of Contract" },
  { id: "fees", title: "12. Fees" },
  { id: "refund-policy", title: "13. Refund Policy" },
  { id: "complaint-appeal", title: "14. Complaint and Appeal Process" },
  { id: "changes-terms", title: "15. Changes to Terms" },
  { id: "governing-law", title: "16. Governing Law" },
  { id: "acceptance", title: "17. Acceptance of Terms" },
  { id: "severance", title: "18. Severance" },
];

const SectionTitle: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => (
  <h2 id={id} className="scroll-mt-28 text-2xl font-bold text-[#373b40] mb-4">
    {children}
  </h2>
);

const Terms: React.FC = () => {
  const lastUpdated = useMemo(() => "1 September 2025", []);
  const [activeId, setActiveId] = useState<string>(TOC[0].id);

  // Highlight TOC item on scroll
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1));
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "0px 0px -70% 0px", threshold: [0, 1] }
    );
    TOC.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const handleTocClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <>
      <SEO
        title="Terms & Conditions"
        description="Terms and Conditions for the provision of RPL services by Trade Certify."
        canonical="/terms"
        jsonLd={[
          webpageJSONLD("Terms & Conditions", "/terms"),
          breadcrumbJSONLD([
            { name: "Home", url: "/" },
            { name: "Terms & Conditions", url: "/terms" },
          ]),
        ]}
      />

      {/* Hero */}
      <header className="bg-gradient-to-b from-white to-[#f7f8fa] border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <div className="flex items-start gap-5">
            <div className="h-12 w-12 rounded-2xl bg-[#fdb715]/15 grid place-items-center text-[#fdb715]">
              {/* document icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
                <path
                  fill="currentColor"
                  d="M14 2H6a2 2 0 0 0-2 2v16c0 1.103.897 2 2 2h12a2 2 0 0 0 2-2V8zm4 18H6V4h7v5h5z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-[#373b40]">
                Terms and Conditions for the Provision of RPL Services
              </h1>
              <p className="mt-2 text-gray-600">
                These Terms govern the RPL services facilitated by Trade Certify Pty Ltd.
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
          <article className="space-y-10 text-gray-700">
            {/* 1 */}
            <section>
              <SectionTitle id="introduction">1. Introduction</SectionTitle>
              <p>
                These Terms and Conditions sets outs the provision of Recognition of Prior Learning (RPL)
                services facilitated by Trade Certify Pty Ltd (“Trade Certify”, “we”, “our”, or “us”) to
                applicant (“you”) seeking nationally recognised qualifications issued by a Registered
                Training Organisation (RTO) in accordance with the Standards for RTOs 2025 (or their
                successor).
              </p>
            </section>

            {/* 2 */}
            <section>
              <SectionTitle id="background">2. Background</SectionTitle>
              <p className="mt-2">
                <strong>2.1</strong> Registered Training Organisations (RTOs) are authorised by the Australian
                Skills Quality Authority (ASQA), to issue nationally recognized qualifications within their
                approved scope of registration.
              </p>
              <p className="mt-2">
                <strong>2.2</strong> One common pathway to attain a qualification involves enrolling in and
                completing a structured course delivered by an RTO. These courses are designed to equip
                learners with the knowledge and practical skills required to demonstrate competency in all
                units or components of a qualification.
              </p>
              <p className="mt-2">
                <strong>2.3</strong> However, skills and knowledge are not exclusively acquired through formal
                education. Individuals often acquire substantial expertise through practical work experience,
                on-the-job training, and other informal learning methods. In many cases, this informal
                learning is equivalent to, or exceeds, the competencies expected of a qualification. RTOs
                recognize and assess the existing skills and knowledge of an applicant and may issue
                qualifications to individuals who, without completing a formal course, can provide
                sufficient evidence of their competence. This process is formally referred to as
                Recognition of Prior Learning (RPL).
              </p>
              <p className="mt-2">
                <strong>2.4</strong> RTOs have a duty to ensure that any applicant seeking a qualification
                through RPL genuinely meets all competency requirements across the relevant units. This is
                achieved through an assessment process that involves mapping the applicant’s existing
                skills and knowledge with the Unit of Competency of the qualification. Applicants must
                produce a body of evidence that satisfies defined assessment criteria and standards.
              </p>
            </section>

            {/* 3 */}
            <section>
              <SectionTitle id="role-trade-certify">3. Role of Trade Certify in the RPL Process</SectionTitle>
              <p><strong>3.1</strong> Obtaining a qualification through RPL can be complex for applicants. Challenges may include:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>a) Identifying appropriate qualifications aligned with their informal experience and training;</li>
                <li>b) Approaching an RTO to initiate the RPL process; and</li>
                <li>c) Gathering, structuring, and presenting the necessary evidence to demonstrate competence.</li>
              </ul>

              <p className="mt-4"><strong>3.2</strong> Trade Certify supports applicants throughout the RPL process. While Trade Certify is not an RTO, it acts as a facilitator of RPL Services. Its functions include:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>a) Establishing partnerships with RTOs that are open to assessing RPL applications;</li>
                <li>b) Interpreting RTO criteria for qualifications based on information provided by RTOs;</li>
                <li>c) Assessing whether, based on declared experience and training, an applicant is likely eligible for a qualification (subject to evidence);</li>
                <li>d) Assisting Applicants in preparing, compiling, and organising supporting evidence of competency;</li>
                <li>e) Coordinating communication with RTOs;</li>
                <li>f) Coordinating any required Gap Training;</li>
                <li>g) Supporting applicants through the assessment process and appeal options, where available;</li>
                <li>h) Forwarding qualifications and supporting documents issued by RTOs upon successful assessment.</li>
              </ul>

              <p className="mt-4"><strong>3.3</strong> Trade Certify’s RPL Services are provided based on:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>a) Information received from RTOs regarding the requirements for qualifications or Statements of Attainment; and</li>
                <li>b) Information provided by the applicant about their experience and training.</li>
              </ul>

              <p className="mt-4"><strong>3.4</strong> Any preliminary indication by Trade Certify that an applicant may be eligible for a qualification is conditional on the assumption that their claimed experience can be evidenced.</p>
              <p className="mt-2"><strong>3.5</strong> Applicants acknowledge that RTOs conduct assessments independently, and Trade Certify cannot guarantee any outcome or successful issuance of a qualification.</p>

              <p className="mt-2"><strong>3.6</strong> If Trade Certify reasonably believes an applicant is unlikely to meet the assessment requirements for a qualification, it:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>a) will not proceed with providing RPL Services; and</li>
                <li>b) will not charge any service fees.</li>
              </ul>
            </section>

            {/* 4 */}
            <section>
              <SectionTitle id="role-rto">4. Role of Registered Training Organisation (RTO)</SectionTitle>
              <p className="mt-2"><strong>4.1</strong> The nationally recognised qualification will be issued solely by an RTO registered with the Australian Skills Quality Authority (ASQA) or relevant registering body.</p>
              <p className="mt-2"><strong>4.2</strong> The RTO is solely responsible for conducting the final assessment of your competency and for issuing qualifications in accordance with the applicable training package and legislation.</p>
              <p className="mt-2"><strong>4.3</strong> You will be required to formally enrol with the RTO before any qualification is issued.</p>
            </section>

            {/* 5 */}
            <section>
              <SectionTitle id="role-applicant">5. Role of Applicant</SectionTitle>
              <p className="mt-2"><strong>5.1</strong> Applicants must act in good faith and must not submit any false, misleading, or deceptive information.</p>
              <p className="mt-2"><strong>5.2</strong> Applicants are responsible for determining whether they can meet the evidentiary and competency standards, particularly when this information is provided prior to enrolment.</p>
              <p className="mt-2"><strong>5.3</strong> Upon Enrolment, applicants must:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>a) Provide 100 points of identification;</li>
                <li>b) Supply their Unique Student Identifier (USI) if not already held.</li>
              </ul>
              <p className="mt-2"><strong>5.4</strong> All evidence and supporting documents must be submitted electronically unless advised otherwise and must not be plagiarised.</p>
              <p className="mt-2"><strong>5.5</strong> Applicants are also expected to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>a) Cooperate fully in the evidence collection and RPL process;</li>
                <li>b) Provide timely and complete documents;</li>
                <li>c) Complete and sign all RTO forms;</li>
                <li>d) Disclose any previous enrolments or assessments with RTOs for the same qualification;</li>
                <li>e) Not misrepresent or falsify any information or documentation.</li>
                <li>f) Respond promptly to further information requests during assessment judgment.</li>
              </ul>
              <p className="mt-2"><strong>5.6</strong> Applicant may require authorising Trade Certify to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>a) Submit RPL applications on their behalf;</li>
                <li>b) Communicate with the RTO regarding their application;</li>
                <li>c) Share and receive relevant information with/from the RTO.</li>
              </ul>
            </section>

            {/* 6 */}
            <section>
              <SectionTitle id="eligibility-evidence">6. Eligibility and Evidence</SectionTitle>
              <p className="mt-2"><strong>6.1</strong> RPL is assessed based on sufficiency, authenticity, currency, and relevance of the evidence provided by the applicant in relation to the qualification requirements.</p>
              <p className="mt-2"><strong>6.2</strong> Applicants must submit accurate, complete, and verifiable documentation, which may include (but is not limited to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>a) Certified copies of qualifications and academic transcripts</li>
                <li>b) Employment references and position descriptions</li>
                <li>c) Work samples, portfolios, and third-party reports</li>
                <li>d) Licenses or certifications</li>
                <li>e) Statutory declarations or signed third-party statements of experience</li>
                <li>f) Evidence of professional development, training, or workshops</li>
                <li>g) Other forms of supporting documentation as requested by Trade Certify or the RTO</li>
              </ul>
              <p className="mt-2"><strong>6.3</strong> All evidence provided must be in English or accompanied by a certified English translation.</p>
              <p className="mt-2"><strong>6.4</strong> Trade Certify reserves the right to refuse to proceed with an RPL application if:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>a) The evidence is insufficient to meet competency requirements;</li>
                <li>b) The documents submitted are fraudulent, altered, or not authentic;</li>
                <li>c) The information provided cannot be verified within a reasonable timeframe; or</li>
                <li>d) The applicant fails to respond to reasonable requests for clarification or additional information.</li>
              </ul>
              <p className="mt-2"><strong>6.5</strong> The applicant acknowledges and accepts that a successful outcome of the RPL process is not guaranteed, and that the final decision rests solely with the RTO responsible for issuing the qualifications.</p>
            </section>

            {/* 7 */}
            <section>
              <SectionTitle id="account-management-scope">7. Account Management and Scope</SectionTitle>
              <p className="mt-2"><strong>7.1</strong> Upon enrolment, an applicant is assigned an Account Manager, who serves as the primary point of contact.</p>
              <p className="mt-2"><strong>7.2</strong> Trade Certify reserves the right to reassign Account Managers as necessary.</p>
              <p className="mt-2"><strong>7.3</strong> Trade Certify only facilitates applications to the third-party agent Max Education PTY Ltd and/or RTOs with which it has active working relationships and who agree to consider RPL applications.</p>
              <p className="mt-2"><strong>7.4</strong> If, after reviewing supporting evidence, Trade Certify reasonably believes the applicant will not meet the RTO’s competency standards, it will notify the applicant and request more evidence.</p>
              <p className="mt-2"><strong>7.5</strong> Trade Certify will promptly inform you and, where possible, provide details of alternative RTOs who may be able to assess the applicant, if, during the RPL process, the nominated RTO:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>a) Ceases or is unable to continue operations;</li>
                <li>b) Alters its Scope of Registration and can no longer issue the sought Qualification; or</li>
                <li>c) Ends its relationship with Trade Certify;</li>
              </ul>
            </section>

            {/* 8 */}
            <section>
              <SectionTitle id="gap-assessments">8. GAP Assessments</SectionTitle>
              <p className="mt-2"><strong>8.1</strong> During the RPL process, the RTO may request an applicant to complete an additional assessment to demonstrate competency. This process is commonly known as GAP Assessment.</p>
              <p className="mt-2"><strong>8.2</strong> As a part of the GAP Assessment, the applicant will require:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>a) To attend additional interviews, and/or</li>
                <li>b) To complete skills demonstrations, and/or</li>
                <li>c) To complete other types of assessments, including online-based sessions.</li>
              </ul>
              <p className="mt-2"><strong>8.3</strong> Failure to complete the GAP Assessment may compromise the outcome of the RPL process.</p>
              <p className="mt-2"><strong>8.4</strong> If a missed appointment results in rescheduling, the applicant agrees to pay the associated fee, which will be the greater of $100 or any pre-disclosed amount.</p>
            </section>

            {/* 9 */}
            <section>
              <SectionTitle id="limitation-liability">9. Limitation of Liability</SectionTitle>
              <p className="mt-2"><strong>9.1</strong> Trade Certify provides a facilitation service only and does not guarantee the outcome of your RPL application.</p>
              <p className="mt-2"><strong>9.2</strong> Trade Certify is not liable for any decisions, actions, or omissions of the RTO.</p>
              <p className="mt-2"><strong>9.3</strong> We are not responsible for delays caused by incomplete documentation, RTO processing timeframes, or changes in regulatory requirements.</p>
              <p className="mt-2">
                <strong>9.4</strong> Trade Certify and anyone working with us, including our team members, contractors, and partners, are not responsible for any loss, damage, costs, or claims you may experience. This includes both direct and indirect losses, such as lost income, lost savings, lost data, or extra costs to replace items, even if we were told such losses could happen. This applies whether the issue arises from using our services or products, from errors in our content, or from anything you access through our service.
              </p>
            </section>

            {/* 10 */}
            <section>
              <SectionTitle id="confidentiality-privacy">10. Confidentiality and Privacy</SectionTitle>
              <p className="mt-2"><strong>10.1</strong> Trade Certify complies with the Privacy Act 1988 (Cth) and will handle applicants’ personal information in accordance with our Privacy Policy.</p>
              <p className="mt-2"><strong>10.2</strong> Applicant’s information will only be shared with the third-party agent MAX Education PTY LTD, relevant RTO, or regulatory authorities as required by law or necessary for the provision of services.</p>
            </section>

            {/* 11 */}
            <section>
              <SectionTitle id="termination">11. Termination of Contract</SectionTitle>
              <p className="mt-2"><strong>11.1</strong> The Terms will remain in effect until terminated by either you or Trade Certify, as outlined below.</p>
              <p className="mt-2">
                <strong>11.2</strong> If you wish to terminate the Terms, you must provide Trade Certify with a minimum of 10 days’ written notice of your intention to do so. You are required to submit a written notice via email to <strong>info@tradecertify.com.au</strong> clearly stating your intention to end the agreement. Your email must include your full name, contact information, application reference number (if applicable), and a brief explanation for the termination.
              </p>
              <p className="mt-2"><strong>11.3</strong> Trade Certify will acknowledge receipt of your termination request in writing within a reasonable timeframe.</p>
              <p className="mt-2"><strong>11.4</strong> You are advised to keep a copy of your termination email and the acknowledgment from Trade Certify for your records.</p>
              <p className="mt-2"><strong>11.5</strong> Trade Certify may terminate these Terms at any time if you have breached, or are reasonably believed to be intending to breach, any provision of the Terms, or if termination is required by law. In such cases, Trade Certify will provide you with thirty (30) days’ written notice of termination.</p>
              <p className="mt-2"><strong>11.6</strong> Subject to applicable local laws, Trade Certify reserves the right to suspend, restrict, or permanently revoke your access to all or part of its services at any time, without prior notice, if you breach these Terms, violate any applicable laws, engage in conduct that may damage Trade Certify’s reputation, or infringe upon the rights of others. This action may be taken at Trade Certify’s sole discretion.</p>
            </section>

            {/* 12 */}
            <section>
              <SectionTitle id="fees">12. Fees</SectionTitle>
              <p className="mt-2"><strong>12.1</strong> Trade Certify will disclose all applicable service fees prior to the commencement of services.</p>
              <p className="mt-2"><strong>12.2</strong> Fees paid to Trade Certify cover the RPL facilitation process only and do not guarantee the issuance of a qualification.</p>
              <p className="mt-2"><strong>12.3</strong> Any fees paid to the issuing RTO are subject to their separate terms and conditions.</p>
              <p className="mt-2"><strong>12.4</strong> Fees for our products are subject to change without prior notice.</p>
              <p className="mt-2"><strong>12.5</strong> Trade Certify shall not be liable to you or to any third-party for any modification, price change, suspension, or discontinuance of the Service.</p>
            </section>

            {/* 13 */}
            <section>
              <SectionTitle id="refund-policy">13. Refund Policy</SectionTitle>
              <p className="mt-2"><strong>13.1</strong> Refunds may be available in accordance with Trade Certify’s Refund Policy, provided upon request.</p>
              <p className="mt-2"><strong>13.2</strong> If you have paid a deposit to Trade Certify, it will only be refunded to you under the following conditions:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  a) Subject to clause 11.2, you may withdraw by notifying Trade Certify in writing via email to <strong>info@tradecertify.com.au</strong> that you no longer wish to proceed with the services, provided the notification is received within 10 days of your application date or prior to the submission of your application for assessment judgement, whichever occurs first, to the RTO or MAX Education PTY LTD; or
                </li>
                <li>b) an assessor from RTO reviews the information and supporting documentation that you have submitted and determines that the RTO is unable to issue you with a qualification; or</li>
                <li>c) you are entitled to a refund under Australian Consumer Law (ACL); or</li>
                <li>d) Trade Certify elects to terminate these Terms under clause 11.</li>
              </ul>
              <p className="mt-2"><strong>13.3</strong> In all other circumstances, any deposit or fees paid by you are non-refundable. If you do not provide the requested information and documentation within one month from the application date, and have not submitted a refund request, the deposit or fee will be deemed forfeited and retained by Trade Certify.</p>
              <p className="mt-2"><strong>13.4</strong> Once the one-month application period has lapsed, the deposit or service fee will be considered forfeited and no longer eligible for a refund.</p>
              <p className="mt-2"><strong>13.5</strong> Trade Certify reserves the right to decline any refund request in circumstances where regulatory changes affect Trade Certify and/or MAX Education PTY LTD and/or RTOs issuing qualifications to the applicant.</p>
              <p className="mt-2"><strong>13.6</strong> All refunds will be made within 14 calendar days of the date when Trade Certify receives a written refund request for a valid reason.</p>
            </section>

            {/* 14 */}
            <section>
              <SectionTitle id="complaint-appeal">14. Complaint and Appeal Process</SectionTitle>
              <p className="mt-2"><strong>14.1</strong> If you are dissatisfied with a refund decision made by Trade Certify, you have the right to lodge a complaint or appeal regarding the outcome.</p>
              <p className="mt-2"><strong>14.2</strong> To submit a complaint or appeal, you must send an email to <strong>info@tradecertify.com.au</strong> with the subject line “Refund Complaint” or “Refund Appeal”, as appropriate, clearly outlining your concerns or reasons for appeal.</p>
              <p className="mt-2"><strong>14.3</strong> Complaints and appeals must be submitted within 10 calendar days of receiving the refund decision.</p>
              <p className="mt-2"><strong>14.4</strong> Trade Certify will acknowledge receipt of your complaint or appeal within 5 business days, and a formal response will be provided within 10 calendar days.</p>
              <p className="mt-2"><strong>14.5</strong> All complaints and appeals will be handled in a fair, transparent, and timely manner. You may be asked to provide additional supporting documentation to assist in the review process.</p>
              <p className="mt-2"><strong>14.6</strong> If your appeal is successful, any applicable refund will be processed within 14 calendar days of the decision.</p>
              <p className="mt-2"><strong>14.7</strong> If you are not satisfied with the outcome of your appeal, you may escalate your concern to the relevant regulatory authority or external dispute resolution body.</p>
            </section>

            {/* 15 */}
            <section>
              <SectionTitle id="changes-terms">15. Changes to Terms</SectionTitle>
              <p>
                Trade Certify reserves the right to amend these Terms and Conditions at any time.
                Updated versions will be made available on our website. It is your responsibility to
                check our website periodically for changes.
              </p>
            </section>

            {/* 16 */}
            <section>
              <SectionTitle id="governing-law">16. Governing Law</SectionTitle>
              <p>
                These Terms and Conditions are governed by the laws of the State or Territory in which
                Trade Certify operates, and you agree to submit to the jurisdiction of the courts of that
                State or Territory.
              </p>
            </section>

            {/* 17 */}
            <section>
              <SectionTitle id="acceptance">17. Acceptance of Terms</SectionTitle>
              <p>
                By engaging Trade Certify’s services, applicants acknowledge that they have read,
                understood, and agree to be bound by these Terms and Conditions.
              </p>
            </section>

            {/* 18 */}
            <section>
              <SectionTitle id="severance">18. Severance</SectionTitle>
              <p>
                If any part of these Terms is found to be void or unenforceable by a Court of competent
                jurisdiction, that part shall be severed and the rest of the Terms shall remain in force.
              </p>
            </section>
          </article>
        </div>
      </div>
    </>
  );
};

export default Terms;
