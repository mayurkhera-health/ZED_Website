/**
 * PLACEHOLDER CONTENT.
 *
 * Every string below is sample copy written to give the service-page template
 * realistic shape. It describes standard industry capabilities, not claims
 * about ZEDventures: there are deliberately no metrics, client names, dates or
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
/**
 * A set of editorial columns — three or four short peers under one heading.
 *
 * Four items maximum: the layout is four columns on desktop and 2x2 on tablet,
 * and a fifth would strand one item on its own row.
 */
export type ColumnSet = {
  eyebrow: string;
  heading: string;
  intro: string;
  /** Three or four. The component takes the count from this array. */
  items: { title: string; body: string }[];
};

/**
 * Two places joined by one rule, with a line underneath tying them together.
 *
 * Used by the About page. No service page carries one — Guidewire did until
 * the section was removed, and the template block went with it.
 */
export type LocationPair = {
  places: { place: string; role: string }[];
  note: string;
};

/** One platform at the centre, up to four systems around it. */
export type SystemMap = {
  centre: string;
  satellites: string[];
};

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
  /** Replaces the shared "Why ZED" eyebrow. Used where the dark band carries
   *  an argument about the client's environment rather than about ZED. */
  whyEyebrow?: string;
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
   * The "when it fits" interlude. Sits between the capability cards and the
   * delivery model. Only Offshore & Nearshore carries it.
   */
  whenItFits?: ColumnSet;

  /**
   * A second editorial column set, rendered between the capability cards and
   * the platform table. Guidewire uses it for PolicyCenter / ClaimCenter /
   * BillingCenter — three peers that are products, not steps, and that would
   * read as a duplicate feature grid if they were cards like the six above.
   */
  productColumns?: ColumnSet;

  /**
   * A third column set, rendered light near the end of the page in place of
   * the dark Why ZED band. A service uses this OR whyPillars, never both:
   * one dark band per page is the site's rule and the band is spent elsewhere
   * when systemMap is present.
   */
  whyColumns?: ColumnSet;

  /**
   * The dark band's content when a service argues about its environment
   * rather than about ZED. Replaces whyPillars where present, so the page
   * still has exactly one dark section.
   */
  systemMap?: SystemMap;



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
  guidewire: ["blocks", "cloud", "plug", "arrow-left-right", "check", "shield"],
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
  // AI & Data came off at Mayur's direction. Its copy reads as finished
  // prose and the platform groups are his. The one paragraph that was
  // flagged as restructured rather than written from experience is the
  // situation paragraph below; it now stands as published copy.
  // Guidewire came off: its copy is Mayur's from the page spec and the hero
  // image now exists. Nothing on it is placeholder any more.
  "product-engineering",
  // Offshore & Nearshore came off the list once its copy, hero image and
  // photographs were real. The banner and the per-page noindex go with it.
  //
  // [CONFIRM] Consent from the eleven people in the delivery-centre
  // photographs is still outstanding. It is not a code gate — nothing here
  // enforces it — and the site-wide noindex in __root.tsx covers every
  // non-production environment, so nothing is exposed until the production
  // domain is live. Clear it before then.
];

/**
 * Services taken off the site entirely.
 *
 * Different from DRAFT_SERVICES, and the difference is what a visitor sees.
 * A draft service is still listed on the homepage and on the services index;
 * it just carries a banner and a noindex on its own page. A HIDDEN service is
 * not listed anywhere and its URL 404s, so nothing links to a page we are not
 * ready to show and no one arrives on one by guessing the slug.
 *
 * Product Engineering is hidden at Mayur's direction rather than deleted: the
 * copy, the capability icons and both locales stay in this file, so restoring
 * it is removing one line here.
 *
 * A hidden slug stays in SERVICE_SLUGS. Removing it there would shift
 * SERVICE_SLUG_BY_INDEX out of step with the seven entries in t.services.items
 * and silently relabel every service after it.
 */
export const HIDDEN_SERVICES: readonly ServiceSlug[] = ["product-engineering"];

export function isServiceHidden(slug: ServiceSlug): boolean {
  return (HIDDEN_SERVICES as readonly string[]).includes(slug);
}

export function isServiceDraft(slug: ServiceSlug): boolean {
  return (DRAFT_SERVICES as readonly string[]).includes(slug);
}

/** Maps each capability row on the homepage to its service page. */
export const SERVICE_SLUG_BY_INDEX: ServiceSlug[] = [...SERVICE_SLUGS];

