# Spatial Variables Example

Observed via ResoniteLink from `Spatial Variables Example` root slot.
Slot names are recorded only for navigation; the reusable patterns are in component wiring.

## Intent

- Demonstrate spatial variables (int) with constant zones and a driver.
- Show how to read/display the current spatial value.

## Layout

- Three spheres plus a ProtoFlux graph:
  - Sphere A: constant variable zone value `7`.
  - Sphere B: driver sphere that reads the variable and shows the value.
  - Sphere C: constant variable zone value `11`.

## Constant variable zones (Sphere A / Sphere C)

- `SphereConstantValueSpatialVariable<int>`:
  - `VariableName: "Test"`.
  - `Radius: 0.75`.
  - `BlendDistance: 0`, `BlendDistanceMode: Ratio`.
  - Values: `7` (Sphere A), `11` (Sphere C).
- `ValueCopy<float>` keeps `SphereCollider` radius aligned with `SphereMesh`.

## Variable driver sphere (Sphere B)

- `ValueSpatialVariableDriver<int>`:
  - `VariableName: "Test"`.
  - `Drive` -> `ValueField<int>.Value`.
  - `DefaultValue: 11` (used outside any zone).
- `Grabbable` lets the sphere move between zones.

## Value display

- `Outline` slot:
  - `TextRenderer` + `TextUnlitMaterial`.
  - `BoundingBoxDriver` for sizing.
  - `LookAtUser` so the label faces the viewer.

## ProtoFlux graph (summary)

- `ValueSource<int>` nodes read:
  - `ValueField<int>.Value` (current driven value).
  - `ValueSpatialVariableDriver<int>.DefaultValue`.
- `GetActiveUser` + `ContinuouslyChangingObjectRelay<User>` feed
  `FireOnValueChange<int>.OnlyForUser`.
- `FireOnValueChange<int>` triggers `ValueWrite<FrooxEngineContext,int>` and
  `ToString_Int`.
- `ObjectFieldDrive<string>` writes the string output to `TextRenderer.Text`.

## Reuse notes

- Match `VariableName` across constant zones and drivers.
- A driver sphere + text readout is a compact way to debug spatial variables.
- Use `FireOnValueChange` to avoid continuous string conversion/updates.
