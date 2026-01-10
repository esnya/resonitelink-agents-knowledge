# Snapping Pair (SnapTarget + Snapper)

Observed in `Snapping Example`.
Slot names are recorded only for navigation; the reusable patterns are in component wiring.

## Intent

- Provide deterministic snapping between a target and a grabable object.

## SnapTarget setup

- `SnapTarget` on the target slot.
- Use `SnapperWhitelist` for explicit pairing.
- `MaximumSnapDistance` sets capture radius (sample: `0.15`).
- `AnimationTime` controls snap lerp (sample: `0.5`).
- Optional proxy radius via a `SphereCollider` referenced by `SnapTarget`.

## Snapper setup

- `Snapper` on the movable slot.
- Use `SnapTargetWhitelist` for explicit pairing.
- `SnapCheckRadius` for overlap test (sample: `0.01`).
- `CheckStaticColliders: false` unless snapping to static colliders is needed.

## Reuse notes

- Pair whitelists in both directions for predictable snapping.
- Keep collider sizes aligned via `ValueCopy<float3>` (box meshes) or
  `ValueCopy<float>` (sphere meshes).
