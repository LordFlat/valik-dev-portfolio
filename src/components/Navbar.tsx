"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/projects", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar({ logoText }: { logoText: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    const base = href.split("#")[0];
    if (base === "/projects") return pathname.startsWith("/projects");
    if (base === "/about") return pathname === "/about";
    if (base === "/contact") return pathname === "/contact";
    return false;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-charcoal"
          onClick={() => setOpen(false)}
        >
          {logoText}
          <span className="text-accent">.</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm transition-colors",
                isActive(l.href)
                  ? "text-charcoal"
                  : "text-stone hover:text-charcoal",
              )}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-charcoal px-4 py-2 text-sm font-medium text-paper-soft transition-colors hover:bg-accent"
          >
            Start a project
          </Link>
        </div>

        <button
          className="-mr-2 rounded-lg p-2 text-charcoal md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-paper px-5 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-2 py-2.5 text-base",
                  isActive(l.href) ? "text-charcoal" : "text-stone hover:text-charcoal",
                )}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-charcoal px-4 py-3 text-sm font-medium text-paper-soft"
            >
              Start a project
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
