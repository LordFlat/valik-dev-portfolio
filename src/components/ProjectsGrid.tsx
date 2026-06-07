"use client";

import { useMemo, useState } from "react";
import { ProjectCard, type ProjectCardData } from "./ProjectCard";
import { cn } from "@/lib/utils";

export function ProjectsGrid({ projects }: { projects: ProjectCardData[] }) {
  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.category && set.add(p.category));
    return ["All", ...Array.from(set)];
  }, [projects]);

  const [filter, setFilter] = useState("All");

  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  if (!projects.length) {
    return (
      <div className="glass flex flex-col items-center gap-2 rounded-2xl p-12 text-center">
        <p className="text-lg font-medium text-ink-white">No projects yet</p>
        <p className="text-sm text-ink-muted">Check back soon — new work is on the way.</p>
      </div>
    );
  }

  return (
    <div>
      {categories.length > 2 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-all",
                filter === c
                  ? "border-neon-purple/60 bg-neon-purple/15 text-neon-soft"
                  : "border-white/10 text-ink-muted hover:border-neon-purple/30 hover:text-ink-white",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}
