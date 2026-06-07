"use client";

import { useState } from "react";

/**
 * Chips editor. Keeps the value in a hidden comma-separated input named `name`
 * so it submits cleanly with a plain <form>.
 */
export function TagInput({
  name,
  defaultValue = [],
  placeholder = "Type and press Enter",
}: {
  name: string;
  defaultValue?: string[];
  placeholder?: string;
}) {
  const [items, setItems] = useState<string[]>(defaultValue);
  const [draft, setDraft] = useState("");

  const add = (raw: string) => {
    const v = raw.trim().replace(/,$/, "").trim();
    if (v && !items.includes(v)) setItems([...items, v]);
    setDraft("");
  };

  const remove = (i: number) => setItems(items.filter((_, idx) => idx !== i));

  return (
    <div className="rounded-lg border border-white/10 bg-bg-secondary/60 p-2 focus-within:border-neon-purple/60">
      <input type="hidden" name={name} value={items.join(", ")} />
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span
            key={item + i}
            className="inline-flex items-center gap-1.5 rounded-md border border-neon-purple/30 bg-neon-purple/10 px-2 py-1 text-xs text-neon-soft"
          >
            {item}
            <button
              type="button"
              onClick={() => remove(i)}
              aria-label={`Remove ${item}`}
              className="text-neon-soft/60 hover:text-white"
            >
              ×
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              add(draft);
            } else if (e.key === "Backspace" && !draft && items.length) {
              remove(items.length - 1);
            }
          }}
          onBlur={() => draft && add(draft)}
          placeholder={items.length ? "" : placeholder}
          className="min-w-[120px] flex-1 bg-transparent px-1 py-1 text-sm text-ink-white placeholder:text-ink-muted/60 focus:outline-none"
        />
      </div>
    </div>
  );
}
