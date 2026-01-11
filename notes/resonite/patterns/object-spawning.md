# Object Spawning

Minimal pattern for duplicating and spawning slots.

## Intent

- Spawn copies of a template slot on demand.

## Components

- `DuplicateSlot` (ProtoFlux).
- Optional: `ObjectRoot` on spawned items.

## Wiring

- Provide a template slot reference.
- Set parent/space for the spawned slot.

## Verification

- Verified basic spawn flow by duplicating a template via ResoniteLink:
  `Agent_SpawnTemplate` and `Agent_SpawnedBox` were created with
  `BoxMesh` + `MeshRenderer`.
- ProtoFlux `DuplicateSlot` wiring still needs in-world verification.
  - Attempts to add `DuplicateSlot` via ResoniteLink failed to resolve
    component types:
    - `[FrooxEngine]FrooxEngine.DuplicateSlot`
    - `[ProtoFluxBindings]FrooxEngine.FrooxEngine.ProtoFlux.CoreNodes.DuplicateSlot`
    - `[ProtoFluxBindings]FrooxEngine.ProtoFlux.CoreNodes.DuplicateSlot`
    - `[ProtoFluxBindings]FrooxEngine.ProtoFlux.Runtimes.Execution.Nodes.DuplicateSlot`
    - `[ProtoFluxBindings]FrooxEngine.ProtoFlux.Runtimes.Execution.Nodes.Slots.DuplicateSlot`
  - In-world node inspection showed the resolved type is
    `FrooxEngine.ProtoFlux.Runtimes.Execution.Nodes.FrooxEngine.Slots.DuplicateSlot`.
  - ResoniteLink can add it with:
    - `[ProtoFluxBindings]FrooxEngine.ProtoFlux.Runtimes.Execution.Nodes.FrooxEngine.Slots.DuplicateSlot`
  - Observed members: `Template` and `OverrideParent` accept
    `INodeObjectOutput<Slot>` references; `Duplicate` is the trigger output.

## Notes

- Inventory-style spawning (`ObjectSpawn`/spawn pools) is not currently
  accessible through ResoniteLink. Avoid promising it as a default path.
- `CloudSpawn` exists in ProtoFlux but is treated as a hack; wait for the
  supported route unless an experiment explicitly calls for it.
- If the spawned slot is a cohesive object, attach `ObjectRoot` and follow
  the guidance in `notes/resonite/components/object-root.md`.
