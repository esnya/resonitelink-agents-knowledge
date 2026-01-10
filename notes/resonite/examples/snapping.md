# Snapping (SnapTarget + Snapper)

Observed via ResoniteLink from root slots `Snapping Example` and `Snapper`.
Slot names are recorded only for navigation; the reusable patterns are in component wiring.

## Snapping Example layout

- `Snapping Example` contains a `SnapTarget` slot with:
  - Box mesh + collider + `Grabbable`.
  - `SnapTarget` plus a `SphereCollider` used for the snap proxy radius.
- Child `Snapper` slot:
  - Box mesh + collider + `Grabbable` + `Snapper`.

## SnapTarget settings (sample)

- `SnapperWhitelist`: references the child `Snapper`.
- `MaximumSnapDistance: 0.15`.
- `AnimationTime: 0.5`.
- `DirectSnapOnly: false`.
- `AutoSnap: false`.
- `MaximumAngleDeviation: Infinity`.

## Snapper settings (sample)

- `SnapTargetWhitelist`: references the parent `SnapTarget`.
- `SnapCheckRadius: 0.01`.
- `UseBoundingBoxCenter: false`.
- `CheckStaticColliders: false`.
- `Keywords`: empty.

## Standalone Snapper root

- The `Snapper` root slot is a single box + collider + `Snapper`.
- `SnapTargetWhitelist` is empty (`targetId: null`) until assigned.

## Reuse notes

- Pair `SnapTarget` and `Snapper` using explicit whitelists for predictable snapping.
- Keep collider sizes aligned via `ValueCopy<float3>` when using box meshes.
