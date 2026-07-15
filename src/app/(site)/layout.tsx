import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getSiteContent } from "@/lib/queries";
import { ChatWidget } from "@/components/ChatWidget";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const site = await getSiteContent();
  return (
    <div className="site-shell flex min-h-screen flex-col">
      <Navbar logoText={site.logoText} />
      <main className="flex-1">{children}</main>
      <Footer site={site} />
      <ChatWidget />
    </div>
  );
}
