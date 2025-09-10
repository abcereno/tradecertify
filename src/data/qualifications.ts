// src/data/qualifications.ts

/** ---------------------------
 *  Issuers (RTOs) Registry
 *  ---------------------------
 *  Keep all RTO legal names/codes here (single source of truth).
 *  Mark status = "partnered" only AFTER the written agreement is executed.
 */

export type IssuerStatus = "partnered" | "pending";

export type Issuer = {
  id: string;              // internal key you choose (e.g., "eti" or "spc")
  legalName: string;       // legal entity name of the RTO
  rtoCode: string;         // numeric string, e.g., "12345"
  scopeUrl?: string;       // training.gov.au scope link
  status: IssuerStatus;    // "partnered" | "pending"
};

export const ISSUERS: Record<string, Issuer> = {
  // 🔁 Replace examples with real partners when ready.
  // Keep "pending" until the third-party agreement is *signed*.
  eti: {
    id: "eti",
    legalName: "Example Training Institute Pty Ltd",
    rtoCode: "12345",
    scopeUrl: "https://training.gov.au/Organisation/Details/12345/qualifications",
    status: "pending",
  },
  spc: {
    id: "spc",
    legalName: "Skilled Pathways College",
    rtoCode: "67890",
    scopeUrl: "https://training.gov.au/Organisation/Details/67890/qualifications",
    status: "pending",
  },
};

/** ---------------------------
 *  Qualifications
 *  ---------------------------
 *  Add issuerId to a qualification *only if* you know which RTO
 *  will issue it. Set that issuer's status to "partnered" before
 *  you show the qual code next to the qualification on any page.
 */

export type Qualification = {
  slug: string;                 // used in the route (we use the code for uniqueness)
  tradeTitle: string;           // human-friendly title
  image: string;
  shortDescription: string;
  qualificationCode?: string;   // Only *display* this if issuer is "partnered"
  tgaUrl?: string;
  videoUrl?: string;
  overview?: string;
  outcomes?: string[];
  coreUnits?: string[];
  electiveUnits?: string[];
  issuerId?: string;            // <- NEW: points to ISSUERS[...] (optional)
};

