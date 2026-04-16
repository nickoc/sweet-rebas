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
  const [offset, setOffset] = useState(0);
  const maxOffset = Math.max(0, images.length - 3);

  return (
    <div>
      <div className="overflow-hidden">
        <div
          className="flex gap-4 transition-transform duration-500"
          style={{ transform: `translateX(-${offset * (100 / 3 + 1.33)}%)` }}
        >
          {images.map((img) => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              className="min-w-[calc(33.333%-11px)] h-[440px] object-cover rounded-2xl shadow-lg"
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-2.5 mt-4">
        {Array.from({ length: maxOffset + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setOffset(i)}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === offset ? "bg-reba-pink" : "bg-reba-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
