import React from "react";
import { COMPONENT_PBRS } from "@/src/pbr/types";
import { GLTFPBRSection } from "@/src/components/pbrs/gltf-pbr-selection";

export function PBRConfigurator({}) {
  return (
    <div className="flex flex-col gap-4">
      {COMPONENT_PBRS.map((comp) => {
        return <GLTFPBRSection key={comp.display} component={comp} />;
      })}
    </div>
  );
}
