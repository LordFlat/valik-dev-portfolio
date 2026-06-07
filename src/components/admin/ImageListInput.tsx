"use client";

import { useState } from "react";
import { UploadButton } from "./UploadButton";
import { FieldError } from "@/components/ui/Field";

/**
 * Gallery URL editor with thumbnail previews. Stores URLs in a hidden
 * comma-separated input named `name`. Accepts pasted URLs and, when
 * Cloudinary is configured, direct (multi-file) uploads.
 */
export function ImageListInput({
  name,
  defaultValue = [],
  uploadEnabled = false,
}: {
  name: string;
  defaultValue?: string[];
  uploadEnabled?: boolean;
}) {
  const [urls, setUrls] = useState<string[]>(defaultValue);
  const [draft, setDraft] = useState("");
  const [uploadError, setUploadError] = useState("");

  const addMany = (incoming: string[]) => {
    setUrls((prev) => {
      const next = [...prev];
      for (const u of incoming) {
        const v = u.trim();
        if (v && !next.includes(v)) next.push(v);
      }
      return next;
    });
  };
  const remove = (i: number) => setUrls(urls.filter((_, idx) => idx !== i));

  return (
    <div>
      <input type="hidden" name={name} value={urls.join(", ")} />
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addMany([draft]);
              setDraft("");
            }
          }}
          placeholder={uploadEnabled ? "https://… or upload images" : "https://image-url.com/screen.png"}
          className="flex-1 rounded-lg border border-white/10 bg-bg-secondary/60 px-3.5 py-2.5 text-sm text-ink-white placeholder:text-ink-muted/60 focus:border-neon-purple/60 focus:outline-none"
        />
        <button
          type="button"
          onClick={() => {
            addMany([draft]);
            setDraft("");
          }}
          className="rounded-lg border border-neon-purple/30 bg-neon-purple/10 px-4 text-sm text-neon-soft hover:bg-neon-purple/20"
        >
          Add
        </button>
        {uploadEnabled && (
          <UploadButton multiple label="Upload" onUploaded={addMany} onError={setUploadError} />
        )}
      </div>

      <FieldError message={uploadError} />

      {urls.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {urls.map((url, i) => (
            <div
              key={url + i}
              className="group relative overflow-hidden rounded-lg border border-white/10 bg-bg-navy"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-24 w-full object-cover" />
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-md bg-black/70 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Remove image"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
