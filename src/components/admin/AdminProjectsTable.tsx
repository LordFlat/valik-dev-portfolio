"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import {
  deleteProjectAction,
  toggleFeaturedAction,
  togglePublishedAction,
  updateSortOrderAction,
} from "@/lib/actions/projects";
import { ConfirmDeleteModal } from "@/components/ui/ConfirmDeleteModal";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Row = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  featured: boolean;
  sortOrder: number;
  updatedAt: string;
};

export function AdminProjectsTable({ projects }: { projects: Row[] }) {
  const [query, setQuery] = useState("");
  const [toDelete, setToDelete] = useState<Row | null>(null);
  const [isPending, startTransition] = useTransition();

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.slug.toLowerCase().includes(query.toLowerCase()),
  );

  const run = (fn: () => Promise<void>) => startTransition(() => void fn());

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search projects…"
        className="mb-4 w-full max-w-xs rounded-lg border border-white/10 bg-bg-secondary/60 px-3.5 py-2 text-sm text-ink-white placeholder:text-ink-muted/60 focus:border-neon-purple/60 focus:outline-none"
      />

      {filtered.length === 0 ? (
        <div className="glass rounded-2xl p-10 text-center text-sm text-ink-muted">
          {projects.length === 0 ? "No projects yet. Add your first one." : "No matches."}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-white/10 bg-white/[0.02] text-xs uppercase tracking-wider text-ink-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Featured</th>
                <th className="px-4 py-3 font-medium">Order</th>
                <th className="px-4 py-3 font-medium">Updated</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className={cn("divide-y divide-white/5", isPending && "opacity-60")}>
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3">
                    <div className="font-medium text-ink-white">{p.title}</div>
                    <div className="font-mono text-xs text-ink-muted">/{p.slug}</div>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => run(() => togglePublishedAction(p.id, !p.published))}
                      className={cn(
                        "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
                        p.published
                          ? "bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25"
                          : "bg-white/5 text-ink-muted hover:bg-white/10",
                      )}
                    >
                      {p.published ? "Published" : "Draft"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => run(() => toggleFeaturedAction(p.id, !p.featured))}
                      aria-label="Toggle featured"
                      className={cn(
                        "text-lg transition-transform hover:scale-110",
                        p.featured ? "text-neon-purple" : "text-white/20",
                      )}
                    >
                      {p.featured ? "★" : "☆"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      defaultValue={p.sortOrder}
                      onBlur={(e) => {
                        const v = Number(e.target.value);
                        if (v !== p.sortOrder) run(() => updateSortOrderAction(p.id, v));
                      }}
                      className="w-16 rounded-md border border-white/10 bg-bg-secondary/60 px-2 py-1 text-sm text-ink-white focus:border-neon-purple/60 focus:outline-none"
                    />
                  </td>
                  <td className="px-4 py-3 text-ink-muted">{formatDate(p.updatedAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3 text-xs">
                      <Link
                        href={`/projects/${p.slug}`}
                        target="_blank"
                        className="text-ink-muted hover:text-neon-soft"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/projects/${p.id}/edit`}
                        className="text-ink-muted hover:text-neon-soft"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => setToDelete(p)}
                        className="text-ink-muted hover:text-red-400"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDeleteModal
        open={!!toDelete}
        title={`Delete "${toDelete?.title}"?`}
        description="This action cannot be undone."
        pending={isPending}
        onCancel={() => setToDelete(null)}
        onConfirm={() => {
          if (!toDelete) return;
          const id = toDelete.id;
          run(async () => {
            await deleteProjectAction(id);
          });
          setToDelete(null);
        }}
      />
    </div>
  );
}
