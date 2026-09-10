/**
 * Insights — ZEDventures' writing.
 *
 * One article is one entry in ARTICLES below. The route, the index listing and
 * the SEO metadata are all generated from this file, so publishing means adding
 * an object and nothing else.
 *
 * ---------------------------------------------------------------------------
 * ENGLISH ONLY, DELIBERATELY
 *
 * Every other page on this site exists in both locales. These do not, and that
 * is a decision rather than an omission. A capability page states what the
 * company does, and a translation of it is still true. An article is an
 * argument in someone's voice; a machine translation of it is a different
 * argument, badly made, published under Mayur's name.
 *
 * So the section is hidden from the navigation while the site is in French,
 * and an article carries `lang="en"` on its body. A French reader is not shown
 * a link to something they cannot read. When a piece is genuinely translated,
 * give it an `fr` body and the gate comes off.
 *
 * ---------------------------------------------------------------------------
 * BODY BLOCKS, NOT HTML
 *
 * The body is a list of typed blocks rather than a string of markup. Three
 * reasons, all of which have already bitten this project elsewhere:
 *
 *   - Nothing in an article can inject markup into the page.
 *   - The renderer decides what a heading looks like, so an article cannot
 *     drift from the rest of the site's type scale by carrying its own class.
 *   - A heading is a real <h2>, so the document outline is correct and the
 *     page is navigable by heading in a screen reader.
 *
 * `lead` is the standfirst — the line under the title. `note` is a run-in
 * heading followed by its paragraph, which is how Mayur's copy is structured:
 * "When staffing is the right call." leads a paragraph rather than standing
 * alone as a section.
 */

import { SERVICE_SLUGS, SERVICE_PAGES, type ServiceSlug } from "@/lib/service-pages";

export type Block =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "olist"; items: string[] }
  /** A restrained aside. Heading optional. */
  | { kind: "callout"; heading?: string; text: string }
  /** A single standalone line, set large. One per article at most. */
  | { kind: "quote"; text: string };

/**
 * The timeline figure.
 *
 * Replaces the flat share-card image that used to sit at the top of an
 * article. That image was a picture of text: it could not be selected, did not
 * reflow on a phone, was invisible to a screen reader beyond its alt string,
 * and had to be regenerated in an image tool every time a word changed. This
 * is ordinary markup, so it wraps, translates, scales with the reader's font
 * size, and is read out in order.
 *
 * `breaking` marks the step where the story turns. Exactly one step should
 * carry it — the point of the figure is that everything above it went right.
 */
export type Timeline = {
  eyebrow: string;
  title: string;
  steps: { label: string; text: string; breaking?: boolean }[];
};

/**
 * Editorial type. Metadata, not navigation — it tells a reader what kind of
 * thing they are about to read before they commit to it, which is most of
 * what separates this from a marketing blog.
 */
export const CONTENT_TYPES = [
  "Point of view",
  "From the field",
  "Explainer",
  "Case note",
] as const;
export type ContentType = (typeof CONTENT_TYPES)[number];

export type Article = {
  /** URL segment. Stable — this is what gets shared. */
  slug: string;
  /** <h1> on the page. Not the same as the title tag. */
  title: string;
  /** The line under the title. One sentence. */
  standfirst: string;
  /**
   * Two or three lines for the listing cards. Falls back to the standfirst
   * when absent, so a card is never empty — see summaryOf().
   */
  summary?: string;
  /** What kind of piece this is. Shown before the topic. */
  contentType: ContentType;
  /**
   * Pins this article to the featured slot even when a newer one exists.
   * At most one article should carry it; featuredArticle() takes the first.
   */
  featured?: boolean;
  /** <title>. Kept under 60 characters. */
  seoTitle: string;
  /** <meta name="description">. Kept under 160 characters. */
  seoDescription: string;
  /**
   * Which service area this belongs to.
   *
   * A ServiceSlug, not a free string. The label shown on the page is looked up
   * from SERVICE_PAGES, so an article's tag can never drift from the name the
   * navigation and the service page itself use — which is exactly the drift
   * the site-wide audit had to clean up once already.
   */
  capability: ServiceSlug;
  /** ISO date. Drives ordering on the index and the dateline on the page. */
  published: string;
  /** Reading time in minutes, measured from the body rather than guessed. */
  /**
   * The social share card. Raster, because scrapers cannot render the page.
   * It is no longer shown on the page itself — the timeline below is.
   */
  image: { ogSrc: string; alt: string };
  /** Optional. Sits between the header and the body when present. */
  timeline?: Timeline;
  body: Block[];
  /** The closing line and its call to action. */
  closing: { text: string; ctaLabel: string; ctaTo: string };
};

