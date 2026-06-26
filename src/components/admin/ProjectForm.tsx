"use client";

import { useFormState } from "react-dom";
import { useState } from "react";
import Link from "next/link";
import type { ProjectFormState } from "@/lib/actions/projects";
import { Field, Input, Textarea } from "@/components/ui/Field";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { Toggle } from "@/components/ui/Toggle";
import { TagInput } from "./TagInput";
import { ImageInput } from "./ImageInput";
import { ImageListInput } from "./ImageListInput";
import { slugify } from "@/lib/utils";

export type ProjectDefaults = {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  tags: string[];
  techStack: string[];
  features: string[];
  problem: string;
  solution: string;
  impact: string;
  coverImage: string;
  galleryImages: string[];
  githubUrl: string;
  liveDemoUrl: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
};

const empty: ProjectDefaults = {
  title: "",
  slug: "",
  shortDescription: "",
  fullDescription: "",
  category: "",
  tags: [],
  techStack: [],
  features: [],
  problem: "",
  solution: "",
  impact: "",
  coverImage: "",
  galleryImages: [],
  githubUrl: "",
  liveDemoUrl: "",
  featured: false,
  published: false,
  sortOrder: 0,
};

const initial: ProjectFormState = {};

export function ProjectForm({
  action,
  defaults = empty,
  submitLabel = "Save project",
  uploadEnabled = false,
}: {
  action: (prev: ProjectFormState, fd: FormData) => Promise<ProjectFormState>;
  defaults?: ProjectDefaults;
  submitLabel?: string;
  uploadEnabled?: boolean;
}) {
  const [state, formAction] = useFormState(action, initial);
  const [slug, setSlug] = useState(defaults.slug);
  const [slugTouched, setSlugTouched] = useState(Boolean(defaults.slug));
  const err = (f: string) => state.fieldErrors?.[f];

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {state.error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {state.error}
        </div>
      )}

      <Section title="Basics">
        <Field label="Title" htmlFor="title" error={err("title")}>
          <Input
            id="title"
            name="title"
            required
            defaultValue={defaults.title}
            error={err("title")}
            onChange={(e) => {
              if (!slugTouched) setSlug(slugify(e.target.value));
            }}
            placeholder="Market Risk Oracle"
          />
        </Field>

        <Field label="Slug" htmlFor="slug" hint="auto-generated, editable" error={err("slug")}>
          <Input
            id="slug"
            name="slug"
            required
            value={slug}
            error={err("slug")}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
            placeholder="market-risk-oracle"
          />
        </Field>

        <Field label="Short description" htmlFor="shortDescription" hint="one line" error={err("shortDescription")}>
          <Input
            id="shortDescription"
            name="shortDescription"
            required
            defaultValue={defaults.shortDescription}
            error={err("shortDescription")}
            placeholder="Crypto signals made readable."
          />
        </Field>

        <Field label="Full description" htmlFor="fullDescription" hint="optional">
          <Textarea
            id="fullDescription"
            name="fullDescription"
            defaultValue={defaults.fullDescription}
            placeholder="A short paragraph shown on the project page."
          />
        </Field>

        <Field label="Category" htmlFor="category" hint="optional">
          <Input id="category" name="category" defaultValue={defaults.category} placeholder="Analytics" />
        </Field>
      </Section>

      <Section title="Project Details">
        <Field label="Tags" hint="press Enter to add">
          <TagInput name="tags" defaultValue={defaults.tags} placeholder="Python, Charts, Signals" />
        </Field>
        <Field label="Tech stack" hint="internal only — not shown on the public page">
          <TagInput name="techStack" defaultValue={defaults.techStack} placeholder="Python, SQLite, Telegram Bot" />
        </Field>
        <Field label="Features (what it does)" hint="press Enter to add">
          <TagInput name="features" defaultValue={defaults.features} placeholder="Signal tracking, Watchlist" />
        </Field>
      </Section>

      <Section title="Images">
        <Field
          label="Cover image"
          hint={uploadEnabled ? "paste a URL or upload — placeholder used if empty" : "optional — placeholder used if empty"}
        >
          <ImageInput
            name="coverImage"
            defaultValue={defaults.coverImage}
            uploadEnabled={uploadEnabled}
            error={err("coverImage")}
          />
        </Field>
        <Field label="Gallery / key screens">
          <ImageListInput
            name="galleryImages"
            defaultValue={defaults.galleryImages}
            uploadEnabled={uploadEnabled}
          />
        </Field>
      </Section>

      <Section title="Case study">
        <Field label="Problem" htmlFor="problem" hint="optional">
          <Textarea id="problem" name="problem" defaultValue={defaults.problem} className="min-h-[80px]" />
        </Field>
        <Field label="Solution" htmlFor="solution" hint="optional">
          <Textarea id="solution" name="solution" defaultValue={defaults.solution} className="min-h-[80px]" />
        </Field>
        <Field label="Impact" htmlFor="impact" hint="optional">
          <Textarea id="impact" name="impact" defaultValue={defaults.impact} className="min-h-[80px]" />
        </Field>
      </Section>

      <Section title="Links">
        <Field label="GitHub URL" htmlFor="githubUrl" hint="optional" error={err("githubUrl")}>
          <Input id="githubUrl" name="githubUrl" defaultValue={defaults.githubUrl} error={err("githubUrl")} placeholder="https://github.com/..." />
        </Field>
        <Field label="Live demo URL" htmlFor="liveDemoUrl" hint="optional" error={err("liveDemoUrl")}>
          <Input id="liveDemoUrl" name="liveDemoUrl" defaultValue={defaults.liveDemoUrl} error={err("liveDemoUrl")} placeholder="https://..." />
        </Field>
      </Section>

      <Section title="Publishing">
        <Toggle name="published" label="Published" description="Visible on the public site" defaultChecked={defaults.published} />
        <Toggle name="featured" label="Featured" description="Shown in the homepage carousel" defaultChecked={defaults.featured} />
        <Field label="Sort order" htmlFor="sortOrder" hint="lower = first">
          <Input id="sortOrder" name="sortOrder" type="number" defaultValue={defaults.sortOrder} className="max-w-[140px]" />
        </Field>
      </Section>

      <div className="flex items-center gap-3 border-t border-white/10 pt-6">
        <SubmitButton pendingText="Saving…">{submitLabel}</SubmitButton>
        <Link href="/admin/projects" className="text-sm text-ink-muted hover:text-ink-white">
          Cancel
        </Link>
      </div>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <legend className="px-2 text-sm font-semibold text-ink-white">
        {title}
      </legend>
      <div className="mt-3 flex flex-col gap-4">{children}</div>
    </fieldset>
  );
}
