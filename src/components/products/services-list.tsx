import React from "react";

type Service = { label: string };

type Props = {
  services: Service[];
};

export function ServicesList({ services }: Props) {
  return (
    <div className="hidden lg:flex flex-col gap-3 bg-white shadow-sm mt-4 p-5 rounded-xl">
      <div className="font-semibold text-gray-500 text-xs uppercase tracking-wide">
        Serviços
      </div>
      <ul className="space-y-2 text-gray-700 text-sm">
        {services.map((s, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="bg-gray-400 mt-1 rounded-full w-1.5 h-1.5" />
            <span>{s.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
