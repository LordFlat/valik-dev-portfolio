import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { getPublishedProjects } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Practical tools built around automation, analytics, and real workflows.",
};

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-ink-white sm:text-5xl">Projects</h1>
        <p className="mt-3 max-w-2xl text-ink-muted">
          Practical tools built around automation, analytics, and real workflows.
        </p>
      </header>

      <ProjectsGrid
        projects={projects.map((p) => ({
          slug: p.slug,
          title: p.title,
          shortDescription: p.shortDescription,
          category: p.category,
          tags: p.tags,
          coverImage: p.coverImage,
        }))}
      />
    </section>
  );
}
