import React from "react";
import clsx from "clsx";

interface IconButtonProps {
  icon: React.ComponentType<{
    className?: string;
    width?: number;
    height?: number;
  }>;
  label?: string;
  className?: string;
  labelClassName?: string;
  iconClassName?: string;
  width?: number;
  height?: number;
}

const IconButton = ({
  icon: Icon,
  label,
  className = "",
  labelClassName = "",
  iconClassName = "",
  width = 32,
  height = 32,
}: IconButtonProps) => {
  return (
    <div
      className={`flex flex-row items-center gap-2 p-2 pl-2 rounded-full cursor-pointer hover:bg-gray-200 transition ${className}`}
    >
      {Icon && (
        <Icon
          className={clsx(iconClassName, `text-gray-800`)}
          width={width}
          height={height}
        />
      )}
      {label && (
        <span
          className={`hidden lg:inline text-base whitespace-nowrap ${labelClassName}`}
        >
          {label}
        </span>
      )}
    </div>
  );
};

export default IconButton;
