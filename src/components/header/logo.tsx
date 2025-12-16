import React from "react";
import laredouteLogo from "../../../public/logo.svg";
import Image from "next/image";

const LogoDisplay = ({ width = 104, height = 104 }) => {
  return (
    <div className="flex flex-shrink-0 items-center px-4">
      <Image src={laredouteLogo} alt="Logo" width={width} height={height} />
    </div>
  );
};

export default LogoDisplay;
