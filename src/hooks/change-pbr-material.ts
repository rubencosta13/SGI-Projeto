import { useRef } from "react";
import { Mesh, Material } from "three";
import { PBRSet } from "../pbr/types";
import { applyPBRVariant as applyPBRVariantInternal } from "../pbr/swap-material";

type VariantIndex = {
  albedo?: number;
  metalness?: number;
  roughness?: number;
  normal?: number;
};

export function usePBR() {
  // Store original materials to allow revert
  const originalMaterials = useRef<Map<Mesh, Material | Material[]>>(new Map());

  /**
   * Apply a PBR variant to a mesh
   */
  const applyPBRVariant = (
    mesh: Mesh,
    pbrSet: PBRSet,
    variantIndex: VariantIndex
  ) => {
    // Save original material if not already stored
    if (!originalMaterials.current.has(mesh)) {
      originalMaterials.current.set(mesh, mesh.material);
    }

    // If the mesh has multiple materials, apply PBR to each of them
    if (Array.isArray(mesh.material)) {
      const newMaterials: Material[] = [];

      for (const mat of mesh.material) {
        // Create a temporary mesh with single material to apply PBR
        const tempMesh = { ...mesh, material: mat } as Mesh;
        applyPBRVariantInternal(tempMesh, "granite");

        // Extract the result - should be a single Material
        if (Array.isArray(tempMesh.material)) {
          // If it somehow became an array, take the first element
          newMaterials.push(tempMesh.material[0]);
        } else {
          newMaterials.push(tempMesh.material);
        }
      }

      mesh.material = newMaterials;
    } else {
      applyPBRVariantInternal(mesh, pbrSet, variantIndex);
    }
  };

  /**
   * Revert a mesh to its original material(s)
   */
  const revertMaterial = (mesh: Mesh) => {
    const original = originalMaterials.current.get(mesh);
    if (original) {
      mesh.material = original;
    }
  };

  return { applyPBRVariant, revertMaterial };
}
