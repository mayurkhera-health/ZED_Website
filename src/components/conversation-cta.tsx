import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

/**
 * The closing invitation.
 *
 * Sits between the last piece of content and the dark footer, which previously
 * met each other with no transition at all — white content, then black, with
 * nothing in between.
 *
 * Deliberately not a red banner. This is the one place on an Insights page
 * asking for something, and asking quietly is the whole point: a reader who
 * has just finished an article about handoffs failing is not looking for a
 * pitch. Light ground, a hairline above it, and a text link rather than a
 * filled button.
 *
 * Left-aligned to match the rest of the section rather than centred. Centred
 * text in a left-aligned page reads as a banner, which is the thing this is
 * trying not to be.
 */
export function ConversationCta() {
  return (
    <section className="border-t border-border bg-background">
      <div className="px-5 py-9 sm:px-8 sm:py-10">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-[34rem]">
            <h2 className="font-display text-[1.5rem] leading-[1.2] tracking-[-0.02em] sm:text-[1.75rem]">
              Have a similar problem?
            </h2>
            <p className="mt-3 text-[1.0625rem] leading-[1.6] text-muted-foreground">
              If something here sounds familiar, we&rsquo;d be happy to compare notes.
            </p>
            <Link
              to="/contact"
              className="group mt-5 inline-flex items-center gap-2 text-[0.9375rem] font-bold text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Let&rsquo;s talk
              <ArrowRight
                className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
