import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-neon-purple/30 bg-neon-purple/10 px-3 py-1 text-xs font-medium tracking-wide text-neon-soft",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-ink-muted">
      {children}
    </span>
  );
}
