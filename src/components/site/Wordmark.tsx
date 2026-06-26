import { cn } from "@/lib/utils";

/**
 * Renders the brand wordmark with the last word in the accent colour.
 * "Valentyn Studio" → Valentyn (charcoal) + Studio (accent).
 * A single-word brand is rendered entirely in the accent colour.
 */
export function Wordmark({ text, className }: { text: string; className?: string }) {
  const parts = text.trim().split(/\s+/);
  const last = parts.pop() ?? text;
  const head = parts.join(" ");
  return (
    <span className={cn("tracking-tight", className)}>
      {head && <span>{head} </span>}
      <span className="text-accent">{last}</span>
    </span>
  );
}
