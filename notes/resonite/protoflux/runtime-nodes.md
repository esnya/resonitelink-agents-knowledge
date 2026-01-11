# ProtoFlux runtime nodes

## Runtime node components

- ProtoFlux runtime nodes can be added via `[ProtoFluxBindings]FrooxEngine.ProtoFlux.Runtimes.Execution.Nodes.*`.

## Evaluation notes

- `ProtoFlux.Driver<colorX>` created via ResoniteLink did not update targets in
  this session.
- This may be due to missing NodeGroup/runtime graph assembly or an incorrect
  node type (unverified). Treat as a session-specific observation until a
  Driver node is created in-world and inspected.

## Practical workaround

- Use `ValueInput<colorX>` (ProtoFlux node) + `ValueCopy<colorX>`:
  - Source → `ValueInput.Value`
  - Target → `PBS_Metallic.AlbedoColor`
