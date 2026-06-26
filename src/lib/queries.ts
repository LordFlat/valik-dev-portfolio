import "server-only";
import { prisma } from "./prisma";

/** Default site content used when the DB has no row yet (keeps pages rendering). */
export const DEFAULT_SITE_CONTENT = {
  id: "default",
  siteName: "Valentyn.dev",
  logoText: "Valentyn.dev",
  heroBadge: "Websites · Landing Pages · Simple Tools",
  heroTitle: "Beautiful websites for businesses that want to be chosen.",
  heroSubtitle:
    "I help local businesses, creators, and small teams turn a basic online presence into a clean, premium website that builds trust and brings more enquiries.",
  primaryButtonText: "View Work",
  secondaryButtonText: "Start a Project",
  aboutTitle: "Clear websites and simple tools for real business problems.",
  aboutText:
    "I'm Valentyn, based in the UK. I build clean landing pages, websites, and practical digital tools for small businesses and real workflows. My background in operations helps me understand messy processes and turn them into clearer digital experiences.",
  contactEmail: "",
  githubUrl: "",
  linkedinUrl: "",
  telegramUrl: "",
  instagramUrl: "",
  facebookUrl: "",
  whatsappUrl: "",
  seoTitle: "Valentyn.dev — Websites, Landing Pages and Digital Tools",
  seoDescription:
    "Premium websites, landing pages, and simple automation tools for small businesses, creators, and practical workflows.",
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
