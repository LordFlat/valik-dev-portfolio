"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/** Accessible toggle that submits its state via a hidden checkbox-style value. */
export function Toggle({
  name,
  label,
  description,
  defaultChecked = false,
}: {
  name: string;
  label: string;
  description?: string;
  defaultChecked?: boolean;
}) {
  const [on, setOn] = useState(defaultChecked);

  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-bg-secondary/40 px-4 py-3">
      <div>
        <div className="text-sm font-medium text-ink-white">{label}</div>
        {description && <div className="text-xs text-ink-muted">{description}</div>}
      </div>
      <input type="hidden" name={name} value={on ? "true" : "false"} />
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={label}
        onClick={() => setOn((v) => !v)}
        className={cn(
          "relative h-6 w-11 flex-shrink-0 rounded-full transition-colors duration-200",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-purple/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-secondary",
          on
            ? "bg-neon-violet shadow-glow-sm hover:bg-neon-purple"
            : "bg-white/15 hover:bg-white/25",
        )}
      >
        <span
          className={cn(
            "absolute left-0.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow-sm transition-transform duration-200 ease-out",
            on ? "translate-x-5" : "translate-x-0",
          )}
        />
      </button>
    </div>
  );
}
