import { PerspectiveCamera } from "three";
import { create } from "zustand";

type CameraStore = {
  camera: PerspectiveCamera | null;
  setCamera: (camera: PerspectiveCamera) => void;
};

export const useCameraStore = create<CameraStore>()((set) => ({
  camera: null,
  setCamera: (camera) => set({ camera }),
}));
