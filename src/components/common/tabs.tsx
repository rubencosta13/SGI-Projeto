"use client";

import React, { useState, ReactNode } from "react";

type Tab = {
  id: string;
  label: string;
  content: ReactNode;
};

type Props = {
  tabs: Tab[];
  defaultTabId?: string;
};

export function HorizontalTabs({ tabs, defaultTabId }: Props) {
  const [activeTab, setActiveTab] = useState(defaultTabId ?? tabs[0]?.id);

  return (
    <div className="w-full">
      {/* Tabs */}
      <div role="tablist" className="flex gap-6 border-gray-200 border-b">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative pb-3 text-sm font-medium transition-colors
                focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300
                ${
                  isActive
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }
              `}
            >
              {tab.label}

              {/* Active underline */}
              {isActive && (
                <span className="-bottom-px absolute inset-x-0 bg-gray-900 rounded-full h-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="mt-6 text-gray-700 text-sm">
        {tabs.find((t) => t.id === activeTab)?.content}
      </div>
    </div>
  );
}
