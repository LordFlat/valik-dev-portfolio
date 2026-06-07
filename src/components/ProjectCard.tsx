import Link from "next/link";
import { ProjectCover } from "./ProjectCover";

export type ProjectCardData = {
  slug: string;
  title: string;
  shortDescription: string;
  category: string | null;
  tags: string[];
  coverImage: string | null;
};

export function ProjectCard({ project }: { project: ProjectCardData }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-card backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-neon-purple/40 hover:shadow-glow"
    >
      <ProjectCover
        src={project.coverImage}
        title={project.title}
        className="aspect-[16/10] w-full"
        imgClassName="transition-transform duration-500 group-hover:scale-105"
      />
      <div className="flex flex-1 flex-col p-5">
        {project.category && (
          <span className="mb-2 text-xs font-medium uppercase tracking-wider text-neon-soft/80">
            {project.category}
          </span>
        )}
        <h3 className="text-lg font-semibold text-ink-white">{project.title}</h3>
        <p className="mt-1 text-sm text-ink-muted">{project.shortDescription}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-xs text-ink-muted"
            >
              {t}
            </span>
          ))}
        </div>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-neon-soft opacity-0 transition-opacity group-hover:opacity-100">
          View Project <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}
