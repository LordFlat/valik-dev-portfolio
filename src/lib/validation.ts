import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required").max(120),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(140)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase letters, numbers and dashes"),
  shortDescription: z.string().min(1, "Short description is required").max(200),
  fullDescription: z.string().max(4000).optional().nullable(),
  category: z.string().max(80).optional().nullable(),
  tags: z.array(z.string().min(1)).max(20).default([]),
  techStack: z.array(z.string().min(1)).max(40).default([]),
  features: z.array(z.string().min(1)).max(20).default([]),
  problem: z.string().max(1000).optional().nullable(),
  solution: z.string().max(1000).optional().nullable(),
  impact: z.string().max(1000).optional().nullable(),
  coverImage: z.string().url("Must be a valid URL").or(z.literal("")).optional().nullable(),
  galleryImages: z.array(z.string().url()).max(30).default([]),
  githubUrl: z.string().url("Must be a valid URL").or(z.literal("")).optional().nullable(),
  liveDemoUrl: z.string().url("Must be a valid URL").or(z.literal("")).optional().nullable(),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  sortOrder: z.coerce.number().int().default(0),
});

export type ProjectInput = z.infer<typeof projectSchema>;

export const siteContentSchema = z.object({
  siteName: z.string().min(1).max(80),
  logoText: z.string().min(1).max(80),
  heroBadge: z.string().max(120).optional().nullable(),
  heroTitle: z.string().max(160).optional().nullable(),
  heroSubtitle: z.string().max(400).optional().nullable(),
  primaryButtonText: z.string().max(40).optional().nullable(),
  secondaryButtonText: z.string().max(40).optional().nullable(),
  aboutTitle: z.string().max(160).optional().nullable(),
  aboutText: z.string().max(2000).optional().nullable(),
  contactEmail: z.string().email("Invalid email").or(z.literal("")).optional().nullable(),
  githubUrl: z.string().url().or(z.literal("")).optional().nullable(),
  linkedinUrl: z.string().url().or(z.literal("")).optional().nullable(),
  telegramUrl: z.string().url().or(z.literal("")).optional().nullable(),
  seoTitle: z.string().max(160).optional().nullable(),
  seoDescription: z.string().max(320).optional().nullable(),
});

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(5, "Message is too short").max(4000),
  // Honeypot — must stay empty. Bots tend to fill every field.
  website: z.string().max(0).optional().default(""),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});
