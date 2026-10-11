import { cn } from "@/lib/utils";

/**
 * The "V" brand mark, traced from main-logo.png as a vector so it stays crisp
 * at any size. Uses currentColor, so it follows the surrounding text colour.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 357 364"
      fill="currentColor"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      <path d="M0 0H4Q7 0 9 4L171 364H0Z" />
      <path d="M97 0H338Q348.6 0 343.6 12L220.7 307L91.8 12Q86.7 0 97 0Z" />
      <path d="M356 59V364H229.4Z" />
    </svg>
  );
}

/**
 * Full logo: mark + letter-spaced uppercase name, matching main-logo.png.
 * The name stays real text (from the CMS logoText) for accessibility and SEO.
 */
export function Logo({ text, className }: { text: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-7 w-auto" />
      <span className="whitespace-nowrap text-[0.8125rem] font-medium uppercase leading-none tracking-[0.22em]">
        {text.trim()}
      </span>
    </span>
  );
}
