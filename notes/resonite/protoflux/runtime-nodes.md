# ProtoFlux runtime nodes

## Runtime node components

- ProtoFlux runtime nodes can be added via `[ProtoFluxBindings]FrooxEngine.ProtoFlux.Runtimes.Execution.Nodes.*`.

## Evaluation notes

- `ProtoFlux.Driver<T>` is a `FrooxEngine.ProtoFlux.Driver<T>` component with:
  - `Source`: `SyncRef<INodeOutput<T>>`
  - `Target`: `FieldDrive<T>`
- If the source is not a valid `INodeOutput<T>` (for example, a node type mismatch
  or missing runtime wiring), the driver will not propagate values.

## Practical workaround

- Use `ValueInput<colorX>` (ProtoFlux node) + `ValueCopy<colorX>`:
  - Source → `ValueInput.Value`
  - Target → `PBS_Metallic.AlbedoColor`
