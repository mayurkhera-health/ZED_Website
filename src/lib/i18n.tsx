import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "fr";

const en = {
  hero: {
    headline: "Engineering intelligence into every enterprise",
    subhead:
      "We build and run the systems enterprises can't afford to have fail: AI, data, analytics, geospatial, SAP and Guidewire. Not proofs of concept — the ones that have to work on Monday morning.",
    ctaPrimary: "Talk to a specialist",
    ctaSecondary: "Explore our work",
    trustLine:
      "Enterprise engineering · AI & Data · Cloud · SAP · Guidewire · Global delivery",
    cardTitle: "Global delivery",
    cardCapabilities: "Capabilities",
    cardLocations: "Locations",
  },
  services: {
    eyebrow: "What we do",
    heading: "Capabilities",
    sub: "Seven things we do. Every one of them ends up in production.",
    viewService: "View service",
    pageCta: "Talk to a specialist",
    problemsEyebrow: "The problem",
    problemsHeading: "What we're usually called in for.",
    capsEyebrow: "What we do",
    capsHeading: "Capabilities",
    howEyebrow: "How we work",
    howHeading: "Strategy through operations.",
    techEyebrow: "Technologies",
    techHeading: "What we build with.",
    relatedEyebrow: "Related",
    relatedHeading: "Other capabilities.",
    ctaHeading: "Let's talk about your next project.",
    ctaSub: "Tell us what you're trying to solve. A senior member of our team will read it.",
    // Five-question framework — see the note in src/lib/service-pages.ts.
    situationEyebrow: "The situation",
    // S11: "Where organizations get stuck" keeps the client at the centre.
    // v1.1's "What we usually walk into" put ZED in the sentence and read as a
    // judgement on whoever built the current system.
    situationHeading: "Where organizations get stuck.",
    // Hero CTA is service-aware (S9): "Talk to our Analytics team".
    heroCtaBefore: "Talk to our",
    heroCtaAfter: "team",
    buildEyebrow: "What we do",
    buildHeading: "What we help you do.",
    platformsEyebrow: "Technology",
    platformsHeading: "Platforms we work with.",
    platformsSub:
      "Experience across the platforms commonly used in enterprise environments and modernization programs.",
    whyEyebrow: "Why ZED",
    /** Interpolated with the service name: "Why ZED for Analytics". */
    whyHeading: "Why ZED for",
    proofEyebrow: "Our work",
    proofCta: "Read the case study",
    /**
     * [CONFIRM] The one line on a service page that no competitor page has:
     * what actually happens after you write. S36 makes it conditional — use
     * the one-business-day version only if it can be held. The weaker fallback
     * is "...a senior member of our team will follow up directly."
     *
     * Phrased around what the reader gets rather than what we do: "your
     * enquiry goes to" reads as process, "you are talking to" reads as an
     * answer to the question they are actually asking, which is whether a
     * form swallows the message.
     */
    startNext:
      "Your message goes directly to our delivery team. A senior member of the team will follow up within one business day.",
    /** Distinct from the header's "Let's talk" so the two do not read as the
     *  same control repeated. Same label on every service page. */
    startNextCta: "Start a conversation",
    // [CONFIRM] Answers "what happens if I get in touch" — the friction that
    // stops people writing. Same line on every service page.
    items: [
      {
        title: "AI & Data",
        desc: "LLM applications, machine learning pipelines, and data platforms built to go from proof-of-concept to production.",
      },
      {
        title: "Analytics",
        desc: "BI dashboards, data warehousing, and predictive analytics that turn scattered data into decisions leadership trusts.",
      },
      {
        title: "GIS & Geospatial",
        desc: "Spatial data, mapping, and location analytics — exposure mapping, imagery-based risk assessment, and geospatial pipelines.",
      },
      {
        title: "Guidewire",
        desc: "End-to-end work across PolicyCenter, BillingCenter, and ClaimCenter — implementation, configuration, upgrades, and cloud migration.",
      },
      {
        title: "SAP",
        desc: "S/4HANA, BTP, and Fiori work with a clean-core discipline — integrations, extensions, and SAP-grounded AI agents that reach real ERP context.",
      },

      {
        title: "Product Engineering",
        desc: "Full-cycle software delivery — architecture, cloud-native development, and QA — for products that ship on time.",
      },
      {
        title: "Offshore & Nearshore Delivery",
        desc: "Dedicated engineering teams in India and across the Americas — deep capacity offshore, closer time-zone overlap nearshore, one engagement model.",
      },
    ],
  },
  caseStudies: {
    eyebrow: "Work in production",
    heading: "What we're building right now",
    items: [
      {
        tag: "Case study 01",
        date: "2026",
        client: "Enterprise software company",
        short: ["AI Help", "Chat"],
        title: "AI-assisted help, grounded in approved product knowledge",
        desc: "Their users couldn't find answers. The documentation existed, spread across systems nobody wanted to search, so people opened a support ticket instead. We built a help chat into the web app, the mobile app and the product itself. Every answer comes from documentation the company has already approved; the assistant is designed to answer from that documentation and to decline questions it cannot support. Answers come back in under a second. The client projects it will resolve about 70% of routine Tier-1 inquiries without a support ticket.",
        stack: ["RAG", "Azure AI Search", "Python API", "LLM orchestration", "Omnichannel UI"],
        outcomes: [
          "70% projected deflection of Tier-1 support tickets",
          "Answers grounded in approved product documentation",
          "Sub-second response times replacing manual document browsing",
          "Higher feature adoption through in-product guidance",
        ],
      },
      {
        tag: "Case study 02",
        date: "2026",
        client: "Global property-services company",
        short: ["Sales", "Intel"],
        title: "Event-driven sales intelligence for property services",
        desc: "Reps were spending an hour before every appointment, digging through the CRM, past transactions, property records and neighborhood data. Now the research runs itself the moment an appointment lands in the calendar. The rep opens a brief instead of building one. Prep went from an hour to under five minutes.",
        stack: ["Azure OpenAI", "RAG", "Python API", "Vector search", "Event-driven architecture"],
        outcomes: [
          "Preparation time reduced from 60 minutes to under 5 minutes",
          "20% projected increase in conversion rates",
          "CRM history and neighborhood data combined in a single appointment brief",
          "2–3 additional high-value appointments per rep, per week",
        ],
      },
      {
        tag: "Case study 03",
        date: "2026",
        client: "Global relocation enterprise",
        short: ["Unified", "Data"],
        title: "Unified analytics for multi-country operations",
        desc: "Every region ran its own reporting. Head office had no single view, so anything cross-country got assembled by hand, late. We pulled the regional systems into one platform and built shared dashboards for cost, client feedback and performance. They can now see cost, client feedback and performance across every country as it happens, instead of a month later.",
        stack: ["SQL Azure", "Azure Data Lake", "Azure Data Factory", "Power BI", "C# .NET"],
        outcomes: [
          "A unified view of operations and customer touchpoints across participating regions",
          "Standardized reporting for account profitability",
          "Instant isolation of growth opportunities and weak performance areas",
        ],
      },
      {
        tag: "Case study 04",
        date: "2026",
        client: "Global consumer-electronics company",
        short: ["Cloud", "Shift"],
        title: "Cloud data migration and residency for global compliance",
        desc: "195 systems, one aging on-premises Hadoop cluster, and existing hardware contract commitments. The client also needed stronger controls over where US consumer data was stored and who could reach it. We separated the US data and rebuilt the estate on Google Cloud. Queries run three to five times faster. Feature releases go out about 20% sooner. Nodes that fail replace themselves.",
        stack: ["GCP", "Apache Spark", "Hive", "Presto", "IAM & KMS", "Auto-healing clusters"],
        outcomes: [
          "3–5× faster complex query performance",
          "25% gain in engineering productivity",
          "20.66% faster feature time-to-market",
          "Zero-downtime resilience with automated node replacement",
        ],
      },
    ],
  },
  caseStudiesPage: {
    eyebrow: "Case studies",
    heading: "Work in production",
    sub: "Real engagements, real outcomes — AI, data, and analytics systems running for global enterprises today.",
    outcomesLabel: "Outcomes",
    stackLabel: "Technology",
  },
  /**
   * Global delivery — homepage.
   *
   * Two groups: client markets and delivery. Deliberately not three peers —
   * a market and a delivery centre are different kinds of thing.
   *
   * [CONFIRM] CANADA. The only claim made is "growing market". The copy says
   * "built to serve Canadian organizations" and never Canadian operations,
   * office, delivery centre, local team or presence, none of which is true
   * today. If any of those becomes true the wording can strengthen; until
   * then it must not.
   *
   * No "24/7", "always-on" or "around-the-clock" anywhere: contractual claims
   * ZEDventures has not made elsewhere on this site.
   */
  globalDelivery: {
    eyebrow: "Global delivery",
    heading: "North American relationships. Global delivery strength.",
    sub: "We stay close to our clients in North America and connect that relationship to engineering and delivery capability in India.",
    marketsLabel: "North America",
    marketsNote: "Where we work with clients",
    markets: [
      {
        place: "United States",
        role: "Client leadership & engagement",
        desc: "We work closely with client teams from strategy and architecture through implementation and ongoing delivery.",
      },
      {
        place: "Canada",
        flag: "Growing market",
        role: "Built to serve Canadian organizations",
        desc: "Bringing our enterprise technology experience and flexible delivery model to organizations across Canada.",
      },
    ],
    deliveryLabel: "Global delivery",
    deliveryNote: "Engineering depth",
    delivery: {
      place: "India",
      role: "Engineering & delivery",
      desc: "Implementation, development, integration and ongoing delivery, backed by engineering capacity that can scale with the engagement.",
    },
    closing: "One connected team. From strategy to delivery.",
    closingSub:
      "Client-facing leadership and scalable engineering working as one team across time zones.",
  },
  careers: {
    eyebrow: "Join us",
    line: "We're hiring across every team on this page.",
    cta: "View open roles",
  },
  /**
   * Careers page chrome and company-wide statements.
   *
   * The postings themselves are NOT here — they live in src/lib/careers.ts and
   * are deliberately single-language, because their wording is tied to a US
   * government filing and translating it is a decision for counsel, not for a
   * copywriter. Only the surrounding page is bilingual.
   *
   * Bracketed values below are placeholders awaiting real details.
   */
  careersPage: {
    eyebrow: "Careers",
    heading: "Open roles",
    // The opening paragraph does the job a "Join us" welcome does on bigger
    // consultancies' sites: orient the reader, say what the work is, and invite
    // a speculative application. It deliberately describes the WORK rather than
    // the culture. Culture claims — "a unique and diverse experience", "be
    // yourself and make a real impact" — are unverifiable, read as borrowed from
    // a firm ten times this size, and are the hiring equivalent of the oversold
    // benefits we already decided to keep off this page.
    sub: "Every open role at ZEDventures, what it requires, and how to apply. We are a consulting firm, so the work is client projects on enterprise systems \u2014 SAP, analytics, GIS, insurance platforms \u2014 delivered onsite, offshore and nearshore. If nothing here fits and you think you would be useful to us, send your resume anyway; we keep them on file.",
    draftNotice:
      "Draft — these postings have not been checked against the filings and the pay ranges are not final. Not for publication.",
    openCount: "open roles",
    noRoles: "No open roles right now. Send us your resume anyway and we will keep it on file.",
    viewRole: "View role",
    backToRoles: "All open roles",
    jobCodeLabel: "Job code",
    locationLabel: "Location",
    typeLabel: "Type",
    hoursLabel: "Hours",
    payLabel: "Pay range",
    payTbd: "To be confirmed",
    postedLabel: "Posted",
    sponsorshipLabel: "Visa sponsorship",
    sponsorshipYes: "Available for this role",
    sponsorshipNo: "Not available for this role",
    dutiesHeading: "What the role involves",
    requirementsHeading: "What the role requires",
    applyHeading: "How to apply",
    applyIntro: "Send your resume quoting the job title and job code.",
    applyEmailLabel: "By email",
    applyPostalLabel: "By post",
    verbatimNote:
      "This posting is reproduced as filed. Its wording is set by the filing and is not edited for style.",
    // "Why join us" strip.
    //
    // The test each line had to pass: could a candidate call us out on it in
    // month two? Anything a candidate could not verify, or that every
    // consultancy says, was cut. Two candidates were dropped for stated
    // reasons rather than because they were untrue:
    //   - visa sponsorship — already covered, per-role, in the "Work
    //     authorization" block below, and repeating it here as a blanket
    //     benefit would overstate it
    //   - "production systems, not pilots" — duplicates the site tagline and
    //     is a claim about client work, not about working here
    //
    // These hold across every role and every location, which matters because
    // the postings cover San Jose plus "various unanticipated client
    // locations" — anything tied to one office is wrong for most readers.
    whyEyebrow: "Why join us",
    whyHeading: "What working here is actually like",
    why: [
      {
        title: "Small teams",
        body: "You are one of a handful of people on a project, not one of forty. Your work is visible.",
      },
      {
        title: "The client is in the room",
        body: "You work directly with the people who own the system, not through a layer of account managers.",
      },
      {
        title: "Onsite, offshore and nearshore",
        body: "We deliver across all three, so where you work is a conversation rather than a policy.",
      },
    ],

    // "How hiring works" — the question candidates actually want answered and
    // that most consultancy careers pages promise and never deliver.
    //
    // [CONFIRM] Every step below is a promise a candidate will hold us to. The
    // sequence and the "you meet the person you would report to" claim need
    // checking against how hiring is actually run before DRAFT_CAREERS comes
    // off. If HR screens first, say so — a candidate who is told they will
    // meet their manager and gets a recruiter instead has already learned
    // something about us.
    processEyebrow: "How hiring works",
    processHeading: "What happens after you apply",
    processSub:
      "Four steps, and we tell you where you stand at each one. If a role is not moving forward we say so rather than going quiet.",
    process: [
      {
        title: "You send a resume",
        body: "Quote the job title and job code so it reaches the right person. No account, no form to fill in.",
      },
      {
        title: "A call with the person you would report to",
        body: "Not a screening call. Half an hour on the work itself and what you would be walking into.",
      },
      {
        title: "A working conversation",
        body: "We talk through systems you have actually built \u2014 decisions, trade-offs, what broke. No puzzle questions.",
      },
      {
        title: "A written offer",
        body: "Pay, benefits and start date in writing, and we go through what applies to your role before you accept.",
      },
    ],
    legalHelper: "The terms that apply to every role here. Open any item to read it.",
    expand: "Show",
    collapse: "Hide",
    legalHeading: "Before you apply",
    legal: {
      benefitsHeading: "Benefits",
      benefits:
        "Eligible employees receive medical, dental and vision coverage, a 401(k) retirement plan, paid time off and paid holidays. Eligibility, cost and what each plan covers depend on the role, the location and the hours worked, and are governed by the plan documents in effect at the time. We go through the details that apply to your role before you accept an offer.",
      eeoHeading: "Equal employment opportunity",
      eeo: "ZEDventures Inc. is an equal opportunity employer. We consider all qualified applicants for employment without regard to race, color, religion, sex, pregnancy, sexual orientation, gender identity or expression, national origin, ancestry, age, physical or mental disability, medical condition, genetic information, marital status, military or veteran status, or any other characteristic protected by federal, state or local law.",
      accommodationHeading: "Reasonable accommodation",
      accommodation:
        "If you need a reasonable accommodation to apply for a role or to take part in our hiring process — including a way to send us your application other than by post — write to hr@zedventures.com. Tell us what you need and we will work out an arrangement with you.",
      authHeading: "Work authorization",
      auth: "All roles require authorization to work in the United States. ZEDventures sponsors employment-based visas for some positions; each posting states whether sponsorship is available.",
      screeningHeading: "Pre-employment checks",
      screening:
        "Offers are conditional on background and reference checks. Depending on the role and the client this may include employment and education verification, criminal record, credit, motor vehicle record and drug testing. We tell you before any check is run and get your written consent first.",
      privacyHeading: "How we handle your application",
      privacy:
        "When you apply we collect the information in your resume and application — name, contact details, work history, education and anything else you choose to send. We use it to assess your application, to contact you about this and similar roles, and to meet our legal and immigration filing obligations. We keep applications for five years from the date you apply. California residents can ask what we hold and request deletion at info@zedventures.com.",
    },
  },
  contact: {
    eyebrow: "Get in touch",
    line: "Let's talk about your next project.",
    formHeading: "Send us a note",
    sub: "Tell us what you're trying to solve.",
    name: "Full name",
    email: "Work email",
    company: "Company",
    message: "How can we help?",
    submit: "Send message",
    successTitle: "Your message is ready to send",
    successBody:
      "We've opened your email app with everything filled in. Press send there and it reaches us.",
    sending: "Sending…",
    sentTitle: "Message sent",
    sentBody: "Thanks — it reached us. Someone will read it and reply to the address you gave.",
    sendFailedTitle: "That didn't go through",
    sendFailedBody: "Something went wrong on our side, so nothing was sent. Your message hasn't been lost — try again, or send it by email instead and it will come with you.",
    retry: "Try again",
    openMail: "Send it by email instead",
    successFallback: "Nothing opened? Write to us directly at",
    required: "This field is required",
    invalidEmail: "Please enter a valid work email",
    page: {
      eyebrow: "Contact",
      heading: "Let's start a conversation.",
      sub: "Email or call us directly, or send a note below.",
      emailLabel: "Email",
      email: "info@zedventures.com",
      phoneLabel: "Phone",
      phone: "+1 (408) 829-7029",
      officesEyebrow: "Our offices",
      offices: [
        { city: "San Jose", region: "California, USA", address: "1762 Technology Drive, Suite 209, San Jose, CA 95110" },
        { city: "Dallas area", region: "Irving, Texas, USA", address: "8629 N MacArthur Blvd, Irving, TX 75063" },
        { city: "Hyderabad", region: "Telangana, India", address: "1st Floor, Mahaveer Radiance, Opp. Metro Pillar 1708, Madhapur, Telangana 500081" },
      ],
    },
  },
  footer: {
    tagline: "Enterprise systems, built to stay up.",
    rights: "© 2026 ZEDventures. All rights reserved.",
    exploreHeading: "Explore",
    companyHeading: "Company",
    legalHeading: "Legal",
    privacy: "Privacy policy",
    terms: "Terms of use",
  },
  /**
   * Privacy and Terms.
   *
   * MOSTLY WRITTEN. Every factual statement below has been checked against the
   * code rather than assumed: no analytics or tracking (nothing in the bundle),
   * one localStorage key \"zv-lang\" and no cookies (the one file that wrote a
   * cookie, shadcn's unused ui/sidebar.tsx, was deleted so the claim cannot
   * quietly become false), Google Fonts loaded from Google (__root.tsx),
   * Fly.io as host and Resend as the contact-form delivery path
   * (contact-server.ts).
   *
   * What is still bracketed, and why each one is: the provider hosting
   * ZEDventures' own email (a processor for every enquiry and every resume,
   * and not visible from this repo); the retention period for job
   * applications, which must match the figure on the careers page; and four
   * clauses that belong to counsel rather than to a template — GDPR
   * applicability via the French pages, the warranty disclaimer, the
   * limitation of liability, and governing law.
   *
   * Both pages stay noindex and keep the draft banner until those are gone.
   */
  legalPages: {
    lastUpdatedLabel: "Last updated",
    lastUpdated: "8 September 2026",
    draftNotice:
      "Draft — every section below is a placeholder. These pages must be reviewed by counsel before publication.",
    /**
     * OPEN, AND DELIBERATELY NOT ON THE PAGE.
     *
     * The email-provider question is closed. Google hosts the mail and
     * Google Drive holds the resumes, so both are one named processor.
     *
     * The Canadian section is a plain-language draft of rights under
     *    PIPEDA, Quebec's Law 25 and Alberta's PIPA. Not claimed in it:
     *    Law 25's portability right, and the named person responsible for
     *    personal information that Law 25 requires be published — a person
     *    to designate, not a sentence to write. Whether any of it attaches,
     *    with no Canadian establishment, is the threshold question.
     *
     * It moved out of the body when the draft banner came off. A note to
     * counsel rendered as body copy is worse than no note at all.
     */
    privacy: {
      eyebrow: "Legal",
      heading: "Privacy policy",
      sub: "What this site collects, who it reaches, and how long we keep it.",
      sections: [
        { heading: "Who we are", body: "ZEDventures Inc. runs this website and decides how the information described below is used. Our registered address is 1762 Technology Drive, Suite 209, San Jose, CA 95110. We also have offices at 8629 N MacArthur Blvd, Irving, Texas, and Mahaveer Radiance, Madhapur, Telangana, India. Questions about this policy go to info@zedventures.com." },
        { heading: "What we collect, and only when you give it", body: "This site has no analytics, no advertising tags and no tracking pixels of any kind. Nothing is recorded about you simply for visiting. We hold personal information in two situations. If you send the contact form: your name, work email, company and whatever you write in the message. If you apply for a role: your resume and anything else you choose to send by email or by post." },
        { heading: "Cookies", body: "This site sets no cookies. It stores one thing in your browser — your choice of English or French, under the name \"zv-lang\" — so the site opens in the language you picked last time. That never leaves your device, is not an identifier, and clearing your browser data removes it." },
        { heading: "Why we use it", body: "Contact form messages are used to answer you and to discuss the work you are asking about. Job applications are used to assess you for the role you applied to, for similar roles we think may fit, and to meet the record-keeping our immigration filings require. We do not sell personal information, and we do not share it for cross-context behavioural advertising." },
        { heading: "Who else sees it", body: "Our website host, Fly.io, which keeps standard server logs including IP addresses. Google, which hosts our email and so receives every enquiry and every resume — the contact form sends through Google's mail servers — and whose Drive service holds resumes in a restricted folder reachable only by the people involved in hiring. If that delivery path is unavailable the form instead opens your own email application, in which case the message travels through your own provider rather than ours. Google Fonts, which serves the typeface on this site — your browser requests the font files from Google directly, so Google receives your IP address on every page load. That is a normal part of how the site is built, but it is a transfer, so it is named here. No CRM, applicant tracking system or recruiting platform receives any of this: enquiries and applications are read in our own email." },
        { heading: "How long we keep it", body: "We keep contact form enquiries for one year from the date you write to us, and delete them after that unless they have become part of a client engagement. Job applications are kept for five years from the date of application. Records we are required to retain for immigration filings are kept for the period the relevant regulations require." },
        { heading: "Your rights", body: "If you live in California, the CCPA and CPRA give you the right to know what personal information we hold about you, to have it deleted, to correct it, and not to be discriminated against for asking. Job applicants have these rights too. Write to info@zedventures.com and we will respond within the time the law allows." },
        { heading: "If you are in Canada", body: "If you are in Canada, you can ask what we hold about you, have it corrected, and withdraw your consent — though withdrawing it during a hiring process ends that process. Enquiries and resumes are stored in the United States, so your information leaves Canada when you send it. Write to info@zedventures.com, or complain to the Privacy Commissioner of Canada or your provincial commissioner." },
        { heading: "Children", body: "This site is aimed at businesses and is not directed at children. We do not knowingly collect information from anyone under 16." },
        { heading: "Changes to this policy", body: "If this policy changes we will update the date at the top of this page. Material changes will be described here rather than made quietly." },
      ],
    },
    terms: {
      eyebrow: "Legal",
      heading: "Terms of use",
      sub: "The terms that apply to anyone using this website.",
      sections: [
        { heading: "Accepting these terms", body: "By using this website you accept these terms. If you do not accept them, please do not use the site. We may update them; the date at the top of this page shows when they last changed." },
        { heading: "What this site is", body: "This site describes what ZEDventures does and how to reach us. Nothing on it is an offer, a quote, or a commitment to perform work. If we end up working together, that engagement is governed by the agreement we both sign — not by anything written here. Where this site and a signed agreement disagree, the signed agreement wins." },
        { heading: "Case studies and figures", body: "The case studies on this site describe specific engagements with specific clients, under conditions particular to each. Figures marked as projected are estimates made at the time, not measured results, and none of the figures anywhere on this site is a promise of what we would achieve for you. Your systems, data and constraints are not the ones described." },
        { heading: "Job postings", body: "A posting on our careers page is a description of a role, not an offer of employment. Some postings reproduce wording filed with a government agency and are published as filed, which is why they read the way they do; that wording is not negotiable and is not a description of terms we are offering. Any employment relationship begins with a signed offer letter, not with this site." },
        { heading: "What belongs to us", body: "The design, text, code, images and the ZEDventures name and logo on this site belong to ZEDventures Inc. or to whoever licensed them to us. You may read, print and share pages for your own reference or to evaluate working with us. Republishing, selling, or presenting this material as your own is not permitted." },
        { heading: "How you may use the site", body: "Use it normally. Do not try to break it, get into parts of it that are not public, scrape it at a volume that degrades it for other people, or use it to send anything unlawful. Do not use our contact form or job postings to send marketing or recruitment approaches to us." },
        { heading: "No warranties", body: "[CONFIRM WITH COUNSEL — the warranty disclaimer. This is a clause a lawyer should write for your jurisdiction and insurance position, not one to take from a template. It generally states that the site is provided as-is, that we do not warrant it will be uninterrupted or error-free, and that information on it may become out of date.]" },
        { heading: "Limits on liability", body: "[CONFIRM WITH COUNSEL — the limitation of liability. Also a clause to have written rather than borrowed, and the one most likely to be tested if anything ever goes wrong. Note that several jurisdictions limit how far liability can be excluded.]" },
        { heading: "Which law applies", body: "[CONFIRM — governing law and the courts that would hear a dispute. California is the usual choice given the San Jose head office, but this is your decision and your counsel's, and it interacts with where your clients are.]" },
        { heading: "Getting in touch", body: "Questions about these terms, and any formal legal notice, go to hr@zedventures.com or by post to ZEDventures Inc., 1762 Technology Drive, Suite 209, San Jose, CA 95110." },
      ],
    },
  },
  nav: {
    services: "Services",
    caseStudies: "Case Studies",
    contact: "Contact",
    about: "About",
    careers: "Careers",
    company: "Company",
    talk: "Let's talk",
  },
  about: {
    eyebrow: "About ZEDventures",
    heading: "Technology is what we do. How we work matters just as much.",
    intro:
      "ZEDventures is an enterprise technology services company helping organizations solve complex technology and delivery challenges across SAP, Analytics, AI & Data, GIS & Geospatial, Guidewire, Product Engineering, and global delivery.",
    intro2:
      "We bring experienced people close to the work and stay accountable for what we deliver.",
    servicesLink: "Explore our services",
    heroImageHint:
      "Three to five ZED people talking over real work, candid, in a real ZED workplace — nobody looking at the camera",
    heroImage: {
      src: "/about-hero.webp",
      alt: "Four colleagues around a table in a bright office, talking over a laptop.",
    },

    whyEyebrow: "Why we're here",
    whyHeading: "Built to make technology services easier to work with.",
    whyBody: [
      "ZEDventures was built around a simple idea: clients should not have to choose between strong technical capability and a team that is responsive, practical, and easy to work with.",
      "As we've grown, that idea has stayed the same. We keep things straightforward, bring the right people into the work, and avoid making an engagement more complicated than it needs to be.",
    ],
    whyDiagram: ["Client", "ZED team", "The work"],
    whyDiagramNote: "Fewer handoffs. Clearer ownership.",

    believeEyebrow: "What we believe",
    believeHeading: "Good work starts with good relationships.",
    believeIntro:
      "Technology changes quickly. The way we work with people shouldn't. We believe in being straightforward, taking responsibility, and thinking beyond the immediate project.",
    beliefs: [
      {
        title: "Be accountable.",
        body: "We take ownership of the work we commit to. When something is going well, we keep it moving. When it isn't, we raise it early and work with our clients to fix it.",
      },
      {
        title: "Do right by people.",
        body: "Our business is built around people — our clients, our employees, and the consultants who choose to work with us. We aim to be fair, communicate clearly, and treat people with the same respect we expect in return.",
      },
      {
        title: "Think beyond the project.",
        body: "We're not interested in solving today's problem in a way that creates another one tomorrow. We look at the longer picture — building solutions clients can live with and relationships that can grow over time.",
      },
    ],

    workEyebrow: "How we work",
    workHeading: "Experienced people. Fewer layers.",
    workIntro:
      "Clients should be able to work directly with people who understand the technology and the work being delivered. We keep teams practical and accessible, without adding unnecessary layers between a problem and the people solving it.",
    workStages: [
      { title: "Understand", note: "Start with the actual problem." },
      { title: "Recommend", note: "Say what we believe makes sense." },
      { title: "Build", note: "Put experienced people into the work." },
      { title: "Stay involved", note: "Remain accountable after delivery begins." },
    ],
    workPrinciples: [
      {
        title: "Stay close to the work",
        body: "Senior people remain involved throughout the engagement. Experience does not disappear once the proposal is signed.",
      },
      {
        title: "Say what we think",
        body: "We recommend what we believe makes sense, even when that means suggesting a simpler approach or challenging an assumption.",
      },
      {
        title: "Make it work in the real world",
        body: "A solution has to work with the systems, people, timelines, and constraints a client actually has. That's the standard we design and deliver against.",
      },
    ],

    teamEyebrow: "Our team",
    teamHeading: "One ZED team, across locations.",
    teamBody:
      "Our people work across North America and India, bringing together client-facing experience and engineering delivery. Wherever the team is based, they work as part of the same organization.",
    teamPhotos: [
      { src: "/delivery-team.webp", alt: "The ZEDventures team together in a meeting room.", caption: "The ZEDventures team." },
      { src: "/delivery-floor.webp", alt: "The engineering floor seen through a glass wall, with shared desks and daylight beyond.", caption: "Our India engineering office." },
    ],
    teamLocations: [
      { place: "North America", role: "Client engagement" },
      { place: "India", role: "Engineering & delivery" },
    ],
    teamLocationsNote: "One ZED team.",

    ctaHeading: "Let's talk about what you're working on.",
    ctaBody:
      "Whether you have a specific technology challenge or are simply thinking through what comes next, we're happy to start with a conversation.",
    ctaButton: "Start a conversation",
  },
  a11y: {
    switchTo: "Passer au français",
    logoAlt: "ZEDventures logo",
    openMenu: "Open navigation menu",
    menuTitle: "Menu",
  },
};

