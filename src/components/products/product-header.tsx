import React from "react";

type Props = {
  title: string;
  description: string;
  rating: number;
  reviewCount: number;
};

export function ProductHeader({
  title,
  description,
  rating,
  reviewCount,
}: Props) {
  return (
    <div className="space-y-2">
      <h1 className="font-semibold text-gray-900 text-2xl lg:text-3xl">
        {title}
      </h1>
      <p className="max-w-xl text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5 text-yellow-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(rating) ? "fill-current" : "text-gray-300"
              }`}
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09L5.5 12.545 1 8.91l6.061-.879L10 2l2.939 6.031L19 8.91l-4.5 3.636 1.378 5.545z" />
            </svg>
          ))}
        </div>
        <span className="font-medium text-gray-700">{rating.toFixed(1)}</span>
        <span className="text-gray-500">({reviewCount} avaliações)</span>
      </div>
    </div>
  );
}