/**
 * [CONFIRM] Every claim ZED makes about its own practice in the article below
 * is Mayur's, and he has flagged four of them for checking against current
 * engagements rather than the best one: that offshore engineers join the
 * client's standups and work the client's backlog; that they can see the
 * downstream reports their changes affect; that they have standing to question
 * a spec before building it; and that one named lead takes the call when
 * something breaks. Nothing here verifies those — they are marketing claims,
 * and only he can say whether they are true today.
 *
 * The week numbers in the story and in the image are illustrative. No client
 * is named and none should be added.
 */
export const ARTICLES: readonly Article[] = [
  {
    slug: "offshore-fails-at-the-handoff",
    title: "Offshore rarely fails because of the talent",
    standfirst: "It fails at the handoff, where nobody owns the outcome.",
    seoTitle: "Why offshore delivery fails at the handoff | ZEDventures",
    seoDescription:
      "Offshore teams rarely fail on talent. They fail at the handoff, where nobody owns the outcome. When staffing works, what changes, and a test to run.",
    capability: "offshore-nearshore",
    contentType: "From the field",
    summary:
      "It fails at the handoff, where nobody owns the outcome. Clear ownership and communication matter more than where the delivery team happens to sit.",
    published: "2026-09-10",
    image: {
      ogSrc: "/insights/offshore-handoff-1200x630.png",
      alt: "One field, one handoff. Every step done as specified. Week 1, spec written. Week 1, ticket handed offshore. Week 2, field added exactly as asked. Week 3, ticket closed. Week 4, month-end report breaks.",
    },
    timeline: {
      eyebrow: "One field. One handoff.",
      title: "Every step done as specified",
      steps: [
        { label: "Week 1", text: "Spec written" },
        { label: "Week 1", text: "Ticket handed offshore" },
        { label: "Week 2", text: "Field added, exactly as asked" },
        { label: "Week 3", text: "Ticket closed" },
        { label: "Week 4", text: "Month-end report breaks", breaking: true },
      ],
    },
    body: [
      {
        kind: "p",
        text: "The spec says add a field. The engineer adds the field. Nobody on that side knew it feeds the month-end report, so the report breaks in week four.",
      },
      { kind: "quote", text: "Everyone did their job. That's the problem." },
      {
        kind: "p",
        text: "Multiply it by every ticket, every sprint. That's what a staffing model buys you: hands, not ownership.",
      },
      { kind: "p", text: "The difference shows up in small places:" },
      {
        kind: "list",
        items: [
          "Who sits in your standup",
          "Who can push back on a bad spec",
          "Who gets the call when it breaks",
        ],
      },
      {
        kind: "p",
        text: "At ZED our offshore engineers work your backlog and join your standups, so the context travels with the work.",
      },

      { kind: "h2", text: "When staffing is the right call" },
      {
        kind: "p",
        text: "Not every engagement needs an integrated team. If the work has clean edges, like a regression suite, a migration against a fixed spec, or coverage for a documented runbook, a staffed model is cheaper and does the job. The trouble starts when the same model is used for work whose value depends on context nobody wrote down: custom pricing logic, month-end processes, integrations built by people who have since left.",
      },

      { kind: "h2", text: "What changes in practice" },
      {
        kind: "p",
        text: "Integration is mostly unglamorous routine. Offshore engineers attend the same standup, work from the same backlog, and can see the downstream reports their changes touch. Someone on the offshore side has standing to question a spec before building it, not after. When something breaks, one named lead takes the call, whichever time zone caused it.",
      },

      { kind: "h2", text: "A test you can run this week" },
      {
        kind: "p",
        text: "Pull the last ten tickets your offshore team closed. For each one, ask whether anyone on that side could have told you what the change would affect downstream. If the answer is mostly no, the problem isn't the team's skill. It's how little the setup lets them see.",
      },
    ],
    closing: {
      text: "If your offshore work keeps breaking at the handoff, we can look at how it's set up.",
      ctaLabel: "Talk to us",
      ctaTo: "/contact",
    },
  },
];

