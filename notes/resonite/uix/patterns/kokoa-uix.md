# Kokoa UIX root templates (observed)

These templates live directly under Root (`KokoaUixTutorial_0`, `KokoaUixButton_0`, `KokoaUixScroll_0`).
They share a small, reusable canvas setup plus a simple layout stack.

## Shared base canvas

- `RectTransform` + `Canvas` + `BoxCollider` + `Image` + `Grabbable`.
- `Canvas.Size`: `512 x 256`.
- `BoxCollider.Size`: `512 x 256 x 0`.
- Background `Image` uses a local `UI_UnlitMaterial` from `KokoaUix*_Material` slots.
- Material settings match the Kokoa UI_Unlit variant (see `notes/resonite/uix/materials.md`).

## KokoaUixTutorial_0

- Root background tint: `(0.2, 0.2, 0.25, 1 sRGB)`.
- `Layout` child:
  - `Image` tint `(0.1, 0.1, 0.12, 1 sRGB)`.
  - `VerticalLayout`: spacing `4`, padding `4` on all sides, `ForceExpandWidth/Height: true`, align `Center/Middle`.
- Elements (`Element_0`..`Element_2`):
  - `Image` tints: `(0.2, 0.25, 0.3)`, `(0.25, 0.3, 0.35)`, `(0.3, 0.35, 0.4)` (all sRGB).
  - `LayoutElement`: defaults (`Min/Preferred/Flexible = -1`).

## KokoaUixButton_0

- Root background tint: `(0.18, 0.18, 0.2, 1 sRGB)`.
- `Button` child:
  - `Image` tint `(0.25, 0.3, 0.35, 1 sRGB)`.
  - `Text`: content `Button`, size `64`.
  - Button interaction components are attached to this slot (see `notes/resonite/components/button-interactions.md`).

## KokoaUixScroll_0

- Scroll-specific structure is documented in `notes/resonite/uix/patterns/scroll-areas.md`.
