"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { useRef } from "react";
import { submitContactAction, type ContactState } from "@/lib/actions/contact";

const initial: ContactState = { status: "idle" };

const PROJECT_TYPES = [
  "Landing page",
  "Website redesign",
  "Automation",
  "Portfolio",
  "Not sure yet",
];

const inputClass =
  "w-full rounded-xl border border-charcoal/15 bg-paper-soft px-4 py-3 text-sm text-charcoal placeholder:text-stone/60 transition-colors focus:border-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal/10";

function FieldShell({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-charcoal">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-accent-ink">{error}</p>}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-charcoal px-7 py-3.5 text-sm font-medium text-paper-soft transition-colors hover:bg-accent disabled:opacity-60"
    >
      {pending && (
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-paper-soft/40 border-t-paper-soft" />
      )}
      {pending ? "Sending…" : "Send message"}
    </button>
  );
}

export function ContactForm() {
  const [state, action] = useFormState(submitContactAction, initial);
  const formRef = useRef<HTMLFormElement>(null);

  if (state.status === "success" && formRef.current) {
    formRef.current.reset();
  }

  return (
    <form ref={formRef} action={action} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FieldShell label="Name" htmlFor="name" error={state.fieldErrors?.name}>
          <input id="name" name="name" required placeholder="Your name" autoComplete="name" className={inputClass} />
        </FieldShell>
        <FieldShell label="Email" htmlFor="email" error={state.fieldErrors?.email}>
          <input id="email" name="email" type="email" required placeholder="you@example.com" autoComplete="email" className={inputClass} />
        </FieldShell>
      </div>

      <FieldShell label="Project type" htmlFor="projectType" error={state.fieldErrors?.projectType}>
        <select id="projectType" name="projectType" defaultValue="" className={inputClass}>
          <option value="" disabled>
            Select a project type…
          </option>
          {PROJECT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </FieldShell>

      <FieldShell label="Message" htmlFor="message" error={state.fieldErrors?.message}>
        <textarea
          id="message"
          name="message"
          required
          placeholder="Share your current website, Instagram, or idea — and what you'd like to improve."
          className={`${inputClass} min-h-[140px] resize-y`}
        />
      </FieldShell>

      {/* Honeypot — hidden from humans, tempting for bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton />
        {state.status === "success" && (
          <p className="text-sm font-medium text-emerald-700">{state.message}</p>
        )}
        {state.status === "error" && state.message && (
          <p className="text-sm font-medium text-accent-ink">{state.message}</p>
        )}
      </div>

      <p className="text-xs leading-relaxed text-stone">
        By submitting this form, you agree to our{" "}
        <Link
          href="/privacy"
          className="text-charcoal underline underline-offset-2 transition-colors hover:text-accent"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