/**
 * The listing summary. Never returns empty: an article with no summary falls
 * back to its standfirst rather than rendering a blank line on a card.
 */
export function summaryOf(a: Article): string {
  return a.summary ?? a.standfirst;
}

/**
 * The featured article: an explicit `featured: true` if one exists, otherwise
 * the newest. Returns undefined when there are no articles at all, which is
 * what lets the page hide itself rather than render an empty shell.
 */
export function featuredArticle(): Article | undefined {
  return ARTICLES.find((a) => a.featured) ?? ARTICLES_BY_DATE[0];
}

/** Everything except the featured one, newest first. */
export function restOfArticles(): Article[] {
  const f = featuredArticle();
  return ARTICLES_BY_DATE.filter((a) => a.slug !== f?.slug);
}

/**
 * Up to three related articles for the foot of a post.
 *
 * Same topic first, then anything else recent. Returns an empty list when
 * fewer than two qualify — the section hides rather than padding itself out
 * with whatever happens to exist, which is how "related" stops meaning
 * anything on a small site.
 */
export function relatedArticles(slug: string, limit = 3): Article[] {
  const current = getArticle(slug);
  if (!current) return [];
  const others = ARTICLES_BY_DATE.filter((a) => a.slug !== slug);
  const sameTopic = others.filter((a) => a.capability === current.capability);
  const rest = others.filter((a) => a.capability !== current.capability);
  const picked = [...sameTopic, ...rest].slice(0, limit);
  return picked.length >= 2 ? picked : [];
}

/**
 * How the page lays itself out, by how much has been published.
 *
 * Thresholds are Mayur's. The point is that the page looks finished at one
 * article and becomes a library on its own, with no layout work per post.
 */
export function layoutForCount(n: number) {
  return {
    /** A grid under the featured card needs at least one other article. */
    showGrid: n >= 2,
    /** Two columns until there is enough to fill three. */
    gridColumns: n - 1 >= 3 ? 3 : 2,
    /** Filtering one or six things is a control that does nothing. */
    showFilters: n >= 7,
    /** "More" reads right for a couple; "Latest Insights" for a library. */
    gridHeadingKey: n - 1 >= 3 ? ("latest" as const) : ("more" as const),
  };
}

/** The tag as displayed. One source of truth, shared with the nav taxonomy. */
export function capabilityLabel(slug: ServiceSlug): string {
  return SERVICE_PAGES.en[slug].name;
}

/**
 * The filter pills.
 *
 * Only service areas that actually have an article. A pill that returns "no
 * posts yet" is a dead end wearing the clothes of a control, and with one
 * article published, six of the seven would be exactly that. As Mayur writes
 * across the other areas the pills appear on their own — nothing to maintain.
 *
 * Ordered by SERVICE_SLUGS rather than by article count or alphabetically, so
 * the row reads in the same order as the services index.
 */
export function activeCapabilities(): ServiceSlug[] {
  const present = new Set(ARTICLES.map((a) => a.capability));
  return SERVICE_SLUGS.filter((s) => present.has(s));
}

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

/** Newest first. The index and any "more reading" list both use this order. */
export const ARTICLES_BY_DATE: readonly Article[] = [...ARTICLES].sort((a, b) =>
  b.published.localeCompare(a.published),
);

/**
 * Reading time, measured rather than asserted.
 *
 * 220 words a minute is the middle of the range usually quoted for adults
 * reading prose on a screen. Rounded up, and never shown as "0 min".
 */
export function readingMinutes(a: Article): number {
  const words = a.body.reduce((n, b) => {
    const text = b.kind === "list" || b.kind === "olist" ? b.items.join(" ") : b.text;
    return n + text.trim().split(/\s+/).length;
  }, a.standfirst.split(/\s+/).length);
  return Math.max(1, Math.round(words / 220));
}

/** Formatted for the dateline. Fixed locale so server and client agree. */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
