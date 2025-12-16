import { applyPBRVariant } from "@/src/pbr/swap-material";
import { CollapsibleSection } from "../common/selector";
import { PBRImagePicker } from "./pbr-selector";
import {
  ComponentPBRMapping,
  originalMaterials,
  PBR_SETS,
} from "@/src/pbr/types";
import { Mesh } from "three";
import { useMemo } from "react";
import { useSceneStore } from "@/src/store/scene";

type Props = {
  component: ComponentPBRMapping;
};

export function GLTFPBRSection({ component }: Props) {
  // Resolve mesh ONCE per render

  return (
    <CollapsibleSection
      title={component.display}
      info={`${component.pbrs.length} Options`}
    >
      <PBRImagePicker
        getMesh={() => useSceneStore.getState().getMeshByName(component.mesh)}
        name={component.mesh}
        sets={component.pbrs}
      />
    </CollapsibleSection>
  );
}
