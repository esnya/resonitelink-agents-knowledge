# Binding and drive quirks (ResoniteLink)

## ValueCopy targets

- `ValueCopy<float3>` target bind can fail if multiple ValueCopy components exist.
  - Removing duplicates allowed Target → `BoxCollider.Size`.
  - `ValueCopy<T>` is not auto-added; if multiple exist, bindings can collide.
- `ValueCopy<colorX>` target rejects `PBS_Metallic` color fields.
  - Target stays null even with explicit `targetType`.

## Drive exclusivity

- A drive target cannot already be driven by another driver. Multiple drivers
  competing for the same target are not supported.
