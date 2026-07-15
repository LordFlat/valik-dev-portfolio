import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Valentyn Studio collects, uses, and protects the personal information you share when enquiring about a website or project.",
  alternates: { canonical: "/privacy" },
  openGraph: { title: "Privacy Policy — Valentyn Studio", url: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-20 sm:px-6 sm:py-28">
      <header>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">Legal</p>
        <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-charcoal sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-stone">Last updated: 14 July 2026</p>
      </header>

      <div className="mt-10 space-y-6 text-base leading-relaxed text-stone">
        <p>
          Valentyn Studio collects personal information such as your name, email address, phone
          number, details about your website project and website-chat transcripts when you submit
          an enquiry through our website, website assistant, Facebook or Instagram.
        </p>

        <div>
          <p>We use this information to:</p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5">
            <li>respond to your enquiry and review the context of your website chat;</li>
            <li>provide a website review or quotation;</li>
            <li>discuss and deliver requested services;</li>
            <li>maintain records relating to client enquiries and projects.</li>
          </ul>
        </div>

        <p>
          We do not sell your personal information. Your information may be processed using service
          providers such as Meta, email providers and website hosting services where necessary to
          handle your enquiry.
        </p>

        <p>
          We retain enquiry information only for as long as reasonably necessary for communication,
          record keeping and legal purposes.
        </p>

        <p>
          You may request access to, correction of or deletion of your personal information by
          contacting:
        </p>

        <div className="rounded-2xl border border-line bg-paper-soft p-6 text-sm not-italic leading-relaxed text-charcoal">
          <p className="font-semibold">Valentyn Studio</p>
          <p className="mt-1 text-stone">
            Email:{" "}
            <a
              href="mailto:contact@valentyn.studio"
              className="text-charcoal underline underline-offset-2 transition-colors hover:text-accent"
            >
              contact@valentyn.studio
            </a>
          </p>
          <p className="text-stone">
            Website:{" "}
            <a
              href="https://valentyn.studio"
              className="text-charcoal underline underline-offset-2 transition-colors hover:text-accent"
            >
              https://valentyn.studio
            </a>
          </p>
        </div>

        <p>
          You also have the right to raise a concern with the UK Information Commissioner&rsquo;s
          Office.
        </p>
      </div>
    </div>
  );
}
