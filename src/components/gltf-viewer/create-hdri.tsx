import {
  WebGLRenderer,
  Texture,
  Mesh,
  MeshStandardMaterial,
  MeshPhysicalMaterial,
  Material,
} from "three";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { PMREMGenerator } from "three";

type HDRIState = {
  hdri?: Texture;
  intensity: number;
};

export function createHDRISystem(renderer: WebGLRenderer) {
  const state: HDRIState = { intensity: 1 };

  const pmremGenerator = new PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  // Load HDRI
  async function loadHDRI(url: string, intensity = 1) {
    const loader = new RGBELoader();
    const hdrTexture = await loader.loadAsync(url);

    const envMap = pmremGenerator.fromEquirectangular(hdrTexture).texture;
    state.hdri = envMap;
    state.intensity = intensity;

    hdrTexture.dispose();
    return envMap;
  }

  // Apply HDRI to a specific mesh or object
  function applyToMesh(mesh: Mesh, envMap: Texture, intensity: number = 1) {
    const apply = (mat: Material) => {
      if (
        mat instanceof MeshStandardMaterial ||
        mat instanceof MeshPhysicalMaterial
      ) {
        mat.envMap = envMap;
        mat.envMapIntensity = intensity;
        mat.needsUpdate = true;
      }
    };

    if (Array.isArray(mesh.material)) {
      mesh.material.forEach(apply);
    } else {
      apply(mesh.material);
    }
  }

  function setIntensity(intensity: number) {
    state.intensity = intensity;
    // Update applied materials
    // You could store applied meshes in a Set to update all
  }

  function dispose() {
    if (state.hdri) {
      state.hdri.dispose();
      state.hdri = undefined;
    }
    pmremGenerator.dispose();
  }

  return {
    state,
    loadHDRI,
    applyToMesh,
    setIntensity,
    dispose,
  };
}
