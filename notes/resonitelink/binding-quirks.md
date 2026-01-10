# Binding and drive quirks (ResoniteLink)

## ValueCopy targets

- `ValueCopy<float3>` target bind can fail if multiple ValueCopy components exist.
  - Removing duplicates allowed Target → `BoxCollider.Size`.
- `ValueCopy<colorX>` target rejects `PBS_Metallic` color fields.
  - Target stays null even with explicit `targetType`.
