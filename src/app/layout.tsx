import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { getSiteContent } from "@/lib/queries";
import { siteUrl } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContent();
  const title =
    site.seoTitle || "Valentyn.dev — Websites, Landing Pages and Digital Tools";
  const description =
    site.seoDescription ||
    "Premium websites, landing pages, and simple automation tools for small businesses, creators, and practical workflows.";

  return {
    metadataBase: new URL(siteUrl()),
    title: {
      default: title,
      template: `%s — ${site.siteName}`,
    },
    description,
    icons: { icon: "/favicon.svg" },
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description,
      type: "website",
      url: siteUrl(),
      siteName: site.siteName,
      locale: "en_GB",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
