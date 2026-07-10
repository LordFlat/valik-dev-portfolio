"use client";

import { useFormState } from "react-dom";
import {
  updateSiteContentAction,
  type ContentFormState,
} from "@/lib/actions/content";
import { Field, Input, Textarea } from "@/components/ui/Field";
import { SubmitButton } from "@/components/ui/SubmitButton";
import type { SiteContentData } from "@/lib/queries";

const initial: ContentFormState = {};

export function SiteContentForm({ content }: { content: SiteContentData }) {
  const [state, action] = useFormState(updateSiteContentAction, initial);
  const err = (f: string) => state.fieldErrors?.[f];

  return (
    <form action={action} className="flex flex-col gap-6">
      {state.error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {state.error}
        </div>
      )}
      {state.success && (
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          Saved. Changes are live.
        </div>
      )}

      <Section title="Branding">
        <Field label="Site name" htmlFor="siteName" error={err("siteName")}>
          <Input id="siteName" name="siteName" required defaultValue={content.siteName} error={err("siteName")} />
        </Field>
        <Field label="Logo text" htmlFor="logoText" error={err("logoText")}>
          <Input id="logoText" name="logoText" required defaultValue={content.logoText} error={err("logoText")} />
        </Field>
      </Section>

      <Section title="Hero">
        <Field label="Hero badge" htmlFor="heroBadge">
          <Input id="heroBadge" name="heroBadge" defaultValue={content.heroBadge ?? ""} />
        </Field>
        <Field label="Hero title" htmlFor="heroTitle">
          <Input id="heroTitle" name="heroTitle" defaultValue={content.heroTitle ?? ""} />
        </Field>
        <Field label="Hero subtitle" htmlFor="heroSubtitle">
          <Textarea id="heroSubtitle" name="heroSubtitle" defaultValue={content.heroSubtitle ?? ""} className="min-h-[80px]" />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Primary button text" htmlFor="primaryButtonText">
            <Input id="primaryButtonText" name="primaryButtonText" defaultValue={content.primaryButtonText ?? ""} />
          </Field>
          <Field label="Secondary button text" htmlFor="secondaryButtonText">
            <Input id="secondaryButtonText" name="secondaryButtonText" defaultValue={content.secondaryButtonText ?? ""} />
          </Field>
        </div>
      </Section>

      <Section title="About">
        <Field label="About title" htmlFor="aboutTitle">
          <Input id="aboutTitle" name="aboutTitle" defaultValue={content.aboutTitle ?? ""} />
        </Field>
        <Field label="About text" htmlFor="aboutText">
          <Textarea id="aboutText" name="aboutText" defaultValue={content.aboutText ?? ""} className="min-h-[120px]" />
        </Field>
      </Section>

      <Section title="Contact & socials">
        <p className="text-xs text-ink-muted">
          Empty links are hidden on the public site. WhatsApp accepts a full link or a phone
          number; Telegram accepts a full link or a @username.
        </p>
        <Field label="Contact email" htmlFor="contactEmail" error={err("contactEmail")}>
          <Input id="contactEmail" name="contactEmail" type="email" defaultValue={content.contactEmail ?? ""} error={err("contactEmail")} />
        </Field>
        <Field label="Phone" htmlFor="phone" error={err("phone")}>
          <Input id="phone" name="phone" type="tel" placeholder="+44 7…" defaultValue={content.phone ?? ""} error={err("phone")} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Instagram URL" htmlFor="instagramUrl" error={err("instagramUrl")}>
            <Input id="instagramUrl" name="instagramUrl" placeholder="https://instagram.com/…" defaultValue={content.instagramUrl ?? ""} error={err("instagramUrl")} />
          </Field>
          <Field label="Facebook URL" htmlFor="facebookUrl" error={err("facebookUrl")}>
            <Input id="facebookUrl" name="facebookUrl" placeholder="https://facebook.com/…" defaultValue={content.facebookUrl ?? ""} error={err("facebookUrl")} />
          </Field>
          <Field label="WhatsApp (link or phone)" htmlFor="whatsappUrl" error={err("whatsappUrl")}>
            <Input id="whatsappUrl" name="whatsappUrl" placeholder="+44 7… or https://wa.me/…" defaultValue={content.whatsappUrl ?? ""} error={err("whatsappUrl")} />
          </Field>
          <Field label="Telegram (link or @username)" htmlFor="telegramUrl" error={err("telegramUrl")}>
            <Input id="telegramUrl" name="telegramUrl" placeholder="@username or https://t.me/…" defaultValue={content.telegramUrl ?? ""} error={err("telegramUrl")} />
          </Field>
          <Field label="GitHub URL" htmlFor="githubUrl" error={err("githubUrl")}>
            <Input id="githubUrl" name="githubUrl" defaultValue={content.githubUrl ?? ""} error={err("githubUrl")} />
          </Field>
          <Field label="LinkedIn URL" htmlFor="linkedinUrl" error={err("linkedinUrl")}>
            <Input id="linkedinUrl" name="linkedinUrl" defaultValue={content.linkedinUrl ?? ""} error={err("linkedinUrl")} />
          </Field>
        </div>
      </Section>

      <Section title="SEO">
        <Field label="SEO title" htmlFor="seoTitle">
          <Input id="seoTitle" name="seoTitle" defaultValue={content.seoTitle ?? ""} />
        </Field>
        <Field label="SEO description" htmlFor="seoDescription">
          <Textarea id="seoDescription" name="seoDescription" defaultValue={content.seoDescription ?? ""} className="min-h-[80px]" />
        </Field>
      </Section>

      <div className="border-t border-white/10 pt-6">
        <SubmitButton pendingText="Saving…">Save changes</SubmitButton>
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
