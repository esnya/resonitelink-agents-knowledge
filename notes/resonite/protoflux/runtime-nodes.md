# ProtoFlux runtime nodes

## Runtime node components
- ProtoFlux runtime nodes can be added via `[ProtoFluxBindings]FrooxEngine.ProtoFlux.Runtimes.Execution.Nodes.*`.

## Evaluation notes
- `ProtoFlux.Driver<colorX>` did not update targets in this session.
- Nodes appear not evaluated without a built NodeGroup (Driver never propagated `ValueInput` changes).

## Practical workaround
- Use `ValueInput<colorX>` (ProtoFlux node) + `ValueCopy<colorX>`:
  - Source → `ValueInput.Value`
  - Target → `PBS_Metallic.AlbedoColor`
