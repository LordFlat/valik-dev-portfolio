"use server";

import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validation";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

export async function submitContactAction(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    website: formData.get("website"), // honeypot
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const e of parsed.error.errors) fieldErrors[String(e.path[0])] = e.message;
    return { status: "error", message: "Please check the form.", fieldErrors };
  }

  // Honeypot tripped — silently accept without storing.
  if (parsed.data.website && parsed.data.website.length > 0) {
    return { status: "success", message: "Thanks! Your message has been sent." };
  }

  try {
    await prisma.contactMessage.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        message: parsed.data.message,
      },
    });
  } catch {
    return { status: "error", message: "Something went wrong. Please try again later." };
  }

  return { status: "success", message: "Thanks! Your message has been sent." };
}
