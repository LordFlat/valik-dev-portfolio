/**
 * Resolve the public site URL used for canonical links, sitemap, robots,
 * OpenGraph and JSON-LD. Prefers NEXT_PUBLIC_SITE_URL, then the legacy
 * NEXTAUTH_URL, then localhost. Always returned without a trailing slash.
 */
export function siteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXTAUTH_URL ||
    "http://localhost:3000";
  return raw.replace(/\/+$/, "");
}

/** Build an absolute URL for a given path on the public site. */
export function absoluteUrl(path = "/"): string {
  const base = siteUrl();
  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
}
