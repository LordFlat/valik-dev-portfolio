"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendChatNotification } from "@/lib/email";

const transcriptMessageSchema = z.object({
  role: z.enum(["visitor", "assistant"]),
  text: z.string().trim().min(1).max(1200),
});

const chatEnquirySchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  projectSummary: z.string().trim().max(2000).optional().default(""),
  sourcePage: z.string().trim().max(300).optional().default("/"),
  transcript: z.array(transcriptMessageSchema).min(2).max(80),
  website: z.string().max(0).optional().default(""),
});

export type ChatEnquiryState =
  | { status: "success" }
  | { status: "error"; message: string };

export async function submitChatEnquiryAction(
  input: z.input<typeof chatEnquirySchema>,
): Promise<ChatEnquiryState> {
  const parsed = chatEnquirySchema.safeParse(input);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check your email address and try again.",
    };
  }

  // Honeypot: silently accept automated submissions without storing them.
  if (parsed.data.website) return { status: "success" };

  const transcript = parsed.data.transcript
    .map((message) => `${message.role === "visitor" ? "Visitor" : "Assistant"}: ${message.text}`)
    .join("\n\n");

  const storedMessage = [
    `Source page: ${parsed.data.sourcePage || "/"}`,
    parsed.data.projectSummary
      ? `Project summary: ${parsed.data.projectSummary}`
      : "Project summary: Not provided",
    "",
    "Chat transcript:",
    transcript,
  ].join("\n");

  try {
    await prisma.contactMessage.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        projectType: "Website chatbot enquiry",
        message: storedMessage,
      },
    });
  } catch (error) {
    console.error("Chat enquiry database save failed:", error);
    return {
      status: "error",
      message: "I could not send that just now. Please try again or email contact@valentyn.studio.",
    };
  }

  try {
    await sendChatNotification({
      name: parsed.data.name,
      email: parsed.data.email,
      projectSummary: parsed.data.projectSummary,
      sourcePage: parsed.data.sourcePage,
      transcript: parsed.data.transcript,
    });
  } catch (error) {
    // The enquiry remains available in the admin inbox even if email delivery fails.
    console.error("Chat enquiry email notification failed:", error);
  }

  return { status: "success" };
}
