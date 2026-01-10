# Eye Ray Visualization

Observed in `Eye Track Viewer`.
Slot names are recorded only for navigation; the reusable patterns are in component wiring.

## Intent

- Visualize gaze direction and ray hits in-world.

## Core structure

- Source data: `AvatarRawEyeData` provides left/right/combined origin + direction.
- Per-ray slots (`Left`, `Right`, `Combined`):
  - `LookAt` to orient the visual.
  - `ValueCopy<float3>` to feed transforms.
  - `Visual` child with `ArrowMesh` + `UnlitMaterial`.
  - `Ray` child with `RaycastDriver`.

## RaycastDriver defaults (sample)

- `MaxDistance: Infinity`.
- `NoHitDistance: 1000`.
- `Direction: (0, 0, 1)`.

## Combined ray blending

- `ValueGradientDriver<float3>` blends between left/right origin and direction.
- `Progress: 0.5` for mid-point blend.

## Reuse notes

- This pattern works for eye gaze, controller pointing, or head-directed rays.
- Keep the `RaycastDriver` under a visual slot to reuse the same transform.
