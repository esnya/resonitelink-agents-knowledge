# RGB Cube study (local)

Source: official Resonite Wiki "RGB Cube" tutorial.

## Status

- Completed: color drive achieved via ProtoFlux CoreNodes (`ValueFieldDrive<colorX>` + `FieldDriveBase<colorX>+Proxy`) with time-driven hue changes.

## Tutorial summary (key steps)

- Basic visuals: create an empty object, add BoxMesh, set Size to (0.1, 0.1, 1.0).
- Basic interaction: add BoxCollider, set its Size to match BoxMesh, add Grabbable.
- Editing: set Grabbable Scalable to true; expose BoxMesh Size on grab inspector.
- Simple data binding: add ValueCopy to copy BoxMesh Size into BoxCollider Size.
- ProtoFlux: add interaction (Grab) and color logic (RGB inputs) to drive material color.

## What we executed via ResoniteLink

- Slot created: `KokoaRgbBox_0` under Root at (0, 1.2, 2.0).
- Components added:
  - BoxMesh `KokoaRgbBox_0_BoxMesh` with Size (0.1, 0.1, 1.0).
  - MeshRenderer `KokoaRgbBox_0_MeshRenderer` with Mesh -> BoxMesh.
  - BoxCollider `KokoaRgbBox_0_BoxCollider` with Size (0.1, 0.1, 1.0).
  - Grabbable `KokoaRgbBox_0_Grabbable` with Scalable = true.
  - PBS_Metallic `KokoaRgbBox_0_PBS` and assigned as MeshRenderer material.

## Blockers / follow-ups

- ValueCopy<float3> creation failed because generic component type resolution failed in ResoniteLink.
  - Tried:
    - `[FrooxEngine]FrooxEngine.ValueCopy`1[Elements.Core.float3]` -> Type.ContainsGenericParameters
    - `[FrooxEngine]FrooxEngine.ValueCopy`1[[Elements.Core.float3, Elements.Core]]` -> invalid type
  - Need correct generic type syntax for ResoniteLink componentType.

## Update: ValueCopy resolved

- Working component type: `[FrooxEngine]FrooxEngine.ValueCopy<float3>`.
- Component created: `KokoaRgbBox_0_ValueCopy_SizeLink`.
- `Source` accepts BoxMesh Size (member id `Reso_CABD`).
- `Target` did not bind to BoxCollider Size (member id `Reso_CAC8`) and remains null; needs further investigation.
  - `Source` can bind to BoxCollider Size (so the field is an `IField<float3>`).
  - `Target` can bind to a ValueField<float3> value (member id `Reso_D0DF`).
  - Hypothesis: FieldDrive (Target) refuses some fields (BoxCollider.Size) even though they are valid IField<float3>.

## Update: Target binding fixed

- Found duplicate ValueCopy on the same slot; removing the duplicate resolved the Target bind.
- Current bindings:
  - Source -> BoxMesh.Size (`Reso_CABD`)
  - Target -> BoxCollider.Size (`Reso_CAC8`)

## Update: ProtoFlux-style color drive (ResoniteLink)

- Added structure slots:
  - `KokoaRgbBox_0_Spikes` (child of box)
  - `KokoaRgbBox_0_ProtoFlux` (child of box)
- Added one spike:
  - Slot: `KokoaRgbBox_0_Spike_0`
  - ConeMesh: `KokoaRgbBox_0_Spike_0_ConeMesh` (Height 0.5, RadiusBase 0.1, RadiusTop 0.02)
  - MeshRenderer: `KokoaRgbBox_0_Spike_0_MeshRenderer` using `KokoaRgbBox_0_PBS`
  - BoxCollider: `KokoaRgbBox_0_Spike_0_BoxCollider`
- Color drive implemented via ValueField/ValueCopy:
  - ValueField<colorX>: `KokoaRgbBox_0_ValueField_Color` (on ProtoFlux slot)
  - ValueCopy<colorX>: `KokoaRgbBox_0_ValueCopy_Color` (on ProtoFlux slot)
  - Source -> ValueField.Value, Target -> PBS_Metallic.AlbedoColor
  - Updating ValueField changes the box color (verified with green).

## Update: Direct ProtoFlux nodes (no tool)

- Added ProtoFlux runtime nodes on `KokoaRgbBox_0_ProtoFlux`:
  - WorldTimeFloat: `KokoaRgbBox_0_PF_WorldTime`
  - ColorHue: `KokoaRgbBox_0_PF_ColorHue` (Hue -> WorldTimeFloat)
  - Cast_color_To_colorX: `KokoaRgbBox_0_PF_ColorCast` (Input -> ColorHue)
  - Driver<colorX>: `KokoaRgbBox_0_PF_Driver_Color` (Source -> ColorCast, Target -> PBS AlbedoColor)
- Observations:
- `ProtoFlux.Driver<colorX>` did not update `PBS_Metallic.AlbedoColor` in this
  session. This was a mis-identification of the Driver node. The actual Driver
  behavior in ProtoFlux is implemented via `ValueFieldDrive<T>` +
  `FieldDriveBase<T>+Proxy`.
  - See `notes/resonite/protoflux/runtime-nodes.md` for the Driver node notes.
  - When Driver was removed, manual updates to `PBS_Metallic.AlbedoColor` persisted again.
  - `ValueCopy<colorX>` Target binds to PBS color only when no other drive exists.

## Update: Workaround to drive color without ProtoFlux tool

- Added `ValueInput<colorX>` node: `KokoaRgbBox_0_PF_ValueInput_Color2`.
- Added `ValueCopy<colorX>`: `KokoaRgbBox_0_ValueCopy_FromValueInput`.
  - Source -> `ValueInput<colorX>.Value` (`Reso_12F5D`)
  - Target -> `PBS_Metallic.AlbedoColor` (`Reso_CAA3`)
- Updating `ValueInput<colorX>.Value` now changes `PBS_Metallic.AlbedoColor` reliably.

## Update: ValueFieldDrive structure (ProtoFlux CoreNodes)

- Removed `KokoaRgbBox_0_ValueCopy_FromValueInput` to avoid conflicting drives.
- Added `ValueFieldDrive<colorX>` via `[ProtoFluxBindings]FrooxEngine.FrooxEngine.ProtoFlux.CoreNodes.ValueFieldDrive<colorX>`:
  - Component id: `KokoaRgbBox_0_PF_ValueFieldDrive_Color`
  - `Value` -> `KokoaRgbBox_0_PF_ColorCast` (`INodeValueOutput<colorX>`)
- Added `FieldDriveBase<colorX>+Proxy`:
  - Component id: `KokoaRgbBox_0_PF_FieldDriveProxy_Color2`
  - `Node` -> `KokoaRgbBox_0_PF_ValueFieldDrive_Color`
  - `Drive` -> `PBS_Metallic.AlbedoColor` (`Reso_CAA3`)
- Result: AlbedoColor updates over time (ColorHue -> Cast -> ValueFieldDrive -> FieldDriveBase proxy).
