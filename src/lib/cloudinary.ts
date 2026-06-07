import "server-only";
import crypto from "crypto";

/** All uploads land in this Cloudinary folder. */
export const UPLOAD_FOLDER = "workflow-dev";

/** True when the three Cloudinary env vars are present. */
export function isCloudinaryConfigured(): boolean {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  );
}

/**
 * Build a Cloudinary upload signature.
 * Signature = sha1( "<sorted params joined by &>" + api_secret ).
 * Only `folder` and `timestamp` are signed (and must be sent unchanged by the client).
 */
export function createUploadSignature(timestamp: number, folder: string): string {
  const secret = process.env.CLOUDINARY_API_SECRET!;
  const toSign = `folder=${folder}&timestamp=${timestamp}`;
  return crypto.createHash("sha1").update(toSign + secret).digest("hex");
}
