import { cn } from "@/lib/utils";

/**
 * Renders a project cover image, or a warm editorial placeholder showing the
 * project initials and title when no image is set.
 */
export function ProjectCover({
  src,
  title,
  alt,
  className,
  imgClassName,
  eager,
}: {
  src?: string | null;
  title: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
}) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden bg-paper-deep", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt || `${title} — project cover`}
          className={cn("h-full w-full object-cover", imgClassName)}
          loading={eager ? "eager" : "lazy"}
        />
      </div>
    );
  }

  const initials = title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-paper-deep",
        className,
      )}
      role="img"
      aria-label={alt || `${title} — project cover`}
    >
      <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-accent/10 blur-2xl" aria-hidden />
      <div className="absolute -bottom-12 -left-8 h-44 w-44 rounded-full bg-charcoal/[0.04] blur-2xl" aria-hidden />
      <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-2xl border border-charcoal/15 bg-paper-soft font-display text-2xl font-semibold text-charcoal">
          {initials}
        </span>
        <span className="max-w-[16rem] font-display text-base text-charcoal/70">{title}</span>
      </div>
    </div>
  );
}