// ⚠️ Default: leave issuerId undefined until partnered.
// When you’re ready, set issuerId: "eti" (or your real key) on the items that issuer will cover.
export const QUALIFICATIONS: Qualification[] = [
  {
    slug: "cpc60220",
    tradeTitle: "Advanced Diploma of Building and Construction (Management)",
    image: "https://source.unsplash.com/featured/1200x800?construction,manager,blueprints",
    shortDescription: "RPL pathway for senior site supervisors and construction managers.",
    qualificationCode: "CPC60220",
    tgaUrl: "https://training.gov.au/Training/Details/CPC60220/qualdetails",
    videoUrl: "",
    issuerId: "eti",
  },
  {
    slug: "cpc10120",
    tradeTitle: "Certificate I in Construction",
    image: "https://source.unsplash.com/featured/1200x800?construction,apprentice,tools",
    shortDescription: "Foundation skills for entry into the construction industry.",
    qualificationCode: "CPC10120",
    tgaUrl: "https://training.gov.au/Training/Details/CPC10120/qualdetails",
    videoUrl: "",
    // issuerId: "eti",
  },
  {
    slug: "uee32220",
    tradeTitle: "Certificate III in Air Conditioning and Refrigeration",
    image: "https://source.unsplash.com/featured/1200x800?hvac,refrigeration,airconditioning",
    shortDescription: "Formalise your HVAC/R installation, service and fault-finding experience.",
    qualificationCode: "UEE32220",
    tgaUrl: "https://training.gov.au/Training/Details/UEE32220/qualdetails",
    videoUrl: "",
    // issuerId: "spc",
  },
  {
    slug: "aur30320",
    tradeTitle: "Certificate III in Automotive Electrical Technology",
    image: "https://source.unsplash.com/featured/1200x800?automotive,electrical,technician",
    shortDescription: "Recognise skills in diagnosing and repairing automotive electrical systems.",
    qualificationCode: "AUR30320",
    tgaUrl: "https://training.gov.au/Training/Details/AUR30320/qualdetails",
    videoUrl: "",
  },
  {
    slug: "aur32420",
    tradeTitle: "Certificate III in Automotive Refinishing Technology",
    image: "https://source.unsplash.com/featured/1200x800?automotive,paint,refinish,bodyshop",
    shortDescription: "RPL for spray painting, surface prep and refinishing in auto body repair.",
    qualificationCode: "AUR32420",
    tgaUrl: "https://training.gov.au/Training/Details/AUR32420/qualdetails",
    videoUrl: "",
  },
  {
    slug: "cpc33020",
    tradeTitle: "Certificate III in Bricklaying and Blocklaying",
    image: "https://source.unsplash.com/featured/1200x800?bricklaying,masonry,construction",
    shortDescription: "Validate your skills in brickwork, blockwork and site set-out.",
    qualificationCode: "CPC33020",
    tgaUrl: "https://training.gov.au/Training/Details/CPC33020/qualdetails",
    videoUrl: "",
  },
  {
    slug: "msf30322",
    tradeTitle: "Certificate III in Cabinet Making and Timber Technology",
    image: "https://source.unsplash.com/featured/1200x800?cabinetmaking,woodworking,timber",
    shortDescription: "RPL for cabinetry, joinery and timber manufacturing skills.",
    qualificationCode: "MSF30322",
    tgaUrl: "https://training.gov.au/Training/Details/MSF30322/qualdetails",
    videoUrl: "",
  },
  {
    slug: "cpc30220",
    tradeTitle: "Certificate III in Carpentry",
    image: "https://source.unsplash.com/featured/1200x800?carpentry,woodworking,framing",
    shortDescription: "Turn your on-the-tools carpentry experience into a national qualification.",
    qualificationCode: "CPC30220",
    tgaUrl: "https://training.gov.au/Training/Details/CPC30220/qualdetails",
    videoUrl: "",
  },
  {
    slug: "cpc30320",
    tradeTitle: "Certificate III in Concreting",
    image: "https://source.unsplash.com/featured/1200x800?concrete,formwork,construction",
    shortDescription: "RPL for slab prep, pours, finishing and concreting site works.",
    qualificationCode: "CPC30320",
    tgaUrl: "https://training.gov.au/Training/Details/CPC30320/qualdetails",
    videoUrl: "",
  },
  {
    slug: "cpc31420",
    tradeTitle: "Certificate III in Construction Waterproofing",
    image: "https://source.unsplash.com/featured/1200x800?waterproofing,membrane,sealing",
    shortDescription: "Recognise skills in membranes, wet-area waterproofing and compliance.",
    qualificationCode: "CPC31420",
    tgaUrl: "https://training.gov.au/Training/Details/CPC31420/qualdetails",
    videoUrl: "",
  },
  {
    slug: "mem31922",
    tradeTitle: "Certificate III in Engineering - Fabrication Trade",
    image: "https://source.unsplash.com/featured/1200x800?welding,fabrication,metalwork",
    shortDescription: "RPL for welding, fabrication and metal manufacturing competencies.",
    qualificationCode: "MEM31922",
    tgaUrl: "https://training.gov.au/Training/Details/MEM31922/qualdetails",
    videoUrl: "",
  },
  {
    slug: "mem30219",
    tradeTitle: "Certificate III in Engineering - Mechanical Trade",
    image: "https://source.unsplash.com/featured/1200x800?mechanical,engineering,lathe,machining",
    shortDescription: "Validate machining, fitting and mechanical maintenance skills.",
    qualificationCode: "MEM30219",
    tgaUrl: "https://training.gov.au/Training/Details/MEM30219/qualdetails",
    videoUrl: "",
  },
  {
    slug: "msf30422",
    tradeTitle: "Certificate III in Glass and Glazing",
    image: "https://source.unsplash.com/featured/1200x800?glazing,glass,window,installation",
    shortDescription: "RPL for glazing installation, fabrication and safety handling.",
    qualificationCode: "MSF30422",
    tgaUrl: "https://training.gov.au/Training/Details/MSF30422/qualdetails",
    videoUrl: "",
  },
  {
    slug: "aur31120",
    tradeTitle: "Certificate III in Heavy Commercial Vehicle Mechanical Technology",
    image: "https://source.unsplash.com/featured/1200x800?truck,mechanic,heavyvehicle,workshop",
    shortDescription: "Recognise servicing and repair skills for heavy vehicles.",
    qualificationCode: "AUR31120",
    tgaUrl: "https://training.gov.au/Training/Details/AUR31120/qualdetails",
    videoUrl: "",
  },
  {
    slug: "ahc30921",
    tradeTitle: "Certificate III in Landscape Construction",
    image: "https://source.unsplash.com/featured/1200x800?landscaping,garden,construction,paving",
    shortDescription: "RPL for hard/soft landscaping, paving and site works.",
    qualificationCode: "AHC30921",
    tgaUrl: "https://training.gov.au/Training/Details/AHC30921/qualdetails",
    videoUrl: "",
  },
  {
    slug: "aur30620",
    tradeTitle: "Certificate III in Light Vehicle Mechanical Technology",
    image: "https://source.unsplash.com/featured/1200x800?car,mechanic,workshop,automotive",
    shortDescription: "Formalise skills in service, diagnostics and repair of light vehicles.",
    qualificationCode: "AUR30620",
    tgaUrl: "https://training.gov.au/Training/Details/AUR30620/qualdetails",
    videoUrl: "",
  },
  {
    slug: "cpc30620",
    tradeTitle: "Certificate III in Painting and Decorating",
    image: "https://source.unsplash.com/featured/1200x800?painting,decorating,housepainter",
    shortDescription: "RPL for surface prep, finishes and decorative techniques.",
    qualificationCode: "CPC30620",
    tgaUrl: "https://training.gov.au/Training/Details/CPC30620/qualdetails",
    videoUrl: "",
  },
  {
    slug: "cpc32420",
    tradeTitle: "Certificate III in Plumbing",
    image: "https://source.unsplash.com/featured/1200x800?plumbing,pipes,construction",
    shortDescription: "Validate plumbing installation, maintenance and compliance experience.",
    qualificationCode: "CPC32420",
    tgaUrl: "https://training.gov.au/Training/Details/CPC32420/qualdetails",
    videoUrl: "",
  },
  {
    slug: "cpc32620",
    tradeTitle: "Certificate III in Roof Plumbing",
    image: "https://source.unsplash.com/featured/1200x800?roofing,plumbing,downpipes",
    shortDescription: "RPL for roof drainage, flashing and metal roof installations.",
    qualificationCode: "CPC32620",
    tgaUrl: "https://training.gov.au/Training/Details/CPC32620/qualdetails",
    videoUrl: "",
  },
  {
    slug: "cpc30820",
    tradeTitle: "Certificate III in Roof Tiling",
    image: "https://source.unsplash.com/featured/1200x800?roof,tiling,roofer",
    shortDescription: "Recognise tiling, flashing and roof restoration competencies.",
    qualificationCode: "CPC30820",
    tgaUrl: "https://training.gov.au/Training/Details/CPC30820/qualdetails",
    videoUrl: "",
  },
  {
    slug: "cpc30120",
    tradeTitle: "Certificate III in Shopfitting",
    image: "https://source.unsplash.com/featured/1200x800?shopfitting,retail,fitout",
    shortDescription: "RPL for fit-outs, joinery and site installation in retail spaces.",
    qualificationCode: "CPC30120",
    tgaUrl: "https://training.gov.au/Training/Details/CPC30120/qualdetails",
    videoUrl: "",
  },
  {
    slug: "cpc31020",
    tradeTitle: "Certificate III in Solid Plastering",
    image: "https://source.unsplash.com/featured/1200x800?plastering,rendering,construction",
    shortDescription: "RPL for rendering, solid plastering and decorative finishes.",
    qualificationCode: "CPC31020",
    tgaUrl: "https://training.gov.au/Training/Details/CPC31020/qualdetails",
    videoUrl: "",
  },
  {
    slug: "cpc31220",
    tradeTitle: "Certificate III in Wall and Ceiling Lining",
    image: "https://source.unsplash.com/featured/1200x800?drywall,gyprock,ceiling",
    shortDescription: "Validate experience in plasterboard installation and finishing.",
    qualificationCode: "CPC31220",
    tgaUrl: "https://training.gov.au/Training/Details/CPC31220/qualdetails",
    videoUrl: "",
  },
  {
    slug: "cpc31320",
    tradeTitle: "Certificate III in Wall and Floor Tiling",
    image: "https://source.unsplash.com/featured/1200x800?tiling,ceramic,tiles",
    shortDescription: "RPL for wall/floor tiling, waterproofing interfaces and finishes.",
    qualificationCode: "CPC31320",
    tgaUrl: "https://training.gov.au/Training/Details/CPC31320/qualdetails",
    videoUrl: "",
  },
  {
    slug: "aur40620",
    tradeTitle: "Certificate IV in Automotive Electrical Technology",
    image: "https://source.unsplash.com/featured/1200x800?automotive,electrical,diagnostics",
    shortDescription: "Advanced diagnostics, CAN systems and auto-electrical leadership.",
    qualificationCode: "AUR40620",
    tgaUrl: "https://training.gov.au/Training/Details/AUR40620/qualdetails",
    videoUrl: "",
  },
  {
    slug: "aur40116",
    tradeTitle: "Certificate IV in Automotive Management",
    image: "https://source.unsplash.com/featured/1200x800?workshop,manager,automotive",
    shortDescription: "Workshop operations, customer service and team leadership.",
    qualificationCode: "AUR40116",
    tgaUrl: "https://training.gov.au/Training/Details/AUR40116/qualdetails",
    videoUrl: "",
  },
  {
    slug: "aur40216",
    tradeTitle: "Certificate IV in Automotive Mechanical Diagnosis",
    image: "https://source.unsplash.com/featured/1200x800?automotive,scan,diagnostic,mechanic",
    shortDescription: "Advanced fault diagnosis, drivability and system analysis.",
    qualificationCode: "AUR40216",
    tgaUrl: "https://training.gov.au/Training/Details/AUR40216/qualdetails",
    videoUrl: "",
  },
  {
    slug: "aur40820",
    tradeTitle: "Certificate IV in Automotive Mechanical Overhauling",
    image: "https://source.unsplash.com/featured/1200x800?engine,overhaul,automotive,rebuilt",
    shortDescription: "Engine/transmission overhaul and component reconditioning.",
    qualificationCode: "AUR40820",
    tgaUrl: "https://training.gov.au/Training/Details/AUR40820/qualdetails",
    videoUrl: "",
  },
  {
    slug: "cpc40120",
    tradeTitle: "Certificate IV in Building and Construction",
    image: "https://source.unsplash.com/featured/1200x800?construction,foreman,supervisor",
    shortDescription: "Site supervision, planning and compliance for builders.",
    qualificationCode: "CPC40120",
    tgaUrl: "https://training.gov.au/Training/Details/CPC40120/qualdetails",
    videoUrl: "",
  },
  {
    slug: "cpc41020",
    tradeTitle: "Certificate IV in Demolition",
    image: "https://source.unsplash.com/featured/1200x800?demolition,excavator,site",
    shortDescription: "Demolition planning, risk control and specialised techniques.",
    qualificationCode: "CPC41020",
    tgaUrl: "https://training.gov.au/Training/Details/CPC41020/qualdetails",
    videoUrl: "",
  },
  {
    slug: "cpc40920",
    tradeTitle: "Certificate IV in Plumbing and Services",
    image: "https://source.unsplash.com/featured/1200x800?plumbing,services,blueprints",
    shortDescription: "Design, documentation and supervision across plumbing services.",
    qualificationCode: "CPC40920",
    tgaUrl: "https://training.gov.au/Training/Details/CPC40920/qualdetails",
    videoUrl: "",
  },
  {
    slug: "cpp41419",
    tradeTitle: "Certificate IV in Real Estate Practice",
    image: "https://source.unsplash.com/featured/1200x800?realestate,agent,property",
    shortDescription: "Property sales, leasing, legislation and agency operations.",
    qualificationCode: "CPP41419",
    tgaUrl: "https://training.gov.au/Training/Details/CPP41419/qualdetails",
    videoUrl: "",
  },
  {
    slug: "aur50216",
    tradeTitle: "Diploma of Automotive Technology",
    image: "https://source.unsplash.com/featured/1200x800?automotive,technology,engineering",
    shortDescription: "Advanced automotive technologies and diagnostic strategy.",
    qualificationCode: "AUR50216",
    tgaUrl: "https://training.gov.au/Training/Details/AUR50216/qualdetails",
    videoUrl: "",
  },
  {
    slug: "cpc50220",
    tradeTitle: "Diploma of Building and Construction (Building)",
    image: "https://source.unsplash.com/featured/1200x800?construction,building,plans",
    shortDescription: "Project coordination, compliance and contracts for building projects.",
    qualificationCode: "CPC50220",
    tgaUrl: "https://training.gov.au/Training/Details/CPC50220/qualdetails",
    videoUrl: "",
  },
  {
    slug: "bsb50820",
    tradeTitle: "Diploma of Project Management",
    image: "https://source.unsplash.com/featured/1200x800?project,management,planning,kanban",
    shortDescription: "Scope, time, cost and stakeholder management across projects.",
    qualificationCode: "BSB50820",
    tgaUrl: "https://training.gov.au/Training/Details/BSB50820/qualdetails",
    videoUrl: "",
  },
  {
    slug: "cpp51122",
    tradeTitle: "Diploma of Property (Agency Management)",
    image: "https://source.unsplash.com/featured/1200x800?realestate,agency,management",
    shortDescription: "Agency leadership, trust accounting and compliance.",
    qualificationCode: "CPP51122",
    tgaUrl: "https://training.gov.au/Training/Details/CPP51122/qualdetails",
    videoUrl: "",
  },
];

// Helper lookups
export const bySlug = (slug: string) => QUALIFICATIONS.find((q) => q.slug === slug);

// Resolve issuer object for a qualification (if any)
export const getIssuer = (q?: Qualification): Issuer | undefined => {
  if (!q?.issuerId) return undefined;
  return ISSUERS[q.issuerId];
};

// Compliance helper: only show the qualification code when the issuer is "partnered"
export const canShowQualificationCode = (q?: Qualification): boolean => {
  if (!q?.qualificationCode) return false;
  const issuer = getIssuer(q);
  return Boolean(issuer && issuer.status === "partnered");
};
