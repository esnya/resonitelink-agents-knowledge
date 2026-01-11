# Basic UIX Canvas

Minimal pattern for a simple UIX canvas in world space.

## Intent

- Create a grab-ready UI canvas with a background image.

## Components

- `RectTransform`
- `Canvas`
- `Image`
- `Grabbable`
- Optional: `UI_UnlitMaterial` on a separate slot for the background material.

## Wiring

- Typical canvas scale: `(0.001, 0.001, 0.001)`.
- Typical canvas size: `(512, 256)` on `Canvas`.
- Bind `Image.Material` to the `UI_UnlitMaterial` when used.

## Verification

- Verified in the UIX study: `notes/resonite/studies/uix.md`.

## Notes

- For detailed UIX layouts, see `notes/resonite/uix/recipes/tutorial-derived.md`.
