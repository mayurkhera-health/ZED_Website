import { AlertTriangle } from "lucide-react";

/**
 * Deliberately loud. This marks a page whose copy is sample text, so it cannot
 * be mistaken for finished content in a review, a screenshot or a stakeholder
 * walkthrough. Pages showing this also emit a noindex robots tag.
 *
 * Remove for one service by taking its slug out of DRAFT_SERVICES in src/lib/service-pages.ts
 * once the real copy is in.
 */
export function DraftBanner({ note }: { note?: string }) {
  return (
    <div role="note" className="border-b border-[#E9A23B]/40 bg-[#FFF7E8] text-[#7A4A00]">
      <div className="container-page flex items-start gap-3 py-3">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <p className="text-sm leading-relaxed">
          <span className="font-bold">Draft page — placeholder copy.</span>{" "}
          {note ??
            "Every line on this page is sample text and must be replaced before launch. This page is set to noindex, so search engines will not index it while this banner is showing."}
        </p>
      </div>
    </div>
  );
}
