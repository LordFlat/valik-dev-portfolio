import { cn } from "@/lib/utils";

/**
 * Renders a project cover image, or a generated cyberpunk placeholder
 * showing the project title when no image is set.
 */
export function ProjectCover({
  src,
  title,
  className,
  imgClassName,
}: {
  src?: string | null;
  title: string;
  className?: string;
  imgClassName?: string;
}) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={title}
          className={cn("h-full w-full object-cover", imgClassName)}
          loading="lazy"
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
        "relative flex items-center justify-center overflow-hidden bg-bg-navy",
        className,
      )}
    >
      <div className="absolute inset-0 cyber-grid opacity-70" />
      <div className="absolute -left-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-neon-violet/30 blur-3xl" />
      <div className="absolute -right-6 bottom-0 h-32 w-32 rounded-full bg-neon-purple/20 blur-3xl" />
      <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-2xl border border-neon-purple/40 bg-black/40 font-mono text-2xl font-bold text-neon-soft shadow-glow-sm">
          {initials}
        </span>
        <span className="font-mono text-sm uppercase tracking-[0.25em] text-ink-muted">
          {title}
        </span>
      </div>
    </div>
  );
}
