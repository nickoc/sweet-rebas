"use client";

import { useEffect, useState } from "react";
import type { GalleryImage } from "@/lib/galleries";

// Owner-managed photo gallery (from the Bearing portal). Renders nothing when
// the owner hasn't added photos, so a page with an empty gallery shows no empty
// section. Click a photo to enlarge. Uses plain <img> (bucket-hosted URLs) to
// avoid next/image remote-host constraints.
export default function OwnerGallery({
  photos,
  heading = "Our Cakes",
}: {
  photos: GalleryImage[];
  heading?: string;
}) {
  const [zoom, setZoom] = useState<GalleryImage | null>(null);

  useEffect(() => {
    if (!zoom) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setZoom(null);
    }
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoom]);

  if (!photos.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <h2 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl text-reba-ink text-center mb-10">
        {heading}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {photos.map((p, i) => (
          <button
            key={`${p.src}-${i}`}
            onClick={() => setZoom(p)}
            className="group relative aspect-square rounded-2xl overflow-hidden bg-reba-card focus:outline-none focus:ring-2 focus:ring-reba-pink"
            aria-label={p.alt || `Cake photo ${i + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.src}
              alt={p.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </button>
        ))}
      </div>

      {zoom && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setZoom(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setZoom(null)}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white border border-reba-border rounded-full w-10 h-10 flex items-center justify-center text-reba-ink hover:text-reba-pink transition-colors shadow-md"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={zoom.src} alt={zoom.alt} className="w-full h-auto object-cover" />
            {zoom.alt && (
              <div className="p-4 text-center">
                <h3 className="font-[family-name:var(--font-heading)] text-2xl text-reba-ink">
                  {zoom.alt}
                </h3>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
