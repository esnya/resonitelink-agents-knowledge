# ComponentType syntax (ResoniteLink)

## General rules

- Generic components can use angle-bracket notation with simple type names, e.g. `[FrooxEngine]FrooxEngine.ValueCopy<float3>`.
- UIX components and UI materials resolve reliably with `[FrooxEngine]` prefix.
  - Example: `[FrooxEngine]FrooxEngine.UIX.Canvas`
  - Example: `[FrooxEngine]FrooxEngine.UI_UnlitMaterial`

## ProtoFlux CoreNodes

- `ValueFieldDrive<T>` must use `[ProtoFluxBindings]FrooxEngine.FrooxEngine.ProtoFlux.CoreNodes.ValueFieldDrive<T>`.
- Connect `Value` to an `INodeValueOutput<T>`.

## Generic arguments that are FrooxEngine types

Use an inner assembly qualifier inside the generic argument.

Examples:

- `RefObjectInput<[FrooxEngine]FrooxEngine.Camera>` works.
- `RefObjectInput<FrooxEngine.Camera>` fails in ResoniteLink.
- `ObjectWrite<[FrooxEngine]FrooxEngine.ProtoFlux.FrooxEngineContext,Uri>` works.
- `ObjectWrite<FrooxEngine.ProtoFlux.FrooxEngineContext,Uri>` fails in ResoniteLink.
