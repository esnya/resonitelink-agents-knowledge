# Binding and drive quirks (ResoniteLink)

## ValueCopy targets

- `ValueCopy<float3>` target bind can fail if multiple ValueCopy components exist.
  - Removing duplicates allowed Target → `BoxCollider.Size`.
  - `ValueCopy<T>` is not auto-added; if multiple exist, bindings can collide.
- `ValueCopy<colorX>` target rejects `PBS_Metallic` color fields.
  - Target stays null even with explicit `targetType`.

## Drive exclusivity

- A drive target cannot already be driven by another drive. Multiple drives
  competing for the same target are not supported.

## Workaround (DynamicVariable relay)

- You can multiplex by driving the same-named DynamicVariable in the same space
  and then driving the target from that variable.
- On conflicts, the last update wins and becomes the effective value.
