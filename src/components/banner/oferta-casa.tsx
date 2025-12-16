import React from "react";

const OfertaCasaBannerContent = () => {
  return (
    <div className="flex lg:flex-row flex-col items-center lg:items-center">
      {/* Oferta Casa box */}
      <div className="bg-[#890B58] mb-2 lg:mb-0 p-2 rounded-lg">
        <p className="font-semibold text-[#d1d1f9] uppercase">Oferta Casa</p>
      </div>

      {/* Divider: only show on large screens */}
      <span className="hidden lg:block mx-[24px] border-[#12151b] border-l w-[1px] h-[32px]"></span>

      {/* Extra text */}
      <div className="flex flex-row lg:flex-row items-center lg:items-center gap-2 lg:gap-2">
        <p className="font-semibold text-[#890b58] text-[20px] lg:text-[28px]">
          +10% EXTRA*
        </p>
        <p className="font-normal underline">Cód. 3995</p>
      </div>
    </div>
  );
};

export default OfertaCasaBannerContent;
