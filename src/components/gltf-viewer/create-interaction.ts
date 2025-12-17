import { Camera, Object3D, Raycaster, Vector2 } from "three";

type AnimationBinding = {
  object: string;
  animation: string;
};

export function createInteraction(
  camera: Camera,
  domElement: HTMLElement,
  scene: Object3D,
  bindings: AnimationBinding[],
  animationSystem: { toggle: (name: string) => void }
) {
  const raycaster = new Raycaster();
  const mouse = new Vector2();

  function onClick(event: MouseEvent) {
    const rect = domElement.getBoundingClientRect();

    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const hits = raycaster.intersectObjects(scene.children, true);

    if (!hits.length) {
      return;
    }

    let obj: Object3D | null = hits[0].object;
    // console.log("Initial hit object:", obj.name);

    while (obj) {
      // console.log("Checking object:", obj.name);

      const binding = bindings.find((b) => b.object === obj!.name);

      if (binding) {
        // console.log("Found binding:", binding);
        animationSystem.toggle(binding.animation);
        return;
      }

      obj = obj.parent;
    }

    // console.log("No matching binding found in object hierarchy");
  }

  domElement.addEventListener("click", onClick);

  return {
    dispose() {
      domElement.removeEventListener("click", onClick);
      // console.log("Interaction disposed");
    },
  };
}
