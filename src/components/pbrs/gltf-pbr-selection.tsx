import { CollapsibleSection } from "../common/selector";
import { PBRImagePicker } from "./pbr-selector";
import { ComponentPBRMapping } from "@/src/pbr/types";

import { useSceneStore } from "@/src/store/scene";

type Props = {
  component: ComponentPBRMapping;
};

export function GLTFPBRSection({ component }: Props) {
  return (
    <CollapsibleSection
      title={component.display}
      info={
        component.physicalMaterialOnly
          ? Object.keys(component.materials || {}).length + " Opções"
          : `${component.pbrs?.length || 0} Opções`
      }
    >
      <PBRImagePicker
        getMesh={() => useSceneStore.getState().getMeshByName(component.mesh)}
        name={component.mesh}
        sets={component.pbrs}
        materials={component.materials}
      />
    </CollapsibleSection>
  );
}
