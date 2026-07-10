import "server-only";
import { Resend } from "resend";

export type ContactNotification = {
  name: string;
  email: string;
  projectType?: string | null;
  message: string;
};

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/**
 * Send a "new enquiry" notification to the studio inbox via Resend.
 *
 * Best-effort by design: if the email env vars are missing it silently no-ops
 * (the message is still stored in the DB), and any transport error is thrown to
 * the caller, which logs it without failing the visitor's form submission.
 *
 * Required env:
 *   RESEND_API_KEY     — from https://resend.com/api-keys
 *   CONTACT_TO_EMAIL   — where enquiries land (e.g. contact@valentyn.studio)
 *   CONTACT_FROM_EMAIL — verified sender, e.g. "Valentyn Studio <no-reply@valentyn.studio>"
 *                        (falls back to Resend's shared onboarding@resend.dev for testing)
 */
export async function sendContactNotification(data: ContactNotification): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "Valentyn Studio <onboarding@resend.dev>";

  if (!apiKey || !to) return; // email delivery not configured — skip quietly

  const resend = new Resend(apiKey);
  const projectType = data.projectType?.trim() || "—";

  await resend.emails.send({
    from,
    to,
    replyTo: data.email,
    subject: `New enquiry from ${data.name}`,
    text: [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Project type: ${projectType}`,
      "",
      data.message,
    ].join("\n"),
    html: `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.6;color:#1a1a1a">
        <h2 style="margin:0 0 16px">New enquiry from ${escapeHtml(data.name)}</h2>
        <p style="margin:0 0 4px"><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p style="margin:0 0 16px"><strong>Project type:</strong> ${escapeHtml(projectType)}</p>
        <p style="white-space:pre-wrap;margin:0;padding:16px;background:#f5f5f4;border-radius:12px">${escapeHtml(
          data.message,
        )}</p>
      </div>
    `,
  });
}
