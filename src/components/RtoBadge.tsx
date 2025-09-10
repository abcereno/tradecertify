import React from "react";

interface RtoBadgeProps {
  legalName: string;
  rtoCode: string;     // e.g. "91859"
  scopeUrl?: string;   // optional override; defaults to TGA /qualifications
  compact?: boolean;   // smaller version for cards
}

const tgaOrgQualsUrl = (code: string) =>
  `https://training.gov.au/organisation/details/${code}/qualifications`;

const RtoBadge: React.FC<RtoBadgeProps> = ({ legalName, rtoCode, scopeUrl, compact }) => {
  const wrapperClasses = compact
    ? "inline-flex items-center gap-1 rounded-md bg-[#262a2f] text-xs px-2 py-1 text-gray-200 border border-white/10"
    : "inline-flex items-center gap-2 rounded-lg bg-[#262a2f] text-sm px-3 py-1.5 text-gray-200 border border-white/10";

  // Always have a valid scope link; prefer provided scopeUrl, else TGA /qualifications
  const href = scopeUrl || tgaOrgQualsUrl(rtoCode);

  return (
    <span className={wrapperClasses}>
      <span className="font-semibold">{legalName}</span>
      <span className="text-gray-400">RTO {rtoCode}</span>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-[#D19D13] hover:opacity-90"
        aria-label={`View scope for ${legalName} (RTO ${rtoCode}) on training.gov.au`}
        title="View scope on training.gov.au"
      >
        Scope
      </a>
    </span>
  );
};

export default RtoBadge;
