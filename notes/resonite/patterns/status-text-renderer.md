# Status Text Renderer

Use a `TextRenderer` slot as a visible status console in-world.

## Intent

- Show live progress or task state to users in the world.

## Components

- `TextRenderer` on a dedicated slot.
- Optional: `LookAtUser` if the text should always face the user.

## Wiring

- Update `TextRenderer.Text` with the latest status line.
- Start `TextRenderer.Size` at `1.0` unless a different size is requested.

## Notes

- Keep updates to a single line for easy scanning.
- If you need history, append lines and trim to a small window.
