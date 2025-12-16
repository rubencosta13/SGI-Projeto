import React from "react";

type Props = {
  userName: string;
  avatarUrl?: string;
  rating: number; // 0-5
  date: string; // e.g., "2025-12-16"
  reviewText: string;
  onHelpfulClick?: () => void;
};

export function UserReview({
  userName,
  avatarUrl,
  rating,
  date,
  reviewText,
  onHelpfulClick,
}: Props) {
  return (
    <div className="flex flex-col gap-2 bg-white shadow-sm p-4 border border-gray-200 rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={userName}
              className="rounded-full w-10 h-10 object-cover"
            />
          ) : (
            <div className="flex justify-center items-center bg-gray-200 rounded-full w-10 h-10 font-semibold text-gray-500">
              {userName[0]}
            </div>
          )}
          <div>
            <div className="font-medium text-gray-900">{userName}</div>
            <div className="text-gray-500 text-xs">{date}</div>
          </div>
        </div>

        {/* Rating */}
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
      </div>

      {/* Review Text */}
      <p className="text-gray-700 text-sm leading-relaxed">{reviewText}</p>

      {/* Actions */}
      {onHelpfulClick && (
        <button
          onClick={onHelpfulClick}
          className="self-start text-blue-600 text-xs hover:underline"
        >
          Helpful
        </button>
      )}
    </div>
  );
}
