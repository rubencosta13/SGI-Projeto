import {
  AxesHelper,
  GridHelper,
  Camera,
  CameraHelper,
  DirectionalLight,
  DirectionalLightHelper,
  Scene,
} from "three";

type DebugOptions = {
  axes?: boolean;
  grid?: boolean;
  camera?: boolean;
  directionalLight?: DirectionalLight;
};

export function createDebug(
  scene: Scene,
  camera: Camera,
  options: DebugOptions = {}
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const helpers: any[] = [];

  if (options.axes) {
    const axes = new AxesHelper(2); // X=red, Y=green, Z=blue
    scene.add(axes);
    helpers.push(axes);
  }

  if (options.grid) {
    const grid = new GridHelper(10, 10);
    scene.add(grid);
    helpers.push(grid);
  }

  if (options.camera) {
    const camHelper = new CameraHelper(camera);
    scene.add(camHelper);
    helpers.push(camHelper);
  }

  if (options.directionalLight) {
    const lightHelper = new DirectionalLightHelper(options.directionalLight, 1);
    scene.add(lightHelper);
    helpers.push(lightHelper);
  }

  return {
    helpers,
    dispose() {
      helpers.forEach((h) => scene.remove(h));
    },
  };
}
