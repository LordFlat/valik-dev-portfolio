import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [total, published, featured, messages, unread] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { published: true } }),
    prisma.project.count({ where: { featured: true } }),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { read: false } }),
  ]);
  const drafts = total - published;

  const stats = [
    { label: "Projects", value: total },
    { label: "Published", value: published },
    { label: "Drafts", value: drafts },
    { label: "Featured", value: featured },
    { label: "Messages", value: messages },
    { label: "Unread", value: unread, accent: unread > 0 },
  ];

  const actions = [
    { href: "/admin/projects/new", label: "Add project" },
    { href: "/admin/site-content", label: "Edit site content" },
    { href: "/admin/projects", label: "View projects" },
    { href: "/admin/messages", label: "View messages" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-white">Dashboard</h1>
      <p className="mt-1 text-sm text-ink-muted">Overview of your portfolio.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-white/10 bg-card p-4 backdrop-blur-md"
          >
            <div
              className={`text-3xl font-bold ${s.accent ? "text-neon-soft glow-text" : "text-ink-white"}`}
            >
              {s.value}
            </div>
            <div className="mt-1 text-xs uppercase tracking-wider text-ink-muted">{s.label}</div>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-sm font-medium uppercase tracking-[0.2em] text-neon-soft/70">
        Quick actions
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className="rounded-xl border border-white/10 bg-card p-4 text-sm font-medium text-ink-white backdrop-blur-md transition-all hover:border-neon-purple/40 hover:shadow-glow-sm"
          >
            {a.label} <span aria-hidden className="text-neon-soft">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
