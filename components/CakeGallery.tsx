"use client";

import { useState, useEffect } from "react";

interface GalleryProps {
  images: { src: string; alt: string }[];
  aspectRatio?: string;
}

function ZoomModal({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKey);
    return () => { document.removeEventListener("keydown", handleKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white border border-reba-border rounded-full w-10 h-10 flex items-center justify-center text-reba-cream hover:text-reba-pink transition-colors shadow-md" aria-label="Close">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <img src={src} alt={alt} className="w-full object-cover" />
        <div className="p-4 text-center">
          <h3 className="font-[family-name:var(--font-heading)] text-2xl text-reba-cream">{alt}</h3>
        </div>
      </div>
    </div>
  );
}

export function CakeSlideshow({ images }: GalleryProps) {
  const [current, setCurrent] = useState(0);
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="max-w-md mx-auto">
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg cursor-zoom-in" onClick={() => setZoom(images[current])}>
        {images.map((img, i) => (
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      <div className="flex justify-center gap-2.5 mt-5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === current ? "bg-reba-pink" : "bg-reba-border"
            }`}
          />
        ))}
      </div>
      {zoom && <ZoomModal src={zoom.src} alt={zoom.alt} onClose={() => setZoom(null)} />}
    </div>
  );
}

export function CakeCarousel({ images }: GalleryProps) {
  const doubled = [...images, ...images];
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null);

  return (
    <div className="overflow-hidden rounded-2xl">
      <div
        className="flex gap-4 animate-scroll"
        style={{
          width: `${doubled.length * 320}px`,
        }}
      >
        {doubled.map((img, i) => (
          <img
            key={img.src + "-" + i}
            src={img.src}
            alt={img.alt}
            className="w-[300px] h-[440px] object-cover rounded-2xl shadow-lg flex-shrink-0 cursor-zoom-in hover:scale-105 transition-transform duration-300"
            onClick={() => setZoom(img)}
          />
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${images.length * 316}px); }
        }
        .animate-scroll {
          animation: scroll ${images.length * 6}s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
      {zoom && <ZoomModal src={zoom.src} alt={zoom.alt} onClose={() => setZoom(null)} />}
    </div>
  );
}
