import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  QUALIFICATIONS,
  canShowQualificationCode,
  getIssuer,
} from "@/data/qualifications";
import RtoBadge from "@/components/RtoBadge";

const PER_PAGE = 6;

const Services: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const qParam = params.get("q") ?? "";
  const pageParam = Number(params.get("page") ?? "1");

  const [search, setSearch] = useState(qParam);
  const [page, setPage] = useState(
    Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1
  );

  // Keep URL in sync when search/page changes
  useEffect(() => {
    const next = new URLSearchParams(params);
    if (search) next.set("q", search);
    else next.delete("q");
    next.set("page", String(page));
    setParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page]);

  // Filter by tradeTitle, qualificationCode, or slug
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return QUALIFICATIONS;
    return QUALIFICATIONS.filter((item) => {
      const hay = [
        item.tradeTitle,
        item.qualificationCode ?? "",
        item.slug ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(term);
    });
  }, [search]);

  // Clamp page if out of bounds (e.g., after typing a search)
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [page, totalPages]);

  const startIdx = (page - 1) * PER_PAGE;
  const endIdx = Math.min(startIdx + PER_PAGE, filtered.length);
  const pageItems = filtered.slice(startIdx, endIdx);

  const goTo = (p: number) => setPage(Math.min(Math.max(1, p), totalPages));

  return (
    <section id="services" className="py-20 bg-[#f0f2f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-[#373b40] mb-3">
            Trades We Support via RPL
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We help tradies across Australia prepare RPL portfolios for
            assessment by a Registered Training Organisation.
          </p>
          <p className="mt-3 text-sm text-gray-500">
            <strong>Note:</strong> Trade Certify is not an RTO. Where a
            qualification is advertised, the issuing RTO’s name and code appear
            on the qualification page.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
          <div className="relative w-full sm:max-w-md">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by trade or code (e.g., Carpentry, CPC30220)…"
              aria-label="Search qualifications"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-10 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fdb715]/60"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              ⌘K
            </span>
          </div>

          <div className="text-sm text-gray-500">
            {filtered.length > 0 ? (
              <>
                Showing <span className="font-semibold">{startIdx + 1}</span>–
                <span className="font-semibold">{endIdx}</span> of{" "}
                <span className="font-semibold">{filtered.length}</span>
              </>
            ) : (
              <>No results</>
            )}
          </div>
        </div>

        {/* Grid */}
        {pageItems.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pageItems.map((q) => {
              const issuer = getIssuer(q);
              const partnered = issuer?.status === "partnered";
              const showCode = canShowQualificationCode(q);

              return (
                <div
                  key={q.slug}
                  className="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6"
                >
                  {/* Top section */}
                  <div>
                    <img
                      src={q.image}
                      alt={q.tradeTitle}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                      loading="lazy"
                      decoding="async"
                    />

                    <h3 className="text-2xl font-bold text-[#373b40] mb-1">
                      {q.qualificationCode} – {q.tradeTitle}
                    </h3>

                    {showCode && (
                      <div className="mb-2 text-xs text-gray-500">
                        {q.qualificationCode}
                      </div>
                    )}

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {q.shortDescription}
                    </p>

                    <div className="mb-4">
                      {partnered && issuer ? (
                        <RtoBadge
                          legalName={issuer.legalName}
                          rtoCode={issuer.rtoCode}
                          scopeUrl={issuer.scopeUrl}
                          compact
                        />
                      ) : (
                        <p className="text-xs text-gray-500">
                          Issuing RTO details are confirmed after eligibility.{" "}
                          <Link
                            to="/rto-partners"
                            className="underline text-[#fdb715] hover:text-[#e0a60d]"
                          >
                            See RTO partners
                          </Link>
                          .
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Bottom CTA row */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <Link
                      to={`/qualifications/${q.slug}`}
                      className="text-[#fdb715] hover:text-[#e0a60d] font-semibold transition-colors"
                    >
                      Learn More →
                    </Link>

                    {showCode && (
                      <span className="text-[11px] text-gray-500">
                        {q.qualificationCode}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 text-center text-gray-600 shadow">
            Nothing matches “<span className="font-semibold">{search}</span>”.
            <button
              className="ml-2 text-[#fdb715] hover:text-[#e0a60d] font-semibold"
              onClick={() => {
                setSearch("");
                setPage(1);
              }}
            >
              Clear search
            </button>
          </div>
        )}

        {/* Pagination */}
        {filtered.length > PER_PAGE && (
          <nav
            className="mt-10 flex items-center justify-center gap-2"
            aria-label="Pagination"
          >
            <button
              onClick={() => goTo(page - 1)}
              disabled={page === 1}
              className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 disabled:opacity-40 hover:bg-gray-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => goTo(p)}
                className={[
                  "px-3 py-2 rounded-lg border",
                  p === page
                    ? "border-[#fdb715] bg-[#fdb715]/10 text-[#373b40] font-semibold"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
                ].join(" ")}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => goTo(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 disabled:opacity-40 hover:bg-gray-50"
            >
              Next
            </button>
          </nav>
        )}
      </div>
    </section>
  );
};

export default Services;
