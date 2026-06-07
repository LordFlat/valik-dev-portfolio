"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { projectSchema } from "@/lib/validation";
import { parseList } from "@/lib/utils";

export type ProjectFormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
};

function readProjectForm(formData: FormData) {
  const bool = (v: FormDataEntryValue | null) => v === "on" || v === "true";
  return {
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    shortDescription: String(formData.get("shortDescription") ?? ""),
    fullDescription: String(formData.get("fullDescription") ?? ""),
    category: String(formData.get("category") ?? ""),
    tags: parseList(String(formData.get("tags") ?? "")),
    techStack: parseList(String(formData.get("techStack") ?? "")),
    features: parseList(String(formData.get("features") ?? "")),
    problem: String(formData.get("problem") ?? ""),
    solution: String(formData.get("solution") ?? ""),
    impact: String(formData.get("impact") ?? ""),
    coverImage: String(formData.get("coverImage") ?? ""),
    galleryImages: parseList(String(formData.get("galleryImages") ?? "")),
    githubUrl: String(formData.get("githubUrl") ?? ""),
    liveDemoUrl: String(formData.get("liveDemoUrl") ?? ""),
    featured: bool(formData.get("featured")),
    published: bool(formData.get("published")),
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  };
}

function revalidateProjectPaths(slug?: string) {
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  revalidatePath("/admin");
  if (slug) revalidatePath(`/projects/${slug}`);
}

export async function createProjectAction(
  _prev: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  await requireAdmin();
  const parsed = projectSchema.safeParse(readProjectForm(formData));

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const e of parsed.error.errors) fieldErrors[String(e.path[0])] = e.message;
    return { error: "Please fix the highlighted fields.", fieldErrors };
  }

  try {
    await prisma.project.create({ data: normalize(parsed.data) });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return { error: "A project with this slug already exists.", fieldErrors: { slug: "Slug must be unique" } };
    }
    return { error: "Could not create the project. Please try again." };
  }

  revalidateProjectPaths(parsed.data.slug);
  redirect("/admin/projects");
}

export async function updateProjectAction(
  id: string,
  _prev: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  await requireAdmin();
  const parsed = projectSchema.safeParse(readProjectForm(formData));

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const e of parsed.error.errors) fieldErrors[String(e.path[0])] = e.message;
    return { error: "Please fix the highlighted fields.", fieldErrors };
  }

  try {
    await prisma.project.update({ where: { id }, data: normalize(parsed.data) });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return { error: "A project with this slug already exists.", fieldErrors: { slug: "Slug must be unique" } };
    }
    return { error: "Could not update the project. Please try again." };
  }

  revalidateProjectPaths(parsed.data.slug);
  redirect("/admin/projects");
}

function normalize(data: ReturnType<typeof projectSchema.parse>) {
  const blankToNull = (v?: string | null) => (v && v.length ? v : null);
  return {
    title: data.title,
    slug: data.slug,
    shortDescription: data.shortDescription,
    fullDescription: blankToNull(data.fullDescription),
    category: blankToNull(data.category),
    tags: data.tags,
    techStack: data.techStack,
    features: data.features,
    problem: blankToNull(data.problem),
    solution: blankToNull(data.solution),
    impact: blankToNull(data.impact),
    coverImage: blankToNull(data.coverImage),
    galleryImages: data.galleryImages,
    githubUrl: blankToNull(data.githubUrl),
    liveDemoUrl: blankToNull(data.liveDemoUrl),
    featured: data.featured,
    published: data.published,
    sortOrder: data.sortOrder,
  };
}

export async function deleteProjectAction(id: string): Promise<void> {
  await requireAdmin();
  await prisma.project.delete({ where: { id } });
  revalidateProjectPaths();
}

export async function togglePublishedAction(id: string, value: boolean): Promise<void> {
  await requireAdmin();
  const p = await prisma.project.update({ where: { id }, data: { published: value } });
  revalidateProjectPaths(p.slug);
}

export async function toggleFeaturedAction(id: string, value: boolean): Promise<void> {
  await requireAdmin();
  const p = await prisma.project.update({ where: { id }, data: { featured: value } });
  revalidateProjectPaths(p.slug);
}

export async function updateSortOrderAction(id: string, value: number): Promise<void> {
  await requireAdmin();
  const p = await prisma.project.update({ where: { id }, data: { sortOrder: value } });
  revalidateProjectPaths(p.slug);
}
