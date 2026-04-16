"use client";

import { useState, useEffect } from "react";

interface GalleryProps {
  images: { src: string; alt: string }[];
  aspectRatio?: string;
}

export function CakeSlideshow({ images }: GalleryProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="max-w-md mx-auto">
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
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
    </div>
  );
}

export function CakeCarousel({ images }: GalleryProps) {
  // Duplicate images for seamless infinite scroll
  const doubled = [...images, ...images];

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
            className="w-[300px] h-[440px] object-cover rounded-2xl shadow-lg flex-shrink-0"
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
    </div>
  );
}
