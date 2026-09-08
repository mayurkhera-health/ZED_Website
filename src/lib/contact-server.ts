import { createServerFn } from "@tanstack/react-start";
import type { ContactPayload } from "@/lib/contact-endpoint";

/**
 * Server-side delivery for the contact form, over Google Workspace SMTP.
 *
 * ---------------------------------------------------------------------------
 * WHY THIS FILE EXISTS
 *
 * A browser cannot send email. Sending needs a credential, and any credential
 * in the browser bundle is public — view-source, and someone is sending mail as
 * you until the domain is blacklisted. So the send has to happen somewhere the
 * credential is not visible.
 *
 * This site already has that somewhere: it is a TanStack Start app running as a
 * real Node server (NITRO_PRESET=node-server, port 3000 on Fly), not a static
 * bundle. `createServerFn` compiles the handler below OUT of the client bundle
 * and leaves an RPC call in its place, so SMTP_PASS is only ever read in the
 * server process.
 *
 * ---------------------------------------------------------------------------
 * WHY SMTP RATHER THAN A TRANSACTIONAL PROVIDER
 *
 * This used to POST to Resend. It goes through Google instead, because
 * ZEDventures already has Google Workspace and that removes the most common
 * failure in this kind of feature: mail that sends successfully and lands in
 * spam. Google is already authorised to send for zedventures.com, so there is
 * no domain to verify, no SPF record to widen and no DKIM key to publish. The
 * message also travels from a zedventures.com mailbox to a zedventures.com
 * mailbox, which is the easiest delivery there is.
 *
 * The trade-off, stated plainly: an App Password is a long-lived credential
 * attached to a real mailbox, not a scoped send-only API key. If it leaks it is
 * revoked in Google Account settings and a new one issued — but until then it
 * can send as that account. A transactional provider would have a smaller blast
 * radius. That was weighed against having no working form at all, which is
 * where this stood before.
 *
 * ---------------------------------------------------------------------------
 * TO TURN IT ON
 *
 *   1. Turn on 2-Step Verification for the sending Google account. App
 *      Passwords do not exist without it.
 *   2. Google Account -> Security -> App passwords. Generate one. It is
 *      sixteen characters, shown once, displayed in four groups of four. The
 *      spaces are presentational and are stripped below, so pasting it with or
 *      without them works.
 *   3. Set SMTP_USER and SMTP_PASS as secrets on the app, then redeploy.
 *
 * Until BOTH secrets exist the function reports "not-configured" and the form
 * falls back to the visitor's own mail client, so the button is never dead.
 *
 * That guard is deliberately "are both set", not "is one set". A half-set
 * configuration used to pass the old check and then fail at the provider, which
 * showed the visitor a red failure panel where they would otherwise have had
 * the clean fallback. Being unconfigured should look like being unconfigured.
 */

const TO = process.env["CONTACT_TO"] ?? "info@zedventures.com";

/**
 * Gmail's submission endpoint. Port 465 is implicit TLS: the connection is
 * encrypted before the credential is sent, rather than starting in the clear
 * and upgrading, as 587/STARTTLS does. Both are overridable so a different SMTP
 * host can be swapped in without touching this file.
 */
const SMTP_HOST = process.env["SMTP_HOST"] ?? "smtp.gmail.com";
const SMTP_PORT = Number(process.env["SMTP_PORT"] ?? 465);

export type SubmitResult =
  | { status: "sent" }
  | { status: "not-configured" }
  | { status: "failed" };

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: ContactPayload) => {
    // Re-validated here, not only in the form. Client-side validation is a
    // convenience for the visitor; anything can POST to this function.
    const trim = (v: unknown) => (typeof v === "string" ? v.trim() : "");
    const clean: ContactPayload = {
      name: trim(data?.name).slice(0, 200),
      email: trim(data?.email).slice(0, 320),
      company: trim(data?.company).slice(0, 200),
      message: trim(data?.message).slice(0, 5000),
      _subject: trim(data?._subject).slice(0, 200),
      locale: trim(data?.locale) === "fr" ? "fr" : "en",
    };
    if (!clean.name || !clean.company || !clean.message) throw new Error("missing fields");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email)) throw new Error("bad email");
    return clean;
  })
  .handler(async ({ data }): Promise<SubmitResult> => {
    const user = process.env["SMTP_USER"];
    // Google displays App Passwords in four groups of four. The spaces are
    // presentational; SMTP auth rejects them.
    const pass = process.env["SMTP_PASS"]?.replace(/\s+/g, "");
    if (!user || !pass) return { status: "not-configured" };

    const lines = [
      `Name: ${data.name}`,
      `Company: ${data.company}`,
      `Email: ${data.email}`,
      `Language: ${data.locale}`,
      "",
      data.message,
    ];

    try {
      const nodemailer = (await import("nodemailer")).default;
      const transport = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: { user, pass },
      });

      await transport.sendMail({
        // Gmail rewrites From to the authenticated account unless the address
        // is a verified "send mail as" alias, so this is set to the account
        // itself. A From header Google silently replaces is worse than an
        // honest one.
        from: `ZEDventures site <${user}>`,
        to: TO,
        // So a reply in the inbox goes to the visitor, not into a void.
        replyTo: data.email,
        subject: data._subject || `Project enquiry — ${data.company}`,
        text: lines.join("\n"),
        html: `<pre style="font:14px/1.6 ui-monospace,monospace;white-space:pre-wrap">${escapeHtml(
          lines.join("\n"),
        )}</pre>`,
      });
      return { status: "sent" };
    } catch (err) {
      // Server-side only. An SMTP error can echo the username, and a stack
      // trace should never reach the browser.
      console.error("[contact] smtp send failed:", err);
      return { status: "failed" };
    }
  });
