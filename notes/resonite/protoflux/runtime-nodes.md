# ProtoFlux runtime nodes

## Runtime node components

- ProtoFlux runtime nodes can be added via `[ProtoFluxBindings]FrooxEngine.ProtoFlux.Runtimes.Execution.Nodes.*`.

## Evaluation notes

- `FrooxEngine.ProtoFlux.Driver<T>` exists as a component but is **not** the
  same thing as the ProtoFlux "Driver" node created by the tool. Treat it as
  an internal/unknown component until verified; do not use it as the Driver node.
- `ValueInput<T>` runtime node type:
  - `FrooxEngine.ProtoFlux.Runtimes.Execution.Nodes.ValueInput<T>`
  - ResoniteLink componentType:
    `[ProtoFluxBindings]FrooxEngine.ProtoFlux.Runtimes.Execution.Nodes.ValueInput<T>`

## Driver node (tool-created)

- The ProtoFlux "Driver" behavior observed in the RGB Cube uses:
  - `ValueFieldDrive<T>` (CoreNodes)
  - `FieldDriveBase<T>+Proxy`
- See `notes/resonite/studies/rgb-cube.md` for the verified wiring.

## Practical workaround

- Use `ValueInput<colorX>` (ProtoFlux node) + `ValueCopy<colorX>`:
  - Source → `ValueInput.Value`
  - Target → `PBS_Metallic.AlbedoColor`
