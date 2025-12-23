import * as THREE from "three";
import { useCallback } from "react";
import Image from "next/image";
import { XCircleIcon } from "lucide-react";
import { originalMaterials, PBR_SETS } from "@/src/pbr/types";
import { applyPBRVariant } from "@/src/pbr/swap-material";

export interface PBRImagePickerProps {
  sets?: readonly (keyof typeof PBR_SETS)[]; // PBR sets (optional)
  materials?: Record<string, THREE.MeshPhysicalMaterial>; // predefined physical materials
  name: string;
  getMesh: () => THREE.Mesh | undefined;
}

function disposeMaterial(material: THREE.Material | THREE.Material[]) {
  if (Array.isArray(material)) material.forEach((m) => m.dispose());
  else material.dispose();
}

function markMaterialForUpdate(material: THREE.Material | THREE.Material[]) {
  if (Array.isArray(material)) material.forEach((m) => (m.needsUpdate = true));
  else material.needsUpdate = true;
}

export function PBRImagePicker({
  sets = [],
  materials,
  name,
  getMesh,
}: PBRImagePickerProps) {
  const resetMaterial = useCallback(() => {
    const mesh = getMesh();
    if (!mesh) return;
    const originalMaterial = originalMaterials.get(name);
    if (!originalMaterial) return;
    if (mesh.material) disposeMaterial(mesh.material);
    mesh.material = originalMaterial;
    markMaterialForUpdate(mesh.material);
  }, [getMesh, name]);

  const applyPBRSet = useCallback(
    async (setName: keyof typeof PBR_SETS) => {
      const mesh = getMesh();
      if (!mesh) return;
      // your existing applyPBRVariant logic
      await applyPBRVariant(mesh, setName, {
        debug: process.env.NODE_ENV === "development",
      });
    },
    [getMesh]
  );

  const applyPhysicalMaterial = useCallback(
    (key: string) => {
      const mesh = getMesh();
      if (!mesh || !materials) return;
      if (mesh.material) disposeMaterial(mesh.material);
      mesh.material = materials[key];
      markMaterialForUpdate(mesh.material);
    },
    [getMesh, materials]
  );

  return (
    <div className="flex flex-wrap gap-2 w-full">
      {/* Reset button */}
      <button
        type="button"
        onClick={resetMaterial}
        aria-label="Reset material"
        className="flex justify-center items-center bg-gray-100 hover:bg-gray-200 border rounded w-16 h-16 transition"
      >
        <XCircleIcon className="w-8 h-8 text-red-600" />
      </button>

      {/* Render PBR sets if available */}
      {sets.map((setName) => {
        const set = PBR_SETS[setName];
        return (
          <button
            key={setName}
            type="button"
            onClick={() => applyPBRSet(setName)}
            className="relative border rounded hover:ring-2 hover:ring-blue-500 w-16 h-16 overflow-hidden transition"
            aria-label={`Apply ${setName} material`}
          >
            <Image
              src={set.albedo[0]}
              alt={setName}
              fill
              sizes="64px"
              className="object-cover"
            />
          </button>
        );
      })}

      {/* Render predefined physical materials if available */}
      {materials &&
        Object.entries(materials).map(([key, mat]) => (
          <button
            key={key}
            type="button"
            onClick={() => applyPhysicalMaterial(key)}
            className="relative border rounded w-16 h-16 overflow-hidden transition"
            aria-label={`Apply ${key} material`}
          >
            <div
              style={{
                backgroundColor: `#${mat.color.getHexString()}`,
                width: "100%",
                height: "100%",
              }}
            />
          </button>
        ))}
    </div>
  );
}
