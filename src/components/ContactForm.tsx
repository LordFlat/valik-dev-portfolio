"use client";

import { useFormState } from "react-dom";
import { useRef } from "react";
import { submitContactAction, type ContactState } from "@/lib/actions/contact";
import { Field, Input, Textarea } from "@/components/ui/Field";
import { SubmitButton } from "@/components/ui/SubmitButton";

const initial: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, action] = useFormState(submitContactAction, initial);
  const formRef = useRef<HTMLFormElement>(null);

  // Reset fields after a successful submit.
  if (state.status === "success" && formRef.current) {
    formRef.current.reset();
  }

  return (
    <form ref={formRef} action={action} className="flex flex-col gap-5">
      <Field label="Name" htmlFor="name" error={state.fieldErrors?.name}>
        <Input id="name" name="name" required placeholder="Your name" autoComplete="name" />
      </Field>

      <Field label="Email" htmlFor="email" error={state.fieldErrors?.email}>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          autoComplete="email"
        />
      </Field>

      <Field label="Message" htmlFor="message" error={state.fieldErrors?.message}>
        <Textarea id="message" name="message" required placeholder="What would you like to build?" />
      </Field>

      {/* Honeypot — hidden from humans, tempting for bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex items-center gap-4">
        <SubmitButton pendingText="Sending…">Send Message</SubmitButton>
        {state.status === "success" && (
          <p className="text-sm text-emerald-400">{state.message}</p>
        )}
        {state.status === "error" && state.message && (
          <p className="text-sm text-red-400">{state.message}</p>
        )}
      </div>
    </form>
  );
}
