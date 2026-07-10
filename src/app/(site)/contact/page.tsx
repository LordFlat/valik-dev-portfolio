import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SocialTextLinks } from "@/components/site/SocialLinks";
import { JsonLd } from "@/components/site/JsonLd";
import { getSiteContent } from "@/lib/queries";
import { buildSocialLinks } from "@/lib/social";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Tell me about your website, landing page, redesign, or automation idea. I'll help you shape it into a cleaner digital experience.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Start a Project — Valentyn Studio", url: "/contact" },
};

export default async function ContactPage() {
  const site = await getSiteContent();
  const socials = buildSocialLinks(site);
  const quick = socials.filter((s) =>
    ["phone", "whatsapp", "telegram", "email", "instagram"].includes(s.key),
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Start a Project — Valentyn Studio",
    url: absoluteUrl("/contact"),
  };

  return (
    <div className="mx-auto max-w-3xl px-5 py-20 sm:px-6 sm:py-28">
      <JsonLd data={jsonLd} />

      <header>
        <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-charcoal sm:text-6xl">
          Tell me what you want to improve.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-stone">
          Send me your current website, Instagram, or idea. I&apos;ll help you think through a
          cleaner direction.
        </p>
      </header>

      <div className="mt-12 rounded-[1.75rem] border border-line bg-paper-soft p-6 sm:p-9">
        <ContactForm />
      </div>

      {quick.length > 0 && (
        <div className="mt-10 rounded-2xl border border-line bg-paper-deep/50 p-6">
          <p className="text-sm font-medium text-charcoal">Prefer a quick message?</p>
          <SocialTextLinks links={quick} className="mt-3" />
        </div>
      )}
    </div>
  );
}
