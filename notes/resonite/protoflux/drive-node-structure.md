# ProtoFlux drive node structure

## Verified pattern

`ValueFieldDrive<T>` outputs a drive value, and `FieldDriveBase<T>+Proxy` binds:

- `Node` → the drive node
- `Drive` → target `IField<T>`

## Example

- `WorldTimeFloat` → `Pack_Float3` (Y) → `FromEuler_floatQ` → `ValueFieldDrive<floatQ>`.
- `FieldDriveBase<floatQ>+Proxy.Drive` points to a slot Rotation field (`EmptyObject` slot Rotation id `Reso_13519`).

## Inference

Other `*Drive` CoreNodes likely use the same pairing with `FieldDriveBase<T>+Proxy` for the actual field binding.
