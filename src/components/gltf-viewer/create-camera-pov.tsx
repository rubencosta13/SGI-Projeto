"use client";

import React from "react";
import { CAMERA_VIEW_PRESETS } from "./constants";
import { useCameraStore } from "@/src/store/camera";
import { useControlsStore } from "@/src/store/controls";

export function CameraSystem(): React.ReactNode {
  const camera = useCameraStore((state) => state.camera);
  const controls = useControlsStore((state) => state.controls);

  const moveTo = (presetName: keyof typeof CAMERA_VIEW_PRESETS) => {
    const preset = CAMERA_VIEW_PRESETS[presetName];
    if (!preset || !camera || !controls) return;

    const duration = 0.8; // seconds
    const fps = 60;
    const totalFrames = duration * fps;

    const startPos = camera.position.clone();
    const startTarget = controls.target.clone();

    const endPos = preset.position.clone();
    const endTarget = preset.target.clone();

    let frame = 0;

    const animate = () => {
      frame++;
      const t = frame / totalFrames;

      // Linear interpolation
      camera.position.lerpVectors(startPos, endPos, t);
      controls.target.lerpVectors(startTarget, endTarget, t);
      controls.update();

      if (frame < totalFrames) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="flex flex-row justify-center gap-2 bg-gray-100 shadow p-2 rounded">
      {Object.keys(CAMERA_VIEW_PRESETS).map((name) => (
        <button
          key={name}
          onClick={() => moveTo(name as keyof typeof CAMERA_VIEW_PRESETS)}
          className="bg-white shadow p-2 rounded"
        >
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </button>
      ))}
    </div>
  );
}
