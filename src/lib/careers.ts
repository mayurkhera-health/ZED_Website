/**
 * Careers framework.
 *
 * Every open role is one entry in POSTINGS below. Adding a role means adding an
 * object; nothing else has to change. The route, the index listing, the SEO
 * metadata and the Google Jobs structured data are all generated from this file.
 *
 * ---------------------------------------------------------------------------
 * WHY THE TYPES ARE STRICT
 *
 * Several fields the compiler insists on are not design preferences, they are
 * the things a US job posting is expected to carry:
 *
 *   pay            California SB 1162 requires the pay scale in any posting for
 *                  a role that could be filled in California. It is a required
 *                  field here so a posting cannot ship without one.
 *   locations      "various unanticipated client locations" style wording on an
 *                  immigration notice has to survive intact, so it is a list of
 *                  free strings rather than a structured address.
 *   sourceOfText   Marks a posting whose wording comes from a government filing.
 *                  See the warning below.
 *
 * ---------------------------------------------------------------------------
 * VERBATIM POSTINGS — READ BEFORE EDITING
 *
 * A posting with sourceOfText: "filing" carries text taken from an immigration
 * filing (ETA-9089, LCA or similar). That wording is legally load-bearing: it is
 * expected to match the filing. DO NOT rewrite it for tone, tighten it, fix its
 * grammar, expand its abbreviations or reflow its sentences. If it reads awkwardly,
 * that is not a bug. Change it only by copying new text from the filing itself.
 *
 * ---------------------------------------------------------------------------
 * DRAFT MODE
 *
 * While DRAFT_CAREERS is true the pages carry a draft banner, emit
 * robots: noindex and suppress the JobPosting structured data, so nothing
 * incomplete reaches Google Jobs. Set it to false once every posting's
 * `unverified` array is empty.
 */

export const DRAFT_CAREERS = true;

/**
 * Whether Careers appears in navigation.
 *
 * False hides it from the header and the footer. The ROUTE stays live and
 * DRAFT_CAREERS still noindexes it, so a direct link to a posting keeps
 * working — which is the point: a role can be shared with a candidate
 * without the section being advertised on the site.
 *
 * One line to restore. Nothing else needs to move.
 */
export const SHOW_CAREERS = false;

/** Fields that are still placeholders on a given posting. */
export type UnverifiedField =
  | "text" // wording not yet confirmed against the filing
  | "pay" // pay range not yet supplied
  | "jobCode"
  | "postedOn"
  | "address";

export type PayScale = {
  min: number;
  max: number;
  /** SB 1162 wants the scale the employer expects to pay for the role. */
  period: "year" | "hour";
  currency: "USD";
};

export type JobPosting = {
  /** URL segment. Kebab-case, stable — recruiters share these links. */
  slug: string;
  title: string;
  /** The code applicants are told to quote. Null where the posting has none. */
  jobCode: string | null;
  /**
   * Where the wording came from. "filing" means verbatim — see the warning at
   * the top of this file before touching duties, requirements or locations.
   */
  sourceOfText: "filing" | "written";
  /** Free text, exactly as written. Newlines separate paragraphs. */
  duties: string;
  requirements: string;
  /** Each entry renders as its own line. Keep filing wording intact. */
  locations: string[];
  employmentType: "Full-time" | "Part-time" | "Contract";
  hoursPerWeek: number;
  pay: PayScale;
  /** Whether the employer will sponsor a work visa for this role. */
  sponsorship: boolean;
  /** Email applications accepted for this role, if any. */
  applyEmail: string | null;
  /** Postal application address, as printed on the posting. */
  applyPostal: string;
  /** ISO date the posting went up. Google Jobs requires datePosted. */
  postedOn: string;
  status: "open" | "closed";
  /** Empty means every field is confirmed and the posting is publishable. */
  unverified: UnverifiedField[];
};

/**
 * PLACEHOLDER DATA.
 *
 * These four entries mirror the postings live at zedventures.com/careers today,
 * but the text below was read off the rendered page, not transcribed from the
 * filings. Every one is marked unverified: ["text", "pay"] for that reason.
 * Replace duties/requirements with the exact filing wording and add the real
 * pay scales, then clear the unverified array.
 */
