"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

type GalleryItem =
  | {
      type: "image";
      src: string;
      alt?: string;
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

  const item = items[index];

  return (
    <div className={clsx("relative w-full h-full", className)}>
      {/* Content */}
      <div className="relative bg-black rounded-lg w-full h-full overflow-hidden">
        {item.type === "image" && (
          <Image
            src={item.src}
            alt={item.alt ?? ""}
            fill
            priority
            sizes="100vw"
            className="object-contain"
          />
        )}

        {item.type === "canvas" && (
          <div className="absolute inset-0">{item.render()}</div>
        )}
      </div>

      {/* Left button */}
      <button
        onClick={prev}
        disabled={index === 0}
        className="top-1/2 left-2 absolute bg-black/60 hover:bg-black disabled:opacity-30 p-2 rounded-full text-white -translate-y-1/2"
      >
        <ChevronLeft />
      </button>

      {/* Right button */}
      <button
        onClick={next}
        disabled={index === items.length - 1}
        className="top-1/2 right-2 absolute bg-black/60 hover:bg-black disabled:opacity-30 p-2 rounded-full text-white -translate-y-1/2"
      >
        <ChevronRight />
      </button>

      {/* Dots */}
      <div className="bottom-2 left-1/2 absolute flex gap-2 -translate-x-1/2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={clsx(
              "rounded-full w-2 h-2",
              i === index ? "bg-white" : "bg-white/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}
