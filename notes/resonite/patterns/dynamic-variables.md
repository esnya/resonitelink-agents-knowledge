# Dynamic Variable Wiring

Observed in `Projectile System 3 (I0065)` and `Eye Track Viewer` + `Gaze Sphere`.
Slot names are recorded only for navigation; the reusable patterns are in component wiring.

## Intent

- Share configuration and references across slots without hard links.

## Writer components

- `DynamicValueVariable<T>`:
  - `VariableName` holds the full path name.
  - `Value` stores the default or current value.
- `DynamicReferenceVariable<T>`:
  - `VariableName` holds the full path name.
  - `Reference` stores the target slot/object.
- Optional: group variables under a `DynamicVariableSpace` on template slots.

## Reader components

- `DynamicReferenceVariableDriver<T>`:
  - `VariableName` resolves a dynamic reference into a local `SyncRef`.
- `ReferenceField<T>` provides a local reference target for the driver.

## ProtoFlux usage (common pattern)

- `GlobalValue<string>` holds the variable name path.
- `DynamicVariableValueInput<T>` or `DynamicVariableObjectInput<T>` nodes read
  the value/reference by name.
- Input proxies (`DynamicVariableInputProxy<T>`) connect the node to runtime.

## Naming guidance

- Use a stable prefix to avoid collisions.
  - Sample prefixes: `ProjectileSys3/...`, `World/EyeTrackGazeSlot`.
- Prefer `/`-separated names for readability and search.

## Reuse notes

- Use dynamic variables when multiple instances of a system need to coexist.
- Keep variable names in one place (constants or `GlobalValue<string>` nodes).
