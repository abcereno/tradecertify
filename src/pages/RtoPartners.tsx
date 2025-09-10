// src/pages/RtoPartnersPage.tsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ISSUERS, QUALIFICATIONS } from "@/data/qualifications";

type Status = "partnered" | "pending";

const chipClass: Record<Status, string> = {
  partnered:
    "inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30",
  pending:
    "inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/30",
};

const RtoPartnersPage: React.FC = () => {
  const [q, setQ] = useState("");

  // Derive rows from central data
  const rows = useMemo(() => {
    const items = Object.values(ISSUERS).map((issuer) => {
      const quals = QUALIFICATIONS.filter((x) => x.issuerId === issuer.id);
      return { issuer, quals };
    });

    const term = q.trim().toLowerCase();
    if (!term) return items;

    return items.filter(({ issuer, quals }) => {
      const hay = [
        issuer.legalName,
        issuer.rtoCode,
        issuer.scopeUrl ?? "",
        ...quals.map((qq) => qq.tradeTitle),
        ...quals.map((qq) => qq.qualificationCode ?? ""),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(term);
    });
  }, [q]);

  // Sort partnered first
  const sorted = useMemo(
    () =>
      rows.slice().sort((a, b) => {
        const A = a.issuer.status === "partnered" ? 0 : 1;
        const B = b.issuer.status === "partnered" ? 0 : 1;
        return A - B || a.issuer.legalName.localeCompare(b.issuer.legalName);
      }),
    [rows]
  );

  // SEO JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Partner Registered Training Organisations",
    itemListElement: sorted.map(({ issuer }, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Organization",
        name: `${issuer.legalName} (RTO ${issuer.rtoCode})`,
        url:
          issuer.scopeUrl ||
          `https://training.gov.au/Organisation/Details/${issuer.rtoCode}`,
      },
    })),
  };

  return (
    <main className="relative bg-[#1f2327] text-gray-100 min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#2a2e33] to-[#1c2024] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold">RTO Partners</h1>
          <p className="mt-3 text-gray-300 max-w-3xl">
            Trade Certify Pty Ltd is <span className="underline">not</span> a Registered Training Organisation (RTO) and
            does not issue qualifications or statements of attainment. We provide RPL portfolio preparation and candidate
            support. All qualifications are issued by ASQA-registered RTOs listed below, subject to scope and eligibility.
          </p>

          <div className="mt-6">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, RTO code, or qualification…"
              className="w-full md:w-96 rounded-lg bg-[#121416] border border-white/10 px-4 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fdb715]/60"
            />
          </div>
        </div>
      </section>

      {/* List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-6 md:grid-cols-2">
          {sorted.map(({ issuer, quals }) => (
            <article
              key={issuer.rtoCode}
              className="rounded-2xl bg-[#262a2f] border border-white/5 shadow-sm p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    {issuer.legalName}{" "}
                    <span className="text-gray-300 font-normal">— RTO {issuer.rtoCode}</span>
                  </h2>
                  <div className="mt-2 space-x-2">
                    <span className={chipClass[issuer.status as Status]}>
                      {issuer.status === "partnered" ? "Partnered" : "Pending agreement"}
                    </span>
                    {issuer.scopeUrl && (
                      <a
                        href={issuer.scopeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs underline text-[#fdb715] hover:opacity-90"
                      >
                        View scope on training.gov.au
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Qualifications covered by this issuer (from central data) */}
              <div className="mt-4">
                {quals.length > 0 ? (
                  <>
                    <h3 className="text-sm font-semibold text-gray-200">Qualifications (linked)</h3>
                    <ul className="mt-2 grid gap-1 text-sm text-gray-300">
                      {quals.map((qq) => (
                        <li key={qq.slug} className="flex items-center justify-between gap-2">
                          <Link
                            to={`/qualifications/${qq.slug}`}
                            className="underline hover:text-[#fdb715]"
                          >
                            {qq.tradeTitle}
                            {qq.qualificationCode ? ` (${qq.qualificationCode})` : ""}
                          </Link>
                          {/* tiny slug badge */}
                          <span className="text-[11px] text-gray-500">{qq.slug}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="text-sm text-gray-400">
                    No linked qualifications yet. (This may be a pending partner or mapping in progress.)
                  </p>
                )}
              </div>

              <div className="mt-6 text-xs text-gray-400">
                {issuer.status === "pending" ? (
                  <p>
                    <strong>Important:</strong> Listed for transparency. Portfolio submissions and any advertising
                    referencing this RTO will commence only after the written third-party agreement is executed and, where
                    required, notified to ASQA.
                  </p>
                ) : (
                  <p>
                    <strong>Note:</strong> Candidate access to this RTO depends on eligibility and scope. The issuing RTO is
                    confirmed to each applicant prior to assessment.
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Back to services / home */}
        <div className="mt-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/5"
          >
            ← Back to Home
          </Link>
        </div>
      </section>

      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
};

export default RtoPartnersPage;
