"use client";

import { useState } from "react";
import { UploadButton } from "./UploadButton";
import { FieldError } from "@/components/ui/Field";
import { cn } from "@/lib/utils";

/**
 * Single image field (e.g. cover). Submits the URL via an input named `name`.
 * Accepts a pasted URL and, when Cloudinary is configured, direct uploads.
 */
export function ImageInput({
  name,
  defaultValue = "",
  uploadEnabled = false,
  error,
}: {
  name: string;
  defaultValue?: string;
  uploadEnabled?: boolean;
  error?: string;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [uploadError, setUploadError] = useState("");

  return (
    <div>
      <div className="flex gap-2">
        <input
          name={name}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={uploadEnabled ? "https://… or upload an image" : "https://…"}
          className={cn(
            "flex-1 rounded-lg border border-white/10 bg-bg-secondary/60 px-3.5 py-2.5 text-sm text-ink-white placeholder:text-ink-muted/60 transition-colors focus:border-neon-purple/60 focus:outline-none focus:ring-1 focus:ring-neon-purple/40",
            error && "border-red-500/60",
          )}
        />
        {uploadEnabled && (
          <UploadButton
            label="Upload"
            onUploaded={(urls) => urls[0] && setUrl(urls[0])}
            onError={setUploadError}
          />
        )}
      </div>

      <FieldError message={error || uploadError} />

      {url && (
        <div className="group relative mt-3 inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt=""
            className="h-40 w-full max-w-md rounded-lg border border-white/10 object-cover"
          />
          <button
            type="button"
            onClick={() => setUrl("")}
            className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-md bg-black/70 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100"
            aria-label="Remove image"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
