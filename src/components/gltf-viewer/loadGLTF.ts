import { AnimationClip, Group } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export type LoadedGLTF = {
  scene: Group;
  animations: AnimationClip[];
};

export async function loadGLTF(path: string): Promise<LoadedGLTF> {
  const loader = new GLTFLoader();

  return new Promise((resolve, reject) => {
    loader.load(
      path,
      (gltf) => {
        resolve({
          scene: gltf.scene,
          animations: gltf.animations,
        });
      },
      undefined,
      reject
    );
  });
}
