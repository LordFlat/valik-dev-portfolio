"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { siteContentSchema } from "@/lib/validation";

export type ContentFormState = {
  error?: string;
  success?: boolean;
  fieldErrors?: Record<string, string>;
};

export async function updateSiteContentAction(
  _prev: ContentFormState,
  formData: FormData,
): Promise<ContentFormState> {
  await requireAdmin();

  const raw = Object.fromEntries(formData.entries());
  const parsed = siteContentSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const e of parsed.error.errors) fieldErrors[String(e.path[0])] = e.message;
    return { error: "Please fix the highlighted fields.", fieldErrors };
  }

  const existing = await prisma.siteContent.findFirst();
  if (existing) {
    await prisma.siteContent.update({ where: { id: existing.id }, data: parsed.data });
  } else {
    await prisma.siteContent.create({ data: parsed.data });
  }

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/contact");
  revalidatePath("/admin/site-content");

  return { success: true };
}
