import type { Metadata } from "next";
import { SiteLink } from "@/components/site/SiteLink";
import { ProjectCard } from "@/components/ProjectCard";
import { JsonLd } from "@/components/site/JsonLd";
import { getFeaturedProjects, getPublishedProjects, getSiteContent } from "@/lib/queries";
import { siteUrl } from "@/lib/site";
import { sameAsLinks } from "@/lib/social";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Valentyn Studio — Websites that help businesses get chosen" },
  description:
    "I help small businesses, creators, and local teams turn a basic online presence into a clean, premium website that builds trust and brings more enquiries.",
  alternates: { canonical: "/" },
};

const services = [
  {
    title: "Landing Pages",
    text: "Premium one-page websites for local businesses, creators, cafés, restaurants, barbers, and service providers.",
  },
  {
    title: "Website Redesign",
    text: "Turn an outdated, broken, or unclear website into a cleaner and more trustworthy online presence.",
  },
  {
    title: "Business Automation",
    text: "Simple tools, forms, dashboards, and bots that reduce repetitive manual work.",
  },
  {
    title: "Content Structure",
    text: "Help organize your offer, services, images, and calls to action so visitors understand what to do next.",
  },
];

const process = [
  { step: "01", title: "Understand", text: "We define what the business needs visitors to see, feel, and do." },
  { step: "02", title: "Structure", text: "We turn the offer, services, content, and calls to action into a clear page flow." },
  { step: "03", title: "Design", text: "I create a clean visual direction that makes the business feel trustworthy and modern." },
  { step: "04", title: "Build", text: "The website or tool is built, deployed, and prepared for real use." },
];

export default async function HomePage() {
  const [site, featured] = await Promise.all([getSiteContent(), getFeaturedProjects()]);
  const selected = (featured.length ? featured : await getPublishedProjects()).slice(0, 6);

  const base = siteUrl();
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: site.siteName,
      url: base,
      description:
        "Premium websites, landing pages, and simple digital tools for small businesses.",
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Valentyn Varych",
      url: base,
      jobTitle: "Web Designer and Automation Developer",
      sameAs: sameAsLinks(site),
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pb-10 pt-20 sm:px-6 sm:pt-28">
        {site.heroBadge && (
          <p className="animate-rise text-sm font-medium uppercase tracking-[0.18em] text-accent">
            {site.heroBadge}
          </p>
        )}
        <h1 className="display-balance mt-6 max-w-4xl animate-rise font-display text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-charcoal sm:text-6xl lg:text-7xl">
          {site.heroTitle || "Beautiful websites for businesses that want to be chosen."}
        </h1>
        <p className="mt-7 max-w-2xl animate-rise text-lg leading-relaxed text-stone">
          {site.heroSubtitle}
        </p>
        <div className="mt-9 flex animate-rise flex-wrap items-center gap-3">
          <SiteLink href="/projects" size="lg" arrow>
            {site.primaryButtonText || "View Work"}
          </SiteLink>
          <SiteLink href="/contact" variant="secondary" size="lg">
            {site.secondaryButtonText || "Start a Project"}
          </SiteLink>
        </div>
      </section>

      {/* Selected work */}
      {selected.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-charcoal sm:text-4xl">
                Selected work
              </h2>
              <p className="mt-3 max-w-xl text-stone">
                Websites, landing pages, and simple digital tools built around clarity, trust,
                and practical business value.
              </p>
            </div>
            <SiteLink href="/projects" variant="ghost" arrow className="hidden shrink-0 sm:inline-flex">
              All work
            </SiteLink>
          </div>

          <div className="mt-10 grid gap-7 sm:grid-cols-2">
            {selected.map((p) => (
              <ProjectCard
                key={p.id}
                project={{
                  slug: p.slug,
                  title: p.title,
                  shortDescription: p.shortDescription,
                  category: p.category,
                  tags: p.tags,
                  coverImage: p.coverImage,
                }}
              />
            ))}
          </div>
        </section>
      )}

      {/* Services */}
      <section id="services" className="scroll-mt-20 border-y border-line bg-paper-deep/60">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-charcoal sm:text-4xl">
            How I can help
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {services.map((s) => (
              <div
                key={s.title}
                className="rounded-3xl border border-line bg-paper-soft p-7 transition-colors hover:border-charcoal/25"
              >
                <h3 className="font-display text-xl font-semibold text-charcoal">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-charcoal sm:text-4xl">
          Simple process
        </h2>
        <div className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p) => (
            <div key={p.step} className="border-t border-charcoal/15 pt-5">
              <span className="font-display text-2xl font-semibold text-accent">{p.step}</span>
              <h3 className="mt-3 text-lg font-semibold text-charcoal">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-8 sm:px-6">
        <div className="rounded-[2rem] bg-charcoal px-7 py-14 text-paper-soft sm:px-14 sm:py-20">
          <h2 className="display-balance max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-5xl">
            Want your business to look better online?
          </h2>
          <p className="mt-5 max-w-xl text-paper-soft/75">
            Send me your current website, Instagram, or idea. I&apos;ll help you shape it into a
            cleaner digital experience.
          </p>
          <div className="mt-8">
            <SiteLink
              href="/contact"
              arrow
              className="bg-paper-soft text-charcoal hover:bg-accent hover:text-paper-soft"
            >
              Start a project
            </SiteLink>
          </div>
        </div>
      </section>
    </>
  );
}
