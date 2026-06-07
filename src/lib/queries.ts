import "server-only";
import { prisma } from "./prisma";

/** Default site content used when the DB has no row yet (keeps pages rendering). */
export const DEFAULT_SITE_CONTENT = {
  id: "default",
  siteName: "WorkFlow.dev",
  logoText: "WorkFlow.dev",
  heroBadge: "BUILD • AUTOMATE • SCALE",
  heroTitle: "Automation that makes work easier",
  heroSubtitle:
    "I build Python automation, analytics, and AI-powered tools that solve real workflow problems.",
  primaryButtonText: "View Work",
  secondaryButtonText: "Contact Me",
  aboutTitle: "Practical tools for real workflows.",
  aboutText:
    "I'm Valentyn Varych, a beginner developer focused on Python, automation, analytics, and AI-powered tools. My background in real operational work helps me notice messy processes and turn them into simple digital systems.",
  contactEmail: "",
  githubUrl: "",
  linkedinUrl: "",
  telegramUrl: "",
  seoTitle: "WorkFlow.dev — Python Automation Portfolio",
  seoDescription:
    "Portfolio of Python automation, analytics, and AI workflow projects by Valentyn Varych.",
  updatedAt: new Date(),
};

export type SiteContentData = typeof DEFAULT_SITE_CONTENT;

/** Read the singleton site content, falling back to defaults. */
export async function getSiteContent(): Promise<SiteContentData> {
  try {
    const row = await prisma.siteContent.findFirst();
    if (!row) return DEFAULT_SITE_CONTENT;
    return row as unknown as SiteContentData;
  } catch {
    return DEFAULT_SITE_CONTENT;
  }
}

export async function getFeaturedProjects() {
  try {
    return await prisma.project.findMany({
      where: { published: true, featured: true },
      orderBy: { sortOrder: "asc" },
    });
  } catch {
    return [];
  }
}

export async function getPublishedProjects() {
  try {
    return await prisma.project.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    });
  } catch {
    return [];
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    return await prisma.project.findUnique({ where: { slug } });
  } catch {
    return null;
  }
}
