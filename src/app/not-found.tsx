import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-5 text-center text-charcoal">
      <p className="font-display text-7xl font-semibold text-accent">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-3 text-stone">This page doesn&apos;t exist or has moved.</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-charcoal px-6 py-3 text-sm font-medium text-paper-soft transition-colors hover:bg-accent"
      >
        ← Back home
      </Link>
    </div>
  );
}
