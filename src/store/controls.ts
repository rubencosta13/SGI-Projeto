import { OrbitControls } from "three/examples/jsm/Addons.js";
import { create } from "zustand";

type ControlsStore = {
  controls: OrbitControls | null;
  setControls: (controls: OrbitControls) => void;
};

export const useControlsStore = create<ControlsStore>()((set) => ({
  controls: null,
  setControls: (controls) => set({ controls }),
}));
