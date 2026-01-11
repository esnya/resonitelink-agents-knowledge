# Text Renderer Billboard

Minimal pattern for world-space text that faces the user.

## Intent

- Display a label in-world with readable orientation.

## Components

- `TextRenderer` for text content.
- `LookAtUser` on the same slot.
- Optional: `BoundingBoxDriver` for consistent layout.

## Wiring

- Set `TextRenderer.Text` and `TextRenderer.Size`.
- Keep the slot offset in front of the target space.

## Verification

- Needs in-world verification of readability and alignment.
