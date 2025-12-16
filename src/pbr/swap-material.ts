import {
  BufferGeometry,
  Mesh,
  MeshStandardMaterial,
  RepeatWrapping,
  SRGBColorSpace,
  LinearSRGBColorSpace,
  Texture,
  TextureLoader,
  Vector2,
  Vector3,
  DoubleSide,
} from "three";
import { PBR_SETS } from "./types";

const textureLoader = new TextureLoader();

export type PBRSwapOptions = {
  baseColor?: number;
  texelDensity?: number;
  anisotropy?: number;
  normalScale?: number;
  metalness?: number;
  roughness?: number;
  debug?: boolean; // NEW: enable logging
};

export async function applyPBRVariant(
  mesh: Mesh | undefined,
  setName: keyof typeof PBR_SETS,
  options: PBRSwapOptions = {}
): Promise<void> {
  const debug = options.debug ?? false;

  if (!mesh) {
    if (debug) console.warn("[PBR] Mesh is undefined, cannot apply variant");
    return;
  }

  if (debug)
    console.log(`[PBR] Applying variant '${setName}' to mesh:`, mesh.name);

  const set = PBR_SETS[setName];
  const variant = options.baseColor ?? 0;

  let repeat = 1;

  if (mesh.geometry) {
    const geometry = mesh.geometry as BufferGeometry;
    geometry.computeBoundingBox();

    if (!geometry.boundingBox) {
      if (debug) console.warn(`[PBR] Mesh ${mesh.name} has no bounding box`);
    } else {
      const size = new Vector3();
      geometry.boundingBox.getSize(size);
      const texelDensity = options.texelDensity ?? 0.5;
      const worldSize = Math.max(size.x, size.y, size.z);
      repeat = worldSize / texelDensity;

      if (debug)
        console.log(
          `[PBR] Computed repeat for mesh ${mesh.name}:`,
          repeat,
          "worldSize:",
          worldSize,
          "texelDensity:",
          texelDensity
        );
    }
  }

  const load = (path?: string) =>
    path
      ? new Promise<Texture>((resolve) => {
          if (debug) console.log(`[PBR] Loading texture: ${path}`);
          textureLoader.load(path, (tex) => resolve(tex));
        })
      : Promise.resolve(null);

  const [albedo, normal, roughness, metalness] = await Promise.all([
    load(set.albedo[variant]),
    load(set.normal?.[0]),
    load(set.roughness?.[0]),
    load(set.metalness?.[0]),
  ]);

  if (debug)
    console.log(`[PBR] Textures loaded for mesh ${mesh.name}:`, {
      albedo,
      normal,
      roughness,
      metalness,
    });

  const allTextures = [albedo, normal, roughness, metalness];

  for (const tex of allTextures) {
    if (!tex) continue;
    tex.wrapS = tex.wrapT = RepeatWrapping;
    tex.repeat.set(repeat, repeat);
    if (options.anisotropy) tex.anisotropy = options.anisotropy;
  }

  // Correct color spaces
  if (albedo) albedo.colorSpace = SRGBColorSpace;
  if (normal) normal.colorSpace = LinearSRGBColorSpace;
  if (roughness) roughness.colorSpace = LinearSRGBColorSpace;
  if (metalness) metalness.colorSpace = LinearSRGBColorSpace;

  // Dispose previous material safely
  if (mesh.material && mesh.material instanceof MeshStandardMaterial) {
    mesh.material.dispose();
    if (debug)
      console.log(`[PBR] Disposed previous material for mesh ${mesh.name}`);
  }

  const material = new MeshStandardMaterial({
    map: albedo ?? undefined,
    normalMap: normal ?? undefined,
    roughnessMap: roughness ?? undefined,
    metalnessMap: metalness ?? undefined,
    metalness: options.metalness ?? 0,
    roughness: options.roughness ?? 0.7,
  });

  if (normal && options.normalScale !== undefined) {
    material.normalScale = new Vector2(
      options.normalScale,
      options.normalScale
    );
  }

  material.side = DoubleSide;
  material.needsUpdate = true;

  mesh.material = material;

  if (debug)
    console.log(`[PBR] Applied material to mesh ${mesh.name}:`, material);
}
