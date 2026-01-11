# ProtoFlux Node Type Naming

How to resolve ProtoFlux node component types for ResoniteLink.

## Observed pattern

- Nodes placed in-world show component types under
  `FrooxEngine.ProtoFlux.Runtimes.Execution.Nodes.*`.
- Example (DuplicateSlot):
  - In-world component type:
    `FrooxEngine.ProtoFlux.Runtimes.Execution.Nodes.FrooxEngine.Slots.DuplicateSlot`
  - ResoniteLink componentType string:
    `[ProtoFluxBindings]FrooxEngine.ProtoFlux.Runtimes.Execution.Nodes.FrooxEngine.Slots.DuplicateSlot`

## Guidance

- If a node fails to resolve via ResoniteLink, place the node in-world and read
  its `componentType` from the slot/component inspector or via ResoniteLink.
- Use the exact runtime node type with the `[ProtoFluxBindings]` assembly prefix
  when creating the component through ResoniteLink.
