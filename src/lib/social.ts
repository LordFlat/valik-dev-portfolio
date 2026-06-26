import type { SiteContentData } from "@/lib/queries";

export type SocialKey =
  | "instagram"
  | "facebook"
  | "whatsapp"
  | "telegram"
  | "github"
  | "linkedin"
  | "email";

export type SocialLink = {
  key: SocialKey;
  label: string;
  href: string;
};

const isUrl = (v: string) => /^https?:\/\//i.test(v.trim());

/** Normalize a WhatsApp value: accept a full URL or a phone number → wa.me link. */
function whatsappHref(value: string): string {
  const v = value.trim();
  if (!v) return "";
  if (isUrl(v)) return v;
  const digits = v.replace(/[^\d]/g, "");
  return digits ? `https://wa.me/${digits}` : "";
}

/** Normalize a Telegram value: accept a full URL or a @username / username. */
function telegramHref(value: string): string {
  const v = value.trim();
  if (!v) return "";
  if (isUrl(v)) return v;
  const handle = v.replace(/^@/, "");
  return handle ? `https://t.me/${handle}` : "";
}

/**
 * Build the ordered list of public social/contact links from site content.
 * Empty values are omitted so the UI never renders dead links.
 */
export function buildSocialLinks(site: SiteContentData): SocialLink[] {
  const out: SocialLink[] = [];

  const push = (key: SocialKey, label: string, href: string) => {
    if (href && href.trim()) out.push({ key, label, href: href.trim() });
  };

  push("instagram", "Instagram", site.instagramUrl ?? "");
  push("facebook", "Facebook", site.facebookUrl ?? "");
  push("whatsapp", "WhatsApp", whatsappHref(site.whatsappUrl ?? ""));
  push("telegram", "Telegram", telegramHref(site.telegramUrl ?? ""));
  push("github", "GitHub", site.githubUrl ?? "");
  push("linkedin", "LinkedIn", site.linkedinUrl ?? "");
  push("email", "Email", site.contactEmail ? `mailto:${site.contactEmail}` : "");

  return out;
}

/** URLs usable as schema.org sameAs (excludes mailto / messaging links). */
export function sameAsLinks(site: SiteContentData): string[] {
  return [site.githubUrl, site.linkedinUrl, site.instagramUrl, site.facebookUrl]
    .map((v) => (v ?? "").trim())
    .filter((v) => isUrl(v));
}
