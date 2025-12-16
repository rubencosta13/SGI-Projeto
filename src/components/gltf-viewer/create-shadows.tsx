import {
  Mesh,
  Scene,
  WebGLRenderer,
  DirectionalLight,
  PlaneGeometry,
  MeshStandardMaterial,
  Mesh as ThreeMesh,
} from "three";

type ShadowSystem = {
  enableShadows: (meshes: ThreeMesh[]) => void;
  dispose: () => void;
};

export function createShadowSystem(
  renderer: WebGLRenderer,
  scene: Scene
): ShadowSystem {
  // Create a directional light for shadows
  const dirLight = new DirectionalLight(0xffffff, 1);
  dirLight.position.set(5, 10, 5);
  dirLight.castShadow = true;

  dirLight.shadow.mapSize.width = 2048;
  dirLight.shadow.mapSize.height = 2048;
  dirLight.shadow.camera.near = 0.5;
  dirLight.shadow.camera.far = 50;
  dirLight.shadow.bias = -0.0001;

  scene.add(dirLight);

  // Optional: add a simple ground plane to catch shadows
  const ground = new Mesh(
    new PlaneGeometry(100, 100),
    new MeshStandardMaterial({ color: 0x222222, roughness: 1 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = 0;
  ground.receiveShadow = true;
  scene.add(ground);

  // Function to apply shadows to specific meshes
  function enableShadows(meshes: ThreeMesh[]) {
    meshes.forEach((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
  }

  function dispose() {
    scene.remove(dirLight, ground);
    dirLight.dispose?.();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (ground.geometry as any).dispose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (ground.material as any).dispose();
  }

  return { enableShadows, dispose };
}
