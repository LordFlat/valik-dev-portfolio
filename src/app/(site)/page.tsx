import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProjectCarousel } from "@/components/ProjectCarousel";
import { getFeaturedProjects, getSiteContent } from "@/lib/queries";

export const dynamic = "force-dynamic";

const directions = [
  {
    title: "Automation",
    tagline: "Work less. Do more.",
    icon: (
      <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83" />
    ),
  },
  {
    title: "Analytics",
    tagline: "See faster. Decide better.",
    icon: <path d="M3 3v18h18M7 16l4-6 4 3 5-7" />,
  },
  {
    title: "AI Workflows",
    tagline: "Capture. Structure. Improve.",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M9 9h6v6H9zM2 10h2m16 0h2M2 14h2m16 0h2M10 2v2m4-2v2m-4 16v2m4-2v2" />
      </>
    ),
  },
];

export default async function HomePage() {
  const [site, featured] = await Promise.all([getSiteContent(), getFeaturedProjects()]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid" aria-hidden />
        <div className="absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-neon-violet/20 blur-[120px]" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-5 pb-10 pt-20 text-center sm:pt-28">
          <Badge className="animate-fade-up">{site.heroBadge}</Badge>
          <h1 className="mt-6 animate-fade-up text-4xl font-bold leading-tight tracking-tight text-ink-white sm:text-6xl">
            {site.heroTitle}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl animate-fade-up text-base text-ink-muted sm:text-lg">
            {site.heroSubtitle}
          </p>
          <div className="mt-8 flex animate-fade-up flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/projects" size="lg">
              {site.primaryButtonText || "View Work"}
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary" size="lg">
              {site.secondaryButtonText || "Contact Me"}
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Carousel */}
      <section className="relative px-3 py-12 sm:px-5 sm:py-16">
        <div className="mx-auto mb-8 max-w-6xl px-2">
          <h2 className="text-sm font-medium uppercase tracking-[0.3em] text-neon-soft/70">
            Featured Work
          </h2>
        </div>
        <ProjectCarousel projects={featured} />
      </section>

      {/* Directions */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {directions.map((d) => (
            <div
              key={d.title}
              className="group rounded-2xl border border-white/10 bg-card p-6 backdrop-blur-md transition-all hover:border-neon-purple/40 hover:shadow-glow-sm"
            >
              <span className="inline-grid h-11 w-11 place-items-center rounded-xl border border-neon-purple/30 bg-neon-purple/10 text-neon-soft transition-colors group-hover:bg-neon-purple/20">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {d.icon}
                </svg>
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink-white">{d.title}</h3>
              <p className="mt-1 text-sm text-ink-muted">{d.tagline}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
