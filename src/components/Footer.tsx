import Link from "next/link";
import type { SiteContentData } from "@/lib/queries";
import { buildSocialLinks } from "@/lib/social";
import { SocialLinks } from "@/components/site/SocialLinks";

const nav = [
  { href: "/projects", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Footer({ site }: { site: SiteContentData }) {
  const socials = buildSocialLinks(site);

  return (
    <footer className="mt-28 border-t border-line bg-paper-deep">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2">
          <div className="max-w-sm">
            <Link href="/" className="text-xl font-semibold tracking-tight text-charcoal">
              {site.logoText}
              <span className="text-accent">.</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-stone">
              Clean websites, landing pages, and simple digital tools that help small
              businesses look more professional and bring more enquiries.
            </p>
            {socials.length > 0 && <SocialLinks links={socials} className="mt-5" size="sm" />}
          </div>

          <div className="sm:justify-self-end">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-stone">
              Explore
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {nav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-stone transition-colors hover:text-charcoal">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-stone sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Valentyn Varych</span>
          <span>Websites · Landing Pages · Simple Tools</span>
        </div>
      </div>
    </footer>
  );
}
