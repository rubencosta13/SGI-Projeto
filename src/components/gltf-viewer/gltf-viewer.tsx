"use client";

import { useEffect, useRef } from "react";
import { Clock, Mesh, Object3D } from "three";
import { createRenderer } from "./create-renderer";
import { createScene } from "./create-scene";
import { loadGLTF } from "./loadGLTF";
import { createOrbitControls } from "./create-orbit-controls";
import { createLights } from "./create-lights";
import { createAnimationSystem } from "./create-animations";
import { createInteraction } from "./create-interaction";
import { CameraSystem } from "./create-camera-pov";
import { createHDRISystem } from "./create-hdri";
import { createShadowSystem } from "./create-shadows";
import { originalMaterials } from "@/src/pbr/types";
import { useSceneStore } from "@/src/store/scene";
import { useCameraStore } from "@/src/store/camera";
import { useControlsStore } from "@/src/store/controls";
import { createDebugHUD } from "./debug/create-debug-hud";

type GLTFViewerProps = {
  onLoaded?: () => void; // new
};

const animationBindings = [
  { object: "DustCover", animation: "DustCoverAction" },
  {
    object: "VinylDisk",
    animation: "VinylDiskAction",
  },
  {
    object: "VinylBase",
    animation: "VinylDiskAction",
  },
  {
    object: "Cylinder004_1",
    animation: "PickupAction",
  },
];

const GLTFViewer = ({ onLoaded }: GLTFViewerProps) => {
  const setModel = useSceneStore((state) => state.setModel);
  const setCamera = useCameraStore((state) => state.setCamera);
  const setControls = useControlsStore((state) => state.setControls);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let mounted = true;
    const clock = new Clock();
    const renderer = createRenderer(canvasRef.current);
    const { scene, camera } = createScene();
    setCamera(camera);

    const lights = createLights(scene);
    lights.setMode("light");
    const controls = createOrbitControls(camera, canvasRef.current);
    setControls(controls);

    let animationSystem: ReturnType<typeof createAnimationSystem> | null = null;
    let interaction: ReturnType<typeof createInteraction> | null = null;

    const { update } = createDebugHUD(camera, controls);

    const resize = () => {
      const canvas = canvasRef.current!;
      const parent = canvas.parentElement!;
      const width = parent.clientWidth;
      const height = parent.clientHeight;

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", resize);
    resize();

    const loadScene = async () => {
      try {
        const { scene: model, animations } = await loadGLTF(
          "/models/RecordPlayer.glb"
        );
        if (!mounted) return;

        // Add model to scene
        scene.add(model);
        setModel(model);

        // Capture original materials
        model.traverse((child: Object3D) => {
          if ((child as Mesh).isMesh) {
            const mesh = child as Mesh;
            originalMaterials.set(
              mesh.name,
              Array.isArray(mesh.material) ? [...mesh.material] : mesh.material
            );
          }
        });
        // console.log({ originalMaterials });
        onLoaded?.();

        // Animation system
        animationSystem = createAnimationSystem(model, animations);

        // Interaction
        interaction = createInteraction(
          camera,
          canvasRef.current!,
          model,
          animationBindings,
          animationSystem
        );

        // HDRI
        const hdriSystem = createHDRISystem(renderer);
        const envMap = await hdriSystem.loadHDRI("/hdr/hall.hdr");

        const dustCoverMesh: Mesh | null = model.getObjectByName(
          "DustCover"
        ) as Mesh;
        if (dustCoverMesh) hdriSystem.applyToMesh(dustCoverMesh, envMap, 1.2);

        // Shadows
        // const shadowSystem = createShadowSystem(renderer, scene);
        // shadowSystem.enableShadows([dustCoverMesh, baseMesh]);
      } catch (err) {
        // console.error("Error loading GLTF scene:", err);
      }
    };

    loadScene();

    const animate = () => {
      if (!mounted) return;
      const delta = clock.getDelta();
      controls.update();
      animationSystem?.update(delta);
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
      update();
    };

    animate();

    return () => {
      mounted = false;
      window.removeEventListener("resize", resize);
      interaction?.dispose();
      controls.dispose();
      renderer.dispose();
    };
  }, [onLoaded, setCamera, setControls, setModel]);

  return (
    <div
      className="flex flex-col mx-auto rounded-lg w-full overflow-hidden"
      style={{ height: "100%" }}
    >
      <div className="relative flex-1">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>
      <CameraSystem />
    </div>
  );
};

export default GLTFViewer;
