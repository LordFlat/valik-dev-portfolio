"use client";

import { useFormState } from "react-dom";
import { loginAction, type LoginState } from "@/lib/actions/auth";
import { Field, Input } from "@/components/ui/Field";
import { SubmitButton } from "@/components/ui/SubmitButton";

const initial: LoginState = {};

export function LoginForm() {
  const [state, action] = useFormState(loginAction, initial);

  return (
    <form action={action} className="flex flex-col gap-5">
      <Field label="Email" htmlFor="email">
        <Input id="email" name="email" type="email" required autoComplete="email" placeholder="admin@workflow.dev" />
      </Field>
      <Field label="Password" htmlFor="password">
        <Input id="password" name="password" type="password" required autoComplete="current-password" placeholder="••••••••" />
      </Field>
      {state.error && <p className="text-sm text-red-400">{state.error}</p>}
      <SubmitButton pendingText="Signing in…" className="w-full">
        Sign in
      </SubmitButton>
    </form>
  );
}