export const POSTINGS: JobPosting[] = [
  {
    slug: "sr-systems-analysts",
    title: "Sr. Systems Analysts",
    jobCode: "BBC",
    sourceOfText: "filing",
    duties:
      "Expand or modify systems to serve new purposes or improve work flow. Test and modify software programs to identify the root cause of defects. Perform analysis, coding, unit testing and quality reviews. Identify feasible solutions using VSIX and Linux. Develop testing routines for memory leaks. Develop and document system design procedures. Install and configure new systems to customer requirements.",
    requirements:
      "Master's degree in Computer Applications, Applied Computer Science or related field. Two years of experience as a Computer Programmer, Senior Software Consultant, Project Lead, IT Analyst, Sr. Software Engineer, Sr. Project Engineer, Software Engineer or related role. Two years using C, C++, VC++ and Linux.",
    locations: [
      "San Jose, CA 95110",
      "Various unanticipated client locations throughout California",
    ],
    employmentType: "Full-time",
    hoursPerWeek: 40,
    pay: { min: 0, max: 0, period: "year", currency: "USD" },
    sponsorship: true,
    applyEmail: null,
    applyPostal: "HR, ZEDventures Inc., 1762 Technology Drive, Suite 108, San Jose, CA 95110",
    postedOn: "2026-01-01",
    status: "open",
    unverified: ["text", "pay", "postedOn", "address"],
  },
  {
    slug: "computer-systems-analysts",
    title: "Computer Systems Analysts",
    jobCode: "SA",
    sourceOfText: "filing",
    duties:
      "Analyze systems and business processes. Map process flow. Set up base configuration. Coordinate migration and data uploading. Work with software engineers to develop migration tools. Review and analyze existing systems, identify design gaps, and analyze new systems against user requirements.",
    requirements:
      "Bachelor's degree in Computer Science, Computer Engineering, Computer Applications, CIS, Engineering or related field, plus two years of experience in the job offered or as a Programmer Analyst, Software Engineer or related role. Must be willing to travel temporarily to client sites or relocate throughout the United States.",
    locations: [
      "San Jose, CA 95110",
      "Various unanticipated client locations throughout California",
    ],
    employmentType: "Full-time",
    hoursPerWeek: 40,
    pay: { min: 0, max: 0, period: "year", currency: "USD" },
    sponsorship: true,
    applyEmail: null,
    applyPostal: "HR, ZEDventures Inc., 1762 Technology Drive, Suite 108, San Jose, CA 95110",
    postedOn: "2026-01-01",
    status: "open",
    unverified: ["text", "pay", "postedOn", "address"],
  },
  {
    slug: "software-developer",
    title: "Software Developer",
    jobCode: "101",
    sourceOfText: "filing",
    duties:
      "Process design and configuration. Assist with testing and requirements gathering. Set up development, test and production environments for MDG C/V/M delivery. Work on NIOSH Key and Opioid customized field rollout. Prepare functional and technical specifications. Carry out unit and integration testing. Handle outbound and inbound IDoc processes and error handling. Map documents between MDG, IIB and WMS systems.",
    requirements:
      "Bachelor's degree in Engineering. Minimum two years of experience, including two years with SAP ECC 6.0 EHP 3, 4, 5, 6, 7; Web and Cloud Services; SAP AFS, Fiori, IS-Retail; ServiceNow; HP QC; EDI IDocs; JavaScript Object Notation; .NET.",
    locations: ["San Jose, CA"],
    employmentType: "Full-time",
    hoursPerWeek: 40,
    pay: { min: 0, max: 0, period: "year", currency: "USD" },
    sponsorship: true,
    applyEmail: "archana@zedventures.com",
    applyPostal: "ZEDventures Inc., 1762 Technology Drive, Suite 108, San Jose, CA 95110",
    postedOn: "2026-01-01",
    status: "open",
    unverified: ["text", "pay", "postedOn", "address"],
  },
  {
    slug: "technical-lead",
    title: "Technical Lead",
    jobCode: null,
    sourceOfText: "filing",
    duties:
      "Plan, design, develop and test software systems. Implement and troubleshoot software problems. Optimize software system performance. Analyze user needs and develop solutions. Act as liaison between the technical team, project leadership and management. Provide user support as needed.",
    requirements:
      "Bachelor's degree or foreign equivalent in Computer Science, Computer Engineering, Computer Applications, CIS or Engineering, with two years of related experience. Must be willing to travel temporarily to client sites or relocate throughout the United States.",
    locations: [
      "San Jose, California",
      "Various unanticipated client locations throughout California",
    ],
    employmentType: "Full-time",
    hoursPerWeek: 40,
    pay: { min: 0, max: 0, period: "year", currency: "USD" },
    sponsorship: true,
    applyEmail: null,
    applyPostal: "HR, ZEDventures Inc., 1762 Technology Drive, Suite 108, San Jose, CA 95110",
    postedOn: "2026-01-01",
    status: "open",
    unverified: ["text", "pay", "jobCode", "postedOn", "address"],
  },
];

export const OPEN_POSTINGS = POSTINGS.filter((p) => p.status === "open");

export function getPosting(slug: string): JobPosting | undefined {
  return POSTINGS.find((p) => p.slug === slug);
}

/** Pay scale as a display string, or null while the range is still a placeholder. */
export function formatPay(p: JobPosting): string | null {
  if (p.pay.min <= 0 || p.pay.max <= 0) return null;
  const fmt = (n: number) =>
    p.pay.period === "hour"
      ? `$${n.toFixed(2)}`
      : `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  const per = p.pay.period === "hour" ? "per hour" : "per year";
  return p.pay.min === p.pay.max
    ? `${fmt(p.pay.min)} ${per}`
    : `${fmt(p.pay.min)} – ${fmt(p.pay.max)} ${per}`;
}

/**
 * Google Jobs structured data. Returns null when the posting still has
 * unverified fields, so incomplete data is never published as schema.org
 * markup — a JobPosting with a wrong salary is worse than no markup at all.
 */
export function jobPostingJsonLd(p: JobPosting, url: string): string | null {
  if (DRAFT_CAREERS || p.unverified.length > 0) return null;
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: p.title,
    identifier: p.jobCode
      ? { "@type": "PropertyValue", name: "ZEDventures", value: p.jobCode }
      : undefined,
    description: `${p.duties}\n\n${p.requirements}`,
    datePosted: p.postedOn,
    employmentType:
      p.employmentType === "Full-time"
        ? "FULL_TIME"
        : p.employmentType === "Part-time"
          ? "PART_TIME"
          : "CONTRACTOR",
    hiringOrganization: {
      "@type": "Organization",
      name: "ZEDventures Inc.",
      sameAs: "https://zedventures.com",
    },
    jobLocation: p.locations.map((l) => ({
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: l, addressCountry: "US" },
    })),
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: p.pay.currency,
      value: {
        "@type": "QuantitativeValue",
        minValue: p.pay.min,
        maxValue: p.pay.max,
        unitText: p.pay.period === "hour" ? "HOUR" : "YEAR",
      },
    },
    url,
  });
}
