import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <div className="absolute left-1/2 top-1/3 h-64 w-96 -translate-x-1/2 rounded-full bg-neon-violet/15 blur-[120px]" aria-hidden />
      <p className="relative font-mono text-6xl font-bold text-neon-soft glow-text">404</p>
      <h1 className="relative mt-4 text-2xl font-semibold text-ink-white">Page not found</h1>
      <p className="relative mt-2 text-ink-muted">This page doesn&apos;t exist or has moved.</p>
      <Link
        href="/"
        className="relative mt-6 rounded-lg border border-neon-purple/40 bg-neon-purple/10 px-5 py-2.5 text-sm font-medium text-neon-soft transition-all hover:bg-neon-purple/20"
      >
        ← Back home
      </Link>
    </div>
  );
}
