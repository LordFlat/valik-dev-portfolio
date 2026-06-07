import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getSiteContent } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const site = await getSiteContent();
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar logoText={site.logoText} />
      <main className="flex-1">{children}</main>
      <Footer site={site} />
    </div>
  );
}
