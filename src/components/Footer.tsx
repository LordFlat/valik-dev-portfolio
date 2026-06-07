import Link from "next/link";
import type { SiteContentData } from "@/lib/queries";

export function Footer({ site }: { site: SiteContentData }) {
  const year = 2026;
  const socials = [
    { label: "GitHub", href: site.githubUrl },
    { label: "LinkedIn", href: site.linkedinUrl },
    { label: "Telegram", href: site.telegramUrl },
    { label: "Email", href: site.contactEmail ? `mailto:${site.contactEmail}` : "" },
  ].filter((s) => s.href);

  return (
    <footer className="mt-24 border-t border-neon-purple/15 bg-bg-secondary/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 font-mono text-base font-bold">
            <span className="h-2 w-2 rounded-full bg-neon-purple" />
            {site.logoText}
          </div>
          <p className="mt-2 max-w-xs text-sm text-ink-muted">
            Practical automation, analytics, and AI tools for real workflows.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href!}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-muted transition-colors hover:text-neon-soft"
            >
              {s.label}
            </a>
          ))}
          <Link href="/contact" className="text-ink-muted transition-colors hover:text-neon-soft">
            Contact
          </Link>
        </div>
      </div>
      <div className="border-t border-neon-purple/10 py-4 text-center text-xs text-ink-muted/70">
        © {year} {site.siteName}. Built with Next.js.
      </div>
    </footer>
  );
}
