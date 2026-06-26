import type { Metadata } from "next";
import { SiteLink } from "@/components/site/SiteLink";
import { getSiteContent } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Valentyn, a UK-based creator building clean websites, landing pages, and simple workflow tools for small businesses and practical projects.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About — Valentyn.dev", url: "/about" },
};

const values = [
  {
    title: "Clarity",
    text: "Visitors should understand what you offer and what to do next within seconds.",
  },
  {
    title: "Trust",
    text: "Clean design, real content, and a confident layout make a business feel credible.",
  },
  {
    title: "Useful design",
    text: "Every section earns its place — design serves the business goal, not decoration.",
  },
  {
    title: "Simple systems",
    text: "Tools and automations should remove manual work, not add new complexity.",
  },
];

export default async function AboutPage() {
  const site = await getSiteContent();

  return (
    <div className="mx-auto max-w-4xl px-5 py-20 sm:px-6 sm:py-28">
      <section>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">About</p>
        <h1 className="display-balance mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-charcoal sm:text-6xl">
          I build websites and tools that make messy business ideas easier to understand.
        </h1>
        <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-stone">
          <p>{site.aboutText}</p>
          <p>
            My background in real operations helps me understand messy processes, unclear
            communication, and manual work. I use that experience to create websites and tools
            that feel clear, useful, and easy to manage.
          </p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-charcoal">
          What I care about
        </h2>
        <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="border-t border-charcoal/15 pt-5">
              <h3 className="text-lg font-semibold text-charcoal">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 border-t border-line pt-10">
        <div className="flex flex-wrap items-center gap-3">
          <SiteLink href="/contact" arrow>
            Start a project
          </SiteLink>
          <SiteLink href="/projects" variant="secondary">
            View work
          </SiteLink>
        </div>
      </section>
    </div>
  );
}
