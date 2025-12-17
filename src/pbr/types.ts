export type PBRSet = {
  albedo: string[];
  metalness: string[];
  roughness: string[];
  normal: string[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const originalMaterials = new Map<string, any>();

export const PBR_SETS: Record<string, PBRSet> = {
  granite: {
    albedo: ["/pbr/granite/granitesmooth1-albedo.png"],
    metalness: ["/pbr/granite/granitesmooth1-metalness.png"],
    roughness: ["/pbr/granite/granitesmooth1-roughness3.png"],
    normal: ["/pbr/granite/granitesmooth1-normal2.png"],
  },
  oak: {
    albedo: ["/pbr/oak/oak-wood-bare_albedo.png"],
    metalness: ["/pbr/oak/oak-wood-bare_metallic.png"],
    normal: ["/pbr/oak/oak-wood-bare_normal-ogl.png"],
    roughness: ["/pbr/oak/oak-wood-bare_roughness.png"],
  },
  wood: {
    albedo: ["/pbr/wood/WoodFloor064_1K-JPG_Color.jpg"],
    normal: ["/pbr/wood/WoodFloor064_1K-JPG_NormalGL.jpg"],
    roughness: ["/pbr/wood/WoodFloor064_1K-JPG_Roughness.jpg"],
    metalness: [""],
  },
  facade: {
    albedo: ["/pbr/facade/Facade005_1K-JPG_Color.jpg"],
    normal: ["/pbr/facade/Facade005_1K-JPG_NormalGL.jpg"],
    roughness: ["/pbr/facade/Facade005_1K-JPG_Roughness.jpg"],
    metalness: ["/pbr/facade/Facade005_1K-JPG_Metalness.jpg"],
  },
  metal: {
    albedo: ["/pbr/metal/Metal032_1K-JPG_Color.jpg"],
    normal: ["/pbr/metal/Metal032_1K-JPG_NormalGL.jpg"],
    metalness: ["/pbr/metal/Metal032_1K-JPG_Metalness.jpg"],
    roughness: ["/pbr/metal/Metal032_1K-JPG_Roughness.jpg"],
  },
  fabric: {
    albedo: ["/pbr/fabric/white-quilted-fabric_albedo.png"],
    metalness: ["/pbr/fabric/white-quilted-fabric_metallic.png"],
    roughness: ["/pbr/fabric/white-quilted-fabric_roughness.png"],
    normal: ["/pbr/fabric/white-quilted-fabric_normal-ogl.png"],
  },
};

export type ComponentPBRMapping = {
  /** Mesh name to apply the pbr */
  mesh: string;
  /** Display name for the mesh */
  display: string;
  /** Available PBRS to apply to the specific mesh */
  pbrs: Array<keyof typeof PBR_SETS>;
};

export const COMPONENT_PBRS: ComponentPBRMapping[] = [
  {
    mesh: "DustCover",
    display: "Dust Cover",
    pbrs: ["fabric"],
  },
  {
    mesh: "Base",
    display: "Base Material",
    pbrs: ["granite", "oak", "wood"],
  },
  {
    mesh: "BlackMattePlastic",
    display: "Arm",
    pbrs: ["metal"],
  },
  {
    mesh: "Feet",
    display: "Feet",
    pbrs: ["metal", "granite"],
  },
];