export type Copy = typeof en;

const fr: Copy = {
  hero: {
    headline: "Intégrer l'intelligence au cœur de votre entreprise",
    subhead:
      "Nous construisons et exploitons les systèmes dont une entreprise ne peut pas se permettre la panne : IA, données, analytique, géomatique, SAP et Guidewire. Pas des maquettes — ceux qui doivent tourner lundi matin.",
    ctaPrimary: "Parler à un spécialiste",
    ctaSecondary: "Découvrir nos réalisations",
    trustLine:
      "Ingénierie d'entreprise · IA et données · Infonuagique · SAP · Guidewire · Livraison mondiale",
    cardTitle: "Livraison mondiale",
    cardCapabilities: "Expertises",
    cardLocations: "Bureaux",
  },
  services: {
    eyebrow: "Ce que nous faisons",
    heading: "Expertises",
    sub: "Sept métiers. Tous finissent en production.",
    viewService: "Voir le service",
    pageCta: "Parler à un spécialiste",
    problemsEyebrow: "Le problème",
    problemsHeading: "Ce pour quoi on nous appelle.",
    capsEyebrow: "Ce que nous faisons",
    capsHeading: "Expertises",
    howEyebrow: "Notre approche",
    howHeading: "De la stratégie à l'exploitation.",
    techEyebrow: "Technologies",
    techHeading: "Ce avec quoi nous construisons.",
    relatedEyebrow: "Connexe",
    relatedHeading: "Autres expertises.",
    ctaHeading: "Parlons de votre prochain projet.",
    ctaSub: "Dites-nous ce que vous cherchez à résoudre. Un membre senior de notre équipe le lira.",
    situationEyebrow: "La situation",
    situationHeading: "Là où les organisations se bloquent.",
    // French puts the service name last, so the suffix is empty:
    // "Parler à notre équipe Analytique".
    heroCtaBefore: "Parler à notre équipe",
    heroCtaAfter: "",
    buildEyebrow: "Ce que nous faisons",
    buildHeading: "Ce que nous vous aidons à faire.",
    platformsEyebrow: "Technologies",
    platformsHeading: "Les plateformes que nous maîtrisons.",
    platformsSub:
      "Une expérience des plateformes couramment utilisées dans les environnements d'entreprise et les programmes de modernisation.",
    whyEyebrow: "Pourquoi ZED",
    whyHeading: "Pourquoi ZED pour",
    proofEyebrow: "Nos réalisations",
    proofCta: "Lire l'étude de cas",
    startNext:
      "Votre message arrive directement à notre équipe de livraison. Un membre senior de l'équipe vous répond sous un jour ouvré.",
    startNextCta: "Démarrer la conversation",
    items: [
      {
        title: "IA et données",
        desc: "Applications basées sur les LLM, pipelines d'apprentissage automatique et plateformes de données conçues pour passer du prototype à la production.",
      },
      {
        title: "Analytique",
        desc: "Tableaux de bord BI, entrepôts de données et analytique prédictive qui transforment des données dispersées en décisions fiables.",
      },
      {
        title: "SIG et géospatial",
        desc: "Données spatiales, cartographie et analytique de localisation — cartographie de l'exposition, évaluation des risques par imagerie et pipelines géospatiaux.",
      },
      {
        title: "Guidewire",
        desc: "Services complets pour PolicyCenter, BillingCenter et ClaimCenter — implantation, configuration, mises à niveau et migration infonuagique.",
      },
      {
        title: "SAP",
        desc: "S/4HANA, BTP et Fiori selon une discipline « clean core » — intégrations, extensions et agents d'IA branchés au contexte réel de l'ERP.",
      },

      {
        title: "Ingénierie produit",
        desc: "Livraison logicielle complète — architecture, développement infonuagique natif et assurance qualité — pour des produits livrés à temps.",
      },
      {
        title: "Livraison offshore et nearshore",
        desc: "Des équipes d'ingénierie dédiées en Inde et dans les Amériques — capacité approfondie en offshore, meilleur recouvrement horaire en nearshore, un seul modèle d'engagement.",
      },
    ],
  },
  caseStudies: {
    eyebrow: "Du travail en production",
    heading: "Ce que nous développons en ce moment",
    items: [
      {
        tag: "Étude de cas 01",
        date: "2026",
        client: "Entreprise de logiciels",
        short: ["Aide", "IA"],
        title: "Une aide assistée par IA, ancrée dans le savoir produit approuvé",
        desc: "Leurs utilisateurs ne trouvaient pas les réponses. La documentation existait, éparpillée dans des systèmes que personne n'avait envie de fouiller ; les gens ouvraient un ticket à la place. Nous avons intégré une aide conversationnelle au site, à l'application mobile et au produit lui-même. Chaque réponse provient d'une documentation déjà approuvée par l'entreprise ; l'assistant est conçu pour répondre à partir de cette documentation et pour décliner ce qu'il ne peut pas appuyer. Les réponses arrivent en moins d'une seconde. Le client estime qu'il traitera environ 70 % des demandes courantes de niveau 1 sans créer de ticket.",
        stack: ["RAG", "Azure AI Search", "API Python", "Orchestration LLM", "Interface omnicanale"],
        outcomes: [
          "Déflexion projetée de 70 % des tickets de support de niveau 1",
          "Des réponses ancrées dans la documentation produit approuvée",
          "Réponses en moins d'une seconde, sans navigation manuelle dans les documents",
          "Adoption accrue des fonctionnalités grâce au guidage intégré au produit",
        ],
      },
      {
        tag: "Étude de cas 02",
        date: "2026",
        client: "Entreprise mondiale de services immobiliers",
        short: ["Intel", "Ventes"],
        title: "Intelligence commerciale pilotée par événements pour les services immobiliers",
        desc: "Les représentants passaient une heure avant chaque rendez-vous à fouiller le CRM, l'historique des transactions, les données de propriétés et celles du quartier. Cette recherche se fait maintenant toute seule, dès qu'un rendez-vous entre au calendrier. Le représentant ouvre un dossier au lieu de le construire. La préparation est passée d'une heure à moins de cinq minutes.",
        stack: ["Azure OpenAI", "RAG", "API Python", "Recherche vectorielle", "Architecture événementielle"],
        outcomes: [
          "Temps de préparation ramené de 60 minutes à moins de 5 minutes",
          "Augmentation projetée de 20 % des taux de conversion",
          "Historique CRM et données de quartier réunis dans une seule fiche de rendez-vous",
          "2 à 3 rendez-vous à haute valeur de plus par représentant, par semaine",
        ],
      },
      {
        tag: "Étude de cas 03",
        date: "2026",
        client: "Entreprise mondiale de déménagement",
        short: ["Données", "Unifiées"],
        title: "Analytique unifiée pour des opérations multinationales",
        desc: "Chaque région faisait ses propres rapports. Le siège n'avait aucune vue d'ensemble : tout ce qui traversait les pays était assemblé à la main, en retard. Nous avons réuni les systèmes régionaux sur une seule plateforme et construit des tableaux de bord partagés pour les coûts, les retours clients et la performance. Ils voient maintenant les coûts, les retours clients et la performance de chaque pays au fil de l'eau, au lieu d'un mois plus tard.",
        stack: ["SQL Azure", "Azure Data Lake", "Azure Data Factory", "Power BI", "C# .NET"],
        outcomes: [
          "Une vue unifiée des opérations et des points de contact client sur les régions couvertes",
          "Rapports standardisés sur la rentabilité des comptes",
          "Identification immédiate des opportunités de croissance et des zones de faible performance",
        ],
      },
      {
        tag: "Étude de cas 04",
        date: "2026",
        client: "Multinationale de l'électronique grand public",
        short: ["Virage", "Cloud"],
        title: "Migration infonuagique et résidence des données pour la conformité mondiale",
        desc: "195 systèmes, un cluster Hadoop local vieillissant, et des engagements matériels en cours. Le client avait aussi besoin de mieux contrôler où les données des consommateurs américains étaient stockées et qui pouvait y accéder. Nous avons séparé ces données et reconstruit l'ensemble sur Google Cloud. Les requêtes tournent trois à cinq fois plus vite. Les fonctionnalités sortent environ 20 % plus tôt. Les nœuds défaillants se remplacent tout seuls.",
        stack: ["GCP", "Apache Spark", "Hive", "Presto", "IAM & KMS", "Clusters auto-cicatrisants"],
        outcomes: [
          "Requêtes complexes 3 à 5 fois plus rapides",
          "Gain de productivité d'ingénierie de 25 %",
          "Mise sur le marché des fonctionnalités 20,66 % plus rapide",
          "Résilience sans interruption grâce au remplacement automatisé des nœuds",
        ],
      },
    ],
  },
  caseStudiesPage: {
    eyebrow: "Études de cas",
    heading: "Des réalisations en production",
    sub: "Des engagements réels, des résultats concrets — des systèmes d'IA, de données et d'analytique en production chez des entreprises mondiales.",
    outcomesLabel: "Résultats",
    stackLabel: "Technologies",
  },
  globalDelivery: {
    eyebrow: "Livraison mondiale",
    heading: "Des relations nord-américaines. Une capacité de livraison mondiale.",
    sub: "Nous restons proches de nos clients en Amérique du Nord et relions cette relation à une capacité d'ingénierie et de livraison en Inde.",
    marketsLabel: "Amérique du Nord",
    marketsNote: "Là où nous travaillons avec nos clients",
    markets: [
      {
        place: "États-Unis",
        role: "Relation et pilotage client",
        desc: "Nous travaillons au contact des équipes clientes, de la stratégie et de l'architecture jusqu'à la mise en œuvre et l'exploitation.",
      },
      {
        place: "Canada",
        flag: "Marché en développement",
        role: "Au service des organisations canadiennes",
        desc: "Nous apportons notre expérience des systèmes d'entreprise et notre modèle de livraison souple aux organisations partout au Canada.",
      },
    ],
    deliveryLabel: "Livraison mondiale",
    deliveryNote: "Profondeur d'ingénierie",
    delivery: {
      place: "Inde",
      role: "Ingénierie et livraison",
      desc: "Mise en œuvre, développement, intégration et exploitation, portés par une capacité d'ingénierie qui suit la taille de l'engagement.",
    },
    closing: "Une seule équipe. De la stratégie à la livraison.",
    closingSub:
      "Un pilotage au contact du client et une ingénierie qui monte en charge, comme une seule équipe à travers les fuseaux horaires.",
  },
  careers: {
    eyebrow: "Rejoignez-nous",
    line: "Nous recrutons dans toutes les équipes présentées sur cette page.",
    cta: "Voir les postes ouverts",
  },
  careersPage: {
    eyebrow: "Carrières",
    heading: "Postes ouverts",
    sub: "Tous les postes ouverts chez ZEDventures, leurs exigences et la façon de postuler. Nous sommes un cabinet de conseil : le travail consiste en projets clients sur des systèmes d’entreprise — SAP, analytique, SIG, plateformes d’assurance — livrés sur site, en offshore et en nearshore. Si rien ici ne vous correspond mais que vous pensez pouvoir nous être utile, envoyez tout de même votre CV ; nous les conservons.",
    draftNotice:
      "Brouillon — ces annonces n'ont pas été vérifiées par rapport aux dépôts officiels et les fourchettes de salaire ne sont pas définitives. Ne pas publier.",
    openCount: "postes ouverts",
    noRoles:
      "Aucun poste ouvert pour le moment. Envoyez-nous tout de même votre CV, nous le conserverons.",
    viewRole: "Voir le poste",
    backToRoles: "Tous les postes ouverts",
    jobCodeLabel: "Code du poste",
    locationLabel: "Lieu",
    typeLabel: "Type",
    hoursLabel: "Heures",
    payLabel: "Fourchette de salaire",
    payTbd: "À confirmer",
    postedLabel: "Publié le",
    sponsorshipLabel: "Parrainage de visa",
    sponsorshipYes: "Disponible pour ce poste",
    sponsorshipNo: "Non disponible pour ce poste",
    dutiesHeading: "En quoi consiste le poste",
    requirementsHeading: "Ce que le poste exige",
    applyHeading: "Comment postuler",
    applyIntro: "Envoyez votre CV en indiquant l'intitulé et le code du poste.",
    applyEmailLabel: "Par courriel",
    applyPostalLabel: "Par courrier",
    verbatimNote:
      "Cette annonce est reproduite telle qu'elle a été déposée. Sa formulation est fixée par le dépôt officiel et n'est pas retouchée.",
    whyEyebrow: "Pourquoi nous rejoindre",
    whyHeading: "Ce que c'est de travailler ici",
    why: [
      {
        title: "Des équipes réduites",
        body: "Vous êtes l'une des quelques personnes sur un projet, pas l'une de quarante. Votre travail se voit.",
      },
      {
        title: "Le client est dans la pièce",
        body: "Vous travaillez directement avec les responsables du système, sans intermédiaire commercial.",
      },
      {
        title: "Sur site, offshore et nearshore",
        body: "Nous livrons selon les trois modes : le lieu de travail se discute, il ne s'impose pas.",
      },
    ],

    processEyebrow: "Notre processus de recrutement",
    processHeading: "Ce qui se passe après votre candidature",
    processSub:
      "Quatre étapes, et nous vous disons où vous en êtes à chacune. Si une candidature n'avance pas, nous vous le disons plutôt que de ne plus donner signe de vie.",
    process: [
      {
        title: "Vous envoyez votre CV",
        body: "Indiquez l'intitulé et le code du poste pour qu'il arrive à la bonne personne. Pas de compte à créer, pas de formulaire.",
      },
      {
        title: "Un échange avec votre futur responsable",
        body: "Pas un entretien de présélection. Une demi-heure sur le travail lui-même et sur ce qui vous attend.",
      },
      {
        title: "Une conversation technique",
        body: "Nous parlons de systèmes que vous avez réellement construits : décisions, arbitrages, ce qui a cassé. Pas d'énigmes.",
      },
      {
        title: "Une offre écrite",
        body: "Rémunération, avantages et date de début par écrit, et nous passons en revue ce qui s'applique à votre poste avant que vous acceptiez.",
      },
    ],
    legalHelper: "Les conditions qui s'appliquent à tous les postes. Ouvrez un élément pour le lire.",
    expand: "Afficher",
    collapse: "Masquer",
    legalHeading: "Avant de postuler",
    legal: {
      benefitsHeading: "Avantages sociaux",
      benefits:
        "Les employés éligibles bénéficient d'une couverture médicale, dentaire et optique, d'un plan de retraite 401(k), de congés payés et de jours fériés payés. L'éligibilité, le coût et l'étendue de chaque régime dépendent du poste, du lieu et du nombre d'heures travaillées, et sont régis par les documents du régime en vigueur. Nous passons en revue les modalités qui s'appliquent à votre poste avant que vous n'acceptiez une offre.",
      eeoHeading: "Égalité des chances en matière d'emploi",
      eeo: "ZEDventures Inc. souscrit au principe de l'égalité des chances en matière d'emploi. Nous étudions toutes les candidatures qualifiées sans distinction de race, couleur, religion, sexe, grossesse, orientation sexuelle, identité ou expression de genre, origine nationale, ascendance, âge, handicap physique ou mental, état de santé, information génétique, situation de famille, statut militaire ou d'ancien combattant, ni aucune autre caractéristique protégée par la loi fédérale, d'État ou locale.",
      accommodationHeading: "Aménagements raisonnables",
      accommodation:
        "Si vous avez besoin d'un aménagement raisonnable pour postuler ou participer à notre processus de recrutement — y compris un autre moyen que le courrier postal pour nous envoyer votre candidature — écrivez à hr@zedventures.com. Dites-nous ce dont vous avez besoin et nous trouverons une solution avec vous.",
      authHeading: "Autorisation de travail",
      auth: "Tous les postes exigent une autorisation de travail aux États-Unis. ZEDventures parraine des visas de travail pour certains postes ; chaque annonce précise si le parrainage est disponible.",
      screeningHeading: "Vérifications préalables à l'embauche",
      screening:
        "Toute offre est conditionnée à des vérifications d'antécédents et de références. Selon le poste et le client, cela peut inclure la vérification des emplois et diplômes, du casier judiciaire, du crédit, du dossier de conduite et un test de dépistage. Nous vous prévenons avant toute vérification et recueillons d'abord votre consentement écrit.",
      privacyHeading: "Ce que nous faisons de votre candidature",
      privacy:
        "Lorsque vous postulez, nous recueillons les informations de votre CV et de votre candidature — nom, coordonnées, parcours professionnel, formation et tout autre élément que vous choisissez de nous transmettre. Nous les utilisons pour évaluer votre candidature, vous contacter au sujet de ce poste et de postes similaires, et respecter nos obligations légales et de dépôt en matière d'immigration. Nous conservons les candidatures pendant cinq ans à compter de la date de candidature. Les résidents de Californie peuvent demander quelles données nous détenons et en demander la suppression à info@zedventures.com.",
    },
  },
  contact: {
    eyebrow: "Contactez-nous",
    line: "Parlons de votre prochain projet.",
    formHeading: "Écrivez-nous",
    sub: "Dites-nous ce que vous cherchez à résoudre.",
    name: "Nom complet",
    email: "Courriel professionnel",
    company: "Entreprise",
    message: "Comment pouvons-nous vous aider?",
    submit: "Envoyer le message",
    successTitle: "Votre message est prêt à être envoyé",
    successBody:
      "Nous avons ouvert votre application de courriel avec le message déjà rempli. Envoyez-le et il nous parviendra.",
    sending: "Envoi en cours…",
    sentTitle: "Message envoyé",
    sentBody: "Merci — nous l'avons bien reçu. Quelqu'un le lira et répondra à l'adresse indiquée.",
    sendFailedTitle: "L'envoi a échoué",
    sendFailedBody: "Un problème de notre côté : rien n'a été envoyé. Votre message n'est pas perdu — réessayez, ou envoyez-le par courriel et il vous suivra.",
    retry: "Réessayer",
    openMail: "Envoyer par courriel à la place",
    successFallback: "Rien ne s'est ouvert? Écrivez-nous directement à",
    required: "Ce champ est requis",
    invalidEmail: "Veuillez saisir un courriel professionnel valide",
    page: {
      eyebrow: "Contact",
      heading: "Démarrons la conversation.",
      sub: "Écrivez-nous ou appelez-nous directement, ou laissez un message ci-dessous.",
      emailLabel: "Courriel",
      email: "info@zedventures.com",
      phoneLabel: "Téléphone",
      phone: "+1 (408) 829-7029",
      officesEyebrow: "Nos bureaux",
      offices: [
        { city: "San Jose", region: "Californie, États-Unis", address: "1762 Technology Drive, Suite 209, San Jose, CA 95110" },
        { city: "Région de Dallas", region: "Irving, Texas, États-Unis", address: "8629 N MacArthur Blvd, Irving, TX 75063" },
        { city: "Hyderabad", region: "Telangana, Inde", address: "1st Floor, Mahaveer Radiance, Opp. Metro Pillar 1708, Madhapur, Telangana 500081" },
      ],
    },
  },
  footer: {
    tagline: "Des systèmes d'entreprise conçus pour tenir.",
    rights: "© 2026 ZEDventures. Tous droits réservés.",
    exploreHeading: "Explorer",
    companyHeading: "Entreprise",
    legalHeading: "Mentions légales",
    privacy: "Politique de confidentialité",
    terms: "Conditions d'utilisation",
  },
  legalPages: {
    lastUpdatedLabel: "Dernière mise à jour",
    lastUpdated: "8 septembre 2026",
    draftNotice:
      "Brouillon — chaque section ci-dessous est un espace réservé. Ces pages doivent être revues par un conseil juridique avant publication.",
    privacy: {
      eyebrow: "Mentions légales",
      heading: "Politique de confidentialité",
      sub: "Ce que ce site recueille, qui y a accès et combien de temps nous le conservons.",
      sections: [
        { heading: "Qui nous sommes", body: "ZEDventures Inc. exploite ce site et décide de l'usage des informations décrites ci-dessous. Notre adresse enregistrée est le 1762 Technology Drive, Suite 209, San Jose, CA 95110. Nous avons également des bureaux au 8629 N MacArthur Blvd, Irving, Texas, et à Mahaveer Radiance, Madhapur, Telangana, Inde. Pour toute question : info@zedventures.com." },
        { heading: "Ce que nous recueillons, et uniquement si vous le fournissez", body: "Ce site n'utilise aucun outil de mesure d'audience, aucune balise publicitaire et aucun pixel de suivi. Rien n'est enregistré à votre sujet du seul fait de votre visite. Nous détenons des données personnelles dans deux cas. Si vous utilisez le formulaire de contact : vos nom, adresse professionnelle, société et le contenu de votre message. Si vous postulez : votre CV et tout autre élément que vous nous envoyez par courriel ou par courrier." },
        { heading: "Cookies", body: "Ce site ne dépose aucun cookie. Il conserve une seule information dans votre navigateur — votre choix entre le français et l'anglais, sous le nom « zv-lang » — afin d'ouvrir le site dans la langue choisie la dernière fois. Cette information ne quitte jamais votre appareil, ne constitue pas un identifiant, et disparaît si vous effacez les données de votre navigateur." },
        { heading: "Pourquoi nous les utilisons", body: "Les messages du formulaire de contact servent à vous répondre et à discuter du projet évoqué. Les candidatures servent à évaluer votre profil pour le poste visé, pour des postes similaires susceptibles de vous convenir, et à respecter les obligations de conservation liées à nos dépôts en matière d'immigration. Nous ne vendons pas de données personnelles et ne les partageons pas à des fins de publicité comportementale." },
        { heading: "Qui d'autre y a accès", body: "Notre hébergeur, Fly.io, qui conserve des journaux serveur standard incluant les adresses IP. Google, qui héberge notre messagerie et reçoit donc chaque demande et chaque CV — le formulaire de contact passe par les serveurs de messagerie de Google — et dont le service Drive conserve les CV dans un dossier à accès restreint, réservé aux personnes participant au recrutement. Si cette voie est indisponible, le formulaire ouvre votre propre application de courriel et le message transite alors par votre fournisseur plutôt que par le nôtre. Google Fonts, qui fournit la police de caractères du site — votre navigateur télécharge les fichiers de police directement auprès de Google, qui reçoit donc votre adresse IP à chaque chargement de page. Cela relève de la construction du site, mais il s'agit d'un transfert : il est donc mentionné ici. Aucun CRM, ATS ou plateforme de recrutement ne reçoit ces données : les demandes et les candidatures sont lues dans notre propre messagerie." },
        { heading: "Durée de conservation", body: "Nous conservons les demandes reçues via le formulaire pendant un an à compter de votre message, puis les supprimons, sauf si elles s'inscrivent dans un engagement client. Les candidatures sont conservées cinq ans à compter de la date de candidature. Les documents que nous devons conserver au titre des dépôts d'immigration le sont pour la durée exigée par la réglementation applicable." },
        { heading: "Vos droits", body: "Si vous résidez en Californie, le CCPA et le CPRA vous donnent le droit de savoir quelles données nous détenons, d'en demander la suppression ou la rectification, et de ne pas subir de traitement défavorable pour avoir exercé ces droits. Les candidats en bénéficient également. Écrivez à info@zedventures.com et nous répondrons dans le délai prévu par la loi." },
        { heading: "Si vous êtes au Canada", body: "Si vous êtes au Canada, vous pouvez demander quels renseignements nous détenons à votre sujet, en demander la rectification et retirer votre consentement — étant entendu que le retirer pendant un processus de recrutement y met fin. Les demandes et les CV sont conservés aux États-Unis : vos renseignements sortent donc du Canada lorsque vous nous les transmettez. Écrivez à info@zedventures.com, ou portez plainte auprès du Commissariat à la protection de la vie privée du Canada ou de votre commissaire provincial." },
        { heading: "Enfants", body: "Ce site s'adresse aux entreprises et non aux enfants. Nous ne recueillons pas sciemment de données concernant des personnes de moins de 16 ans." },
        { heading: "Modifications", body: "En cas de modification, nous mettrons à jour la date figurant en haut de cette page. Les changements importants y seront décrits plutôt qu'apportés discrètement." },
      ],
    },
    terms: {
      eyebrow: "Mentions légales",
      heading: "Conditions d'utilisation",
      sub: "Les conditions applicables à toute personne utilisant ce site.",
      sections: [
        { heading: "Acceptation des conditions", body: "En utilisant ce site, vous acceptez les présentes conditions. Si vous ne les acceptez pas, n'utilisez pas le site. Nous pouvons les modifier ; la date figurant en haut de cette page indique la dernière modification." },
        { heading: "Ce qu'est ce site", body: "Ce site décrit l'activité de ZEDventures et la façon de nous contacter. Rien de ce qui y figure ne constitue une offre, un devis ou un engagement à réaliser une prestation. Si nous travaillons ensemble, la prestation sera régie par le contrat que nous signerons, et non par ce qui est écrit ici. En cas de divergence entre ce site et un contrat signé, le contrat signé prévaut." },
        { heading: "Études de cas et chiffres", body: "Les études de cas présentées décrivent des projets précis, menés pour des clients précis, dans des conditions qui leur sont propres. Les chiffres présentés comme projetés sont des estimations établies à l'époque, et non des résultats mesurés ; aucun chiffre figurant sur ce site ne constitue une promesse de ce que nous obtiendrions pour vous. Vos systèmes, vos données et vos contraintes ne sont pas ceux décrits." },
        { heading: "Offres d'emploi", body: "Une annonce publiée sur notre page carrières décrit un poste ; elle ne constitue pas une offre d'emploi. Certaines annonces reproduisent une formulation déposée auprès d'une administration et sont publiées telles que déposées, ce qui explique leur rédaction ; cette formulation n'est pas négociable et ne décrit pas des conditions que nous proposons. Toute relation de travail débute par une lettre d'offre signée, et non par ce site." },
        { heading: "Ce qui nous appartient", body: "La conception, les textes, le code, les images ainsi que le nom et le logo ZEDventures figurant sur ce site appartiennent à ZEDventures Inc. ou à leurs concédants. Vous pouvez lire, imprimer et partager ces pages pour votre information ou pour évaluer une collaboration avec nous. Leur republication, leur revente ou leur présentation comme votre propre travail ne sont pas autorisées." },
        { heading: "Usage du site", body: "Utilisez-le normalement. N'essayez pas de le mettre en défaut, d'accéder à des parties non publiques, de l'aspirer à un volume qui en dégraderait l'usage pour autrui, ni de vous en servir pour transmettre quoi que ce soit d'illicite. N'utilisez pas notre formulaire de contact ni nos annonces pour nous adresser des démarches commerciales ou de recrutement." },
        { heading: "Absence de garantie", body: "[À CONFIRMER AVEC UN CONSEIL JURIDIQUE — la clause d'exclusion de garantie. Elle doit être rédigée pour votre juridiction et votre couverture d'assurance, et non reprise d'un modèle. Elle prévoit généralement que le site est fourni en l'état, sans garantie de fonctionnement ininterrompu ou exempt d'erreurs, et que les informations peuvent ne plus être à jour.]" },
        { heading: "Limitation de responsabilité", body: "[À CONFIRMER AVEC UN CONSEIL JURIDIQUE — la clause de limitation de responsabilité. À faire rédiger plutôt qu'à emprunter : c'est la clause la plus susceptible d'être contestée en cas de litige, et plusieurs juridictions encadrent l'étendue des exclusions admises.]" },
        { heading: "Droit applicable", body: "[À CONFIRMER — le droit applicable et la juridiction compétente. La Californie est le choix habituel compte tenu du siège de San Jose, mais la décision vous appartient, avec votre conseil, et dépend aussi de la localisation de vos clients.]" },
        { heading: "Nous contacter", body: "Toute question relative aux présentes conditions, ainsi que toute notification juridique formelle, peut être adressée à hr@zedventures.com ou par courrier à ZEDventures Inc., 1762 Technology Drive, Suite 209, San Jose, CA 95110." },
      ],
    },
  },
  nav: {
    services: "Expertises",
    caseStudies: "Études de cas",
    contact: "Contact",
    about: "À propos",
    careers: "Carrières",
    company: "Entreprise",
    talk: "Parlons-en",
  },
  about: {
    eyebrow: "À propos de ZEDventures",
    heading: "La technologie, c'est notre métier. Notre façon de travailler compte tout autant.",
    intro:
      "ZEDventures est une société de services technologiques d'entreprise qui aide les organisations à résoudre des enjeux complexes de technologie et de livraison : SAP, analytique, IA et données, SIG et géospatial, Guidewire, ingénierie produit et livraison mondiale.",
    intro2:
      "Nous plaçons des personnes expérimentées au plus près du travail et nous répondons de ce que nous livrons.",
    servicesLink: "Découvrir nos expertises",
    heroImageHint:
      "Trois à cinq personnes de ZED discutant d'un vrai travail, sur le vif, dans un vrai bureau ZED — personne ne regarde l'objectif",
    heroImage: {
      src: "/about-hero.webp",
      alt: "Quatre collègues autour d'une table dans un bureau lumineux, en discussion devant un portable.",
    },

    whyEyebrow: "Pourquoi nous existons",
    whyHeading: "Conçus pour rendre les services technologiques plus simples à utiliser.",
    whyBody: [
      "ZEDventures s'est construite autour d'une idée simple : un client ne devrait pas avoir à choisir entre une vraie capacité technique et une équipe réactive, pragmatique et facile à vivre.",
      "En grandissant, cette idée n'a pas changé. Nous restons simples, amenons les bonnes personnes sur le travail et évitons de compliquer un engagement plus que nécessaire.",
    ],
    whyDiagram: ["Client", "Équipe ZED", "Le travail"],
    whyDiagramNote: "Moins de passations. Une responsabilité plus claire.",

    believeEyebrow: "Ce en quoi nous croyons",
    believeHeading: "Un bon travail commence par de bonnes relations.",
    believeIntro:
      "La technologie change vite. Notre façon de travailler avec les gens ne devrait pas. Nous croyons à la franchise, à la responsabilité et au fait de penser au-delà du projet immédiat.",
    beliefs: [
      {
        title: "Répondre de son travail.",
        body: "Nous assumons ce sur quoi nous nous engageons. Quand tout avance bien, nous gardons le rythme. Quand ce n'est pas le cas, nous le disons tôt et nous corrigeons avec le client.",
      },
      {
        title: "Bien traiter les gens.",
        body: "Notre activité repose sur des personnes — nos clients, nos employés et les consultants qui choisissent de travailler avec nous. Nous essayons d'être justes, de communiquer clairement et de traiter chacun avec le respect que nous attendons en retour.",
      },
      {
        title: "Penser au-delà du projet.",
        body: "Résoudre le problème du jour en en créant un autre pour demain ne nous intéresse pas. Nous regardons plus loin : des solutions avec lesquelles le client peut vivre, et des relations qui peuvent durer.",
      },
    ],

    workEyebrow: "Notre façon de travailler",
    workHeading: "Des personnes expérimentées. Moins d'intermédiaires.",
    workIntro:
      "Un client devrait pouvoir parler directement aux personnes qui comprennent la technologie et le travail livré. Nous gardons des équipes concrètes et accessibles, sans ajouter de couches inutiles entre un problème et ceux qui le résolvent.",
    workStages: [
      { title: "Comprendre", note: "Partir du problème réel." },
      { title: "Recommander", note: "Dire ce qui nous paraît juste." },
      { title: "Construire", note: "Mettre des personnes expérimentées sur le travail." },
      { title: "Rester engagés", note: "Répondre du travail une fois la livraison lancée." },
    ],
    workPrinciples: [
      {
        title: "Rester près du travail",
        body: "Les profils expérimentés restent impliqués tout au long de l'engagement. L'expérience ne disparaît pas une fois la proposition signée.",
      },
      {
        title: "Dire ce que nous pensons",
        body: "Nous recommandons ce qui nous paraît juste, même quand cela revient à proposer une approche plus simple ou à remettre en question une hypothèse.",
      },
      {
        title: "Que ça marche dans la vraie vie",
        body: "Une solution doit fonctionner avec les systèmes, les personnes, les délais et les contraintes que le client a réellement. C'est la règle sur laquelle nous concevons et livrons.",
      },
    ],

    teamEyebrow: "Notre équipe",
    teamHeading: "Une seule équipe ZED, sur plusieurs sites.",
    teamBody:
      "Nos équipes travaillent en Amérique du Nord et en Inde, réunissant la relation client et la livraison d'ingénierie. Où qu'elles soient basées, elles font partie de la même organisation.",
    teamPhotos: [
      { src: "/delivery-team.webp", alt: "L'équipe ZEDventures réunie dans une salle de réunion.", caption: "L'équipe ZEDventures." },
      { src: "/delivery-floor.webp", alt: "Le plateau d'ingénierie vu à travers une cloison vitrée, avec des postes partagés et la lumière du jour au fond.", caption: "Notre bureau d'ingénierie en Inde." },
    ],
    teamLocations: [
      { place: "Amérique du Nord", role: "Relation client" },
      { place: "Inde", role: "Ingénierie et livraison" },
    ],
    teamLocationsNote: "Une seule équipe ZED.",

    ctaHeading: "Parlons de ce sur quoi vous travaillez.",
    ctaBody:
      "Que vous ayez un enjeu technologique précis ou que vous réfléchissiez simplement à la suite, nous commençons volontiers par une conversation.",
    ctaButton: "Démarrer la conversation",
  },
  a11y: {
    switchTo: "Switch to English",
    logoAlt: "Logo ZEDventures",
    openMenu: "Ouvrir le menu de navigation",
    menuTitle: "Menu",
  },
};

const translations: Record<Lang, Copy> = { en, fr };

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Copy;
}>({ lang: "en", setLang: () => {}, t: en });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("zv-lang");
    if (stored === "en" || stored === "fr") setLangState(stored);
  }, []);

  // Keep <html lang> in step with the rendered copy on every path — including
  // the restore-from-storage path above, which previously left it at "en".
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("zv-lang", l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
