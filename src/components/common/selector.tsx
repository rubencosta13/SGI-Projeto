"use client";

import React, { useState, ReactNode } from "react";

type Props = {
  title: string;
  info?: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export function CollapsibleSection({
  title,
  info,
  children,
  defaultOpen = false,
}: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-2.5 w-full max-w-[815px] scroll-mt-16">
      <div
        className={`
          bg-white border-2 border-[#E4E7EC]
          rounded-lg
          transition-colors
        `}
      >
        {/* Header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            flex w-full items-center justify-between
            h-[50px] min-h-[50px]
            px-4
            text-sm text-gray-900 font-medium
            cursor-pointer
            focus:outline-none
            hover:bg-gray-50
            ${
              isOpen ? "rounded-t-lg border-b-2 border-[#E4E7EC]" : "rounded-lg"
            }
          `}
        >
          <div className="flex items-center gap-2 min-w-0 leading-5">
            <span className="truncate">{title}</span>

            {info && (
              <span className="text-gray-500 whitespace-nowrap">{info}</span>
            )}
          </div>

          <span
            className={`ml-2 text-gray-500 transition-transform duration-200 ${
              isOpen ? "rotate-90" : "rotate-0"
            }`}
          >
            ▶
          </span>
        </button>

        {/* Content */}
        <div
          className={`
            overflow-hidden transition-all duration-300 ease-out
            ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="bg-white px-4 py-4 rounded-b-lg text-gray-600 text-sm">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
