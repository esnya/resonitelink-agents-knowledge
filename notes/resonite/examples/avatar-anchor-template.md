# Avatar Anchor Template

Observed via ResoniteLink from `Avatar Anchor Template` root slot.
Slot names are recorded only for navigation; the reusable patterns are in component wiring.

## Intent

- Provide an `AvatarAnchor` with proxy handles for major body nodes.
- Offer touch and controller toggles for enter/exit and proxy visibility.

## Root components

- `AvatarAnchor`: `MinScale 0.25`, `MaxScale 4`, `PositionNode: Hips`,
  `RotationNode: GroundProjectedHead`, `TransformRestoreMode: Reference`,
  `RestoreReference` points to a local slot, `PreserveUpOnExit: true`.
- `AvatarAnchorLocomotionRelease`: `ReleaseOnBinaryAction: true`,
  `ReleaseStrengthThreshold: 0.825`.
- `MaterialApplyPolicy`: `CanApply: false` (prevents drag-drop materials).

## Anchor toggle

- `AvatarAnchorTouchTrigger` on a simple box mesh + collider.
- `EnterText/ExitText` set to localized labels (Japanese enter/exit strings).
- `AcceptRemoteTouch: true`, `AcceptPhysicalTouch: false`.

## Proxy layout (body handles)

- A single root groups handles for `Hips`, `Chest`, `Head`, `Hand L/R`,
  `Foot L/R`, and a `PositionRoot`.
- Each handle uses:
  - `AvatarPoseBoxConstraint` (box size is `Infinity` to accept large offsets).
  - `Grabbable` for moving the proxy in-world.
- Hand proxies add:
  - `AvatarPoseRotationConstraint` with `MaxTwist/MaxSwing 0` (rotation locked).
  - `AvatarPoseOffset` with a 90° rotation offset (`y=-0.707`, `w=0.707`).

## Orientation visuals

- Each proxy has an `Orientation Visual` child with:
  - `Grab Sphere` (`SphereMesh`, `SphereCollider`, `ValueCopy<float>` to align radii).
  - `X/Y/Z Arrow Mesh` using `ArrowMesh` + `MeshRenderer`.
  - `X/Y/Z Outline` text using `TextRenderer` + `TextUnlitMaterial` +
    `BoundingBoxDriver`.

## UI controls

- `Settings Button` combines `TouchButton` + `ButtonToggle` +
  `MultiBoolConditionDriver` and faces the user with `LookAtUser`.
- `ValueMultiDriver<bool>` fan-outs a boolean state to multiple
  `IField<bool>` targets.

## ProtoFlux graph (summary)

- Two `StandardController` nodes driven by `ValueInput<Chirality>` for
  left/right controller input.
- `DataModelBooleanToggle` + `DataModelValueFieldStore<bool>.Store` provide
  persisted boolean state.
- `FireOnTrue`, `AND_Bool`, `NOT_Bool`, and `ValueEquals<bool>` gate actions by
  anchor state and input.
- `AnchoredUser` + `IsAnchorOccupied` are used to check/target the current
  anchor.
- `ValueFieldDrive<bool>` drives target `IField<bool>` values from node outputs.

## Reuse notes

- Keep proxy orientation visuals separate from the constraint/grabbable handle.
- Use `AvatarAnchorTouchTrigger` for a simple enter/exit control and pair it
  with UI toggles for advanced control.
- Keep controller input handling in ProtoFlux so the anchor remains usable
  without the UI.
