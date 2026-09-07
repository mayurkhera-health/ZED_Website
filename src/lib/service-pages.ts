/**
 * PLACEHOLDER CONTENT.
 *
 * Every string below is sample copy written to give the service-page template
 * realistic shape. It describes standard industry capabilities, not claims
 * about Zedventures: there are deliberately no metrics, client names, dates or
 * outcome numbers anywhere in this file, because those cannot be invented.
 *
 * A service listed in DRAFT_SERVICES (below) carries a visible draft banner and
 * a noindex robots tag, so its text cannot be indexed before it is replaced.
 * Analytics, SAP and GIS & Geospatial have been through the copy review and
 * are no longer listed. The four that remain still carry sample text.
 */


/**
 * The proof block on service detail pages.
 *
 * Off. Only three of the seven services have a case study behind them, so the
 * block appears on three pages and is absent from four - and the spec's
 * conditional rendering, while correct, makes that gap visible rather than
 * hiding it. Turned off until there is proof for every service, or until the
 * uneven version is judged better than none.
 *
 * Flip to true to bring it back everywhere it has data. The component and the
 * per-service `proof` records are left intact so that is a one-line change,
 * not a rebuild. Nothing else needs to move.
 */
export const SHOW_SERVICE_PROOF = false;

export type ServiceCapability = { title: string; desc: string };

/**
 * Icon for a technology group. A closed set rather than a free string: the
 * categories differ per service (Analytics has Business intelligence / Data
 * platforms / Cloud; SAP has Core platform / Extension / Integration), so an
 * open field would drift and a fixed three-icon list would only fit Analytics.
 */
export type TechIcon = "chart" | "cube" | "cloud" | "layers" | "plug" | "shield";

/**
 * Icon for a capability card.
 *
 * A closed set, like TechIcon, so a typo is a build error rather than a missing
 * glyph in production.
 *
 * The assignment lives in CAPABILITY_ICONS (below SERVICE_SLUGS) rather than on
 * the capability record, and it is POSITIONAL. That is deliberate: the
 * capabilities are the same six — or four — things in both locales, in the same
 * order, so an icon field on the record would have to be written twice per
 * capability and kept in sync by hand across roughly thirty-four of them. The
 * icon belongs to the capability, not to the translation.
 *
 * The cost is that reordering the English array without reordering the French
 * one silently reassigns icons. If capabilities ever stop being one-to-one
 * across locales, move the field onto ServiceCapability instead.
 */
/**
 * Engagement — the two independent decisions behind a delivery team.
 *
 * Exactly two groups: how much ZED owns, and where the people sit. They are
 * orthogonal, which is the whole reason they share one block — any operating
 * model can run with any team shape, and saying so is more useful than
 * describing either list twice.
 *
 * `common` marks the choice most engagements start from, at most one per
 * group. It is explained once by `closing` rather than badged on each row.
 */
export type EngagementBlock = {
  eyebrow: string;
  heading: string;
  sub: string;
  groups: {
    label: string;
    note: string;
    options: { title: string; body: string; common?: boolean }[];
  }[];
  /** One sentence tying the two columns together. Carries the red marker. */
  closing: string;
};

export type CapabilityIcon =
  | "compass"
  | "trending-up"
  | "arrow-left-right"
  | "dashboard"
  | "pie-chart"
  | "gauge"
  | "map"
  | "shield"
  | "map-pin"
  | "alert"
  | "satellite"
  | "plug"
  | "layers"
  | "sliders"
  | "cloud"
  | "server"
  | "blocks"
  | "sparkles"
  | "database"
  | "workflow"
  | "check"
  | "rocket"
  | "users"
  | "globe"
  | "clock"
  | "shuffle"
  | "messages";

/**
 * A linked case study. Index matches the order on /case-studies, which is where
 * the anchor ids come from.
 */
export type ServiceProof = {
  /** 1-based position in caseStudies.items — becomes #case-N. */
  index: number;
  /** The single figure worth putting on the service page. */
  headline: string;
};

export type ServiceContent = {
  name: string;
  /** One-line business outcome, not a feature list. */
  outcome: string;
  intro: string;
  problems: string[];
  capabilities: ServiceCapability[];
  technologies: string[];
  seoTitle: string;
  seoDescription: string;

  // ---------------------------------------------------------------------------
  // FIVE-QUESTION FRAMEWORK (optional, being trialled on Analytics)
  //
  // A service page answers five questions in the order a buyer asks them:
  //   1 am I in the right place        -> name + outcome        (already above)
  //   2 do they understand my situation-> situation             (new)
  //   3 can they actually do it        -> capabilities + tech   (already above)
  //   4 have they done it before       -> proof                 (new, optional)
  //   5 what happens if I get in touch -> shared, in i18n       (new)
  //
  // A service carrying `situation` renders the five-block layout. Anything
  // without it keeps the older seven-section template, so both can be compared
  // side by side on the live site before the other six are converted.
  // ---------------------------------------------------------------------------

  /**
   * The state a client is in before they call — their problem in our words,
   * not what we sell. 2-3 sentences. Replaces the `problems` bullet list, which
   * says the same thing twice alongside `intro`.
   */
  situation?: string;
  /** Omit entirely when this service has no case study. The block then does not render. */
  proof?: ServiceProof;

  // ---------------------------------------------------------------------------
  // SPEC v1.2 FIELDS
  //
  // A service carrying `whyPillars` renders the v1.2 six-section layout. The
  // rest keep the older template until their copy is written, so services
  // convert one at a time and can be compared live (spec S58).
  // ---------------------------------------------------------------------------

  /** 3-4 named groups, 8-12 entries in total (S21, S47). Replaces the flat
   *  `technologies` strip: an ungrouped list of ten product names tells a
   *  reader nothing about where the depth is. */
  technologyGroups?: { label: string; items: string[]; icon?: TechIcon }[];
  /** Per-service headings for the situation and capability sections. The
   *  shared wording ("Where organizations get stuck." / "What we help you
   *  do.") is right for most services and generic for the ones that have a
   *  sharper sentence available. Eyebrows stay shared — they label, and
   *  labels should not vary page to page. */
  situationHeading?: string;
  buildHeading?: string;
  /** Replaces the formula heading "Why ZED for <service>" with a sentence.
   *  Falls back to the formula, which is fine where nothing better exists. */
  whyHeading?: string;
  /** One positioning sentence under the Why ZED heading. <=25 words (S25). */
  whyIntro?: string;
  /** Exactly three, and they must differ from every other service's (S29). */
  whyPillars?: { title: string; body: string }[];

  /**
   * Hero image, right column.
   *
   * `src` is a real file under /public. While it is absent the hero renders a
   * labelled placeholder — but ONLY while this service is still a draft. Off
   * the draft list and with no src, the hero falls back to the single-column
   * text-led layout it had before. That is deliberate: a grey box cannot
   * reach production by being forgotten, which is the usual fate of a
   * placeholder that renders unconditionally.
   *
   * `alt` is required alongside `src` — a hero image with no alt text fails
   * the accessibility criteria this page is audited against.
   *
   * `hint` is the subject to shoot or source, shown inside the placeholder so
   * whoever fills it knows what belongs there.
   */
  heroImage?: { src: string; alt: string };
  heroImageHint?: string;

  /** Per-service intro line above the platform table. Falls back to the shared
   *  wording when absent, so SAP does not inherit Analytics' sentence. */
  platformsSub?: string;

  /**
   * Per-service eyebrow and heading for that same section.
   *
   * "Platforms we work with" is right for six of the seven and wrong for
   * Offshore & Nearshore, where the table lists a way of working rather than
   * software. Overriding the two labels is cheaper and less brittle than a
   * second component that renders the identical table under a different name.
   */
  platformsEyebrow?: string;
  platformsHeading?: string;

  /**
   * Engagement — how much we own and where the people sit, as one block.
   *
   * This was two fields and two sections. See engagement-model.tsx for what
   * the merge dropped and why. Only Offshore & Nearshore carries it; the
   * section does not render without it.
   *
   * [CONFIRM] The onsite option claims ZED can place engineers on a client
   * site in North America. Confirmed as real in conversation on 7 Sep. If that
   * stops being true the option comes out rather than being softened, which is
   * the rule that keeps named nearshore countries off this page.
   */
  engagement?: EngagementBlock;

  /**
   * Photographs of a real office.
   *
   * [CONFIRM] Two things before this can go live, and neither is a code
   * change. First, the group photograph shows identifiable employees, which
   * needs their agreement before it sits on a public marketing page. Second,
   * no city is named anywhere in this block — the copy says "India" only,
   * because that is what the rest of the site already claims and what these
   * photographs actually evidence.
   */
  photoBand?: {
    eyebrow: string;
    heading: string;
    sub: string;
    photos: { src: string; alt: string; caption: string }[];
  };

  /** Closing paragraph, replacing the shared "what happens next" line where a
   *  service can say something more specific about the first conversation. */
  finalCtaSub?: string;

  /**
   * Closing block headline and button.
   *
   * The headline is back. It was removed when the button beneath it read
   * "Discuss your analytics priorities" and the two were the same sentence
   * twice; the button now reads "Start a conversation", so they are not.
   */
  finalCta?: { title: string; buttonLabel: string };
};

