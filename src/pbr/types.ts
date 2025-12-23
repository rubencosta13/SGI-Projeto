import { MeshPhysicalMaterial } from "three";

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
  glass: {
    albedo: ["/pbr/glass/Glass_Frosted_002_basecolor.png"],
    metalness: [""],
    normal: ["/pbr/glass/Glass_Frosted_002_normal.png"],
    roughness: ["/pbr/glass/Glass_Frosted_002_roughness.png"],
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
  pbrs?: Array<keyof typeof PBR_SETS>;

  physicalMaterialOnly?: boolean;
  materials?: Record<string, MeshPhysicalMaterial>;
};

export const DUSTCOVER_MATERIALS: Record<string, MeshPhysicalMaterial> = {
  greenTint: new MeshPhysicalMaterial({
    color: 0x88ff88,
    metalness: 0,
    roughness: 0,
    transparent: true,
    opacity: 0.25,
    transmission: 0.9,
    clearcoat: 1,
    clearcoatRoughness: 0,
    reflectivity: 0.5,
  }),
  redTint: new MeshPhysicalMaterial({
    color: 0xff8888,
    metalness: 0,
    roughness: 0.2,
    transparent: true,
    opacity: 0.3,
    transmission: 0.8,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1,
    reflectivity: 0.6,
  }),
};

export const COMPONENT_PBRS: ComponentPBRMapping[] = [
  {
    mesh: "DustCover",
    display: "Dust Cover",
    materials: DUSTCOVER_MATERIALS,
    physicalMaterialOnly: true,
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
