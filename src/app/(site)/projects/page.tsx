import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { getPublishedProjects } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "A selection of websites, landing pages, portfolio systems, and simple digital tools built around clarity, trust, and practical business value.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Selected Work — Valentyn Studio",
    description:
      "Websites, landing pages, and simple digital tools built around clarity, trust, and practical business value.",
    url: "/projects",
  },
};

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
      <header className="max-w-2xl">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-charcoal sm:text-6xl">
          Selected Work
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-stone">
          Websites, landing pages, and simple digital tools built around clarity, trust, and
          practical business value.
        </p>
      </header>

      <div className="mt-16">
        <ProjectsGrid
          projects={projects.map((p) => ({
            slug: p.slug,
            title: p.title,
            shortDescription: p.shortDescription,
            category: p.category,
            tags: p.tags,
            coverImage: p.coverImage,
            liveDemoUrl: p.liveDemoUrl,
          }))}
        />
      </div>
    </section>
  );
}
