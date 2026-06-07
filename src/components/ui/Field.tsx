import { cn } from "@/lib/utils";

const inputBase =
  "w-full rounded-lg border border-white/10 bg-bg-secondary/60 px-3.5 py-2.5 text-sm text-ink-white placeholder:text-ink-muted/60 transition-colors focus:border-neon-purple/60 focus:outline-none focus:ring-1 focus:ring-neon-purple/40";

export function Label({
  htmlFor,
  children,
  hint,
}: {
  htmlFor?: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink-white">
      {children}
      {hint && <span className="ml-2 font-normal text-ink-muted/70">{hint}</span>}
    </label>
  );
}

export function Input({
  className,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  return (
    <input
      className={cn(inputBase, error && "border-red-500/60 focus:border-red-500/60", className)}
      {...props}
    />
  );
}

export function Textarea({
  className,
  error,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }) {
  return (
    <textarea
      className={cn(inputBase, "min-h-[120px] resize-y", error && "border-red-500/60", className)}
      {...props}
    />
  );
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-red-400">{message}</p>;
}

export function Field({
  label,
  htmlFor,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={htmlFor} hint={hint}>
        {label}
      </Label>
      {children}
      <FieldError message={error} />
    </div>
  );
}
