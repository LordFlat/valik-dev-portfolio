import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ButtonLink } from "@/components/ui/Button";
import { AdminProjectsTable } from "@/components/admin/AdminProjectsTable";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-ink-white">Projects</h1>
          <p className="mt-1 text-sm text-ink-muted">{projects.length} total</p>
        </div>
        <ButtonLink href="/admin/projects/new">+ Add project</ButtonLink>
      </div>

      <div className="mt-8">
        <AdminProjectsTable
          projects={projects.map((p) => ({
            id: p.id,
            title: p.title,
            slug: p.slug,
            published: p.published,
            featured: p.featured,
            sortOrder: p.sortOrder,
            updatedAt: p.updatedAt.toISOString(),
          }))}
        />
      </div>
    </div>
  );
}
