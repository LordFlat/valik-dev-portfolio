import Link from "next/link";
import { ProjectCover } from "./ProjectCover";
import { ArrowIcon } from "./site/icons";

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
      className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-paper-soft transition-all duration-300 hover:-translate-y-1 hover:border-charcoal/25 hover:shadow-[0_24px_60px_-30px_rgba(17,17,17,0.35)]"
    >
      <ProjectCover
        src={project.coverImage}
        title={project.title}
        alt={`${project.title} — ${project.shortDescription}`}
        className="aspect-[16/10] w-full"
        imgClassName="transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <div className="flex flex-1 flex-col p-6">
        {project.category && (
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            {project.category}
          </span>
        )}
        <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-charcoal">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-stone">{project.shortDescription}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-charcoal">
          View case study
          <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
