import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { getSiteContent } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description: "I build practical tools for real workflow problems.",
};

const whatIBuild = [
  "Internal tools",
  "Automation scripts",
  "Telegram bots",
  "Analytics dashboards",
  "AI workflows",
];

const howIThink = [
  "Find the messy process",
  "Structure the logic",
  "Build a useful tool",
  "Improve from real feedback",
];

const stack = [
  "Python", "FastAPI", "SQLite", "PostgreSQL", "SQLAlchemy", "Telegram Bot API",
  "API Integration", "HTML", "CSS", "Jinja2", "Git", "GitHub",
  "Data Visualization", "Automation Scripts", "Workflow Design", "AI Tools",
];

export default async function AboutPage() {
  const site = await getSiteContent();

  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <section>
        <Badge>About</Badge>
        <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-ink-white sm:text-5xl">
          I build practical tools for real workflow problems.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">{site.aboutText}</p>
      </section>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        <Panel title="What I build">
          <ul className="space-y-2.5">
            {whatIBuild.map((i) => (
              <li key={i} className="flex items-center gap-2.5 text-ink-white">
                <span className="h-1.5 w-1.5 rounded-full bg-neon-purple" />
                {i}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="How I think">
          <ol className="space-y-3">
            {howIThink.map((step, i) => (
              <li key={step} className="flex items-start gap-3 text-ink-white">
                <span className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-md border border-neon-purple/30 bg-neon-purple/10 font-mono text-xs text-neon-soft">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </Panel>
      </div>

      <section id="stack" className="mt-14 scroll-mt-24">
        <Panel title="Stack">
          <div className="flex flex-wrap gap-2">
            {stack.map((t) => (
              <span
                key={t}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-ink-muted transition-colors hover:border-neon-purple/40 hover:text-ink-white"
              >
                {t}
              </span>
            ))}
          </div>
        </Panel>
      </section>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-card p-6 backdrop-blur-md">
      <h2 className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-neon-soft/70">
        {title}
      </h2>
      {children}
    </div>
  );
}
