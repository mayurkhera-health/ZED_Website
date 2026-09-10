import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { mailtoFor, sendEnquiry, type ContactPayload } from "@/lib/contact-endpoint";

type FieldId = "name" | "email" | "company" | "message";
/** Error *codes*, not translated strings — so switching language re-translates
 *  existing errors instead of forcing the form to remount and lose its values. */
type ErrorCode = "required" | "invalidEmail";
type Errors = Partial<Record<FieldId, ErrorCode>>;
/** idle -> sending -> sent | failed, or handedOff when there is no endpoint. */
type Status = "idle" | "sending" | "sent" | "failed" | "handedOff";

export function ContactForm() {
  const { t, lang } = useLanguage();
  const [values, setValues] = useState({ name: "", email: "", company: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  /** Honeypot. A real visitor never sees this field, so anything in it is a bot. */
  const [trap, setTrap] = useState("");

  const recipient = t.contact.page.email;

  const validate = (): Errors => {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "required";
    if (!values.company.trim()) next.company = "required";
    if (!values.message.trim()) next.message = "required";
    if (!values.email.trim()) next.email = "required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "invalidEmail";
    return next;
  };

  const payload = (): ContactPayload => ({
    name: values.name.trim(),
    email: values.email.trim(),
    company: values.company.trim(),
    message: values.message.trim(),
    _subject: `Project enquiry — ${values.company.trim()}`,
    locale: lang,
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    const next = validate();
    setErrors(next);

    const order: FieldId[] = ["name", "email", "company", "message"];
    const firstInvalid = order.find((id) => next[id]);
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    // Honeypot filled means a bot. Show the normal success screen rather than an
    // error, so the bot learns nothing, and send nothing.
    if (trap) {
      setStatus("sent");
      return;
    }

    const body = payload();

    setStatus("sending");
    const result = await sendEnquiry(body);

    if (result.ok) {
      setStatus("sent");
      return;
    }

    // Nothing is wired up yet — no third-party endpoint and no mail credential
    // on the server. Rather than showing a failure for a site that was never
    // configured, hand the message to the visitor's own mail client. See the
    // note in src/lib/contact-server.ts for how to switch this off for good.
    if (result.reason === "not-configured") {
      window.location.href = mailtoFor(body);
      setStatus("handedOff");
      return;
    }

    setStatus("failed");
  };

  const field = (id: FieldId, label: string, type: "text" | "email" | "textarea") => {
    const code = errors[id];
    const err = code ? t.contact[code] : undefined;
    // No `focus:outline-none` here: it was suppressing the global
    // :focus-visible ring and leaving keyboard users with no indicator.
    const base =
      "w-full rounded-xl border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary";
    const cls = `${base} ${err ? "border-destructive" : "border-input"}`;
    const autoComplete = { name: "name", email: "email", company: "organization", message: "off" }[
      id
    ];
    const shared = {
      id,
      name: id,
      autoComplete,
      value: values[id],
      "aria-invalid": !!err,
      "aria-describedby": err ? `${id}-error` : undefined,
      className: cls,
    };

    return (
      <div>
        <label
          htmlFor={id}
          className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground"
        >
          {label}
        </label>
        {type === "textarea" ? (
          <textarea
            rows={5}
            {...shared}
            onChange={(e) => setValues({ ...values, [id]: e.target.value })}
          />
        ) : (
          <input
            type={type}
            {...shared}
            onChange={(e) => setValues({ ...values, [id]: e.target.value })}
          />
        )}
        {err && (
          <p
            id={`${id}-error`}
            role="alert"
            className="mt-1.5 text-xs font-medium text-destructive"
          >
            {err}
          </p>
        )}
      </div>
    );
  };

  const Panel = ({
    icon,
    title,
    body,
    children,
  }: {
    icon: React.ReactNode;
    title: string;
    body: string;
    children?: React.ReactNode;
  }) => (
    <div
      role="status"
      aria-live="polite"
      className="flex h-full flex-col items-start justify-center rounded-xl border border-border bg-card p-10"
    >
      {icon}
      <p className="font-display mt-6 text-2xl">{title}</p>
      <p className="mt-2 max-w-[32rem] text-sm leading-relaxed text-muted-foreground">{body}</p>
      {children}
    </div>
  );

  // Delivered by the endpoint.
  if (status === "sent") {
    return (
      <Panel
        icon={<CheckCircle2 className="h-10 w-10 text-accent" aria-hidden="true" />}
        title={t.contact.sentTitle}
        body={t.contact.sentBody}
      />
    );
  }

  // The endpoint refused or was unreachable. The visitor's text is still in
  // state, so "Try again" resubmits it and the mail link carries it across —
  // nobody has to retype anything.
  if (status === "failed") {
    return (
      <Panel
        icon={<AlertCircle className="h-10 w-10 text-accent" aria-hidden="true" />}
        title={t.contact.sendFailedTitle}
        body={t.contact.sendFailedBody}
      >
        <div className="mt-6 flex flex-wrap items-center gap-5">
          <button type="button" onClick={() => setStatus("idle")} className="btn btn-primary">
            {t.contact.retry}
          </button>
          <a
            href={mailtoFor(payload())}
            className="text-sm font-bold text-accent underline-offset-4 hover:underline"
          >
            {t.contact.openMail}
          </a>
        </div>
      </Panel>
    );
  }

  // No endpoint: the message was handed to the visitor's mail client.
  if (status === "handedOff") {
    return (
      <Panel
        icon={<CheckCircle2 className="h-10 w-10 text-accent" aria-hidden="true" />}
        title={t.contact.successTitle}
        body={t.contact.successBody}
      >
        <p className="mt-4 text-sm text-muted-foreground">
          {t.contact.successFallback}{" "}
          <a
            href={`mailto:${recipient}`}
            className="font-bold text-accent underline-offset-4 hover:underline"
          >
            {recipient}
          </a>
        </p>
      </Panel>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-5">
      {field("name", t.contact.name, "text")}
      {field("email", t.contact.email, "email")}
      {field("company", t.contact.company, "text")}
      {field("message", t.contact.message, "textarea")}

      {/* Honeypot. Off-screen rather than display:none, because some bots skip
          hidden inputs. aria-hidden and tabIndex keep it away from real users. */}
      <div
        className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={trap}
          onChange={(e) => setTrap(e.target.value)}
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/85 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "sending" && (
            <Loader2
              className="h-4 w-4 animate-spin motion-reduce:animate-none"
              aria-hidden="true"
            />
          )}
          {status === "sending" ? t.contact.sending : t.contact.submit}
        </button>
      </div>
    </form>
  );
}
