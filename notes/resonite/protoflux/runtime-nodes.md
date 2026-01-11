# ProtoFlux runtime nodes

## Runtime node components

- ProtoFlux runtime nodes can be added via `[ProtoFluxBindings]FrooxEngine.ProtoFlux.Runtimes.Execution.Nodes.*`.

## Evaluation notes

- `ProtoFlux.Driver<T>` is a `FrooxEngine.ProtoFlux.Driver<T>` component with:
  - `Source`: `SyncRef<INodeOutput<T>>`
  - `Target`: `IField<T>` reference
- `ValueInput<T>` runtime node type:
  - `FrooxEngine.ProtoFlux.Runtimes.Execution.Nodes.ValueInput<T>`
  - ResoniteLink componentType:
    `[ProtoFluxBindings]FrooxEngine.ProtoFlux.Runtimes.Execution.Nodes.ValueInput<T>`
- In-world test (ResoniteLink):
  - Added `ValueInput<colorX>` + `ProtoFlux.Driver<colorX>` + `ValueField<colorX>`.
  - Wired `Driver.Source` → `ValueInput<colorX>` component id.
  - Wired `Driver.Target` → `ValueField<colorX>.Value` field id.
  - Updating `ValueInput.Value` did **not** propagate to the ValueField.
  - Likely missing runtime graph assembly (NodeGroup) or required node wiring.
    Treat as unresolved until a Driver node is created in-world and inspected.

## Practical workaround

- Use `ValueInput<colorX>` (ProtoFlux node) + `ValueCopy<colorX>`:
  - Source → `ValueInput.Value`
  - Target → `PBS_Metallic.AlbedoColor`
