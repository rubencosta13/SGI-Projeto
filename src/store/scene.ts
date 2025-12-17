import { create } from "zustand";
import { Mesh, Object3D } from "three";

type SceneStore = {
  model: Object3D | null;
  setModel: (model: Object3D) => void;
  getMeshByName: (name: string) => Mesh | undefined;
};

export const useSceneStore = create<SceneStore>((set, get) => ({
  model: null,
  setModel: (model) => set({ model }),
  getMeshByName: (name) => {
    const model = get().model;
    if (!model) {
      // console.log(`Model not found`);
      return undefined;
    }
    const mesh = model.getObjectByName(name);
    if (mesh && (mesh as Mesh).isMesh) return mesh as Mesh;
    // console.log("failed fetching mesh");
    return undefined;
  },
}));
