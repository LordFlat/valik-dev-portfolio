"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ProjectCover } from "./ProjectCover";

export type CarouselProject = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  tags: string[];
  coverImage: string | null;
};

export function ProjectCarousel({ projects }: { projects: CarouselProject[] }) {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const count = projects.length;

  const go = useCallback(
    (dir: number) => {
      setActive((prev) => (prev + dir + count) % count);
    },
    [count],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (count === 0) {
    return (
      <div className="glass mx-auto flex max-w-2xl flex-col items-center gap-3 rounded-2xl p-12 text-center">
        <p className="text-lg font-medium text-ink-white">No featured work yet</p>
        <p className="text-sm text-ink-muted">
          Featured projects will appear here once they&apos;re published.
        </p>
      </div>
    );
  }

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) go(delta > 0 ? -1 : 1);
    touchStartX.current = null;
  };

  return (
    <div className="relative w-full">
      <div
        className="relative mx-auto h-[440px] w-full max-w-5xl overflow-hidden sm:h-[480px]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        role="group"
        aria-roledescription="carousel"
        aria-label="Featured projects"
      >
        {projects.map((p, i) => {
          // distance from active, wrapped to nearest direction
          let offset = i - active;
          if (offset > count / 2) offset -= count;
          if (offset < -count / 2) offset += count;

          const isActive = offset === 0;
          const abs = Math.abs(offset);
          const hidden = abs > 1;

          return (
            <div
              key={p.id}
              className="absolute left-1/2 top-1/2 w-[88%] max-w-2xl transition-all duration-500 ease-out sm:w-[640px]"
              style={{
                transform: `translate(-50%, -50%) translateX(${offset * 58}%) scale(${
                  isActive ? 1 : 0.82
                })`,
                opacity: hidden ? 0 : isActive ? 1 : 0.4,
                zIndex: isActive ? 30 : 20 - abs,
                pointerEvents: isActive ? "auto" : "none",
                filter: isActive ? "none" : "blur(1px)",
              }}
              aria-hidden={!isActive}
            >
              <CarouselCard project={p} active={isActive} onSelect={() => setActive(i)} />
            </div>
          );
        })}
      </div>

      {/* Arrows */}
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-40 flex items-center justify-between px-1 sm:px-3">
        <CarouselArrow dir="left" onClick={() => go(-1)} />
        <CarouselArrow dir="right" onClick={() => go(1)} />
      </div>

      {/* Dots */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {projects.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setActive(i)}
            aria-label={`Go to ${p.title}`}
            aria-current={i === active}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === active ? "w-7 bg-neon-purple shadow-glow-sm" : "w-2 bg-white/20 hover:bg-white/40",
            )}
          />
        ))}
      </div>
    </div>
  );
}

function CarouselCard({
  project,
  active,
  onSelect,
}: {
  project: CarouselProject;
  active: boolean;
  onSelect: () => void;
}) {
  const inner = (
    <div
      className={cn(
        "group relative h-full overflow-hidden rounded-2xl border bg-card backdrop-blur-md transition-all duration-300",
        active
          ? "border-neon-purple/40 shadow-glow"
          : "border-white/10",
      )}
    >
      <ProjectCover
        src={project.coverImage}
        title={project.title}
        className="h-[300px] w-full sm:h-[340px]"
        imgClassName="transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 pt-16">
        <h3 className="text-xl font-semibold text-ink-white sm:text-2xl">{project.title}</h3>
        <p className="mt-1 text-sm text-neon-soft">{project.shortDescription}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-md border border-white/10 bg-white/[0.06] px-2 py-0.5 text-xs text-ink-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  if (active) {
    return (
      <Link href={`/projects/${project.slug}`} className="block h-[300px] sm:h-[340px]">
        {inner}
      </Link>
    );
  }
  return (
    <button onClick={onSelect} className="block h-[300px] w-full text-left sm:h-[340px]" tabIndex={-1}>
      {inner}
    </button>
  );
}

function CarouselArrow({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "left" ? "Previous project" : "Next project"}
      className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full border border-neon-purple/30 bg-black/60 text-ink-white backdrop-blur-md transition-all hover:border-neon-purple/70 hover:bg-black/80 hover:shadow-glow-sm"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        {dir === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
      </svg>
    </button>
  );
}
