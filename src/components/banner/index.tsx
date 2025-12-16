import React from "react";

interface BannerProps {
  children: React.ReactNode;
}

const Banner = ({ children }: BannerProps) => {
  return (
    <div className="flex justify-center bg-[#E8ECFF] px-4 py-2 lg:py-3">
      {children}
    </div>
  );
};

export default Banner;
