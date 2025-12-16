import React from "react";
import { Search } from "lucide-react";

const SearchInput = ({
  placeholder = "O que procura?",
  className = "",
  iconWidth = 18,
  iconHeight = 18,
  ...props
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      {/* Icon */}
      <div className="left-0 absolute inset-y-0 flex items-center ps-3.5 pointer-events-none">
        <Search
          className="text-gray-950"
          strokeWidth={2}
          width={iconWidth}
          height={iconHeight}
        />
      </div>

      {/* Input */}
      <input
        type="text"
        placeholder={placeholder}
        className="bg-gray-200/60 py-2 pr-4 pl-12 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 w-full text-gray-950 placeholder:text-gray-500 text-base text-wrap transition-all"
        {...props}
      />
    </div>
  );
};

export default SearchInput;
