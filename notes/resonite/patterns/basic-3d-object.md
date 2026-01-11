# Basic 3D Object (Mesh + Grabbable)

Minimal pattern for a simple 3D object you can grab.

## Intent

- Create a mesh-backed object with collider and grab interaction.

## Components

- `Mesh` (for example `BoxMesh`).
- `MeshRenderer`.
- `Collider` (for example `BoxCollider`).
- `Grabbable`.
- Optional: `ObjectRoot` when the slot represents a cohesive object.

## Wiring

- Assign `MeshRenderer.Mesh` to the mesh component.
- Match collider size/shape to the mesh.
- Ensure the collider does not have `IgnoreRaycast = true`.
- Add `Grabbable` on the same slot to enable interaction.

## Verification

- Verified in the RGB cube study: `notes/resonite/studies/rgb-cube.md`.

## Notes

- Grab parenting and coordinate changes are documented in
  `notes/resonite/components/grabbable.md`.
- Object semantics are documented in `notes/resonite/components/object-root.md`.
