# Object Spawning

Minimal pattern for duplicating and spawning slots.

## Intent

- Spawn copies of a template slot on demand.

## Components

- `DuplicateSlot` (ProtoFlux) or spawn pool components.
- Optional: `ObjectRoot` on spawned items.

## Wiring

- Provide a template slot reference.
- Set parent/space for the spawned slot.

## Verification

- Verified basic spawn flow by duplicating a template via ResoniteLink:
  `Agent_SpawnTemplate` and `Agent_SpawnedBox` were created with
  `BoxMesh` + `MeshRenderer`.
- ProtoFlux `DuplicateSlot`/spawn pool wiring still needs in-world verification.
