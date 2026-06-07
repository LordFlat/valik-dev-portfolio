import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { updateProjectAction } from "@/lib/actions/projects";
import { isCloudinaryConfigured } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({ where: { id: params.id } });
  if (!project) notFound();

  const boundUpdate = updateProjectAction.bind(null, project.id);

  return (
    <div>
      <Link href="/admin/projects" className="text-sm text-ink-muted hover:text-neon-soft">
        ← Back to projects
      </Link>
      <h1 className="mt-3 text-2xl font-bold text-ink-white">Edit project</h1>
      <p className="mt-1 text-sm text-ink-muted">{project.title}</p>

      <div className="mt-8">
        <ProjectForm
          action={boundUpdate}
          submitLabel="Save changes"
          uploadEnabled={isCloudinaryConfigured()}
          defaults={{
            title: project.title,
            slug: project.slug,
            shortDescription: project.shortDescription,
            fullDescription: project.fullDescription ?? "",
            category: project.category ?? "",
            tags: project.tags,
            techStack: project.techStack,
            features: project.features,
            problem: project.problem ?? "",
            solution: project.solution ?? "",
            impact: project.impact ?? "",
            coverImage: project.coverImage ?? "",
            galleryImages: project.galleryImages,
            githubUrl: project.githubUrl ?? "",
            liveDemoUrl: project.liveDemoUrl ?? "",
            featured: project.featured,
            published: project.published,
            sortOrder: project.sortOrder,
          }}
        />
      </div>
    </div>
  );
}
