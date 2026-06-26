import { cn } from "@/lib/utils";
import type { SocialLink } from "@/lib/social";
import { SocialIcon } from "./icons";

/**
 * Renders social/contact links as icon buttons.
 * Returns null when there are no links, so callers can render unconditionally.
 */
export function SocialLinks({
  links,
  className,
  size = "md",
}: {
  links: SocialLink[];
  className?: string;
  size?: "sm" | "md";
}) {
  if (!links.length) return null;

  const dim = size === "sm" ? "h-9 w-9" : "h-10 w-10";
  const icon = size === "sm" ? "h-4 w-4" : "h-[18px] w-[18px]";

  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {links.map((l) => (
        <li key={l.key}>
          <a
            href={l.href}
            target={l.href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={l.label}
            title={l.label}
            className={cn(
              "inline-grid place-items-center rounded-full border border-charcoal/15 text-charcoal/70 transition-all hover:-translate-y-0.5 hover:border-charcoal hover:text-charcoal",
              dim,
            )}
          >
            <SocialIcon name={l.key} className={icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Inline text-style social links (e.g. under the contact CTA). */
export function SocialTextLinks({
  links,
  className,
}: {
  links: SocialLink[];
  className?: string;
}) {
  if (!links.length) return null;
  return (
    <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-2 text-sm", className)}>
      {links.map((l, i) => (
        <span key={l.key} className="inline-flex items-center gap-4">
          {i > 0 && <span className="text-charcoal/25" aria-hidden>·</span>}
          <a
            href={l.href}
            target={l.href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-charcoal/70 underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            <SocialIcon name={l.key} className="h-4 w-4" />
            {l.label}
          </a>
        </span>
      ))}
    </div>
  );
}
