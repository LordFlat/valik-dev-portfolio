import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { getSiteContent } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact",
  description: "Let's build something useful.",
};

export default async function ContactPage() {
  const site = await getSiteContent();

  const links = [
    { label: "GitHub", href: site.githubUrl },
    { label: "LinkedIn", href: site.linkedinUrl },
    { label: "Telegram", href: site.telegramUrl },
    { label: "Email", href: site.contactEmail ? `mailto:${site.contactEmail}` : "" },
  ].filter((l) => l.href);

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <header>
        <h1 className="text-4xl font-bold tracking-tight text-ink-white sm:text-5xl">
          Let&apos;s build something useful.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-ink-muted">
          I&apos;m open to junior developer roles, automation projects, and practical workflow
          tools.
        </p>
      </header>

      <div className="mt-10 rounded-2xl border border-white/10 bg-card p-6 backdrop-blur-md sm:p-8">
        <ContactForm />
      </div>

      {links.length > 0 && (
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="text-sm text-ink-muted">Or reach me on</span>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href!}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-ink-muted transition-all hover:border-neon-purple/40 hover:text-neon-soft"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
