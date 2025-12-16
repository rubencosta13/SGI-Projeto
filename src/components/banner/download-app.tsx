import React from "react";
import { Smartphone } from "lucide-react";

const ObterApp = () => {
  return (
    <div className="flex justify-center items-center gap-2">
      <Smartphone width={24} height={24} />
      <p className="text-center">Descarregar a app</p>
    </div>
  );
};

export default ObterApp;
