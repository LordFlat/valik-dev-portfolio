import { SiteContentForm } from "@/components/admin/SiteContentForm";
import { getSiteContent } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function SiteContentPage() {
  const content = await getSiteContent();

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-white">Site content</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Edit the main information shown across the site.
      </p>

      <div className="mt-8">
        <SiteContentForm content={content} />
      </div>
    </div>
  );
}
