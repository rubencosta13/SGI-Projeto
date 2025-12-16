import { Scene, PerspectiveCamera, Color, Vector3 } from "three";
import * as gltfConsts from "./constants";

export function createScene(canvas?: HTMLCanvasElement) {
  const scene = new Scene();
  scene.background = new Color(Color.NAMES.white);

  const width = canvas ? canvas.clientWidth : window.innerWidth;
  const height = canvas ? canvas.clientHeight : window.innerHeight;

  const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);

  camera.position.set(
    gltfConsts.DEFAULT_VIEW.camera.position.x,
    gltfConsts.DEFAULT_VIEW.camera.position.y,
    gltfConsts.DEFAULT_VIEW.camera.position.z
  );

  const lookAtPoint = new Vector3(
    camera.position.x + gltfConsts.DEFAULT_VIEW.camera.facing.x,
    camera.position.y + gltfConsts.DEFAULT_VIEW.camera.facing.y,
    camera.position.z + gltfConsts.DEFAULT_VIEW.camera.facing.z
  );
  camera.lookAt(lookAtPoint);

  return { scene, camera };
}
