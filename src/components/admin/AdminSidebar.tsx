"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/site-content", label: "Site Content" },
  { href: "/admin/messages", label: "Messages" },
];

export function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="flex flex-col gap-6 border-b border-neon-purple/15 bg-bg-secondary/60 p-4 backdrop-blur-md md:h-screen md:w-60 md:flex-shrink-0 md:border-b-0 md:border-r">
      <div>
        <Link href="/admin" className="flex items-center gap-2 font-mono text-base font-bold">
          <span className="h-2 w-2 rounded-full bg-neon-purple shadow-glow-sm" />
          WorkFlow.dev
        </Link>
        <p className="mt-1 hidden text-xs text-ink-muted md:block">Admin panel</p>
      </div>

      <nav className="flex flex-row gap-1 overflow-x-auto md:flex-col">
        {nav.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className={cn(
              "whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors",
              isActive(n.href, n.exact)
                ? "bg-neon-purple/15 text-neon-soft"
                : "text-ink-muted hover:bg-white/[0.04] hover:text-ink-white",
            )}
          >
            {n.label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto hidden flex-col gap-3 md:flex">
        <Link href="/" target="_blank" className="text-xs text-ink-muted hover:text-neon-soft">
          View site ↗
        </Link>
        <div className="border-t border-white/10 pt-3">
          <p className="mb-2 truncate text-xs text-ink-muted">{email}</p>
          <form action={logoutAction}>
            <button className="text-sm text-ink-muted transition-colors hover:text-red-400">
              Log out
            </button>
          </form>
        </div>
      </div>

      {/* Mobile logout */}
      <form action={logoutAction} className="md:hidden">
        <button className="rounded-lg px-3 py-2 text-sm text-ink-muted hover:text-red-400">
          Log out
        </button>
      </form>
    </aside>
  );
}
