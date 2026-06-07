import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import {
  isCloudinaryConfigured,
  createUploadSignature,
  UPLOAD_FOLDER,
} from "@/lib/cloudinary";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Returns the parameters the browser needs to upload directly to Cloudinary.
 * Admin-only. The api_secret never leaves the server — only the derived signature is sent.
 */
export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isCloudinaryConfigured()) {
    return NextResponse.json({ error: "Cloudinary is not configured." }, { status: 400 });
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = UPLOAD_FOLDER;
  const signature = createUploadSignature(timestamp, folder);

  return NextResponse.json({
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    timestamp,
    folder,
    signature,
  });
}
