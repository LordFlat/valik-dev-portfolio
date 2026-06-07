"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./Button";

export function SubmitButton({
  children,
  pendingText,
  className,
  size,
}: {
  children: React.ReactNode;
  pendingText?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className={className} size={size}>
      {pending && (
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      )}
      {pending ? pendingText ?? "Working…" : children}
    </Button>
  );
}
