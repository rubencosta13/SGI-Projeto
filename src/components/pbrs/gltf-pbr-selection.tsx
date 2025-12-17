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
