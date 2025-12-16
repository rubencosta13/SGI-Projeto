import React from "react";

interface NavLinksProps {
  links: Array<{
    href: string;
    label: string;
    right?: boolean;
  }>;
  className?: string;
  linksClassName?: string;
}

const NavLinks = ({ links, className, linksClassName }: NavLinksProps) => {
  return (
    <div className={className ?? "flex items-center gap-2 flex-shrink-0"}>
      {links.map(({ href, label, right }) => (
        <a
          key={href}
          href={href}
          className={
            (linksClassName ??
              "text-lg font-semibold px-4 py-2 rounded-full hover:bg-gray-200 transition-colors") +
            (right ? " ml-auto" : "")
          }
        >
          {label}
        </a>
      ))}
    </div>
  );
};

export default NavLinks;
