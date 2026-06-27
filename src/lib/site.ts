/** Canonical production domain for the public brand. */
export const PRODUCTION_SITE_URL = "https://valentyn.studio";

/** Business identity & location — used for local SEO (JSON-LD, NAP, copy). */
export const business = {
  name: "Valentyn Studio",
  founder: "Valentyn Varych",
  jobTitle: "Web Designer & Automation Developer",
  locality: "Evesham",
  region: "Worcestershire",
  country: "GB",
  // Approximate coordinates for Evesham, Worcestershire.
  geo: { lat: 52.0917, lng: -1.9476 },
  areasServed: [
    "Evesham",
    "Worcester",
    "Worcestershire",
    "Pershore",
    "Cheltenham",
    "Stratford-upon-Avon",
    "The Cotswolds",
    "West Midlands",
  ],
} as const;

/**
 * Resolve the public site URL used for canonical links, sitemap, robots,
 * OpenGraph and JSON-LD. Always returned without a trailing slash.
 *
 * Order: an explicit NEXT_PUBLIC_SITE_URL always wins (override per env);
 * otherwise in production we use the canonical custom domain so SEO signals
 * point at valentyn.studio even without the dashboard env var set; in
 * development we fall back to NEXTAUTH_URL or localhost.
 */
export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  if (process.env.NODE_ENV === "production") return PRODUCTION_SITE_URL;

  const legacy = process.env.NEXTAUTH_URL?.trim();
  return (legacy || "http://localhost:3000").replace(/\/+$/, "");
}

/** Build an absolute URL for a given path on the public site. */
export function absoluteUrl(path = "/"): string {
  const base = siteUrl();
  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
}
