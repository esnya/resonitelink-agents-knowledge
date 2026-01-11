# Text Renderer Facing

Minimal pattern for world-space text that faces the user.

## Intent

- Display a label in-world that faces the user using `LookAtUser`.

## Components

- `TextRenderer` for text content.
- `LookAtUser` on the same slot.
- Optional: `BoundingBoxDriver` for consistent layout.

## Wiring

- Set `TextRenderer.Text` and `TextRenderer.Size`.
- Keep the slot offset in front of the target space.
- Avoid calling this a "billboard": Resonite's billboard options live on
  `UnlitMaterial`, while this pattern is a simple `LookAtUser` pairing.

## Verification

- Created `Agent_TextFacing` with `TextRenderer` + `LookAtUser` via
  ResoniteLink; `Text` and `Size` set successfully, then removed.
