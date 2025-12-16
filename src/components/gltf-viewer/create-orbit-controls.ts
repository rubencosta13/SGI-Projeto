import { Camera } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { DEFAULT_VIEW } from "./constants";

export function createOrbitControls(camera: Camera, canvas: HTMLCanvasElement) {
  const controls = new OrbitControls(camera, canvas);

  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  controls.enableZoom = true;
  controls.enablePan = true;

  controls.target.set(
    DEFAULT_VIEW.target.x,
    DEFAULT_VIEW.target.y,
    DEFAULT_VIEW.target.z
  );
  controls.update();

  return controls;
}