export const SERVICE_SLUGS = [
  "ai-data",
  "analytics",
  "gis-geospatial",
  "guidewire",
  "sap",
  "product-engineering",
  "offshore-nearshore",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

/**
 * Capability icons, in the order the capabilities appear for each service.
 *
 * These label a heading that already says the thing; they are not information
 * of their own. Every card reads correctly with the badge ignored, which is why
 * the badge is aria-hidden in the template. Any glyph that would need
 * explaining — a chart standing in for "consistency", say — is the wrong one:
 * pick the literal icon, or the generic one.
 *
 * A list shorter than the service's capability array is not an error; the
 * template falls back to a neutral glyph rather than dropping the badge, so the
 * grid does not go ragged.
 */
export const CAPABILITY_ICONS: Record<ServiceSlug, readonly CapabilityIcon[]> = {
  analytics: ["compass", "trending-up", "arrow-left-right", "dashboard", "pie-chart", "gauge"],
  sap: ["server", "shield", "blocks", "dashboard", "plug", "sparkles"],
  "gis-geospatial": ["map", "database", "map-pin", "alert", "satellite", "plug"],
  "ai-data": ["messages", "workflow", "database", "plug"],
  guidewire: ["layers", "sliders", "trending-up", "cloud"],
  "product-engineering": ["blocks", "cloud", "check", "rocket"],
  "offshore-nearshore": ["users", "globe", "clock", "shuffle", "check", "plug"],
};

/**
 * Which service pages are still drafts.
 *
 * This was one boolean covering all seven. That is wrong once the seven stop
 * moving together: turning it off to publish one finished page would also
 * strip the noindex from six pages whose copy is, by the note at the top of
 * this file, explicitly sample text.
 *
 * A slug listed here carries the draft banner, a noindex robots tag, and the
 * hero image placeholder. Remove a slug only when its copy is real, its
 * technology claims are confirmed, and its hero image exists.
 *
 * Removing the LAST entry does not make the site launch-ready on its own —
 * every route in this app still declares a canonical URL on the old
 * screen-snap-magic-729.lovable.app domain.
 */
export const DRAFT_SERVICES: readonly ServiceSlug[] = [
  "ai-data",
  "guidewire",
  "product-engineering",
  "offshore-nearshore",
];

export function isServiceDraft(slug: ServiceSlug): boolean {
  return (DRAFT_SERVICES as readonly string[]).includes(slug);
}

/** Maps each capability row on the homepage to its service page. */
export const SERVICE_SLUG_BY_INDEX: ServiceSlug[] = [...SERVICE_SLUGS];

type Locale = "en" | "fr";

export const HOW_WE_WORK: Record<Locale, { step: string; desc: string }[]> = {
  en: [
    { step: "Strategy", desc: "Agree what the system has to do for the business before anything is built." },
    { step: "Architecture", desc: "Design for the load, the compliance boundary and the team that will run it." },
    { step: "Build", desc: "Ship in increments that reach a real environment, not a demo branch." },
    { step: "Modernize", desc: "Move what already exists without stopping the operation that depends on it." },
    { step: "Operate", desc: "Stay accountable for the system once it is carrying production traffic." },
  ],
  fr: [
    { step: "Stratégie", desc: "Définir ce que le système doit apporter à l'entreprise avant de construire quoi que ce soit." },
    { step: "Architecture", desc: "Concevoir en fonction de la charge, du périmètre de conformité et de l'équipe qui exploitera le système." },
    { step: "Développement", desc: "Livrer par incréments qui atteignent un environnement réel, pas une branche de démonstration." },
    { step: "Modernisation", desc: "Faire évoluer l'existant sans interrompre les opérations qui en dépendent." },
    { step: "Exploitation", desc: "Rester responsable du système une fois qu'il traite du trafic de production." },
  ],
};

export const SERVICE_PAGES: Record<Locale, Record<ServiceSlug, ServiceContent>> = {
  en: {
    "ai-data": {
      name: "AI & Data",
      heroImageHint: "A model or pipeline in use — not a stock robot or neural-network render",
      heroImage: {
        src: "/ai-data-hero.webp",
        alt: "An answer panel linked by three lines to three source documents, over a softly blurred office.",
      },
      outcome: "Get AI out of the proof-of-concept stage and into systems your business can depend on.",
      intro:
        "Plenty of enterprise AI gets as far as a good demo and stops there, because nobody will sign off on putting it in front of customers. Closing that gap is retrieval, orchestration and evaluation work — plus the data platform underneath it.",
      problems: [
        "A working prototype that nobody will approve for production use.",
        "Model answers that cannot be traced back to an approved source.",
        "Data spread across systems that were never designed to be read together.",
      ],
      capabilities: [
        { title: "LLM applications", desc: "Retrieval-augmented systems grounded in your own approved content, with guardrails and evaluation built in from the start." },
        { title: "Machine learning pipelines", desc: "Training, deployment and monitoring paths that survive contact with changing data." },
        { title: "Data platforms", desc: "Lakes, warehouses and ingestion designed around how the business asks questions." },
        { title: "Orchestration APIs", desc: "The authentication, conversation state and validation layer between a model and your users." },
      ],
      technologies: ["Azure OpenAI", "Azure AI Search", "Python", "Vector databases", "Databricks", "Airflow"],
      /**
       * [CONFIRM] PLACEHOLDER. Restructured from the copy already in this
       * file, not written from experience. The situation paragraph in
       * particular has to come from someone who has been in the room — that
       * is what it is for, and it is the reason the Analytics and SAP pages
       * read differently from a competitor's. This service stays in
       * DRAFT_SERVICES until it is replaced.
       */
      situation:
        "Most enterprise AI stops at a good demo. The prototype answers well in a meeting, then nobody will approve it for customers because no one can say where an answer came from, what it saw, or what it would do on a bad day. Meanwhile the data it needs sits across systems that were never designed to be read together.",
      technologyGroups: [
        { label: "Models and retrieval", icon: "chart", items: ["Azure OpenAI", "Azure AI Search", "Vector databases"] },
        { label: "Data platforms", icon: "cube", items: ["Databricks", "Airflow"] },
        { label: "Engineering", icon: "layers", items: ["Python"] },
      ],
      platformsSub:
        "We work with the AI and data platforms enterprise teams are already standardising on.",
      whyIntro:
        "We treat enterprise AI as a production systems problem, not a modelling one — the hard part is everything around the model.",
      whyPillars: [
        {
          title: "Built for approval, not for demos",
          body: "Retrieval, guardrails and evaluation are in from the first build, because they are what a risk owner asks about and what a prototype never has.",
        },
        {
          title: "The data platform underneath",
          body: "A model is only as good as what it can reach. We build the ingestion and storage as part of the work rather than assuming it exists.",
        },
        {
          title: "Accountable in production",
          body: "Monitoring, versioning and a path to change the system once real users are on it, not a handover at launch.",
        },
      ],
      finalCta: {
        title: "Let's talk about your AI and data priorities.",
        buttonLabel: "Start a conversation",
      },
      seoTitle: "AI & Data Consulting Services | Zed Ventures",
      seoDescription:
        "Zed Ventures builds enterprise AI and data platforms — retrieval-augmented applications, machine learning pipelines and orchestration built to run in production.",
    },
    analytics: {
      name: "Analytics",
      heroImageHint: "A real reporting or dashboard screen, blurred or anonymized if it is client work",
      heroImage: {
        src: "/analytics-hero.webp",
        // Describes what is shown, not what it means. "Illustrative" is not in
        // the alt text: the figures on the dashboard are generic and no client
        // is named, so the image does not claim to be a ZED result and the alt
        // text does not need to disclaim one.
        alt: "A laptop showing an analytics dashboard: a twelve-month sales trend charted by channel, above summary tiles for total sales, orders and average order value.",
      },
      // S7: the H1 states the outcome. v1.1 used "reporting that nobody
      // trusts", which S7 rejects as accusatory - the reader being blamed is
      // the person we want to hear from.
      outcome: "Turn fragmented reporting into trusted business decisions.",
      intro:
        "We help companies clean up complex reporting environments, modernize outdated tools, and make it easier for teams to trust and use their data. We look at how data moves from source systems into reports and dashboards, where manual workarounds or conflicting numbers have crept in, and what is slowing teams down. From there, we help simplify the environment so people spend less time questioning the data and more time using it to make decisions.",
      problems: [
        "Two teams reporting different numbers for the same measure.",
        "Reports assembled by hand every month because the pipeline never landed.",
        "Dashboards that answer questions nobody is asking.",
      ],
      // S12: the client's environment. No ZED, no product names, no selling.
      // The last sentence rejects the false solution - that is the line that
      // signals experience, and it names the situation rather than the reader.
      situation:
        "Reporting often grows over time, team by team. Different groups start using different numbers, manual workarounds creep in, and people spend more time checking the data than using it. Adding another dashboard usually doesn\u2019t solve the real problem underneath.",
      // S14: six capabilities, range 5-7. Managed support stays in the sales
      // conversation - nobody arrives here looking for the seventh thing we do.
      capabilities: [
        { title: "Analytics strategy & assessment", desc: "We review your current reporting setup, find the gaps, and help you decide what needs to change first. That includes looking at the tools, data sources, reports, processes, and pain points behind how information reaches the business today." },
        { title: "Platform upgrades", desc: "Upgrade older BI platforms without disrupting the reports and dashboards your teams rely on every day. We identify dependencies and compatibility issues early, plan the upgrade carefully, and test the reports and integrations that matter before anything moves into production." },
        { title: "Platform migration", desc: "Move from older or fragmented reporting tools to a more modern platform without losing what already works. We help determine what should move, what should be rebuilt, and what can be retired instead of carrying years of unnecessary reporting into the new environment." },
        { title: "Reporting & dashboard modernization", desc: "Simplify reports and dashboards so they are easier to use, easier to maintain, and more useful to the business. We also look for duplicate reports, inconsistent metrics, and unnecessary complexity that make it harder for users to find the answers they need." },
        { title: "Data visualization & UX", desc: "Make complex information easier to understand so users can quickly see what matters and what action to take. We design around the questions people are trying to answer, so dashboards feel less like collections of charts and more like useful decision-making tools." },
        { title: "Performance & data consistency", desc: "Improve slow reports, reduce conflicting numbers, and put clearer standards around how data is defined and used. We trace problems back through reports, models, queries, refresh processes, and data sources to fix the underlying issue instead of simply treating the symptom." },
      ],
      /**
       * [CONFIRM] 18 entries across 4 groups, added at Mayur's direction.
       *
       * This is over the spec's own ceiling. v1.2 S21 and S47 cap the section
       * at 8-12 total entries, and S20 requires that every name be one ZED can
       * substantiate with delivery experience. Six of these 18 appear on the
       * current live site: Power BI, Azure Data Factory, SQL Server,
       * Snowflake, dbt and Python. The other twelve do not.
       *
       * Recorded here rather than argued again: the risk is not the length,
       * it is that one unanswerable question on a sales call costs more than
       * the extra names win. Cut any that cannot be defended.
       */
      technologyGroups: [
        { label: "Business intelligence", icon: "chart", items: ["Power BI", "Tableau", "SAP BusinessObjects", "Google Looker", "Qlik Sense", "ThoughtSpot"] },
        { label: "Data platforms", icon: "cube", items: ["Snowflake", "Databricks", "Microsoft Fabric", "Google BigQuery", "Amazon Redshift"] },
        { label: "Cloud", icon: "cloud", items: ["Microsoft Azure", "Amazon Web Services", "Google Cloud Platform"] },
        { label: "Data engineering", icon: "layers", items: ["SQL Server", "Python", "Apache Spark", "Apache Airflow"] },
      ],
      // Kept so the legacy template still renders for any service that has not
      // been converted; the v1.2 layout reads technologyGroups instead.
      technologies: ["Power BI", "Azure Data Factory", "SQL Server", "Snowflake", "dbt", "Python"],
      platformsSub:
        "We work with the analytics and data platforms many enterprise teams already use today.",
      whyIntro:
        "We know analytics projects are not just about tools. They are about fixing the data, reporting, and processes people depend on every day.",
      whyPillars: [
        {
          title: "Modernize without starting over",
          body: "Not everything needs to be replaced. We help clients keep what is working, fix what is not, and modernize in practical steps.",
        },
        {
          title: "Business + technology",
          body: "We look at more than the platform. We spend time understanding the reports, metrics, users, and decisions the business actually depends on.",
        },
        {
          title: "From assessment to production",
          body: "We can help from the first review and roadmap through migration, implementation, performance tuning, and ongoing support.",
        },
      ],
      proof: { index: 3, headline: "Real-time visibility across every country" },
      finalCta: {
        title: "Let\u2019s talk about your analytics priorities.",
        buttonLabel: "Start a conversation",
      },
      seoTitle: "Analytics Consulting & Modernization Services | ZEDventures",
      seoDescription:
        "ZEDventures helps enterprises assess, modernize, migrate and optimize analytics environments across Power BI, SAP BusinessObjects and modern data platforms.",
    },
    "gis-geospatial": {
      name: "GIS & Geospatial",
      heroImageHint: "A map or spatial visualization from actual delivered work",
      heroImage: {
        src: "/gis-hero.webp",
        alt: "A map and chart panel joined by lines to six surrounding cards representing data sources on one side and business teams on the other, over a softly blurred office.",
      },
      // Headline kept, not replaced. The clearer alternative — "Make location
      // part of how your business makes decisions" — could sit on any of the
      // four competitor sites reviewed. This one takes a position against what
      // most GIS firms sell, which is the whole test.
      outcome: "Make location a dimension your business can analyze, not a map you look at.",
      intro:
        "We connect geospatial data with the systems, workflows, and analytics your business already uses\u2014so location becomes part of everyday decision-making, not a separate mapping exercise owned by a small group of specialists.",
      problems: [
        "Spatial data held in a system only one team can query.",
        "Exposure and risk assessed on addresses rather than actual geography.",
        "Imagery and sensor data arriving faster than anything can process it.",
      ],
      situation:
        "Useful spatial data ends up spread across systems, teams, files and applications. The GIS team knows where the assets, customers, facilities and risks are, but that knowledge does not reach the people making operational and commercial decisions \u2014 so location stays an interesting map rather than an input to anything.",
      capabilities: [
        {
          title: "Enterprise GIS",
          desc: "Build GIS as a shared capability rather than a team's tool. Geospatial platforms that make trusted location data available across teams, applications and workflows.",
        },
        {
          title: "Spatial data & governance",
          desc: "Organize spatial data, improve its quality, set standards and establish clear ownership, so teams work from information they can rely on.",
        },
        {
          title: "Location analytics",
          desc: "Combine spatial data with operational and business data to understand patterns, coverage, demand and risk \u2014 location as another dimension of analysis.",
        },
        {
          title: "Risk & exposure analysis",
          desc: "Use geography to evaluate exposure around facilities, assets, customers, infrastructure and supply chains, and to see where risk is concentrated.",
        },
        {
          title: "Field data & imagery",
          desc: "Capture location, asset, sensor, imagery and inspection data in the field and make it available to operational teams without a manual step in the middle.",
        },
        {
          title: "GIS modernization & integration",
          desc: "Upgrade legacy environments, move the right workloads to cloud, and integrate GIS with the systems the business already runs \u2014 without creating another silo.",
        },
      ],
      /**
       * [CONFIRM] Four groups, eleven entries — inside the spec's 3-4 groups
       * and 8-12 range.
       *
       * The content review proposed six groups and roughly nineteen entries,
       * adding Databricks, Snowflake, GeoServer, GDAL, AWS, Power BI and
       * "Web GIS". None of those were taken: the same review warns against
       * listing technologies to match competitors, and none of them appears
       * on the current live site. What was added is ArcGIS Enterprise and
       * ArcGIS Pro (naming the ArcGIS already listed more precisely) and
       * PostgreSQL, which PostGIS runs on. Confirm those or cut them.
       */
      technologyGroups: [
        { label: "GIS platforms", icon: "layers", items: ["ArcGIS Enterprise", "ArcGIS Pro", "QGIS"] },
        { label: "Spatial data", icon: "cube", items: ["PostGIS", "PostgreSQL", "Apache Sedona"] },
        { label: "Imagery & analysis", icon: "chart", items: ["GeoPandas", "Google Earth Engine"] },
        { label: "Cloud & integration", icon: "cloud", items: ["Microsoft Azure", "Python", "REST APIs"] },
      ],
      technologies: ["PostGIS", "ArcGIS", "QGIS", "GeoPandas", "Google Earth Engine", "Apache Sedona"],
      platformsSub:
        "We work across commercial, open-source, cloud and analytics platforms, choosing what fits the environment rather than forcing the environment to fit a tool.",
      whyIntro:
        "We treat geospatial technology as part of the enterprise architecture, not as a separate mapping environment.",
      whyPillars: [
        {
          title: "GIS + enterprise data",
          body: "We connect spatial information with operational, financial, asset and customer data, so location can be analysed alongside everything else that matters rather than on its own.",
        },
        {
          title: "Built for operations",
          body: "Where is risk concentrated? Which assets need attention? Where is coverage weak? GIS becomes a way to answer business questions, not a way to produce maps.",
        },
        {
          title: "From field to enterprise",
          body: "Field data, sensors, imagery, spatial databases, applications and reporting connected as one flow, so information is not re-created at every step.",
        },
      ],
      finalCta: {
        title: "Have a location problem hiding inside a business problem?",
        buttonLabel: "Start a conversation",
      },
      seoTitle: "GIS & Geospatial Solutions | Zed Ventures",
      seoDescription:
        "Zed Ventures builds geospatial systems — spatial data platforms, exposure mapping, imagery-based risk assessment and location analytics for enterprise use.",
    },
    guidewire: {
      name: "Guidewire",
      heroImageHint: "A policy or claims workflow screen",
      outcome: "Move PolicyCenter, BillingCenter and ClaimCenter forward without stopping the business on them.",
      intro:
        "Claims still have to be paid while you upgrade. Everything about how we sequence an implementation, a version move or a cloud migration follows from that one constraint.",
      problems: [
        "An upgrade deferred so long that the version gap is now the project.",
        "Configuration drift nobody has a full picture of.",
        "A cloud migration with no plan for the integrations hanging off the edges.",
      ],
      capabilities: [
        { title: "Implementation", desc: "PolicyCenter, BillingCenter and ClaimCenter delivered against real underwriting and claims process." },
        { title: "Configuration", desc: "Product model and rules work, documented so the next team can follow it." },
        { title: "Upgrades", desc: "Version moves planned around the customisation that actually exists, not the vanilla product." },
        { title: "Cloud migration", desc: "Getting to Guidewire Cloud with the integration surface intact." },
      ],
      technologies: ["PolicyCenter", "BillingCenter", "ClaimCenter", "Gosu", "Guidewire Cloud", "REST integrations"],
      /**
       * [CONFIRM] PLACEHOLDER. Restructured from the copy already in this
       * file, not written from experience. The situation paragraph in
       * particular has to come from someone who has been in the room — that
       * is what it is for, and it is the reason the Analytics and SAP pages
       * read differently from a competitor's. This service stays in
       * DRAFT_SERVICES until it is replaced.
       */
      situation:
        "Claims still have to be paid while the platform is worked on. Configuration has drifted over the years, nobody holds a full picture of it, and an upgrade deferred long enough stops being an upgrade and becomes the project. The integrations hanging off the edges are usually what makes it hard.",
      technologyGroups: [
        { label: "Guidewire suite", icon: "layers", items: ["PolicyCenter", "BillingCenter", "ClaimCenter"] },
        { label: "Platform", icon: "cube", items: ["Guidewire Cloud", "Gosu"] },
        { label: "Integration", icon: "plug", items: ["REST integrations"] },
      ],
      platformsSub:
        "We work across the Guidewire suite and the integration surface around it.",
      whyIntro:
        "We sequence Guidewire work around the one constraint that does not move: the business keeps running on it while we work.",
      whyPillars: [
        {
          title: "Insurance domain understanding",
          body: "Underwriting and claims process first, product model second. Configuration decisions follow from how the business actually works.",
        },
        {
          title: "Platform and integration expertise",
          body: "The suite and the systems around it. Most of the difficulty in a Guidewire programme lives at the edges, not in the core.",
        },
        {
          title: "Implementation through production",
          body: "Planned around the customisation that exists rather than the vanilla product, and accountable after go-live.",
        },
      ],
      finalCta: {
        title: "Let's talk about your Guidewire programme.",
        buttonLabel: "Start a conversation",
      },
      seoTitle: "Guidewire Consulting Services | Zed Ventures",
      seoDescription:
        "Zed Ventures delivers Guidewire implementation, configuration, upgrades and cloud migration across PolicyCenter, BillingCenter and ClaimCenter.",
    },
    sap: {
      name: "SAP",
      heroImageHint: "An SAP module screen, or a rollout workshop in progress",
      heroImage: {
        src: "/sap-hero.webp",
        alt: "A manufacturing floor and loading dock, overlaid with a five-step process flow: plan, produce, manage, deliver, grow.",
      },
      // S7: outcome, not the service name, and not accusatory. The client is
      // not being blamed for the customisation they inherited.
      outcome: "Modernize SAP without disrupting the business it runs.",
      // Mayur's words. 85 against the spec's 40-word hero guideline, kept as
      // written: the middle sentence — what should move, what should change,
      // what no longer needs carrying forward — is the judgement being sold,
      // and it is the part a competitor could not have written.
      intro:
        "ZEDventures helps organizations move to S/4HANA, build extensions on BTP, and create better user experiences with Fiori\u2014without rebuilding years of complexity in the new environment. We look carefully at what should move, what should change, and what no longer needs to be carried forward. By keeping customizations away from the core wherever possible, we leave clients with an SAP environment that is easier to maintain, easier to upgrade, and better prepared for what comes next.",
      problems: [
        "Customisation in the core that now blocks every upgrade.",
        "Integrations built point-to-point until nobody can map them.",
        "AI pilots that cannot see live ERP data, so they stay pilots.",
      ],
      /**
       * Mayur's words, not drafted. This is the one section on a service page
       * that cannot be produced from a service description, and the only one a
       * competitor could not have written — it exists to show someone has been
       * in the room.
       *
       * Two paragraphs, separated by a blank line. Longer than the spec's
       * 60-word guideline and kept that way: the second paragraph is the
       * consequence, and the first does not land without it.
       */
      situation:
        "The system was fitted to the business years ago, and every fit was a change to the core. Over time, custom reports, integrations, workarounds, and business rules pile up. The people who built them move on, documentation falls behind, and no one is completely sure what will break when something changes.\n\nUpgrades become bigger than they should be. Testing takes longer, integrations need rework, and each change uncovers another dependency. So upgrades get deferred, technical debt grows, and the platform becomes something the business depends on\u2014but nobody wants to touch.",
      // Mayur's words. Roughly 50 words per entry against the spec's 20-word
      // guideline — see the note on the SAP page length in this file's header
      // comment. Each one says what the work involves rather than naming it,
      // which is the difference between a capability list and a menu.
      capabilities: [
        {
          title: "S/4HANA migration",
          desc: "Move to S/4HANA with a clear plan for what should migrate, what should change, and what should be left behind. We focus on simplifying the environment during the move so the new platform is easier to maintain and can keep taking future upgrades.",
        },
        {
          title: "Clean-core remediation",
          desc: "Years of customization can make even routine SAP upgrades difficult. We identify the custom logic that is creating those dependencies and move it out of the core where practical, while protecting the business processes and functionality teams rely on every day.",
        },
        {
          title: "BTP extensions",
          desc: "Build new capabilities on SAP BTP instead of adding more custom code to the ERP core. We use side-by-side extensions to support business-specific requirements while keeping S/4HANA cleaner, easier to maintain, and better prepared for future releases.",
        },
        {
          title: "Fiori applications",
          desc: "Build Fiori experiences around how people actually perform their work, rather than simply putting a new interface on an old process. We simplify screens, steps, and workflows so users can get to the information and actions they need faster.",
        },
        {
          title: "Integration & interfaces",
          desc: "SAP rarely operates on its own. We help simplify and modernize the connections between SAP and the applications, data platforms, partners, and services around it\u2014reducing brittle point-to-point integrations and making interfaces easier to understand, support, and change.",
        },
        {
          title: "SAP-grounded AI",
          desc: "Bring AI into SAP workflows with governed access to real enterprise context rather than relying on copied or disconnected data. We focus on practical use cases where AI can help users find information, understand business activity, and take action while respecting existing access controls.",
        },
      ],
      /**
       * [CONFIRM] Same rule as Analytics: only platforms ZED can substantiate.
       * These six are the stack already named on the live site; nothing has
       * been added to lengthen the list.
       */
      technologyGroups: [
        {
          label: "Core platform",
          icon: "layers",
          // Chip labels are short forms. The full names — "ABAP RESTful
          // Application Programming Model", "Core Data Services",
          // "SAP S/4HANA Cloud, public and private edition" — are correct but
          // three to six words each, and a chip is a label rather than a
          // glossary entry: one long name forces the row to two lines and
          // makes the shorter names beside it look like lesser claims.
          items: [
            "SAP S/4HANA",
            "S/4HANA Cloud",
            "SAP HANA",
            "ABAP",
            "ABAP RAP",
            "CDS views",
            "Fiori",
          ],
        },
        { label: "Extension", icon: "cube", items: ["SAP BTP", "CAP", "OData"] },
        { label: "Integration", icon: "plug", items: ["SAP Integration Suite", "Microsoft Azure"] },
      ],
      technologies: ["S/4HANA", "SAP BTP", "Fiori", "CAP", "ABAP", "OData"],
      whyIntro:
        "We treat SAP as a business process that happens to run on software, and keep the core clean enough that the next upgrade is routine.",
      whyPillars: [
        {
          title: "Business process + technology",
          body: "We start from what the process has to do and what the business cannot afford to stop, then decide what the system change should be — not the other way round.",
        },
        {
          title: "Operational continuity",
          body: "The system is carrying live operations while we work on it. Migration and remediation are sequenced so the business keeps running through the change.",
        },
        {
          title: "Clean core, kept clean",
          body: "Extensions go beside the core, not inside it, and we document the boundary so it survives the people who drew it.",
        },
      ],
      seoTitle: "SAP Consulting, S/4HANA Migration & BTP Engineering | ZEDventures",
      seoDescription:
        "ZEDventures delivers SAP S/4HANA migration, clean-core remediation, BTP extension and Fiori engineering, keeping the core upgradeable after the project ends.",
    },
    "product-engineering": {
      name: "Product Engineering",
      heroImageHint: "Engineers working — a real team, not a stock photo of laptops",
      outcome: "Ship software on a date you can commit to in front of a customer.",
      intro:
        "Full-cycle delivery from architecture through QA, run by people who stay accountable after the release rather than handing over a repository.",
      problems: [
        "A roadmap that slips because the architecture cannot absorb the next feature.",
        "Quality checked at the end, when fixing anything is most expensive.",
        "Teams delivering code but not the operational readiness around it.",
      ],
      capabilities: [
        { title: "Architecture", desc: "Designs sized for the load and the team that has to maintain them." },
        { title: "Cloud-native development", desc: "Services built for the platform they run on rather than lifted onto it." },
        { title: "Quality engineering", desc: "Testing built into the pipeline instead of appended to the schedule." },
        { title: "Release and operations", desc: "Deployment, observability and the on-call reality that follows a launch." },
      ],
      technologies: ["TypeScript", "React", "Node.js", "Python", "Kubernetes", "Terraform"],
      /**
       * [CONFIRM] PLACEHOLDER. Restructured from the copy already in this
       * file, not written from experience. The situation paragraph in
       * particular has to come from someone who has been in the room — that
       * is what it is for, and it is the reason the Analytics and SAP pages
       * read differently from a competitor's. This service stays in
       * DRAFT_SERVICES until it is replaced.
       */
      situation:
        "The roadmap slips because the architecture cannot absorb the next feature, and quality gets checked at the end, when fixing anything is most expensive. Teams ship code without the operational readiness around it, so the release is the start of the problem rather than the end of the work.",
      technologyGroups: [
        { label: "Application", icon: "layers", items: ["TypeScript", "React", "Node.js"] },
        { label: "Services and data", icon: "cube", items: ["Python"] },
        { label: "Platform", icon: "cloud", items: ["Kubernetes", "Terraform"] },
      ],
      platformsSub:
        "We work with the languages and platforms enterprise product teams run on today.",
      whyIntro:
        "We stay accountable after the release rather than handing over a repository, which changes how the architecture gets decided in the first place.",
      whyPillars: [
        {
          title: "Product thinking and engineering",
          body: "We ask what the software has to do for the business before deciding what to build, so the architecture serves the roadmap rather than constraining it.",
        },
        {
          title: "Architecture built to scale",
          body: "Sized for the load it will carry and for the team that has to maintain it after we leave.",
        },
        {
          title: "Build through operations",
          body: "Testing in the pipeline, observability at launch, and the on-call reality that follows it.",
        },
      ],
      finalCta: {
        title: "Let's talk about your product roadmap.",
        buttonLabel: "Start a conversation",
      },
      seoTitle: "Product Engineering Services | Zed Ventures",
      seoDescription:
        "Zed Ventures provides full-cycle product engineering — architecture, cloud-native development, quality engineering and release operations for enterprise software.",
    },
    "offshore-nearshore": {
      name: "Offshore & Nearshore Delivery",
      heroImageHint:
        "One workstream moving through a distributed team — connected work, not a map of countries",
      heroImage: {
        src: "/offshore-hero.webp",
        alt: "Two colleagues working together at a laptop in a bright office, with two labelled cards — North America, client engagement, and India, engineering and delivery — joined by a thin line.",
      },
      outcome: "Add engineering capacity without adding coordination overhead.",
      intro:
        "Build the delivery model around the work. Use India for engineering depth and scale, nearshore teams when working-hour overlap matters, or combine both under one accountable engagement.",
      problems: [
        "Hiring timelines that do not match the delivery date.",
        "Distributed teams losing a day to every question.",
        "Vendor teams that never absorb enough context to work independently.",
      ],
      /**
       * Six, replacing the four this page carried as sample copy. No numerals:
       * the spec asked for "01 —" prefixes, but numbers came off site-wide and
       * one numbered page among seven reads as an oversight, not a decision.
       */
      capabilities: [
        {
          title: "Dedicated engineering teams",
          desc: "Build stable teams around your products, platforms or programs rather than rotating resources from project to project.",
        },
        {
          title: "Offshore delivery",
          desc: "Use India-based engineering capability for development, QA, integration, modernization and long-running delivery work where depth and scale matter.",
        },
        {
          title: "Nearshore delivery",
          desc: "Place work that benefits from stronger working-hour overlap with teams across compatible Americas time zones.",
        },
        {
          title: "Blended delivery",
          desc: "Combine client-facing, nearshore and offshore roles based on the needs of each workstream rather than forcing the entire engagement into one model.",
        },
        {
          title: "Managed delivery",
          desc: "Give ZED responsibility for planning, engineering execution, quality, reporting and delivery — not simply supplying individual resources.",
        },
        {
          title: "Team extension",
          desc: "Add specialized engineers into your existing tools, backlog and delivery rituals while keeping your internal team in control of priorities.",
        },
      ],
      technologies: ["Distributed delivery", "Agile delivery", "Embedded QA", "Shared tooling", "Delivery ownership", "Knowledge retention"],
      buildHeading: "Build the delivery model around the work.",
      /**
       * No `situation` and no `situationHeading`. The section was removed from
       * this page at Mayur's direction; the template skips it entirely rather
       * than rendering an empty band under the shared heading.
       *
       * The other six keep theirs. The text that was here is in git — commit
       * 28db711 — if it comes back.
       */
      /**
       * The same table component the other six use, under different labels.
       * Four rows, four tones — the tone list is exactly four long, so this is
       * the one service where every accent appears once.
       */
      platformsEyebrow: "Delivery model",
      platformsHeading: "One team. Different locations.",
      platformsSub:
        "We use the same engineering standards, tools and governance across the engagement. Geography changes where work happens — not how delivery is managed.",
      technologyGroups: [
        {
          label: "Delivery model",
          icon: "layers",
          items: ["Dedicated teams", "Managed delivery", "Team extension", "Blended delivery"],
        },
        {
          label: "Collaboration",
          icon: "cube",
          items: ["Shared backlog", "Agile delivery", "Embedded QA", "Common tooling"],
        },
        {
          label: "Governance",
          icon: "shield",
          items: ["Delivery ownership", "Status visibility", "Risk management", "Dependency management"],
        },
        {
          label: "Continuity",
          icon: "plug",
          items: ["Time-zone overlap", "Structured handoffs", "Knowledge retention"],
        },
      ],
      engagement: {
        eyebrow: "Engagement",
        heading: "Shape the engagement around the work.",
        sub: "Two decisions, and they are independent — any operating model can run with any team shape.",
        groups: [
          {
            label: "How much we own",
            note: "Who carries responsibility for delivery.",
            options: [
              {
                title: "Team extension",
                body: "You lead. Our engineers work inside your team, tools and process; ownership stays with you. Suits teams with strong internal delivery leadership.",
              },
              {
                title: "Dedicated team",
                body: "A consistent team works against your roadmap, with defined technical and delivery leadership. Suits sustained capacity around a product or platform.",
                common: true,
              },
              {
                title: "Managed delivery",
                body: "You define the outcome; we take responsibility for planning, execution, quality and delivery against an agreed scope.",
              },
            ],
          },
          {
            label: "Where the people sit",
            note: "Where the work actually happens.",
            options: [
              {
                title: "Pure offshore",
                body: "Delivered end to end from India. Suits work that is well specified and does not need daily real-time contact to move forward.",
              },
              {
                title: "Hybrid",
                body: "People close to you where collaboration decides the outcome, with engineering depth in India behind them.",
                common: true,
              },
              {
                title: "Pure onsite",
                body: "In the room with your team, for work that has to happen in person — discovery, workshops, cutover and go-live.",
              },
            ],
          },
        ],
        closing:
          "Most engagements begin as a dedicated team on a hybrid shape, and move from there as the work changes.",
      },
      whyHeading: "Distributed delivery without distributed accountability.",
      whyIntro:
        "We build distributed teams around ownership and continuity — not around filling seats.",
      whyPillars: [
        {
          title: "Integrated teams, not staffing",
          body: "Engineers work inside your tools, delivery rhythms and technical environment long enough to understand the context behind the work.",
        },
        {
          title: "Accountability stays with ZED",
          body: "We stay involved in execution, risks, quality and escalation — not just resource placement.",
        },
        {
          title: "Geography follows the work",
          body: "Use India for engineering depth and scale, nearshore capability where collaboration overlap matters, and combine them when the engagement needs both.",
        },
      ],
      /**
       * Two frames, not three. The third was a photograph of a roll-up
       * banner carrying the previous logo lockup — navy circle, script
       * "Measure What Matters" — while the header, footer and favicon on
       * this same page use the current flat mark. A visitor reads the
       * photograph as the real one, so the page was publishing two brands.
       * It was also the only frame showing collateral rather than people or
       * a workplace, in the one section on the page that exists to be
       * evidence. A third frame needs a third real photograph.
       */
      photoBand: {
        eyebrow: "Delivery centre",
        heading: "The India team.",
        sub: "Engineering depth and scale, in one place, working to the same standards as the rest of the engagement.",
        photos: [
          {
            src: "/delivery-team.webp",
            alt: "Eleven members of the ZEDventures engineering team together in a meeting room.",
            caption: "The engineering team.",
          },
          {
            src: "/delivery-floor.webp",
            alt: "The engineering floor seen through a glass wall, with shared desks and daylight from the windows beyond.",
            caption: "The engineering floor.",
          },
        ],
      },
      finalCta: {
        title: "Let's talk about your delivery capacity.",
        buttonLabel: "Start a conversation",
      },
      finalCtaSub:
        "Tell us where delivery is constrained — skills, hiring speed, cost, time-zone coverage or execution capacity. We'll help determine which work belongs nearshore, offshore or across a blended team.",
      seoTitle: "Offshore & Nearshore Software Delivery Services | ZEDventures",
      seoDescription:
        "Scale engineering delivery with integrated offshore, nearshore and blended teams. ZEDventures provides dedicated engineering teams, managed delivery and flexible global delivery models.",
    },
  },

  fr: {
    "ai-data": {
      name: "IA et données",
      heroImageHint: "Un modèle ou un pipeline en usage réel — ni robot ni réseau de neurones de banque d'images",
      heroImage: {
        src: "/ai-data-hero.webp",
        alt: "Un panneau de réponse relié par trois traits à trois documents sources, sur un bureau flouté.",
      },
      outcome: "Faire passer l'IA du prototype à des systèmes sur lesquels l'entreprise peut compter.",
      intro:
        "Beaucoup de projets d'IA en entreprise atteignent le stade d'une bonne démonstration et s'arrêtent là, faute de quelqu'un prêt à la mettre devant des clients. Combler cet écart, c'est un travail de recherche, d'orchestration et d'évaluation — et la plateforme de données en dessous.",
      problems: [
        "Un prototype fonctionnel que personne n'autorise en production.",
        "Des réponses de modèle impossibles à rattacher à une source approuvée.",
        "Des données réparties dans des systèmes jamais conçus pour être lus ensemble.",
      ],
      capabilities: [
        { title: "Applications LLM", desc: "Systèmes à génération augmentée par recherche, ancrés dans vos contenus approuvés, avec garde-fous et évaluation dès le départ." },
        { title: "Pipelines d'apprentissage automatique", desc: "Entraînement, déploiement et surveillance qui résistent à l'évolution des données." },
        { title: "Plateformes de données", desc: "Lacs, entrepôts et ingestion conçus selon les questions que pose réellement l'entreprise." },
        { title: "API d'orchestration", desc: "La couche d'authentification, d'état conversationnel et de validation entre un modèle et vos utilisateurs." },
      ],
      technologies: ["Azure OpenAI", "Azure AI Search", "Python", "Bases vectorielles", "Databricks", "Airflow"],
      situation:
        "La plupart des projets d'IA en entreprise s'arrêtent à une bonne démonstration. Le prototype répond bien en réunion, puis personne ne veut l'exposer aux clients : nul ne peut dire d'où vient une réponse, ce que le modèle a consulté, ni ce qu'il ferait un mauvais jour. Pendant ce temps, les données nécessaires restent éparpillées dans des systèmes jamais conçus pour être lus ensemble.",
      technologyGroups: [
        { label: "Modèles et recherche", icon: "chart", items: ["Azure OpenAI", "Azure AI Search", "Bases vectorielles"] },
        { label: "Plateformes de données", icon: "cube", items: ["Databricks", "Airflow"] },
        { label: "Ingénierie", icon: "layers", items: ["Python"] },
      ],
      platformsSub:
        "Nous travaillons avec les plateformes d'IA et de données que les entreprises adoptent aujourd'hui.",
      whyIntro:
        "Nous traitons l'IA d'entreprise comme un problème de système en production, pas de modélisation : le plus difficile est tout ce qui entoure le modèle.",
      whyPillars: [
        {
          title: "Conçu pour être validé, pas démontré",
          body: "Recherche documentaire, garde-fous et évaluation dès la première version : c'est ce que demande un responsable des risques, et ce qu'un prototype n'a jamais.",
        },
        {
          title: "La plateforme de données en dessous",
          body: "Un modèle ne vaut que ce qu'il peut atteindre. L'ingestion et le stockage font partie du travail, pas d'une hypothèse.",
        },
        {
          title: "Responsables en production",
          body: "Supervision, versionnage et capacité à faire évoluer le système une fois de vrais utilisateurs dessus — pas une passation au lancement.",
        },
      ],
      finalCta: {
        title: "Parlons de vos priorités en IA et données.",
        buttonLabel: "Démarrer la conversation",
      },
      seoTitle: "Services-conseils en IA et données | Zed Ventures",
      seoDescription:
        "Zed Ventures conçoit des plateformes d'IA et de données d'entreprise — applications à recherche augmentée, pipelines d'apprentissage automatique et orchestration prêtes pour la production.",
    },
    analytics: {
      name: "Analytique",
      heroImageHint: "Un véritable écran de reporting ou tableau de bord, flouté si nécessaire",
      heroImage: {
        src: "/analytics-hero.webp",
        alt: "Un ordinateur portable affichant un tableau de bord analytique : une tendance des ventes sur douze mois par canal, au-dessus d'indicateurs de ventes totales, de commandes et de panier moyen.",
      },
      outcome: "Transformer des rapports fragmentés en décisions fiables.",
      intro:
        "Nous aidons les entreprises à assainir des environnements de reporting complexes, à moderniser des outils vieillissants et à rendre leurs données plus faciles à utiliser et à croire. Nous regardons comment la donnée circule des systèmes sources jusqu'aux rapports et tableaux de bord, où les contournements manuels et les chiffres contradictoires se sont installés, et ce qui ralentit les équipes. À partir de là, nous simplifions l'environnement : moins de temps à douter des chiffres, plus de temps à décider.",
      problems: [
        "Deux équipes qui publient des chiffres différents pour la même mesure.",
        "Des rapports assemblés à la main chaque mois faute de pipeline.",
        "Des tableaux de bord qui répondent à des questions que personne ne pose.",
      ],
      situation:
        "Le reporting se construit avec le temps, équipe par équipe. Chaque groupe finit par utiliser ses propres chiffres, les contournements manuels s'installent, et l'on passe plus de temps à vérifier les données qu'à s'en servir. Ajouter un tableau de bord de plus ne règle généralement pas le problème de fond.",
      capabilities: [
        { title: "Stratégie et évaluation analytique", desc: "Nous examinons votre dispositif de reporting actuel, repérons les écarts et vous aidons à décider par quoi commencer. Cela couvre les outils, les sources, les rapports, les processus et les irritants qui façonnent la manière dont l'information parvient au métier aujourd'hui." },
        { title: "Montées de version", desc: "Faire évoluer des plateformes décisionnelles anciennes sans perturber les rapports dont vos équipes se servent chaque jour. Nous identifions tôt les dépendances et les incompatibilités, planifions la montée de version et testons les rapports et intégrations qui comptent avant tout passage en production." },
        { title: "Migration de plateforme", desc: "Quitter des outils anciens ou éparpillés pour une plateforme plus moderne, sans perdre ce qui fonctionne déjà. Nous déterminons ce qui doit être repris, ce qui doit être reconstruit et ce qui peut être abandonné, plutôt que de transporter des années de reporting inutile." },
        { title: "Modernisation du reporting", desc: "Simplifier rapports et tableaux de bord pour qu'ils soient plus faciles à utiliser, à maintenir et plus utiles au métier. Nous repérons aussi les doublons, les indicateurs incohérents et la complexité superflue qui empêchent les utilisateurs de trouver leurs réponses." },
        { title: "Visualisation et expérience", desc: "Rendre une information complexe plus lisible, pour voir vite ce qui compte et ce qu'il faut en faire. Nous concevons autour des questions que se posent les utilisateurs : un tableau de bord devient un outil de décision plutôt qu'une collection de graphiques." },
        { title: "Performance et cohérence des données", desc: "Accélérer les rapports lents, réduire les chiffres contradictoires et clarifier la façon dont les données sont définies et utilisées. Nous remontons la chaîne — rapports, modèles, requêtes, rafraîchissements, sources — pour corriger la cause plutôt que le symptôme." },
      ],
      technologyGroups: [
        { label: "Décisionnel", icon: "chart", items: ["Power BI", "Tableau", "SAP BusinessObjects", "Google Looker", "Qlik Sense", "ThoughtSpot"] },
        { label: "Plateformes de données", icon: "cube", items: ["Snowflake", "Databricks", "Microsoft Fabric", "Google BigQuery", "Amazon Redshift"] },
        { label: "Cloud", icon: "cloud", items: ["Microsoft Azure", "Amazon Web Services", "Google Cloud Platform"] },
        { label: "Ingénierie des données", icon: "layers", items: ["SQL Server", "Python", "Apache Spark", "Apache Airflow"] },
      ],
      technologies: ["Power BI", "Azure Data Factory", "SQL Server", "Snowflake", "dbt", "Python"],
      platformsSub:
        "Nous travaillons avec les plateformes analytiques et de données que beaucoup d'équipes utilisent déjà.",
      whyIntro:
        "Un projet analytique ne se résume pas aux outils. Il s'agit de réparer les données, le reporting et les processus dont les équipes dépendent chaque jour.",
      whyPillars: [
        {
          title: "Moderniser sans tout reprendre",
          body: "Tout n'a pas besoin d'être remplacé. Nous gardons ce qui fonctionne, corrigeons ce qui ne va plus, et modernisons par étapes concrètes.",
        },
        {
          title: "Métier et technologie",
          body: "Nous regardons au-delà de la plateforme : les rapports, les indicateurs, les utilisateurs et les décisions dont l'entreprise dépend réellement.",
        },
        {
          title: "De l'évaluation à la production",
          body: "Nous accompagnons depuis le premier diagnostic et la feuille de route jusqu'à la migration, la mise en œuvre, l'optimisation et le support.",
        },
      ],
      proof: { index: 3, headline: "Visibilité en temps réel sur tous les pays" },
      finalCta: {
        title: "Parlons de vos priorités analytiques.",
        buttonLabel: "Démarrer la conversation",
      },
      seoTitle: "Conseil et modernisation analytique | ZEDventures",
      seoDescription:
        "ZEDventures aide les entreprises à évaluer, moderniser, migrer et optimiser leurs environnements analytiques : Power BI, SAP BusinessObjects et plateformes de données modernes.",
    },
    "gis-geospatial": {
      name: "SIG et géomatique",
      heroImageHint: "Une carte ou visualisation spatiale issue d'un projet livré",
      heroImage: {
        src: "/gis-hero.webp",
        alt: "Un panneau carte et graphiques relié par des traits à six cartes autour : sources de données d'un côté, équipes métier de l'autre, sur un bureau flouté.",
      },
      outcome: "Faire de la localisation une dimension analysable, pas une carte que l'on regarde.",
      intro:
        "Nous relions la donnée géospatiale aux systèmes, aux processus et à l'analytique que votre entreprise utilise déjà \u2014 pour que la localisation entre dans les décisions quotidiennes, au lieu de rester un exercice cartographique réservé à quelques spécialistes.",
      problems: [
        "Des données spatiales dans un système qu'une seule équipe sait interroger.",
        "Exposition et risque évalués sur des adresses plutôt que sur la géographie réelle.",
        "Imagerie et capteurs qui arrivent plus vite qu'on ne peut les traiter.",
      ],
      situation:
        "Les données spatiales utiles finissent dispersées entre systèmes, équipes, fichiers et applications. L'équipe SIG sait où se trouvent les actifs, les clients, les sites et les risques, mais cette connaissance n'atteint pas ceux qui décident \u2014 la localisation reste une carte intéressante plutôt qu'une donnée d'entrée.",
      capabilities: [
        {
          title: "SIG d'entreprise",
          desc: "Faire du SIG une capacité partagée plutôt que l'outil d'une équipe : des plateformes qui rendent la donnée de localisation disponible à travers les équipes, les applications et les processus.",
        },
        {
          title: "Données spatiales et gouvernance",
          desc: "Organiser les données spatiales, en améliorer la qualité, poser des standards et clarifier les responsabilités, pour que chacun travaille sur une information fiable.",
        },
        {
          title: "Analytique de localisation",
          desc: "Croiser données spatiales et données métier pour comprendre motifs, couverture, demande et risque \u2014 la localisation comme dimension d'analyse supplémentaire.",
        },
        {
          title: "Analyse du risque et de l'exposition",
          desc: "Utiliser la géographie pour évaluer l'exposition autour des sites, actifs, clients, infrastructures et chaînes d'approvisionnement, et voir où le risque se concentre.",
        },
        {
          title: "Données terrain et imagerie",
          desc: "Collecter localisation, actifs, capteurs, imagerie et inspections sur le terrain et les rendre disponibles aux équipes d'exploitation, sans étape manuelle intermédiaire.",
        },
        {
          title: "Modernisation et intégration SIG",
          desc: "Faire évoluer les environnements anciens, porter les bons traitements vers le cloud et intégrer le SIG aux systèmes déjà en place \u2014 sans créer un silo de plus.",
        },
      ],
      technologyGroups: [
        { label: "Plateformes SIG", icon: "layers", items: ["ArcGIS Enterprise", "ArcGIS Pro", "QGIS"] },
        { label: "Données spatiales", icon: "cube", items: ["PostGIS", "PostgreSQL", "Apache Sedona"] },
        { label: "Imagerie et analyse", icon: "chart", items: ["GeoPandas", "Google Earth Engine"] },
        { label: "Cloud et intégration", icon: "cloud", items: ["Microsoft Azure", "Python", "API REST"] },
      ],
      technologies: ["PostGIS", "ArcGIS", "QGIS", "GeoPandas", "Google Earth Engine", "Apache Sedona"],
      platformsSub:
        "Nous travaillons avec des plateformes commerciales, open source, cloud et analytiques, en choisissant ce qui convient à l'environnement plutôt que l'inverse.",
      whyIntro:
        "Nous traitons la technologie géospatiale comme une composante de l'architecture d'entreprise, et non comme un environnement cartographique à part.",
      whyPillars: [
        {
          title: "SIG et données d'entreprise",
          body: "Nous relions l'information spatiale aux données d'exploitation, financières, d'actifs et clients, pour analyser la localisation avec le reste plutôt qu'isolément.",
        },
        {
          title: "Conçu pour l'exploitation",
          body: "Où le risque se concentre-t-il ? Quels actifs demandent attention ? Où la couverture est-elle faible ? Le SIG devient un moyen de répondre à des questions métier, pas de produire des cartes.",
        },
        {
          title: "Du terrain à l'entreprise",
          body: "Données terrain, capteurs, imagerie, bases spatiales, applications et reporting reliés en un seul flux, pour que l'information ne soit pas recréée à chaque étape.",
        },
      ],
      finalCta: {
        title: "Un problème de localisation caché dans un problème métier ?",
        buttonLabel: "Démarrer la conversation",
      },
      seoTitle: "Solutions SIG et géospatiales | Zed Ventures",
      seoDescription:
        "Zed Ventures conçoit des systèmes géospatiaux — plateformes de données spatiales, cartographie de l'exposition, analyse d'imagerie et analytique de localisation.",
    },
    guidewire: {
      name: "Guidewire",
      heroImageHint: "Un écran de gestion de police ou de sinistre",
      outcome: "Faire évoluer PolicyCenter, BillingCenter et ClaimCenter sans arrêter l'activité qui en dépend.",
      intro:
        "Les sinistres doivent continuer d'être réglés pendant la montée de version. Toute notre façon de séquencer une implémentation, un changement de version ou une migration infonuagique découle de cette seule contrainte.",
      problems: [
        "Une montée de version reportée si longtemps que l'écart est devenu le projet.",
        "Une dérive de configuration dont personne n'a la vue complète.",
        "Une migration infonuagique sans plan pour les intégrations périphériques.",
      ],
      capabilities: [
        { title: "Implémentation", desc: "PolicyCenter, BillingCenter et ClaimCenter livrés selon les processus réels de souscription et de sinistres." },
        { title: "Configuration", desc: "Modèle produit et règles, documentés pour que l'équipe suivante puisse s'y retrouver." },
        { title: "Montées de version", desc: "Des passages de version planifiés sur la personnalisation réelle, pas sur le produit standard." },
        { title: "Migration infonuagique", desc: "Atteindre Guidewire Cloud avec la surface d'intégration intacte." },
      ],
      technologies: ["PolicyCenter", "BillingCenter", "ClaimCenter", "Gosu", "Guidewire Cloud", "Intégrations REST"],
      situation:
        "Les sinistres doivent continuer d'être réglés pendant que la plateforme évolue. La configuration a dérivé au fil des ans, personne n'en a une vue complète, et une montée de version trop longtemps reportée cesse d'être une montée de version pour devenir le projet. Ce sont généralement les intégrations périphériques qui rendent l'exercice difficile.",
      technologyGroups: [
        { label: "Suite Guidewire", icon: "layers", items: ["PolicyCenter", "BillingCenter", "ClaimCenter"] },
        { label: "Plateforme", icon: "cube", items: ["Guidewire Cloud", "Gosu"] },
        { label: "Intégration", icon: "plug", items: ["Intégrations REST"] },
      ],
      platformsSub:
        "Nous intervenons sur la suite Guidewire et sur les intégrations qui l'entourent.",
      whyIntro:
        "Nous séquençons les travaux Guidewire autour de la seule contrainte qui ne bouge pas : l'activité continue de tourner dessus pendant le chantier.",
      whyPillars: [
        {
          title: "Compréhension du métier de l'assurance",
          body: "Souscription et gestion des sinistres d'abord, modèle produit ensuite. Les choix de configuration découlent du fonctionnement réel.",
        },
        {
          title: "Maîtrise plateforme et intégration",
          body: "La suite et les systèmes autour. L'essentiel de la difficulté d'un programme Guidewire se situe aux interfaces, pas au cœur.",
        },
        {
          title: "De la mise en œuvre à la production",
          body: "Planifié sur la personnalisation réelle plutôt que sur le produit standard, et responsable après la mise en service.",
        },
      ],
      finalCta: {
        title: "Parlons de votre programme Guidewire.",
        buttonLabel: "Démarrer la conversation",
      },
      seoTitle: "Services-conseils Guidewire | Zed Ventures",
      seoDescription:
        "Zed Ventures assure l'implémentation, la configuration, les montées de version et la migration infonuagique Guidewire sur PolicyCenter, BillingCenter et ClaimCenter.",
    },
    sap: {
      name: "SAP",
      heroImageHint: "Un écran de module SAP, ou un atelier de déploiement",
      heroImage: {
        src: "/sap-hero.webp",
        alt: "Un atelier de production et un quai de chargement, avec un flux en cinq étapes superposé : planifier, produire, gérer, livrer, développer.",
      },
      outcome: "Moderniser SAP sans perturber l'activité qu'il fait tourner.",
      intro:
        "ZEDventures accompagne les organisations vers S/4HANA, construit des extensions sur BTP et améliore l'expérience utilisateur avec Fiori \u2014 sans reconstruire des années de complexité dans le nouvel environnement. Nous examinons de près ce qui doit être repris, ce qui doit changer et ce qu'il n'est plus utile de transporter. En gardant les personnalisations hors du cœur autant que possible, nous laissons un environnement SAP plus simple à maintenir, plus simple à faire évoluer et mieux préparé à la suite.",
      problems: [
        "De la personnalisation dans le cœur qui bloque désormais chaque montée de version.",
        "Des intégrations point à point que plus personne ne sait cartographier.",
        "Des pilotes d'IA sans accès aux données ERP réelles, qui restent des pilotes.",
      ],
      situation:
        "Le système a été ajusté à l'entreprise il y a des années, et chaque ajustement a touché le cœur. Avec le temps, rapports sur mesure, intégrations, contournements et règles de gestion s'accumulent. Ceux qui les ont construits sont partis, la documentation a pris du retard, et plus personne ne sait vraiment ce qui cassera au prochain changement.\n\nLes montées de version deviennent plus lourdes qu'elles ne devraient l'être. Les tests s'allongent, les intégrations demandent des reprises, et chaque changement révèle une dépendance de plus. On reporte donc les montées de version, la dette technique s'accumule, et la plateforme devient ce dont l'entreprise dépend \u2014 sans que personne ne veuille y toucher.",
      capabilities: [
        {
          title: "Migration S/4HANA",
          desc: "Passer à S/4HANA avec un plan clair : ce qui doit être repris, ce qui doit changer et ce qu'il faut laisser derrière. Nous simplifions l'environnement pendant la migration, pour une plateforme plus simple à maintenir et capable d'absorber les montées de version à venir.",
        },
        {
          title: "Assainissement du cœur",
          desc: "Des années de personnalisation rendent difficile la moindre montée de version. Nous identifions la logique sur mesure à l'origine de ces dépendances et la sortons du cœur quand c'est réalisable, tout en préservant les processus et les fonctions dont les équipes se servent chaque jour.",
        },
        {
          title: "Extensions BTP",
          desc: "Construire les nouvelles capacités sur SAP BTP plutôt que d'ajouter du code sur mesure dans le cœur de l'ERP. Les extensions côte à côte répondent aux besoins spécifiques tout en gardant S/4HANA plus propre, plus simple à maintenir et mieux préparé aux prochaines versions.",
        },
        {
          title: "Applications Fiori",
          desc: "Concevoir des expériences Fiori autour de la façon dont les gens travaillent réellement, plutôt que de poser une nouvelle interface sur un ancien processus. Nous simplifions écrans, étapes et parcours pour accéder plus vite à l'information et à l'action utiles.",
        },
        {
          title: "Intégration et interfaces",
          desc: "SAP fonctionne rarement seul. Nous simplifions et modernisons les connexions entre SAP et les applications, plateformes de données, partenaires et services qui l'entourent \u2014 en réduisant les intégrations point à point fragiles et en rendant les interfaces plus lisibles, plus faciles à exploiter et à faire évoluer.",
        },
        {
          title: "IA ancrée dans SAP",
          desc: "Intégrer l'IA aux processus SAP avec un accès gouverné au contexte réel de l'entreprise, plutôt qu'à des données copiées ou déconnectées. Nous ciblons les usages concrets : retrouver une information, comprendre l'activité, agir — dans le respect des contrôles d'accès existants.",
        },
      ],
      technologyGroups: [
        {
          label: "Plateforme",
          icon: "layers",
          items: [
            "SAP S/4HANA",
            "S/4HANA Cloud",
            "SAP HANA",
            "ABAP",
            "ABAP RAP",
            "CDS views",
            "Fiori",
          ],
        },
        { label: "Extension", icon: "cube", items: ["SAP BTP", "CAP", "OData"] },
        { label: "Intégration", icon: "plug", items: ["SAP Integration Suite", "Microsoft Azure"] },
      ],
      technologies: ["S/4HANA", "SAP BTP", "Fiori", "CAP", "ABAP", "OData"],
      whyIntro:
        "Nous traitons SAP comme un processus métier qui se trouve tourner sur un logiciel, et gardons le cœur assez propre pour que la prochaine montée de version soit une routine.",
      whyPillars: [
        {
          title: "Processus métier et technologie",
          body: "Nous partons de ce que le processus doit accomplir et de ce que l'entreprise ne peut pas se permettre d'arrêter, puis décidons du changement système — et non l'inverse.",
        },
        {
          title: "Continuité opérationnelle",
          body: "Le système porte l'exploitation pendant que nous y travaillons. Migration et assainissement sont séquencés pour que l'activité continue malgré le chantier.",
        },
        {
          title: "Un cœur propre, qui le reste",
          body: "Les extensions se placent à côté du cœur, pas dedans, et nous documentons la frontière pour qu'elle survive à ceux qui l'ont tracée.",
        },
      ],
      seoTitle: "Conseil SAP, migration S/4HANA et ingénierie BTP | ZEDventures",
      seoDescription:
        "ZEDventures livre migration S/4HANA, assainissement du cœur, extensions BTP et ingénierie Fiori, en gardant le cœur évolutif après la fin du projet.",
    },
    "product-engineering": {
      name: "Ingénierie produit",
      heroImageHint: "Des ingénieurs au travail — une vraie équipe, pas une photo de banque d'images",
      outcome: "Livrer un logiciel à une date que vous pouvez annoncer devant un client.",
      intro:
        "Une livraison de bout en bout, de l'architecture à l'assurance qualité, assurée par des gens qui restent responsables après la mise en production plutôt que de remettre un dépôt de code.",
      problems: [
        "Une feuille de route qui glisse parce que l'architecture n'absorbe plus la fonctionnalité suivante.",
        "Une qualité vérifiée à la fin, quand toute correction coûte le plus cher.",
        "Des équipes qui livrent du code mais pas la préparation opérationnelle qui l'accompagne.",
      ],
      capabilities: [
        { title: "Architecture", desc: "Des conceptions dimensionnées pour la charge et pour l'équipe qui devra les maintenir." },
        { title: "Développement infonuagique natif", desc: "Des services conçus pour la plateforme qui les exécute plutôt que déplacés dessus." },
        { title: "Ingénierie de la qualité", desc: "Des tests intégrés au pipeline plutôt qu'ajoutés au calendrier." },
        { title: "Livraison et exploitation", desc: "Déploiement, observabilité et la réalité des astreintes qui suit un lancement." },
      ],
      technologies: ["TypeScript", "React", "Node.js", "Python", "Kubernetes", "Terraform"],
      situation:
        "La feuille de route dérape parce que l'architecture n'absorbe plus la fonctionnalité suivante, et la qualité se vérifie à la fin, au moment où corriger coûte le plus cher. Les équipes livrent du code sans la préparation opérationnelle autour : la mise en production devient le début du problème plutôt que la fin du travail.",
      technologyGroups: [
        { label: "Application", icon: "layers", items: ["TypeScript", "React", "Node.js"] },
        { label: "Services et données", icon: "cube", items: ["Python"] },
        { label: "Plateforme", icon: "cloud", items: ["Kubernetes", "Terraform"] },
      ],
      platformsSub:
        "Nous travaillons avec les langages et plateformes sur lesquels tournent les équipes produit aujourd'hui.",
      whyIntro:
        "Nous restons responsables après la mise en production plutôt que de remettre un dépôt de code, ce qui change la façon dont l'architecture se décide dès le départ.",
      whyPillars: [
        {
          title: "Vision produit et ingénierie",
          body: "Nous cherchons d'abord ce que le logiciel doit apporter au métier : l'architecture sert la feuille de route au lieu de la contraindre.",
        },
        {
          title: "Une architecture dimensionnée",
          body: "Pour la charge qu'elle portera et pour l'équipe qui devra la maintenir après notre départ.",
        },
        {
          title: "Du développement à l'exploitation",
          body: "Tests dans la chaîne, observabilité au lancement, et la réalité des astreintes qui suit.",
        },
      ],
      finalCta: {
        title: "Parlons de votre feuille de route produit.",
        buttonLabel: "Démarrer la conversation",
      },
      seoTitle: "Services d'ingénierie produit | Zed Ventures",
      seoDescription:
        "Zed Ventures assure l'ingénierie produit de bout en bout — architecture, développement infonuagique natif, qualité et exploitation pour les logiciels d'entreprise.",
    },
    "offshore-nearshore": {
      name: "Livraison délocalisée et de proximité",
      heroImageHint:
        "Un même chantier qui circule dans une équipe distribuée — du travail relié, pas une carte de pays",
      heroImage: {
        src: "/offshore-hero.webp",
        alt: "Deux collègues travaillant ensemble sur un portable dans un bureau lumineux, avec deux cartouches — Amérique du Nord, relation client, et Inde, ingénierie et livraison — reliés par un trait fin.",
      },
      outcome: "Ajouter de la capacité d'ingénierie sans ajouter de coordination.",
      intro:
        "Construire le modèle de livraison autour du travail. L'Inde pour la profondeur et l'échelle, des équipes de proximité quand le chevauchement horaire compte, ou les deux au sein d'un même engagement dont nous répondons.",
      problems: [
        "Des délais de recrutement incompatibles avec la date de livraison.",
        "Des équipes distribuées qui perdent une journée à chaque question.",
        "Des équipes prestataires qui n'acquièrent jamais assez de contexte pour travailler seules.",
      ],
      capabilities: [
        {
          title: "Équipes d'ingénierie dédiées",
          desc: "Constituer des équipes stables autour de vos produits, plateformes ou programmes, plutôt que de faire tourner des ressources d'un projet à l'autre.",
        },
        {
          title: "Livraison délocalisée",
          desc: "Mobiliser la capacité d'ingénierie basée en Inde pour le développement, la qualité, l'intégration, la modernisation et les travaux de longue durée, là où la profondeur et l'échelle comptent.",
        },
        {
          title: "Livraison de proximité",
          desc: "Placer les travaux qui gagnent à un meilleur chevauchement horaire auprès d'équipes situées dans des fuseaux compatibles des Amériques.",
        },
        {
          title: "Livraison mixte",
          desc: "Combiner des rôles chez le client, de proximité et délocalisés selon les besoins de chaque chantier, plutôt que d'imposer un modèle unique à tout l'engagement.",
        },
        {
          title: "Livraison pilotée",
          desc: "Confier à ZED la planification, l'exécution technique, la qualité, le reporting et la livraison — et non la simple mise à disposition de personnes.",
        },
        {
          title: "Renfort d'équipe",
          desc: "Intégrer des ingénieurs spécialisés à vos outils, votre backlog et vos rituels de livraison, vos priorités restant pilotées par votre équipe.",
        },
      ],
      technologies: ["Livraison distribuée", "Livraison agile", "QA intégrée", "Outillage commun", "Responsabilité de livraison", "Rétention des connaissances"],
      buildHeading: "Construire le modèle de livraison autour du travail.",
      /**
       * No `situation` and no `situationHeading`. The section was removed from
       * this page at Mayur's direction; the template skips it entirely rather
       * than rendering an empty band under the shared heading.
       *
       * The other six keep theirs. The text that was here is in git — commit
       * 28db711 — if it comes back.
       */
      platformsEyebrow: "Modèle de livraison",
      platformsHeading: "Une seule équipe. Plusieurs lieux.",
      platformsSub:
        "Mêmes standards d'ingénierie, mêmes outils, même gouvernance sur tout l'engagement. La géographie change où le travail se fait, pas la façon dont la livraison est pilotée.",
      technologyGroups: [
        {
          label: "Modèle de livraison",
          icon: "layers",
          items: ["Équipes dédiées", "Livraison pilotée", "Renfort d'équipe", "Livraison mixte"],
        },
        {
          label: "Collaboration",
          icon: "cube",
          items: ["Backlog partagé", "Livraison agile", "QA intégrée", "Outillage commun"],
        },
        {
          label: "Gouvernance",
          icon: "shield",
          items: ["Responsabilité de livraison", "Visibilité sur l'avancement", "Gestion des risques", "Gestion des dépendances"],
        },
        {
          label: "Continuité",
          icon: "plug",
          items: ["Chevauchement horaire", "Passations structurées", "Rétention des connaissances"],
        },
      ],
      engagement: {
        eyebrow: "Engagement",
        heading: "Construire l'engagement autour du travail.",
        sub: "Deux décisions, indépendantes l'une de l'autre — chaque modèle peut se combiner à chaque configuration d'équipe.",
        groups: [
          {
            label: "Ce que nous prenons en charge",
            note: "Qui porte la responsabilité de la livraison.",
            options: [
              {
                title: "Renfort d'équipe",
                body: "Vous pilotez. Nos ingénieurs travaillent dans votre équipe, vos outils et votre processus ; la responsabilité reste chez vous. Convient aux équipes au pilotage interne solide.",
              },
              {
                title: "Équipe dédiée",
                body: "Une équipe constante travaille sur votre feuille de route, avec un pilotage technique et de livraison défini. Convient à une capacité durable autour d'un produit ou d'une plateforme.",
                common: true,
              },
              {
                title: "Livraison pilotée",
                body: "Vous définissez le résultat ; nous prenons en charge la planification, l'exécution, la qualité et la livraison sur un périmètre convenu.",
              },
            ],
          },
          {
            label: "Où se trouvent les personnes",
            note: "Où le travail se fait réellement.",
            options: [
              {
                title: "Tout délocalisé",
                body: "Livré de bout en bout depuis l'Inde. Convient aux travaux bien cadrés, qui n'exigent pas un contact quotidien en temps réel.",
              },
              {
                title: "Hybride",
                body: "Des personnes proches de vous là où la collaboration décide du résultat, avec la profondeur d'ingénierie en Inde derrière.",
                common: true,
              },
              {
                title: "Tout sur site",
                body: "Dans la même pièce que votre équipe, pour ce qui exige la présence — cadrage, ateliers, bascule et mise en production.",
              },
            ],
          },
        ],
        closing:
          "La plupart des engagements démarrent en équipe dédiée sur une configuration hybride, puis évoluent avec le travail.",
      },
      whyHeading: "Une livraison distribuée, une responsabilité qui ne l'est pas.",
      whyIntro:
        "Nous construisons des équipes distribuées autour de la responsabilité et de la continuité — pas autour de postes à pourvoir.",
      whyPillars: [
        {
          title: "Des équipes intégrées, pas de la mise à disposition",
          body: "Les ingénieurs travaillent dans vos outils, vos rythmes de livraison et votre environnement technique assez longtemps pour comprendre le contexte derrière le travail.",
        },
        {
          title: "La responsabilité reste chez ZED",
          body: "Nous restons engagés sur l'exécution, les risques, la qualité et les escalades — pas seulement sur le placement de ressources.",
        },
        {
          title: "La géographie suit le travail",
          body: "L'Inde pour la profondeur et l'échelle, une capacité de proximité là où le chevauchement compte, et les deux quand l'engagement le demande.",
        },
      ],
      /**
       * Two frames, not three. The third was a photograph of a roll-up
       * banner carrying the previous logo lockup — navy circle, script
       * "Measure What Matters" — while the header, footer and favicon on
       * this same page use the current flat mark. A visitor reads the
       * photograph as the real one, so the page was publishing two brands.
       * It was also the only frame showing collateral rather than people or
       * a workplace, in the one section on the page that exists to be
       * evidence. A third frame needs a third real photograph.
       */
      photoBand: {
        eyebrow: "Centre de livraison",
        heading: "L'équipe en Inde.",
        sub: "Profondeur et échelle d'ingénierie, au même endroit, avec les mêmes standards que le reste de l'engagement.",
        photos: [
          {
            src: "/delivery-team.webp",
            alt: "Onze membres de l'équipe d'ingénierie de ZEDventures réunis dans une salle de réunion.",
            caption: "L'équipe d'ingénierie.",
          },
          {
            src: "/delivery-floor.webp",
            alt: "Le plateau d'ingénierie vu à travers une cloison vitrée, avec des postes partagés et la lumière du jour au fond.",
            caption: "Le plateau d'ingénierie.",
          },
        ],
      },
      finalCta: {
        title: "Parlons de vos besoins en capacité de livraison.",
        buttonLabel: "Démarrer la conversation",
      },
      finalCtaSub:
        "Dites-nous où la livraison est contrainte — compétences, délais de recrutement, coût, couverture horaire ou capacité d'exécution. Nous vous aiderons à déterminer ce qui relève de la proximité, du délocalisé ou d'une équipe mixte.",
      seoTitle: "Livraison logicielle délocalisée et de proximité | ZEDventures",
      seoDescription:
        "Faites monter en charge votre livraison avec des équipes délocalisées, de proximité et mixtes. ZEDventures propose des équipes d'ingénierie dédiées, une livraison pilotée et des modèles de livraison souples.",
    },
  },
};

export function isServiceSlug(v: string): v is ServiceSlug {
  return (SERVICE_SLUGS as readonly string[]).includes(v);
}
