import Link from "next/link";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { createProjectAction } from "@/lib/actions/projects";
import { isCloudinaryConfigured } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export default function NewProjectPage() {
  return (
    <div>
      <Link href="/admin/projects" className="text-sm text-ink-muted hover:text-neon-soft">
        ← Back to projects
      </Link>
      <h1 className="mt-3 text-2xl font-bold text-ink-white">New project</h1>
      <p className="mt-1 text-sm text-ink-muted">Add a new project to your portfolio.</p>

      <div className="mt-8">
        <ProjectForm
          action={createProjectAction}
          submitLabel="Create project"
          uploadEnabled={isCloudinaryConfigured()}
        />
      </div>
    </div>
  );
}
