# UI Toggle Panel (Per-User Minimize + Smooth Anim)

Observed in `Mirror`.
Slot names are recorded only for navigation; the reusable patterns are in component wiring.

## Intent

- Provide a panel that can be minimized per-user and animates smoothly.

## Core structure

- `UIX.Image` background with `UI_UnlitMaterial` + `SpriteProvider`.
- `ValueUserOverride<bool>` to store per-user minimized state.
- `UIX.Button` drives `ValueField<bool>` via `ButtonValueSet<bool>`.
- `ValueMultiDriver<bool>` fans state to multiple drivers.
- `SmoothValue<float>` and `SmoothValue<float2>` animate size/alpha.
- `BooleanValueDriver<float>` gates alpha or size based on the toggle.
- Optional: `UserDistanceValueDriver<bool>` to hide the panel at range.

## Reuse notes

- Use `ValueUserOverride` whenever UI state must be per-user.
- Keep animations in the UI layer (SmoothValue + drivers) to avoid ProtoFlux
  when simple parameter easing is enough.
