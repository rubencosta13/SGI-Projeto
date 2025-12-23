"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

type GalleryItem =
  | {
      type: "image";
      src: string;
      alt?: string;
      caption?: string;
    }
  | {
      type: "canvas";
      render: () => React.ReactNode;
    };

type ImageGalleryProps = {
  items: GalleryItem[];
  className?: string;
};

export function ImageGallery({ items, className }: ImageGalleryProps) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(items.length - 1, i + 1));

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const item = items[index];

  return (
    <div
      className={clsx(
        "relative bg-gray-900/5 rounded-lg w-full h-full overflow-hidden",
        className
      )}
    >
      {/* Content */}
      <div className="relative w-full h-full">
        {item.type === "image" && (
          <div className="transition-opacity duration-500 ease-in-out">
            <Image
              src={item.src}
              alt={item.alt ?? ""}
              fill
              className="object-contain"
              priority
              sizes="100vw"
            />
            {item.caption && (
              <div className="bottom-4 left-1/2 absolute px-3 py-1 rounded text-white text-sm -translate-x-1/2">
                {item.caption}
              </div>
            )}
          </div>
        )}
        {item.type === "canvas" && (
          <div className="absolute inset-0 transition-opacity duration-500">
            {item.render()}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prev}
        disabled={index === 0}
        className="top-1/2 left-2 absolute bg-black/50 hover:bg-black/70 disabled:opacity-30 p-3 rounded-full transition-colors -translate-y-1/2"
      >
        <ChevronLeft size={24} color="white" />
      </button>

      <button
        onClick={next}
        disabled={index === items.length - 1}
        className="top-1/2 right-2 absolute bg-black/50 hover:bg-black/70 disabled:opacity-30 p-3 rounded-full transition-colors -translate-y-1/2"
      >
        <ChevronRight size={24} color="white" />
      </button>

      {/* Dots */}
      {index !== items.length - 1 && (
        <div className="bottom-4 left-1/2 absolute flex gap-2 -translate-x-1/2">
          {items.slice(0, -1).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={clsx(
                "rounded-full w-3 h-3 transition-all",
                i === index
                  ? "bg-white scale-125"
                  : "bg-white/40 hover:bg-white/70 scale-100"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
