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
    <div className="relative mb-2.5 w-full scroll-mt-16">
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
            isOpen
              ? "rounded-t-lg border-b-2 border-[#E4E7EC]"
              : "rounded-lg border-2 border-[#E4E7EC]"
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

      {/* Overlay Content */}
      {isOpen && (
        <div className="top-full left-0 z-50 absolute bg-white shadow-lg mt-1 border-[#E4E7EC] border-2 rounded-b-lg w-full md:w-auto">
          <div className="px-4 py-4 text-gray-600 text-sm">{children}</div>
        </div>
      )}
    </div>
  );
}
