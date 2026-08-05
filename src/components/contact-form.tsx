"use client";
import { useState } from "react";
import { ArrowRight, Loader2, AlertCircle } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

const SERVICES = [
  "Build a digital product",
  "Improve our brand & experience",
  "Automate a business process",
  "Grow digital demand",
];

export function ContactForm({
  consultation = false,
}: {
  consultation?: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: SERVICES[0],
    message: "",
  });

  const update =
    (field: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          // The API requires `service`; the plain inquiry form has no picker,
          // so label those submissions rather than failing validation.
          service: consultation ? form.service : "General inquiry",
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        throw new Error(
          data?.error ?? `Something went wrong (${res.status}). Please try again.`
        );
      }

      setReference(data.referenceId ?? "");
      setStatus("sent");
    } catch (err) {
      // Only reached if the message genuinely did not send, so the form is
      // left intact and the user is told the truth instead of a fake success.
      setStatus("error");
      setError(
        err instanceof Error && err.message
          ? err.message
          : "We couldn't send your message. Please try again."
      );
    }
  }

  if (status === "sent")
    return (
      <div className="card p-8 min-h-80 flex items-center">
        <div>
          <div className="w-11 h-11 rounded-full bg-[#7018ff] text-white grid place-items-center text-xl">
            ✓
          </div>
          <h2 className="text-3xl font-bold tracking-[-.05em] mt-6">
            Thanks—we&rsquo;re on it.
          </h2>
          <p className="text-[#667085] mt-3">
            A Gavior strategist will be in touch within one business day. A
            confirmation is on its way to {form.email}.
          </p>
          {reference && (
            <p className="text-xs text-[#667085] mt-4">
              Reference: <span className="font-mono">{reference}</span>
            </p>
          )}
        </div>
      </div>
    );

  const sending = status === "sending";

  return (
    <form onSubmit={handleSubmit} className="card p-5 sm:p-8 grid gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <label className="text-sm font-bold">
          Your name
          <input
            required
            name="name"
            value={form.name}
            onChange={update("name")}
            disabled={sending}
            className="mt-2 w-full rounded-lg border border-[#dfe3ea] p-3 font-normal outline-none focus:border-[#7018ff] disabled:opacity-60"
            placeholder="Aisha Sharma"
          />
        </label>
        <label className="text-sm font-bold">
          Work email
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={update("email")}
            disabled={sending}
            className="mt-2 w-full rounded-lg border border-[#dfe3ea] p-3 font-normal outline-none focus:border-[#7018ff] disabled:opacity-60"
            placeholder="aisha@company.com"
          />
        </label>
      </div>
      <label className="text-sm font-bold">
        Company
        <input
          name="company"
          value={form.company}
          onChange={update("company")}
          disabled={sending}
          className="mt-2 w-full rounded-lg border border-[#dfe3ea] p-3 font-normal outline-none focus:border-[#7018ff] disabled:opacity-60"
          placeholder="Your company"
        />
      </label>
      {consultation && (
        <label className="text-sm font-bold">
          What would you like to achieve?
          <select
            name="service"
            value={form.service}
            onChange={update("service")}
            disabled={sending}
            className="mt-2 w-full rounded-lg border border-[#dfe3ea] p-3 font-normal bg-white disabled:opacity-60"
          >
            {SERVICES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      )}
      <label className="text-sm font-bold">
        Tell us a little about it
        <textarea
          required
          name="message"
          value={form.message}
          onChange={update("message")}
          disabled={sending}
          className="mt-2 w-full min-h-28 rounded-lg border border-[#dfe3ea] p-3 font-normal outline-none focus:border-[#7018ff] disabled:opacity-60"
          placeholder="The problem, opportunity or idea you&rsquo;d like to explore."
        />
      </label>

      {status === "error" && (
        <div
          role="alert"
          className="flex gap-3 rounded-lg border border-[#f0c2c2] bg-[#fdf3f3] p-4 text-sm text-[#8a1f1f]"
        >
          <AlertCircle size={18} className="shrink-0 mt-px" />
          <div>
            <p className="font-bold">Your message wasn&rsquo;t sent.</p>
            <p className="mt-1">{error}</p>
            <p className="mt-2">
              You can retry, or email us directly at{" "}
              <a className="underline font-bold" href="mailto:info@gavior.in">
                info@gavior.in
              </a>
              .
            </p>
          </div>
        </div>
      )}

      <button
        className="button button-dark justify-self-start disabled:opacity-60"
        type="submit"
        disabled={sending}
      >
        {sending ? (
          <>
            Sending<Loader2 size={15} className="animate-spin" />
          </>
        ) : (
          <>
            {status === "error"
              ? "Try again"
              : consultation
                ? "Book my consultation"
                : "Send inquiry"}
            <ArrowRight size={15} />
          </>
        )}
      </button>
      <p className="text-xs text-[#667085]">
        By sending this, you agree to our privacy policy. No spam—ever.
      </p>
    </form>
  );
}
