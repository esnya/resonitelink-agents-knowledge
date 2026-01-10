# Eye Tracking Samples (Eye Track Viewer + Gaze Sphere)

Observed via ResoniteLink from `Eye Track Viewer` and `Gaze Sphere`.
Slot names are recorded only for navigation; the reusable patterns are in component wiring.

## Shared linkage

- Dynamic variable name: `World/EyeTrackGazeSlot`.
- `Eye Track Viewer` defines a `DynamicReferenceVariable<Slot>` with this name.
- `Gaze Sphere` reads it via `DynamicReferenceVariableDriver<Slot>`.

## Eye Track Viewer layout

- `Raycasts` slot contains:
  - `AvatarRawEyeData` (Left/Right/Combined gaze origin + direction).
  - `CopyGlobalTransform` + `CopyGlobalScale`.
  - `ReferenceCopy<Slot>` keeps transform/scale sources in sync.
  - `ReferenceEqualityDriver<User>` toggles a bool when the tracked user changes.
- `Raycasts/Left|Right|Combined`:
  - `LookAt` + `ValueCopy<float3>` to align the ray visuals.
  - `Visual` child with `ArrowMesh` + `UnlitMaterial`.
  - `Visual/Ray` child with `RaycastDriver`
    (`MaxDistance: Infinity`, `NoHitDistance: 1000`).
- `Combined` uses two `ValueGradientDriver<float3>` to blend left/right origin
  and direction (`Progress: 0.5`).

## Eye Track Viewer UI

- `Labeled button` uses `UIX.Button`, `PlatformColorPalette`,
  and `SmoothValue<colorX>`.
- One button element contains `ButtonReferenceSet<User>` to update a
  `SyncRef<User>`.
- `ValueTextFormatDriver<string>` formats the button label from a string
  `ValueField`.

## Eye Track Viewer ProtoFlux (high level)

- `ButtonEvents` + `LocalUser` + `IsLocalUser` select which user to track.
- `ObjectWrite<User>` writes a `SyncRef<User>` used by UI and tracking.
- `UserUsername` + `ObjectFieldDrive<string>` update the label text.
- `HeadSlot` / `BodyNodeSlot` / `Raycaster` provide head-based ray inputs.

## Gaze Sphere behavior

- Reads `World/EyeTrackGazeSlot` into a local `ReferenceField<Slot>`.
- `ReferenceEqualityDriver<Slot>` compares the reference to the sphere slot.
- `BooleanValueDriver<float>` -> `SmoothValue<float>` -> `ValueGradientDriver<colorX>`
  animates `PBS_Metallic.EmissiveColor` between black and purple.
