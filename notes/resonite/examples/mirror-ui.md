# Mirror (UI sample)

Observed via ResoniteLink from the `Mirror` root slot.
Slot names are recorded only for navigation; the reusable patterns are in component wiring.

## Root components

- `Grabbable` + `ObjectRoot` for a portable gadget.
- `ItemTextureThumbnailSource` for item thumbnail capture.

## Canvas layout

- `Canvas` (UIX) with three main children:
  - `Border`: background panel and size animation.
  - `Minimized`: button that toggles minimized state.
  - `Distance check`: hides UI at range.

## Border panel

- `UIX.Image` with `UI_UnlitMaterial` and `SpriteProvider`.
- `RectTransformLerp` + `SmoothValue<float>` animate size.
- `ValueGradientDriver<colorX>` drives material color.
- `BooleanValueDriver<float>` controls alpha/size based on UI state.

## Minimize toggle

- `UIX.Button` with:
  - `ValueUserOverride<bool>` for per-user state.
  - `ValueMultiDriver<bool>` fan-out.
  - `ButtonValueSet<bool>` and `MultiBoolConditionDriver` for state logic.
  - `ValueField<bool>` stores current minimized flag.

## Distance-based visibility

- `UserDistanceValueDriver<bool>` in `Distance check` toggles UI visibility
  based on proximity.

## ProtoFlux usage

- Numeric nodes (`ValueDiv`, `ValueMul`, `Pack/Unpack_Float2`) compute UI sizes.
- `FireOnLocalValueChange` + `ValueFieldDrive` update UI fields on changes.
- `WorldTimeFloat` + `ValueWrite` synchronize time-based updates.

## Observations

- No explicit mirror or camera component appeared in the captured depth.
  The mirror surface may be referenced from another slot or a deeper hierarchy.
