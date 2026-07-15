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

export type ChatNotification = {
  name: string;
  email: string;
  projectSummary?: string | null;
  sourcePage?: string | null;
  transcript: Array<{
    role: "visitor" | "assistant";
    text: string;
  }>;
};

/** Send the full website-chat transcript to the studio inbox. */
export async function sendChatNotification(data: ChatNotification): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "contact@valentyn.studio";
  const from = process.env.CONTACT_FROM_EMAIL || "Valentyn Studio <onboarding@resend.dev>";

  if (!apiKey) return;

  const resend = new Resend(apiKey);
  const summary = data.projectSummary?.trim() || "Not provided";
  const sourcePage = data.sourcePage?.trim() || "/";
  const transcriptText = data.transcript
    .map((message) => `${message.role === "visitor" ? "Visitor" : "Assistant"}: ${message.text}`)
    .join("\n\n");

  const transcriptHtml = data.transcript
    .map((message) => {
      const label = message.role === "visitor" ? data.name : "Studio Assistant";
      const background = message.role === "visitor" ? "#111111" : "#f7f3ea";
      const color = message.role === "visitor" ? "#fffdf8" : "#111111";

      return `
        <div style="margin:0 0 12px">
          <div style="margin:0 0 4px;font-size:12px;font-weight:700;color:#6b665f">${escapeHtml(label)}</div>
          <div style="display:inline-block;max-width:680px;padding:11px 14px;border-radius:14px;background:${background};color:${color};white-space:pre-wrap">${escapeHtml(
            message.text,
          )}</div>
        </div>
      `;
    })
    .join("");

  await resend.emails.send({
    from,
    to,
    replyTo: data.email,
    subject: `New chatbot enquiry from ${data.name}`,
    text: [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Source page: ${sourcePage}`,
      `Project summary: ${summary}`,
      "",
      "Chat transcript:",
      transcriptText,
    ].join("\n"),
    html: `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.55;color:#111111;max-width:760px;margin:0 auto">
        <div style="padding:24px;border:1px solid #e5dfd4;border-radius:20px;background:#fffdf8">
          <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#c2502e">Valentyn Studio</p>
          <h2 style="margin:0 0 18px;font-size:24px">New chatbot enquiry from ${escapeHtml(data.name)}</h2>
          <p style="margin:0 0 4px"><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          <p style="margin:0 0 4px"><strong>Source page:</strong> ${escapeHtml(sourcePage)}</p>
          <p style="margin:0 0 20px"><strong>Project summary:</strong> ${escapeHtml(summary)}</p>
          <div style="height:1px;background:#e5dfd4;margin:0 0 20px"></div>
          ${transcriptHtml}
        </div>
      </div>
    `,
  });
}
