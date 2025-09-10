import { useParams, Link } from "react-router-dom";
import {
  bySlug,
  getIssuer,
  canShowQualificationCode,
} from "@/data/qualifications";
import RtoBadge from "@/components/RtoBadge";
import SEO from "@/SEO";
import { courseJSONLD, breadcrumbJSONLD } from "@/seo/builders";
import RplCtaButton from "@/components/RplCtaButton";

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <section className="border-b border-gray-200 pb-8 mb-8">
    <h2 className="text-2xl font-bold text-[#373b40] mb-4">{title}</h2>
    {children}
  </section>
);

const QualificationPage: React.FC = () => {

  const { slug } = useParams<{ slug: string }>();
  const q = slug ? bySlug(slug) : undefined;

  if (!q) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-4">Not found</h1>
        <p className="text-gray-600 mb-6">
          We couldn't find that qualification.
        </p>
        <Link to="/" className="text-[#fdb715] font-semibold">
          ← Back to Home
        </Link>
      </div>
    );
  }

  const issuer = getIssuer(q);
  const partnered = issuer?.status === "partnered";
  const showCode = canShowQualificationCode(q);

  const pageTitle = `${q.tradeTitle}${
    showCode ? ` (${q.qualificationCode})` : ""
  }`;

  return (
    <>
      <SEO
        title={pageTitle}
        description={q.overview || q.shortDescription}
        canonical={`/qualifications/${q.slug}`}
        type="article"
        image={q.image}
        jsonLd={[
          // Keep your builders; ensure they won’t inject issuer/code when not partnered
          courseJSONLD({
            ...q,
            qualificationCode: showCode ? q.qualificationCode : undefined,
          }),
          breadcrumbJSONLD([
            { name: "Home", url: "/" },
            { name: "Trades We Support via RPL", url: "/#services" },
            { name: q.tradeTitle, url: `/qualifications/${q.slug}` },
          ]),
        ]}
      />

      <article className="min-h-screen bg-[#f7f8fa]">
        {/* Hero */}
        <div className="relative bg-white">
          <div className="max-w-5xl mx-auto px-4 py-10">
            {/* If not partnered, show a clear information-only banner */}
            {!partnered && (
              <div className="mb-4 rounded-lg border border-amber-300 bg-amber-50 text-amber-900 p-3 text-sm">
                <strong>Information guide:</strong> Trade Certify is{" "}
                <span className="underline">not</span> an RTO and does not
                advertise or offer this qualification. We provide RPL portfolio
                preparation and refer eligible candidates to an appropriate
                ASQA-registered RTO. Issuing RTO details will be provided after
                eligibility is confirmed.
                <span className="ml-2">
                  <Link to="/rto-partners" className="underline">
                    See RTO partners
                  </Link>
                  .
                </span>
              </div>
            )}

            <div className="flex items-start gap-6">
              <img
                src={q.image}
                alt={q.tradeTitle}
                className="w-44 h-28 object-cover rounded-lg shadow"
              />
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#373b40]">
                  {/* Only show the code in the heading when partnered */}
                  {showCode
                    ? `${q.qualificationCode} - ${q.tradeTitle}`
                    : q.tradeTitle}
                </h1>

                {/* Issuer badge (only when partnered) */}
                {partnered && issuer && (
                  <div className="mt-2">
                    <RtoBadge
                      legalName={issuer.legalName}
                      rtoCode={issuer.rtoCode}
                      scopeUrl={issuer.scopeUrl}
                    />
                  </div>
                )}

                <p className="text-gray-600 mt-3 max-w-2xl">
                  {q.overview || q.shortDescription}
                </p>

                <div className="mt-4 flex gap-3">
                  {q.tgaUrl && (
                    <a
                      href={q.tgaUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-[#fdb715] text-[#373b40] font-semibold hover:brightness-95"
                    >
                      View on training.gov.au
                    </a>
                  )}
                  <Link
                    to="/#services"
                    className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Back to trades
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Quick facts */}
          <Section title="At a glance">
            <ul className="grid sm:grid-cols-2 gap-3 text-gray-700">
              <li>
                <strong>Pathway:</strong> Recognition of Prior Learning (RPL)
              </li>
              {/* Only show code when partnered */}
              {showCode && (
                <li>
                  <strong>Code:</strong> {q.qualificationCode}
                </li>
              )}
              {q.tgaUrl && (
                <li className="truncate">
                  <strong>TGA:</strong>{" "}
                  <a
                    className="text-[#fdb715]"
                    href={q.tgaUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {q.tgaUrl}
                  </a>
                </li>
              )}
            </ul>
            {/* Persistent micro-disclaimer under quick facts */}
            <p className="mt-3 text-sm text-gray-500">
              Trade Certify is not an RTO. RPL assessments are conducted by
              ASQA-registered RTOs. Where applicable, the issuing RTO’s name and
              code are disclosed on this page.
            </p>
          </Section>

          {/* Outcomes */}
          {q.outcomes?.length ? (
            <Section title="What you’ll get out of it">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                {q.outcomes.map((o, i) => (
                  <li key={i}>{o}</li>
                ))}
              </ul>
            </Section>
          ) : null}

          {/* Units (optional) */}
          {q.coreUnits?.length || q.electiveUnits?.length ? (
            <Section title="Units in this qualification">
              <div className="grid md:grid-cols-2 gap-8">
                {q.coreUnits?.length ? (
                  <div>
                    <h3 className="font-semibold mb-2">Core units</h3>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      {q.coreUnits.map((u, i) => (
                        <li key={i}>{u}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {q.electiveUnits?.length ? (
                  <div>
                    <h3 className="font-semibold mb-2">Elective units</h3>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      {q.electiveUnits.map((u, i) => (
                        <li key={i}>{u}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </Section>
          ) : null}

          {/* Student video */}
          {q.videoUrl ? (
            <Section title="Hear from our student">
              <div className="aspect-video w-full rounded-xl overflow-hidden shadow">
                <iframe
                  src={q.videoUrl.replace("watch?v=", "embed/")}
                  title={`${q.tradeTitle} student video`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </Section>
          ) : null}

          {/* CTA */}
          <Section title="Ready to check your eligibility?">
            <p className="text-gray-700 mb-4">
              If you’ve been on the tools for years, we’ll help you prepare an
              RPL evidence portfolio for assessment by a Registered Training
              Organisation.
            </p>
            <RplCtaButton
  label="Start RPL Readiness Check"
  size="lg"
  variant="primary"
  formSrc="https://api.leadconnectorhq.com/widget/survey/hMCYKu5d6Ir83sjyduPH"
  title="RPL Readiness Check"
  height="600px"
/>
          </Section>
        </div>
      </article>
    </>
  );
};

export default QualificationPage;