/**
 * The services to list, paired with their index into t.services.items.
 *
 * Both listings walked t.services.items and looked the slug up by position.
 * Filtering either list on its own would have broken that pairing, so the
 * pairing is made here once and both callers consume it.
 */
export const VISIBLE_SERVICE_ENTRIES: { index: number; slug: ServiceSlug }[] =
  SERVICE_SLUG_BY_INDEX.map((slug, index) => ({ index, slug })).filter(
    (e) => !isServiceHidden(e.slug),
  );

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
      technologies: ["Databricks Mosaic AI", "Snowflake Cortex", "AWS Bedrock", "Google Vertex AI", "Databricks Lakehouse", "Snowflake Data Cloud", "Google BigQuery", "Microsoft Fabric"],
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
      /**
       * Replaced wholesale at Mayur's direction. Azure OpenAI, Azure AI
       * Search, vector databases, Airflow and Python are gone; the list is now
       * platform-led rather than component-led.
       *
       * Two edits to what was supplied, both to fit the chip component rather
       * than to change the claim. "AWS Bedrock / Google Vertex AI" became two
       * chips — a slash inside one chip implies an either/or that a capability
       * list does not mean. And the Microsoft Fabric gloss ("unifying data
       * engineering, warehousing and AI in one workspace") is not carried:
       * chips are product names at 12.5px and a nine-word parenthetical inside
       * one breaks the row. Same for the second group's supplied heading,
       * "AI-Ready Storage & Compute (The New \"Big Data\")" — that column is
       * 170px of 10px uppercase.
       */
      technologyGroups: [
        {
          label: "Models & GenAI orchestration",
          icon: "chart",
          items: ["Databricks Mosaic AI", "Snowflake Cortex", "AWS Bedrock", "Google Vertex AI"],
        },
        {
          label: "AI-ready storage & compute",
          icon: "cube",
          items: [
            "Databricks Lakehouse",
            "Snowflake Data Cloud",
            "Google BigQuery",
            "Microsoft Fabric",
          ],
        },
      ],
      platformsSub:
        "We work with the AI and data platforms enterprise teams are already standardizing on.",
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
      seoTitle: "AI & Data Consulting Services | ZEDventures",
      seoDescription:
        "ZEDventures builds enterprise AI and data platforms, including RAG applications, machine learning pipelines and production orchestration.",
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
          body: "We connect spatial information with operational, financial, asset and customer data, so location can be analyzed alongside everything else that matters rather than on its own.",
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
      seoTitle: "GIS & Geospatial Solutions | ZEDventures",
      seoDescription:
        "ZEDventures builds geospatial systems — spatial data platforms, exposure mapping, imagery-based risk assessment and location analytics for enterprise use.",
    },
    guidewire: {
      name: "Guidewire",
      heroImageHint:
        "Guidewire as one platform inside a wider environment \u2014 softly abstracted workplace, white cards, thin connectors, small red nodes. No insurance stock imagery, no Guidewire UI, no shields or umbrellas",
      heroImage: {
        src: "/guidewire-hero.webp",
        alt: "A bright office seen past a desk, with five linked white cards floating over it — a database at the centre joined by thin lines to a chart, a cloud, a laptop and a group of people.",
      },
      outcome: "Guidewire services without unnecessary complexity.",
      intro:
        "We help insurance companies implement, improve and support Guidewire across policy, billing and claims. That includes the work inside Guidewire as well as the integrations, data, testing and applications around it.",
      problems: [
        "An upgrade deferred so long that the version gap is now the project.",
        "Configuration drift nobody has a full picture of.",
        "A cloud migration with no plan for the integrations hanging off the edges.",
      ],
      situationHeading: "Guidewire has to work with the rest of your business.",
      situation:
        "Guidewire may sit at the center of policy, billing and claims, but it does not operate on its own. It has to connect with customer portals, payment systems, documents, data platforms, reporting tools and other applications.\n\nWe help make those pieces work together.",
      buildHeading: "Guidewire services from implementation through support.",
      capabilities: [
        {
          title: "Guidewire implementation",
          desc: "We configure Guidewire around the way your business actually operates. That can include workflows, business rules, integrations and the changes needed to support day-to-day policy, billing and claims processes.",
        },
        {
          title: "Guidewire Cloud & upgrades",
          desc: "Moving to Guidewire Cloud or upgrading an existing environment can also be an opportunity to simplify what has built up over time. We help with the move, the upgrade and, where it makes sense, reducing older customizations that are difficult to maintain.",
        },
        {
          title: "Integration & APIs",
          desc: "Guidewire needs to exchange information with many other systems. We build and support integrations with customer applications, payment platforms, document systems, data services and other enterprise applications.",
        },
        {
          title: "Data migration",
          desc: "Moving years of policy, billing and claims data is rarely straightforward. We help map, convert, validate and reconcile the data so teams know what moved, what changed and what needs attention.",
        },
        {
          title: "Testing",
          desc: "Core system changes can affect processes well beyond the feature being changed. We support functional, integration, regression and automated testing to catch those problems before they reach production.",
        },
        {
          title: "Application support",
          desc: "After go-live, there will always be fixes, enhancements and new business requirements. We provide ongoing Guidewire development and production support to help teams keep the platform running and continue improving it.",
        },
      ],
      /**
       * Three peers, as editorial columns rather than cards. Six cards sit
       * directly above; three more would read as a second feature grid, and
       * the spec asks for a calmer, more architectural section after the
       * capability grid.
       *
       * Text labels only. No Guidewire logos, product artwork or recreated UI
       * until approved assets exist \u2014 spec \u00a720.
       */
      productColumns: {
        eyebrow: "Guidewire platform",
        heading: "Experience across policy, billing and claims.",
        intro: "",
        items: [
          {
            title: "PolicyCenter",
            body: "Policy administration, product configuration, underwriting workflows, renewals, servicing and the integrations that support them.",
          },
          {
            title: "ClaimCenter",
            body: "Claims processes from intake through settlement, including workflows, integrations and supporting system changes.",
          },
          {
            title: "BillingCenter",
            body: "Billing, payments, commissions and account processes, along with the systems that exchange information with them.",
          },
        ],
      },
      technologies: ["PolicyCenter", "BillingCenter", "ClaimCenter", "Gosu", "Guidewire Cloud", "REST integrations"],
      /**
       * No technologyGroups, so the chip table does not render here. The
       * spec's page order has eight sections and a chip table is not one of
       * them — §2 says not to add sections to make the page longer. The three
       * Guidewire products are the platform section, in productColumns above,
       * and adding the table put two bg-surface bands next to each other with
       * nothing between them.
       */
      /**
       * The dark band, and the page's one visual event. It carries the
       * environment argument rather than a Why ZED list, because that is the
       * claim this page is actually built on: the platform is one part of the
       * estate, and most of the difficulty lives at the edges.
       *
       * whyPillars is therefore absent and whyColumns carries the reasons in a
       * light section instead \u2014 one dark band per page.
       */
      whyEyebrow: "Engineering around Guidewire",
      whyHeading: "The work usually extends beyond Guidewire.",
      whyIntro:
        "A Guidewire project rarely stays inside Guidewire. Customer applications need information from it. Data has to move between systems. Documents need to be generated. Payments need to be processed. Reporting teams need access to the right information.\n\nOur broader engineering teams can work on those pieces too, so you don\'t need to treat every system around Guidewire as a separate project.",
      systemMap: {
        centre: "Guidewire",
        satellites: ["Customer applications", "Data platforms", "APIs & integrations", "Enterprise systems"],
      },
      whyColumns: {
        eyebrow: "Why ZEDventures",
        heading: "A team that can fit into the way you already work.",
        intro: "",
        items: [
          {
            title: "Work alongside your existing team",
            body: "You may already have internal Guidewire resources, another implementation partner or several vendors involved. We can take responsibility for a specific piece of the work or work alongside the teams already in place.",
          },
          {
            title: "Keep experienced people involved",
            body: "We believe the people who understand the work should stay involved in the work. We keep communication direct and avoid adding management layers that don't help the project.",
          },
          {
            title: "Understand what sits around Guidewire",
            body: "Sometimes the problem isn't actually inside Guidewire. It may be an integration, a data issue or an application connected to it. We look at the surrounding environment before deciding where the problem needs to be solved.",
          },
          {
            title: "Keep the approach straightforward",
            body: "Not every problem needs a large transformation program. Sometimes you need an upgrade completed, an integration fixed, additional development capacity or a team to take ownership of ongoing support. We start with what actually needs to get done.",
          },
        ],
      },
      finalCta: {
        title: "Let's talk about your Guidewire environment.",
        buttonLabel: "Start a conversation",
      },
      seoTitle: "Guidewire Services | ZEDventures",
      seoDescription:
        "ZEDventures helps insurance companies implement, integrate, modernize and support Guidewire across policy, billing and claims.",
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
      seoTitle: "SAP S/4HANA & BTP Consulting | ZEDventures",
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
      seoTitle: "Product Engineering Services | ZEDventures",
      seoDescription:
        "Product engineering from architecture and cloud-native development to quality engineering, release operations and production support.",
    },
    "offshore-nearshore": {
      name: "Offshore & Nearshore Delivery",
      heroImageHint:
        "One workstream moving through a distributed team — connected work, not a map of countries",
      heroImage: {
        src: "/offshore-hero.webp",
        alt: "Two colleagues working together at a laptop in a bright office, with two labeled cards — North America, client engagement, and India, engineering and delivery — joined by a thin line.",
      },
      outcome: "Add engineering capacity without adding coordination overhead.",
      intro:
        "Add the engineering capacity you need without building another team to manage it. Work with our India team, add nearshore support when closer working hours matter, or combine both in a delivery model that fits your team and your work.",
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
          desc: "Build a consistent team around your product, platform or program. The same people stay with the work, learn your environment and build knowledge over time.",
        },
        {
          title: "Offshore delivery",
          desc: "Use our India team for development, QA, integration, modernization and ongoing engineering work. Build a small specialist team or scale into a larger delivery team as the work grows.",
        },
        {
          title: "Nearshore delivery",
          desc: "Use nearshore teams when the work needs more overlap with your business day — for workshops, frequent collaboration, faster decisions or work that benefits from real-time access to the team.",
        },
        {
          title: "Blended delivery",
          desc: "Not every part of the project needs to sit in the same place. Keep client-facing work close to the business, use nearshore where daily collaboration matters, and offshore the work that benefits from deeper capacity.",
        },
        {
          title: "Managed delivery",
          desc: "When you want ZED to own the delivery, we do. We manage the plan, engineering work, quality, reporting and day-to-day execution — not just provide people for you to manage.",
        },
        {
          title: "Team extension",
          desc: "Add engineers to the team you already have. They work in your tools, follow your processes and join your existing delivery rhythm, while your team continues to set priorities and manage the work.",
        },
      ],
      technologies: ["Distributed delivery", "Agile delivery", "Embedded QA", "Shared tooling", "Delivery ownership", "Knowledge retention"],
      buildHeading: "Build the delivery model around the work.",
      whenItFits: {
        eyebrow: "When it fits",
        heading: "When distributed delivery makes sense.",
        intro:
          "You don't need to offshore everything. Distributed delivery works best when there is a clear reason for doing it.",
        items: [
          {
            title: "You need capacity",
            body: "Your roadmap is growing faster than your internal team.",
          },
          {
            title: "You need skills",
            body: "You need engineering expertise that is difficult or slow to hire locally.",
          },
          {
            title: "You need continuity",
            body: "You have ongoing work that benefits from a stable team that learns your systems over time.",
          },
          {
            title: "You need flexibility",
            body: "You want to add or change capacity as priorities move without rebuilding the team every time.",
          },
        ],
      },
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
        "Wherever the team is based, they work to the same engineering standards and use the same delivery process. The location may change, but the way the team works together does not.",
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
        heading: "Choose how you want to work with us.",
        sub: "Start with two simple decisions: how much responsibility you want ZED to take, and where you want the work to happen. You can mix the two to build the model that works for your team.",
        groups: [
          {
            label: "How much ZED owns",
            note: "Each step hands us more of the delivery.",
            options: [
              {
                title: "Team extension",
                body: "Add engineers to your existing team. You set the priorities and manage the work; we provide the people and support needed to keep the team running smoothly.",
              },
              {
                title: "Dedicated team",
                body: "A consistent ZED team works against your roadmap and stays with the engagement over time, building deeper knowledge of your systems and business.",
                common: true,
              },
              {
                title: "Managed delivery",
                body: "You define the outcome. We take responsibility for planning the work, running the team, managing quality and keeping delivery on track.",
              },
            ],
          },
          {
            label: "Where the team sits",
            note: "Where the work actually happens.",
            options: [
              {
                title: "Offshore",
                body: "The team works from our India delivery center. A good fit for engineering work that can move forward with planned collaboration and clearly defined ownership.",
              },
              {
                title: "Blended",
                body: "Combine client-facing or nearshore roles with our India engineering team. You get more working-hour overlap where you need it while keeping deeper engineering capacity offshore.",
                common: true,
              },
              {
                title: "Onsite",
                body: "Put people alongside your team when the work benefits from being done in person — workshops, discovery, planning, rollout or periods of intensive collaboration.",
              },
            ],
          },
        ],
        closing:
          "Most engagements begin with a dedicated team or a blended model and evolve as the work changes.",
      },
      whyHeading: "Distributed delivery without distributed accountability.",
      whyIntro:
        "Working across locations should not mean figuring out who is responsible when something needs attention. We keep ownership clear and give you one ZED team accountable for the work.",
      whyPillars: [
        {
          title: "Integrated teams, not staffing",
          body: "Our engineers work in your tools, follow your processes and get to know your systems. Over time, they build the context that helps them solve problems without needing every detail explained.",
        },
        {
          title: "Accountability stays with ZED",
          body: "We don't disappear once the team starts. We stay involved in delivery, quality, performance and issues that need escalation.",
        },
        {
          title: "Put the work where it makes sense",
          body: "Some work is a natural fit for India. Some needs closer working-hour overlap. Many engagements need both. We help you choose based on how the work actually gets done.",
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
        eyebrow: "Delivery center",
        heading: "The India team.",
        sub: "Our India delivery center gives us a stable engineering base that can support both individual specialists and larger delivery teams. They work as part of the same ZED team, using the same tools, standards and delivery processes as everyone else on the engagement.",
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
      seoTitle: "Offshore & Nearshore Delivery | ZEDventures",
      seoDescription:
        "Scale delivery with offshore, nearshore and blended engineering teams for development, QA, integration, modernization and support.",
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
      technologies: ["Databricks Mosaic AI", "Snowflake Cortex", "AWS Bedrock", "Google Vertex AI", "Databricks Lakehouse", "Snowflake Data Cloud", "Google BigQuery", "Microsoft Fabric"],
      situation:
        "La plupart des projets d'IA en entreprise s'arrêtent à une bonne démonstration. Le prototype répond bien en réunion, puis personne ne veut l'exposer aux clients : nul ne peut dire d'où vient une réponse, ce que le modèle a consulté, ni ce qu'il ferait un mauvais jour. Pendant ce temps, les données nécessaires restent éparpillées dans des systèmes jamais conçus pour être lus ensemble.",
      technologyGroups: [
        {
          label: "Modèles et orchestration GenAI",
          icon: "chart",
          items: ["Databricks Mosaic AI", "Snowflake Cortex", "AWS Bedrock", "Google Vertex AI"],
        },
        {
          label: "Stockage et calcul prêts pour l'IA",
          icon: "cube",
          items: [
            "Databricks Lakehouse",
            "Snowflake Data Cloud",
            "Google BigQuery",
            "Microsoft Fabric",
          ],
        },
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
      seoTitle: "Services-conseils en IA et données | ZEDventures",
      seoDescription:
        "ZEDventures conçoit des plateformes d'IA et de données d'entreprise : applications RAG, pipelines d'apprentissage automatique et orchestration en production.",
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
        "ZEDventures évalue, modernise et migre vos environnements analytiques : Power BI, SAP BusinessObjects et plateformes de données modernes.",
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
      seoTitle: "Solutions SIG et géospatiales | ZEDventures",
      seoDescription:
        "ZEDventures conçoit des systèmes géospatiaux — plateformes de données spatiales, cartographie de l'exposition, analyse d'imagerie et analytique de localisation.",
    },
    guidewire: {
      name: "Guidewire",
      heroImageHint:
        "Guidewire comme une plateforme parmi d'autres dans un environnement plus large \u2014 bureau doucement flouté, cartes blanches, connecteurs fins, petits points rouges. Pas d'imagerie d'assurance, pas d'interface Guidewire, ni bouclier ni parapluie",
      heroImage: {
        src: "/guidewire-hero.webp",
        alt: "Un bureau lumineux vu depuis une table, avec cinq cartouches blancs reliés flottant au-dessus — une base de données au centre, jointe par des traits fins à un graphique, un nuage, un portable et un groupe de personnes.",
      },
      outcome: "Des services Guidewire sans complexité inutile.",
      intro:
        "Nous aidons les assureurs à mettre en œuvre, améliorer et exploiter Guidewire pour la police, la facturation et les sinistres. Cela couvre le travail dans Guidewire comme les intégrations, les données, les tests et les applications autour.",
      problems: [
        "Une montée de version repoussée si longtemps que l'écart devient le projet.",
        "Une configuration qui a dérivé, dont personne n'a la vue complète.",
        "Une migration vers le cloud sans plan pour les intégrations en périphérie.",
      ],
      situationHeading: "Guidewire doit fonctionner avec le reste de votre entreprise.",
      situation:
        "Guidewire a beau se trouver au centre de la police, de la facturation et des sinistres, il ne fonctionne pas seul. Il doit se connecter aux portails clients, aux systèmes de paiement, aux documents, aux plateformes de données, aux outils de reporting et à d\'autres applications.\n\nNous aidons à faire tenir ces pièces ensemble.",
      buildHeading: "Des services Guidewire, de la mise en œuvre au support.",
      capabilities: [
        {
          title: "Mise en œuvre Guidewire",
          desc: "Nous configurons Guidewire autour de votre façon réelle de fonctionner. Cela peut inclure les flux, les règles métier, les intégrations et les évolutions nécessaires aux processus quotidiens de police, de facturation et de sinistres.",
        },
        {
          title: "Guidewire Cloud et montées de version",
          desc: "Passer à Guidewire Cloud ou faire évoluer un environnement existant est aussi l'occasion de simplifier ce qui s'est accumulé avec le temps. Nous accompagnons la migration, la montée de version et, là où c'est pertinent, la réduction des anciennes personnalisations difficiles à maintenir.",
        },
        {
          title: "Intégration et API",
          desc: "Guidewire doit échanger de l'information avec de nombreux autres systèmes. Nous construisons et maintenons les intégrations avec les applications clients, les plateformes de paiement, les systèmes documentaires, les services de données et les autres applications d'entreprise.",
        },
        {
          title: "Migration de données",
          desc: "Déplacer des années de données de police, de facturation et de sinistres est rarement simple. Nous aidons à cartographier, convertir, valider et réconcilier les données, pour que les équipes sachent ce qui a été repris, ce qui a changé et ce qui demande attention.",
        },
        {
          title: "Tests",
          desc: "Une évolution sur un système cœur peut affecter des processus bien au-delà de la fonctionnalité modifiée. Nous couvrons les tests fonctionnels, d'intégration, de non-régression et automatisés, pour détecter ces problèmes avant la production.",
        },
        {
          title: "Support applicatif",
          desc: "Après la mise en service, il y aura toujours des correctifs, des évolutions et de nouveaux besoins métier. Nous assurons le développement Guidewire et le support de production dans la durée, pour que les équipes gardent la plateforme en marche et continuent de l'améliorer.",
        },
      ],
      productColumns: {
        eyebrow: "Plateforme Guidewire",
        heading: "De l'expérience sur la police, la facturation et les sinistres.",
        intro: "",
        items: [
          {
            title: "PolicyCenter",
            body: "Gestion des polices, configuration produit, flux de souscription, renouvellements, actes de gestion et les intégrations qui les soutiennent.",
          },
          {
            title: "ClaimCenter",
            body: "Les processus de sinistres, de la déclaration au règlement : flux, intégrations et évolutions des systèmes associés.",
          },
          {
            title: "BillingCenter",
            body: "Facturation, encaissements, commissions et processus de compte, ainsi que les systèmes qui échangent de l'information avec eux.",
          },
        ],
      },
      technologies: ["PolicyCenter", "BillingCenter", "ClaimCenter", "Gosu", "Guidewire Cloud", "Intégrations REST"],
      whyEyebrow: "L'ingénierie autour de Guidewire",
      whyHeading: "Le travail dépasse généralement Guidewire.",
      whyIntro:
        "Un projet Guidewire reste rarement dans Guidewire. Les applications clients ont besoin de ses informations. Les données doivent circuler entre systèmes. Des documents doivent être générés. Des paiements doivent être traités. Les équipes de reporting doivent accéder aux bonnes informations.\n\nNos équipes d\'ingénierie peuvent aussi prendre en charge ces pièces, pour éviter de traiter chaque système autour de Guidewire comme un projet séparé.",
      systemMap: {
        centre: "Guidewire",
        satellites: ["Applications clients", "Plateformes de données", "API et intégrations", "Systèmes d'entreprise"],
      },
      whyColumns: {
        eyebrow: "Pourquoi ZEDventures",
        heading: "Une équipe qui s'adapte à votre façon de travailler.",
        intro: "",
        items: [
          {
            title: "Travailler avec l'équipe en place",
            body: "Vous avez peut-être déjà des ressources Guidewire internes, un autre intégrateur ou plusieurs prestataires. Nous pouvons prendre la responsabilité d'un périmètre précis ou intervenir aux côtés des équipes déjà présentes.",
          },
          {
            title: "Garder des personnes expérimentées impliquées",
            body: "Nous pensons que les personnes qui comprennent le travail doivent rester sur le travail. Nous gardons une communication directe et évitons les couches de gestion qui n'aident pas le projet.",
          },
          {
            title: "Comprendre ce qui entoure Guidewire",
            body: "Le problème n'est pas toujours dans Guidewire. Ce peut être une intégration, un sujet de données ou une application connectée. Nous regardons l'environnement avant de décider où le problème doit être traité.",
          },
          {
            title: "Garder une approche simple",
            body: "Tout ne demande pas un grand programme de transformation. Parfois il faut terminer une montée de version, corriger une intégration, ajouter de la capacité de développement ou confier le support à une équipe. Nous partons de ce qu'il faut réellement faire.",
          },
        ],
      },
      finalCta: {
        title: "Parlons de votre environnement Guidewire.",
        buttonLabel: "Démarrer la conversation",
      },
      seoTitle: "Services Guidewire | ZEDventures",
      seoDescription:
        "ZEDventures aide les assureurs à mettre en œuvre, intégrer, moderniser et exploiter Guidewire pour la police, la facturation et les sinistres.",
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
      seoTitle: "Conseil SAP S/4HANA et BTP | ZEDventures",
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
      seoTitle: "Services d'ingénierie produit | ZEDventures",
      seoDescription:
        "Ingénierie produit : architecture, développement infonuagique natif, qualité, exploitation des mises en production et support.",
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
        "Ajoutez la capacité d'ingénierie dont vous avez besoin sans monter une équipe de plus à gérer. Travaillez avec notre équipe en Inde, ajoutez du renfort de proximité quand les horaires communs comptent, ou combinez les deux dans un modèle qui convient à votre équipe et à votre travail.",
      problems: [
        "Des délais de recrutement incompatibles avec la date de livraison.",
        "Des équipes distribuées qui perdent une journée à chaque question.",
        "Des équipes prestataires qui n'acquièrent jamais assez de contexte pour travailler seules.",
      ],
      capabilities: [
        {
          title: "Équipes d'ingénierie dédiées",
          desc: "Constituer une équipe stable autour de votre produit, de votre plateforme ou de votre programme. Les mêmes personnes restent sur le travail, apprennent votre environnement et accumulent la connaissance au fil du temps.",
        },
        {
          title: "Livraison délocalisée",
          desc: "Mobiliser notre équipe en Inde pour le développement, la qualité, l'intégration, la modernisation et l'ingénierie au long cours. Commencer par une petite équipe spécialisée, puis monter en charge à mesure que le travail grandit.",
        },
        {
          title: "Livraison de proximité",
          desc: "Faire appel à des équipes de proximité quand le travail demande plus de recouvrement avec votre journée — ateliers, collaboration fréquente, décisions rapides, ou tout travail qui gagne à un accès en temps réel à l'équipe.",
        },
        {
          title: "Livraison mixte",
          desc: "Toutes les parties d'un projet n'ont pas à se trouver au même endroit. Gardez près du métier ce qui est en contact avec lui, utilisez la proximité là où la collaboration quotidienne compte, et délocalisez ce qui gagne à une capacité plus profonde.",
        },
        {
          title: "Livraison pilotée",
          desc: "Quand vous voulez que ZED porte la livraison, nous la portons. Nous gérons le plan, le travail d'ingénierie, la qualité, le reporting et l'exécution au quotidien — pas seulement la fourniture de personnes que vous gérez.",
        },
        {
          title: "Renfort d'équipe",
          desc: "Ajouter des ingénieurs à l'équipe que vous avez déjà. Ils travaillent dans vos outils, suivent vos processus et rejoignent votre cadence de livraison, pendant que votre équipe continue de fixer les priorités et de piloter le travail.",
        },
      ],
      technologies: ["Livraison distribuée", "Livraison agile", "QA intégrée", "Outillage commun", "Responsabilité de livraison", "Rétention des connaissances"],
      buildHeading: "Construire le modèle de livraison autour du travail.",
      whenItFits: {
        eyebrow: "Quand c'est pertinent",
        heading: "Quand la livraison distribuée a du sens.",
        intro:
          "Il n'est pas nécessaire de tout délocaliser. La livraison distribuée fonctionne le mieux quand il y a une raison claire de le faire.",
        items: [
          {
            title: "Vous manquez de capacité",
            body: "Votre feuille de route grandit plus vite que votre équipe interne.",
          },
          {
            title: "Vous manquez de compétences",
            body: "Vous avez besoin d'une expertise difficile ou longue à recruter localement.",
          },
          {
            title: "Vous cherchez de la continuité",
            body: "Vous avez un travail récurrent qui gagne à une équipe stable, qui apprend vos systèmes avec le temps.",
          },
          {
            title: "Vous cherchez de la souplesse",
            body: "Vous voulez ajuster la capacité quand les priorités bougent, sans reconstruire l'équipe à chaque fois.",
          },
        ],
      },
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
        "Où que l'équipe soit basée, elle applique les mêmes standards d'ingénierie et le même processus de livraison. Le lieu peut changer ; la façon dont l'équipe travaille ensemble, non.",
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
        heading: "Choisissez la façon de travailler avec nous.",
        sub: "Commencez par deux décisions simples : la part de responsabilité que vous voulez confier à ZED, et l'endroit où le travail doit se faire. Les deux se combinent librement pour construire le modèle qui convient à votre équipe.",
        groups: [
          {
            label: "Ce que ZED prend en charge",
            note: "Chaque étape nous confie une part plus grande de la livraison.",
            options: [
              {
                title: "Renfort d'équipe",
                body: "Ajoutez des ingénieurs à votre équipe actuelle. Vous fixez les priorités et pilotez le travail ; nous fournissons les personnes et le soutien nécessaires pour que l'équipe tourne.",
              },
              {
                title: "Équipe dédiée",
                body: "Une équipe ZED constante travaille sur votre feuille de route et reste sur l'engagement dans la durée, en approfondissant sa connaissance de vos systèmes et de votre métier.",
                common: true,
              },
              {
                title: "Livraison pilotée",
                body: "Vous définissez le résultat. Nous prenons la responsabilité de planifier le travail, de faire tourner l'équipe, de gérer la qualité et de tenir la livraison.",
              },
            ],
          },
          {
            label: "Où se trouve l'équipe",
            note: "Où le travail se fait réellement.",
            options: [
              {
                title: "Délocalisé",
                body: "L'équipe travaille depuis notre centre de livraison en Inde. Convient au travail d'ingénierie qui avance avec une collaboration planifiée et des responsabilités clairement définies.",
              },
              {
                title: "Mixte",
                body: "Combinez des rôles en contact avec le métier ou de proximité et notre équipe d'ingénierie en Inde. Vous gagnez du recouvrement horaire là où il compte, tout en gardant la capacité d'ingénierie en Inde.",
                common: true,
              },
              {
                title: "Sur site",
                body: "Des personnes aux côtés de votre équipe quand le travail gagne à se faire en présence — ateliers, cadrage, planification, déploiement ou périodes de collaboration intense.",
              },
            ],
          },
        ],
        closing:
          "La plupart des engagements démarrent en équipe dédiée ou en modèle mixte, puis évoluent avec le travail.",
      },
      whyHeading: "Une livraison distribuée, une responsabilité qui ne l'est pas.",
      whyIntro:
        "Travailler sur plusieurs sites ne devrait pas obliger à chercher qui est responsable quand quelque chose demande une attention. Nous gardons la responsabilité claire et vous donnons une seule équipe ZED qui répond du travail.",
      whyPillars: [
        {
          title: "Des équipes intégrées, pas de la mise à disposition",
          body: "Nos ingénieurs travaillent dans vos outils, suivent vos processus et apprennent vos systèmes. Avec le temps, ils acquièrent le contexte qui leur permet de résoudre les problèmes sans qu'on leur explique chaque détail.",
        },
        {
          title: "La responsabilité reste chez ZED",
          body: "Nous ne disparaissons pas une fois l'équipe démarrée. Nous restons engagés sur la livraison, la qualité, la performance et les sujets qui demandent une escalade.",
        },
        {
          title: "Placer le travail là où c'est le plus efficace",
          body: "Certains travaux vont naturellement en Inde. D'autres demandent plus d'heures communes. Beaucoup d'engagements ont besoin des deux. Nous vous aidons à choisir selon la façon dont le travail se fait vraiment.",
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
        sub: "Notre centre de livraison en Inde nous donne une base d'ingénierie stable, capable de soutenir aussi bien des spécialistes isolés que des équipes de livraison plus larges. Ils font partie de la même équipe ZED, avec les mêmes outils, standards et processus que tous les autres sur l'engagement.",
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
      seoTitle: "Livraison délocalisée et de proximité | ZEDventures",
      seoDescription:
        "Renforcez votre livraison avec des équipes délocalisées, de proximité et mixtes : développement, qualité, intégration, modernisation et support.",
    },
  },
};

export function isServiceSlug(v: string): v is ServiceSlug {
  return (SERVICE_SLUGS as readonly string[]).includes(v);
}
