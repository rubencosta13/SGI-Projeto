import { Vector3 } from "three";

export const GLTF_INITIAL_CAMERA_X_POS = 0.35;
export const GLTF_INITIAL_CAMERA_Y_POS = 0.4;
export const GLTF_INITIAL_CAMERA_Z_POS = 0.0;
export const DEFAULT_VIEW = {
  camera: {
    position: { x: 0.4, y: 0.25, z: 0.0 },
    facing: { x: -0.98, y: -0.17, z: 0.02 },
  },
  target: { x: 0.11, y: 0.2, z: 0.0 },
};
export const CAMERA_VIEW_PRESETS: Record<
  string,
  { position: Vector3; target: Vector3 }
> = {
  frente: {
    position: new Vector3(
      0.003343721556390902,
      0.7023011166816475,
      0.00003860711410682168
    ),
    target: new Vector3(0, 0, 0),
  },

  topo: {
    position: new Vector3(
      0.011197430001588958,
      0.6221437979362421,
      -0.0001516607123300626
    ),
    target: new Vector3(0, 0, 0),
  },
  direita: {
    position: new Vector3(
      0.003530696756446336,
      0.13172111865649114,
      -0.5023007556088815
    ),
    target: new Vector3(0, 0.13, 0),
  },
  esquerda: {
    position: new Vector3(
      -0.020260120466442075,
      0.21464286602304442,
      0.5072550626720473
    ),
    target: new Vector3(
      -0.03212539568532437,
      0.1760838785490009,
      0.13124012157484546
    ),
  },
};
