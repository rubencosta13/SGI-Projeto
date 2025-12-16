import React, { useState } from "react";
import { Menu as MenuIcon } from "lucide-react";
import NavLinks from "../common/nav-link";
import SearchInput from "../inputs/search-input";

interface SecondaryMenuProps {
  items: string[];
}

const SecondaryMenu = ({ items }: SecondaryMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex lg:flex-row flex-col lg:items-center lg:gap-6 w-full">
      {/* Desktop menu */}
      <div className="hidden lg:flex gap-6">
        {items.map((item) => (
          <span
            key={item}
            className="font-medium hover:text-gray-700 text-sm transition-colors cursor-pointer"
          >
            {item}
          </span>
        ))}
      </div>

      {/* Mobile burger + search */}
      <div className="lg:hidden flex items-center gap-2 w-full">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 hover:bg-gray-200 p-2 rounded-full transition"
        >
          <MenuIcon className="text-gray-800" />
        </button>
        <SearchInput className="flex-1" />
      </div>

      {/* Collapsible links for mobile */}
      {menuOpen && (
        <div className="lg:hidden flex flex-col gap-2 bg-gray-50 shadow-md mt-2 p-2 rounded">
          <NavLinks
            links={[
              { href: "/", label: "Casa" },
              { href: "/moda", label: "Moda" },
              ...items.map((item) => ({
                href: `#${item.toLowerCase()}`,
                label: item,
              })),
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default SecondaryMenu;
