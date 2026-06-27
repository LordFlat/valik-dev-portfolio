"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ProjectCover } from "./ProjectCover";
import { ArrowIcon } from "./site/icons";
import { type ProjectCardData } from "./ProjectCard";
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
      <div className="rounded-3xl border border-line bg-paper-soft p-12 text-center">
        <p className="font-display text-xl text-charcoal">No work to show yet</p>
        <p className="mt-2 text-sm text-stone">New case studies are on the way — check back soon.</p>
      </div>
    );
  }

  return (
    <div>
      {categories.length > 2 && (
        <div className="mb-12 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-all",
                filter === c
                  ? "border-charcoal bg-charcoal text-paper-soft"
                  : "border-charcoal/20 text-stone hover:border-charcoal hover:text-charcoal",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-16 sm:gap-20">
        {visible.map((p, i) => (
          <article
            key={p.slug}
            className="group grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
          >
            <div
              className={cn(
                "relative overflow-hidden rounded-3xl border border-line bg-paper-deep",
                i % 2 === 1 && "lg:order-2",
              )}
            >
              <Link href={`/projects/${p.slug}`} aria-label={`View ${p.title} case study`} className="block">
                <ProjectCover
                  src={p.coverImage}
                  title={p.title}
                  alt={`${p.title} — ${p.shortDescription}`}
                  className="aspect-[16/11] w-full"
                  imgClassName="transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </Link>
              {p.liveDemoUrl && (
                <a
                  href={p.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-3 top-3 z-10 inline-flex min-h-[40px] items-center gap-1 rounded-full border border-line bg-[rgba(255,253,248,0.88)] px-3 py-2 text-[13px] font-medium text-charcoal shadow-[0_6px_18px_-8px_rgba(17,17,17,0.35)] backdrop-blur transition-colors hover:border-charcoal hover:bg-charcoal hover:text-paper-soft"
                >
                  Live demo <span aria-hidden>↗</span>
                </a>
              )}
            </div>
            <div>
              {p.category && (
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
                  {p.category}
                </span>
              )}
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-charcoal sm:text-4xl">
                <Link href={`/projects/${p.slug}`} className="transition-colors hover:text-accent">
                  {p.title}
                </Link>
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-stone">
                {p.shortDescription}
              </p>
              {p.tags.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-charcoal/12 px-3 py-1 text-xs text-stone"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <Link
                href={`/projects/${p.slug}`}
                className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-charcoal"
              >
                View case study
                <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
