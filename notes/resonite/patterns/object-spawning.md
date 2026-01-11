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

- Needs in-world verification of lifecycle and ownership.
