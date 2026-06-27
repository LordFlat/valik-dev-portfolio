import "server-only";
import { prisma } from "./prisma";

/** Default site content used when the DB has no row yet (keeps pages rendering). */
export const DEFAULT_SITE_CONTENT = {
  id: "default",
  siteName: "Valentyn Studio",
  logoText: "Valentyn Studio",
  heroBadge: "Websites · Landing Pages · Simple Tools",
  heroTitle: "Beautiful websites for businesses that want to be chosen.",
  heroSubtitle:
    "I help local businesses, creators, and small teams turn a basic online presence into a clean, premium website that builds trust and brings more enquiries.",
  primaryButtonText: "View Work",
  secondaryButtonText: "Start a Project",
  aboutTitle: "Clear websites and simple tools for real business problems.",
  aboutText:
    "I'm Valentyn, a web designer based in Evesham, Worcestershire. I build clean landing pages, websites, and practical digital tools for small businesses across Worcestershire, the Cotswolds and the West Midlands — and remotely with clients across the UK. My background in operations helps me turn messy processes into clearer, more useful digital experiences.",
  contactEmail: "",
  githubUrl: "",
  linkedinUrl: "",
  telegramUrl: "",
  instagramUrl: "",
  facebookUrl: "",
  whatsappUrl: "",
  seoTitle: "Valentyn Studio — Web Design in Evesham, Worcestershire",
  seoDescription:
    "Freelance web designer in Evesham, Worcestershire. Premium websites, landing pages and simple digital tools for small businesses across Worcestershire, the Cotswolds and the West Midlands.",
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
