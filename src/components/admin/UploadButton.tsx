"use client";

import { useRef, useState } from "react";
import { uploadToCloudinary } from "@/lib/cloudinary-client";
import { cn } from "@/lib/utils";

export function UploadButton({
  multiple = false,
  label = "Upload",
  onUploaded,
  onError,
  className,
}: {
  multiple?: boolean;
  label?: string;
  onUploaded: (urls: string[]) => void;
  onError?: (message: string) => void;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setBusy(true);
    onError?.("");
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        urls.push(await uploadToCloudinary(file));
      }
      onUploaded(urls);
    } catch (e) {
      onError?.(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <button
        type="button"
        disabled={busy}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-neon-purple/30 bg-neon-purple/10 px-4 py-2.5 text-sm text-neon-soft transition-all hover:bg-neon-purple/20 disabled:opacity-50",
          className,
        )}
      >
        {busy && (
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-neon-soft/40 border-t-neon-soft" />
        )}
        {busy ? "Uploading…" : label}
      </button>
    </>
  );
}
