/**
 * Browser-side Cloudinary upload. Asks our admin-only API for a signature,
 * then uploads the file straight to Cloudinary and returns the secure URL.
 * Runs only in client components.
 */

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

export async function uploadToCloudinary(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files are allowed.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Image is too large (max 10 MB).");
  }

  const sigRes = await fetch("/api/admin/upload-signature", { method: "POST" });
  if (!sigRes.ok) {
    const body = await sigRes.json().catch(() => ({}));
    throw new Error(body.error || "Could not start upload.");
  }
  const { cloudName, apiKey, timestamp, folder, signature } = await sigRes.json();

  const fd = new FormData();
  fd.append("file", file);
  fd.append("api_key", apiKey);
  fd.append("timestamp", String(timestamp));
  fd.append("folder", folder);
  fd.append("signature", signature);

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: fd },
  );
  if (!uploadRes.ok) {
    const body = await uploadRes.json().catch(() => ({}));
    throw new Error(body?.error?.message || "Upload failed.");
  }

  const data = await uploadRes.json();
  return data.secure_url as string;
}
