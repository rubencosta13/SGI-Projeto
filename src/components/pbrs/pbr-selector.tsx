"use client";

import { useCallback } from "react";
import type { Mesh, Material } from "three";
import Image from "next/image";
import { XCircleIcon } from "lucide-react";

import { originalMaterials, PBR_SETS } from "@/src/pbr/types";
import { applyPBRVariant } from "@/src/pbr/swap-material";

export type PBRSetName = keyof typeof PBR_SETS;

export interface PBRImagePickerProps {
  sets: readonly PBRSetName[];
  name: string;
  getMesh: () => Mesh | undefined; // <-- get mesh dynamically
}

/* ---------------- helpers ---------------- */

function disposeMaterial(material: Material | Material[]) {
  if (Array.isArray(material)) {
    material.forEach((m) => m.dispose());
  } else {
    material.dispose();
  }
}

function markMaterialForUpdate(material: Material | Material[]) {
  if (Array.isArray(material)) {
    material.forEach((m) => (m.needsUpdate = true));
  } else {
    material.needsUpdate = true;
  }
}

export function PBRImagePicker({ sets, name, getMesh }: PBRImagePickerProps) {
  const resetMaterial = useCallback(() => {
    const mesh = getMesh();
    if (!mesh) return;

    const originalMaterial = originalMaterials.get(name);
    if (!originalMaterial) {
      console.warn(`[PBR] No original material found for mesh: ${name}`);
      return;
    }

    if (mesh.material) disposeMaterial(mesh.material);

    mesh.material = originalMaterial;
    markMaterialForUpdate(mesh.material);
  }, [getMesh, name]);

  const applySet = async (setName: PBRSetName) => {
    const mesh = getMesh();
    if (!mesh) return;

    await applyPBRVariant(mesh, setName, {
      debug: process.env.NODE_ENV === "development",
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      {/* Reset */}
      <button
        type="button"
        onClick={resetMaterial}
        aria-label="Reset material"
        className="flex justify-center items-center bg-gray-100 hover:bg-gray-200 disabled:opacity-50 border rounded w-16 h-16 transition"
      >
        <XCircleIcon className="w-8 h-8 text-red-600" />
      </button>

      {/* One button per PBR set (no variants) */}
      {sets.map((setName) => {
        const set = PBR_SETS[setName];

        return (
          <button
            key={setName}
            type="button"
            onClick={() => {
              console.log("APPLY PBR ", { setName });
              applySet(setName);
            }}
            className="relative disabled:opacity-50 border rounded hover:ring-2 hover:ring-blue-500 w-16 h-16 overflow-hidden transition"
            aria-label={`Apply ${setName} material`}
          >
            <Image
              src={set.albedo[0]} // preview only
              alt={setName}
              fill
              sizes="64px"
              className="object-cover"
            />
          </button>
        );
      })}
    </div>
  );
}
