"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/projects", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/about#stack", label: "Stack" },
  { href: "/contact", label: "Contact" },
];

export function Navbar({ logoText }: { logoText: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    const base = href.split("#")[0];
    if (base === "/projects") return pathname.startsWith("/projects");
    return pathname === base;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-neon-purple/15 bg-bg-main/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="group flex items-center gap-2 font-mono text-lg font-bold">
          <span className="h-2 w-2 rounded-full bg-neon-purple shadow-glow-sm group-hover:animate-pulse-glow" />
          <span className="text-ink-white">{logoText}</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm transition-colors",
                isActive(l.href)
                  ? "text-neon-soft"
                  : "text-ink-muted hover:text-ink-white",
              )}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-2 inline-flex items-center gap-1 rounded-lg border border-neon-purple/40 bg-neon-purple/10 px-4 py-2 text-sm font-medium text-neon-soft transition-all hover:bg-neon-purple/20 hover:shadow-glow-sm"
          >
            Let&apos;s build <span aria-hidden>↗</span>
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-ink-muted hover:text-ink-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-neon-purple/15 bg-bg-secondary/95 px-5 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm",
                  isActive(l.href) ? "text-neon-soft" : "text-ink-muted hover:text-ink-white",
                )}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-lg border border-neon-purple/40 bg-neon-purple/10 px-3 py-2.5 text-sm font-medium text-neon-soft"
            >
              Let&apos;s build ↗
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
