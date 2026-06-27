import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteLink } from "@/components/site/SiteLink";
import { ProjectCover } from "@/components/ProjectCover";
import { ProjectGallery } from "@/components/ProjectGallery";
import { JsonLd } from "@/components/site/JsonLd";
import { getProjectBySlug } from "@/lib/queries";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: "Project not found" };

  const description =
    project.shortDescription ||
    project.impact ||
    "A case study by Valentyn Studio.";
  const canonical = `/projects/${project.slug}`;

  return {
    title: project.title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${project.title} — Valentyn Studio`,
      description,
      type: "website",
      url: canonical,
      images: project.coverImage ? [{ url: project.coverImage }] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  if (!project || !project.published) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.title,
    description: project.shortDescription,
    url: absoluteUrl(`/projects/${project.slug}`),
    ...(project.coverImage ? { image: project.coverImage } : {}),
    author: { "@type": "Person", name: "Valentyn Varych" },
  };

  return (
    <article className="mx-auto max-w-4xl px-5 py-14 sm:px-6 sm:py-20">
      <JsonLd data={jsonLd} />

      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-stone transition-colors hover:text-charcoal"
      >
        <span aria-hidden>←</span> Back to work
      </Link>

      <header className="mt-8">
        {project.category && (
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            {project.category}
          </span>
        )}
        <h1 className="display-balance mt-3 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-charcoal sm:text-6xl">
          {project.title}
        </h1>
        <p className="mt-5 max-w-2xl text-xl leading-relaxed text-stone">
          {project.shortDescription}
        </p>
        {project.liveDemoUrl && (
          <div className="mt-6">
            <SiteLink href={project.liveDemoUrl} variant="secondary" external>
              View live demo ↗
            </SiteLink>
          </div>
        )}
      </header>

      <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-line">
        <ProjectCover
          src={project.coverImage}
          title={project.title}
          alt={`${project.title} — ${project.shortDescription}`}
          className="aspect-[16/9] w-full"
          eager
        />
      </div>

      {/* Overview */}
      {project.fullDescription && (
        <section className="mt-14 max-w-2xl">
          <SectionLabel>Overview</SectionLabel>
          <p className="mt-4 text-lg leading-relaxed text-charcoal/80">
            {project.fullDescription}
          </p>
        </section>
      )}

      {/* Challenge / Approach / What changed */}
      {(project.problem || project.solution || project.impact) && (
        <section className="mt-14 grid gap-10 sm:grid-cols-3">
          {project.problem && <StoryBlock label="The challenge" text={project.problem} />}
          {project.solution && <StoryBlock label="The approach" text={project.solution} />}
          {project.impact && <StoryBlock label="What changed" text={project.impact} />}
        </section>
      )}

      {/* Key screens */}
      {project.galleryImages.length > 0 && (
        <section className="mt-16">
          <SectionLabel>Key screens</SectionLabel>
          <div className="mt-5">
            <ProjectGallery images={project.galleryImages} title={project.title} />
          </div>
        </section>
      )}

      {/* What it does */}
      {project.features.length > 0 && (
        <section className="mt-16">
          <SectionLabel>What it does</SectionLabel>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {project.features.map((f) => (
              <div key={f} className="flex items-start gap-3 rounded-2xl border border-line bg-paper-soft p-5">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                <span className="text-charcoal">{f}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <div className="mt-16 flex flex-wrap items-center gap-3 border-t border-line pt-10">
        <SiteLink href="/contact" arrow>
          Start a project
        </SiteLink>
        <SiteLink href="/projects" variant="secondary">
          Back to work
        </SiteLink>
      </div>
    </article>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-stone">{children}</h2>
  );
}

function StoryBlock({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-charcoal">{label}</h2>
      <p className="mt-3 text-sm leading-relaxed text-stone">{text}</p>
    </div>
  );
}
