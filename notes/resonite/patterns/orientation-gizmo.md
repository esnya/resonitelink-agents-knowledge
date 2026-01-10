# Orientation Gizmo (Arrows + Axis Labels)

Observed in `Avatar Anchor Template` and `Projectile System 3 (I0065)`.
Slot names are recorded only for navigation; the reusable patterns are in component wiring.

## Intent

- Provide a grab handle with visual axes for direction and orientation.

## Core structure

- Root slot:
  - `Grabbable` (optional if the gizmo itself should be movable).
- `Grab Sphere` child:
  - `SphereMesh` + `MeshRenderer`.
  - `SphereCollider`.
  - `ValueCopy<float>` to align collider radius with mesh radius.
- Axis arrows:
  - `X/Y/Z Arrow Mesh` each with `ArrowMesh` + `MeshRenderer`.
- Axis labels:
  - `X/Y/Z Outline` each with `TextRenderer` + `TextUnlitMaterial`.
  - `BoundingBoxDriver` + `BoxCollider` for consistent label bounds.

## Reuse notes

- Keep the gizmo as a dedicated child so other logic can reuse it (anchors,
  projectiles, targeting tools).
- If labels should always face the user, add `LookAtUser` to the label slots.
