"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Key-screens gallery: a large preview with thumbnail strip below.
 * Captions are derived from the index when none are provided.
 */
export function ProjectGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);

  if (!images.length) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative overflow-hidden rounded-2xl border border-neon-purple/20 bg-bg-navy">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[active]}
          alt={`${title} screen ${active + 1}`}
          className="max-h-[520px] w-full object-contain"
        />
        <div className="absolute bottom-3 left-3 rounded-md bg-black/70 px-2.5 py-1 text-xs text-ink-muted backdrop-blur">
          {active + 1} / {images.length}
        </div>
      </div>

      {images.length > 1 && (
        <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setActive(i)}
              aria-label={`View screen ${i + 1}`}
              className={cn(
                "relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border transition-all",
                i === active
                  ? "border-neon-purple/70 shadow-glow-sm"
                  : "border-white/10 opacity-60 hover:opacity-100",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
