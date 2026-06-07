import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Badge";
import { ProjectCover } from "@/components/ProjectCover";
import { ProjectGallery } from "@/components/ProjectGallery";
import { getProjectBySlug } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: project.coverImage ? [{ url: project.coverImage }] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  if (!project || !project.published) notFound();

  const hasDetails = project.problem || project.solution || project.impact;

  return (
    <article className="mx-auto max-w-5xl px-5 py-12">
      {/* Hero */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-neon-soft"
      >
        <span aria-hidden>←</span> Back to projects
      </Link>

      <header className="mt-6">
        {project.category && (
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-neon-soft/80">
            {project.category}
          </span>
        )}
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-ink-white sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-muted">{project.shortDescription}</p>
        {project.techStack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.techStack.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        )}
      </header>

      <div className="mt-8 overflow-hidden rounded-2xl border border-neon-purple/20 shadow-glow-sm">
        <ProjectCover
          src={project.coverImage}
          title={project.title}
          className="aspect-[16/9] w-full"
        />
      </div>

      {project.fullDescription && (
        <p className="mt-8 max-w-2xl text-ink-muted">{project.fullDescription}</p>
      )}

      {/* What it does */}
      {project.features.length > 0 && (
        <section className="mt-14">
          <h2 className="text-sm font-medium uppercase tracking-[0.25em] text-neon-soft/70">
            What it does
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {project.features.map((f) => (
              <div
                key={f}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-card p-5 backdrop-blur-md"
              >
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-neon-purple shadow-glow-sm" />
                <span className="text-ink-white">{f}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Key screens */}
      {project.galleryImages.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-5 text-sm font-medium uppercase tracking-[0.25em] text-neon-soft/70">
            Key screens
          </h2>
          <ProjectGallery images={project.galleryImages} title={project.title} />
        </section>
      )}

      {/* Details */}
      {hasDetails && (
        <section className="mt-14 grid gap-4 sm:grid-cols-3">
          {project.problem && <DetailCard label="Problem" text={project.problem} />}
          {project.solution && <DetailCard label="Solution" text={project.solution} />}
          {project.impact && <DetailCard label="Impact" text={project.impact} />}
        </section>
      )}

      {/* CTA */}
      <div className="mt-14 flex flex-wrap gap-3 border-t border-neon-purple/15 pt-8">
        <ButtonLink href="/projects" variant="secondary">
          ← Back to Projects
        </ButtonLink>
        {project.githubUrl && (
          <ButtonLink href={project.githubUrl} external variant="secondary">
            View GitHub ↗
          </ButtonLink>
        )}
        {project.liveDemoUrl && (
          <ButtonLink href={project.liveDemoUrl} external>
            Live Demo ↗
          </ButtonLink>
        )}
      </div>
    </article>
  );
}

function DetailCard({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-card p-5 backdrop-blur-md">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-neon-soft">{label}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{text}</p>
    </div>
  );
}
